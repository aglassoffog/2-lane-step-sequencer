let effect;
let effectNoise;
let effectFilter;
let effectDelay;

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
  setupNoise();
  setupFilter();
  setupDelay();

  effect.input.connect(effectNoise.input);
  effectNoise.output.connect(effectFilter.input);
  effectFilter.output.connect(effectDelay.input);
  effectDelay.output.connect(effect.output);


}

