let audioCtx = null;
let isRunning = false;
let isPlaying = false;
let tempo = 120;
let steps = 16;
let currentStep = 0;
let nextNoteTime = 0;
let timerID;

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
  {type: 0},
  {type: 1},
  {type: 2}
],[
  {type: 0},
  {type: 1},
  {type: 2}
]];

initSequencerUI();
initShiftUI();
updatePatternList();
tabs[0].click();
