class ToolBar {
  constructor(x, y, h, gap, items, paletteItems) {
    // Assuming that toolbar should be full width of screen
    this.x = x;
    this.y = y;
    this.h = h;
    this.gap = gap;
    this.items = items;
    this.paletteItems = paletteItems;
  }

  clickEvent(x, y) {
    let eventTriggered = false;
    let itemEventTriggered;
    let colorSelected = null;

    this.items.forEach((item) => {
      itemEventTriggered = item.clickEvent(x, y);
      eventTriggered = eventTriggered || itemEventTriggered;
    });

    this.paletteItems.forEach((item) => {
      itemEventTriggered = item.clickEvent(x, y);
      if (itemEventTriggered) {
        this.paletteItems.forEach((itm) => {
          itm.selected = false;
        });

        item.selected = true;
        colorSelected = item.c;
      }
      eventTriggered = eventTriggered || itemEventTriggered;
    });

    return [eventTriggered, colorSelected];
  }

  draw() {
    let { x } = this;

    this.items.forEach((item) => {
      item.draw(x, this.y);
      x += item.w + this.gap;
    });

    this.paletteItems.forEach((item) => {
      item.draw(x, this.y);
      x += item.w + this.gap;
    });
  }
}

export default { ToolBar };
