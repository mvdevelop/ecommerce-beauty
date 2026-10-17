import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['**/node_modules/**', '**/.claude/worktrees/**'],
    setupFiles: './src/test-setup.ts',
    coverage: { provider: 'v8', reporter: ['text', 'html'] },
  },
});
