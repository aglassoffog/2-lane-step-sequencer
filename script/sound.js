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

function playSound(seqIndex, time, velocity, typeIndex) {

  if (typeIndex === 0) {
    playHihat(seqIndex, time, velocity);
  } else if (typeIndex === 1) {
    playSnare(seqIndex, time, velocity);
  } else if (typeIndex === 2) {
    playKick(seqIndex, time, velocity);
  } else if (typeIndex === 3) {
    playNoise(seqIndex, time, velocity);
  }
}

function playKick(seqIndex, time, velocity) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(50, time + 0.1);

  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

  osc.connect(gain).connect(seqGains[seqIndex]);
  osc.start(time);
  osc.stop(time + 0.1);
}

function playSnare(seqIndex, time, velocity) {
  const noise = audioCtx.createBufferSource();
  const buffer = audioCtx.createBuffer(1, 44100, 44100);
  const data = buffer.getChannelData(0);
  for (let i=0;i<44100;i++) data[i] = Math.random()*2-1;
  noise.buffer = buffer;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

  noise.connect(gain).connect(seqGains[seqIndex]);
  noise.start(time);
}

function playHihat(seqIndex, time, velocity) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.value = 8000;

  gain.gain.setValueAtTime(0.3 * velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

  osc.connect(gain).connect(seqGains[seqIndex]);
  osc.start(time);
  osc.stop(time + 0.05);
}

function playNoise(seqIndex, time, velocity, pitchVal) {
  const osc = audioCtx.createOscillator();
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

  gain.gain.setValueAtTime(velocity, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

  osc.connect(gain).connect(seqGains[seqIndex]);
  osc.start(time);
  osc.stop(time + 0.4);
}

