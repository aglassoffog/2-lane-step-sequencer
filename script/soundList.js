let keywordSound = "";
let currentSoundName = "";
let currentSoundList = [];
let selectedSound = [
  {soundIndex: null, active: false},
  {soundIndex: null, active: false}
];

const soundList = document.getElementById("soundList");

function loadSoundList(seqIndex, trackIndex, name, soundIndex) {
  const data = localStorage.getItem("sound_" + name);
  if (!data) return;

  const currentSoundName = document.getElementById("soundName");
  currentSoundName.value = name;

  const parsed = JSON.parse(data);
  sounds[seqIndex][trackIndex].Type = parsed.sound.Type;
  sounds[seqIndex][trackIndex].Envelope.Attack = parsed.sound.Envelope.Attack;
  sounds[seqIndex][trackIndex].Envelope.Duration = parsed.sound.Envelope.Duration;

  selectedSound[seqIndex].soundIndex = soundIndex;
  selectedSound[seqIndex].active = true;
  selectedSound[seqIndex^1].active = false;

  updateUI(seqIndex);
  updateSoundList();
}

function updateSoundList() {
  soundList.innerHTML = "";
  currentSoundList = [];

  Object.keys(localStorage)
    .filter(key => key.startsWith("sound_" + keywordSound))
    .sort()
    .forEach((key, i) => {

    const name = key.replace("sound_", "");
    currentSoundList.push(name);
    const li = document.createElement("li");

    for(let s=0;s<2;s++){
      for(let t=0;t<3;t++){
        const loadBtn = document.createElement("button");
        loadBtn.classList.add("button", "seq"+(s+1));
        loadBtn.textContent = (t+1);
        loadBtn.onclick = () => {loadSoundList(s, t, name, i)};
        li.appendChild(loadBtn);
      }
    }

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    if (i === selectedSound[0].soundIndex) {
      nameSpan.className = "seq1";
    }
    if (i === selectedSound[1].soundIndex) {
      nameSpan.className = "seq2";
      if (selectedSound[0].soundIndex === selectedSound[1].soundIndex) {
        if (selectedSound[0].active) {
          nameSpan.className = "seq1";
        }
      }
    }

    const delBtn = document.createElement("button");
    delBtn.classList.add("button");
    delBtn.textContent = "D";
    delBtn.onclick = () => {
      localStorage.removeItem(key);
      updateSoundList();
    };

    li.appendChild(nameSpan);
    li.appendChild(delBtn);

    soundList.appendChild(li);
  });
}

function importSounds(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);

    Object.keys(data).forEach(key => {
      localStorage.setItem(key, JSON.stringify(data[key]));
    });

    updateSoundList();
  };

  reader.readAsText(file);
}

function exportAllSounds() {
  const data = {};

  Object.keys(localStorage)
    .filter(key => key.startsWith("sound_"))
    .sort()
    .forEach(key => {

    data[key] = JSON.parse(localStorage.getItem(key));
  });

  const json = JSON.stringify(data, null, 2);

  downloadJSON(json, "sounds.json");
}
