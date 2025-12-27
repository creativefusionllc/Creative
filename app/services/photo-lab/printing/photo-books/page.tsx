import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Photo Books Dubai | Photo Lab | Creative Fusion LLC",
  description:
    "Professional photo books and albums in Dubai. Hardcover, softcover, and lay-flat photo books for weddings, events, and portfolios.",
}

export default function PhotoBooksPage() {
  return (
    <div className="container py-12">
      <h1>Photo Books</h1>
      <p>Custom photo books and albums for preserving your memories.</p>
    </div>
  )
}
