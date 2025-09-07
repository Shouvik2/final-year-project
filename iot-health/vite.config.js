import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- Should now be found

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Plugin is active
  ],
});
