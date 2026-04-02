function updatePatternList() {
  const list = document.getElementById("patternList");
  list.innerHTML = "";

  Object.keys(localStorage)
    .filter(key => key.startsWith("pattern_"))
    .sort()
    .forEach(key => {

    const name = key.replace("pattern_", "");
    const li = document.createElement("li");

    const loadBtn0 = document.createElement("button");
    loadBtn0.classList.add("button");
    loadBtn0.textContent = "Load1";
    loadBtn0.onclick = () => loadPattern(0, name);

    const loadBtn1 = document.createElement("button");
    loadBtn1.classList.add("button");
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
}
