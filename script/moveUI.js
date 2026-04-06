function initMoveUI() {
  const options = {
    Left: leftShift,
    Right: rightShift
  };

  for(let i=0;i<3;i++){
    const div = document.getElementById("move-seq"+(i+1))
    Object.keys(options).forEach(key => {
      for(let k=0;k<4;k++){
        if (i === 2 && k > 0) {
        } else {
          const button = document.createElement("button");
          button.className = "button";
          button.textContent = ((k > 0) ? key.slice(0, 1) + k : key);
          button.onclick = () => {
            if (i === 2 && k === 0) {
              options[key](patterns[0]);
              options[key](patterns[1]);
              updateUI(0);
              updateUI(1);
            } else {
              const index = (k > 0) ? k-1 : null;
              options[key](patterns[i], index);
              updateUI(i);
            }
          }
          div.appendChild(button);
        }
      }
      const br = document.createElement("br");
      div.appendChild(br);
    });
  }
}
