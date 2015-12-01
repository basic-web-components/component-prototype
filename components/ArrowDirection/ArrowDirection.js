/*
 * Aspect used to add prominent left and right arrow buttons to a wrapped child.
 * Clicking the left/right button maps to the corresponding left/right direction.
 *
 * By default, the arrow buttons are shown on devices with a mouse or mouse-like
 * point device; they are not shown on a touch-capable device unless mouse movement
 * is detected. To cause the buttons to always appear, apply the 'showArrows' CSS
 * class.
 *
 * @element basic-arrow-direction
 */

import ElementBase from 'element-base/src/ElementBase';


export default class ArrowDirection {

  // attachedCallback() {
  //   // Apply any selection made before assimilation.
  //   if (this._prematureSelectedIndex
  //       && 'selectedIndex' in this && this.selectedIndex === -1) {
  //     this.selectedIndex = this._prematureSelectedIndex;
  //     this._prematureSelectedIndex = null;
  //   }
  // }

  createdCallback() {
    this.$.buttonLeft.addEventListener('click', event => {
      this.goLeft();
      event.stopPropagation();
    });
    this.$.buttonRight.addEventListener('click', event => {
      this.goRight();
      event.stopPropagation();
    });

    if (!this.classList.contains('showArrows')) {
      // Determine whether we should show arrow buttons or not.
      if (deviceSupportsTouch()) {
        // A touch device might also support a mouse, but we can't know whether
        // there's actually a mouse until we hear from it.
        listenForMouse(this);
      } else {
        // The device doesn't support touch, so assume it has a mouse.
        showArrows(this);
      }
    }
  }

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  goLeft() {}
  goRight() {}

  set canSelectNext(canSelectNext) {
    this.$.buttonRight.disabled = !canSelectNext;
  }
  set canSelectPrevious(canSelectPrevious) {
    this.$.buttonLeft.disabled = !canSelectPrevious;
  }

  /**
   * The index of the item which is currently selected, or -1 if there is no
   * selection.
   *
   * @property selectedIndex
   * @type Number
   */
  // get selectedIndex() {
  //   return this.selectedIndex;
  // }
  // set selectedIndex(index) {
  //   if ('selectedIndex' in this {
  //     this.selectedIndex = index;
  //   } else {
  //     // Selection is being made before the collective supports it.
  //     this._prematureSelectedIndex = index;
  //   }
  // }

  /**
   * The currently selected item, or null if there is no selection.
   *
   * @property selectedItem
   * @type Object
   */
  // get selectedItem() {
  //   return this.selectedItem;
  // }
  // set selectedItem(item) {
  //   this.selectedItem = item;
  // }

  get template() {
    return `
      <style>
      :host {
        display: -webkit-inline-flex;
        display: inline-flex;
      }

      #arrowNavigationContainer {
        display: -webkit-inline-flex;
        display: inline-flex;
        -webkit-flex: 1;
        flex: 1;
      }

      .navigationButton {
        background: transparent;
        border: 1px solid transparent;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.5);
        margin: 0;
        opacity: 1;
        outline: none; /* REVIEW: Accessibility should be provided by other aspects. */
        padding: 0;
        transition: opacity 1s;
        z-index: 1;
      }

      .navigationButton:hover:not(:disabled) {
        background: rgba( 0, 0, 0, 0.5 );
        fill: rgba( 0, 0, 0, 0.7 );
      }
      .navigationButton:active:not(:disabled) {
        background: rgba( 0, 0, 0, 0.7 );
        fill: rgba( 0, 0, 0, 0.9 );
      }

      :host(:not(.showArrows)) .navigationButton {
        opacity: 0;
        visibility: hidden;
      }

      .navigationButton .icon {
        height: 48px;
        width: 48px;
      }

      /* Overlay variant */
      :host(.overlay) {
        position: relative;
      }
      :host(.overlay) .navigationButton {
        bottom: 0;
        color: rgba(255, 255, 255, 0.7);
        position: absolute;
        top: 0;
      }
      :host(.overlay) #buttonLeft {
        left: 0;
      }
      :host(.overlay) #buttonRight {
        right: 0;
      }

      .navigationButton:disabled {
        color: rgba(255, 255, 255, 0.3);
        fill: rgba( 0, 0, 0, 0.2 );
      }
      </style>

      <!--
      Accessibility note: since the navigation offered by the arrow buttons should
      be redundant (that is, there should be other ways of navigating the list),
      we mark the button as aria-hidden so that assistive devices ignore them.
      -->
      <button id="buttonLeft" class="navigationButton" aria-hidden="true">
        <img class="icon" src="ic_keyboard_arrow_left_black_24px.svg">
      </button>
      <div id="arrowNavigationContainer">
        <content></content>
      </div>
      <button id="buttonRight" class="navigationButton" aria-hidden="true">
        <img class="icon" src="ic_keyboard_arrow_right_black_24px.svg">
      </button>
    `;
  }

}


function deviceSupportsTouch() {
  return 'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof DocumentTouch);
}

// We try to detect the presence of a mouse by listening for mousemove events
// which are *not* the result of a mousedown. On a touch device, a tap on the
// page will generate a fake mousemove, followed by a mousedown. We don't want
// to respond to those fake mousemove events. To discriminate between fake and
// real mousemove events, when we get a mousemove event, we wait for a tick to
// see if the same location is reported as the location of a subsequent
// mousedown.
function listenForMouse(element) {

  element._mousedownListener = event => {
    // console.log("mousedown");
    element._lastMouseDownPageX = event.pageX;
    element._lastMouseDownPageY = event.pageY;
  };
  window.addEventListener('mousedown', element._mousedownListener);

  element._mousemoveListener = event => {
    // console.log("mousemove");
    setTimeout(() => {
      if (event.pageX !== element._lastMouseDownPageX ||
          event.pageY !== element._lastMouseDownPageY) {
        // mousemove event was at a location other than the last mousedown,
        // and hence most likely a real mousemove event.
        mouseDetected(element);
      }
    });
  };
  window.addEventListener('mousemove', element._mousemoveListener);
}

function mouseDetected(element) {
  // console.log("mouse detected");
  showArrows(element);

  // We can stop listening for mouse events now.
  window.removeEventListener('mousedown', element._mousedownListener);
  window.removeEventListener('mousemove', element._mousemoveListener);
  element._mousedownListener = null;
  element._mousemoveListener = null;
}

function showArrows(element) {
  element.classList.add('showArrows');
}


ArrowDirection = ElementBase.compose(ArrowDirection);

document.registerElement('basic-arrow-direction', ArrowDirection);
