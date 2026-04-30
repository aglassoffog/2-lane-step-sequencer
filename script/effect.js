let effect;
let effectNoise;
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
  setupNoise();
  setupFilter();
  setupDelay();
  setupReverb();

  effect.input.connect(effectNoise.input);
  effectNoise.output.connect(effectFilter.input);
  effectFilter.output.connect(effectDelay.input);
  effectDelay.output.connect(effectReverb.input);
  effectReverb.output.connect(effect.output);


}

