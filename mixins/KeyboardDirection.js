/**
 * Aspect which maps direction keys (Left, Right, etc.) to direction semantics
 * (goLeft, goRight, etc.).
 *
 * @element basic-keyboard-direction
 */

export default class KeyboardDirection {

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  goDown() {
    let base = this.KeyboardDirection.super.goDown;
    if (base) {
      base.call(this);
    }
  }

  goEnd() {
    let base = this.KeyboardDirection.super.goEnd;
    if (base) {
      base.call(this);
    }
  }

  goLeft() {
    let base = this.KeyboardDirection.super.goLeft;
    if (base) {
      base.call(this);
    }
  }

  goRight() {
    let base = this.KeyboardDirection.super.goRight;
    if (base) {
      base.call(this);
    }
  }

  goStart() {
    let base = this.KeyboardDirection.super.goStart;
    if (base) {
      base.call(this);
    }
  }

  goUp() {
    let base = this.KeyboardDirection.super.goUp;
    if (base) {
      base.call(this);
    }
  }

  keydown(event) {

    let base = this.KeyboardDirection.super.keydown;
    if (base) {
      base.call(this, event);
    }

    var handled = false;

    switch (event.keyCode) {
      case 35: // End
        handled = this.goEnd();
        break;
      case 36: // Home
        handled = this.goStart();
        break;
      case 37: // Left
        handled = this.goLeft();
        break;
      case 38: // Up
        handled = event.altKey ? this.goStart() : this.goUp();
        break;
      case 39: // Right
        handled = this.goRight();
        break;
      case 40: // Down
        handled = event.altKey ? this.goEnd() : this.goDown();
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

}