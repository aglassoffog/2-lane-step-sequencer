tempoBar.oninput = () => {
  tempo = parseInt(tempoBar.value);
  updateSlidbar(tempoBar);
  tempoSpan.textContent = tempo;
};
updateSlidbar(tempoBar);

const reverseOptions = [
  "Sequence1 - 1", "Sequence1 - 2", "Sequence1 - 3",
  "Sequence2 - 1", "Sequence2 - 2", "Sequence2 - 3"
];

const patternOptions = [
  "Fix",
  "Sequence1 in order", "Sequence2 in order",
  "alternate in order",
  "Sequence1 in random", "Sequence2 in random",
  "alternate in randowm"
];

reverseOptions.forEach((mode, i) => {
  const label = document.createElement("label");
  const check = document.createElement("input");
  const text = document.createElement("span");
  label.classList.add("radio-label");
  text.textContent = mode;
  text.classList.add("radio-span");
  check.type = "checkbox";
  check.addEventListener("change", () => {
    if (i < 3) {
      reverseTrack[0][i] = check.checked;
      actualSteps[0][i] = nextActualStep()[0][i];
      actualSteps[0][i] = nextActualStep()[0][i];
    } else {
      reverseTrack[1][i-3] = check.checked;
      actualSteps[1][i-3] = nextActualStep()[1][i-3];
      actualSteps[1][i-3] = nextActualStep()[1][i-3];
    }
  });

  if (i < 3) {
    check.checked = reverseTrack[0][i];
  } else {
    check.checked = reverseTrack[1][i-3];
  }

  label.appendChild(check);
  label.appendChild(text);
  reverseModes.appendChild(label);
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
