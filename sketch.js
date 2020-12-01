let drawing = false;

let prevX;
let prevY;

const nColors = 3;
let colorPalette;
let colorIndex = 0;

function adjustedMouseXY() {
  // relative to middle of screen
  return [mouseX - width / 2, mouseY - height / 2];
}

function touchStarted() {
  drawing = true;
  [prevX, prevY] = adjustedMouseXY();
  stroke(colorPalette[colorIndex % colorPalette.length]);
  colorIndex += 1;
}

function touchEnded() {
  drawing = false;
}

function generatePalette(n) {
  const da = 360 / nColors;
  const palette = [];
  let h = random(360);
  const s = random(50, 100);
  const b = random(50, 100);
  palette.push([h, s, b]);
  for (let i = 1; i < n; i += 1) {
    h = palette[i - 1][0] + da;
    if (h > 360) {
      h -= 360;
    }
    palette.push([h, s, b]);
  }
  return palette;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  strokeWeight(10);
  colorMode(HSB);

  colorPalette = generatePalette(nColors);
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
