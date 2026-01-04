import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const messageId = request.nextUrl.searchParams.get("messageId")

    if (!messageId) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 })
    }

    const twilioResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages/${messageId}.json`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.TWILIO_ACCOUNT_SID + ":" + process.env.TWILIO_AUTH_TOKEN).toString("base64"),
        },
      },
    )

    const messageStatus = await twilioResponse.json()

    return NextResponse.json({
      delivered: messageStatus.status === "delivered" || messageStatus.status === "sent",
      status: messageStatus.status,
    })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Failed to check delivery" }, { status: 500 })
  }
}
