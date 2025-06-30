# Production Database Schema

This file contains an alternative Prisma schema for production deployment with PostgreSQL.

## For Production Deployment

Replace the `datasource db` block in `prisma/schema.prisma` with:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Database Migration Commands

```bash
# For production deployment
npx prisma migrate deploy

# For development
npx prisma migrate dev

# Generate client
npx prisma generate

# Seed database
npx prisma db seed
```

## Environment Variables

### Development (SQLite)
```
DATABASE_URL="file:./prisma/nagari.db"
```

### Production (PostgreSQL)
```
DATABASE_URL="postgresql://username:password@hostname:port/database_name?sslmode=require"
```

## Supported Databases

- **Development**: SQLite (recommended for local development)
- **Production**: PostgreSQL (recommended for production)
- **Alternative**: MySQL (with minor schema adjustments)

## Database Providers

### Recommended for Production:
1. **Supabase** - Free tier available, excellent for small to medium projects
2. **Neon** - Serverless PostgreSQL, good free tier
3. **Railway** - Simple setup, affordable pricing
4. **PlanetScale** - MySQL-compatible, good for scaling
5. **AWS RDS** - Enterprise-grade, more complex setup

### Schema Compatibility Notes

The current schema is designed to work with both SQLite and PostgreSQL with minimal changes:

- Uses `String` for IDs (compatible with both)
- Uses `DateTime` for timestamps (compatible with both)
- Uses `Int` and `Float` for numbers (compatible with both)
- Uses `Boolean` for flags (compatible with both)

### Migration Notes

When switching from SQLite to PostgreSQL:

1. Export existing data if needed
2. Update `DATABASE_URL` to PostgreSQL connection string
3. Run `npx prisma migrate reset` (this will recreate the database)
4. Run `npx prisma db seed` to populate with default data
5. Import any existing data if needed
