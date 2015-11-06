/**
 * Aspect which maps direction semantics (goLeft, goRight, etc.) to selection
 * semantics (selectPrevious, selectNext, etc.).
 *
 * @element basic-direction-selection
 */

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

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  selectFirst() {}

  selectLast() {}

  selectNext() {}

  selectPrevious() {}

}
