import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Configuration Vite pour BBH SERVICE
 * 
 * Options de build optimisées pour la production :
 * - Minification avec esbuild
 * - Code splitting automatique
 * - Compression des assets
 * 
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  
  // Configuration du serveur de développement
  server: {
    host: true, // Expose sur le réseau local (0.0.0.0)
    port: 5173,
    strictPort: false,
    open: false,
    cors: true,
  },
  
  // Configuration du build
  build: {
    // Dossier de sortie
    outDir: 'dist',
    
    // Génère un rapport de taille des bundles
    reportCompressedSize: true,
    
    // Optimisation du code splitting
    rollupOptions: {
      output: {
        // Sépare les vendors du code applicatif
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
        },
        // Nommage des fichiers pour le cache long terme
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Taille minimum pour générer un chunk séparé (en bytes)
    chunkSizeWarningLimit: 500,
    
    // Minification
    minify: 'esbuild',
    
    // Génère les sourcemaps pour le debug en production
    sourcemap: false,
  },
  
  // Optimisation des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  // Configuration du serveur de preview
  preview: {
    port: 4173,
    open: true,
  },
})
