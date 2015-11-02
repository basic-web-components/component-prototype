/*
 * basic-list-box
 */

import ElementBase from '../../../element-base/src/ElementBase';
import ChildrenContent from '../../mixins/ChildrenContent';
import ContentItems from '../../mixins/ContentItems';

// We'd like to just subclass ElementBase, but then we won't have access to
// this.ListBox.super. That only gets created by Extensible.extend(), so we have
// to manually invoke that. We could fix that if we could implement a component
// constructor, but currently document.registerElement() in Blink doesn't invoke
// a component constructor.
//class ListBox extends ElementBase {

class ListBox {

  createdCallback() {
    let base = this.ListBox.super.createdCallback;
    if (base) {
      base.call(this);
    }
    this.log("createdCallback");
  }

  get template() {
    return `
      Hello,
      <content></content>
    `;
  }

}

// See notes above for class declaration.
ListBox = ElementBase.extend(
  ChildrenContent,
  ContentItems,
  ListBox
);

document.registerElement('basic-list-box', ListBox);

export default ListBox;
