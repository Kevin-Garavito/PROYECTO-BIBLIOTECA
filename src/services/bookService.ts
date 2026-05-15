import type { Book } from "@/data/books";

const API_BASE = "http://localhost:3001/api";

export const bookService = {
  // Get all books
  async getBooks(): Promise<Book[]> {
    const res = await fetch(`${API_BASE}/books`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  },

  // Get single book
  async getBook(id: string): Promise<Book> {
    const res = await fetch(`${API_BASE}/books/${id}`);
    if (!res.ok) throw new Error("Book not found");
    return res.json();
  },

  // Create book
  async createBook(book: Omit<Book, "id">): Promise<Book> {
    const res = await fetch(`${API_BASE}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to create book");
    return res.json();
  },

  // Update book
  async updateBook(id: string, book: Omit<Book, "id">): Promise<Book> {
    const res = await fetch(`${API_BASE}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to update book");
    return res.json();
  },

  // Delete book
  async deleteBook(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/books/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete book");
  },

  // Upload cover image
  async uploadCover(id: string, file: File): Promise<{ coverUrl: string }> {
    const formData = new FormData();
    formData.append("cover", file);

    const res = await fetch(`${API_BASE}/books/${id}/cover`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload cover");
    return res.json();
  },
};
