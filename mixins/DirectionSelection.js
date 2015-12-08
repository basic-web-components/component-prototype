/**
 * Mixin which maps direction semantics (goLeft, goRight, etc.) to selection
 * semantics (selectPrevious, selectNext, etc.).
 *
 * @class DirectionSelection
 */

import Composable from 'Composable/src/Composable';

export default class DirectionSelection {

  goDown() {
    return this.selectNext();
  }

  goEnd() {
    return this.selectLast();
  }

  goLeft() {
    return this.selectPrevious();
  }

  goRight() {
    return this.selectNext();
  }

  goStart() {
    return this.selectFirst();
  }

  goUp() {
    return this.selectPrevious();
  }

  // Default implementations. These will typically be handled by other mixins.
  selectFirst() {}
  selectLast() {}
  selectNext() {}
  selectPrevious() {}

}
Composable.decorate.call(DirectionSelection.prototype, {
  selectFirst: Composable.rule(Composable.rules.preferBaseResult),
  selectLast: Composable.rule(Composable.rules.preferBaseResult),
  selectNext: Composable.rule(Composable.rules.preferBaseResult),
  selectPrevious: Composable.rule(Composable.rules.preferBaseResult)
});
