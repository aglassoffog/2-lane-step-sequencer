function rightCopy(seqIndex, t, index) {
  patterns[seqIndex].forEach((track, trackIndex) => {
    if(t === 0 || trackIndex === (t-1)) {
      track.splice(index*4, 4, ...track.slice(0, 4));
      pitches[seqIndex][trackIndex].splice(index*4, 4, ...pitches[seqIndex][trackIndex].slice(0, 4));
    }
  });
}

function downCopy(pattern, index) {
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
/*
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
*/
