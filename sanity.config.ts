import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { assist } from '@sanity/assist'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'OrthoSurgeon Website',

  projectId: 'pohlh77l',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    assist()
  ],

  schema: {
    types: schemaTypes,
  },
})