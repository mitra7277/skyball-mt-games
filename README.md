# Sky Ball: 3D Challenge

A free 3D ball-balancing browser game with 10 levels, built as a Next.js 14 + TypeScript + Tailwind site.
The game itself is a self-contained Three.js page in `public/game/skyball.html` (Three.js r128 is bundled in `public/game/three.min.js`, so the game makes no third-party requests). It is embedded on `/play` in an iframe.

## Pages
Home `/`, Play `/play` (supports `/play?level=N`), How to Play, Levels, Tips & Guides, About, Contact, Privacy Policy, Terms of Use, custom 404, `sitemap.xml` and `robots.txt`.

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
npm test                         # game logic: all 10 levels, collisions, checkpoints, save/unlock, keyboard, touch joystick
npm start &                      # in another terminal (after npm run build)
npm run test:site                # routes, links, 404, sitemap, robots, assets
```
The game test runs the real game script in Node with a stubbed DOM/Three.js, so it checks logic, not graphics. Always also play it in real browsers on desktop and a phone before launch.

## Owner configuration (you must fill these in)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your real site address, e.g. `https://yourgame.com` (no trailing slash). Used for canonical URLs, sitemap and robots. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional override for the MT Games contact email shown on the Contact and Privacy pages. Defaults to the published address in `lib/site.ts`. |

The brand name "MT Games" and published contact email are set in `lib/site.ts`. Set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` or your hosting environment to override the address. The Contact page links directly to email and opens a prefilled message in the visitor's email app. Also review the Privacy Policy and Terms of Use for your own situation (they are general templates, not legal advice).

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
The site has the pages AdSense reviewers expect (About, Contact, Privacy, Terms) and original content, but **no ad code is included** and approval is never guaranteed. If you add ads later: use only Google's official code, update the Privacy Policy (and add a consent banner where required), never place ads over the game, near the Play button or near the controls, and never encourage clicks.

## Project structure
```
app/            pages, layout, sitemap.ts, robots.ts, not-found.tsx
components/     header, footer, game iframe, level grid, contact form
lib/            site config, level info, tips content
public/game/    skyball.html (the game) and three.min.js
tests/          game.test.js, site.test.js
```
