let reverbOn = false;

function createDeepHallImpulse(duration = 6.0, decay = 4.5, hfDamp = 0.6) {

  const rate = audioCtx.sampleRate;
  const length = rate * duration;
  const impulse = audioCtx.createBuffer(2, length, rate);

  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);

    for (let i = 0; i < length; i++) {
      const t = i / length;

      let noise = Math.random() * 2 - 1;

      // 低域残す / 高域減衰
      noise *= Math.pow(1 - t, decay);
      noise *= 1 - t * hfDamp;

      data[i] = noise;
    }
  }
  return impulse;
}

function createReverb(){
  const input = audioCtx.createGain();
  const dryGain = audioCtx.createGain();
  const wetGain = audioCtx.createGain();
  const convolver = audioCtx.createConvolver();
  const tone = audioCtx.createBiquadFilter();
  const output = audioCtx.createGain();

  input.connect(dryGain);
  input.connect(wetGain);
  wetGain.connect(convolver);
  convolver.connect(tone);

  dryGain.connect(output);
  tone.connect(output);

  return {
    input,
    dryGain,
    convolver,
    tone,
    wetGain,
    output
  };
}

function setupReverb(){
  effectReverb = createReverb();
  effectReverb.convolver.buffer = createDeepHallImpulse(parseFloat(reverbDecay.value));

  // deep hall
  effectReverb.tone.type = "lowshelf";
  effectReverb.tone.frequency.value = parseFloat(reverbTone.value);
  effectReverb.tone.gain.value = 3;

  effectReverb.wetGain.gain.value = 0;
}

reverbConnect.addEventListener("click", () => {
  if (!isRunning) return;
  const now = audioCtx.currentTime;
  reverbOn = !reverbOn;
  if (reverbOn) {
    effectReverb.wetGain.gain.setTargetAtTime(parseFloat(reverbSend.value), now, 0.01);
  } else {
    effectReverb.wetGain.gain.setTargetAtTime(0, now, 0.01);
  }
  reverbConnect.classList.toggle("cnt", reverbOn);
});

reverbDecay.addEventListener("change", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectReverb.convolver.buffer = createDeepHallImpulse(parseFloat(reverbDecay.value));
});

reverbTone.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectReverb.tone.frequency.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01
  );
});

reverbSend.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectReverb.wetGain.gain.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01
  );
});
