class ToolBarItem {
  constructor(img, clickAction) {
    this.img = img;
    this.clickAction = clickAction;

    // Will be set when drawn first time
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
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

  draw(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = this.imgWidth(h);

    image(this.img, this.x, this.y, this.w, this.h);
  }
}

export default { ToolBarItem };
