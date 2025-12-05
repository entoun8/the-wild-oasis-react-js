# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Wild Oasis is a hotel management application built with React, TypeScript, Vite, and Supabase. The app allows hotel staff to manage cabins, bookings, guests, and settings through a responsive dashboard interface.

## Development Commands

```bash
npm run dev       # Start development server with Vite HMR
npm run build     # Type-check with tsc and build for production
npm run lint      # Run ESLint on all files
npm run preview   # Preview production build locally
```

## Architecture

### Technology Stack
- **Frontend**: React 19, TypeScript, React Router v7
- **Build Tool**: Vite with SWC for fast refresh
- **Styling**: Tailwind CSS v4 with Vite plugin
- **State Management**: TanStack Query v5 for server state
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Form Handling**: React Hook Form
- **UI Feedback**: React Hot Toast

### Project Structure

```
src/
├── features/          # Feature-based modules
│   ├── authentication/  # Login, signup, user management
│   ├── bookings/        # Booking CRUD and queries
│   ├── cabins/          # Cabin management
│   ├── check-in-out/    # Check-in/check-out operations
│   ├── dashboard/       # Dashboard stats and charts
│   └── settings/        # Application settings
├── services/          # API layer (Supabase clients)
│   ├── supabase.ts      # Supabase client configuration
│   ├── apiAuth.ts       # Authentication API functions
│   ├── apiBookings.ts   # Booking API functions
│   ├── apiCabins.ts     # Cabin API functions
│   └── apiSettings.ts   # Settings API functions
├── types/             # TypeScript type definitions
│   ├── database.types.ts  # Core database entity types
│   ├── api.types.ts       # API request/response types
│   └── ui.types.ts        # UI component prop types
├── ui/                # Reusable UI components
├── pages/             # Route page components
├── hooks/             # Custom React hooks
└── utils/             # Utility functions and constants
```

### Key Architectural Patterns

#### Feature-Based Organization
Each feature folder contains all related components, hooks, and logic:
- Components: Feature-specific UI components (e.g., `BookingTable.tsx`, `CabinForm.tsx`)
- Custom Hooks: React Query hooks for data fetching (e.g., `useBookings.ts`, `useCabins.ts`)
- Hook naming: `use[Feature][Action]` (e.g., `useDeleteCabin`, `useUpdateSetting`)

#### Data Fetching Pattern
Uses TanStack Query with a consistent pattern:
1. API functions in `services/api*.ts` handle Supabase calls
2. Custom hooks in `features/*/use*.ts` wrap React Query hooks
3. Components consume hooks for data and mutations
4. Query keys include filter/sort parameters for proper caching

Example:
```typescript
// API layer
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase.from("bookings").select(...)
  // Apply filters, sorting, pagination
  return { data, count }
}

// Hook layer
export const useBookings = () => {
  const [searchParams] = useSearchParams()
  // Parse URL params for filter/sort/page
  return useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, page })
  })
}
```

#### Type System
Three-tier type organization:
- `database.types.ts`: Core entities matching Supabase tables (Cabin, Booking, Guest, Settings)
- `api.types.ts`: API request/response types, filters, sorting, pagination
- `ui.types.ts`: Component prop types and UI-specific types

Related entities use TypeScript utility types:
```typescript
interface BookingWithGuest extends Booking {
  guests: Pick<Guest, "fullName" | "email" | "nationality" | "countryFlag">
}
```

#### Authentication Flow
- Protected routes use `ProtectedRoute` component wrapper
- `useUser` hook provides authentication state via TanStack Query
- Supabase handles JWT tokens and session management
- User metadata stored in `user_metadata` field (fullName, avatar)

#### URL-Based State Management
Filter, sort, and pagination state stored in URL search params:
- Enables shareable URLs and browser back/forward
- Hooks parse `searchParams` to derive query parameters
- Components use `Filter` and `SortBy` UI components to update URL

#### Modal Pattern
Uses compound component pattern with React Context:
```typescript
<Modal>
  <Modal.Open opens="cabin-form">
    <Button>Add Cabin</Button>
  </Modal.Open>
  <Modal.Window name="cabin-form">
    <CabinForm />
  </Modal.Window>
</Modal>
```

## Supabase Integration

### Database Schema
Main tables:
- `cabins`: Hotel cabin information (name, capacity, price, discount, image)
- `bookings`: Reservation records (dates, guests, pricing, status)
- `guests`: Guest information (fullName, email, nationality, nationalID)
- `settings`: Application settings (booking lengths, guest limits, breakfast pricing)

### Supabase Client
- Single client instance exported from `services/supabase.ts`
- Used across all API service files
- Handles authentication state automatically

### Common Supabase Patterns
- Use `.select()` with join syntax for related data: `.select("*, cabins(name), guests(fullName)")`
- Filter methods: `.eq()`, `.neq()`, `.gt()`, `.gte()`, `.lt()`, `.lte()`
- Pagination with `.range(from, to)` (PAGE_SIZE = 10)
- Sorting with `.order(field, { ascending: boolean })`
- Count with `{ count: "exact" }` in select options

## Important Conventions

### TypeScript
- Strict mode enabled via `tsconfig.app.json`
- All components and hooks must be typed
- Avoid `any` types - use proper interfaces from `types/` folder
- API functions must have return type annotations

### Component Patterns
- Use functional components with TypeScript
- Extract reusable logic into custom hooks
- Keep components focused on presentation
- Business logic belongs in hooks or API services

### Error Handling
- API errors logged with `console.error()` and re-thrown with user-friendly messages
- React Error Boundary wraps app in `main.tsx`
- Toast notifications for user feedback (success/error)

### Code Style
- Use named exports for components and hooks
- Consistent import order: external libs, internal modules, types, styles
- File naming: PascalCase for components, camelCase for utilities/hooks
