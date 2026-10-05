# Figma Make App

A React + Vite + Tailwind CSS project running inside Figma Make, packaged as a single self-contained HTML file for easy sharing and deployment.

## Project Overview

This project combines a Figma Make Vite+React+Tailwind application into one self-contained HTML file. It includes:

- **React 19** — UI rendering via CDN (UMD build)
- **Tailwind CSS v4** — `@import 'tailwindcss'` in a `<style>` tag
- **Figma Make integration** — meta tags, site configuration, and HTML shell
- **Self-contained** — no build step required, just open in a browser

## File Structure

```
figma-make-app-self-contained.html  ← single self-contained HTML file
README.md                          ← project documentation
```

## What's Included from the Original Project

| Original File | In this file? | Notes |
|---|---|---|
| `index.html` | ✅ | HTML shell + meta tags |
| `vite.config.ts` | ✅ | Plugin configuration reflected in meta tags |
| `src/index.css` | ✅ | Tailwind CSS v4 via `@import` |
| `package.json` | ✅ | Dependencies noted in README |
| `.gitignore` | ✅ | Standard ignores |
| `AGENTS.md` | ✅ | Embedded configuration |
| `CLAUDE.md` | ✅ | Embedded documentation |

## Key Configuration (from site.json)

- **Title**: `Figma Make App`
- **Language**: `en`
- **Robots**: `noindex, nofollow`
- **Analytics**: None configured
- **Favicon**: None configured
- **Open Graph**: None configured

## Running the App

Just open `figma-make-app-self-contained.html` in a browser:

```bash
# Option 1: Open directly
open figma-make-app-self-contained.html

# Option 2: Serve with any static server
npx serve .
# or
python -m http.server
```

## Development Notes

- The `figmaSiteConfiguration` plugin injects meta tags into the HTML head
- `figmaErrorOverlayReplay` and `figmaReactRefreshBoundaryFallback` are Vite dev-only plugins
- `figmaMakeKitPlugin` serves `/.figma/make/kit.html` for Figma preview integration

## License

Private — For internal use only.
