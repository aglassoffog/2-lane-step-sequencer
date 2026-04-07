function initShiftUI() {
  const options = {
    Left: leftShift,
    Right: rightShift
  };

  const options2 = {
    Up: [upShift, upShiftAll]
  };

  for(let i=0;i<3;i++){
    const div = document.getElementById("shift-seq"+(i+1))
    Object.keys(options).forEach(key => {
      for(let k=0;k<4;k++){
        if (i < 2 || (i === 2 && k === 0)) {
          const button = document.createElement("button");
          button.className = "button";
          button.textContent = (k > 0) ? key.slice(0, 1) + k : key;
          button.onclick = () => {
            if (i === 2 && k === 0) {
              options[key](patterns[0]);
              options[key](patterns[1]);
              updateUI(0);
              updateUI(1);
            } else {
              options[key](patterns[i], (k > 0) ? k-1 : null);
              updateUI(i);
            }
          }
          div.appendChild(button);
        }
      }
      const br = document.createElement("br");
      div.appendChild(br);
    });
    Object.keys(options2).forEach(key => {
      for(let k=0;k<3;k++){
        const button = document.createElement("button");
        button.className = "button";
        button.textContent = (k > 0) ? key.slice(0, 1) + k : key;
        button.onclick = () => {
          if (i === 2) {
            options2[key][1]((k > 0) ? k-1 : null);
            updateUI(0);
            updateUI(1);
          } else {
            options2[key][0](patterns[i], (k > 0) ? k-1 : null);
            updateUI(i);
          }
        }
        div.appendChild(button);
      }
    });
  }
}
