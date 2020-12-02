import art from './src/artUtils.js';
import path from './src/pathUtils.js';
import tb from './src/toolBar.js';
import tbi from './src/toolBarItem.js';
import ptbi from './src/paletteToolBarItem.js';

let DRAWING = false;

let cnv;

let nColors = 4;
let colorPalette;
let colorSelected;

const paths = [];
const strokes = [];
const pathPrec = 2;
const bgColor = [0, 10, 10];
const strokeSize = 10;

let undoImg;
let eraseAllImg;
let saveImg;
let toolbar;
const toolBarHeight = 50;
const toolBarItemGap = 10;

function preload() {
  undoImg = loadImage('./assets/imgs/undo.png');
  eraseAllImg = loadImage('./assets/imgs/erase_all.png');
  saveImg = loadImage('./assets/imgs/save.png');
}

function saveCnv() {
  background(bgColor);

  translate(width / 2, height / 2);
  strokeWeight(strokeSize);

  art.drawPaths(paths, strokes);
  saveCanvas(cnv, 'my_pie_drawing', 'png');
}

function touchStarted() {
  const [toolbarEventTriggered, cSelected] = toolbar.clickEvent(mouseX, mouseY);
  if (cSelected !== null) colorSelected = cSelected;
  if (toolbarEventTriggered) return;

  DRAWING = true;

  paths.push([]);
  strokes.push(colorSelected);
  path.appendMouseXYToPath(paths[paths.length - 1], pathPrec);
}

function touchEnded() {
  DRAWING = false;
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  const undoItem = new tbi.ToolBarItem(undoImg, toolBarHeight, () => {
    paths.pop();
    strokes.pop();
  });
  const eraseAllItem = new tbi.ToolBarItem(eraseAllImg, toolBarHeight, () => {
    paths.splice(0, paths.length);
    strokes.splice(0, strokes.length);
  });
  const saveItem = new tbi.ToolBarItem(saveImg, toolBarHeight, saveCnv);
  const toolBarItems = [undoItem, eraseAllItem, saveItem];

  colorPalette = art.generatePalette(nColors);
  nColors = colorPalette.length;

  const toolBarWidth = toolBarItems.reduce((accum, curr) => accum + curr.w, 0);
  let swatchW = (width - 5 - toolBarWidth) / nColors;
  swatchW -= toolBarItemGap * 1.35;

  if (swatchW > toolBarHeight) {
    swatchW = toolBarHeight;
  }

  const paletteToolBarItems = colorPalette.map(
    (c) => new ptbi.PaletteToolBarItem(c, swatchW, toolBarHeight),
  );
  paletteToolBarItems[0].selected = true;
  colorSelected = paletteToolBarItems[0].c;

  toolbar = new tb.ToolBar(5, 5, toolBarHeight, toolBarItemGap, toolBarItems, paletteToolBarItems);
}

function draw() {
  background(bgColor);
  strokeWeight(strokeSize);
  translate(width / 2, height / 2);

  if (DRAWING) {
    path.appendMouseXYToPath(paths[paths.length - 1], pathPrec);
  }

  art.drawPaths(paths, strokes);
  art.drawOverlay(DRAWING);

  translate(-width / 2, -height / 2);
  toolbar.draw();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;
