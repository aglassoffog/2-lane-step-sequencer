// ステップ長（16分音符）
function stepDuration() {
  return (60 / tempo) / 4;
}

// スケジュール
function scheduleStep(step, time) {
  patterns.forEach((pattern, seqIndex) => {
    if (pattern[0][step] > 0) playHihat(seqIndex, time, pattern[0][step]);
    if (pattern[1][step] > 0) playSnare(seqIndex, time, pattern[1][step]);
    if (pattern[2][step] > 0) playKick(seqIndex, time, pattern[2][step]);
  });
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

async function start() {
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
  currentStep = 0;
  nextNoteTime = audioCtx.currentTime;
  timerID = setInterval(scheduler, lookahead);
}

function stop() {
  clearInterval(timerID);
}
