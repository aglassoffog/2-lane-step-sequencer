let noise3On = false;

function createNoise3(){
  const input = audioCtx.createGain();
  const dryGain = audioCtx.createGain();
  const wetGain = audioCtx.createGain();
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const oscGain = audioCtx.createGain();
  const drive = audioCtx.createGain();
  const shaper = audioCtx.createWaveShaper();
  const lfo = audioCtx.createOscillator();
  const lfo2 = audioCtx.createOscillator();
  const inverter = audioCtx.createGain();
  const output = audioCtx.createGain();


  input.connect(dryGain);

  drive.connect(shaper);
  shaper.connect(oscGain);
  oscGain.connect(wetGain);

  inverter.connect(oscGain.gain);

  dryGain.connect(output);
  wetGain.connect(output);

  return {
    input,
    dryGain,
    osc1,
    osc2,
    oscGain,
    drive,
    shaper,
    lfo,
    lfo2,
    inverter,
    wetGain,
    output
  }
}

function setupNoise3(){
  effectNoise3 = createNoise3();
  
  effectNoise3.drive.gain = 1;
  effectNoise3.shaper.curve = createWaveFolderCurve(1 + parseFloat(noise3Multi.value) * 5);
  effectNoise3.oscGain.gain.value = 1;
  effectNoise3.inverter.gain.value = 0;

  effectNoise3.wetGain.gain.value = 0;
  effectNoise3.dryGain.gain.value = 1;
}

noise3Connect.addEventListener("click", () => {
  if (!isRunning) return;
  const now = audioCtx.currentTime;
  noise3On = !noise3On;
  if (noise3On) {
    effectNoise3.osc1 = audioCtx.createOscillator();
    effectNoise3.osc2 = audioCtx.createOscillator();
    effectNoise3.lfo = audioCtx.createOscillator();
    effectNoise3.lfo2 = audioCtx.createOscillator();

    effectNoise3.osc1.type = "triangle";
    effectNoise3.osc1.frequency.value = parseInt(noise3Freq.value);
    effectNoise3.osc2.type = "sine";
    effectNoise3.osc2.frequency.value = parseFloat(noise3Over.value);
    effectNoise3.lfo.type = "sine";
    effectNoise3.lfo.frequency.value = parseFloat(noise3Vib.value);
    effectNoise3.lfo2.type = "sine";
    effectNoise3.lfo2.frequency.value = parseFloat(noise3Curve.value);

    effectNoise3.osc1.connect(effectNoise3.drive);
    effectNoise3.osc2.connect(effectNoise3.oscGain);
    effectNoise3.lfo.connect(effectNoise3.inverter);
    effectNoise3.lfo2.connect(effectNoise3.inverter.gain);
    effectNoise3.osc1.start();
    effectNoise3.osc2.start();
    effectNoise3.lfo.start();
    effectNoise3.lfo2.start();
    effectNoise3.wetGain.gain.setTargetAtTime(0.05, now, 0.01);
  } else {
    effectNoise3.osc1.stop();
    effectNoise3.osc2.stop();
    effectNoise3.lfo.stop();
    effectNoise3.lfo2.stop();
    effectNoise3.wetGain.gain.setTargetAtTime(0, now, 0.01);
  }
  noise3Connect.classList.toggle("cnt", noise3On);
});

noise3Freq.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectNoise3.osc1.frequency.setTargetAtTime(
    parseInt(e.target.value),
    audioCtx.currentTime,
    0.01);

  effectNoise3.osc2.frequency.setTargetAtTime(
    parseInt(e.target.value) * parseFloat(noise3Over.value),
    audioCtx.currentTime,
    0.01);
});

noise3Over.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectNoise3.osc2.frequency.setTargetAtTime(
    parseInt(noise3Freq.value) * parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01);

});

noise3Vib.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;

  effectNoise3.lfo.frequency.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01); 
});

noise3Curve.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;

  effectNoise3.lfo2.frequency.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01); 
});

noise3Multi.addEventListener("change", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  if (parseFloat(e.target.value) < 0.5) {
    effectNoise3.drive.gain.setTargetAtTime(
      1,
      audioCtx.currentTime,
      0.01);
  } else {
    effectNoise3.drive.gain.setTargetAtTime(
      2,
      audioCtx.currentTime,
      0.01);
  }
  effectNoise3.shaper.curve = createWaveFolderCurve(1 + parseFloat(e.target.value) * 5);
});
