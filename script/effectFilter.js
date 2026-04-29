let filterOn = false;

function createFilter(){
  const input = audioCtx.createGain();
  const dryGain = audioCtx.createGain();
  const wetGain = audioCtx.createGain();
  const tone = audioCtx.createBiquadFilter();
  const output = audioCtx.createGain();

  input.connect(dryGain);
  input.connect(tone);

  tone.connect(wetGain);

  dryGain.connect(output);
  wetGain.connect(output);

  return {
    input,
    dryGain,
    tone,
    wetGain,
    output
  }
}

function setupFilter(){
  effectFilter = createFilter();

  effectFilter.tone.type = filterType.value;
  effectFilter.tone.frequency.value = parseInt(filterFreq.value);
  effectFilter.tone.Q.value = parseFloat(filterQ.value);

  effectFilter.wetGain.gain.value = 0;
  effectFilter.dryGain.gain.value = 1;
}

filterConnect.addEventListener("click", () => {
  if (!isRunning) return;
  const now = audioCtx.currentTime;
  filterOn = !filterOn;
  if (filterOn) {
    effectFilter.wetGain.gain.setTargetAtTime(1, now, 0.01);
    effectFilter.dryGain.gain.setTargetAtTime(0, now, 0.01);
  } else {
    effectFilter.wetGain.gain.setTargetAtTime(0, now, 0.01);
    effectFilter.dryGain.gain.setTargetAtTime(1, now, 0.01);
  }
  filterConnect.classList.toggle("cnt", filterOn);
});

filterType.addEventListener("change", e => {
  if (!isRunning) return;
  effectFilter.tone.type = e.target.value;
});

filterFreq.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectFilter.tone.frequency.setTargetAtTime(
    parseInt(e.target.value),
    audioCtx.currentTime,
    0.01
  );
});

filterQ.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectFilter.tone.Q.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01
  );
});
