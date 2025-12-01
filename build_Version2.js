// Simple build script that bundles+minifies JS (esbuild) and minifies CSS (csso).
// Usage:
//   npm run build      -> builds once
//   npm run watch      -> builds and watches for changes
//
// Requires Node.js (>=12) and the dependencies listed in package.json.

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const csso = require('csso');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

function ensureDist() {
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
}

function buildCSS() {
  const src = path.join(SRC_DIR, 'styles.css');
  const out = path.join(DIST_DIR, 'styles.min.css');
  const css = fs.readFileSync(src, 'utf8');
  const result = csso.minify(css).css;
  fs.writeFileSync(out, result, 'utf8');
  console.log('[css] Written', path.relative(process.cwd(), out));
}

async function buildJS(watch = false) {
  const entry = path.join(SRC_DIR, 'script.js');
  const out = path.join(DIST_DIR, 'script.min.js');

  const common = {
    entryPoints: [entry],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: out,
    platform: 'browser',
    target: ['es2018'],
    logLevel: 'info',
  };

  if (watch) {
    const ctx = await esbuild.context(common);
    await ctx.watch();
    console.log('[js] Watching and building to', path.relative(process.cwd(), out));
  } else {
    await esbuild.build(common);
    console.log('[js] Built', path.relative(process.cwd(), out));
  }
}

async function main() {
  ensureDist();
  const args = process.argv.slice(2);
  const watch = args.includes('--watch') || args.includes('watch');

  // initial build
  buildCSS();
  await buildJS(watch);

  if (watch) {
    // watch CSS changes
    const cssFile = path.join(SRC_DIR, 'styles.css');
    fs.watch(cssFile, { persistent: true }, (eventType) => {
      if (eventType === 'change') {
        try {
          buildCSS();
        } catch (err) {
          console.error('[css] Error during rebuild:', err);
        }
      }
    });
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});