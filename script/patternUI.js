let keyword = "";
let timer;
let currentPatternList = [];
let selectedPattern = [
  {patternIndex: null, active: false},
  {patternIndex: null, active: false}
];

function updatePatternList() {
  patternList.innerHTML = "";
  currentPatternList = [];
  selectedPattern = [
    {patternIndex: null, active: false},
    {patternIndex: null, active: false}
  ];

  Object.keys(localStorage)
    .filter(key => key.startsWith("pattern_" + keyword))
    .sort()
    .forEach((key, i) => {

    const name = key.replace("pattern_", "");
    currentPatternList.push(name);
    const li = document.createElement("li");

    const loadBtn0 = document.createElement("button");
    loadBtn0.classList.add("button", "seq1");
    loadBtn0.textContent = "Load1";
    loadBtn0.onclick = (e) => {
      loadPattern(0, name, i);
    }

    const loadBtn1 = document.createElement("button");
    loadBtn1.classList.add("button", "seq2");
    loadBtn1.textContent = "Load2";
    loadBtn1.onclick = () => {
      loadPattern(1, name, i);
    }

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;

    const delBtn = document.createElement("button");
    delBtn.classList.add("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      localStorage.removeItem(key);
      updatePatternList();
    };

    li.appendChild(loadBtn0);
    li.appendChild(loadBtn1);
    li.appendChild(nameSpan);
    li.appendChild(delBtn);
    patternList.appendChild(li);
  });
}

const searchInput = document.getElementById("patternSearch");
searchInput.addEventListener("input", () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    keyword = searchInput.value;
    updatePatternList();
  }, 100);
});

function updatePatternListSpan() {
  patternList.querySelectorAll("span").forEach((span, i) => {
    span.className = "";
    if (i === selectedPattern[0].patternIndex) {
      span.className = "seq1";
    }
    if (i === selectedPattern[1].patternIndex) {
      span.className = "seq2";
      if (selectedPattern[0].patternIndex === selectedPattern[1].patternIndex) {
        if (selectedPattern[0].active) {
          span.className = "seq1";
        }
      }
    }
  });
}
