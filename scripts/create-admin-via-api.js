// This script creates the super admin account by calling the API endpoint
// Run this in your browser console or as a Node.js script after deployment

async function createSuperAdmin() {
  const response = await fetch("https://creativefusion.llc/api/create-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "admin@creativefusion.llc",
      password: "Admin@123456",
    }),
  })

  const data = await response.json()
  console.log("Admin creation response:", data)

  if (data.success) {
    console.log("✅ Super admin account created successfully!")
    console.log("Email: admin@creativefusion.llc")
    console.log("Password: Admin@123456")
    console.log("Login at: https://creativefusion.llc/admin")
  } else {
    console.log("❌ Error:", data.error)
  }
}

// Run the function
createSuperAdmin()
