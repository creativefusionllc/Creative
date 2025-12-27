export const getPayPalClientId = () => {
  return process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
}

export const getPayPalEnvironment = () => {
  return process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT || "sandbox"
}
