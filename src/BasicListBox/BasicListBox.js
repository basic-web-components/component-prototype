import ElementBase from '../../../element-base/src/ElementBase';

/* Define a custom element. */
class ListBox {

  createdCallback() {
    let base = this.ListBox.super.createdCallback;
    if (base) {
      base.call(this);
    }
    console.log(`Here we are!!`);
  }

  get template() {
    return `
      Hello,
      <content></content>
    `;
  }

}

ListBox = ElementBase.extend(ListBox);

document.registerElement('basic-list-box', ListBox);

export default ListBox;
