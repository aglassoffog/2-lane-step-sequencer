let sequenceMode = 0;
let currentSequence = 0;
let currentPattern = 0;
let isFirst = false;

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
function nextStep() {
  nextNoteTime += stepDuration();
  currentStep = (currentStep + 1) % steps;
}

function selectPattern() {
  if (currentStep === 0) {
    if (sequenceMode === 0) {

    } else if (sequenceMode === 1) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(0, currentPatternList[currentPattern], currentPattern); 
      currentPattern++;
    } else if (sequenceMode === 2) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(1, currentPatternList[currentPattern], currentPattern); 
      currentPattern++;
    } else if (sequenceMode === 3) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(currentSequence, currentPatternList[currentPattern], currentPattern); 
      currentPattern++;
      currentSequence = currentSequence ^ 1;
    } else if (sequenceMode === 4) {
      currentPattern = Math.floor(Math.random() * currentPatternList.length);
      loadPattern(0, currentPatternList[currentPattern], currentPattern);
    } else if (sequenceMode === 5) {
      currentPattern = Math.floor(Math.random() * currentPatternList.length);
      loadPattern(1, currentPatternList[currentPattern], currentPattern); 
    } else if (sequenceMode === 6) {
      currentPattern = Math.floor(Math.random() * currentPatternList.length);
      loadPattern(currentSequence, currentPatternList[currentPattern], currentPattern); 
      currentSequence = currentSequence ^ 1;
    }    
  }
}

function selectRepeatShift() {
  if (isRepeatShift) {
    for(let i=0;i<3;i++){
      Object.keys(shiftOptions).forEach(key => {
        for(let k=0;k<4;k++){
          if (repeatShiftMap[i][key][k]) {
            if (i === 2) {
              shiftOptions[key](patterns[0], (k > 0) ? k-1 : null);
              shiftOptions[key](patterns[1], (k > 0) ? k-1 : null);            
            } else {
              shiftOptions[key](patterns[i], (k > 0) ? k-1 : null);
            }
          }
        }
      });
      Object.keys(shiftOptions2).forEach(key => {
        for(let k=0;k<5;k++){
          if (repeatShiftMap[i][key][k]) {
            if (i === 2) {
              shiftOptions2[key][1]((k > 0) ? k-1 : null);
            } else {
              shiftOptions2[key][0](patterns[i], (k > 0) ? k-1 : null);
            }
          }
        }
      });
    }
    updateUI(0);
    updateUI(1);
  }
}

function scheduleStepHalf(step, time) {
  if (isRepeatShift) {
    patterns.forEach((pattern, seqIndex) => {
      if (pattern[0][step] > 0 && (
        repeatShiftMap[seqIndex]["Left"][0] || repeatShiftMap[seqIndex]["Left"][1]
      )) {
        playSound(seqIndex, time, pattern[0][step], sounds[seqIndex][0].type);
      }
      if (pattern[1][step] > 0 && (
        repeatShiftMap[seqIndex]["Left"][0] || repeatShiftMap[seqIndex]["Left"][2]
      )) {
        playSound(seqIndex, time, pattern[1][step], sounds[seqIndex][1].type);
      }
      if (pattern[2][step] > 0 && (
        repeatShiftMap[seqIndex]["Left"][0] || repeatShiftMap[seqIndex]["Left"][3]
      )) {
        playSound(seqIndex, time, pattern[2][step], sounds[seqIndex][2].type);
      }
    });
  }
}

async function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    await selectPattern();
    if(isFirst) {
      isFirst = false;
    } else {
      await selectRepeatShift();
    }
    await scheduleStep(currentStep, nextNoteTime);
    scheduleStepHalf((currentStep + 1) % steps, nextNoteTime+stepDuration()/2);
    nextStep();
  }
}

playBtn.addEventListener("pointerdown", async () => {
  if (!isRunning) {
    await initAudio();
    isRunning = true;
  }
  if (!isPlaying) {
    isFirst = true;
    currentStep = 0;
    currentSequence = 0;
    currentPattern = 0;
    nextNoteTime = audioCtx.currentTime;
    timerID = setInterval(scheduler, lookahead);
    highlightStep(currentStep);
  } else {
    clearInterval(timerID);
  }
  isPlaying = !isPlaying;
  playBtn.classList.toggle("playing", isPlaying);
  playBtn.textContent = isPlaying ? "Stop" : "Start";
});
