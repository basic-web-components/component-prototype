import ElementBase from '../../../element-base/src/ElementBase';

/* Define a custom element. */
class ListBox extends ElementBase {

  get template() {
    return `
      Hello,
      <content></content>
    `;
  }

}

document.registerElement('basic-list-box', ListBox);

export default ListBox;
