import { createClient } from "@/lib/supabase/client"

export async function postToSocialMedia(
  accountId: string,
  content: {
    caption: string
    mediaUrls: string[]
    platform: string
  },
) {
  const supabase = createClient()

  try {
    // Get account credentials
    const { data: account } = await supabase
      .from("social_accounts")
      .select("*, social_api_credentials(*)")
      .eq("id", accountId)
      .single()

    if (!account || !account.api_connected) {
      throw new Error("Social account not connected")
    }

    let postResult

    // REAL posting to each platform
    switch (content.platform) {
      case "instagram":
        postResult = await postToInstagram(account, content)
        break
      case "facebook":
        postResult = await postToFacebook(account, content)
        break
      case "linkedin":
        postResult = await postToLinkedIn(account, content)
        break
      case "twitter":
        postResult = await postToTwitter(account, content)
        break
      default:
        throw new Error(`Platform ${content.platform} not supported`)
    }

    // Save post to database
    const { data: savedPost } = await supabase
      .from("social_content")
      .insert({
        client_id: account.client_id,
        social_account_id: accountId,
        caption: content.caption,
        media_urls: content.mediaUrls,
        status: "published",
        published_at: new Date().toISOString(),
        platform_post_id: postResult.postId,
        platform_post_url: postResult.postUrl,
      })
      .select()
      .single()

    console.log("[v0] Successfully posted to", content.platform, ":", postResult.postId)

    return { success: true, postId: savedPost.id, platformPostId: postResult.postId }
  } catch (error) {
    console.error("[v0] Social media posting error:", error)
    throw error
  }
}

async function postToInstagram(account: any, content: any) {
  // Real Instagram Graph API posting
  const accessToken = account.social_api_credentials?.access_token

  if (!accessToken) {
    throw new Error("Instagram access token missing")
  }

  // Step 1: Upload media to Instagram
  const mediaIds = []
  for (const mediaUrl of content.mediaUrls) {
    const uploadResponse = await fetch(
      `https://graph.facebook.com/v18.0/${account.social_api_credentials.instagram_business_id}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: mediaUrl,
          caption: content.caption,
          access_token: accessToken,
        }),
      },
    )

    const uploadData = await uploadResponse.json()
    if (uploadData.id) {
      mediaIds.push(uploadData.id)
    }
  }

  // Step 2: Publish the media
  const publishResponse = await fetch(
    `https://graph.facebook.com/v18.0/${account.social_api_credentials.instagram_business_id}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: mediaIds[0],
        access_token: accessToken,
      }),
    },
  )

  const publishData = await publishResponse.json()

  return {
    postId: publishData.id,
    postUrl: `https://www.instagram.com/p/${publishData.id}/`,
  }
}

async function postToFacebook(account: any, content: any) {
  // Real Facebook Graph API posting
  const accessToken = account.social_api_credentials?.access_token
  const pageId = account.social_api_credentials?.facebook_page_id

  const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: content.caption,
      link: content.mediaUrls[0] || undefined,
      access_token: accessToken,
    }),
  })

  const data = await response.json()

  return {
    postId: data.id,
    postUrl: `https://www.facebook.com/${data.id}`,
  }
}

async function postToLinkedIn(account: any, content: any) {
  // Real LinkedIn API posting
  const accessToken = account.social_api_credentials?.access_token
  const personUrn = account.social_api_credentials?.linkedin_person_urn

  const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: personUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content.caption,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    }),
  })

  const data = await response.json()

  return {
    postId: data.id,
    postUrl: `https://www.linkedin.com/feed/update/${data.id}/`,
  }
}

async function postToTwitter(account: any, content: any) {
  // Real Twitter API v2 posting
  const accessToken = account.social_api_credentials?.access_token

  const response = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: content.caption,
    }),
  })

  const data = await response.json()

  return {
    postId: data.data.id,
    postUrl: `https://twitter.com/i/web/status/${data.data.id}`,
  }
}
