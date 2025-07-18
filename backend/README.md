# Backend

This folder contains the backend API server for The IQ Zoo animal ranking website.

## Tech Stack

- **Runtime**: [Choose: Node.js, Python, Java, etc.]
- **Framework**: [Choose: Express, FastAPI, Spring Boot, etc.]
- **Database**: [Choose: PostgreSQL, MongoDB, MySQL, etc.]
- **ORM**: [Choose: Prisma, Sequelize, SQLAlchemy, etc.]

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   python app.py
   ```

## Features

- RESTful API endpoints
- Animal data management
- User authentication & authorization
- Database operations
- File upload handling

## Structure

```
backend/
├── src/
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API route definitions
│   ├── middleware/    # Custom middleware
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── config/        # Configuration files
├── tests/             # Test files
├── docs/              # API documentation
└── package.json       # Dependencies and scripts
```

## API Endpoints

- `GET /api/animals` - Get all animals
- `POST /api/animals` - Create new animal
- `PUT /api/animals/:id` - Update animal
- `DELETE /api/animals/:id` - Delete animal
- `POST /api/rankings` - Submit animal ranking 