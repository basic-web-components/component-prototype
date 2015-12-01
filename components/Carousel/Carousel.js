/*
 * basic-list-box
 */

import ElementBase from 'element-base/src/ElementBase';
// import ChildrenContent from '../../mixins/ChildrenContent';
import ContentItems from '../../mixins/ContentItems';
import DirectionSelection from '../../mixins/DirectionSelection';
// import Generic from '../../mixins/Generic';
import ItemSelection from '../../mixins/ItemSelection';
import ItemsAccessible from '../../mixins/ItemsAccessible';
import Keyboard from '../../mixins/Keyboard';
import KeyboardDirection from '../../mixins/KeyboardDirection';
import SlidingViewport from '../SlidingViewport/SlidingViewport';
import SwipeDirection from '../../mixins/SwipeDirection';


export default class Carousel {

  attachedCallback() {
    // HACK
    this.itemsChanged();
  }

  get content() {
    return this.$.viewport.content;
  }

  // Stub for collectives for now
  get innermostAttached() {
    return this.$.viewport;
  }

  // Stub for collectives for now
  get outermostAttached() {
    return this;
  }

  get position() {
    return this.$.viewport.position;
  }
  set position(value) {
    this.$.viewport.position = value;
  }

  set selectedItem(item) {
    this.$.viewport.selectedItem = item;
  }

  showTransition(show) {
    return this.$.viewport.showTransition(show);
  }

  get template() {
    return `
      <style>
      :host {
        display: -webkit-flex;
        display: flex;
      }

      basic-sliding-viewport {
        display: -webkit-flex;
        display: flex;
        -webkit-flex: 1;
        flex: 1;
      }
      </style>

      <basic-sliding-viewport id="viewport">
        <content></content>
      </basic-sliding-viewport>
    `;
  }

}

Carousel = ElementBase.compose(
  // ChildrenContent,
  ContentItems,
  DirectionSelection,
  // Generic,
  ItemSelection,
  ItemsAccessible,
  Keyboard,
  KeyboardDirection,
  SwipeDirection,
  Carousel
);


document.registerElement('basic-carousel', Carousel);
