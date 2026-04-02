const soundNames = [
  "HiHat",
  "Snare",
  "Kick"
]

function openSound(typeIndex) {
  const popup = document.getElementById("stepPopup");
  const control = document.getElementById("stepControl");

  popup.classList.remove("hidden");
  control.innerHTML = "";

  const popTitle = document.getElementById("popTitle");
  popTitle.textContent = soundNames[typeIndex];

  const seqTitle1 = document.createElement("span");
  seqTitle1.textContent = "Sequence1";
  seqTitle1.className = "seq1";

  const seqTitle2 = document.createElement("span");
  seqTitle2.textContent = "Sequence2";
  seqTitle2.className = "seq2";

  const loadBtn0 = document.createElement("button");
  loadBtn0.classList.add("button");
  loadBtn0.textContent = "Track1";
  loadBtn0.onclick = () => loadSound(0, 0, typeIndex);

  const loadBtn1 = document.createElement("button");
  loadBtn1.classList.add("button");
  loadBtn1.textContent = "Track2";
  loadBtn1.onclick = () => loadSound(0, 1, typeIndex);

  const loadBtn2 = document.createElement("button");
  loadBtn2.classList.add("button");
  loadBtn2.textContent = "Track3";
  loadBtn2.onclick = () => loadSound(0, 2, typeIndex);

  const loadBtn3 = document.createElement("button");
  loadBtn3.classList.add("button");
  loadBtn3.textContent = "Track1";
  loadBtn3.onclick = () => loadSound(1, 0, typeIndex);

  const loadBtn4 = document.createElement("button");
  loadBtn4.classList.add("button");
  loadBtn4.textContent = "Track2";
  loadBtn4.onclick = () => loadSound(1, 1, typeIndex);

  const loadBtn5 = document.createElement("button");
  loadBtn5.classList.add("button");
  loadBtn5.textContent = "Track3";
  loadBtn5.onclick = () => loadSound(1, 2, typeIndex);

  control.appendChild(seqTitle1);
  control.appendChild(loadBtn0);
  control.appendChild(loadBtn1);
  control.appendChild(loadBtn2);
  control.appendChild(seqTitle2);
  control.appendChild(loadBtn3);
  control.appendChild(loadBtn4);
  control.appendChild(loadBtn5);
}

soundSetting1.addEventListener("pointerdown", () => {openSound(0);});
soundSetting2.addEventListener("pointerdown", () => {openSound(1);});
soundSetting3.addEventListener("pointerdown", () => {openSound(2);});
