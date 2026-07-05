# Neylon AI Client

Neylon AI Client is a reusable frontend infrastructure for a B2B chatbot and AI support assistant. It combines a public marketing site with an embeddable-style chat widget that can capture leads, answer customer questions, stream AI responses, preserve conversation threads, and connect to a backend orchestration service.

The repo is intentionally structured as infrastructure, not just a single static website. Teams can reuse the widget shell, state stores, API contracts, authentication flow, and modular screen registry to build customer support bots, lead qualification agents, appointment assistants, onboarding copilots, or other business-facing AI agents.

## What This Project Provides

- **B2B AI chatbot widget** with floating launcher, mobile full-screen layout, desktop collapsed/expanded states, and tab-based navigation.
- **Streaming chat experience** that consumes orchestration events and renders assistant tokens as they arrive.
- **Conversation threads** for loading previous customer conversations and continuing an existing chat.
- **Google authentication** using `@react-oauth/google`, cookie-backed backend sessions, and persisted client session state.
- **Typed backend API contracts** generated with `openapi-typescript`.
- **Modular widget architecture** where tabs and screens are registered independently, making it easy to add new surfaces such as Contact, Settings, Feedback, or custom agent workflows.
- **Prompt suggestions** for guiding business users toward common AI/support questions.
- **Markdown rendering** for rich assistant responses, including GFM and line-break support.
- **Global success/error alerts** through a shared Zustand store.
- **Responsive landing page** for explaining use cases such as FAQ automation, lead capture, support tickets, appointment booking, and unified customer dashboards.
- **Design system base** using Tailwind CSS, shadcn-style UI components, Radix primitives, and Lucide icons.
- **Prepared database tooling** with Drizzle scripts/config for teams that want to extend the client into a full-stack app.

## Why It Is Infrastructure

Many businesses want a ready-to-use AI chatbot layer, but still need enough control to customize the brand, backend, agent behavior, auth, and conversation model. This repo separates those concerns:

- **UI shell:** reusable chat launcher, widget container, tabs, headers, input controls, loaders, and conversation rendering.
- **State layer:** isolated Zustand stores for session, widget UI, input, threads, messages, and alerts.
- **Integration layer:** service helpers and typed API schema for backend auth, thread retrieval, and AI orchestration.
- **Product layer:** landing sections that communicate business outcomes without coupling them to the chat runtime.
- **Extension layer:** commented/scaffolded widget screens and registry-driven navigation for adding future tabs without rewriting the widget.

That makes it suitable as a starting point for agencies, SaaS teams, or internal platform teams building AI assistants for multiple clients.

## Current Features

### Chatbot and Conversation

- Floating `Ask AI` launcher available globally from the root layout.
- Home tab with intro content, business CTAs, insights, and social/contact links.
- Messages tab with thread list and individual conversation screen.
- New chat flow that posts user input to the backend orchestration endpoint.
- Streaming assistant responses using custom event chunks separated by `<|END_OF_EVENT|>`.
- Handles orchestration events such as:
  - `threadCreated`
  - `thinkingPhase`
  - `assistantResponse`
  - `fileUrls`
  - `done`
  - `error`
- Live assistant thinking indicator with configurable thinking phases.
- Markdown rendering for assistant messages.
- Copy button for assistant responses.
- Auto-scroll behavior with a scroll-to-bottom affordance.
- Input validation with a 1500-character limit.
- Prompt suggestion carousel.

### Authentication and Session

- Google OAuth login button in the navigation.
- Login/logout helpers in `src/lib/services/google-auth.ts`.
- Session validation against `/api/v1/me/` on layout mount.
- Persisted session store under the `neylon-session` key.
- Middleware redirect for protected routes when no Auth.js session cookie is present.

### Business Use Cases Represented

- FAQ automation.
- Automatic lead capture.
- Customer support request handling.
- Appointment booking automation.
- Unified customer conversation dashboard.
- Website engagement assistant.
- Multi-model/AI-provider positioning through landing-page assets and content.

### Developer Experience

- Next.js App Router.
- React 19 and TypeScript.
- Tailwind CSS 4.
- Zustand for client state.
- shadcn-style component aliases.
- OpenAPI-generated TypeScript types.
- Drizzle scripts prepared for PostgreSQL-backed extensions.
- pnpm workspace setup.

## Tech Stack

- **Framework:** Next.js 15
- **UI:** React 19, Tailwind CSS 4, Radix UI, Lucide React
- **State:** Zustand
- **Forms and validation:** React Hook Form, Zod
- **Auth client:** `@react-oauth/google`
- **API typing:** `openapi-typescript`
- **Markdown:** `react-markdown`, `remark-gfm`, `remark-breaks`
- **Charts:** Recharts
- **Database tooling:** Drizzle Kit, Drizzle ORM, PostgreSQL packages
- **Video:** `next-video`

## Folder Structure

