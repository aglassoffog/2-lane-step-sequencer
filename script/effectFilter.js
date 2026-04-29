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
  filter = createFilter();

  filter.tone.type = "lowpass";
  filter.tone.frequency.value = "3000";
  filter.tone.Q.value = 10;

  filter.wetGain.gain.value = 0;
  filter.dryGain.gain.value = 1;

}

filterConnect.addEventListener("click", () => {
  const now = audioCtx.currentTime;
  filterOn = !filterOn;
  if (filterOn) {
    filter.wetGain.gain.setTargetAtTime(1, now, 0.01);
    filter.dryGain.gain.setTargetAtTime(0, now, 0.01);
  } else {
    filter.wetGain.gain.setTargetAtTime(0, now, 0.01);
    filter.dryGain.gain.setTargetAtTime(1, now, 0.01);
  }
  filterConnect.classList.toggle("cnt", filterOn);
});

filterType.addEventListener("change", e => {
  filter.tone.type = e.target.value;
});

filterFreq.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  filter.tone.frequency.setTargetAtTime(
    parseInt(e.target.value),
    audioCtx.currentTime,
    0.01
  );
});

filterQ.addEventListener("input", e => {
  updateSlidbar(e.target);
  filter.tone.Q.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01
  );
});
