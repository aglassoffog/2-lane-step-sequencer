function playSound(dest, time, velocity, type) {

  if (type === "Click") {
    playClick(dest, time, velocity);
  } else if (type === "Snare") {
    playSnare(dest, time, velocity);
  } else if (type === "Kick") {
    playKick(dest, time, velocity);
  } else if (type === "Noise") {
    playNoise(dest, time, velocity);
  } else if (type === "Crystal") {
    playCrystal(dest, time, velocity);
  } else if (type === "Brush") {
    playBrush(dest, time, velocity);
  } else if (type === "Bass") {
    playBass(dest, time, velocity);
  } else if (type === "HiHat") {
    playHiHat(dest, time, velocity);
  } else if (type === "OpHat") {
    playOpenHat(dest, time, velocity);
  } else if (type === "Crash") {
    playCrash(dest, time, velocity);
  } else if (type === "Noise2") {
    playNoise2(dest, time, velocity);
  } else if (type === "Sine") {
    playSine(dest, time, velocity);
  } else if (type === "Cowbell") {
    playCowbell(dest, time, velocity);
  } else if (type === "Rimshot") {
    playRimshot(dest, time, velocity);
  } else if (type === "Ride") {
    playRide(dest, time, velocity);
  } else if (type === "Pad") {
    playPad(dest, time, velocity);
  }
}

function playKick(dest, time, velocity) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(50, time + 0.1);

  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + 0.1);
}

function playSnare(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

  noise.connect(gain).connect(dest);
  noise.start(time);
}

function playClick(dest, time, velocity) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.value = 8000;

  gain.gain.setValueAtTime(0.4 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + 0.05);
}

function playNoise(dest, time, velocity, pitchVal) {
  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  const base = 100;
  const range = 300;
  // const freq = base + pitchVal * range;
  const freq = base + Math.random() * range;

  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.linearRampToValueAtTime(freq * 5, time + 0.1);
  osc.frequency.linearRampToValueAtTime(freq, time + 0.2);
  // osc.frequency.exponentialRampToValueAtTime(freq * (0.5 + Math.random()), time + 0.2);

  filter.type = "highpass";
  // filter.frequency.value = 5000;
  filter.Q.value = 10;

  filter.frequency.setValueAtTime(1000, time);
  filter.frequency.exponentialRampToValueAtTime(12000, time + 0.1);
  filter.frequency.exponentialRampToValueAtTime(1000, time + 0.3);

  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

  osc.connect(filter).connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + 0.4);
}

function playCrystal(dest, time, velocity, pitchVal) {
  const freq = 1040;
  const carrierOsc = audioCtx.createOscillator();
  const modOsc = audioCtx.createOscillator();
  const modGain = audioCtx.createGain();
  const crystalGain = audioCtx.createGain();

  carrierOsc.type = "sine";
  modOsc.type = "sine";

  carrierOsc.frequency.value = freq;
  modOsc.frequency.value = freq * 2.7;
  modGain.gain.value = freq * 0.4;

  modOsc.connect(modGain);
  modGain.connect(carrierOsc.frequency);
  carrierOsc.connect(crystalGain);
  crystalGain.connect(dest);

  crystalGain.gain.setValueAtTime(0.4 * velocity, time);
  crystalGain.gain.exponentialRampToValueAtTime(0.01, time + 1.5);

  carrierOsc.start(time);
  modOsc.start(time);
  carrierOsc.stop(time + 1.5);
  modOsc.stop(time + 1.5);
}

function playBrush(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);

  const bursts = [0, 0.02, 0.04, 0.06];
  bursts.forEach((offset, i) => {
    const t = time + offset;
    gain.gain.setValueAtTime(0.7 * velocity, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
  });

  noise.connect(gain);
  gain.connect(dest);

  noise.start(time);
  noise.stop(time + 0.5);
}

function playBass(dest, time, velocity) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = 80;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.5 * velocity, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + 0.3);
}

