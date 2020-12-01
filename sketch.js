let DRAWING = false;

const nColors = 3;
let colorPalette;

const paths = [];
const pathPrec = 2;

let undoImg;

function preload() {
  undoImg = loadImage('./assets/imgs/undo.png');
}

function roundTo(x, n) {
  const scl = 10 ** n;
  return Math.round(x * scl) / scl;
}

function appendToPath(path, x, y) {
  const loc = [roundTo(x, pathPrec), roundTo(y, pathPrec)];
  if (path.length < 2) {
    path.push(loc);
    return;
  }

  const [x1, y1] = path[path.length - 1];
  if (!(x1 === x && y1 === y)) {
    path.push(loc);
  }
}

function adjustedMouseXY() {
  // relative to middle of screen
  return [mouseX - width / 2, mouseY - height / 2];
}

function touchStarted() {
  if (mouseX < 50 && mouseY < 50) {
    paths.pop();
    return;
  }

  DRAWING = true;

  const [prevX, prevY] = adjustedMouseXY();
  paths.push([]);
  appendToPath(paths[paths.length - 1], prevX, prevY);
}

function touchEnded() {
  DRAWING = false;
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
  strokeWeight(10);
  colorMode(HSB);

  colorPalette = generatePalette(nColors);
}

function drawInWedges(x1, y1, x2, y2, nWedges) {
  const da = TWO_PI / nWedges;
  for (let i = 0; i < nWedges; i += 1) {
    push();
    rotate(da * i);
    line(x1, y1, x2, y2);
    pop();
  }
}

function draw() {
  background(0, 10, 10);
  translate(width / 2, height / 2);

  if (DRAWING) {
    const [x, y] = adjustedMouseXY();
    const [prevX, prevY] = [x, y];
    appendToPath(paths[paths.length - 1], prevX, prevY);
  }

  paths.forEach((path, i) => {
    if (path.length < 2) {
      return;
    }

    stroke(colorPalette[i % colorPalette.length]);
    path.forEach(([x, y], j) => {
      if (j === 0) {
        return;
      }
      const [prevX, prevY] = path[j - 1];
      drawInWedges(prevX, prevY, x, y, 8);
    });
  });

  image(undoImg, -width / 2 + 10, -height / 2 + 10, 50, 50);
}

window.preload = preload;
window.setup = setup;
window.draw = draw;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;
