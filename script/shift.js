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
  } else if (index === 0) {
    for(let i=0;i<3;i++){
      pattern[i].splice(0, 4, ...patternShift[i].splice(0, 4));
    }
  } else if (index === 1) {
    for(let i=0;i<3;i++){
      pattern[i].splice(4, 4, ...patternShift[i].splice(4, 4));
    }
  }
}

function upShiftAll(index) {
  const pattern0 = structuredClone(patterns[0]);
  const pattern1 = structuredClone(patterns[1]);

  pattern0.push(pattern1.shift());
  pattern1.push(pattern0.shift());

  if(index == null) {
    patterns[0].splice(0, 3, ...pattern0);
    patterns[1].splice(0, 3, ...pattern1);
  } else if (index === 0) {
    for(let i=0;i<3;i++){
      patterns[0][i].splice(0, 4, ...pattern0[i].splice(0, 4));
      patterns[1][i].splice(0, 4, ...pattern1[i].splice(0, 4));
    }
  } else if (index === 1) {
    for(let i=0;i<3;i++){
      patterns[0][i].splice(4, 4, ...pattern0[i].splice(4, 4));
      patterns[1][i].splice(4, 4, ...pattern1[i].splice(4, 4));
    }
  }

}
