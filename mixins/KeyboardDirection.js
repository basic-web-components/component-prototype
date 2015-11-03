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
    return this.superCall(this.KeyboardDirection, 'goDown');
  }

  goEnd() {
    return this.superCall(this.KeyboardDirection, 'goEnd');
  }

  goLeft() {
    return this.superCall(this.KeyboardDirection, 'goLeft');
  }

  goRight() {
    return this.superCall(this.KeyboardDirection, 'goRight');
  }

  goStart() {
    return this.superCall(this.KeyboardDirection, 'goStart');
  }

  goUp() {
    return this.superCall(this.KeyboardDirection, 'goUp');
  }

  keydown(event) {
    let handled = this.superCall(this.KeyboardDirection, 'keydown', event);
    if (!handled) {
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
    }
    return handled;
  }

}