# Methodz Flame Tuner — Interaction Spec

## Core visual
Center: Methodz M shield (silver + electric blue).
Flame inside the M is the pitch readout.
3+3 tuning pegs flank the shield like a guitar headstock.

## Cents → flame (continuous)

| Cents (relative to target) | Flame |
|---|---|
| ≤ −40 | Tiny blue sparks only — almost dead |
| −40 → −8 | Flame grows upward; red core begins to appear |
| −5 → +5 | **IN TUNE** — steady loop (video), clear red-orange core, soft particles |
| +8 → +40 | Flame enlarges; red core fades |
| ≥ +40 | Raging pure blue, no red core, energy arcs |

Smoothing: lerp flame intensity over ~120–180 ms so it doesn’t flicker between plucks.

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
- Peg “spins with the tuning” = visual instruction of how far / which way to turn that string’s real peg

## Note on physics
Audio alone cannot sense which way you turned a physical peg. The screen pegs mirror **pitch error**, which is what a player needs while turning the real machine head.

## Assets
- `state_flat_sparks.jpg` — far flat
- `state_rising.jpg` — approaching from below
- `state_in_tune.jpg` — locked (matches loop mood)
- `state_sharp_rage.jpg` — far sharp
- `in_tune_loop.mp4` — original 10s steady flame loop for perfect state
- `demo.html` — interactive mock (cents slider + string select)
