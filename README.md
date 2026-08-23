# Needle

**Methodz flame guitar tuner** — real-time pitch detection with the Methodz M-shield flame feedback and spinning headstock pegs.

Live target: **[tuning.methodz.ca](https://tuning.methodz.ca)**

## How it works

- Microphone → lightweight autocorrelation pitch detection
- Cents offset drives the **flame state machine** (sparks → rising → locked red core → raging blue)
- 3+3 tuning pegs rotate with pitch error so you can see which way / how far to turn the real machine heads
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

- Pure HTML / CSS / Canvas / Web Audio API
- No build step required
- Mobile-first, dark workshop aesthetic

## Roadmap

- [ ] Swap canvas flame for the real Methodz loop assets + state images
- [ ] YIN pitch detector (higher accuracy on low strings)
- [ ] Alternate tunings (Drop D, Open G, etc.)
- [ ] Reference tone + haptics
- [ ] PWA install

---

Methodz · Needle
