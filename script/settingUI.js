settingBtn.addEventListener("pointerdown", () => {
  const popup = document.getElementById("settingPopup");
  popup.classList.remove("hidden");

  const tempoSpan = document.getElementById("tempo-span");
  const tempoBar = document.getElementById("tempo-bar");
  tempoBar.oninput = () => {
    tempo = parseInt(tempoBar.value);
    tempoSpan.textContent = tempo;
  };

  const container2 = document.getElementById("sequence-mode");
  container2.innerHTML = "";

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
    label.classList.add("radio-label");
    text.textContent = mode;
    text.classList.add("radio-span");
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

});

settingPopup.addEventListener("pointerdown", e => {
  if (e.target === settingPopup) {
    settingPopup.classList.add("hidden");
  }
});
