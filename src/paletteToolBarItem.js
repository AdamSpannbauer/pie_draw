class PaletteToolBarItem {
  constructor(c) {
    this.selected = false;
    this.c = c;

    // Set in draw
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
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

  draw(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = h;

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
