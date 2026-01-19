import { z } from "zod";

export const step3Schema = z.object({
  pinCode: z.string().regex(/^\d{6}$/, "Must be a valid 6-digit PIN code"), // [cite: 63]
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(10, "Address must be at least 10 characters").max(120), // [cite: 58]
  
  guardianName: z.string().min(1, "Guardian name is required"),
  guardianMobile: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit mobile number"), // [cite: 64]
  
  paymentPlan: z.enum(["Quarterly", "Half-Yearly", "Annual"], {
    required_error: "Select a plan",
  }),
  paymentMode: z.enum(["UPI", "Card", "NetBanking"], {
    required_error: "Select a mode",
  }),
});