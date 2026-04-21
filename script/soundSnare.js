
function playSnare(dest, time, velocity, sound) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(velocity, time + sound.Envelope.Attack);
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  noise.connect(gain).connect(dest);
  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playClap(dest, time, velocity, sound) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 2000;
  bandpass.Q.value = 1.5;

  const highpass = audioCtx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 1200;

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = makeDistortionCurve(10);
  shaper.oversample = "4x";

  const gain = audioCtx.createGain();
  const bursts = [0, 0.02, 0.04, 0.06];
  bursts.forEach(offset => {
    const t = time + offset;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.5 * velocity, t + sound.Envelope.Attack);
    gain.gain.exponentialRampToValueAtTime(0.001, t + sound.Envelope.Duration);
  });

  noise.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(shaper);
  shaper.connect(gain);
  gain.connect(dest);

  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + sound.Envelope.Duration + 0.2);
}

function playBrush(dest, time, velocity, sound) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const gain = audioCtx.createGain();
  const bursts = [0, 0.02, 0.04, 0.06];
  bursts.forEach(offset => {
    const t = time + offset;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.7 * velocity, t + sound.Envelope.Attack);
    gain.gain.exponentialRampToValueAtTime(0.001, t + sound.Envelope.Duration);
  });

  noise.connect(gain);
  gain.connect(dest);

  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + sound.Envelope.Duration + 0.2);
}

function playRimshot(dest, time, velocity, sound) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const osc = audioCtx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 1800;

  const mix = audioCtx.createGain();
  noise.connect(mix);
  osc.connect(mix);

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 3000;
  bandpass.Q.value = 15;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(2 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  mix.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(dest);

  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
  osc.start(time);
  osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playCowbell(dest, time, velocity, sound) {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  osc1.type = "square";
  osc2.type = "square";
  osc1.frequency.value = 540;
  osc2.frequency.value = 800;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 1000;
  bandpass.Q.value = 5;

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = makeDistortionCurve(2);
  shaper.oversample = "4x";

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.5 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.cancelScheduledValues(time + sound.Envelope.Duration);
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc1.connect(bandpass);
  osc2.connect(bandpass);
  bandpass.connect(shaper);
  shaper.connect(gain);
  gain.connect(dest);

  osc1.start(time);
  osc2.start(time);
  osc1.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
  osc2.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playNoise(dest, time, velocity, sound, pitchVal) {
  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  const base = 100;
  const range = 300;
  // const freq = base + pitchVal * range;
  const freq = base + Math.random() * range;

  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.linearRampToValueAtTime(freq * 5, time + 0.05);
  osc.frequency.linearRampToValueAtTime(freq, time + 0.2);
  // osc.frequency.exponentialRampToValueAtTime(freq * (0.5 + Math.random()), time + 0.2);

  filter.type = "highpass";
  filter.Q.value = 10;
  filter.frequency.setValueAtTime(1000, time);
  filter.frequency.exponentialRampToValueAtTime(12000, time + 0.05);
  filter.frequency.exponentialRampToValueAtTime(1000, time + 0.2);

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(velocity, time + (0.05 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + (0.5 * sound.Envelope.Duration));

  osc.connect(filter).connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playNoise2(dest, time, velocity, sound) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = 20;
  const base = 2000;
  const range = 6000;
  const freq = base + Math.random() * range;

  filter.frequency.setValueAtTime(100, time);
  filter.frequency.exponentialRampToValueAtTime(freq, time + 0.05);
  filter.frequency.exponentialRampToValueAtTime(100, time + 0.4);

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = makeDistortionCurve(10);
  shaper.oversample = "4x";

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.5 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.cancelScheduledValues(time + sound.Envelope.Duration);
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  noise.connect(filter).connect(shaper).connect(gain).connect(dest);
  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}
