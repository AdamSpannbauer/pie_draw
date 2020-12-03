function roundTo(x, n) {
  const scl = 10 ** n;
  return Math.round(x * scl) / scl;
}

function adjustedMouseXY() {
  // relative to middle of screen
  return [mouseX - width / 2, mouseY - height / 2];
}

function appendToPath(path, x, y, precision) {
  const loc = {
    x: roundTo(x, precision),
    y: roundTo(y, precision),
  };

  path.push(loc);
  return simplify(path, 0.5);
}

function appendMouseXYToPath(pathObj, precision) {
  const [x, y] = adjustedMouseXY();
  pathObj.path = appendToPath(pathObj.path, x, y, precision);
}

export default { appendToPath, appendMouseXYToPath };
