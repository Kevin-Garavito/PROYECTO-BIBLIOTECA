import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { loadBooks, saveBooks, getBook, createBook, updateBook, deleteBook, initializeDatabase } from "./db.js";
import { sampleBooks } from "../src/data/books.js";
import type { Book } from "../src/data/books.js";
import logger from "./logger.js";
import { apiLimiter, loginLimiter, uploadLimiter } from "./rateLimiter.js";
import { generateToken, verifyAdminPassword } from "./auth.js";
import { BookSchema, LoginSchema, safeValidateData } from "./validation.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadsDir = path.join(__dirname, "..", "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

// Middleware - CORS first
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Rate limiting middleware (skip upload routes for now)
app.use((req, res, next) => {
  if (!req.path.includes("/api/upload")) {
    apiLimiter(req, res, next);
  } else {
    next();
  }
});

// Upload image route - BEFORE body parsers
app.post("/api/upload", uploadLimiter, (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      logger.error(`Upload error: ${err.message}`);
      if (err.message.includes("Invalid file type")) {
        return res.status(400).json({ error: "Solo se permiten imágenes (JPEG, PNG, GIF, WebP)" });
      }
      if (err.message.includes("LIMIT_FILE_SIZE")) {
        return res.status(400).json({ error: "El archivo es muy grande. Máximo 10MB" });
      }
      return res.status(400).json({ error: err.message });
    }
    
    try {
      if (!req.file) {
        logger.warn("Upload attempted without file");
        return res.status(400).json({ error: "No file provided" });
      }
      const imageUrl = `/uploads/${req.file.filename}`;
      logger.info(`File uploaded successfully: ${req.file.filename}`);
      res.json({ url: imageUrl });
    } catch (error) {
      logger.error(`Error uploading file: ${error}`);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });
});

// Body parsers - AFTER upload route
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "..", "public", "uploads")));

// Initialize database
initializeDatabase(sampleBooks);

// ==================== AUTH ROUTES ====================

