const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const faceColor = document.querySelector(".face-color-input");
const borderColor = document.querySelector(".border-color-input");
const lineColor = document.querySelector(".line-color-input");
const handColor = document.querySelector(".hand-color-input");
const secondColor = document.querySelector(".second-color-input");

const downloadBtn = document.querySelector(".download");

downloadBtn.addEventListener("click", function (e) {
  let canvasURL = canvas.toDataURL();
  const createEl = document.createElement("a");
  createEl.href = canvasURL;
  createEl.download = "canvas-download-test";
  createEl.click();
  createEl.remove();
});

function clock() {
  const now = new Date();

  ctx.save(); //save the default state

  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // Put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); //Rotate clock -90deg

  //Set default styles
  ctx.strokeStyle = lineColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  //Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour marks
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute marks
  ctx.save();
  ctx.lineWidth = 3;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(118, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get current time
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  console.log(`${hour}:${min}:${sec}`);

  // Draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hour + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = handColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = handColor.value;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(110, 0);
  ctx.stroke();
  ctx.restore();

  // Draw second hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondColor.value;
  ctx.fillStyle = secondColor.value;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); //restore default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);
