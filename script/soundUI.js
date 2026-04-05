const soundNames = [
  "HiHat",
  "Snare",
  "Kick",
  "Noise",
  "Crystal",
  "Brush"
]

function openSound(typeIndex) {
  const popup = document.getElementById("stepPopup");
  const subTitle = document.getElementById("subTitle");
  const sliders = document.getElementById("stepSliders");
  const control = document.getElementById("stepControl");

  popup.classList.remove("hidden");
  subTitle.innerHTML = "";
  sliders.innerHTML = "";
  control.innerHTML = "";

  const popTitle = document.getElementById("popTitle");
  popTitle.textContent = soundNames[typeIndex];

  for(let i=0;i<2;i++){
    const div = document.createElement("div");
    div.className = "sound-load";
    const br = document.createElement("br");
    const seqTitle = document.createElement("span");
    seqTitle.textContent = "Sequence"+(i+1);
    seqTitle.classList.add("seq-title", "seq"+(i+1));
    control.appendChild(seqTitle);

    for(let k=0;k<3;k++){
      const loadBtn = document.createElement("button");
      loadBtn.classList.add("button");
      loadBtn.textContent = "Load"+(k+1);
      loadBtn.onclick = () => loadSound(i, k, typeIndex);
      div.appendChild(loadBtn);
    }

    control.appendChild(div);
    control.appendChild(br);
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
