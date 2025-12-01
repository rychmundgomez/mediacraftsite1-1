# MediaCraft — build & asset pipeline

This repository contains the single-file HTML for the MediaCraft landing page with sources split into CSS and JS and a small build script.

Files of interest
- index.html — uses compiled assets at `dist/styles.min.css` and `dist/script.min.js`.
- src/styles.css — original CSS source (minified to dist during build).
- src/script.js — original JS source (bundled + minified by esbuild to dist).
- build.js — Node build script (uses esbuild and csso).
- package.json — scripts and devDependencies.

Quick start
1. Install dependencies:
   npm install

2. Build once:
   npm run build

   This creates `dist/styles.min.css` and `dist/script.min.js`. Open `index.html` in a browser (or serve the folder).

3. Development (watch):
   npm run watch

   This watches JS and CSS and rebuilds on change.

4. Serve locally for quick testing:
   npx serve .

Notes
- The build script is intentionally small and dependency-light:
  - esbuild for JS bundling/minification (fast).
  - csso for CSS minification.

- You can replace csso with PostCSS + cssnano or extend esbuild plugins if you want source maps, critical CSS extraction, or more advanced processing.
