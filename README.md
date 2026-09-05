# Needle

**Methodz analog guitar tuner** — real-time pitch detection with a cream-white VU scale, a color-changing needle, and the Methodz flame only when you lock in.

Live: **[tuning.methodz.ca](https://tuning.methodz.ca)**

## How it works

- Microphone → lightweight autocorrelation pitch detection
- Analog needle swings across a white left/right scale
- Needle color: **amber (flat) → green (in tune) → ice blue (sharp)**
- Methodz flame appears **only** in the center window when you are in tune
- 3+3 headstock pegs rotate with pitch error so you can see which way to turn the real machine heads
- Manual cents slider for testing without a guitar

See `SPEC.md` for the full interaction map.

## Deploy

Static site. Point any host (Vercel, Cloudflare Pages, etc.) at this repo.

### Vercel + custom domain

1. Import `ziddi3/needle` in Vercel
2. Add domain `tuning.methodz.ca`
3. In Porkbun (methodz.ca DNS):

| Type  | Host    | Answer                |
|-------|---------|-----------------------|
| CNAME | `tuning`| `cname.vercel-dns.com`|

(Use the exact target shown in the Vercel domain panel.)

## Stack

- Pure HTML / CSS / SVG / Web Audio API
- No build step required
- Mobile-first, dark workshop aesthetic

## Roadmap

- [ ] YIN pitch detector (higher accuracy on low strings)
- [ ] Alternate tunings (Drop D, Open G, etc.)
- [ ] Reference tone + haptics
- [ ] PWA install

---

Methodz · Needle
