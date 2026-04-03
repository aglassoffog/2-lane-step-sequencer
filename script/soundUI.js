const soundNames = [
  "HiHat",
  "Snare",
  "Kick",
  "Noise"
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

soundSetting1.addEventListener("pointerdown", () => {openSound(0);});
soundSetting2.addEventListener("pointerdown", () => {openSound(1);});
soundSetting3.addEventListener("pointerdown", () => {openSound(2);});
soundSetting4.addEventListener("pointerdown", () => {openSound(3);});
