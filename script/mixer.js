let masterGain;
let mixGains;
let seqGains;

function initAudio() {

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.8;
  masterGain.connect(audioCtx.destination);

  mixGains = [
    audioCtx.createGain(),
    audioCtx.createGain()
  ];

  seqGains = [
    [audioCtx.createGain(),audioCtx.createGain(),audioCtx.createGain()],
    [audioCtx.createGain(),audioCtx.createGain(),audioCtx.createGain()]
  ];

  mixGains.forEach(g => {
    g.gain.value = 0.5;
    g.connect(masterGain);
  });

  seqGains[0].forEach(g => {
    g.gain.value = 1.0;
    g.connect(mixGains[0]);
  });
  seqGains[1].forEach(g => {
    g.gain.value = 1.0;
    g.connect(mixGains[1]);
  });

  createNoiseBuffer();
  audioCtx.resume();
}

function setVolume(seqIndex, trackIndex, value) {
  if (!isRunning) return;
  seqGains[seqIndex][trackIndex].gain.value = parseFloat(value);
}

function setBalance(value) {
  if (!isRunning) return;
  mixGains[0].gain.value = parseFloat(value);
  mixGains[1].gain.value = 1 - parseFloat(value);
}
