/* Shared, dependency-free tuning presets. Frequencies use A4 = 440 Hz. */
(function(root, factory){
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NEEDLE_PRESETS = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  'use strict';
  var LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  var NATURAL = [0, 2, 4, 5, 7, 9, 11];
  var SIGNATURES = {
    C:0, G:1, D:2, A:3, E:4, B:5, 'F#':6, 'C#':7,
    F:-1, Bb:-2, Eb:-3, Ab:-4, Db:-5, Gb:-6, Cb:-7
  };
  var GUITAR = [
    { name:'Low E', note:'E2', freq:82.41, side:'left' },
    { name:'A', note:'A2', freq:110, side:'left' },
    { name:'D', note:'D3', freq:146.83, side:'left' },
    { name:'G', note:'G3', freq:196, side:'right' },
    { name:'B', note:'B3', freq:246.94, side:'right' },
    { name:'High E', note:'E4', freq:329.63, side:'right' }
  ];
  function midiToFrequency(midi){
    if (!Number.isFinite(midi)) throw new RangeError('MIDI note must be finite');
    return 440 * Math.pow(2, (midi - 69) / 12);
  }
  function harp(options){
    options = options || {};
    var key = options.key === undefined ? 'C' : options.key;
    var start = options.start === undefined ? 'C' : options.start;
    var octave = options.octave === undefined ? 4 : options.octave;
    if (!Object.prototype.hasOwnProperty.call(SIGNATURES, key)) throw new RangeError('Unsupported major key');
    var first = LETTERS.indexOf(start);
    if (first < 0) throw new RangeError('Starting note must be a natural letter C through B');
    if (!Number.isInteger(octave) || octave < 2 || octave > 4) throw new RangeError('Starting octave must be 2, 3 or 4');
    var count = SIGNATURES[key];
    var order = count >= 0 ? ['F','C','G','D','A','E','B'] : ['B','E','A','D','G','C','F'];
    var altered = order.slice(0, Math.abs(count));
    return Array.from({ length:14 }, function(_, i){
      var position = first + i;
      var degree = position % 7;
      var letter = LETTERS[degree];
      var writtenOctave = octave + Math.floor(position / 7);
      var alteration = altered.indexOf(letter) < 0 ? 0 : (count >= 0 ? 1 : -1);
      var accidental = alteration > 0 ? '#' : (alteration < 0 ? 'b' : '');
      var midi = 12 * (writtenOctave + 1) + NATURAL[degree] + alteration;
      return {
        name:'String ' + (i + 1), note:letter + accidental + writtenOctave,
        midi:midi, freq:midiToFrequency(midi), side:i < 7 ? 'left' : 'right'
      };
    });
  }
  function guitar(){
    return GUITAR.map(function(s){ return Object.assign({}, s); });
  }
  function detectionBounds(targets){
    if (!targets || !targets.length || targets.some(function(s){ return !Number.isFinite(s.freq) || s.freq <= 0; })) {
      throw new RangeError('Positive target frequencies required');
    }
    var frequencies = targets.map(function(s){ return s.freq; });
    var margin = Math.pow(2, 100 / 1200);
    return { min:Math.min.apply(null, frequencies) / margin, max:Math.max.apply(null, frequencies) * margin };
  }
  return { harp:harp, guitar:guitar, midiToFrequency:midiToFrequency,
    detectionBounds:detectionBounds, keys:Object.keys(SIGNATURES) };
});
