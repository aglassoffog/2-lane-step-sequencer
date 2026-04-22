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
      sndBtn.addEventListener("pointerdown", () => {
        openSound(seqIndex, trackIndex);
      });
      row.appendChild(sndBtn);

      const velBtn = document.createElement("button");
      velBtn.textContent = "V";
      velBtn.classList.add("button", "seq"+(seqIndex+1), "group-end");
      velBtn.addEventListener("pointerdown", () => {
        openVelocity(seqIndex, trackIndex);
      });
      row.appendChild(velBtn);

      //const pitBtn = document.createElement("button");
      //pitBtn.textContent = "P";
      //pitBtn.classList.add("button", "seq"+(seqIndex+1), "group-end");
      //pitBtn.addEventListener("pointerdown", () => {
      //  openPitch(seqIndex, trackIndex);
      //});
      //row.appendChild(pitBtn);

      track.forEach((_, stepIndex) => {
        const div = document.createElement("div");
        div.className = "step";

        if ((stepIndex + 1) % 4 === 0) {
          div.classList.add("group-end");
        }

        div.addEventListener("pointerdown", () => {
          updateStep(pattern[trackIndex], stepIndex);
          updateStepUI(div, pattern[trackIndex][stepIndex]);
        });
/*
        div.oncontextmenu = (e) => {
          e.preventDefault();

          let v = pattern[trackIndex][stepIndex] || 0;
          v += 0.25;
          if (v > 1) v = 0;

          pattern[trackIndex][stepIndex] = v;
          updateStep(pattern[trackIndex], stepIndex);
        };
*/
        row.appendChild(div);
      });
    })

    updateUI(seqIndex);
  });
}

function updateStep(track, stepIndex) {
  track[stepIndex] = track[stepIndex] > 0 ? 0 : 1;
}

function updateStepUI(el, velocity) {
  el.classList.toggle("active", velocity > 0);
  el.style.opacity = velocity > 0 ? velocity : 0.3;
}

function highlightStep(step) {
  for(let s=0;s<2;s++){
    rows[s].forEach(row => {
      row.querySelectorAll(":scope > .step").forEach((cell, i) => {
        cell.classList.toggle("playing", i === step);
      });
    });
  }
}

function updateUI(seqIndex) {
  rows[seqIndex].forEach((row, trackIndex) => {
    const btn = row.querySelector(":scope > .track" + trackIndex);
    btn.textContent = sounds[seqIndex][trackIndex].Type;

    row.querySelectorAll(":scope > .step").forEach((cell, stepIndex) => {
      const velocity = patterns[seqIndex][trackIndex][stepIndex];
      updateStepUI(cell, velocity);
    });
  });
}
