class ToolBar {
  constructor(x, y, h, gap, items) {
    // Assuming that toolbar should be full width of screen
    this.x = x;
    this.y = y;
    this.h = h;
    this.gap = gap;
    this.items = items;
  }

  clickEvent(x, y) {
    let eventTriggered = false;
    let itemEventTriggered;
    this.items.forEach((item) => {
      itemEventTriggered = item.clickEvent(x, y);
      eventTriggered = eventTriggered || itemEventTriggered;
    });

    return eventTriggered;
  }

  draw() {
    let { x } = this;

    this.items.forEach((item) => {
      item.draw(x, this.y, this.h);
      x += item.w + this.gap;
    });
  }
}

export default { ToolBar };
