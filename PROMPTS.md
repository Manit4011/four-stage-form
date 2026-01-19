# AI Prompts Log

This document records the prompts used with an AI Mentor (Gemini) to build this project.

## Session 1: Project Initialization & Architecture

**Context:**
I provided the full task PDF "Edzy - Frontend Hackathon - Task 2" and requested a solution using Next.js App Router and plain JavaScript.

**Prompt:**
> "Build a 4-step student enrollment form using Next.js App Router (NOT pages router) and plain JavaScript.
> 
> Important constraints:
> - Use Next.js App Router
> - Use JavaScript only (no TypeScript)
> - Code must be very simple, readable, and beginner-friendly
> - Tech Stack: Next.js, React, react-hook-form, zod, Tailwind CSS, shadcn/ui
> 
> Folder Structure:
> app/enroll/ (step-1, step-2, step-3, review), context/, components/, schemas/
> 
> State Management:
> Use React Context and persist to localStorage.
> 
> Output complete working code and explain how data flows."

**Outcome:**
The AI provided the initial project structure, `FormContext` for state management, Zod schemas for validation, and the code for all 4 pages including the layout.

---

## Session 2: Debugging & UI Components

**Context:**
I encountered a `Module not found` error regarding the Alert component in the review page.

**Prompt:**
> "Error Message: Module not found: Can't resolve '@/components/ui/alert'
> ./app/enroll/review/page.js:8:1"

**Outcome:**
The AI identified that the shadcn `alert` component was not installed and provided the command:
`npx shadcn@latest add alert`

---

## Session 3: Documentation

**Context:**
I needed the required documentation files as per the hackathon deliverables.

**Prompt:**
> "Generate a readme.md and prompts.md file for this."

**Outcome:**
The AI generated this `PROMPTS.md` file and a comprehensive `README.md` covering setup, architecture, and assumptions.