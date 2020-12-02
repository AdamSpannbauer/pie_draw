function generatePalette(n) {
  const da = 360 / n;
  const palette = [];

  let hue = random(360);
  const sat = random(70, 100);
  const brt = random(70, 100);

  for (let i = 0; i < n; i += 1) {
    hue += da * i;
    if (hue > 360) {
      hue -= 360;
    }
    palette.push([hue, sat, brt]);
    palette.push([hue, sat - 30, brt - 30]);
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

function drawPaths(pathArray, strokes, wedgeNums) {
  pathArray.forEach((path, i) => {
    if (path.length < 2) {
      return;
    }

    stroke(strokes[i]);
    const nWedges = wedgeNums[i];
    path.forEach(([x, y], j) => {
      if (j === 0) {
        return;
      }
      const [prevX, prevY] = path[j - 1];
      drawInWedges(prevX, prevY, x, y, nWedges);
    });
  });
}

function drawOverlay(drawing, nWedges) {
  if (drawing && nWedges > 1) {
    stroke(0, 0, 50, 0.15);
    strokeWeight(2);
    drawInWedges(0, 0, width, 0, nWedges);
  } else {
    fill(0, 0, 50, 0.25);
    noStroke();
    ellipse(0, 0, 5, 5);
  }
}

export default {
  generatePalette, drawInWedges, drawPaths, drawOverlay,
};
