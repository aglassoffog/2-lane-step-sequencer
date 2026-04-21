const tabNames = [
  "Pattern",
  "Mixer",
  "Shift",
  "Sound"
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
panelBtn.addEventListener("click", () => {
  panel.classList.toggle("open");
  const vv = window.visualViewport;
  panel.style.right = (window.innerWidth - vv.width - vv.offsetLeft) + "px";
  console.log(window.innerWidth);
  console.log(vv.width);
  console.log(vv.offsetLeft);
  // if (!vv) return;
  // const right = Math.max(0, window.innerWidth - (vv.offsetLeft + vv.width));
  // panel.style.transform = `translateX(${right}px)`;
});
