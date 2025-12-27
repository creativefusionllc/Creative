import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export interface EnvatoAsset {
  id: string
  asset_type: string
  title: string
  description: string
  preview_url: string
  download_url: string
  thumbnail_url: string
  tags: string[]
  categories: string[]
  file_size: number
  dimensions: { width: number; height: number }
  format: string
  license_type: string
  author_name: string
  author_url: string
  metadata: Record<string, any>
}

export class EnvatoClient {
  private apiToken: string
  private baseUrl = "https://api.envato.com/v3/market"

  constructor(apiToken: string) {
    this.apiToken = apiToken
  }

  async searchAssets(
    query: string,
    options: {
      type?: string
      page?: number
      perPage?: number
      filters?: Record<string, any>
    } = {},
  ): Promise<{ assets: EnvatoAsset[]; total: number }> {
    try {
      const params = new URLSearchParams({
        term: query,
        page: (options.page || 1).toString(),
        per_page: (options.perPage || 20).toString(),
      })

      if (options.type) {
        params.append("category", options.type)
      }

      const response = await fetch(`${this.baseUrl}/catalog/items?${params}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Envato API error: ${response.statusText}`)
      }

      const data = await response.json()

      const assets: EnvatoAsset[] = data.matches.map((item: any) => ({
        id: item.id,
        asset_type: this.mapAssetType(item.classification),
        title: item.name,
        description: item.description || "",
        preview_url: item.previews?.landscape_preview?.landscape_url || item.previews?.icon_preview?.icon_url || "",
        download_url: item.url,
        thumbnail_url: item.thumbnail_url || item.previews?.icon_preview?.icon_url || "",
        tags: item.tags ? item.tags.split(",").map((t: string) => t.trim()) : [],
        categories: [item.classification],
        file_size: item.item_attributes?.file_size || 0,
        dimensions: {
          width: item.item_attributes?.width || 0,
          height: item.item_attributes?.height || 0,
        },
        format: item.item_attributes?.format || "unknown",
        license_type: "unlimited",
        author_name: item.author_username,
        author_url: item.author_url,
        metadata: {
          price: item.price_cents,
          rating: item.rating,
          sales: item.number_of_sales,
        },
      }))

      return {
        assets,
        total: data.matches.length,
      }
    } catch (error) {
      console.error("Envato search error:", error)
      return { assets: [], total: 0 }
    }
  }

  private mapAssetType(classification: string): string {
    const typeMap: Record<string, string> = {
      photo: "photo",
      photos: "photo",
      graphic: "graphic",
      graphics: "graphic",
      template: "template",
      templates: "template",
      video: "video",
      "ui-kit": "ui-kit",
      mockup: "mockup",
    }
    return typeMap[classification.toLowerCase()] || "graphic"
  }

  async downloadAsset(assetId: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/buyer/download?item_id=${assetId}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.download_url
    } catch (error) {
      console.error("Envato download error:", error)
      throw error
    }
  }

  async getAssetDetails(assetId: string): Promise<EnvatoAsset | null> {
    try {
      const response = await fetch(`${this.baseUrl}/catalog/item?id=${assetId}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      })

      if (!response.ok) {
        return null
      }

      const item = await response.json()

      return {
        id: item.id,
        asset_type: this.mapAssetType(item.classification),
        title: item.name,
        description: item.description || "",
        preview_url: item.previews?.landscape_preview?.landscape_url || "",
        download_url: item.url,
        thumbnail_url: item.thumbnail_url || "",
        tags: item.tags ? item.tags.split(",").map((t: string) => t.trim()) : [],
        categories: [item.classification],
        file_size: item.item_attributes?.file_size || 0,
        dimensions: {
          width: item.item_attributes?.width || 0,
          height: item.item_attributes?.height || 0,
        },
        format: item.item_attributes?.format || "unknown",
        license_type: "unlimited",
        author_name: item.author_username,
        author_url: item.author_url,
        metadata: {
          price: item.price_cents,
          rating: item.rating,
          sales: item.number_of_sales,
        },
      }
    } catch (error) {
      console.error("Envato asset details error:", error)
      return null
    }
  }
}

export async function getEnvatoClient() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  const { data: config } = await supabase.from("envato_config").select("api_token").single()

  if (!config?.api_token) {
    throw new Error("Envato API token not configured")
  }

  return new EnvatoClient(config.api_token)
}
