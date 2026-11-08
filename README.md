# Needle

**Methodz analog harp and guitar tuner** — real-time pitch detection with a cream-white VU scale, a color-changing needle, and the Methodz flame only when you lock in.

Live: **[tuning.methodz.ca](https://tuning.methodz.ca)**

## How it works

- Microphone → lightweight autocorrelation pitch detection
- Analog needle swings across a white left/right scale
- Needle color: **amber (flat) → green (in tune) → ice blue (sharp)**
- Methodz flame appears **only** in the center window when you are in tune
- 3+3 headstock pegs rotate with pitch error so you can see which way to turn the real machine heads
- Manual cents slider for testing without a guitar

See `SPEC.md` for the full interaction map.

## 14-string harp

Fresh loads select **14-string harp → C major → starting C, octave 4**: C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5.
This is a configurable example, **not a universal physical harp range**. Match your manufacturer's specified string range and tuning; never exceed a string's rated pitch. A key change is not permission to increase string tension. Check the manufacturer's lever/tuning instructions first.

- Choose any of 15 major key signatures (C, sharps or flats), starting natural letter, and starting octave 2–4.
- The key signature alters those 14 consecutive lettered strings; it does not move the lowest string to the key's tonic. For example, G major with starting C4 changes F4/F5 to F#4/F#5 and retains the C starting letter.
- Scientific pitch notation and target frequencies (A4 = 440 Hz) are shown for every harp string. Target labels are visible before the microphone is enabled.
- Setup/target changes clear old pitch readings, manual offsets, and lock indicators. Listening can continue after setup changes, but only fresh audio can lock the meter.
- Seven pegs per side; harp chips wrap to four columns on narrow screens.
- Select **6-string guitar · standard** for the original six guitar targets and layout.
- Manual mode simulates a cents offset; it does not measure the instrument or produce a reference tone.
- Microphone access needs HTTPS (or localhost) and browser permission. Pluck a single string and damp neighbouring strings. Phone microphones and autocorrelation may misidentify harmonics; confirm the written octave against the harp's specified tuning.

## Tests

No dependencies or build step. With Node.js 18 or newer:

```sh
node --test tests/tuning-presets.test.cjs
```

Before release, check both instrument modes on desktop and mobile: key/range changes must rebuild without duplicate pegs, clear the old lock/manual offset, and update all target notes. Check manual controls and microphone permission/stop behaviour, and test representative low/high strings with a known reference source.

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
