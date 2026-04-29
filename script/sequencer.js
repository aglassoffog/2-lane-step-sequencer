let isRunning = false;
let isPlaying = false;
let tempo = 120;
let steps = 16;
let currentStep;
let actualSteps = [
  [0,0,0],
  [0,0,0]
];
let nextNoteTime = 0;
let timerID;
let sequenceMode = 0;
let reverseTrack = [
  [false,false,false],
  [false,false,false]
];
let patternMode = 0;
let currentSequence = 0;
let currentPattern = 0;
let isFirst = false;
let currentRepeatShift = 0;

function scheduleStep(step, time) {
  patterns.forEach((pattern, seqIndex) => {
    if (pattern[0][step[seqIndex][0]] > 0) {
      soundNames[sounds[seqIndex][0].Type].Play(
        seqGains[seqIndex][0],
        time,
        pattern[0][step[seqIndex][0]],
        sounds[seqIndex][0],
        pitches[seqIndex][0][step[seqIndex][0]]);
    }
    if (pattern[1][step[seqIndex][1]] > 0) {
      soundNames[sounds[seqIndex][1].Type].Play(
        seqGains[seqIndex][1],
        time,
        pattern[1][step[seqIndex][1]],
        sounds[seqIndex][1],
        pitches[seqIndex][1][step[seqIndex][1]]);
    }
    if (pattern[2][step[seqIndex][2]] > 0) {
      soundNames[sounds[seqIndex][2].Type].Play(
        seqGains[seqIndex][2],
        time,
        pattern[2][step[seqIndex][2]],
        sounds[seqIndex][2],
        pitches[seqIndex][2][step[seqIndex][2]]);
    }
  });
  highlightStep(step);
}

function stepDuration() {
  return (60 / tempo) / 4;
}

function nextStep() {
  return (currentStep + 1) % steps;
}

function nextActualStep() {
  const res = structuredClone(actualSteps);
  res.forEach((r, i) => {
    r.forEach((step, s) => {
      res[i][s] = reverseTrack[i][s]
        ? (step > 0 ? (step - 1) : steps - 1)
        : (step + 1) % steps;
    });
  });
  return res;
}

function nextStepTime() {
  nextNoteTime += stepDuration();
  currentStep = nextStep();
  actualSteps = nextActualStep();
}

function selectPattern() {
  if ((currentStep === 0)){
    if (patternMode === 0) {

    } else if (patternMode === 1) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(0, currentPatternList[currentPattern], currentPattern); 
      currentPattern++;
    } else if (patternMode === 2) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(1, currentPatternList[currentPattern], currentPattern); 
      currentPattern++;
    } else if (patternMode === 3) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(currentSequence, currentPatternList[currentPattern], currentPattern); 
      currentPattern++;
      currentSequence = currentSequence ^ 1;
    } else if (patternMode === 4) {
      currentPattern = Math.floor(Math.random() * currentPatternList.length);
      loadPattern(0, currentPatternList[currentPattern], currentPattern);
    } else if (patternMode === 5) {
      currentPattern = Math.floor(Math.random() * currentPatternList.length);
      loadPattern(1, currentPatternList[currentPattern], currentPattern); 
    } else if (patternMode === 6) {
      currentPattern = Math.floor(Math.random() * currentPatternList.length);
      loadPattern(currentSequence, currentPatternList[currentPattern], currentPattern); 
      currentSequence = currentSequence ^ 1;
    }    
  }
}

function selectRepeatShift() {
  if (repeatShiftMode === 1 ||
    (repeatShiftMode === 2 && currentRepeatShift === 0) ||
    (repeatShiftMode === 3 && currentRepeatShift === 0)) {

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
  if (repeatShiftMode === 1 ||
    (repeatShiftMode === 2 && currentRepeatShift === 1) ||
    (repeatShiftMode === 3 && currentRepeatShift === 3))
  {
    patterns.forEach((pattern, seqIndex) => {
      if (pattern[0][step[seqIndex][0]] > 0 &&
        ((!reverseTrack[seqIndex][0] && (repeatShiftMap[seqIndex]["Left"][0] || repeatShiftMap[seqIndex]["Left"][1])) ||
         (reverseTrack[seqIndex][0] && (repeatShiftMap[seqIndex]["Right"][0] || repeatShiftMap[seqIndex]["Right"][1])))
      ) {
        soundNames[sounds[seqIndex][0].Type].Play(
          seqGains[seqIndex][0],
          time,
          pattern[0][step[seqIndex][0]],
          sounds[seqIndex][0],
          pitches[seqIndex][0][step[seqIndex][0]]);
      }
      if (pattern[1][step[seqIndex][1]] > 0 &&
        ((!reverseTrack[seqIndex][1] && (repeatShiftMap[seqIndex]["Left"][0] || repeatShiftMap[seqIndex]["Left"][2])) ||
         (reverseTrack[seqIndex][1] && (repeatShiftMap[seqIndex]["Right"][0] || repeatShiftMap[seqIndex]["Right"][2])))
      ) {
        soundNames[sounds[seqIndex][1].Type].Play(
          seqGains[seqIndex][1],
          time,
          pattern[1][step[seqIndex][1]],
          sounds[seqIndex][1],
          pitches[seqIndex][1][step[seqIndex][1]]);
      }
      if (pattern[2][step[seqIndex][2]] > 0 &&
        ((!reverseTrack[seqIndex][2] && (repeatShiftMap[seqIndex]["Left"][0] || repeatShiftMap[seqIndex]["Left"][3])) ||
         (reverseTrack[seqIndex][2] && (repeatShiftMap[seqIndex]["Right"][0] || repeatShiftMap[seqIndex]["Right"][3])))
      ) {
        soundNames[sounds[seqIndex][2].Type].Play(
          seqGains[seqIndex][2],
          time,
          pattern[2][step[seqIndex][2]],
          sounds[seqIndex][2],
          pitches[seqIndex][2][step[seqIndex][2]]);
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
    await scheduleStep(actualSteps, nextNoteTime);
    await scheduleStepHalf(nextActualStep(), nextNoteTime+stepDuration()/2);
    nextStepTime();

    if (repeatShiftMode === 2) {
      currentRepeatShift = (currentRepeatShift + 1) % 2;
    } else if (repeatShiftMode === 3) {
      currentRepeatShift = (currentRepeatShift + 1) % 4;
    }
  }
}

playBtn.addEventListener("click", async () => {
  if (!isRunning) {
    await initAudio();
    isRunning = true;
  }
  if (!isPlaying) {
    isFirst = true;
    // if (sequenceMode === 1) {
      actualSteps = [
        [reverseTrack[0][0] ? 15 : 0,
        reverseTrack[0][1] ? 15 : 0,
        reverseTrack[0][2] ? 15 : 0],
        [reverseTrack[1][0] ? 15 : 0,
        reverseTrack[1][1] ? 15 : 0,
        reverseTrack[1][2] ? 15 : 0]
      ]
    //} else {
    //  actualSteps = [
    //   [0,0,0],
    //    [0,0,0]
    //  ]
    //}
    currentStep = 0;
    currentSequence = 0;
    currentPattern = 0;
    nextNoteTime = audioCtx.currentTime;
    timerID = setInterval(scheduler, lookahead);
    highlightStep(actualSteps);
  } else {
    clearInterval(timerID);
  }
  isPlaying = !isPlaying;
  playBtn.classList.toggle("playing", isPlaying);
  playBtn.textContent = isPlaying ? "Stop" : "Start";
});
