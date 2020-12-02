class PaletteToolBarItem {
  constructor(c, w, h) {
    this.selected = false;
    this.c = c;

    this.w = w;
    this.h = h;

    // Set in draw
    this.x = 0;
    this.y = 0;
  }

  clickEvent(x, y) {
    let eventTriggered = false;
    if (x >= this.x
     && x <= this.x + this.w
     && y >= this.y
     && y <= this.y + this.h) {
      this.selected = true;
      eventTriggered = true;
    }
    return eventTriggered;
  }

  draw(x, y) {
    this.x = x;
    this.y = y;

    push();
    fill(this.c);
    if (this.selected) {
      stroke(0, 0, 100);
      strokeWeight(5);
    } else {
      noStroke();
    }
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

export default { PaletteToolBarItem };
