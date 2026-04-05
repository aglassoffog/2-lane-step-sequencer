let keyword = "";
let timer;
let currentPatternList = [];
let currentPattern = 0;
const list = document.getElementById("patternList");

function updatePatternList() {
  list.innerHTML = "";
  currentPatternList = [];
  currentPattern = 0;

  Object.keys(localStorage)
    .filter(key => key.startsWith("pattern_" + keyword))
    .sort()
    .forEach(key => {

    const name = key.replace("pattern_", "");
    currentPatternList.push(name);
    const li = document.createElement("li");

    const loadBtn0 = document.createElement("button");
    loadBtn0.classList.add("button", "seq1");
    loadBtn0.textContent = "Load1";
    loadBtn0.onclick = () => loadPattern(0, name);

    const loadBtn1 = document.createElement("button");
    loadBtn1.classList.add("button", "seq2");
    loadBtn1.textContent = "Load2";
    loadBtn1.onclick = () => loadPattern(1, name);

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

    list.appendChild(li);
  });

  console.log(currentPatternList);
}

const searchInput = document.getElementById("patternSearch");
searchInput.addEventListener("input", () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    keyword = searchInput.value;
    updatePatternList();
  }, 100);
});
