import art from './artUtils.js';

class WedgeBtn {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.nWedges = 8;
  }

  clickEvent(x, y) {
    let eventTriggered = false;
    const d = dist(this.x, this.y, x, y);
    if (d < this.r) {
      this.nWedges -= 1;
      if (this.nWedges < 1) {
        this.nWedges = 8;
      }
      eventTriggered = true;
    }
    return eventTriggered;
  }

  draw() {
    push();

    noFill();
    stroke(0, 0, 40);
    strokeWeight(4);

    translate(this.x, this.y);
    if (this.nWedges > 1) {
      art.drawInWedges(0, 0, this.r, 0, this.nWedges);
    }

    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }
}

export default { WedgeBtn };
