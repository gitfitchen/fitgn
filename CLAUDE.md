# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FitGN Rail** is a Next.js landing page for a mechanical locking system that stabilizes Gastronorm rails in kitchen equipment. The site features a dark theme, smooth animations (Framer Motion), and a responsive layout built with Tailwind CSS v4.

- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Type checking**: Strict TypeScript with path aliases (`@/*` → `./src/*`)
- **Styling**: Tailwind utilities with custom tokens in `globals.css`
- **Live site**: Runs on `localhost:3000` with hot reload during development

## Essential Commands

### Development
```bash
npm run dev          # Start dev server with hot reload (http://localhost:3000)
npm run build        # Produce production bundle; surfaces type/build errors
npm run start        # Run built app locally in production mode (verify before shipping)
npm run lint         # Run ESLint with Next.js config; fix violations before committing
```

### Testing
- **Automated tests**: Not yet wired up. Manual QA is the current approach.
- **When adding tests**: Use Jest or Vitest + React Testing Library.
  - Place specs in `src/__tests__` or co-locate as `*.test.tsx`
  - Ensure they run with `npm test` in CI
- **Current QA**: Exercise routes manually with `npm run dev`, then verify production build with `npm run build`

### Pre-commit Checklist
1. Run `npm run lint` and fix violations (or document inline if disabling rules)
2. Run `npm run build` to catch type errors and build issues
3. Manually test changed routes in `npm run dev`
4. Update documentation if adding environment variables or major features

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                      # Root layout (fonts, metadata, shared chrome)
│   ├── [locale]/                       # Dynamic locale routes (en, nl)
│   │   ├── layout.tsx                  # Locale-specific layout with i18n provider
│   │   ├── page.tsx                    # Home route (/) with StaticParams for SSG
│   │   ├── home-content.tsx            # Main landing page component (use client)
│   │   ├── privacy/page.mdx            # Privacy policy (supports MDX)
│   │   └── terms/page.mdx              # Terms of service (supports MDX)
│   ├── en/ & nl/                       # Static locale routes for backwards compatibility
│   ├── globals.css                     # Global styles and Tailwind config (@import "tailwindcss")
│   └── favicon.ico
├── i18n/
│   └── config.ts                       # Locale configuration & type definitions
├── messages/
│   ├── en.json                         # English i18n messages
│   └── nl.json                         # Dutch i18n messages
public/
├── images/
│   └── rail-hero.jpg                   # Hero section image (and similar assets)
└── logo.png                            # FitGN logo
middleware.ts                           # Locale routing middleware (next-intl)
next.config.ts                          # Next.js configuration
tsconfig.json                           # TypeScript compiler options with path alias @/*
eslint.config.mjs                       # ESLint config using Next.js presets
postcss.config.mjs                      # Tailwind CSS v4 via @tailwindcss/postcss
```

### Adding Routes
- Create new routes under `src/app/[locale]/<segment>/page.tsx` (locale-aware App Router)
- Use `generateStaticParams()` for static site generation per locale
- Co-locate route-specific UI components in the same folder
- For localized content, use `useTranslations()` hook from `next-intl` (in "use client" components)
- Shared UI lives in `src/components/` (create if needed)
- Global styles in `globals.css`; component-scoped CSS via Tailwind utilities

### Internationalization (i18n) with next-intl
- **Configuration**: `src/i18n/config.ts` defines supported locales (`en`, `nl`) and exports `isLocale()` type guard
- **Messages**: JSON translation files in `src/messages/{locale}.json` organized by section (e.g., `Home.hero.title`)
- **Middleware**: `middleware.ts` handles automatic locale detection and routing via `createMiddleware()`
- **Usage in client components**: Import `useTranslations()` for i18n strings and `useLocale()` for current locale
  ```tsx
  "use client";
  import { useTranslations, useLocale } from "next-intl";

  export default function MyComponent() {
    const t = useTranslations("SectionName");
    const locale = useLocale();
    return <h1>{t("key")}</h1>;
  }
  ```
- **Usage in server components**: Use `setRequestLocale()` to enable i18n in server-side code
  ```tsx
  import { setRequestLocale } from "next-intl/server";

  export default function Layout({ params }: Props) {
    const locale = params.locale;
    setRequestLocale(locale); // Enables i18n for this request
    // Now can use i18n in child server components
  }
  ```
- **Static generation**: Use `generateStaticParams()` in route layouts to pre-render all locale variants at build time

## Coding Conventions

### TypeScript & Components
- Write functional components in TypeScript with explicit types
- Use **PascalCase** for component names (e.g., `HeroBanner`, `Step`, `Spec`)
- Use **camelCase** for local helper functions inside components
- **Indent**: 2 spaces (matches `eslint` and `prettier` defaults)
- Target: ES2017 with DOM/DOM.iterable libraries

### Styling
- **Primary method**: Tailwind utility classes (v4)
- **Custom tokens**: Define in `globals.css` (e.g., CSS variables via `@theme inline`)
- **Component styles**: Inline Tailwind classes, not separate `.module.css` files
- **Responsive design**: Mobile-first with Tailwind breakpoints (`sm`, `md`, `lg`)
  - See `page.tsx` for examples: `sm:text-5xl lg:text-6xl`, `md:grid-cols-3`

### Example: Step Component (from page.tsx)
```tsx
function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10">
      <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
        {number}
      </span>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-base leading-relaxed text-white/70">{description}</p>
    </div>
  );
}
```

### Animation & Interactivity
- Use Framer Motion for entrance animations and transitions (already imported in `page.tsx`)
- Keep animations subtle and purposeful (see hero section with `motion.div`)
- Combine `transition` class with Tailwind for hover states

## Git & Commits

### Commit Style
Follow imperative, present-tense format:
- ✅ `Add landing hero layout`
- ✅ `Update email input placeholder`
- ✅ `Fix mobile spacing in footer`
- ❌ `Added`, `Fixed`, `Updated`

Keep subject lines under ~60 characters. Reference issues with `#123` in the body when relevant.

