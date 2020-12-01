import art from './src/artUtils.js';
import path from './src/pathUtils.js';
import tb from './src/toolbar.js';
import tbi from './src/toolbaritem.js';

let DRAWING = false;

let cnv;

const nColors = 3;
let colorPalette;

const paths = [];
const pathPrec = 2;

let undoImg;
let eraseAllImg;
let saveImg;
let toolbar;

function preload() {
  undoImg = loadImage('./assets/imgs/undo.png');
  eraseAllImg = loadImage('./assets/imgs/erase_all.png');
  saveImg = loadImage('./assets/imgs/save.png');
}

function saveCnv() {
  background(0, 10, 10);

  translate(width / 2, height / 2);
  strokeWeight(10);

  art.drawPaths(paths, colorPalette);
  saveCanvas(cnv, 'my_pie_drawing', 'png');
}

function touchStarted() {
  const toolbarEventTriggered = toolbar.clickEvent(mouseX, mouseY);
  if (toolbarEventTriggered) return;

  DRAWING = true;

  paths.push([]);
  path.appendMouseXYToPath(paths[paths.length - 1], pathPrec);
}

function touchEnded() {
  DRAWING = false;
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  const undoItem = new tbi.ToolBarItem(undoImg, () => paths.pop());
  const eraseAllItem = new tbi.ToolBarItem(eraseAllImg, () => paths.splice(0, paths.length));
  const saveItem = new tbi.ToolBarItem(saveImg, saveCnv);

  colorPalette = art.generatePalette(nColors);

  toolbar = new tb.ToolBar(5, 5, 50, 10, [undoItem, eraseAllItem, saveItem]);
}

function draw() {
  background(0, 10, 10);
  strokeWeight(10);
  translate(width / 2, height / 2);

  if (DRAWING) {
    path.appendMouseXYToPath(paths[paths.length - 1], pathPrec);
  }

  art.drawPaths(paths, colorPalette);
  art.drawOverlay(DRAWING);

  translate(-width / 2, -height / 2);
  toolbar.draw();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;
