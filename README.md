# Meesho Wireframe Prototype

This repo contains a single-page React + Vite prototype implementing the Meesho-style mobile shopping wireframes and interactive product flows.

## Included

- Meesho-inspired mobile shopping interface
- Product listing and comparison screens
- Detail/review/AI recommendation flows
- Browser-based voice shopping assistant with speech input and spoken replies
- Interactive elements for the wireframe prototype

## Voice assistant

On the product listing, select **Talk now**. Allow microphone access, choose a response language, then tap **Tap to speak** and ask for a product. The assistant can recommend demo products, open product details, and prepare a product comparison. Sample requests are available if microphone access is unavailable.

Voice input uses the browser's Web Speech API and is best supported in Chrome or Edge on localhost or HTTPS. Product matching is a local demo interaction; it does not connect to a cloud AI service or use an API key.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

This project was initialized in a standalone Git repository so it can be committed and pushed to GitHub as a single repo.
