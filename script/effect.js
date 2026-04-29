let effect;
let effectNoise;
let effectFilter;


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

  effect.input.connect(effectNoise.input);
  effectNoise.output.connect(effectFilter.input);
  effectFilter.output.connect(effect.output);


}

