import { z } from "zod";

// We create a function so we can pass the student's class for dynamic validation logic
export const createStep2Schema = (studentClass) => {
  return z.object({
    subjects: z
      .array(z.string())
      .refine((val) => val.length > 0, "Select at least one subject")
      .superRefine((val, ctx) => {
        // Validation Rule: Class 9-10 needs min 2 subjects, 11-12 needs min 3 [cite: 50]
        const minSubjects = ["11", "12"].includes(studentClass) ? 3 : 2;
        if (val.length < minSubjects) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Class ${studentClass} students must select at least ${minSubjects} subjects`,
          });
        }
      }),
      
    examGoal: z.enum(["Board Excellence", "Concept Mastery", "Competitive Prep"], {
      required_error: "Please select a goal",
    }),

    studyHours: z.coerce // coerce converts string input to number
      .number()
      .min(1, "At least 1 hour")
      .max(40, "Max 40 hours"),

    hasScholarship: z.boolean().default(false), // [cite: 45]

    // Conditional fields: nullable because they might be hidden
    lastExamScore: z.coerce.number().min(0).max(100).nullable().optional(),
    achievements: z.string().optional(),
  }).superRefine((data, ctx) => {
    // If scholarship is Yes, Score is required [cite: 51]
    if (data.hasScholarship) {
      if (data.lastExamScore === null || data.lastExamScore === undefined || isNaN(data.lastExamScore)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["lastExamScore"],
          message: "Score is required for scholarship applicants",
        });
      }
    }
  });
};