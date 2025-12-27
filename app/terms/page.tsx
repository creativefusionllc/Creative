import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Creative Fusion LLC services in Dubai, UAE and GCC region.",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: December 13, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Creative Fusion LLC services, you agree to be bound by these Terms and
                Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
              <p className="text-gray-700 mb-4">
                Creative Fusion LLC provides creative services including branding, digital marketing, web development,
                photography, videography, and related services in Dubai, UAE and GCC region.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Payment terms are specified in individual service agreements. Generally, a deposit is required before
                project commencement, with final payment due upon project completion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                Upon full payment, clients receive rights to use deliverables as specified in the project agreement.
                Creative Fusion LLC retains the right to showcase work in portfolio unless otherwise agreed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Revisions</h2>
              <p className="text-gray-700 mb-4">
                Each project includes a specified number of revision rounds. Additional revisions may incur extra
                charges as outlined in the service agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Creative Fusion LLC shall not be liable for any indirect, incidental, or consequential damages arising
                from the use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms & Conditions, please contact us at:
                <br />
                Email: info@creativefusion.llc
                <br />
                Phone: +971 58 117 4911
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-[#C4D600] hover:underline font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
