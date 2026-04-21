let keywordSoundSet = "";
// let currentSoundName = "";
let currentSoundSetList = [];
let selectedSoundSet = [
  {soundIndex: null, active: false},
  {soundIndex: null, active: false}
];

const soundSetList = document.getElementById("soundSetList");

function loadSoundSetList(seqIndex, name, soundIndex) {
  const data = localStorage.getItem("soundset_" + name);
  if (!data) return;

  // const currentSoundName = document.getElementById("soundName");
  // currentSoundName.value = name;

  const parsed = JSON.parse(data);
  sounds[seqIndex].splice(0, 3, ...parsed.sounds);

  selectedSoundSet[seqIndex].soundIndex = soundIndex;
  selectedSoundSet[seqIndex].active = true;
  selectedSoundSet[seqIndex^1].active = false;

  updateUI(seqIndex);
  updateSoundSetList();
}

function updateSoundSetList() {
  soundSetList.innerHTML = "";
  currentSoundSetList = [];

  Object.keys(localStorage)
    .filter(key => key.startsWith("soundset_" + keywordSoundSet))
    .sort()
    .forEach((key, i) => {

    const name = key.replace("soundset_", "");
    currentSoundSetList.push(name);
    const li = document.createElement("li");

    const loadBtn0 = document.createElement("button");
    loadBtn0.classList.add("button", "seq1");
    loadBtn0.textContent = "Load1";
    loadBtn0.onclick = () => {
      loadSoundSetList(0, name, i);
    }

    const loadBtn1 = document.createElement("button");
    loadBtn1.classList.add("button", "seq2");
    loadBtn1.textContent = "Load2";
    loadBtn1.onclick = () => {
      loadSoundSetList(1, name, i);
    }

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    if (i === selectedSoundSet[0].soundIndex) {
      nameSpan.className = "seq1";
    }
    if (i === selectedSoundSet[1].soundIndex) {
      nameSpan.className = "seq2";
      if (selectedSoundSet[0].soundIndex === selectedSoundSet[1].soundIndex) {
        if (selectedSoundSet[0].active) {
          nameSpan.className = "seq1";
        }
      }
    }

    const delBtn = document.createElement("button");
    delBtn.classList.add("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      localStorage.removeItem(key);
      updateSoundSetList();
    };

    li.appendChild(loadBtn0);
    li.appendChild(loadBtn1);
    li.appendChild(nameSpan);
    li.appendChild(delBtn);

    soundSetList.appendChild(li);
  });
}

function importSoundSet(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);

    Object.keys(data).forEach(key => {
      localStorage.setItem(key, JSON.stringify(data[key]));
    });

    updateSoundSetList();
  };

  reader.readAsText(file);
}

function exportAllSoundSet() {
  const data = {};

  Object.keys(localStorage)
    .filter(key => key.startsWith("soundset_"))
    .sort()
    .forEach(key => {

    data[key] = JSON.parse(localStorage.getItem(key));
  });

  const json = JSON.stringify(data, null, 2);

  downloadJSON(json, "soundsets.json");
}