```text
.
├── public/                         # Static public assets
├── videos/                         # next-video metadata/assets
├── src/
│   ├── app/
│   │   ├── globals.css             # Tailwind/global styles
│   │   ├── layout.tsx              # Root providers, navbar, global AI widget
│   │   ├── layout-wrapper.tsx      # Session validation and global alerts
│   │   └── page.tsx                # Landing page composition
│   ├── assets/
│   │   ├── fonts/                  # Local brand fonts
│   │   ├── images/                 # Brand, hero, model, and marketing images
│   │   └── fonts.ts                # next/font local font exports
│   ├── components/
│   │   ├── alerts/                 # Success/failure alert UI
│   │   ├── landing-page/           # Hero, features, FAQ, CTA, footer sections
│   │   ├── navigation/             # Navbar and auth navigation
│   │   ├── ui/                     # Reusable shadcn-style primitives
│   │   └── widget/                 # Chat widget runtime and screens
│   ├── hooks/
│   │   ├── use-message-handler.ts  # Streaming chat/orchestration logic
│   │   ├── use-widget-navigation.ts # Widget stack navigation helper
│   │   ├── use-google-auth-handler.ts
│   │   └── use-audio-recorder.ts   # Scaffold for voice input extensions
│   ├── lib/
│   │   ├── services/               # Backend service helpers
│   │   ├── types/                  # OpenAPI-generated schema and aliases
│   │   ├── constants.ts            # Widget tabs/screens, FAQs, thinking phases
│   │   └── utils.ts                # Shared utility helpers
│   ├── store/
│   │   ├── error-store.ts          # Global alert state
│   │   ├── input-store.ts          # Chat input state
│   │   ├── session-store.ts        # Persisted auth/session state
│   │   ├── thread-store.ts         # Thread and message state
│   │   └── widget-store.ts         # Widget UI and navigation state
│   └── middleware.ts               # Auth-aware route middleware
├── components.json                 # shadcn-style aliases/config
├── drizzle.config.ts               # Drizzle PostgreSQL config
├── next.config.ts                  # Next.js image/video config
├── package.json
└── tsconfig.json
```

## Widget Architecture

The widget is mounted globally in `src/app/layout.tsx` through `AIChat`.

Core files:

- `src/components/widget/widget-toggle.tsx` controls the floating launcher.
- `src/components/widget/widget.tsx` owns the widget container, tab registry, active screen rendering, and bottom navigation.
- `src/hooks/use-widget-navigation.ts` provides stack-based navigation between widget screens.
- `src/store/widget-store.ts` stores open/collapse state, active tab, screen stacks, typing status, and thinking phase.
- `src/hooks/use-message-handler.ts` owns the streaming chat lifecycle.

The registry pattern in `widget.tsx` is the main extension point:

```ts
const TabsRegistry = {
  Home: {
    screens: {
      [WidgetScreens.HomeScreens.Home]: WidgetHome,
    },
    default: WidgetScreens.HomeScreens.Home,
  },
  Messages: {
    screens: {
      [WidgetScreens.MessagesScreens.Threads]: WidgetThreads,
      [WidgetScreens.MessagesScreens.Messages]: WidgetMessages,
    },
    default: WidgetScreens.MessagesScreens.Messages,
  },
};
```

Contact and Settings screens already exist as files/scaffolds and can be enabled by adding them back to `WidgetTabs`, `tabStacks`, and `TabsRegistry`.

## Backend API Contract

The frontend expects a backend available at:

```env
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

Used endpoints include:

- `POST /api/v1/google-login/`
- `POST /api/v1/logout/`
- `GET /api/v1/me/`
- `GET /api/v1/threads/user/{user_id}/`
- `GET /api/v1/thread_messages/{thread_id}/`
- `POST /orchestration/api/v1/chat/`

The orchestration chat endpoint should return a readable stream. Each event payload is expected to be JSON and separated by:

```text
<|END_OF_EVENT|>
```

Example event shape:

```json
{
  "event": "assistantResponse",
  "data": "Hello, how can I help?"
}
```

## Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
DATABASE_URL=postgresql://user:password@localhost:5432/neylon
```

`DATABASE_URL` is only required for Drizzle commands. The current client runtime primarily talks to the external backend API.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start the production build:

```bash
pnpm start
```

## Available Scripts

```bash
pnpm dev          # Start Next.js dev server
pnpm build        # Create production build
pnpm start        # Run production server
pnpm lint         # Run lint script
pnpm db:generate  # Generate Drizzle migrations
pnpm db:migrate   # Run Drizzle migration entrypoint
pnpm db:run       # Open Drizzle Studio
pnpm db:push      # Push schema changes
pnpm db:pull      # Pull database schema
pnpm db:drop      # Drop Drizzle migration artifacts
```

Note: the Drizzle config points to `src/lib/drizzle/schema.ts` and `src/lib/drizzle/migration.ts`. Add those files before relying on the database scripts.

## Scaling The Codebase

This structure is designed to scale along several axes:

- **More widget screens:** add screen constants, create a component under `src/components/widget`, register it in `TabsRegistry`, and add the default stack in `widget-store.ts`.
- **More agents:** route agent-specific payloads through `use-message-handler.ts` and add agent-specific thinking phases in `src/lib/constants.ts`.
- **More backend APIs:** regenerate `src/lib/types/schema.ts` with `openapi-typescript` and expose clean helpers under `src/lib/services`.
- **More client products:** keep reusable UI in `src/components/ui`, product sections in `src/components/landing-page`, and runtime chatbot components in `src/components/widget`.
- **More state domains:** create focused Zustand stores in `src/store` instead of growing one global store.
- **Multi-tenant branding:** move brand assets, copy, prompts, and colors into configuration objects consumed by the landing page and widget.
- **File/voice workflows:** file upload and microphone components are already scaffolded/commented in the widget and can be wired to backend transcription or document-processing endpoints.

## Notes For Teams Reusing This Repo

- Keep the widget runtime independent from the landing page so it can later be embedded in dashboards or client websites.
- Keep orchestration events small and explicit. The current stream handler is easy to extend when every backend event has one responsibility.
- Treat `src/lib/types/schema.ts` as generated code. Update the OpenAPI source and regenerate types instead of hand-editing it.
- Keep new tabs registry-driven. That preserves the existing navigation model and makes the widget easier to reason about.
- Add real Drizzle schema/migration files only if this frontend becomes responsible for server-side persistence.
