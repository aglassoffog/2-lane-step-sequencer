function leftShift(pattern) {
  pattern.forEach(track => {
    track.push(track.shift());
  });
}

function rightShift(pattern) {
  pattern.forEach(track => {
    track.unshift(track.pop());
  });
}
