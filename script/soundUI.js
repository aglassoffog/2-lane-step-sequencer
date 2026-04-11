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
  "Crash"
]

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

soundPopup.addEventListener("pointerdown", e => {
  if (e.target === soundPopup) {
    soundPopup.classList.add("hidden");
  }
});
