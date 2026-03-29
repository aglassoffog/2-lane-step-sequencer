let currentPatternName = "";

function savePattern(seqIndex) {
  const name = document.getElementById("patternName" + seqIndex).value.trim();
  if (!name) return alert("名前を入れて");

  const data = {
    patterns: patterns[seqIndex],
    tempo: tempo
  };

  localStorage.setItem("pattern_" + name, JSON.stringify(data));
  updatePatternList();
}

function savePattern0() {
  savePattern(0);
}

function savePattern1() {
  savePattern(1);  
}

function updatePatternList() {
  const list = document.getElementById("patternList");
  list.innerHTML = "";

  Object.keys(localStorage).forEach(key => {
    if (!key.startsWith("pattern_")) return;

    const name = key.replace("pattern_", "");
    const li = document.createElement("li");
    li.classList.toggle("selected", name === currentPatternName);

    // ロードボタン
    const loadBtn0 = document.createElement("button");
    loadBtn0.textContent = "Load1";
    loadBtn0.onclick = () => loadPattern(0, name);

    const loadBtn1 = document.createElement("button");
    loadBtn1.textContent = "Load2";
    loadBtn1.onclick = () => loadPattern(1, name);

    // 名前
    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    nameSpan.style.flex = "1";
    nameSpan.style.margin = "0 8px";

    // 削除ボタン
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      localStorage.removeItem(key);
      updatePatternList();
    };

    li.appendChild(loadBtn0);
    li.appendChild(loadBtn1);
    li.appendChild(nameSpan);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function loadPattern(seqIndex, name) {
  const data = localStorage.getItem("pattern_" + name);
  if (!data) return;

  currentPatternName = name;

  const parsed = JSON.parse(data);

  patterns[seqIndex] = parsed.patterns;
  tempo = parsed.tempo || 120;

  updateUI(seqIndex);
  updatePatternList();
}

function clearPattern(seqIndex) {
  patterns[seqIndex].forEach(track => track.fill(0));
  updateUI(seqIndex);
}

function clearPattern0() {
  clearPattern(0);
}

function clearPattern1() {
  clearPattern(1);
}

function exportPattern() {
  const data = JSON.stringify({ patterns, tempo });
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pattern.json";
  a.click();
}
