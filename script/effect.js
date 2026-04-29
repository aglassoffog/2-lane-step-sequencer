let effect;
let noise;
let filter;


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

  effect.input.connect(noise.input);
  noise.output.connect(filter.input);
  filter.output.connect(effect.output);


}

