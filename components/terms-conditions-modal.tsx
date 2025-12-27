"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TermsConditionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsConditionsModal({ open, onOpenChange }: TermsConditionsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1C1C1C]">Terms & Conditions</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 text-sm text-gray-700 leading-relaxed">
          <section>
            <h3 className="font-semibold text-[#1C1C1C] mb-2">Payment & Refund Policy</h3>
            <p className="mb-3">
              <strong>Refund Period:</strong> Full refunds are available within 30 days of the original payment date.
              Refunds will be processed to the original payment method used for the transaction.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1C1C1C] mb-2">Cancellation Policy</h3>
            <p>
              <strong>Cancellation Deadline:</strong> Bookings can only be cancelled and refunded if the cancellation
              request is made <strong>at least 72 hours before</strong> the scheduled service date. Cancellations made
              within 72 hours of the service date are <strong>non-refundable</strong>.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1C1C1C] mb-2">Applicable Services</h3>
            <p>
              These terms and conditions apply to all services provided by Creative Fusion LLC, including but not
              limited to branding, digital marketing, web development, photography, videography, and all other service
              categories.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1C1C1C] mb-2">Service Modifications</h3>
            <p>
              Clients agree to these terms for all service changes, upgrades, or modifications made to their bookings.
              The same refund and cancellation policies apply to all modifications.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1C1C1C] mb-2">Additional Terms</h3>
            <p className="mb-2">
              By submitting this booking, you acknowledge that you have read, understood, and agree to be bound by these
              Terms & Conditions. You consent to our service terms and are responsible for providing accurate
              information in your booking form.
            </p>
            <p>
              For detailed information about our services, policies, and additional terms, please contact us at
              info@creativefusion.llc or call +971 58 117 4911.
            </p>
          </section>

          <div className="bg-blue-50 border-l-4 border-[#C4D600] p-3 rounded mt-4">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> Additional terms and conditions specific to your service category may be provided
              in the CMS. Please ensure you have reviewed all applicable terms before submitting your booking.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
