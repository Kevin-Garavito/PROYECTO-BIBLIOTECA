import { describe, it, expect } from "vitest";
import { verifyAdminPassword, generateToken, verifyToken } from "../auth.js";

describe("Authentication Module", () => {
  describe("verifyAdminPassword", () => {
    it("should return true for correct password", () => {
      process.env.ADMIN_PASSWORD = "admin123";
      expect(verifyAdminPassword("admin123")).toBe(true);
    });

    it("should return false for incorrect password", () => {
      process.env.ADMIN_PASSWORD = "admin123";
      expect(verifyAdminPassword("wrongpassword")).toBe(false);
    });
  });

  describe("JWT Token Generation and Verification", () => {
    it("should generate a valid JWT token", () => {
      const token = generateToken("admin");
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
    });

    it("should verify a valid JWT token", () => {
      const token = generateToken("admin");
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded?.role).toBe("admin");
    });

    it("should return null for invalid token", () => {
      const decoded = verifyToken("invalid.token.here");
      expect(decoded).toBeNull();
    });

    it("should include correct role in token", () => {
      const token = generateToken("user");
      const decoded = verifyToken(token);
      
      expect(decoded?.role).toBe("user");
    });
  });
});
