# 🐕 DogFinder

A dog breed discovery application with interactive swipe cards interface, built with React, TypeScript, and Vite.

## 🚀 Commands

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The application will run at [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Lint code

```bash
npm run lint
```

## 📁 Project Structure

```
DogFinder/
├── public/                    # Static assets
├── src/
│   ├── apis/                  # API service layer
│   │   └── breed.ts          # API calls for breeds and voting
│   │
│   ├── assets/               # Images, fonts, and static files
│   │
│   ├── components/           # Reusable components
│   │   ├── ActionButtons.tsx # Like/Dislike/SuperLike buttons
│   │   ├── BreedNotFound.tsx # Breed not found error component
│   │   ├── DogCard.tsx       # Dog information card
│   │   ├── EmptyState.tsx    # Empty state component
│   │   ├── Header.tsx        # Header component
│   │   ├── NoImage.tsx       # Image placeholder
│   │   ├── PageLayout.tsx    # Reusable page layout wrapper
│   │   ├── SwipeIndicators.tsx # Swipe indicators
│   │   ├── Toast.tsx         # Toast notifications
│   │   ├── history/          # History-related components
│   │   │   ├── FilterTabs.tsx # Vote filter tabs
│   │   │   ├── VoteCard.tsx  # Vote card component
│   │   │   └── HistoryEmptyState.tsx # Empty state for history
│   │   └── __tests__/        # Component tests
│   │
│   ├── config/               # Configuration files
│   │   ├── axios.ts         # Axios instance and interceptors
│   │   └── enviroment.ts    # Environment variables
│   │
│   ├── constants/            # Constants and configuration
│   │   ├── breeds.ts        # Breeds constants (MAX_X, MAX_Y, etc.)
│   │   ├── history.ts       # History constants (filter types, vote values)
│   │   └── toast.ts         # Toast messages and types
│   │
│   ├── containers/           # Page-level components
│   │   ├── main/
│   │   │   └── MainPage.tsx # Main page with swipe cards
│   │   ├── details/
│   │   │   ├── DogDetailsPage.tsx # Dog breed details page
│   │   │   └── LoadingDetails.tsx # Loading state for details
│   │   ├── history/
│   │   │   └── HistoryPage.tsx # Vote history with filters
│   │   └── not-found/
│   │       └── NotFound.tsx  # 404 page
│   │
│   ├── contexts/             # React Context providers
│   │   └── ToastContext.tsx # Context for toast notifications
│   │
│   ├── routes/               # Routing configuration
│   │   ├── index.tsx        # Route definitions
│   │   └── path.ts          # Route paths constants
│   │
│   ├── stores/               # State management (Zustand)
│   │   ├── breedStore.ts    # Store for breeds, progress, and cache
│   │   └── __tests__/       # Store tests
│   │
│   ├── test/                 # Test utilities and setup
│   │   ├── setup.ts         # Vitest setup
│   │   └── mockData/        # Mock data for tests
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── breed.ts         # Types for breed data
│   │   └── card.ts          # Types for card interactions
│   │
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── App.css              # Global styles
│
├── coverage/                 # Test coverage reports
├── .husky/                   # Git hooks
├── commitlint.config.js     # Commitlint configuration
├── eslint.config.js         # ESLint configuration
├── lint-staged.config.js    # Lint-staged configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
└── package.json             # Project dependencies and scripts
```

## 🗂️ Folder Descriptions

### `src/apis/`

Contains API service functions that interact with backend services. Separates API logic from components.

### `src/components/`

Reusable components used throughout the application. Each component has a single responsibility and can be tested independently.

### `src/config/`

Configuration for third-party libraries (Axios, environment variables, etc.).

### `src/constants/`

Constants used throughout the application to avoid magic numbers and duplicate strings.

### `src/containers/`

Page-level components, each container corresponds to a route/page in the application.

### `src/contexts/`

React Context providers for managing global state (e.g., Toast notifications).

### `src/routes/`

Routing configuration for the application using React Router.

### `src/stores/`

State management using Zustand. Manages application state such as breeds data, user progress, and caching.

### `src/types/`

TypeScript type definitions and interfaces to ensure type safety.

### `src/test/`

Test utilities, setup files, and mock data for unit tests and integration tests.

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server (build + run faster)
- **Tailwind CSS 4** - Styling (easy to use, easy to setup)
- **Zustand** - State management (Quick setup, suitable for small apps.)
- **React Router** - Routing
- **React Spring** - Animation library
- **@use-gesture/react** - Gesture handling
- **Axios** - HTTP client (strong, easy setup and custom)
- **Vitest** - Testing framework
- **Testing Library** - Component testing
- **Husky** - Git hooks
- **ESLint** - Linting
- **Prettier** - Code formatting

**React Spring** - Physics-based animation library for smooth, natural animations. Better than CSS transitions for:

- Spring-based animations feel more natural
- Imperative API for complex interactions
- Better performance with will-change optimization

**@use-gesture/react** - Powerful gesture recognition library for drag, swipe, and pinch interactions

I had considered using react-dnd, but its drag-and-drop effects weren't smooth or natural.

## ✨ Features

- 🐶 Swipe cards interaction (swipe left/right/up)
- � Vote history page with filters (all/likes/dislikes/super likes)
- ♾️ Infinite scroll for vote history
- 💾 User progress persistence (zustand persist)
- ⚡ Prefetching and caching for performance
- 🎨 Responsive design with Tailwind CSS
- 🧪 Unit tests 100% coverage
- 🎭 Smooth animations with React Spring
- 📱 Touch gestures support
- 🔔 Toast notifications
- 🚀 Fast refresh in development
- 🐳 Docker support for production deployment

## Demo

https://jam.dev/c/240797f1-fced-46c5-b0d7-85191f6a453c
