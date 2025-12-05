# 🏨 The Wild Oasis - Hotel Management System

A modern, full-stack hotel management application built with React, TypeScript, and Supabase. This production-ready system enables hotel staff to efficiently manage cabins, bookings, guests, and track business metrics through an intuitive dashboard.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646cff)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

## 🌟 Features

### Core Functionality

- **🔐 Authentication & Authorization**: Secure JWT-based authentication with Supabase Auth, role-based access control
- **🏠 Cabin Management**: Full CRUD operations for hotel cabins with image uploads, capacity management, and pricing
- **📅 Booking System**: Complete booking lifecycle management (create, confirm, check-in, check-out)
- **👥 Guest Management**: Track guest information including nationality, ID verification, and booking history
- **📊 Analytics Dashboard**: Real-time business metrics, sales charts, and occupancy statistics
- **⚙️ Settings Management**: Configure booking rules, pricing, and operational parameters

### Technical Highlights

- **Real-time Data Synchronization**: Leveraging TanStack Query for optimistic updates and cache management
- **Advanced Filtering & Sorting**: URL-based state management for shareable filtered views
- **Pagination**: Efficient data loading with prefetching for smooth navigation
- **Responsive Design**: Mobile-first approach with Tailwind CSS, fully responsive across devices
- **Error Boundary**: Comprehensive error handling with user-friendly fallback UI
- **Form Validation**: React Hook Form integration with real-time validation
- **Toast Notifications**: Contextual user feedback for all CRUD operations

## 🚀 Live Demo

> **Note**: Add your deployed application URL here once you deploy to Vercel/Netlify

## 📸 Screenshots

### Dashboard

![Dashboard](./docs/screenshots/dashboard.png)
_Real-time analytics with sales charts, occupancy rates, and key metrics_

### Booking Management

![Bookings](./docs/screenshots/bookings.png)
_Comprehensive booking table with filtering, sorting, and status management_

### Cabin Management

![Cabins](./docs/screenshots/cabins.png)
_Visual cabin management with drag-and-drop image uploads_

> **Note**: Create a `docs/screenshots` folder and add actual screenshots before pushing to GitHub

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with modern hooks and Suspense
- **TypeScript** - Full type safety across the application
- **Vite** - Lightning-fast build tool with SWC
- **React Router v7** - Client-side routing with nested routes
- **TailwindCSS v4** - Utility-first CSS with custom design system
- **TanStack Query v5** - Advanced server state management with caching
- **React Hook Form** - Performant form handling with validation
- **React Hot Toast** - Elegant toast notifications
- **Recharts** - Composable charting library for data visualization

### Backend & Infrastructure

- **Supabase** - Backend-as-a-Service (PostgreSQL, Auth, Storage)
- **PostgreSQL** - Relational database with ACID compliance
- **Row Level Security (RLS)** - Database-level security policies

### Development Tools

- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting rules
- **React Hooks ESLint** - Enforce hooks best practices

## 🏗️ Architecture & Design Patterns

### Feature-Based Architecture

Organized by business domain rather than technical layers:

```
src/features/
├── authentication/    # Login, signup, user profile
├── bookings/         # Booking CRUD and business logic
├── cabins/           # Cabin management
├── dashboard/        # Analytics and reporting
└── settings/         # Configuration management
```

### Custom Hooks Pattern

Separation of concerns with specialized hooks:

- **Data Fetching Hooks**: `useCabins`, `useBookings` - Wrap TanStack Query
- **Mutation Hooks**: `useCreateCabin`, `useCheckin` - Handle updates with optimistic UI
- **UI Hooks**: `useMoveBack`, `useLocalStorageState` - Reusable UI logic

### Type-Safe API Layer

Three-tier type system:

- **Database Types**: Core entities matching Supabase schema
- **API Types**: Request/response interfaces with validation
- **UI Types**: Component props and presentation types

### URL-Based State Management

Filter, sort, and pagination state stored in URL parameters for:

- Shareable filtered views
- Browser back/forward support
- Deep linking capabilities

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/entoun8/the-wild-oasis.git
cd the-wild-oasis
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database schema (see `Database Setup` below)
3. Update Supabase credentials in [src/services/supabase.ts](src/services/supabase.ts):

