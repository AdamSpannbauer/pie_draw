class ToolBarItem {
  constructor(img, h, clickAction) {
    this.img = img;
    this.clickAction = clickAction;

    this.h = h;
    this.w = this.imgWidth(h);

    // Will be set when drawn first time
    this.x = 0;
    this.y = 0;
  }

  imgWidth(h) {
    return (h / this.img.height) * this.img.width;
  }

  clickEvent(x, y) {
    let eventTriggered = false;
    if (x >= this.x
     && x <= this.x + this.w
     && y >= this.y
     && y <= this.y + this.h) {
      this.clickAction();
      eventTriggered = true;
    }

    return eventTriggered;
  }

  draw(x, y) {
    this.x = x;
    this.y = y;

    image(this.img, this.x, this.y, this.w, this.h);
  }
}

export default { ToolBarItem };
