/**
 * Mixin that defines the target of a component -- the element the component is
 * managing or somehow responsible for -- as its first child.
 *
 * @class ContentFirstChildTarget
 */

export default class ContentFirstChildTarget {

  contentChanged() {
    let content = this.content;
    let target = content && content[0];
    if (target) {
      this.target = target;
    }
  }

  get target() {
    return this._target;
  }
  set target(element) {
    this._target = element;
  }

}
