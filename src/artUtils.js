function generatePalette(n) {
  const da = 360 / n;
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

function drawInWedges(x1, y1, x2, y2, nWedges) {
  const da = TWO_PI / nWedges;
  for (let i = 0; i < nWedges; i += 1) {
    push();
    rotate(da * i);
    line(x1, y1, x2, y2);
    pop();
  }
}

function drawPaths(pathArray, strokes) {
  pathArray.forEach((path, i) => {
    if (path.length < 2) {
      return;
    }

    stroke(strokes[i]);
    path.forEach(([x, y], j) => {
      if (j === 0) {
        return;
      }
      const [prevX, prevY] = path[j - 1];
      drawInWedges(prevX, prevY, x, y, 8);
    });
  });
}

function drawOverlay(drawing) {
  if (drawing) {
    stroke(0, 0, 50, 0.15);
    strokeWeight(2);
    drawInWedges(0, 0, width, 0, 8);
  } else {
    fill(0, 0, 50, 0.25);
    noStroke();
    ellipse(0, 0, 5, 5);
  }
}

export default {
  generatePalette, drawInWedges, drawPaths, drawOverlay,
};
