const soundNames = {
  Kick:    {Play: playKick, Envelope: {Attack: null, Duration: 0.1}},
  Kick2:   {Play: playKick2, Envelope: {Attack: null, Duration: 0.1}},

  Click:   {Play: playClick, Envelope: {Attack: 0, Duration: 0.1}},
  HiHat:   {Play: playHiHat, Envelope: {Attack: 0, Duration: 0.4}},
  OpHat:   {Play: playOpenHat, Envelope: {Attack: 0, Duration: 0.7}},
  Crash:   {Play: playCrash, Envelope: {Attack: 0, Duration: 1}},
  Ride:    {Play: playRide, Envelope: {Attack: 0, Duration: 0.8}},
  Crystal: {Play: playCrystal, Envelope: {Attack: 0, Duration: 1.5}, Scale: 0, Pitch: {Base: 698.46, Oct: 1}}, //F5-6

  Snare:   {Play: playSnare, Envelope: {Attack: 0, Duration: 0.2}},
  Clap:    {Play: playClap, Envelope: {Attack: 0, Duration: 0.3}},
  Brush:   {Play: playBrush, Envelope: {Attack: 0, Duration: 0.3}},
  Rimshot: {Play: playRimshot, Envelope: {Attack: 0, Duration: 0.3}},
  Cowbell: {Play: playCowbell, Envelope: {Attack: 0, Duration: 0.2}},
  Noise:   {Play: playNoise, Envelope: {Attack: 0, Duration: 1.6}},
  Noise2:  {Play: playNoise2, Envelope: {Attack: 0, Duration: 0.4}},

  Sine:    {Play: playSine, Envelope: {Attack: 0, Duration: 0.4}, Scale: 0, Pitch: {Base: 220, Oct: 3}}, // A3-6
  Sine2:   {Play: playSine2, Envelope: {Attack: 0, Duration: 0.4}, Scale: 0, Pitch: {Base: 220, Oct: 3}}, // A3-6
  Bass:    {Play: playBass, Envelope: {Attack: 0, Duration: 0.3}, Scale: 0, Pitch: {Base: 55, Oct: 2}}, // A1-3
  Lead:    {Play: playLead, Envelope: {Attack: 0, Duration: 0.5}, Scale: 0, Pitch: {Base: 440, Oct: 3}}, // A4-7
  Pad:     {Play: playPad, Envelope: {Attack: 0.2, Duration: 1}, Scale: 0, Pitch: {Base: 55, Oct: 5}} // A1-6
};
let soundSeqIndex;
let soundTrackIndex;

function openSound(seqIndex, trackIndex) {
  soundSeqIndex = seqIndex;
  soundTrackIndex = trackIndex;
  soundPopup.classList.remove("hidden");

  const div = document.getElementById("sound-load");
  div.innerHTML = "";

  const typeLabel = document.createElement("label");
  typeLabel.textContent = sounds[seqIndex][trackIndex].Type;
  typeLabel.classList.add("form-label", "seq"+(seqIndex+1));

  const soundTypeDiv = document.createElement("div");
  let cnt = 1;
  for (const [type, sound] of Object.entries(soundNames)) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = type;
    button.addEventListener("click", () => {
      typeLabel.textContent = type;
      soundName.value = "";
      if (sound.Envelope.Attack == null) {
        soundAttack.disabled = true;
        soundAttack.value = 0;
      } else {
        soundAttack.disabled = false;
        soundAttack.value = sound.Envelope.Attack;
      }
      soundDuration.value = sound.Envelope.Duration;
      sounds[seqIndex][trackIndex].Type = type;
      sounds[seqIndex][trackIndex].Envelope.Attack = sound.Envelope.Attack;
      sounds[seqIndex][trackIndex].Envelope.Duration = sound.Envelope.Duration;
      sounds[seqIndex][trackIndex].Scale = sound.Scale;
      sounds[seqIndex][trackIndex].Key = 0;
      sounds[seqIndex][trackIndex].Pitch = sound.Pitch;

      updateUI(seqIndex);
    });

    soundTypeDiv.appendChild(button);
    if (cnt % 5 === 0) {
      const br = document.createElement("br");      
      soundTypeDiv.appendChild(br);
    }
    cnt++;
  }
  div.appendChild(typeLabel);
  div.appendChild(soundTypeDiv);

  if (sounds[seqIndex][trackIndex].Envelope.Attack == null) {
    soundAttack.disabled = true;
    soundAttack.value = 0;
  } else {
    soundAttack.disabled = false;
    soundAttack.value = sounds[seqIndex][trackIndex].Envelope.Attack;
  }

  soundDuration.value = sounds[seqIndex][trackIndex].Envelope.Duration;
}

soundAttack.addEventListener("input", () => {
  sounds[soundSeqIndex][soundTrackIndex].Envelope.Attack = parseFloat(soundAttack.value);
});

soundDuration.addEventListener("input", () => {
  sounds[soundSeqIndex][soundTrackIndex].Envelope.Duration = parseFloat(soundDuration.value);
});

soundSaveBtn.addEventListener("click", () => {
  const name = soundName.value.trim();
  if (!name) return alert("Please enter the sound name.");
  const data = {
    sound: sounds[soundSeqIndex][soundTrackIndex]
  };
  localStorage.setItem("sound_" + name, JSON.stringify(data));
  updateSoundList();
});

soundPopup.addEventListener("click", e => {
  if (e.target === soundPopup) {
    soundPopup.classList.add("hidden");
  }
});