```typescript
export const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
```

### 4. Database Setup

Execute the following SQL in your Supabase SQL Editor:

```sql
-- Create tables
CREATE TABLE cabins (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  maxCapacity INT NOT NULL,
  regularPrice DECIMAL NOT NULL,
  discount DECIMAL DEFAULT 0,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  fullName TEXT NOT NULL,
  email TEXT NOT NULL,
  nationality TEXT,
  nationalID TEXT,
  countryFlag TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  numNights INT NOT NULL,
  numGuests INT NOT NULL,
  cabinPrice DECIMAL NOT NULL,
  extrasPrice DECIMAL DEFAULT 0,
  totalPrice DECIMAL NOT NULL,
  status TEXT CHECK (status IN ('unconfirmed', 'checked-in', 'checked-out')) DEFAULT 'unconfirmed',
  hasBreakfast BOOLEAN DEFAULT FALSE,
  isPaid BOOLEAN DEFAULT FALSE,
  observations TEXT,
  cabinId BIGINT REFERENCES cabins(id) ON DELETE CASCADE,
  guestId BIGINT REFERENCES guests(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE settings (
  id BIGSERIAL PRIMARY KEY,
  minBookingLength INT DEFAULT 3,
  maxBookingLength INT DEFAULT 90,
  maxNumberOfGuestPerBooking INT DEFAULT 10,
  breakfastPrice DECIMAL DEFAULT 15
);

-- Create storage bucket for cabin images
INSERT INTO storage.buckets (id, name, public) VALUES ('cabin-images', 'cabin-images', true);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### 6. Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 🧪 Testing the Application

### Sample Login Credentials

After setting up authentication, create a test user:

1. Navigate to `/login`
2. Sign up with your email
3. Check Supabase Dashboard for email verification

### Seed Data (Optional)

You can populate the database with sample data for testing. See [src/data/](src/data/) for seed scripts.

## 📚 Key Learning Outcomes

This project demonstrates proficiency in:

### Advanced React Patterns

- ✅ Compound components (Modal, Table)
- ✅ Render props pattern
- ✅ Custom hooks for reusable logic
- ✅ Context API for state sharing
- ✅ Error boundaries for resilience

### State Management

- ✅ Server state with TanStack Query
- ✅ URL state for filters/sorting
- ✅ Local storage state persistence
- ✅ Optimistic updates for better UX

### TypeScript Best Practices

- ✅ Strict mode enabled
- ✅ Type inference and generics
- ✅ Discriminated unions for status types
- ✅ Utility types (Pick, Omit, Partial)

### Performance Optimization

- ✅ Query prefetching for pagination
- ✅ Lazy loading and code splitting
- ✅ Memoization with React hooks
- ✅ Debounced search inputs

### Modern Development Workflow

- ✅ Git version control with semantic commits
- ✅ ESLint for code quality
- ✅ Component-driven development
- ✅ Feature-based folder structure

## 📁 Project Structure

```
the-wild-oasis/
├── src/
│   ├── features/          # Feature modules (bookings, cabins, etc.)
│   ├── services/          # API layer and Supabase clients
│   ├── types/             # TypeScript type definitions
│   ├── ui/                # Reusable UI components
│   ├── pages/             # Route page components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Root component with routing
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── CLAUDE.md              # AI assistant documentation
└── README.md              # This file
```

## 🔐 Security Features

- ✅ **JWT Authentication**: Secure token-based auth with Supabase
- ✅ **Row Level Security**: Database-level access control
- ✅ **Protected Routes**: Client-side route guards
- ✅ **Input Validation**: Form-level validation with React Hook Form
- ✅ **SQL Injection Prevention**: Parameterized queries via Supabase client
- ✅ **XSS Protection**: React's built-in escaping

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### Environment Variables

Configure the following in your deployment platform:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Entoun Said**

- GitHub: [@entoun8](https://github.com/entoun8)
- Email: entounsaid@gmail.com

## 🙏 Acknowledgments

- Built as part of [The Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course/) by Jonas Schmedtmann
- Enhanced with custom features, TypeScript implementation, and modern architectural patterns
- UI/UX inspired by modern SaaS applications

---

⭐ **If you found this project helpful, please consider giving it a star!**
