class Collective {

  get elements() {

  }

  get join(element) {

  }

  get leave(element) {

  }

  get outermostElement() {

  }

  get outermostAttachedElement() {

  }

}


export default class CollectiveComponent {

  get target() {
    return this._target;
  }
  set target(element) {
    if (this._target) {
      // Disassociate from old target.
      this._target.targetManager = null;
    }
    // Assimilate collective
    // Set collective
    this._target = element;
  }

}
