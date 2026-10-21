# Meesho Innovation Strategy: Interactive Prototype Showcase

This repository contains **3 self-contained, interactive prototype workflows** created for the Meesho case competition presentation. Each prototype ties together detailed Figma wireframes into a seamless, glitch-free user flow that judges can test live on any device or browser with zero setup.

---

## Live Demo / Prototype Files

| File | Feature Name | Description & Flow |
|---|---|---|
| [**`onboarding-to-shopping.html`**](onboarding-to-shopping.html) | **Personalised Onboarding → Smart Shopping** | Seamlessly connects intent-based onboarding (gender, age, interests) directly into AI review summarization with audio TTS, 4-product side-by-side comparison tables, and "Complete the Look" smart bundling. |
| [**`microdrama.html`**](microdrama.html) | **MiniDrama & Customizable Prints** | Snackable short-video stories ("First Salary") with organic product discovery ("Seen in Episode 6" trimmer), 1-tap ordering, automatic return-to-story, and an interactive personalized merch customizer (T-Shirts, Mugs, Hoodies). |
| [**`agentic.html`**](agentic.html) | **Aarav: Agentic Shopping Assistant** | Multilingual, voice-first autonomous commerce agent for Bharat users. Listens to Hindi/Hinglish voice queries, filters deals, autonomously configures carts, requests verification ("Aarav never pays without your YES"), and tracks packages. |
| [**`index.html`**](index.html) | **Presentation Hub & Portal** | Executive landing page linking directly to all three prototypes with feature overviews and presentation notes. |

---

## Key Features for Presenting to Judges

### 1. Zero-Glitch, Self-Contained Execution
- **No Node.js or `npm install` needed** for judges to review.
- Everything (React 18, Babel standalone, Tailwind/custom CSS tokens, icons, and state logic) is cleanly bundled into single HTML files.
- Double-click any file locally on Windows/Mac, or host on **GitHub Pages** with one click.

### 2. Built-in Vertical Navigation Panel
Every prototype includes a sleek, sticky vertical panel on the left with:
- **Instant Step Navigation:** Jump directly to any screen or wireframe state during judge Q&A (e.g. jump directly to the AI comparison table or the verification modal).
- **↺ Reset Flow Button:** Quickly restore the prototype back to Step 1 for the next demonstration.
- **Natural Device Mode:** Judges can also ignore the panel and interact directly with the phone shell like a real native mobile app.
- **Responsive Drawer:** On smaller mobile viewports, the panel neatly collapses into an accessible quick-drawer.

---

## Detailed Workflow Breakdowns

### 1. `onboarding-to-shopping.html`
- **Splash Screen:** Animated Meesho branding with quick start.
- **Voice-Assisted Onboarding:** Text-to-speech speaker button for Hindi/English audio assistance; gender & age selection with personalized card states.
- **Multi-select Interests:** Dynamic chips for categories (Fashion, Shoes, Gadgets, etc.) with live counter.
- **Personalized Home Feed:** Displays custom recommendations tailored to selected interests.
- **Transition Banner:** *"🎉 Onboarding Complete! Your preferences are saved. Now explore Smart Shopping →"*
- **Product Listing & Compare Tray:** Select up to 4 items with active badges and clear tray controls.
- **Side-by-Side Comparison Matrix:** Specs comparison across price, rating, reviews, material, and UV protection.
- **Product Details & AI Review Summary:**
  - AI Pros & Cons extracted from 6,000+ reviews.
  - Sentiment distribution bar chart (78% Positive, 15% Neutral, 7% Negative).
  - Text-to-Speech audio button: *"Listen to summary"*.
- **Cart & Smart Bundling:** Complete the look bundle suggestion with 1-click cart addition.

---

### 2. `microdrama.html`
- **Meesho Home Feed:** Prominent "Watch. Discover. Shop." banner and trending story previews.
- **MiniDrama Discover Hub:** Genre filters (Comedy, Love, Career, Family) and continue watching card.
- **Series Page ("First Salary"):** Episode guide, synopsis, and cast details.
- **In-Video Episode Player (Episode 6):**
  - Scene-by-scene script dialogues with sound playback toggle.
  - Interactive product tag: *"Seen in this episode: Nova Cordless Trimmer for ₹699"*.
- **Seamless E-commerce Checkout:** Product detail view with "Seen in First Salary" context badge, variant selector, and Buy Now button.
- **Return-to-Story Hook:** Confirmation screen features: *"YOUR STORY IS WAITING: Pick up exactly where you left off in Episode 6"*.
- **Next Episode Hook:** Seamlessly transitions into Episode 7 ("Salary Aa Gayi!" featuring Fire-Boltt Smartwatch).
- **Customizable Prints Studio:**
  - Product selection: T-Shirt, Shirt, Hoodie, Pillow, Mug.
  - Interactive photo upload or custom text printing.
  - Real-time live 3D merch preview with color switching (White, Black, Pink, Blue) and size selection.

---

### 3. `agentic.html`
- **12 Connected Stages in a Single Realistic Mobile Frame:** Shows one screen at a time with smooth transitions, working Back and Edit actions, audio waveforms, and interactive CTAs:
  1. *01 Meet Aarav*: Greeting and wake-word introduction.
  2. *02 Listen to Request*: Audio waveform recording user speech in Hindi.
  3. *03 Understand Intent*: Multi-intent semantic parsing.
  4. *04 Search & Filter*: Automated price and rating filtering.
  5. *05 Review Intelligence*: Autonomous evaluation of product ratings and specs.
  6. *06 Decide the Best Buy*: Selection of best value bundle.
  7. *07 Select Size & Colour*: Contextual preference matching.
  8. *08 Act & Build Cart*: Automated cart assembly and coupon application.
  9. *09 Review Checkout*: Automated check of address, delivery, and payment.
  10. *10 Verify & Confirm*: Crucial safety guardrail: *"Aarav never pays without your YES"*.
  11. *11 Order Placed*: Instant UPI execution on voice confirmation.
  12. *12 Track with Aarav*: Continuous post-order assistant updates.

---

## How to Host on GitHub Pages

1. **Push to GitHub:**
   ```bash
   git push -u origin meesho-wireframes
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **`meesho-wireframes`** and folder **`/ (root)`**, then click **Save**.
   - In 1 to 2 minutes, your live URL will be active at:
     `https://<your-username>.github.io/<your-repo-name>/`
   - Visiting the link will automatically open `index.html`, where judges can test all 3 prototypes.
