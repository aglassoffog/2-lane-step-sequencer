function playKick(dest, time, velocity, sound, pitch) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  const base = 130;
  const range = 40;
  const freq = base + pitch * range;
  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.exponentialRampToValueAtTime(freq - 100, time + sound.Envelope.Duration);

  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Duration);
}

function playSine(dest, time, velocity, sound, pitch) {
  const osc = audioCtx.createOscillator();
  const base = 220;
  const range = 440;
  const freq = base + pitch * range;
  osc.frequency.value = freq;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = 20;
  const flt = 2000 + Math.random() * 6000;

  filter.frequency.setValueAtTime(100, time);
  filter.frequency.exponentialRampToValueAtTime(flt, time + 0.05);
  filter.frequency.exponentialRampToValueAtTime(100, time + 0.4);

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = makeDistortionCurve(10);
  shaper.oversample = "4x";

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.4 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc.connect(filter).connect(shaper).connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playBass(dest, time, velocity, sound, pitch) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  const base = 60;
  const range = 100;
  const freq = base + pitch * range;
  osc.type = "sawtooth";
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.5 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playPad(dest, time, velocity, sound, pitch) {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  const base = 80;
  const range = 2000;
  const freq = base + pitch * range;
  osc1.type = osc2.type = "sawtooth";
  osc1.frequency.value = osc2.frequency.value = freq;
  osc1.detune.value = -10;
  osc2.detune.value = 10;

  filter.type = "lowpass";
  filter.frequency.value = 800;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.3 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.cancelScheduledValues(time + sound.Envelope.Duration);
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain).connect(dest);

  osc1.start(time);
  osc2.start(time);
  osc1.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
  osc2.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}
