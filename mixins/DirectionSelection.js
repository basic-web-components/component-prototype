/**
 * Aspect which maps direction semantics (goLeft, goRight, etc.) to selection
 * semantics (selectPrevious, selectNext, etc.).
 *
 * @element basic-direction-selection
 */

export default class DirectionSelection {

  goDown() {
    this.superCall(this.DirectionSelection, 'goDown');
    return this.selectNext();
  }

  goEnd() {
    this.superCall(this.DirectionSelection, 'goEnd');
    return this.selectLast();
  }

  goLeft() {
    this.superCall(this.DirectionSelection, 'goLeft');
    return this.selectPrevious();
  }

  goRight() {
    this.superCall(this.DirectionSelection, 'goRight');
    return this.selectNext();
  }

  goStart() {
    this.superCall(this.DirectionSelection, 'goStart');
    return this.selectFirst();
  }

  goUp() {
    this.superCall(this.DirectionSelection, 'goUp');
    return this.selectPrevious();
  }

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  selectFirst() {
    return this.superCall(this.DirectionSelection, 'selectFirst');
  }

  selectLast() {
    return this.superCall(this.DirectionSelection, 'selectLast');
  }

  selectNext() {
    return this.superCall(this.DirectionSelection, 'selectNext');
  }

  selectPrevious() {
    return this.superCall(this.DirectionSelection, 'selectPrevious');
  }

}
