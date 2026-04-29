let audioCtx = null;
const scheduleAheadTime = 0.1;
const lookahead = 25;

let patterns = [[
  Array(16).fill(0),
  Array(16).fill(0),
  Array(16).fill(0)
],[
  Array(16).fill(0),
  Array(16).fill(0),
  Array(16).fill(0)
]];

let pitches = [[
  Array(16).fill(0.5),
  Array(16).fill(0.5),
  Array(16).fill(0.5)
],[
  Array(16).fill(0.5),
  Array(16).fill(0.5),
  Array(16).fill(0.5)
]];

let sounds = [[
  {Type: "Click", Envelope: {Attack: 0, Duration: 0.1}},
  {Type: "Snare", Envelope: {Attack: 0, Duration: 0.2}},
  {Type: "Kick", Envelope: {Attack: null, Duration: 0.1}}
],[
  {Type: "Click", Envelope: {Attack: 0, Duration: 0.1}},
  {Type: "Snare", Envelope: {Attack: 0, Duration: 0.2}},
  {Type: "Kick", Envelope: {Attack: null, Duration: 0.1}}
]];

initSequencerUI();
initShiftUI();
updatePatternList();
updateSoundList();
initCopyUI();
tabs[0].click();
