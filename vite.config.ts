import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Expose API_KEY to the client-side
      // WARNING: In a production app without a backend, this is visible to users.
      // Since we are using client-side Gemini calls, this is necessary for this architecture.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});