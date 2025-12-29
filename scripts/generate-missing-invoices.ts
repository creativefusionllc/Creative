import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function generateMissingInvoices() {
  console.log("Generating missing invoices for confirmed bookings...")

  // Get all confirmed bookings without invoices
  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("*, clients!inner(*)")
    .eq("status", "confirmed")
    .is("invoices.id", null)

  if (bookingsError) {
    console.error("Error fetching bookings:", bookingsError)
    return
  }

  console.log(`Found ${bookings?.length || 0} bookings without invoices`)

  // Budget range mapping
  const budgetMap: Record<string, number> = {
    "under-5000": 3000,
    "5000-10000": 7500,
    "10000-20000": 15000,
    "20000-50000": 35000,
    "above-50000": 75000,
  }

  // Get last invoice number
  const { data: lastInvoice } = await supabase
    .from("invoices")
    .select("invoice_number")
    .order("created_at", { ascending: false })
    .limit(1)

  let invoiceCounter = lastInvoice?.[0]?.invoice_number
    ? Number.parseInt(lastInvoice[0].invoice_number.split("-")[1])
    : 0

  for (const booking of bookings || []) {
    invoiceCounter++
    const invoiceNumber = `INV-${String(invoiceCounter).padStart(4, "0")}`

    const amount = budgetMap[booking.budget_range] || 5000
    const taxAmount = amount * 0.05
    const totalAmount = amount + taxAmount

    const client = booking.clients
    const hasSufficientBalance = client.wallet_balance >= totalAmount
    const invoiceStatus = hasSufficientBalance ? "paid" : "unpaid"

    const invoiceItems = [
      {
        description: `${booking.service_category} - ${booking.service_subcategory}`,
        quantity: 1,
        rate: amount,
        amount: amount,
      },
    ]

    // Create invoice
    const { error: invoiceError } = await supabase.from("invoices").insert({
      invoice_number: invoiceNumber,
      client_id: client.id,
      booking_id: booking.id,
      amount: amount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      status: invoiceStatus,
      items: invoiceItems,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      paid_date: hasSufficientBalance ? new Date().toISOString().split("T")[0] : null,
      notes: `Auto-generated for booking ${booking.booking_number}`,
    })

    if (invoiceError) {
      console.error(`Error creating invoice for ${booking.booking_number}:`, invoiceError)
      continue
    }

    // Deduct from wallet if sufficient balance
    if (hasSufficientBalance) {
      const newBalance = Number.parseFloat(client.wallet_balance.toString()) - totalAmount

      await supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", client.id)

      await supabase.from("wallet_transactions").insert({
        client_id: client.id,
        type: "debit",
        amount: totalAmount,
        description: `Payment for booking ${booking.booking_number} - ${invoiceNumber}`,
        reference_id: invoiceNumber,
        balance_after: newBalance,
        verification_status: "verified",
        payment_method: "admin_credit",
      })

      console.log(`✓ Created ${invoiceNumber} for ${booking.booking_number} - PAID (AED ${totalAmount})`)
    } else {
      console.log(`✓ Created ${invoiceNumber} for ${booking.booking_number} - UNPAID (AED ${totalAmount})`)
    }
  }

  console.log("Done!")
}

generateMissingInvoices()
