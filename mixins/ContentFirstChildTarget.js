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
    console.log("ContentFirstChildTarget: target changed");
  }

}
