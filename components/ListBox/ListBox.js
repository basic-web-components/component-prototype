/*
 * basic-list-box
 */

import ElementBase from 'element-base/src/ElementBase';
import ChildrenContent from '../../mixins/ChildrenContent';
import ClickSelection from '../../mixins/ClickSelection';
import ContentItems from '../../mixins/ContentItems';
import DirectionSelection from '../../mixins/DirectionSelection';
import Generic from '../../mixins/Generic';
import ItemSelection from '../../mixins/ItemSelection';
import ItemsAccessible from '../../mixins/ItemsAccessible';
import Keyboard from '../../mixins/Keyboard';
import KeyboardDirection from '../../mixins/KeyboardDirection';
import KeyboardPaging from '../../mixins/KeyboardPaging';
import KeyboardPrefixSelection from '../../mixins/KeyboardPrefixSelection';
import SelectionHighlight from '../../mixins/SelectionHighlight';
import SelectionScroll from '../../mixins/SelectionScroll';


export default class ListBox extends ElementBase.compose(
    ChildrenContent,
    ClickSelection,
    ContentItems,
    DirectionSelection,
    Generic,
    ItemSelection,
    ItemsAccessible,
    Keyboard,
    KeyboardDirection,
    KeyboardPaging,
    KeyboardPrefixSelection,
    SelectionHighlight,
    SelectionScroll
  ) {

  // Stub for collectives for now
  get innermostAttached() {
    return this.$.itemsContainer;
  }
  get outermostAttached() {
    return this;
  }

  get template() {
    return `
      <style>
      :host {
        display: -webkit-flex;
        display: flex;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      [target="child"] {
        display: -webkit-flex;
        display: flex;
        -webkit-flex: 1;
        flex: 1;
      }

      #itemsContainer {
        -webkit-flex: 1;
        flex: 1;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll; /* for momentum scrolling */
      }

      /* Generic appearance */
      :host([generic=""]) {
        border: 1px solid gray;
        box-sizing: border-box;
        cursor: default;
      }

      :host([generic=""]) #itemsContainer ::content > * {
        cursor: default;
        padding: 0.25em;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      </style>

      <div id="itemsContainer">
        <slot></slot>
      </div>
    `;
  }

}


document.registerElement('basic-list-box', ListBox);
