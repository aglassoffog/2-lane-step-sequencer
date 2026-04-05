const tabNames = [
  "Pattern",
  "Sound",
  "Move",
  "Sequence",
  "Mixer"
]
const tab = document.getElementById("tabs");
const patternTab = document.getElementById("patternTab");
const soundTab = document.getElementById("soundTab");
const moveTab = document.getElementById("moveTab");
const sequenceTab = document.getElementById("sequenceTab");

tabNames.forEach(name => {
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.dataset.tab = name.toLowerCase()+"Tab";
  tab.appendChild(btn);
});

const tabContents = document.querySelectorAll("#tabContents .tabContent");
const tabs = document.querySelectorAll("#tabs button");
tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    tabContents.forEach(t => {
      if (btn.dataset.tab === t.id) {
        t.style.display = "block";
      } else {
        t.style.display = "none";
      }
    });
  });
});
