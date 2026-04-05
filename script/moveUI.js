function initMoveUI() {
  const control = document.getElementById("moveControl");

  const h4t = document.createElement("h4");
  h4t.textContent = "All";
  control.appendChild(h4t);

  const moveBtn0 = document.createElement("button");
  moveBtn0.classList.add("button");
  moveBtn0.textContent = "Left";
  moveBtn0.onclick = () => {
    leftShift(patterns[0]);
    updateUI(0);
  }
  control.appendChild(moveBtn0);
}
