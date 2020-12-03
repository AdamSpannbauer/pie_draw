function roundTo(x, n) {
  const scl = 10 ** n;
  return Math.round(x * scl) / scl;
}

function adjustedMouseXY() {
  // relative to middle of screen
  return [mouseX - width / 2, mouseY - height / 2];
}

function appendToPath(path, x, y, precision) {
  const loc = [roundTo(x, precision), roundTo(y, precision)];
  if (path.length < 2) {
    path.push(loc);
    return;
  }

  const [x1, y1] = path[path.length - 1];
  if (!(x1 === x && y1 === y)) {
    path.push(loc);
  }
}

function appendMouseXYToPath(pathObj, precision) {
  const [x, y] = adjustedMouseXY();
  appendToPath(pathObj.path, x, y, precision);
}

export default { appendToPath, appendMouseXYToPath };