### Pull Request Template
- **Title**: Brief description of change
- **Description**: What changed and why
- **Testing done**: Commands run (`npm run lint`, `npm run build`, manual QA steps)
- **Screenshots/videos**: For UI changes (especially responsive breakpoints)
- **Review**: Request at least one review before merging

## Environment & Configuration

### Environment Variables
- Store local-only values in `.env.local` (gitignored)
- Never commit `.env*` files
- When adding new variables:
  1. Document expected keys in this file or `README.md`
  2. Update `next.config.ts` if runtime exposure is required
  3. Add type hints in `next-env.d.ts` if needed

### TypeScript Paths
- Alias `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Use `@/app/page.tsx` or `@/components/MyComponent` for imports (preferred over relative paths)

## Known Patterns & Conventions

### Translation Workflow
When adding new content or updating existing copy:
1. Add/update the key-value pairs in `src/messages/en.json`
2. Add corresponding Dutch translations in `src/messages/nl.json`
3. In components, use `const t = useTranslations("SectionName")` and reference keys with `t("key")`
4. For locale switching, use the `<select>` dropdown in the header which calls `router.push(`/${locale}`)` to switch language

### Landing Page Structure (home-content.tsx)
The current home page uses semantic sections with inline Framer Motion animations:
- **Header** – Logo and language selector (hardcoded `en`/`nl` options)
- **Hero section** – Main headline with CTA buttons and responsive grid layout for hero image
- **Problem section** – Problem statement with animation
- **Solution section** – Features overview with `Step` components (grid: 1 col mobile, 3 cols desktop)
- **Pilot section** – Email signup form with language-specific button text
- **Footer** – Company info, links, and copyright with current year

The `home-content.tsx` is a "use client" component that handles all client-side interactions (animations, form submission, locale switching).

### Image Optimization
- Use Next.js `Image` component for static/dynamic images
- Set `priority` for above-the-fold images (reduces LCP)
- Specify `sizes` prop for responsive images (improves Cumulative Layout Shift)
- Store images in `public/images/` with descriptive names

Example from hero:
```tsx
<Image
  src="/images/rail-hero.jpg"
  alt="FitGN Rail prototype installed in a bain-marie"
  fill
  priority
  sizes="(min-width: 1024px) 400px, 70vw"
  className="object-cover"
/>
```

### Responsive Layouts
- Mobile-first Tailwind: base styles apply to mobile, then override with `sm:`, `md:`, `lg:`
- Grid layouts: Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for responsive columns
- Spacing: `gap-6 md:gap-8` for responsive gaps

Example grid from page.tsx:
```tsx
<div className="grid gap-6 md:grid-cols-3">
  <Step ... />
  <Step ... />
  <Step ... />
</div>
```

## Linting & Code Quality

- ESLint runs on `.ts`, `.tsx`, `.mts` files
- Config includes Next.js core web vitals + TypeScript presets
- **Before committing**: Run `npm run lint` and fix all violations
- If disabling a rule is necessary, add an inline comment explaining why:
  ```tsx
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Intentionally omitting dependency; effect only runs once at mount
  ```

## Static Site Generation & Locale Routing

The project uses **Static Site Generation (SSG)** for all locale variants:
- `src/app/[locale]/page.tsx` uses `generateStaticParams()` to pre-render pages for both `en` and `nl` at build time
- `dynamicParams: false` prevents on-demand ISR; undefined locales return 404
- Middleware in `middleware.ts` automatically redirects `/` to `/{locale}` based on user preference
- The static `src/app/en/` and `src/app/nl/` folders provide legacy route support

When adding new `[locale]` routes, ensure they also export `generateStaticParams()` to avoid dynamic rendering at request time.

## Troubleshooting

### Type Errors
- Run `npm run build` to get full type report (more complete than IDE)
- Check `tsconfig.json` for `skipLibCheck: true` (third-party types are relaxed)

### Build Issues
- Clear `.next/` directory: `rm -rf .next && npm run build`
- Verify Node version matches `package.json` engines (if specified)
- Check for relative imports that should use `@/` alias

### Styles Not Applying
- Ensure Tailwind classes are spelled correctly (typos won't error, just won't apply)
- Check `globals.css` for conflicting CSS rules
- Verify Tailwind v4 syntax (`@import "tailwindcss"` at top of globals.css)

### Port 3000 Already in Use
```bash
lsof -i :3000          # Find process using port
kill -9 <PID>          # Kill the process (use actual PID)
npm run dev            # Restart dev server
```

## Related Documentation

- **AGENTS.md**: High-level repository guidelines and conventions
- **Next.js Docs**: https://nextjs.org/docs (App Router, Image optimization, deployment)
- **Tailwind CSS**: https://tailwindcss.com (v4 with new @theme syntax)
- **Framer Motion**: https://www.framer.com/motion (animation docs)