// Login endpoint (generates JWT token)
app.post("/api/auth/login", loginLimiter, (req, res) => {
  try {
    const validation = safeValidateData(LoginSchema, req.body);
    if (!validation.success) {
      logger.warn(`Login failed: ${validation.errors?.join(", ")}`);
      return res.status(400).json({ error: "Invalid input", errors: validation.errors });
    }

    if (!verifyAdminPassword(validation.data!.password)) {
      logger.warn("Invalid login attempt");
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken("admin");
    logger.info("Admin login successful");
    res.json({ token, role: "admin", message: "Login successful" });
  } catch (error) {
    logger.error(`Login error: ${error}`);
    res.status(500).json({ error: "Login failed" });
  }
});

// ==================== BOOKS ROUTES ====================

// Get all books
app.get("/api/books", (_req, res) => {
  try {
    const books = loadBooks();
    logger.info(`Fetched ${books.length} books`);
    res.json(books);
  } catch (error) {
    logger.error(`Error fetching books: ${error}`);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Get single book
app.get("/api/books/:id", (req, res) => {
  try {
    const book = getBook(req.params.id);
    if (!book) {
      logger.warn(`Book not found: ${req.params.id}`);
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    logger.error(`Error fetching book: ${error}`);
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

// Create book
app.post("/api/books", (req, res) => {
  try {
    const validation = safeValidateData(BookSchema, req.body);
    if (!validation.success) {
      logger.warn(`Book creation failed: ${validation.errors?.join(", ")}`);
      return res.status(400).json({ error: "Invalid input", errors: validation.errors });
    }

    const id = Date.now().toString();
    const newBook: Book = {
      id,
      title: validation.data!.title,
      author: validation.data!.author,
      category: validation.data!.category || "",
      isbn: validation.data!.isbn || "",
      year: validation.data!.year,
      available: validation.data!.available ?? true,
      block: validation.data!.block || "",
      shelf: validation.data!.shelf || "",
      position: validation.data!.position || "",
      description: validation.data!.description || "",
      coverUrl: validation.data!.coverUrl || "",
    };

    const savedBook = createBook(newBook);
    logger.info(`Book created: ${savedBook.id}`);
    res.status(201).json(savedBook);
  } catch (error) {
    logger.error(`Error creating book: ${error}`);
    res.status(500).json({ error: "Failed to create book" });
  }
});

// Update book
app.put("/api/books/:id", (req, res) => {
  try {
    const validation = safeValidateData(BookSchema, req.body);
    if (!validation.success) {
      logger.warn(`Book update failed: ${validation.errors?.join(", ")}`);
      return res.status(400).json({ error: "Invalid input", errors: validation.errors });
    }

    const book = getBook(req.params.id);
    if (!book) {
      logger.warn(`Update failed: Book not found ${req.params.id}`);
      return res.status(404).json({ error: "Book not found" });
    }

    const updates = {
      title: validation.data!.title,
      author: validation.data!.author,
      category: validation.data!.category,
      isbn: validation.data!.isbn,
      year: validation.data!.year,
      available: validation.data!.available,
      block: validation.data!.block,
      shelf: validation.data!.shelf,
      position: validation.data!.position,
      description: validation.data!.description,
      coverUrl: validation.data!.coverUrl || book.coverUrl,
    };

    const updatedBook = updateBook(req.params.id, updates);
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    logger.info(`Book updated: ${req.params.id}`);
    res.json(updatedBook);
  } catch (error) {
    logger.error(`Error updating book: ${error}`);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Delete book
app.delete("/api/books/:id", (req, res) => {
  try {
    const book = getBook(req.params.id);
    if (!book) {
      logger.warn(`Delete failed: Book not found ${req.params.id}`);
      return res.status(404).json({ error: "Book not found" });
    }

    // Delete cover image if it exists
    if (book.coverUrl && book.coverUrl.startsWith("/uploads/")) {
      const imagePath = path.join(__dirname, "..", "public", book.coverUrl);
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
          logger.info(`Deleted cover image: ${book.coverUrl}`);
        } catch (err) {
          logger.warn(`Could not delete image: ${err}`);
        }
      }
    }

    if (deleteBook(req.params.id)) {
      logger.info(`Book deleted: ${req.params.id}`);
      res.json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    logger.error(`Error deleting book: ${error}`);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Upload book cover image
app.post("/api/books/:id/cover", uploadLimiter, upload.single("cover"), (req, res) => {
  try {
    if (!req.file) {
      logger.warn("Cover upload attempted without file");
      return res.status(400).json({ error: "No file provided" });
    }

    const book = getBook(req.params.id);
    if (!book) {
      logger.warn(`Cover upload failed: Book not found ${req.params.id}`);
      return res.status(404).json({ error: "Book not found" });
    }

    // Delete old cover if it exists
    if (book.coverUrl && book.coverUrl.startsWith("/uploads/")) {
      const imagePath = path.join(__dirname, "..", "public", book.coverUrl);
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          logger.warn(`Could not delete old image: ${err}`);
        }
      }
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const updated = updateBook(req.params.id, { coverUrl: imageUrl });

    if (!updated) {
      return res.status(404).json({ error: "Book not found" });
    }

    logger.info(`Cover uploaded for book ${req.params.id}: ${req.file.filename}`);
    res.json({ coverUrl: imageUrl });
  } catch (error) {
    logger.error(`Error uploading cover: ${error}`);
    res.status(500).json({ error: "Failed to upload cover" });
  }
});

// ==================== HEALTH CHECK ====================

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Error handling middleware
app.use((_err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(`Server error: ${_err}`);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`✓ Server running on http://localhost:${PORT}`);
  logger.info(`✓ API: http://localhost:${PORT}/api`);
  logger.info(`✓ Auth endpoint: POST http://localhost:${PORT}/api/auth/login`);
});
