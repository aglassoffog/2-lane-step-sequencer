
function playClick(dest, time, velocity, sound, pitch) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  const base = 7800;
  const range = 400;
  const freq = base + pitch * range;
  osc.type = "square";
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.4 * velocity, time + (0.1 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playHiHat(dest, time, velocity, sound, pitch) {
  const noise = audioCtx.createBufferSource();
  const base = -3;
  const range = 6;
  const freq = Math.pow(2, base + pitch * range);
  noise.buffer = noiseBuffer;
  noise.playbackRate.value = freq;

  const band1 = createBand(4000);
  const band2 = createBand(7000);
  const band3 = createBand(10000);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.4 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + (0.25 * sound.Envelope.Duration));

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = new Float32Array([ -1, -0.5, 0, 0.5, 1 ]);

  noise.connect(band1).connect(gain);
  noise.connect(band2).connect(gain);
  noise.connect(band3).connect(gain);
  gain.connect(shaper).connect(dest);

  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playOpenHat(dest, time, velocity, sound, pitch) {
  const noise = audioCtx.createBufferSource();
  const base = -3;
  const range = 6;
  const freq = Math.pow(2, base + pitch * range);
  noise.buffer = noiseBuffer;
  noise.playbackRate.value = freq;

  const band1 = createBand(4000);
  const band2 = createBand(7000);
  const band3 = createBand(10000);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.4 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = new Float32Array([ -1, -0.5, 0, 0.5, 1 ]);

  noise.connect(band1).connect(gain);
  noise.connect(band2).connect(gain);
  noise.connect(band3).connect(gain);
  gain.connect(shaper).connect(dest);

  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playCrash(dest, time, velocity, sound, pitch) {
  const noise = audioCtx.createBufferSource();
  const base = -3;
  const range = 6;
  const freq = Math.pow(2, base + pitch * range);
  noise.buffer = noiseBuffer;
  noise.playbackRate.value = freq;

  const band1 = createBand(4000);
  const band2 = createBand(7000);
  const band3 = createBand(10000);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.3 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.01, time + (2 * sound.Envelope.Duration));

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = new Float32Array([ -1, -0.5, 0, 0.5, 1 ]);

  noise.connect(band1).connect(gain);
  noise.connect(band2).connect(gain);
  noise.connect(band3).connect(gain);
  gain.connect(shaper).connect(dest);

  noise.start(time);
  noise.stop(time + sound.Envelope.Attack + (2 * sound.Envelope.Duration));
}

function playRide(dest, time, velocity, sound, pitch) {
  // const freqs = [400, 540, 800, 1000, 1500, 2100];
  const freqs = [300, 440, 700, 900, 1400, 2000];
  const mix = audioCtx.createGain();

  const base = 0;
  const range = 200;
  const freq = base + pitch * range;

  freqs.forEach(f => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.value = f + freq;
    gain.gain.value = 0.3;

    osc.connect(gain);
    gain.connect(mix);

    osc.start(time);
    osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
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

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.5 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  mix.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(gain);
  gain.connect(shaper).connect(dest);
}

function playCrystal(dest, time, velocity, sound, pitch) {
  const carrierOsc = audioCtx.createOscillator();
  const modOsc = audioCtx.createOscillator();
  const modGain = audioCtx.createGain();
  const crystalGain = audioCtx.createGain();

  carrierOsc.type = "sine";
  modOsc.type = "sine";

  // const freq = 1040;
  const base = 840;
  const range = 400;
  const freq = base + pitch * range;
  carrierOsc.frequency.value = freq;
  modOsc.frequency.value = freq * 2.7;
  modGain.gain.value = freq * 0.4;

  modOsc.connect(modGain);
  modGain.connect(carrierOsc.frequency);
  carrierOsc.connect(crystalGain);
  crystalGain.connect(dest);

  crystalGain.gain.setValueAtTime(0, time);
  crystalGain.gain.linearRampToValueAtTime(0.4 * velocity, time + sound.Envelope.Attack);
  crystalGain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  carrierOsc.start(time);
  modOsc.start(time);
  carrierOsc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
  modOsc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}
