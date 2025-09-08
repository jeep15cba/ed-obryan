# Development Workflow Guide

## The Problem
When you run `npm run build`, it can interfere with your running development servers because:
1. The build process creates/modifies the `.next` folder
2. Multiple dev processes can conflict on the same port
3. Build errors can corrupt the development environment

## Better Workflow

### Option 1: Use Different Terminals
**For Development:**
```bash
# Terminal 1 - Main development server
npm run dev

# Terminal 2 - Sanity Studio (if needed)
npm run sanity
```

**For Testing Build (in a separate terminal):**
```bash
# Terminal 3 - Only when you need to test build
npm run build
```

### Option 2: Use the Clean Build Command
Instead of `npm run build`, use this approach:

```bash
# Clean restart (when dev environment is broken)
rm -rf .next && npm run dev -- --port 3006
```

### Option 3: Custom Scripts (Recommended)
Add these scripts to package.json for better workflow:

```json
{
  "scripts": {
    "dev:clean": "rm -rf .next && npm run dev",
    "build:test": "rm -rf .next && npm run build",
    "dev:full": "concurrently \"npm run dev\" \"npm run sanity\""
  }
}
```

## Current Server Status
- **Main App**: http://localhost:3006
- **Sanity Studio**: http://localhost:3334

## Quick Fixes
If development environment breaks:

1. **Kill all processes:**
   ```bash
   pkill -f "next dev"
   pkill -f "sanity dev"
   ```

2. **Clean restart:**
   ```bash
   rm -rf .next
   npm run dev -- --port 3006
   ```

3. **Fresh start:**
   ```bash
   rm -rf .next node_modules/.cache
   npm run dev
   ```

## Best Practices
1. Don't run `build` while `dev` is running
2. Use separate terminals for different services
3. Always clean `.next` folder if environment gets corrupted
4. Test builds only when you need to verify deployment readiness