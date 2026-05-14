import { sampleBooks } from "../src/data/books.js";
import { saveBooks } from "./db.js";

// Clear and reseed database with sample books
saveBooks(sampleBooks);

console.log(`✓ Seeded database with ${sampleBooks.length} books`);
process.exit(0);
