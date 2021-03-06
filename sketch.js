/* eslint-disable import/extensions */
import art from './src/artUtils.js';
import path from './src/pathUtils.js';
import tb from './src/toolBar.js';
import tbi from './src/toolBarItem.js';
import ptbi from './src/paletteToolBarItem.js';
import wb from './src/wedgeBtn.js';
import utils from './src/detectMobile.js';

let DRAWING = false;

let cnv;

let nColors = 4;
let colorPalette;
let colorSelected;

const paths = [];

const pathPrec = 2;
const bgColor = [0, 10, 10];
const strokeSize = 10;

let undoImg;
let eraseAllImg;
let saveImg;
let toolbar;
let wedgeButton;
const toolBarHeight = 50;
const toolBarItemGap = 10;
const wedgeBtnR = 50;

function preload() {
  undoImg = loadImage('./assets/imgs/undo.png');
  eraseAllImg = loadImage('./assets/imgs/erase_all.png');
  saveImg = loadImage('./assets/imgs/save.png');
}

function saveCnv() {
  background(bgColor);

  translate(width / 2, height / 2);
  strokeWeight(strokeSize);

  art.drawPaths(paths);
  saveCanvas(cnv, 'my_pie_drawing', 'png');
}

function touchStarted() {
  const [toolbarEventTriggered, cSelected] = toolbar.clickEvent(mouseX, mouseY);
  if (cSelected !== null) colorSelected = cSelected;
  if (toolbarEventTriggered) return;

  if (wedgeButton.clickEvent(mouseX, mouseY)) return;

  DRAWING = true;

  paths.push({
    path: [],
    hsb: colorSelected,
    nWedges: wedgeButton.nWedges,
  });
  path.appendMouseXYToPath(paths[paths.length - 1], pathPrec);
}

function touchEnded() {
  DRAWING = false;
}

function mousePressed() {
  touchStarted();
}

function mouseReleased() {
  touchEnded();
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  const undoItem = new tbi.ToolBarItem(undoImg, toolBarHeight, () => {
    paths.pop();
  });
  const eraseAllItem = new tbi.ToolBarItem(eraseAllImg, toolBarHeight, () => {
    paths.splice(0, paths.length);
  });

  const toolBarItems = [undoItem, eraseAllItem];
  // Save doesnt work on mobile as of now
  if (utils.isDesktop()) {
    const saveItem = new tbi.ToolBarItem(saveImg, toolBarHeight, saveCnv);
    toolBarItems.push(saveItem);
  }

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

  wedgeButton = new wb.WedgeBtn(width - wedgeBtnR * 1.2, height - wedgeBtnR * 1.2, wedgeBtnR);
}

function draw() {
  background(bgColor);
  strokeWeight(strokeSize);
  translate(width / 2, height / 2);

  if (DRAWING) {
    path.appendMouseXYToPath(paths[paths.length - 1], pathPrec);
  }

  art.drawPaths(paths);
  art.drawOverlay(DRAWING, wedgeButton.nWedges);

  translate(-width / 2, -height / 2);

  toolbar.draw();
  wedgeButton.draw();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
