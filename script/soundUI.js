const soundNames = {
  Kick:    {Play: playKick, Envelope: {Attack: null, Duration: 0.1}},

  Click:   {Play: playClick, Envelope: {Attack: 0, Duration: 0.1}},
  HiHat:   {Play: playHiHat, Envelope: {Attack: 0, Duration: 0.4}},
  OpHat:   {Play: playOpenHat, Envelope: {Attack: 0, Duration: 0.4}},
  Crash:   {Play: playCrash, Envelope: {Attack: 0, Duration: 1}},
  Ride:    {Play: playRide, Envelope: {Attack: 0, Duration: 0.8}},
  Crystal: {Play: playCrystal, Envelope: {Attack: 0, Duration: 1.5}},

  Snare:   {Play: playSnare, Envelope: {Attack: 0, Duration: 0.2}},
  Clap:    {Play: playClap, Envelope: {Attack: 0, Duration: 0.3}},
  Brush:   {Play: playBrush, Envelope: {Attack: 0, Duration: 0.3}},
  Rimshot: {Play: playRimshot, Envelope: {Attack: 0, Duration: 0.3}},
  Cowbell: {Play: playCowbell, Envelope: {Attack: 0, Duration: 0.2}},
  Noise:   {Play: playNoise, Envelope: {Attack: 0, Duration: 1.6}},
  Noise2:  {Play: playNoise2, Envelope: {Attack: 0, Duration: 0.4}},

  Sine:    {Play: playSine, Envelope: {Attack: 0, Duration: 0.4}},
  Bass:    {Play: playBass, Envelope: {Attack: 0, Duration: 0.3}},
  Pad:     {Play: playPad, Envelope: {Attack: 0.2, Duration: 1}}
};
let soundSeqIndex;
let soundTrackIndex;

function openSound(seqIndex, trackIndex) {
  soundSeqIndex = seqIndex;
  soundTrackIndex = trackIndex;
  soundPopup.classList.remove("hidden");

  const div = document.getElementById("sound-load");
  div.innerHTML = "";

  const label = document.createElement("label");
  label.textContent = sounds[seqIndex][trackIndex].Type;
  label.classList.add("form-label", "seq"+(seqIndex+1));

  const div2 = document.createElement("div");
  let cnt = 1;
  for (const [type, sound] of Object.entries(soundNames)) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = type;
    button.addEventListener("pointerdown", () => {
      label.textContent = type;
      soundName.value = "";
      soundAttack.value = sound.Envelope.Attack;
      soundDuration.value = sound.Envelope.Duration;
      sounds[seqIndex][trackIndex].Type = type;
      sounds[seqIndex][trackIndex].Envelope.Attack = sound.Envelope.Attack;
      sounds[seqIndex][trackIndex].Envelope.Duration = sound.Envelope.Duration;
      updateUI(seqIndex);
    });

    div2.appendChild(button);
    if (cnt % 5 === 0) {
      const br = document.createElement("br");      
      div2.appendChild(br);
    }
    cnt++;
  }
  div.appendChild(label);
  div.appendChild(div2);

  soundAttack.value = sounds[seqIndex][trackIndex].Envelope.Attack;
  if (sounds[seqIndex][trackIndex].Envelope.Attack == null) {
      soundAttack.disabled = true;
  } else {
    soundAttack.disabled = false;
  }

  soundDuration.value = sounds[seqIndex][trackIndex].Envelope.Duration;
}

soundAttack.addEventListener("input", () => {
  sounds[soundSeqIndex][soundTrackIndex].Envelope.Attack = parseFloat(soundAttack.value);
});

soundDuration.addEventListener("input", () => {
  sounds[soundSeqIndex][soundTrackIndex].Envelope.Duration = parseFloat(soundDuration.value);
});

soundPopup.addEventListener("pointerdown", e => {
  if (e.target === soundPopup) {
    soundPopup.classList.add("hidden");
  }
});

soundSaveBtn.addEventListener("pointerdown", () => {
  const name = soundName.value.trim();
  if (!name) return alert("Please enter the sound name.");
  const data = {
    sound: sounds[soundSeqIndex][soundTrackIndex]
  };
  localStorage.setItem("sound_" + name, JSON.stringify(data));
  updateSoundList();
});
