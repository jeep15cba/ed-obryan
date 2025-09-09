# Ed O'Bryan Orthopaedic Surgeon Website

A high-performance Next.js website for orthopaedic surgeon practice management, featuring comprehensive CMS integration, advanced navigation, and optimized performance.

## Features

- **Performance Optimized Navigation**: Server-side pre-fetched navigation data with smart caching
- **Sanity CMS Integration**: Full content management for services, conditions, team members, and pages
- **Dynamic Navigation**: Auto-populated dropdowns based on services and conditions
- **Responsive Design**: Mobile-first design with optimized user experience
- **SEO Optimized**: Comprehensive SEO meta data management

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3006](http://localhost:3006) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Architecture

### Performance Optimizations

The header navigation system implements several performance optimizations:

- **Server-Side Pre-fetching**: Navigation data is fetched at the server level during page generation
- **Smart Caching**: Multi-layer caching with route-level revalidation and HTTP cache headers
- **Conditional Loading**: Client-side API calls only occur when server data is unavailable
- **Optimized Queries**: Reduced GROQ query complexity with proper slice notation
- **Layout Shift Prevention**: Navigation state initializes with server data to prevent CLS

### Navigation System

The navigation system supports both manual and auto-populated dropdown menus:

- **Manual Dropdowns**: Statically defined dropdown items (e.g., About, Contact)
- **Service-Based Dropdowns**: Auto-populated with related conditions/procedures
- **Featured Content**: Prioritizes featured items in dropdown lists
- **Responsive Menus**: Touch-optimized mobile navigation

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
