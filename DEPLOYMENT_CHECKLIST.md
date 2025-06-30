# 🚀 Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment Checklist

### 📋 Code Preparation
- [ ] All code committed and pushed to GitHub
- [ ] No `.env.local` or sensitive files in repository
- [ ] `.env.example` is up to date
- [ ] All tests are passing (`npm test`)
- [ ] No console.log statements in production code
- [ ] Error handling is implemented for all API routes

### 🗄️ Database Preparation
- [ ] PostgreSQL database created (Supabase/Neon/Railway)
- [ ] Database connection string obtained
- [ ] Database allows connections from external sources
- [ ] SSL mode is enabled for database connection

### 🔐 Security Preparation
- [ ] Strong passwords chosen for admin accounts
- [ ] Secure random strings generated for secrets
- [ ] Environment variables list prepared
- [ ] No hardcoded credentials in code

## Deployment Steps

### 1. Vercel Project Setup
- [ ] GitHub repository connected to Vercel
- [ ] Project imported in Vercel dashboard
- [ ] Build settings configured (should auto-detect Next.js)

### 2. Environment Variables
Set these in Vercel dashboard (Settings > Environment Variables):

#### Required Variables
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_SECRET` - Generated secure random string
- [ ] `NEXTAUTH_URL` - Your Vercel app URL
- [ ] `JWT_SECRET` - Generated secure random string
- [ ] `NODE_ENV` - Set to "production"

#### Optional Variables
- [ ] `NEXT_PUBLIC_SITE_NAME` - Your site name
- [ ] `DEFAULT_ADMIN_USERNAME` - Admin username
- [ ] `DEFAULT_ADMIN_PASSWORD` - Secure admin password
- [ ] `BCRYPT_ROUNDS` - Set to "12" for production
- [ ] `LOG_LEVEL` - Set to "info"

### 3. Database Migration
After first successful deployment:
- [ ] Run database migrations: `vercel exec -- npx prisma migrate deploy`
- [ ] Seed database: `vercel exec -- npm run db:seed`
- [ ] Verify admin login works

### 4. Domain Configuration
- [ ] Custom domain added (if applicable)
- [ ] DNS configured correctly
- [ ] SSL certificate active
- [ ] `NEXTAUTH_URL` updated with final domain

## Post-Deployment Verification

### 🔍 Functionality Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Admin login functions
- [ ] Database operations work (create/read/update/delete)
- [ ] API endpoints respond correctly
- [ ] Health check endpoint works (`/api/health`)

### 📊 Performance Testing
- [ ] Page load times are acceptable
- [ ] Images load correctly
- [ ] Mobile responsiveness works
- [ ] No console errors in browser

### 🔒 Security Testing
- [ ] Admin panel requires authentication
- [ ] No sensitive data exposed in client
- [ ] HTTPS is working
- [ ] Security headers are present

## Environment-Specific Configurations

### Development
```bash
# Setup development environment
npm run setup:all
npm run dev
```

### Production
```bash
# Build and deploy
npm run build
npm run start
```

## Common Issues & Solutions

### Database Connection Issues
- [ ] Check DATABASE_URL format
- [ ] Verify database allows external connections
- [ ] Ensure SSL mode is enabled
- [ ] Check username/password/hostname/port

### Build Failures
- [ ] All environment variables set in Vercel
- [ ] Dependencies are in package.json
- [ ] No missing imports
- [ ] TypeScript compilation succeeds

### Runtime Errors
- [ ] Check Vercel function logs
- [ ] Verify database migrations ran
- [ ] Check environment variables are correct
- [ ] Verify API routes are working

## Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor application performance
- [ ] Check error logs regularly
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Monitor storage usage

### Security Updates
- [ ] Update Next.js and dependencies regularly
- [ ] Rotate secrets periodically
- [ ] Monitor for security vulnerabilities
- [ ] Review access logs

## Quick Commands

```bash
# Generate secure secrets
openssl rand -base64 32

# Check deployment health
curl https://your-domain.vercel.app/api/health

# View Vercel logs
vercel logs

# Run database migrations on Vercel
vercel exec -- npx prisma migrate deploy

# Seed database on Vercel
vercel exec -- npm run db:seed
```

## Rollback Plan

If deployment fails:
1. [ ] Revert to previous commit
2. [ ] Push to GitHub
3. [ ] Vercel will auto-deploy previous version
4. [ ] Check database state
5. [ ] Fix issues and redeploy

## Success Criteria

Deployment is successful when:
- [ ] All pages load without errors
- [ ] Admin can log in and manage content
- [ ] Database operations work correctly
- [ ] Performance is acceptable
- [ ] Security measures are in place
- [ ] Monitoring is active

---

**Next Steps After Deployment:**
1. Share the live URL with stakeholders
2. Document any custom configurations
3. Set up monitoring and analytics
4. Plan regular maintenance schedule
5. Consider adding more features

**Support:**
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Review [DATABASE.md](./DATABASE.md) for database information
- Use `npm run setup:all` for quick local setup
