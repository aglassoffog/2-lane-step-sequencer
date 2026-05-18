// 33〜44  A1　 55.00,  61.74,  65.41,  73.42,  82.41,  87.31,  98.00
// 45〜56  A2  110.00, 123.47, 130.81, 146.83, 164.81, 174.61, 196.00
// 57〜68  A3  220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00
// 69〜80  A4  440.00, 493.88
// 81〜92  A5  880.00, 
// 93〜104 A6  1760.00
const scaleTypes = [
  "Off", "Penta", "Major", "Minor"
];

const scaleList = [
  [],
  [0, 2, 4, 7, 9],        // C4メジャーペンタ, 60, 62, 64, 67, 69
  [0, 2, 4, 5, 7, 9, 11], // C4メジャー、60, 62, 64, 65, 67, 69, 71
  [0, 2, 3, 5, 7, 8, 10]  // C4マイナー、60, 62, 63, 65, 67, 68, 70
];

const noteNames = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

function freqToMidi(freq) {
  return 69 + 12 * Math.log2(freq / 440);
}

function midiToNoteName(midi) {
  const names = [
  ];
  const pitch = Math.floor(midi % 12);
  const octave = Math.floor(midi / 12) - 1;
  return noteNames[pitch] + octave;
}

function quantizeMidi(midi, scale, key) {
  const octave = Math.floor(midi / 12);
  const noteInOct = midi % 12;

  let closest = scale[0];
  let minDist = 12;

  for (let s of scale) {
    s = (s + key) % 12;
    let d = Math.abs(noteInOct - s);
    if (d < minDist) {
      minDist = d;
      closest = s;
    }
  }

  return octave * 12 + closest;
}

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function quantizeFreq(freq, scaleType, key) {
  if (scaleType === 0) {
    return freq;
  }
  const midi = freqToMidi(freq);
  const q = quantizeMidi(midi, scaleList[scaleType], key);
  return midiToFreq(q);
}

function quantizeFreq2(pitch, sound) {
  const freq = sound.Pitch.Base * Math.pow(2, pitch * sound.Pitch.Oct);
  if (sound.Scale === 0) {
    return freq;
  }
  const midi = freqToMidi(freq);
  const q = quantizeMidi(midi, scaleList[sound.Scale], sound.Key);
  return midiToFreq(q);
}

function freqToNote(freq) {
  const midi = freqToMidi(freq);
  return midiToNoteName(midi);
}

function freqToPitch(freq, sound) {
  return Math.log2(freq / sound.Pitch.Base) / sound.Pitch.Oct;
}
