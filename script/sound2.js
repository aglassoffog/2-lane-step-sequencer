function play303(dest, time, velocity) {
  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = 110;

  filter.type = "lowpass";
  filter.frequency.value = 800;
  filter.Q.value = 18;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.4 * velocity, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

  filter.frequency.setValueAtTime(200, time);
  filter.frequency.exponentialRampToValueAtTime(1200, time + 0.05);
  filter.frequency.exponentialRampToValueAtTime(200, time + 0.3);

  osc.connect(filter).connect(gain).connect(dest);

  osc.start(time);
  osc.stop(time + 0.3);
}


function play909Hat(dest, time, velocity) {
  const freqs = [400, 540, 800, 1000, 1500, 2100]; // 不協和な周波数
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

  // mix.connect(band1).connect(amp);
  // mix.connect(band2).connect(amp);
  // mix.connect(band3).connect(amp);
  // amp.connect(shaper).connect(dest);
  mix.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(amp);
  amp.connect(shaper).connect(dest);
}


function playClap(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 1500;
  bandpass.Q.value = 0.7;

  const highpass = audioCtx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 800;

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = makeDistortionCurve(2);
  shaper.oversample = "4x";

  const gain = audioCtx.createGain();

  const times = [0, 0.015, 0.03, 0.045];
  times.forEach(t => {
    gain.gain.setValueAtTime(0.0, time + t);
    gain.gain.linearRampToValueAtTime(0.4 * velocity, time + t + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, time + t + 0.05);
  });

  noise.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(shaper);
  shaper.connect(gain);
  gain.connect(dest);

  noise.start(time);
  noise.stop(time + 0.3);
}
