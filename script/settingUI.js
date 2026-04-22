tempoBar.oninput = () => {
  tempo = parseInt(tempoBar.value);
  updateSlidbar(tempoBar);
  tempoSpan.textContent = tempo;
};
updateSlidbar(tempoBar);

const sequenceOptions = [
  "Forward", "Reverse"
];

const patternOptions = [
  "Fix",
  "Sequence1 in order", "Sequence2 in order",
  "alternate in order",
  "Sequence1 in random", "Sequence2 in random",
  "alternate in randowm"
];

sequenceOptions.forEach((mode, i) => {
  const label = document.createElement("label");
  const radio = document.createElement("input");
  const text = document.createElement("span");
  label.classList.add("radio-label");
  text.textContent = mode;
  text.classList.add("radio-span");
  radio.type = "radio";
  radio.name = "sequenceMode";
  radio.value = i;
  radio.addEventListener("change", () => {
    if (radio.checked) {
      sequenceMode = parseInt(radio.value);
      currentStep = nextStep();
      currentStep = nextStep();
    }
  });

  if (i === sequenceMode) radio.checked = true;

  label.appendChild(radio);
  label.appendChild(text);
  sequenceModes.appendChild(label);
});

patternOptions.forEach((mode, i) => {
  const label = document.createElement("label");
  const radio = document.createElement("input");
  const text = document.createElement("span");
  label.classList.add("radio-label");
  text.textContent = mode;
  text.classList.add("radio-span");
  radio.type = "radio";
  radio.name = "patternMode";
  radio.value = i;
  radio.addEventListener("change", () => {
    if (radio.checked) {
      patternMode = parseInt(radio.value);
    }
  });

  if (i === patternMode) radio.checked = true;

  label.appendChild(radio);
  label.appendChild(text);
  patternModes.appendChild(label);
});
