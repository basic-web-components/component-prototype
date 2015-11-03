/**
 * Aspect which maps direction semantics (goLeft, goRight, etc.) to selection
 * semantics (selectPrevious, selectNext, etc.).
 *
 * @element basic-direction-selection
 */

export default class DirectionSelection {

  goDown() {
    let base = this.DirectionSelection.super.goDown;
    if (base) {
      base.call(this);
    }
    return this.selectNext();
  }

  goEnd() {
    let base = this.DirectionSelection.super.goEnd;
    if (base) {
      base.call(this);
    }
    return this.selectLast();
  }

  goLeft() {
    let base = this.DirectionSelection.super.goLeft;
    if (base) {
      base.call(this);
    }
    return this.selectPrevious();
  }

  goRight() {
    let base = this.DirectionSelection.super.goRight;
    if (base) {
      base.call(this);
    }
    return this.selectNext();
  }

  goStart() {
    let base = this.DirectionSelection.super.goStart;
    if (base) {
      base.call(this);
    }
    return this.selectFirst();
  }

  goUp() {
    let base = this.DirectionSelection.super.goUp;
    if (base) {
      base.call(this);
    }
    return this.selectPrevious();
  }

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  selectFirst() {
    let base = this.DirectionSelection.super.selectFirst;
    if (base) {
      base.call(this);
    }
  }

  selectLast() {
    let base = this.DirectionSelection.super.selectLast;
    if (base) {
      base.call(this);
    }
  }

  selectNext() {
    let base = this.DirectionSelection.super.selectNext;
    if (base) {
      base.call(this);
    }
  }

  selectPrevious() {
    let base = this.DirectionSelection.super.selectPrevious;
    if (base) {
      base.call(this);
    }
  }

}
