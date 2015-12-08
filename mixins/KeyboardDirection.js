/**
 * Aspect which maps direction keys (Left, Right, etc.) to direction semantics
 * (goLeft, goRight, etc.).
 *
 * @class KeyboardDirection
 */

import Composable from 'Composable/src/Composable';

export default class KeyboardDirection {

  // Default implementations. These will typically be handled by other mixins.
  goDown() {}
  goEnd() {}
  goLeft() {}
  goRight() {}
  goStart() {}
  goUp() {}

  keydown(event) {
    let handled;
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
    return handled;
  }

}
Composable.decorate.call(KeyboardDirection.prototype, {
  goDown: Composable.rule(Composable.rules.preferBaseResult),
  goEnd: Composable.rule(Composable.rules.preferBaseResult),
  goLeft: Composable.rule(Composable.rules.preferBaseResult),
  goRight: Composable.rule(Composable.rules.preferBaseResult),
  goStart: Composable.rule(Composable.rules.preferBaseResult),
  goUp: Composable.rule(Composable.rules.preferBaseResult),
  keydown: Composable.rule(Composable.rules.preferMixinResult)
});
