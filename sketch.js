let DRAWING = false;

let cnv;

const nColors = 3;
let colorPalette;

let paths = [];
const pathPrec = 2;

let undoImg;
const undoDims = [50, 50];
let eraseAllImg;
const eraseAllDims = [45, 50];
let saveImg;
const saveDims = [50, 50];

function preload() {
  undoImg = loadImage('./assets/imgs/undo.png');
  eraseAllImg = loadImage('./assets/imgs/erase_all.png');
  saveImg = loadImage('./assets/imgs/save.png');
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
  // TODO: make better toolbar logic and get rid of all these magic numbers
  if (mouseX < 10 + undoDims[0] && mouseY < 10 + undoDims[1]) {
    paths.pop();
    return;
  }

  if (
    mouseX > 10 + 20 + undoDims[0]
    && mouseX < 10 + 20 + undoDims[0] + eraseAllDims[0]
    && mouseY < 50
  ) {
    paths = [];
    return;
  }

  if (mouseX > 10 + 20 + 20 + undoDims[0] + eraseAllDims[0]
    && mouseX < 10 + 20 + 20 + undoDims[0] + eraseAllDims[0] + saveDims[0]
    && mouseY < 50
  ) {
    background(0, 10, 10);
    strokeWeight(10);
    drawPaths(paths);
    saveCanvas(cnv, 'my_pie_drawing', 'png');
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
  cnv = createCanvas(windowWidth, windowHeight);
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

function drawPaths(pathArray) {
  pathArray.forEach((path, i) => {
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
}

function draw() {
  background(0, 10, 10);
  strokeWeight(10);
  translate(width / 2, height / 2);

  if (DRAWING) {
    const [x, y] = adjustedMouseXY();
    const [prevX, prevY] = [x, y];
    appendToPath(paths[paths.length - 1], prevX, prevY);
  }

  drawPaths(paths);

  if (DRAWING) {
    stroke(0, 0, 50, 0.15);
    strokeWeight(2);
    drawInWedges(0, 0, width, 0, 8);
  } else {
    fill(0, 0, 50, 0.25);
    noStroke();
    ellipse(0, 0, 5, 5);
  }

  image(undoImg, -width / 2 + 10, -height / 2 + 10, undoDims[0], undoDims[1]);
  image(
    eraseAllImg,
    -width / 2 + 20 + undoDims[0],
    -height / 2 + 10,
    eraseAllDims[0],
    eraseAllDims[1],
  );
  image(
    saveImg,
    -width / 2 + 20 + 10 + undoDims[0] + eraseAllDims[0],
    -height / 2 + 10,
    saveDims[0],
    saveDims[1],
  );
}

window.preload = preload;
window.setup = setup;
window.draw = draw;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;
