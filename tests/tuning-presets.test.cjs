const test = require('node:test');
const assert = require('node:assert/strict');
const presets = require('../tuning-presets.js');
function close(actual, expected, tolerance = 1e-6){
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);
}
test('fresh default is 14 diatonic targets, C4 through B5 in C major', () => {
  const targets = presets.harp();
  assert.equal(targets.length, 14);
  assert.deepEqual(targets.map(s => s.note), ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5']);
  assert.equal(targets.filter(s => s.side === 'left').length, 7);
  assert.equal(targets.filter(s => s.side === 'right').length, 7);
  assert.deepEqual(targets.map(s => s.name), Array.from({length:14}, (_, i) => `String ${i + 1}`));
});
test('equal temperament uses precise frequencies and A4 = 440', () => {
  const targets = presets.harp();
  close(targets[0].freq, 261.625565300599);
  close(targets[5].freq, 440);
  close(targets[13].freq, 987.766602512248);
  close(presets.midiToFrequency(69), 440);
  close(presets.midiToFrequency(81), 880);
  close(targets[7].freq / targets[0].freq, 2);
});
test('G major changes the F strings, not the physical starting letter', () => {
  const c = presets.harp();
  const g = presets.harp({key:'G'});
  assert.equal(g[0].note, 'C4');
  assert.equal(g[3].note, 'F#4');
  assert.equal(g[10].note, 'F#5');
  close(g[3].freq / c[3].freq, 2 ** (1 / 12));
  assert.equal(g[0].freq, c[0].freq);
});
test('flat signatures produce Bb and Eb at the right octaves', () => {
  assert.equal(presets.harp({key:'F'})[6].note, 'Bb4');
  const bb = presets.harp({key:'Bb'});
  assert.equal(bb[2].note, 'Eb4');
  assert.equal(bb[13].note, 'Bb5');
});
test('extreme signatures preserve correct written octave for enharmonics', () => {
  const cs = presets.harp({key:'C#'});
  assert.equal(cs[6].note, 'B#4');
  close(cs[6].freq, presets.midiToFrequency(72));
  const cb = presets.harp({key:'Cb'});
  assert.equal(cb[0].note, 'Cb4');
  close(cb[0].freq, presets.midiToFrequency(59));
});
test('starting natural note wraps from B to C in the next octave', () => {
  const t = presets.harp({start:'B', octave:3});
  assert.equal(t[0].note, 'B3');
  assert.equal(t[1].note, 'C4');
  assert.equal(t[13].note, 'A5');
});
test('octave selector moves the whole range by a frequency factor of two', () => {
  const low = presets.harp({octave:3});
  const high = presets.harp({octave:4});
  high.forEach((s, i) => close(s.freq / low[i].freq, 2));
});
test('all 15 signatures and all supported starting notes/ranges yield 14 ascending pitches', () => {
  assert.equal(presets.keys.length, 15);
  for (const key of presets.keys) for (const start of ['C','D','E','F','G','A','B']) for (const octave of [2,3,4]) {
    const targets = presets.harp({key, start, octave});
    assert.equal(targets.length, 14);
    assert.equal(new Set(targets.map(s => s.midi)).size, 14);
    targets.forEach((s, i) => {
      assert.ok(Number.isFinite(s.freq));
      if (i) assert.ok(s.freq > targets[i - 1].freq);
    });
  }
});
test('dynamic detection bounds include targets below 60 Hz and above 1200 Hz', () => {
  const low = presets.harp({key:'Cb', octave:2});
  const high = presets.harp({start:'B', octave:4});
  assert.ok(low[0].freq < 65);
  assert.ok(presets.detectionBounds(low).min < 60);
  assert.ok(high.at(-1).freq > 1200);
  for (const targets of [low, high]) {
    const bounds = presets.detectionBounds(targets);
    targets.forEach(s => assert.ok(s.freq > bounds.min && s.freq < bounds.max));
  }
});
test('rebuilding presets has no shared mutable target objects', () => {
  const a = presets.harp(); a[0].note = 'changed';
  assert.equal(presets.harp()[0].note, 'C4');
  const g = presets.guitar(); g[0].freq = 1;
  assert.equal(presets.guitar()[0].freq, 82.41);
});
test('original six-string guitar pitches and sides are preserved', () => {
  assert.deepEqual(presets.guitar().map(s => [s.note,s.freq,s.side]), [
    ['E2',82.41,'left'],['A2',110,'left'],['D3',146.83,'left'],
    ['G3',196,'right'],['B3',246.94,'right'],['E4',329.63,'right']
  ]);
});
test('invalid selections and frequencies are rejected', () => {
  for (const options of [{key:'unknown'},{key:'toString'},{start:'C#'},{octave:1},{octave:5},{octave:3.5}]) {
    assert.throws(() => presets.harp(options), RangeError);
  }
  assert.throws(() => presets.midiToFrequency(NaN), RangeError);
  assert.throws(() => presets.detectionBounds([]), RangeError);
  assert.throws(() => presets.detectionBounds([{freq:0}]), RangeError);
});
