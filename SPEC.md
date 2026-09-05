# Methodz Flame Tuner — Interaction Spec

## Core visual

Analog VU meter is the pitch readout.

- Curved scale, cream-white on the **flat** (left) and **sharp** (right) bands
- Center window is a cut-through: the Methodz M-shield **flame only appears here**, and only when the needle is in that window
- Needle pivots from the hub below the arc
- 3+3 tuning pegs still flank the meter like a guitar headstock

## Needle color (continuous)

The needle itself changes color. Green is reserved for locked-in pitch.

| Cents (relative to target) | Needle | Flame |
|---|---|---|
| No signal / idle | Dim silver, resting at 0 | Hidden |
| ≤ −40 | Warm amber | Hidden |
| −40 → −8 | Amber → green blend | Hidden |
| −5 → +5 | **Green** — in tune | **Flame visible** in the center window |
| +8 → +40 | Green → ice-blue blend | Hidden |
| ≥ +40 | Ice blue | Hidden |

Smoothing: lerp needle angle and color over ~120–180 ms so it does not flicker between plucks.

Flame opacity ramps in inside ±10 ¢ and is full at ±5 ¢. Outside that window it is gone — not a dimmer flame, gone.

## Peg layout (6-string, player-facing headstock)

```
Left column (bass side)     Right column (treble side)
  ⑥ Low E                      ③ G
  ⑤ A                          ② B
  ④ D                          ① High E
```

- Inactive pegs: dim metal, no rotation
- Active string peg: lit rim + rotates with cents
- Rotation: `angle = clamp(cents, −50, 50) * 2.4°`
  Flat (negative) → one direction (tighten)
  Sharp (positive) → opposite (loosen)
  Settles to 0° when in tune

## Note on physics

Audio alone cannot sense which way you turned a physical peg. The screen pegs and the analog needle both mirror **pitch error**, which is what a player needs while turning the real machine head.

## Assets

- `flame_tune.js` — Methodz flame, clipped to the center window, shown only when in tune
- `flame_flat.js` / `flame_rising.js` / `flame_sharp.js` — retained for the brand pack; not the pitch readout
