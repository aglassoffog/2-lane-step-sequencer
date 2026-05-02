const rows = [
  document.querySelectorAll(".row1"),
  document.querySelectorAll(".row2")
];

function initSequencerUI() {
  patterns.forEach((pattern, seqIndex) => {
    pattern.forEach((track, trackIndex) => {
      const row = rows[seqIndex][trackIndex];

      const sndBtn = document.createElement("button");
      sndBtn.textContent = "";
      sndBtn.classList.add("button", "seq"+(seqIndex+1), "track"+trackIndex);
      sndBtn.addEventListener("click", () => {
        openSound(seqIndex, trackIndex);
      });
      row.appendChild(sndBtn);

      const velBtn = document.createElement("button");
      velBtn.textContent = "V";
      velBtn.classList.add("button", "seq"+(seqIndex+1));
      velBtn.addEventListener("click", () => {
        openVelocity(seqIndex, trackIndex);
      });
      row.appendChild(velBtn);

      const pitBtn = document.createElement("button");
      pitBtn.textContent = "P";
      pitBtn.classList.add("button", "seq"+(seqIndex+1), "group-end");
      pitBtn.addEventListener("click", () => {
        openPitch(seqIndex, trackIndex);
      });
      row.appendChild(pitBtn);

      track.forEach((_, stepIndex) => {
        const div = document.createElement("div");
        div.className = "step";

        if ((stepIndex + 1) % 4 === 0) {
          div.classList.add("group-end");
        }

        div.addEventListener("click", () => {
          updateStep(pattern[trackIndex], stepIndex);
          updateStepUI(div, seqIndex, trackIndex, stepIndex);
        });

        row.appendChild(div);
      });
    })

    updateUI(seqIndex);
  });
}

function updateStep(track, stepIndex) {
  track[stepIndex] = track[stepIndex] > 0 ? 0 : 1;
}

function updateStepUI(el, seqIndex, trackIndex, stepIndex) {
  const velocity = patterns[seqIndex][trackIndex][stepIndex];
  const pitch = pitches[seqIndex][trackIndex][stepIndex];
  if (velocity > 0) {
    el.classList.toggle("active", true);
    el.style.opacity = velocity;
    if (stepIndex > length[seqIndex][trackIndex] - 1) {
      // el.style.background = `hsl(${100 + (pitch * 40)}, 100%, 50%)`;
      el.style.background = "hsl(80, 60%, 20%)";
    } else {
      el.style.background = "hsl(120, 100%, 50%)";
    }
  } else {
    el.classList.toggle("active", false);
    el.style.background = "#333";
    if (stepIndex > length[seqIndex][trackIndex] - 1) {
      el.style.opacity = 0.15;
    } else {
      el.style.opacity = 0.3;
    }
  }

}

function highlightStep(step) {
  for(let i=0;i<2;i++){
    rows[i].forEach((row, trackIndex) => {
      row.querySelectorAll(":scope > .step").forEach((cell, s) => {
        cell.classList.toggle("playing", s === step[i][trackIndex]);
      });
    });
  }
}

function updateUI(seqIndex) {
  rows[seqIndex].forEach((row, trackIndex) => {
    const btn = row.querySelector(":scope > .track" + trackIndex);
    btn.textContent = sounds[seqIndex][trackIndex].Type;

    row.querySelectorAll(":scope > .step").forEach((cell, stepIndex) => {
      updateStepUI(cell, seqIndex, trackIndex, stepIndex);
    });
  });
}
