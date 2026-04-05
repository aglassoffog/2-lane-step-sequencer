function initSequenceUI() {
  const control = document.getElementById("sequenceControl");

  const h4t = document.createElement("h4");
  h4t.textContent = "tempo";
  control.appendChild(h4t);

  const span = document.createElement("span");
  span.textContent = tempo;
  const input = document.createElement("input");
  input.type = "range";
  input.min = 40;
  input.max = 200;
  input.step = 1;
  input.value = tempo;
  input.oninput = () => {
    tempo = parseInt(input.value);
    span.textContent = tempo;
  };
  control.appendChild(input);
  control.appendChild(span);

  const br = document.createElement("br");
  control.appendChild(br);
  control.appendChild(br);


  const h4m = document.createElement("h4");
  h4m.textContent = "mode";
  control.appendChild(h4m);

  const container = document.createElement("div");
  container.className = "sequence-mode";

  const options = [
    "Fix",
    "Sequence1 in order", "Sequence2 in order",
    "alternate in order",
    "Sequence1 in random", "Sequence2 in random",
    "alternate in randowm"
  ];

  options.forEach((mode, i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    const text = document.createElement("span");
    text.textContent = mode;
    radio.type = "radio";
    radio.name = "sequenceMode";
    radio.value = i;
    radio.addEventListener("change", () => {
      if (radio.checked) {
        sequenceMode = parseInt(radio.value);
      }
    });

    if (i === sequenceMode) radio.checked = true;

    label.appendChild(radio);
    label.appendChild(text);
    container.appendChild(label);
  });

  control.appendChild(container);
}
