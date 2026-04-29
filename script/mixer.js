let masterGain;
let mixGains;
let seqGains;

async function initAudio() {

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.8;
  const destination = audioCtx.createMediaStreamDestination();
  audioEl.srcObject = destination.stream;
  audioEl.play();
  masterGain.connect(destination);

  connectEffect();
  effect.output.connect(masterGain);

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
    g.connect(effect.input);
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
  await audioCtx.resume();
}


const mixerSliders = document.querySelectorAll(".form-sliders input");
mixerSliders.forEach(bar => {
  updateSlidbar(bar);
});

function setVolume(seqIndex, trackIndex, bar) {
  updateSlidbar(bar);
  if (!isRunning) return;
  seqGains[seqIndex][trackIndex].gain.value = parseFloat(bar.value);
}

function setBalance(value) {
  if (!isRunning) return;
  mixGains[0].gain.value = parseFloat(value);
  mixGains[1].gain.value = 1 - parseFloat(value);
}
