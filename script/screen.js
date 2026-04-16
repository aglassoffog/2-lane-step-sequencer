const fullBtn = document.getElementById("fullBtn");
fullBtn.addEventListener("pointerdown", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullBtn.textContent = "Exit";
  } else {
    document.exitFullscreen();
    fullBtn.textContent = "Fullscreen";
  }
});
