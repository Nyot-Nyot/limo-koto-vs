#!/usr/bin/env node

/**
 * Setup script for Website Nagari
 * This script helps set up the environment for development or production
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(32).toString('base64');
}

function createEnvFile(environment = 'development') {
  const envFile = environment === 'production' ? '.env.production' : '.env.local';
  const envPath = path.join(process.cwd(), envFile);
  
  if (fs.existsSync(envPath)) {
    console.log(`${envFile} already exists. Skipping creation.`);
    return;
  }
  
  const nextAuthSecret = generateSecret();
  const jwtSecret = generateSecret();
  
  const envContent = environment === 'production' ? `# Production Environment Variables
# Replace these values with your actual production settings

# Database Configuration - Use PostgreSQL for production
DATABASE_URL="postgresql://username:password@hostname:port/database_name?sslmode=require"

# Node Environment
NODE_ENV="production"

# Next.js Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_SITE_NAME="Website Nagari"

# Authentication - Generate secure random strings
NEXTAUTH_SECRET="${nextAuthSecret}"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Admin Configuration
DEFAULT_ADMIN_USERNAME="admin"
DEFAULT_ADMIN_PASSWORD="change-this-secure-password"

# Security
JWT_SECRET="${jwtSecret}"
BCRYPT_ROUNDS="12"

# Feature Flags
ENABLE_REGISTRATION="false"
ENABLE_FILE_UPLOAD="true"
ENABLE_ANALYTICS="false"

# Logging
LOG_LEVEL="info"
` : `# Development Environment Variables

# Database Configuration - SQLite for development
DATABASE_URL="file:./prisma/nagari.db"

# Node Environment
NODE_ENV="development"

# Next.js Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Website Nagari"

# Authentication
NEXTAUTH_SECRET="${nextAuthSecret}"
NEXTAUTH_URL="http://localhost:3000"

# Admin Configuration
DEFAULT_ADMIN_USERNAME="admin"
DEFAULT_ADMIN_PASSWORD="admin123"

# Security
JWT_SECRET="${jwtSecret}"
BCRYPT_ROUNDS="10"

# Feature Flags
ENABLE_REGISTRATION="false"
ENABLE_FILE_UPLOAD="true"
ENABLE_ANALYTICS="false"

# Logging
LOG_LEVEL="debug"
`;

  fs.writeFileSync(envPath, envContent);
  console.log(`✅ Created ${envFile} with secure random secrets`);
  
  if (environment === 'production') {
    console.log('⚠️  Please update the DATABASE_URL and other production values in .env.production');
  }
}

function setupDatabase() {
  console.log('🔧 Setting up database...');
  
  const { execSync } = require('child_process');
  
  try {
    // Generate Prisma client
    console.log('📦 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Run migrations
    console.log('🗄️  Running database migrations...');
    execSync('npx prisma migrate dev', { stdio: 'inherit' });
    
    // Seed database
    console.log('🌱 Seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    
    console.log('✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log('🏔️  Website Nagari Setup Script');
  console.log('================================');
  
  switch (command) {
    case 'env':
      const env = args[1] || 'development';
      createEnvFile(env);
      break;
      
    case 'db':
      setupDatabase();
      break;
      
    case 'all':
      createEnvFile('development');
      setupDatabase();
      break;
      
    default:
      console.log('Usage:');
      console.log('  node setup.js env [development|production] - Create environment file');
      console.log('  node setup.js db                           - Setup database');
      console.log('  node setup.js all                         - Create env file and setup database');
      console.log('');
      console.log('Examples:');
      console.log('  node setup.js env development  # Create .env.local');
      console.log('  node setup.js env production   # Create .env.production');
      console.log('  node setup.js db              # Setup database');
      console.log('  node setup.js all             # Do everything');
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = { createEnvFile, setupDatabase, generateSecret };
