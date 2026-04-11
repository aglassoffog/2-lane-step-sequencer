function loadSound(seqIndex, trackIndex, typeIndex) {
  const rows = document.querySelectorAll(".row"+seqIndex);

  rows.forEach((row, i) => {
    if (i === trackIndex) {
      const span = row.querySelector(":scope > span");
      span.textContent = soundNames[typeIndex];
    }
  });

  sounds[seqIndex][trackIndex].type = typeIndex;
}

function playSound(dest, time, velocity, typeIndex) {

  if (typeIndex === 0) {
    playClick(dest, time, velocity);
  } else if (typeIndex === 1) {
    playSnare(dest, time, velocity);
  } else if (typeIndex === 2) {
    playKick(dest, time, velocity);
  } else if (typeIndex === 3) {
    playNoise(dest, time, velocity);
  } else if (typeIndex === 4) {
    playCrystal(dest, time, velocity);
  } else if (typeIndex === 5) {
    playBrush(dest, time, velocity);
  } else if (typeIndex === 6) {
    playBass(dest, time, velocity);
  } else if (typeIndex === 7) {
    playHiHat(dest, time, velocity);
  } else if (typeIndex === 8) {
    playOpenHat(dest, time, velocity);
  } else if (typeIndex === 9) {
    playCrash(dest, time, velocity);
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
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

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
  crystalGain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

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
    gain.gain.setValueAtTime(velocity * 0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
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
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

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
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

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
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

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
  gain.gain.setValueAtTime(0.4 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 2);

  noise.connect(band1).connect(gain);
  noise.connect(band2).connect(gain);
  noise.connect(band3).connect(gain);
  gain.connect(shaper).connect(dest);

  noise.start(time);
  noise.stop(time + 2);
}
