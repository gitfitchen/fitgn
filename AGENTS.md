# Repository Guidelines

## Project Structure & Module Organization
`src/app` houses the App Router entry point; `layout.tsx` defines shared chrome and `page.tsx` is the home route. Group future routes under `src/app/<segment>` and co-locate UI with route code. Global styles live in `src/app/globals.css` (Tailwind v4 via `@tailwindcss/postcss`). Static media belongs in `public/`, and configuration lives at the repo root (`next.config.ts`, `tsconfig.json`, lint/postcss configs).

## Build, Test, and Development Commands
Use `npm run dev` for the local dev server with hot reload on http://localhost:3000. `npm run build` generates the production bundle and surfaces type errors. `npm run start` runs the built app in production mode; always run this once before shipping. `npm run lint` executes ESLint with the Next.js config; fix or justify any violations.

## Coding Style & Naming Conventions
Write components in TypeScript with 2-space indentation, and prefer functional components with descriptive PascalCase names (e.g., `HeroBanner`). Local helpers inside a component should be camelCase. Tailwind utility classes are the baseline styling approach; keep custom CSS tokens in `globals.css`. Run `npm run lint` before committing and avoid disabling rules unless the change is documented inline.

## Testing Guidelines
Automated tests are not yet wired up. When adding one, use Jest or Vitest with React Testing Library, place specs under `src/__tests__` or alongside components as `*.test.tsx`, and ensure they run in CI via `npm test`. Until then, manually verify new work by exercising the affected routes in `npm run dev` and checking the production build with `npm run build`.

## Commit & Pull Request Guidelines
Follow the existing imperative, present-tense commit style (e.g., `Add landing hero layout`) and keep subjects under ~60 characters. Reference GitHub issues with `#123` in the body when relevant. Pull requests should describe the change, list testing done (`npm run lint`, manual QA steps), and include screenshots or recordings for UI tweaks. Request at least one review before merging, even for small updates.

## Environment & Secrets
Store local-only values in `.env.local`; never commit `.env*` files. When introducing new environment variables, document expected keys in `README.md` and update `next.config.ts` if runtime exposure is required.
