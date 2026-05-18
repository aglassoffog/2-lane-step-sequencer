let noiseBuffer;
let pinkNoiseBuffer;
let brownNoiseBuffer;

function createNoiseBuffer() {
  const duration = 2;

  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  noiseBuffer = buffer;
}

function createPinkNoiseBuffer() {
  const duration = 2;

  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

  for (let i = 0; i < data.length; i++) {
    const white = (Math.random() * 2 - 1);
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11;
    b6 = white * 0.115926;
  }

  pinkNoiseBuffer = buffer;
}

function createBrownNoise() {
  const duration = 2;

  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = (Math.random() * 2 - 1);
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }

  brownNoiseBuffer = buffer;
}

function createBand(freq) {
  const filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 1;
  return filter;
}

function makeDistortionCurve(amount = 50) {
  const samples = 44100;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = Math.tanh(amount * x);
  }
  return curve;
}

function createWaveFolderCurve(amount = 1) {
  const samples = 44100;
  const curve = new Float32Array(samples);

  for (let i = 0; i < samples; i++) {
    let x = (i / samples) * 2 - 1;

    // 折り返し（簡易版）
    // let y = x * amount
    let y = Math.tanh(x * amount + 0.2);

    if (y > 1) y = 2 - y;
    if (y < -1) y = -2 - y;

    curve[i] = y;
  }

  return curve;
}

// amount < 1 → 急激に立ち上がる
// amount > 1 → なだらか
function createCurve(amount = 1) {
  const samples = 10;
  const curve = new Float32Array(samples);

  for (let i = 0; i < samples; i++) {
    let x = (i / samples) * 2 - 1;

    // カーブ（例：指数っぽい）
    let y = Math.sign(x) * Math.pow(Math.abs(x), amount);

    curve[i] = y;
  }
  console.log(curve);
  return curve;
}

// k = 3〜10
function createLogCurve(amount = 5) {
  const samples = 10;
  const curve = new Float32Array(samples);

  for (let i = 0; i < samples; i++) {
    let x = i / (samples - 1);  // 0〜1

    // logカーブ
    let y = Math.log(1 + amount * x) / Math.log(1 + amount);

    // -1〜1に戻す
    curve[i] = y * 2 - 1;
  }
  console.log(curve);
  return curve;
}
