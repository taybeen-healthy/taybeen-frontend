# Taybeen Frontend

![Next.js](https://img.shields.io/badge/Next.js-14.2.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-0.378.0-FF6B6B?style=for-the-badge&logo=lucide&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Package_Manager-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Responsive](https://img.shields.io/badge/Design-Responsive-22C55E?style=for-the-badge)

**Live Demo:** [https://taybeen.com](https://taybeen.com)

A production-grade, fully responsive Next.js frontend application built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS — featuring a scalable component architecture, enterprise-level development patterns, and optimized performance.

---

## Tech Stack

### Core Framework & Runtime

| Technology | Version | Purpose |
| ---------- | ------- | ------- |
| Next.js | 14.2.3 | App Router, SSR/SSG, Image Optimization |
| React | 18.3.1 | UI Library with Server Components |
| TypeScript | 5.4.5 | Type Safety (strict mode) |
| Node.js | 18+ | Runtime |

### Styling & UI

| Technology | Version | Purpose |
| ---------- | ------- | ------- |
| Tailwind CSS | 3.4.3 | Utility-first CSS |
| Lucide React | 0.378.0 | Icon library |
| clsx | 2.1.1 | Conditional class composition |
| tailwind-merge | 2.3.0 | Intelligent Tailwind class merging |

### Package Manager

- **pnpm** (lockfile: `pnpm-lock.yaml`)

## Project Structure

```text
taybeen-frontend/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   └── page.tsx                 # Home page
│   │
│   ├── components/                  # Reusable UI components
│   │   └── (organized by feature)
│   │
│   ├── features/                    # Feature-based modules
│   │   └── (domain logic + UI + hooks)
│   │
│   ├── lib/                         # Utilities & helpers
│   │   └── utils.ts                 # Common utility functions
│   │
│   ├── hooks/                       # Reusable React hooks
│   │
│   ├── types/                       # Global TypeScript types
│   │
│   ├── constants/                   # Global constants
│   │
│   ├── styles/                      # Global CSS
│   │   └── globals.css              # Tailwind entry point
│   │
│   └── providers/                   # React Context providers
│
├── public/                          # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── package.json
├── tsconfig.json                    # TypeScript configuration
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.ts               # Tailwind configuration
├── postcss.config.mjs               # PostCSS configuration
├── pnpm-lock.yaml                   # pnpm lockfile
├── pnpm-workspace.yaml              # Workspace configuration
├── next-env.d.ts                    # Next.js type definitions
├── README.md                        # Project documentation
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- A modern web browser (Chrome, Edge, Firefox, Safari)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/taybeen-healthy/taybeen-frontend.git
   cd taybeen-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables (if needed)**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open the app in your browser**

   ```text
   http://localhost:3000
   ```

### Production Build

```bash
pnpm build
pnpm start
```

### Available Scripts

| Script | Command | Purpose |
| ------ | ------- | ------- |
| `dev` | `pnpm dev` | Start development server with hot reload |
| `build` | `pnpm build` | Create optimized production build |
| `start` | `pnpm start` | Serve production build locally |
| `lint` | `pnpm lint` | Run ESLint checks |
| `typecheck` | `pnpm typecheck` | Run TypeScript type checking |

## Conventions

- **Absolute Imports:** Use the `@/` prefix to import files from the `src` directory (e.g., `import { cn } from "@/lib/utils"`).
- **Styling:** We use Tailwind CSS for all styling. Use the `cn()` utility in `@/lib/utils` to conditionally merge Tailwind classes safely.
- **Component Structure:** Organize components by feature, with co-located styles and logic where possible.
- **TypeScript:** Enable strict mode for all TypeScript files. Ensure proper typing for React components and hooks.
- **File Naming:** Use kebab-case for file names and PascalCase for component names.

---

## Architecture & Patterns

### Component Model

- **Server Components** by default — better performance and reduced client bundle
- **Client Components** (`"use client"`) — only where needed for interactivity (hooks, event handlers, browser APIs)
- Clear separation of concerns between presentation and business logic

### Data Flow

- Static data files in `/src/constants/` for non-dynamic content
- API routes for backend communication (if applicable)
- React Context for global state management
- Custom hooks for reusable logic

### Performance Best Practices

- **Image Optimization** — Use Next.js `<Image>` component for automatic optimization
- **Code Splitting** — Leverage dynamic imports with `React.lazy()` for non-critical components
- **Caching Strategy** — Utilize Next.js built-in caching mechanisms
- **Bundle Analysis** — Monitor bundle size regularly

---

## UI & Design

- Built with **Tailwind CSS** — utility-first styling approach
- Responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Semantic HTML with proper accessibility attributes
- Clean, maintainable component structure
- Consistent design system through utility classes

---

## Security

- **HTTPS enforced** — Use HTTPS in production
- **Environment Variables** — Never commit sensitive data; use `.env.local` for secrets
- **Content Security Policy** — Configure CSP headers if needed
- **XSS Prevention** — React escapes content by default; use `dangerouslySetInnerHTML` carefully
- **No Hardcoded Secrets** — Keep API keys and credentials in environment variables

---

## Performance

### Optimization Techniques

- Next.js Image component with automatic format optimization
- Code splitting and lazy loading for routes
- Production builds with tree-shaking and minification
- Leveraging browser caching with proper headers
- Monitoring Core Web Vitals

### Caching Strategy

| Asset Type | Cache Duration | Strategy |
| ---------- | -------------- | -------- |
| Images | Long-term | Next.js automatic optimization |
| JS/CSS chunks | Hashed | Automatic cache busting by Next.js |
| Static files | As configured | Configurable in next.config.mjs |

---

## Customization

### Update Global Styles

Edit `src/styles/globals.css` to modify the global styling and Tailwind configuration.

### Add New Pages

1. Create a new directory under `src/app/`
2. Add a `page.tsx` file
3. Optionally add a `layout.tsx` for route-specific layouts

### Add New Components

1. Create a component file in `src/components/`
2. Export as a named export
3. Import using absolute imports (`@/`)

### Modify Tailwind Configuration

Edit `tailwind.config.ts` to customize:
- Color palette
- Fonts
- Breakpoints
- Spacing
- Custom utilities

---

## Troubleshooting

**Development server won't start**

- Ensure Node.js version is 18+
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check if port 3000 is already in use

**TypeScript errors in development**

- Run `pnpm typecheck` to see full type errors
- Ensure all dependencies have proper type definitions
- Check `tsconfig.json` is properly configured

**Tailwind CSS not applying styles**

- Verify Tailwind configuration includes the correct file paths
- Check that CSS file imports are in place
- Rebuild the project: `pnpm dev`
- Ensure class names are properly formatted

**Build fails**

- Check build logs for specific errors
- Clear build cache: `rm -rf .next`
- Verify all environment variables are set
- Run `pnpm typecheck` to identify type issues

---

## Roadmap

- Enhance component library with additional UI components
- Add comprehensive unit and integration tests
- Implement advanced state management solutions if needed
- Add internationalization (i18n) support
- Implement advanced logging and monitoring
- Optimize performance metrics further
- Add PWA capabilities
- Implement comprehensive error handling

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## Contact & Support

- **Repository:** [taybeen-healthy/taybeen-frontend](https://github.com/taybeen-healthy/taybeen-frontend)
- **Issues:** File an issue in the repository tracker
- **Website:** [https://taybeen.com](https://taybeen.com)

---

## Acknowledgments

- [Next.js](https://nextjs.org) by Vercel for the React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first styling system
- [React](https://react.dev) for the UI library
- [TypeScript](https://www.typescriptlang.org) for type safety
- [Lucide Icons](https://lucide.dev) for the icon library
- [pnpm](https://pnpm.io) for the package manager
- The open-source React and Next.js communities

---
