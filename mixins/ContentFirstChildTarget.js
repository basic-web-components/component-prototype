/**
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

}
