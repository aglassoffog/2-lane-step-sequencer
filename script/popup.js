function openStepPopup(seqIndex, trackIndex, track, title) {
  stepPopup.classList.remove("hidden");
  popTitle.textContent = title;
  subTitle.innerHTML = "";
  stepSliders.innerHTML = "";

  const seqTitle = document.createElement("span");
  seqTitle.textContent = "Sequence" + (seqIndex+1);
  seqTitle.className = "seq" + (seqIndex+1);
  subTitle.appendChild(seqTitle);

  const trackTitle = document.createElement("span");
  trackTitle.textContent = " Track " + (trackIndex+1);
  trackTitle.className = "seq" + (seqIndex+1);
  subTitle.appendChild(trackTitle);

  if (sounds[seqIndex][trackIndex].Scale != null) {
    subTitle.appendChild(createScaleDiv(seqIndex, trackIndex));
    subTitle.appendChild(createKeyDiv(seqIndex, trackIndex));
  }

  track.forEach((step, stepIndex) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const input = document.createElement("input");
    div.className = "step-slide";
    input.type = "range";
    input.min = 0;
    input.max = 1;
    input.step = 0.01;
    input.value = step;
    if (sounds[seqIndex][trackIndex].Scale != null) {
      span.textContent = createNoteSpan(track, stepIndex, input, sounds[seqIndex][trackIndex]);
    }

    if ((stepIndex + 1) % 4 === 0) {
      input.classList.add("group-end");
    }

    input.addEventListener("input", () => {
      updateSlidbar(input);
      track[stepIndex] = parseFloat(input.value);
      if (sounds[seqIndex][trackIndex].Scale != null) {
        span.textContent = createNoteSpan(track, stepIndex, input, sounds[seqIndex][trackIndex]);
      }
      updateUI(seqIndex);
    });

    updateSlidbar(input);
    div.appendChild(input);
    div.appendChild(span);
    stepSliders.appendChild(div);
  });
}

stepPopup.addEventListener("click", e => {
  if (e.target === stepPopup) {
    stepPopup.classList.add("hidden");
  }
});

function openVelocity(seqIndex, trackIndex) {
  openStepPopup(seqIndex, trackIndex, patterns[seqIndex][trackIndex], "Velocity");
}

function openPitch(seqIndex, trackIndex) {
  openStepPopup(seqIndex, trackIndex, pitches[seqIndex][trackIndex], "Pitch");
}

function createScaleDiv(seqIndex, trackIndex) {
  const scaleOptionDiv = document.createElement("div");
  scaleOptionDiv.className = "shift-mode";

  scaleTypes.forEach((mode, i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    const text = document.createElement("span");

    label.classList.add("radio-label");
    text.textContent = mode;
    text.classList.add("radio-span");
    radio.type = "radio";
    radio.name = "scaleType"+seqIndex+trackIndex;
    radio.value = i;
    radio.addEventListener("change", () => {
      if (radio.checked) {
        sounds[seqIndex][trackIndex].Scale = parseInt(radio.value);
      }
    });

    if (i === sounds[seqIndex][trackIndex].Scale) radio.checked = true;

    label.appendChild(radio);
    label.appendChild(text);
    scaleOptionDiv.appendChild(label);
  });

  return scaleOptionDiv;
}

function createKeyDiv(seqIndex, trackIndex) {
  const keyOptionDiv = document.createElement("div");
  keyOptionDiv.className = "shift-mode";

  noteNames.forEach((mode, i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    const text = document.createElement("span");

    label.classList.add("radio-label");
    text.textContent = mode;
    text.classList.add("radio-span");
    radio.type = "radio";
    radio.name = "keyType"+seqIndex+trackIndex;
    radio.value = i;
    radio.addEventListener("change", () => {
      if (radio.checked) {
        sounds[seqIndex][trackIndex].Key = parseInt(radio.value);
      }
    });

    if (i === sounds[seqIndex][trackIndex].Key) radio.checked = true;

    label.appendChild(radio);
    label.appendChild(text);
    keyOptionDiv.appendChild(label);
  });

  return keyOptionDiv;
}

function createNoteSpan(track, stepIndex, input, sound) {
  const freq = quantizeFreq(track[stepIndex], sound);
  const note = freqToNote(freq);
  input.value = freqToPitch(freq, sound);
  return note;
}
