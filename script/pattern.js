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

function loadPattern(seqIndex, name) {
  const data = localStorage.getItem("pattern_" + name);
  if (!data) return;

  currentPatternName = name;

  const parsed = JSON.parse(data);
  patterns[seqIndex].splice(0, 3, ...parsed.patterns);
  tempo = parsed.tempo || 120;

  updateUI(seqIndex);
  updatePatternList();
}

function clearPattern(seqIndex) {
  patterns[seqIndex].forEach(track => track.fill(0));
  updateUI(seqIndex);
}

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
