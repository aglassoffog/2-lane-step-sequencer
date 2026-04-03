// ステップ長（16分音符）
function stepDuration() {
  return (60 / tempo) / 4;
}

// スケジュール
function scheduleStep(step, time) {
  patterns.forEach((pattern, seqIndex) => {
    if (pattern[0][step] > 0) {
      playSound(seqIndex, time, pattern[0][step], sounds[seqIndex][0].type);
    }
    if (pattern[1][step] > 0) {
      playSound(seqIndex, time, pattern[1][step], sounds[seqIndex][1].type);
    }
    if (pattern[2][step] > 0) {
      playSound(seqIndex, time, pattern[2][step], sounds[seqIndex][2].type);
    }
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

playBtn.addEventListener("pointerdown", async () => {
  if (!isRunning) {
    await initAudio();
    isRunning = true;
  }
  if (!isPlaying) {
    currentStep = 0;
    nextNoteTime = audioCtx.currentTime;
    timerID = setInterval(scheduler, lookahead);
  } else {
    clearInterval(timerID);
  }
  isPlaying = !isPlaying;
  playBtn.classList.toggle("playing", isPlaying);
  playBtn.textContent = isPlaying ? "Stop" : "Start";
});
