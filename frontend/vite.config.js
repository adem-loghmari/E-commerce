import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // "@mui/icons-material/Foo" resolves to a CommonJS file that pulls in a second, CommonJS copy
      // of MUI. In the dev server that breaks module order ("createTheme_default is not a function"),
      // so always use the ES module build of the icons.
      { find: /^@mui\/icons-material\/(?!esm\/)(.*)$/, replacement: '@mui/icons-material/esm/$1' },
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4000',
      '/images': 'http://localhost:4000',
    },
  },
  // The backend serves the production build from frontend/build.
  build: { outDir: 'build' },
})
