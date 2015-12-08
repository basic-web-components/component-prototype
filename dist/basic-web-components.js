(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /*
       * Mixin used to add prominent left and right arrow buttons to a wrapped child.
       * Clicking the left/right button maps to the corresponding left/right
       * direction.
       *
       * By default, the arrow buttons are shown on devices with a mouse or mouse-like
       * point device; they are not shown on a touch-capable device unless mouse
       * movement is detected. To cause the buttons to always appear, apply the
       * 'showArrows' CSS class.
       *
       * @class basic-arrow-direction
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('core-component-mixins/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _ChildrenContent = require('../../mixins/ChildrenContent');

var _ChildrenContent2 = _interopRequireDefault(_ChildrenContent);

var _CollectiveElement = require('../../mixins/CollectiveElement');

var _CollectiveElement2 = _interopRequireDefault(_CollectiveElement);

var _ContentFirstChildTarget = require('../../mixins/ContentFirstChildTarget');

var _ContentFirstChildTarget2 = _interopRequireDefault(_ContentFirstChildTarget);

var _DirectionSelection = require('../../mixins/DirectionSelection');

var _DirectionSelection2 = _interopRequireDefault(_DirectionSelection);

var _ItemSelection = require('../../mixins/ItemSelection');

var _ItemSelection2 = _interopRequireDefault(_ItemSelection);

var _Keyboard = require('../../mixins/Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _TargetSelection = require('../../mixins/TargetSelection');

var _TargetSelection2 = _interopRequireDefault(_TargetSelection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _instanceof(left, right) {
  if (right != null && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ArrowDirection = (function () {
  function ArrowDirection() {
    _classCallCheck(this, ArrowDirection);
  }

  _createClass(ArrowDirection, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      this.$.buttonLeft.addEventListener('click', function (event) {
        _this.goLeft();
        event.stopPropagation();
      });
      this.$.buttonRight.addEventListener('click', function (event) {
        _this.goRight();
        event.stopPropagation();
      });
      assumeButtonFocus(this, this.$.buttonLeft);
      assumeButtonFocus(this, this.$.buttonRight);

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
  }, {
    key: 'selectedItemChanged',
    value: function selectedItemChanged() {
      // HACK: Force an update of the set of possible navigations.
      this.itemsChanged();
    }

    /*
     * The template uses the chevron-left and chevron-right SVG icons from
     * https://github.com/PolymerElements/iron-icons/blob/master/iron-icons.html.
     */

  }, {
    key: 'canSelectNext',
    set: function set(canSelectNext) {
      this.$.buttonRight.disabled = !canSelectNext;
    }
  }, {
    key: 'canSelectPrevious',
    set: function set(canSelectPrevious) {
      this.$.buttonLeft.disabled = !canSelectPrevious;
    }
  }, {
    key: 'template',
    get: function get() {
      return '\n      <style>\n      :host {\n        display: -webkit-inline-flex;\n        display: inline-flex;\n      }\n\n      #arrowNavigationContainer {\n        display: -webkit-inline-flex;\n        display: inline-flex;\n        -webkit-flex: 1;\n        flex: 1;\n      }\n\n      .navigationButton {\n        background: transparent;\n        border: 1px solid transparent;\n        box-sizing: border-box;\n        color: rgba(0, 0, 0, 0.7);\n        fill: currentColor;\n        margin: 0;\n        opacity: 1;\n        outline: none; /* REVIEW: Accessibility should be provided by other elements. */\n        padding: 0;\n        transition: opacity 1s;\n        z-index: 1;\n      }\n\n      .navigationButton:hover:not(:disabled) {\n        background: rgba(0, 0, 0, 0.5);\n        color: rgba(0, 0, 0, 0.8);\n      }\n      .navigationButton:active:not(:disabled) {\n        background: rgba(0, 0, 0, 0.7);\n        color: rgba(0, 0, 0, 0.9);\n      }\n      .navigationButton:disabled {\n        color: rgba(0, 0, 0, 0.2);\n      }\n\n      :host(:not(.showArrows)) .navigationButton {\n        opacity: 0;\n        visibility: hidden;\n      }\n\n      .navigationButton .icon {\n        height: 48px;\n        width: 48px;\n      }\n\n      /* Overlay variant */\n      :host(.overlay) {\n        position: relative;\n      }\n      :host(.overlay) .navigationButton {\n        bottom: 0;\n        color: rgba(255, 255, 255, 0.7);\n        position: absolute;\n        top: 0;\n      }\n      :host(.overlay) #buttonLeft {\n        left: 0;\n      }\n      :host(.overlay) #buttonRight {\n        right: 0;\n      }\n      :host(.overlay) .navigationButton:hover:not(:disabled) {\n        background: rgba(255, 255, 255, 0.2);\n        color: rgba(255, 255, 255, 0.8);\n      }\n      :host(.overlay) .navigationButton:active:not(:disabled) {\n        background: rgba(255, 255, 255, 0.4);\n        color: rgba(255, 255, 255, 0.9);\n      }\n      :host(.overlay) .navigationButton:disabled {\n        color: rgba(255, 255, 255, 0.3);\n      }\n      </style>\n\n      <!--\n      Accessibility note: since the navigation offered by the arrow buttons should\n      be redundant (that is, there should be other ways of navigating the list),\n      we mark the button as aria-hidden so that assistive devices ignore them.\n      -->\n      <button id="buttonLeft" class="navigationButton" disabled tabindex="-1" aria-hidden="true">\n        <svg class="icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">\n          <g id="chevron-left">\n            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n          </g>\n        </svg>\n      </button>\n      <div id="arrowNavigationContainer">\n        <content></content>\n      </div>\n      <button id="buttonRight" class="navigationButton" disabled tabindex="-1" aria-hidden="true">\n        <svg class="icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">\n          <g id="chevron-right">\n            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n          </g>\n        </svg>\n      </button>\n    ';
    }
  }]);

  return ArrowDirection;
})();

/*
 * By default, a button will always take focus on mousedown. For this component,
 * we want to override that behavior, such that a mousedown on a button keeps
 * the focus on the outer component.
 */

exports.default = ArrowDirection;
function assumeButtonFocus(element, button) {
  button.addEventListener('mousedown', function (event) {
    // Given the outer element focus if it doesn't already have it.
    var outermost = element.collective.outermostElement;
    if (element) {
      element.focus();
    }
    // Prevent the default focus-on-mousedown behavior.
    event.preventDefault();
  });
}

function deviceSupportsTouch() {
  return 'ontouchstart' in window || window.DocumentTouch && _instanceof(document, DocumentTouch);
}

// We try to detect the presence of a mouse by listening for mousemove events
// which are *not* the result of a mousedown. On a touch device, a tap on the
// page will generate a fake mousemove, followed by a mousedown. We don't want
// to respond to those fake mousemove events. To discriminate between fake and
// real mousemove events, when we get a mousemove event, we wait for a tick to
// see if the same location is reported as the location of a subsequent
// mousedown.
function listenForMouse(element) {

  element._mousedownListener = function (event) {
    // console.log("mousedown");
    element._lastMouseDownPageX = event.pageX;
    element._lastMouseDownPageY = event.pageY;
  };
  window.addEventListener('mousedown', element._mousedownListener);

  element._mousemoveListener = function (event) {
    // console.log("mousemove");
    setTimeout(function () {
      if (event.pageX !== element._lastMouseDownPageX || event.pageY !== element._lastMouseDownPageY) {
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

ArrowDirection = _ElementBase2.default.compose(_ChildrenContent2.default, _CollectiveElement2.default, _ContentFirstChildTarget2.default, _DirectionSelection2.default, _Keyboard2.default, _ItemSelection2.default, _TargetSelection2.default, ArrowDirection);

document.registerElement('basic-arrow-direction', ArrowDirection);

},{"../../mixins/ChildrenContent":7,"../../mixins/CollectiveElement":9,"../../mixins/ContentFirstChildTarget":10,"../../mixins/DirectionSelection":12,"../../mixins/ItemSelection":14,"../../mixins/Keyboard":16,"../../mixins/TargetSelection":23,"core-component-mixins/src/ElementBase":30}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /*
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('core-component-mixins/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _CollectiveElement = require('../../mixins/CollectiveElement');

var _CollectiveElement2 = _interopRequireDefault(_CollectiveElement);

var _ContentItems = require('../../mixins/ContentItems');

var _ContentItems2 = _interopRequireDefault(_ContentItems);

var _DirectionSelection = require('../../mixins/DirectionSelection');

var _DirectionSelection2 = _interopRequireDefault(_DirectionSelection);

var _Generic = require('../../mixins/Generic');

var _Generic2 = _interopRequireDefault(_Generic);

var _ItemSelection = require('../../mixins/ItemSelection');

var _ItemSelection2 = _interopRequireDefault(_ItemSelection);

var _ItemsAccessible = require('../../mixins/ItemsAccessible');

var _ItemsAccessible2 = _interopRequireDefault(_ItemsAccessible);

var _Keyboard = require('../../mixins/Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _KeyboardDirection = require('../../mixins/KeyboardDirection');

var _KeyboardDirection2 = _interopRequireDefault(_KeyboardDirection);

var _SlidingViewport = require('../SlidingViewport/SlidingViewport');

var _SlidingViewport2 = _interopRequireDefault(_SlidingViewport);

var _SwipeDirection = require('../../mixins/SwipeDirection');

var _SwipeDirection2 = _interopRequireDefault(_SwipeDirection);

var _TrackpadDirection = require('../../mixins/TrackpadDirection');

var _TrackpadDirection2 = _interopRequireDefault(_TrackpadDirection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Carousel = (function () {
  function Carousel() {
    _classCallCheck(this, Carousel);
  }

  _createClass(Carousel, [{
    key: 'attachedCallback',
    value: function attachedCallback() {
      // HACK
      this.itemsChanged();
      this.selectionRequired = true;
    }
  }, {
    key: 'showTransition',
    value: function showTransition(show) {
      return this.$.viewport.showTransition(show);
    }
  }, {
    key: 'content',
    get: function get() {
      return this.$.viewport.content;
    }

    // Stub for collectives for now

  }, {
    key: 'innermostAttached',
    get: function get() {
      return this.$.viewport;
    }

    // Stub for collectives for now

  }, {
    key: 'outermostAttached',
    get: function get() {
      return this;
    }
  }, {
    key: 'position',
    get: function get() {
      return this.$.viewport.position;
    },
    set: function set(value) {
      this.$.viewport.position = value;
    }
  }, {
    key: 'selectedItem',
    set: function set(item) {
      this.$.viewport.selectedItem = item;
    }
  }, {
    key: 'template',
    get: function get() {
      return '\n      <style>\n      :host {\n        display: -webkit-flex;\n        display: flex;\n      }\n\n      basic-sliding-viewport {\n        display: -webkit-flex;\n        display: flex;\n        -webkit-flex: 1;\n        flex: 1;\n      }\n      </style>\n\n      <basic-sliding-viewport id="viewport">\n        <content></content>\n      </basic-sliding-viewport>\n    ';
    }
  }]);

  return Carousel;
})();

exports.default = Carousel;

Carousel = _ElementBase2.default.compose(_CollectiveElement2.default, _ContentItems2.default, _DirectionSelection2.default, _Generic2.default, _ItemSelection2.default, _ItemsAccessible2.default, _Keyboard2.default, _KeyboardDirection2.default, _SwipeDirection2.default, _TrackpadDirection2.default, Carousel);

document.registerElement('basic-carousel', Carousel);

},{"../../mixins/CollectiveElement":9,"../../mixins/ContentItems":11,"../../mixins/DirectionSelection":12,"../../mixins/Generic":13,"../../mixins/ItemSelection":14,"../../mixins/ItemsAccessible":15,"../../mixins/Keyboard":16,"../../mixins/KeyboardDirection":17,"../../mixins/SwipeDirection":22,"../../mixins/TrackpadDirection":24,"../SlidingViewport/SlidingViewport":5,"core-component-mixins/src/ElementBase":30}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('core-component-mixins/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _ChildrenContent = require('../../mixins/ChildrenContent');

var _ChildrenContent2 = _interopRequireDefault(_ChildrenContent);

var _ClickSelection = require('../../mixins/ClickSelection');

var _ClickSelection2 = _interopRequireDefault(_ClickSelection);

var _ContentItems = require('../../mixins/ContentItems');

var _ContentItems2 = _interopRequireDefault(_ContentItems);

var _DirectionSelection = require('../../mixins/DirectionSelection');

var _DirectionSelection2 = _interopRequireDefault(_DirectionSelection);

var _Generic = require('../../mixins/Generic');

var _Generic2 = _interopRequireDefault(_Generic);

var _ItemSelection = require('../../mixins/ItemSelection');

var _ItemSelection2 = _interopRequireDefault(_ItemSelection);

var _ItemsAccessible = require('../../mixins/ItemsAccessible');

var _ItemsAccessible2 = _interopRequireDefault(_ItemsAccessible);

var _Keyboard = require('../../mixins/Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _KeyboardDirection = require('../../mixins/KeyboardDirection');

var _KeyboardDirection2 = _interopRequireDefault(_KeyboardDirection);

var _KeyboardPaging = require('../../mixins/KeyboardPaging');

var _KeyboardPaging2 = _interopRequireDefault(_KeyboardPaging);

var _KeyboardPrefixSelection = require('../../mixins/KeyboardPrefixSelection');

var _KeyboardPrefixSelection2 = _interopRequireDefault(_KeyboardPrefixSelection);

var _SelectionHighlight = require('../../mixins/SelectionHighlight');

var _SelectionHighlight2 = _interopRequireDefault(_SelectionHighlight);

var _SelectionScroll = require('../../mixins/SelectionScroll');

var _SelectionScroll2 = _interopRequireDefault(_SelectionScroll);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * A single-selection list box that supports selection highlighting (using the
   * system highlight color) and keyboard navigation.
   *
   * The user can select an item with the mouse/touch or keyboard: Up/Down, Page
   * Up/Down, Home/End.
   *
   * Like other Basic Web Components, this can handle distributed content: you can
   * include a content element inside a basic-list-box, and the list will navigate
   * through the distributed content. Note: for the time being, if you do use basic-
   * list-box inside your own component, it appears that you'll need to wire up your
   * own keyboard navigation, and forward the list navigation keys to the basic-list-
   * box.
   *
   * This component includes basic ARIA support to provide a reasonable default
   * experience, e.g., for screen readers. The list component itself will be assigned
   * an appropriate ARIA role (default is "listbox"). The ID of the selected item
   * will be reflected in an "aria-activedescendant" attribute applied to the list.
   * To support this feature, all items in the list need unique IDs. If an item does
   * not have an ID, basic-list-box will automatically assign a default ID.
   *
   * The keyboard interaction model generally follows that of Microsoft Windows'
   * list boxes instead of those in OS X:
   *
   * * The Page Up/Down and Home/End keys actually move the selection, rather than
   *   just scrolling the list. The former behavior seems more generally useful for
   *   keyboard users.
   *
   * * Pressing Page Up/Down will move the selection to the topmost/bottommost
   *   visible item if the selection is not already there. Thereafter, the key will
   *   move the selection up/down by a page, and (per the above point) make the
   *   selected item visible.
   *
   * Programmatically selecting an item (by setting the selected property) scrolls
   * the item into view.
   *
   * The user can also select an item by typing the beginning of an item's text.
   *
   * @class ListBox
   */

var ListBox = (function (_ElementBase$compose) {
  _inherits(ListBox, _ElementBase$compose);

  function ListBox() {
    _classCallCheck(this, ListBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListBox).apply(this, arguments));
  }

  _createClass(ListBox, [{
    key: 'innermostAttached',

    // Stub for collectives for now
    get: function get() {
      return this.$.itemsContainer;
    }
  }, {
    key: 'outermostAttached',
    get: function get() {
      return this;
    }
  }, {
    key: 'template',
    get: function get() {
      return '\n      <style>\n      :host {\n        display: -webkit-flex;\n        display: flex;\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n      }\n\n      [target="child"] {\n        display: -webkit-flex;\n        display: flex;\n        -webkit-flex: 1;\n        flex: 1;\n      }\n\n      #itemsContainer {\n        -webkit-flex: 1;\n        flex: 1;\n        -webkit-overflow-scrolling: touch;\n        overflow-y: scroll; /* for momentum scrolling */\n      }\n\n      /* Generic appearance */\n      :host([generic=""]) {\n        border: 1px solid gray;\n        box-sizing: border-box;\n        cursor: default;\n      }\n\n      :host([generic=""]) #itemsContainer ::content > * {\n        cursor: default;\n        padding: 0.25em;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n      </style>\n\n      <div id="itemsContainer">\n        <slot></slot>\n      </div>\n    ';
    }
  }]);

  return ListBox;
})(_ElementBase2.default.compose(_ChildrenContent2.default, _ClickSelection2.default, _ContentItems2.default, _DirectionSelection2.default, _Generic2.default, _ItemSelection2.default, _ItemsAccessible2.default, _Keyboard2.default, _KeyboardDirection2.default, _KeyboardPaging2.default, _KeyboardPrefixSelection2.default, _SelectionHighlight2.default, _SelectionScroll2.default));

exports.default = ListBox;

document.registerElement('basic-list-box', ListBox);

},{"../../mixins/ChildrenContent":7,"../../mixins/ClickSelection":8,"../../mixins/ContentItems":11,"../../mixins/DirectionSelection":12,"../../mixins/Generic":13,"../../mixins/ItemSelection":14,"../../mixins/ItemsAccessible":15,"../../mixins/Keyboard":16,"../../mixins/KeyboardDirection":17,"../../mixins/KeyboardPaging":18,"../../mixins/KeyboardPrefixSelection":19,"../../mixins/SelectionHighlight":20,"../../mixins/SelectionScroll":21,"core-component-mixins/src/ElementBase":30}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /**
       * Presents a set of small dots to show list item count and select list items.
       * There will be one dot for each item, and the dot for the currently selected
       * item will be shown selected.
       *
       * Clicking a dot will select the corresponding list item.
       *
       * @class PageDots
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('core-component-mixins/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _ChildrenContent = require('../../mixins/ChildrenContent');

var _ChildrenContent2 = _interopRequireDefault(_ChildrenContent);

var _CollectiveElement = require('../../mixins/CollectiveElement');

var _CollectiveElement2 = _interopRequireDefault(_CollectiveElement);

var _ContentFirstChildTarget = require('../../mixins/ContentFirstChildTarget');

var _ContentFirstChildTarget2 = _interopRequireDefault(_ContentFirstChildTarget);

var _DirectionSelection = require('../../mixins/DirectionSelection');

var _DirectionSelection2 = _interopRequireDefault(_DirectionSelection);

var _ItemSelection = require('../../mixins/ItemSelection');

var _ItemSelection2 = _interopRequireDefault(_ItemSelection);

var _Keyboard = require('../../mixins/Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _TargetSelection = require('../../mixins/TargetSelection');

var _TargetSelection2 = _interopRequireDefault(_TargetSelection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var PageDots = (function () {
  function PageDots() {
    _classCallCheck(this, PageDots);
  }

  _createClass(PageDots, [{
    key: 'applySelection',
    value: function applySelection(item, selected) {
      var index = this.indexOfItem(item);
      // See if the corresponding dot has already been created.
      // If not, the correct dot will be selected when it gets created.
      var dots = this.dots;
      if (dots && dots.length > index) {
        var dot = this.dots[index];
        if (dot) {
          dot.classList.toggle('selected', selected);
        }
      }
    }
  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      this.$.dots.addEventListener('click', function (event) {
        var dot = event.target;
        var dotIndex = _this.dots.indexOf(dot);
        if (dotIndex >= 0) {
          _this.selectedIndex = dotIndex;
        }
      });
    }
  }, {
    key: 'itemsChanged',
    value: function itemsChanged() {
      // Raise a property change notification so binding can update.
      // if (Object.getNotifier) {
      //   Object.getNotifier(this).notify({
      //     type: "update",
      //     name: "items"
      //   });
      // }
      createDots(this);
      this.selectedItemChanged(); // In case position of selected item moved.
    }
  }, {
    key: 'selectedItemChanged',
    value: function selectedItemChanged() {
      var selectedIndex = this.selectedIndex;
      this.dots.forEach(function (dot, i) {
        dot.classList.toggle('selected', i === selectedIndex);
      });
    }
  }, {
    key: 'dots',
    get: function get() {
      return [].slice.call(this.$.dots.querySelectorAll('.dot'));
    }
  }, {
    key: 'template',
    get: function get() {
      return '\n      <style>\n      :host {\n        display: -webkit-inline-flex;\n        display: inline-flex;\n        position: relative;\n      }\n\n      #dots {\n        bottom: 0;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-justify-content: center;\n        justify-content: center;\n        position: absolute;\n        width: 100%;\n        z-index: 1;\n      }\n\n      .dot {\n        background: rgba(255, 255, 255, 0.4);\n        border-radius: 7px;\n        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);\n        box-sizing: border-box;\n        height: 8px;\n        margin: 7px 5px;\n        padding: 0;\n        transition: background 0.2s box-shadow 0.2s;\n        width: 8px;\n      }\n\n      .dot:hover {\n        background: rgba(0, 0, 0, 0.75);\n        box-shadow: 0 0 1px 3px rgba(255, 255, 255, 0.5);\n      }\n\n      .dot.selected {\n        background: rgba(255, 255, 255, 0.95);\n      }\n\n      @media (min-width: 768px) {\n        .dot {\n          height: 12px;\n          width: 12px;\n        }\n      }\n      </style>\n\n      <!--\n      REVIEW: These dots aren\'t buttons, because they\'re never meant to be used\n      on their own. There should always be some other, more accessible, way to\n      navigate the content.\n      -->\n      <!-- TODO: Replace with something that\'s basically a list box -->\n      <div id="dots"></div>\n      <content></content>\n    ';
    }

    // collectiveChanged: function() {
    //   // Apply any selection made before assimilation.
    //   if (this._prematureSelectedIndex
    //       && 'selectedIndex' in this.collective
    //       && this.collective.selectedIndex === -1) {
    //     this.collective.selectedIndex = this._prematureSelectedIndex;
    //     this._prematureSelectedIndex = null;
    //   }
    //   // TODO: Move the requirement for a selction to basic-item-selection. This
    //   // should ideally pick the nearest item to the previously-selected item.
    //   //   if (this.collective.selectedItem === null && this.collective.items != null && this.collective.selectFirst) {
    //   //     this.collective.selectFirst();
    //   //   }
    // }

  }]);

  return PageDots;
})();

exports.default = PageDots;

function createDot() {
  var dot = document.createElement('div');
  dot.classList.add('dot');
  dot.classList.add('style-scope');
  dot.classList.add('basic-page-dots');
  return dot;
}

function createDots(element) {
  var newDotCount = element.items.length;
  var dotContainer = element.$.dots;
  var existingDotCount = dotContainer.children.length;
  if (newDotCount === existingDotCount) {
    return;
  } else if (existingDotCount > newDotCount) {
    // Remove extra dots.
    while (dotContainer.children.length > newDotCount) {
      Polymer.dom(dotContainer).removeChild(dotContainer.children[0]);
    }
  } else {
    // Create needed dots.
    for (var i = existingDotCount; i < newDotCount; i++) {
      var dot = createDot();
      dotContainer.appendChild(dot);
    }
  }
}

PageDots = _ElementBase2.default.compose(_ChildrenContent2.default, _CollectiveElement2.default, _ContentFirstChildTarget2.default, _DirectionSelection2.default, _Keyboard2.default, _ItemSelection2.default, _TargetSelection2.default, PageDots);

document.registerElement('basic-page-dots', PageDots);

},{"../../mixins/ChildrenContent":7,"../../mixins/CollectiveElement":9,"../../mixins/ContentFirstChildTarget":10,"../../mixins/DirectionSelection":12,"../../mixins/ItemSelection":14,"../../mixins/Keyboard":16,"../../mixins/TargetSelection":23,"core-component-mixins/src/ElementBase":30}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /**
       * Presents list items in a viewport such that only a single item is visible at a
       * time. Navigating between items will be represented with a horizontal visual
       * sliding effect.
       *
       * This component currently requires that you explicitly apply a size to it. For a
       * variant which automatically sizes to its content, see the related component
       * basic-sliding-viewport-fit.
       *
       * @class basic-sliding-viewport
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('core-component-mixins/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _SpreadItems = require('../SpreadItems/SpreadItems');

var _SpreadItems2 = _interopRequireDefault(_SpreadItems);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var SlidingViewport = (function () {
  function SlidingViewport() {
    _classCallCheck(this, SlidingViewport);
  }

  _createClass(SlidingViewport, [{
    key: 'attachedCallback',
    value: function attachedCallback() {
      this.render();
    }
  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      this.classList.add('showTransition');
      this.position = 0;
    }
  }, {
    key: 'render',
    value: function render() {
      requestAnimationFrame(renderSelection.bind(this));
    }

    /**
     * The fractional position of the element's moving surface while it is being
     * moved (dragged/scrolled/etc.).
     *
     * This is expressed as a fraction of the element's width. If the value is
     * positive, the surface is being moved to the left; if negative, the surface
     * is being moved to the right. E.g., a value of 0.5 indicates the surface has
     * moved half the element's width to the left.
     *
     * @property position
     * @type Number
     */

  }, {
    key: 'showTransition',
    value: function showTransition(show) {
      this.classList.toggle('showTransition', show);
    }
  }, {
    key: 'content',
    get: function get() {
      return this.$.slidingContainer.content;
    }
  }, {
    key: 'items',
    get: function get() {
      return this.$.slidingContainer.items;
    }
  }, {
    key: 'position',
    get: function get() {
      return this._position;
    },
    set: function set(position) {
      this._position = position;
      this.render();
    }
  }, {
    key: 'selectedIndex',
    get: function get() {
      var items = this.items;
      var index = items && items.indexOf(this.selectedItem);
      return index || -1;
    },
    set: function set(index) {
      var item = this.items && this.items[index];
      if (item) {
        this.selectedItem = item;
      }
    }
  }, {
    key: 'selectedItem',
    get: function get() {
      return this._selectedItem;
    },
    set: function set(item) {
      this._selectedItem = item;
      this.render();
    }
  }, {
    key: 'template',
    get: function get() {
      return '\n      <style>\n      :host {\n        display: block;\n        overflow: hidden;\n        position: relative;\n      }\n\n      #slidingContainer {\n        height: 100%;\n        position: absolute;\n        /*\n         Set width for IE/Edge. It\'s not clear why they need this, and the other\n         browsers don\'t.\n         */\n        width: 100%;\n        will-change: transform;\n      }\n\n      :host(.showTransition) #slidingContainer {\n        -webkit-transition: -webkit-transform 0.2s ease-out;\n        transition: transform 0.2s ease-out;\n      }\n      </style>\n\n      <basic-spread-items id="slidingContainer">\n        <content></content>\n      </basic-spread-items>\n    ';
    }
  }]);

  return SlidingViewport;
})();

exports.default = SlidingViewport;

function renderSelection() {

  var count = this.items && this.items.length;
  if (!count) {
    // Null or zero means we don't have items to render yet.
    return;
  }

  var index = this.selectedIndex;
  if (index < 0) {
    // No selection
    // return;
    index = 0;
  }

  var position = this.position || 0;
  var dampenedPosition;
  if (index === 0 && position < 0) {
    // Apply tension from the left edge.
    dampenedPosition = -damping(-position);
  } else if (index === count - 1 && position > 0) {
    // Apply tension from the right edge.
    dampenedPosition = damping(position);
  } else {
    // No damping required.
    dampenedPosition = position;
  }
  var fractionalIndex = index + dampenedPosition;
  // Use a percentage so the transform will still work if screen size changes
  // (e.g., if device orientation changes).
  var left = -fractionalIndex * 100;
  // var left = -(fractionalIndex / count) * 100;
  var transform = 'translateX(' + left + '%)';
  this.$.slidingContainer.style.webkitTransform = transform;
  this.$.slidingContainer.style.transform = transform;
}

/*
 * Calculate damping as a function of the distance past the minimum/maximum
 * values.
 *
 * We want to asymptotically approach an absolute minimum of 1 unit
 * below/above the actual minimum/maximum. This requires calculating a
 * hyperbolic function.
 *
 * See http://www.wolframalpha.com/input/?i=y+%3D+-1%2F%28x%2B1%29+%2B+1
 * for the one we use. The only portion of that function we care about is when
 * x is zero or greater. An important consideration is that the curve be
 * tangent to the diagonal line x=y at (0, 0). This ensures smooth continuity
 * with the normal drag behavior, in which the visible sliding is linear with
 * the distance the touchpoint has been dragged.
 */
function damping(x) {
  var y = -1 / (x + 1) + 1;
  return y;
}

SlidingViewport = _ElementBase2.default.compose(SlidingViewport);

document.registerElement('basic-sliding-viewport', SlidingViewport);

},{"../SpreadItems/SpreadItems":6,"core-component-mixins/src/ElementBase":30}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /**
       * Spreads out a set of items horizontally so they take equal space.
       *
       * This component currently requires an explicit size by applied to it. For a
       * variant that automatically sizes to fit the list items, see the related
       * component basic-spread-fit.
       *
       * @class basic-spread-items
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('core-component-mixins/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _ChildrenContent = require('../../mixins/ChildrenContent');

var _ChildrenContent2 = _interopRequireDefault(_ChildrenContent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var SpreadItems = (function () {
  function SpreadItems() {
    _classCallCheck(this, SpreadItems);
  }

  _createClass(SpreadItems, [{
    key: 'attachedCallback',
    value: function attachedCallback() {
      // HACK
      this.itemsChanged();
    }
  }, {
    key: 'itemsChanged',
    value: function itemsChanged() {
      var items = this.items;
      var count = items.length;
      this.$.spreadContainer.style.width = count * 100 + '%';
      var itemWidth = 100 / count + "%";
      [].forEach.call(items, function (item) {
        item.style.width = itemWidth;
      });
    }
  }, {
    key: 'items',
    get: function get() {
      return this.content;
    }
  }, {
    key: 'template',
    get: function get() {
      return '\n      <style>\n      :host {\n        display: block;\n      }\n\n      #spreadContainer {\n        display: -webkit-flex;\n        display: flex;\n        height: 100%;\n        position: relative;\n      }\n\n      #spreadContainer ::content > * {\n        object-fit: contain;\n        object-fit: var(--basic-item-object-fit, contain);\n        touch-action: none;\n        height: 100%;\n        -webkit-user-drag: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n      </style>\n\n      <div id="spreadContainer">\n        <content></content>\n      </div>\n    ';
    }
  }]);

  return SpreadItems;
})();

exports.default = SpreadItems;

SpreadItems = _ElementBase2.default.compose(_ChildrenContent2.default, SpreadItems);

document.registerElement('basic-spread-items', SpreadItems);

},{"../../mixins/ChildrenContent":7,"core-component-mixins/src/ElementBase":30}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
  } else {
    return Array.from(arr);
  }
}

function _instanceof(left, right) {
  if (right != null && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin that defines a component's content as its children.
 *
 * @class ChildrenContent
 *
 */

// TODO: Don't respond to changes in attributes, or at least offer that as an
// option.

var ChildrenContent = (function () {
  function ChildrenContent() {
    _classCallCheck(this, ChildrenContent);
  }

  _createClass(ChildrenContent, [{
    key: "createdCallback",
    value: function createdCallback() {
      var _this = this;

      // Until we have content observing again, force a call to contentChanged().
      // HACK: Do this asynchronously, so other mixins have a chance to set up
      // before this call.
      setTimeout(function () {
        return _this.contentChanged();
      });
    }

    // TODO: Wait to observe changes until we have a shadow DOM host. Right
    // now, the initial collectiveChanged call can happen too early.
    // TODO: Handle case where component is instantiated out of DOM, then
    // attached.
    // collectiveChanged() {
    //   // console.log(this.localName + " collectiveChanged: " + this.collective.aspects.length);
    //   let innermost = this.collective.innermostElement;
    //   let innermostHost = Basic.ContentHelpers.getHost(innermost);
    //
    //   // Optimize for the case where the collective's changed, but its
    //   // innermost aspect is still the same. In that case, we don't want to
    //   // bother tearing down and then recreating our contentChanged handler.
    //   // TODO: This currently only tracks one level of host. For robustness,
    //   // this should track the chain of hosts.
    //   if (innermost === this._previousInnermostAspect
    //       && innermostHost === this._previousInnermostHost) {
    //     // We should already be observing changes on the innermost aspect.
    //     // Even though the content hasn't actually changed, we want to give the
    //     // new aspects a chance to respond to contentChanged.
    //     this.collective.contentChanged();
    //     return;
    //   }
    //
    //   // A new aspect is now innermost.
    //   if (this._previousInnermostAspect && this._previousInnermostAspect._contentChangeObserver) {
    //     // Stop observing changes on the old innermost aspect.
    //     // console.log("stopping observation of changes on old innermost aspect");
    //     Basic.ContentHelpers.observeContentChanges(this._previousInnermostAspect, null);
    //   }
    //
    //   Basic.ContentHelpers.observeContentChanges(innermost, function() {
    //     // Reset memoized content.
    //     this._content = null;
    //
    //     // Let collective know content has changed.
    //     this.collective.contentChanged();
    //   }.bind(this));
    //
    //   this._previousInnermostAspect = innermost;
    //   this._previousInnermostHost = innermostHost;
    // }

  }, {
    key: "contentChanged",
    value: function contentChanged() {
      var outermost = this.outermostAttached;
      if (outermost) {
        var event = new CustomEvent('content-changed', {
          bubbles: true
        });
        outermost.dispatchEvent(event);
      }
    }

    /**
     * The flattened content of this component.
     *
     * @property content
     * @type [Object]
     */

  }, {
    key: "content",
    get: function get() {
      return expandContentElements(this.children);
    }
  }]);

  return ChildrenContent;
})();

/*
 * Given a array of nodes, return a new array with any content elements expanded
 * to the nodes distributed to that content element. This rule is applied
 * recursively.
 *
 * If includeTextNodes is true, text nodes will be included, as in the
 * standard childNodes property; by default, this skips text nodes, like the
 * standard children property.
 */

exports.default = ChildrenContent;
function expandContentElements(nodes, includeTextNodes) {
  var _ref;

  var expanded = Array.prototype.map.call(nodes, function (node) {
    // We want to see if the node is an instanceof HTMLContentElement, but
    // that class won't exist if the browser that doesn't support native
    // Shadow DOM and if the Shadow DOM polyfill hasn't been loaded. Instead,
    // we do a simplistic check to see if the tag name is "content".
    if (node.localName && node.localName === "content") {
      // content element; use its distributed nodes instead.
      var distributedNodes = node.getDistributedNodes();
      return distributedNodes ? expandContentElements(distributedNodes, includeTextNodes) : [];
    } else if (_instanceof(node, HTMLElement)) {
      // Plain element; use as is.
      return [node];
    } else if (_instanceof(node, Text) && includeTextNodes) {
      // Text node.
      return [node];
    } else {
      // Comment, processing instruction, etc.; skip.
      return [];
    }
  });
  var flattened = (_ref = []).concat.apply(_ref, _toConsumableArray(expanded));
  return flattened;
}

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which maps a click (actually, a mousedown) to item selection.
 *
 * @class ClickSelection
 */

var ClickSelection = (function () {
  function ClickSelection() {
    _classCallCheck(this, ClickSelection);
  }

  _createClass(ClickSelection, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      /*
       * REVIEW: Which event should we listen to here?
       *
       * The standard use for this mixin is in list boxes. List boxes don't
       * appear to be consistent with regard to whether they select on mousedown
       * or click/mouseup.
       */
      this.addEventListener('mousedown', function (event) {
        selectTarget(_this, event.target);
        // Note: We don't call preventDefault here. The default behavior for
        // mousedown includes setting keyboard focus if the element doesn't
        // already have the focus, and we want to preserve that behavior.
        event.stopPropagation();
      });
    }

    // Default implementation. This will typically be handled by other mixins.
    // set selectedIndex(index) {}

  }]);

  return ClickSelection;
})();

// TODO: Handle the case where a list item has subelements. Walk up the DOM
// hierarchy until we find an item in the list, or come back to this element,
// in which case the element that was tapped isn't an item (and should be
// ignored).

exports.default = ClickSelection;
function selectTarget(element, target) {
  var index = element.indexOfItem && element.indexOfItem(target);
  if (index >= 0) {
    element.selectedIndex = index;
  }
}

},{}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which allows a component to provide aggregate behavior with other
 * elements, e.g., for keyboard handling.
 *
 * @class Collective
 */

var Collective = (function () {
  function Collective(element) {
    _classCallCheck(this, Collective);

    this._elements = [];
    this.assimilate(element);
  }

  _createClass(Collective, [{
    key: 'assimilate',
    value: function assimilate(target) {
      var _this = this;

      var elements = target.collective ? target.collective.elements : [target];
      elements.forEach(function (element) {
        element.collective = _this;
        _this._elements.push(element);
      });
      this.invokeCollectiveMethod('collectiveChanged');
    }
  }, {
    key: 'invokeCollectiveMethod',
    value: function invokeCollectiveMethod(method) {
      // Invoke from innermost to outermost.
      var elements = this.elements;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = elements.length - 1; i >= 0; i--) {
        var element = elements[i];
        if (element[method]) {
          element[method].apply(element, args);
        }
      }
    }
  }, {
    key: 'elements',
    get: function get() {
      return this._elements;
    }
  }, {
    key: 'outermostElement',
    get: function get() {
      return this.elements[0];
    }
  }]);

  return Collective;
})();

/**
 * @class CollectiveElement
 */

var CollectiveElement = (function () {
  function CollectiveElement() {
    _classCallCheck(this, CollectiveElement);
  }

  _createClass(CollectiveElement, [{
    key: 'createdCallback',
    value: function createdCallback() {
      this.collective = new Collective(this);
    }
  }, {
    key: 'target',
    set: function set(element) {
      this.collective.assimilate(element);
    }
  }]);

  return CollectiveElement;
})();

exports.default = CollectiveElement;

},{}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin that defines the target of a component -- the element the component is
 * managing or somehow responsible for -- as its first child.
 *
 * @class ContentFirstChildTarget
 */

var ContentFirstChildTarget = (function () {
  function ContentFirstChildTarget() {
    _classCallCheck(this, ContentFirstChildTarget);
  }

  _createClass(ContentFirstChildTarget, [{
    key: "contentChanged",
    value: function contentChanged() {
      var content = this.content;
      var target = content && content[0];
      if (target) {
        this.target = target;
      }
    }
  }, {
    key: "target",
    get: function get() {
      return this._target;
    },
    set: function set(element) {
      this._target = element;
    }
  }]);

  return ContentFirstChildTarget;
})();

exports.default = ContentFirstChildTarget;

},{}],11:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin that lets a component treat its content as list items.
 *
 * Auxiliary elements which are not normally visible are filtered out. For now,
 * For now, these are: link, script, style, and template.
 *
 * @class ContentItems
 */

var ContentItems = (function () {
  function ContentItems() {
    _classCallCheck(this, ContentItems);
  }

  _createClass(ContentItems, [{
    key: 'applySelection',
    value: function applySelection(item, selected) {
      item.classList.toggle('selected', selected);
    }
  }, {
    key: 'contentChanged',
    value: function contentChanged() {
      this._items = null;
      this.itemsChanged();
    }

    /**
     * Returns the positional index for the indicated item.
     *
     * @method indexOfItem
     * @param {Object} item The item whose index is requested.
     * @returns {Number} The index of the item, or -1 if not found.
     */

  }, {
    key: 'indexOfItem',
    value: function indexOfItem(item) {
      return this.items.indexOf(item);
    }

    // Default implementation does nothing.

  }, {
    key: 'itemAdded',
    value: function itemAdded(item) {}
  }, {
    key: 'itemsChanged',
    value: function itemsChanged() {
      var _this = this;

      // Perform per-item initialization.
      this.items.forEach(function (item) {
        if (!item._itemInitialized) {
          _this.itemAdded(item);
          item._itemInitialized = true;
        }
      });

      this.dispatchEvent(new CustomEvent('items-changed'));
    }

    /**
     * The current set of items in the list.
     *
     * @property items
     * @type [Object]
     */
    // TODO: property notifications so elements can bind to this property

  }, {
    key: 'items',
    get: function get() {
      if (this._items == null) {
        this._items = filterAuxiliaryElements(this.content);
      }
      return this._items;
    }
  }]);

  return ContentItems;
})();

// Return the given elements, filtering out auxiliary elements that aren't
// typically visible. Items which are not elements are returned as is.

exports.default = ContentItems;
function filterAuxiliaryElements(items) {
  var auxiliaryTags = ['link', 'script', 'style', 'template'];
  return [].filter.call(items, function (item) {
    return !item.localName || auxiliaryTags.indexOf(item.localName) < 0;
  });
}

/**
 * Fires when the items in the list change.
 *
 * @event items-changed
 */

},{}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /**
       * Mixin which maps direction semantics (goLeft, goRight, etc.) to selection
       * semantics (selectPrevious, selectNext, etc.).
       *
       * @class DirectionSelection
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DirectionSelection = (function () {
  function DirectionSelection() {
    _classCallCheck(this, DirectionSelection);
  }

  _createClass(DirectionSelection, [{
    key: 'goDown',
    value: function goDown() {
      return this.selectNext();
    }
  }, {
    key: 'goEnd',
    value: function goEnd() {
      return this.selectLast();
    }
  }, {
    key: 'goLeft',
    value: function goLeft() {
      return this.selectPrevious();
    }
  }, {
    key: 'goRight',
    value: function goRight() {
      return this.selectNext();
    }
  }, {
    key: 'goStart',
    value: function goStart() {
      return this.selectFirst();
    }
  }, {
    key: 'goUp',
    value: function goUp() {
      return this.selectPrevious();
    }

    // Default implementations. These will typically be handled by other mixins.

  }, {
    key: 'selectFirst',
    value: function selectFirst() {}
  }, {
    key: 'selectLast',
    value: function selectLast() {}
  }, {
    key: 'selectNext',
    value: function selectNext() {}
  }, {
    key: 'selectPrevious',
    value: function selectPrevious() {}
  }]);

  return DirectionSelection;
})();

exports.default = DirectionSelection;

_Composable2.default.decorate.call(DirectionSelection.prototype, {
  selectFirst: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  selectLast: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  selectNext: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  selectPrevious: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult)
});

},{"Composable/src/Composable":25}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin that allows a component to support a "generic" style: a minimalist
 * style that can easily be removed to reset its visual appearance to a baseline
 * state.
 *
 * By default, a component should provide a minimal visual presentation that
 * allows the component to function. However, the more styling the component
 * provides by default, the harder it becomes to get the component to fit in
 * in other settings. Each CSS rule has to be overridden. Worse, new CSS rules
 * added to the default style won't be overridden by default, making it hard to
 * know whether a new version of a component will still look okay.
 *
 * As a compromise, the simple Polymer behavior here defines a "generic"
 * attribute. This attribute is normally set by default, and styles can be
 * written that apply only when the generic attribute is set. This allows the
 * construction of CSS rules that will only apply to generic components like
 *
 *     :host([generic=""]) {
 *       ...
 *     }
 *
 * This makes it easy to remove all default styling -- set the generic attribute
 * to false, and all default styling will be removed.
 *
 * @class Generic
 */

var Generic = (function () {
  function Generic() {
    _classCallCheck(this, Generic);
  }

  _createClass(Generic, [{
    key: 'createdCallback',
    value: function createdCallback() {
      this.generic = this.getAttribute('generic') || true;
    }

    /**
     * True if the component would like to receive generic styling.
     *
     * This property is true by default — set it to false to turn off all
     * generic styles. This makes it easier to apply custom styling; you won't
     * have to explicitly override styling you don't want.
     *
     * @property generic
     * @type Boolean
     * @default true
     */

  }, {
    key: 'generic',
    get: function get() {
      return this._generic;
    }

    // We roll our own attribute setting so that an explicitly false value shows
    // up as generic="false".

    , set: function set(value) {
      if (typeof value === 'string') {
        value = value !== 'false';
      }
      this._generic = value;
      if (value === false) {
        // Explicitly use false string.
        this.setAttribute('generic', 'false');
      } else if (value == null) {
        // Explicitly remove attribute.
        this.removeAttribute('generic');
      } else {
        // Use the empty string to get attribute to appear with no value.
        this.setAttribute('generic', '');
      }
    }
  }]);

  return Generic;
})();

exports.default = Generic;
;

},{}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which manages selection semantics for items in a list.
 *
 * @class ItemSelection
 */

/**
 * Fires when the selectedItem property changes.
 *
 * @event selected-item-changed
 * @param detail.selectedItem The new selected item.
 * @param detail.previousItem The previously selected item.
 */

/**
 * Fires when the selectedIndex property changes.
 *
 * @event selected-item-changed
 * @param detail.selectedIndex The new selected index.
 */

var ItemSelection = (function () {
  function ItemSelection() {
    _classCallCheck(this, ItemSelection);
  }

  _createClass(ItemSelection, [{
    key: 'applySelection',

    // Default implementation. This will typically be handled by other mixins.
    value: function applySelection(item, selected) {}
  }, {
    key: 'itemAdded',
    value: function itemAdded(item) {
      this.applySelection(item, item === this.selectedItem);
    }
  }, {
    key: 'itemsChanged',
    value: function itemsChanged() {
      var index = this.items.indexOf(this.selectedItem);
      if (index < 0) {
        // Selected item is no longer in the current set of items.
        this.selectedItem = null;
        if (this.selectionRequired) {
          // Ensure selection, but do this in the next tick to give other
          // mixins a chance to do their own itemsChanged work.
          setTimeout((function () {
            ensureSelection(this);
          }).bind(this));
        }
      }

      // The change in items may have affected which navigations are possible.
      updatePossibleNavigations(this, index);
    }

    /**
     * The index of the item which is currently selected, or -1 if there is no
     * selection.
     *
     * @property selectedIndex
     * @type Number
     */

  }, {
    key: 'selectFirst',

    /**
     * Select the first item in the list.
     *
     * @method selectFirst
     */
    value: function selectFirst() {
      return selectIndex(this, 0);
    }

    /**
     * True if the list should always have a selection (if it has items).
     *
     * @property selectionRequired
     * @type Boolean
     */

  }, {
    key: 'selectLast',

    /**
     * Select the last item in the list.
     *
     * @method selectLast
     */
    value: function selectLast() {
      return selectIndex(this, this.items.length - 1);
    }

    /**
     * Select the next item in the list.
     *
     * @method selectNext
     */

  }, {
    key: 'selectNext',
    value: function selectNext() {
      return selectIndex(this, this.selectedIndex + 1);
    }

    /**
     * Select the previous item in the list.
     *
     * @method selectPrevious
     */

  }, {
    key: 'selectPrevious',
    value: function selectPrevious() {
      return selectIndex(this, this.selectedIndex - 1);
    }
  }, {
    key: 'canSelectNext',
    get: function get() {
      return this._canSelectNext;
    },
    set: function set(canSelectNext) {
      this._canSelectNext = canSelectNext;
    }
  }, {
    key: 'canSelectPrevious',
    get: function get() {
      return this._canSelectPrevious;
    },
    set: function set(canSelectPrevious) {
      this._canSelectPrevious = canSelectPrevious;
    }
  }, {
    key: 'selectedIndex',
    get: function get() {
      var selectedItem = this.selectedItem;

      if (selectedItem == null) {
        return -1;
      }

      // TODO: Memoize
      var index = this.indexOfItem(selectedItem);

      // If index = -1, selection wasn't found. Most likely cause is that the
      // DOM was manipulated from underneath us.
      // TODO: Once we track content changes, turn this into an exception.
      return index;
    },
    set: function set(index) {
      var items = this.items;
      var item = undefined;
      if (index < 0 || items.length === 0) {
        item = null;
      } else {
        item = items[index];
      }
      this.selectedItem = item;

      var outermost = this.outermostAttached;
      if (outermost) {
        var event = new CustomEvent('selected-index-changed', {
          bubbles: true,
          detail: {
            selectedIndex: index,
            value: index // for Polymer binding
          }
        });
        outermost.dispatchEvent(event);
      }
    }
  }, {
    key: 'selectedItem',
    get: function get() {
      return this._selectedItem;
    }

    /**
     * The currently selected item, or null if there is no selection.
     *
     * @property selectedItem
     * @type Object
     */
    // TODO: Confirm item is in items before selecting.

    , set: function set(item) {
      var previousItem = this._selectedItem;
      if (previousItem) {
        // Remove previous selection.
        this.applySelection(previousItem, false);
      }
      this._selectedItem = item;
      if (item) {
        this.applySelection(item, true);
      }

      // TODO: Rationalize with selectedIndex so we're not recalculating item
      // or index in each setter.
      var index = this.indexOfItem(item);
      updatePossibleNavigations(this, index);

      var outermost = this.outermostAttached;
      if (outermost) {
        var event = new CustomEvent('selected-item-changed', {
          bubbles: true,
          detail: {
            selectedItem: item,
            previousItem: previousItem,
            value: item // for Polymer binding
          }
        });
        outermost.dispatchEvent(event);
      }
    }
  }, {
    key: 'selectionRequired',
    get: function get() {
      return this._selectionRequired;
    },
    set: function set(selectionRequired) {
      this._selectionRequired = selectionRequired;
      ensureSelection(this);
    }
  }]);

  return ItemSelection;
})();

// If no item is selected, select a default item.
// TODO: If the previously-selected item has been deleted, try to select an
// item adjacent to the position it held.

exports.default = ItemSelection;
function ensureSelection(element) {
  if (!element.selectedItem && element.items && element.items.length > 0) {
    element.selectedIndex = 0;
  }
}

// Ensure the given index is within bounds, and select it if it's not already
// selected.
function selectIndex(element, index) {
  var boundedIndex = Math.max(Math.min(index, element.items.length - 1), 0);
  var previousIndex = element.selectedIndex;
  if (previousIndex !== boundedIndex) {
    element.selectedIndex = boundedIndex;
    return true;
  } else {
    return false;
  }
}

// Following a change in selection, report whether it's now possible to
// go next/previous from the given index.
function updatePossibleNavigations(element, index) {
  var canSelectNext = undefined;
  var canSelectPrevious = undefined;
  var items = element.items;
  if (items == null || items.length === 0) {
    canSelectNext = false;
    canSelectPrevious = false;
  } else if (items.length === 1) {
    // Special case. If there's no selection, we declare that it's always
    // possible to go next/previous to create a selection.
    canSelectNext = true;
    canSelectPrevious = true;
  } else {
    // Normal case: we have an index in a list that has items.
    canSelectPrevious = index > 0;
    canSelectNext = index < items.length - 1;
  }
  element.canSelectNext = canSelectNext;
  element.canSelectPrevious = canSelectPrevious;
}

},{}],15:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which manages ARIA roles for a component that wants to act as a list.
 *
 * @class ItemsAccessible
 */

// Used to assign unique IDs to item elements without IDs.
var idCount = 0;

var ItemsAccessible = (function () {
  function ItemsAccessible() {
    _classCallCheck(this, ItemsAccessible);
  }

  _createClass(ItemsAccessible, [{
    key: 'applySelection',
    value: function applySelection(item, selected) {
      item.setAttribute('aria-selected', selected);
      var itemId = item.getAttribute('id');
      if (itemId) {
        this.outermostAttached.setAttribute('aria-activedescendant', itemId);
      }
    }

    // // Ensure the outermost aspect has role="listbox".
    // collectiveChanged() {
    //
    //   var outermost = this.outermostAttached;
    //   if (this._previousOutermostAspect === outermost) {
    //     // Already configured.
    //     return;
    //   }
    //
    //   if (this._previousOutermostAspect) {
    //     // Remove ARIA attributes from previous outermost aspect.
    //     this._previousOutermostAspect.removeAttribute('role');
    //     this._previousOutermostAspect.removeAttribute('aria-activedescendant');
    //   }
    //
    //   outermost.setAttribute('role', 'listbox');
    //
    //   // Determine a base item ID based on this component's host's own ID. This
    //   // will be combined with a unique integer to assign IDs to items that don't
    //   // have an explicit ID. If the basic-list-box has ID "foo", then its items
    //   // will have IDs that look like "_fooOption1". If the list has no ID itself,
    //   // its items will get IDs that look like "_option1". Item IDs are prefixed
    //   // with an underscore to differentiate them from manually-assigned IDs, and
    //   // to minimize the potential for ID conflicts.
    //
    //   // TODO: This check now comes too late for components like basic-list-box.
    //   // We may need to dynamically update the item IDs whenever the collection
    //   // changes, although that requires keeping track of whether we've changed
    //   // an item's ID or whether it's always had that ID.
    //   var elementId = outermost.getAttribute( "id" );
    //   this.itemBaseId = elementId ?
    //       "_" + elementId + "Option" :
    //       "_option";
    //
    //   this._previousOutermostAspect = outermost;
    // }

  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      this.setAttribute('role', 'listbox');

      // Determine a base item ID based on this component's host's own ID. This
      // will be combined with a unique integer to assign IDs to items that don't
      // have an explicit ID. If the basic-list-box has ID "foo", then its items
      // will have IDs that look like "_fooOption1". If the list has no ID itself,
      // its items will get IDs that look like "_option1". Item IDs are prefixed
      // with an underscore to differentiate them from manually-assigned IDs, and
      // to minimize the potential for ID conflicts.

      // TODO: This check now comes too late for components like basic-list-box.
      // We may need to dynamically update the item IDs whenever the collection
      // changes, although that requires keeping track of whether we've changed
      // an item's ID or whether it's always had that ID.
      var elementId = this.getAttribute("id");
      this.itemBaseId = elementId ? "_" + elementId + "Option" : "_option";
    }
  }, {
    key: 'itemAdded',
    value: function itemAdded(item) {
      item.setAttribute('role', 'option');

      // Ensure each item has an ID so we can set aria-activedescendant on the
      // overall list whenever the selection changes.
      if (!item.getAttribute('id')) {
        item.setAttribute('id', this.itemBaseId + idCount++);
      }
    }
  }, {
    key: 'selectedItem',
    set: function set(item) {
      // Catch the case where the selection is removed.
      if (item == null) {
        this.removeAttribute('aria-activedescendant');
      }
    }
  }]);

  return ItemsAccessible;
})();

exports.default = ItemsAccessible;

},{}],16:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which manages the keyboard focus and keydown handling for a component.
 *
 * TODO: Document collective behavior.
 * TODO: Provide baseline behavior outside of a collective.
 *
 * @class Keyboard
 */

var Keyboard = (function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);
  }

  _createClass(Keyboard, [{
    key: 'keydown',

    // Default keydown handler. This will typically be handled by other mixins.
    value: function keydown(event) {}

    /*
     * If we're now the outermost element, of the collective, set up to receive
     * keyboard events. If we're no longer the outermost element, stop listening.
     */
    // TODO: Do we need to start/stop listening when attached/detached, or is
    // that handled automatically?

  }, {
    key: 'collectiveChanged',
    value: function collectiveChanged() {
      if (this.collective.outermostElement === this) {
        if (!listeningToKeydown(this)) {
          startListeningToKeydown(this);
        }
      } else {
        if (listeningToKeydown(this)) {
          stopListeningToKeydown(this);
        }
      }
    }
  }]);

  return Keyboard;
})();

exports.default = Keyboard;

function keydown(event) {

  // Give collective elements a shot at the event, working from innermost to
  // outermost (this element).
  var handled = undefined;
  var elements = this.collective.elements;
  for (var i = elements.length - 1; i >= 0; i--) {
    var element = elements[i];
    handled = element.keydown && element.keydown(event);
    if (handled) {
      break;
    }
  }

  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function listeningToKeydown(element) {
  return element._keydownListener != null;
}

function startListeningToKeydown(element) {
  element._keydownListener = keydown.bind(element);
  element.addEventListener('keydown', element._keydownListener);
  if (element.tabIndex < 0) {
    element.setAttribute('tabIndex', 0);
  }
}

function stopListeningToKeydown(element) {
  element.log("stopListeningToKeydown");
  element.removeEventListener('keydown', element._keydownListener);
  element._keydownListener = null;
  element.removeAttribute('tabIndex');
}

},{}],17:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /**
       * Mixin which maps direction keys (Left, Right, etc.) to direction semantics
       * (goLeft, goRight, etc.).
       *
       * @class KeyboardDirection
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var KeyboardDirection = (function () {
  function KeyboardDirection() {
    _classCallCheck(this, KeyboardDirection);
  }

  _createClass(KeyboardDirection, [{
    key: 'goDown',

    // Default implementations. These will typically be handled by other mixins.
    value: function goDown() {}
  }, {
    key: 'goEnd',
    value: function goEnd() {}
  }, {
    key: 'goLeft',
    value: function goLeft() {}
  }, {
    key: 'goRight',
    value: function goRight() {}
  }, {
    key: 'goStart',
    value: function goStart() {}
  }, {
    key: 'goUp',
    value: function goUp() {}
  }, {
    key: 'keydown',
    value: function keydown(event) {
      var handled = undefined;
      switch (event.keyCode) {
        case 35:
          // End
          handled = this.goEnd();
          break;
        case 36:
          // Home
          handled = this.goStart();
          break;
        case 37:
          // Left
          handled = this.goLeft();
          break;
        case 38:
          // Up
          handled = event.altKey ? this.goStart() : this.goUp();
          break;
        case 39:
          // Right
          handled = this.goRight();
          break;
        case 40:
          // Down
          handled = event.altKey ? this.goEnd() : this.goDown();
          break;
      }
      return handled;
    }
  }]);

  return KeyboardDirection;
})();

exports.default = KeyboardDirection;

_Composable2.default.decorate.call(KeyboardDirection.prototype, {
  goDown: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  goEnd: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  goLeft: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  goRight: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  goStart: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  goUp: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  keydown: _Composable2.default.rule(_Composable2.default.rules.preferMixinResult)
});

},{"Composable/src/Composable":25}],18:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /**
       * Mixin which maps page keys (Page Up, Page Down) into operations that scroll
       * the component.
       *
       * The keyboard interaction model generally follows that of Microsoft Windows'
       * list boxes instead of those in OS X:
       *
       * * The Page Up/Down and Home/End keys actually move the selection, rather than
       *   just scrolling. The former behavior seems more generally useful for keyboard
       *   users.
       *
       * * Pressing Page Up/Down will move the selection to the topmost/bottommost
       *   visible item if the selection is not already there. Thereafter, the key will
       *   move the selection up/down by a page, and (per the above point) make the
       *   selected item visible.
       *
       * @class KeyboardPaging
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var KeyboardPaging = (function () {
  function KeyboardPaging() {
    _classCallCheck(this, KeyboardPaging);
  }

  _createClass(KeyboardPaging, [{
    key: 'keydown',
    value: function keydown(event) {
      var handled = undefined;
      switch (event.keyCode) {
        case 33:
          // Page Up
          handled = this.pageUp();
          break;
        case 34:
          // Page Down
          handled = this.pageDown();
          break;
      }
      return handled;
    }

    /**
     * Scroll down one page.
     *
     * @method pageDown
     */

  }, {
    key: 'pageDown',
    value: function pageDown() {
      return scrollOnePage(this, true);
    }

    /**
     * Scroll up one page.
     *
     * @method pageUp
     */

  }, {
    key: 'pageUp',
    value: function pageUp() {
      return scrollOnePage(this, false);
    }
  }]);

  return KeyboardPaging;
})();

// Return the item whose content spans the given y position (relative to the
// top of the list's scrolling client area), or null if not found.
//
// If downward is true, move down the list of items to find the first item
// found at the given y position; if downward is false, move up the list of
// items to find the last item at that position.

exports.default = KeyboardPaging;
function getIndexOfItemAtY(element, y, downward) {
  var items = element.items;
  var start = downward ? 0 : items.length - 1;
  var end = downward ? items.length : 0;
  var step = downward ? 1 : -1;
  var innermost = element.innermostAttached;
  var topOfClientArea = innermost.offsetTop + innermost.clientTop;
  var i = start;
  var found = false;
  while (i !== end) {
    var item = items[i];
    var itemTop = item.offsetTop - topOfClientArea;
    var itemBottom = itemTop + item.offsetHeight;
    if (itemTop <= y && itemBottom >= y) {
      // Item spans the indicated y coordinate.
      found = true;
      break;
    }
    i += step;
  }

  if (!found) {
    return null;
  }

  // We may have found an item whose padding spans the given y coordinate,
  // but whose content is actually above/below that point.
  // TODO: If the item has a border, then padding should be included in
  // considering a hit.
  var itemStyle = getComputedStyle(item);
  var itemPaddingTop = parseFloat(itemStyle.paddingTop);
  var itemPaddingBottom = parseFloat(itemStyle.paddingBottom);
  var contentTop = itemTop + item.clientTop + itemPaddingTop;
  var contentBottom = contentTop + item.clientHeight - itemPaddingTop - itemPaddingBottom;
  if (downward && contentTop <= y || !downward && contentBottom >= y) {
    // The indicated coordinate hits the actual item content.
    return i;
  } else {
    // The indicated coordinate falls within the item's padding. Back up to
    // the item below/above the item we found and return that.
    i -= step;
    return i;
  }
}

// Move by one page downward (if downward is true), or upward (if false).
// Return true if we ended up changing the selection, false if not.
// TODO: Better support for horizontal lists.
function scrollOnePage(element, downward) {

  var innermost = element.innermostAttached;
  if (!innermost) {
    return;
  }

  // Determine the item visible just at the edge of direction we're heading.
  // We'll select that item if it's not already selected.
  var edge = innermost.scrollTop + (downward ? innermost.clientHeight : 0);
  var indexOfItemAtEdge = getIndexOfItemAtY(element, edge, downward);

  var selectedIndex = element.selectedIndex;
  var newIndex;
  if (indexOfItemAtEdge && selectedIndex === indexOfItemAtEdge) {
    // The item at the edge was already selected, so scroll in the indicated
    // direction by one page. Leave the new item at that edge selected.
    var delta = (downward ? 1 : -1) * innermost.clientHeight;
    newIndex = getIndexOfItemAtY(element, edge + delta, downward);
  } else {
    // The item at the edge wasn't selected yet. Instead of scrolling, we'll
    // just select that item. That is, the first attempt to page up/down
    // usually just moves the selection to the edge in that direction.
    newIndex = indexOfItemAtEdge;
  }

  if (!newIndex) {
    // We can't find an item in the direction we want to travel. Select the
    // last item (if moving downward) or first item (if moving upward).
    newIndex = downward ? element.items.length - 1 : 0;
  }

  if (newIndex !== selectedIndex) {
    element.selectedIndex = newIndex;
    return true; // We handled the page up/down ourselves.
  } else {
      return false; // We didn't do anything.
    }
}
_Composable2.default.decorate.call(KeyboardPaging.prototype, {
  keydown: _Composable2.default.rule(_Composable2.default.rules.preferMixinResult)
});

},{"Composable/src/Composable":25}],19:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /**
       * Mixin that handles list box-style prefix typing, in which the user can type a
       * string to select the first item that begins with that string.
       *
       * @class KeyboardPrefixSelection
       *
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// TODO: If the selection is changed by some other means (e.g., arrow keys) other
// than prefix typing, then that act should reset the prefix.

var KeyboardPrefixSelection = (function () {
  function KeyboardPrefixSelection() {
    _classCallCheck(this, KeyboardPrefixSelection);
  }

  _createClass(KeyboardPrefixSelection, [{
    key: 'keydown',

    // itemsChanged() {
    //   this._itemTextContents = null;
    //   resetTypedPrefix(this);
    // }

    value: function keydown(event) {
      var handled = undefined;
      var resetPrefix = true;

      switch (event.keyCode) {
        case 8:
          // Backspace
          handleBackspace(this);
          handled = true;
          resetPrefix = false;
          break;
        case 27:
          // Escape
          handled = true;
          break;
        default:
          if (!event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 32 /* Space */) {
              handlePlainCharacter(this, String.fromCharCode(event.which));
            }
          resetPrefix = false;
      }

      if (resetPrefix) {
        resetTypedPrefix(this);
      }

      return handled;
    }

    /**
     * Select the first item whose text content begins with the given prefix.
     *
     * @method selectItemWithTextPrefix
     * @param prefix [String] The string to search for
     */

  }, {
    key: 'selectItemWithTextPrefix',
    value: function selectItemWithTextPrefix(prefix) {
      if (prefix == null || prefix.length === 0) {
        return;
      }
      var index = getIndexOfItemWithTextPrefix(this, prefix);
      if (index >= 0) {
        this.selectedIndex = index;
      }
    }
  }]);

  return KeyboardPrefixSelection;
})();

exports.default = KeyboardPrefixSelection;

_Composable2.default.decorate.call(KeyboardPrefixSelection.prototype, {
  keydown: _Composable2.default.rule(_Composable2.default.rules.preferMixinResult)
});

// Time in milliseconds after which the user is considered to have stopped
// typing.
var PREFIX_TIMEOUT_DURATION = 1000;

// Return the index of the first item with the given prefix, else -1.
function getIndexOfItemWithTextPrefix(element, prefix) {
  var itemTextContents = getItemTextContents(element);
  var prefixLength = prefix.length;
  for (var i = 0; i < itemTextContents.length; i++) {
    var itemTextContent = itemTextContents[i];
    if (itemTextContent.substr(0, prefixLength) === prefix) {
      return i;
    }
  }
  return -1;
}

// Return an array of the text content (in lowercase) of all items.
// Cache these results.
function getItemTextContents(element) {
  if (!element._itemTextContents) {
    var items = element.items;
    element._itemTextContents = items.map(function (child) {
      var text = child.textContent || child.alt;
      return text.toLowerCase();
    });
  }
  return element._itemTextContents;
}

function handleBackspace(element) {
  var length = element._typedPrefix ? element._typedPrefix.length : 0;
  if (length > 0) {
    element._typedPrefix = element._typedPrefix.substr(0, length - 1);
  }
  element.selectItemWithTextPrefix(element._typedPrefix);
  element._setPrefixTimeout();
}

function handlePlainCharacter(element, char) {
  var prefix = element._typedPrefix || '';
  element._typedPrefix = prefix + char.toLowerCase();
  element.selectItemWithTextPrefix(element._typedPrefix);
  setPrefixTimeout(element);
}

function resetPrefixTimeout(element) {
  if (element._prefixTimeout) {
    clearTimeout(element._prefixTimeout);
    element._prefixTimeout = false;
  }
}

function resetTypedPrefix(element) {
  element._typedPrefix = '';
  resetPrefixTimeout(element);
}

function setPrefixTimeout(element) {
  resetPrefixTimeout(element);
  element._prefixTimeout = setTimeout(function () {
    resetTypedPrefix(element);
  }, PREFIX_TIMEOUT_DURATION);
}

},{"Composable/src/Composable":25}],20:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which applies standard highlight colors to a selected item.
 *
 * @class SelectionHighlight
 */

var SelectionHighlight = (function () {
  function SelectionHighlight() {
    _classCallCheck(this, SelectionHighlight);
  }

  _createClass(SelectionHighlight, [{
    key: 'applySelection',
    value: function applySelection(item, selected) {
      item.style.backgroundColor = selected ? 'highlight' : '';
      item.style.color = selected ? 'highlighttext' : '';
    }
  }]);

  return SelectionHighlight;
})();

exports.default = SelectionHighlight;

},{}],21:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which scrolls a container to keep the selected item visible.
 *
 * @class SelectionScroll
 */

var SelectionScroll = (function () {
  function SelectionScroll() {
    _classCallCheck(this, SelectionScroll);
  }

  _createClass(SelectionScroll, [{
    key: "scrollItemIntoView",

    /**
     * Scroll the given element completely into view, minimizing the degree of
     * scrolling performed.
     *
     * Blink has a scrollIntoViewIfNeeded() function that almost the same thing,
     * but unfortunately it's non-standard, and in any event often ends up
     * scrolling more than is absolutely necessary.
     *
     * @method scrollItemIntoView
     */
    value: function scrollItemIntoView(item) {
      // Get the relative position of the item with respect to the top of the
      // list's scrollable canvas. An item at the top of the list will have a
      // elementTop of 0.

      var innermost = this.innermostAttached;
      if (!innermost) {
        return;
      }

      var elementTop = item.offsetTop - innermost.offsetTop - innermost.clientTop;
      var elementBottom = elementTop + item.offsetHeight;
      // Determine the bottom of the scrollable canvas.
      var scrollBottom = innermost.scrollTop + innermost.clientHeight;
      if (elementBottom > scrollBottom) {
        // Scroll up until item is entirely visible.
        innermost.scrollTop += elementBottom - scrollBottom;
      } else if (elementTop < innermost.scrollTop) {
        // Scroll down until item is entirely visible.
        innermost.scrollTop = elementTop;
      }
    }
  }, {
    key: "selectedItem",
    set: function set(item) {
      if (item) {
        // Keep the selected item in view.
        this.scrollItemIntoView(item);
      }
    }
  }]);

  return SelectionScroll;
})();

exports.default = SelectionScroll;

},{}],22:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin which maps touch gestures (swipe left, swipe right) to direction
 * semantics (goRight, goLeft).
 *
 * @class SwipeDirection
 */

var SwipeDirection = (function () {
  function SwipeDirection() {
    _classCallCheck(this, SwipeDirection);
  }

  _createClass(SwipeDirection, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      this.position = 0;

      // TODO: Touch events could be factored out into its own mixin.

      // In all touch events, only handle single touches. We don't want to
      // inadvertently do work when the user's trying to pinch-zoom for example.
      // TODO: Even better approach than below would be to ignore touches after
      // the first if the user has already begun a swipe.
      this.addEventListener('touchstart', function (event) {
        if (_this._multiTouch) {
          return;
        } else if (event.touches.length === 1) {
          touchStart(_this, event);
        } else {
          _this._multiTouch = true;
        }
      });
      this.addEventListener('touchmove', function (event) {
        if (!_this._multiTouch && event.touches.length === 1) {
          var handled = touchMove(_this, event);
          if (handled) {
            event.preventDefault();
          }
        }
      });
      this.addEventListener('touchend', function (event) {
        if (event.touches.length === 0) {
          // All touches removed; gesture is complete.
          if (!_this._multiTouch) {
            // Single-touch swipe has finished.
            touchEnd(_this, event);
          }
          _this._multiTouch = false;
        }
      });
    }

    // Default implementations

  }, {
    key: 'goLeft',
    value: function goLeft() {}
  }, {
    key: 'goRight',
    value: function goRight() {}

    /**
     * The distance the user has moved the first touchpoint since the beginning
     * of a drag, expressed as a fraction of the element's width.
     *
     * @property position
     * @type Number
     */

  }, {
    key: 'showTransition',

    // Default implementation
    value: function showTransition(value) {}
  }, {
    key: 'position',
    get: function get() {
      return this._position;
    },
    set: function set(value) {
      this._position = value;
    }
  }]);

  return SwipeDirection;
})();

exports.default = SwipeDirection;

function touchStart(element, event) {
  element.showTransition(false);
  var x = event.changedTouches[0].clientX;
  var y = event.changedTouches[0].clientY;
  element._startX = x;
  element._previousX = x;
  element._previousY = y;
  element._deltaX = 0;
  element._deltaY = 0;
}

function touchMove(element, event) {
  var x = event.changedTouches[0].clientX;
  var y = event.changedTouches[0].clientY;
  element._deltaX = x - element._previousX;
  element._deltaY = y - element._previousY;
  element._previousX = x;
  element._previousY = y;
  if (Math.abs(element._deltaX) > Math.abs(element._deltaY)) {
    // Move was mostly horizontal.
    trackTo(element, x);
    // Indicate that the event was handled. It'd be nicer if we didn't have
    // to do this so that, e.g., a user could be swiping left and right
    // while simultaneously scrolling up and down. (Native touch apps can do
    // that.) However, Mobile Safari wants to handle swipe events near the
    // page and interpret them as navigations. To avoid having a horiziontal
    // swipe misintepreted as a navigation, we indicate that we've handled
    // the event, and prevent default behavior.
    return true;
  } else {
    // Move was mostly vertical.
    return false; // Not handled
  }
}

function touchEnd(element, event) {
  element.showTransition(true);
  var x = event.changedTouches[0].clientX;
  if (element._deltaX >= 20) {
    // Finished going right at high speed.
    // console.log("flick right " + element._deltaX);
    element.goLeft();
  } else if (element._deltaX <= -20) {
    // Finished going left at high speed.
    // console.log("flick left " + element._deltaX);
    element.goRight();
  } else {
    // Finished at low speed.
    // console.log("slow drag " + element._deltaX);
    trackTo(element, x);
    var position = element.position;
    if (position >= 0.5) {
      element.goRight();
    } else if (position <= -0.5) {
      element.goLeft();
    }
  }
  element.position = 0;
  element._deltaX = null;
  element._deltaY = null;
}

function trackTo(element, x) {
  var width = element.offsetWidth;
  var dragDistance = element._startX - x;
  var fraction = width > 0 ? dragDistance / width : 0;
  element.position = fraction;
}

},{}],23:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Mixin that allows a component to delegate its own selection semantics to a
 * target element. This is useful when defining components that act as
 * optional decorators for a component that acts like a list.
 *
 * @class TargetSelection
 */

var TargetSelection = (function () {
  function TargetSelection() {
    _classCallCheck(this, TargetSelection);
  }

  _createClass(TargetSelection, [{
    key: 'indexOfItem',

    // attachedCallback() {
    //   // Apply any selection made before assimilation.
    //   if (this._prematureSelectedIndex
    //       && 'selectedIndex' in this && this.selectedIndex === -1) {
    //     this.selectedIndex = this._prematureSelectedIndex;
    //     this._prematureSelectedIndex = null;
    //   }
    // }

    value: function indexOfItem(item) {
      var target = this.target;
      return target ? target.indexOfItem(item) : -1;
    }
  }, {
    key: 'itemsChanged',
    value: function itemsChanged() {
      this.dispatchEvent(new CustomEvent('items-changed'));
    }

    /**
     * The index of the item which is currently selected, or -1 if there is no
     * selection.
     *
     * @property selectedIndex
     * @type Number
     */

  }, {
    key: 'items',
    get: function get() {
      var target = this.target;
      var items = target && target.items;
      return items || [];
    }
  }, {
    key: 'selectedIndex',
    get: function get() {
      var target = this.target;
      return target && target.selectedIndex;
    },
    set: function set(index) {
      // if ('selectedIndex' in this {
      //   this.selectedIndex = index;
      // } else {
      //   // Selection is being made before the collective supports it.
      //   this._prematureSelectedIndex = index;
      // }
      var target = this.target;
      if (target && target.selectedIndex !== index) {
        target.selectedIndex = index;
      }
    }

    /**
     * The currently selected item, or null if there is no selection.
     *
     * @property selectedItem
     * @type Object
     */

  }, {
    key: 'selectedItem',
    get: function get() {
      var target = this.target;
      return target && target.selectedItem;
    },
    set: function set(item) {
      var target = this.target;
      if (target) {
        target.selectedItem = item;
      }
    }
  }, {
    key: 'target',
    set: function set(element) {
      var _this = this;

      if (this._itemsChangedListener) {
        this.removeEventListener('items-changed', this._itemsChangedListener);
      }
      if (this._selectedItemChangedListener) {
        this.removeEventListener('selected-item-changed', this._selectedItemChangedListener);
      }
      this._itemsChangedListener = element.addEventListener('items-changed', function (event) {
        _this.itemsChanged();
      });
      this._selectedItemChangedListener = element.addEventListener('selected-item-changed', function (event) {
        // Let the component know the target's selection changed, but without
        // re-invoking the selectIndex/selectedItem setter.
        _this.selectedItemChanged();
      });
      // Force initial refresh.
      this.itemsChanged();
    }
  }]);

  return TargetSelection;
})();

exports.default = TargetSelection;

},{}],24:[function(require,module,exports){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})(); /*
       * Mixin which maps a horizontal trackpad swipe gestures (or horizontal mouse
       * wheel actions) to direction semantics.
       *
       * To respond to the trackpad, we can listen to the DOM's "wheel" events. These
       * events are fired as the user drags their fingers across a trackpad.
       * Unfortunately, this scheme is missing a critical event — there is no event when
       * the user *stops* a gestured on the trackpad.
       *
       * To complicate matters, the mainstream browsers continue to generate wheel events
       * even after the user has stopped dragging their fingers. These fake events
       * simulate the user gradually slowing down the drag until they come to a smooth
       * stop. In some contexts, these fake wheel events might be helpful, but in trying
       * to supply typical trackpad swipe navigation, these fake events get in the way.
       *
       * This component uses some heuristics to work around these problems, but the
       * complex nature of the problem make it extremely difficult to achieve the same
       * degree of trackpad responsiveness possible with native applications.
       *
       * @class TrackpadDirection
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TrackpadDirection = (function () {
  function TrackpadDirection() {
    _classCallCheck(this, TrackpadDirection);
  }

  _createClass(TrackpadDirection, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      this.addEventListener('wheel', function (event) {
        var handled = wheel(_this, event);
        if (handled) {
          event.preventDefault();
        }
      });
      resetWheelTracking(this);
    }

    // Default implementations

  }, {
    key: 'goLeft',
    value: function goLeft() {}
  }, {
    key: 'goRight',
    value: function goRight() {}
  }, {
    key: 'showTransition',
    value: function showTransition() {}
  }, {
    key: 'position',
    get: function get() {},
    set: function set(value) {}
  }]);

  return TrackpadDirection;
})();

exports.default = TrackpadDirection;

_Composable2.default.decorate.call(TrackpadDirection.prototype, {
  position: _Composable2.default.rule(_Composable2.default.rules.preferBaseGetter)
});

// Time we wait following a navigation before paying attention to wheel
// events again.
var POST_NAVIGATE_TIME = 250;

// Time we wait after the last wheel event before we reset things.
var WHEEL_TIME = 100;

// Following a navigation, partially reset our wheel tracking.
function postNavigate(element) {
  element.position = 0;
  element._wheelDistance = 0;
  element._postNavigateDelayComplete = true;
  element._absorbDeceleration = true;
  setTimeout(function () {
    element._postNavigateDelayComplete = false;
  }, POST_NAVIGATE_TIME);
}

// Reset all state related to the tracking of the wheel.
function resetWheelTracking(element) {
  element.position = 0;
  element._wheelDistance = 0;
  element._lastDeltaX = 0;
  element._absorbDeceleration = false;
  element._postNavigateDelayComplete = false;
  if (element._lastWheelTimeout) {
    clearTimeout(element._lastWheelTimeout);
    element._lastWheelTimeout = null;
  }
}

// Define our own sign function, since (as of May 2015), Safari and IE don't
// supply Math.sign().
function sign(x) {
  return x === 0 ? 0 : x > 0 ? 1 : -1;
}

// TODO: Damping, or some other treatment for going past the ends.

/*
 * A wheel event has been generated. This could be a real wheel event, or it
 * could be fake (see notes in the header).
 *
 * This handler uses several strategies to try to approximate native trackpad
 * swipe navigation.
 *
 * If the user has dragged enough to cause a navigation, then for a short
 * delay following that navigation, subsequent wheel events will be ignored.
 *
 * Furthermore, follwowing a navigation, we ignore all wheel events until we
 * receive at least one event where the event's deltaX (distance traveled) is
 * *greater* than the previous event's deltaX. This helps us filter out the
 * fake wheel events generated by the browser to simulate deceleration.
 *
 */
function wheel(element, event) {

  // Since we have a new wheel event, reset our timer waiting for the last
  // wheel event to pass.
  if (element._lastWheelTimeout) {
    clearTimeout(element._lastWheelTimeout);
  }
  element._lastWheelTimeout = setTimeout(function () {
    wheelTimedOut(element);
  }, WHEEL_TIME);

  var deltaX = event.deltaX;
  var deltaY = event.deltaY;

  // See if element event represents acceleration or deceleration.
  var acceleration = sign(deltaX) * (deltaX - element._lastDeltaX);
  element._lastDeltaX = deltaX;
  // console.log(deltaX + " " + acceleration + " " + element._absorbDeceleration + " " + element._postNavigateDelayComplete);

  if (Math.abs(deltaX) < Math.abs(deltaY)) {
    // Move was mostly vertical. The user may be trying scroll with the
    // trackpad/wheel. To be on the safe, we ignore such events.
    return false;
  }

  if (element._postNavigateDelayComplete) {
    // It's too soon after a navigation; ignore the event.
    return true;
  }

  if (acceleration > 0) {
    // The events are not (or are no longer) decelerating, so we can start
    // paying attention to them again.
    element._absorbDeceleration = false;
  } else if (element._absorbDeceleration) {
    // The wheel event was likely faked to simulate deceleration; ignore it.
    return true;
  }

  element._wheelDistance += deltaX;

  // Update the position of the items being navigated.
  var width = element.offsetWidth;
  var position = width > 0 ? element._wheelDistance / width : 0;
  element.showTransition(false);
  position = sign(position) * Math.min(Math.abs(position), 1);
  element.position = position;

  // If the user has dragged enough to reach the previous/next item, then
  // complete a navigation to that item.
  if (position === 1) {
    // console.log("goRight");
    element.showTransition(true);
    element.goRight();
    postNavigate(element);
  } else if (position === -1) {
    // console.log("goLeft");
    element.showTransition(true);
    element.goLeft();
    postNavigate(element);
  }

  return true;
}

// A sufficiently long period of time has passed since the last wheel event.
// We snap the selection to the closest item, then reset our state.
function wheelTimedOut(element) {
  // console.log("timeout");

  // Snap to the closest item.
  element.showTransition(true);
  var position = element.position;
  if (position >= 0.5) {
    // console.log("snap right");
    element.goRight();
  } else if (position <= -0.5) {
    // console.log("snap left");
    element.goLeft();
  }

  // TODO: Listen for the transition to complete, and then restore
  // showTransition to false (or the previous value).

  resetWheelTracking(element);
}

},{"Composable/src/Composable":25}],25:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Extend classes/objects with other classes/objects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CompositionRules = require('./CompositionRules');

var CompositionRules = _interopRequireWildcard(_CompositionRules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Composable = (function () {
  function Composable() {
    _classCallCheck(this, Composable);
  }

  _createClass(Composable, [{
    key: 'decorate',

    /*
     * Decorates the prototype of a class derived from Composable.
     * See notes for the static decorate() method.
     */
    value: function decorate(decorators) {
      Composable.decorate.call(this, decorators);
    }

    /*
     * Decorator for annotating how a class member should be composed later.
     * This takes a decorator that will be run at *composition* time.
     * For now, this can only be applied to methods.
     */

  }], [{
    key: 'compose',

    /*
     * Return a subclass of the current class that includes the members indicated
     * in the argument. The argument can be a plain JavaScript object, or a class
     * whose prototype contains the members that will be copied.
     *
     * This can be used for a couple of purposes:
     * 1. Extend a class with mixins/behaviors.
     * 2. Create a component class in ES5.
     *
     * The call
     *
     *   MyBaseClass.compose(Mixin1, Mixin2, Mixin3)
     *
     * will return a new class of MyBaseClass that implements all the methods in
     * the three mixins given. The above is equivalent to
     *
     *   MyBaseClass.compose(Mixin1).compose(Mixin2).compose(Mixin3)
     *
     * This method can be statically invoked to extend plain objects or classes
     * that don't inherit from this class:
     *
     *   let extended = Composable.extend.call(obj1, obj2);
     *
     */
    value: function compose() {
      for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
      }

      // We create a new subclass for each mixin in turn. The result becomes
      // the base class extended by any subsequent mixins. It turns out that
      // we can use Array.reduce() to concisely express this, using the current
      // (original) class as the seed for reduce().
      return mixins.reduce(_compose, this);
    }

    /*
     * Decorate "this" with the indicated decorators. The latter should be a
     * dictionary mapping property names to (proposed) ES7-compliant decorators.
     * This allows the use of decorators in ES6/5. Example, this ES7 code:
     *
     *   class Foo {
     *      @decorate(customDecorator)
     *      bar() {}
     *   }
     *
     * can be written using the decorate() method as:
     *
     *   class Foo {
     *      bar() {}
     *   }
     *   Composable.decorate.call(Foo.prototype, { bar: customDecorator });
     *
     * Or, if Foo derives from Composable already, this can be shorter:
     *
     *   class Foo extends Composable {
     *      bar() {}
     *   }
     *   Foo.prototype.decorate({ bar: customDecorator });
     *
     */

  }, {
    key: 'decorate',
    value: function decorate(decorators) {
      for (var key in decorators) {
        var decorator = decorators[key];
        var descriptor = Object.getOwnPropertyDescriptor(this, key);
        decorator(this, key, descriptor);
        Object.defineProperty(this, key, descriptor);
      }
    }
  }, {
    key: 'rule',
    value: function rule(decorator) {
      // Return a decorator that records the given decorator on the member itself.
      return function (target, key, descriptor) {
        // TODO: Use a Symbol instead of a string property name to save this.
        // descriptor.value._compositionRule = decorator;
        if (!target._compositionRules) {
          target._compositionRules = {};
        }
        target._compositionRules[key] = decorator;
      };
    }
  }]);

  return Composable;
})();

/*
 * Expose standard composition rules as properties of Composable.
 * This avoids the need for someone to make a separate import of the rules.
 */

exports.default = Composable;
Composable.rules = CompositionRules;

/*
 * All Composable objects have a "prototypes" key that keeps references to the
 * mixins that were applied along the prototype chain. When a *named* mixin is
 * applied to the prototype chain, the resulting object (or, for a class, the
 * class' prototype) will have a "prototypes" value for that name that points
 * back to the mixin. That is, a mixin can get a pointer to itself in the chain.
 *
 * A single mixin can be applied to multiple prototype chains -- the name
 * refers to the prototype on *this particular prototype chain* that was added
 * for that mixin. This lets mixin/mixin code get back to its own
 * prototype, most often in combination with "super" (see below) in order to
 * invoke superclass behavior.
 */
Composable.prototype.prototypes = {
  Composable: Composable.prototype
};

/*
 * All Composable-created objects have a "super" property that references the
 * prototype above them in the prototype chain.
 *
 * This "super" reference is used as a replacement for ES6's "super" keyword in
 * in ES5 (or transpiled ES6) mixins that want to invoke superclass behavior,
 * where the specific superclass will depend upon which mixins have been applied
 * to a given prototype chain.
 *
 * E.g.:
 *   class Mixin {
 *     foo() {
 *       if (this.protoypes.Mixin.super.foo) {
 *         this.prototypes.Mixin.super.foo.call(this); // Invoke superclass' foo()
 *       }
 *       // Do Mixin-specific work here...
 *     }
 *   }
 *
 * For consistency, Composable itself records its own superclass as Object.
 */
Composable.prototype.super = Object.prototype;

// Composition rules for standard object members.
Composable.prototype.compositionRules = {
  '__method__': Composable.rules.baseMethodFirst,
  '__property__': Composable.rules.baseSetterFirst,
  'compositionRules': Composable.rules.chainPrototypes,
  'prototypes': Composable.rules.chainPrototypes
};

// Properties defined by Function that we don't want to mixin.
// We'd prefer to get these by interrogating Function itself, but WebKit
// functions have some properties (arguments and caller) which are not returned
// by Object.getOwnPropertyNames(Function).
var NON_MIXABLE_FUNCTION_PROPERTIES = ['arguments', 'caller', 'length', 'name', 'prototype'];

// Properties defined by Object that we don't want to mixin.
var NON_MIXABLE_OBJECT_PROPERTIES = ['constructor'];

var ORIGINAL_MIXIN_SYMBOL = Symbol('Original mixin');

/*
 * Apply the composition rules in effect for the given object, which lies at
 * the tip of a prototype chain. This looks for conflicts between the object's
 * own properties (and methods), and identically-named properties (methods)
 * further up the prototype chain. Conflicts are resolved with rules defined by
 * the affect members.
 */
function applyCompositionRules(obj) {
  var ownCompositionRules = obj.hasOwnProperty('_compositionRules') ? obj._compositionRules : {};
  var inheritedCompositionRules = obj.compositionRules;
  var defaultCompositionRules = Composable.prototype.compositionRules;

  // For each property name, see if the base has a property with the same name.
  var base = Object.getPrototypeOf(obj);
  Object.getOwnPropertyNames(obj).forEach(function (name) {
    if (name in base && NON_MIXABLE_OBJECT_PROPERTIES.indexOf(name) < 0) {
      // Base does implement a member with the same name; need to combine.
      var descriptor = Object.getOwnPropertyDescriptor(obj, name);
      var key = getGeneralDescriptorKey(descriptor);

      // See if this property has a rule associated with it, checking:
      var rule = ownCompositionRules[name] // object itself
       || inheritedCompositionRules[name] // inherited rules for name
       || inheritedCompositionRules[key] // inherited rules generally
       || defaultCompositionRules[name] // default rules for name
       || defaultCompositionRules[key]; // default rules generally

      // "override" is a known no-op, so we don't bother trying to redefine the
      // property.
      if (rule && rule !== Composable.rules.override) {
        rule(obj, name, descriptor);
        Object.defineProperty(obj, name, descriptor);
      }
    }
  });
}

/*
 * Copy the given properties/methods to the target.
 * Return the updated target.
 */
function copyOwnProperties(source, target) {
  var ignorePropertyNames = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  Object.getOwnPropertyNames(source).forEach(function (name) {
    if (ignorePropertyNames.indexOf(name) < 0) {
      var descriptor = Object.getOwnPropertyDescriptor(source, name);
      Object.defineProperty(target, name, descriptor);
    }
  });
  return target;
}

/*
 * Return a new subclass/object that extends the given base class/object with
 * the members of the indicated mixin.
 */
function _compose(base, mixin) {

  // See if the *mixin* has a base class/prototype of its own.
  var mixinIsClass = isClass(mixin);
  var mixinBase = mixinIsClass ? Object.getPrototypeOf(mixin.prototype).constructor : Object.getPrototypeOf(mixin);
  if (mixinBase && mixinBase !== Function && mixinBase !== Object && mixinBase !== Object.prototype) {
    // The mixin itself derives from another class/object.
    // Recurse, and extend with the mixin's base first.
    base = _compose(base, mixinBase);
  }

  // Create the extended object we're going to return as a result.
  var baseIsClass = isClass(base);
  var result = baseIsClass ? createSubclass(base) : Object.create(base);

  // Check to make sure we're not extending the base with a prototype that was
  // already composed into the object's prototype chain.
  var basePrototype = baseIsClass ? base.prototype : base;
  var mixinPrototype = mixinIsClass ? mixin.prototype : mixin;
  if (objectHasPrototype(basePrototype, mixinPrototype) || objectHasMixin(basePrototype, mixin)) {
    // Skip this mixin, return result as is.
    return result;
  }

  // The "target" here is the target of our property/method composition rules.
  var target = undefined;
  if (baseIsClass && mixinIsClass) {
    // Extending class with class: copy static members, then prototype members.
    copyOwnProperties(mixin, result, NON_MIXABLE_FUNCTION_PROPERTIES);
    target = copyOwnProperties(mixin.prototype, result.prototype, NON_MIXABLE_OBJECT_PROPERTIES);
  } else if (!baseIsClass && mixinIsClass) {
    // Extending plain object with class: copy prototype methods to result.
    target = copyOwnProperties(mixin.prototype, result, NON_MIXABLE_FUNCTION_PROPERTIES);
  } else if (baseIsClass && !mixinIsClass) {
    // Extending class with plain object: copy mixin to result prototype.
    target = copyOwnProperties(mixin, result.prototype, NON_MIXABLE_OBJECT_PROPERTIES);
  } else {
    // Extending plain object with plain object: copy former to latter.
    target = copyOwnProperties(mixin, result, NON_MIXABLE_OBJECT_PROPERTIES);
  }

  if (mixin.name) {
    // Use the mixin's name (usually the name of a class' constructor) to
    // save a reference back to the tip of the newly-extended prototype chain.
    // See notes at Composable's "prototypes" property.
    target.prototypes = {};
    target.prototypes[mixin.name] = target;

    // Save a reference to the superclass/super-object. See the comments on
    // Composable's "super" property.
    target.super = baseIsClass ? base.prototype : base;
  }

  // Keep track of the mixin that was composed in at this point.
  Object.defineProperty(target, ORIGINAL_MIXIN_SYMBOL, {
    value: mixin
  });

  // Apply the composition rules in effect at the target.
  applyCompositionRules(target);

  return result;
}

/*
 * Return a new subclass of the given base class.
 */
function createSubclass(base) {
  // Once WebKit supports HTMLElement as a real class, we can just say:
  //
  //   class subclass extends base {}
  //
  // However, until that's resolved, we just construct the class ourselves.
  function subclass() {};
  Object.setPrototypeOf(subclass, base);
  Object.setPrototypeOf(subclass.prototype, base.prototype);
  return subclass;
}

/*
 * Examine the descriptor to determine which rule key applies.
 */
function getGeneralDescriptorKey(descriptor) {
  if (typeof descriptor.value === 'function') {
    // Method
    return '__method__';
  } else if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
    // Property with getter and/or setter
    return '__property__';
  }
  return null;
}

/*
 * Return true if c is a JavaScript class.
 *
 * We use this test because, on WebKit, classes like HTMLElement are special,
 * and are not instances of Function. To handle that case, we use a looser
 * definition: an object is a class if it has a prototype, and that prototype
 * has a constructor that is the original object. This condition holds true even
 * for HTMLElement on WebKit.
 */
function isClass(c) {
  return typeof c === 'function' || // Standard
  c.prototype && c.prototype.constructor === c; // HTMLElement in WebKit
}

/*
 * Return true if the given object either has the given prototype on its
 * chain.
 */
function objectHasPrototype(obj, prototype) {
  if (prototype.constructor === Object) {
    // The prototype is a plain object.
    // Only case to defend against is someone trying to mixin Object itself.
    return prototype === Object.prototype;
  }
  if (obj === prototype || _instanceof(obj, prototype.constructor)) {
    // The prototype was found along the prototype chain.
    return true;
  }
  return false;
}

/*
 * Return true if the given mixin was used to create any of the prototypes on
 * on the object's prototype chain.
 */
function objectHasMixin(obj, mixin) {
  if (!obj) {
    return false;
  }
  var descriptor = Object.getOwnPropertyDescriptor(obj, ORIGINAL_MIXIN_SYMBOL);
  if (descriptor && descriptor.value === mixin) {
    // The given mixin was, in fact, composed into this prototype chain.
    return true;
  }
  return objectHasMixin(Object.getPrototypeOf(obj), mixin);
}

},{"./CompositionRules":26}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeFunction = composeFunction;
exports.chainPrototypes = chainPrototypes;
exports.getBaseDescriptor = getBaseDescriptor;
exports.getPropertyDescriptor = getPropertyDescriptor;
exports.override = override;
exports.preferBaseResult = preferBaseResult;
exports.preferBaseGetter = preferBaseGetter;
exports.preferMixinGetter = preferMixinGetter;
exports.preferMixinResult = preferMixinResult;
exports.baseMethodFirst = baseMethodFirst;
exports.baseSetterFirst = baseSetterFirst;
/**
 * Standard composition rules
 */

/*
 * Take two functions and return a new composed function that invokes both.
 * The composed function will return the result of the second function.
 * This is not a rule, but a helper used by rules.
 */
function composeFunction(function1, function2) {
  return function () {
    function1.apply(this, arguments);
    return function2.apply(this, arguments);
  };
}

/*
 * Combinator that sets the prototype of a mixin property value to be the
 * corresponding value on the base. This effectively does a shallow merge of
 * of the properties, without copying any information.
 */
function chainPrototypes(target, key, descriptor) {
  var mixinValue = descriptor.value;
  var base = Object.getPrototypeOf(target);
  var baseDescriptor = getPropertyDescriptor(base, key);
  var baseValue = baseDescriptor.value;
  Object.setPrototypeOf(mixinValue, baseValue);
}

/*
 * Helper function to complete a property definition for a mixin.
 *
 * Default JavaScript behavior is that a subclass that defines a getter but not
 * a setter will never have the base class' setter invoked. Similarly, a
 * subclass that defines a setter but not a getter will never have the base
 * class' getter invoked.
 *
 * For mixins, we want the default behavior to be that, if a mixin only defines
 * a getter, but the base class defines a setter, we want the mixin to acquire
 * a default setter than invokes the base setter. Likewise, we want to define
 * a default getter if none is supplied.
 *
 * To carry that out, this helper function rounds out a property definition to
 * ensure it has a default getter or setter if it needs one.
 */
function completePropertyDefinition(descriptor, baseDescriptor) {
  if (descriptor.get && !descriptor.set && baseDescriptor.set) {
    (function () {
      // Mixin has getter but needs a default setter.
      var baseSetter = baseDescriptor.set;
      descriptor.set = function (value) {
        baseSetter.call(this, value);
      };
    })();
  }
  if (descriptor.set && !descriptor.get && baseDescriptor.get) {
    (function () {
      // Mixin has setter but needs a default getter.
      var baseGetter = baseDescriptor.get;
      descriptor.get = function () {
        return baseGetter.call(this);
      };
    })();
  }
}

/*
 * Perform a deep merge of a mixin property on top of a base property.
 */
// export function deepMerge(target, key, descriptor) {
//   let mixinValue = descriptor.value;
//   let baseValue = Object.getPrototypeOf(target)[key].value;
//   descriptor.value = 'merged'; // merge(baseValue, mixinValue);
// }

/*
 * Helper to return the base descriptor for the indicated key. This is used to
 * find the specific implementation that would otherwise be overridden by the
 * mixin.
 */
function getBaseDescriptor(target, key) {
  var base = Object.getPrototypeOf(target);
  return getPropertyDescriptor(base, key);
}

/*
 * Like Object.getOwnPropertyDescriptor(), but walks up the prototype chain.
 * This is needed by composition rules, which usually start out by getting
 * the base implementation of a member they're composing.
 * This is not a rule, but a helper used by rules.
 */
function getPropertyDescriptor(obj, name) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, name);
  if (descriptor) {
    return descriptor;
  } else {
    var prototype = Object.getPrototypeOf(obj);
    // Checking for "name in prototype" lets us know whether we should bother
    // walking up the prototype chain.
    if (prototype && name in prototype) {
      return getPropertyDescriptor(prototype, name);
    }
  }
  return undefined; // Not found
}

/*
 * Combinator that causes a mixin method to override its base implementation.
 * Since this the default behavior of the prototype chain, this is a no-op.
 */
function override(target, key, descriptor) {}

/*
 * Compose methods, invoking base implementation first. If it returns a
 * truthy result, that is returned immediately. Otherwise, the mixin
 * implementation's result is returned.
 */
function preferBaseResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseImplementation = baseDescriptor.value;
  descriptor.value = function () {
    return baseImplementation.apply(this, arguments) || mixinImplementation.apply(this, arguments);
  };
}

/*
 * Like preferBaseResult, but for getter/setters. The base getter is invoked
 * first. If it returns a truthy result, that is returned. Otherwise, the mixin
 * getter's result is returned. Setter is invoked base first, then mixin.
 */
function preferBaseGetter(target, key, descriptor) {
  var mixinGetter = descriptor.get;
  var mixinSetter = descriptor.set;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseGetter = baseDescriptor.get;
  var baseSetter = baseDescriptor.set;
  if (mixinGetter && baseGetter) {
    // Compose getters.
    descriptor.get = function () {
      return baseGetter.apply(this) || mixinGetter.apply(this);
    };
  }
  if (mixinSetter && baseSetter) {
    // Compose setters.
    descriptor.set = composeFunction(baseSetter, mixinSetter);
  }
  completePropertyDefinition(descriptor, baseDescriptor);
}

/*
 * Like preferMixinResult, but for getter/setters. The mixin getter is invoked
 * first. If it returns a truthy result, that is returned. Otherwise, the base
 * getter's result is returned. Setter is still invoked base first, then mixin.
 */
function preferMixinGetter(target, key, descriptor) {
  var mixinGetter = descriptor.get;
  var mixinSetter = descriptor.set;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseGetter = baseDescriptor.get;
  var baseSetter = baseDescriptor.set;
  if (mixinGetter && baseGetter) {
    // Compose getters.
    descriptor.get = function () {
      return mixinGetter.apply(this) || baseGetter.apply(this);
    };
  }
  if (mixinSetter && baseSetter) {
    // Compose setters.
    descriptor.set = composeFunction(baseSetter, mixinSetter);
  }
  completePropertyDefinition(descriptor, baseDescriptor);
}

/*
 * Compose methods, invoking mixin implementation first. If it returns a truthy
 * result, that is returned immediately. Otherwise, the base implementation's
 * result is returned.
 */
function preferMixinResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseImplementation = baseDescriptor.value;
  descriptor.value = function () {
    return mixinImplementation.apply(this, arguments) || baseImplementation.apply(this, arguments);
  };
}

/*
 * Default rule for composing methods: invoke base first, then mixin.
 */
function baseMethodFirst(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseImplementation = baseDescriptor.value;
  descriptor.value = composeFunction(baseImplementation, mixinImplementation);
}

/*
 * Default rule for composing properties.
 * We only compose setters, which invoke base first, then mixin.
 * A defined mixin getter overrides a base getter.
 * Note that, because of the way property descriptors work, if the mixin only
 * defines a setter, but not a getter, we have to supply a default getter that
 * invokes the base getter. Similarly, if the mixin just defines a getter,
 * we have to supply a default setter.
 */
function baseSetterFirst(target, key, descriptor) {
  var mixinSetter = descriptor.set;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseSetter = baseDescriptor.set;
  if (mixinSetter && baseSetter) {
    // Compose setters.
    descriptor.set = composeFunction(baseSetter, mixinSetter);
  }
  completePropertyDefinition(descriptor, baseDescriptor);
}

},{}],27:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Marshall attributes to properties (and eventually vice versa).
 */

var AttributeMarshalling = (function () {
  function AttributeMarshalling() {
    _classCallCheck(this, AttributeMarshalling);
  }

  _createClass(AttributeMarshalling, [{
    key: 'attributeChangedCallback',

    /*
     * Handle a change to the attribute with the given name.
     */
    value: function attributeChangedCallback(name, oldValue, newValue) {
      // If the attribute name corresponds to a property name, then set that
      // property. Ignore changes in standard HTMLElement properties.
      var propertyName = attributeToPropertyName(name);
      if (propertyName in this && !(propertyName in HTMLElement.prototype)) {
        this[propertyName] = newValue;
      }
    }
  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      [].forEach.call(this.attributes, function (attribute) {
        _this.attributeChangedCallback(attribute.name, undefined, attribute.value);
      });
    }
  }]);

  return AttributeMarshalling;
})();

// Convert camel case fooBar name to hyphenated foo-bar.

exports.default = AttributeMarshalling;
function attributeToPropertyName(attributeName) {
  var propertyName = attributeName.replace(/-([a-z])/g, function (m) {
    return m[1].toUpperCase();
  });
  return propertyName;
}

// Convert hyphenated foo-bar name to camel case fooBar.
function propertyToAttributeName(propertyName) {
  var attributeName = propertyName.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + '-' + g[1].toLowerCase();
  });
  return attributeName;
}

},{}],28:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Polymer-style automatic node finding.
 * See https://www.polymer-project.org/1.0/docs/devguide/local-dom.html#node-finding.
 */

var AutomaticNodeFinding = (function () {
  function AutomaticNodeFinding() {
    _classCallCheck(this, AutomaticNodeFinding);
  }

  _createClass(AutomaticNodeFinding, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      if (this.shadowRoot) {
        this.$ = {};
        var nodesWithIds = this.shadowRoot.querySelectorAll('[id]');
        [].forEach.call(nodesWithIds, function (node) {
          var id = node.getAttribute('id');
          _this.$[id] = node;
        });
      }
    }
  }]);

  return AutomaticNodeFinding;
})();

exports.default = AutomaticNodeFinding;

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We use Composable to add *itself* to a HTMLElement subclass.
// The result is an HTMLElement with .compose() support.
exports.default = _Composable2.default.compose.call(HTMLElement, _Composable2.default); /*
                                                                                         * A composable HTML element.
                                                                                         *
                                                                                         * This class is provided just as a convenience. One could also start with
                                                                                         * HTMLElement at the top level, and add extensibility by mixing in Composable.
                                                                                         */

},{"Composable/src/Composable":25}],30:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComposableElement = require('./ComposableElement');

var _ComposableElement2 = _interopRequireDefault(_ComposableElement);

var _TemplateStamping = require('./TemplateStamping');

var _TemplateStamping2 = _interopRequireDefault(_TemplateStamping);

var _AutomaticNodeFinding = require('./AutomaticNodeFinding');

var _AutomaticNodeFinding2 = _interopRequireDefault(_AutomaticNodeFinding);

var _AttributeMarshalling = require('./AttributeMarshalling');

var _AttributeMarshalling2 = _interopRequireDefault(_AttributeMarshalling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A sample general-purpose base class for defining custom elements that mixes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in some common features: template stamping into a shadow root, automatic node
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * finding, and marshalling between attributes and properties.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ElementBase = (function (_ComposableElement$co) {
  _inherits(ElementBase, _ComposableElement$co);

  function ElementBase() {
    _classCallCheck(this, ElementBase);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ElementBase).apply(this, arguments));
  }

  _createClass(ElementBase, [{
    key: 'log',

    /*
     * Debugging utility: logs a message, prefixed by the component's tag.
     */
    value: function log(text) {
      console.log(this.localName + ': ' + text);
    }
  }]);

  return ElementBase;
})(_ComposableElement2.default.compose(_TemplateStamping2.default, // before node finding, so shadow root is populated
_AutomaticNodeFinding2.default, // before marshalling, so marshalled properties can use it
_AttributeMarshalling2.default));

exports.default = ElementBase;

},{"./AttributeMarshalling":27,"./AutomaticNodeFinding":28,"./ComposableElement":29,"./TemplateStamping":31}],31:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Element extension for template stamping. If a component defines a template
 * property (as a string or referencing a HTML template), when the component
 * class is instantiated, a shadow root will be created on the instance, and
 * the contents of the template will be cloned into the shadow root.
 *
 * For the time being, this extension retains support for Shadow DOM v0.
 * That will eventually be deprecated as browsers implement Shadow DOM v1.
 */

var TemplateStamping = (function () {
  function TemplateStamping() {
    _classCallCheck(this, TemplateStamping);
  }

  _createClass(TemplateStamping, [{
    key: 'createdCallback',

    /*
     * If the component defines a template, a shadow root will be created on the
     * component instance, and the template stamped into it.
     */
    value: function createdCallback() {
      var template = this.template;
      // TODO: Save the processed template with the component's class prototype
      // so it doesn't need to be processed with every instantiation.
      if (template) {

        if (typeof template === 'string') {
          // Upgrade plain string to real template.
          template = createTemplateWithInnerHTML(template);
        }

        if (USING_SHADOW_DOM_V0) {
          polyfillSlotWithContent(template);
        }

        if (window.ShadowDOMPolyfill) {
          shimTemplateStyles(template, this.localName);
        }

        // this.log("cloning template into shadow root");
        var root = USING_SHADOW_DOM_V0 ? this.createShadowRoot() : // Shadow DOM v0
        this.attachShadow({ mode: 'open' }); // Shadow DOM v1
        var clone = document.importNode(template.content, true);
        root.appendChild(clone);
      }
    }
  }]);

  return TemplateStamping;
})();

// Feature detection for old Shadow DOM v0.

exports.default = TemplateStamping;
var USING_SHADOW_DOM_V0 = typeof HTMLElement.prototype.createShadowRoot !== 'undefined';

// Convert a plain string of HTML into a real template element.
function createTemplateWithInnerHTML(innerHTML) {
  var template = document.createElement('template');
  // REVIEW: Is there an easier way to do this?
  // We'd like to just set innerHTML on the template content, but since it's
  // a DocumentFragment, that doesn't work.
  var div = document.createElement('div');
  div.innerHTML = innerHTML;
  while (div.childNodes.length > 0) {
    template.content.appendChild(div.childNodes[0]);
  }
  return template;
}

// Replace occurences of v1 slot elements with v0 content elements.
// This does not yet map named slots to content select clauses.
function polyfillSlotWithContent(template) {
  [].forEach.call(template.content.querySelectorAll('slot'), function (slotElement) {
    var contentElement = document.createElement('content');
    slotElement.parentNode.replaceChild(contentElement, slotElement);
  });
}

// Invoke basic style shimming with ShadowCSS.
function shimTemplateStyles(template, tag) {
  WebComponents.ShadowCSS.shimStyling(template.content, tag);
}

},{}]},{},[1,2,3,4,5,6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL0Fycm93RGlyZWN0aW9uL0Fycm93RGlyZWN0aW9uLmpzIiwiY29tcG9uZW50cy9DYXJvdXNlbC9DYXJvdXNlbC5qcyIsImNvbXBvbmVudHMvTGlzdEJveC9MaXN0Qm94LmpzIiwiY29tcG9uZW50cy9QYWdlRG90cy9QYWdlRG90cy5qcyIsImNvbXBvbmVudHMvU2xpZGluZ1ZpZXdwb3J0L1NsaWRpbmdWaWV3cG9ydC5qcyIsImNvbXBvbmVudHMvU3ByZWFkSXRlbXMvU3ByZWFkSXRlbXMuanMiLCJtaXhpbnMvQ2hpbGRyZW5Db250ZW50LmpzIiwibWl4aW5zL0NsaWNrU2VsZWN0aW9uLmpzIiwibWl4aW5zL0NvbGxlY3RpdmVFbGVtZW50LmpzIiwibWl4aW5zL0NvbnRlbnRGaXJzdENoaWxkVGFyZ2V0LmpzIiwibWl4aW5zL0NvbnRlbnRJdGVtcy5qcyIsIm1peGlucy9EaXJlY3Rpb25TZWxlY3Rpb24uanMiLCJtaXhpbnMvR2VuZXJpYy5qcyIsIm1peGlucy9JdGVtU2VsZWN0aW9uLmpzIiwibWl4aW5zL0l0ZW1zQWNjZXNzaWJsZS5qcyIsIm1peGlucy9LZXlib2FyZC5qcyIsIm1peGlucy9LZXlib2FyZERpcmVjdGlvbi5qcyIsIm1peGlucy9LZXlib2FyZFBhZ2luZy5qcyIsIm1peGlucy9LZXlib2FyZFByZWZpeFNlbGVjdGlvbi5qcyIsIm1peGlucy9TZWxlY3Rpb25IaWdobGlnaHQuanMiLCJtaXhpbnMvU2VsZWN0aW9uU2Nyb2xsLmpzIiwibWl4aW5zL1N3aXBlRGlyZWN0aW9uLmpzIiwibWl4aW5zL1RhcmdldFNlbGVjdGlvbi5qcyIsIm1peGlucy9UcmFja3BhZERpcmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9Db21wb3NhYmxlL3NyYy9Db21wb3NhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0NvbXBvc2FibGUvc3JjL0NvbXBvc2l0aW9uUnVsZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1jb21wb25lbnQtbWl4aW5zL3NyYy9BdHRyaWJ1dGVNYXJzaGFsbGluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWNvbXBvbmVudC1taXhpbnMvc3JjL0F1dG9tYXRpY05vZGVGaW5kaW5nLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtY29tcG9uZW50LW1peGlucy9zcmMvQ29tcG9zYWJsZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1jb21wb25lbnQtbWl4aW5zL3NyYy9FbGVtZW50QmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWNvbXBvbmVudC1taXhpbnMvc3JjL1RlbXBsYXRlU3RhbXBpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJ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RUFBQSxvQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBLENBQUEsT0FBQSxFQUFBLGVBQUEsQ0FBQSxPQUFBLEVBQUEsaUJBQUEsQ0FBQSxPQUFBLEVBUTVCLFFBQVEsQ0FDVCxDQUFDOztBQUdGLFFBQVEsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7OztBQzlMdEQsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHOzs7Ozs7Ozs7Ozs7QUFBQyxBQVl0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOztBQUVwRSxJQUFJLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFekQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7O0FBRXpELElBQUksYUFBYSxHQUFHLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUV6RCxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRS9GLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOztBQUV6SixJQWZxQixlQUFlLEdBQUEsQ0FBQSxZQUFBO0FBZ0JsQyxXQWhCbUIsZUFBZSxHQUFBO0FBaUJoQyxtQkFBZSxDQUFDLElBQUksRUFqQkgsZUFBZSxDQUFBLENBQUE7R0FrQmpDOztBQUVELGNBQVksQ0FwQk8sZUFBZSxFQUFBLENBQUE7QUFxQmhDLE9BQUcsRUFBRSxrQkFBa0I7QUFDdkIsU0FBSyxFQUFFLFNBQVMsZ0JBQWdCLEdBcEJmO0FBQ2pCLFVBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmO0dBcUJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLFNBQUssRUFBRSxTQUFTLGVBQWUsR0FyQmY7QUFDaEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNyQyxVQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUNuQjtHQXNCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFFBQVE7QUFDYixTQUFLLEVBQUUsU0FBUyxNQUFNLEdBZGY7QUFDUCwyQkFBcUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEdBNkJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsQ0FZakIsSUFBSSxFQUFFO0FBQ25CLFVBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9DO0dBWEEsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQTlDTDtBQUNaLGFBQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7S0FDeEM7R0ErQ0EsRUFBRTtBQUNELE9BQUcsRUFBRSxPQUFPO0FBQ1osT0FBRyxFQUFFLFNBQVMsR0FBRyxHQS9DUDtBQUNWLGFBQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7S0FDdEM7R0FnREEsRUFBRTtBQUNELE9BQUcsRUFBRSxVQUFVO0FBQ2YsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQWhDSjtBQUNiLGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2QjtBQWlDQyxPQUFHLEVBQUUsU0FBUyxHQUFHLENBL0JOLFFBQVEsRUFBRTtBQUNyQixVQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUMxQixVQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjtHQWdDQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGVBQWU7QUFDcEIsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQWhDQztBQUNsQixVQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLFVBQUksS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN0RCxhQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNwQjtBQWlDQyxPQUFHLEVBQUUsU0FBUyxHQUFHLENBaENELEtBQUssRUFBRTtBQUN2QixVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsVUFBSSxJQUFJLEVBQUU7QUFDUixZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztPQUMxQjtLQUNGO0dBaUNBLEVBQUU7QUFDRCxPQUFHLEVBQUUsY0FBYztBQUNuQixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBakNBO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjtBQWtDQyxPQUFHLEVBQUUsU0FBUyxHQUFHLENBakNGLElBQUksRUFBRTtBQUNyQixVQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUMxQixVQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjtHQWtDQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFVBQVU7QUFDZixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBOUJKO0FBQ2IsYUFBQSwrckJBQUEsQ0E0QkU7S0FDSDtHQUdBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBdkdtQixlQUFlLENBQUE7Q0F3R25DLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBMUdNLGVBQWUsQ0FBQTs7QUF1R3BDLFNBQVMsZUFBZSxHQUFHOztBQUV6QixNQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzVDLE1BQUksQ0FBQyxLQUFLLEVBQUU7O0FBRVYsV0FBTztHQUNSOztBQUVELE1BQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDL0IsTUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFOzs7QUFHYixTQUFLLEdBQUcsQ0FBQyxDQUFDO0dBQ1g7O0FBRUQsTUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7QUFDbEMsTUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixNQUFJLEtBQUssS0FBSyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTs7QUFFL0Isb0JBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUN4QyxNQUFNLElBQUksS0FBSyxLQUFLLEtBQUssR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTs7QUFFOUMsb0JBQWdCLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0dBQ3RDLE1BQU07O0FBRUwsb0JBQWdCLEdBQUcsUUFBUSxDQUFDO0dBQzdCO0FBQ0QsTUFBSSxlQUFlLEdBQUcsS0FBSyxHQUFHLGdCQUFnQjs7O0FBQUEsQUFBQyxNQUczQyxJQUFJLEdBQUcsQ0FBQyxlQUFlLEdBQUcsR0FBRzs7QUFBQSxBQUFDLE1BRTlCLFNBQVMsR0FBRyxhQUFhLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztBQUM1QyxNQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQzFELE1BQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Q0FDckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FrQlEsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUNsQixNQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUssQ0FBQyxDQUFDO0FBQzNCLFNBQU8sQ0FBQyxDQUFDO0NBQ1Y7O0FBR0QsZUFBZSxHQUFHLGFBQUEsQ0FBQSxPQUFBLENBQVksT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUV2RCxRQUFRLENBQUMsZUFBZSxDQUFDLHdCQUF3QixFQUFFLGVBQWUsQ0FBQyxDQUFDOzs7QUNuTHBFLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRzs7Ozs7Ozs7OztBQUFDLEFBVXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7O0FBRXBFLElBQUksYUFBYSxHQUFHLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUV6RCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOztBQUUvRCxJQUFJLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRWpFLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsU0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFL0YsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7O0FBRXpKLElBZnFCLFdBQVcsR0FBQSxDQUFBLFlBQUE7QUFnQjlCLFdBaEJtQixXQUFXLEdBQUE7QUFpQjVCLG1CQUFlLENBQUMsSUFBSSxFQWpCSCxXQUFXLENBQUEsQ0FBQTtHQWtCN0I7O0FBRUQsY0FBWSxDQXBCTyxXQUFXLEVBQUEsQ0FBQTtBQXFCNUIsT0FBRyxFQUFFLGtCQUFrQjtBQUN2QixTQUFLLEVBQUUsU0FBUyxnQkFBZ0IsR0FwQmY7O0FBRWpCLFVBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjtHQXFCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGNBQWM7QUFDbkIsU0FBSyxFQUFFLFNBQVMsWUFBWSxHQWpCZjtBQUNiLFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkIsVUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUN6QixVQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQU0sR0FBRyxHQUFHLEdBQUksR0FBRyxDQUFDO0FBQ3pELFVBQUksU0FBUyxHQUFHLEdBQUksR0FBRyxLQUFLLEdBQUksR0FBRyxDQUFDO0FBQ3BDLFFBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFBLElBQUksRUFBSTtBQUM3QixZQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7T0FDOUIsQ0FBQyxDQUFDO0tBQ0o7R0FrQkEsRUFBRTtBQUNELE9BQUcsRUFBRSxPQUFPO0FBQ1osT0FBRyxFQUFFLFNBQVMsR0FBRyxHQWhDUDtBQUNWLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtHQWlDQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFVBQVU7QUFDZixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBdkJKO0FBQ2IsYUFBQSx3bEJBQUEsQ0EyQkU7S0FDSDtHQUhBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBakRtQixXQUFXLENBQUE7Q0FrRC9CLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBcERNLFdBQVcsQ0FBQTs7QUFzRGhDLFdBQVcsR0FBRyxhQUFBLENBQUEsT0FBQSxDQUFZLE9BQU8sQ0FBQSxpQkFBQSxDQUFBLE9BQUEsRUFBa0IsV0FBVyxDQUFDLENBQUM7O0FBRWhFLFFBQVEsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLENBQUM7OztBQ3JFNUQsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxNQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsT0FBTyxJQUFJLENBQUM7R0FBRSxNQUFNO0FBQUUsV0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7QUFFL0wsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUFFLE1BQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQUUsV0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQUUsTUFBTTtBQUFFLFdBQU8sSUFBSSxZQUFZLEtBQUssQ0FBQztHQUFFO0NBQUU7O0FBRXhLLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7Ozs7QUFBQSxBQVl6SixJQWRxQixlQUFlLEdBQUEsQ0FBQSxZQUFBO0FBZWxDLFdBZm1CLGVBQWUsR0FBQTtBQWdCaEMsbUJBQWUsQ0FBQyxJQUFJLEVBaEJILGVBQWUsQ0FBQSxDQUFBO0dBaUJqQzs7QUFFRCxjQUFZLENBbkJPLGVBQWUsRUFBQSxDQUFBO0FBb0JoQyxPQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLFNBQUssRUFBRSxTQUFTLGVBQWUsR0FuQmY7QUFvQmQsVUFBSSxLQUFLLEdBQUcsSUFBSTs7Ozs7QUFoQmxCLEFBZ0JtQixnQkFoQlQsQ0FBQyxZQUFBO0FBc0JQLGVBdEJhLEtBQUEsQ0FBSyxjQUFjLEVBQUUsQ0FBQTtPQUFBLENBQUMsQ0FBQztLQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxHQW1FQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVBQUUsU0FBUyxjQUFjLEdBekJmO0FBQ2YsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ3ZDLFVBQUksU0FBUyxFQUFFO0FBQ2IsWUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEVBQUU7QUFDN0MsaUJBQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0FBQ0gsaUJBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDaEM7S0FDRjs7Ozs7Ozs7O0FBQUEsR0FrQ0EsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQTVCTDtBQUNaLGFBQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO0dBNkJBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBcEdtQixlQUFlLENBQUE7Q0FxR25DLENBQUEsRUFBRzs7Ozs7Ozs7Ozs7O0FBQUMsQUFZTCxPQUFPLENBQUMsT0FBTyxHQWpITSxlQUFlLENBQUE7QUFtRnBDLFNBQVMscUJBQXFCLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFO0FBZ0N0RCxNQUFJLElBQUksQ0FBQzs7QUEvQlQsTUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFBLElBQUksRUFBSTs7Ozs7QUFLckQsUUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFOztBQUVsRCxVQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQ2xELGFBQU8sZ0JBQWdCLEdBQ3JCLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLEdBQ3pELEVBQUUsQ0FBQztLQUNOLE1BQU0sSUFBQSxXQUFBLENBQUksSUFBSSxFQUFZLFdBQVcsQ0FBQSxFQUFFOztBQUV0QyxhQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDZixNQUFNLElBQUksV0FBQSxDQUFBLElBQUksRUFBWSxJQUFJLENBQUEsSUFBSSxnQkFBZ0IsRUFBRTs7QUFFbkQsYUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2YsTUFBTTs7QUFFTCxhQUFPLEVBQUUsQ0FBQztLQUNYO0dBQ0YsQ0FBQyxDQUFDO0FBQ0gsTUFBSSxTQUFTLEdBQUcsQ0FBQSxJQUFBLEdBQUEsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsa0JBQUEsQ0FBSSxRQUFRLENBQUEsQ0FBQyxDQUFDO0FBQ3ZDLFNBQU8sU0FBUyxDQUFDO0NBQ2xCOzs7QUN0SEQsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7Ozs7O0FBQUEsQUFRekosSUFWcUIsY0FBYyxHQUFBLENBQUEsWUFBQTtBQVdqQyxXQVhtQixjQUFjLEdBQUE7QUFZL0IsbUJBQWUsQ0FBQyxJQUFJLEVBWkgsY0FBYyxDQUFBLENBQUE7R0FhaEM7O0FBRUQsY0FBWSxDQWZPLGNBQWMsRUFBQSxDQUFBO0FBZ0IvQixPQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLFNBQUssRUFBRSxTQUFTLGVBQWUsR0FmZjtBQWdCZCxVQUFJLEtBQUssR0FBRyxJQUFJOzs7Ozs7Ozs7QUFSbEIsQUFRbUIsVUFSZixDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFBLEtBQUssRUFBSTtBQUMxQyxvQkFBWSxDQUFBLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O0FBQUEsQUFBQyxhQUk1QixDQUFDLGVBQWUsRUFBRSxDQUFDO09BQ3pCLENBQUMsQ0FBQztLQUNKOzs7OztBQUFBLEdBc0JBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBekNtQixjQUFjLENBQUE7Q0EwQ2xDLENBQUEsRUFBRzs7Ozs7OztBQUFDLEFBT0wsT0FBTyxDQUFDLE9BQU8sR0FqRE0sY0FBYyxDQUFBO0FBNEJuQyxTQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQ3JDLE1BQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvRCxNQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7QUFDZCxXQUFPLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztHQUMvQjtDQUNGOzs7QUN2Q0QsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7Ozs7OztBQUFBLEFBU3pKLElBVk0sVUFBVSxHQUFBLENBQUEsWUFBQTtBQUVkLFdBRkksVUFBVSxDQUVGLE9BQU8sRUFBRTtBQVVuQixtQkFBZSxDQUFDLElBQUksRUFabEIsVUFBVSxDQUFBLENBQUE7O0FBR1osUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUMxQjs7QUFhRCxjQUFZLENBbEJSLFVBQVUsRUFBQSxDQUFBO0FBbUJaLE9BQUcsRUFBRSxZQUFZO0FBQ2pCLFNBQUssRUFBRSxTQUFTLFVBQVUsQ0FiakIsTUFBTSxFQUFFO0FBY2YsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQWJuQixVQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FDMUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNYLGNBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDMUIsZUFBTyxDQUFDLFVBQVUsR0FBQSxLQUFPLENBQUM7QUFDMUIsYUFBQSxDQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDOUIsQ0FBQyxDQUFDO0FBQ0gsVUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FDbEQ7R0FjQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLHdCQUF3QjtBQUM3QixTQUFLLEVBQUUsU0FBUyxzQkFBc0IsQ0FWakIsTUFBTSxFQUFXOztBQUV0QyxVQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDOztBQVkzQixXQUFLLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBZEYsSUFBSSxHQUFBLEtBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxHQUFBLENBQUEsRUFBQSxJQUFBLEdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxFQUFBO0FBQUosWUFBSSxDQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7T0FnQmpDOztBQWJILFdBQUssSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxZQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIsWUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDbkIsaUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO09BQ0Y7S0FDRjtHQWdCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFVBQVU7QUFDZixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBL0JKO0FBQ2IsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCO0dBZ0NBLEVBQUU7QUFDRCxPQUFHLEVBQUUsa0JBQWtCO0FBQ3ZCLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0FyQkk7QUFDckIsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0dBc0JBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBM0RJLFVBQVUsQ0FBQTtDQTREZixDQUFBLEVBQUc7Ozs7OztBQUFDLEFBTUwsSUF0QnFCLGlCQUFpQixHQUFBLENBQUEsWUFBQTtBQXVCcEMsV0F2Qm1CLGlCQUFpQixHQUFBO0FBd0JsQyxtQkFBZSxDQUFDLElBQUksRUF4QkgsaUJBQWlCLENBQUEsQ0FBQTtHQXlCbkM7O0FBRUQsY0FBWSxDQTNCTyxpQkFBaUIsRUFBQSxDQUFBO0FBNEJsQyxPQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLFNBQUssRUFBRSxTQUFTLGVBQWUsR0EzQmY7QUFDaEIsVUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QztHQTRCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFFBQVE7QUFDYixPQUFHLEVBQUUsU0FBUyxHQUFHLENBNUJSLE9BQU8sRUFBRTtBQUNsQixVQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQztHQTZCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXZDbUIsaUJBQWlCLENBQUE7Q0F3Q3JDLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBMUNNLGlCQUFpQixDQUFBOzs7QUNuRHRDLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7QUFBQSxBQVN6SixJQVZxQix1QkFBdUIsR0FBQSxDQUFBLFlBQUE7QUFXMUMsV0FYbUIsdUJBQXVCLEdBQUE7QUFZeEMsbUJBQWUsQ0FBQyxJQUFJLEVBWkgsdUJBQXVCLENBQUEsQ0FBQTtHQWF6Qzs7QUFFRCxjQUFZLENBZk8sdUJBQXVCLEVBQUEsQ0FBQTtBQWdCeEMsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVBQUUsU0FBUyxjQUFjLEdBZmY7QUFDZixVQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzNCLFVBQUksTUFBTSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkMsVUFBSSxNQUFNLEVBQUU7QUFDVixZQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztPQUN0QjtLQUNGO0dBZ0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsUUFBUTtBQUNiLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0FoQk47QUFDWCxhQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDckI7QUFpQkMsT0FBRyxFQUFFLFNBQVMsR0FBRyxDQWhCUixPQUFPLEVBQUU7QUFDbEIsVUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDeEI7R0FpQkEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0FsQ21CLHVCQUF1QixDQUFBO0NBbUMzQyxDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQXJDTSx1QkFBdUIsQ0FBQTs7O0FDUDVDLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7OztBQUFBLEFBV3pKLElBVnFCLFlBQVksR0FBQSxDQUFBLFlBQUE7QUFXL0IsV0FYbUIsWUFBWSxHQUFBO0FBWTdCLG1CQUFlLENBQUMsSUFBSSxFQVpILFlBQVksQ0FBQSxDQUFBO0dBYTlCOztBQUVELGNBQVksQ0FmTyxZQUFZLEVBQUEsQ0FBQTtBQWdCN0IsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVBQUUsU0FBUyxjQUFjLENBZmpCLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDN0IsVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO0dBZ0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsR0FoQmY7QUFDZixVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixVQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7Ozs7Ozs7QUFBQSxHQTBCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGFBQWE7QUFDbEIsU0FBSyxFQUFFLFNBQVMsV0FBVyxDQW5CakIsSUFBSSxFQUFFO0FBQ2hCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakM7Ozs7QUFBQSxHQXVCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFdBQVc7QUFDaEIsU0FBSyxFQUFFLFNBQVMsU0FBUyxDQXRCakIsSUFBSSxFQUFFLEVBQUU7R0F1QmpCLEVBQUU7QUFDRCxPQUFHLEVBQUUsY0FBYztBQUNuQixTQUFLLEVBQUUsU0FBUyxZQUFZLEdBdkJmO0FBd0JYLFVBQUksS0FBSyxHQUFHLElBQUk7OztBQXJCbEIsQUFxQm1CLFVBckJmLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUN6QixZQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQzFCLGVBQUEsQ0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsY0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUM5QjtPQUNGLENBQUMsQ0FBQzs7QUFFSCxVQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7Ozs7Ozs7Ozs7QUFBQSxHQWtDQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLE9BQU87QUFDWixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBM0JQO0FBQ1YsVUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtBQUN2QixZQUFJLENBQUMsTUFBTSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNyRDtBQUNELGFBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNwQjtHQTRCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQWhGbUIsWUFBWSxDQUFBO0NBaUZoQyxDQUFBLEVBQUc7Ozs7O0FBQUMsQUFLTCxPQUFPLENBQUMsT0FBTyxHQXRGTSxZQUFZLENBQUE7QUF5RGpDLFNBQVMsdUJBQXVCLENBQUMsS0FBSyxFQUFFO0FBQ3RDLE1BQUksYUFBYSxHQUFHLENBQ2xCLE1BQU0sRUFDTixRQUFRLEVBQ1IsT0FBTyxFQUNQLFVBQVUsQ0FDWCxDQUFDO0FBQ0YsU0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFDMUMsV0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3JFLENBQUMsQ0FBQztDQUNKOzs7Ozs7O0FBQUE7O0FDNUVELFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRzs7Ozs7OztBQUFDLEFBT3RqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7O0FBRXZELElBQUksWUFBWSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV2RCxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRS9GLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOztBQUV6SixJQVpxQixrQkFBa0IsR0FBQSxDQUFBLFlBQUE7QUFhckMsV0FibUIsa0JBQWtCLEdBQUE7QUFjbkMsbUJBQWUsQ0FBQyxJQUFJLEVBZEgsa0JBQWtCLENBQUEsQ0FBQTtHQWVwQzs7QUFFRCxjQUFZLENBakJPLGtCQUFrQixFQUFBLENBQUE7QUFrQm5DLE9BQUcsRUFBRSxRQUFRO0FBQ2IsU0FBSyxFQUFFLFNBQVMsTUFBTSxHQWpCZjtBQUNQLGFBQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzFCO0dBa0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsT0FBTztBQUNaLFNBQUssRUFBRSxTQUFTLEtBQUssR0FsQmY7QUFDTixhQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMxQjtHQW1CQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFFBQVE7QUFDYixTQUFLLEVBQUUsU0FBUyxNQUFNLEdBbkJmO0FBQ1AsYUFBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDOUI7R0FvQkEsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsU0FBSyxFQUFFLFNBQVMsT0FBTyxHQXBCZjtBQUNSLGFBQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzFCO0dBcUJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsU0FBUztBQUNkLFNBQUssRUFBRSxTQUFTLE9BQU8sR0FyQmY7QUFDUixhQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMzQjtHQXNCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLE1BQU07QUFDWCxTQUFLLEVBQUUsU0FBUyxJQUFJLEdBdEJmO0FBQ0wsYUFBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDOUI7Ozs7QUFBQSxHQTBCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGFBQWE7QUFDbEIsU0FBSyxFQUFFLFNBQVMsV0FBVyxHQXpCZixFQUFFO0dBMEJmLEVBQUU7QUFDRCxPQUFHLEVBQUUsWUFBWTtBQUNqQixTQUFLLEVBQUUsU0FBUyxVQUFVLEdBM0JmLEVBQUU7R0E0QmQsRUFBRTtBQUNELE9BQUcsRUFBRSxZQUFZO0FBQ2pCLFNBQUssRUFBRSxTQUFTLFVBQVUsR0E3QmYsRUFBRTtHQThCZCxFQUFFO0FBQ0QsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVBQUUsU0FBUyxjQUFjLEdBL0JmLEVBQUU7R0FnQ2xCLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBaEVtQixrQkFBa0IsQ0FBQTtDQWlFdEMsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLE9BQU8sR0FuRU0sa0JBQWtCLENBQUE7O0FBaUN2QyxZQUFBLENBQUEsT0FBQSxDQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFO0FBQ3JELGFBQVcsRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUMvRCxZQUFVLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7QUFDOUQsWUFBVSxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQzlELGdCQUFjLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Q0FDbkUsQ0FBQyxDQUFDOzs7QUMvQ0gsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUE2QnpKLElBVnFCLE9BQU8sR0FBQSxDQUFBLFlBQUE7QUFXMUIsV0FYbUIsT0FBTyxHQUFBO0FBWXhCLG1CQUFlLENBQUMsSUFBSSxFQVpILE9BQU8sQ0FBQSxDQUFBO0dBYXpCOztBQUVELGNBQVksQ0FmTyxPQUFPLEVBQUEsQ0FBQTtBQWdCeEIsT0FBRyxFQUFFLGlCQUFpQjtBQUN0QixTQUFLLEVBQUUsU0FBUyxlQUFlLEdBZmY7QUFDaEIsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQztLQUNyRDs7Ozs7Ozs7Ozs7Ozs7QUFBQSxHQTZCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFNBQVM7QUFDZCxPQUFHLEVBQUUsU0FBUyxHQUFHLEdBbEJMO0FBQ1osYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7OztBQUFBLE1BdUJDLEdBQUcsRUFBRSxTQUFTLEdBQUcsQ0FuQlAsS0FBSyxFQUFFO0FBQ2pCLFVBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQzdCLGFBQUssR0FBSSxLQUFLLEtBQUssT0FBTyxDQUFFO09BQzdCO0FBQ0QsVUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsVUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFOztBQUVuQixZQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztPQUN2QyxNQUFNLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTs7QUFFeEIsWUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUNqQyxNQUFNOztBQUVMLFlBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO09BQ2xDO0tBQ0Y7R0FvQkEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0E1RG1CLE9BQU8sQ0FBQTtDQTZEM0IsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLE9BQU8sR0EvRE0sT0FBTyxDQUFBO0FBd0MzQixDQUFDOzs7QUNuRUYsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUF1QnpKLElBVHFCLGFBQWEsR0FBQSxDQUFBLFlBQUE7QUFVaEMsV0FWbUIsYUFBYSxHQUFBO0FBVzlCLG1CQUFlLENBQUMsSUFBSSxFQVhILGFBQWEsQ0FBQSxDQUFBO0dBWS9COztBQUVELGNBQVksQ0FkTyxhQUFhLEVBQUEsQ0FBQTtBQWU5QixPQUFHLEVBQUUsZ0JBQWdCOzs7QUFHckIsU0FBSyxFQUFFLFNBQVMsY0FBYyxDQWZqQixJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7R0FnQmhDLEVBQUU7QUFDRCxPQUFHLEVBQUUsV0FBVztBQUNoQixTQUFLLEVBQUUsU0FBUyxTQUFTLENBRmpCLElBQUksRUFBRTtBQUNkLFVBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdkQ7R0FHQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGNBQWM7QUFDbkIsU0FBSyxFQUFFLFNBQVMsWUFBWSxHQUhmO0FBQ2IsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xELFVBQUksS0FBSyxHQUFHLENBQUMsRUFBRTs7QUFFYixZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUN6QixZQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTs7O0FBRzFCLG9CQUFVLENBQUMsQ0FBQSxZQUFXO0FBQ3BCLDJCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDdkIsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7T0FDRjs7O0FBQUEsK0JBR3dCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3hDOzs7Ozs7Ozs7O0FBQUEsR0FhQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGFBQWE7Ozs7Ozs7QUFPbEIsU0FBSyxFQUFFLFNBQVMsV0FBVyxHQXlFZjtBQUNaLGFBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3Qjs7Ozs7Ozs7O0FBQUEsR0FoRUEsRUFBRTtBQUNELE9BQUcsRUFBRSxZQUFZOzs7Ozs7O0FBT2pCLFNBQUssRUFBRSxTQUFTLFVBQVUsR0E2RWY7QUFDWCxhQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDakQ7Ozs7Ozs7O0FBQUEsR0FyRUEsRUFBRTtBQUNELE9BQUcsRUFBRSxZQUFZO0FBQ2pCLFNBQUssRUFBRSxTQUFTLFVBQVUsR0EwRWY7QUFDWCxhQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNsRDs7Ozs7Ozs7QUFBQSxHQWxFQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVBQUUsU0FBUyxjQUFjLEdBdUVmO0FBQ2YsYUFBTyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDbEQ7R0F0RUEsRUFBRTtBQUNELE9BQUcsRUFBRSxlQUFlO0FBQ3BCLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0F2R0M7QUFDbEIsYUFBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQzVCO0FBd0dDLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0F2R0QsYUFBYSxFQUFFO0FBQy9CLFVBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQ3JDO0dBd0dBLEVBQUU7QUFDRCxPQUFHLEVBQUUsbUJBQW1CO0FBQ3hCLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0F4R0s7QUFDdEIsYUFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7S0FDaEM7QUF5R0MsT0FBRyxFQUFFLFNBQVMsR0FBRyxDQXhHRyxpQkFBaUIsRUFBRTtBQUN2QyxVQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7S0FDN0M7R0F5R0EsRUFBRTtBQUNELE9BQUcsRUFBRSxlQUFlO0FBQ3BCLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0E1RUM7QUFDbEIsVUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFckMsVUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO0FBQ3hCLGVBQU8sQ0FBQyxDQUFDLENBQUM7T0FDWDs7O0FBQUEsVUFHRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7Ozs7O0FBQUEsQUFBQyxhQUtwQyxLQUFLLENBQUM7S0FDZDtBQTZFQyxPQUFHLEVBQUUsU0FBUyxHQUFHLENBM0VELEtBQUssRUFBRTtBQUN2QixVQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLFVBQUksSUFBSSxHQUFBLFNBQUEsQ0FBQztBQUNULFVBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNuQyxZQUFJLEdBQUcsSUFBSSxDQUFDO09BQ2IsTUFBTTtBQUNMLFlBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDckI7QUFDRCxVQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7QUFFekIsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ3ZDLFVBQUksU0FBUyxFQUFFO0FBQ2IsWUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsd0JBQXdCLEVBQUU7QUFDcEQsaUJBQU8sRUFBRSxJQUFJO0FBQ2IsZ0JBQU0sRUFBRTtBQUNOLHlCQUFhLEVBQUUsS0FBSztBQUNwQixpQkFBSyxFQUFFLEtBQUs7QUFBQSxXQUNiO1NBQ0YsQ0FBQyxDQUFDO0FBQ0gsaUJBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDaEM7S0FDRjtHQTRFQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGNBQWM7QUFDbkIsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQTVFQTtBQUNqQixhQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDM0I7Ozs7Ozs7Ozs7QUFBQSxNQXNGQyxHQUFHLEVBQUUsU0FBUyxHQUFHLENBN0VGLElBQUksRUFBRTtBQUNyQixVQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQ3RDLFVBQUksWUFBWSxFQUFFOztBQUVoQixZQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztPQUMxQztBQUNELFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFVBQUksSUFBSSxFQUFFO0FBQ1IsWUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDakM7Ozs7QUFBQSxVQUlHLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLCtCQUF5QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzs7QUFFdkMsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ3ZDLFVBQUksU0FBUyxFQUFFO0FBQ2IsWUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsdUJBQXVCLEVBQUU7QUFDbkQsaUJBQU8sRUFBRSxJQUFJO0FBQ2IsZ0JBQU0sRUFBRTtBQUNOLHdCQUFZLEVBQUUsSUFBSTtBQUNsQix3QkFBWSxFQUFFLFlBQVk7QUFDMUIsaUJBQUssRUFBRSxJQUFJO0FBQUEsV0FDWjtTQUNGLENBQUMsQ0FBQztBQUNILGlCQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2hDO0tBQ0Y7R0E4RUEsRUFBRTtBQUNELE9BQUcsRUFBRSxtQkFBbUI7QUFDeEIsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQS9ESztBQUN0QixhQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztLQUNoQztBQWdFQyxPQUFHLEVBQUUsU0FBUyxHQUFHLENBL0RHLGlCQUFpQixFQUFFO0FBQ3ZDLFVBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUM1QyxxQkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0dBZ0VBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBdk5tQixhQUFhLENBQUE7Q0F3TmpDLENBQUEsRUFBRzs7Ozs7O0FBQUMsQUFNTCxPQUFPLENBQUMsT0FBTyxHQTlOTSxhQUFhLENBQUE7QUF3TGxDLFNBQVMsZUFBZSxDQUFDLE9BQU8sRUFBRTtBQUNoQyxNQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN0RSxXQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztHQUMzQjtDQUNGOzs7O0FBQUEsU0FJUSxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNuQyxNQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFFLE1BQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDMUMsTUFBSSxhQUFhLEtBQUssWUFBWSxFQUFFO0FBQ2xDLFdBQU8sQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO0FBQ3JDLFdBQU8sSUFBSSxDQUFDO0dBQ2IsTUFBTTtBQUNMLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7Q0FDRjs7OztBQUFBLFNBSVEseUJBQXlCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNqRCxNQUFJLGFBQWEsR0FBQSxTQUFBLENBQUM7QUFDbEIsTUFBSSxpQkFBaUIsR0FBQSxTQUFBLENBQUM7QUFDdEIsTUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMxQixNQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdkMsaUJBQWEsR0FBRyxLQUFLLENBQUM7QUFDdEIscUJBQWlCLEdBQUcsS0FBSyxDQUFDO0dBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7O0FBRzdCLGlCQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLHFCQUFpQixHQUFHLElBQUksQ0FBQztHQUMxQixNQUFNOztBQUVMLHFCQUFpQixHQUFJLEtBQUssR0FBRyxDQUFDLENBQUU7QUFDaEMsaUJBQWEsR0FBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUU7R0FDNUM7QUFDRCxTQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxTQUFPLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7Q0FDL0M7OztBQ3RQRCxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7Ozs7Ozs7O0FBRHpKLEFBQ3lKLElBRHJKLE9BQU8sR0FBRyxDQUFDLENBQUM7O0FBWWhCLElBVnFCLGVBQWUsR0FBQSxDQUFBLFlBQUE7QUFXbEMsV0FYbUIsZUFBZSxHQUFBO0FBWWhDLG1CQUFlLENBQUMsSUFBSSxFQVpILGVBQWUsQ0FBQSxDQUFBO0dBYWpDOztBQUVELGNBQVksQ0FmTyxlQUFlLEVBQUEsQ0FBQTtBQWdCaEMsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVBQUUsU0FBUyxjQUFjLENBZmpCLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDN0IsVUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0MsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxVQUFJLE1BQU0sRUFBRTtBQUNWLFlBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLENBQUM7T0FDdEU7S0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsR0FzREEsRUFBRTtBQUNELE9BQUcsRUFBRSxpQkFBaUI7QUFDdEIsU0FBSyxFQUFFLFNBQVMsZUFBZSxHQWpCZjtBQUNoQixVQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBQyxVQWNqQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSxJQUFJLENBQUUsQ0FBQztBQUMxQyxVQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsR0FDdkIsR0FBRyxHQUFHLFNBQVMsR0FBRyxRQUFRLEdBQzFCLFNBQVMsQ0FBQztLQUNmO0dBZ0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsV0FBVztBQUNoQixTQUFLLEVBQUUsU0FBUyxTQUFTLENBaEJqQixJQUFJLEVBQUU7QUFDZCxVQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7Ozs7QUFBQSxBQUFDLFVBSWhDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM1QixZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7T0FDdEQ7S0FDRjtHQWlCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGNBQWM7QUFDbkIsT0FBRyxFQUFFLFNBQVMsR0FBRyxDQWpCRixJQUFJLEVBQUU7O0FBRXJCLFVBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUNoQixZQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUM7T0FDL0M7S0FDRjtHQWtCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXZHbUIsZUFBZSxDQUFBO0NBd0duQyxDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQTFHTSxlQUFlLENBQUE7OztBQ1RwQyxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7Ozs7Ozs7Ozs7QUFBQSxBQVd6SixJQVZxQixRQUFRLEdBQUEsQ0FBQSxZQUFBO0FBVzNCLFdBWG1CLFFBQVEsR0FBQTtBQVl6QixtQkFBZSxDQUFDLElBQUksRUFaSCxRQUFRLENBQUEsQ0FBQTtHQWExQjs7QUFFRCxjQUFZLENBZk8sUUFBUSxFQUFBLENBQUE7QUFnQnpCLE9BQUcsRUFBRSxTQUFTOzs7QUFHZCxTQUFLLEVBQUUsU0FBUyxPQUFPLENBaEJqQixLQUFLLEVBQUUsRUFBRTs7Ozs7Ozs7O0FBQUEsR0F5QmhCLEVBQUU7QUFDRCxPQUFHLEVBQUUsbUJBQW1CO0FBQ3hCLFNBQUssRUFBRSxTQUFTLGlCQUFpQixHQW5CZjtBQUNsQixVQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO0FBQzdDLFlBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QixpQ0FBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtPQUNGLE1BQU07QUFDTCxZQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVCLGdDQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO09BQ0Y7S0FDRjtHQW9CQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQTNDbUIsUUFBUSxDQUFBO0NBNEM1QixDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQTlDTSxRQUFRLENBQUE7O0FBMEI3QixTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Ozs7QUFJdEIsTUFBSSxPQUFPLEdBQUEsU0FBQSxDQUFDO0FBQ1osTUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDeEMsT0FBSyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdDLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixXQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFFBQUksT0FBTyxFQUFFO0FBQ1gsWUFBTTtLQUNQO0dBQ0Y7O0FBRUQsTUFBSSxPQUFPLEVBQUU7QUFDWCxTQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsU0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0dBQ3pCO0NBQ0Y7O0FBR0QsU0FBUyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7QUFDbkMsU0FBTyxPQUFPLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDO0NBQ3pDOztBQUdELFNBQVMsdUJBQXVCLENBQUMsT0FBTyxFQUFFO0FBQ3hDLFNBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELFNBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsTUFBSSxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtBQUN4QixXQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUNyQztDQUNGOztBQUdELFNBQVMsc0JBQXNCLENBQUMsT0FBTyxFQUFFO0FBQ3ZDLFNBQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0QyxTQUFPLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pFLFNBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDaEMsU0FBTyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNyQzs7O0FDM0VELFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRzs7Ozs7OztBQUFDLEFBT3RqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7O0FBRXZELElBQUksWUFBWSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV2RCxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRS9GLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOztBQUV6SixJQVpxQixpQkFBaUIsR0FBQSxDQUFBLFlBQUE7QUFhcEMsV0FibUIsaUJBQWlCLEdBQUE7QUFjbEMsbUJBQWUsQ0FBQyxJQUFJLEVBZEgsaUJBQWlCLENBQUEsQ0FBQTtHQWVuQzs7QUFFRCxjQUFZLENBakJPLGlCQUFpQixFQUFBLENBQUE7QUFrQmxDLE9BQUcsRUFBRSxRQUFROzs7QUFHYixTQUFLLEVBQUUsU0FBUyxNQUFNLEdBbEJmLEVBQUU7R0FtQlYsRUFBRTtBQUNELE9BQUcsRUFBRSxPQUFPO0FBQ1osU0FBSyxFQUFFLFNBQVMsS0FBSyxHQXBCZixFQUFFO0dBcUJULEVBQUU7QUFDRCxPQUFHLEVBQUUsUUFBUTtBQUNiLFNBQUssRUFBRSxTQUFTLE1BQU0sR0F0QmYsRUFBRTtHQXVCVixFQUFFO0FBQ0QsT0FBRyxFQUFFLFNBQVM7QUFDZCxTQUFLLEVBQUUsU0FBUyxPQUFPLEdBeEJmLEVBQUU7R0F5QlgsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsU0FBSyxFQUFFLFNBQVMsT0FBTyxHQTFCZixFQUFFO0dBMkJYLEVBQUU7QUFDRCxPQUFHLEVBQUUsTUFBTTtBQUNYLFNBQUssRUFBRSxTQUFTLElBQUksR0E1QmYsRUFBRTtHQTZCUixFQUFFO0FBQ0QsT0FBRyxFQUFFLFNBQVM7QUFDZCxTQUFLLEVBQUUsU0FBUyxPQUFPLENBN0JqQixLQUFLLEVBQUU7QUFDYixVQUFJLE9BQU8sR0FBQSxTQUFBLENBQUM7QUFDWixjQUFRLEtBQUssQ0FBQyxPQUFPO0FBQ25CLGFBQUssRUFBRTs7QUFDTCxpQkFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QixnQkFBTTtBQUFBLGFBQ0gsRUFBRTs7QUFDTCxpQkFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixnQkFBTTtBQUFBLGFBQ0gsRUFBRTs7QUFDTCxpQkFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN4QixnQkFBTTtBQUFBLGFBQ0gsRUFBRTs7QUFDTCxpQkFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN0RCxnQkFBTTtBQUFBLGFBQ0gsRUFBRTs7QUFDTCxpQkFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixnQkFBTTtBQUFBLGFBQ0gsRUFBRTs7QUFDTCxpQkFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN0RCxnQkFBTTtBQUFBLE9BQ1Q7QUFDRCxhQUFPLE9BQU8sQ0FBQztLQUNoQjtHQW9DQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXZFbUIsaUJBQWlCLENBQUE7Q0F3RXJDLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBMUVNLGlCQUFpQixDQUFBOztBQW9DdEMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRTtBQUNwRCxRQUFNLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7QUFDMUQsT0FBSyxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQ3pELFFBQU0sRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUMxRCxTQUFPLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7QUFDM0QsU0FBTyxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQzNELE1BQUksRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUN4RCxTQUFPLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Q0FDN0QsQ0FBQyxDQUFDOzs7QUNyREgsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsQUFtQnRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7O0FBRXZELElBQUksWUFBWSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV2RCxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRS9GLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOztBQUV6SixJQVpxQixjQUFjLEdBQUEsQ0FBQSxZQUFBO0FBYWpDLFdBYm1CLGNBQWMsR0FBQTtBQWMvQixtQkFBZSxDQUFDLElBQUksRUFkSCxjQUFjLENBQUEsQ0FBQTtHQWVoQzs7QUFFRCxjQUFZLENBakJPLGNBQWMsRUFBQSxDQUFBO0FBa0IvQixPQUFHLEVBQUUsU0FBUztBQUNkLFNBQUssRUFBRSxTQUFTLE9BQU8sQ0FqQmpCLEtBQUssRUFBRTtBQUNiLFVBQUksT0FBTyxHQUFBLFNBQUEsQ0FBQztBQUNaLGNBQVEsS0FBSyxDQUFDLE9BQU87QUFDbkIsYUFBSyxFQUFFOztBQUNMLGlCQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3hCLGdCQUFNO0FBQUEsYUFDSCxFQUFFOztBQUNMLGlCQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzFCLGdCQUFNO0FBQUEsT0FDVDtBQUNELGFBQU8sT0FBTyxDQUFDO0tBQ2hCOzs7Ozs7OztBQUFBLEdBMkJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsVUFBVTtBQUNmLFNBQUssRUFBRSxTQUFTLFFBQVEsR0F0QmY7QUFDVCxhQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbEM7Ozs7Ozs7O0FBQUEsR0E4QkEsRUFBRTtBQUNELE9BQUcsRUFBRSxRQUFRO0FBQ2IsU0FBSyxFQUFFLFNBQVMsTUFBTSxHQXpCZjtBQUNQLGFBQU8sYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNuQztHQTBCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQTNEbUIsY0FBYyxDQUFBO0NBNERsQyxDQUFBLEVBQUc7Ozs7Ozs7OztBQUFDLEFBU0wsT0FBTyxDQUFDLE9BQU8sR0FyRU0sY0FBYyxDQUFBO0FBMENuQyxTQUFTLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFO0FBQy9DLE1BQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDMUIsTUFBSSxLQUFLLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM1QyxNQUFJLEdBQUcsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDdEMsTUFBSSxJQUFJLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QixNQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDMUMsTUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQ2hFLE1BQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUNkLE1BQUksS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNsQixTQUFPLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDaEIsUUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLFFBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO0FBQy9DLFFBQUksVUFBVSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQzdDLFFBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFOztBQUVuQyxXQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2IsWUFBTTtLQUNQO0FBQ0QsS0FBQyxJQUFJLElBQUksQ0FBQztHQUNYOztBQUVELE1BQUksQ0FBQyxLQUFLLEVBQUU7QUFDVixXQUFPLElBQUksQ0FBQztHQUNiOzs7Ozs7QUFBQSxNQU1HLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxNQUFJLGNBQWMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RELE1BQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM1RCxNQUFJLFVBQVUsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFDM0QsTUFBSSxhQUFhLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxHQUFHLGlCQUFpQixDQUFDO0FBQ3hGLE1BQUksUUFBUSxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQzFCLENBQUMsUUFBUSxJQUFJLGFBQWEsSUFBSSxDQUFDLEVBQUU7O0FBRXBDLFdBQU8sQ0FBQyxDQUFDO0dBQ1YsTUFDSTs7O0FBR0gsS0FBQyxJQUFJLElBQUksQ0FBQztBQUNWLFdBQU8sQ0FBQyxDQUFDO0dBQ1Y7Q0FDRjs7Ozs7QUFBQSxTQUtRLGFBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFOztBQUV4QyxNQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDMUMsTUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNkLFdBQU87R0FDUjs7OztBQUFBLE1BSUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFBLENBQUU7QUFDekUsTUFBSSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUVuRSxNQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQzFDLE1BQUksUUFBUSxDQUFDO0FBQ2IsTUFBSSxpQkFBaUIsSUFBSSxhQUFhLEtBQUssaUJBQWlCLEVBQUU7OztBQUc1RCxRQUFJLEtBQUssR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsR0FBSSxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQ3pELFlBQVEsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztHQUMvRCxNQUNJOzs7O0FBSUgsWUFBUSxHQUFHLGlCQUFpQixDQUFDO0dBQzlCOztBQUVELE1BQUksQ0FBQyxRQUFRLEVBQUU7OztBQUdiLFlBQVEsR0FBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRTtHQUN0RDs7QUFFRCxNQUFJLFFBQVEsS0FBSyxhQUFhLEVBQUU7QUFDOUIsV0FBTyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7QUFDakMsV0FBTyxJQUFJO0FBQUEsR0FDWixNQUNJO0FBQ0gsYUFBTyxLQUFLO0FBQUEsS0FDYjtDQUNGO0FBQ0QsWUFBQSxDQUFBLE9BQUEsQ0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7QUFDakQsU0FBTyxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0NBQzdELENBQUMsQ0FBQzs7O0FDNUpILFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRzs7Ozs7Ozs7QUFBQyxBQVF0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztBQUV2RCxJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxTQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUUvRixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7Ozs7QUFBQSxBQUt6SixJQVpxQix1QkFBdUIsR0FBQSxDQUFBLFlBQUE7QUFhMUMsV0FibUIsdUJBQXVCLEdBQUE7QUFjeEMsbUJBQWUsQ0FBQyxJQUFJLEVBZEgsdUJBQXVCLENBQUEsQ0FBQTtHQWV6Qzs7QUFFRCxjQUFZLENBakJPLHVCQUF1QixFQUFBLENBQUE7QUFrQnhDLE9BQUcsRUFBRSxTQUFTOzs7Ozs7O0FBT2QsU0FBSyxFQUFFLFNBQVMsT0FBTyxDQWxCakIsS0FBSyxFQUFFO0FBQ2IsVUFBSSxPQUFPLEdBQUEsU0FBQSxDQUFDO0FBQ1osVUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDOztBQUV2QixjQUFRLEtBQUssQ0FBQyxPQUFPO0FBQ25CLGFBQUssQ0FBQzs7QUFDSix5QkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLGlCQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2YscUJBQVcsR0FBRyxLQUFLLENBQUM7QUFDcEIsZ0JBQU07QUFBQSxhQUNILEVBQUU7O0FBQ0wsaUJBQU8sR0FBRyxJQUFJLENBQUM7QUFDZixnQkFBTTtBQUFBO0FBRU4sY0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFDaEQsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLFlBQUEsRUFBYztBQUNuQyxrQ0FBb0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUM5RDtBQUNELHFCQUFXLEdBQUcsS0FBSyxDQUFDO0FBQUEsT0FDdkI7O0FBRUQsVUFBSSxXQUFXLEVBQUU7QUFDZix3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN4Qjs7QUFFRCxhQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7Ozs7O0FBQUEsR0E0QkEsRUFBRTtBQUNELE9BQUcsRUFBRSwwQkFBMEI7QUFDL0IsU0FBSyxFQUFFLFNBQVMsd0JBQXdCLENBdEJqQixNQUFNLEVBQUU7QUFDL0IsVUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3pDLGVBQU87T0FDUjtBQUNELFVBQUksS0FBSyxHQUFHLDRCQUE0QixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxVQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7QUFDZCxZQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztPQUM1QjtLQUNGO0dBdUJBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBMUVtQix1QkFBdUIsQ0FBQTtDQTJFM0MsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLE9BQU8sR0E3RU0sdUJBQXVCLENBQUE7O0FBb0Q1QyxZQUFBLENBQUEsT0FBQSxDQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFO0FBQzFELFNBQU8sRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztDQUM3RCxDQUFDOzs7O0FBQUEsQUFBQyxJQUtHLHVCQUF1QixHQUFHLElBQUk7OztBQUFBLEFBQUMsU0FJNUIsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUNyRCxNQUFJLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELE1BQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDakMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxRQUFJLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxRQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxLQUFLLE1BQU0sRUFBRTtBQUN0RCxhQUFPLENBQUMsQ0FBQztLQUNWO0dBQ0Y7QUFDRCxTQUFPLENBQUMsQ0FBQyxDQUFDO0NBQ1g7Ozs7QUFBQSxTQUlRLG1CQUFtQixDQUFDLE9BQU8sRUFBRTtBQUNwQyxNQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFO0FBQzlCLFFBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDMUIsV0FBTyxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDN0MsVUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQzFDLGFBQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzNCLENBQUMsQ0FBQztHQUNKO0FBQ0QsU0FBTyxPQUFPLENBQUMsaUJBQWlCLENBQUM7Q0FDbEM7O0FBRUQsU0FBUyxlQUFlLENBQUMsT0FBTyxFQUFFO0FBQ2hDLE1BQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3BFLE1BQUksTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNkLFdBQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztHQUNuRTtBQUNELFNBQU8sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkQsU0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Q0FDN0I7O0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLE1BQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO0FBQ3hDLFNBQU8sQ0FBQyxZQUFZLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuRCxTQUFPLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZELGtCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQzNCOztBQUVELFNBQVMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO0FBQ25DLE1BQUksT0FBTyxDQUFDLGNBQWMsRUFBRTtBQUMxQixnQkFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNyQyxXQUFPLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztHQUNoQztDQUNGOztBQUVELFNBQVMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO0FBQ2pDLFNBQU8sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQzFCLG9CQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQzdCOztBQUVELFNBQVMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO0FBQ2pDLG9CQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLFNBQU8sQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLFlBQU07QUFDeEMsb0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDM0IsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0NBQzdCOzs7QUN0SUQsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7Ozs7O0FBQUEsQUFRekosSUFWcUIsa0JBQWtCLEdBQUEsQ0FBQSxZQUFBO0FBV3JDLFdBWG1CLGtCQUFrQixHQUFBO0FBWW5DLG1CQUFlLENBQUMsSUFBSSxFQVpILGtCQUFrQixDQUFBLENBQUE7R0FhcEM7O0FBRUQsY0FBWSxDQWZPLGtCQUFrQixFQUFBLENBQUE7QUFnQm5DLE9BQUcsRUFBRSxnQkFBZ0I7QUFDckIsU0FBSyxFQUFFLFNBQVMsY0FBYyxDQWZqQixJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzdCLFVBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3pELFVBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxlQUFlLEdBQUcsRUFBRSxDQUFDO0tBQ3BEO0dBZ0JBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBdkJtQixrQkFBa0IsQ0FBQTtDQXdCdEMsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLE9BQU8sR0ExQk0sa0JBQWtCLENBQUE7OztBQ052QyxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7Ozs7Ozs7QUFBQSxBQVF6SixJQVZxQixlQUFlLEdBQUEsQ0FBQSxZQUFBO0FBV2xDLFdBWG1CLGVBQWUsR0FBQTtBQVloQyxtQkFBZSxDQUFDLElBQUksRUFaSCxlQUFlLENBQUEsQ0FBQTtHQWFqQzs7QUFFRCxjQUFZLENBZk8sZUFBZSxFQUFBLENBQUE7QUFnQmhDLE9BQUcsRUFBRSxvQkFBb0I7Ozs7Ozs7Ozs7OztBQVl6QixTQUFLLEVBQUUsU0FBUyxrQkFBa0IsQ0FUakIsSUFBSSxFQUFFOzs7OztBQUt2QixVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDdkMsVUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNkLGVBQU87T0FDUjs7QUFFRCxVQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUM1RSxVQUFJLGFBQWEsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVk7O0FBQUEsQUFBQyxVQUUvQyxZQUFZLEdBQUcsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQ2hFLFVBQUksYUFBYSxHQUFHLFlBQVksRUFBRTs7QUFFaEMsaUJBQVMsQ0FBQyxTQUFTLElBQUksYUFBYSxHQUFHLFlBQVksQ0FBQztPQUNyRCxNQUNJLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUU7O0FBRXpDLGlCQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztPQUNsQztLQUNGO0dBU0EsRUFBRTtBQUNELE9BQUcsRUFBRSxjQUFjO0FBQ25CLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0FsREYsSUFBSSxFQUFFO0FBQ3JCLFVBQUksSUFBSSxFQUFFOztBQUVSLFlBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUMvQjtLQUNGO0dBbURBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBNURtQixlQUFlLENBQUE7Q0E2RG5DLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBL0RNLGVBQWUsQ0FBQTs7O0FDTnBDLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7QUFBQSxBQVN6SixJQVZxQixjQUFjLEdBQUEsQ0FBQSxZQUFBO0FBV2pDLFdBWG1CLGNBQWMsR0FBQTtBQVkvQixtQkFBZSxDQUFDLElBQUksRUFaSCxjQUFjLENBQUEsQ0FBQTtHQWFoQzs7QUFFRCxjQUFZLENBZk8sY0FBYyxFQUFBLENBQUE7QUFnQi9CLE9BQUcsRUFBRSxpQkFBaUI7QUFDdEIsU0FBSyxFQUFFLFNBQVMsZUFBZSxHQWZmO0FBZ0JkLFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFkbkIsVUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDOzs7Ozs7OztBQUFBLEFBQUMsVUFRZCxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFBLEtBQUssRUFBSTtBQUMzQyxZQUFJLEtBQUEsQ0FBSyxXQUFXLEVBQUU7QUFDcEIsaUJBQU87U0FDUixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3JDLG9CQUFVLENBQUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxDQUFDO1NBQ3pCLE1BQU07QUFDTCxlQUFBLENBQUssV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QjtPQUNGLENBQUMsQ0FBQztBQUNILFVBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQSxLQUFLLEVBQUk7QUFDMUMsWUFBSSxDQUFDLEtBQUEsQ0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ25ELGNBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQSxLQUFBLEVBQU8sS0FBSyxDQUFDLENBQUM7QUFDckMsY0FBSSxPQUFPLEVBQUU7QUFDWCxpQkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1dBQ3hCO1NBQ0Y7T0FDRixDQUFDLENBQUM7QUFDSCxVQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQUEsS0FBSyxFQUFJO0FBQ3pDLFlBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztBQUU5QixjQUFJLENBQUMsS0FBQSxDQUFLLFdBQVcsRUFBRTs7QUFFckIsb0JBQVEsQ0FBQSxLQUFBLEVBQU8sS0FBSyxDQUFDLENBQUM7V0FDdkI7QUFDRCxlQUFBLENBQUssV0FBVyxHQUFHLEtBQUssQ0FBQztTQUMxQjtPQUNGLENBQUMsQ0FBQztLQUNKOzs7O0FBQUEsR0FvQkEsRUFBRTtBQUNELE9BQUcsRUFBRSxRQUFRO0FBQ2IsU0FBSyxFQUFFLFNBQVMsTUFBTSxHQW5CZixFQUFFO0dBb0JWLEVBQUU7QUFDRCxPQUFHLEVBQUUsU0FBUztBQUNkLFNBQUssRUFBRSxTQUFTLE9BQU8sR0FyQmYsRUFBRTs7Ozs7Ozs7OztBQUFBLEdBK0JYLEVBQUU7QUFDRCxPQUFHLEVBQUUsZ0JBQWdCOzs7QUFHckIsU0FBSyxFQUFFLFNBQVMsY0FBYyxDQWpCakIsS0FBSyxFQUFFLEVBQUU7R0FrQnZCLEVBQUU7QUFDRCxPQUFHLEVBQUUsVUFBVTtBQUNmLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0E3Qko7QUFDYixhQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7QUE4QkMsT0FBRyxFQUFFLFNBQVMsR0FBRyxDQTVCTixLQUFLLEVBQUU7QUFDbEIsVUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7S0FDeEI7R0E2QkEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0F6Rm1CLGNBQWMsQ0FBQTtDQTBGbEMsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLE9BQU8sR0E1Rk0sY0FBYyxDQUFBOztBQWtFbkMsU0FBUyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNsQyxTQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLE1BQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3hDLE1BQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3hDLFNBQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFNBQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLFNBQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLFNBQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFNBQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0NBQ3JCOztBQUVELFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDakMsTUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDeEMsTUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDeEMsU0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUN6QyxTQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3pDLFNBQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLFNBQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE1BQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7O0FBRXpELFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7OztBQUFBLEFBQUMsV0FRYixJQUFJLENBQUM7R0FDYixNQUFNOztBQUVMLFdBQU8sS0FBSztBQUFBLEdBQ2I7Q0FDRjs7QUFFRCxTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ2hDLFNBQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsTUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDeEMsTUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRTs7O0FBR3pCLFdBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztHQUNsQixNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRTs7O0FBR2pDLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixNQUFNOzs7QUFHTCxXQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLFFBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDaEMsUUFBSSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQ25CLGFBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNuQixNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQzNCLGFBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNsQjtHQUNGO0FBQ0QsU0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDckIsU0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Q0FDeEI7O0FBRUQsU0FBUyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtBQUMzQixNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQ2hDLE1BQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLE1BQUksUUFBUSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQ3RCLFlBQVksR0FBRyxLQUFLLEdBQ3BCLENBQUMsQ0FBQztBQUNKLFNBQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0NBQzdCOzs7QUM5SUQsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7Ozs7Ozs7QUFBQSxBQVV6SixJQVRxQixlQUFlLEdBQUEsQ0FBQSxZQUFBO0FBVWxDLFdBVm1CLGVBQWUsR0FBQTtBQVdoQyxtQkFBZSxDQUFDLElBQUksRUFYSCxlQUFlLENBQUEsQ0FBQTtHQVlqQzs7QUFFRCxjQUFZLENBZE8sZUFBZSxFQUFBLENBQUE7QUFlaEMsT0FBRyxFQUFFLGFBQWE7Ozs7Ozs7Ozs7O0FBV2xCLFNBQUssRUFBRSxTQUFTLFdBQVcsQ0FmakIsSUFBSSxFQUFFO0FBQ2hCLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsYUFBTyxNQUFNLEdBQ1gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FDeEIsQ0FBQyxDQUFDLENBQUM7S0FDTjtHQWNBLEVBQUU7QUFDRCxPQUFHLEVBQUUsY0FBYztBQUNuQixTQUFLLEVBQUUsU0FBUyxZQUFZLEdBUmY7QUFDYixVQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7Ozs7Ozs7Ozs7QUFBQSxHQWtCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLE9BQU87QUFDWixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBNUJQO0FBQ1YsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6QixVQUFJLEtBQUssR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNuQyxhQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7S0FDcEI7R0E2QkEsRUFBRTtBQUNELE9BQUcsRUFBRSxlQUFlO0FBQ3BCLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0FsQkM7QUFDbEIsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6QixhQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ3ZDO0FBbUJDLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0FsQkQsS0FBSyxFQUFFOzs7Ozs7O0FBT3ZCLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsVUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUU7QUFDNUMsY0FBTSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7T0FDOUI7S0FDRjs7Ozs7Ozs7O0FBQUEsR0EyQkEsRUFBRTtBQUNELE9BQUcsRUFBRSxjQUFjO0FBQ25CLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0FyQkE7QUFDakIsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6QixhQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3RDO0FBc0JDLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0FyQkYsSUFBSSxFQUFFO0FBQ3JCLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsVUFBSSxNQUFNLEVBQUU7QUFDVixjQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztPQUM1QjtLQUNGO0dBc0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsUUFBUTtBQUNiLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0F0QlIsT0FBTyxFQUFFO0FBdUJoQixVQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBdEJuQixVQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtBQUM5QixZQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO09BQ3ZFO0FBQ0QsVUFBSSxJQUFJLENBQUMsNEJBQTRCLEVBQUU7QUFDckMsWUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO09BQ3RGO0FBQ0QsVUFBSSxDQUFDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsVUFBQSxLQUFLLEVBQUk7QUFDOUUsYUFBQSxDQUFLLFlBQVksRUFBRSxDQUFDO09BQ3JCLENBQUMsQ0FBQztBQUNILFVBQUksQ0FBQyw0QkFBNEIsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsVUFBQSxLQUFLLEVBQUk7OztBQUc3RixhQUFBLENBQUssbUJBQW1CLEVBQUUsQ0FBQztPQUM1QixDQUFDOztBQUFBLEFBQUMsVUFFQyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCO0dBeUJBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBakhtQixlQUFlLENBQUE7Q0FrSG5DLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBcEhNLGVBQWUsQ0FBQTs7O0FDVHBDLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLEFBc0J0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztBQUV2RCxJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxTQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUUvRixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7QUFFekosSUFYcUIsaUJBQWlCLEdBQUEsQ0FBQSxZQUFBO0FBWXBDLFdBWm1CLGlCQUFpQixHQUFBO0FBYWxDLG1CQUFlLENBQUMsSUFBSSxFQWJILGlCQUFpQixDQUFBLENBQUE7R0FjbkM7O0FBRUQsY0FBWSxDQWhCTyxpQkFBaUIsRUFBQSxDQUFBO0FBaUJsQyxPQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLFNBQUssRUFBRSxTQUFTLGVBQWUsR0FoQmY7QUFpQmQsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQWhCbkIsVUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUssRUFBSTtBQUN0QyxZQUFJLE9BQU8sR0FBRyxLQUFLLENBQUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLFlBQUksT0FBTyxFQUFFO0FBQ1gsZUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO09BQ0YsQ0FBQyxDQUFDO0FBQ0gsd0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUI7Ozs7QUFBQSxHQXNCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFFBQVE7QUFDYixTQUFLLEVBQUUsU0FBUyxNQUFNLEdBckJmLEVBQUU7R0FzQlYsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsU0FBSyxFQUFFLFNBQVMsT0FBTyxHQXJCZixFQUFFO0dBc0JYLEVBQUU7QUFDRCxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsR0F2QmYsRUFBRTtHQXdCbEIsRUFBRTtBQUNELE9BQUcsRUFBRSxVQUFVO0FBQ2YsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQTdCSixFQUFFO0FBOEJmLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0E3Qk4sS0FBSyxFQUFFLEVBQUU7R0E4QnJCLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBL0NtQixpQkFBaUIsQ0FBQTtDQWdEckMsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLE9BQU8sR0FsRE0saUJBQWlCLENBQUE7O0FBb0J0QyxZQUFBLENBQUEsT0FBQSxDQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFO0FBQ3BELFVBQVEsRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztDQUM3RCxDQUFDOzs7O0FBQUEsQUFBQyxJQUtHLGtCQUFrQixHQUFHLEdBQUc7OztBQUFBLEFBQUMsSUFHekIsVUFBVSxHQUFHLEdBQUc7OztBQUFBLEFBQUMsU0FJZCxZQUFZLENBQUMsT0FBTyxFQUFFO0FBQzdCLFNBQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFNBQU8sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLFNBQU8sQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7QUFDMUMsU0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUNuQyxZQUFVLENBQUMsWUFBTTtBQUNmLFdBQU8sQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUM7R0FDNUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0NBQ3hCOzs7QUFBQSxTQUdRLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtBQUNuQyxTQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNyQixTQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztBQUMzQixTQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixTQUFPLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0FBQ3BDLFNBQU8sQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUM7QUFDM0MsTUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7QUFDN0IsZ0JBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN4QyxXQUFPLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0dBQ2xDO0NBQ0Y7Ozs7QUFBQSxTQUlRLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDZixTQUFPLENBQUUsS0FBSyxDQUFDLEdBQ2IsQ0FBQyxHQUNELENBQUUsR0FBRyxDQUFDLEdBQ0osQ0FBQyxHQUNELENBQUMsQ0FBQyxDQUFDO0NBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FvQlEsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7Ozs7QUFJN0IsTUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7QUFDN0IsZ0JBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztHQUN6QztBQUNELFNBQU8sQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUMsWUFBTTtBQUMzQyxpQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ3hCLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRWYsTUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUMxQixNQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTs7O0FBQUEsQUFBQyxNQUd0QixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFBLENBQUU7QUFDakUsU0FBTyxDQUFDLFdBQVcsR0FBRyxNQUFNOzs7QUFBQSxBQUFDLE1BR3pCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTs7O0FBR3ZDLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7O0FBRUQsTUFBSSxPQUFPLENBQUMsMEJBQTBCLEVBQUU7O0FBRXRDLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBR0QsTUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFOzs7QUFHcEIsV0FBTyxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztHQUNyQyxNQUFNLElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFFOztBQUV0QyxXQUFPLElBQUksQ0FBQztHQUNiOztBQUVELFNBQU8sQ0FBQyxjQUFjLElBQUksTUFBTTs7O0FBQUEsQUFBQyxNQUc3QixLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUNoQyxNQUFJLFFBQVEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUN0QixPQUFPLENBQUMsY0FBYyxHQUFHLEtBQUssR0FDOUIsQ0FBQyxDQUFDO0FBQ0osU0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QixVQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RCxTQUFPLENBQUMsUUFBUSxHQUFHLFFBQVE7Ozs7QUFBQSxBQUFDLE1BSXhCLFFBQVEsS0FBSyxDQUFDLEVBQUU7O0FBRWxCLFdBQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsV0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLGdCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDdkIsTUFBTSxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRTs7QUFFMUIsV0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixXQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDakIsZ0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUN2Qjs7QUFFRCxTQUFPLElBQUksQ0FBQztDQUNiOzs7O0FBQUEsU0FJUSxhQUFhLENBQUMsT0FBTyxFQUFFOzs7O0FBSTlCLFNBQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsTUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUNoQyxNQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUU7O0FBRW5CLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxFQUFFOztBQUUzQixXQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDbEI7Ozs7O0FBQUEsb0JBS2lCLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDN0I7Ozs7Ozs7Ozs7Ozs7OztJQ2xNVyxnQkFBZ0I7Ozs7Ozs7O0lBRVAsVUFBVTtXQUFWLFVBQVU7MEJBQVYsVUFBVTs7O2VBQVYsVUFBVTs7Ozs7Ozs2QkF3RXBCLFVBQVUsRUFBRTtBQUNuQixnQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFoRHlCO3dDQUFSLE1BQU07QUFBTixjQUFNOzs7Ozs7O0FBS3RCLGFBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkEyQmUsVUFBVSxFQUFFO0FBQzFCLFdBQUssSUFBSSxHQUFHLElBQUksVUFBVSxFQUFFO0FBQzFCLFlBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxZQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzVELGlCQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNqQyxjQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7T0FDOUM7S0FDRjs7O3lCQWVXLFNBQVMsRUFBRTs7QUFFckIsYUFBTyxVQUFTLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFOzs7QUFHdkMsWUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtBQUM3QixnQkFBTSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUMvQjtBQUNELGNBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7T0FDM0MsQ0FBQTtLQUNGOzs7U0EzRmtCLFVBQVU7Ozs7Ozs7O2tCQUFWLFVBQVU7QUFvRy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7QUFBQyxBQWdCcEMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUc7QUFDaEMsWUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUFTO0NBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLEFBdUJGLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTOzs7QUFBQyxBQUk5QyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHO0FBQ3RDLGNBQVksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDOUMsZ0JBQWMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDaEQsb0JBQWtCLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlO0FBQ3BELGNBQVksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWU7Q0FDL0M7Ozs7OztBQUFDLEFBT0YsSUFBTSwrQkFBK0IsR0FBRyxDQUN0QyxXQUFXLEVBQ1gsUUFBUSxFQUNSLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxDQUNaOzs7QUFBQyxBQUdGLElBQU0sNkJBQTZCLEdBQUcsQ0FDcEMsYUFBYSxDQUNkLENBQUM7O0FBRUYsSUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQUFDLEFBVXZELFNBQVMscUJBQXFCLENBQUMsR0FBRyxFQUFFO0FBQ2xDLE1BQUksbUJBQW1CLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUMvRCxHQUFHLENBQUMsaUJBQWlCLEdBQ3JCLEVBQUUsQ0FBQztBQUNMLE1BQUkseUJBQXlCLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBQ3JELE1BQUksdUJBQXVCLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0I7OztBQUFDLEFBR3BFLE1BQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsUUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUM5QyxRQUFJLElBQUksSUFBSSxJQUFJLElBQUksNkJBQTZCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs7QUFFbkUsVUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxVQUFJLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQyxVQUFVLENBQUM7OztBQUFDLEFBRzlDLFVBQUksSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUk7QUFBQyxVQUM3Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUM7QUFBQSxVQUMvQix5QkFBeUIsQ0FBQyxHQUFHLENBQUM7QUFBQSxVQUM5Qix1QkFBdUIsQ0FBQyxJQUFJLENBQUM7QUFBQSxVQUM3Qix1QkFBdUIsQ0FBQyxHQUFHLENBQUM7Ozs7QUFBQyxBQUlwQyxVQUFJLElBQUksSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDOUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUIsY0FBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO09BQzlDO0tBQ0Y7R0FDRixDQUFDLENBQUM7Q0FDSjs7Ozs7O0FBQUEsQUFPRCxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQTRCO01BQTFCLG1CQUFtQix5REFBRyxFQUFFOztBQUNqRSxRQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2pELFFBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN6QyxVQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9ELFlBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNqRDtHQUNGLENBQUMsQ0FBQztBQUNILFNBQU8sTUFBTSxDQUFDO0NBQ2Y7Ozs7OztBQUFBLEFBT0QsU0FBUyxRQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTs7O0FBRzVCLE1BQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxNQUFJLFNBQVMsR0FBRyxZQUFZLEdBQzFCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsR0FDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQixNQUFJLFNBQVMsSUFDVCxTQUFTLEtBQUssUUFBUSxJQUN0QixTQUFTLEtBQUssTUFBTSxJQUNwQixTQUFTLEtBQUssTUFBTSxDQUFDLFNBQVMsRUFBRTs7O0FBR2xDLFFBQUksR0FBRyxRQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ2pDOzs7QUFBQSxBQUdELE1BQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxNQUFJLE1BQU0sR0FBRyxXQUFXLEdBQ3RCLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7QUFBQyxBQUl0QixNQUFJLGFBQWEsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDeEQsTUFBSSxjQUFjLEdBQUcsWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQzVELE1BQUksa0JBQWtCLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxJQUM5QyxjQUFjLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFOztBQUUzQyxXQUFPLE1BQU0sQ0FBQztHQUNmOzs7QUFBQSxBQUdELE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLFdBQVcsSUFBSSxZQUFZLEVBQUU7O0FBRS9CLHFCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsK0JBQStCLENBQUMsQ0FBQztBQUNsRSxVQUFNLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLDZCQUE2QixDQUFDLENBQUM7R0FDOUYsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFJLFlBQVksRUFBRTs7QUFFdkMsVUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLCtCQUErQixDQUFDLENBQUM7R0FDdEYsTUFBTSxJQUFJLFdBQVcsSUFBSSxDQUFDLFlBQVksRUFBRTs7QUFFdkMsVUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLDZCQUE2QixDQUFDLENBQUM7R0FDcEYsTUFBTTs7QUFFTCxVQUFNLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0dBQzFFOztBQUVELE1BQUksS0FBSyxDQUFDLElBQUksRUFBRTs7OztBQUlkLFVBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFVBQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU07Ozs7QUFBQyxBQUl2QyxVQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztHQUNwRDs7O0FBQUEsQUFHRCxRQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsRUFBRTtBQUNuRCxTQUFLLEVBQUUsS0FBSztHQUNiLENBQUM7OztBQUFDLEFBR0gsdUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTlCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7Ozs7O0FBQUEsQUFNRCxTQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUU7Ozs7OztBQU01QixXQUFTLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDdkIsUUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEMsUUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRCxTQUFPLFFBQVEsQ0FBQztDQUNqQjs7Ozs7QUFBQSxBQU1ELFNBQVMsdUJBQXVCLENBQUMsVUFBVSxFQUFFO0FBQzNDLE1BQUksT0FBTyxVQUFVLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTs7QUFFMUMsV0FBTyxZQUFZLENBQUM7R0FDckIsTUFBTSxJQUFJLE9BQU8sVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVLElBQ3hDLE9BQU8sVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUU7O0FBRTNDLFdBQU8sY0FBYyxDQUFDO0dBQ3ZCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYjs7Ozs7Ozs7Ozs7QUFBQSxBQVlELFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUNsQixTQUFPLE9BQU8sQ0FBQyxLQUFLLFVBQVU7QUFDekIsR0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsS0FBSyxDQUFDLEFBQUM7QUFBQyxDQUNwRDs7Ozs7O0FBQUEsQUFPRCxTQUFTLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDMUMsTUFBSSxTQUFTLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTs7O0FBR3BDLFdBQVEsU0FBUyxLQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUU7R0FDekM7QUFDRCxNQUFJLEdBQUcsS0FBSyxTQUFTLGdCQUFJLEdBQUcsRUFBWSxTQUFTLENBQUMsV0FBVyxDQUFBLEVBQUU7O0FBRTdELFdBQU8sSUFBSSxDQUFDO0dBQ2I7QUFDRCxTQUFPLEtBQUssQ0FBQztDQUNkOzs7Ozs7QUFBQSxBQU9ELFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDbEMsTUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7QUFDRCxNQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDN0UsTUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7O0FBRTVDLFdBQU8sSUFBSSxDQUFDO0dBQ2I7QUFDRCxTQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzFEOzs7Ozs7OztRQzdYZSxlQUFlLEdBQWYsZUFBZTtRQWFmLGVBQWUsR0FBZixlQUFlO1FBeURmLGlCQUFpQixHQUFqQixpQkFBaUI7UUFZakIscUJBQXFCLEdBQXJCLHFCQUFxQjtRQW9CckIsUUFBUSxHQUFSLFFBQVE7UUFRUixnQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBZ0JoQixnQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBeUJoQixpQkFBaUIsR0FBakIsaUJBQWlCO1FBeUJqQixpQkFBaUIsR0FBakIsaUJBQWlCO1FBY2pCLGVBQWUsR0FBZixlQUFlO1FBaUJmLGVBQWUsR0FBZixlQUFlOzs7Ozs7Ozs7O0FBL014QixTQUFTLGVBQWUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3BELFNBQU8sWUFBVztBQUNoQixhQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNqQyxXQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ3pDLENBQUM7Q0FDSDs7Ozs7OztBQUFBLEFBUU0sU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDdkQsTUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUNsQyxNQUFJLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLE1BQUksY0FBYyxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN0RCxNQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0FBQ3JDLFFBQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQW1CRCxTQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUU7QUFDOUQsTUFBSSxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFOzs7QUFFM0QsVUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUNwQyxnQkFBVSxDQUFDLEdBQUcsR0FBRyxVQUFTLEtBQUssRUFBRTtBQUMvQixrQkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDOUIsQ0FBQzs7R0FDSDtBQUNELE1BQUksVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRTs7O0FBRTNELFVBQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7QUFDcEMsZ0JBQVUsQ0FBQyxHQUFHLEdBQUcsWUFBVztBQUMxQixlQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDOUIsQ0FBQzs7R0FDSDtDQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFpQk0sU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQzdDLE1BQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsU0FBTyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDekM7Ozs7Ozs7O0FBQUEsQUFTTSxTQUFTLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDL0MsTUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxNQUFJLFVBQVUsRUFBRTtBQUNkLFdBQU8sVUFBVSxDQUFDO0dBQ25CLE1BQU07QUFDTCxRQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQzs7O0FBQUMsQUFHM0MsUUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTtBQUNsQyxhQUFPLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvQztHQUNGO0FBQ0QsU0FBTyxTQUFTO0FBQUMsQ0FDbEI7Ozs7OztBQUFBLEFBT00sU0FBUyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRTs7Ozs7OztBQUFBLEFBUTdDLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDeEQsTUFBSSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0FBQzNDLE1BQUksY0FBYyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwRCxNQUFJLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsWUFBVSxDQUFDLEtBQUssR0FBRyxZQUFXO0FBQzVCLFdBQU8sa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFDekMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUNuRCxDQUFDO0NBQ0g7Ozs7Ozs7QUFBQSxBQVFNLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDeEQsTUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztBQUNqQyxNQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO0FBQ2pDLE1BQUksY0FBYyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwRCxNQUFJLFVBQVUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQ3BDLE1BQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7QUFDcEMsTUFBSSxXQUFXLElBQUksVUFBVSxFQUFFOztBQUU3QixjQUFVLENBQUMsR0FBRyxHQUFHLFlBQVc7QUFDMUIsYUFBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUQsQ0FBQztHQUNIO0FBQ0QsTUFBSSxXQUFXLElBQUksVUFBVSxFQUFFOztBQUU3QixjQUFVLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7R0FDM0Q7QUFDRCw0QkFBMEIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDeEQ7Ozs7Ozs7QUFBQSxBQVFNLFNBQVMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDekQsTUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztBQUNqQyxNQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO0FBQ2pDLE1BQUksY0FBYyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwRCxNQUFJLFVBQVUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQ3BDLE1BQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7QUFDcEMsTUFBSSxXQUFXLElBQUksVUFBVSxFQUFFOztBQUU3QixjQUFVLENBQUMsR0FBRyxHQUFHLFlBQVc7QUFDMUIsYUFBTyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUQsQ0FBQztHQUNIO0FBQ0QsTUFBSSxXQUFXLElBQUksVUFBVSxFQUFFOztBQUU3QixjQUFVLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7R0FDM0Q7QUFDRCw0QkFBMEIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDeEQ7Ozs7Ozs7QUFBQSxBQVFNLFNBQVMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDekQsTUFBSSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0FBQzNDLE1BQUksY0FBYyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwRCxNQUFJLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsWUFBVSxDQUFDLEtBQUssR0FBRyxZQUFXO0FBQzVCLFdBQU8sbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFDMUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUNsRCxDQUFBO0NBQ0Y7Ozs7O0FBQUEsQUFNTSxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtBQUN2RCxNQUFJLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7QUFDM0MsTUFBSSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BELE1BQUksa0JBQWtCLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztBQUM5QyxZQUFVLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0NBQzdFOzs7Ozs7Ozs7OztBQUFBLEFBWU0sU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDdkQsTUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztBQUNqQyxNQUFJLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDcEQsTUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUNwQyxNQUFJLFdBQVcsSUFBSSxVQUFVLEVBQUU7O0FBRTdCLGNBQVUsQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztHQUMzRDtBQUNELDRCQUEwQixDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztDQUN4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM3Tm9CLG9CQUFvQjtXQUFwQixvQkFBb0I7MEJBQXBCLG9CQUFvQjs7O2VBQXBCLG9CQUFvQjs7Ozs7OzZDQUtkLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOzs7QUFHakQsVUFBSSxZQUFZLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakQsVUFBSSxZQUFZLElBQUksSUFBSSxJQUFJLEVBQUUsWUFBWSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUEsQUFBQyxFQUFFO0FBQ3BFLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUM7T0FDL0I7S0FDRjs7O3NDQUVpQjs7O0FBQ2hCLFFBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQSxTQUFTLEVBQUk7QUFDNUMsY0FBSyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDM0UsQ0FBQyxDQUFDO0tBQ0o7OztTQWxCa0Isb0JBQW9COzs7OztrQkFBcEIsb0JBQW9CO0FBd0J6QyxTQUFTLHVCQUF1QixDQUFDLGFBQWEsRUFBRTtBQUM5QyxNQUFJLFlBQVksR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxVQUFBLENBQUM7V0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO0dBQUEsQ0FBQyxDQUFDO0FBQy9FLFNBQU8sWUFBWSxDQUFDO0NBQ3JCOzs7QUFBQSxBQUdELFNBQVMsdUJBQXVCLENBQUMsWUFBWSxFQUFFO0FBQzdDLE1BQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFVBQUEsQ0FBQztXQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtHQUFBLENBQUMsQ0FBQztBQUNoRyxTQUFPLGFBQWEsQ0FBQztDQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDaENvQixvQkFBb0I7V0FBcEIsb0JBQW9COzBCQUFwQixvQkFBb0I7OztlQUFwQixvQkFBb0I7O3NDQUVyQjs7O0FBQ2hCLFVBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixZQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNaLFlBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUQsVUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQUEsSUFBSSxFQUFJO0FBQ3BDLGNBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsZ0JBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNuQixDQUFDLENBQUM7T0FDSjtLQUNGOzs7U0FYa0Isb0JBQW9COzs7a0JBQXBCLG9CQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDTzFCLHFCQUFXLE9BQU8sQ0FBQyxJQUFJLENBQ3BDLFdBQVcsdUJBRVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRm9CLFdBQVc7WUFBWCxXQUFXOztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7a0VBQVgsV0FBVzs7O2VBQVgsV0FBVzs7Ozs7O3dCQVMxQixJQUFJLEVBQUU7QUFDUixhQUFPLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxTQUFTLFVBQUssSUFBSSxDQUFHLENBQUM7S0FDM0M7OztTQVhrQixXQUFXO0dBQVMsNEJBQWtCLE9BQU87OytCQUlqRTs7a0JBSm9CLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRlgsZ0JBQWdCO1dBQWhCLGdCQUFnQjswQkFBaEIsZ0JBQWdCOzs7ZUFBaEIsZ0JBQWdCOzs7Ozs7O3NDQU1qQjtBQUNoQixVQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTs7O0FBQUMsQUFHN0IsVUFBSSxRQUFRLEVBQUU7O0FBRVosWUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7O0FBRWhDLGtCQUFRLEdBQUcsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEQ7O0FBRUQsWUFBSSxtQkFBbUIsRUFBRTtBQUN2QixpQ0FBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQzs7QUFFRCxZQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtBQUM1Qiw0QkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzlDOzs7QUFBQSxBQUdELFlBQUksSUFBSSxHQUFHLG1CQUFtQixHQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7QUFDdkIsWUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUFDLEFBQ3RDLFlBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4RCxZQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3pCO0tBQ0Y7OztTQWhDa0IsZ0JBQWdCOzs7OztrQkFBaEIsZ0JBQWdCO0FBc0NyQyxJQUFNLG1CQUFtQixHQUFJLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsS0FBSyxXQUFXLEFBQUM7OztBQUFDLEFBSTVGLFNBQVMsMkJBQTJCLENBQUMsU0FBUyxFQUFFO0FBQzlDLE1BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDOzs7O0FBQUMsQUFJbEQsTUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxLQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixTQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNoQyxZQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDakQ7QUFDRCxTQUFPLFFBQVEsQ0FBQztDQUNqQjs7OztBQUFBLEFBSUQsU0FBUyx1QkFBdUIsQ0FBQyxRQUFRLEVBQUU7QUFDekMsSUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFBLFdBQVcsRUFBSTtBQUN4RSxRQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZELGVBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztHQUNsRSxDQUFDLENBQUM7Q0FDSjs7O0FBQUEsQUFHRCxTQUFTLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7QUFDekMsZUFBYSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztDQUM1RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogTWl4aW4gdXNlZCB0byBhZGQgcHJvbWluZW50IGxlZnQgYW5kIHJpZ2h0IGFycm93IGJ1dHRvbnMgdG8gYSB3cmFwcGVkIGNoaWxkLlxuICogQ2xpY2tpbmcgdGhlIGxlZnQvcmlnaHQgYnV0dG9uIG1hcHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgbGVmdC9yaWdodFxuICogZGlyZWN0aW9uLlxuICpcbiAqIEJ5IGRlZmF1bHQsIHRoZSBhcnJvdyBidXR0b25zIGFyZSBzaG93biBvbiBkZXZpY2VzIHdpdGggYSBtb3VzZSBvciBtb3VzZS1saWtlXG4gKiBwb2ludCBkZXZpY2U7IHRoZXkgYXJlIG5vdCBzaG93biBvbiBhIHRvdWNoLWNhcGFibGUgZGV2aWNlIHVubGVzcyBtb3VzZVxuICogbW92ZW1lbnQgaXMgZGV0ZWN0ZWQuIFRvIGNhdXNlIHRoZSBidXR0b25zIHRvIGFsd2F5cyBhcHBlYXIsIGFwcGx5IHRoZVxuICogJ3Nob3dBcnJvd3MnIENTUyBjbGFzcy5cbiAqXG4gKiBAY2xhc3MgYmFzaWMtYXJyb3ctZGlyZWN0aW9uXG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2NvcmUtY29tcG9uZW50LW1peGlucy9zcmMvRWxlbWVudEJhc2UnO1xuXG5pbXBvcnQgQ2hpbGRyZW5Db250ZW50IGZyb20gJy4uLy4uL21peGlucy9DaGlsZHJlbkNvbnRlbnQnO1xuaW1wb3J0IENvbGxlY3RpdmVFbGVtZW50IGZyb20gJy4uLy4uL21peGlucy9Db2xsZWN0aXZlRWxlbWVudCc7XG5pbXBvcnQgQ29udGVudEZpcnN0Q2hpbGRUYXJnZXQgZnJvbSAnLi4vLi4vbWl4aW5zL0NvbnRlbnRGaXJzdENoaWxkVGFyZ2V0JztcbmltcG9ydCBEaXJlY3Rpb25TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0RpcmVjdGlvblNlbGVjdGlvbic7XG5pbXBvcnQgSXRlbVNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvSXRlbVNlbGVjdGlvbic7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkJztcbmltcG9ydCBUYXJnZXRTZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL1RhcmdldFNlbGVjdGlvbic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyb3dEaXJlY3Rpb24ge1xuXG4gIHNldCBjYW5TZWxlY3ROZXh0KGNhblNlbGVjdE5leHQpIHtcbiAgICB0aGlzLiQuYnV0dG9uUmlnaHQuZGlzYWJsZWQgPSAhY2FuU2VsZWN0TmV4dDtcbiAgfVxuXG4gIHNldCBjYW5TZWxlY3RQcmV2aW91cyhjYW5TZWxlY3RQcmV2aW91cykge1xuICAgIHRoaXMuJC5idXR0b25MZWZ0LmRpc2FibGVkID0gIWNhblNlbGVjdFByZXZpb3VzO1xuICB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuJC5idXR0b25MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5nb0xlZnQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICAgIHRoaXMuJC5idXR0b25SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZ29SaWdodCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gICAgYXNzdW1lQnV0dG9uRm9jdXModGhpcywgdGhpcy4kLmJ1dHRvbkxlZnQpO1xuICAgIGFzc3VtZUJ1dHRvbkZvY3VzKHRoaXMsIHRoaXMuJC5idXR0b25SaWdodCk7XG5cbiAgICBpZiAoIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93QXJyb3dzJykpIHtcbiAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHdlIHNob3VsZCBzaG93IGFycm93IGJ1dHRvbnMgb3Igbm90LlxuICAgICAgaWYgKGRldmljZVN1cHBvcnRzVG91Y2goKSkge1xuICAgICAgICAvLyBBIHRvdWNoIGRldmljZSBtaWdodCBhbHNvIHN1cHBvcnQgYSBtb3VzZSwgYnV0IHdlIGNhbid0IGtub3cgd2hldGhlclxuICAgICAgICAvLyB0aGVyZSdzIGFjdHVhbGx5IGEgbW91c2UgdW50aWwgd2UgaGVhciBmcm9tIGl0LlxuICAgICAgICBsaXN0ZW5Gb3JNb3VzZSh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZSBkZXZpY2UgZG9lc24ndCBzdXBwb3J0IHRvdWNoLCBzbyBhc3N1bWUgaXQgaGFzIGEgbW91c2UuXG4gICAgICAgIHNob3dBcnJvd3ModGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0ZWRJdGVtQ2hhbmdlZCgpIHtcbiAgICAvLyBIQUNLOiBGb3JjZSBhbiB1cGRhdGUgb2YgdGhlIHNldCBvZiBwb3NzaWJsZSBuYXZpZ2F0aW9ucy5cbiAgICB0aGlzLml0ZW1zQ2hhbmdlZCgpO1xuICB9XG5cbiAgLypcbiAgICogVGhlIHRlbXBsYXRlIHVzZXMgdGhlIGNoZXZyb24tbGVmdCBhbmQgY2hldnJvbi1yaWdodCBTVkcgaWNvbnMgZnJvbVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vUG9seW1lckVsZW1lbnRzL2lyb24taWNvbnMvYmxvYi9tYXN0ZXIvaXJvbi1pY29ucy5odG1sLlxuICAgKi9cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgfVxuXG4gICAgICAjYXJyb3dOYXZpZ2F0aW9uQ29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtZmxleDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgIC13ZWJraXQtZmxleDogMTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgLm5hdmlnYXRpb25CdXR0b24ge1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG4gICAgICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBvdXRsaW5lOiBub25lOyAvKiBSRVZJRVc6IEFjY2Vzc2liaWxpdHkgc2hvdWxkIGJlIHByb3ZpZGVkIGJ5IG90aGVyIGVsZW1lbnRzLiAqL1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDFzO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICAubmF2aWdhdGlvbkJ1dHRvbjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgICAgIH1cbiAgICAgIC5uYXZpZ2F0aW9uQnV0dG9uOmFjdGl2ZTpub3QoOmRpc2FibGVkKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC43KTtcbiAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcbiAgICAgIH1cbiAgICAgIC5uYXZpZ2F0aW9uQnV0dG9uOmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoOm5vdCguc2hvd0Fycm93cykpIC5uYXZpZ2F0aW9uQnV0dG9uIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAubmF2aWdhdGlvbkJ1dHRvbiAuaWNvbiB7XG4gICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICB9XG5cbiAgICAgIC8qIE92ZXJsYXkgdmFyaWFudCAqL1xuICAgICAgOmhvc3QoLm92ZXJsYXkpIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuICAgICAgOmhvc3QoLm92ZXJsYXkpIC5uYXZpZ2F0aW9uQnV0dG9uIHtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cbiAgICAgIDpob3N0KC5vdmVybGF5KSAjYnV0dG9uTGVmdCB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICB9XG4gICAgICA6aG9zdCgub3ZlcmxheSkgI2J1dHRvblJpZ2h0IHtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICB9XG4gICAgICA6aG9zdCgub3ZlcmxheSkgLm5hdmlnYXRpb25CdXR0b246aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gICAgICB9XG4gICAgICA6aG9zdCgub3ZlcmxheSkgLm5hdmlnYXRpb25CdXR0b246YWN0aXZlOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpO1xuICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xuICAgICAgfVxuICAgICAgOmhvc3QoLm92ZXJsYXkpIC5uYXZpZ2F0aW9uQnV0dG9uOmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDwhLS1cbiAgICAgIEFjY2Vzc2liaWxpdHkgbm90ZTogc2luY2UgdGhlIG5hdmlnYXRpb24gb2ZmZXJlZCBieSB0aGUgYXJyb3cgYnV0dG9ucyBzaG91bGRcbiAgICAgIGJlIHJlZHVuZGFudCAodGhhdCBpcywgdGhlcmUgc2hvdWxkIGJlIG90aGVyIHdheXMgb2YgbmF2aWdhdGluZyB0aGUgbGlzdCksXG4gICAgICB3ZSBtYXJrIHRoZSBidXR0b24gYXMgYXJpYS1oaWRkZW4gc28gdGhhdCBhc3Npc3RpdmUgZGV2aWNlcyBpZ25vcmUgdGhlbS5cbiAgICAgIC0tPlxuICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvbkxlZnRcIiBjbGFzcz1cIm5hdmlnYXRpb25CdXR0b25cIiBkaXNhYmxlZCB0YWJpbmRleD1cIi0xXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZCBtZWV0XCI+XG4gICAgICAgICAgPGcgaWQ9XCJjaGV2cm9uLWxlZnRcIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTUuNDEgNy40MUwxNCA2bC02IDYgNiA2IDEuNDEtMS40MUwxMC44MyAxMnpcIi8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBpZD1cImFycm93TmF2aWdhdGlvbkNvbnRhaW5lclwiPlxuICAgICAgICA8Y29udGVudD48L2NvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gaWQ9XCJidXR0b25SaWdodFwiIGNsYXNzPVwibmF2aWdhdGlvbkJ1dHRvblwiIGRpc2FibGVkIHRhYmluZGV4PVwiLTFcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cImljb25cIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIj5cbiAgICAgICAgICA8ZyBpZD1cImNoZXZyb24tcmlnaHRcIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAgNkw4LjU5IDcuNDEgMTMuMTcgMTJsLTQuNTggNC41OUwxMCAxOGw2LTZ6XCIvPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICBgO1xuICB9XG5cbn1cblxuXG4vKlxuICogQnkgZGVmYXVsdCwgYSBidXR0b24gd2lsbCBhbHdheXMgdGFrZSBmb2N1cyBvbiBtb3VzZWRvd24uIEZvciB0aGlzIGNvbXBvbmVudCxcbiAqIHdlIHdhbnQgdG8gb3ZlcnJpZGUgdGhhdCBiZWhhdmlvciwgc3VjaCB0aGF0IGEgbW91c2Vkb3duIG9uIGEgYnV0dG9uIGtlZXBzXG4gKiB0aGUgZm9jdXMgb24gdGhlIG91dGVyIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gYXNzdW1lQnV0dG9uRm9jdXMoZWxlbWVudCwgYnV0dG9uKSB7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgLy8gR2l2ZW4gdGhlIG91dGVyIGVsZW1lbnQgZm9jdXMgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGhhdmUgaXQuXG4gICAgbGV0IG91dGVybW9zdCA9IGVsZW1lbnQuY29sbGVjdGl2ZS5vdXRlcm1vc3RFbGVtZW50O1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgZm9jdXMtb24tbW91c2Vkb3duIGJlaGF2aW9yLlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGRldmljZVN1cHBvcnRzVG91Y2goKSB7XG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHxcbiAgICAgICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpO1xufVxuXG5cbi8vIFdlIHRyeSB0byBkZXRlY3QgdGhlIHByZXNlbmNlIG9mIGEgbW91c2UgYnkgbGlzdGVuaW5nIGZvciBtb3VzZW1vdmUgZXZlbnRzXG4vLyB3aGljaCBhcmUgKm5vdCogdGhlIHJlc3VsdCBvZiBhIG1vdXNlZG93bi4gT24gYSB0b3VjaCBkZXZpY2UsIGEgdGFwIG9uIHRoZVxuLy8gcGFnZSB3aWxsIGdlbmVyYXRlIGEgZmFrZSBtb3VzZW1vdmUsIGZvbGxvd2VkIGJ5IGEgbW91c2Vkb3duLiBXZSBkb24ndCB3YW50XG4vLyB0byByZXNwb25kIHRvIHRob3NlIGZha2UgbW91c2Vtb3ZlIGV2ZW50cy4gVG8gZGlzY3JpbWluYXRlIGJldHdlZW4gZmFrZSBhbmRcbi8vIHJlYWwgbW91c2Vtb3ZlIGV2ZW50cywgd2hlbiB3ZSBnZXQgYSBtb3VzZW1vdmUgZXZlbnQsIHdlIHdhaXQgZm9yIGEgdGljayB0b1xuLy8gc2VlIGlmIHRoZSBzYW1lIGxvY2F0aW9uIGlzIHJlcG9ydGVkIGFzIHRoZSBsb2NhdGlvbiBvZiBhIHN1YnNlcXVlbnRcbi8vIG1vdXNlZG93bi5cbmZ1bmN0aW9uIGxpc3RlbkZvck1vdXNlKGVsZW1lbnQpIHtcblxuICBlbGVtZW50Ll9tb3VzZWRvd25MaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlZG93blwiKTtcbiAgICBlbGVtZW50Ll9sYXN0TW91c2VEb3duUGFnZVggPSBldmVudC5wYWdlWDtcbiAgICBlbGVtZW50Ll9sYXN0TW91c2VEb3duUGFnZVkgPSBldmVudC5wYWdlWTtcbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGVsZW1lbnQuX21vdXNlZG93bkxpc3RlbmVyKTtcblxuICBlbGVtZW50Ll9tb3VzZW1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlbW92ZVwiKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChldmVudC5wYWdlWCAhPT0gZWxlbWVudC5fbGFzdE1vdXNlRG93blBhZ2VYIHx8XG4gICAgICAgICAgZXZlbnQucGFnZVkgIT09IGVsZW1lbnQuX2xhc3RNb3VzZURvd25QYWdlWSkge1xuICAgICAgICAvLyBtb3VzZW1vdmUgZXZlbnQgd2FzIGF0IGEgbG9jYXRpb24gb3RoZXIgdGhhbiB0aGUgbGFzdCBtb3VzZWRvd24sXG4gICAgICAgIC8vIGFuZCBoZW5jZSBtb3N0IGxpa2VseSBhIHJlYWwgbW91c2Vtb3ZlIGV2ZW50LlxuICAgICAgICBtb3VzZURldGVjdGVkKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZWxlbWVudC5fbW91c2Vtb3ZlTGlzdGVuZXIpO1xufVxuXG5cbmZ1bmN0aW9uIG1vdXNlRGV0ZWN0ZWQoZWxlbWVudCkge1xuICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlIGRldGVjdGVkXCIpO1xuICBzaG93QXJyb3dzKGVsZW1lbnQpO1xuXG4gIC8vIFdlIGNhbiBzdG9wIGxpc3RlbmluZyBmb3IgbW91c2UgZXZlbnRzIG5vdy5cbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGVsZW1lbnQuX21vdXNlZG93bkxpc3RlbmVyKTtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGVsZW1lbnQuX21vdXNlbW92ZUxpc3RlbmVyKTtcbiAgZWxlbWVudC5fbW91c2Vkb3duTGlzdGVuZXIgPSBudWxsO1xuICBlbGVtZW50Ll9tb3VzZW1vdmVMaXN0ZW5lciA9IG51bGw7XG59XG5cblxuZnVuY3Rpb24gc2hvd0Fycm93cyhlbGVtZW50KSB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2hvd0Fycm93cycpO1xufVxuXG5cbkFycm93RGlyZWN0aW9uID0gRWxlbWVudEJhc2UuY29tcG9zZShcbiAgQ2hpbGRyZW5Db250ZW50LFxuICBDb2xsZWN0aXZlRWxlbWVudCxcbiAgQ29udGVudEZpcnN0Q2hpbGRUYXJnZXQsXG4gIERpcmVjdGlvblNlbGVjdGlvbixcbiAgS2V5Ym9hcmQsXG4gIEl0ZW1TZWxlY3Rpb24sXG4gIFRhcmdldFNlbGVjdGlvbixcbiAgQXJyb3dEaXJlY3Rpb25cbik7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtYXJyb3ctZGlyZWN0aW9uJywgQXJyb3dEaXJlY3Rpb24pO1xuIiwiLypcbiAqIExldHMgdGhlIHVzZXIgbmF2aWdhdGUgbGF0ZXJhbGx5IHRocm91Z2ggYSBzZXF1ZW5jZSBvZiBjaGlsZCBlbGVtZW50cy5cbiAqXG4gKiBiYXNpYy1jYXJvdXNlbCBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgY2Fyb3VzZWwgdXNlciBpbnRlcmZhY2UgcGF0dGVybixcbiAqIGNvbW1vbmx5IHVzZWQgZm9yIG5hdmlnYXRpbmcgYmV0d2VlbiBpbWFnZXMsIHBhZ2VzLCBhbmQgb3RoZXIgZWxlbWVudHMuXG4gKiBUaGlzIHBhdHRlcm4gcHJlc2VudHMgdGhlIHVzZXIgd2l0aCBhIGxpbmVhciBzZXF1ZW5jZSBvZiBlbGVtZW50cywgb25seSBvbmUgb2ZcbiAqIHdoaWNoIGlzIHNob3duIGF0IGEgdGltZS4gVGhlIHVzZXIgY2FuIG5hdmlnYXRlIHRvIHRoZSBuZXh0L3ByZXZpb3VzIGVsZW1lbnRcbiAqIHdpdGggYSB2YXJpZXR5IG9mIGlucHV0IG1ldGhvZHMuXG4gKlxuICogYmFzaWMtY2Fyb3VzZWwgdXNlcyBpdHMgY2hpbGRyZW4gYXMgdGhlIGVsZW1lbnRzIHRoZSB1c2VyIHdpbGwgbmF2aWdhdGUgdGhyb3VnaC5cbiAqIEluIGEgdHlwaWNhbCB1c2UsIGEgYmFzaWMtY2Fyb3VzZWwgY2FuIGJlIHVzZWQgdG8gbmF2aWdhdGUgYmV0d2VlbiBhIHNlcXVlbmNlIG9mXG4gKiBpbWFnZXM6XG4gKlxuICogICAgIDxiYXNpYy1jYXJvdXNlbD5cbiAqICAgICAgIDxpbWcgc3JjPVwiaW1hZ2UxLmpwZ1wiPlxuICogICAgICAgPGltZyBzcmM9XCJpbWFnZTIuanBnXCI+XG4gKiAgICAgICA8aW1nIHNyYz1cImltYWdlMy5qcGdcIj5cbiAqICAgICA8L2Jhc2ljLWNhcm91c2VsPlxuICpcbiAqIFRoZSBjaGlsZCBlbGVtZW50cyBjYW4gYmUgb2YgYW55IHR5cGUg4oCUwqB0aGV5IGFyZSBub3QgcmVzdHJpY3RlZCB0byBpbWFnZXMuXG4gKlxuICogVGhpcyBjb21wb25lbnQgYXR0ZW1wdHMgdG8gbWVldCB0aGUgW0dvbGQgU3RhbmRhcmQgZm9yIHdlYiBjb21wb25lbnRzXVxuICogKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJjb21wb25lbnRzL2dvbGQtc3RhbmRhcmQvd2lraSkgc28gdGhhdCBpdCBpcyBnZW5lcmFsbHlcbiAqIGFzIGZsZXhpYmxlIGFuZCByb2J1c3QgYXMgc3RhbmRhcmQgSFRNTCBlbGVtZW50cy4gRm9yIGV4YW1wbGUsIGl0IG1lZXRzIHRoZVxuICogXCJDb250ZW50IENoYW5nZXNcIiBjcml0ZXJpYTogdGhlIGNhcm91c2VsIHdpbGwgYWRhcHQgdG8gbmV3IGNoaWxkIGVsZW1lbnRzIGFkZGVkXG4gKiBvciByZW1vdmVkIGF0IHJ1bnRpbWUuXG4gKlxuICogQ3VycmVudGx5LCB0aGlzIGNvbXBvbmVudCBkb2VzIG5vdCBtZWV0IHRoZSBHb2xkIFN0YW5kYXJkIGNyaXRlcmlhIFwiU2l6ZSB0b1xuICogQ29udGVudFwiLiBBcyBhIHJlc3VsdCwgZm9yIHRoZSB0aW1lIGJlaW5nLCAqKnlvdSBtdXN0IG1hbnVhbGx5IHNldCBhIHNpemUgb25cbiAqIHRoaXMgY29tcG9uZW50KiouIFR3byBhcHByb2FjaGVzIGFyZSB0bzogMSkgc3RyZXRjaCB0aGUgY29tcG9uZW50IGFjcm9zc1xuICogd2hhdGV2ZXIgc3VyZmFjZSBpdCBpcyBjb250YWluZWQgd2l0aGluLCBvciAyKSBzZXQgaXQgdG8gYmUgbGFyZ2VyIHRoYW4gdGhlXG4gKiBsYXJnZXN0IGNoaWxkIGVsZW1lbnQgeW91IHdhbnQgdG8gZGlzcGxheS4gVGhlIGZvcm1lciBhcHByb2FjaCBpcyBtb3JlIGNvbW1vbixcbiAqIGFuZCBjYW4gYmUgYWNoaWV2ZWQgd2l0aCBDU1Mgc3R5bGluZyBzdWNoIGFzOlxuICpcbiAqICAgICBodG1sIHtcbiAqICAgICAgIGhlaWdodDogMTAwJTtcbiAqICAgICB9XG4gKlxuICogICAgIGJvZHkge1xuICogICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICogICAgICAgZGlzcGxheTogZmxleDtcbiAqICAgICAgIGhlaWdodDogMTAwJTtcbiAqICAgICAgIG1hcmdpbjogMDtcbiAqICAgICB9XG4gKlxuICogICAgIGJhc2ljLWNhcm91c2VsIHtcbiAqICAgICAgIC13ZWJraXQtZmxleDogMTtcbiAqICAgICAgIGZsZXg6IDE7XG4gKiAgICAgfVxuICpcbiAqIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gdXNlIGEgc2VwYXJhdGUgY29tcG9uZW50LFxuICogW2Jhc2ljLWNhcm91c2VsLWZpdF0oaHR0cDovL2dpdGh1Yi5jb20vYmFzaWMtd2ViLWNvbXBvbmVudHMvYmFzaWMtY2Fyb3VzZWwtZml0KSxcbiAqIHdoaWNoIGlzIGRlc2lnbmVkIHRvIGF1dG9tYXRpY2FsbHkgc2l6ZSBpdHNlbGYgdG8gaXRzIGxhcmdlc3QgY2hpbGQgZWxlbWVudHMuXG4gKlxuICogVGhlIHN0YW5kYXJkIGJhc2ljLWNhcm91c2VsIGNvbXBvbmVudCBzdXBwb3J0cyBuYXZpZ2F0aW9uIHZpYSB0aGUgZm9sbG93aW5nXG4gKiBpbnB1dCBtZXRob2RzOlxuICpcbiAqICogS2V5Ym9hcmQuIFdoZW4gdGhlIGNhcm91c2VsIGhhcyBmb2N1cywgdGhlIHVzZXIgY2FuIHByZXNzIExlZnQsIFJpZ2h0LCBIb21lLFxuICogb3IgRW5kLiBUaGVzZSBuYXZpZ2F0ZSB0byB0aGUgZXhwZWN0ZWQgZWxlbWVudC5cbiAqICogVG91Y2guIE9uIG1vYmlsZSBhbmQgb3RoZXIgdG91Y2gtZW5hYmxlZCBkZXZpY2VzLCB0aGUgdXNlciBjYW4gZHJhZyBsZWZ0IG9yXG4gKiByaWdodC5cbiAqICogVHJhY2twYWQuIFRoZSB1c2VyIGNhbiBzd2lwZSBsZWZ0IG9yIHJpZ2h0IG9uIGEgdHJhY2twYWQgdG8gbmF2aWdhdGUuXG4gKlxuICogYmFzaWMtY2Fyb3VzZWwgc3VwcG9ydHMgYSB2YXJpZXR5IG9mIG9wdGlvbmFsIHVzZXIgaW50ZXJmYWNlIGFjY2Vzc29yaWVzOlxuICogKiBbYmFzaWMtYXJyb3ctZGlyZWN0aW9uXShodHRwOi8vZ2l0aHViLmNvbS9iYXNpYy13ZWItY29tcG9uZW50cy9iYXNpYy1hcnJvdy1kaXJlY3Rpb24pLlxuICogICBUaGlzIGFkZHMgcHJvbWluZW50IGxlZnQgYW5kIHJpZ2h0IGFycm93IGJ1dHRvbnMgb24gdGhlIHNpZGUgb2YgdGhlIGNhcm91c2VsLlxuICogKiBbYmFzaWMtcGFnZS1kb3RzXShodHRwOi8vZ2l0aHViLmNvbS9iYXNpYy13ZWItY29tcG9uZW50cy9iYXNpYy1wYWdlLWRvdHMpLlxuICogICBUaGlzIGFkZHMgYSBzZXJpZXMgb2Ygc21hbGwgZG90cyBiZWxvdyB0aGUgY2Fyb3VzZWwgdG8gaW5kaWNhdGUgdGhlIHVzZXInc1xuICogICBjdXJyZW50IHBvc2l0aW9uIGluIHRoZSBzZXF1ZW5jZS5cbiAqXG4gKiBTZWUgdGhvc2UgY29tcG9uZW50cyBmb3IgbW9yZSBkZXRhaWxzLCBidXQgaW4gZ2VuZXJhbCB5b3UgY2FuIGNvbnN0cnVjdCBhIGNvbW1vblxuICogY2Fyb3VzZWwgd2l0aCBib3RoIGFycm93IGJ1dHRvbnMgYW5kIGRvdHMgbGlrZSBzbzpcbiAqXG4gKiAgICAgPGJhc2ljLWFycm93LWRpcmVjdGlvbiB0YXJnZXQ9XCJjaGlsZFwiPlxuICogICAgICAgPGJhc2ljLXBhZ2UtZG90cyB0YXJnZXQ9XCJjaGlsZFwiPlxuICogICAgICAgICA8YmFzaWMtY2Fyb3VzZWw+XG4gKiAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZTEuanBnXCI+XG4gKiAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZTIuanBnXCI+XG4gKiAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZTMuanBnXCI+XG4gKiAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZTQuanBnXCI+XG4gKiAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZTUuanBnXCI+XG4gKiAgICAgICAgIDwvYmFzaWMtY2Fyb3VzZWw+XG4gKiAgICAgICA8L2Jhc2ljLXBhZ2UtZG90cz5cbiAqICAgICA8L2Jhc2ljLWFycm93LWRpcmVjdGlvbj5cbiAqXG4gKiBGb3IgdW5pdmVyc2FsIGFjY2VzcywgYmFzaWMtY2Fyb3VzZWwgYXV0b21hdGljYWxseSBhZGRzIGEgdmFyaWV0eSBvZlxuICogW0FSSUFdKGh0dHA6Ly93d3cudzMub3JnL1dBSS9pbnRyby9hcmlhKSBwcm9wZXJ0aWVzIHRvIGl0c2VsZiBhbmQgdG8gY2hpbGRcbiAqIGVsZW1lbnRzLiBUaGlzIGhlbHBzIHVzZXJzIG5hdmlnYXRlIHRoZSBzZXF1ZW5jZSBvZiBlbGVtZW50cyBpbiB0aGUgY2Fyb3VzZWxcbiAqIHVzaW5nIGFzc2lzdGl2ZSB0ZWNobm9sb2dpZXMuXG4gKlxuICogQGNsYXNzIENhcm91c2VsXG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2NvcmUtY29tcG9uZW50LW1peGlucy9zcmMvRWxlbWVudEJhc2UnO1xuaW1wb3J0IENvbGxlY3RpdmVFbGVtZW50IGZyb20gJy4uLy4uL21peGlucy9Db2xsZWN0aXZlRWxlbWVudCc7XG5pbXBvcnQgQ29udGVudEl0ZW1zIGZyb20gJy4uLy4uL21peGlucy9Db250ZW50SXRlbXMnO1xuaW1wb3J0IERpcmVjdGlvblNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvRGlyZWN0aW9uU2VsZWN0aW9uJztcbmltcG9ydCBHZW5lcmljIGZyb20gJy4uLy4uL21peGlucy9HZW5lcmljJztcbmltcG9ydCBJdGVtU2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9JdGVtU2VsZWN0aW9uJztcbmltcG9ydCBJdGVtc0FjY2Vzc2libGUgZnJvbSAnLi4vLi4vbWl4aW5zL0l0ZW1zQWNjZXNzaWJsZSc7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkJztcbmltcG9ydCBLZXlib2FyZERpcmVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmREaXJlY3Rpb24nO1xuaW1wb3J0IFNsaWRpbmdWaWV3cG9ydCBmcm9tICcuLi9TbGlkaW5nVmlld3BvcnQvU2xpZGluZ1ZpZXdwb3J0JztcbmltcG9ydCBTd2lwZURpcmVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvU3dpcGVEaXJlY3Rpb24nO1xuaW1wb3J0IFRyYWNrcGFkRGlyZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9UcmFja3BhZERpcmVjdGlvbic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWwge1xuXG4gIGF0dGFjaGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gSEFDS1xuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gICAgdGhpcy5zZWxlY3Rpb25SZXF1aXJlZCA9IHRydWU7XG4gIH1cblxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy4kLnZpZXdwb3J0LmNvbnRlbnQ7XG4gIH1cblxuICAvLyBTdHViIGZvciBjb2xsZWN0aXZlcyBmb3Igbm93XG4gIGdldCBpbm5lcm1vc3RBdHRhY2hlZCgpIHtcbiAgICByZXR1cm4gdGhpcy4kLnZpZXdwb3J0O1xuICB9XG5cbiAgLy8gU3R1YiBmb3IgY29sbGVjdGl2ZXMgZm9yIG5vd1xuICBnZXQgb3V0ZXJtb3N0QXR0YWNoZWQoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuJC52aWV3cG9ydC5wb3NpdGlvbjtcbiAgfVxuICBzZXQgcG9zaXRpb24odmFsdWUpIHtcbiAgICB0aGlzLiQudmlld3BvcnQucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIHRoaXMuJC52aWV3cG9ydC5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICB9XG5cbiAgc2hvd1RyYW5zaXRpb24oc2hvdykge1xuICAgIHJldHVybiB0aGlzLiQudmlld3BvcnQuc2hvd1RyYW5zaXRpb24oc2hvdyk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuXG4gICAgICBiYXNpYy1zbGlkaW5nLXZpZXdwb3J0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAtd2Via2l0LWZsZXg6IDE7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8YmFzaWMtc2xpZGluZy12aWV3cG9ydCBpZD1cInZpZXdwb3J0XCI+XG4gICAgICAgIDxjb250ZW50PjwvY29udGVudD5cbiAgICAgIDwvYmFzaWMtc2xpZGluZy12aWV3cG9ydD5cbiAgICBgO1xuICB9XG5cbn1cblxuQ2Fyb3VzZWwgPSBFbGVtZW50QmFzZS5jb21wb3NlKFxuICBDb2xsZWN0aXZlRWxlbWVudCxcbiAgQ29udGVudEl0ZW1zLFxuICBEaXJlY3Rpb25TZWxlY3Rpb24sXG4gIEdlbmVyaWMsXG4gIEl0ZW1TZWxlY3Rpb24sXG4gIEl0ZW1zQWNjZXNzaWJsZSxcbiAgS2V5Ym9hcmQsXG4gIEtleWJvYXJkRGlyZWN0aW9uLFxuICBTd2lwZURpcmVjdGlvbixcbiAgVHJhY2twYWREaXJlY3Rpb24sXG4gIENhcm91c2VsXG4pO1xuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtY2Fyb3VzZWwnLCBDYXJvdXNlbCk7XG4iLCIvKipcbiAqIEEgc2luZ2xlLXNlbGVjdGlvbiBsaXN0IGJveCB0aGF0IHN1cHBvcnRzIHNlbGVjdGlvbiBoaWdobGlnaHRpbmcgKHVzaW5nIHRoZVxuICogc3lzdGVtIGhpZ2hsaWdodCBjb2xvcikgYW5kIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gKlxuICogVGhlIHVzZXIgY2FuIHNlbGVjdCBhbiBpdGVtIHdpdGggdGhlIG1vdXNlL3RvdWNoIG9yIGtleWJvYXJkOiBVcC9Eb3duLCBQYWdlXG4gKiBVcC9Eb3duLCBIb21lL0VuZC5cbiAqXG4gKiBMaWtlIG90aGVyIEJhc2ljIFdlYiBDb21wb25lbnRzLCB0aGlzIGNhbiBoYW5kbGUgZGlzdHJpYnV0ZWQgY29udGVudDogeW91IGNhblxuICogaW5jbHVkZSBhIGNvbnRlbnQgZWxlbWVudCBpbnNpZGUgYSBiYXNpYy1saXN0LWJveCwgYW5kIHRoZSBsaXN0IHdpbGwgbmF2aWdhdGVcbiAqIHRocm91Z2ggdGhlIGRpc3RyaWJ1dGVkIGNvbnRlbnQuIE5vdGU6IGZvciB0aGUgdGltZSBiZWluZywgaWYgeW91IGRvIHVzZSBiYXNpYy1cbiAqIGxpc3QtYm94IGluc2lkZSB5b3VyIG93biBjb21wb25lbnQsIGl0IGFwcGVhcnMgdGhhdCB5b3UnbGwgbmVlZCB0byB3aXJlIHVwIHlvdXJcbiAqIG93biBrZXlib2FyZCBuYXZpZ2F0aW9uLCBhbmQgZm9yd2FyZCB0aGUgbGlzdCBuYXZpZ2F0aW9uIGtleXMgdG8gdGhlIGJhc2ljLWxpc3QtXG4gKiBib3guXG4gKlxuICogVGhpcyBjb21wb25lbnQgaW5jbHVkZXMgYmFzaWMgQVJJQSBzdXBwb3J0IHRvIHByb3ZpZGUgYSByZWFzb25hYmxlIGRlZmF1bHRcbiAqIGV4cGVyaWVuY2UsIGUuZy4sIGZvciBzY3JlZW4gcmVhZGVycy4gVGhlIGxpc3QgY29tcG9uZW50IGl0c2VsZiB3aWxsIGJlIGFzc2lnbmVkXG4gKiBhbiBhcHByb3ByaWF0ZSBBUklBIHJvbGUgKGRlZmF1bHQgaXMgXCJsaXN0Ym94XCIpLiBUaGUgSUQgb2YgdGhlIHNlbGVjdGVkIGl0ZW1cbiAqIHdpbGwgYmUgcmVmbGVjdGVkIGluIGFuIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIgYXR0cmlidXRlIGFwcGxpZWQgdG8gdGhlIGxpc3QuXG4gKiBUbyBzdXBwb3J0IHRoaXMgZmVhdHVyZSwgYWxsIGl0ZW1zIGluIHRoZSBsaXN0IG5lZWQgdW5pcXVlIElEcy4gSWYgYW4gaXRlbSBkb2VzXG4gKiBub3QgaGF2ZSBhbiBJRCwgYmFzaWMtbGlzdC1ib3ggd2lsbCBhdXRvbWF0aWNhbGx5IGFzc2lnbiBhIGRlZmF1bHQgSUQuXG4gKlxuICogVGhlIGtleWJvYXJkIGludGVyYWN0aW9uIG1vZGVsIGdlbmVyYWxseSBmb2xsb3dzIHRoYXQgb2YgTWljcm9zb2Z0IFdpbmRvd3MnXG4gKiBsaXN0IGJveGVzIGluc3RlYWQgb2YgdGhvc2UgaW4gT1MgWDpcbiAqXG4gKiAqIFRoZSBQYWdlIFVwL0Rvd24gYW5kIEhvbWUvRW5kIGtleXMgYWN0dWFsbHkgbW92ZSB0aGUgc2VsZWN0aW9uLCByYXRoZXIgdGhhblxuICogICBqdXN0IHNjcm9sbGluZyB0aGUgbGlzdC4gVGhlIGZvcm1lciBiZWhhdmlvciBzZWVtcyBtb3JlIGdlbmVyYWxseSB1c2VmdWwgZm9yXG4gKiAgIGtleWJvYXJkIHVzZXJzLlxuICpcbiAqICogUHJlc3NpbmcgUGFnZSBVcC9Eb3duIHdpbGwgbW92ZSB0aGUgc2VsZWN0aW9uIHRvIHRoZSB0b3Btb3N0L2JvdHRvbW1vc3RcbiAqICAgdmlzaWJsZSBpdGVtIGlmIHRoZSBzZWxlY3Rpb24gaXMgbm90IGFscmVhZHkgdGhlcmUuIFRoZXJlYWZ0ZXIsIHRoZSBrZXkgd2lsbFxuICogICBtb3ZlIHRoZSBzZWxlY3Rpb24gdXAvZG93biBieSBhIHBhZ2UsIGFuZCAocGVyIHRoZSBhYm92ZSBwb2ludCkgbWFrZSB0aGVcbiAqICAgc2VsZWN0ZWQgaXRlbSB2aXNpYmxlLlxuICpcbiAqIFByb2dyYW1tYXRpY2FsbHkgc2VsZWN0aW5nIGFuIGl0ZW0gKGJ5IHNldHRpbmcgdGhlIHNlbGVjdGVkIHByb3BlcnR5KSBzY3JvbGxzXG4gKiB0aGUgaXRlbSBpbnRvIHZpZXcuXG4gKlxuICogVGhlIHVzZXIgY2FuIGFsc28gc2VsZWN0IGFuIGl0ZW0gYnkgdHlwaW5nIHRoZSBiZWdpbm5pbmcgb2YgYW4gaXRlbSdzIHRleHQuXG4gKlxuICogQGNsYXNzIExpc3RCb3hcbiAqL1xuXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdjb3JlLWNvbXBvbmVudC1taXhpbnMvc3JjL0VsZW1lbnRCYXNlJztcbmltcG9ydCBDaGlsZHJlbkNvbnRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL0NoaWxkcmVuQ29udGVudCc7XG5pbXBvcnQgQ2xpY2tTZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0NsaWNrU2VsZWN0aW9uJztcbmltcG9ydCBDb250ZW50SXRlbXMgZnJvbSAnLi4vLi4vbWl4aW5zL0NvbnRlbnRJdGVtcyc7XG5pbXBvcnQgRGlyZWN0aW9uU2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9EaXJlY3Rpb25TZWxlY3Rpb24nO1xuaW1wb3J0IEdlbmVyaWMgZnJvbSAnLi4vLi4vbWl4aW5zL0dlbmVyaWMnO1xuaW1wb3J0IEl0ZW1TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0l0ZW1TZWxlY3Rpb24nO1xuaW1wb3J0IEl0ZW1zQWNjZXNzaWJsZSBmcm9tICcuLi8uLi9taXhpbnMvSXRlbXNBY2Nlc3NpYmxlJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmQnO1xuaW1wb3J0IEtleWJvYXJkRGlyZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZERpcmVjdGlvbic7XG5pbXBvcnQgS2V5Ym9hcmRQYWdpbmcgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkUGFnaW5nJztcbmltcG9ydCBLZXlib2FyZFByZWZpeFNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24nO1xuaW1wb3J0IFNlbGVjdGlvbkhpZ2hsaWdodCBmcm9tICcuLi8uLi9taXhpbnMvU2VsZWN0aW9uSGlnaGxpZ2h0JztcbmltcG9ydCBTZWxlY3Rpb25TY3JvbGwgZnJvbSAnLi4vLi4vbWl4aW5zL1NlbGVjdGlvblNjcm9sbCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEJveCBleHRlbmRzIEVsZW1lbnRCYXNlLmNvbXBvc2UoXG4gICAgQ2hpbGRyZW5Db250ZW50LFxuICAgIENsaWNrU2VsZWN0aW9uLFxuICAgIENvbnRlbnRJdGVtcyxcbiAgICBEaXJlY3Rpb25TZWxlY3Rpb24sXG4gICAgR2VuZXJpYyxcbiAgICBJdGVtU2VsZWN0aW9uLFxuICAgIEl0ZW1zQWNjZXNzaWJsZSxcbiAgICBLZXlib2FyZCxcbiAgICBLZXlib2FyZERpcmVjdGlvbixcbiAgICBLZXlib2FyZFBhZ2luZyxcbiAgICBLZXlib2FyZFByZWZpeFNlbGVjdGlvbixcbiAgICBTZWxlY3Rpb25IaWdobGlnaHQsXG4gICAgU2VsZWN0aW9uU2Nyb2xsXG4gICkge1xuXG4gIC8vIFN0dWIgZm9yIGNvbGxlY3RpdmVzIGZvciBub3dcbiAgZ2V0IGlubmVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzLiQuaXRlbXNDb250YWluZXI7XG4gIH1cbiAgZ2V0IG91dGVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICAgICAgfVxuXG4gICAgICBbdGFyZ2V0PVwiY2hpbGRcIl0ge1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC13ZWJraXQtZmxleDogMTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgI2l0ZW1zQ29udGFpbmVyIHtcbiAgICAgICAgLXdlYmtpdC1mbGV4OiAxO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDsgLyogZm9yIG1vbWVudHVtIHNjcm9sbGluZyAqL1xuICAgICAgfVxuXG4gICAgICAvKiBHZW5lcmljIGFwcGVhcmFuY2UgKi9cbiAgICAgIDpob3N0KFtnZW5lcmljPVwiXCJdKSB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pICNpdGVtc0NvbnRhaW5lciA6OmNvbnRlbnQgPiAqIHtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICBwYWRkaW5nOiAwLjI1ZW07XG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBpZD1cIml0ZW1zQ29udGFpbmVyXCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtbGlzdC1ib3gnLCBMaXN0Qm94KTtcbiIsIi8qKlxuICogUHJlc2VudHMgYSBzZXQgb2Ygc21hbGwgZG90cyB0byBzaG93IGxpc3QgaXRlbSBjb3VudCBhbmQgc2VsZWN0IGxpc3QgaXRlbXMuXG4gKiBUaGVyZSB3aWxsIGJlIG9uZSBkb3QgZm9yIGVhY2ggaXRlbSwgYW5kIHRoZSBkb3QgZm9yIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWRcbiAqIGl0ZW0gd2lsbCBiZSBzaG93biBzZWxlY3RlZC5cbiAqXG4gKiBDbGlja2luZyBhIGRvdCB3aWxsIHNlbGVjdCB0aGUgY29ycmVzcG9uZGluZyBsaXN0IGl0ZW0uXG4gKlxuICogQGNsYXNzIFBhZ2VEb3RzXG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2NvcmUtY29tcG9uZW50LW1peGlucy9zcmMvRWxlbWVudEJhc2UnO1xuXG5pbXBvcnQgQ2hpbGRyZW5Db250ZW50IGZyb20gJy4uLy4uL21peGlucy9DaGlsZHJlbkNvbnRlbnQnO1xuaW1wb3J0IENvbGxlY3RpdmVFbGVtZW50IGZyb20gJy4uLy4uL21peGlucy9Db2xsZWN0aXZlRWxlbWVudCc7XG5pbXBvcnQgQ29udGVudEZpcnN0Q2hpbGRUYXJnZXQgZnJvbSAnLi4vLi4vbWl4aW5zL0NvbnRlbnRGaXJzdENoaWxkVGFyZ2V0JztcbmltcG9ydCBEaXJlY3Rpb25TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0RpcmVjdGlvblNlbGVjdGlvbic7XG5pbXBvcnQgSXRlbVNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvSXRlbVNlbGVjdGlvbic7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkJztcbmltcG9ydCBUYXJnZXRTZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL1RhcmdldFNlbGVjdGlvbic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZURvdHMge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleE9mSXRlbShpdGVtKTtcbiAgICAvLyBTZWUgaWYgdGhlIGNvcnJlc3BvbmRpbmcgZG90IGhhcyBhbHJlYWR5IGJlZW4gY3JlYXRlZC5cbiAgICAvLyBJZiBub3QsIHRoZSBjb3JyZWN0IGRvdCB3aWxsIGJlIHNlbGVjdGVkIHdoZW4gaXQgZ2V0cyBjcmVhdGVkLlxuICAgIGxldCBkb3RzID0gdGhpcy5kb3RzO1xuICAgIGlmIChkb3RzICYmIGRvdHMubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIGxldCBkb3QgPSB0aGlzLmRvdHNbaW5kZXhdO1xuICAgICAgaWYgKGRvdCkge1xuICAgICAgICBkb3QuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnLCBzZWxlY3RlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuJC5kb3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgbGV0IGRvdCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGxldCBkb3RJbmRleCA9IHRoaXMuZG90cy5pbmRleE9mKGRvdCk7XG4gICAgICBpZiAoZG90SW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBkb3RJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBkb3RzKCkge1xuICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMuJC5kb3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb3QnKSk7XG4gIH1cblxuICBpdGVtc0NoYW5nZWQoKSB7XG4gICAgLy8gUmFpc2UgYSBwcm9wZXJ0eSBjaGFuZ2Ugbm90aWZpY2F0aW9uIHNvIGJpbmRpbmcgY2FuIHVwZGF0ZS5cbiAgICAvLyBpZiAoT2JqZWN0LmdldE5vdGlmaWVyKSB7XG4gICAgLy8gICBPYmplY3QuZ2V0Tm90aWZpZXIodGhpcykubm90aWZ5KHtcbiAgICAvLyAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAvLyAgICAgbmFtZTogXCJpdGVtc1wiXG4gICAgLy8gICB9KTtcbiAgICAvLyB9XG4gICAgY3JlYXRlRG90cyh0aGlzKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbUNoYW5nZWQoKTsgIC8vIEluIGNhc2UgcG9zaXRpb24gb2Ygc2VsZWN0ZWQgaXRlbSBtb3ZlZC5cbiAgfVxuXG4gIHNlbGVjdGVkSXRlbUNoYW5nZWQoKSB7XG4gICAgbGV0IHNlbGVjdGVkSW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGRvdCwgaSkgPT4ge1xuICAgICAgZG90LmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJywgaSA9PT0gc2VsZWN0ZWRJbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtZmxleDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgI2RvdHMge1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIC5kb3Qge1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBoZWlnaHQ6IDhweDtcbiAgICAgICAgbWFyZ2luOiA3cHggNXB4O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnMgYm94LXNoYWRvdyAwLjJzO1xuICAgICAgICB3aWR0aDogOHB4O1xuICAgICAgfVxuXG4gICAgICAuZG90OmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjc1KTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDFweCAzcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgfVxuXG4gICAgICAuZG90LnNlbGVjdGVkIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk1KTtcbiAgICAgIH1cblxuICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICAgIC5kb3Qge1xuICAgICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgICB3aWR0aDogMTJweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPCEtLVxuICAgICAgUkVWSUVXOiBUaGVzZSBkb3RzIGFyZW4ndCBidXR0b25zLCBiZWNhdXNlIHRoZXkncmUgbmV2ZXIgbWVhbnQgdG8gYmUgdXNlZFxuICAgICAgb24gdGhlaXIgb3duLiBUaGVyZSBzaG91bGQgYWx3YXlzIGJlIHNvbWUgb3RoZXIsIG1vcmUgYWNjZXNzaWJsZSwgd2F5IHRvXG4gICAgICBuYXZpZ2F0ZSB0aGUgY29udGVudC5cbiAgICAgIC0tPlxuICAgICAgPCEtLSBUT0RPOiBSZXBsYWNlIHdpdGggc29tZXRoaW5nIHRoYXQncyBiYXNpY2FsbHkgYSBsaXN0IGJveCAtLT5cbiAgICAgIDxkaXYgaWQ9XCJkb3RzXCI+PC9kaXY+XG4gICAgICA8Y29udGVudD48L2NvbnRlbnQ+XG4gICAgYDtcbiAgfVxuXG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkOiBmdW5jdGlvbigpIHtcbiAgLy8gICAvLyBBcHBseSBhbnkgc2VsZWN0aW9uIG1hZGUgYmVmb3JlIGFzc2ltaWxhdGlvbi5cbiAgLy8gICBpZiAodGhpcy5fcHJlbWF0dXJlU2VsZWN0ZWRJbmRleFxuICAvLyAgICAgICAmJiAnc2VsZWN0ZWRJbmRleCcgaW4gdGhpcy5jb2xsZWN0aXZlXG4gIC8vICAgICAgICYmIHRoaXMuY29sbGVjdGl2ZS5zZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLnNlbGVjdGVkSW5kZXggPSB0aGlzLl9wcmVtYXR1cmVTZWxlY3RlZEluZGV4O1xuICAvLyAgICAgdGhpcy5fcHJlbWF0dXJlU2VsZWN0ZWRJbmRleCA9IG51bGw7XG4gIC8vICAgfVxuICAvLyAgIC8vIFRPRE86IE1vdmUgdGhlIHJlcXVpcmVtZW50IGZvciBhIHNlbGN0aW9uIHRvIGJhc2ljLWl0ZW0tc2VsZWN0aW9uLiBUaGlzXG4gIC8vICAgLy8gc2hvdWxkIGlkZWFsbHkgcGljayB0aGUgbmVhcmVzdCBpdGVtIHRvIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIGl0ZW0uXG4gIC8vICAgLy8gICBpZiAodGhpcy5jb2xsZWN0aXZlLnNlbGVjdGVkSXRlbSA9PT0gbnVsbCAmJiB0aGlzLmNvbGxlY3RpdmUuaXRlbXMgIT0gbnVsbCAmJiB0aGlzLmNvbGxlY3RpdmUuc2VsZWN0Rmlyc3QpIHtcbiAgLy8gICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLnNlbGVjdEZpcnN0KCk7XG4gIC8vICAgLy8gICB9XG4gIC8vIH1cblxuXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlRG90KCkge1xuICBsZXQgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRvdC5jbGFzc0xpc3QuYWRkKCdkb3QnKTtcbiAgZG90LmNsYXNzTGlzdC5hZGQoJ3N0eWxlLXNjb3BlJyk7XG4gIGRvdC5jbGFzc0xpc3QuYWRkKCdiYXNpYy1wYWdlLWRvdHMnKTtcbiAgcmV0dXJuIGRvdDtcbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVEb3RzKGVsZW1lbnQpIHtcbiAgbGV0IG5ld0RvdENvdW50ID0gZWxlbWVudC5pdGVtcy5sZW5ndGg7XG4gIGxldCBkb3RDb250YWluZXIgPSBlbGVtZW50LiQuZG90cztcbiAgbGV0IGV4aXN0aW5nRG90Q291bnQgPSBkb3RDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoO1xuICBpZiAobmV3RG90Q291bnQgPT09IGV4aXN0aW5nRG90Q291bnQpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoZXhpc3RpbmdEb3RDb3VudCA+IG5ld0RvdENvdW50KSB7XG4gICAgLy8gUmVtb3ZlIGV4dHJhIGRvdHMuXG4gICAgd2hpbGUgKGRvdENvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPiBuZXdEb3RDb3VudCkge1xuICAgICAgUG9seW1lci5kb20oZG90Q29udGFpbmVyKS5yZW1vdmVDaGlsZChkb3RDb250YWluZXIuY2hpbGRyZW5bMF0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBDcmVhdGUgbmVlZGVkIGRvdHMuXG4gICAgZm9yIChsZXQgaSA9IGV4aXN0aW5nRG90Q291bnQ7IGkgPCBuZXdEb3RDb3VudDsgaSsrKSB7XG4gICAgICBsZXQgZG90ID0gY3JlYXRlRG90KCk7XG4gICAgICBkb3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9XG4gIH1cbn1cblxuXG5QYWdlRG90cyA9IEVsZW1lbnRCYXNlLmNvbXBvc2UoXG4gIENoaWxkcmVuQ29udGVudCxcbiAgQ29sbGVjdGl2ZUVsZW1lbnQsXG4gIENvbnRlbnRGaXJzdENoaWxkVGFyZ2V0LFxuICBEaXJlY3Rpb25TZWxlY3Rpb24sXG4gIEtleWJvYXJkLFxuICBJdGVtU2VsZWN0aW9uLFxuICBUYXJnZXRTZWxlY3Rpb24sXG4gIFBhZ2VEb3RzXG4pO1xuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtcGFnZS1kb3RzJywgUGFnZURvdHMpO1xuIiwiLyoqXG4gKiBQcmVzZW50cyBsaXN0IGl0ZW1zIGluIGEgdmlld3BvcnQgc3VjaCB0aGF0IG9ubHkgYSBzaW5nbGUgaXRlbSBpcyB2aXNpYmxlIGF0IGFcbiAqIHRpbWUuIE5hdmlnYXRpbmcgYmV0d2VlbiBpdGVtcyB3aWxsIGJlIHJlcHJlc2VudGVkIHdpdGggYSBob3Jpem9udGFsIHZpc3VhbFxuICogc2xpZGluZyBlZmZlY3QuXG4gKlxuICogVGhpcyBjb21wb25lbnQgY3VycmVudGx5IHJlcXVpcmVzIHRoYXQgeW91IGV4cGxpY2l0bHkgYXBwbHkgYSBzaXplIHRvIGl0LiBGb3IgYVxuICogdmFyaWFudCB3aGljaCBhdXRvbWF0aWNhbGx5IHNpemVzIHRvIGl0cyBjb250ZW50LCBzZWUgdGhlIHJlbGF0ZWQgY29tcG9uZW50XG4gKiBiYXNpYy1zbGlkaW5nLXZpZXdwb3J0LWZpdC5cbiAqXG4gKiBAY2xhc3MgYmFzaWMtc2xpZGluZy12aWV3cG9ydFxuICovXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdjb3JlLWNvbXBvbmVudC1taXhpbnMvc3JjL0VsZW1lbnRCYXNlJztcbmltcG9ydCBTcHJlYWRJdGVtcyBmcm9tICcuLi9TcHJlYWRJdGVtcy9TcHJlYWRJdGVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRpbmdWaWV3cG9ydCB7XG5cbiAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc2hvd1RyYW5zaXRpb24nKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gMDtcbiAgfVxuXG4gIGdldCBjb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLiQuc2xpZGluZ0NvbnRhaW5lci5jb250ZW50O1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLiQuc2xpZGluZ0NvbnRhaW5lci5pdGVtcztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyU2VsZWN0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmcmFjdGlvbmFsIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50J3MgbW92aW5nIHN1cmZhY2Ugd2hpbGUgaXQgaXMgYmVpbmdcbiAgICogbW92ZWQgKGRyYWdnZWQvc2Nyb2xsZWQvZXRjLikuXG4gICAqXG4gICAqIFRoaXMgaXMgZXhwcmVzc2VkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGVsZW1lbnQncyB3aWR0aC4gSWYgdGhlIHZhbHVlIGlzXG4gICAqIHBvc2l0aXZlLCB0aGUgc3VyZmFjZSBpcyBiZWluZyBtb3ZlZCB0byB0aGUgbGVmdDsgaWYgbmVnYXRpdmUsIHRoZSBzdXJmYWNlXG4gICAqIGlzIGJlaW5nIG1vdmVkIHRvIHRoZSByaWdodC4gRS5nLiwgYSB2YWx1ZSBvZiAwLjUgaW5kaWNhdGVzIHRoZSBzdXJmYWNlIGhhc1xuICAgKiBtb3ZlZCBoYWxmIHRoZSBlbGVtZW50J3Mgd2lkdGggdG8gdGhlIGxlZnQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBwb3NpdGlvblxuICAgKiBAdHlwZSBOdW1iZXJcbiAgICovXG4gIGdldCBwb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXQgcG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIGxldCBpbmRleCA9IGl0ZW1zICYmIGl0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZEl0ZW0pO1xuICAgIHJldHVybiBpbmRleCB8fCAtMTtcbiAgfVxuICBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zW2luZGV4XTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZWxlY3RlZEl0ZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgfVxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBzaG93VHJhbnNpdGlvbihzaG93KSB7XG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzaG93VHJhbnNpdGlvbicsIHNob3cpO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgICNzbGlkaW5nQ29udGFpbmVyIHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIC8qXG4gICAgICAgICBTZXQgd2lkdGggZm9yIElFL0VkZ2UuIEl0J3Mgbm90IGNsZWFyIHdoeSB0aGV5IG5lZWQgdGhpcywgYW5kIHRoZSBvdGhlclxuICAgICAgICAgYnJvd3NlcnMgZG9uJ3QuXG4gICAgICAgICAqL1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLnNob3dUcmFuc2l0aW9uKSAjc2xpZGluZ0NvbnRhaW5lciB7XG4gICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dDtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQ7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8YmFzaWMtc3ByZWFkLWl0ZW1zIGlkPVwic2xpZGluZ0NvbnRhaW5lclwiPlxuICAgICAgICA8Y29udGVudD48L2NvbnRlbnQ+XG4gICAgICA8L2Jhc2ljLXNwcmVhZC1pdGVtcz5cbiAgICBgO1xuICB9XG5cbn1cblxuXG5mdW5jdGlvbiByZW5kZXJTZWxlY3Rpb24oKSB7XG5cbiAgdmFyIGNvdW50ID0gdGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgaWYgKCFjb3VudCkge1xuICAgIC8vIE51bGwgb3IgemVybyBtZWFucyB3ZSBkb24ndCBoYXZlIGl0ZW1zIHRvIHJlbmRlciB5ZXQuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgLy8gTm8gc2VsZWN0aW9uXG4gICAgLy8gcmV0dXJuO1xuICAgIGluZGV4ID0gMDtcbiAgfVxuXG4gIHZhciBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb24gfHwgMDtcbiAgdmFyIGRhbXBlbmVkUG9zaXRpb247XG4gIGlmIChpbmRleCA9PT0gMCAmJiBwb3NpdGlvbiA8IDApIHtcbiAgICAvLyBBcHBseSB0ZW5zaW9uIGZyb20gdGhlIGxlZnQgZWRnZS5cbiAgICBkYW1wZW5lZFBvc2l0aW9uID0gLWRhbXBpbmcoLXBvc2l0aW9uKTtcbiAgfSBlbHNlIGlmIChpbmRleCA9PT0gY291bnQgLSAxICYmIHBvc2l0aW9uID4gMCkge1xuICAgIC8vIEFwcGx5IHRlbnNpb24gZnJvbSB0aGUgcmlnaHQgZWRnZS5cbiAgICBkYW1wZW5lZFBvc2l0aW9uID0gZGFtcGluZyhwb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gTm8gZGFtcGluZyByZXF1aXJlZC5cbiAgICBkYW1wZW5lZFBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cbiAgdmFyIGZyYWN0aW9uYWxJbmRleCA9IGluZGV4ICsgZGFtcGVuZWRQb3NpdGlvbjtcbiAgLy8gVXNlIGEgcGVyY2VudGFnZSBzbyB0aGUgdHJhbnNmb3JtIHdpbGwgc3RpbGwgd29yayBpZiBzY3JlZW4gc2l6ZSBjaGFuZ2VzXG4gIC8vIChlLmcuLCBpZiBkZXZpY2Ugb3JpZW50YXRpb24gY2hhbmdlcykuXG4gIHZhciBsZWZ0ID0gLWZyYWN0aW9uYWxJbmRleCAqIDEwMDtcbiAgLy8gdmFyIGxlZnQgPSAtKGZyYWN0aW9uYWxJbmRleCAvIGNvdW50KSAqIDEwMDtcbiAgdmFyIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBsZWZ0ICsgJyUpJztcbiAgdGhpcy4kLnNsaWRpbmdDb250YWluZXIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICB0aGlzLiQuc2xpZGluZ0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG59XG5cblxuLypcbiAqIENhbGN1bGF0ZSBkYW1waW5nIGFzIGEgZnVuY3Rpb24gb2YgdGhlIGRpc3RhbmNlIHBhc3QgdGhlIG1pbmltdW0vbWF4aW11bVxuICogdmFsdWVzLlxuICpcbiAqIFdlIHdhbnQgdG8gYXN5bXB0b3RpY2FsbHkgYXBwcm9hY2ggYW4gYWJzb2x1dGUgbWluaW11bSBvZiAxIHVuaXRcbiAqIGJlbG93L2Fib3ZlIHRoZSBhY3R1YWwgbWluaW11bS9tYXhpbXVtLiBUaGlzIHJlcXVpcmVzIGNhbGN1bGF0aW5nIGFcbiAqIGh5cGVyYm9saWMgZnVuY3Rpb24uXG4gKlxuICogU2VlIGh0dHA6Ly93d3cud29sZnJhbWFscGhhLmNvbS9pbnB1dC8/aT15KyUzRCstMSUyRiUyOHglMkIxJTI5KyUyQisxXG4gKiBmb3IgdGhlIG9uZSB3ZSB1c2UuIFRoZSBvbmx5IHBvcnRpb24gb2YgdGhhdCBmdW5jdGlvbiB3ZSBjYXJlIGFib3V0IGlzIHdoZW5cbiAqIHggaXMgemVybyBvciBncmVhdGVyLiBBbiBpbXBvcnRhbnQgY29uc2lkZXJhdGlvbiBpcyB0aGF0IHRoZSBjdXJ2ZSBiZVxuICogdGFuZ2VudCB0byB0aGUgZGlhZ29uYWwgbGluZSB4PXkgYXQgKDAsIDApLiBUaGlzIGVuc3VyZXMgc21vb3RoIGNvbnRpbnVpdHlcbiAqIHdpdGggdGhlIG5vcm1hbCBkcmFnIGJlaGF2aW9yLCBpbiB3aGljaCB0aGUgdmlzaWJsZSBzbGlkaW5nIGlzIGxpbmVhciB3aXRoXG4gKiB0aGUgZGlzdGFuY2UgdGhlIHRvdWNocG9pbnQgaGFzIGJlZW4gZHJhZ2dlZC5cbiAqL1xuZnVuY3Rpb24gZGFtcGluZyh4KSB7XG4gIHZhciB5ID0gKC0xIC8gKHggKyAxKSkgKyAxO1xuICByZXR1cm4geTtcbn1cblxuXG5TbGlkaW5nVmlld3BvcnQgPSBFbGVtZW50QmFzZS5jb21wb3NlKFNsaWRpbmdWaWV3cG9ydCk7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtc2xpZGluZy12aWV3cG9ydCcsIFNsaWRpbmdWaWV3cG9ydCk7XG4iLCIvKipcbiAqIFNwcmVhZHMgb3V0IGEgc2V0IG9mIGl0ZW1zIGhvcml6b250YWxseSBzbyB0aGV5IHRha2UgZXF1YWwgc3BhY2UuXG4gKlxuICogVGhpcyBjb21wb25lbnQgY3VycmVudGx5IHJlcXVpcmVzIGFuIGV4cGxpY2l0IHNpemUgYnkgYXBwbGllZCB0byBpdC4gRm9yIGFcbiAqIHZhcmlhbnQgdGhhdCBhdXRvbWF0aWNhbGx5IHNpemVzIHRvIGZpdCB0aGUgbGlzdCBpdGVtcywgc2VlIHRoZSByZWxhdGVkXG4gKiBjb21wb25lbnQgYmFzaWMtc3ByZWFkLWZpdC5cbiAqXG4gKiBAY2xhc3MgYmFzaWMtc3ByZWFkLWl0ZW1zXG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2NvcmUtY29tcG9uZW50LW1peGlucy9zcmMvRWxlbWVudEJhc2UnO1xuaW1wb3J0IENoaWxkcmVuQ29udGVudCBmcm9tICcuLi8uLi9taXhpbnMvQ2hpbGRyZW5Db250ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByZWFkSXRlbXMge1xuXG4gIGF0dGFjaGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gSEFDS1xuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gIH1cblxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudDtcbiAgfVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIGxldCBjb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgICB0aGlzLiQuc3ByZWFkQ29udGFpbmVyLnN0eWxlLndpZHRoID0gKGNvdW50ICogMTAwKSArICclJztcbiAgICBsZXQgaXRlbVdpZHRoID0gKDEwMCAvIGNvdW50KSArIFwiJVwiO1xuICAgIFtdLmZvckVhY2guY2FsbChpdGVtcywgaXRlbSA9PiB7XG4gICAgICBpdGVtLnN0eWxlLndpZHRoID0gaXRlbVdpZHRoO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICAjc3ByZWFkQ29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgI3NwcmVhZENvbnRhaW5lciA6OmNvbnRlbnQgPiAqIHtcbiAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgICAgICAgb2JqZWN0LWZpdDogdmFyKC0tYmFzaWMtaXRlbS1vYmplY3QtZml0LCBjb250YWluKTtcbiAgICAgICAgdG91Y2gtYWN0aW9uOiBub25lO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIC13ZWJraXQtdXNlci1kcmFnOiBub25lO1xuICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgaWQ9XCJzcHJlYWRDb250YWluZXJcIj5cbiAgICAgICAgPGNvbnRlbnQ+PC9jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG59XG5cblNwcmVhZEl0ZW1zID0gRWxlbWVudEJhc2UuY29tcG9zZShDaGlsZHJlbkNvbnRlbnQsIFNwcmVhZEl0ZW1zKTtcblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdiYXNpYy1zcHJlYWQtaXRlbXMnLCBTcHJlYWRJdGVtcyk7XG4iLCIvKipcbiAqIE1peGluIHRoYXQgZGVmaW5lcyBhIGNvbXBvbmVudCdzIGNvbnRlbnQgYXMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBjbGFzcyBDaGlsZHJlbkNvbnRlbnRcbiAqXG4gKi9cblxuLy8gVE9ETzogRG9uJ3QgcmVzcG9uZCB0byBjaGFuZ2VzIGluIGF0dHJpYnV0ZXMsIG9yIGF0IGxlYXN0IG9mZmVyIHRoYXQgYXMgYW5cbi8vIG9wdGlvbi5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hpbGRyZW5Db250ZW50IHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gVW50aWwgd2UgaGF2ZSBjb250ZW50IG9ic2VydmluZyBhZ2FpbiwgZm9yY2UgYSBjYWxsIHRvIGNvbnRlbnRDaGFuZ2VkKCkuXG4gICAgLy8gSEFDSzogRG8gdGhpcyBhc3luY2hyb25vdXNseSwgc28gb3RoZXIgbWl4aW5zIGhhdmUgYSBjaGFuY2UgdG8gc2V0IHVwXG4gICAgLy8gYmVmb3JlIHRoaXMgY2FsbC5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY29udGVudENoYW5nZWQoKSk7XG4gIH1cblxuICAvLyBUT0RPOiBXYWl0IHRvIG9ic2VydmUgY2hhbmdlcyB1bnRpbCB3ZSBoYXZlIGEgc2hhZG93IERPTSBob3N0LiBSaWdodFxuICAvLyBub3csIHRoZSBpbml0aWFsIGNvbGxlY3RpdmVDaGFuZ2VkIGNhbGwgY2FuIGhhcHBlbiB0b28gZWFybHkuXG4gIC8vIFRPRE86IEhhbmRsZSBjYXNlIHdoZXJlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgb3V0IG9mIERPTSwgdGhlblxuICAvLyBhdHRhY2hlZC5cbiAgLy8gY29sbGVjdGl2ZUNoYW5nZWQoKSB7XG4gIC8vICAgLy8gY29uc29sZS5sb2codGhpcy5sb2NhbE5hbWUgKyBcIiBjb2xsZWN0aXZlQ2hhbmdlZDogXCIgKyB0aGlzLmNvbGxlY3RpdmUuYXNwZWN0cy5sZW5ndGgpO1xuICAvLyAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmNvbGxlY3RpdmUuaW5uZXJtb3N0RWxlbWVudDtcbiAgLy8gICBsZXQgaW5uZXJtb3N0SG9zdCA9IEJhc2ljLkNvbnRlbnRIZWxwZXJzLmdldEhvc3QoaW5uZXJtb3N0KTtcbiAgLy9cbiAgLy8gICAvLyBPcHRpbWl6ZSBmb3IgdGhlIGNhc2Ugd2hlcmUgdGhlIGNvbGxlY3RpdmUncyBjaGFuZ2VkLCBidXQgaXRzXG4gIC8vICAgLy8gaW5uZXJtb3N0IGFzcGVjdCBpcyBzdGlsbCB0aGUgc2FtZS4gSW4gdGhhdCBjYXNlLCB3ZSBkb24ndCB3YW50IHRvXG4gIC8vICAgLy8gYm90aGVyIHRlYXJpbmcgZG93biBhbmQgdGhlbiByZWNyZWF0aW5nIG91ciBjb250ZW50Q2hhbmdlZCBoYW5kbGVyLlxuICAvLyAgIC8vIFRPRE86IFRoaXMgY3VycmVudGx5IG9ubHkgdHJhY2tzIG9uZSBsZXZlbCBvZiBob3N0LiBGb3Igcm9idXN0bmVzcyxcbiAgLy8gICAvLyB0aGlzIHNob3VsZCB0cmFjayB0aGUgY2hhaW4gb2YgaG9zdHMuXG4gIC8vICAgaWYgKGlubmVybW9zdCA9PT0gdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3RcbiAgLy8gICAgICAgJiYgaW5uZXJtb3N0SG9zdCA9PT0gdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RIb3N0KSB7XG4gIC8vICAgICAvLyBXZSBzaG91bGQgYWxyZWFkeSBiZSBvYnNlcnZpbmcgY2hhbmdlcyBvbiB0aGUgaW5uZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSBjb250ZW50IGhhc24ndCBhY3R1YWxseSBjaGFuZ2VkLCB3ZSB3YW50IHRvIGdpdmUgdGhlXG4gIC8vICAgICAvLyBuZXcgYXNwZWN0cyBhIGNoYW5jZSB0byByZXNwb25kIHRvIGNvbnRlbnRDaGFuZ2VkLlxuICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLmNvbnRlbnRDaGFuZ2VkKCk7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIC8vIEEgbmV3IGFzcGVjdCBpcyBub3cgaW5uZXJtb3N0LlxuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCAmJiB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdC5fY29udGVudENoYW5nZU9ic2VydmVyKSB7XG4gIC8vICAgICAvLyBTdG9wIG9ic2VydmluZyBjaGFuZ2VzIG9uIHRoZSBvbGQgaW5uZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwic3RvcHBpbmcgb2JzZXJ2YXRpb24gb2YgY2hhbmdlcyBvbiBvbGQgaW5uZXJtb3N0IGFzcGVjdFwiKTtcbiAgLy8gICAgIEJhc2ljLkNvbnRlbnRIZWxwZXJzLm9ic2VydmVDb250ZW50Q2hhbmdlcyh0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCwgbnVsbCk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIEJhc2ljLkNvbnRlbnRIZWxwZXJzLm9ic2VydmVDb250ZW50Q2hhbmdlcyhpbm5lcm1vc3QsIGZ1bmN0aW9uKCkge1xuICAvLyAgICAgLy8gUmVzZXQgbWVtb2l6ZWQgY29udGVudC5cbiAgLy8gICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICAvL1xuICAvLyAgICAgLy8gTGV0IGNvbGxlY3RpdmUga25vdyBjb250ZW50IGhhcyBjaGFuZ2VkLlxuICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLmNvbnRlbnRDaGFuZ2VkKCk7XG4gIC8vICAgfS5iaW5kKHRoaXMpKTtcbiAgLy9cbiAgLy8gICB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCA9IGlubmVybW9zdDtcbiAgLy8gICB0aGlzLl9wcmV2aW91c0lubmVybW9zdEhvc3QgPSBpbm5lcm1vc3RIb3N0O1xuICAvLyB9XG5cbiAgY29udGVudENoYW5nZWQoKSB7XG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdjb250ZW50LWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmxhdHRlbmVkIGNvbnRlbnQgb2YgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBjb250ZW50XG4gICAqIEB0eXBlIFtPYmplY3RdXG4gICAqL1xuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gZXhwYW5kQ29udGVudEVsZW1lbnRzKHRoaXMuY2hpbGRyZW4pO1xuICB9XG5cbn1cblxuXG4vKlxuICogR2l2ZW4gYSBhcnJheSBvZiBub2RlcywgcmV0dXJuIGEgbmV3IGFycmF5IHdpdGggYW55IGNvbnRlbnQgZWxlbWVudHMgZXhwYW5kZWRcbiAqIHRvIHRoZSBub2RlcyBkaXN0cmlidXRlZCB0byB0aGF0IGNvbnRlbnQgZWxlbWVudC4gVGhpcyBydWxlIGlzIGFwcGxpZWRcbiAqIHJlY3Vyc2l2ZWx5LlxuICpcbiAqIElmIGluY2x1ZGVUZXh0Tm9kZXMgaXMgdHJ1ZSwgdGV4dCBub2RlcyB3aWxsIGJlIGluY2x1ZGVkLCBhcyBpbiB0aGVcbiAqIHN0YW5kYXJkIGNoaWxkTm9kZXMgcHJvcGVydHk7IGJ5IGRlZmF1bHQsIHRoaXMgc2tpcHMgdGV4dCBub2RlcywgbGlrZSB0aGVcbiAqIHN0YW5kYXJkIGNoaWxkcmVuIHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBleHBhbmRDb250ZW50RWxlbWVudHMobm9kZXMsIGluY2x1ZGVUZXh0Tm9kZXMpIHtcbiAgbGV0IGV4cGFuZGVkID0gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKG5vZGVzLCBub2RlID0+IHtcbiAgICAvLyBXZSB3YW50IHRvIHNlZSBpZiB0aGUgbm9kZSBpcyBhbiBpbnN0YW5jZW9mIEhUTUxDb250ZW50RWxlbWVudCwgYnV0XG4gICAgLy8gdGhhdCBjbGFzcyB3b24ndCBleGlzdCBpZiB0aGUgYnJvd3NlciB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCBuYXRpdmVcbiAgICAvLyBTaGFkb3cgRE9NIGFuZCBpZiB0aGUgU2hhZG93IERPTSBwb2x5ZmlsbCBoYXNuJ3QgYmVlbiBsb2FkZWQuIEluc3RlYWQsXG4gICAgLy8gd2UgZG8gYSBzaW1wbGlzdGljIGNoZWNrIHRvIHNlZSBpZiB0aGUgdGFnIG5hbWUgaXMgXCJjb250ZW50XCIuXG4gICAgaWYgKG5vZGUubG9jYWxOYW1lICYmIG5vZGUubG9jYWxOYW1lID09PSBcImNvbnRlbnRcIikge1xuICAgICAgLy8gY29udGVudCBlbGVtZW50OyB1c2UgaXRzIGRpc3RyaWJ1dGVkIG5vZGVzIGluc3RlYWQuXG4gICAgICBsZXQgZGlzdHJpYnV0ZWROb2RlcyA9IG5vZGUuZ2V0RGlzdHJpYnV0ZWROb2RlcygpO1xuICAgICAgcmV0dXJuIGRpc3RyaWJ1dGVkTm9kZXMgP1xuICAgICAgICBleHBhbmRDb250ZW50RWxlbWVudHMoZGlzdHJpYnV0ZWROb2RlcywgaW5jbHVkZVRleHROb2RlcykgOlxuICAgICAgICBbXTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgLy8gUGxhaW4gZWxlbWVudDsgdXNlIGFzIGlzLlxuICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBUZXh0ICYmIGluY2x1ZGVUZXh0Tm9kZXMpIHtcbiAgICAgIC8vIFRleHQgbm9kZS5cbiAgICAgIHJldHVybiBbbm9kZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENvbW1lbnQsIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIGV0Yy47IHNraXAuXG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9KTtcbiAgbGV0IGZsYXR0ZW5lZCA9IFtdLmNvbmNhdCguLi5leHBhbmRlZCk7XG4gIHJldHVybiBmbGF0dGVuZWQ7XG59XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIG1hcHMgYSBjbGljayAoYWN0dWFsbHksIGEgbW91c2Vkb3duKSB0byBpdGVtIHNlbGVjdGlvbi5cbiAqXG4gKiBAY2xhc3MgQ2xpY2tTZWxlY3Rpb25cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlja1NlbGVjdGlvbiB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIC8qXG4gICAgICogUkVWSUVXOiBXaGljaCBldmVudCBzaG91bGQgd2UgbGlzdGVuIHRvIGhlcmU/XG4gICAgICpcbiAgICAgKiBUaGUgc3RhbmRhcmQgdXNlIGZvciB0aGlzIG1peGluIGlzIGluIGxpc3QgYm94ZXMuIExpc3QgYm94ZXMgZG9uJ3RcbiAgICAgKiBhcHBlYXIgdG8gYmUgY29uc2lzdGVudCB3aXRoIHJlZ2FyZCB0byB3aGV0aGVyIHRoZXkgc2VsZWN0IG9uIG1vdXNlZG93blxuICAgICAqIG9yIGNsaWNrL21vdXNldXAuXG4gICAgICovXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICBzZWxlY3RUYXJnZXQodGhpcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgIC8vIE5vdGU6IFdlIGRvbid0IGNhbGwgcHJldmVudERlZmF1bHQgaGVyZS4gVGhlIGRlZmF1bHQgYmVoYXZpb3IgZm9yXG4gICAgICAvLyBtb3VzZWRvd24gaW5jbHVkZXMgc2V0dGluZyBrZXlib2FyZCBmb2N1cyBpZiB0aGUgZWxlbWVudCBkb2Vzbid0XG4gICAgICAvLyBhbHJlYWR5IGhhdmUgdGhlIGZvY3VzLCBhbmQgd2Ugd2FudCB0byBwcmVzZXJ2ZSB0aGF0IGJlaGF2aW9yLlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICAvLyBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge31cblxufVxuXG4vLyBUT0RPOiBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSBsaXN0IGl0ZW0gaGFzIHN1YmVsZW1lbnRzLiBXYWxrIHVwIHRoZSBET01cbi8vIGhpZXJhcmNoeSB1bnRpbCB3ZSBmaW5kIGFuIGl0ZW0gaW4gdGhlIGxpc3QsIG9yIGNvbWUgYmFjayB0byB0aGlzIGVsZW1lbnQsXG4vLyBpbiB3aGljaCBjYXNlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHRhcHBlZCBpc24ndCBhbiBpdGVtIChhbmQgc2hvdWxkIGJlXG4vLyBpZ25vcmVkKS5cbmZ1bmN0aW9uIHNlbGVjdFRhcmdldChlbGVtZW50LCB0YXJnZXQpIHtcbiAgbGV0IGluZGV4ID0gZWxlbWVudC5pbmRleE9mSXRlbSAmJiBlbGVtZW50LmluZGV4T2ZJdGVtKHRhcmdldCk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gIH1cbn1cbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggYWxsb3dzIGEgY29tcG9uZW50IHRvIHByb3ZpZGUgYWdncmVnYXRlIGJlaGF2aW9yIHdpdGggb3RoZXJcbiAqIGVsZW1lbnRzLCBlLmcuLCBmb3Iga2V5Ym9hcmQgaGFuZGxpbmcuXG4gKlxuICogQGNsYXNzIENvbGxlY3RpdmVcbiAqL1xuXG5jbGFzcyBDb2xsZWN0aXZlIHtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgdGhpcy5fZWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLmFzc2ltaWxhdGUoZWxlbWVudCk7XG4gIH1cblxuICBhc3NpbWlsYXRlKHRhcmdldCkge1xuICAgIGxldCBlbGVtZW50cyA9IHRhcmdldC5jb2xsZWN0aXZlID9cbiAgICAgIHRhcmdldC5jb2xsZWN0aXZlLmVsZW1lbnRzIDpcbiAgICAgIFt0YXJnZXRdO1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBlbGVtZW50LmNvbGxlY3RpdmUgPSB0aGlzO1xuICAgICAgdGhpcy5fZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLmludm9rZUNvbGxlY3RpdmVNZXRob2QoJ2NvbGxlY3RpdmVDaGFuZ2VkJyk7XG4gIH1cblxuICBnZXQgZWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzO1xuICB9XG5cbiAgaW52b2tlQ29sbGVjdGl2ZU1ldGhvZChtZXRob2QsIC4uLmFyZ3MpIHtcbiAgICAvLyBJbnZva2UgZnJvbSBpbm5lcm1vc3QgdG8gb3V0ZXJtb3N0LlxuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxlbWVudHM7XG4gICAgZm9yIChsZXQgaSA9IGVsZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgaWYgKGVsZW1lbnRbbWV0aG9kXSkge1xuICAgICAgICBlbGVtZW50W21ldGhvZF0uYXBwbHkoZWxlbWVudCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IG91dGVybW9zdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbMF07XG4gIH1cblxufVxuXG5cbi8qKlxuICogQGNsYXNzIENvbGxlY3RpdmVFbGVtZW50XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGl2ZUVsZW1lbnQge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNvbGxlY3RpdmUgPSBuZXcgQ29sbGVjdGl2ZSh0aGlzKTtcbiAgfVxuXG4gIHNldCB0YXJnZXQoZWxlbWVudCkge1xuICAgIHRoaXMuY29sbGVjdGl2ZS5hc3NpbWlsYXRlKGVsZW1lbnQpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogTWl4aW4gdGhhdCBkZWZpbmVzIHRoZSB0YXJnZXQgb2YgYSBjb21wb25lbnQgLS0gdGhlIGVsZW1lbnQgdGhlIGNvbXBvbmVudCBpc1xuICogbWFuYWdpbmcgb3Igc29tZWhvdyByZXNwb25zaWJsZSBmb3IgLS0gYXMgaXRzIGZpcnN0IGNoaWxkLlxuICpcbiAqIEBjbGFzcyBDb250ZW50Rmlyc3RDaGlsZFRhcmdldFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRGaXJzdENoaWxkVGFyZ2V0IHtcblxuICBjb250ZW50Q2hhbmdlZCgpIHtcbiAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICBsZXQgdGFyZ2V0ID0gY29udGVudCAmJiBjb250ZW50WzBdO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIGdldCB0YXJnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgfVxuICBzZXQgdGFyZ2V0KGVsZW1lbnQpIHtcbiAgICB0aGlzLl90YXJnZXQgPSBlbGVtZW50O1xuICB9XG5cbn1cbiIsIi8qKlxuICogTWl4aW4gdGhhdCBsZXRzIGEgY29tcG9uZW50IHRyZWF0IGl0cyBjb250ZW50IGFzIGxpc3QgaXRlbXMuXG4gKlxuICogQXV4aWxpYXJ5IGVsZW1lbnRzIHdoaWNoIGFyZSBub3Qgbm9ybWFsbHkgdmlzaWJsZSBhcmUgZmlsdGVyZWQgb3V0LiBGb3Igbm93LFxuICogRm9yIG5vdywgdGhlc2UgYXJlOiBsaW5rLCBzY3JpcHQsIHN0eWxlLCBhbmQgdGVtcGxhdGUuXG4gKlxuICogQGNsYXNzIENvbnRlbnRJdGVtc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRJdGVtcyB7XG5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHtcbiAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJywgc2VsZWN0ZWQpO1xuICB9XG5cbiAgY29udGVudENoYW5nZWQoKSB7XG4gICAgdGhpcy5faXRlbXMgPSBudWxsO1xuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb25hbCBpbmRleCBmb3IgdGhlIGluZGljYXRlZCBpdGVtLlxuICAgKlxuICAgKiBAbWV0aG9kIGluZGV4T2ZJdGVtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIFRoZSBpdGVtIHdob3NlIGluZGV4IGlzIHJlcXVlc3RlZC5cbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBpdGVtLCBvciAtMSBpZiBub3QgZm91bmQuXG4gICAqL1xuICBpbmRleE9mSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3RoaW5nLlxuICBpdGVtQWRkZWQoaXRlbSkge31cblxuICBpdGVtc0NoYW5nZWQoKSB7XG5cbiAgICAvLyBQZXJmb3JtIHBlci1pdGVtIGluaXRpYWxpemF0aW9uLlxuICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmICghaXRlbS5faXRlbUluaXRpYWxpemVkKSB7XG4gICAgICAgIHRoaXMuaXRlbUFkZGVkKGl0ZW0pO1xuICAgICAgICBpdGVtLl9pdGVtSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaXRlbXMtY2hhbmdlZCcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZXQgb2YgaXRlbXMgaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBpdGVtc1xuICAgKiBAdHlwZSBbT2JqZWN0XVxuICAgKi9cbiAgLy8gVE9ETzogcHJvcGVydHkgbm90aWZpY2F0aW9ucyBzbyBlbGVtZW50cyBjYW4gYmluZCB0byB0aGlzIHByb3BlcnR5XG4gIGdldCBpdGVtcygpIHtcbiAgICBpZiAodGhpcy5faXRlbXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5faXRlbXMgPSBmaWx0ZXJBdXhpbGlhcnlFbGVtZW50cyh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cblxufVxuXG5cbi8vIFJldHVybiB0aGUgZ2l2ZW4gZWxlbWVudHMsIGZpbHRlcmluZyBvdXQgYXV4aWxpYXJ5IGVsZW1lbnRzIHRoYXQgYXJlbid0XG4vLyB0eXBpY2FsbHkgdmlzaWJsZS4gSXRlbXMgd2hpY2ggYXJlIG5vdCBlbGVtZW50cyBhcmUgcmV0dXJuZWQgYXMgaXMuXG5mdW5jdGlvbiBmaWx0ZXJBdXhpbGlhcnlFbGVtZW50cyhpdGVtcykge1xuICBsZXQgYXV4aWxpYXJ5VGFncyA9IFtcbiAgICAnbGluaycsXG4gICAgJ3NjcmlwdCcsXG4gICAgJ3N0eWxlJyxcbiAgICAndGVtcGxhdGUnXG4gIF07XG4gIHJldHVybiBbXS5maWx0ZXIuY2FsbChpdGVtcywgZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhaXRlbS5sb2NhbE5hbWUgfHwgYXV4aWxpYXJ5VGFncy5pbmRleE9mKGl0ZW0ubG9jYWxOYW1lKSA8IDA7XG4gIH0pO1xufVxuXG5cbi8qKlxuICogRmlyZXMgd2hlbiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgY2hhbmdlLlxuICpcbiAqIEBldmVudCBpdGVtcy1jaGFuZ2VkXG4gKi9cbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggbWFwcyBkaXJlY3Rpb24gc2VtYW50aWNzIChnb0xlZnQsIGdvUmlnaHQsIGV0Yy4pIHRvIHNlbGVjdGlvblxuICogc2VtYW50aWNzIChzZWxlY3RQcmV2aW91cywgc2VsZWN0TmV4dCwgZXRjLikuXG4gKlxuICogQGNsYXNzIERpcmVjdGlvblNlbGVjdGlvblxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3Rpb25TZWxlY3Rpb24ge1xuXG4gIGdvRG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3ROZXh0KCk7XG4gIH1cblxuICBnb0VuZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RMYXN0KCk7XG4gIH1cblxuICBnb0xlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0UHJldmlvdXMoKTtcbiAgfVxuXG4gIGdvUmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TmV4dCgpO1xuICB9XG5cbiAgZ29TdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RGaXJzdCgpO1xuICB9XG5cbiAgZ29VcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQcmV2aW91cygpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMuIFRoZXNlIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBzZWxlY3RGaXJzdCgpIHt9XG4gIHNlbGVjdExhc3QoKSB7fVxuICBzZWxlY3ROZXh0KCkge31cbiAgc2VsZWN0UHJldmlvdXMoKSB7fVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoRGlyZWN0aW9uU2VsZWN0aW9uLnByb3RvdHlwZSwge1xuICBzZWxlY3RGaXJzdDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIHNlbGVjdExhc3Q6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBzZWxlY3ROZXh0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgc2VsZWN0UHJldmlvdXM6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpXG59KTtcbiIsIi8qKlxuICogTWl4aW4gdGhhdCBhbGxvd3MgYSBjb21wb25lbnQgdG8gc3VwcG9ydCBhIFwiZ2VuZXJpY1wiIHN0eWxlOiBhIG1pbmltYWxpc3RcbiAqIHN0eWxlIHRoYXQgY2FuIGVhc2lseSBiZSByZW1vdmVkIHRvIHJlc2V0IGl0cyB2aXN1YWwgYXBwZWFyYW5jZSB0byBhIGJhc2VsaW5lXG4gKiBzdGF0ZS5cbiAqXG4gKiBCeSBkZWZhdWx0LCBhIGNvbXBvbmVudCBzaG91bGQgcHJvdmlkZSBhIG1pbmltYWwgdmlzdWFsIHByZXNlbnRhdGlvbiB0aGF0XG4gKiBhbGxvd3MgdGhlIGNvbXBvbmVudCB0byBmdW5jdGlvbi4gSG93ZXZlciwgdGhlIG1vcmUgc3R5bGluZyB0aGUgY29tcG9uZW50XG4gKiBwcm92aWRlcyBieSBkZWZhdWx0LCB0aGUgaGFyZGVyIGl0IGJlY29tZXMgdG8gZ2V0IHRoZSBjb21wb25lbnQgdG8gZml0IGluXG4gKiBpbiBvdGhlciBzZXR0aW5ncy4gRWFjaCBDU1MgcnVsZSBoYXMgdG8gYmUgb3ZlcnJpZGRlbi4gV29yc2UsIG5ldyBDU1MgcnVsZXNcbiAqIGFkZGVkIHRvIHRoZSBkZWZhdWx0IHN0eWxlIHdvbid0IGJlIG92ZXJyaWRkZW4gYnkgZGVmYXVsdCwgbWFraW5nIGl0IGhhcmQgdG9cbiAqIGtub3cgd2hldGhlciBhIG5ldyB2ZXJzaW9uIG9mIGEgY29tcG9uZW50IHdpbGwgc3RpbGwgbG9vayBva2F5LlxuICpcbiAqIEFzIGEgY29tcHJvbWlzZSwgdGhlIHNpbXBsZSBQb2x5bWVyIGJlaGF2aW9yIGhlcmUgZGVmaW5lcyBhIFwiZ2VuZXJpY1wiXG4gKiBhdHRyaWJ1dGUuIFRoaXMgYXR0cmlidXRlIGlzIG5vcm1hbGx5IHNldCBieSBkZWZhdWx0LCBhbmQgc3R5bGVzIGNhbiBiZVxuICogd3JpdHRlbiB0aGF0IGFwcGx5IG9ubHkgd2hlbiB0aGUgZ2VuZXJpYyBhdHRyaWJ1dGUgaXMgc2V0LiBUaGlzIGFsbG93cyB0aGVcbiAqIGNvbnN0cnVjdGlvbiBvZiBDU1MgcnVsZXMgdGhhdCB3aWxsIG9ubHkgYXBwbHkgdG8gZ2VuZXJpYyBjb21wb25lbnRzIGxpa2VcbiAqXG4gKiAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pIHtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBUaGlzIG1ha2VzIGl0IGVhc3kgdG8gcmVtb3ZlIGFsbCBkZWZhdWx0IHN0eWxpbmcgLS0gc2V0IHRoZSBnZW5lcmljIGF0dHJpYnV0ZVxuICogdG8gZmFsc2UsIGFuZCBhbGwgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZC5cbiAqXG4gKiBAY2xhc3MgR2VuZXJpY1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyaWMge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmdlbmVyaWMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZ2VuZXJpYycpIHx8IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgY29tcG9uZW50IHdvdWxkIGxpa2UgdG8gcmVjZWl2ZSBnZW5lcmljIHN0eWxpbmcuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgdHJ1ZSBieSBkZWZhdWx0IOKAlMKgc2V0IGl0IHRvIGZhbHNlIHRvIHR1cm4gb2ZmIGFsbFxuICAgKiBnZW5lcmljIHN0eWxlcy4gVGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gYXBwbHkgY3VzdG9tIHN0eWxpbmc7IHlvdSB3b24ndFxuICAgKiBoYXZlIHRvIGV4cGxpY2l0bHkgb3ZlcnJpZGUgc3R5bGluZyB5b3UgZG9uJ3Qgd2FudC5cbiAgICpcbiAgICogQHByb3BlcnR5IGdlbmVyaWNcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBnZXQgZ2VuZXJpYygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2VuZXJpYztcbiAgfVxuXG4gIC8vIFdlIHJvbGwgb3VyIG93biBhdHRyaWJ1dGUgc2V0dGluZyBzbyB0aGF0IGFuIGV4cGxpY2l0bHkgZmFsc2UgdmFsdWUgc2hvd3NcbiAgLy8gdXAgYXMgZ2VuZXJpYz1cImZhbHNlXCIuXG4gIHNldCBnZW5lcmljKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlICE9PSAnZmFsc2UnKTtcbiAgICB9XG4gICAgdGhpcy5fZ2VuZXJpYyA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIEV4cGxpY2l0bHkgdXNlIGZhbHNlIHN0cmluZy5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdnZW5lcmljJywgJ2ZhbHNlJyk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAvLyBFeHBsaWNpdGx5IHJlbW92ZSBhdHRyaWJ1dGUuXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZ2VuZXJpYycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtcHR5IHN0cmluZyB0byBnZXQgYXR0cmlidXRlIHRvIGFwcGVhciB3aXRoIG5vIHZhbHVlLlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2dlbmVyaWMnLCAnJyk7XG4gICAgfVxuICB9XG5cbn07XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIG1hbmFnZXMgc2VsZWN0aW9uIHNlbWFudGljcyBmb3IgaXRlbXMgaW4gYSBsaXN0LlxuICpcbiAqIEBjbGFzcyBJdGVtU2VsZWN0aW9uXG4gKi9cblxuXG4vKipcbiAqIEZpcmVzIHdoZW4gdGhlIHNlbGVjdGVkSXRlbSBwcm9wZXJ0eSBjaGFuZ2VzLlxuICpcbiAqIEBldmVudCBzZWxlY3RlZC1pdGVtLWNoYW5nZWRcbiAqIEBwYXJhbSBkZXRhaWwuc2VsZWN0ZWRJdGVtIFRoZSBuZXcgc2VsZWN0ZWQgaXRlbS5cbiAqIEBwYXJhbSBkZXRhaWwucHJldmlvdXNJdGVtIFRoZSBwcmV2aW91c2x5IHNlbGVjdGVkIGl0ZW0uXG4gKi9cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBzZWxlY3RlZEluZGV4IHByb3BlcnR5IGNoYW5nZXMuXG4gKlxuICogQGV2ZW50IHNlbGVjdGVkLWl0ZW0tY2hhbmdlZFxuICogQHBhcmFtIGRldGFpbC5zZWxlY3RlZEluZGV4IFRoZSBuZXcgc2VsZWN0ZWQgaW5kZXguXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVNlbGVjdGlvbiB7XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHt9XG5cbiAgZ2V0IGNhblNlbGVjdE5leHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhblNlbGVjdE5leHQ7XG4gIH1cbiAgc2V0IGNhblNlbGVjdE5leHQoY2FuU2VsZWN0TmV4dCkge1xuICAgIHRoaXMuX2NhblNlbGVjdE5leHQgPSBjYW5TZWxlY3ROZXh0O1xuICB9XG5cbiAgZ2V0IGNhblNlbGVjdFByZXZpb3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jYW5TZWxlY3RQcmV2aW91cztcbiAgfVxuICBzZXQgY2FuU2VsZWN0UHJldmlvdXMoY2FuU2VsZWN0UHJldmlvdXMpIHtcbiAgICB0aGlzLl9jYW5TZWxlY3RQcmV2aW91cyA9IGNhblNlbGVjdFByZXZpb3VzO1xuICB9XG5cbiAgaXRlbUFkZGVkKGl0ZW0pIHtcbiAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKGl0ZW0sIGl0ZW0gPT09IHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgfVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZEl0ZW0pO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIC8vIFNlbGVjdGVkIGl0ZW0gaXMgbm8gbG9uZ2VyIGluIHRoZSBjdXJyZW50IHNldCBvZiBpdGVtcy5cbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGlvblJlcXVpcmVkKSB7XG4gICAgICAgIC8vIEVuc3VyZSBzZWxlY3Rpb24sIGJ1dCBkbyB0aGlzIGluIHRoZSBuZXh0IHRpY2sgdG8gZ2l2ZSBvdGhlclxuICAgICAgICAvLyBtaXhpbnMgYSBjaGFuY2UgdG8gZG8gdGhlaXIgb3duIGl0ZW1zQ2hhbmdlZCB3b3JrLlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVuc3VyZVNlbGVjdGlvbih0aGlzKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGUgY2hhbmdlIGluIGl0ZW1zIG1heSBoYXZlIGFmZmVjdGVkIHdoaWNoIG5hdmlnYXRpb25zIGFyZSBwb3NzaWJsZS5cbiAgICB1cGRhdGVQb3NzaWJsZU5hdmlnYXRpb25zKHRoaXMsIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIGl0ZW0gd2hpY2ggaXMgY3VycmVudGx5IHNlbGVjdGVkLCBvciAtMSBpZiB0aGVyZSBpcyBub1xuICAgKiBzZWxlY3Rpb24uXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3RlZEluZGV4XG4gICAqIEB0eXBlIE51bWJlclxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2VsZWN0ZWRJdGVtO1xuXG4gICAgaWYgKHNlbGVjdGVkSXRlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTWVtb2l6ZVxuICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXhPZkl0ZW0oc2VsZWN0ZWRJdGVtKTtcblxuICAgIC8vIElmIGluZGV4ID0gLTEsIHNlbGVjdGlvbiB3YXNuJ3QgZm91bmQuIE1vc3QgbGlrZWx5IGNhdXNlIGlzIHRoYXQgdGhlXG4gICAgLy8gRE9NIHdhcyBtYW5pcHVsYXRlZCBmcm9tIHVuZGVybmVhdGggdXMuXG4gICAgLy8gVE9ETzogT25jZSB3ZSB0cmFjayBjb250ZW50IGNoYW5nZXMsIHR1cm4gdGhpcyBpbnRvIGFuIGV4Y2VwdGlvbi5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgbGV0IGl0ZW07XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGl0ZW0gPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG5cbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAob3V0ZXJtb3N0KSB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3NlbGVjdGVkLWluZGV4LWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IGluZGV4LFxuICAgICAgICAgIHZhbHVlOiBpbmRleCAvLyBmb3IgUG9seW1lciBiaW5kaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZWxlY3RlZEl0ZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0sIG9yIG51bGwgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0ZWRJdGVtXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgLy8gVE9ETzogQ29uZmlybSBpdGVtIGlzIGluIGl0ZW1zIGJlZm9yZSBzZWxlY3RpbmcuXG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIGxldCBwcmV2aW91c0l0ZW0gPSB0aGlzLl9zZWxlY3RlZEl0ZW07XG4gICAgaWYgKHByZXZpb3VzSXRlbSkge1xuICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIHNlbGVjdGlvbi5cbiAgICAgIHRoaXMuYXBwbHlTZWxlY3Rpb24ocHJldmlvdXNJdGVtLCBmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHRoaXMuYXBwbHlTZWxlY3Rpb24oaXRlbSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmF0aW9uYWxpemUgd2l0aCBzZWxlY3RlZEluZGV4IHNvIHdlJ3JlIG5vdCByZWNhbGN1bGF0aW5nIGl0ZW1cbiAgICAvLyBvciBpbmRleCBpbiBlYWNoIHNldHRlci5cbiAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4T2ZJdGVtKGl0ZW0pO1xuICAgIHVwZGF0ZVBvc3NpYmxlTmF2aWdhdGlvbnModGhpcywgaW5kZXgpO1xuXG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZC1pdGVtLWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdGVkSXRlbTogaXRlbSxcbiAgICAgICAgICBwcmV2aW91c0l0ZW06IHByZXZpb3VzSXRlbSxcbiAgICAgICAgICB2YWx1ZTogaXRlbSAvLyBmb3IgUG9seW1lciBiaW5kaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0Rmlyc3RcbiAgICovXG4gIHNlbGVjdEZpcnN0KCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBsaXN0IHNob3VsZCBhbHdheXMgaGF2ZSBhIHNlbGVjdGlvbiAoaWYgaXQgaGFzIGl0ZW1zKS5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGlvblJlcXVpcmVkXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICovXG4gIGdldCBzZWxlY3Rpb25SZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uUmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGlvblJlcXVpcmVkKHNlbGVjdGlvblJlcXVpcmVkKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uUmVxdWlyZWQgPSBzZWxlY3Rpb25SZXF1aXJlZDtcbiAgICBlbnN1cmVTZWxlY3Rpb24odGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0TGFzdFxuICAgKi9cbiAgc2VsZWN0TGFzdCgpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgdGhpcy5pdGVtcy5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIG5leHQgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3ROZXh0XG4gICAqL1xuICBzZWxlY3ROZXh0KCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCB0aGlzLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIHByZXZpb3VzIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0UHJldmlvdXNcbiAgICovXG4gIHNlbGVjdFByZXZpb3VzKCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCB0aGlzLnNlbGVjdGVkSW5kZXggLSAxKTtcbiAgfVxuXG59XG5cblxuLy8gSWYgbm8gaXRlbSBpcyBzZWxlY3RlZCwgc2VsZWN0IGEgZGVmYXVsdCBpdGVtLlxuLy8gVE9ETzogSWYgdGhlIHByZXZpb3VzbHktc2VsZWN0ZWQgaXRlbSBoYXMgYmVlbiBkZWxldGVkLCB0cnkgdG8gc2VsZWN0IGFuXG4vLyBpdGVtIGFkamFjZW50IHRvIHRoZSBwb3NpdGlvbiBpdCBoZWxkLlxuZnVuY3Rpb24gZW5zdXJlU2VsZWN0aW9uKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50LnNlbGVjdGVkSXRlbSAmJiBlbGVtZW50Lml0ZW1zICYmIGVsZW1lbnQuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IDA7XG4gIH1cbn1cblxuLy8gRW5zdXJlIHRoZSBnaXZlbiBpbmRleCBpcyB3aXRoaW4gYm91bmRzLCBhbmQgc2VsZWN0IGl0IGlmIGl0J3Mgbm90IGFscmVhZHlcbi8vIHNlbGVjdGVkLlxuZnVuY3Rpb24gc2VsZWN0SW5kZXgoZWxlbWVudCwgaW5kZXgpIHtcbiAgbGV0IGJvdW5kZWRJbmRleCA9IE1hdGgubWF4KE1hdGgubWluKGluZGV4LCBlbGVtZW50Lml0ZW1zLmxlbmd0aCAtIDEpLCAwKTtcbiAgbGV0IHByZXZpb3VzSW5kZXggPSBlbGVtZW50LnNlbGVjdGVkSW5kZXg7XG4gIGlmIChwcmV2aW91c0luZGV4ICE9PSBib3VuZGVkSW5kZXgpIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBib3VuZGVkSW5kZXg7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEZvbGxvd2luZyBhIGNoYW5nZSBpbiBzZWxlY3Rpb24sIHJlcG9ydCB3aGV0aGVyIGl0J3Mgbm93IHBvc3NpYmxlIHRvXG4vLyBnbyBuZXh0L3ByZXZpb3VzIGZyb20gdGhlIGdpdmVuIGluZGV4LlxuZnVuY3Rpb24gdXBkYXRlUG9zc2libGVOYXZpZ2F0aW9ucyhlbGVtZW50LCBpbmRleCkge1xuICBsZXQgY2FuU2VsZWN0TmV4dDtcbiAgbGV0IGNhblNlbGVjdFByZXZpb3VzO1xuICBsZXQgaXRlbXMgPSBlbGVtZW50Lml0ZW1zO1xuICBpZiAoaXRlbXMgPT0gbnVsbCB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICBjYW5TZWxlY3ROZXh0ID0gZmFsc2U7XG4gICAgY2FuU2VsZWN0UHJldmlvdXMgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2UuIElmIHRoZXJlJ3Mgbm8gc2VsZWN0aW9uLCB3ZSBkZWNsYXJlIHRoYXQgaXQncyBhbHdheXNcbiAgICAvLyBwb3NzaWJsZSB0byBnbyBuZXh0L3ByZXZpb3VzIHRvIGNyZWF0ZSBhIHNlbGVjdGlvbi5cbiAgICBjYW5TZWxlY3ROZXh0ID0gdHJ1ZTtcbiAgICBjYW5TZWxlY3RQcmV2aW91cyA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgLy8gTm9ybWFsIGNhc2U6IHdlIGhhdmUgYW4gaW5kZXggaW4gYSBsaXN0IHRoYXQgaGFzIGl0ZW1zLlxuICAgIGNhblNlbGVjdFByZXZpb3VzID0gKGluZGV4ID4gMCk7XG4gICAgY2FuU2VsZWN0TmV4dCA9IChpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEpO1xuICB9XG4gIGVsZW1lbnQuY2FuU2VsZWN0TmV4dCA9IGNhblNlbGVjdE5leHQ7XG4gIGVsZW1lbnQuY2FuU2VsZWN0UHJldmlvdXMgPSBjYW5TZWxlY3RQcmV2aW91cztcbn1cbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggbWFuYWdlcyBBUklBIHJvbGVzIGZvciBhIGNvbXBvbmVudCB0aGF0IHdhbnRzIHRvIGFjdCBhcyBhIGxpc3QuXG4gKlxuICogQGNsYXNzIEl0ZW1zQWNjZXNzaWJsZVxuICovXG5cbi8vIFVzZWQgdG8gYXNzaWduIHVuaXF1ZSBJRHMgdG8gaXRlbSBlbGVtZW50cyB3aXRob3V0IElEcy5cbmxldCBpZENvdW50ID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbXNBY2Nlc3NpYmxlIHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQpO1xuICAgIHZhciBpdGVtSWQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpZiAoaXRlbUlkKSB7XG4gICAgICB0aGlzLm91dGVybW9zdEF0dGFjaGVkLnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgaXRlbUlkKTtcbiAgICB9XG4gIH1cblxuICAvLyAvLyBFbnN1cmUgdGhlIG91dGVybW9zdCBhc3BlY3QgaGFzIHJvbGU9XCJsaXN0Ym94XCIuXG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkKCkge1xuICAvL1xuICAvLyAgIHZhciBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCA9PT0gb3V0ZXJtb3N0KSB7XG4gIC8vICAgICAvLyBBbHJlYWR5IGNvbmZpZ3VyZWQuXG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCkge1xuICAvLyAgICAgLy8gUmVtb3ZlIEFSSUEgYXR0cmlidXRlcyBmcm9tIHByZXZpb3VzIG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIG91dGVybW9zdC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICAvL1xuICAvLyAgIC8vIERldGVybWluZSBhIGJhc2UgaXRlbSBJRCBiYXNlZCBvbiB0aGlzIGNvbXBvbmVudCdzIGhvc3QncyBvd24gSUQuIFRoaXNcbiAgLy8gICAvLyB3aWxsIGJlIGNvbWJpbmVkIHdpdGggYSB1bmlxdWUgaW50ZWdlciB0byBhc3NpZ24gSURzIHRvIGl0ZW1zIHRoYXQgZG9uJ3RcbiAgLy8gICAvLyBoYXZlIGFuIGV4cGxpY2l0IElELiBJZiB0aGUgYmFzaWMtbGlzdC1ib3ggaGFzIElEIFwiZm9vXCIsIHRoZW4gaXRzIGl0ZW1zXG4gIC8vICAgLy8gd2lsbCBoYXZlIElEcyB0aGF0IGxvb2sgbGlrZSBcIl9mb29PcHRpb24xXCIuIElmIHRoZSBsaXN0IGhhcyBubyBJRCBpdHNlbGYsXG4gIC8vICAgLy8gaXRzIGl0ZW1zIHdpbGwgZ2V0IElEcyB0aGF0IGxvb2sgbGlrZSBcIl9vcHRpb24xXCIuIEl0ZW0gSURzIGFyZSBwcmVmaXhlZFxuICAvLyAgIC8vIHdpdGggYW4gdW5kZXJzY29yZSB0byBkaWZmZXJlbnRpYXRlIHRoZW0gZnJvbSBtYW51YWxseS1hc3NpZ25lZCBJRHMsIGFuZFxuICAvLyAgIC8vIHRvIG1pbmltaXplIHRoZSBwb3RlbnRpYWwgZm9yIElEIGNvbmZsaWN0cy5cbiAgLy9cbiAgLy8gICAvLyBUT0RPOiBUaGlzIGNoZWNrIG5vdyBjb21lcyB0b28gbGF0ZSBmb3IgY29tcG9uZW50cyBsaWtlIGJhc2ljLWxpc3QtYm94LlxuICAvLyAgIC8vIFdlIG1heSBuZWVkIHRvIGR5bmFtaWNhbGx5IHVwZGF0ZSB0aGUgaXRlbSBJRHMgd2hlbmV2ZXIgdGhlIGNvbGxlY3Rpb25cbiAgLy8gICAvLyBjaGFuZ2VzLCBhbHRob3VnaCB0aGF0IHJlcXVpcmVzIGtlZXBpbmcgdHJhY2sgb2Ygd2hldGhlciB3ZSd2ZSBjaGFuZ2VkXG4gIC8vICAgLy8gYW4gaXRlbSdzIElEIG9yIHdoZXRoZXIgaXQncyBhbHdheXMgaGFkIHRoYXQgSUQuXG4gIC8vICAgdmFyIGVsZW1lbnRJZCA9IG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApO1xuICAvLyAgIHRoaXMuaXRlbUJhc2VJZCA9IGVsZW1lbnRJZCA/XG4gIC8vICAgICAgIFwiX1wiICsgZWxlbWVudElkICsgXCJPcHRpb25cIiA6XG4gIC8vICAgICAgIFwiX29wdGlvblwiO1xuICAvL1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0ID0gb3V0ZXJtb3N0O1xuICAvLyB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcblxuICAgIC8vIERldGVybWluZSBhIGJhc2UgaXRlbSBJRCBiYXNlZCBvbiB0aGlzIGNvbXBvbmVudCdzIGhvc3QncyBvd24gSUQuIFRoaXNcbiAgICAvLyB3aWxsIGJlIGNvbWJpbmVkIHdpdGggYSB1bmlxdWUgaW50ZWdlciB0byBhc3NpZ24gSURzIHRvIGl0ZW1zIHRoYXQgZG9uJ3RcbiAgICAvLyBoYXZlIGFuIGV4cGxpY2l0IElELiBJZiB0aGUgYmFzaWMtbGlzdC1ib3ggaGFzIElEIFwiZm9vXCIsIHRoZW4gaXRzIGl0ZW1zXG4gICAgLy8gd2lsbCBoYXZlIElEcyB0aGF0IGxvb2sgbGlrZSBcIl9mb29PcHRpb24xXCIuIElmIHRoZSBsaXN0IGhhcyBubyBJRCBpdHNlbGYsXG4gICAgLy8gaXRzIGl0ZW1zIHdpbGwgZ2V0IElEcyB0aGF0IGxvb2sgbGlrZSBcIl9vcHRpb24xXCIuIEl0ZW0gSURzIGFyZSBwcmVmaXhlZFxuICAgIC8vIHdpdGggYW4gdW5kZXJzY29yZSB0byBkaWZmZXJlbnRpYXRlIHRoZW0gZnJvbSBtYW51YWxseS1hc3NpZ25lZCBJRHMsIGFuZFxuICAgIC8vIHRvIG1pbmltaXplIHRoZSBwb3RlbnRpYWwgZm9yIElEIGNvbmZsaWN0cy5cblxuICAgIC8vIFRPRE86IFRoaXMgY2hlY2sgbm93IGNvbWVzIHRvbyBsYXRlIGZvciBjb21wb25lbnRzIGxpa2UgYmFzaWMtbGlzdC1ib3guXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gZHluYW1pY2FsbHkgdXBkYXRlIHRoZSBpdGVtIElEcyB3aGVuZXZlciB0aGUgY29sbGVjdGlvblxuICAgIC8vIGNoYW5nZXMsIGFsdGhvdWdoIHRoYXQgcmVxdWlyZXMga2VlcGluZyB0cmFjayBvZiB3aGV0aGVyIHdlJ3ZlIGNoYW5nZWRcbiAgICAvLyBhbiBpdGVtJ3MgSUQgb3Igd2hldGhlciBpdCdzIGFsd2F5cyBoYWQgdGhhdCBJRC5cbiAgICB2YXIgZWxlbWVudElkID0gdGhpcy5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApO1xuICAgIHRoaXMuaXRlbUJhc2VJZCA9IGVsZW1lbnRJZCA/XG4gICAgICAgIFwiX1wiICsgZWxlbWVudElkICsgXCJPcHRpb25cIiA6XG4gICAgICAgIFwiX29wdGlvblwiO1xuICB9XG5cbiAgaXRlbUFkZGVkKGl0ZW0pIHtcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgncm9sZScsICdvcHRpb24nKTtcblxuICAgIC8vIEVuc3VyZSBlYWNoIGl0ZW0gaGFzIGFuIElEIHNvIHdlIGNhbiBzZXQgYXJpYS1hY3RpdmVkZXNjZW5kYW50IG9uIHRoZVxuICAgIC8vIG92ZXJhbGwgbGlzdCB3aGVuZXZlciB0aGUgc2VsZWN0aW9uIGNoYW5nZXMuXG4gICAgaWYgKCFpdGVtLmdldEF0dHJpYnV0ZSgnaWQnKSkge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pdGVtQmFzZUlkICsgaWRDb3VudCsrKTtcbiAgICB9XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICAvLyBDYXRjaCB0aGUgY2FzZSB3aGVyZSB0aGUgc2VsZWN0aW9uIGlzIHJlbW92ZWQuXG4gICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH1cbiAgfVxuXG59XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIG1hbmFnZXMgdGhlIGtleWJvYXJkIGZvY3VzIGFuZCBrZXlkb3duIGhhbmRsaW5nIGZvciBhIGNvbXBvbmVudC5cbiAqXG4gKiBUT0RPOiBEb2N1bWVudCBjb2xsZWN0aXZlIGJlaGF2aW9yLlxuICogVE9ETzogUHJvdmlkZSBiYXNlbGluZSBiZWhhdmlvciBvdXRzaWRlIG9mIGEgY29sbGVjdGl2ZS5cbiAqXG4gKiBAY2xhc3MgS2V5Ym9hcmRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG5cbiAgLy8gRGVmYXVsdCBrZXlkb3duIGhhbmRsZXIuIFRoaXMgd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIGtleWRvd24oZXZlbnQpIHt9XG5cbiAgLypcbiAgICogSWYgd2UncmUgbm93IHRoZSBvdXRlcm1vc3QgZWxlbWVudCwgb2YgdGhlIGNvbGxlY3RpdmUsIHNldCB1cCB0byByZWNlaXZlXG4gICAqIGtleWJvYXJkIGV2ZW50cy4gSWYgd2UncmUgbm8gbG9uZ2VyIHRoZSBvdXRlcm1vc3QgZWxlbWVudCwgc3RvcCBsaXN0ZW5pbmcuXG4gICAqL1xuICAvLyBUT0RPOiBEbyB3ZSBuZWVkIHRvIHN0YXJ0L3N0b3AgbGlzdGVuaW5nIHdoZW4gYXR0YWNoZWQvZGV0YWNoZWQsIG9yIGlzXG4gIC8vIHRoYXQgaGFuZGxlZCBhdXRvbWF0aWNhbGx5P1xuICBjb2xsZWN0aXZlQ2hhbmdlZCgpIHtcbiAgICBpZiAodGhpcy5jb2xsZWN0aXZlLm91dGVybW9zdEVsZW1lbnQgPT09IHRoaXMpIHtcbiAgICAgIGlmICghbGlzdGVuaW5nVG9LZXlkb3duKHRoaXMpKSB7XG4gICAgICAgIHN0YXJ0TGlzdGVuaW5nVG9LZXlkb3duKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGlzdGVuaW5nVG9LZXlkb3duKHRoaXMpKSB7XG4gICAgICAgIHN0b3BMaXN0ZW5pbmdUb0tleWRvd24odGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxuXG5mdW5jdGlvbiBrZXlkb3duKGV2ZW50KSB7XG5cbiAgLy8gR2l2ZSBjb2xsZWN0aXZlIGVsZW1lbnRzIGEgc2hvdCBhdCB0aGUgZXZlbnQsIHdvcmtpbmcgZnJvbSBpbm5lcm1vc3QgdG9cbiAgLy8gb3V0ZXJtb3N0ICh0aGlzIGVsZW1lbnQpLlxuICBsZXQgaGFuZGxlZDtcbiAgbGV0IGVsZW1lbnRzID0gdGhpcy5jb2xsZWN0aXZlLmVsZW1lbnRzO1xuICBmb3IgKGxldCBpID0gZWxlbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGhhbmRsZWQgPSBlbGVtZW50LmtleWRvd24gJiYgZWxlbWVudC5rZXlkb3duKGV2ZW50KTtcbiAgICBpZiAoaGFuZGxlZCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGhhbmRsZWQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gbGlzdGVuaW5nVG9LZXlkb3duKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQuX2tleWRvd25MaXN0ZW5lciAhPSBudWxsO1xufVxuXG5cbmZ1bmN0aW9uIHN0YXJ0TGlzdGVuaW5nVG9LZXlkb3duKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5fa2V5ZG93bkxpc3RlbmVyID0ga2V5ZG93bi5iaW5kKGVsZW1lbnQpO1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlbGVtZW50Ll9rZXlkb3duTGlzdGVuZXIpO1xuICBpZiAoZWxlbWVudC50YWJJbmRleCA8IDApIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCAwKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0b3BMaXN0ZW5pbmdUb0tleWRvd24oZWxlbWVudCkge1xuICBlbGVtZW50LmxvZyhcInN0b3BMaXN0ZW5pbmdUb0tleWRvd25cIik7XG4gIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGVsZW1lbnQuX2tleWRvd25MaXN0ZW5lcik7XG4gIGVsZW1lbnQuX2tleWRvd25MaXN0ZW5lciA9IG51bGw7XG4gIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0YWJJbmRleCcpO1xufVxuIiwiLyoqXG4gKiBNaXhpbiB3aGljaCBtYXBzIGRpcmVjdGlvbiBrZXlzIChMZWZ0LCBSaWdodCwgZXRjLikgdG8gZGlyZWN0aW9uIHNlbWFudGljc1xuICogKGdvTGVmdCwgZ29SaWdodCwgZXRjLikuXG4gKlxuICogQGNsYXNzIEtleWJvYXJkRGlyZWN0aW9uXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkRGlyZWN0aW9uIHtcblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9ucy4gVGhlc2Ugd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIGdvRG93bigpIHt9XG4gIGdvRW5kKCkge31cbiAgZ29MZWZ0KCkge31cbiAgZ29SaWdodCgpIHt9XG4gIGdvU3RhcnQoKSB7fVxuICBnb1VwKCkge31cblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM1OiAvLyBFbmRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29FbmQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM2OiAvLyBIb21lXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvU3RhcnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM3OiAvLyBMZWZ0XG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvTGVmdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6IC8vIFVwXG4gICAgICAgIGhhbmRsZWQgPSBldmVudC5hbHRLZXkgPyB0aGlzLmdvU3RhcnQoKSA6IHRoaXMuZ29VcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0XG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvUmlnaHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOiAvLyBEb3duXG4gICAgICAgIGhhbmRsZWQgPSBldmVudC5hbHRLZXkgPyB0aGlzLmdvRW5kKCkgOiB0aGlzLmdvRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEtleWJvYXJkRGlyZWN0aW9uLnByb3RvdHlwZSwge1xuICBnb0Rvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb0VuZDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvTGVmdDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvUmlnaHQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb1N0YXJ0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29VcDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGtleWRvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlck1peGluUmVzdWx0KVxufSk7XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIG1hcHMgcGFnZSBrZXlzIChQYWdlIFVwLCBQYWdlIERvd24pIGludG8gb3BlcmF0aW9ucyB0aGF0IHNjcm9sbFxuICogdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBUaGUga2V5Ym9hcmQgaW50ZXJhY3Rpb24gbW9kZWwgZ2VuZXJhbGx5IGZvbGxvd3MgdGhhdCBvZiBNaWNyb3NvZnQgV2luZG93cydcbiAqIGxpc3QgYm94ZXMgaW5zdGVhZCBvZiB0aG9zZSBpbiBPUyBYOlxuICpcbiAqICogVGhlIFBhZ2UgVXAvRG93biBhbmQgSG9tZS9FbmQga2V5cyBhY3R1YWxseSBtb3ZlIHRoZSBzZWxlY3Rpb24sIHJhdGhlciB0aGFuXG4gKiAgIGp1c3Qgc2Nyb2xsaW5nLiBUaGUgZm9ybWVyIGJlaGF2aW9yIHNlZW1zIG1vcmUgZ2VuZXJhbGx5IHVzZWZ1bCBmb3Iga2V5Ym9hcmRcbiAqICAgdXNlcnMuXG4gKlxuICogKiBQcmVzc2luZyBQYWdlIFVwL0Rvd24gd2lsbCBtb3ZlIHRoZSBzZWxlY3Rpb24gdG8gdGhlIHRvcG1vc3QvYm90dG9tbW9zdFxuICogICB2aXNpYmxlIGl0ZW0gaWYgdGhlIHNlbGVjdGlvbiBpcyBub3QgYWxyZWFkeSB0aGVyZS4gVGhlcmVhZnRlciwgdGhlIGtleSB3aWxsXG4gKiAgIG1vdmUgdGhlIHNlbGVjdGlvbiB1cC9kb3duIGJ5IGEgcGFnZSwgYW5kIChwZXIgdGhlIGFib3ZlIHBvaW50KSBtYWtlIHRoZVxuICogICBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogQGNsYXNzIEtleWJvYXJkUGFnaW5nXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkUGFnaW5nIHtcblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDMzOiAvLyBQYWdlIFVwXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLnBhZ2VVcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzQ6IC8vIFBhZ2UgRG93blxuICAgICAgICBoYW5kbGVkID0gdGhpcy5wYWdlRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIGRvd24gb25lIHBhZ2UuXG4gICAqXG4gICAqIEBtZXRob2QgcGFnZURvd25cbiAgICovXG4gIHBhZ2VEb3duKCkge1xuICAgIHJldHVybiBzY3JvbGxPbmVQYWdlKHRoaXMsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB1cCBvbmUgcGFnZS5cbiAgICpcbiAgICogQG1ldGhvZCBwYWdlVXBcbiAgICovXG4gIHBhZ2VVcCgpIHtcbiAgICByZXR1cm4gc2Nyb2xsT25lUGFnZSh0aGlzLCBmYWxzZSk7XG4gIH1cblxufVxuXG5cbi8vIFJldHVybiB0aGUgaXRlbSB3aG9zZSBjb250ZW50IHNwYW5zIHRoZSBnaXZlbiB5IHBvc2l0aW9uIChyZWxhdGl2ZSB0byB0aGVcbi8vIHRvcCBvZiB0aGUgbGlzdCdzIHNjcm9sbGluZyBjbGllbnQgYXJlYSksIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuLy9cbi8vIElmIGRvd253YXJkIGlzIHRydWUsIG1vdmUgZG93biB0aGUgbGlzdCBvZiBpdGVtcyB0byBmaW5kIHRoZSBmaXJzdCBpdGVtXG4vLyBmb3VuZCBhdCB0aGUgZ2l2ZW4geSBwb3NpdGlvbjsgaWYgZG93bndhcmQgaXMgZmFsc2UsIG1vdmUgdXAgdGhlIGxpc3Qgb2Zcbi8vIGl0ZW1zIHRvIGZpbmQgdGhlIGxhc3QgaXRlbSBhdCB0aGF0IHBvc2l0aW9uLlxuZnVuY3Rpb24gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgeSwgZG93bndhcmQpIHtcbiAgdmFyIGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgdmFyIHN0YXJ0ID0gZG93bndhcmQgPyAwIDogaXRlbXMubGVuZ3RoIC0gMTtcbiAgdmFyIGVuZCA9IGRvd253YXJkID8gaXRlbXMubGVuZ3RoIDogMDtcbiAgdmFyIHN0ZXAgPSBkb3dud2FyZCA/IDEgOiAtMTtcbiAgdmFyIGlubmVybW9zdCA9IGVsZW1lbnQuaW5uZXJtb3N0QXR0YWNoZWQ7XG4gIHZhciB0b3BPZkNsaWVudEFyZWEgPSBpbm5lcm1vc3Qub2Zmc2V0VG9wICsgaW5uZXJtb3N0LmNsaWVudFRvcDtcbiAgdmFyIGkgPSBzdGFydDtcbiAgdmFyIGZvdW5kID0gZmFsc2U7XG4gIHdoaWxlIChpICE9PSBlbmQpIHtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIHZhciBpdGVtVG9wID0gaXRlbS5vZmZzZXRUb3AgLSB0b3BPZkNsaWVudEFyZWE7XG4gICAgdmFyIGl0ZW1Cb3R0b20gPSBpdGVtVG9wICsgaXRlbS5vZmZzZXRIZWlnaHQ7XG4gICAgaWYgKGl0ZW1Ub3AgPD0geSAmJiBpdGVtQm90dG9tID49IHkpIHtcbiAgICAgIC8vIEl0ZW0gc3BhbnMgdGhlIGluZGljYXRlZCB5IGNvb3JkaW5hdGUuXG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaSArPSBzdGVwO1xuICB9XG5cbiAgaWYgKCFmb3VuZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gV2UgbWF5IGhhdmUgZm91bmQgYW4gaXRlbSB3aG9zZSBwYWRkaW5nIHNwYW5zIHRoZSBnaXZlbiB5IGNvb3JkaW5hdGUsXG4gIC8vIGJ1dCB3aG9zZSBjb250ZW50IGlzIGFjdHVhbGx5IGFib3ZlL2JlbG93IHRoYXQgcG9pbnQuXG4gIC8vIFRPRE86IElmIHRoZSBpdGVtIGhhcyBhIGJvcmRlciwgdGhlbiBwYWRkaW5nIHNob3VsZCBiZSBpbmNsdWRlZCBpblxuICAvLyBjb25zaWRlcmluZyBhIGhpdC5cbiAgdmFyIGl0ZW1TdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoaXRlbSk7XG4gIHZhciBpdGVtUGFkZGluZ1RvcCA9IHBhcnNlRmxvYXQoaXRlbVN0eWxlLnBhZGRpbmdUb3ApO1xuICB2YXIgaXRlbVBhZGRpbmdCb3R0b20gPSBwYXJzZUZsb2F0KGl0ZW1TdHlsZS5wYWRkaW5nQm90dG9tKTtcbiAgdmFyIGNvbnRlbnRUb3AgPSBpdGVtVG9wICsgaXRlbS5jbGllbnRUb3AgKyBpdGVtUGFkZGluZ1RvcDtcbiAgdmFyIGNvbnRlbnRCb3R0b20gPSBjb250ZW50VG9wICsgaXRlbS5jbGllbnRIZWlnaHQgLSBpdGVtUGFkZGluZ1RvcCAtIGl0ZW1QYWRkaW5nQm90dG9tO1xuICBpZiAoZG93bndhcmQgJiYgY29udGVudFRvcCA8PSB5XG4gICAgfHwgIWRvd253YXJkICYmIGNvbnRlbnRCb3R0b20gPj0geSkge1xuICAgIC8vIFRoZSBpbmRpY2F0ZWQgY29vcmRpbmF0ZSBoaXRzIHRoZSBhY3R1YWwgaXRlbSBjb250ZW50LlxuICAgIHJldHVybiBpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIFRoZSBpbmRpY2F0ZWQgY29vcmRpbmF0ZSBmYWxscyB3aXRoaW4gdGhlIGl0ZW0ncyBwYWRkaW5nLiBCYWNrIHVwIHRvXG4gICAgLy8gdGhlIGl0ZW0gYmVsb3cvYWJvdmUgdGhlIGl0ZW0gd2UgZm91bmQgYW5kIHJldHVybiB0aGF0LlxuICAgIGkgLT0gc3RlcDtcbiAgICByZXR1cm4gaTtcbiAgfVxufVxuXG4vLyBNb3ZlIGJ5IG9uZSBwYWdlIGRvd253YXJkIChpZiBkb3dud2FyZCBpcyB0cnVlKSwgb3IgdXB3YXJkIChpZiBmYWxzZSkuXG4vLyBSZXR1cm4gdHJ1ZSBpZiB3ZSBlbmRlZCB1cCBjaGFuZ2luZyB0aGUgc2VsZWN0aW9uLCBmYWxzZSBpZiBub3QuXG4vLyBUT0RPOiBCZXR0ZXIgc3VwcG9ydCBmb3IgaG9yaXpvbnRhbCBsaXN0cy5cbmZ1bmN0aW9uIHNjcm9sbE9uZVBhZ2UoZWxlbWVudCwgZG93bndhcmQpIHtcblxuICB2YXIgaW5uZXJtb3N0ID0gZWxlbWVudC5pbm5lcm1vc3RBdHRhY2hlZDtcbiAgaWYgKCFpbm5lcm1vc3QpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZXRlcm1pbmUgdGhlIGl0ZW0gdmlzaWJsZSBqdXN0IGF0IHRoZSBlZGdlIG9mIGRpcmVjdGlvbiB3ZSdyZSBoZWFkaW5nLlxuICAvLyBXZSdsbCBzZWxlY3QgdGhhdCBpdGVtIGlmIGl0J3Mgbm90IGFscmVhZHkgc2VsZWN0ZWQuXG4gIHZhciBlZGdlID0gaW5uZXJtb3N0LnNjcm9sbFRvcCArIChkb3dud2FyZCA/IGlubmVybW9zdC5jbGllbnRIZWlnaHQgOiAwKTtcbiAgdmFyIGluZGV4T2ZJdGVtQXRFZGdlID0gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgZWRnZSwgZG93bndhcmQpO1xuXG4gIHZhciBzZWxlY3RlZEluZGV4ID0gZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICB2YXIgbmV3SW5kZXg7XG4gIGlmIChpbmRleE9mSXRlbUF0RWRnZSAmJiBzZWxlY3RlZEluZGV4ID09PSBpbmRleE9mSXRlbUF0RWRnZSkge1xuICAgIC8vIFRoZSBpdGVtIGF0IHRoZSBlZGdlIHdhcyBhbHJlYWR5IHNlbGVjdGVkLCBzbyBzY3JvbGwgaW4gdGhlIGluZGljYXRlZFxuICAgIC8vIGRpcmVjdGlvbiBieSBvbmUgcGFnZS4gTGVhdmUgdGhlIG5ldyBpdGVtIGF0IHRoYXQgZWRnZSBzZWxlY3RlZC5cbiAgICB2YXIgZGVsdGEgPSAoZG93bndhcmQgPyAxIDogLTEpICogaW5uZXJtb3N0LmNsaWVudEhlaWdodDtcbiAgICBuZXdJbmRleCA9IGdldEluZGV4T2ZJdGVtQXRZKGVsZW1lbnQsIGVkZ2UgKyBkZWx0YSwgZG93bndhcmQpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIFRoZSBpdGVtIGF0IHRoZSBlZGdlIHdhc24ndCBzZWxlY3RlZCB5ZXQuIEluc3RlYWQgb2Ygc2Nyb2xsaW5nLCB3ZSdsbFxuICAgIC8vIGp1c3Qgc2VsZWN0IHRoYXQgaXRlbS4gVGhhdCBpcywgdGhlIGZpcnN0IGF0dGVtcHQgdG8gcGFnZSB1cC9kb3duXG4gICAgLy8gdXN1YWxseSBqdXN0IG1vdmVzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGVkZ2UgaW4gdGhhdCBkaXJlY3Rpb24uXG4gICAgbmV3SW5kZXggPSBpbmRleE9mSXRlbUF0RWRnZTtcbiAgfVxuXG4gIGlmICghbmV3SW5kZXgpIHtcbiAgICAvLyBXZSBjYW4ndCBmaW5kIGFuIGl0ZW0gaW4gdGhlIGRpcmVjdGlvbiB3ZSB3YW50IHRvIHRyYXZlbC4gU2VsZWN0IHRoZVxuICAgIC8vIGxhc3QgaXRlbSAoaWYgbW92aW5nIGRvd253YXJkKSBvciBmaXJzdCBpdGVtIChpZiBtb3ZpbmcgdXB3YXJkKS5cbiAgICBuZXdJbmRleCA9IChkb3dud2FyZCA/IGVsZW1lbnQuaXRlbXMubGVuZ3RoIC0gMSA6IDApO1xuICB9XG5cbiAgaWYgKG5ld0luZGV4ICE9PSBzZWxlY3RlZEluZGV4KSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gbmV3SW5kZXg7XG4gICAgcmV0dXJuIHRydWU7IC8vIFdlIGhhbmRsZWQgdGhlIHBhZ2UgdXAvZG93biBvdXJzZWx2ZXMuXG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBXZSBkaWRuJ3QgZG8gYW55dGhpbmcuXG4gIH1cbn1cbkNvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChLZXlib2FyZFBhZ2luZy5wcm90b3R5cGUsIHtcbiAga2V5ZG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyTWl4aW5SZXN1bHQpXG59KTtcbiIsIi8qKlxuICogTWl4aW4gdGhhdCBoYW5kbGVzIGxpc3QgYm94LXN0eWxlIHByZWZpeCB0eXBpbmcsIGluIHdoaWNoIHRoZSB1c2VyIGNhbiB0eXBlIGFcbiAqIHN0cmluZyB0byBzZWxlY3QgdGhlIGZpcnN0IGl0ZW0gdGhhdCBiZWdpbnMgd2l0aCB0aGF0IHN0cmluZy5cbiAqXG4gKiBAY2xhc3MgS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb25cbiAqXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbi8vIFRPRE86IElmIHRoZSBzZWxlY3Rpb24gaXMgY2hhbmdlZCBieSBzb21lIG90aGVyIG1lYW5zIChlLmcuLCBhcnJvdyBrZXlzKSBvdGhlclxuLy8gdGhhbiBwcmVmaXggdHlwaW5nLCB0aGVuIHRoYXQgYWN0IHNob3VsZCByZXNldCB0aGUgcHJlZml4LlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZFByZWZpeFNlbGVjdGlvbiB7XG5cbiAgLy8gaXRlbXNDaGFuZ2VkKCkge1xuICAvLyAgIHRoaXMuX2l0ZW1UZXh0Q29udGVudHMgPSBudWxsO1xuICAvLyAgIHJlc2V0VHlwZWRQcmVmaXgodGhpcyk7XG4gIC8vIH1cblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgbGV0IHJlc2V0UHJlZml4ID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSA4OiAvLyBCYWNrc3BhY2VcbiAgICAgICAgaGFuZGxlQmFja3NwYWNlKHRoaXMpO1xuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzZXRQcmVmaXggPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI3OiAvLyBFc2NhcGVcbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKCFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5ICYmICFldmVudC5hbHRLZXlcbiAgICAgICAgICAmJiBldmVudC53aGljaCAhPT0gMzIgLyogU3BhY2UgKi8pIHtcbiAgICAgICAgICBoYW5kbGVQbGFpbkNoYXJhY3Rlcih0aGlzLCBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LndoaWNoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzZXRQcmVmaXggPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAocmVzZXRQcmVmaXgpIHtcbiAgICAgIHJlc2V0VHlwZWRQcmVmaXgodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBmaXJzdCBpdGVtIHdob3NlIHRleHQgY29udGVudCBiZWdpbnMgd2l0aCB0aGUgZ2l2ZW4gcHJlZml4LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeFxuICAgKiBAcGFyYW0gcHJlZml4IFtTdHJpbmddIFRoZSBzdHJpbmcgdG8gc2VhcmNoIGZvclxuICAgKi9cbiAgc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KHByZWZpeCkge1xuICAgIGlmIChwcmVmaXggPT0gbnVsbCB8fCBwcmVmaXgubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBpbmRleCA9IGdldEluZGV4T2ZJdGVtV2l0aFRleHRQcmVmaXgodGhpcywgcHJlZml4KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbn1cbkNvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChLZXlib2FyZFByZWZpeFNlbGVjdGlvbi5wcm90b3R5cGUsIHtcbiAga2V5ZG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyTWl4aW5SZXN1bHQpXG59KTtcblxuXG4vLyBUaW1lIGluIG1pbGxpc2Vjb25kcyBhZnRlciB3aGljaCB0aGUgdXNlciBpcyBjb25zaWRlcmVkIHRvIGhhdmUgc3RvcHBlZFxuLy8gdHlwaW5nLlxuY29uc3QgUFJFRklYX1RJTUVPVVRfRFVSQVRJT04gPSAxMDAwO1xuXG5cbi8vIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gcHJlZml4LCBlbHNlIC0xLlxuZnVuY3Rpb24gZ2V0SW5kZXhPZkl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50LCBwcmVmaXgpIHtcbiAgbGV0IGl0ZW1UZXh0Q29udGVudHMgPSBnZXRJdGVtVGV4dENvbnRlbnRzKGVsZW1lbnQpO1xuICBsZXQgcHJlZml4TGVuZ3RoID0gcHJlZml4Lmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtVGV4dENvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGl0ZW1UZXh0Q29udGVudCA9IGl0ZW1UZXh0Q29udGVudHNbaV07XG4gICAgaWYgKGl0ZW1UZXh0Q29udGVudC5zdWJzdHIoMCwgcHJlZml4TGVuZ3RoKSA9PT0gcHJlZml4KSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vLyBSZXR1cm4gYW4gYXJyYXkgb2YgdGhlIHRleHQgY29udGVudCAoaW4gbG93ZXJjYXNlKSBvZiBhbGwgaXRlbXMuXG4vLyBDYWNoZSB0aGVzZSByZXN1bHRzLlxuZnVuY3Rpb24gZ2V0SXRlbVRleHRDb250ZW50cyhlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudC5faXRlbVRleHRDb250ZW50cykge1xuICAgIGxldCBpdGVtcyA9IGVsZW1lbnQuaXRlbXM7XG4gICAgZWxlbWVudC5faXRlbVRleHRDb250ZW50cyA9IGl0ZW1zLm1hcChjaGlsZCA9PiB7XG4gICAgICBsZXQgdGV4dCA9IGNoaWxkLnRleHRDb250ZW50IHx8IGNoaWxkLmFsdDtcbiAgICAgIHJldHVybiB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQuX2l0ZW1UZXh0Q29udGVudHM7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJhY2tzcGFjZShlbGVtZW50KSB7XG4gIGxldCBsZW5ndGggPSBlbGVtZW50Ll90eXBlZFByZWZpeCA/IGVsZW1lbnQuX3R5cGVkUHJlZml4Lmxlbmd0aCA6IDA7XG4gIGlmIChsZW5ndGggPiAwKSB7XG4gICAgZWxlbWVudC5fdHlwZWRQcmVmaXggPSBlbGVtZW50Ll90eXBlZFByZWZpeC5zdWJzdHIoMCwgbGVuZ3RoIC0gMSk7XG4gIH1cbiAgZWxlbWVudC5zZWxlY3RJdGVtV2l0aFRleHRQcmVmaXgoZWxlbWVudC5fdHlwZWRQcmVmaXgpO1xuICBlbGVtZW50Ll9zZXRQcmVmaXhUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBsYWluQ2hhcmFjdGVyKGVsZW1lbnQsIGNoYXIpIHtcbiAgbGV0IHByZWZpeCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4IHx8ICcnO1xuICBlbGVtZW50Ll90eXBlZFByZWZpeCA9IHByZWZpeCArIGNoYXIudG9Mb3dlckNhc2UoKTtcbiAgZWxlbWVudC5zZWxlY3RJdGVtV2l0aFRleHRQcmVmaXgoZWxlbWVudC5fdHlwZWRQcmVmaXgpO1xuICBzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiByZXNldFByZWZpeFRpbWVvdXQoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC5fcHJlZml4VGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dChlbGVtZW50Ll9wcmVmaXhUaW1lb3V0KTtcbiAgICBlbGVtZW50Ll9wcmVmaXhUaW1lb3V0ID0gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRUeXBlZFByZWZpeChlbGVtZW50KSB7XG4gIGVsZW1lbnQuX3R5cGVkUHJlZml4ID0gJyc7XG4gIHJlc2V0UHJlZml4VGltZW91dChlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gc2V0UHJlZml4VGltZW91dChlbGVtZW50KSB7XG4gIHJlc2V0UHJlZml4VGltZW91dChlbGVtZW50KTtcbiAgZWxlbWVudC5fcHJlZml4VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHJlc2V0VHlwZWRQcmVmaXgoZWxlbWVudCk7XG4gIH0sIFBSRUZJWF9USU1FT1VUX0RVUkFUSU9OKTtcbn1cbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggYXBwbGllcyBzdGFuZGFyZCBoaWdobGlnaHQgY29sb3JzIHRvIGEgc2VsZWN0ZWQgaXRlbS5cbiAqXG4gKiBAY2xhc3MgU2VsZWN0aW9uSGlnaGxpZ2h0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0aW9uSGlnaGxpZ2h0IHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc2VsZWN0ZWQgPyAnaGlnaGxpZ2h0JyA6ICcnO1xuICAgIGl0ZW0uc3R5bGUuY29sb3IgPSBzZWxlY3RlZCA/ICdoaWdobGlnaHR0ZXh0JyA6ICcnO1xuICB9XG5cbn1cbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggc2Nyb2xscyBhIGNvbnRhaW5lciB0byBrZWVwIHRoZSBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogQGNsYXNzIFNlbGVjdGlvblNjcm9sbFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGlvblNjcm9sbCB7XG5cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIC8vIEtlZXAgdGhlIHNlbGVjdGVkIGl0ZW0gaW4gdmlldy5cbiAgICAgIHRoaXMuc2Nyb2xsSXRlbUludG9WaWV3KGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdGhlIGdpdmVuIGVsZW1lbnQgY29tcGxldGVseSBpbnRvIHZpZXcsIG1pbmltaXppbmcgdGhlIGRlZ3JlZSBvZlxuICAgKiBzY3JvbGxpbmcgcGVyZm9ybWVkLlxuICAgKlxuICAgKiBCbGluayBoYXMgYSBzY3JvbGxJbnRvVmlld0lmTmVlZGVkKCkgZnVuY3Rpb24gdGhhdCBhbG1vc3QgdGhlIHNhbWUgdGhpbmcsXG4gICAqIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0J3Mgbm9uLXN0YW5kYXJkLCBhbmQgaW4gYW55IGV2ZW50IG9mdGVuIGVuZHMgdXBcbiAgICogc2Nyb2xsaW5nIG1vcmUgdGhhbiBpcyBhYnNvbHV0ZWx5IG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQG1ldGhvZCBzY3JvbGxJdGVtSW50b1ZpZXdcbiAgICovXG4gIHNjcm9sbEl0ZW1JbnRvVmlldyhpdGVtKSB7XG4gICAgLy8gR2V0IHRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvcCBvZiB0aGVcbiAgICAvLyBsaXN0J3Mgc2Nyb2xsYWJsZSBjYW52YXMuIEFuIGl0ZW0gYXQgdGhlIHRvcCBvZiB0aGUgbGlzdCB3aWxsIGhhdmUgYVxuICAgIC8vIGVsZW1lbnRUb3Agb2YgMC5cblxuICAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmlubmVybW9zdEF0dGFjaGVkO1xuICAgIGlmICghaW5uZXJtb3N0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRUb3AgPSBpdGVtLm9mZnNldFRvcCAtIGlubmVybW9zdC5vZmZzZXRUb3AgLSBpbm5lcm1vc3QuY2xpZW50VG9wO1xuICAgIGxldCBlbGVtZW50Qm90dG9tID0gZWxlbWVudFRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgIC8vIERldGVybWluZSB0aGUgYm90dG9tIG9mIHRoZSBzY3JvbGxhYmxlIGNhbnZhcy5cbiAgICBsZXQgc2Nyb2xsQm90dG9tID0gaW5uZXJtb3N0LnNjcm9sbFRvcCArIGlubmVybW9zdC5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGVsZW1lbnRCb3R0b20gPiBzY3JvbGxCb3R0b20pIHtcbiAgICAgIC8vIFNjcm9sbCB1cCB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wICs9IGVsZW1lbnRCb3R0b20gLSBzY3JvbGxCb3R0b207XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnRUb3AgPCBpbm5lcm1vc3Quc2Nyb2xsVG9wKSB7XG4gICAgICAvLyBTY3JvbGwgZG93biB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wID0gZWxlbWVudFRvcDtcbiAgICB9XG4gIH1cblxufVxuIiwiLyoqXG4gKiBNaXhpbiB3aGljaCBtYXBzIHRvdWNoIGdlc3R1cmVzIChzd2lwZSBsZWZ0LCBzd2lwZSByaWdodCkgdG8gZGlyZWN0aW9uXG4gKiBzZW1hbnRpY3MgKGdvUmlnaHQsIGdvTGVmdCkuXG4gKlxuICogQGNsYXNzIFN3aXBlRGlyZWN0aW9uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dpcGVEaXJlY3Rpb24ge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcblxuICAgIHRoaXMucG9zaXRpb24gPSAwO1xuXG4gICAgLy8gVE9ETzogVG91Y2ggZXZlbnRzIGNvdWxkIGJlIGZhY3RvcmVkIG91dCBpbnRvIGl0cyBvd24gbWl4aW4uXG5cbiAgICAvLyBJbiBhbGwgdG91Y2ggZXZlbnRzLCBvbmx5IGhhbmRsZSBzaW5nbGUgdG91Y2hlcy4gV2UgZG9uJ3Qgd2FudCB0b1xuICAgIC8vIGluYWR2ZXJ0ZW50bHkgZG8gd29yayB3aGVuIHRoZSB1c2VyJ3MgdHJ5aW5nIHRvIHBpbmNoLXpvb20gZm9yIGV4YW1wbGUuXG4gICAgLy8gVE9ETzogRXZlbiBiZXR0ZXIgYXBwcm9hY2ggdGhhbiBiZWxvdyB3b3VsZCBiZSB0byBpZ25vcmUgdG91Y2hlcyBhZnRlclxuICAgIC8vIHRoZSBmaXJzdCBpZiB0aGUgdXNlciBoYXMgYWxyZWFkeSBiZWd1biBhIHN3aXBlLlxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLl9tdWx0aVRvdWNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdG91Y2hTdGFydCh0aGlzLCBldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9tdWx0aVRvdWNoID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGV2ZW50ID0+IHtcbiAgICAgIGlmICghdGhpcy5fbXVsdGlUb3VjaCAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsZXQgaGFuZGxlZCA9IHRvdWNoTW92ZSh0aGlzLCBldmVudCk7XG4gICAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gQWxsIHRvdWNoZXMgcmVtb3ZlZDsgZ2VzdHVyZSBpcyBjb21wbGV0ZS5cbiAgICAgICAgaWYgKCF0aGlzLl9tdWx0aVRvdWNoKSB7XG4gICAgICAgICAgLy8gU2luZ2xlLXRvdWNoIHN3aXBlIGhhcyBmaW5pc2hlZC5cbiAgICAgICAgICB0b3VjaEVuZCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbXVsdGlUb3VjaCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnNcbiAgZ29MZWZ0KCkge31cbiAgZ29SaWdodCgpIHt9XG5cbiAgLyoqXG4gICAqIFRoZSBkaXN0YW5jZSB0aGUgdXNlciBoYXMgbW92ZWQgdGhlIGZpcnN0IHRvdWNocG9pbnQgc2luY2UgdGhlIGJlZ2lubmluZ1xuICAgKiBvZiBhIGRyYWcsIGV4cHJlc3NlZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBlbGVtZW50J3Mgd2lkdGguXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBwb3NpdGlvblxuICAgKiBAdHlwZSBOdW1iZXJcbiAgICovXG4gIGdldCBwb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXQgcG9zaXRpb24odmFsdWUpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvblxuICBzaG93VHJhbnNpdGlvbih2YWx1ZSkge31cblxufVxuXG5cbmZ1bmN0aW9uIHRvdWNoU3RhcnQoZWxlbWVudCwgZXZlbnQpIHtcbiAgZWxlbWVudC5zaG93VHJhbnNpdGlvbihmYWxzZSk7XG4gIGxldCB4ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgbGV0IHkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuICBlbGVtZW50Ll9zdGFydFggPSB4O1xuICBlbGVtZW50Ll9wcmV2aW91c1ggPSB4O1xuICBlbGVtZW50Ll9wcmV2aW91c1kgPSB5O1xuICBlbGVtZW50Ll9kZWx0YVggPSAwO1xuICBlbGVtZW50Ll9kZWx0YVkgPSAwO1xufVxuXG5mdW5jdGlvbiB0b3VjaE1vdmUoZWxlbWVudCwgZXZlbnQpIHtcbiAgbGV0IHggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICBsZXQgeSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XG4gIGVsZW1lbnQuX2RlbHRhWCA9IHggLSBlbGVtZW50Ll9wcmV2aW91c1g7XG4gIGVsZW1lbnQuX2RlbHRhWSA9IHkgLSBlbGVtZW50Ll9wcmV2aW91c1k7XG4gIGVsZW1lbnQuX3ByZXZpb3VzWCA9IHg7XG4gIGVsZW1lbnQuX3ByZXZpb3VzWSA9IHk7XG4gIGlmIChNYXRoLmFicyhlbGVtZW50Ll9kZWx0YVgpID4gTWF0aC5hYnMoZWxlbWVudC5fZGVsdGFZKSkge1xuICAgIC8vIE1vdmUgd2FzIG1vc3RseSBob3Jpem9udGFsLlxuICAgIHRyYWNrVG8oZWxlbWVudCwgeCk7XG4gICAgLy8gSW5kaWNhdGUgdGhhdCB0aGUgZXZlbnQgd2FzIGhhbmRsZWQuIEl0J2QgYmUgbmljZXIgaWYgd2UgZGlkbid0IGhhdmVcbiAgICAvLyB0byBkbyB0aGlzIHNvIHRoYXQsIGUuZy4sIGEgdXNlciBjb3VsZCBiZSBzd2lwaW5nIGxlZnQgYW5kIHJpZ2h0XG4gICAgLy8gd2hpbGUgc2ltdWx0YW5lb3VzbHkgc2Nyb2xsaW5nIHVwIGFuZCBkb3duLiAoTmF0aXZlIHRvdWNoIGFwcHMgY2FuIGRvXG4gICAgLy8gdGhhdC4pIEhvd2V2ZXIsIE1vYmlsZSBTYWZhcmkgd2FudHMgdG8gaGFuZGxlIHN3aXBlIGV2ZW50cyBuZWFyIHRoZVxuICAgIC8vIHBhZ2UgYW5kIGludGVycHJldCB0aGVtIGFzIG5hdmlnYXRpb25zLiBUbyBhdm9pZCBoYXZpbmcgYSBob3JpemlvbnRhbFxuICAgIC8vIHN3aXBlIG1pc2ludGVwcmV0ZWQgYXMgYSBuYXZpZ2F0aW9uLCB3ZSBpbmRpY2F0ZSB0aGF0IHdlJ3ZlIGhhbmRsZWRcbiAgICAvLyB0aGUgZXZlbnQsIGFuZCBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3IuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgLy8gTW92ZSB3YXMgbW9zdGx5IHZlcnRpY2FsLlxuICAgIHJldHVybiBmYWxzZTsgLy8gTm90IGhhbmRsZWRcbiAgfVxufVxuXG5mdW5jdGlvbiB0b3VjaEVuZChlbGVtZW50LCBldmVudCkge1xuICBlbGVtZW50LnNob3dUcmFuc2l0aW9uKHRydWUpO1xuICBsZXQgeCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG4gIGlmIChlbGVtZW50Ll9kZWx0YVggPj0gMjApIHtcbiAgICAvLyBGaW5pc2hlZCBnb2luZyByaWdodCBhdCBoaWdoIHNwZWVkLlxuICAgIC8vIGNvbnNvbGUubG9nKFwiZmxpY2sgcmlnaHQgXCIgKyBlbGVtZW50Ll9kZWx0YVgpO1xuICAgIGVsZW1lbnQuZ29MZWZ0KCk7XG4gIH0gZWxzZSBpZiAoZWxlbWVudC5fZGVsdGFYIDw9IC0yMCkge1xuICAgIC8vIEZpbmlzaGVkIGdvaW5nIGxlZnQgYXQgaGlnaCBzcGVlZC5cbiAgICAvLyBjb25zb2xlLmxvZyhcImZsaWNrIGxlZnQgXCIgKyBlbGVtZW50Ll9kZWx0YVgpO1xuICAgIGVsZW1lbnQuZ29SaWdodCgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZpbmlzaGVkIGF0IGxvdyBzcGVlZC5cbiAgICAvLyBjb25zb2xlLmxvZyhcInNsb3cgZHJhZyBcIiArIGVsZW1lbnQuX2RlbHRhWCk7XG4gICAgdHJhY2tUbyhlbGVtZW50LCB4KTtcbiAgICBsZXQgcG9zaXRpb24gPSBlbGVtZW50LnBvc2l0aW9uO1xuICAgIGlmIChwb3NpdGlvbiA+PSAwLjUpIHtcbiAgICAgIGVsZW1lbnQuZ29SaWdodCgpO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPD0gLTAuNSkge1xuICAgICAgZWxlbWVudC5nb0xlZnQoKTtcbiAgICB9XG4gIH1cbiAgZWxlbWVudC5wb3NpdGlvbiA9IDA7XG4gIGVsZW1lbnQuX2RlbHRhWCA9IG51bGw7XG4gIGVsZW1lbnQuX2RlbHRhWSA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHRyYWNrVG8oZWxlbWVudCwgeCkge1xuICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICBsZXQgZHJhZ0Rpc3RhbmNlID0gZWxlbWVudC5fc3RhcnRYIC0geDtcbiAgbGV0IGZyYWN0aW9uID0gd2lkdGggPiAwID9cbiAgICBkcmFnRGlzdGFuY2UgLyB3aWR0aCA6XG4gICAgMDtcbiAgZWxlbWVudC5wb3NpdGlvbiA9IGZyYWN0aW9uO1xufVxuIiwiLyoqXG4gKiBNaXhpbiB0aGF0IGFsbG93cyBhIGNvbXBvbmVudCB0byBkZWxlZ2F0ZSBpdHMgb3duIHNlbGVjdGlvbiBzZW1hbnRpY3MgdG8gYVxuICogdGFyZ2V0IGVsZW1lbnQuIFRoaXMgaXMgdXNlZnVsIHdoZW4gZGVmaW5pbmcgY29tcG9uZW50cyB0aGF0IGFjdCBhc1xuICogb3B0aW9uYWwgZGVjb3JhdG9ycyBmb3IgYSBjb21wb25lbnQgdGhhdCBhY3RzIGxpa2UgYSBsaXN0LlxuICpcbiAqIEBjbGFzcyBUYXJnZXRTZWxlY3Rpb25cbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhcmdldFNlbGVjdGlvbiB7XG5cbiAgLy8gYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgLy8gICAvLyBBcHBseSBhbnkgc2VsZWN0aW9uIG1hZGUgYmVmb3JlIGFzc2ltaWxhdGlvbi5cbiAgLy8gICBpZiAodGhpcy5fcHJlbWF0dXJlU2VsZWN0ZWRJbmRleFxuICAvLyAgICAgICAmJiAnc2VsZWN0ZWRJbmRleCcgaW4gdGhpcyAmJiB0aGlzLnNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG4gIC8vICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLl9wcmVtYXR1cmVTZWxlY3RlZEluZGV4O1xuICAvLyAgICAgdGhpcy5fcHJlbWF0dXJlU2VsZWN0ZWRJbmRleCA9IG51bGw7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgaW5kZXhPZkl0ZW0oaXRlbSkge1xuICAgIGxldCB0YXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICByZXR1cm4gdGFyZ2V0ID9cbiAgICAgIHRhcmdldC5pbmRleE9mSXRlbShpdGVtKSA6XG4gICAgICAtMTtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgbGV0IGl0ZW1zID0gdGFyZ2V0ICYmIHRhcmdldC5pdGVtcztcbiAgICByZXR1cm4gaXRlbXMgfHwgW107XG4gIH1cblxuICBpdGVtc0NoYW5nZWQoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaXRlbXMtY2hhbmdlZCcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIGl0ZW0gd2hpY2ggaXMgY3VycmVudGx5IHNlbGVjdGVkLCBvciAtMSBpZiB0aGVyZSBpcyBub1xuICAgKiBzZWxlY3Rpb24uXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3RlZEluZGV4XG4gICAqIEB0eXBlIE51bWJlclxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgbGV0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgIHJldHVybiB0YXJnZXQgJiYgdGFyZ2V0LnNlbGVjdGVkSW5kZXg7XG4gIH1cbiAgc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICAvLyBpZiAoJ3NlbGVjdGVkSW5kZXgnIGluIHRoaXMge1xuICAgIC8vICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIC8vIFNlbGVjdGlvbiBpcyBiZWluZyBtYWRlIGJlZm9yZSB0aGUgY29sbGVjdGl2ZSBzdXBwb3J0cyBpdC5cbiAgICAvLyAgIHRoaXMuX3ByZW1hdHVyZVNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAvLyB9XG4gICAgbGV0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LnNlbGVjdGVkSW5kZXggIT09IGluZGV4KSB7XG4gICAgICB0YXJnZXQuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0sIG9yIG51bGwgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0ZWRJdGVtXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkSXRlbSgpIHtcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgcmV0dXJuIHRhcmdldCAmJiB0YXJnZXQuc2VsZWN0ZWRJdGVtO1xuICB9XG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIGxldCB0YXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0YXJnZXQuc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICB9XG4gIH1cblxuICBzZXQgdGFyZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faXRlbXNDaGFuZ2VkTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignaXRlbXMtY2hhbmdlZCcsIHRoaXMuX2l0ZW1zQ2hhbmdlZExpc3RlbmVyKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkSXRlbUNoYW5nZWRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3RlZC1pdGVtLWNoYW5nZWQnLCB0aGlzLl9zZWxlY3RlZEl0ZW1DaGFuZ2VkTGlzdGVuZXIpO1xuICAgIH1cbiAgICB0aGlzLl9pdGVtc0NoYW5nZWRMaXN0ZW5lciA9IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaXRlbXMtY2hhbmdlZCcsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gICAgfSk7XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtQ2hhbmdlZExpc3RlbmVyID0gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3RlZC1pdGVtLWNoYW5nZWQnLCBldmVudCA9PiB7XG4gICAgICAvLyBMZXQgdGhlIGNvbXBvbmVudCBrbm93IHRoZSB0YXJnZXQncyBzZWxlY3Rpb24gY2hhbmdlZCwgYnV0IHdpdGhvdXRcbiAgICAgIC8vIHJlLWludm9raW5nIHRoZSBzZWxlY3RJbmRleC9zZWxlY3RlZEl0ZW0gc2V0dGVyLlxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1DaGFuZ2VkKCk7XG4gICAgfSk7XG4gICAgLy8gRm9yY2UgaW5pdGlhbCByZWZyZXNoLlxuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gIH1cblxufVxuIiwiLypcbiAqIE1peGluIHdoaWNoIG1hcHMgYSBob3Jpem9udGFsIHRyYWNrcGFkIHN3aXBlIGdlc3R1cmVzIChvciBob3Jpem9udGFsIG1vdXNlXG4gKiB3aGVlbCBhY3Rpb25zKSB0byBkaXJlY3Rpb24gc2VtYW50aWNzLlxuICpcbiAqIFRvIHJlc3BvbmQgdG8gdGhlIHRyYWNrcGFkLCB3ZSBjYW4gbGlzdGVuIHRvIHRoZSBET00ncyBcIndoZWVsXCIgZXZlbnRzLiBUaGVzZVxuICogZXZlbnRzIGFyZSBmaXJlZCBhcyB0aGUgdXNlciBkcmFncyB0aGVpciBmaW5nZXJzIGFjcm9zcyBhIHRyYWNrcGFkLlxuICogVW5mb3J0dW5hdGVseSwgdGhpcyBzY2hlbWUgaXMgbWlzc2luZyBhIGNyaXRpY2FsIGV2ZW50IOKAlMKgdGhlcmUgaXMgbm8gZXZlbnQgd2hlblxuICogdGhlIHVzZXIgKnN0b3BzKiBhIGdlc3R1cmVkIG9uIHRoZSB0cmFja3BhZC5cbiAqXG4gKiBUbyBjb21wbGljYXRlIG1hdHRlcnMsIHRoZSBtYWluc3RyZWFtIGJyb3dzZXJzIGNvbnRpbnVlIHRvIGdlbmVyYXRlIHdoZWVsIGV2ZW50c1xuICogZXZlbiBhZnRlciB0aGUgdXNlciBoYXMgc3RvcHBlZCBkcmFnZ2luZyB0aGVpciBmaW5nZXJzLiBUaGVzZSBmYWtlIGV2ZW50c1xuICogc2ltdWxhdGUgdGhlIHVzZXIgZ3JhZHVhbGx5IHNsb3dpbmcgZG93biB0aGUgZHJhZyB1bnRpbCB0aGV5IGNvbWUgdG8gYSBzbW9vdGhcbiAqIHN0b3AuIEluIHNvbWUgY29udGV4dHMsIHRoZXNlIGZha2Ugd2hlZWwgZXZlbnRzIG1pZ2h0IGJlIGhlbHBmdWwsIGJ1dCBpbiB0cnlpbmdcbiAqIHRvIHN1cHBseSB0eXBpY2FsIHRyYWNrcGFkIHN3aXBlIG5hdmlnYXRpb24sIHRoZXNlIGZha2UgZXZlbnRzIGdldCBpbiB0aGUgd2F5LlxuICpcbiAqIFRoaXMgY29tcG9uZW50IHVzZXMgc29tZSBoZXVyaXN0aWNzIHRvIHdvcmsgYXJvdW5kIHRoZXNlIHByb2JsZW1zLCBidXQgdGhlXG4gKiBjb21wbGV4IG5hdHVyZSBvZiB0aGUgcHJvYmxlbSBtYWtlIGl0IGV4dHJlbWVseSBkaWZmaWN1bHQgdG8gYWNoaWV2ZSB0aGUgc2FtZVxuICogZGVncmVlIG9mIHRyYWNrcGFkIHJlc3BvbnNpdmVuZXNzIHBvc3NpYmxlIHdpdGggbmF0aXZlIGFwcGxpY2F0aW9ucy5cbiAqXG4gKiBAY2xhc3MgVHJhY2twYWREaXJlY3Rpb25cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFja3BhZERpcmVjdGlvbiB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBldmVudCA9PiB7XG4gICAgICB2YXIgaGFuZGxlZCA9IHdoZWVsKHRoaXMsIGV2ZW50KTtcbiAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzZXRXaGVlbFRyYWNraW5nKHRoaXMpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnNcbiAgZ29MZWZ0KCkge31cbiAgZ2V0IHBvc2l0aW9uKCkge31cbiAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7fVxuICBnb1JpZ2h0KCkge31cbiAgc2hvd1RyYW5zaXRpb24oKSB7fVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoVHJhY2twYWREaXJlY3Rpb24ucHJvdG90eXBlLCB7XG4gIHBvc2l0aW9uOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlR2V0dGVyKVxufSk7XG5cblxuLy8gVGltZSB3ZSB3YWl0IGZvbGxvd2luZyBhIG5hdmlnYXRpb24gYmVmb3JlIHBheWluZyBhdHRlbnRpb24gdG8gd2hlZWxcbi8vIGV2ZW50cyBhZ2Fpbi5cbmNvbnN0IFBPU1RfTkFWSUdBVEVfVElNRSA9IDI1MDtcblxuLy8gVGltZSB3ZSB3YWl0IGFmdGVyIHRoZSBsYXN0IHdoZWVsIGV2ZW50IGJlZm9yZSB3ZSByZXNldCB0aGluZ3MuXG5jb25zdCBXSEVFTF9USU1FID0gMTAwO1xuXG5cbi8vIEZvbGxvd2luZyBhIG5hdmlnYXRpb24sIHBhcnRpYWxseSByZXNldCBvdXIgd2hlZWwgdHJhY2tpbmcuXG5mdW5jdGlvbiBwb3N0TmF2aWdhdGUoZWxlbWVudCkge1xuICBlbGVtZW50LnBvc2l0aW9uID0gMDtcbiAgZWxlbWVudC5fd2hlZWxEaXN0YW5jZSA9IDA7XG4gIGVsZW1lbnQuX3Bvc3ROYXZpZ2F0ZURlbGF5Q29tcGxldGUgPSB0cnVlO1xuICBlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24gPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBlbGVtZW50Ll9wb3N0TmF2aWdhdGVEZWxheUNvbXBsZXRlID0gZmFsc2U7XG4gIH0sIFBPU1RfTkFWSUdBVEVfVElNRSk7XG59XG5cbi8vIFJlc2V0IGFsbCBzdGF0ZSByZWxhdGVkIHRvIHRoZSB0cmFja2luZyBvZiB0aGUgd2hlZWwuXG5mdW5jdGlvbiByZXNldFdoZWVsVHJhY2tpbmcoZWxlbWVudCkge1xuICBlbGVtZW50LnBvc2l0aW9uID0gMDtcbiAgZWxlbWVudC5fd2hlZWxEaXN0YW5jZSA9IDA7XG4gIGVsZW1lbnQuX2xhc3REZWx0YVggPSAwO1xuICBlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24gPSBmYWxzZTtcbiAgZWxlbWVudC5fcG9zdE5hdmlnYXRlRGVsYXlDb21wbGV0ZSA9IGZhbHNlO1xuICBpZiAoZWxlbWVudC5fbGFzdFdoZWVsVGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dChlbGVtZW50Ll9sYXN0V2hlZWxUaW1lb3V0KTtcbiAgICBlbGVtZW50Ll9sYXN0V2hlZWxUaW1lb3V0ID0gbnVsbDtcbiAgfVxufVxuXG4vLyBEZWZpbmUgb3VyIG93biBzaWduIGZ1bmN0aW9uLCBzaW5jZSAoYXMgb2YgTWF5IDIwMTUpLCBTYWZhcmkgYW5kIElFIGRvbid0XG4vLyBzdXBwbHkgTWF0aC5zaWduKCkuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgcmV0dXJuICh4ID09PSAwKSA/XG4gICAgMCA6XG4gICAgKHggPiAwKSA/XG4gICAgICAxIDpcbiAgICAgIC0xO1xufVxuXG4vLyBUT0RPOiBEYW1waW5nLCBvciBzb21lIG90aGVyIHRyZWF0bWVudCBmb3IgZ29pbmcgcGFzdCB0aGUgZW5kcy5cblxuLypcbiAqIEEgd2hlZWwgZXZlbnQgaGFzIGJlZW4gZ2VuZXJhdGVkLiBUaGlzIGNvdWxkIGJlIGEgcmVhbCB3aGVlbCBldmVudCwgb3IgaXRcbiAqIGNvdWxkIGJlIGZha2UgKHNlZSBub3RlcyBpbiB0aGUgaGVhZGVyKS5cbiAqXG4gKiBUaGlzIGhhbmRsZXIgdXNlcyBzZXZlcmFsIHN0cmF0ZWdpZXMgdG8gdHJ5IHRvIGFwcHJveGltYXRlIG5hdGl2ZSB0cmFja3BhZFxuICogc3dpcGUgbmF2aWdhdGlvbi5cbiAqXG4gKiBJZiB0aGUgdXNlciBoYXMgZHJhZ2dlZCBlbm91Z2ggdG8gY2F1c2UgYSBuYXZpZ2F0aW9uLCB0aGVuIGZvciBhIHNob3J0XG4gKiBkZWxheSBmb2xsb3dpbmcgdGhhdCBuYXZpZ2F0aW9uLCBzdWJzZXF1ZW50IHdoZWVsIGV2ZW50cyB3aWxsIGJlIGlnbm9yZWQuXG4gKlxuICogRnVydGhlcm1vcmUsIGZvbGx3b3dpbmcgYSBuYXZpZ2F0aW9uLCB3ZSBpZ25vcmUgYWxsIHdoZWVsIGV2ZW50cyB1bnRpbCB3ZVxuICogcmVjZWl2ZSBhdCBsZWFzdCBvbmUgZXZlbnQgd2hlcmUgdGhlIGV2ZW50J3MgZGVsdGFYIChkaXN0YW5jZSB0cmF2ZWxlZCkgaXNcbiAqICpncmVhdGVyKiB0aGFuIHRoZSBwcmV2aW91cyBldmVudCdzIGRlbHRhWC4gVGhpcyBoZWxwcyB1cyBmaWx0ZXIgb3V0IHRoZVxuICogZmFrZSB3aGVlbCBldmVudHMgZ2VuZXJhdGVkIGJ5IHRoZSBicm93c2VyIHRvIHNpbXVsYXRlIGRlY2VsZXJhdGlvbi5cbiAqXG4gKi9cbmZ1bmN0aW9uIHdoZWVsKGVsZW1lbnQsIGV2ZW50KSB7XG5cbiAgLy8gU2luY2Ugd2UgaGF2ZSBhIG5ldyB3aGVlbCBldmVudCwgcmVzZXQgb3VyIHRpbWVyIHdhaXRpbmcgZm9yIHRoZSBsYXN0XG4gIC8vIHdoZWVsIGV2ZW50IHRvIHBhc3MuXG4gIGlmIChlbGVtZW50Ll9sYXN0V2hlZWxUaW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KGVsZW1lbnQuX2xhc3RXaGVlbFRpbWVvdXQpO1xuICB9XG4gIGVsZW1lbnQuX2xhc3RXaGVlbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB3aGVlbFRpbWVkT3V0KGVsZW1lbnQpO1xuICB9LCBXSEVFTF9USU1FKTtcblxuICB2YXIgZGVsdGFYID0gZXZlbnQuZGVsdGFYO1xuICB2YXIgZGVsdGFZID0gZXZlbnQuZGVsdGFZO1xuXG4gIC8vIFNlZSBpZiBlbGVtZW50IGV2ZW50IHJlcHJlc2VudHMgYWNjZWxlcmF0aW9uIG9yIGRlY2VsZXJhdGlvbi5cbiAgdmFyIGFjY2VsZXJhdGlvbiA9IHNpZ24oZGVsdGFYKSAqIChkZWx0YVggLSBlbGVtZW50Ll9sYXN0RGVsdGFYKTtcbiAgZWxlbWVudC5fbGFzdERlbHRhWCA9IGRlbHRhWDtcbiAgLy8gY29uc29sZS5sb2coZGVsdGFYICsgXCIgXCIgKyBhY2NlbGVyYXRpb24gKyBcIiBcIiArIGVsZW1lbnQuX2Fic29yYkRlY2VsZXJhdGlvbiArIFwiIFwiICsgZWxlbWVudC5fcG9zdE5hdmlnYXRlRGVsYXlDb21wbGV0ZSk7XG5cbiAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPCBNYXRoLmFicyhkZWx0YVkpKSB7XG4gICAgLy8gTW92ZSB3YXMgbW9zdGx5IHZlcnRpY2FsLiBUaGUgdXNlciBtYXkgYmUgdHJ5aW5nIHNjcm9sbCB3aXRoIHRoZVxuICAgIC8vIHRyYWNrcGFkL3doZWVsLiBUbyBiZSBvbiB0aGUgc2FmZSwgd2UgaWdub3JlIHN1Y2ggZXZlbnRzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChlbGVtZW50Ll9wb3N0TmF2aWdhdGVEZWxheUNvbXBsZXRlKSB7XG4gICAgLy8gSXQncyB0b28gc29vbiBhZnRlciBhIG5hdmlnYXRpb247IGlnbm9yZSB0aGUgZXZlbnQuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIGlmIChhY2NlbGVyYXRpb24gPiAwKSB7XG4gICAgLy8gVGhlIGV2ZW50cyBhcmUgbm90IChvciBhcmUgbm8gbG9uZ2VyKSBkZWNlbGVyYXRpbmcsIHNvIHdlIGNhbiBzdGFydFxuICAgIC8vIHBheWluZyBhdHRlbnRpb24gdG8gdGhlbSBhZ2Fpbi5cbiAgICBlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24gPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24pIHtcbiAgICAvLyBUaGUgd2hlZWwgZXZlbnQgd2FzIGxpa2VseSBmYWtlZCB0byBzaW11bGF0ZSBkZWNlbGVyYXRpb247IGlnbm9yZSBpdC5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGVsZW1lbnQuX3doZWVsRGlzdGFuY2UgKz0gZGVsdGFYO1xuXG4gIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW1zIGJlaW5nIG5hdmlnYXRlZC5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIHBvc2l0aW9uID0gd2lkdGggPiAwID9cbiAgICBlbGVtZW50Ll93aGVlbERpc3RhbmNlIC8gd2lkdGggOlxuICAgIDA7XG4gIGVsZW1lbnQuc2hvd1RyYW5zaXRpb24oZmFsc2UpO1xuICBwb3NpdGlvbiA9IHNpZ24ocG9zaXRpb24pICogTWF0aC5taW4oTWF0aC5hYnMocG9zaXRpb24pLCAxKTtcbiAgZWxlbWVudC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gIC8vIElmIHRoZSB1c2VyIGhhcyBkcmFnZ2VkIGVub3VnaCB0byByZWFjaCB0aGUgcHJldmlvdXMvbmV4dCBpdGVtLCB0aGVuXG4gIC8vIGNvbXBsZXRlIGEgbmF2aWdhdGlvbiB0byB0aGF0IGl0ZW0uXG4gIGlmIChwb3NpdGlvbiA9PT0gMSkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiZ29SaWdodFwiKTtcbiAgICBlbGVtZW50LnNob3dUcmFuc2l0aW9uKHRydWUpO1xuICAgIGVsZW1lbnQuZ29SaWdodCgpO1xuICAgIHBvc3ROYXZpZ2F0ZShlbGVtZW50KTtcbiAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gLTEpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImdvTGVmdFwiKTtcbiAgICBlbGVtZW50LnNob3dUcmFuc2l0aW9uKHRydWUpO1xuICAgIGVsZW1lbnQuZ29MZWZ0KCk7XG4gICAgcG9zdE5hdmlnYXRlKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIEEgc3VmZmljaWVudGx5IGxvbmcgcGVyaW9kIG9mIHRpbWUgaGFzIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCB3aGVlbCBldmVudC5cbi8vIFdlIHNuYXAgdGhlIHNlbGVjdGlvbiB0byB0aGUgY2xvc2VzdCBpdGVtLCB0aGVuIHJlc2V0IG91ciBzdGF0ZS5cbmZ1bmN0aW9uIHdoZWVsVGltZWRPdXQoZWxlbWVudCkge1xuICAvLyBjb25zb2xlLmxvZyhcInRpbWVvdXRcIik7XG5cbiAgLy8gU25hcCB0byB0aGUgY2xvc2VzdCBpdGVtLlxuICBlbGVtZW50LnNob3dUcmFuc2l0aW9uKHRydWUpO1xuICB2YXIgcG9zaXRpb24gPSBlbGVtZW50LnBvc2l0aW9uO1xuICBpZiAocG9zaXRpb24gPj0gMC41KSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzbmFwIHJpZ2h0XCIpO1xuICAgIGVsZW1lbnQuZ29SaWdodCgpO1xuICB9IGVsc2UgaWYgKHBvc2l0aW9uIDw9IC0wLjUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInNuYXAgbGVmdFwiKTtcbiAgICBlbGVtZW50LmdvTGVmdCgpO1xuICB9XG5cbiAgLy8gVE9ETzogTGlzdGVuIGZvciB0aGUgdHJhbnNpdGlvbiB0byBjb21wbGV0ZSwgYW5kIHRoZW4gcmVzdG9yZVxuICAvLyBzaG93VHJhbnNpdGlvbiB0byBmYWxzZSAob3IgdGhlIHByZXZpb3VzIHZhbHVlKS5cblxuICByZXNldFdoZWVsVHJhY2tpbmcoZWxlbWVudCk7XG59XG4iLCIvKlxuICogRXh0ZW5kIGNsYXNzZXMvb2JqZWN0cyB3aXRoIG90aGVyIGNsYXNzZXMvb2JqZWN0cy5cbiAqL1xuXG5pbXBvcnQgKiBhcyBDb21wb3NpdGlvblJ1bGVzIGZyb20gJy4vQ29tcG9zaXRpb25SdWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2FibGUge1xuXG4gIC8qXG4gICAqIFJldHVybiBhIHN1YmNsYXNzIG9mIHRoZSBjdXJyZW50IGNsYXNzIHRoYXQgaW5jbHVkZXMgdGhlIG1lbWJlcnMgaW5kaWNhdGVkXG4gICAqIGluIHRoZSBhcmd1bWVudC4gVGhlIGFyZ3VtZW50IGNhbiBiZSBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0LCBvciBhIGNsYXNzXG4gICAqIHdob3NlIHByb3RvdHlwZSBjb250YWlucyB0aGUgbWVtYmVycyB0aGF0IHdpbGwgYmUgY29waWVkLlxuICAgKlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIGZvciBhIGNvdXBsZSBvZiBwdXJwb3NlczpcbiAgICogMS4gRXh0ZW5kIGEgY2xhc3Mgd2l0aCBtaXhpbnMvYmVoYXZpb3JzLlxuICAgKiAyLiBDcmVhdGUgYSBjb21wb25lbnQgY2xhc3MgaW4gRVM1LlxuICAgKlxuICAgKiBUaGUgY2FsbFxuICAgKlxuICAgKiAgIE15QmFzZUNsYXNzLmNvbXBvc2UoTWl4aW4xLCBNaXhpbjIsIE1peGluMylcbiAgICpcbiAgICogd2lsbCByZXR1cm4gYSBuZXcgY2xhc3Mgb2YgTXlCYXNlQ2xhc3MgdGhhdCBpbXBsZW1lbnRzIGFsbCB0aGUgbWV0aG9kcyBpblxuICAgKiB0aGUgdGhyZWUgbWl4aW5zIGdpdmVuLiBUaGUgYWJvdmUgaXMgZXF1aXZhbGVudCB0b1xuICAgKlxuICAgKiAgIE15QmFzZUNsYXNzLmNvbXBvc2UoTWl4aW4xKS5jb21wb3NlKE1peGluMikuY29tcG9zZShNaXhpbjMpXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGNhbiBiZSBzdGF0aWNhbGx5IGludm9rZWQgdG8gZXh0ZW5kIHBsYWluIG9iamVjdHMgb3IgY2xhc3Nlc1xuICAgKiB0aGF0IGRvbid0IGluaGVyaXQgZnJvbSB0aGlzIGNsYXNzOlxuICAgKlxuICAgKiAgIGxldCBleHRlbmRlZCA9IENvbXBvc2FibGUuZXh0ZW5kLmNhbGwob2JqMSwgb2JqMik7XG4gICAqXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZSguLi5taXhpbnMpIHtcbiAgICAvLyBXZSBjcmVhdGUgYSBuZXcgc3ViY2xhc3MgZm9yIGVhY2ggbWl4aW4gaW4gdHVybi4gVGhlIHJlc3VsdCBiZWNvbWVzXG4gICAgLy8gdGhlIGJhc2UgY2xhc3MgZXh0ZW5kZWQgYnkgYW55IHN1YnNlcXVlbnQgbWl4aW5zLiBJdCB0dXJucyBvdXQgdGhhdFxuICAgIC8vIHdlIGNhbiB1c2UgQXJyYXkucmVkdWNlKCkgdG8gY29uY2lzZWx5IGV4cHJlc3MgdGhpcywgdXNpbmcgdGhlIGN1cnJlbnRcbiAgICAvLyAob3JpZ2luYWwpIGNsYXNzIGFzIHRoZSBzZWVkIGZvciByZWR1Y2UoKS5cbiAgICByZXR1cm4gbWl4aW5zLnJlZHVjZShjb21wb3NlLCB0aGlzKTtcbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRlIFwidGhpc1wiIHdpdGggdGhlIGluZGljYXRlZCBkZWNvcmF0b3JzLiBUaGUgbGF0dGVyIHNob3VsZCBiZSBhXG4gICAqIGRpY3Rpb25hcnkgbWFwcGluZyBwcm9wZXJ0eSBuYW1lcyB0byAocHJvcG9zZWQpIEVTNy1jb21wbGlhbnQgZGVjb3JhdG9ycy5cbiAgICogVGhpcyBhbGxvd3MgdGhlIHVzZSBvZiBkZWNvcmF0b3JzIGluIEVTNi81LiBFeGFtcGxlLCB0aGlzIEVTNyBjb2RlOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyB7XG4gICAqICAgICAgQGRlY29yYXRlKGN1c3RvbURlY29yYXRvcilcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICpcbiAgICogY2FuIGJlIHdyaXR0ZW4gdXNpbmcgdGhlIGRlY29yYXRlKCkgbWV0aG9kIGFzOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyB7XG4gICAqICAgICAgYmFyKCkge31cbiAgICogICB9XG4gICAqICAgQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEZvby5wcm90b3R5cGUsIHsgYmFyOiBjdXN0b21EZWNvcmF0b3IgfSk7XG4gICAqXG4gICAqIE9yLCBpZiBGb28gZGVyaXZlcyBmcm9tIENvbXBvc2FibGUgYWxyZWFkeSwgdGhpcyBjYW4gYmUgc2hvcnRlcjpcbiAgICpcbiAgICogICBjbGFzcyBGb28gZXh0ZW5kcyBDb21wb3NhYmxlIHtcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICogICBGb28ucHJvdG90eXBlLmRlY29yYXRlKHsgYmFyOiBjdXN0b21EZWNvcmF0b3IgfSk7XG4gICAqXG4gICAqL1xuICBzdGF0aWMgZGVjb3JhdGUoZGVjb3JhdG9ycykge1xuICAgIGZvciAobGV0IGtleSBpbiBkZWNvcmF0b3JzKSB7XG4gICAgICBsZXQgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1trZXldO1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIGtleSk7XG4gICAgICBkZWNvcmF0b3IodGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRlcyB0aGUgcHJvdG90eXBlIG9mIGEgY2xhc3MgZGVyaXZlZCBmcm9tIENvbXBvc2FibGUuXG4gICAqIFNlZSBub3RlcyBmb3IgdGhlIHN0YXRpYyBkZWNvcmF0ZSgpIG1ldGhvZC5cbiAgICovXG4gIGRlY29yYXRlKGRlY29yYXRvcnMpIHtcbiAgICBDb21wb3NhYmxlLmRlY29yYXRlLmNhbGwodGhpcywgZGVjb3JhdG9ycyk7XG4gIH1cblxuICAvKlxuICAgKiBEZWNvcmF0b3IgZm9yIGFubm90YXRpbmcgaG93IGEgY2xhc3MgbWVtYmVyIHNob3VsZCBiZSBjb21wb3NlZCBsYXRlci5cbiAgICogVGhpcyB0YWtlcyBhIGRlY29yYXRvciB0aGF0IHdpbGwgYmUgcnVuIGF0ICpjb21wb3NpdGlvbiogdGltZS5cbiAgICogRm9yIG5vdywgdGhpcyBjYW4gb25seSBiZSBhcHBsaWVkIHRvIG1ldGhvZHMuXG4gICAqL1xuICBzdGF0aWMgcnVsZShkZWNvcmF0b3IpIHtcbiAgICAvLyBSZXR1cm4gYSBkZWNvcmF0b3IgdGhhdCByZWNvcmRzIHRoZSBnaXZlbiBkZWNvcmF0b3Igb24gdGhlIG1lbWJlciBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAvLyBUT0RPOiBVc2UgYSBTeW1ib2wgaW5zdGVhZCBvZiBhIHN0cmluZyBwcm9wZXJ0eSBuYW1lIHRvIHNhdmUgdGhpcy5cbiAgICAgIC8vIGRlc2NyaXB0b3IudmFsdWUuX2NvbXBvc2l0aW9uUnVsZSA9IGRlY29yYXRvcjtcbiAgICAgIGlmICghdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzKSB7XG4gICAgICAgIHRhcmdldC5fY29tcG9zaXRpb25SdWxlcyA9IHt9O1xuICAgICAgfVxuICAgICAgdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzW2tleV0gPSBkZWNvcmF0b3I7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vKlxuICogRXhwb3NlIHN0YW5kYXJkIGNvbXBvc2l0aW9uIHJ1bGVzIGFzIHByb3BlcnRpZXMgb2YgQ29tcG9zYWJsZS5cbiAqIFRoaXMgYXZvaWRzIHRoZSBuZWVkIGZvciBzb21lb25lIHRvIG1ha2UgYSBzZXBhcmF0ZSBpbXBvcnQgb2YgdGhlIHJ1bGVzLlxuICovXG5Db21wb3NhYmxlLnJ1bGVzID0gQ29tcG9zaXRpb25SdWxlcztcblxuXG4vKlxuICogQWxsIENvbXBvc2FibGUgb2JqZWN0cyBoYXZlIGEgXCJwcm90b3R5cGVzXCIga2V5IHRoYXQga2VlcHMgcmVmZXJlbmNlcyB0byB0aGVcbiAqIG1peGlucyB0aGF0IHdlcmUgYXBwbGllZCBhbG9uZyB0aGUgcHJvdG90eXBlIGNoYWluLiBXaGVuIGEgKm5hbWVkKiBtaXhpbiBpc1xuICogYXBwbGllZCB0byB0aGUgcHJvdG90eXBlIGNoYWluLCB0aGUgcmVzdWx0aW5nIG9iamVjdCAob3IsIGZvciBhIGNsYXNzLCB0aGVcbiAqIGNsYXNzJyBwcm90b3R5cGUpIHdpbGwgaGF2ZSBhIFwicHJvdG90eXBlc1wiIHZhbHVlIGZvciB0aGF0IG5hbWUgdGhhdCBwb2ludHNcbiAqIGJhY2sgdG8gdGhlIG1peGluLiBUaGF0IGlzLCBhIG1peGluIGNhbiBnZXQgYSBwb2ludGVyIHRvIGl0c2VsZiBpbiB0aGUgY2hhaW4uXG4gKlxuICogQSBzaW5nbGUgbWl4aW4gY2FuIGJlIGFwcGxpZWQgdG8gbXVsdGlwbGUgcHJvdG90eXBlIGNoYWlucyAtLSB0aGUgbmFtZVxuICogcmVmZXJzIHRvIHRoZSBwcm90b3R5cGUgb24gKnRoaXMgcGFydGljdWxhciBwcm90b3R5cGUgY2hhaW4qIHRoYXQgd2FzIGFkZGVkXG4gKiBmb3IgdGhhdCBtaXhpbi4gVGhpcyBsZXRzIG1peGluL21peGluIGNvZGUgZ2V0IGJhY2sgdG8gaXRzIG93blxuICogcHJvdG90eXBlLCBtb3N0IG9mdGVuIGluIGNvbWJpbmF0aW9uIHdpdGggXCJzdXBlclwiIChzZWUgYmVsb3cpIGluIG9yZGVyIHRvXG4gKiBpbnZva2Ugc3VwZXJjbGFzcyBiZWhhdmlvci5cbiAqL1xuQ29tcG9zYWJsZS5wcm90b3R5cGUucHJvdG90eXBlcyA9IHtcbiAgQ29tcG9zYWJsZTogQ29tcG9zYWJsZS5wcm90b3R5cGVcbn07XG5cbi8qXG4gKiBBbGwgQ29tcG9zYWJsZS1jcmVhdGVkIG9iamVjdHMgaGF2ZSBhIFwic3VwZXJcIiBwcm9wZXJ0eSB0aGF0IHJlZmVyZW5jZXMgdGhlXG4gKiBwcm90b3R5cGUgYWJvdmUgdGhlbSBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIFRoaXMgXCJzdXBlclwiIHJlZmVyZW5jZSBpcyB1c2VkIGFzIGEgcmVwbGFjZW1lbnQgZm9yIEVTNidzIFwic3VwZXJcIiBrZXl3b3JkIGluXG4gKiBpbiBFUzUgKG9yIHRyYW5zcGlsZWQgRVM2KSBtaXhpbnMgdGhhdCB3YW50IHRvIGludm9rZSBzdXBlcmNsYXNzIGJlaGF2aW9yLFxuICogd2hlcmUgdGhlIHNwZWNpZmljIHN1cGVyY2xhc3Mgd2lsbCBkZXBlbmQgdXBvbiB3aGljaCBtaXhpbnMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAqIHRvIGEgZ2l2ZW4gcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIEUuZy46XG4gKiAgIGNsYXNzIE1peGluIHtcbiAqICAgICBmb28oKSB7XG4gKiAgICAgICBpZiAodGhpcy5wcm90b3lwZXMuTWl4aW4uc3VwZXIuZm9vKSB7XG4gKiAgICAgICAgIHRoaXMucHJvdG90eXBlcy5NaXhpbi5zdXBlci5mb28uY2FsbCh0aGlzKTsgLy8gSW52b2tlIHN1cGVyY2xhc3MnIGZvbygpXG4gKiAgICAgICB9XG4gKiAgICAgICAvLyBEbyBNaXhpbi1zcGVjaWZpYyB3b3JrIGhlcmUuLi5cbiAqICAgICB9XG4gKiAgIH1cbiAqXG4gKiBGb3IgY29uc2lzdGVuY3ksIENvbXBvc2FibGUgaXRzZWxmIHJlY29yZHMgaXRzIG93biBzdXBlcmNsYXNzIGFzIE9iamVjdC5cbiAqL1xuQ29tcG9zYWJsZS5wcm90b3R5cGUuc3VwZXIgPSBPYmplY3QucHJvdG90eXBlO1xuXG5cbi8vIENvbXBvc2l0aW9uIHJ1bGVzIGZvciBzdGFuZGFyZCBvYmplY3QgbWVtYmVycy5cbkNvbXBvc2FibGUucHJvdG90eXBlLmNvbXBvc2l0aW9uUnVsZXMgPSB7XG4gICdfX21ldGhvZF9fJzogQ29tcG9zYWJsZS5ydWxlcy5iYXNlTWV0aG9kRmlyc3QsXG4gICdfX3Byb3BlcnR5X18nOiBDb21wb3NhYmxlLnJ1bGVzLmJhc2VTZXR0ZXJGaXJzdCxcbiAgJ2NvbXBvc2l0aW9uUnVsZXMnOiBDb21wb3NhYmxlLnJ1bGVzLmNoYWluUHJvdG90eXBlcyxcbiAgJ3Byb3RvdHlwZXMnOiBDb21wb3NhYmxlLnJ1bGVzLmNoYWluUHJvdG90eXBlc1xufTtcblxuXG4vLyBQcm9wZXJ0aWVzIGRlZmluZWQgYnkgRnVuY3Rpb24gdGhhdCB3ZSBkb24ndCB3YW50IHRvIG1peGluLlxuLy8gV2UnZCBwcmVmZXIgdG8gZ2V0IHRoZXNlIGJ5IGludGVycm9nYXRpbmcgRnVuY3Rpb24gaXRzZWxmLCBidXQgV2ViS2l0XG4vLyBmdW5jdGlvbnMgaGF2ZSBzb21lIHByb3BlcnRpZXMgKGFyZ3VtZW50cyBhbmQgY2FsbGVyKSB3aGljaCBhcmUgbm90IHJldHVybmVkXG4vLyBieSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhGdW5jdGlvbikuXG5jb25zdCBOT05fTUlYQUJMRV9GVU5DVElPTl9QUk9QRVJUSUVTID0gW1xuICAnYXJndW1lbnRzJyxcbiAgJ2NhbGxlcicsXG4gICdsZW5ndGgnLFxuICAnbmFtZScsXG4gICdwcm90b3R5cGUnXG5dO1xuXG4vLyBQcm9wZXJ0aWVzIGRlZmluZWQgYnkgT2JqZWN0IHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBtaXhpbi5cbmNvbnN0IE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTID0gW1xuICAnY29uc3RydWN0b3InXG5dO1xuXG5jb25zdCBPUklHSU5BTF9NSVhJTl9TWU1CT0wgPSBTeW1ib2woJ09yaWdpbmFsIG1peGluJyk7XG5cblxuLypcbiAqIEFwcGx5IHRoZSBjb21wb3NpdGlvbiBydWxlcyBpbiBlZmZlY3QgZm9yIHRoZSBnaXZlbiBvYmplY3QsIHdoaWNoIGxpZXMgYXRcbiAqIHRoZSB0aXAgb2YgYSBwcm90b3R5cGUgY2hhaW4uIFRoaXMgbG9va3MgZm9yIGNvbmZsaWN0cyBiZXR3ZWVuIHRoZSBvYmplY3Qnc1xuICogb3duIHByb3BlcnRpZXMgKGFuZCBtZXRob2RzKSwgYW5kIGlkZW50aWNhbGx5LW5hbWVkIHByb3BlcnRpZXMgKG1ldGhvZHMpXG4gKiBmdXJ0aGVyIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uIENvbmZsaWN0cyBhcmUgcmVzb2x2ZWQgd2l0aCBydWxlcyBkZWZpbmVkIGJ5XG4gKiB0aGUgYWZmZWN0IG1lbWJlcnMuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5Q29tcG9zaXRpb25SdWxlcyhvYmopIHtcbiAgbGV0IG93bkNvbXBvc2l0aW9uUnVsZXMgPSBvYmouaGFzT3duUHJvcGVydHkoJ19jb21wb3NpdGlvblJ1bGVzJykgP1xuICAgIG9iai5fY29tcG9zaXRpb25SdWxlcyA6XG4gICAge307XG4gIGxldCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzID0gb2JqLmNvbXBvc2l0aW9uUnVsZXM7XG4gIGxldCBkZWZhdWx0Q29tcG9zaXRpb25SdWxlcyA9IENvbXBvc2FibGUucHJvdG90eXBlLmNvbXBvc2l0aW9uUnVsZXM7XG5cbiAgLy8gRm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgc2VlIGlmIHRoZSBiYXNlIGhhcyBhIHByb3BlcnR5IHdpdGggdGhlIHNhbWUgbmFtZS5cbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGlmIChuYW1lIGluIGJhc2UgJiYgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA8IDApIHtcbiAgICAgIC8vIEJhc2UgZG9lcyBpbXBsZW1lbnQgYSBtZW1iZXIgd2l0aCB0aGUgc2FtZSBuYW1lOyBuZWVkIHRvIGNvbWJpbmUuXG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgICAgIGxldCBrZXkgPSBnZXRHZW5lcmFsRGVzY3JpcHRvcktleShkZXNjcmlwdG9yKTtcblxuICAgICAgLy8gU2VlIGlmIHRoaXMgcHJvcGVydHkgaGFzIGEgcnVsZSBhc3NvY2lhdGVkIHdpdGggaXQsIGNoZWNraW5nOlxuICAgICAgbGV0IHJ1bGUgPSBvd25Db21wb3NpdGlvblJ1bGVzW25hbWVdICAgIC8vIG9iamVjdCBpdHNlbGZcbiAgICAgICAgICB8fCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzW25hbWVdICAvLyBpbmhlcml0ZWQgcnVsZXMgZm9yIG5hbWVcbiAgICAgICAgICB8fCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzW2tleV0gICAvLyBpbmhlcml0ZWQgcnVsZXMgZ2VuZXJhbGx5XG4gICAgICAgICAgfHwgZGVmYXVsdENvbXBvc2l0aW9uUnVsZXNbbmFtZV0gICAgLy8gZGVmYXVsdCBydWxlcyBmb3IgbmFtZVxuICAgICAgICAgIHx8IGRlZmF1bHRDb21wb3NpdGlvblJ1bGVzW2tleV07ICAgIC8vIGRlZmF1bHQgcnVsZXMgZ2VuZXJhbGx5XG5cbiAgICAgIC8vIFwib3ZlcnJpZGVcIiBpcyBhIGtub3duIG5vLW9wLCBzbyB3ZSBkb24ndCBib3RoZXIgdHJ5aW5nIHRvIHJlZGVmaW5lIHRoZVxuICAgICAgLy8gcHJvcGVydHkuXG4gICAgICBpZiAocnVsZSAmJiBydWxlICE9PSBDb21wb3NhYmxlLnJ1bGVzLm92ZXJyaWRlKSB7XG4gICAgICAgIHJ1bGUob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuXG4vKlxuICogQ29weSB0aGUgZ2l2ZW4gcHJvcGVydGllcy9tZXRob2RzIHRvIHRoZSB0YXJnZXQuXG4gKiBSZXR1cm4gdGhlIHVwZGF0ZWQgdGFyZ2V0LlxuICovXG5mdW5jdGlvbiBjb3B5T3duUHJvcGVydGllcyhzb3VyY2UsIHRhcmdldCwgaWdub3JlUHJvcGVydHlOYW1lcyA9IFtdKSB7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICBpZiAoaWdub3JlUHJvcGVydHlOYW1lcy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gYSBuZXcgc3ViY2xhc3Mvb2JqZWN0IHRoYXQgZXh0ZW5kcyB0aGUgZ2l2ZW4gYmFzZSBjbGFzcy9vYmplY3Qgd2l0aFxuICogdGhlIG1lbWJlcnMgb2YgdGhlIGluZGljYXRlZCBtaXhpbi5cbiAqL1xuZnVuY3Rpb24gY29tcG9zZShiYXNlLCBtaXhpbikge1xuXG4gIC8vIFNlZSBpZiB0aGUgKm1peGluKiBoYXMgYSBiYXNlIGNsYXNzL3Byb3RvdHlwZSBvZiBpdHMgb3duLlxuICBsZXQgbWl4aW5Jc0NsYXNzID0gaXNDbGFzcyhtaXhpbik7XG4gIGxldCBtaXhpbkJhc2UgPSBtaXhpbklzQ2xhc3MgP1xuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihtaXhpbi5wcm90b3R5cGUpLmNvbnN0cnVjdG9yIDpcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWl4aW4pO1xuICBpZiAobWl4aW5CYXNlICYmXG4gICAgICBtaXhpbkJhc2UgIT09IEZ1bmN0aW9uICYmXG4gICAgICBtaXhpbkJhc2UgIT09IE9iamVjdCAmJlxuICAgICAgbWl4aW5CYXNlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgLy8gVGhlIG1peGluIGl0c2VsZiBkZXJpdmVzIGZyb20gYW5vdGhlciBjbGFzcy9vYmplY3QuXG4gICAgLy8gUmVjdXJzZSwgYW5kIGV4dGVuZCB3aXRoIHRoZSBtaXhpbidzIGJhc2UgZmlyc3QuXG4gICAgYmFzZSA9IGNvbXBvc2UoYmFzZSwgbWl4aW5CYXNlKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgZXh0ZW5kZWQgb2JqZWN0IHdlJ3JlIGdvaW5nIHRvIHJldHVybiBhcyBhIHJlc3VsdC5cbiAgbGV0IGJhc2VJc0NsYXNzID0gaXNDbGFzcyhiYXNlKTtcbiAgbGV0IHJlc3VsdCA9IGJhc2VJc0NsYXNzID9cbiAgICBjcmVhdGVTdWJjbGFzcyhiYXNlKSA6XG4gICAgT2JqZWN0LmNyZWF0ZShiYXNlKTtcblxuICAvLyBDaGVjayB0byBtYWtlIHN1cmUgd2UncmUgbm90IGV4dGVuZGluZyB0aGUgYmFzZSB3aXRoIGEgcHJvdG90eXBlIHRoYXQgd2FzXG4gIC8vIGFscmVhZHkgY29tcG9zZWQgaW50byB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluLlxuICBsZXQgYmFzZVByb3RvdHlwZSA9IGJhc2VJc0NsYXNzID8gYmFzZS5wcm90b3R5cGUgOiBiYXNlO1xuICBsZXQgbWl4aW5Qcm90b3R5cGUgPSBtaXhpbklzQ2xhc3MgPyBtaXhpbi5wcm90b3R5cGUgOiBtaXhpbjtcbiAgaWYgKG9iamVjdEhhc1Byb3RvdHlwZShiYXNlUHJvdG90eXBlLCBtaXhpblByb3RvdHlwZSlcbiAgICAgIHx8IG9iamVjdEhhc01peGluKGJhc2VQcm90b3R5cGUsIG1peGluKSkge1xuICAgIC8vIFNraXAgdGhpcyBtaXhpbiwgcmV0dXJuIHJlc3VsdCBhcyBpcy5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gVGhlIFwidGFyZ2V0XCIgaGVyZSBpcyB0aGUgdGFyZ2V0IG9mIG91ciBwcm9wZXJ0eS9tZXRob2QgY29tcG9zaXRpb24gcnVsZXMuXG4gIGxldCB0YXJnZXQ7XG4gIGlmIChiYXNlSXNDbGFzcyAmJiBtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgY2xhc3Mgd2l0aCBjbGFzczogY29weSBzdGF0aWMgbWVtYmVycywgdGhlbiBwcm90b3R5cGUgbWVtYmVycy5cbiAgICBjb3B5T3duUHJvcGVydGllcyhtaXhpbiwgcmVzdWx0LCBOT05fTUlYQUJMRV9GVU5DVElPTl9QUk9QRVJUSUVTKTtcbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbi5wcm90b3R5cGUsIHJlc3VsdC5wcm90b3R5cGUsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIGlmICghYmFzZUlzQ2xhc3MgJiYgbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIHBsYWluIG9iamVjdCB3aXRoIGNsYXNzOiBjb3B5IHByb3RvdHlwZSBtZXRob2RzIHRvIHJlc3VsdC5cbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbi5wcm90b3R5cGUsIHJlc3VsdCwgTk9OX01JWEFCTEVfRlVOQ1RJT05fUFJPUEVSVElFUyk7XG4gIH0gZWxzZSBpZiAoYmFzZUlzQ2xhc3MgJiYgIW1peGluSXNDbGFzcykge1xuICAgIC8vIEV4dGVuZGluZyBjbGFzcyB3aXRoIHBsYWluIG9iamVjdDogY29weSBtaXhpbiB0byByZXN1bHQgcHJvdG90eXBlLlxuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCByZXN1bHQucHJvdG90eXBlLCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRXh0ZW5kaW5nIHBsYWluIG9iamVjdCB3aXRoIHBsYWluIG9iamVjdDogY29weSBmb3JtZXIgdG8gbGF0dGVyLlxuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCByZXN1bHQsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgfVxuXG4gIGlmIChtaXhpbi5uYW1lKSB7XG4gICAgLy8gVXNlIHRoZSBtaXhpbidzIG5hbWUgKHVzdWFsbHkgdGhlIG5hbWUgb2YgYSBjbGFzcycgY29uc3RydWN0b3IpIHRvXG4gICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSBiYWNrIHRvIHRoZSB0aXAgb2YgdGhlIG5ld2x5LWV4dGVuZGVkIHByb3RvdHlwZSBjaGFpbi5cbiAgICAvLyBTZWUgbm90ZXMgYXQgQ29tcG9zYWJsZSdzIFwicHJvdG90eXBlc1wiIHByb3BlcnR5LlxuICAgIHRhcmdldC5wcm90b3R5cGVzID0ge307XG4gICAgdGFyZ2V0LnByb3RvdHlwZXNbbWl4aW4ubmFtZV0gPSB0YXJnZXQ7XG5cbiAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBzdXBlcmNsYXNzL3N1cGVyLW9iamVjdC4gU2VlIHRoZSBjb21tZW50cyBvblxuICAgIC8vIENvbXBvc2FibGUncyBcInN1cGVyXCIgcHJvcGVydHkuXG4gICAgdGFyZ2V0LnN1cGVyID0gYmFzZUlzQ2xhc3MgPyBiYXNlLnByb3RvdHlwZSA6IGJhc2U7XG4gIH1cblxuICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBtaXhpbiB0aGF0IHdhcyBjb21wb3NlZCBpbiBhdCB0aGlzIHBvaW50LlxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBPUklHSU5BTF9NSVhJTl9TWU1CT0wsIHtcbiAgICB2YWx1ZTogbWl4aW5cbiAgfSk7XG5cbiAgLy8gQXBwbHkgdGhlIGNvbXBvc2l0aW9uIHJ1bGVzIGluIGVmZmVjdCBhdCB0aGUgdGFyZ2V0LlxuICBhcHBseUNvbXBvc2l0aW9uUnVsZXModGFyZ2V0KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gYSBuZXcgc3ViY2xhc3Mgb2YgdGhlIGdpdmVuIGJhc2UgY2xhc3MuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN1YmNsYXNzKGJhc2UpIHtcbiAgLy8gT25jZSBXZWJLaXQgc3VwcG9ydHMgSFRNTEVsZW1lbnQgYXMgYSByZWFsIGNsYXNzLCB3ZSBjYW4ganVzdCBzYXk6XG4gIC8vXG4gIC8vICAgY2xhc3Mgc3ViY2xhc3MgZXh0ZW5kcyBiYXNlIHt9XG4gIC8vXG4gIC8vIEhvd2V2ZXIsIHVudGlsIHRoYXQncyByZXNvbHZlZCwgd2UganVzdCBjb25zdHJ1Y3QgdGhlIGNsYXNzIG91cnNlbHZlcy5cbiAgZnVuY3Rpb24gc3ViY2xhc3MoKSB7fTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLCBiYXNlKTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLnByb3RvdHlwZSwgYmFzZS5wcm90b3R5cGUpO1xuICByZXR1cm4gc3ViY2xhc3M7XG59XG5cblxuLypcbiAqIEV4YW1pbmUgdGhlIGRlc2NyaXB0b3IgdG8gZGV0ZXJtaW5lIHdoaWNoIHJ1bGUga2V5IGFwcGxpZXMuXG4gKi9cbmZ1bmN0aW9uIGdldEdlbmVyYWxEZXNjcmlwdG9yS2V5KGRlc2NyaXB0b3IpIHtcbiAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gTWV0aG9kXG4gICAgcmV0dXJuICdfX21ldGhvZF9fJztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbidcbiAgICAgIHx8IHR5cGVvZiBkZXNjcmlwdG9yLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFByb3BlcnR5IHdpdGggZ2V0dGVyIGFuZC9vciBzZXR0ZXJcbiAgICByZXR1cm4gJ19fcHJvcGVydHlfXyc7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuLypcbiAqIFJldHVybiB0cnVlIGlmIGMgaXMgYSBKYXZhU2NyaXB0IGNsYXNzLlxuICpcbiAqIFdlIHVzZSB0aGlzIHRlc3QgYmVjYXVzZSwgb24gV2ViS2l0LCBjbGFzc2VzIGxpa2UgSFRNTEVsZW1lbnQgYXJlIHNwZWNpYWwsXG4gKiBhbmQgYXJlIG5vdCBpbnN0YW5jZXMgb2YgRnVuY3Rpb24uIFRvIGhhbmRsZSB0aGF0IGNhc2UsIHdlIHVzZSBhIGxvb3NlclxuICogZGVmaW5pdGlvbjogYW4gb2JqZWN0IGlzIGEgY2xhc3MgaWYgaXQgaGFzIGEgcHJvdG90eXBlLCBhbmQgdGhhdCBwcm90b3R5cGVcbiAqIGhhcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgdGhlIG9yaWdpbmFsIG9iamVjdC4gVGhpcyBjb25kaXRpb24gaG9sZHMgdHJ1ZSBldmVuXG4gKiBmb3IgSFRNTEVsZW1lbnQgb24gV2ViS2l0LlxuICovXG5mdW5jdGlvbiBpc0NsYXNzKGMpIHtcbiAgcmV0dXJuIHR5cGVvZiBjID09PSAnZnVuY3Rpb24nIHx8ICAgICAgICAgICAgICAgICAgIC8vIFN0YW5kYXJkXG4gICAgICAoYy5wcm90b3R5cGUgJiYgYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPT09IGMpOyAvLyBIVE1MRWxlbWVudCBpbiBXZWJLaXRcbn1cblxuXG4vKlxuICogUmV0dXJuIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBlaXRoZXIgaGFzIHRoZSBnaXZlbiBwcm90b3R5cGUgb24gaXRzXG4gKiBjaGFpbi5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0SGFzUHJvdG90eXBlKG9iaiwgcHJvdG90eXBlKSB7XG4gIGlmIChwcm90b3R5cGUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgIC8vIFRoZSBwcm90b3R5cGUgaXMgYSBwbGFpbiBvYmplY3QuXG4gICAgLy8gT25seSBjYXNlIHRvIGRlZmVuZCBhZ2FpbnN0IGlzIHNvbWVvbmUgdHJ5aW5nIHRvIG1peGluIE9iamVjdCBpdHNlbGYuXG4gICAgcmV0dXJuIChwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUpO1xuICB9XG4gIGlmIChvYmogPT09IHByb3RvdHlwZSB8fCBvYmogaW5zdGFuY2VvZiBwcm90b3R5cGUuY29uc3RydWN0b3IpIHtcbiAgICAvLyBUaGUgcHJvdG90eXBlIHdhcyBmb3VuZCBhbG9uZyB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKlxuICogUmV0dXJuIHRydWUgaWYgdGhlIGdpdmVuIG1peGluIHdhcyB1c2VkIHRvIGNyZWF0ZSBhbnkgb2YgdGhlIHByb3RvdHlwZXMgb25cbiAqIG9uIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4uXG4gKi9cbmZ1bmN0aW9uIG9iamVjdEhhc01peGluKG9iaiwgbWl4aW4pIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgT1JJR0lOQUxfTUlYSU5fU1lNQk9MKTtcbiAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZSA9PT0gbWl4aW4pIHtcbiAgICAvLyBUaGUgZ2l2ZW4gbWl4aW4gd2FzLCBpbiBmYWN0LCBjb21wb3NlZCBpbnRvIHRoaXMgcHJvdG90eXBlIGNoYWluLlxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvYmplY3RIYXNNaXhpbihPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSwgbWl4aW4pO1xufVxuIiwiLyoqXG4gKiBTdGFuZGFyZCBjb21wb3NpdGlvbiBydWxlc1xuICovXG5cbi8qXG4gKiBUYWtlIHR3byBmdW5jdGlvbnMgYW5kIHJldHVybiBhIG5ldyBjb21wb3NlZCBmdW5jdGlvbiB0aGF0IGludm9rZXMgYm90aC5cbiAqIFRoZSBjb21wb3NlZCBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBzZWNvbmQgZnVuY3Rpb24uXG4gKiBUaGlzIGlzIG5vdCBhIHJ1bGUsIGJ1dCBhIGhlbHBlciB1c2VkIGJ5IHJ1bGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUZ1bmN0aW9uKGZ1bmN0aW9uMSwgZnVuY3Rpb24yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cblxuLypcbiAqIENvbWJpbmF0b3IgdGhhdCBzZXRzIHRoZSBwcm90b3R5cGUgb2YgYSBtaXhpbiBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgdmFsdWUgb24gdGhlIGJhc2UuIFRoaXMgZWZmZWN0aXZlbHkgZG9lcyBhIHNoYWxsb3cgbWVyZ2Ugb2ZcbiAqIG9mIHRoZSBwcm9wZXJ0aWVzLCB3aXRob3V0IGNvcHlpbmcgYW55IGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hhaW5Qcm90b3R5cGVzKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpblZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIGtleSk7XG4gIGxldCBiYXNlVmFsdWUgPSBiYXNlRGVzY3JpcHRvci52YWx1ZTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG1peGluVmFsdWUsIGJhc2VWYWx1ZSk7XG59XG5cblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjb21wbGV0ZSBhIHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGEgbWl4aW4uXG4gKlxuICogRGVmYXVsdCBKYXZhU2NyaXB0IGJlaGF2aW9yIGlzIHRoYXQgYSBzdWJjbGFzcyB0aGF0IGRlZmluZXMgYSBnZXR0ZXIgYnV0IG5vdFxuICogYSBzZXR0ZXIgd2lsbCBuZXZlciBoYXZlIHRoZSBiYXNlIGNsYXNzJyBzZXR0ZXIgaW52b2tlZC4gU2ltaWxhcmx5LCBhXG4gKiBzdWJjbGFzcyB0aGF0IGRlZmluZXMgYSBzZXR0ZXIgYnV0IG5vdCBhIGdldHRlciB3aWxsIG5ldmVyIGhhdmUgdGhlIGJhc2VcbiAqIGNsYXNzJyBnZXR0ZXIgaW52b2tlZC5cbiAqXG4gKiBGb3IgbWl4aW5zLCB3ZSB3YW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHRvIGJlIHRoYXQsIGlmIGEgbWl4aW4gb25seSBkZWZpbmVzXG4gKiBhIGdldHRlciwgYnV0IHRoZSBiYXNlIGNsYXNzIGRlZmluZXMgYSBzZXR0ZXIsIHdlIHdhbnQgdGhlIG1peGluIHRvIGFjcXVpcmVcbiAqIGEgZGVmYXVsdCBzZXR0ZXIgdGhhbiBpbnZva2VzIHRoZSBiYXNlIHNldHRlci4gTGlrZXdpc2UsIHdlIHdhbnQgdG8gZGVmaW5lXG4gKiBhIGRlZmF1bHQgZ2V0dGVyIGlmIG5vbmUgaXMgc3VwcGxpZWQuXG4gKlxuICogVG8gY2FycnkgdGhhdCBvdXQsIHRoaXMgaGVscGVyIGZ1bmN0aW9uIHJvdW5kcyBvdXQgYSBwcm9wZXJ0eSBkZWZpbml0aW9uIHRvXG4gKiBlbnN1cmUgaXQgaGFzIGEgZGVmYXVsdCBnZXR0ZXIgb3Igc2V0dGVyIGlmIGl0IG5lZWRzIG9uZS5cbiAqL1xuZnVuY3Rpb24gY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpIHtcbiAgaWYgKGRlc2NyaXB0b3IuZ2V0ICYmICFkZXNjcmlwdG9yLnNldCAmJiBiYXNlRGVzY3JpcHRvci5zZXQpIHtcbiAgICAvLyBNaXhpbiBoYXMgZ2V0dGVyIGJ1dCBuZWVkcyBhIGRlZmF1bHQgc2V0dGVyLlxuICAgIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICAgIGRlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGJhc2VTZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgfTtcbiAgfVxuICBpZiAoZGVzY3JpcHRvci5zZXQgJiYgIWRlc2NyaXB0b3IuZ2V0ICYmIGJhc2VEZXNjcmlwdG9yLmdldCkge1xuICAgIC8vIE1peGluIGhhcyBzZXR0ZXIgYnV0IG5lZWRzIGEgZGVmYXVsdCBnZXR0ZXIuXG4gICAgbGV0IGJhc2VHZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5nZXQ7XG4gICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBiYXNlR2V0dGVyLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgfVxufVxuXG5cbi8qXG4gKiBQZXJmb3JtIGEgZGVlcCBtZXJnZSBvZiBhIG1peGluIHByb3BlcnR5IG9uIHRvcCBvZiBhIGJhc2UgcHJvcGVydHkuXG4gKi9cbi8vIGV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2UodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbi8vICAgbGV0IG1peGluVmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuLy8gICBsZXQgYmFzZVZhbHVlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClba2V5XS52YWx1ZTtcbi8vICAgZGVzY3JpcHRvci52YWx1ZSA9ICdtZXJnZWQnOyAvLyBtZXJnZShiYXNlVmFsdWUsIG1peGluVmFsdWUpO1xuLy8gfVxuXG4vKlxuICogSGVscGVyIHRvIHJldHVybiB0aGUgYmFzZSBkZXNjcmlwdG9yIGZvciB0aGUgaW5kaWNhdGVkIGtleS4gVGhpcyBpcyB1c2VkIHRvXG4gKiBmaW5kIHRoZSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiB0aGF0IHdvdWxkIG90aGVyd2lzZSBiZSBvdmVycmlkZGVuIGJ5IHRoZVxuICogbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSkge1xuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICByZXR1cm4gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIGtleSk7XG59XG5cblxuLypcbiAqIExpa2UgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpLCBidXQgd2Fsa3MgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAqIFRoaXMgaXMgbmVlZGVkIGJ5IGNvbXBvc2l0aW9uIHJ1bGVzLCB3aGljaCB1c3VhbGx5IHN0YXJ0IG91dCBieSBnZXR0aW5nXG4gKiB0aGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBhIG1lbWJlciB0aGV5J3JlIGNvbXBvc2luZy5cbiAqIFRoaXMgaXMgbm90IGEgcnVsZSwgYnV0IGEgaGVscGVyIHVzZWQgYnkgcnVsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKSB7XG4gIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xuICBpZiAoZGVzY3JpcHRvcikge1xuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9IGVsc2Uge1xuICAgIGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAvLyBDaGVja2luZyBmb3IgXCJuYW1lIGluIHByb3RvdHlwZVwiIGxldHMgdXMga25vdyB3aGV0aGVyIHdlIHNob3VsZCBib3RoZXJcbiAgICAvLyB3YWxraW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgaWYgKHByb3RvdHlwZSAmJiBuYW1lIGluIHByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuIGdldFByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIG5hbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkOyAvLyBOb3QgZm91bmRcbn1cblxuXG4vKlxuICogQ29tYmluYXRvciB0aGF0IGNhdXNlcyBhIG1peGluIG1ldGhvZCB0byBvdmVycmlkZSBpdHMgYmFzZSBpbXBsZW1lbnRhdGlvbi5cbiAqIFNpbmNlIHRoaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIHByb3RvdHlwZSBjaGFpbiwgdGhpcyBpcyBhIG5vLW9wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb3ZlcnJpZGUodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHt9XG5cblxuLypcbiAqIENvbXBvc2UgbWV0aG9kcywgaW52b2tpbmcgYmFzZSBpbXBsZW1lbnRhdGlvbiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhXG4gKiB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkIGltbWVkaWF0ZWx5LiBPdGhlcndpc2UsIHRoZSBtaXhpblxuICogaW1wbGVtZW50YXRpb24ncyByZXN1bHQgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJCYXNlUmVzdWx0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYmFzZUltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgfHwgbWl4aW5JbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5cbi8qXG4gKiBMaWtlIHByZWZlckJhc2VSZXN1bHQsIGJ1dCBmb3IgZ2V0dGVyL3NldHRlcnMuIFRoZSBiYXNlIGdldHRlciBpcyBpbnZva2VkXG4gKiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhIHRydXRoeSByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgdGhlIG1peGluXG4gKiBnZXR0ZXIncyByZXN1bHQgaXMgcmV0dXJuZWQuIFNldHRlciBpcyBpbnZva2VkIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJCYXNlR2V0dGVyKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkdldHRlciA9IGRlc2NyaXB0b3IuZ2V0O1xuICBsZXQgbWl4aW5TZXR0ZXIgPSBkZXNjcmlwdG9yLnNldDtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUdldHRlciA9IGJhc2VEZXNjcmlwdG9yLmdldDtcbiAgbGV0IGJhc2VTZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5zZXQ7XG4gIGlmIChtaXhpbkdldHRlciAmJiBiYXNlR2V0dGVyKSB7XG4gICAgLy8gQ29tcG9zZSBnZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmFzZUdldHRlci5hcHBseSh0aGlzKSB8fCBtaXhpbkdldHRlci5hcHBseSh0aGlzKTtcbiAgICB9O1xuICB9XG4gIGlmIChtaXhpblNldHRlciAmJiBiYXNlU2V0dGVyKSB7XG4gICAgLy8gQ29tcG9zZSBzZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gY29tcG9zZUZ1bmN0aW9uKGJhc2VTZXR0ZXIsIG1peGluU2V0dGVyKTtcbiAgfVxuICBjb21wbGV0ZVByb3BlcnR5RGVmaW5pdGlvbihkZXNjcmlwdG9yLCBiYXNlRGVzY3JpcHRvcik7XG59XG5cblxuLypcbiAqIExpa2UgcHJlZmVyTWl4aW5SZXN1bHQsIGJ1dCBmb3IgZ2V0dGVyL3NldHRlcnMuIFRoZSBtaXhpbiBnZXR0ZXIgaXMgaW52b2tlZFxuICogZmlyc3QuIElmIGl0IHJldHVybnMgYSB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIHRoZSBiYXNlXG4gKiBnZXR0ZXIncyByZXN1bHQgaXMgcmV0dXJuZWQuIFNldHRlciBpcyBzdGlsbCBpbnZva2VkIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJNaXhpbkdldHRlcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5HZXR0ZXIgPSBkZXNjcmlwdG9yLmdldDtcbiAgbGV0IG1peGluU2V0dGVyID0gZGVzY3JpcHRvci5zZXQ7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VHZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5nZXQ7XG4gIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICBpZiAobWl4aW5HZXR0ZXIgJiYgYmFzZUdldHRlcikge1xuICAgIC8vIENvbXBvc2UgZ2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1peGluR2V0dGVyLmFwcGx5KHRoaXMpIHx8IGJhc2VHZXR0ZXIuYXBwbHkodGhpcyk7XG4gICAgfTtcbiAgfVxuICBpZiAobWl4aW5TZXR0ZXIgJiYgYmFzZVNldHRlcikge1xuICAgIC8vIENvbXBvc2Ugc2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLnNldCA9IGNvbXBvc2VGdW5jdGlvbihiYXNlU2V0dGVyLCBtaXhpblNldHRlcik7XG4gIH1cbiAgY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpO1xufVxuXG5cbi8qXG4gKiBDb21wb3NlIG1ldGhvZHMsIGludm9raW5nIG1peGluIGltcGxlbWVudGF0aW9uIGZpcnN0LiBJZiBpdCByZXR1cm5zIGEgdHJ1dGh5XG4gKiByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQgaW1tZWRpYXRlbHkuIE90aGVyd2lzZSwgdGhlIGJhc2UgaW1wbGVtZW50YXRpb24nc1xuICogcmVzdWx0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyTWl4aW5SZXN1bHQodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlSW1wbGVtZW50YXRpb24gPSBiYXNlRGVzY3JpcHRvci52YWx1ZTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtaXhpbkltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgfHwgYmFzZUltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuXG4vKlxuICogRGVmYXVsdCBydWxlIGZvciBjb21wb3NpbmcgbWV0aG9kczogaW52b2tlIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYXNlTWV0aG9kRmlyc3QodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlSW1wbGVtZW50YXRpb24gPSBiYXNlRGVzY3JpcHRvci52YWx1ZTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGNvbXBvc2VGdW5jdGlvbihiYXNlSW1wbGVtZW50YXRpb24sIG1peGluSW1wbGVtZW50YXRpb24pO1xufVxuXG5cbi8qXG4gKiBEZWZhdWx0IHJ1bGUgZm9yIGNvbXBvc2luZyBwcm9wZXJ0aWVzLlxuICogV2Ugb25seSBjb21wb3NlIHNldHRlcnMsIHdoaWNoIGludm9rZSBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICogQSBkZWZpbmVkIG1peGluIGdldHRlciBvdmVycmlkZXMgYSBiYXNlIGdldHRlci5cbiAqIE5vdGUgdGhhdCwgYmVjYXVzZSBvZiB0aGUgd2F5IHByb3BlcnR5IGRlc2NyaXB0b3JzIHdvcmssIGlmIHRoZSBtaXhpbiBvbmx5XG4gKiBkZWZpbmVzIGEgc2V0dGVyLCBidXQgbm90IGEgZ2V0dGVyLCB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgZ2V0dGVyIHRoYXRcbiAqIGludm9rZXMgdGhlIGJhc2UgZ2V0dGVyLiBTaW1pbGFybHksIGlmIHRoZSBtaXhpbiBqdXN0IGRlZmluZXMgYSBnZXR0ZXIsXG4gKiB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgc2V0dGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZVNldHRlckZpcnN0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpblNldHRlciA9IGRlc2NyaXB0b3Iuc2V0O1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICBpZiAobWl4aW5TZXR0ZXIgJiYgYmFzZVNldHRlcikge1xuICAgIC8vIENvbXBvc2Ugc2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLnNldCA9IGNvbXBvc2VGdW5jdGlvbihiYXNlU2V0dGVyLCBtaXhpblNldHRlcik7XG4gIH1cbiAgY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpO1xufVxuIiwiLypcbiAqIE1hcnNoYWxsIGF0dHJpYnV0ZXMgdG8gcHJvcGVydGllcyAoYW5kIGV2ZW50dWFsbHkgdmljZSB2ZXJzYSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0cmlidXRlTWFyc2hhbGxpbmcge1xuXG4gIC8qXG4gICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgYXR0cmlidXRlIHdpdGggdGhlIGdpdmVuIG5hbWUuXG4gICAqL1xuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgLy8gSWYgdGhlIGF0dHJpYnV0ZSBuYW1lIGNvcnJlc3BvbmRzIHRvIGEgcHJvcGVydHkgbmFtZSwgdGhlbiBzZXQgdGhhdFxuICAgIC8vIHByb3BlcnR5LiBJZ25vcmUgY2hhbmdlcyBpbiBzdGFuZGFyZCBIVE1MRWxlbWVudCBwcm9wZXJ0aWVzLlxuICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVUb1Byb3BlcnR5TmFtZShuYW1lKTtcbiAgICBpZiAocHJvcGVydHlOYW1lIGluIHRoaXMgJiYgIShwcm9wZXJ0eU5hbWUgaW4gSFRNTEVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmF0dHJpYnV0ZXMsIGF0dHJpYnV0ZSA9PiB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGUubmFtZSwgdW5kZWZpbmVkLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuXG4vLyBDb252ZXJ0IGNhbWVsIGNhc2UgZm9vQmFyIG5hbWUgdG8gaHlwaGVuYXRlZCBmb28tYmFyLlxuZnVuY3Rpb24gYXR0cmlidXRlVG9Qcm9wZXJ0eU5hbWUoYXR0cmlidXRlTmFtZSkge1xuICBsZXQgcHJvcGVydHlOYW1lID0gYXR0cmlidXRlTmFtZS5yZXBsYWNlKC8tKFthLXpdKS9nLCBtID0+IG1bMV0udG9VcHBlckNhc2UoKSk7XG4gIHJldHVybiBwcm9wZXJ0eU5hbWU7XG59XG5cbi8vIENvbnZlcnQgaHlwaGVuYXRlZCBmb28tYmFyIG5hbWUgdG8gY2FtZWwgY2FzZSBmb29CYXIuXG5mdW5jdGlvbiBwcm9wZXJ0eVRvQXR0cmlidXRlTmFtZShwcm9wZXJ0eU5hbWUpIHtcbiAgbGV0IGF0dHJpYnV0ZU5hbWUgPSBwcm9wZXJ0eU5hbWUucmVwbGFjZSgvKFthLXpdW0EtWl0pL2csIGcgPT4gZ1swXSArICctJyArIGdbMV0udG9Mb3dlckNhc2UoKSk7XG4gIHJldHVybiBhdHRyaWJ1dGVOYW1lO1xufVxuIiwiLypcbiAqIFBvbHltZXItc3R5bGUgYXV0b21hdGljIG5vZGUgZmluZGluZy5cbiAqIFNlZSBodHRwczovL3d3dy5wb2x5bWVyLXByb2plY3Qub3JnLzEuMC9kb2NzL2Rldmd1aWRlL2xvY2FsLWRvbS5odG1sI25vZGUtZmluZGluZy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvbWF0aWNOb2RlRmluZGluZyB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgIHRoaXMuJCA9IHt9O1xuICAgICAgdmFyIG5vZGVzV2l0aElkcyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRdJyk7XG4gICAgICBbXS5mb3JFYWNoLmNhbGwobm9kZXNXaXRoSWRzLCBub2RlID0+IHtcbiAgICAgICAgdmFyIGlkID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgIHRoaXMuJFtpZF0gPSBub2RlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiIsIi8qXG4gKiBBIGNvbXBvc2FibGUgSFRNTCBlbGVtZW50LlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgcHJvdmlkZWQganVzdCBhcyBhIGNvbnZlbmllbmNlLiBPbmUgY291bGQgYWxzbyBzdGFydCB3aXRoXG4gKiBIVE1MRWxlbWVudCBhdCB0aGUgdG9wIGxldmVsLCBhbmQgYWRkIGV4dGVuc2liaWxpdHkgYnkgbWl4aW5nIGluIENvbXBvc2FibGUuXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cblxuLy8gV2UgdXNlIENvbXBvc2FibGUgdG8gYWRkICppdHNlbGYqIHRvIGEgSFRNTEVsZW1lbnQgc3ViY2xhc3MuXG4vLyBUaGUgcmVzdWx0IGlzIGFuIEhUTUxFbGVtZW50IHdpdGggLmNvbXBvc2UoKSBzdXBwb3J0LlxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zYWJsZS5jb21wb3NlLmNhbGwoXG4gIEhUTUxFbGVtZW50LFxuICBDb21wb3NhYmxlXG4pO1xuIiwiLypcbiAqIEEgc2FtcGxlIGdlbmVyYWwtcHVycG9zZSBiYXNlIGNsYXNzIGZvciBkZWZpbmluZyBjdXN0b20gZWxlbWVudHMgdGhhdCBtaXhlc1xuICogaW4gc29tZSBjb21tb24gZmVhdHVyZXM6IHRlbXBsYXRlIHN0YW1waW5nIGludG8gYSBzaGFkb3cgcm9vdCwgYXV0b21hdGljIG5vZGVcbiAqIGZpbmRpbmcsIGFuZCBtYXJzaGFsbGluZyBiZXR3ZWVuIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnRpZXMuXG4gKi9cblxuXG5pbXBvcnQgQ29tcG9zYWJsZUVsZW1lbnQgZnJvbSAnLi9Db21wb3NhYmxlRWxlbWVudCc7XG5pbXBvcnQgVGVtcGxhdGVTdGFtcGluZyBmcm9tICcuL1RlbXBsYXRlU3RhbXBpbmcnO1xuaW1wb3J0IEF1dG9tYXRpY05vZGVGaW5kaW5nIGZyb20gJy4vQXV0b21hdGljTm9kZUZpbmRpbmcnO1xuaW1wb3J0IEF0dHJpYnV0ZU1hcnNoYWxsaW5nIGZyb20gJy4vQXR0cmlidXRlTWFyc2hhbGxpbmcnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRCYXNlIGV4dGVuZHMgQ29tcG9zYWJsZUVsZW1lbnQuY29tcG9zZShcbiAgVGVtcGxhdGVTdGFtcGluZywgICAgIC8vIGJlZm9yZSBub2RlIGZpbmRpbmcsIHNvIHNoYWRvdyByb290IGlzIHBvcHVsYXRlZFxuICBBdXRvbWF0aWNOb2RlRmluZGluZywgLy8gYmVmb3JlIG1hcnNoYWxsaW5nLCBzbyBtYXJzaGFsbGVkIHByb3BlcnRpZXMgY2FuIHVzZSBpdFxuICBBdHRyaWJ1dGVNYXJzaGFsbGluZ1xuKSB7XG5cbiAgLypcbiAgICogRGVidWdnaW5nIHV0aWxpdHk6IGxvZ3MgYSBtZXNzYWdlLCBwcmVmaXhlZCBieSB0aGUgY29tcG9uZW50J3MgdGFnLlxuICAgKi9cbiAgbG9nKHRleHQpIHtcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmxvY2FsTmFtZX06ICR7dGV4dH1gKTtcbiAgfVxuXG59XG4iLCIvKlxuICogRWxlbWVudCBleHRlbnNpb24gZm9yIHRlbXBsYXRlIHN0YW1waW5nLiBJZiBhIGNvbXBvbmVudCBkZWZpbmVzIGEgdGVtcGxhdGVcbiAqIHByb3BlcnR5IChhcyBhIHN0cmluZyBvciByZWZlcmVuY2luZyBhIEhUTUwgdGVtcGxhdGUpLCB3aGVuIHRoZSBjb21wb25lbnRcbiAqIGNsYXNzIGlzIGluc3RhbnRpYXRlZCwgYSBzaGFkb3cgcm9vdCB3aWxsIGJlIGNyZWF0ZWQgb24gdGhlIGluc3RhbmNlLCBhbmRcbiAqIHRoZSBjb250ZW50cyBvZiB0aGUgdGVtcGxhdGUgd2lsbCBiZSBjbG9uZWQgaW50byB0aGUgc2hhZG93IHJvb3QuXG4gKlxuICogRm9yIHRoZSB0aW1lIGJlaW5nLCB0aGlzIGV4dGVuc2lvbiByZXRhaW5zIHN1cHBvcnQgZm9yIFNoYWRvdyBET00gdjAuXG4gKiBUaGF0IHdpbGwgZXZlbnR1YWxseSBiZSBkZXByZWNhdGVkIGFzIGJyb3dzZXJzIGltcGxlbWVudCBTaGFkb3cgRE9NIHYxLlxuICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGVTdGFtcGluZyB7XG5cbiAgLypcbiAgICogSWYgdGhlIGNvbXBvbmVudCBkZWZpbmVzIGEgdGVtcGxhdGUsIGEgc2hhZG93IHJvb3Qgd2lsbCBiZSBjcmVhdGVkIG9uIHRoZVxuICAgKiBjb21wb25lbnQgaW5zdGFuY2UsIGFuZCB0aGUgdGVtcGxhdGUgc3RhbXBlZCBpbnRvIGl0LlxuICAgKi9cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gICAgLy8gVE9ETzogU2F2ZSB0aGUgcHJvY2Vzc2VkIHRlbXBsYXRlIHdpdGggdGhlIGNvbXBvbmVudCdzIGNsYXNzIHByb3RvdHlwZVxuICAgIC8vIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBwcm9jZXNzZWQgd2l0aCBldmVyeSBpbnN0YW50aWF0aW9uLlxuICAgIGlmICh0ZW1wbGF0ZSkge1xuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBVcGdyYWRlIHBsYWluIHN0cmluZyB0byByZWFsIHRlbXBsYXRlLlxuICAgICAgICB0ZW1wbGF0ZSA9IGNyZWF0ZVRlbXBsYXRlV2l0aElubmVySFRNTCh0ZW1wbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChVU0lOR19TSEFET1dfRE9NX1YwKSB7XG4gICAgICAgIHBvbHlmaWxsU2xvdFdpdGhDb250ZW50KHRlbXBsYXRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5TaGFkb3dET01Qb2x5ZmlsbCkge1xuICAgICAgICBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRoaXMubG9jYWxOYW1lKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcy5sb2coXCJjbG9uaW5nIHRlbXBsYXRlIGludG8gc2hhZG93IHJvb3RcIik7XG4gICAgICBsZXQgcm9vdCA9IFVTSU5HX1NIQURPV19ET01fVjAgP1xuICAgICAgICB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKSA6ICAgICAgICAgICAgIC8vIFNoYWRvdyBET00gdjBcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7ICAvLyBTaGFkb3cgRE9NIHYxXG4gICAgICBsZXQgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgcm9vdC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vLyBGZWF0dXJlIGRldGVjdGlvbiBmb3Igb2xkIFNoYWRvdyBET00gdjAuXG5jb25zdCBVU0lOR19TSEFET1dfRE9NX1YwID0gKHR5cGVvZiBIVE1MRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5cbi8vIENvbnZlcnQgYSBwbGFpbiBzdHJpbmcgb2YgSFRNTCBpbnRvIGEgcmVhbCB0ZW1wbGF0ZSBlbGVtZW50LlxuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVXaXRoSW5uZXJIVE1MKGlubmVySFRNTCkge1xuICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAvLyBSRVZJRVc6IElzIHRoZXJlIGFuIGVhc2llciB3YXkgdG8gZG8gdGhpcz9cbiAgLy8gV2UnZCBsaWtlIHRvIGp1c3Qgc2V0IGlubmVySFRNTCBvbiB0aGUgdGVtcGxhdGUgY29udGVudCwgYnV0IHNpbmNlIGl0J3NcbiAgLy8gYSBEb2N1bWVudEZyYWdtZW50LCB0aGF0IGRvZXNuJ3Qgd29yay5cbiAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICB3aGlsZSAoZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgIHRlbXBsYXRlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMF0pO1xuICB9XG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuLy8gUmVwbGFjZSBvY2N1cmVuY2VzIG9mIHYxIHNsb3QgZWxlbWVudHMgd2l0aCB2MCBjb250ZW50IGVsZW1lbnRzLlxuLy8gVGhpcyBkb2VzIG5vdCB5ZXQgbWFwIG5hbWVkIHNsb3RzIHRvIGNvbnRlbnQgc2VsZWN0IGNsYXVzZXMuXG5mdW5jdGlvbiBwb2x5ZmlsbFNsb3RXaXRoQ29udGVudCh0ZW1wbGF0ZSkge1xuICBbXS5mb3JFYWNoLmNhbGwodGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzbG90JyksIHNsb3RFbGVtZW50ID0+IHtcbiAgICBsZXQgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50Jyk7XG4gICAgc2xvdEVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29udGVudEVsZW1lbnQsIHNsb3RFbGVtZW50KTtcbiAgfSk7XG59XG5cbi8vIEludm9rZSBiYXNpYyBzdHlsZSBzaGltbWluZyB3aXRoIFNoYWRvd0NTUy5cbmZ1bmN0aW9uIHNoaW1UZW1wbGF0ZVN0eWxlcyh0ZW1wbGF0ZSwgdGFnKSB7XG4gIFdlYkNvbXBvbmVudHMuU2hhZG93Q1NTLnNoaW1TdHlsaW5nKHRlbXBsYXRlLmNvbnRlbnQsIHRhZyk7XG59XG4iXX0=
