# Cloudflare Pages Deployment Guide

This guide will help you deploy your Next.js orthopaedic surgeon website to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account (free tier available)
2. Your project pushed to GitHub/GitLab
3. Sanity CMS project deployed and accessible

## Environment Variables Setup

You'll need to configure these environment variables in Cloudflare Pages:

### Required Environment Variables

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
```

### Getting Your Sanity Credentials

1. **Project ID**: Found in your Sanity project dashboard or `sanity.config.ts`
2. **Dataset**: Usually "production" (check your Sanity config)
3. **API Token**: 
   - Go to https://sanity.io/manage
   - Select your project
   - Navigate to "API" → "Tokens" 
   - Create a new token with "Viewer" permissions

## Deployment Steps

### Step 1: Connect Your Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to "Pages" in the sidebar
3. Click "Create a project"
4. Choose "Connect to Git" and select your repository
5. Choose your main branch (usually `main` or `master`)

### Step 2: Configure Build Settings

Use these build configuration settings:

```yaml
Build command: npm run build
Build output directory: .next
Root directory: /
Node.js version: 18 or later
```

### Step 3: Add Environment Variables

1. In your Cloudflare Pages project dashboard
2. Go to "Settings" → "Environment variables"
3. Add each environment variable from the list above
4. Make sure to add them to both "Production" and "Preview" environments

### Step 4: Deploy

1. Click "Save and Deploy"
2. Cloudflare Pages will automatically build and deploy your site
3. Your site will be available at `https://your-project-name.pages.dev`

## Custom Domain Setup (Optional)

### Step 1: Add Custom Domain

1. In your Pages project, go to "Custom domains"
2. Click "Set up a custom domain"
3. Enter your domain (e.g., `www.your-domain.com`)

### Step 2: Configure DNS

1. Go to your domain registrar or DNS provider
2. Add a CNAME record:
   - Name: `www` (or `@` for root domain)
   - Value: `your-project-name.pages.dev`

### Step 3: Update Environment Variables

Update your `NEXT_PUBLIC_SITE_URL` environment variable to use your custom domain:

```env
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

## Build Optimization

Your application is already optimized for Cloudflare Pages with:

- ✅ Static generation for most pages
- ✅ API routes for dynamic navigation
- ✅ Image optimization compatible with Cloudflare
- ✅ TypeScript and ESLint warnings only (not errors)

## Troubleshooting

### Build Failures

If your build fails:

1. Check the build logs in Cloudflare Pages dashboard
2. Ensure all environment variables are set correctly
3. Verify your Sanity project is accessible
4. Check that your API token has correct permissions

### Environment Variable Issues

- Environment variables starting with `NEXT_PUBLIC_` are available in the browser
- Regular environment variables are only available during build time
- Re-deploy after changing environment variables

### Sanity Connection Issues

1. Verify your Sanity project is deployed: `npm run sanity deploy`
2. Check API token permissions in Sanity dashboard
3. Ensure CORS is configured for your domain in Sanity

## Performance Monitoring

Cloudflare provides analytics for:
- Page load times
- Core Web Vitals
- Traffic patterns
- Geographic distribution

Access these in your Cloudflare Pages dashboard under "Analytics".

## Automatic Deployments

Cloudflare Pages automatically deploys when you:
- Push to your main branch (production deployment)
- Create pull requests (preview deployments)

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Sanity Documentation](https://www.sanity.io/docs)

---

**Note**: This website uses server-side features and API routes. Cloudflare Pages fully supports Next.js applications with these features.

---
*Last updated: September 2025*