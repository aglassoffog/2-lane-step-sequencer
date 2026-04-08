let repeatShiftMode = 0;
let repeatShiftMap = [
  { Left: [false,false,false,false],
    Right: [false,false,false,false],
    Up:  [false,false,false,false,false],
    Down:  [false,false,false,false,false]},
  { Left: [false,false,false,false],
    Right: [false,false,false,false],
    Up: [false,false,false,false,false],
    Down:  [false,false,false,false,false]},
  { Left: [false,false,false,false],
    Right: [false,false,false,false],
    Up: [false,false,false,false,false],
    Down:  [false,false,false,false,false]},
]

function leftShift(pattern, index) {
  pattern.forEach((track, trackIndex) => {
    if(index == null) {
      track.push(track.shift());
    } else if (trackIndex === index) {
      track.push(track.shift());
    }
  });
}

function rightShift(pattern, index) {
  pattern.forEach((track, trackIndex) => {
    if(index == null) {
      track.unshift(track.pop());
    } else if (trackIndex === index) {
      track.unshift(track.pop());
    }
  });
}

function upShift(pattern, index) {
  const patternShift = structuredClone(pattern);
  patternShift.push(patternShift.shift());

  if(index == null) {
    pattern.splice(0, 3, ...patternShift);
  } else {
    for(let i=0;i<3;i++){
      pattern[i].splice(index*4, 4, ...patternShift[i].splice(index*4, 4));
    }
  }
}

function upShiftAll(index) {
  const patternsShift = structuredClone(patterns);

  patternsShift[0].push(patternsShift[1].shift());
  patternsShift[1].push(patternsShift[0].shift());

  if(index == null) {
    patterns[0].splice(0, 3, ...patternsShift[0]);
    patterns[1].splice(0, 3, ...patternsShift[1]);
  } else {
    for(let i=0;i<3;i++){
      patterns[0][i].splice(index*4, 4, ...patternsShift[0][i].splice(index*4, 4));
      patterns[1][i].splice(index*4, 4, ...patternsShift[1][i].splice(index*4, 4));
    }
  }
}

function downShift(pattern, index) {
  const patternShift = structuredClone(pattern);
  patternShift.unshift(patternShift.pop());

  if(index == null) {
    pattern.splice(0, 3, ...patternShift);
  } else {
    for(let i=0;i<3;i++){
      pattern[i].splice(index*4, 4, ...patternShift[i].splice(index*4, 4));
    }
  }
}

function downShiftAll(index) {
  const patternsShift = structuredClone(patterns);

  patternsShift[0].unshift(patternsShift[1].pop());
  patternsShift[1].unshift(patternsShift[0].pop());

  if(index == null) {
    patterns[0].splice(0, 3, ...patternsShift[0]);
    patterns[1].splice(0, 3, ...patternsShift[1]);
  } else {
    for(let i=0;i<3;i++){
      patterns[0][i].splice(index*4, 4, ...patternsShift[0][i].splice(index*4, 4));
      patterns[1][i].splice(index*4, 4, ...patternsShift[1][i].splice(index*4, 4));
    }
  }
}
