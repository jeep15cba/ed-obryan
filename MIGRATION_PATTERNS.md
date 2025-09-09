# Migration Script Patterns

This document outlines the established patterns for creating Sanity data migration/seed scripts in this project.

## Directory Structure
- All migration scripts go in `/scripts/` directory (not `/src/scripts/`)
- Use `.js` files, not `.ts` files
- Follow naming convention: `migrate-{page-name}-data.js`

## Script Structure Template

```javascript
const { createClient } = require('next-sanity');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const pageData = {
  _type: 'pageName',
  _id: 'page-id',
  // ... your data structure
};

async function migratePageData() {
  console.log('🚀 Starting page data migration...');

  try {
    // Verify connection
    console.log('🔌 Testing Sanity connection...');
    const config = await writeClient.config();
    console.log(`✅ Connected to Sanity project: ${config.projectId}`);

    // Check if page already exists
    const existingPage = await writeClient.fetch(`*[_type == "pageName" && _id == "page-id"][0]`);
    
    if (existingPage) {
      console.log('⚠️ Page already exists. Updating with new data...');
      const result = await writeClient.createOrReplace(pageData);
      console.log(`✅ Page updated successfully: ${result._id}`);
    } else {
      const result = await writeClient.create(pageData);
      console.log(`✅ Page created successfully: ${result._id}`);
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary: 1 page document processed`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

// Run the migration
migratePageData()
  .then(() => {
    console.log('✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });
```

## Package.json Scripts
Add corresponding npm scripts to `package.json`:

```json
{
  "scripts": {
    "seed:pagename": "node scripts/migrate-pagename-data.js"
  }
}
```

## Environment Variables Required
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (note: NOT `SANITY_TOKEN`)

## Existing Scripts
- `scripts/migrate-fellowship-data.js` - Fellowship page and locations
- `scripts/migrate-refer-data.js` - Refer page with form configuration
- `scripts/migrate-contact-data.js` - Contact page with all sections
- `scripts/migrate-footer-data.js` - Footer configuration with navigation links

## Key Points
1. Always use `createOrReplace()` for updates to handle existing documents
2. Use consistent console logging with emojis for better UX
3. Always include connection verification step
4. Handle errors gracefully with detailed error messages
5. Use `process.exit()` with appropriate codes
6. Extract data from existing page fallbacks when creating new migrations