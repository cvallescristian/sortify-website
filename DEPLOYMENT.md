# Sortify Website Deployment Guide

This guide covers deploying your Sortify website using Vercel (recommended) or GitHub Pages.

## 🚀 Option 1: Vercel (Recommended)

Vercel is the optimal platform for Next.js applications with automatic deployments, previews, and excellent performance.

### Prerequisites
- GitHub repository connected
- Vercel account (free tier available)

### Quick Deployment

#### Method A: Vercel CLI (Already Installed)
```bash
# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: sortify-website
# - Directory: ./
# - Override settings? No
```

#### Method B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `sortify-website` repository
5. Configure settings:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

### Environment Variables
Set these in Vercel dashboard → Settings → Environment Variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-railway-api.railway.app

# Spotify Configuration (if needed)
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=https://your-vercel-app.vercel.app/auth/callback
```

### Automatic Deployments
- **Production**: Deploys from `main` branch
- **Preview**: Creates preview URLs for pull requests
- **Custom Domains**: Add your own domain

## 🌐 Option 2: GitHub Pages

GitHub Pages is free but requires additional configuration for Next.js.

### Step 1: Configure Next.js for Static Export

Update your `next.config.ts`:
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sortify-website' : '',
}

export default nextConfig
```

### Step 2: Update package.json Scripts
```json
{
  "scripts": {
    "build": "next build",
    "export": "next build && next export",
    "deploy": "npm run export && touch out/.nojekyll"
  }
}
```

### Step 3: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### Step 4: Configure GitHub Pages
1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. Branch: `gh-pages`

## 🔧 Configuration Files

### vercel.json (for Vercel)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["iad1"]
}
```

### .env.local (Local Development)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3001/auth/callback
```

## 🌍 Domain Configuration

### Custom Domain Setup
1. **Vercel**: Dashboard → Settings → Domains
2. **GitHub Pages**: Settings → Pages → Custom domain

### SSL/HTTPS
- **Vercel**: Automatic SSL certificates
- **GitHub Pages**: Automatic SSL for custom domains

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Google Analytics (Optional)
Add to your `_app.tsx`:
```typescript
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_location: url,
      })
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  
  return <Component {...pageProps} />
}
```

## 🔄 Continuous Deployment

### Vercel
- Automatic deployments on push to `main`
- Preview deployments for pull requests
- Branch deployments for feature development

### GitHub Pages
- Deploys on push to `main` (via GitHub Actions)
- Manual deployment available

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Clear cache and rebuild
rm -rf .next && npm run build
```

#### 2. Environment Variables
```bash
# Verify environment variables are set
echo $NEXT_PUBLIC_API_URL
echo $NEXT_PUBLIC_SPOTIFY_CLIENT_ID
```

#### 3. CORS Issues
Ensure your API (Railway) allows requests from your frontend domain.

#### 4. Spotify Redirect URI
Update Spotify app settings with your production URL:
- Vercel: `https://your-app.vercel.app/auth/callback`
- GitHub Pages: `https://your-username.github.io/sortify-website/auth/callback`

## 📈 Performance Optimization

### Vercel Optimizations
- Automatic image optimization
- Edge functions support
- CDN distribution
- Automatic code splitting

### Next.js Optimizations
- Static generation where possible
- Image optimization
- Code splitting
- Bundle analysis

## 🔐 Security

### Environment Variables
- Never commit secrets to Git
- Use Vercel's encrypted environment variables
- Use `.env.local` for local development

### Content Security Policy
Add to your `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

## 🎉 Success Checklist

Before going live:
- [ ] Build passes locally
- [ ] Environment variables configured
- [ ] Spotify redirect URI updated
- [ ] API endpoints responding
- [ ] Authentication flow works
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Analytics configured (optional)

## 🚀 Quick Deploy Commands

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### GitHub Pages
```bash
# Build and deploy
npm run deploy

# Or use GitHub Actions (automatic)
git push origin main
```

Your Sortify website is now ready for production! 🎵
