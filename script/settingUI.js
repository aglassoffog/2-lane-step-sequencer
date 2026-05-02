tempoBar.oninput = () => {
  tempo = parseInt(tempoBar.value);
  updateSlidbar(tempoBar);
  tempoSpan.textContent = tempo;
};

const sequenceOptions = [
  "→", "←", "←→"
];

const lengthOptions = [
  1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16
];

const patternOptions = [
  "Fix",
  "Sequence1 in order", "Sequence2 in order",
  "alternate in order",
  "Sequence1 in random", "Sequence2 in random",
  "alternate in randowm"
];

for(let s=0;s<2;s++){
  for(let t=0;t<3;t++){
    const span = document.createElement("span");
    span.textContent = t+1;
    span.classList.add("seq"+(s+1));
    sequenceModes.appendChild(span);

    sequenceOptions.forEach((mode, i) => {

      const label = document.createElement("label");
      const radio = document.createElement("input");
      const text = document.createElement("span");
      label.classList.add("radio-label");
      text.textContent = mode;
      text.classList.add("radio-span");
      radio.type = "radio";
      radio.name = "sequenceMode"+s+t;
      radio.value = i;
      radio.addEventListener("change", () => {
        if (radio.checked) {
          sequenceMode[s][t] = parseInt(radio.value);
        }
      });

      if (i === sequenceMode[s][t]) radio.checked = true;

      label.appendChild(radio);
      label.appendChild(text);
      sequenceModes.appendChild(label);
    });

    const select = document.createElement("select");
    lengthOptions.forEach(len => {
      const option = document.createElement("option");
      option.value = len;
      option.textContent = len;
      select.appendChild(option);
    });
    select.value = length[s][t];
    select.addEventListener("change", () => {
      length[s][t] = parseInt(select.value);
      updateUI(s);
    });
    sequenceModes.appendChild(select);
  }
}

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
