let currentPatternName = "";

function savePattern() {
  const name = document.getElementById("patternName").value.trim();
  if (!name) return alert("名前を入れて");

  const data = {
    patterns,
    tempo
  };

  localStorage.setItem("pattern_" + name, JSON.stringify(data));
  updatePatternList();
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
    const loadBtn = document.createElement("button");
    loadBtn.textContent = "Load";
    loadBtn.onclick = () => loadPattern(name);

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

    li.appendChild(loadBtn);
    li.appendChild(nameSpan);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function loadPattern(name) {
  const data = localStorage.getItem("pattern_" + name);
  if (!data) return;

  currentPatternName = name;

  const parsed = JSON.parse(data);

  patterns = parsed.patterns;
  tempo = parsed.tempo || 120;

  updateUI();
  updatePatternList();
}

function clearPattern() {
  patterns.forEach(track => track.fill(0));
  updateUI();
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
