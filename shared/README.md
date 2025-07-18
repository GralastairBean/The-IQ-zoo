# Shared

This folder contains code and types that are shared between the frontend and backend applications.

## Purpose

- **Type Definitions**: Common TypeScript interfaces and types
- **Constants**: Shared configuration values and constants
- **Utilities**: Helper functions used by both frontend and backend
- **Validation**: Shared validation schemas and rules

## Structure

```
shared/
├── types/             # TypeScript type definitions
│   ├── animal.ts      # Animal-related types
│   ├── user.ts        # User-related types
│   └── api.ts         # API response types
├── constants/          # Shared constants
│   ├── animals.ts     # Animal categories, etc.
│   └── config.ts      # Configuration constants
├── utils/             # Shared utility functions
│   ├── validation.ts  # Validation helpers
│   └── formatting.ts  # Data formatting utilities
└── schemas/           # Shared validation schemas
    ├── animal.ts      # Animal validation schemas
    └── user.ts        # User validation schemas
```

## Usage

### Frontend
```typescript
import { Animal, User } from '../shared/types';
import { ANIMAL_CATEGORIES } from '../shared/constants';
```

### Backend
```typescript
import { Animal, User } from '../shared/types';
import { validateAnimal } from '../shared/schemas';
```

## Benefits

- **Type Safety**: Consistent types across frontend and backend
- **DRY Principle**: Avoid duplicating code
- **Maintainability**: Single source of truth for shared logic
- **Consistency**: Ensures frontend and backend use same data structures 