import { execSync } from 'child_process';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '..');

console.log('Regenerating pnpm-lock.yaml...');
try {
  execSync('pnpm install', { cwd: projectRoot, stdio: 'inherit' });
  console.log('Successfully regenerated pnpm-lock.yaml');
} catch (error) {
  console.error('Failed to regenerate lockfile:', error.message);
  process.exit(1);
}
