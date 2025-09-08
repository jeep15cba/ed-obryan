# Fellowship Data Migration

This directory contains scripts to migrate and manage fellowship training data in Sanity CMS.

## Scripts

### `migrate-fellowship-data.js`
Migrates the existing fellowship training data from the website into Sanity CMS.

**What it creates:**
- 9 fellowship mentors across 7 locations
- 7 fellowship locations with geographic coordinates
- 1 fellowship page with all content and references

**Usage:**
```bash
npm run seed:fellowship
```

**Data Structure:**
- **Fellowship Mentors**: Individual surgeons and training programs with expertise areas
- **Fellowship Locations**: Geographic locations with coordinates, descriptions, and mentor references
- **Fellowship Page**: Main content page with all text content and location references

## Migration Output

The script creates the following in Sanity:

### Fellowship Mentors (9 total)
1. Mr Chris Jones (Melbourne)
2. Mr Sam Joseph (Melbourne)
3. A/Prof Peter D'Alessandro (Perth)
4. Dr Arno Schmeling (Berlin)
5. Dr David DeJour (Lyon)
6. Dr Guillaume Demey (Lyon)
7. Dr Frederic Sailhan (Paris)
8. Mr Andy Williams (London)
9. AO Masters Trauma Course (Davos)

### Fellowship Locations (7 total)
1. Melbourne, Australia (-37.8136, 144.9631)
2. Perth, Australia (-31.9505, 115.8605)
3. Berlin, Germany (52.5200, 13.4050)
4. Lyon, France (45.7640, 4.8357)
5. Paris, France (48.8566, 2.3522)
6. London, United Kingdom (51.5074, -0.1278)
7. Davos, Switzerland (46.8006, 9.8134)

### API Endpoints
After migration, these endpoints will return dynamic data:
- `/api/fellowship` - Complete fellowship page data
- `/api/fellowship/locations` - Just the location data (for globe)

## Requirements

- `SANITY_API_TOKEN` environment variable must be set
- Sanity project must have the fellowship schemas deployed
- Node.js and npm installed

## Notes

- The script is idempotent safe - running it multiple times will create duplicate entries
- Make sure to have a backup before running in production
- Geographic coordinates are pre-calculated for accurate globe positioning