function loadPattern(seqIndex, name) {
  const data = localStorage.getItem("pattern_" + name);
  if (!data) return;

  const patternName = document.getElementById("patternName"+(seqIndex+1));
  patternName.value = name;

  const parsed = JSON.parse(data);
  patterns[seqIndex].splice(0, 3, ...parsed.patterns);
  sounds[seqIndex].splice(0, 3,
    ...(parsed.sounds || [{type: 0},{type: 1},{type: 2}]));
  tempo = parsed.tempo || 120;

  updateUI(seqIndex);
  updatePatternList();
}

function savePattern(seqIndex) {
  const name = document.getElementById("patternName"+(seqIndex+1)).value.trim();
  if (!name) return alert("名前を入れて");

  const data = {
    patterns: patterns[seqIndex],
    sounds: sounds[seqIndex],
    tempo: tempo
  };

  localStorage.setItem("pattern_" + name, JSON.stringify(data));
  updatePatternList();
}

function clearPattern(seqIndex) {
  patterns[seqIndex].forEach(track => track.fill(0));
  sounds[seqIndex].splice(0, 3, ...[{type: 0},{type: 1},{type: 2}]);
  updateUI(seqIndex);
}

saveBtn1.addEventListener("pointerdown", () => {savePattern(0);});
saveBtn2.addEventListener("pointerdown", () => {savePattern(1);});
clrBtn1.addEventListener("pointerdown", () => {clearPattern(0);});
clrBtn2.addEventListener("pointerdown", () => {clearPattern(1);});

function importPatterns(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);

    Object.keys(data).forEach(key => {
      localStorage.setItem(key, JSON.stringify(data[key]));
    });

    updatePatternList();
  };

  reader.readAsText(file);
}

function exportAllPatterns() {
  const data = {};

  Object.keys(localStorage)
    .filter(key => key.startsWith("pattern_"))
    .sort()
    .forEach(key => {

    data[key] = JSON.parse(localStorage.getItem(key));
  });

  const json = JSON.stringify(data, null, 2);

  downloadJSON(json, "patterns.json");
}

function downloadJSON(content, filename) {
  const blob = new Blob([content], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
