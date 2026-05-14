import { describe, it, expect } from "vitest";
import { BookSchema, LoginSchema, safeValidateData } from "../validation.js";

describe("Validation Module", () => {
  describe("BookSchema", () => {
    it("should validate a correct book object", () => {
      const validBook = {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        isbn: "978-0743273565",
        year: 1925,
      };

      const result = safeValidateData(BookSchema, validBook);
      expect(result.success).toBe(true);
      expect(result.data?.title).toBe("The Great Gatsby");
    });

    it("should reject book without title", () => {
      const invalidBook = {
        author: "F. Scott Fitzgerald",
      };

      const result = safeValidateData(BookSchema, invalidBook);
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it("should reject book without author", () => {
      const invalidBook = {
        title: "The Great Gatsby",
      };

      const result = safeValidateData(BookSchema, invalidBook);
      expect(result.success).toBe(false);
    });
  });

  describe("LoginSchema", () => {
    it("should validate a correct login object", () => {
      const validLogin = {
        password: "admin123",
      };

      const result = safeValidateData(LoginSchema, validLogin);
      expect(result.success).toBe(true);
      expect(result.data?.password).toBe("admin123");
    });

    it("should reject login without password", () => {
      const invalidLogin = {};

      const result = safeValidateData(LoginSchema, invalidLogin);
      expect(result.success).toBe(false);
    });

    it("should reject empty password", () => {
      const invalidLogin = {
        password: "",
      };

      const result = safeValidateData(LoginSchema, invalidLogin);
      expect(result.success).toBe(false);
    });
  });
});
