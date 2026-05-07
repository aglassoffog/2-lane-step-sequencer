let effect;
let effectNoise3;
let effectFilter;
let effectDelay;
let effectReverb;

function createEffect() {
  const input = audioCtx.createGain();
  const output = audioCtx.createGain();
  return {
    input,
    output
  }
}

function connectEffect() {
  effect = createEffect();
  setupNoise3();
  setupFilter();
  setupDelay();
  setupReverb();

  effect.input.connect(effectNoise3.input);
  effectNoise3.output.connect(effectFilter.input);
  effectFilter.output.connect(effectDelay.input);
  effectDelay.output.connect(effectReverb.input);
  effectReverb.output.connect(effect.output);
}

