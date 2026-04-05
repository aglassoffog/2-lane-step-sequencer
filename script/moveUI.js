function initMoveUI() {
  // const control = document.getElementById("moveControl");

  // const h4t = document.createElement("h4");
  // h4t.textContent = "All";
  // control.appendChild(h4t);

  // const moveBtn0 = document.createElement("button");
  // moveBtn0.classList.add("button");
  // moveBtn0.textContent = "Left";
  const seq1Left = document.getElementById("move-seq1-left");
  seq1Left.onclick = () => {
    leftShift(patterns[0]);
    updateUI(0);
  }

  const seq2Left = document.getElementById("move-seq2-left");
  seq2Left.onclick = () => {
    leftShift(patterns[1]);
    updateUI(1);
  }

  const allLeft = document.getElementById("move-all-left");
  allLeft.onclick = () => {
    leftShift(patterns[0]);
    leftShift(patterns[1]);
    updateUI(0);
    updateUI(1);
  }


  // control.appendChild(moveBtn0);
}
