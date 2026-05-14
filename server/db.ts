import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Book } from "../src/data/books.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "books.json");

// Ensure database file exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2), "utf-8");
}

export function loadBooks(): Book[] {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveBooks(books: Book[]): void {
  fs.writeFileSync(dbPath, JSON.stringify(books, null, 2), "utf-8");
}

export function getBook(id: string): Book | undefined {
  const books = loadBooks();
  return books.find((b) => b.id === id);
}

export function createBook(book: Book): Book {
  const books = loadBooks();
  books.push(book);
  saveBooks(books);
  return book;
}

export function updateBook(id: string, updates: Partial<Book>): Book | null {
  const books = loadBooks();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;
  
  const updatedBook = { ...books[index], ...updates };
  books[index] = updatedBook;
  saveBooks(books);
  return updatedBook;
}

export function deleteBook(id: string): boolean {
  const books = loadBooks();
  const filtered = books.filter((b) => b.id !== id);
  if (filtered.length === books.length) return false;
  saveBooks(filtered);
  return true;
}

export function initializeDatabase(sampleBooks: Book[]): void {
  if (loadBooks().length === 0) {
    saveBooks(sampleBooks);
    console.log("✓ Database initialized with sample books");
  } else {
    console.log("✓ Database already exists");
  }
}

