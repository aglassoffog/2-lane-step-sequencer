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
