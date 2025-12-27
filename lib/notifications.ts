// Notification helper functions
export async function sendNotification(title: string, options?: NotificationOptions) {
  if (!("Notification" in window)) {
    console.log("Notifications not supported")
    return
  }

  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      icon: "/icons/icon-192x192.jpg",
      badge: "/icons/icon-72x72.png",
      ...options,
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    return notification
  }

  return null
}

// Booking notification
export function notifyBookingConfirmed(serviceName: string, date: string) {
  return sendNotification("Booking Confirmed!", {
    body: `Your ${serviceName} booking for ${date} has been confirmed.`,
    tag: "booking-confirmed",
  })
}

// Payment notification
export function notifyPaymentReceived(amount: number) {
  return sendNotification("Payment Received", {
    body: `AED ${amount.toFixed(2)} has been added to your wallet.`,
    tag: "payment-received",
  })
}

// Invoice reminder
export function notifyInvoiceDue(invoiceNumber: string, amount: number) {
  return sendNotification("Invoice Reminder", {
    body: `Invoice ${invoiceNumber} for AED ${amount.toFixed(2)} is due soon.`,
    tag: "invoice-reminder",
  })
}

// Points earned
export function notifyPointsEarned(points: number) {
  return sendNotification("Points Earned!", {
    body: `You've earned ${points} loyalty points. Keep earning!`,
    tag: "points-earned",
  })
}

// Social media post scheduled
export function notifyPostScheduled(platform: string, date: string) {
  return sendNotification("Post Scheduled", {
    body: `Your ${platform} post has been scheduled for ${date}.`,
    tag: "post-scheduled",
  })
}
