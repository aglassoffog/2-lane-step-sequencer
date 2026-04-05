settingBtn.addEventListener("pointerdown", () => {
  const popup = document.getElementById("settingPopup");
  popup.classList.remove("hidden");
/*
  const control = document.getElementById("sequenceControl");
  control.innerHTML = "";

  const form = document.createElement("div");
  form.className = "form";
  control.appendChild(form);

  const row1 = document.createElement("div");
  row1.className = "form-row";
  form.appendChild(row1);
 
  const label1 = document.createElement("label");
  label1.textContent = "tempo";
  label1.className = "form-label";
  row1.appendChild(label1);

  const container1 = document.createElement("div");

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
  container1.appendChild(input);
  container1.appendChild(span);
  row1.appendChild(container1);

  const row2 = document.createElement("div");
  row2.className = "form-row";
  form.appendChild(row2);

  const label2 = document.createElement("label");
  label2.textContent = "mode";
  label2.className = "form-label";
  row2.appendChild(label2);
*/

  const container2 = document.getElementById("sequence-mode");
  container2.className = "sequence-mode";

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
    container2.appendChild(label);
  });

  // row2.appendChild(container2);
});

settingPopup.addEventListener("pointerdown", e => {
  if (e.target === settingPopup) {
    settingPopup.classList.add("hidden");
  }
});
