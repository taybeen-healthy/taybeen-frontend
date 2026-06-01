# Taybeen Frontend

This is a production-ready Next.js frontend application. 
It uses the modern Next.js App Router and has been designed for scalable, enterprise-level development.

## Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Linting & Formatting:** ESLint & Next.js Core Web Vitals

## Folder Structure

```
├── src/
│   ├── app/          # Next.js App Router pages and layouts
│   ├── components/   # Reusable UI components
│   ├── features/     # Feature-based modules (domain logic, UI, hooks)
│   ├── lib/          # Third-party library configurations and generic utilities
│   ├── hooks/        # Reusable React hooks
│   ├── types/        # Global TypeScript types and interfaces
│   ├── constants/    # Global constants and config objects
│   ├── styles/       # Global CSS and Tailwind entry point
│   └── providers/    # Global React Context providers
```

## Getting Started

### 1. Install dependencies
Make sure you have `pnpm` installed. If not, install it via `npm install -g pnpm`.
```bash
pnpm install
```

### 2. Set up environment variables
Copy the example environment file:
```bash
cp .env.example .env.local
```

### 3. Run the development server
```bash
pnpm dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

## Build for Production
To create an optimized production build:
```bash
pnpm build
pnpm start
```

## Conventions
- **Absolute Imports:** Use the `@/` prefix to import files from the `src` directory (e.g., `import { cn } from "@/lib/utils"`).
- **Styling:** We use Tailwind CSS for all styling. Use the `cn()` utility in `@/lib/utils` to conditionally merge Tailwind classes safely.
