function createNoise(){
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

function setupNoise(){
  noise = createNoise();

  noise.wetGain.gain.value = 0;
  noise.dryGain.gain.value = 1;

}

/*
noiseConnect.addEventListener("change", () => {
  const now = audioCtx.currentTime;
  if (noiseConnect.checked) {
    noise.wetGain.gain.setTargetAtTime(1, now, 0.01);
    noise.dryGain.gain.setTargetAtTime(0, now, 0.01);
  } else {
    noise.wetGain.gain.setTargetAtTime(0, now, 0.01);
    noise.dryGain.gain.setTargetAtTime(1, now, 0.01);
  }
});
*/