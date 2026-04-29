const tabNames = [
  "Pattern",
  "Mixer",
  "Shift",
  "Setting",
  "Effect",
  "Sound",
  "Copy"
//  "SoundSet"
]
const tab = document.getElementById("tabs");
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

const panel = document.getElementById("right");
const innerWidth = window.innerWidth;
document.addEventListener("click", (e) => {
  if (e.target === panelBtn) {
    panel.classList.toggle("open");
    const vv = window.visualViewport;
    panel.style.right = (innerWidth - vv.width - vv.offsetLeft) + "px";
    document.body.classList.toggle("no-scroll");
  } else if (e.target === playBtn) {
  } else if (e.target === patternName1 || e.target === patternName2) {
  } else if (e.target === saveBtn1 || e.target === saveBtn2) {
  } else if (e.target === clrBtn1 || e.target === clrBtn2) {
    // ポップアップが出ないボタンはそのまま押せる
  } else if (!document.body.contains(e.target)) {
    // すでに削除済み場合は判定しない
  } else if (!panel.contains(e.target)) {
    panel.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }
});

function updateSlidbar(bar) {
  const percent = (bar.value - bar.min) / (bar.max - bar.min) * 100;
  bar.style.setProperty("--value", percent + "%");
}

document.querySelectorAll(".form-sliders input").forEach(bar => {
  updateSlidbar(bar);
});
