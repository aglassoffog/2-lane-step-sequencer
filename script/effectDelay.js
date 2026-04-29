let delayOn = false;

function createDelay(){
  const input = audioCtx.createGain();
  const dryGain = audioCtx.createGain();
  const wetGain = audioCtx.createGain();
  const splitter = audioCtx.createChannelSplitter(2);
  const merger = audioCtx.createChannelMerger(2);
  const nodeL = audioCtx.createDelay(2.1);
  const nodeR = audioCtx.createDelay(2.1);
  const feedback = audioCtx.createGain();
  const output = audioCtx.createGain();

  input.connect(dryGain);
  input.connect(wetGain);

  wetGain.connect(splitter);
  splitter.connect(nodeL, 0);
  splitter.connect(nodeR, 1);
  nodeL.connect(merger, 0, 0);
  nodeR.connect(merger, 0, 1);

  merger.connect(feedback);
  feedback.connect(splitter);

  dryGain.connect(output);
  merger.connect(output);

  return {
    input,
    dryGain,
    wetGain,
    nodeL,
    nodeR,
    feedback,
    output
  };
}

function setupDelay(){
  effectDelay = createDelay();

  effectDelay.nodeL.delayTime.value = parseFloat(delayTime.value) + 0.002;
  effectDelay.nodeR.delayTime.value = parseFloat(delayTime.value) + 0.020;
  effectDelay.feedback.gain.value = parseFloat(delayFeedback.value);
  effectDelay.wetGain.gain.value = 0;
}

delayConnect.addEventListener("click", () => {
  if (!isRunning) return;
  const now = audioCtx.currentTime;
  delayOn = !delayOn;
  if (delayOn) {
    effectDelay.wetGain.gain.setTargetAtTime(parseFloat(delaySend.value), now, 0.01);
  } else {
    effectDelay.wetGain.gain.setTargetAtTime(0, now, 0.01);
  }
  delayConnect.classList.toggle("cnt", delayOn);
});

delayTime.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  const now = audioCtx.currentTime;
  effectDelay.nodeL.delayTime.setTargetAtTime(
    parseFloat(e.target.value) + 0.002,
    now,
    0.01);
  effectDelay.nodeR.delayTime.setTargetAtTime(
    parseFloat(e.target.value) + 0.020,
    now,
    0.01);
});

delayFeedback.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectDelay.feedback.gain.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01);
});

delaySend.addEventListener("input", e => {
  updateSlidbar(e.target);
  if (!isRunning) return;
  effectDelay.wetGain.gain.setTargetAtTime(
    parseFloat(e.target.value),
    audioCtx.currentTime,
    0.01);
});
