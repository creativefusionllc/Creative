"use client"

export function initializeProtection() {
  if (typeof window === "undefined") return

  // Disable right-click
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    return false
  })

  // Disable keyboard shortcuts (but allow normal typing)
  document.addEventListener("keydown", (e) => {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "J") ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault()
      return false
    }
  })

  // Disable text selection and drag on images only
  document.addEventListener("selectstart", (e) => {
    if ((e.target as HTMLElement).tagName === "IMG") {
      e.preventDefault()
    }
  })

  document.addEventListener("dragstart", (e) => {
    if ((e.target as HTMLElement).tagName === "IMG") {
      e.preventDefault()
    }
  })
}

export function encryptImageUrl(url: string): string {
  // Simple base64 encoding for URLs
  if (typeof window === "undefined") return url
  return `data:image/encrypted;base64,${btoa(url)}`
}

export function decryptImageUrl(encrypted: string): string {
  if (!encrypted.startsWith("data:image/encrypted")) return encrypted
  const base64 = encrypted.split(",")[1]
  return atob(base64)
}
