function loadSound(seqIndex, trackIndex, typeIndex) {
  // const patternName = document.getElementById("patternName"+(seqIndex+1));
  // patternName.textContent = name;

  sounds[seqIndex][trackIndex].type = typeIndex;

  // updateUI(seqIndex);
  // updatePatternList();
}

function playSound(seqIndex, time, velocity, typeIndex) {

  if (typeIndex === 0) {
    playHihat(seqIndex, time, velocity);
  } else if (typeIndex === 1) {
    playSnare(seqIndex, time, velocity);
  } else if (typeIndex === 2) {
    playKick(seqIndex, time, velocity);
  }

}




function saveSound(name, type) {

  const data = {
    type: type,
    setting: ""
  };

  localStorage.setItem("sound_" + name, JSON.stringify(data));
  updateSoundList();
}

// saveBtn1.addEventListener("pointerdown", () => {savePattern(0);});
// saveBtn2.addEventListener("pointerdown", () => {savePattern(1);});
