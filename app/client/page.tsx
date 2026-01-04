import { redirect } from "next/navigation"

export default async function ClientPage() {
  redirect("/client/dashboard")
}
