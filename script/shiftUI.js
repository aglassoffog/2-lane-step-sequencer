const shiftOptions = {
  Left: leftShift,
  Right: rightShift
};

const shiftOptions2 = {
  Up: [upShift, upShiftAll],
  Down: [downShift, downShiftAll],
};

function initShiftUI() {
  for(let i=0;i<3;i++){
    const div = document.getElementById("shift-seq"+(i+1))
    Object.keys(shiftOptions).forEach(key => {
      for(let k=0;k<4;k++){
        const button = document.createElement("button");
        button.className = "button";
        button.textContent = (k > 0) ? key.slice(0, 1) + k : key;
        button.onclick = () => {
          if (repeatShiftMode > 0) {
            repeatShiftMap[i][key][k] = !repeatShiftMap[i][key][k];
            button.classList.toggle("shift", repeatShiftMap[i][key][k]);
          } else {
            if (i === 2) {
              shiftOptions[key](patterns[0], (k > 0) ? k-1 : null);
              shiftOptions[key](patterns[1], (k > 0) ? k-1 : null);
              updateUI(0);
              updateUI(1);
            } else {
              shiftOptions[key](patterns[i], (k > 0) ? k-1 : null);
              updateUI(i);
            }
          }
        }
        div.appendChild(button);
      }
      const br = document.createElement("br");
      div.appendChild(br);
    });
    Object.keys(shiftOptions2).forEach(key => {
      for(let k=0;k<5;k++){
        const button = document.createElement("button");
        button.className = "button";
        button.textContent = (k > 0) ? key.slice(0, 1) + k*4 : key;
        button.onclick = () => {
          if (repeatShiftMode > 0) {
            repeatShiftMap[i][key][k] = !repeatShiftMap[i][key][k];
            button.classList.toggle("shift", repeatShiftMap[i][key][k]);
          } else {
            if (i === 2) {
              shiftOptions2[key][1]((k > 0) ? k-1 : null);
              updateUI(0);
              updateUI(1);
            } else {
              shiftOptions2[key][0](patterns[i], (k > 0) ? k-1 : null);
              updateUI(i);
            }
          }
        }
        div.appendChild(button);
      }
    });
  }
}

document.getElementsByName("repeatShiftMode").forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      repeatShiftMode = parseInt(radio.value);
    }
  });
});
