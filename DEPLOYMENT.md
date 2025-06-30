# 🚀 Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Database** - Set up a PostgreSQL database (recommended: [Supabase](https://supabase.com) or [Neon](https://neon.tech))

## Step 1: Prepare Your Code

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Environment Variables**: Copy `.env.example` to `.env.local` and update values for your local development.

## Step 2: Set up Database (Production)

### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the PostgreSQL connection string
5. It will look like: `postgresql://postgres:[password]@[host]:5432/postgres`

### Option B: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard

### Option C: Railway
1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string

## Step 3: Deploy to Vercel

### Automatic Deployment (Recommended)

1. **Connect GitHub to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database_name?sslmode=require
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_SITE_NAME=Website Nagari
   NEXTAUTH_SECRET=your-secure-random-string-here
   NEXTAUTH_URL=https://your-domain.vercel.app
   JWT_SECRET=your-jwt-secret-here
   DEFAULT_ADMIN_USERNAME=admin
   DEFAULT_ADMIN_PASSWORD=your-secure-password
   BCRYPT_ROUNDS=12
   ENABLE_REGISTRATION=false
   ENABLE_FILE_UPLOAD=true
   LOG_LEVEL=info
   ```

3. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

### Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

## Step 4: Database Migration

After deployment, you need to run database migrations:

1. **Using Vercel CLI**:
   ```bash
   # Set production database URL
   vercel env add DATABASE_URL production
   
   # Run migrations
   vercel exec -- npx prisma migrate deploy
   vercel exec -- npx prisma db seed
   ```

2. **Using GitHub Actions** (recommended for automation):
   Create `.github/workflows/deploy.yml` for automatic database updates.

## Step 5: Domain Configuration

1. **Custom Domain** (optional):
   - Go to your Vercel project dashboard
   - Click "Domains"
   - Add your custom domain

2. **SSL Certificate**: Vercel automatically provides SSL certificates.

## Environment Variables Reference

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Authentication secret | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `https://yoursite.vercel.app` |
| `JWT_SECRET` | JWT signing secret | `openssl rand -base64 32` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Site name | `Website Nagari` |
| `DEFAULT_ADMIN_USERNAME` | Default admin username | `admin` |
| `DEFAULT_ADMIN_PASSWORD` | Default admin password | `admin123` |
| `BCRYPT_ROUNDS` | Password hashing rounds | `12` |
| `LOG_LEVEL` | Logging level | `info` |

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Check your `DATABASE_URL` format
   - Ensure your database allows connections from Vercel IPs
   - Verify SSL mode is enabled

2. **Build Failures**:
   - Check your environment variables are set
   - Verify all dependencies are in `package.json`
   - Check the build logs in Vercel dashboard

3. **Prisma Issues**:
   - Ensure `PRISMA_GENERATE_DATAPROXY=true` is set
   - Run `npx prisma generate` locally first
   - Check database connection string format

4. **File Upload Issues**:
   - Vercel doesn't support persistent file storage
   - Consider using cloud storage (AWS S3, Cloudinary)

### Environment-Specific Notes

**Development**:
- Use SQLite for local development
- Use `.env.local` for local environment variables

**Production**:
- Use PostgreSQL for production
- Set environment variables in Vercel dashboard
- Enable security headers

## Database Migration Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed

# Reset database (DANGER: Only for development)
npx prisma migrate reset --force
```

## Security Checklist

- [ ] Strong passwords for admin accounts
- [ ] Secure random strings for JWT_SECRET and NEXTAUTH_SECRET
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables properly set
- [ ] Database connection secured with SSL
- [ ] File upload restrictions in place
- [ ] Rate limiting enabled (consider adding middleware)

## Performance Optimization

1. **Image Optimization**: Already configured with Next.js
2. **Static Generation**: Pages are statically generated where possible
3. **Database Connection Pooling**: Handled by Prisma
4. **CDN**: Vercel provides global CDN automatically

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Consider adding Sentry or similar
3. **Database Monitoring**: Use your database provider's monitoring tools

## Cost Considerations

**Vercel**:
- Free tier: 100GB bandwidth, 6,000 build minutes
- Pro tier: $20/month for more resources

**Database**:
- Supabase: Free tier with 500MB storage
- Neon: Free tier with 1GB storage
- Railway: $5/month for 1GB storage

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test database connection
4. Review this guide step by step

## Quick Deploy Button

Add this to your README.md:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/website-nagari&env=DATABASE_URL,NEXTAUTH_SECRET,JWT_SECRET&envDescription=Required%20environment%20variables&envLink=https://github.com/your-username/website-nagari/blob/main/.env.example)
