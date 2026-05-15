import { z } from "zod";

// Book validation schema
export const BookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  author: z.string().min(1, "Author is required").max(200, "Author too long"),
  category: z.string().optional(),
  isbn: z.string().optional(),
  year: z.number().optional(),
  available: z.boolean().optional(),
  block: z.string().optional(),
  shelf: z.number().optional(),
  position: z.number().optional(),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
});

export type BookType = z.infer<typeof BookSchema>;

// Auth validation schema
export const LoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

// Query validation for books
export const BooksQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(20),
  search: z.string().optional(),
  category: z.string().optional(),
  available: z.coerce.boolean().optional(),
});

export type BooksQueryType = z.infer<typeof BooksQuerySchema>;

// Validation helper function
export const validateData = <T,>(schema: z.ZodSchema, data: unknown): T => {
  return schema.parse(data) as T;
};

// Safe validation (returns result with error info)
export const safeValidateData = <T,>(
  schema: z.ZodSchema,
  data: unknown
): { success: boolean; data?: T; errors?: string[] } => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data as T };
  }
  const errors = result.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
  return { success: false, errors };
};
