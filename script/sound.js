function playKick(dest, time, velocity, sound) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(50, time + sound.Envelope.Duration);

  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Duration);
}

function playSine(dest, time, velocity, sound) {
  const osc = audioCtx.createOscillator();
  osc.frequency.value = 440;

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
  gain.gain.linearRampToValueAtTime(0.4 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc.connect(filter).connect(shaper).connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playBass(dest, time, velocity, sound) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = 80;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.5 * velocity, time + (0.5 * sound.Envelope.Attack));
  gain.gain.exponentialRampToValueAtTime(0.001, time + sound.Envelope.Duration);

  osc.connect(gain).connect(dest);
  osc.start(time);
  osc.stop(time + sound.Envelope.Attack + sound.Envelope.Duration);
}

function playPad(dest, time, velocity, sound) {
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
