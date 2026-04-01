let currentTrack = 0;

function openVelocity(seqIndex, trackIndex) {
  currentTrack = trackIndex;

  const popup = document.getElementById("velocityPopup");
  const sliders = document.getElementById("velocitySliders");

  popup.classList.remove("hidden");
  sliders.innerHTML = "";

  document.getElementById("velTitle").textContent =
    "Sequence" + (seqIndex+1) + " Track " + (trackIndex+1);

  patterns[seqIndex][trackIndex].forEach((step, stepIndex) => {
    const input = document.createElement("input");
    input.type = "range";
    input.min = 0;
    input.max = 1;
    input.step = 0.01;
    input.value = step;

    if ((stepIndex + 1) % 4 === 0) {
      input.classList.add("group-end");
    }

    input.oninput = () => {
      patterns[seqIndex][trackIndex][stepIndex] = parseFloat(input.value);
      updateUI(seqIndex);
    };

    sliders.appendChild(input);
  });
}

velocityPopup.addEventListener("pointerdown", e => {
  if (e.target === velocityPopup) {
    velocityPopup.classList.add("hidden");
  }
});
