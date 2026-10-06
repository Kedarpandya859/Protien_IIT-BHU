# Meesho Wireframe Prototype

This repository brings the three supplied interactive Meesho prototype projects into one React + Vite repo. Its multi-page build keeps each flow's design and interactions isolated while making the prototype set available from one development server.

## Included flows

- [Meesho shopping, comparison, and review flows](./src/App.tsx) — product listings, comparisons, product details, review summaries, review themes, and the browser voice assistant.
- [Agentic voice shopping journey](./prototypes/voice-shopping/src/App.tsx) — 12 interactive mobile frames, from voice request through search, review intelligence, comparison, cart, checkout, approval, and order tracking.
- [Personalized onboarding journey](./prototypes/onboarding/src/App.tsx) — splash, gender, age, interests, and personalized shopping home.

Open the main listing and use **Explore the wireframes** to launch the voice-shopping or onboarding flows.

## Voice assistant

On the product listing, select **Talk now**. Allow microphone access, choose a response language, then tap **Tap to speak** and ask for a product. The assistant can recommend demo products, open product details, and prepare a product comparison. Sample requests are available if microphone access is unavailable.

Voice input uses the browser's Web Speech API and is best supported in Chrome or Edge on localhost or HTTPS. Product matching is a local demo interaction; it does not connect to a cloud AI service or use an API key.

## Run locally

```bash
npm install
npm run dev
```

## Additional prototype routes

With the development server running, open:

- `http://localhost:8443/prototypes/voice-shopping/`
- `http://localhost:8443/prototypes/onboarding/`

## Build and type-check

```bash
npm run build
npx tsc --noEmit
```

## Notes

This project was initialized in a standalone Git repository so it can be committed and pushed to GitHub as a single repo.
