let noise2On = false;

function createNoise2(){
  const input = audioCtx.createGain();
  const dryGain = audioCtx.createGain();
  const wetGain = audioCtx.createGain();
  const noise = audioCtx.createBufferSource();
  const amp = audioCtx.createGain();
  const output = audioCtx.createGain();

  input.connect(dryGain);
  amp.connect(wetGain);

  dryGain.connect(output);
  wetGain.connect(output);

  return {
    input,
    dryGain,
    noise,
    amp,
    wetGain,
    output
  }
}

function setupNoise2(){
  effectNoise2 = createNoise2();

  effectNoise2.amp.gain.value = parseFloat(noise2Gain.value);

  effectNoise2.wetGain.gain.value = 0;
  effectNoise2.dryGain.gain.value = 1;
}

noise2Connect.addEventListener("click", () => {
  if (!isRunning) return;
  const now = audioCtx.currentTime;
  noise2On = !noise2On;
  if (noise2On) {
    effectNoise2.noise = audioCtx.createBufferSource();
    effectNoise2.noise.buffer = brownNoiseBuffer;
    effectNoise2.noise.loop = true;
    effectNoise2.noise.connect(effectNoise2.amp);
    effectNoise2.noise.start()
    effectNoise2.wetGain.gain.setTargetAtTime(0.2, now, 0.01);
  } else {
    effectNoise2.noise.stop()
    effectNoise2.wetGain.gain.setTargetAtTime(0, now, 0.01);
  }
  noise2Connect.classList.toggle("cnt", noise2On);
});

noise2Rate.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectNoise2.noise.playbackRate.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01);
});

noise2Gain.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectNoise2.amp.gain.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01);
});

