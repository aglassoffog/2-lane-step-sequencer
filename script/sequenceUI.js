function initUI(seqIndex) {
  const container = document.getElementById("sequencer" + seqIndex);

  patterns[seqIndex].forEach((pattern, trackIndex) => {
    const row = document.createElement("div");
    row.className = "row" + seqIndex;

    pattern.forEach((step, stepIndex) => {
      const div = document.createElement("div");
      div.className = "step";
      div.onclick = () => {
        pattern[stepIndex] ^= 1;
        div.classList.toggle("active");
      };

      row.appendChild(div);
    });

    container.appendChild(row);
  });

  updateUI(seqIndex);
}

function highlightStep(step) {
  const rows = document.querySelectorAll(".row0, .row1");

  rows.forEach(row => {
    [...row.children].forEach((cell, i) => {
      cell.classList.toggle("playing", i === step);
    });
  });
}

function updateUI(seqIndex) {
  const rows = document.querySelectorAll(".row" + seqIndex);

  rows.forEach((row, trackIndex) => {
    [...row.children].forEach((cell, stepIndex) => {
      const isActive = patterns[seqIndex][trackIndex][stepIndex];
      cell.classList.toggle("active", isActive);
    });
  });
}
