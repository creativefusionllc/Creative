import sharp from "sharp"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "../public")
const imageDirs = [path.join(publicDir, "images"), path.join(publicDir, "portfolio"), path.join(publicDir, "team")]

// Configuration for optimization
const compressionConfig = {
  webp: { quality: 80 },
  jpeg: { quality: 75, progressive: true },
  png: { compressionLevel: 9 },
}

async function optimizeImage(filePath) {
  try {
    const filename = path.basename(filePath)
    const ext = path.extname(filename).toLowerCase()
    const filesize = fs.statSync(filePath).size

    // Skip if already WebP or small enough
    if (ext === ".webp" || filesize < 50000) {
      console.log(`[v0] Skipping ${filename} (already optimized)`)
      return
    }

    const outputDir = path.dirname(filePath)
    const nameWithoutExt = path.basename(filename, ext)

    // Convert to WebP
    const webpPath = path.join(outputDir, `${nameWithoutExt}.webp`)
    await sharp(filePath).webp(compressionConfig.webp).toFile(webpPath)

    // Compress original if JPEG/PNG
    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      if (ext === ".png") {
        await sharp(filePath).png(compressionConfig.png).toFile(filePath)
      } else {
        await sharp(filePath).jpeg(compressionConfig.jpeg).toFile(filePath)
      }
    }

    const webpSize = fs.statSync(webpPath).size
    const compression = ((1 - webpSize / filesize) * 100).toFixed(1)
    console.log(
      `[v0] Optimized ${filename}: ${(filesize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${compression}% smaller)`,
    )
  } catch (err) {
    console.error(`[v0] Error optimizing ${filePath}:`, err.message)
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`[v0] Directory not found: ${dir}`)
    return
  }

  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      await processDirectory(filePath)
    } else if ([".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(file).toLowerCase())) {
      await optimizeImage(filePath)
    }
  }
}

async function main() {
  console.log("[v0] Starting image optimization...")
  console.log(`[v0] Processing directories: ${imageDirs.join(", ")}`)

  for (const dir of imageDirs) {
    await processDirectory(dir)
  }

  console.log("[v0] Image optimization complete!")
}

main().catch((err) => console.error("[v0] Error:", err))
