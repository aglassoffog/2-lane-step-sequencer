const copyOptions = {
  Right: rightCopy
};

const copyOptions2 = {
  Down: downCopy,
};

function initCopyUI() {
  for(let i=0;i<2;i++){
    const div = document.getElementById("copy-seq"+(i+1))

    for(let j=0;j<4;j++){

      Object.keys(copyOptions).forEach(key => {
        for(let k=0;k<3;k++){
          const button = document.createElement("button");
          button.className = "button";
          button.textContent = key.slice(0, 1) + ((j > 0) ? j : "") + "-" + (k+2);
          button.onclick = () => {
            copyOptions[key](i, j, k+1);
            updateUI(i);
          }
          div.appendChild(button);
        }
        const br = document.createElement("br");
        div.appendChild(br);
      });

    }
/*
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
*/
  }
}
