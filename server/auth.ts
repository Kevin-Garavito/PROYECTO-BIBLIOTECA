import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

// Token payload interface
export interface TokenPayload {
  role: "admin" | "user";
  iat: number;
  exp: number;
}

// Generate JWT token
export const generateToken = (role: "admin" | "user" = "admin"): string => {
  return jwt.sign({ role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

// Verify admin password (for backward compatibility with current system)
export const verifyAdminPassword = (password: string): boolean => {
  const correctPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === correctPassword;
};

// Hash password (for future use when migrating to proper auth)
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

// Compare password with hash
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Middleware to verify JWT token
export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = decoded;
  next();
};

// Middleware to verify admin role
export const adminMiddleware = (req: any, res: any, next: any) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin role required" });
  }
  next();
};

export default {
  generateToken,
  verifyToken,
  verifyAdminPassword,
  hashPassword,
  comparePassword,
  authMiddleware,
  adminMiddleware,
};
