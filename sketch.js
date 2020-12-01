let drawing = false;
let prevX;
let prevY;

function adjustedMouseXY() {
  // relative to middle of screen
  return [mouseX - width / 2, mouseY - height / 2];
}

function touchStarted() {
  drawing = true;
  [prevX, prevY] = adjustedMouseXY();
}

function touchEnded() {
  drawing = false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  strokeWeight(10);
}

function drawInWedges(x1, y1, x2, y2, nWedges) {
  const da = TWO_PI / nWedges;
  for (let i = 0; i < nWedges; i += 1) {
    rotate(da * i);
    line(x1, y1, x2, y2);
  }
}

function draw() {
  translate(width / 2, height / 2);

  if (drawing) {
    const [x, y] = adjustedMouseXY();
    drawInWedges(prevX, prevY, x, y, 8);
    [prevX, prevY] = [x, y];
  }
}

window.setup = setup;
window.draw = draw;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;
