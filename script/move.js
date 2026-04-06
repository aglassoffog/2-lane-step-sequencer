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
