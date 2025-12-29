import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "../public")

function getDirectorySize(dir, sizes = {}) {
  if (!fs.existsSync(dir)) return sizes

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getDirectorySize(filePath, sizes)
    } else {
      const ext = path.extname(file).toLowerCase()
      if (![".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext)) continue

      if (!sizes[ext]) sizes[ext] = { count: 0, total: 0 }
      sizes[ext].count++
      sizes[ext].total += stat.size
    }
  }

  return sizes
}

console.log("[v0] Image Size Report for Creative Fusion LLC")
console.log("=".repeat(60))

const sizes = getDirectorySize(publicDir)
let grandTotal = 0

Object.entries(sizes).forEach(([ext, data]) => {
  const sizeInMB = (data.total / (1024 * 1024)).toFixed(2)
  const avgSize = (data.total / data.count / 1024).toFixed(1)
  console.log(
    `${ext.padEnd(8)} | Count: ${data.count.toString().padEnd(4)} | Total: ${sizeInMB.padStart(6)} MB | Avg: ${avgSize.padStart(7)} KB`,
  )
  grandTotal += data.total
})

console.log("=".repeat(60))
console.log(`TOTAL IMAGE SIZE: ${(grandTotal / (1024 * 1024)).toFixed(2)} MB`)
console.log(`\nEstimated reduction after optimization: 60-70%`)
console.log(`Optimized size: ${((grandTotal * 0.3) / (1024 * 1024)).toFixed(2)} MB`)
