function leftShift(pattern) {
  pattern.forEach((track, trackIndex) => {
    track.push(track.shift());
  });  
}

