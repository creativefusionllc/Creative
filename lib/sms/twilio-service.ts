import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken)

export async function sendVerificationCode(toNumber: string): Promise<string> {
  const code = Math.random().toString().slice(2, 8)

  try {
    await client.messages.create({
      body: `Your verification code is: ${code}. Valid for 10 minutes.`,
      from: fromNumber,
      to: toNumber,
    })
    return code
  } catch (error) {
    console.error("Twilio SMS error:", error)
    throw new Error("Failed to send SMS")
  }
}

export function generateVerificationCode(): string {
  return Math.random().toString().slice(2, 8)
}
