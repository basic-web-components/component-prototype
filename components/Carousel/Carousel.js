/*
 * Lets the user navigate laterally through a sequence of child elements.
 *
 * basic-carousel is an implementation of the carousel user interface pattern,
 * commonly used for navigating between images, pages, and other elements.
 * This pattern presents the user with a linear sequence of elements, only one of
 * which is shown at a time. The user can navigate to the next/previous element
 * with a variety of input methods.
 *
 * basic-carousel uses its children as the elements the user will navigate through.
 * In a typical use, a basic-carousel can be used to navigate between a sequence of
 * images:
 *
 *     <basic-carousel>
 *       <img src="image1.jpg">
 *       <img src="image2.jpg">
 *       <img src="image3.jpg">
 *     </basic-carousel>
 *
 * The child elements can be of any type — they are not restricted to images.
 *
 * This component attempts to meet the [Gold Standard for web components]
 * (https://github.com/webcomponents/gold-standard/wiki) so that it is generally
 * as flexible and robust as standard HTML elements. For example, it meets the
 * "Content Changes" criteria: the carousel will adapt to new child elements added
 * or removed at runtime.
 *
 * Currently, this component does not meet the Gold Standard criteria "Size to
 * Content". As a result, for the time being, **you must manually set a size on
 * this component**. Two approaches are to: 1) stretch the component across
 * whatever surface it is contained within, or 2) set it to be larger than the
 * largest child element you want to display. The former approach is more common,
 * and can be achieved with CSS styling such as:
 *
 *     html {
 *       height: 100%;
 *     }
 *
 *     body {
 *       display: -webkit-flex;
 *       display: flex;
 *       height: 100%;
 *       margin: 0;
 *     }
 *
 *     basic-carousel {
 *       -webkit-flex: 1;
 *       flex: 1;
 *     }
 *
 * Alternatively, you can use a separate component,
 * [basic-carousel-fit](http://github.com/basic-web-components/basic-carousel-fit),
 * which is designed to automatically size itself to its largest child elements.
 *
 * The standard basic-carousel component supports navigation via the following
 * input methods:
 *
 * * Keyboard. When the carousel has focus, the user can press Left, Right, Home,
 * or End. These navigate to the expected element.
 * * Touch. On mobile and other touch-enabled devices, the user can drag left or
 * right.
 * * Trackpad. The user can swipe left or right on a trackpad to navigate.
 *
 * basic-carousel supports a variety of optional user interface accessories:
 * * [basic-arrow-direction](http://github.com/basic-web-components/basic-arrow-direction).
 *   This adds prominent left and right arrow buttons on the side of the carousel.
 * * [basic-page-dots](http://github.com/basic-web-components/basic-page-dots).
 *   This adds a series of small dots below the carousel to indicate the user's
 *   current position in the sequence.
 *
 * See those components for more details, but in general you can construct a common
 * carousel with both arrow buttons and dots like so:
 *
 *     <basic-arrow-direction target="child">
 *       <basic-page-dots target="child">
 *         <basic-carousel>
 *           <img src="image1.jpg">
 *           <img src="image2.jpg">
 *           <img src="image3.jpg">
 *           <img src="image4.jpg">
 *           <img src="image5.jpg">
 *         </basic-carousel>
 *       </basic-page-dots>
 *     </basic-arrow-direction>
 *
 * For universal access, basic-carousel automatically adds a variety of
 * [ARIA](http://www.w3.org/WAI/intro/aria) properties to itself and to child
 * elements. This helps users navigate the sequence of elements in the carousel
 * using assistive technologies.
 *
 * @class Carousel
 */

import ElementBase from 'core-component-mixins/src/ElementBase';
import ContentItems from '../../mixins/ContentItems';
import DirectionSelection from '../../mixins/DirectionSelection';
import Generic from '../../mixins/Generic';
import ItemSelection from '../../mixins/ItemSelection';
import ItemsAccessible from '../../mixins/ItemsAccessible';
import Keyboard from '../../mixins/Keyboard';
import KeyboardDirection from '../../mixins/KeyboardDirection';
import SlidingViewport from '../SlidingViewport/SlidingViewport';
import SwipeDirection from '../../mixins/SwipeDirection';
import TrackpadDirection from '../../mixins/TrackpadDirection';


export default class Carousel {

  attachedCallback() {
    // HACK
    this.itemsChanged();
    this.selectionRequired = true;
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
  ContentItems,
  DirectionSelection,
  Generic,
  ItemSelection,
  ItemsAccessible,
  Keyboard,
  KeyboardDirection,
  SwipeDirection,
  TrackpadDirection,
  Carousel
);


document.registerElement('basic-carousel', Carousel);
