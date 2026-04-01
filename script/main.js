let tempo = 120;
let steps = 16;
let currentStep = 0;
let nextNoteTime = 0;
let timerID;

const scheduleAheadTime = 0.1;
const lookahead = 25;

// パターン（3トラック）
let patterns = [[
    Array(16).fill(0), // kick
    Array(16).fill(0), // snare
    Array(16).fill(0)  // hihat
  ],[
    Array(16).fill(0), // kick
    Array(16).fill(0), // snare
    Array(16).fill(0)  // hihat
  ]];

// 初期パターン
// for (let i=0;i<16;i++) patterns[0][i] = 1;
// patterns[1][4] = patterns[1][12] = 1;
// patterns[2][0] = patterns[2][4] = patterns[2][8] = patterns[2][12] = 1;

initUI();
updatePatternList();
