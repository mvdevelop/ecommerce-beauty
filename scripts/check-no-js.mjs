import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function findJavaScript(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const matches = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) matches.push(...await findJavaScript(path));
    else if (/\.(js|jsx)$/.test(entry.name)) matches.push(path);
  }
  return matches;
}

const matches = await findJavaScript('src');
if (matches.length) {
  console.error(`JavaScript files are not allowed in src:\n${matches.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('No JavaScript files found in src.');
}
