function openSequence() {
  const popup = document.getElementById("stepPopup");
  const subTitle = document.getElementById("subTitle");
  const sliders = document.getElementById("stepSliders");
  const control = document.getElementById("stepControl");

  popup.classList.remove("hidden");
  subTitle.innerHTML = "";
  sliders.innerHTML = "";
  control.innerHTML = "";

  const popTitle = document.getElementById("popTitle");
  popTitle.textContent = "Sequence";

  const container = document.createElement("div");
  container.className = "sequence-mode";

  const options = [
    "Fix", "Sequence1 in order", "Sequence2 in order",
    "alternate"
  ];

  options.forEach((text, i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    const span = document.createElement("span");
    span.textContent = text;
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
    label.appendChild(span);
    container.appendChild(label);
  });

  control.appendChild(container);
}

sequenceBtn.addEventListener("pointerdown", e => {
  openSequence();
});
