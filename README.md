# MT Games

MT Games is a Next.js 14 + TypeScript browser-game site with four original games:

- **Sky Ball** — a Three.js platform game with 40 original courses, checkpoints, stars, and saved level progression.
- **Cloud Sprint** — a third-person 3D endless runner with lane changes, jumps, obstacles, collectible orbs, and a saved best distance.
- **Prism Pop** — an eight-by-eight match-three puzzle with cascades, move-limited score goals, and saved level progress.
- **Neon Drift** — a 3D arcade racer with traffic, lane changes, a speed ramp, and a saved best distance.

The 3D games use the locally bundled Three.js asset in `public/game/three.min.js`; gameplay does not load a third-party game engine. Shared game settings, per-game tutorials, progress-based achievements, original guides, and game-specific FAQs are included.

## Pages
Home `/`, game library `/games`, game pages `/games/[slug]`, guides `/guides`, awards `/awards`, FAQ `/faq`, plus How to Play, Levels, Tips, About, Contact, Privacy, Terms, custom 404, `sitemap.xml`, and `robots.txt`. The legacy `/play` route redirects to `/games/sky-ball` and preserves a selected `?level=` value.

## Requirements
Node.js 18.18 or newer and npm.

## Run locally
```bash
npm install
cp .env.example .env.local      # then edit the values (see "Owner configuration")
npm run dev                      # http://localhost:3000
```

## Production build
```bash
npm run build
npm start                        # serves the production build on http://localhost:3000
```

## Tests
```bash
npm test                         # Sky Ball: all 40 levels, physics, progress, keyboard, and touch joystick
npm run build                    # production compile and static route generation
npm start                        # serve the production build
npm run test:site                # routes, links, 404, sitemap, robots, and public assets
```
The Sky Ball headless test runs the real game script with a stubbed DOM/Three.js; it does not validate rendered graphics. The 3D mini-games use WebGL and should also be checked in real desktop and mobile browsers.

## Owner configuration (you must fill these in)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your real site address, e.g. `https://skyball-mt-games.vercel.app` (no trailing slash). Used for canonical URLs, sitemap and robots. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional override for the MT Games contact email shown on the Contact and Privacy pages. Defaults to the published address in `lib/site.ts`. |

The brand name "MT Games" and published contact email are set in `lib/site.ts`. Set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` or your hosting environment to override the address. The Contact page links directly to email and opens a prefilled message in the visitor's email app. Scores, settings, tutorials, and achievement unlocks use local browser storage and do not sync between devices. Keep the Privacy Policy and Terms of Use accurate for the services and features currently enabled on the site.

## Deploy to Vercel (step by step)
1. Create a GitHub repository and push this project:
   ```bash
   git init && git add . && git commit -m "Sky Ball"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
   git push -u origin main
   ```
2. Go to https://vercel.com, sign in, click **Add New → Project**, and import the repository.
3. Framework preset should be detected as **Next.js**. Leave build and output settings at their defaults.
4. Open **Environment Variables** and add `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL`.
5. Click **Deploy**. When it finishes, open the live URL.
6. Test the live site: every page, `/sitemap.xml`, `/robots.txt`, and the game on a desktop browser and on a phone (touch joystick, pause, mute, level unlock).
7. If you used a temporary `*.vercel.app` address in step 4, update `NEXT_PUBLIC_SITE_URL` once you have your final domain and redeploy.

Alternative using the CLI: `npm i -g vercel && vercel` (preview) then `vercel --prod`.

### Custom domain (later)
Vercel project → **Settings → Domains** → add your domain → add the DNS records Vercel shows at your registrar (an A record for the apex domain and a CNAME for `www`) → wait for verification. Then set `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy.

## Google AdSense readiness notes
The site includes Google's AdSense script and a public `ads.txt` publisher entry. Their presence does not mean ads are currently displayed or that approval is guaranteed. Keep the Privacy Policy accurate about this setup, and follow Google's requirements for consent where applicable. Do not place ads over the game or near game controls, and never encourage clicks.

## Project structure
```
app/            pages, layout, sitemap.ts, robots.ts, not-found.tsx
components/     site navigation, game experience settings, game frames, and game UI
lib/            site config, game descriptions, level data
public/game/    local Three.js engine and standalone 3D game pages
tests/          game.test.js, site.test.js
```
