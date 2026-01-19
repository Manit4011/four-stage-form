import { z } from "zod";

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be less than 60 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"), // [cite: 39]
  
  email: z.string().email("Please enter a valid email address"), // [cite: 31]
  
  // Regex for India mobile numbers (6-9 followed by 9 digits) [cite: 38]
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"),
  
  studentClass: z.enum(["9", "10", "11", "12"], {
    required_error: "Please select a class",
  }), // [cite: 33]
  
  board: z.enum(["CBSE", "ICSE", "State Board"], {
    required_error: "Please select a board",
  }), // [cite: 34]
  
  language: z.enum(["English", "Hindi", "Hinglish"], {
    required_error: "Please select a language",
  }),
});