function playHiHat(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const band1 = createBand(4000);
  const band2 = createBand(7000);
  const band3 = createBand(10000);

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = new Float32Array([ -1, -0.5, 0, 0.5, 1 ]);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.4 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

  noise.connect(band1).connect(gain);
  noise.connect(band2).connect(gain);
  noise.connect(band3).connect(gain);
  gain.connect(shaper).connect(dest);

  noise.start(time);
  noise.stop(time + 0.1);
}

function playOpenHat(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const band1 = createBand(4000);
  const band2 = createBand(7000);
  const band3 = createBand(10000);

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = new Float32Array([ -1, -0.5, 0, 0.5, 1 ]);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.4 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

  noise.connect(band1).connect(gain);
  noise.connect(band2).connect(gain);
  noise.connect(band3).connect(gain);
  gain.connect(shaper).connect(dest);

  noise.start(time);
  noise.stop(time + 0.4);
}

function playCrash(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const band1 = createBand(4000);
  const band2 = createBand(7000);
  const band3 = createBand(10000);

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = new Float32Array([ -1, -0.5, 0, 0.5, 1 ]);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.3 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 2);

  noise.connect(band1).connect(gain);
  noise.connect(band2).connect(gain);
  noise.connect(band3).connect(gain);
  gain.connect(shaper).connect(dest);

  noise.start(time);
  noise.stop(time + 2);
}

function playNoise2(dest, time, velocity) {
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
  gain.gain.setValueAtTime(0.5 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

  noise.connect(filter).connect(shaper).connect(gain).connect(dest);
  noise.start(time);
  noise.stop(time + 0.4);
}

function playSine(dest, time, velocity) {
  const osc = audioCtx.createOscillator();
  osc.frequency.setValueAtTime(440, time);

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
  gain.gain.setValueAtTime(0.4 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

  osc.connect(filter).connect(shaper).connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + 0.4);
}

function playCowbell(dest, time, velocity) {
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

  const amp = audioCtx.createGain();
  amp.gain.setValueAtTime(0.5 * velocity, time);
  amp.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

  osc1.connect(bandpass);
  osc2.connect(bandpass);
  bandpass.connect(shaper);
  shaper.connect(amp);
  amp.connect(dest);

  osc1.start(time);
  osc2.start(time);
  osc1.stop(time + 0.2);
  osc2.stop(time + 0.2);
}

function playRimshot(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const osc = audioCtx.createOscillator();
  const oscGain = audioCtx.createGain();
  osc.type = "square";
  osc.frequency.value = 1800;

  const mix = audioCtx.createGain();
  noise.connect(mix);
  osc.connect(mix);

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 3000;
  bandpass.Q.value = 15;

  const amp = audioCtx.createGain();
  amp.gain.setValueAtTime(2 * velocity, time);
  amp.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

  mix.connect(bandpass);
  bandpass.connect(amp);
  amp.connect(dest);

  noise.start(time);
  noise.stop(time + 0.3);
  osc.start(time);
  osc.stop(time + 0.3);
}

function playRide(dest, time, velocity) {
  const freqs = [400, 540, 800, 1000, 1500, 2100];
  const mix = audioCtx.createGain();

  freqs.forEach(f => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.value = f;
    gain.gain.value = 0.3;

    osc.connect(gain);
    gain.connect(mix);

    osc.start(time);
    osc.stop(time + 0.8);
  });

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 9000;
  bandpass.Q.value = 1;

  const highpass = audioCtx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 7000;

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = makeDistortionCurve(3);
  shaper.oversample = "4x";

  const amp = audioCtx.createGain();
  amp.gain.setValueAtTime(0.5 * velocity, time);
  amp.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

  mix.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(amp);
  amp.connect(shaper).connect(dest);
}

function playPad(dest, time, velocity) {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc1.type = "sawtooth";
  osc2.type = "sawtooth";
  osc1.detune.value = -10;
  osc2.detune.value = 10;

  filter.type = "lowpass";
  filter.frequency.value = 800;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.3 * velocity, time + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 1);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain).connect(dest);

  osc1.start(time);
  osc2.start(time);

  osc1.stop(time + 1);
  osc2.stop(time + 1);
}
