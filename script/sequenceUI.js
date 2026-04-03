function initUI() {
  patterns.forEach((pattern, seqIndex) => {
    const container = document.getElementById("sequencer"+(seqIndex+1));

    pattern.forEach((track, trackIndex) => {
      const row = document.createElement("div");
      row.className = "row" + seqIndex;

      const sndName = document.createElement("span");
      sndName.classList.add("track", "seq"+(seqIndex+1));
      sndName.textContent = soundNames[sounds[seqIndex][trackIndex].type];
      row.appendChild(sndName);

      const velBtn = document.createElement("button");
      velBtn.textContent = "Vel";
      velBtn.classList.add("button", "seq"+(seqIndex+1), "group-end");
      velBtn.addEventListener("pointerdown", () => {
        openVelocity(seqIndex, trackIndex);
      });
      row.appendChild(velBtn);

      // const pthBtn = document.createElement("button");
      // pthBtn.textContent = "Pth";
      // pthBtn.classList.add("button", "seq"+(seqIndex+1), "group-end");
      // pthBtn.addEventListener("pointerdown", () => {
      //   openPitch(seqIndex, trackIndex);
      // });
      // row.appendChild(pthBtn);

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

        div.oncontextmenu = (e) => {
          e.preventDefault();

          let v = pattern[trackIndex][stepIndex] || 0;
          v += 0.25;
          if (v > 1) v = 0;

          pattern[trackIndex][stepIndex] = v;
          updateStep(pattern[trackIndex], stepIndex);
        };

        row.appendChild(div);
      });

      container.appendChild(row);
    })

    updateUI(seqIndex);
  });
}

function updateStep(track, stepIndex) {
  track[stepIndex] = track[stepIndex] > 0 ? 0 : 1;
}

function updateStepUI(el, velocity) {
  el.classList.toggle("active", velocity > 0);
  el.style.opacity = velocity > 0 ? velocity : 0.2;
}

function highlightStep(step) {
  const rows = document.querySelectorAll(".row0, .row1");

  rows.forEach(row => {
    row.querySelectorAll(":scope > .step").forEach((cell, i) => {
      cell.classList.toggle("playing", i === step);
    });
  });
}

function updateUI(seqIndex) {
  const rows = document.querySelectorAll(".row" + seqIndex);

  rows.forEach((row, trackIndex) => {
    const span = row.querySelector(":scope > span");
    span.textContent = soundNames[sounds[seqIndex][trackIndex].type];
    
    row.querySelectorAll(":scope > .step").forEach((cell, stepIndex) => {
      const velocity = patterns[seqIndex][trackIndex][stepIndex];
      updateStepUI(cell, velocity);
    });
  });
}
