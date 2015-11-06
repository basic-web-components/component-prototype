/**
 * Aspect which scrolls a container to keep the selected item visible.
 *
 * @element basic-selection-scroll
 */

export default class SelectionScroll {

  get selectedItem() {
    return this.superGet(this.SelectionScroll, 'selectedItem');
  }
  set selectedItem(item) {
    this.superSet(this.SelectionScroll, 'selectedItem', item);
    if (item) {
      // Keep the selected item in view.
      this.scrollItemIntoView(item);
    }
  }

  /**
   * Scroll the given element completely into view, minimizing the degree of
   * scrolling performed.
   *
   * Blink has a scrollIntoViewIfNeeded() function that almost the same thing,
   * but unfortunately it's non-standard, and in any event often ends up
   * scrolling more than is absolutely necessary.
   *
   * @method scrollItemIntoView
   */
  scrollItemIntoView(item) {
    // Get the relative position of the item with respect to the top of the
    // list's scrollable canvas. An item at the top of the list will have a
    // elementTop of 0.

    let innermost = this.innermostAttached;
    if (!innermost) {
      return;
    }

    let elementTop = item.offsetTop - innermost.offsetTop - innermost.clientTop;
    let elementBottom = elementTop + item.offsetHeight;
    // Determine the bottom of the scrollable canvas.
    let scrollBottom = innermost.scrollTop + innermost.clientHeight;
    if (elementBottom > scrollBottom) {
      // Scroll up until item is entirely visible.
      innermost.scrollTop += elementBottom - scrollBottom;
    }
    else if (elementTop < innermost.scrollTop) {
      // Scroll down until item is entirely visible.
      innermost.scrollTop = elementTop;
    }
  }

}
