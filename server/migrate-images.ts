import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadsDir = path.join(__dirname, "..", "public", "uploads");
const booksPath = path.join(__dirname, "..", "books.json");

async function migrateImagesToCloudinary() {
  console.log("🚀 Starting migration of images to Cloudinary...\n");

  // Read existing books
  const booksData = fs.readFileSync(booksPath, "utf-8");
  const books = JSON.parse(booksData);

  // Read local images
  if (!fs.existsSync(uploadsDir)) {
    console.log("❌ No uploads directory found");
    return;
  }

  const localFiles = fs.readdirSync(uploadsDir);
  if (localFiles.length === 0) {
    console.log("⚠️ No local images found to migrate");
    return;
  }

  console.log(`📸 Found ${localFiles.length} local images\n`);

  const urlMapping = {};
  let uploadedCount = 0;

  // Upload each image to Cloudinary
  for (const filename of localFiles) {
    const filePath = path.join(uploadsDir, filename);

    try {
      console.log(`📤 Uploading: ${filename}`);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "book-finder",
        public_id: filename.split(".")[0],
        overwrite: true,
        resource_type: "auto",
      });

      const oldUrl = `/uploads/${filename}`;
      const newUrl = result.secure_url;

      urlMapping[oldUrl] = newUrl;
      uploadedCount++;

      console.log(`✅ Uploaded: ${newUrl}\n`);
    } catch (error) {
      console.error(`❌ Error uploading ${filename}:`, error.message);
    }
  }

  // Update books.json with new URLs
  console.log("\n🔄 Updating books.json with new Cloudinary URLs...\n");

  const updatedBooks = books.map((book) => {
    if (book.coverUrl && urlMapping[book.coverUrl]) {
      const oldUrl = book.coverUrl;
      const newUrl = urlMapping[oldUrl];
      console.log(`📖 Book "${book.title}":`);
      console.log(`   Old: ${oldUrl}`);
      console.log(`   New: ${newUrl}\n`);
      return { ...book, coverUrl: newUrl };
    }
    return book;
  });

  fs.writeFileSync(booksPath, JSON.stringify(updatedBooks, null, 2), "utf-8");

  console.log("✅ Migration complete!");
  console.log(`📊 Summary:`);
  console.log(`   - Images uploaded: ${uploadedCount}`);
  console.log(`   - Books updated: ${Object.keys(urlMapping).length}`);
  console.log(`   - books.json saved ✓\n`);
  console.log("🎉 All images are now hosted on Cloudinary!");
}

migrateImagesToCloudinary().catch(console.error);
