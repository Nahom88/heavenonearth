import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import type { PluginOption } from 'vite';

// Dynamic imports for production-only dependencies
const getProductionPlugins = (env: Record<string, string>) => {
  const plugins: PluginOption[] = [];
  
  // Production plugins will be added here
  
  return plugins;
  
  return plugins;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // Load env variables based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  const isProduction = mode === 'production';
  
  return {
    // Base public path when served in production
    base: '/',
    
    // Build configuration
    build: {
      target: 'esnext',
      minify: isProduction ? 'terser' : 'esbuild',
      sourcemap: isProduction ? 'hidden' : false,
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['lodash', 'axios', 'zod', 'react-hook-form'],
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
    },
    
    // Server configuration
    server: {
      host: '::',
      port: 8080,
      strictPort: true,
      hmr: {
        overlay: false,
      },
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },
    
    // Preview server configuration
    preview: {
      port: 8081,
      strictPort: true,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },
    
    // Plugins
    plugins: [
      react(),
      
      // Development-only plugins
      ...(mode !== 'production' ? [componentTagger()] : []),
      
      // Production plugins
      ...(mode === 'production' ? [
        // Add production plugins here
      ] : []),
      
    ].filter(Boolean),
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    // CSS configuration
    css: {
      devSourcemap: !isProduction,
      modules: {
        generateScopedName: isProduction 
          ? '[hash:base64:8]' 
          : '[name]__[local]__[hash:base64:5]',
      },
    },
    
    // Environment variables
    define: {
      'process.env': {},
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
