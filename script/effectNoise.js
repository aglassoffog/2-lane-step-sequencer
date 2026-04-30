let noiseOn = false;

function createNoise(){
  const input = audioCtx.createGain();
  const dryGain = audioCtx.createGain();
  const wetGain = audioCtx.createGain();
  const delay = audioCtx.createDelay();
  const feedback = audioCtx.createGain();
  // const filter = audioCtx.createBiquadFilter();
  // const shaper = audioCtx.createWaveShaper();
  const output = audioCtx.createGain();

  input.connect(dryGain);
  input.connect(delay);

  delay.connect(feedback).connect(delay);

  // shaper.connect(filter);
  // filter.connect(delay);
  delay.connect(wetGain);

  dryGain.connect(output);
  wetGain.connect(output);

  return {
    input,
    dryGain,
    delay,
    feedback,
    // filter,
    // shaper,
    wetGain,
    output
  }
}

function setupNoise(){
  effectNoise = createNoise();

  effectNoise.delay.delayTime.value = parseFloat(noiseTime.value);
  effectNoise.feedback.gain.value = parseFloat(noiseFeedback.value);
  // effectNoise.filter.type = "highpass";
  // effectNoise.filter.frequency.value = 1000;
  // effectNoise.shaper.curve = makeDistortionCurve(10);
  // effectNoise.shaper.oversample = "4x";

  effectNoise.wetGain.gain.value = 0;
  effectNoise.dryGain.gain.value = 1;
}

noiseConnect.addEventListener("click", () => {
  if (!isRunning) return;
  const now = audioCtx.currentTime;
  noiseOn = !noiseOn;
  if (noiseOn) {
    effectNoise.wetGain.gain.setTargetAtTime(0.05, now, 0.01);
  } else {
    effectNoise.wetGain.gain.setTargetAtTime(0, now, 0.01);
  }
  noiseConnect.classList.toggle("cnt", noiseOn);
});

noiseTime.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectNoise.delay.delayTime.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01);
});

noiseFeedback.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectNoise.feedback.gain.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01);
});
