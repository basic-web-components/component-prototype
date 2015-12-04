/**
 * Spreads out a set of items horizontally so they take equal space.
 *
 * This component currently requires an explicit size by applied to it. For a
 * variant that automatically sizes to fit the list items, see the related
 * component basic-spread-fit.
 *
 * @element basic-spread-items
 */

import ElementBase from 'core-component-mixins/src/ElementBase';
import ChildrenContent from '../../mixins/ChildrenContent';

export default class SpreadItems {

  attachedCallback() {
    // HACK
    this.itemsChanged();
  }

  get items() {
    return this.content;
  }

  itemsChanged() {
    let items = this.items;
    let count = items.length;
    this.$.spreadContainer.style.width = (count * 100) + '%';
    let itemWidth = (100 / count) + "%";
    [].forEach.call(items, item => {
      item.style.width = itemWidth;
    });
  }

  get template() {
    return `
      <style>
      :host {
        display: block;
      }

      #spreadContainer {
        display: -webkit-flex;
        display: flex;
        height: 100%;
        position: relative;
      }

      #spreadContainer ::content > * {
        object-fit: contain;
        object-fit: var(--basic-item-object-fit, contain);
        touch-action: none;
        height: 100%;
        -webkit-user-drag: none;
        -moz-user-select: none;
        user-select: none;
      }
      </style>

      <div id="spreadContainer">
        <content></content>
      </div>
    `;
  }

}

SpreadItems = ElementBase.compose(ChildrenContent, SpreadItems);

document.registerElement('basic-spread-items', SpreadItems);
