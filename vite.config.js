import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function figmaVersionedImportResolver() {
  return {
    name: 'figma-versioned-import-resolver',
    async resolveId(id, importer) {
      // Figma Make sometimes emits imports like "pkg@1.2.3".
      // Normalize to bare package names so Vite can resolve node_modules.
      if (/^[^./].+@\d[\w.-]*$/.test(id)) {
        const normalized = id.replace(/@\d[\w.-]*$/, '')
        const resolved = await this.resolve(normalized, importer, { skipSelf: true })
        if (resolved) return resolved
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    figmaVersionedImportResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
