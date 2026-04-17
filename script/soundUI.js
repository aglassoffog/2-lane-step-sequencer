const soundNames = [
  "Click",
  "Snare",
  "Kick",
  "Noise",
  "Crystal",
  "Brush",
  "Bass",
  "HiHat",
  "OpHat",
  "Crash",
  "Noise2",
  "Sine",
  "Cowbell",
  "Rimshot",
  "Ride"
];

function loadSound(seqIndex, trackIndex, typeIndex) {
  sounds[seqIndex][trackIndex].type = typeIndex;
  updateUI(seqIndex)
}

function openSound(seqIndex) {
  const popup = document.getElementById("soundPopup");
  popup.classList.remove("hidden");

  const title = document.getElementById("soundTitle");
  title.textContent = "Sequence" + (seqIndex+1);
  title.className = "seq" + (seqIndex+1);

  const btn = document.getElementById("soundSaveBtn");
  btn.className = "button seq" + (seqIndex+1);

  for(let i=0;i<3;i++){
    const div = document.getElementById("sound-load"+(i+1));
    div.innerHTML = "";
    const span = document.createElement("span");
    span.textContent = soundNames[sounds[seqIndex][i].type];
    span.className = "seq" + (seqIndex+1);
    const div2 = document.createElement("div");

    soundNames.forEach((name, k) => {
      const button = document.createElement("button");
      button.classList.add("button");
      button.textContent = name;
      button.addEventListener("pointerdown", () => {
        span.textContent = name;
        loadSound(seqIndex, i, k);
      });

      div2.appendChild(button);
      if ((k + 1) % 5 === 0) {
        const br = document.createElement("br");      
        div2.appendChild(br);
      }
    });

    div.appendChild(span);
    div.appendChild(div2);
  }
}

soundPopup.addEventListener("pointerdown", e => {
  if (e.target === soundPopup) {
    soundPopup.classList.add("hidden");
  }
});

const soundSaveBtn = document.getElementById("soundSaveBtn");
soundSaveBtn.addEventListener("pointerdown", () => {
  const name = document.getElementById("soundName").value.trim();
  if (!name) return alert("Please enter the sound name.");

  const str = soundSaveBtn.classList[1];
  const seqIndex = parseInt(str.slice(-1)) - 1;
  const data = {
    sounds: sounds[seqIndex]
  };
  localStorage.setItem("sound_" + name, JSON.stringify(data));
  updateSoundList();
});

/*
const soundSettings = document.getElementById("soundSettings");
soundNames.forEach((name, i) => {
    const button = document.createElement("button");
    button.classList.add("button", "soundSetting");
    button.textContent = name;
    button.addEventListener("pointerdown", () => {openSound(i);});

    soundSettings.appendChild(button);

    if ((i + 1) % 5 === 0) {
      const br = document.createElement("br");      
      soundSettings.appendChild(br);
    }
});
*/

/*
function openSound(typeIndex) {
  const popup = document.getElementById("soundPopup");
  popup.classList.remove("hidden");

  const title = document.getElementById("soundTitle");
  title.textContent = soundNames[typeIndex];

  for(let i=0;i<2;i++){
    const div = document.getElementById("sound-load"+(i+1));
    div.innerHTML = "";

    for(let k=0;k<3;k++){
      const loadBtn = document.createElement("button");
      loadBtn.classList.add("button");
      loadBtn.textContent = "Load"+(k+1);
      loadBtn.onclick = () => loadSound(i, k, typeIndex);
      div.appendChild(loadBtn);
    }
  }
}
*/
