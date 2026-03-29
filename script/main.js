let audioCtx = null;
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let tempo = 120;
let steps = 16;
let currentStep = 0;
let nextNoteTime = 0;
let timerID;

const scheduleAheadTime = 0.1;
const lookahead = 25;

// パターン（3トラック）
let patterns = [
  Array(16).fill(0), // kick
  Array(16).fill(0), // snare
  Array(16).fill(0)  // hihat
];

// 初期パターン
for (let i=0;i<16;i++) patterns[0][i] = 1;
patterns[1][4] = patterns[1][12] = 1;
patterns[2][0] = patterns[2][4] = patterns[2][8] = patterns[2][12] = 1;

// UI作成
const container = document.getElementById("sequencer");

patterns.forEach((pattern, trackIndex) => {
  const row = document.createElement("div");
  row.className = "row";

  pattern.forEach((step, stepIndex) => {
    const div = document.createElement("div");
    div.className = "step";
    div.onclick = () => {
      pattern[stepIndex] ^= 1;
      div.classList.toggle("active");
    };

    if (step) {
      div.classList.add("active");
    }

    row.appendChild(div);
  });

  container.appendChild(row);
});

// ステップ長（16分音符）
function stepDuration() {
  return (60 / tempo) / 4;
}

// スケジュール
function scheduleStep(step, time) {
  if (patterns[0][step]) playHihat(time);
  if (patterns[1][step]) playSnare(time);
  if (patterns[2][step]) playKick(time);

  highlightStep(step);
}

// 次へ
function nextNote() {
  nextNoteTime += stepDuration();
  currentStep = (currentStep + 1) % steps;
}

// スケジューラ
function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    // パターン選択
    scheduleStep(currentStep, nextNoteTime);
    nextNote();
  }
}

// ハイライト
function highlightStep(step) {
  const rows = document.querySelectorAll(".row");

  rows.forEach(row => {
    [...row.children].forEach((cell, i) => {
      cell.classList.toggle("playing", i === step);
    });
  });
}

// スタート
function start() {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  currentStep = 0;
  nextNoteTime = audioCtx.currentTime;
  timerID = setInterval(scheduler, lookahead);
}

// ストップ
function stop() {
  clearInterval(timerID);
}
