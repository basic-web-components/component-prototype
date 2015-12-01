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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('element-base/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

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

    // attachedCallback() {
    //   // Apply any selection made before assimilation.
    //   if (this._prematureSelectedIndex
    //       && 'selectedIndex' in this && this.selectedIndex === -1) {
    //     this.selectedIndex = this._prematureSelectedIndex;
    //     this._prematureSelectedIndex = null;
    //   }
    // }

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

  }, {
    key: 'goLeft',
    value: function goLeft() {}
  }, {
    key: 'goRight',
    value: function goRight() {}
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

  }, {
    key: 'template',
    get: function get() {
      return '\n      <style>\n      :host {\n        display: -webkit-inline-flex;\n        display: inline-flex;\n      }\n\n      #arrowNavigationContainer {\n        display: -webkit-inline-flex;\n        display: inline-flex;\n        -webkit-flex: 1;\n        flex: 1;\n      }\n\n      .navigationButton {\n        background: transparent;\n        border: 1px solid transparent;\n        box-sizing: border-box;\n        color: rgba(0, 0, 0, 0.5);\n        margin: 0;\n        opacity: 1;\n        outline: none; /* REVIEW: Accessibility should be provided by other aspects. */\n        padding: 0;\n        transition: opacity 1s;\n        z-index: 1;\n      }\n\n      .navigationButton:hover:not(:disabled) {\n        background: rgba( 0, 0, 0, 0.5 );\n        fill: rgba( 0, 0, 0, 0.7 );\n      }\n      .navigationButton:active:not(:disabled) {\n        background: rgba( 0, 0, 0, 0.7 );\n        fill: rgba( 0, 0, 0, 0.9 );\n      }\n\n      :host(:not(.showArrows)) .navigationButton {\n        opacity: 0;\n        visibility: hidden;\n      }\n\n      .navigationButton .icon {\n        height: 48px;\n        width: 48px;\n      }\n\n      /* Overlay variant */\n      :host(.overlay) {\n        position: relative;\n      }\n      :host(.overlay) .navigationButton {\n        bottom: 0;\n        color: rgba(255, 255, 255, 0.7);\n        position: absolute;\n        top: 0;\n      }\n      :host(.overlay) #buttonLeft {\n        left: 0;\n      }\n      :host(.overlay) #buttonRight {\n        right: 0;\n      }\n\n      .navigationButton:disabled {\n        color: rgba(255, 255, 255, 0.3);\n        fill: rgba( 0, 0, 0, 0.2 );\n      }\n      </style>\n\n      <!--\n      Accessibility note: since the navigation offered by the arrow buttons should\n      be redundant (that is, there should be other ways of navigating the list),\n      we mark the button as aria-hidden so that assistive devices ignore them.\n      -->\n      <button id="buttonLeft" class="navigationButton" aria-hidden="true">\n        <img class="icon" src="ic_keyboard_arrow_left_black_24px.svg">\n      </button>\n      <div id="arrowNavigationContainer">\n        <content></content>\n      </div>\n      <button id="buttonRight" class="navigationButton" aria-hidden="true">\n        <img class="icon" src="ic_keyboard_arrow_right_black_24px.svg">\n      </button>\n    ';
    }
  }]);

  return ArrowDirection;
})();

exports.default = ArrowDirection;

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

ArrowDirection = _ElementBase2.default.compose(ArrowDirection);

document.registerElement('basic-arrow-direction', ArrowDirection);

},{"element-base/src/ElementBase":26}],2:[function(require,module,exports){
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
       * basic-list-box
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('element-base/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

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

Carousel = _ElementBase2.default.compose(_ContentItems2.default, _DirectionSelection2.default, _Generic2.default, _ItemSelection2.default, _ItemsAccessible2.default, _Keyboard2.default, _KeyboardDirection2.default, _SwipeDirection2.default, _TrackpadDirection2.default, Carousel);

document.registerElement('basic-carousel', Carousel);

},{"../../mixins/ContentItems":8,"../../mixins/DirectionSelection":9,"../../mixins/Generic":10,"../../mixins/ItemSelection":11,"../../mixins/ItemsAccessible":12,"../../mixins/Keyboard":13,"../../mixins/KeyboardDirection":14,"../../mixins/SwipeDirection":19,"../../mixins/TrackpadDirection":20,"../SlidingViewport/SlidingViewport":4,"element-base/src/ElementBase":26}],3:[function(require,module,exports){
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

var _ElementBase = require('element-base/src/ElementBase');

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
} /*
   * basic-list-box
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

},{"../../mixins/ChildrenContent":6,"../../mixins/ClickSelection":7,"../../mixins/ContentItems":8,"../../mixins/DirectionSelection":9,"../../mixins/Generic":10,"../../mixins/ItemSelection":11,"../../mixins/ItemsAccessible":12,"../../mixins/Keyboard":13,"../../mixins/KeyboardDirection":14,"../../mixins/KeyboardPaging":15,"../../mixins/KeyboardPrefixSelection":16,"../../mixins/SelectionHighlight":17,"../../mixins/SelectionScroll":18,"element-base/src/ElementBase":26}],4:[function(require,module,exports){
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
       * @element basic-sliding-viewport
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('element-base/src/ElementBase');

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
      this.position = 0;
      this.render();
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

},{"../SpreadItems/SpreadItems":5,"element-base/src/ElementBase":26}],5:[function(require,module,exports){
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
       * @element basic-spread-items
       */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('element-base/src/ElementBase');

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

},{"../../mixins/ChildrenContent":6,"element-base/src/ElementBase":26}],6:[function(require,module,exports){
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
 * Lets a component collective takes as its content the children of the
 * innermost aspect.
 *
 * @element basic-children-content
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
     * The flattened content of this collective.
     *
     * The content is the collective of nodes which are children of the
     * collective's innermost aspect. If any of those nodes are `<content>`
     * elements, those are recursively expanded.
     *
     * @property content
     * @type [Object]
     */

  }, {
    key: "content",
    get: function get() {
      // if (!this._content) {
      //   let innermost = this.collective.innermostElement;
      //   if (innermost) {
      //     this._content = Basic.ContentHelpers.flattenChildren(innermost);
      //   }
      // }
      // return this._content;
      return expandContentElements(this.children);
    }
  }]);

  return ChildrenContent;
})();

exports.default = ChildrenContent;
;

/*
 * Given a array of nodes, return a new array with any content elements expanded
 * to the nodes distributed to that content element. This rule is applied
 * recursively.
 *
 * If includeTextNodes is true, text nodes will be included, as in the
 * standard childNodes property; by default, this skips text nodes, like the
 * standard children property.
 */
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

},{}],7:[function(require,module,exports){
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
 * Aspect which maps a click to item selection.
 *
 * @element basic-click-selection
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
       * The standard use for this aspect is in list boxes. List boxes don't
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
 * Aspect that lets a component collective DOM content as list items.
 *
 * Auxiliary elements which are not normally visible are filtered out. For now,
 * For now, these are: link, script, style, and template.
 *
 * @element basic-content-items
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

    // Default implementation does nothing. This will typically be handled by
    // other aspects in the collective.

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
          // BUG: If an aspect is assimilated after ContentItems, then all the
          // items are already initialized, and the new aspect won't have an
          // opportunity to do its own per-item initialization in itemAdded.
          _this.itemAdded(item);
          item._itemInitialized = true;
        }
      });

      var outermost = this.outermostAttached;
      if (outermost) {
        var event = new CustomEvent('items-changed', {
          bubbles: true
        });
        outermost.dispatchEvent(event);
      }
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
})(); /**
       * Aspect which maps direction semantics (goLeft, goRight, etc.) to selection
       * semantics (selectPrevious, selectNext, etc.).
       *
       * @element basic-direction-selection
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

},{"Composable/src/Composable":21}],10:[function(require,module,exports){
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

/*
 * A very simple set of helpers to support the use of generic styling in a
 * component.
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
 * Aspect which manages selection semantics for items in a list.
 *
 * @element basic-item-selection
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
          // aspects a chance to do their own itemsChanged work.
          setTimeout((function () {
            ensureSelection(this);
          }).bind(this));
        }
      }
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

// properties: {
//
//   selectedIndex: {
//     type: Number
//   }
//
//   selectedItem: {
//     type: Object
//   }
//
//   selectionRequired: {
//     type: Boolean,
//     observer: 'selectionRequiredChanged',
//     value: false
//   }
//
// }
//
// get selectedIndex() {
//   // HACK: Proxied getter/setter properties like this one can't be set via
//   // attributes. See https://github.com/Polymer/polymer/issues/2454. We
//   // currently hack around this by only returning a value for this property if
//   // the element is ready. A negative side effect is that inspecting this
//   // property before the element is ready will always return undefined.
//   if (this._readied) {
//     return this.selectedIndex;
//   }
// }

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
 * Aspect which adds ARIA roles for lists and list items.
 *
 * @element basic-accessible-list
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
      var outermost = this.outermostAttached;
      outermost.setAttribute('role', 'listbox');

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
      var elementId = outermost.getAttribute("id");
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
        this.outermostAttached.removeAttribute('aria-activedescendant');
      }
    }
  }]);

  return ItemsAccessible;
})();

exports.default = ItemsAccessible;

},{}],13:[function(require,module,exports){
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
 * Aspect which manages the keyboard focus and keydown handling for a component.
 *
 * This aspect ensures that its only the outermost aspect in a collective that is
 * listening for keyboard events.
 *
 * @element basic-keyboard
 */

var Keyboard = (function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);
  }

  _createClass(Keyboard, [{
    key: 'createdCallback',

    /*
     * When the collective changes, stop listening for keyboard events on
     * whichever aspect was previously the outermost aspect, and start listening
     * to keyboard events on whichever aspect is now the new outermost aspect.
     */
    // TODO: Do we need to start/stop listening when attached/detached, or is
    // that handled automatically?
    // collectiveChanged: function() {
    //
    //   let outermost = this.collective.outermostAttached;
    //   if (outermost === this._previousOutermostAspect) {
    //     // Should already be listening to events on the outermost aspect.
    //     return;
    //   }
    //
    //   if (this._previousOutermostAspect) {
    //     // Clean up the previous aspect that was handling the keyboard.
    //
    //     if (this._previousTabIndex) {
    //       // Restore previous tab index.
    //       this._previousOutermostAspect.setAttribute('tabIndex', this._previousTabIndex);
    //     } else {
    //       // Aspect didn't have a tab index before, so remove it.
    //       this._previousOutermostAspect.removeAttribute('tabIndex');
    //     }
    //
    //     // Stop listening to events the previous outermost aspect.
    //     this._previousOutermostAspect.removeEventListener('keydown', this._keydownHandler);
    //   }
    //
    //   if (outermost.getAttribute('tabIndex')) {
    //     // Leave existing tab index in place.
    //     this._previousTabIndex = null;
    //   } else {
    //     // Make new outermost aspect focusable.
    //     this._previousTabIndex = outermost.getAttribute('tabIndex');
    //     outermost.setAttribute('tabIndex', 0);
    //   }
    //
    //   // Start listening to events on the new outermost aspect.
    //   if (!this._keydownHandler) {
    //     this._keydownHandler = this._keydown.bind(this);
    //   }
    //   outermost.addEventListener('keydown', this._keydownHandler);
    //
    //   this._previousOutermostAspect = outermost;
    // }

    value: function createdCallback() {
      var _this = this;

      this.addEventListener('keydown', function (event) {
        var handled = _this.keydown(event);
        if (handled) {
          event.preventDefault();
          event.stopPropagation();
        }
      });
      this.setAttribute('tabIndex', 0);
    }

    // Default keydown handler. This will typically be handled by other mixins.

  }, {
    key: 'keydown',
    value: function keydown(event) {}
  }]);

  return Keyboard;
})();

exports.default = Keyboard;

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
})(); /**
       * Aspect which maps direction keys (Left, Right, etc.) to direction semantics
       * (goLeft, goRight, etc.).
       *
       * @element basic-keyboard-direction
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

},{"Composable/src/Composable":21}],15:[function(require,module,exports){
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
       * Aspect which maps page keys (Page Up, Page Down) into operations that scroll
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
       * @element basic-keyboard-paging
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

},{"Composable/src/Composable":21}],16:[function(require,module,exports){
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
       * Handle list box-style prefix typing, in which the user can type a string to
       * select the first item that begins with that string.
       *
       * @element basic-keyboard-prefix-selection
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

},{"Composable/src/Composable":21}],17:[function(require,module,exports){
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
 * Aspect which applies standard highlight colors to a selected item.
 *
 * @element basic-selection-highlight
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

},{}],18:[function(require,module,exports){
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
 * Aspect which scrolls a container to keep the selected item visible.
 *
 * @element basic-selection-scroll
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

},{}],19:[function(require,module,exports){
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
 * Aspect which translates touch gestures (swipe left, swipe right) to direction
 * semantics (goRight, goLeft).
 *
 * @element basic-swipe-direction
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

      // TODO: touch events could be factored out into their own aspect.

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

    // Default implementations. These will typically be handled by other aspects
    // in the collective.

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

    // Default implementation. This will typically be handled by other aspects
    // in the collective.
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

},{}],20:[function(require,module,exports){
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
       * Aspect which maps a horizontal trackpad swipe gesture (or horizontal mouse wheel
       * action) to direction semantics.
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
       * @element basic-trackpad-direction
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

    // Default implementations. These will typically be handled by other aspects
    // in the collective.

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
  console.log("timeout");

  // Snap to the closest item.
  element.showTransition(true);
  var position = element.position;
  if (position >= 0.5) {
    console.log("snap right");
    element.goRight();
  } else if (position <= -0.5) {
    console.log("snap left");
    element.goLeft();
  }

  // TODO: Listen for the transition to complete, and then restore
  // showTransition to false (or the previous value).

  resetWheelTracking(element);
}

},{"Composable/src/Composable":21}],21:[function(require,module,exports){
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

},{"./CompositionRules":22}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We use Extensible to add its own members to a HTMLElement subclass.
// The result is an HTMLElement with .extend() and super() support.
var ComposableElement = _Composable2.default.compose.call(HTMLElement, _Composable2.default); /*
                                                                                               * A composable HTML element.
                                                                                               *
                                                                                               * This class is provided just as a convenience. One could also start with
                                                                                               * HTMLElement at the top level, and add extensibility by mixing in Composable.
                                                                                               */

exports.default = ComposableElement;

},{"Composable/src/Composable":21}],26:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComposableElement2 = require('./ComposableElement');

var _ComposableElement3 = _interopRequireDefault(_ComposableElement2);

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

var ElementBase = (function (_ComposableElement) {
  _inherits(ElementBase, _ComposableElement);

  function ElementBase() {
    _classCallCheck(this, ElementBase);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ElementBase).apply(this, arguments));
  }

  _createClass(ElementBase, [{
    key: 'log',

    /* For debugging */
    value: function log(text) {
      console.log(this.localName + ': ' + text);
    }
  }]);

  return ElementBase;
})(_ComposableElement3.default);

exports.default = ElementBase = ElementBase.compose(_TemplateStamping2.default, // before node finding, so shadow root is populated
_AutomaticNodeFinding2.default, // before marshalling, so marshalled properties can use it
_AttributeMarshalling2.default);

document.registerElement('element-base', ElementBase);

},{"./AttributeMarshalling":23,"./AutomaticNodeFinding":24,"./ComposableElement":25,"./TemplateStamping":27}],27:[function(require,module,exports){
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
      if (typeof template === 'string') {
        // Upgrade plain string to real template.
        template = createTemplateWithInnerHTML(template);
      }
      if (template && USING_SHADOW_DOM_V0) {
        polyfillSlotWithContent(template);
      }
      if (window.ShadowDOMPolyfill) {
        shimTemplateStyles(template, this.localName);
      }
      // TODO: Save the processed template with the component's class prototype
      // so it doesn't need to be processed with every instantiation.
      if (template) {
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

},{}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL0Fycm93RGlyZWN0aW9uL0Fycm93RGlyZWN0aW9uLmpzIiwiY29tcG9uZW50cy9DYXJvdXNlbC9DYXJvdXNlbC5qcyIsImNvbXBvbmVudHMvTGlzdEJveC9MaXN0Qm94LmpzIiwiY29tcG9uZW50cy9TbGlkaW5nVmlld3BvcnQvU2xpZGluZ1ZpZXdwb3J0LmpzIiwiY29tcG9uZW50cy9TcHJlYWRJdGVtcy9TcHJlYWRJdGVtcy5qcyIsIm1peGlucy9DaGlsZHJlbkNvbnRlbnQuanMiLCJtaXhpbnMvQ2xpY2tTZWxlY3Rpb24uanMiLCJtaXhpbnMvQ29udGVudEl0ZW1zLmpzIiwibWl4aW5zL0RpcmVjdGlvblNlbGVjdGlvbi5qcyIsIm1peGlucy9HZW5lcmljLmpzIiwibWl4aW5zL0l0ZW1TZWxlY3Rpb24uanMiLCJtaXhpbnMvSXRlbXNBY2Nlc3NpYmxlLmpzIiwibWl4aW5zL0tleWJvYXJkLmpzIiwibWl4aW5zL0tleWJvYXJkRGlyZWN0aW9uLmpzIiwibWl4aW5zL0tleWJvYXJkUGFnaW5nLmpzIiwibWl4aW5zL0tleWJvYXJkUHJlZml4U2VsZWN0aW9uLmpzIiwibWl4aW5zL1NlbGVjdGlvbkhpZ2hsaWdodC5qcyIsIm1peGlucy9TZWxlY3Rpb25TY3JvbGwuanMiLCJtaXhpbnMvU3dpcGVEaXJlY3Rpb24uanMiLCJtaXhpbnMvVHJhY2twYWREaXJlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9Db21wb3NhYmxlL3NyYy9Db21wb3NpdGlvblJ1bGVzLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvQXR0cmlidXRlTWFyc2hhbGxpbmcuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9BdXRvbWF0aWNOb2RlRmluZGluZy5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL0NvbXBvc2FibGVFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvRWxlbWVudEJhc2UuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9UZW1wbGF0ZVN0YW1waW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHOzs7Ozs7Ozs7Ozs7QUFBQyxBQVl0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFB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QUMsQ0FBQztHQUNqRDtBQUNELFNBQU8sUUFBUSxDQUFDO0NBQ2pCOzs7O0FBQUEsQUFJRCxTQUFTLHVCQUF1QixDQUFDLFFBQVEsRUFBRTtBQUN6QyxJQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQUEsV0FBVyxFQUFJO0FBQ3hFLFFBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkQsZUFBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0dBQ2xFLENBQUMsQ0FBQztDQUNKOzs7QUFBQSxBQUdELFNBQVMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUN6QyxlQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzVEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBBc3BlY3QgdXNlZCB0byBhZGQgcHJvbWluZW50IGxlZnQgYW5kIHJpZ2h0IGFycm93IGJ1dHRvbnMgdG8gYSB3cmFwcGVkIGNoaWxkLlxuICogQ2xpY2tpbmcgdGhlIGxlZnQvcmlnaHQgYnV0dG9uIG1hcHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgbGVmdC9yaWdodCBkaXJlY3Rpb24uXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIGFycm93IGJ1dHRvbnMgYXJlIHNob3duIG9uIGRldmljZXMgd2l0aCBhIG1vdXNlIG9yIG1vdXNlLWxpa2VcbiAqIHBvaW50IGRldmljZTsgdGhleSBhcmUgbm90IHNob3duIG9uIGEgdG91Y2gtY2FwYWJsZSBkZXZpY2UgdW5sZXNzIG1vdXNlIG1vdmVtZW50XG4gKiBpcyBkZXRlY3RlZC4gVG8gY2F1c2UgdGhlIGJ1dHRvbnMgdG8gYWx3YXlzIGFwcGVhciwgYXBwbHkgdGhlICdzaG93QXJyb3dzJyBDU1NcbiAqIGNsYXNzLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWFycm93LWRpcmVjdGlvblxuICovXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdlbGVtZW50LWJhc2Uvc3JjL0VsZW1lbnRCYXNlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJvd0RpcmVjdGlvbiB7XG5cbiAgLy8gYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgLy8gICAvLyBBcHBseSBhbnkgc2VsZWN0aW9uIG1hZGUgYmVmb3JlIGFzc2ltaWxhdGlvbi5cbiAgLy8gICBpZiAodGhpcy5fcHJlbWF0dXJlU2VsZWN0ZWRJbmRleFxuICAvLyAgICAgICAmJiAnc2VsZWN0ZWRJbmRleCcgaW4gdGhpcyAmJiB0aGlzLnNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG4gIC8vICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLl9wcmVtYXR1cmVTZWxlY3RlZEluZGV4O1xuICAvLyAgICAgdGhpcy5fcHJlbWF0dXJlU2VsZWN0ZWRJbmRleCA9IG51bGw7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuJC5idXR0b25MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5nb0xlZnQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICAgIHRoaXMuJC5idXR0b25SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZ29SaWdodCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93QXJyb3dzJykpIHtcbiAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHdlIHNob3VsZCBzaG93IGFycm93IGJ1dHRvbnMgb3Igbm90LlxuICAgICAgaWYgKGRldmljZVN1cHBvcnRzVG91Y2goKSkge1xuICAgICAgICAvLyBBIHRvdWNoIGRldmljZSBtaWdodCBhbHNvIHN1cHBvcnQgYSBtb3VzZSwgYnV0IHdlIGNhbid0IGtub3cgd2hldGhlclxuICAgICAgICAvLyB0aGVyZSdzIGFjdHVhbGx5IGEgbW91c2UgdW50aWwgd2UgaGVhciBmcm9tIGl0LlxuICAgICAgICBsaXN0ZW5Gb3JNb3VzZSh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZSBkZXZpY2UgZG9lc24ndCBzdXBwb3J0IHRvdWNoLCBzbyBhc3N1bWUgaXQgaGFzIGEgbW91c2UuXG4gICAgICAgIHNob3dBcnJvd3ModGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMuIFRoZXNlIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgYXNwZWN0c1xuICAvLyBpbiB0aGUgY29sbGVjdGl2ZS5cbiAgZ29MZWZ0KCkge31cbiAgZ29SaWdodCgpIHt9XG5cbiAgc2V0IGNhblNlbGVjdE5leHQoY2FuU2VsZWN0TmV4dCkge1xuICAgIHRoaXMuJC5idXR0b25SaWdodC5kaXNhYmxlZCA9ICFjYW5TZWxlY3ROZXh0O1xuICB9XG4gIHNldCBjYW5TZWxlY3RQcmV2aW91cyhjYW5TZWxlY3RQcmV2aW91cykge1xuICAgIHRoaXMuJC5idXR0b25MZWZ0LmRpc2FibGVkID0gIWNhblNlbGVjdFByZXZpb3VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgaXRlbSB3aGljaCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQsIG9yIC0xIGlmIHRoZXJlIGlzIG5vXG4gICAqIHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGVkSW5kZXhcbiAgICogQHR5cGUgTnVtYmVyXG4gICAqL1xuICAvLyBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xuICAvLyB9XG4gIC8vIHNldCBzZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gIC8vICAgaWYgKCdzZWxlY3RlZEluZGV4JyBpbiB0aGlzIHtcbiAgLy8gICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICAvLyBTZWxlY3Rpb24gaXMgYmVpbmcgbWFkZSBiZWZvcmUgdGhlIGNvbGxlY3RpdmUgc3VwcG9ydHMgaXQuXG4gIC8vICAgICB0aGlzLl9wcmVtYXR1cmVTZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSwgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3RlZEl0ZW1cbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICAvLyBnZXQgc2VsZWN0ZWRJdGVtKCkge1xuICAvLyAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbTtcbiAgLy8gfVxuICAvLyBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgLy8gICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG4gIC8vIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtZmxleDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICB9XG5cbiAgICAgICNhcnJvd05hdmlnYXRpb25Db250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWlubGluZS1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgLXdlYmtpdC1mbGV4OiAxO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgfVxuXG4gICAgICAubmF2aWdhdGlvbkJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBvdXRsaW5lOiBub25lOyAvKiBSRVZJRVc6IEFjY2Vzc2liaWxpdHkgc2hvdWxkIGJlIHByb3ZpZGVkIGJ5IG90aGVyIGFzcGVjdHMuICovXG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMXM7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIC5uYXZpZ2F0aW9uQnV0dG9uOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSggMCwgMCwgMCwgMC41ICk7XG4gICAgICAgIGZpbGw6IHJnYmEoIDAsIDAsIDAsIDAuNyApO1xuICAgICAgfVxuICAgICAgLm5hdmlnYXRpb25CdXR0b246YWN0aXZlOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSggMCwgMCwgMCwgMC43ICk7XG4gICAgICAgIGZpbGw6IHJnYmEoIDAsIDAsIDAsIDAuOSApO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCg6bm90KC5zaG93QXJyb3dzKSkgLm5hdmlnYXRpb25CdXR0b24ge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5uYXZpZ2F0aW9uQnV0dG9uIC5pY29uIHtcbiAgICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgICB3aWR0aDogNDhweDtcbiAgICAgIH1cblxuICAgICAgLyogT3ZlcmxheSB2YXJpYW50ICovXG4gICAgICA6aG9zdCgub3ZlcmxheSkge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG4gICAgICA6aG9zdCgub3ZlcmxheSkgLm5hdmlnYXRpb25CdXR0b24ge1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgfVxuICAgICAgOmhvc3QoLm92ZXJsYXkpICNidXR0b25MZWZ0IHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgIH1cbiAgICAgIDpob3N0KC5vdmVybGF5KSAjYnV0dG9uUmlnaHQge1xuICAgICAgICByaWdodDogMDtcbiAgICAgIH1cblxuICAgICAgLm5hdmlnYXRpb25CdXR0b246ZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICAgICAgICBmaWxsOiByZ2JhKCAwLCAwLCAwLCAwLjIgKTtcbiAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDwhLS1cbiAgICAgIEFjY2Vzc2liaWxpdHkgbm90ZTogc2luY2UgdGhlIG5hdmlnYXRpb24gb2ZmZXJlZCBieSB0aGUgYXJyb3cgYnV0dG9ucyBzaG91bGRcbiAgICAgIGJlIHJlZHVuZGFudCAodGhhdCBpcywgdGhlcmUgc2hvdWxkIGJlIG90aGVyIHdheXMgb2YgbmF2aWdhdGluZyB0aGUgbGlzdCksXG4gICAgICB3ZSBtYXJrIHRoZSBidXR0b24gYXMgYXJpYS1oaWRkZW4gc28gdGhhdCBhc3Npc3RpdmUgZGV2aWNlcyBpZ25vcmUgdGhlbS5cbiAgICAgIC0tPlxuICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvbkxlZnRcIiBjbGFzcz1cIm5hdmlnYXRpb25CdXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGltZyBjbGFzcz1cImljb25cIiBzcmM9XCJpY19rZXlib2FyZF9hcnJvd19sZWZ0X2JsYWNrXzI0cHguc3ZnXCI+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgaWQ9XCJhcnJvd05hdmlnYXRpb25Db250YWluZXJcIj5cbiAgICAgICAgPGNvbnRlbnQ+PC9jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGlkPVwiYnV0dG9uUmlnaHRcIiBjbGFzcz1cIm5hdmlnYXRpb25CdXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGltZyBjbGFzcz1cImljb25cIiBzcmM9XCJpY19rZXlib2FyZF9hcnJvd19yaWdodF9ibGFja18yNHB4LnN2Z1wiPlxuICAgICAgPC9idXR0b24+XG4gICAgYDtcbiAgfVxuXG59XG5cblxuZnVuY3Rpb24gZGV2aWNlU3VwcG9ydHNUb3VjaCgpIHtcbiAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fFxuICAgICAgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCk7XG59XG5cbi8vIFdlIHRyeSB0byBkZXRlY3QgdGhlIHByZXNlbmNlIG9mIGEgbW91c2UgYnkgbGlzdGVuaW5nIGZvciBtb3VzZW1vdmUgZXZlbnRzXG4vLyB3aGljaCBhcmUgKm5vdCogdGhlIHJlc3VsdCBvZiBhIG1vdXNlZG93bi4gT24gYSB0b3VjaCBkZXZpY2UsIGEgdGFwIG9uIHRoZVxuLy8gcGFnZSB3aWxsIGdlbmVyYXRlIGEgZmFrZSBtb3VzZW1vdmUsIGZvbGxvd2VkIGJ5IGEgbW91c2Vkb3duLiBXZSBkb24ndCB3YW50XG4vLyB0byByZXNwb25kIHRvIHRob3NlIGZha2UgbW91c2Vtb3ZlIGV2ZW50cy4gVG8gZGlzY3JpbWluYXRlIGJldHdlZW4gZmFrZSBhbmRcbi8vIHJlYWwgbW91c2Vtb3ZlIGV2ZW50cywgd2hlbiB3ZSBnZXQgYSBtb3VzZW1vdmUgZXZlbnQsIHdlIHdhaXQgZm9yIGEgdGljayB0b1xuLy8gc2VlIGlmIHRoZSBzYW1lIGxvY2F0aW9uIGlzIHJlcG9ydGVkIGFzIHRoZSBsb2NhdGlvbiBvZiBhIHN1YnNlcXVlbnRcbi8vIG1vdXNlZG93bi5cbmZ1bmN0aW9uIGxpc3RlbkZvck1vdXNlKGVsZW1lbnQpIHtcblxuICBlbGVtZW50Ll9tb3VzZWRvd25MaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlZG93blwiKTtcbiAgICBlbGVtZW50Ll9sYXN0TW91c2VEb3duUGFnZVggPSBldmVudC5wYWdlWDtcbiAgICBlbGVtZW50Ll9sYXN0TW91c2VEb3duUGFnZVkgPSBldmVudC5wYWdlWTtcbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGVsZW1lbnQuX21vdXNlZG93bkxpc3RlbmVyKTtcblxuICBlbGVtZW50Ll9tb3VzZW1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlbW92ZVwiKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChldmVudC5wYWdlWCAhPT0gZWxlbWVudC5fbGFzdE1vdXNlRG93blBhZ2VYIHx8XG4gICAgICAgICAgZXZlbnQucGFnZVkgIT09IGVsZW1lbnQuX2xhc3RNb3VzZURvd25QYWdlWSkge1xuICAgICAgICAvLyBtb3VzZW1vdmUgZXZlbnQgd2FzIGF0IGEgbG9jYXRpb24gb3RoZXIgdGhhbiB0aGUgbGFzdCBtb3VzZWRvd24sXG4gICAgICAgIC8vIGFuZCBoZW5jZSBtb3N0IGxpa2VseSBhIHJlYWwgbW91c2Vtb3ZlIGV2ZW50LlxuICAgICAgICBtb3VzZURldGVjdGVkKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZWxlbWVudC5fbW91c2Vtb3ZlTGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBtb3VzZURldGVjdGVkKGVsZW1lbnQpIHtcbiAgLy8gY29uc29sZS5sb2coXCJtb3VzZSBkZXRlY3RlZFwiKTtcbiAgc2hvd0Fycm93cyhlbGVtZW50KTtcblxuICAvLyBXZSBjYW4gc3RvcCBsaXN0ZW5pbmcgZm9yIG1vdXNlIGV2ZW50cyBub3cuXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlbGVtZW50Ll9tb3VzZWRvd25MaXN0ZW5lcik7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlbGVtZW50Ll9tb3VzZW1vdmVMaXN0ZW5lcik7XG4gIGVsZW1lbnQuX21vdXNlZG93bkxpc3RlbmVyID0gbnVsbDtcbiAgZWxlbWVudC5fbW91c2Vtb3ZlTGlzdGVuZXIgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBzaG93QXJyb3dzKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaG93QXJyb3dzJyk7XG59XG5cblxuQXJyb3dEaXJlY3Rpb24gPSBFbGVtZW50QmFzZS5jb21wb3NlKEFycm93RGlyZWN0aW9uKTtcblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdiYXNpYy1hcnJvdy1kaXJlY3Rpb24nLCBBcnJvd0RpcmVjdGlvbik7XG4iLCIvKlxuICogYmFzaWMtbGlzdC1ib3hcbiAqL1xuXG5pbXBvcnQgRWxlbWVudEJhc2UgZnJvbSAnZWxlbWVudC1iYXNlL3NyYy9FbGVtZW50QmFzZSc7XG5pbXBvcnQgQ29udGVudEl0ZW1zIGZyb20gJy4uLy4uL21peGlucy9Db250ZW50SXRlbXMnO1xuaW1wb3J0IERpcmVjdGlvblNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvRGlyZWN0aW9uU2VsZWN0aW9uJztcbmltcG9ydCBHZW5lcmljIGZyb20gJy4uLy4uL21peGlucy9HZW5lcmljJztcbmltcG9ydCBJdGVtU2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9JdGVtU2VsZWN0aW9uJztcbmltcG9ydCBJdGVtc0FjY2Vzc2libGUgZnJvbSAnLi4vLi4vbWl4aW5zL0l0ZW1zQWNjZXNzaWJsZSc7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkJztcbmltcG9ydCBLZXlib2FyZERpcmVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmREaXJlY3Rpb24nO1xuaW1wb3J0IFNsaWRpbmdWaWV3cG9ydCBmcm9tICcuLi9TbGlkaW5nVmlld3BvcnQvU2xpZGluZ1ZpZXdwb3J0JztcbmltcG9ydCBTd2lwZURpcmVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvU3dpcGVEaXJlY3Rpb24nO1xuaW1wb3J0IFRyYWNrcGFkRGlyZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9UcmFja3BhZERpcmVjdGlvbic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2Fyb3VzZWwge1xuXG4gIGF0dGFjaGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gSEFDS1xuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gICAgdGhpcy5zZWxlY3Rpb25SZXF1aXJlZCA9IHRydWU7XG4gIH1cblxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy4kLnZpZXdwb3J0LmNvbnRlbnQ7XG4gIH1cblxuICAvLyBTdHViIGZvciBjb2xsZWN0aXZlcyBmb3Igbm93XG4gIGdldCBpbm5lcm1vc3RBdHRhY2hlZCgpIHtcbiAgICByZXR1cm4gdGhpcy4kLnZpZXdwb3J0O1xuICB9XG5cbiAgLy8gU3R1YiBmb3IgY29sbGVjdGl2ZXMgZm9yIG5vd1xuICBnZXQgb3V0ZXJtb3N0QXR0YWNoZWQoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuJC52aWV3cG9ydC5wb3NpdGlvbjtcbiAgfVxuICBzZXQgcG9zaXRpb24odmFsdWUpIHtcbiAgICB0aGlzLiQudmlld3BvcnQucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIHRoaXMuJC52aWV3cG9ydC5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICB9XG5cbiAgc2hvd1RyYW5zaXRpb24oc2hvdykge1xuICAgIHJldHVybiB0aGlzLiQudmlld3BvcnQuc2hvd1RyYW5zaXRpb24oc2hvdyk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuXG4gICAgICBiYXNpYy1zbGlkaW5nLXZpZXdwb3J0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAtd2Via2l0LWZsZXg6IDE7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8YmFzaWMtc2xpZGluZy12aWV3cG9ydCBpZD1cInZpZXdwb3J0XCI+XG4gICAgICAgIDxjb250ZW50PjwvY29udGVudD5cbiAgICAgIDwvYmFzaWMtc2xpZGluZy12aWV3cG9ydD5cbiAgICBgO1xuICB9XG5cbn1cblxuQ2Fyb3VzZWwgPSBFbGVtZW50QmFzZS5jb21wb3NlKFxuICBDb250ZW50SXRlbXMsXG4gIERpcmVjdGlvblNlbGVjdGlvbixcbiAgR2VuZXJpYyxcbiAgSXRlbVNlbGVjdGlvbixcbiAgSXRlbXNBY2Nlc3NpYmxlLFxuICBLZXlib2FyZCxcbiAgS2V5Ym9hcmREaXJlY3Rpb24sXG4gIFN3aXBlRGlyZWN0aW9uLFxuICBUcmFja3BhZERpcmVjdGlvbixcbiAgQ2Fyb3VzZWxcbik7XG5cblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdiYXNpYy1jYXJvdXNlbCcsIENhcm91c2VsKTtcbiIsIi8qXG4gKiBiYXNpYy1saXN0LWJveFxuICovXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdlbGVtZW50LWJhc2Uvc3JjL0VsZW1lbnRCYXNlJztcbmltcG9ydCBDaGlsZHJlbkNvbnRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL0NoaWxkcmVuQ29udGVudCc7XG5pbXBvcnQgQ2xpY2tTZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0NsaWNrU2VsZWN0aW9uJztcbmltcG9ydCBDb250ZW50SXRlbXMgZnJvbSAnLi4vLi4vbWl4aW5zL0NvbnRlbnRJdGVtcyc7XG5pbXBvcnQgRGlyZWN0aW9uU2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9EaXJlY3Rpb25TZWxlY3Rpb24nO1xuaW1wb3J0IEdlbmVyaWMgZnJvbSAnLi4vLi4vbWl4aW5zL0dlbmVyaWMnO1xuaW1wb3J0IEl0ZW1TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0l0ZW1TZWxlY3Rpb24nO1xuaW1wb3J0IEl0ZW1zQWNjZXNzaWJsZSBmcm9tICcuLi8uLi9taXhpbnMvSXRlbXNBY2Nlc3NpYmxlJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmQnO1xuaW1wb3J0IEtleWJvYXJkRGlyZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZERpcmVjdGlvbic7XG5pbXBvcnQgS2V5Ym9hcmRQYWdpbmcgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkUGFnaW5nJztcbmltcG9ydCBLZXlib2FyZFByZWZpeFNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24nO1xuaW1wb3J0IFNlbGVjdGlvbkhpZ2hsaWdodCBmcm9tICcuLi8uLi9taXhpbnMvU2VsZWN0aW9uSGlnaGxpZ2h0JztcbmltcG9ydCBTZWxlY3Rpb25TY3JvbGwgZnJvbSAnLi4vLi4vbWl4aW5zL1NlbGVjdGlvblNjcm9sbCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEJveCBleHRlbmRzIEVsZW1lbnRCYXNlLmNvbXBvc2UoXG4gICAgQ2hpbGRyZW5Db250ZW50LFxuICAgIENsaWNrU2VsZWN0aW9uLFxuICAgIENvbnRlbnRJdGVtcyxcbiAgICBEaXJlY3Rpb25TZWxlY3Rpb24sXG4gICAgR2VuZXJpYyxcbiAgICBJdGVtU2VsZWN0aW9uLFxuICAgIEl0ZW1zQWNjZXNzaWJsZSxcbiAgICBLZXlib2FyZCxcbiAgICBLZXlib2FyZERpcmVjdGlvbixcbiAgICBLZXlib2FyZFBhZ2luZyxcbiAgICBLZXlib2FyZFByZWZpeFNlbGVjdGlvbixcbiAgICBTZWxlY3Rpb25IaWdobGlnaHQsXG4gICAgU2VsZWN0aW9uU2Nyb2xsXG4gICkge1xuXG4gIC8vIFN0dWIgZm9yIGNvbGxlY3RpdmVzIGZvciBub3dcbiAgZ2V0IGlubmVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzLiQuaXRlbXNDb250YWluZXI7XG4gIH1cbiAgZ2V0IG91dGVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICAgICAgfVxuXG4gICAgICBbdGFyZ2V0PVwiY2hpbGRcIl0ge1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC13ZWJraXQtZmxleDogMTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgI2l0ZW1zQ29udGFpbmVyIHtcbiAgICAgICAgLXdlYmtpdC1mbGV4OiAxO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDsgLyogZm9yIG1vbWVudHVtIHNjcm9sbGluZyAqL1xuICAgICAgfVxuXG4gICAgICAvKiBHZW5lcmljIGFwcGVhcmFuY2UgKi9cbiAgICAgIDpob3N0KFtnZW5lcmljPVwiXCJdKSB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pICNpdGVtc0NvbnRhaW5lciA6OmNvbnRlbnQgPiAqIHtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICBwYWRkaW5nOiAwLjI1ZW07XG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBpZD1cIml0ZW1zQ29udGFpbmVyXCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtbGlzdC1ib3gnLCBMaXN0Qm94KTtcbiIsIi8qKlxuICogUHJlc2VudHMgbGlzdCBpdGVtcyBpbiBhIHZpZXdwb3J0IHN1Y2ggdGhhdCBvbmx5IGEgc2luZ2xlIGl0ZW0gaXMgdmlzaWJsZSBhdCBhXG4gKiB0aW1lLiBOYXZpZ2F0aW5nIGJldHdlZW4gaXRlbXMgd2lsbCBiZSByZXByZXNlbnRlZCB3aXRoIGEgaG9yaXpvbnRhbCB2aXN1YWxcbiAqIHNsaWRpbmcgZWZmZWN0LlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGN1cnJlbnRseSByZXF1aXJlcyB0aGF0IHlvdSBleHBsaWNpdGx5IGFwcGx5IGEgc2l6ZSB0byBpdC4gRm9yIGFcbiAqIHZhcmlhbnQgd2hpY2ggYXV0b21hdGljYWxseSBzaXplcyB0byBpdHMgY29udGVudCwgc2VlIHRoZSByZWxhdGVkIGNvbXBvbmVudFxuICogYmFzaWMtc2xpZGluZy12aWV3cG9ydC1maXQuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtc2xpZGluZy12aWV3cG9ydFxuICovXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdlbGVtZW50LWJhc2Uvc3JjL0VsZW1lbnRCYXNlJztcbmltcG9ydCBTcHJlYWRJdGVtcyBmcm9tICcuLi9TcHJlYWRJdGVtcy9TcHJlYWRJdGVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRpbmdWaWV3cG9ydCB7XG5cbiAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gMDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuJC5zbGlkaW5nQ29udGFpbmVyLmNvbnRlbnQ7XG4gIH1cblxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuJC5zbGlkaW5nQ29udGFpbmVyLml0ZW1zO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJTZWxlY3Rpb24uYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZyYWN0aW9uYWwgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnQncyBtb3Zpbmcgc3VyZmFjZSB3aGlsZSBpdCBpcyBiZWluZ1xuICAgKiBtb3ZlZCAoZHJhZ2dlZC9zY3JvbGxlZC9ldGMuKS5cbiAgICpcbiAgICogVGhpcyBpcyBleHByZXNzZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgZWxlbWVudCdzIHdpZHRoLiBJZiB0aGUgdmFsdWUgaXNcbiAgICogcG9zaXRpdmUsIHRoZSBzdXJmYWNlIGlzIGJlaW5nIG1vdmVkIHRvIHRoZSBsZWZ0OyBpZiBuZWdhdGl2ZSwgdGhlIHN1cmZhY2VcbiAgICogaXMgYmVpbmcgbW92ZWQgdG8gdGhlIHJpZ2h0LiBFLmcuLCBhIHZhbHVlIG9mIDAuNSBpbmRpY2F0ZXMgdGhlIHN1cmZhY2UgaGFzXG4gICAqIG1vdmVkIGhhbGYgdGhlIGVsZW1lbnQncyB3aWR0aCB0byB0aGUgbGVmdC5cbiAgICpcbiAgICogQHByb3BlcnR5IHBvc2l0aW9uXG4gICAqIEB0eXBlIE51bWJlclxuICAgKi9cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHNldCBwb3NpdGlvbihwb3NpdGlvbikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgbGV0IGluZGV4ID0gaXRlbXMgJiYgaXRlbXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkSXRlbSk7XG4gICAgcmV0dXJuIGluZGV4IHx8IC0xO1xuICB9XG4gIHNldCBzZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXNbaW5kZXhdO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICB9XG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNob3dUcmFuc2l0aW9uKHNob3cpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3dUcmFuc2l0aW9uJywgc2hvdyk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgI3NsaWRpbmdDb250YWluZXIge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgLypcbiAgICAgICAgIFNldCB3aWR0aCBmb3IgSUUvRWRnZS4gSXQncyBub3QgY2xlYXIgd2h5IHRoZXkgbmVlZCB0aGlzLCBhbmQgdGhlIG90aGVyXG4gICAgICAgICBicm93c2VycyBkb24ndC5cbiAgICAgICAgICovXG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguc2hvd1RyYW5zaXRpb24pICNzbGlkaW5nQ29udGFpbmVyIHtcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjJzIGVhc2Utb3V0O1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLW91dDtcbiAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxiYXNpYy1zcHJlYWQtaXRlbXMgaWQ9XCJzbGlkaW5nQ29udGFpbmVyXCI+XG4gICAgICAgIDxjb250ZW50PjwvY29udGVudD5cbiAgICAgIDwvYmFzaWMtc3ByZWFkLWl0ZW1zPlxuICAgIGA7XG4gIH1cblxufVxuXG5cbmZ1bmN0aW9uIHJlbmRlclNlbGVjdGlvbigpIHtcblxuICB2YXIgY291bnQgPSB0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoO1xuICBpZiAoIWNvdW50KSB7XG4gICAgLy8gTnVsbCBvciB6ZXJvIG1lYW5zIHdlIGRvbid0IGhhdmUgaXRlbXMgdG8gcmVuZGVyIHlldC5cbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gIGlmIChpbmRleCA8IDApIHtcbiAgICAvLyBObyBzZWxlY3Rpb25cbiAgICAvLyByZXR1cm47XG4gICAgaW5kZXggPSAwO1xuICB9XG5cbiAgdmFyIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiB8fCAwO1xuICB2YXIgZGFtcGVuZWRQb3NpdGlvbjtcbiAgaWYgKGluZGV4ID09PSAwICYmIHBvc2l0aW9uIDwgMCkge1xuICAgIC8vIEFwcGx5IHRlbnNpb24gZnJvbSB0aGUgbGVmdCBlZGdlLlxuICAgIGRhbXBlbmVkUG9zaXRpb24gPSAtZGFtcGluZygtcG9zaXRpb24pO1xuICB9IGVsc2UgaWYgKGluZGV4ID09PSBjb3VudCAtIDEgJiYgcG9zaXRpb24gPiAwKSB7XG4gICAgLy8gQXBwbHkgdGVuc2lvbiBmcm9tIHRoZSByaWdodCBlZGdlLlxuICAgIGRhbXBlbmVkUG9zaXRpb24gPSBkYW1waW5nKHBvc2l0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBObyBkYW1waW5nIHJlcXVpcmVkLlxuICAgIGRhbXBlbmVkUG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgfVxuICB2YXIgZnJhY3Rpb25hbEluZGV4ID0gaW5kZXggKyBkYW1wZW5lZFBvc2l0aW9uO1xuICAvLyBVc2UgYSBwZXJjZW50YWdlIHNvIHRoZSB0cmFuc2Zvcm0gd2lsbCBzdGlsbCB3b3JrIGlmIHNjcmVlbiBzaXplIGNoYW5nZXNcbiAgLy8gKGUuZy4sIGlmIGRldmljZSBvcmllbnRhdGlvbiBjaGFuZ2VzKS5cbiAgdmFyIGxlZnQgPSAtZnJhY3Rpb25hbEluZGV4ICogMTAwO1xuICAvLyB2YXIgbGVmdCA9IC0oZnJhY3Rpb25hbEluZGV4IC8gY291bnQpICogMTAwO1xuICB2YXIgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGxlZnQgKyAnJSknO1xuICB0aGlzLiQuc2xpZGluZ0NvbnRhaW5lci5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gIHRoaXMuJC5zbGlkaW5nQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbn1cblxuXG4vKlxuICogQ2FsY3VsYXRlIGRhbXBpbmcgYXMgYSBmdW5jdGlvbiBvZiB0aGUgZGlzdGFuY2UgcGFzdCB0aGUgbWluaW11bS9tYXhpbXVtXG4gKiB2YWx1ZXMuXG4gKlxuICogV2Ugd2FudCB0byBhc3ltcHRvdGljYWxseSBhcHByb2FjaCBhbiBhYnNvbHV0ZSBtaW5pbXVtIG9mIDEgdW5pdFxuICogYmVsb3cvYWJvdmUgdGhlIGFjdHVhbCBtaW5pbXVtL21heGltdW0uIFRoaXMgcmVxdWlyZXMgY2FsY3VsYXRpbmcgYVxuICogaHlwZXJib2xpYyBmdW5jdGlvbi5cbiAqXG4gKiBTZWUgaHR0cDovL3d3dy53b2xmcmFtYWxwaGEuY29tL2lucHV0Lz9pPXkrJTNEKy0xJTJGJTI4eCUyQjElMjkrJTJCKzFcbiAqIGZvciB0aGUgb25lIHdlIHVzZS4gVGhlIG9ubHkgcG9ydGlvbiBvZiB0aGF0IGZ1bmN0aW9uIHdlIGNhcmUgYWJvdXQgaXMgd2hlblxuICogeCBpcyB6ZXJvIG9yIGdyZWF0ZXIuIEFuIGltcG9ydGFudCBjb25zaWRlcmF0aW9uIGlzIHRoYXQgdGhlIGN1cnZlIGJlXG4gKiB0YW5nZW50IHRvIHRoZSBkaWFnb25hbCBsaW5lIHg9eSBhdCAoMCwgMCkuIFRoaXMgZW5zdXJlcyBzbW9vdGggY29udGludWl0eVxuICogd2l0aCB0aGUgbm9ybWFsIGRyYWcgYmVoYXZpb3IsIGluIHdoaWNoIHRoZSB2aXNpYmxlIHNsaWRpbmcgaXMgbGluZWFyIHdpdGhcbiAqIHRoZSBkaXN0YW5jZSB0aGUgdG91Y2hwb2ludCBoYXMgYmVlbiBkcmFnZ2VkLlxuICovXG5mdW5jdGlvbiBkYW1waW5nKHgpIHtcbiAgdmFyIHkgPSAoLTEgLyAoeCArIDEpKSArIDE7XG4gIHJldHVybiB5O1xufVxuXG5cblNsaWRpbmdWaWV3cG9ydCA9IEVsZW1lbnRCYXNlLmNvbXBvc2UoU2xpZGluZ1ZpZXdwb3J0KTtcblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdiYXNpYy1zbGlkaW5nLXZpZXdwb3J0JywgU2xpZGluZ1ZpZXdwb3J0KTtcbiIsIi8qKlxuICogU3ByZWFkcyBvdXQgYSBzZXQgb2YgaXRlbXMgaG9yaXpvbnRhbGx5IHNvIHRoZXkgdGFrZSBlcXVhbCBzcGFjZS5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBjdXJyZW50bHkgcmVxdWlyZXMgYW4gZXhwbGljaXQgc2l6ZSBieSBhcHBsaWVkIHRvIGl0LiBGb3IgYVxuICogdmFyaWFudCB0aGF0IGF1dG9tYXRpY2FsbHkgc2l6ZXMgdG8gZml0IHRoZSBsaXN0IGl0ZW1zLCBzZWUgdGhlIHJlbGF0ZWRcbiAqIGNvbXBvbmVudCBiYXNpYy1zcHJlYWQtZml0LlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLXNwcmVhZC1pdGVtc1xuICovXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdlbGVtZW50LWJhc2Uvc3JjL0VsZW1lbnRCYXNlJztcbmltcG9ydCBDaGlsZHJlbkNvbnRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL0NoaWxkcmVuQ29udGVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcmVhZEl0ZW1zIHtcblxuICBhdHRhY2hlZENhbGxiYWNrKCkge1xuICAgIC8vIEhBQ0tcbiAgICB0aGlzLml0ZW1zQ2hhbmdlZCgpO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICBpdGVtc0NoYW5nZWQoKSB7XG4gICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICBsZXQgY291bnQgPSBpdGVtcy5sZW5ndGg7XG4gICAgdGhpcy4kLnNwcmVhZENvbnRhaW5lci5zdHlsZS53aWR0aCA9IChjb3VudCAqIDEwMCkgKyAnJSc7XG4gICAgbGV0IGl0ZW1XaWR0aCA9ICgxMDAgLyBjb3VudCkgKyBcIiVcIjtcbiAgICBbXS5mb3JFYWNoLmNhbGwoaXRlbXMsIGl0ZW0gPT4ge1xuICAgICAgaXRlbS5zdHlsZS53aWR0aCA9IGl0ZW1XaWR0aDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cblxuICAgICAgI3NwcmVhZENvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgICNzcHJlYWRDb250YWluZXIgOjpjb250ZW50ID4gKiB7XG4gICAgICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgICAgIG9iamVjdC1maXQ6IHZhcigtLWJhc2ljLWl0ZW0tb2JqZWN0LWZpdCwgY29udGFpbik7XG4gICAgICAgIHRvdWNoLWFjdGlvbjogbm9uZTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcbiAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8ZGl2IGlkPVwic3ByZWFkQ29udGFpbmVyXCI+XG4gICAgICAgIDxjb250ZW50PjwvY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuXG5TcHJlYWRJdGVtcyA9IEVsZW1lbnRCYXNlLmNvbXBvc2UoQ2hpbGRyZW5Db250ZW50LCBTcHJlYWRJdGVtcyk7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtc3ByZWFkLWl0ZW1zJywgU3ByZWFkSXRlbXMpO1xuIiwiLyoqXG4gKiBMZXRzIGEgY29tcG9uZW50IGNvbGxlY3RpdmUgdGFrZXMgYXMgaXRzIGNvbnRlbnQgdGhlIGNoaWxkcmVuIG9mIHRoZVxuICogaW5uZXJtb3N0IGFzcGVjdC5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1jaGlsZHJlbi1jb250ZW50XG4gKlxuICovXG5cbi8vIFRPRE86IERvbid0IHJlc3BvbmQgdG8gY2hhbmdlcyBpbiBhdHRyaWJ1dGVzLCBvciBhdCBsZWFzdCBvZmZlciB0aGF0IGFzIGFuXG4vLyBvcHRpb24uXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoaWxkcmVuQ29udGVudCB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIC8vIFVudGlsIHdlIGhhdmUgY29udGVudCBvYnNlcnZpbmcgYWdhaW4sIGZvcmNlIGEgY2FsbCB0byBjb250ZW50Q2hhbmdlZCgpLlxuICAgIC8vIEhBQ0s6IERvIHRoaXMgYXN5bmNocm9ub3VzbHksIHNvIG90aGVyIG1peGlucyBoYXZlIGEgY2hhbmNlIHRvIHNldCB1cFxuICAgIC8vIGJlZm9yZSB0aGlzIGNhbGwuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbnRlbnRDaGFuZ2VkKCkpO1xuICB9XG5cbiAgLy8gVE9ETzogV2FpdCB0byBvYnNlcnZlIGNoYW5nZXMgdW50aWwgd2UgaGF2ZSBhIHNoYWRvdyBET00gaG9zdC4gUmlnaHRcbiAgLy8gbm93LCB0aGUgaW5pdGlhbCBjb2xsZWN0aXZlQ2hhbmdlZCBjYWxsIGNhbiBoYXBwZW4gdG9vIGVhcmx5LlxuICAvLyBUT0RPOiBIYW5kbGUgY2FzZSB3aGVyZSBjb21wb25lbnQgaXMgaW5zdGFudGlhdGVkIG91dCBvZiBET00sIHRoZW5cbiAgLy8gYXR0YWNoZWQuXG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkKCkge1xuICAvLyAgIC8vIGNvbnNvbGUubG9nKHRoaXMubG9jYWxOYW1lICsgXCIgY29sbGVjdGl2ZUNoYW5nZWQ6IFwiICsgdGhpcy5jb2xsZWN0aXZlLmFzcGVjdHMubGVuZ3RoKTtcbiAgLy8gICBsZXQgaW5uZXJtb3N0ID0gdGhpcy5jb2xsZWN0aXZlLmlubmVybW9zdEVsZW1lbnQ7XG4gIC8vICAgbGV0IGlubmVybW9zdEhvc3QgPSBCYXNpYy5Db250ZW50SGVscGVycy5nZXRIb3N0KGlubmVybW9zdCk7XG4gIC8vXG4gIC8vICAgLy8gT3B0aW1pemUgZm9yIHRoZSBjYXNlIHdoZXJlIHRoZSBjb2xsZWN0aXZlJ3MgY2hhbmdlZCwgYnV0IGl0c1xuICAvLyAgIC8vIGlubmVybW9zdCBhc3BlY3QgaXMgc3RpbGwgdGhlIHNhbWUuIEluIHRoYXQgY2FzZSwgd2UgZG9uJ3Qgd2FudCB0b1xuICAvLyAgIC8vIGJvdGhlciB0ZWFyaW5nIGRvd24gYW5kIHRoZW4gcmVjcmVhdGluZyBvdXIgY29udGVudENoYW5nZWQgaGFuZGxlci5cbiAgLy8gICAvLyBUT0RPOiBUaGlzIGN1cnJlbnRseSBvbmx5IHRyYWNrcyBvbmUgbGV2ZWwgb2YgaG9zdC4gRm9yIHJvYnVzdG5lc3MsXG4gIC8vICAgLy8gdGhpcyBzaG91bGQgdHJhY2sgdGhlIGNoYWluIG9mIGhvc3RzLlxuICAvLyAgIGlmIChpbm5lcm1vc3QgPT09IHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0XG4gIC8vICAgICAgICYmIGlubmVybW9zdEhvc3QgPT09IHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0SG9zdCkge1xuICAvLyAgICAgLy8gV2Ugc2hvdWxkIGFscmVhZHkgYmUgb2JzZXJ2aW5nIGNoYW5nZXMgb24gdGhlIGlubmVybW9zdCBhc3BlY3QuXG4gIC8vICAgICAvLyBFdmVuIHRob3VnaCB0aGUgY29udGVudCBoYXNuJ3QgYWN0dWFsbHkgY2hhbmdlZCwgd2Ugd2FudCB0byBnaXZlIHRoZVxuICAvLyAgICAgLy8gbmV3IGFzcGVjdHMgYSBjaGFuY2UgdG8gcmVzcG9uZCB0byBjb250ZW50Q2hhbmdlZC5cbiAgLy8gICAgIHRoaXMuY29sbGVjdGl2ZS5jb250ZW50Q2hhbmdlZCgpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICAvLyBBIG5ldyBhc3BlY3QgaXMgbm93IGlubmVybW9zdC5cbiAgLy8gICBpZiAodGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QgJiYgdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QuX2NvbnRlbnRDaGFuZ2VPYnNlcnZlcikge1xuICAvLyAgICAgLy8gU3RvcCBvYnNlcnZpbmcgY2hhbmdlcyBvbiB0aGUgb2xkIGlubmVybW9zdCBhc3BlY3QuXG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhcInN0b3BwaW5nIG9ic2VydmF0aW9uIG9mIGNoYW5nZXMgb24gb2xkIGlubmVybW9zdCBhc3BlY3RcIik7XG4gIC8vICAgICBCYXNpYy5Db250ZW50SGVscGVycy5vYnNlcnZlQ29udGVudENoYW5nZXModGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QsIG51bGwpO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBCYXNpYy5Db250ZW50SGVscGVycy5vYnNlcnZlQ29udGVudENoYW5nZXMoaW5uZXJtb3N0LCBmdW5jdGlvbigpIHtcbiAgLy8gICAgIC8vIFJlc2V0IG1lbW9pemVkIGNvbnRlbnQuXG4gIC8vICAgICB0aGlzLl9jb250ZW50ID0gbnVsbDtcbiAgLy9cbiAgLy8gICAgIC8vIExldCBjb2xsZWN0aXZlIGtub3cgY29udGVudCBoYXMgY2hhbmdlZC5cbiAgLy8gICAgIHRoaXMuY29sbGVjdGl2ZS5jb250ZW50Q2hhbmdlZCgpO1xuICAvLyAgIH0uYmluZCh0aGlzKSk7XG4gIC8vXG4gIC8vICAgdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QgPSBpbm5lcm1vc3Q7XG4gIC8vICAgdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RIb3N0ID0gaW5uZXJtb3N0SG9zdDtcbiAgLy8gfVxuXG4gIGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnY29udGVudC1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsYXR0ZW5lZCBjb250ZW50IG9mIHRoaXMgY29sbGVjdGl2ZS5cbiAgICpcbiAgICogVGhlIGNvbnRlbnQgaXMgdGhlIGNvbGxlY3RpdmUgb2Ygbm9kZXMgd2hpY2ggYXJlIGNoaWxkcmVuIG9mIHRoZVxuICAgKiBjb2xsZWN0aXZlJ3MgaW5uZXJtb3N0IGFzcGVjdC4gSWYgYW55IG9mIHRob3NlIG5vZGVzIGFyZSBgPGNvbnRlbnQ+YFxuICAgKiBlbGVtZW50cywgdGhvc2UgYXJlIHJlY3Vyc2l2ZWx5IGV4cGFuZGVkLlxuICAgKlxuICAgKiBAcHJvcGVydHkgY29udGVudFxuICAgKiBAdHlwZSBbT2JqZWN0XVxuICAgKi9cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgLy8gaWYgKCF0aGlzLl9jb250ZW50KSB7XG4gICAgLy8gICBsZXQgaW5uZXJtb3N0ID0gdGhpcy5jb2xsZWN0aXZlLmlubmVybW9zdEVsZW1lbnQ7XG4gICAgLy8gICBpZiAoaW5uZXJtb3N0KSB7XG4gICAgLy8gICAgIHRoaXMuX2NvbnRlbnQgPSBCYXNpYy5Db250ZW50SGVscGVycy5mbGF0dGVuQ2hpbGRyZW4oaW5uZXJtb3N0KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy8gcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgcmV0dXJuIGV4cGFuZENvbnRlbnRFbGVtZW50cyh0aGlzLmNoaWxkcmVuKTtcbiAgfVxuXG59O1xuXG5cbi8qXG4gKiBHaXZlbiBhIGFycmF5IG9mIG5vZGVzLCByZXR1cm4gYSBuZXcgYXJyYXkgd2l0aCBhbnkgY29udGVudCBlbGVtZW50cyBleHBhbmRlZFxuICogdG8gdGhlIG5vZGVzIGRpc3RyaWJ1dGVkIHRvIHRoYXQgY29udGVudCBlbGVtZW50LiBUaGlzIHJ1bGUgaXMgYXBwbGllZFxuICogcmVjdXJzaXZlbHkuXG4gKlxuICogSWYgaW5jbHVkZVRleHROb2RlcyBpcyB0cnVlLCB0ZXh0IG5vZGVzIHdpbGwgYmUgaW5jbHVkZWQsIGFzIGluIHRoZVxuICogc3RhbmRhcmQgY2hpbGROb2RlcyBwcm9wZXJ0eTsgYnkgZGVmYXVsdCwgdGhpcyBza2lwcyB0ZXh0IG5vZGVzLCBsaWtlIHRoZVxuICogc3RhbmRhcmQgY2hpbGRyZW4gcHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZENvbnRlbnRFbGVtZW50cyhub2RlcywgaW5jbHVkZVRleHROb2Rlcykge1xuICBsZXQgZXhwYW5kZWQgPSBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwobm9kZXMsIG5vZGUgPT4ge1xuICAgIC8vIFdlIHdhbnQgdG8gc2VlIGlmIHRoZSBub2RlIGlzIGFuIGluc3RhbmNlb2YgSFRNTENvbnRlbnRFbGVtZW50LCBidXRcbiAgICAvLyB0aGF0IGNsYXNzIHdvbid0IGV4aXN0IGlmIHRoZSBicm93c2VyIHRoYXQgZG9lc24ndCBzdXBwb3J0IG5hdGl2ZVxuICAgIC8vIFNoYWRvdyBET00gYW5kIGlmIHRoZSBTaGFkb3cgRE9NIHBvbHlmaWxsIGhhc24ndCBiZWVuIGxvYWRlZC4gSW5zdGVhZCxcbiAgICAvLyB3ZSBkbyBhIHNpbXBsaXN0aWMgY2hlY2sgdG8gc2VlIGlmIHRoZSB0YWcgbmFtZSBpcyBcImNvbnRlbnRcIi5cbiAgICBpZiAobm9kZS5sb2NhbE5hbWUgJiYgbm9kZS5sb2NhbE5hbWUgPT09IFwiY29udGVudFwiKSB7XG4gICAgICAvLyBjb250ZW50IGVsZW1lbnQ7IHVzZSBpdHMgZGlzdHJpYnV0ZWQgbm9kZXMgaW5zdGVhZC5cbiAgICAgIGxldCBkaXN0cmlidXRlZE5vZGVzID0gbm9kZS5nZXREaXN0cmlidXRlZE5vZGVzKCk7XG4gICAgICByZXR1cm4gZGlzdHJpYnV0ZWROb2RlcyA/XG4gICAgICAgIGV4cGFuZENvbnRlbnRFbGVtZW50cyhkaXN0cmlidXRlZE5vZGVzLCBpbmNsdWRlVGV4dE5vZGVzKSA6XG4gICAgICAgIFtdO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAvLyBQbGFpbiBlbGVtZW50OyB1c2UgYXMgaXMuXG4gICAgICByZXR1cm4gW25vZGVdO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFRleHQgJiYgaW5jbHVkZVRleHROb2Rlcykge1xuICAgICAgLy8gVGV4dCBub2RlLlxuICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ29tbWVudCwgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiwgZXRjLjsgc2tpcC5cbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH0pO1xuICBsZXQgZmxhdHRlbmVkID0gW10uY29uY2F0KC4uLmV4cGFuZGVkKTtcbiAgcmV0dXJuIGZsYXR0ZW5lZDtcbn1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgYSBjbGljayB0byBpdGVtIHNlbGVjdGlvbi5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1jbGljay1zZWxlY3Rpb25cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlja1NlbGVjdGlvbiB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIC8qXG4gICAgICogUkVWSUVXOiBXaGljaCBldmVudCBzaG91bGQgd2UgbGlzdGVuIHRvIGhlcmU/XG4gICAgICpcbiAgICAgKiBUaGUgc3RhbmRhcmQgdXNlIGZvciB0aGlzIGFzcGVjdCBpcyBpbiBsaXN0IGJveGVzLiBMaXN0IGJveGVzIGRvbid0XG4gICAgICogYXBwZWFyIHRvIGJlIGNvbnNpc3RlbnQgd2l0aCByZWdhcmQgdG8gd2hldGhlciB0aGV5IHNlbGVjdCBvbiBtb3VzZWRvd25cbiAgICAgKiBvciBjbGljay9tb3VzZXVwLlxuICAgICAqL1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnQgPT4ge1xuICAgICAgc2VsZWN0VGFyZ2V0KHRoaXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAvLyBOb3RlOiBXZSBkb24ndCBjYWxsIHByZXZlbnREZWZhdWx0IGhlcmUuIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGZvclxuICAgICAgLy8gbW91c2Vkb3duIGluY2x1ZGVzIHNldHRpbmcga2V5Ym9hcmQgZm9jdXMgaWYgdGhlIGVsZW1lbnQgZG9lc24ndFxuICAgICAgLy8gYWxyZWFkeSBoYXZlIHRoZSBmb2N1cywgYW5kIHdlIHdhbnQgdG8gcHJlc2VydmUgdGhhdCBiZWhhdmlvci5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgLy8gc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHt9XG5cbn1cblxuLy8gVE9ETzogSGFuZGxlIHRoZSBjYXNlIHdoZXJlIGEgbGlzdCBpdGVtIGhhcyBzdWJlbGVtZW50cy4gV2FsayB1cCB0aGUgRE9NXG4vLyBoaWVyYXJjaHkgdW50aWwgd2UgZmluZCBhbiBpdGVtIGluIHRoZSBsaXN0LCBvciBjb21lIGJhY2sgdG8gdGhpcyBlbGVtZW50LFxuLy8gaW4gd2hpY2ggY2FzZSB0aGUgZWxlbWVudCB0aGF0IHdhcyB0YXBwZWQgaXNuJ3QgYW4gaXRlbSAoYW5kIHNob3VsZCBiZVxuLy8gaWdub3JlZCkuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gIGxldCBpbmRleCA9IGVsZW1lbnQuaW5kZXhPZkl0ZW0gJiYgZWxlbWVudC5pbmRleE9mSXRlbSh0YXJnZXQpO1xuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICB9XG59XG4iLCIvKipcbiAqIEFzcGVjdCB0aGF0IGxldHMgYSBjb21wb25lbnQgY29sbGVjdGl2ZSBET00gY29udGVudCBhcyBsaXN0IGl0ZW1zLlxuICpcbiAqIEF1eGlsaWFyeSBlbGVtZW50cyB3aGljaCBhcmUgbm90IG5vcm1hbGx5IHZpc2libGUgYXJlIGZpbHRlcmVkIG91dC4gRm9yIG5vdyxcbiAqIEZvciBub3csIHRoZXNlIGFyZTogbGluaywgc2NyaXB0LCBzdHlsZSwgYW5kIHRlbXBsYXRlLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWNvbnRlbnQtaXRlbXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50SXRlbXMge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcsIHNlbGVjdGVkKTtcbiAgfVxuXG4gIGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgIHRoaXMuX2l0ZW1zID0gbnVsbDtcbiAgICB0aGlzLml0ZW1zQ2hhbmdlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBvc2l0aW9uYWwgaW5kZXggZm9yIHRoZSBpbmRpY2F0ZWQgaXRlbS5cbiAgICpcbiAgICogQG1ldGhvZCBpbmRleE9mSXRlbVxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBUaGUgaXRlbSB3aG9zZSBpbmRleCBpcyByZXF1ZXN0ZWQuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgaXRlbSwgb3IgLTEgaWYgbm90IGZvdW5kLlxuICAgKi9cbiAgaW5kZXhPZkl0ZW0oaXRlbSkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90aGluZy4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5XG4gIC8vIG90aGVyIGFzcGVjdHMgaW4gdGhlIGNvbGxlY3RpdmUuXG4gIGl0ZW1BZGRlZChpdGVtKSB7fVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcblxuICAgIC8vIFBlcmZvcm0gcGVyLWl0ZW0gaW5pdGlhbGl6YXRpb24uXG4gICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKCFpdGVtLl9pdGVtSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgLy8gQlVHOiBJZiBhbiBhc3BlY3QgaXMgYXNzaW1pbGF0ZWQgYWZ0ZXIgQ29udGVudEl0ZW1zLCB0aGVuIGFsbCB0aGVcbiAgICAgICAgLy8gaXRlbXMgYXJlIGFscmVhZHkgaW5pdGlhbGl6ZWQsIGFuZCB0aGUgbmV3IGFzcGVjdCB3b24ndCBoYXZlIGFuXG4gICAgICAgIC8vIG9wcG9ydHVuaXR5IHRvIGRvIGl0cyBvd24gcGVyLWl0ZW0gaW5pdGlhbGl6YXRpb24gaW4gaXRlbUFkZGVkLlxuICAgICAgICB0aGlzLml0ZW1BZGRlZChpdGVtKTtcbiAgICAgICAgaXRlbS5faXRlbUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnaXRlbXMtY2hhbmdlZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBvdXRlcm1vc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNldCBvZiBpdGVtcyBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQHByb3BlcnR5IGl0ZW1zXG4gICAqIEB0eXBlIFtPYmplY3RdXG4gICAqL1xuICAvLyBUT0RPOiBwcm9wZXJ0eSBub3RpZmljYXRpb25zIHNvIGVsZW1lbnRzIGNhbiBiaW5kIHRvIHRoaXMgcHJvcGVydHlcbiAgZ2V0IGl0ZW1zKCkge1xuICAgIGlmICh0aGlzLl9pdGVtcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9pdGVtcyA9IGZpbHRlckF1eGlsaWFyeUVsZW1lbnRzKHRoaXMuY29udGVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgfVxuXG59XG5cblxuLy8gUmV0dXJuIHRoZSBnaXZlbiBlbGVtZW50cywgZmlsdGVyaW5nIG91dCBhdXhpbGlhcnkgZWxlbWVudHMgdGhhdCBhcmVuJ3Rcbi8vIHR5cGljYWxseSB2aXNpYmxlLiBJdGVtcyB3aGljaCBhcmUgbm90IGVsZW1lbnRzIGFyZSByZXR1cm5lZCBhcyBpcy5cbmZ1bmN0aW9uIGZpbHRlckF1eGlsaWFyeUVsZW1lbnRzKGl0ZW1zKSB7XG4gIGxldCBhdXhpbGlhcnlUYWdzID0gW1xuICAgICdsaW5rJyxcbiAgICAnc2NyaXB0JyxcbiAgICAnc3R5bGUnLFxuICAgICd0ZW1wbGF0ZSdcbiAgXTtcbiAgcmV0dXJuIFtdLmZpbHRlci5jYWxsKGl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuICFpdGVtLmxvY2FsTmFtZSB8fCBhdXhpbGlhcnlUYWdzLmluZGV4T2YoaXRlbS5sb2NhbE5hbWUpIDwgMDtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCBjaGFuZ2UuXG4gKlxuICogQGV2ZW50IGl0ZW1zLWNoYW5nZWRcbiAqL1xuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFwcyBkaXJlY3Rpb24gc2VtYW50aWNzIChnb0xlZnQsIGdvUmlnaHQsIGV0Yy4pIHRvIHNlbGVjdGlvblxuICogc2VtYW50aWNzIChzZWxlY3RQcmV2aW91cywgc2VsZWN0TmV4dCwgZXRjLikuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtZGlyZWN0aW9uLXNlbGVjdGlvblxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3Rpb25TZWxlY3Rpb24ge1xuXG4gIGdvRG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3ROZXh0KCk7XG4gIH1cblxuICBnb0VuZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RMYXN0KCk7XG4gIH1cblxuICBnb0xlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0UHJldmlvdXMoKTtcbiAgfVxuXG4gIGdvUmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TmV4dCgpO1xuICB9XG5cbiAgZ29TdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RGaXJzdCgpO1xuICB9XG5cbiAgZ29VcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQcmV2aW91cygpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMuIFRoZXNlIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBzZWxlY3RGaXJzdCgpIHt9XG4gIHNlbGVjdExhc3QoKSB7fVxuICBzZWxlY3ROZXh0KCkge31cbiAgc2VsZWN0UHJldmlvdXMoKSB7fVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoRGlyZWN0aW9uU2VsZWN0aW9uLnByb3RvdHlwZSwge1xuICBzZWxlY3RGaXJzdDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIHNlbGVjdExhc3Q6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBzZWxlY3ROZXh0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgc2VsZWN0UHJldmlvdXM6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpXG59KTtcbiIsIi8qXG4gKiBBIHZlcnkgc2ltcGxlIHNldCBvZiBoZWxwZXJzIHRvIHN1cHBvcnQgdGhlIHVzZSBvZiBnZW5lcmljIHN0eWxpbmcgaW4gYVxuICogY29tcG9uZW50LlxuICpcbiAqIEJ5IGRlZmF1bHQsIGEgY29tcG9uZW50IHNob3VsZCBwcm92aWRlIGEgbWluaW1hbCB2aXN1YWwgcHJlc2VudGF0aW9uIHRoYXRcbiAqIGFsbG93cyB0aGUgY29tcG9uZW50IHRvIGZ1bmN0aW9uLiBIb3dldmVyLCB0aGUgbW9yZSBzdHlsaW5nIHRoZSBjb21wb25lbnRcbiAqIHByb3ZpZGVzIGJ5IGRlZmF1bHQsIHRoZSBoYXJkZXIgaXQgYmVjb21lcyB0byBnZXQgdGhlIGNvbXBvbmVudCB0byBmaXQgaW5cbiAqIGluIG90aGVyIHNldHRpbmdzLiBFYWNoIENTUyBydWxlIGhhcyB0byBiZSBvdmVycmlkZGVuLiBXb3JzZSwgbmV3IENTUyBydWxlc1xuICogYWRkZWQgdG8gdGhlIGRlZmF1bHQgc3R5bGUgd29uJ3QgYmUgb3ZlcnJpZGRlbiBieSBkZWZhdWx0LCBtYWtpbmcgaXQgaGFyZCB0b1xuICoga25vdyB3aGV0aGVyIGEgbmV3IHZlcnNpb24gb2YgYSBjb21wb25lbnQgd2lsbCBzdGlsbCBsb29rIG9rYXkuXG4gKlxuICogQXMgYSBjb21wcm9taXNlLCB0aGUgc2ltcGxlIFBvbHltZXIgYmVoYXZpb3IgaGVyZSBkZWZpbmVzIGEgXCJnZW5lcmljXCJcbiAqIGF0dHJpYnV0ZS4gVGhpcyBhdHRyaWJ1dGUgaXMgbm9ybWFsbHkgc2V0IGJ5IGRlZmF1bHQsIGFuZCBzdHlsZXMgY2FuIGJlXG4gKiB3cml0dGVuIHRoYXQgYXBwbHkgb25seSB3aGVuIHRoZSBnZW5lcmljIGF0dHJpYnV0ZSBpcyBzZXQuIFRoaXMgYWxsb3dzIHRoZVxuICogY29uc3RydWN0aW9uIG9mIENTUyBydWxlcyB0aGF0IHdpbGwgb25seSBhcHBseSB0byBnZW5lcmljIGNvbXBvbmVudHMgbGlrZVxuICpcbiAqICAgICA6aG9zdChbZ2VuZXJpYz1cIlwiXSkge1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIFRoaXMgbWFrZXMgaXQgZWFzeSB0byByZW1vdmUgYWxsIGRlZmF1bHQgc3R5bGluZyAtLSBzZXQgdGhlIGdlbmVyaWMgYXR0cmlidXRlXG4gKiB0byBmYWxzZSwgYW5kIGFsbCBkZWZhdWx0IHN0eWxpbmcgd2lsbCBiZSByZW1vdmVkLlxuICpcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmljIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5nZW5lcmljID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2dlbmVyaWMnKSB8fCB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIGNvbXBvbmVudCB3b3VsZCBsaWtlIHRvIHJlY2VpdmUgZ2VuZXJpYyBzdHlsaW5nLlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIHRydWUgYnkgZGVmYXVsdCDigJTCoHNldCBpdCB0byBmYWxzZSB0byB0dXJuIG9mZiBhbGxcbiAgICogZ2VuZXJpYyBzdHlsZXMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIGFwcGx5IGN1c3RvbSBzdHlsaW5nOyB5b3Ugd29uJ3RcbiAgICogaGF2ZSB0byBleHBsaWNpdGx5IG92ZXJyaWRlIHN0eWxpbmcgeW91IGRvbid0IHdhbnQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBnZW5lcmljXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgZ2V0IGdlbmVyaWMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dlbmVyaWM7XG4gIH1cblxuICAvLyBXZSByb2xsIG91ciBvd24gYXR0cmlidXRlIHNldHRpbmcgc28gdGhhdCBhbiBleHBsaWNpdGx5IGZhbHNlIHZhbHVlIHNob3dzXG4gIC8vIHVwIGFzIGdlbmVyaWM9XCJmYWxzZVwiLlxuICBzZXQgZ2VuZXJpYyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSAhPT0gJ2ZhbHNlJyk7XG4gICAgfVxuICAgIHRoaXMuX2dlbmVyaWMgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAvLyBFeHBsaWNpdGx5IHVzZSBmYWxzZSBzdHJpbmcuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZ2VuZXJpYycsICdmYWxzZScpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgLy8gRXhwbGljaXRseSByZW1vdmUgYXR0cmlidXRlLlxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2dlbmVyaWMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbXB0eSBzdHJpbmcgdG8gZ2V0IGF0dHJpYnV0ZSB0byBhcHBlYXIgd2l0aCBubyB2YWx1ZS5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdnZW5lcmljJywgJycpO1xuICAgIH1cbiAgfVxuXG59O1xuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFuYWdlcyBzZWxlY3Rpb24gc2VtYW50aWNzIGZvciBpdGVtcyBpbiBhIGxpc3QuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtaXRlbS1zZWxlY3Rpb25cbiAqL1xuXG5cbi8qKlxuICogRmlyZXMgd2hlbiB0aGUgc2VsZWN0ZWRJdGVtIHByb3BlcnR5IGNoYW5nZXMuXG4gKlxuICogQGV2ZW50IHNlbGVjdGVkLWl0ZW0tY2hhbmdlZFxuICogQHBhcmFtIGRldGFpbC5zZWxlY3RlZEl0ZW0gVGhlIG5ldyBzZWxlY3RlZCBpdGVtLlxuICogQHBhcmFtIGRldGFpbC5wcmV2aW91c0l0ZW0gVGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgaXRlbS5cbiAqL1xuXG4vKipcbiAqIEZpcmVzIHdoZW4gdGhlIHNlbGVjdGVkSW5kZXggcHJvcGVydHkgY2hhbmdlcy5cbiAqXG4gKiBAZXZlbnQgc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkXG4gKiBAcGFyYW0gZGV0YWlsLnNlbGVjdGVkSW5kZXggVGhlIG5ldyBzZWxlY3RlZCBpbmRleC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtU2VsZWN0aW9uIHtcblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge31cblxuICBnZXQgY2FuU2VsZWN0TmV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuU2VsZWN0TmV4dDtcbiAgfVxuICBzZXQgY2FuU2VsZWN0TmV4dChjYW5TZWxlY3ROZXh0KSB7XG4gICAgdGhpcy5fY2FuU2VsZWN0TmV4dCA9IGNhblNlbGVjdE5leHQ7XG4gIH1cblxuICBnZXQgY2FuU2VsZWN0UHJldmlvdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhblNlbGVjdFByZXZpb3VzO1xuICB9XG4gIHNldCBjYW5TZWxlY3RQcmV2aW91cyhjYW5TZWxlY3RQcmV2aW91cykge1xuICAgIHRoaXMuX2NhblNlbGVjdFByZXZpb3VzID0gY2FuU2VsZWN0UHJldmlvdXM7XG4gIH1cblxuICBpdGVtQWRkZWQoaXRlbSkge1xuICAgIHRoaXMuYXBwbHlTZWxlY3Rpb24oaXRlbSwgaXRlbSA9PT0gdGhpcy5zZWxlY3RlZEl0ZW0pO1xuICB9XG5cbiAgaXRlbXNDaGFuZ2VkKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkSXRlbSk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgLy8gU2VsZWN0ZWQgaXRlbSBpcyBubyBsb25nZXIgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIGl0ZW1zLlxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBudWxsO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uUmVxdWlyZWQpIHtcbiAgICAgICAgLy8gRW5zdXJlIHNlbGVjdGlvbiwgYnV0IGRvIHRoaXMgaW4gdGhlIG5leHQgdGljayB0byBnaXZlIG90aGVyXG4gICAgICAgIC8vIGFzcGVjdHMgYSBjaGFuY2UgdG8gZG8gdGhlaXIgb3duIGl0ZW1zQ2hhbmdlZCB3b3JrLlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVuc3VyZVNlbGVjdGlvbih0aGlzKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBpdGVtIHdoaWNoIGlzIGN1cnJlbnRseSBzZWxlY3RlZCwgb3IgLTEgaWYgdGhlcmUgaXMgbm9cbiAgICogc2VsZWN0aW9uLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0ZWRJbmRleFxuICAgKiBAdHlwZSBOdW1iZXJcbiAgICovXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbTtcblxuICAgIGlmIChzZWxlY3RlZEl0ZW0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8vIFRPRE86IE1lbW9pemVcbiAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4T2ZJdGVtKHNlbGVjdGVkSXRlbSk7XG5cbiAgICAvLyBJZiBpbmRleCA9IC0xLCBzZWxlY3Rpb24gd2Fzbid0IGZvdW5kLiBNb3N0IGxpa2VseSBjYXVzZSBpcyB0aGF0IHRoZVxuICAgIC8vIERPTSB3YXMgbWFuaXB1bGF0ZWQgZnJvbSB1bmRlcm5lYXRoIHVzLlxuICAgIC8vIFRPRE86IE9uY2Ugd2UgdHJhY2sgY29udGVudCBjaGFuZ2VzLCB0dXJuIHRoaXMgaW50byBhbiBleGNlcHRpb24uXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIGxldCBpdGVtO1xuICAgIGlmIChpbmRleCA8IDAgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpdGVtID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuXG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZC1pbmRleC1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBzZWxlY3RlZEluZGV4OiBpbmRleCxcbiAgICAgICAgICB2YWx1ZTogaW5kZXggLy8gZm9yIFBvbHltZXIgYmluZGluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRJdGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLCBvciBudWxsIGlmIHRoZXJlIGlzIG5vIHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGVkSXRlbVxuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIC8vIFRPRE86IENvbmZpcm0gaXRlbSBpcyBpbiBpdGVtcyBiZWZvcmUgc2VsZWN0aW5nLlxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICBsZXQgcHJldmlvdXNJdGVtID0gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICAgIGlmIChwcmV2aW91c0l0ZW0pIHtcbiAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBzZWxlY3Rpb24uXG4gICAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKHByZXZpb3VzSXRlbSwgZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKGl0ZW0sIHRydWUpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFJhdGlvbmFsaXplIHdpdGggc2VsZWN0ZWRJbmRleCBzbyB3ZSdyZSBub3QgcmVjYWxjdWxhdGluZyBpdGVtXG4gICAgLy8gb3IgaW5kZXggaW4gZWFjaCBzZXR0ZXIuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleE9mSXRlbShpdGVtKTtcbiAgICB1cGRhdGVQb3NzaWJsZU5hdmlnYXRpb25zKHRoaXMsIGluZGV4KTtcblxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBzZWxlY3RlZEl0ZW06IGl0ZW0sXG4gICAgICAgICAgcHJldmlvdXNJdGVtOiBwcmV2aW91c0l0ZW0sXG4gICAgICAgICAgdmFsdWU6IGl0ZW0gLy8gZm9yIFBvbHltZXIgYmluZGluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdEZpcnN0XG4gICAqL1xuICBzZWxlY3RGaXJzdCgpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgMCk7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgbGlzdCBzaG91bGQgYWx3YXlzIGhhdmUgYSBzZWxlY3Rpb24gKGlmIGl0IGhhcyBpdGVtcykuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3Rpb25SZXF1aXJlZFxuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqL1xuICBnZXQgc2VsZWN0aW9uUmVxdWlyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblJlcXVpcmVkO1xuICB9XG4gIHNldCBzZWxlY3Rpb25SZXF1aXJlZChzZWxlY3Rpb25SZXF1aXJlZCkge1xuICAgIHRoaXMuX3NlbGVjdGlvblJlcXVpcmVkID0gc2VsZWN0aW9uUmVxdWlyZWQ7XG4gICAgZW5zdXJlU2VsZWN0aW9uKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgbGFzdCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdExhc3RcbiAgICovXG4gIHNlbGVjdExhc3QoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIHRoaXMuaXRlbXMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBuZXh0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0TmV4dFxuICAgKi9cbiAgc2VsZWN0TmV4dCgpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgdGhpcy5zZWxlY3RlZEluZGV4ICsgMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdFByZXZpb3VzXG4gICAqL1xuICBzZWxlY3RQcmV2aW91cygpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgdGhpcy5zZWxlY3RlZEluZGV4IC0gMSk7XG4gIH1cblxufVxuXG5cbi8vIElmIG5vIGl0ZW0gaXMgc2VsZWN0ZWQsIHNlbGVjdCBhIGRlZmF1bHQgaXRlbS5cbi8vIFRPRE86IElmIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIGl0ZW0gaGFzIGJlZW4gZGVsZXRlZCwgdHJ5IHRvIHNlbGVjdCBhblxuLy8gaXRlbSBhZGphY2VudCB0byB0aGUgcG9zaXRpb24gaXQgaGVsZC5cbmZ1bmN0aW9uIGVuc3VyZVNlbGVjdGlvbihlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudC5zZWxlY3RlZEl0ZW0gJiYgZWxlbWVudC5pdGVtcyAmJiBlbGVtZW50Lml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSAwO1xuICB9XG59XG5cbi8vIEVuc3VyZSB0aGUgZ2l2ZW4gaW5kZXggaXMgd2l0aGluIGJvdW5kcywgYW5kIHNlbGVjdCBpdCBpZiBpdCdzIG5vdCBhbHJlYWR5XG4vLyBzZWxlY3RlZC5cbmZ1bmN0aW9uIHNlbGVjdEluZGV4KGVsZW1lbnQsIGluZGV4KSB7XG4gIGxldCBib3VuZGVkSW5kZXggPSBNYXRoLm1heChNYXRoLm1pbihpbmRleCwgZWxlbWVudC5pdGVtcy5sZW5ndGggLSAxKSwgMCk7XG4gIGxldCBwcmV2aW91c0luZGV4ID0gZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICBpZiAocHJldmlvdXNJbmRleCAhPT0gYm91bmRlZEluZGV4KSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gYm91bmRlZEluZGV4O1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBGb2xsb3dpbmcgYSBjaGFuZ2UgaW4gc2VsZWN0aW9uLCByZXBvcnQgd2hldGhlciBpdCdzIG5vdyBwb3NzaWJsZSB0b1xuLy8gZ28gbmV4dC9wcmV2aW91cyBmcm9tIHRoZSBnaXZlbiBpbmRleC5cbmZ1bmN0aW9uIHVwZGF0ZVBvc3NpYmxlTmF2aWdhdGlvbnMoZWxlbWVudCwgaW5kZXgpIHtcbiAgbGV0IGNhblNlbGVjdE5leHQ7XG4gIGxldCBjYW5TZWxlY3RQcmV2aW91cztcbiAgbGV0IGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgaWYgKGl0ZW1zID09IG51bGwgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgY2FuU2VsZWN0TmV4dCA9IGZhbHNlO1xuICAgIGNhblNlbGVjdFByZXZpb3VzID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlLiBJZiB0aGVyZSdzIG5vIHNlbGVjdGlvbiwgd2UgZGVjbGFyZSB0aGF0IGl0J3MgYWx3YXlzXG4gICAgLy8gcG9zc2libGUgdG8gZ28gbmV4dC9wcmV2aW91cyB0byBjcmVhdGUgYSBzZWxlY3Rpb24uXG4gICAgY2FuU2VsZWN0TmV4dCA9IHRydWU7XG4gICAgY2FuU2VsZWN0UHJldmlvdXMgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIC8vIE5vcm1hbCBjYXNlOiB3ZSBoYXZlIGFuIGluZGV4IGluIGEgbGlzdCB0aGF0IGhhcyBpdGVtcy5cbiAgICBjYW5TZWxlY3RQcmV2aW91cyA9IChpbmRleCA+IDApO1xuICAgIGNhblNlbGVjdE5leHQgPSAoaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKTtcbiAgfVxuICBlbGVtZW50LmNhblNlbGVjdE5leHQgPSBjYW5TZWxlY3ROZXh0O1xuICBlbGVtZW50LmNhblNlbGVjdFByZXZpb3VzID0gY2FuU2VsZWN0UHJldmlvdXM7XG59XG5cblxuLy8gcHJvcGVydGllczoge1xuLy9cbi8vICAgc2VsZWN0ZWRJbmRleDoge1xuLy8gICAgIHR5cGU6IE51bWJlclxuLy8gICB9XG4vL1xuLy8gICBzZWxlY3RlZEl0ZW06IHtcbi8vICAgICB0eXBlOiBPYmplY3Rcbi8vICAgfVxuLy9cbi8vICAgc2VsZWN0aW9uUmVxdWlyZWQ6IHtcbi8vICAgICB0eXBlOiBCb29sZWFuLFxuLy8gICAgIG9ic2VydmVyOiAnc2VsZWN0aW9uUmVxdWlyZWRDaGFuZ2VkJyxcbi8vICAgICB2YWx1ZTogZmFsc2Vcbi8vICAgfVxuLy9cbi8vIH1cbi8vXG4vLyBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbi8vICAgLy8gSEFDSzogUHJveGllZCBnZXR0ZXIvc2V0dGVyIHByb3BlcnRpZXMgbGlrZSB0aGlzIG9uZSBjYW4ndCBiZSBzZXQgdmlhXG4vLyAgIC8vIGF0dHJpYnV0ZXMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUG9seW1lci9wb2x5bWVyL2lzc3Vlcy8yNDU0LiBXZVxuLy8gICAvLyBjdXJyZW50bHkgaGFjayBhcm91bmQgdGhpcyBieSBvbmx5IHJldHVybmluZyBhIHZhbHVlIGZvciB0aGlzIHByb3BlcnR5IGlmXG4vLyAgIC8vIHRoZSBlbGVtZW50IGlzIHJlYWR5LiBBIG5lZ2F0aXZlIHNpZGUgZWZmZWN0IGlzIHRoYXQgaW5zcGVjdGluZyB0aGlzXG4vLyAgIC8vIHByb3BlcnR5IGJlZm9yZSB0aGUgZWxlbWVudCBpcyByZWFkeSB3aWxsIGFsd2F5cyByZXR1cm4gdW5kZWZpbmVkLlxuLy8gICBpZiAodGhpcy5fcmVhZGllZCkge1xuLy8gICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXg7XG4vLyAgIH1cbi8vIH1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIGFkZHMgQVJJQSByb2xlcyBmb3IgbGlzdHMgYW5kIGxpc3QgaXRlbXMuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtYWNjZXNzaWJsZS1saXN0XG4gKi9cblxuLy8gVXNlZCB0byBhc3NpZ24gdW5pcXVlIElEcyB0byBpdGVtIGVsZW1lbnRzIHdpdGhvdXQgSURzLlxubGV0IGlkQ291bnQgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtc0FjY2Vzc2libGUge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZCk7XG4gICAgdmFyIGl0ZW1JZCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlmIChpdGVtSWQpIHtcbiAgICAgIHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBpdGVtSWQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC8vIEVuc3VyZSB0aGUgb3V0ZXJtb3N0IGFzcGVjdCBoYXMgcm9sZT1cImxpc3Rib3hcIi5cbiAgLy8gY29sbGVjdGl2ZUNoYW5nZWQoKSB7XG4gIC8vXG4gIC8vICAgdmFyIG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gIC8vICAgaWYgKHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0ID09PSBvdXRlcm1vc3QpIHtcbiAgLy8gICAgIC8vIEFscmVhZHkgY29uZmlndXJlZC5cbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgaWYgKHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0KSB7XG4gIC8vICAgICAvLyBSZW1vdmUgQVJJQSBhdHRyaWJ1dGVzIGZyb20gcHJldmlvdXMgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuICAvLyAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgb3V0ZXJtb3N0LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gIC8vXG4gIC8vICAgLy8gRGV0ZXJtaW5lIGEgYmFzZSBpdGVtIElEIGJhc2VkIG9uIHRoaXMgY29tcG9uZW50J3MgaG9zdCdzIG93biBJRC4gVGhpc1xuICAvLyAgIC8vIHdpbGwgYmUgY29tYmluZWQgd2l0aCBhIHVuaXF1ZSBpbnRlZ2VyIHRvIGFzc2lnbiBJRHMgdG8gaXRlbXMgdGhhdCBkb24ndFxuICAvLyAgIC8vIGhhdmUgYW4gZXhwbGljaXQgSUQuIElmIHRoZSBiYXNpYy1saXN0LWJveCBoYXMgSUQgXCJmb29cIiwgdGhlbiBpdHMgaXRlbXNcbiAgLy8gICAvLyB3aWxsIGhhdmUgSURzIHRoYXQgbG9vayBsaWtlIFwiX2Zvb09wdGlvbjFcIi4gSWYgdGhlIGxpc3QgaGFzIG5vIElEIGl0c2VsZixcbiAgLy8gICAvLyBpdHMgaXRlbXMgd2lsbCBnZXQgSURzIHRoYXQgbG9vayBsaWtlIFwiX29wdGlvbjFcIi4gSXRlbSBJRHMgYXJlIHByZWZpeGVkXG4gIC8vICAgLy8gd2l0aCBhbiB1bmRlcnNjb3JlIHRvIGRpZmZlcmVudGlhdGUgdGhlbSBmcm9tIG1hbnVhbGx5LWFzc2lnbmVkIElEcywgYW5kXG4gIC8vICAgLy8gdG8gbWluaW1pemUgdGhlIHBvdGVudGlhbCBmb3IgSUQgY29uZmxpY3RzLlxuICAvL1xuICAvLyAgIC8vIFRPRE86IFRoaXMgY2hlY2sgbm93IGNvbWVzIHRvbyBsYXRlIGZvciBjb21wb25lbnRzIGxpa2UgYmFzaWMtbGlzdC1ib3guXG4gIC8vICAgLy8gV2UgbWF5IG5lZWQgdG8gZHluYW1pY2FsbHkgdXBkYXRlIHRoZSBpdGVtIElEcyB3aGVuZXZlciB0aGUgY29sbGVjdGlvblxuICAvLyAgIC8vIGNoYW5nZXMsIGFsdGhvdWdoIHRoYXQgcmVxdWlyZXMga2VlcGluZyB0cmFjayBvZiB3aGV0aGVyIHdlJ3ZlIGNoYW5nZWRcbiAgLy8gICAvLyBhbiBpdGVtJ3MgSUQgb3Igd2hldGhlciBpdCdzIGFsd2F5cyBoYWQgdGhhdCBJRC5cbiAgLy8gICB2YXIgZWxlbWVudElkID0gb3V0ZXJtb3N0LmdldEF0dHJpYnV0ZSggXCJpZFwiICk7XG4gIC8vICAgdGhpcy5pdGVtQmFzZUlkID0gZWxlbWVudElkID9cbiAgLy8gICAgICAgXCJfXCIgKyBlbGVtZW50SWQgKyBcIk9wdGlvblwiIDpcbiAgLy8gICAgICAgXCJfb3B0aW9uXCI7XG4gIC8vXG4gIC8vICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QgPSBvdXRlcm1vc3Q7XG4gIC8vIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgb3V0ZXJtb3N0LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG5cbiAgICAvLyBEZXRlcm1pbmUgYSBiYXNlIGl0ZW0gSUQgYmFzZWQgb24gdGhpcyBjb21wb25lbnQncyBob3N0J3Mgb3duIElELiBUaGlzXG4gICAgLy8gd2lsbCBiZSBjb21iaW5lZCB3aXRoIGEgdW5pcXVlIGludGVnZXIgdG8gYXNzaWduIElEcyB0byBpdGVtcyB0aGF0IGRvbid0XG4gICAgLy8gaGF2ZSBhbiBleHBsaWNpdCBJRC4gSWYgdGhlIGJhc2ljLWxpc3QtYm94IGhhcyBJRCBcImZvb1wiLCB0aGVuIGl0cyBpdGVtc1xuICAgIC8vIHdpbGwgaGF2ZSBJRHMgdGhhdCBsb29rIGxpa2UgXCJfZm9vT3B0aW9uMVwiLiBJZiB0aGUgbGlzdCBoYXMgbm8gSUQgaXRzZWxmLFxuICAgIC8vIGl0cyBpdGVtcyB3aWxsIGdldCBJRHMgdGhhdCBsb29rIGxpa2UgXCJfb3B0aW9uMVwiLiBJdGVtIElEcyBhcmUgcHJlZml4ZWRcbiAgICAvLyB3aXRoIGFuIHVuZGVyc2NvcmUgdG8gZGlmZmVyZW50aWF0ZSB0aGVtIGZyb20gbWFudWFsbHktYXNzaWduZWQgSURzLCBhbmRcbiAgICAvLyB0byBtaW5pbWl6ZSB0aGUgcG90ZW50aWFsIGZvciBJRCBjb25mbGljdHMuXG5cbiAgICAvLyBUT0RPOiBUaGlzIGNoZWNrIG5vdyBjb21lcyB0b28gbGF0ZSBmb3IgY29tcG9uZW50cyBsaWtlIGJhc2ljLWxpc3QtYm94LlxuICAgIC8vIFdlIG1heSBuZWVkIHRvIGR5bmFtaWNhbGx5IHVwZGF0ZSB0aGUgaXRlbSBJRHMgd2hlbmV2ZXIgdGhlIGNvbGxlY3Rpb25cbiAgICAvLyBjaGFuZ2VzLCBhbHRob3VnaCB0aGF0IHJlcXVpcmVzIGtlZXBpbmcgdHJhY2sgb2Ygd2hldGhlciB3ZSd2ZSBjaGFuZ2VkXG4gICAgLy8gYW4gaXRlbSdzIElEIG9yIHdoZXRoZXIgaXQncyBhbHdheXMgaGFkIHRoYXQgSUQuXG4gICAgdmFyIGVsZW1lbnRJZCA9IG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApO1xuICAgIHRoaXMuaXRlbUJhc2VJZCA9IGVsZW1lbnRJZCA/XG4gICAgICAgIFwiX1wiICsgZWxlbWVudElkICsgXCJPcHRpb25cIiA6XG4gICAgICAgIFwiX29wdGlvblwiO1xuICB9XG5cbiAgaXRlbUFkZGVkKGl0ZW0pIHtcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgncm9sZScsICdvcHRpb24nKTtcblxuICAgIC8vIEVuc3VyZSBlYWNoIGl0ZW0gaGFzIGFuIElEIHNvIHdlIGNhbiBzZXQgYXJpYS1hY3RpdmVkZXNjZW5kYW50IG9uIHRoZVxuICAgIC8vIG92ZXJhbGwgbGlzdCB3aGVuZXZlciB0aGUgc2VsZWN0aW9uIGNoYW5nZXMuXG4gICAgaWYgKCFpdGVtLmdldEF0dHJpYnV0ZSgnaWQnKSkge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pdGVtQmFzZUlkICsgaWRDb3VudCsrKTtcbiAgICB9XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICAvLyBDYXRjaCB0aGUgY2FzZSB3aGVyZSB0aGUgc2VsZWN0aW9uIGlzIHJlbW92ZWQuXG4gICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5vdXRlcm1vc3RBdHRhY2hlZC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH1cbiAgfVxuXG59XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYW5hZ2VzIHRoZSBrZXlib2FyZCBmb2N1cyBhbmQga2V5ZG93biBoYW5kbGluZyBmb3IgYSBjb21wb25lbnQuXG4gKlxuICogVGhpcyBhc3BlY3QgZW5zdXJlcyB0aGF0IGl0cyBvbmx5IHRoZSBvdXRlcm1vc3QgYXNwZWN0IGluIGEgY29sbGVjdGl2ZSB0aGF0IGlzXG4gKiBsaXN0ZW5pbmcgZm9yIGtleWJvYXJkIGV2ZW50cy5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1rZXlib2FyZFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkIHtcblxuICAvKlxuICAgKiBXaGVuIHRoZSBjb2xsZWN0aXZlIGNoYW5nZXMsIHN0b3AgbGlzdGVuaW5nIGZvciBrZXlib2FyZCBldmVudHMgb25cbiAgICogd2hpY2hldmVyIGFzcGVjdCB3YXMgcHJldmlvdXNseSB0aGUgb3V0ZXJtb3N0IGFzcGVjdCwgYW5kIHN0YXJ0IGxpc3RlbmluZ1xuICAgKiB0byBrZXlib2FyZCBldmVudHMgb24gd2hpY2hldmVyIGFzcGVjdCBpcyBub3cgdGhlIG5ldyBvdXRlcm1vc3QgYXNwZWN0LlxuICAgKi9cbiAgLy8gVE9ETzogRG8gd2UgbmVlZCB0byBzdGFydC9zdG9wIGxpc3RlbmluZyB3aGVuIGF0dGFjaGVkL2RldGFjaGVkLCBvciBpc1xuICAvLyB0aGF0IGhhbmRsZWQgYXV0b21hdGljYWxseT9cbiAgLy8gY29sbGVjdGl2ZUNoYW5nZWQ6IGZ1bmN0aW9uKCkge1xuICAvL1xuICAvLyAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLmNvbGxlY3RpdmUub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gIC8vICAgaWYgKG91dGVybW9zdCA9PT0gdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QpIHtcbiAgLy8gICAgIC8vIFNob3VsZCBhbHJlYWR5IGJlIGxpc3RlbmluZyB0byBldmVudHMgb24gdGhlIG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCkge1xuICAvLyAgICAgLy8gQ2xlYW4gdXAgdGhlIHByZXZpb3VzIGFzcGVjdCB0aGF0IHdhcyBoYW5kbGluZyB0aGUga2V5Ym9hcmQuXG4gIC8vXG4gIC8vICAgICBpZiAodGhpcy5fcHJldmlvdXNUYWJJbmRleCkge1xuICAvLyAgICAgICAvLyBSZXN0b3JlIHByZXZpb3VzIHRhYiBpbmRleC5cbiAgLy8gICAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3Quc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIHRoaXMuX3ByZXZpb3VzVGFiSW5kZXgpO1xuICAvLyAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgLy8gQXNwZWN0IGRpZG4ndCBoYXZlIGEgdGFiIGluZGV4IGJlZm9yZSwgc28gcmVtb3ZlIGl0LlxuICAvLyAgICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG4gIC8vICAgICB9XG4gIC8vXG4gIC8vICAgICAvLyBTdG9wIGxpc3RlbmluZyB0byBldmVudHMgdGhlIHByZXZpb3VzIG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkhhbmRsZXIpO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBpZiAob3V0ZXJtb3N0LmdldEF0dHJpYnV0ZSgndGFiSW5kZXgnKSkge1xuICAvLyAgICAgLy8gTGVhdmUgZXhpc3RpbmcgdGFiIGluZGV4IGluIHBsYWNlLlxuICAvLyAgICAgdGhpcy5fcHJldmlvdXNUYWJJbmRleCA9IG51bGw7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIC8vIE1ha2UgbmV3IG91dGVybW9zdCBhc3BlY3QgZm9jdXNhYmxlLlxuICAvLyAgICAgdGhpcy5fcHJldmlvdXNUYWJJbmRleCA9IG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG4gIC8vICAgICBvdXRlcm1vc3Quc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIDApO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICAvLyBTdGFydCBsaXN0ZW5pbmcgdG8gZXZlbnRzIG9uIHRoZSBuZXcgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgLy8gICBpZiAoIXRoaXMuX2tleWRvd25IYW5kbGVyKSB7XG4gIC8vICAgICB0aGlzLl9rZXlkb3duSGFuZGxlciA9IHRoaXMuX2tleWRvd24uYmluZCh0aGlzKTtcbiAgLy8gICB9XG4gIC8vICAgb3V0ZXJtb3N0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duSGFuZGxlcik7XG4gIC8vXG4gIC8vICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QgPSBvdXRlcm1vc3Q7XG4gIC8vIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgbGV0IGhhbmRsZWQgPSB0aGlzLmtleWRvd24oZXZlbnQpO1xuICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JywgMCk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGtleWRvd24gaGFuZGxlci4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAga2V5ZG93bihldmVudCkge31cblxufSIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgZGlyZWN0aW9uIGtleXMgKExlZnQsIFJpZ2h0LCBldGMuKSB0byBkaXJlY3Rpb24gc2VtYW50aWNzXG4gKiAoZ29MZWZ0LCBnb1JpZ2h0LCBldGMuKS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1rZXlib2FyZC1kaXJlY3Rpb25cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmREaXJlY3Rpb24ge1xuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb25zLiBUaGVzZSB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgZ29Eb3duKCkge31cbiAgZ29FbmQoKSB7fVxuICBnb0xlZnQoKSB7fVxuICBnb1JpZ2h0KCkge31cbiAgZ29TdGFydCgpIHt9XG4gIGdvVXAoKSB7fVxuXG4gIGtleWRvd24oZXZlbnQpIHtcbiAgICBsZXQgaGFuZGxlZDtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzU6IC8vIEVuZFxuICAgICAgICBoYW5kbGVkID0gdGhpcy5nb0VuZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzY6IC8vIEhvbWVcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29TdGFydCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6IC8vIExlZnRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29MZWZ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODogLy8gVXBcbiAgICAgICAgaGFuZGxlZCA9IGV2ZW50LmFsdEtleSA/IHRoaXMuZ29TdGFydCgpIDogdGhpcy5nb1VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTogLy8gUmlnaHRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29SaWdodCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6IC8vIERvd25cbiAgICAgICAgaGFuZGxlZCA9IGV2ZW50LmFsdEtleSA/IHRoaXMuZ29FbmQoKSA6IHRoaXMuZ29Eb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gaGFuZGxlZDtcbiAgfVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoS2V5Ym9hcmREaXJlY3Rpb24ucHJvdG90eXBlLCB7XG4gIGdvRG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvRW5kOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29MZWZ0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29SaWdodDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvU3RhcnQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb1VwOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAga2V5ZG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyTWl4aW5SZXN1bHQpXG59KTtcbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgcGFnZSBrZXlzIChQYWdlIFVwLCBQYWdlIERvd24pIGludG8gb3BlcmF0aW9ucyB0aGF0IHNjcm9sbFxuICogdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBUaGUga2V5Ym9hcmQgaW50ZXJhY3Rpb24gbW9kZWwgZ2VuZXJhbGx5IGZvbGxvd3MgdGhhdCBvZiBNaWNyb3NvZnQgV2luZG93cydcbiAqIGxpc3QgYm94ZXMgaW5zdGVhZCBvZiB0aG9zZSBpbiBPUyBYOlxuICpcbiAqICogVGhlIFBhZ2UgVXAvRG93biBhbmQgSG9tZS9FbmQga2V5cyBhY3R1YWxseSBtb3ZlIHRoZSBzZWxlY3Rpb24sIHJhdGhlciB0aGFuXG4gKiAgIGp1c3Qgc2Nyb2xsaW5nLiBUaGUgZm9ybWVyIGJlaGF2aW9yIHNlZW1zIG1vcmUgZ2VuZXJhbGx5IHVzZWZ1bCBmb3Iga2V5Ym9hcmRcbiAqICAgdXNlcnMuXG4gKlxuICogKiBQcmVzc2luZyBQYWdlIFVwL0Rvd24gd2lsbCBtb3ZlIHRoZSBzZWxlY3Rpb24gdG8gdGhlIHRvcG1vc3QvYm90dG9tbW9zdFxuICogICB2aXNpYmxlIGl0ZW0gaWYgdGhlIHNlbGVjdGlvbiBpcyBub3QgYWxyZWFkeSB0aGVyZS4gVGhlcmVhZnRlciwgdGhlIGtleSB3aWxsXG4gKiAgIG1vdmUgdGhlIHNlbGVjdGlvbiB1cC9kb3duIGJ5IGEgcGFnZSwgYW5kIChwZXIgdGhlIGFib3ZlIHBvaW50KSBtYWtlIHRoZVxuICogICBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmQtcGFnaW5nXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkUGFnaW5nIHtcblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDMzOiAvLyBQYWdlIFVwXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLnBhZ2VVcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzQ6IC8vIFBhZ2UgRG93blxuICAgICAgICBoYW5kbGVkID0gdGhpcy5wYWdlRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIGRvd24gb25lIHBhZ2UuXG4gICAqXG4gICAqIEBtZXRob2QgcGFnZURvd25cbiAgICovXG4gIHBhZ2VEb3duKCkge1xuICAgIHJldHVybiBzY3JvbGxPbmVQYWdlKHRoaXMsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB1cCBvbmUgcGFnZS5cbiAgICpcbiAgICogQG1ldGhvZCBwYWdlVXBcbiAgICovXG4gIHBhZ2VVcCgpIHtcbiAgICByZXR1cm4gc2Nyb2xsT25lUGFnZSh0aGlzLCBmYWxzZSk7XG4gIH1cblxufVxuXG5cbi8vIFJldHVybiB0aGUgaXRlbSB3aG9zZSBjb250ZW50IHNwYW5zIHRoZSBnaXZlbiB5IHBvc2l0aW9uIChyZWxhdGl2ZSB0byB0aGVcbi8vIHRvcCBvZiB0aGUgbGlzdCdzIHNjcm9sbGluZyBjbGllbnQgYXJlYSksIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuLy9cbi8vIElmIGRvd253YXJkIGlzIHRydWUsIG1vdmUgZG93biB0aGUgbGlzdCBvZiBpdGVtcyB0byBmaW5kIHRoZSBmaXJzdCBpdGVtXG4vLyBmb3VuZCBhdCB0aGUgZ2l2ZW4geSBwb3NpdGlvbjsgaWYgZG93bndhcmQgaXMgZmFsc2UsIG1vdmUgdXAgdGhlIGxpc3Qgb2Zcbi8vIGl0ZW1zIHRvIGZpbmQgdGhlIGxhc3QgaXRlbSBhdCB0aGF0IHBvc2l0aW9uLlxuZnVuY3Rpb24gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgeSwgZG93bndhcmQpIHtcbiAgdmFyIGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgdmFyIHN0YXJ0ID0gZG93bndhcmQgPyAwIDogaXRlbXMubGVuZ3RoIC0gMTtcbiAgdmFyIGVuZCA9IGRvd253YXJkID8gaXRlbXMubGVuZ3RoIDogMDtcbiAgdmFyIHN0ZXAgPSBkb3dud2FyZCA/IDEgOiAtMTtcbiAgdmFyIGlubmVybW9zdCA9IGVsZW1lbnQuaW5uZXJtb3N0QXR0YWNoZWQ7XG4gIHZhciB0b3BPZkNsaWVudEFyZWEgPSBpbm5lcm1vc3Qub2Zmc2V0VG9wICsgaW5uZXJtb3N0LmNsaWVudFRvcDtcbiAgdmFyIGkgPSBzdGFydDtcbiAgdmFyIGZvdW5kID0gZmFsc2U7XG4gIHdoaWxlIChpICE9PSBlbmQpIHtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIHZhciBpdGVtVG9wID0gaXRlbS5vZmZzZXRUb3AgLSB0b3BPZkNsaWVudEFyZWE7XG4gICAgdmFyIGl0ZW1Cb3R0b20gPSBpdGVtVG9wICsgaXRlbS5vZmZzZXRIZWlnaHQ7XG4gICAgaWYgKGl0ZW1Ub3AgPD0geSAmJiBpdGVtQm90dG9tID49IHkpIHtcbiAgICAgIC8vIEl0ZW0gc3BhbnMgdGhlIGluZGljYXRlZCB5IGNvb3JkaW5hdGUuXG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaSArPSBzdGVwO1xuICB9XG5cbiAgaWYgKCFmb3VuZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gV2UgbWF5IGhhdmUgZm91bmQgYW4gaXRlbSB3aG9zZSBwYWRkaW5nIHNwYW5zIHRoZSBnaXZlbiB5IGNvb3JkaW5hdGUsXG4gIC8vIGJ1dCB3aG9zZSBjb250ZW50IGlzIGFjdHVhbGx5IGFib3ZlL2JlbG93IHRoYXQgcG9pbnQuXG4gIC8vIFRPRE86IElmIHRoZSBpdGVtIGhhcyBhIGJvcmRlciwgdGhlbiBwYWRkaW5nIHNob3VsZCBiZSBpbmNsdWRlZCBpblxuICAvLyBjb25zaWRlcmluZyBhIGhpdC5cbiAgdmFyIGl0ZW1TdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoaXRlbSk7XG4gIHZhciBpdGVtUGFkZGluZ1RvcCA9IHBhcnNlRmxvYXQoaXRlbVN0eWxlLnBhZGRpbmdUb3ApO1xuICB2YXIgaXRlbVBhZGRpbmdCb3R0b20gPSBwYXJzZUZsb2F0KGl0ZW1TdHlsZS5wYWRkaW5nQm90dG9tKTtcbiAgdmFyIGNvbnRlbnRUb3AgPSBpdGVtVG9wICsgaXRlbS5jbGllbnRUb3AgKyBpdGVtUGFkZGluZ1RvcDtcbiAgdmFyIGNvbnRlbnRCb3R0b20gPSBjb250ZW50VG9wICsgaXRlbS5jbGllbnRIZWlnaHQgLSBpdGVtUGFkZGluZ1RvcCAtIGl0ZW1QYWRkaW5nQm90dG9tO1xuICBpZiAoZG93bndhcmQgJiYgY29udGVudFRvcCA8PSB5XG4gICAgfHwgIWRvd253YXJkICYmIGNvbnRlbnRCb3R0b20gPj0geSkge1xuICAgIC8vIFRoZSBpbmRpY2F0ZWQgY29vcmRpbmF0ZSBoaXRzIHRoZSBhY3R1YWwgaXRlbSBjb250ZW50LlxuICAgIHJldHVybiBpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIFRoZSBpbmRpY2F0ZWQgY29vcmRpbmF0ZSBmYWxscyB3aXRoaW4gdGhlIGl0ZW0ncyBwYWRkaW5nLiBCYWNrIHVwIHRvXG4gICAgLy8gdGhlIGl0ZW0gYmVsb3cvYWJvdmUgdGhlIGl0ZW0gd2UgZm91bmQgYW5kIHJldHVybiB0aGF0LlxuICAgIGkgLT0gc3RlcDtcbiAgICByZXR1cm4gaTtcbiAgfVxufVxuXG4vLyBNb3ZlIGJ5IG9uZSBwYWdlIGRvd253YXJkIChpZiBkb3dud2FyZCBpcyB0cnVlKSwgb3IgdXB3YXJkIChpZiBmYWxzZSkuXG4vLyBSZXR1cm4gdHJ1ZSBpZiB3ZSBlbmRlZCB1cCBjaGFuZ2luZyB0aGUgc2VsZWN0aW9uLCBmYWxzZSBpZiBub3QuXG4vLyBUT0RPOiBCZXR0ZXIgc3VwcG9ydCBmb3IgaG9yaXpvbnRhbCBsaXN0cy5cbmZ1bmN0aW9uIHNjcm9sbE9uZVBhZ2UoZWxlbWVudCwgZG93bndhcmQpIHtcblxuICB2YXIgaW5uZXJtb3N0ID0gZWxlbWVudC5pbm5lcm1vc3RBdHRhY2hlZDtcbiAgaWYgKCFpbm5lcm1vc3QpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZXRlcm1pbmUgdGhlIGl0ZW0gdmlzaWJsZSBqdXN0IGF0IHRoZSBlZGdlIG9mIGRpcmVjdGlvbiB3ZSdyZSBoZWFkaW5nLlxuICAvLyBXZSdsbCBzZWxlY3QgdGhhdCBpdGVtIGlmIGl0J3Mgbm90IGFscmVhZHkgc2VsZWN0ZWQuXG4gIHZhciBlZGdlID0gaW5uZXJtb3N0LnNjcm9sbFRvcCArIChkb3dud2FyZCA/IGlubmVybW9zdC5jbGllbnRIZWlnaHQgOiAwKTtcbiAgdmFyIGluZGV4T2ZJdGVtQXRFZGdlID0gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgZWRnZSwgZG93bndhcmQpO1xuXG4gIHZhciBzZWxlY3RlZEluZGV4ID0gZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICB2YXIgbmV3SW5kZXg7XG4gIGlmIChpbmRleE9mSXRlbUF0RWRnZSAmJiBzZWxlY3RlZEluZGV4ID09PSBpbmRleE9mSXRlbUF0RWRnZSkge1xuICAgIC8vIFRoZSBpdGVtIGF0IHRoZSBlZGdlIHdhcyBhbHJlYWR5IHNlbGVjdGVkLCBzbyBzY3JvbGwgaW4gdGhlIGluZGljYXRlZFxuICAgIC8vIGRpcmVjdGlvbiBieSBvbmUgcGFnZS4gTGVhdmUgdGhlIG5ldyBpdGVtIGF0IHRoYXQgZWRnZSBzZWxlY3RlZC5cbiAgICB2YXIgZGVsdGEgPSAoZG93bndhcmQgPyAxIDogLTEpICogaW5uZXJtb3N0LmNsaWVudEhlaWdodDtcbiAgICBuZXdJbmRleCA9IGdldEluZGV4T2ZJdGVtQXRZKGVsZW1lbnQsIGVkZ2UgKyBkZWx0YSwgZG93bndhcmQpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIFRoZSBpdGVtIGF0IHRoZSBlZGdlIHdhc24ndCBzZWxlY3RlZCB5ZXQuIEluc3RlYWQgb2Ygc2Nyb2xsaW5nLCB3ZSdsbFxuICAgIC8vIGp1c3Qgc2VsZWN0IHRoYXQgaXRlbS4gVGhhdCBpcywgdGhlIGZpcnN0IGF0dGVtcHQgdG8gcGFnZSB1cC9kb3duXG4gICAgLy8gdXN1YWxseSBqdXN0IG1vdmVzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGVkZ2UgaW4gdGhhdCBkaXJlY3Rpb24uXG4gICAgbmV3SW5kZXggPSBpbmRleE9mSXRlbUF0RWRnZTtcbiAgfVxuXG4gIGlmICghbmV3SW5kZXgpIHtcbiAgICAvLyBXZSBjYW4ndCBmaW5kIGFuIGl0ZW0gaW4gdGhlIGRpcmVjdGlvbiB3ZSB3YW50IHRvIHRyYXZlbC4gU2VsZWN0IHRoZVxuICAgIC8vIGxhc3QgaXRlbSAoaWYgbW92aW5nIGRvd253YXJkKSBvciBmaXJzdCBpdGVtIChpZiBtb3ZpbmcgdXB3YXJkKS5cbiAgICBuZXdJbmRleCA9IChkb3dud2FyZCA/IGVsZW1lbnQuaXRlbXMubGVuZ3RoIC0gMSA6IDApO1xuICB9XG5cbiAgaWYgKG5ld0luZGV4ICE9PSBzZWxlY3RlZEluZGV4KSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gbmV3SW5kZXg7XG4gICAgcmV0dXJuIHRydWU7IC8vIFdlIGhhbmRsZWQgdGhlIHBhZ2UgdXAvZG93biBvdXJzZWx2ZXMuXG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBXZSBkaWRuJ3QgZG8gYW55dGhpbmcuXG4gIH1cbn1cbkNvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChLZXlib2FyZFBhZ2luZy5wcm90b3R5cGUsIHtcbiAga2V5ZG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyTWl4aW5SZXN1bHQpXG59KTtcbiIsIi8qKlxuICogSGFuZGxlIGxpc3QgYm94LXN0eWxlIHByZWZpeCB0eXBpbmcsIGluIHdoaWNoIHRoZSB1c2VyIGNhbiB0eXBlIGEgc3RyaW5nIHRvXG4gKiBzZWxlY3QgdGhlIGZpcnN0IGl0ZW0gdGhhdCBiZWdpbnMgd2l0aCB0aGF0IHN0cmluZy5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1rZXlib2FyZC1wcmVmaXgtc2VsZWN0aW9uXG4gKlxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG4vLyBUT0RPOiBJZiB0aGUgc2VsZWN0aW9uIGlzIGNoYW5nZWQgYnkgc29tZSBvdGhlciBtZWFucyAoZS5nLiwgYXJyb3cga2V5cykgb3RoZXJcbi8vIHRoYW4gcHJlZml4IHR5cGluZywgdGhlbiB0aGF0IGFjdCBzaG91bGQgcmVzZXQgdGhlIHByZWZpeC5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24ge1xuXG4gIC8vIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgLy8gICB0aGlzLl9pdGVtVGV4dENvbnRlbnRzID0gbnVsbDtcbiAgLy8gICByZXNldFR5cGVkUHJlZml4KHRoaXMpO1xuICAvLyB9XG5cbiAga2V5ZG93bihldmVudCkge1xuICAgIGxldCBoYW5kbGVkO1xuICAgIGxldCByZXNldFByZWZpeCA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgODogLy8gQmFja3NwYWNlXG4gICAgICAgIGhhbmRsZUJhY2tzcGFjZSh0aGlzKTtcbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIHJlc2V0UHJlZml4ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyNzogLy8gRXNjYXBlXG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICghZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleSAmJiAhZXZlbnQuYWx0S2V5XG4gICAgICAgICAgJiYgZXZlbnQud2hpY2ggIT09IDMyIC8qIFNwYWNlICovKSB7XG4gICAgICAgICAgaGFuZGxlUGxhaW5DaGFyYWN0ZXIodGhpcywgU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC53aGljaCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0UHJlZml4ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHJlc2V0UHJlZml4KSB7XG4gICAgICByZXNldFR5cGVkUHJlZml4KHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBoYW5kbGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgZmlyc3QgaXRlbSB3aG9zZSB0ZXh0IGNvbnRlbnQgYmVnaW5zIHdpdGggdGhlIGdpdmVuIHByZWZpeC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RJdGVtV2l0aFRleHRQcmVmaXhcbiAgICogQHBhcmFtIHByZWZpeCBbU3RyaW5nXSBUaGUgc3RyaW5nIHRvIHNlYXJjaCBmb3JcbiAgICovXG4gIHNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChwcmVmaXgpIHtcbiAgICBpZiAocHJlZml4ID09IG51bGwgfHwgcHJlZml4Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaW5kZXggPSBnZXRJbmRleE9mSXRlbVdpdGhUZXh0UHJlZml4KHRoaXMsIHByZWZpeCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24ucHJvdG90eXBlLCB7XG4gIGtleWRvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlck1peGluUmVzdWx0KVxufSk7XG5cblxuLy8gVGltZSBpbiBtaWxsaXNlY29uZHMgYWZ0ZXIgd2hpY2ggdGhlIHVzZXIgaXMgY29uc2lkZXJlZCB0byBoYXZlIHN0b3BwZWRcbi8vIHR5cGluZy5cbmNvbnN0IFBSRUZJWF9USU1FT1VUX0RVUkFUSU9OID0gMTAwMDtcblxuXG4vLyBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIHdpdGggdGhlIGdpdmVuIHByZWZpeCwgZWxzZSAtMS5cbmZ1bmN0aW9uIGdldEluZGV4T2ZJdGVtV2l0aFRleHRQcmVmaXgoZWxlbWVudCwgcHJlZml4KSB7XG4gIGxldCBpdGVtVGV4dENvbnRlbnRzID0gZ2V0SXRlbVRleHRDb250ZW50cyhlbGVtZW50KTtcbiAgbGV0IHByZWZpeExlbmd0aCA9IHByZWZpeC5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbVRleHRDb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBpdGVtVGV4dENvbnRlbnQgPSBpdGVtVGV4dENvbnRlbnRzW2ldO1xuICAgIGlmIChpdGVtVGV4dENvbnRlbnQuc3Vic3RyKDAsIHByZWZpeExlbmd0aCkgPT09IHByZWZpeCkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLy8gUmV0dXJuIGFuIGFycmF5IG9mIHRoZSB0ZXh0IGNvbnRlbnQgKGluIGxvd2VyY2FzZSkgb2YgYWxsIGl0ZW1zLlxuLy8gQ2FjaGUgdGhlc2UgcmVzdWx0cy5cbmZ1bmN0aW9uIGdldEl0ZW1UZXh0Q29udGVudHMoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQuX2l0ZW1UZXh0Q29udGVudHMpIHtcbiAgICBsZXQgaXRlbXMgPSBlbGVtZW50Lml0ZW1zO1xuICAgIGVsZW1lbnQuX2l0ZW1UZXh0Q29udGVudHMgPSBpdGVtcy5tYXAoY2hpbGQgPT4ge1xuICAgICAgbGV0IHRleHQgPSBjaGlsZC50ZXh0Q29udGVudCB8fCBjaGlsZC5hbHQ7XG4gICAgICByZXR1cm4gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCYWNrc3BhY2UoZWxlbWVudCkge1xuICBsZXQgbGVuZ3RoID0gZWxlbWVudC5fdHlwZWRQcmVmaXggPyBlbGVtZW50Ll90eXBlZFByZWZpeC5sZW5ndGggOiAwO1xuICBpZiAobGVuZ3RoID4gMCkge1xuICAgIGVsZW1lbnQuX3R5cGVkUHJlZml4ID0gZWxlbWVudC5fdHlwZWRQcmVmaXguc3Vic3RyKDAsIGxlbmd0aCAtIDEpO1xuICB9XG4gIGVsZW1lbnQuc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KGVsZW1lbnQuX3R5cGVkUHJlZml4KTtcbiAgZWxlbWVudC5fc2V0UHJlZml4VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVQbGFpbkNoYXJhY3RlcihlbGVtZW50LCBjaGFyKSB7XG4gIGxldCBwcmVmaXggPSBlbGVtZW50Ll90eXBlZFByZWZpeCB8fCAnJztcbiAgZWxlbWVudC5fdHlwZWRQcmVmaXggPSBwcmVmaXggKyBjaGFyLnRvTG93ZXJDYXNlKCk7XG4gIGVsZW1lbnQuc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KGVsZW1lbnQuX3R5cGVkUHJlZml4KTtcbiAgc2V0UHJlZml4VGltZW91dChlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQoZWxlbWVudC5fcHJlZml4VGltZW91dCk7XG4gICAgZWxlbWVudC5fcHJlZml4VGltZW91dCA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0VHlwZWRQcmVmaXgoZWxlbWVudCkge1xuICBlbGVtZW50Ll90eXBlZFByZWZpeCA9ICcnO1xuICByZXNldFByZWZpeFRpbWVvdXQoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHNldFByZWZpeFRpbWVvdXQoZWxlbWVudCkge1xuICByZXNldFByZWZpeFRpbWVvdXQoZWxlbWVudCk7XG4gIGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICByZXNldFR5cGVkUHJlZml4KGVsZW1lbnQpO1xuICB9LCBQUkVGSVhfVElNRU9VVF9EVVJBVElPTik7XG59XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBhcHBsaWVzIHN0YW5kYXJkIGhpZ2hsaWdodCBjb2xvcnMgdG8gYSBzZWxlY3RlZCBpdGVtLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLXNlbGVjdGlvbi1oaWdobGlnaHRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3Rpb25IaWdobGlnaHQge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzZWxlY3RlZCA/ICdoaWdobGlnaHQnIDogJyc7XG4gICAgaXRlbS5zdHlsZS5jb2xvciA9IHNlbGVjdGVkID8gJ2hpZ2hsaWdodHRleHQnIDogJyc7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggc2Nyb2xscyBhIGNvbnRhaW5lciB0byBrZWVwIHRoZSBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtc2VsZWN0aW9uLXNjcm9sbFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGlvblNjcm9sbCB7XG5cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIC8vIEtlZXAgdGhlIHNlbGVjdGVkIGl0ZW0gaW4gdmlldy5cbiAgICAgIHRoaXMuc2Nyb2xsSXRlbUludG9WaWV3KGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdGhlIGdpdmVuIGVsZW1lbnQgY29tcGxldGVseSBpbnRvIHZpZXcsIG1pbmltaXppbmcgdGhlIGRlZ3JlZSBvZlxuICAgKiBzY3JvbGxpbmcgcGVyZm9ybWVkLlxuICAgKlxuICAgKiBCbGluayBoYXMgYSBzY3JvbGxJbnRvVmlld0lmTmVlZGVkKCkgZnVuY3Rpb24gdGhhdCBhbG1vc3QgdGhlIHNhbWUgdGhpbmcsXG4gICAqIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0J3Mgbm9uLXN0YW5kYXJkLCBhbmQgaW4gYW55IGV2ZW50IG9mdGVuIGVuZHMgdXBcbiAgICogc2Nyb2xsaW5nIG1vcmUgdGhhbiBpcyBhYnNvbHV0ZWx5IG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQG1ldGhvZCBzY3JvbGxJdGVtSW50b1ZpZXdcbiAgICovXG4gIHNjcm9sbEl0ZW1JbnRvVmlldyhpdGVtKSB7XG4gICAgLy8gR2V0IHRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvcCBvZiB0aGVcbiAgICAvLyBsaXN0J3Mgc2Nyb2xsYWJsZSBjYW52YXMuIEFuIGl0ZW0gYXQgdGhlIHRvcCBvZiB0aGUgbGlzdCB3aWxsIGhhdmUgYVxuICAgIC8vIGVsZW1lbnRUb3Agb2YgMC5cblxuICAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmlubmVybW9zdEF0dGFjaGVkO1xuICAgIGlmICghaW5uZXJtb3N0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRUb3AgPSBpdGVtLm9mZnNldFRvcCAtIGlubmVybW9zdC5vZmZzZXRUb3AgLSBpbm5lcm1vc3QuY2xpZW50VG9wO1xuICAgIGxldCBlbGVtZW50Qm90dG9tID0gZWxlbWVudFRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgIC8vIERldGVybWluZSB0aGUgYm90dG9tIG9mIHRoZSBzY3JvbGxhYmxlIGNhbnZhcy5cbiAgICBsZXQgc2Nyb2xsQm90dG9tID0gaW5uZXJtb3N0LnNjcm9sbFRvcCArIGlubmVybW9zdC5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGVsZW1lbnRCb3R0b20gPiBzY3JvbGxCb3R0b20pIHtcbiAgICAgIC8vIFNjcm9sbCB1cCB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wICs9IGVsZW1lbnRCb3R0b20gLSBzY3JvbGxCb3R0b207XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnRUb3AgPCBpbm5lcm1vc3Quc2Nyb2xsVG9wKSB7XG4gICAgICAvLyBTY3JvbGwgZG93biB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wID0gZWxlbWVudFRvcDtcbiAgICB9XG4gIH1cblxufVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggdHJhbnNsYXRlcyB0b3VjaCBnZXN0dXJlcyAoc3dpcGUgbGVmdCwgc3dpcGUgcmlnaHQpIHRvIGRpcmVjdGlvblxuICogc2VtYW50aWNzIChnb1JpZ2h0LCBnb0xlZnQpLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLXN3aXBlLWRpcmVjdGlvblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN3aXBlRGlyZWN0aW9uIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG5cbiAgICB0aGlzLnBvc2l0aW9uID0gMDtcbiAgICBcbiAgICAvLyBUT0RPOiB0b3VjaCBldmVudHMgY291bGQgYmUgZmFjdG9yZWQgb3V0IGludG8gdGhlaXIgb3duIGFzcGVjdC5cblxuICAgIC8vIEluIGFsbCB0b3VjaCBldmVudHMsIG9ubHkgaGFuZGxlIHNpbmdsZSB0b3VjaGVzLiBXZSBkb24ndCB3YW50IHRvXG4gICAgLy8gaW5hZHZlcnRlbnRseSBkbyB3b3JrIHdoZW4gdGhlIHVzZXIncyB0cnlpbmcgdG8gcGluY2gtem9vbSBmb3IgZXhhbXBsZS5cbiAgICAvLyBUT0RPOiBFdmVuIGJldHRlciBhcHByb2FjaCB0aGFuIGJlbG93IHdvdWxkIGJlIHRvIGlnbm9yZSB0b3VjaGVzIGFmdGVyXG4gICAgLy8gdGhlIGZpcnN0IGlmIHRoZSB1c2VyIGhhcyBhbHJlYWR5IGJlZ3VuIGEgc3dpcGUuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuX211bHRpVG91Y2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0b3VjaFN0YXJ0KHRoaXMsIGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX211bHRpVG91Y2ggPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9tdWx0aVRvdWNoICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGxldCBoYW5kbGVkID0gdG91Y2hNb3ZlKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBBbGwgdG91Y2hlcyByZW1vdmVkOyBnZXN0dXJlIGlzIGNvbXBsZXRlLlxuICAgICAgICBpZiAoIXRoaXMuX211bHRpVG91Y2gpIHtcbiAgICAgICAgICAvLyBTaW5nbGUtdG91Y2ggc3dpcGUgaGFzIGZpbmlzaGVkLlxuICAgICAgICAgIHRvdWNoRW5kKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tdWx0aVRvdWNoID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9ucy4gVGhlc2Ugd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBhc3BlY3RzXG4gIC8vIGluIHRoZSBjb2xsZWN0aXZlLlxuICBnb0xlZnQoKSB7fVxuICBnb1JpZ2h0KCkge31cblxuICAvKipcbiAgICogVGhlIGRpc3RhbmNlIHRoZSB1c2VyIGhhcyBtb3ZlZCB0aGUgZmlyc3QgdG91Y2hwb2ludCBzaW5jZSB0aGUgYmVnaW5uaW5nXG4gICAqIG9mIGEgZHJhZywgZXhwcmVzc2VkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGVsZW1lbnQncyB3aWR0aC5cbiAgICpcbiAgICogQHByb3BlcnR5IHBvc2l0aW9uXG4gICAqIEB0eXBlIE51bWJlclxuICAgKi9cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHNldCBwb3NpdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgYXNwZWN0c1xuICAvLyBpbiB0aGUgY29sbGVjdGl2ZS5cbiAgc2hvd1RyYW5zaXRpb24odmFsdWUpIHt9XG5cbn1cblxuXG5mdW5jdGlvbiB0b3VjaFN0YXJ0KGVsZW1lbnQsIGV2ZW50KSB7XG4gIGVsZW1lbnQuc2hvd1RyYW5zaXRpb24oZmFsc2UpO1xuICBsZXQgeCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG4gIGxldCB5ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcbiAgZWxlbWVudC5fc3RhcnRYID0geDtcbiAgZWxlbWVudC5fcHJldmlvdXNYID0geDtcbiAgZWxlbWVudC5fcHJldmlvdXNZID0geTtcbiAgZWxlbWVudC5fZGVsdGFYID0gMDtcbiAgZWxlbWVudC5fZGVsdGFZID0gMDtcbn1cblxuZnVuY3Rpb24gdG91Y2hNb3ZlKGVsZW1lbnQsIGV2ZW50KSB7XG4gIGxldCB4ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgbGV0IHkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuICBlbGVtZW50Ll9kZWx0YVggPSB4IC0gZWxlbWVudC5fcHJldmlvdXNYO1xuICBlbGVtZW50Ll9kZWx0YVkgPSB5IC0gZWxlbWVudC5fcHJldmlvdXNZO1xuICBlbGVtZW50Ll9wcmV2aW91c1ggPSB4O1xuICBlbGVtZW50Ll9wcmV2aW91c1kgPSB5O1xuICBpZiAoTWF0aC5hYnMoZWxlbWVudC5fZGVsdGFYKSA+IE1hdGguYWJzKGVsZW1lbnQuX2RlbHRhWSkpIHtcbiAgICAvLyBNb3ZlIHdhcyBtb3N0bHkgaG9yaXpvbnRhbC5cbiAgICB0cmFja1RvKGVsZW1lbnQsIHgpO1xuICAgIC8vIEluZGljYXRlIHRoYXQgdGhlIGV2ZW50IHdhcyBoYW5kbGVkLiBJdCdkIGJlIG5pY2VyIGlmIHdlIGRpZG4ndCBoYXZlXG4gICAgLy8gdG8gZG8gdGhpcyBzbyB0aGF0LCBlLmcuLCBhIHVzZXIgY291bGQgYmUgc3dpcGluZyBsZWZ0IGFuZCByaWdodFxuICAgIC8vIHdoaWxlIHNpbXVsdGFuZW91c2x5IHNjcm9sbGluZyB1cCBhbmQgZG93bi4gKE5hdGl2ZSB0b3VjaCBhcHBzIGNhbiBkb1xuICAgIC8vIHRoYXQuKSBIb3dldmVyLCBNb2JpbGUgU2FmYXJpIHdhbnRzIHRvIGhhbmRsZSBzd2lwZSBldmVudHMgbmVhciB0aGVcbiAgICAvLyBwYWdlIGFuZCBpbnRlcnByZXQgdGhlbSBhcyBuYXZpZ2F0aW9ucy4gVG8gYXZvaWQgaGF2aW5nIGEgaG9yaXppb250YWxcbiAgICAvLyBzd2lwZSBtaXNpbnRlcHJldGVkIGFzIGEgbmF2aWdhdGlvbiwgd2UgaW5kaWNhdGUgdGhhdCB3ZSd2ZSBoYW5kbGVkXG4gICAgLy8gdGhlIGV2ZW50LCBhbmQgcHJldmVudCBkZWZhdWx0IGJlaGF2aW9yLlxuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIC8vIE1vdmUgd2FzIG1vc3RseSB2ZXJ0aWNhbC5cbiAgICByZXR1cm4gZmFsc2U7IC8vIE5vdCBoYW5kbGVkXG4gIH1cbn1cblxuZnVuY3Rpb24gdG91Y2hFbmQoZWxlbWVudCwgZXZlbnQpIHtcbiAgZWxlbWVudC5zaG93VHJhbnNpdGlvbih0cnVlKTtcbiAgbGV0IHggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICBpZiAoZWxlbWVudC5fZGVsdGFYID49IDIwKSB7XG4gICAgLy8gRmluaXNoZWQgZ29pbmcgcmlnaHQgYXQgaGlnaCBzcGVlZC5cbiAgICAvLyBjb25zb2xlLmxvZyhcImZsaWNrIHJpZ2h0IFwiICsgZWxlbWVudC5fZGVsdGFYKTtcbiAgICBlbGVtZW50LmdvTGVmdCgpO1xuICB9IGVsc2UgaWYgKGVsZW1lbnQuX2RlbHRhWCA8PSAtMjApIHtcbiAgICAvLyBGaW5pc2hlZCBnb2luZyBsZWZ0IGF0IGhpZ2ggc3BlZWQuXG4gICAgLy8gY29uc29sZS5sb2coXCJmbGljayBsZWZ0IFwiICsgZWxlbWVudC5fZGVsdGFYKTtcbiAgICBlbGVtZW50LmdvUmlnaHQoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGaW5pc2hlZCBhdCBsb3cgc3BlZWQuXG4gICAgLy8gY29uc29sZS5sb2coXCJzbG93IGRyYWcgXCIgKyBlbGVtZW50Ll9kZWx0YVgpO1xuICAgIHRyYWNrVG8oZWxlbWVudCwgeCk7XG4gICAgbGV0IHBvc2l0aW9uID0gZWxlbWVudC5wb3NpdGlvbjtcbiAgICBpZiAocG9zaXRpb24gPj0gMC41KSB7XG4gICAgICBlbGVtZW50LmdvUmlnaHQoKTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uIDw9IC0wLjUpIHtcbiAgICAgIGVsZW1lbnQuZ29MZWZ0KCk7XG4gICAgfVxuICB9XG4gIGVsZW1lbnQucG9zaXRpb24gPSAwO1xuICBlbGVtZW50Ll9kZWx0YVggPSBudWxsO1xuICBlbGVtZW50Ll9kZWx0YVkgPSBudWxsO1xufVxuXG5mdW5jdGlvbiB0cmFja1RvKGVsZW1lbnQsIHgpIHtcbiAgbGV0IHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgbGV0IGRyYWdEaXN0YW5jZSA9IGVsZW1lbnQuX3N0YXJ0WCAtIHg7XG4gIGxldCBmcmFjdGlvbiA9IHdpZHRoID4gMCA/XG4gICAgZHJhZ0Rpc3RhbmNlIC8gd2lkdGggOlxuICAgIDA7XG4gIGVsZW1lbnQucG9zaXRpb24gPSBmcmFjdGlvbjtcbn1cbiIsIi8qXG4gKiBBc3BlY3Qgd2hpY2ggbWFwcyBhIGhvcml6b250YWwgdHJhY2twYWQgc3dpcGUgZ2VzdHVyZSAob3IgaG9yaXpvbnRhbCBtb3VzZSB3aGVlbFxuICogYWN0aW9uKSB0byBkaXJlY3Rpb24gc2VtYW50aWNzLlxuICpcbiAqIFRvIHJlc3BvbmQgdG8gdGhlIHRyYWNrcGFkLCB3ZSBjYW4gbGlzdGVuIHRvIHRoZSBET00ncyBcIndoZWVsXCIgZXZlbnRzLiBUaGVzZVxuICogZXZlbnRzIGFyZSBmaXJlZCBhcyB0aGUgdXNlciBkcmFncyB0aGVpciBmaW5nZXJzIGFjcm9zcyBhIHRyYWNrcGFkLlxuICogVW5mb3J0dW5hdGVseSwgdGhpcyBzY2hlbWUgaXMgbWlzc2luZyBhIGNyaXRpY2FsIGV2ZW50IOKAlMKgdGhlcmUgaXMgbm8gZXZlbnQgd2hlblxuICogdGhlIHVzZXIgKnN0b3BzKiBhIGdlc3R1cmVkIG9uIHRoZSB0cmFja3BhZC5cbiAqXG4gKiBUbyBjb21wbGljYXRlIG1hdHRlcnMsIHRoZSBtYWluc3RyZWFtIGJyb3dzZXJzIGNvbnRpbnVlIHRvIGdlbmVyYXRlIHdoZWVsIGV2ZW50c1xuICogZXZlbiBhZnRlciB0aGUgdXNlciBoYXMgc3RvcHBlZCBkcmFnZ2luZyB0aGVpciBmaW5nZXJzLiBUaGVzZSBmYWtlIGV2ZW50c1xuICogc2ltdWxhdGUgdGhlIHVzZXIgZ3JhZHVhbGx5IHNsb3dpbmcgZG93biB0aGUgZHJhZyB1bnRpbCB0aGV5IGNvbWUgdG8gYSBzbW9vdGhcbiAqIHN0b3AuIEluIHNvbWUgY29udGV4dHMsIHRoZXNlIGZha2Ugd2hlZWwgZXZlbnRzIG1pZ2h0IGJlIGhlbHBmdWwsIGJ1dCBpbiB0cnlpbmdcbiAqIHRvIHN1cHBseSB0eXBpY2FsIHRyYWNrcGFkIHN3aXBlIG5hdmlnYXRpb24sIHRoZXNlIGZha2UgZXZlbnRzIGdldCBpbiB0aGUgd2F5LlxuICpcbiAqIFRoaXMgY29tcG9uZW50IHVzZXMgc29tZSBoZXVyaXN0aWNzIHRvIHdvcmsgYXJvdW5kIHRoZXNlIHByb2JsZW1zLCBidXQgdGhlXG4gKiBjb21wbGV4IG5hdHVyZSBvZiB0aGUgcHJvYmxlbSBtYWtlIGl0IGV4dHJlbWVseSBkaWZmaWN1bHQgdG8gYWNoaWV2ZSB0aGUgc2FtZVxuICogZGVncmVlIG9mIHRyYWNrcGFkIHJlc3BvbnNpdmVuZXNzIHBvc3NpYmxlIHdpdGggbmF0aXZlIGFwcGxpY2F0aW9ucy5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy10cmFja3BhZC1kaXJlY3Rpb25cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFja3BhZERpcmVjdGlvbiB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBldmVudCA9PiB7XG4gICAgICB2YXIgaGFuZGxlZCA9IHdoZWVsKHRoaXMsIGV2ZW50KTtcbiAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzZXRXaGVlbFRyYWNraW5nKHRoaXMpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMuIFRoZXNlIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgYXNwZWN0c1xuICAvLyBpbiB0aGUgY29sbGVjdGl2ZS5cbiAgZ29MZWZ0KCkge31cbiAgZ2V0IHBvc2l0aW9uKCkge31cbiAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7fVxuICBnb1JpZ2h0KCkge31cbiAgc2hvd1RyYW5zaXRpb24oKSB7fVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoVHJhY2twYWREaXJlY3Rpb24ucHJvdG90eXBlLCB7XG4gIHBvc2l0aW9uOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlR2V0dGVyKVxufSk7XG5cblxuLy8gVGltZSB3ZSB3YWl0IGZvbGxvd2luZyBhIG5hdmlnYXRpb24gYmVmb3JlIHBheWluZyBhdHRlbnRpb24gdG8gd2hlZWxcbi8vIGV2ZW50cyBhZ2Fpbi5cbmNvbnN0IFBPU1RfTkFWSUdBVEVfVElNRSA9IDI1MDtcblxuLy8gVGltZSB3ZSB3YWl0IGFmdGVyIHRoZSBsYXN0IHdoZWVsIGV2ZW50IGJlZm9yZSB3ZSByZXNldCB0aGluZ3MuXG5jb25zdCBXSEVFTF9USU1FID0gMTAwO1xuXG5cbi8vIEZvbGxvd2luZyBhIG5hdmlnYXRpb24sIHBhcnRpYWxseSByZXNldCBvdXIgd2hlZWwgdHJhY2tpbmcuXG5mdW5jdGlvbiBwb3N0TmF2aWdhdGUoZWxlbWVudCkge1xuICBlbGVtZW50LnBvc2l0aW9uID0gMDtcbiAgZWxlbWVudC5fd2hlZWxEaXN0YW5jZSA9IDA7XG4gIGVsZW1lbnQuX3Bvc3ROYXZpZ2F0ZURlbGF5Q29tcGxldGUgPSB0cnVlO1xuICBlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24gPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBlbGVtZW50Ll9wb3N0TmF2aWdhdGVEZWxheUNvbXBsZXRlID0gZmFsc2U7XG4gIH0sIFBPU1RfTkFWSUdBVEVfVElNRSk7XG59XG5cbi8vIFJlc2V0IGFsbCBzdGF0ZSByZWxhdGVkIHRvIHRoZSB0cmFja2luZyBvZiB0aGUgd2hlZWwuXG5mdW5jdGlvbiByZXNldFdoZWVsVHJhY2tpbmcoZWxlbWVudCkge1xuICBlbGVtZW50LnBvc2l0aW9uID0gMDtcbiAgZWxlbWVudC5fd2hlZWxEaXN0YW5jZSA9IDA7XG4gIGVsZW1lbnQuX2xhc3REZWx0YVggPSAwO1xuICBlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24gPSBmYWxzZTtcbiAgZWxlbWVudC5fcG9zdE5hdmlnYXRlRGVsYXlDb21wbGV0ZSA9IGZhbHNlO1xuICBpZiAoZWxlbWVudC5fbGFzdFdoZWVsVGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dChlbGVtZW50Ll9sYXN0V2hlZWxUaW1lb3V0KTtcbiAgICBlbGVtZW50Ll9sYXN0V2hlZWxUaW1lb3V0ID0gbnVsbDtcbiAgfVxufVxuXG4vLyBEZWZpbmUgb3VyIG93biBzaWduIGZ1bmN0aW9uLCBzaW5jZSAoYXMgb2YgTWF5IDIwMTUpLCBTYWZhcmkgYW5kIElFIGRvbid0XG4vLyBzdXBwbHkgTWF0aC5zaWduKCkuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgcmV0dXJuICh4ID09PSAwKSA/XG4gICAgMCA6XG4gICAgKHggPiAwKSA/XG4gICAgICAxIDpcbiAgICAgIC0xO1xufVxuXG4vLyBUT0RPOiBEYW1waW5nLCBvciBzb21lIG90aGVyIHRyZWF0bWVudCBmb3IgZ29pbmcgcGFzdCB0aGUgZW5kcy5cblxuLypcbiAqIEEgd2hlZWwgZXZlbnQgaGFzIGJlZW4gZ2VuZXJhdGVkLiBUaGlzIGNvdWxkIGJlIGEgcmVhbCB3aGVlbCBldmVudCwgb3IgaXRcbiAqIGNvdWxkIGJlIGZha2UgKHNlZSBub3RlcyBpbiB0aGUgaGVhZGVyKS5cbiAqXG4gKiBUaGlzIGhhbmRsZXIgdXNlcyBzZXZlcmFsIHN0cmF0ZWdpZXMgdG8gdHJ5IHRvIGFwcHJveGltYXRlIG5hdGl2ZSB0cmFja3BhZFxuICogc3dpcGUgbmF2aWdhdGlvbi5cbiAqXG4gKiBJZiB0aGUgdXNlciBoYXMgZHJhZ2dlZCBlbm91Z2ggdG8gY2F1c2UgYSBuYXZpZ2F0aW9uLCB0aGVuIGZvciBhIHNob3J0XG4gKiBkZWxheSBmb2xsb3dpbmcgdGhhdCBuYXZpZ2F0aW9uLCBzdWJzZXF1ZW50IHdoZWVsIGV2ZW50cyB3aWxsIGJlIGlnbm9yZWQuXG4gKlxuICogRnVydGhlcm1vcmUsIGZvbGx3b3dpbmcgYSBuYXZpZ2F0aW9uLCB3ZSBpZ25vcmUgYWxsIHdoZWVsIGV2ZW50cyB1bnRpbCB3ZVxuICogcmVjZWl2ZSBhdCBsZWFzdCBvbmUgZXZlbnQgd2hlcmUgdGhlIGV2ZW50J3MgZGVsdGFYIChkaXN0YW5jZSB0cmF2ZWxlZCkgaXNcbiAqICpncmVhdGVyKiB0aGFuIHRoZSBwcmV2aW91cyBldmVudCdzIGRlbHRhWC4gVGhpcyBoZWxwcyB1cyBmaWx0ZXIgb3V0IHRoZVxuICogZmFrZSB3aGVlbCBldmVudHMgZ2VuZXJhdGVkIGJ5IHRoZSBicm93c2VyIHRvIHNpbXVsYXRlIGRlY2VsZXJhdGlvbi5cbiAqXG4gKi9cbmZ1bmN0aW9uIHdoZWVsKGVsZW1lbnQsIGV2ZW50KSB7XG5cbiAgLy8gU2luY2Ugd2UgaGF2ZSBhIG5ldyB3aGVlbCBldmVudCwgcmVzZXQgb3VyIHRpbWVyIHdhaXRpbmcgZm9yIHRoZSBsYXN0XG4gIC8vIHdoZWVsIGV2ZW50IHRvIHBhc3MuXG4gIGlmIChlbGVtZW50Ll9sYXN0V2hlZWxUaW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KGVsZW1lbnQuX2xhc3RXaGVlbFRpbWVvdXQpO1xuICB9XG4gIGVsZW1lbnQuX2xhc3RXaGVlbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB3aGVlbFRpbWVkT3V0KGVsZW1lbnQpO1xuICB9LCBXSEVFTF9USU1FKTtcblxuICB2YXIgZGVsdGFYID0gZXZlbnQuZGVsdGFYO1xuICB2YXIgZGVsdGFZID0gZXZlbnQuZGVsdGFZO1xuXG4gIC8vIFNlZSBpZiBlbGVtZW50IGV2ZW50IHJlcHJlc2VudHMgYWNjZWxlcmF0aW9uIG9yIGRlY2VsZXJhdGlvbi5cbiAgdmFyIGFjY2VsZXJhdGlvbiA9IHNpZ24oZGVsdGFYKSAqIChkZWx0YVggLSBlbGVtZW50Ll9sYXN0RGVsdGFYKTtcbiAgZWxlbWVudC5fbGFzdERlbHRhWCA9IGRlbHRhWDtcbiAgLy8gY29uc29sZS5sb2coZGVsdGFYICsgXCIgXCIgKyBhY2NlbGVyYXRpb24gKyBcIiBcIiArIGVsZW1lbnQuX2Fic29yYkRlY2VsZXJhdGlvbiArIFwiIFwiICsgZWxlbWVudC5fcG9zdE5hdmlnYXRlRGVsYXlDb21wbGV0ZSk7XG5cbiAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPCBNYXRoLmFicyhkZWx0YVkpKSB7XG4gICAgLy8gTW92ZSB3YXMgbW9zdGx5IHZlcnRpY2FsLiBUaGUgdXNlciBtYXkgYmUgdHJ5aW5nIHNjcm9sbCB3aXRoIHRoZVxuICAgIC8vIHRyYWNrcGFkL3doZWVsLiBUbyBiZSBvbiB0aGUgc2FmZSwgd2UgaWdub3JlIHN1Y2ggZXZlbnRzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChlbGVtZW50Ll9wb3N0TmF2aWdhdGVEZWxheUNvbXBsZXRlKSB7XG4gICAgLy8gSXQncyB0b28gc29vbiBhZnRlciBhIG5hdmlnYXRpb247IGlnbm9yZSB0aGUgZXZlbnQuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIGlmIChhY2NlbGVyYXRpb24gPiAwKSB7XG4gICAgLy8gVGhlIGV2ZW50cyBhcmUgbm90IChvciBhcmUgbm8gbG9uZ2VyKSBkZWNlbGVyYXRpbmcsIHNvIHdlIGNhbiBzdGFydFxuICAgIC8vIHBheWluZyBhdHRlbnRpb24gdG8gdGhlbSBhZ2Fpbi5cbiAgICBlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24gPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChlbGVtZW50Ll9hYnNvcmJEZWNlbGVyYXRpb24pIHtcbiAgICAvLyBUaGUgd2hlZWwgZXZlbnQgd2FzIGxpa2VseSBmYWtlZCB0byBzaW11bGF0ZSBkZWNlbGVyYXRpb247IGlnbm9yZSBpdC5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGVsZW1lbnQuX3doZWVsRGlzdGFuY2UgKz0gZGVsdGFYO1xuXG4gIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW1zIGJlaW5nIG5hdmlnYXRlZC5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIHBvc2l0aW9uID0gd2lkdGggPiAwID9cbiAgICBlbGVtZW50Ll93aGVlbERpc3RhbmNlIC8gd2lkdGggOlxuICAgIDA7XG4gIGVsZW1lbnQuc2hvd1RyYW5zaXRpb24oZmFsc2UpO1xuICBwb3NpdGlvbiA9IHNpZ24ocG9zaXRpb24pICogTWF0aC5taW4oTWF0aC5hYnMocG9zaXRpb24pLCAxKTtcbiAgZWxlbWVudC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gIC8vIElmIHRoZSB1c2VyIGhhcyBkcmFnZ2VkIGVub3VnaCB0byByZWFjaCB0aGUgcHJldmlvdXMvbmV4dCBpdGVtLCB0aGVuXG4gIC8vIGNvbXBsZXRlIGEgbmF2aWdhdGlvbiB0byB0aGF0IGl0ZW0uXG4gIGlmIChwb3NpdGlvbiA9PT0gMSkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiZ29SaWdodFwiKTtcbiAgICBlbGVtZW50LnNob3dUcmFuc2l0aW9uKHRydWUpO1xuICAgIGVsZW1lbnQuZ29SaWdodCgpO1xuICAgIHBvc3ROYXZpZ2F0ZShlbGVtZW50KTtcbiAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gLTEpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImdvTGVmdFwiKTtcbiAgICBlbGVtZW50LnNob3dUcmFuc2l0aW9uKHRydWUpO1xuICAgIGVsZW1lbnQuZ29MZWZ0KCk7XG4gICAgcG9zdE5hdmlnYXRlKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIEEgc3VmZmljaWVudGx5IGxvbmcgcGVyaW9kIG9mIHRpbWUgaGFzIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCB3aGVlbCBldmVudC5cbi8vIFdlIHNuYXAgdGhlIHNlbGVjdGlvbiB0byB0aGUgY2xvc2VzdCBpdGVtLCB0aGVuIHJlc2V0IG91ciBzdGF0ZS5cbmZ1bmN0aW9uIHdoZWVsVGltZWRPdXQoZWxlbWVudCkge1xuICBjb25zb2xlLmxvZyhcInRpbWVvdXRcIik7XG5cbiAgLy8gU25hcCB0byB0aGUgY2xvc2VzdCBpdGVtLlxuICBlbGVtZW50LnNob3dUcmFuc2l0aW9uKHRydWUpO1xuICB2YXIgcG9zaXRpb24gPSBlbGVtZW50LnBvc2l0aW9uO1xuICBpZiAocG9zaXRpb24gPj0gMC41KSB7XG4gICAgY29uc29sZS5sb2coXCJzbmFwIHJpZ2h0XCIpO1xuICAgIGVsZW1lbnQuZ29SaWdodCgpO1xuICB9IGVsc2UgaWYgKHBvc2l0aW9uIDw9IC0wLjUpIHtcbiAgICBjb25zb2xlLmxvZyhcInNuYXAgbGVmdFwiKTtcbiAgICBlbGVtZW50LmdvTGVmdCgpO1xuICB9XG5cbiAgLy8gVE9ETzogTGlzdGVuIGZvciB0aGUgdHJhbnNpdGlvbiB0byBjb21wbGV0ZSwgYW5kIHRoZW4gcmVzdG9yZVxuICAvLyBzaG93VHJhbnNpdGlvbiB0byBmYWxzZSAob3IgdGhlIHByZXZpb3VzIHZhbHVlKS5cblxuICByZXNldFdoZWVsVHJhY2tpbmcoZWxlbWVudCk7XG59XG4iLCIvKlxuICogRXh0ZW5kIGNsYXNzZXMvb2JqZWN0cyB3aXRoIG90aGVyIGNsYXNzZXMvb2JqZWN0cy5cbiAqL1xuXG5pbXBvcnQgKiBhcyBDb21wb3NpdGlvblJ1bGVzIGZyb20gJy4vQ29tcG9zaXRpb25SdWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2FibGUge1xuXG4gIC8qXG4gICAqIFJldHVybiBhIHN1YmNsYXNzIG9mIHRoZSBjdXJyZW50IGNsYXNzIHRoYXQgaW5jbHVkZXMgdGhlIG1lbWJlcnMgaW5kaWNhdGVkXG4gICAqIGluIHRoZSBhcmd1bWVudC4gVGhlIGFyZ3VtZW50IGNhbiBiZSBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0LCBvciBhIGNsYXNzXG4gICAqIHdob3NlIHByb3RvdHlwZSBjb250YWlucyB0aGUgbWVtYmVycyB0aGF0IHdpbGwgYmUgY29waWVkLlxuICAgKlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIGZvciBhIGNvdXBsZSBvZiBwdXJwb3NlczpcbiAgICogMS4gRXh0ZW5kIGEgY2xhc3Mgd2l0aCBtaXhpbnMvYmVoYXZpb3JzLlxuICAgKiAyLiBDcmVhdGUgYSBjb21wb25lbnQgY2xhc3MgaW4gRVM1LlxuICAgKlxuICAgKiBUaGUgY2FsbFxuICAgKlxuICAgKiAgIE15QmFzZUNsYXNzLmNvbXBvc2UoTWl4aW4xLCBNaXhpbjIsIE1peGluMylcbiAgICpcbiAgICogd2lsbCByZXR1cm4gYSBuZXcgY2xhc3Mgb2YgTXlCYXNlQ2xhc3MgdGhhdCBpbXBsZW1lbnRzIGFsbCB0aGUgbWV0aG9kcyBpblxuICAgKiB0aGUgdGhyZWUgbWl4aW5zIGdpdmVuLiBUaGUgYWJvdmUgaXMgZXF1aXZhbGVudCB0b1xuICAgKlxuICAgKiAgIE15QmFzZUNsYXNzLmNvbXBvc2UoTWl4aW4xKS5jb21wb3NlKE1peGluMikuY29tcG9zZShNaXhpbjMpXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGNhbiBiZSBzdGF0aWNhbGx5IGludm9rZWQgdG8gZXh0ZW5kIHBsYWluIG9iamVjdHMgb3IgY2xhc3Nlc1xuICAgKiB0aGF0IGRvbid0IGluaGVyaXQgZnJvbSB0aGlzIGNsYXNzOlxuICAgKlxuICAgKiAgIGxldCBleHRlbmRlZCA9IENvbXBvc2FibGUuZXh0ZW5kLmNhbGwob2JqMSwgb2JqMik7XG4gICAqXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZSguLi5taXhpbnMpIHtcbiAgICAvLyBXZSBjcmVhdGUgYSBuZXcgc3ViY2xhc3MgZm9yIGVhY2ggbWl4aW4gaW4gdHVybi4gVGhlIHJlc3VsdCBiZWNvbWVzXG4gICAgLy8gdGhlIGJhc2UgY2xhc3MgZXh0ZW5kZWQgYnkgYW55IHN1YnNlcXVlbnQgbWl4aW5zLiBJdCB0dXJucyBvdXQgdGhhdFxuICAgIC8vIHdlIGNhbiB1c2UgQXJyYXkucmVkdWNlKCkgdG8gY29uY2lzZWx5IGV4cHJlc3MgdGhpcywgdXNpbmcgdGhlIGN1cnJlbnRcbiAgICAvLyAob3JpZ2luYWwpIGNsYXNzIGFzIHRoZSBzZWVkIGZvciByZWR1Y2UoKS5cbiAgICByZXR1cm4gbWl4aW5zLnJlZHVjZShjb21wb3NlLCB0aGlzKTtcbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRlIFwidGhpc1wiIHdpdGggdGhlIGluZGljYXRlZCBkZWNvcmF0b3JzLiBUaGUgbGF0dGVyIHNob3VsZCBiZSBhXG4gICAqIGRpY3Rpb25hcnkgbWFwcGluZyBwcm9wZXJ0eSBuYW1lcyB0byAocHJvcG9zZWQpIEVTNy1jb21wbGlhbnQgZGVjb3JhdG9ycy5cbiAgICogVGhpcyBhbGxvd3MgdGhlIHVzZSBvZiBkZWNvcmF0b3JzIGluIEVTNi81LiBFeGFtcGxlLCB0aGlzIEVTNyBjb2RlOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyB7XG4gICAqICAgICAgQGRlY29yYXRlKGN1c3RvbURlY29yYXRvcilcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICpcbiAgICogY2FuIGJlIHdyaXR0ZW4gdXNpbmcgdGhlIGRlY29yYXRlKCkgbWV0aG9kIGFzOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyB7XG4gICAqICAgICAgYmFyKCkge31cbiAgICogICB9XG4gICAqICAgQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEZvby5wcm90b3R5cGUsIHsgYmFyOiBjdXN0b21EZWNvcmF0b3IgfSk7XG4gICAqXG4gICAqIE9yLCBpZiBGb28gZGVyaXZlcyBmcm9tIENvbXBvc2FibGUgYWxyZWFkeSwgdGhpcyBjYW4gYmUgc2hvcnRlcjpcbiAgICpcbiAgICogICBjbGFzcyBGb28gZXh0ZW5kcyBDb21wb3NhYmxlIHtcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICogICBGb28ucHJvdG90eXBlLmRlY29yYXRlKHsgYmFyOiBjdXN0b21EZWNvcmF0b3IgfSk7XG4gICAqXG4gICAqL1xuICBzdGF0aWMgZGVjb3JhdGUoZGVjb3JhdG9ycykge1xuICAgIGZvciAobGV0IGtleSBpbiBkZWNvcmF0b3JzKSB7XG4gICAgICBsZXQgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1trZXldO1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIGtleSk7XG4gICAgICBkZWNvcmF0b3IodGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRlcyB0aGUgcHJvdG90eXBlIG9mIGEgY2xhc3MgZGVyaXZlZCBmcm9tIENvbXBvc2FibGUuXG4gICAqIFNlZSBub3RlcyBmb3IgdGhlIHN0YXRpYyBkZWNvcmF0ZSgpIG1ldGhvZC5cbiAgICovXG4gIGRlY29yYXRlKGRlY29yYXRvcnMpIHtcbiAgICBDb21wb3NhYmxlLmRlY29yYXRlLmNhbGwodGhpcywgZGVjb3JhdG9ycyk7XG4gIH1cblxuICAvKlxuICAgKiBEZWNvcmF0b3IgZm9yIGFubm90YXRpbmcgaG93IGEgY2xhc3MgbWVtYmVyIHNob3VsZCBiZSBjb21wb3NlZCBsYXRlci5cbiAgICogVGhpcyB0YWtlcyBhIGRlY29yYXRvciB0aGF0IHdpbGwgYmUgcnVuIGF0ICpjb21wb3NpdGlvbiogdGltZS5cbiAgICogRm9yIG5vdywgdGhpcyBjYW4gb25seSBiZSBhcHBsaWVkIHRvIG1ldGhvZHMuXG4gICAqL1xuICBzdGF0aWMgcnVsZShkZWNvcmF0b3IpIHtcbiAgICAvLyBSZXR1cm4gYSBkZWNvcmF0b3IgdGhhdCByZWNvcmRzIHRoZSBnaXZlbiBkZWNvcmF0b3Igb24gdGhlIG1lbWJlciBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAvLyBUT0RPOiBVc2UgYSBTeW1ib2wgaW5zdGVhZCBvZiBhIHN0cmluZyBwcm9wZXJ0eSBuYW1lIHRvIHNhdmUgdGhpcy5cbiAgICAgIC8vIGRlc2NyaXB0b3IudmFsdWUuX2NvbXBvc2l0aW9uUnVsZSA9IGRlY29yYXRvcjtcbiAgICAgIGlmICghdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzKSB7XG4gICAgICAgIHRhcmdldC5fY29tcG9zaXRpb25SdWxlcyA9IHt9O1xuICAgICAgfVxuICAgICAgdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzW2tleV0gPSBkZWNvcmF0b3I7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vKlxuICogRXhwb3NlIHN0YW5kYXJkIGNvbXBvc2l0aW9uIHJ1bGVzIGFzIHByb3BlcnRpZXMgb2YgQ29tcG9zYWJsZS5cbiAqIFRoaXMgYXZvaWRzIHRoZSBuZWVkIGZvciBzb21lb25lIHRvIG1ha2UgYSBzZXBhcmF0ZSBpbXBvcnQgb2YgdGhlIHJ1bGVzLlxuICovXG5Db21wb3NhYmxlLnJ1bGVzID0gQ29tcG9zaXRpb25SdWxlcztcblxuXG4vKlxuICogQWxsIENvbXBvc2FibGUgb2JqZWN0cyBoYXZlIGEgXCJwcm90b3R5cGVzXCIga2V5IHRoYXQga2VlcHMgcmVmZXJlbmNlcyB0byB0aGVcbiAqIG1peGlucyB0aGF0IHdlcmUgYXBwbGllZCBhbG9uZyB0aGUgcHJvdG90eXBlIGNoYWluLiBXaGVuIGEgKm5hbWVkKiBtaXhpbiBpc1xuICogYXBwbGllZCB0byB0aGUgcHJvdG90eXBlIGNoYWluLCB0aGUgcmVzdWx0aW5nIG9iamVjdCAob3IsIGZvciBhIGNsYXNzLCB0aGVcbiAqIGNsYXNzJyBwcm90b3R5cGUpIHdpbGwgaGF2ZSBhIFwicHJvdG90eXBlc1wiIHZhbHVlIGZvciB0aGF0IG5hbWUgdGhhdCBwb2ludHNcbiAqIGJhY2sgdG8gdGhlIG1peGluLiBUaGF0IGlzLCBhIG1peGluIGNhbiBnZXQgYSBwb2ludGVyIHRvIGl0c2VsZiBpbiB0aGUgY2hhaW4uXG4gKlxuICogQSBzaW5nbGUgbWl4aW4gY2FuIGJlIGFwcGxpZWQgdG8gbXVsdGlwbGUgcHJvdG90eXBlIGNoYWlucyAtLSB0aGUgbmFtZVxuICogcmVmZXJzIHRvIHRoZSBwcm90b3R5cGUgb24gKnRoaXMgcGFydGljdWxhciBwcm90b3R5cGUgY2hhaW4qIHRoYXQgd2FzIGFkZGVkXG4gKiBmb3IgdGhhdCBtaXhpbi4gVGhpcyBsZXRzIG1peGluL21peGluIGNvZGUgZ2V0IGJhY2sgdG8gaXRzIG93blxuICogcHJvdG90eXBlLCBtb3N0IG9mdGVuIGluIGNvbWJpbmF0aW9uIHdpdGggXCJzdXBlclwiIChzZWUgYmVsb3cpIGluIG9yZGVyIHRvXG4gKiBpbnZva2Ugc3VwZXJjbGFzcyBiZWhhdmlvci5cbiAqL1xuQ29tcG9zYWJsZS5wcm90b3R5cGUucHJvdG90eXBlcyA9IHtcbiAgQ29tcG9zYWJsZTogQ29tcG9zYWJsZS5wcm90b3R5cGVcbn07XG5cbi8qXG4gKiBBbGwgQ29tcG9zYWJsZS1jcmVhdGVkIG9iamVjdHMgaGF2ZSBhIFwic3VwZXJcIiBwcm9wZXJ0eSB0aGF0IHJlZmVyZW5jZXMgdGhlXG4gKiBwcm90b3R5cGUgYWJvdmUgdGhlbSBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIFRoaXMgXCJzdXBlclwiIHJlZmVyZW5jZSBpcyB1c2VkIGFzIGEgcmVwbGFjZW1lbnQgZm9yIEVTNidzIFwic3VwZXJcIiBrZXl3b3JkIGluXG4gKiBpbiBFUzUgKG9yIHRyYW5zcGlsZWQgRVM2KSBtaXhpbnMgdGhhdCB3YW50IHRvIGludm9rZSBzdXBlcmNsYXNzIGJlaGF2aW9yLFxuICogd2hlcmUgdGhlIHNwZWNpZmljIHN1cGVyY2xhc3Mgd2lsbCBkZXBlbmQgdXBvbiB3aGljaCBtaXhpbnMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAqIHRvIGEgZ2l2ZW4gcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIEUuZy46XG4gKiAgIGNsYXNzIE1peGluIHtcbiAqICAgICBmb28oKSB7XG4gKiAgICAgICBpZiAodGhpcy5wcm90b3lwZXMuTWl4aW4uc3VwZXIuZm9vKSB7XG4gKiAgICAgICAgIHRoaXMucHJvdG90eXBlcy5NaXhpbi5zdXBlci5mb28uY2FsbCh0aGlzKTsgLy8gSW52b2tlIHN1cGVyY2xhc3MnIGZvbygpXG4gKiAgICAgICB9XG4gKiAgICAgICAvLyBEbyBNaXhpbi1zcGVjaWZpYyB3b3JrIGhlcmUuLi5cbiAqICAgICB9XG4gKiAgIH1cbiAqXG4gKiBGb3IgY29uc2lzdGVuY3ksIENvbXBvc2FibGUgaXRzZWxmIHJlY29yZHMgaXRzIG93biBzdXBlcmNsYXNzIGFzIE9iamVjdC5cbiAqL1xuQ29tcG9zYWJsZS5wcm90b3R5cGUuc3VwZXIgPSBPYmplY3QucHJvdG90eXBlO1xuXG5cbi8vIENvbXBvc2l0aW9uIHJ1bGVzIGZvciBzdGFuZGFyZCBvYmplY3QgbWVtYmVycy5cbkNvbXBvc2FibGUucHJvdG90eXBlLmNvbXBvc2l0aW9uUnVsZXMgPSB7XG4gICdfX21ldGhvZF9fJzogQ29tcG9zYWJsZS5ydWxlcy5iYXNlTWV0aG9kRmlyc3QsXG4gICdfX3Byb3BlcnR5X18nOiBDb21wb3NhYmxlLnJ1bGVzLmJhc2VTZXR0ZXJGaXJzdCxcbiAgJ2NvbXBvc2l0aW9uUnVsZXMnOiBDb21wb3NhYmxlLnJ1bGVzLmNoYWluUHJvdG90eXBlcyxcbiAgJ3Byb3RvdHlwZXMnOiBDb21wb3NhYmxlLnJ1bGVzLmNoYWluUHJvdG90eXBlc1xufTtcblxuXG4vLyBQcm9wZXJ0aWVzIGRlZmluZWQgYnkgRnVuY3Rpb24gdGhhdCB3ZSBkb24ndCB3YW50IHRvIG1peGluLlxuLy8gV2UnZCBwcmVmZXIgdG8gZ2V0IHRoZXNlIGJ5IGludGVycm9nYXRpbmcgRnVuY3Rpb24gaXRzZWxmLCBidXQgV2ViS2l0XG4vLyBmdW5jdGlvbnMgaGF2ZSBzb21lIHByb3BlcnRpZXMgKGFyZ3VtZW50cyBhbmQgY2FsbGVyKSB3aGljaCBhcmUgbm90IHJldHVybmVkXG4vLyBieSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhGdW5jdGlvbikuXG5jb25zdCBOT05fTUlYQUJMRV9GVU5DVElPTl9QUk9QRVJUSUVTID0gW1xuICAnYXJndW1lbnRzJyxcbiAgJ2NhbGxlcicsXG4gICdsZW5ndGgnLFxuICAnbmFtZScsXG4gICdwcm90b3R5cGUnXG5dO1xuXG4vLyBQcm9wZXJ0aWVzIGRlZmluZWQgYnkgT2JqZWN0IHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBtaXhpbi5cbmNvbnN0IE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTID0gW1xuICAnY29uc3RydWN0b3InXG5dO1xuXG5jb25zdCBPUklHSU5BTF9NSVhJTl9TWU1CT0wgPSBTeW1ib2woJ09yaWdpbmFsIG1peGluJyk7XG5cblxuLypcbiAqIEFwcGx5IHRoZSBjb21wb3NpdGlvbiBydWxlcyBpbiBlZmZlY3QgZm9yIHRoZSBnaXZlbiBvYmplY3QsIHdoaWNoIGxpZXMgYXRcbiAqIHRoZSB0aXAgb2YgYSBwcm90b3R5cGUgY2hhaW4uIFRoaXMgbG9va3MgZm9yIGNvbmZsaWN0cyBiZXR3ZWVuIHRoZSBvYmplY3Qnc1xuICogb3duIHByb3BlcnRpZXMgKGFuZCBtZXRob2RzKSwgYW5kIGlkZW50aWNhbGx5LW5hbWVkIHByb3BlcnRpZXMgKG1ldGhvZHMpXG4gKiBmdXJ0aGVyIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uIENvbmZsaWN0cyBhcmUgcmVzb2x2ZWQgd2l0aCBydWxlcyBkZWZpbmVkIGJ5XG4gKiB0aGUgYWZmZWN0IG1lbWJlcnMuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5Q29tcG9zaXRpb25SdWxlcyhvYmopIHtcbiAgbGV0IG93bkNvbXBvc2l0aW9uUnVsZXMgPSBvYmouaGFzT3duUHJvcGVydHkoJ19jb21wb3NpdGlvblJ1bGVzJykgP1xuICAgIG9iai5fY29tcG9zaXRpb25SdWxlcyA6XG4gICAge307XG4gIGxldCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzID0gb2JqLmNvbXBvc2l0aW9uUnVsZXM7XG4gIGxldCBkZWZhdWx0Q29tcG9zaXRpb25SdWxlcyA9IENvbXBvc2FibGUucHJvdG90eXBlLmNvbXBvc2l0aW9uUnVsZXM7XG5cbiAgLy8gRm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgc2VlIGlmIHRoZSBiYXNlIGhhcyBhIHByb3BlcnR5IHdpdGggdGhlIHNhbWUgbmFtZS5cbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGlmIChuYW1lIGluIGJhc2UgJiYgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA8IDApIHtcbiAgICAgIC8vIEJhc2UgZG9lcyBpbXBsZW1lbnQgYSBtZW1iZXIgd2l0aCB0aGUgc2FtZSBuYW1lOyBuZWVkIHRvIGNvbWJpbmUuXG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgICAgIGxldCBrZXkgPSBnZXRHZW5lcmFsRGVzY3JpcHRvcktleShkZXNjcmlwdG9yKTtcblxuICAgICAgLy8gU2VlIGlmIHRoaXMgcHJvcGVydHkgaGFzIGEgcnVsZSBhc3NvY2lhdGVkIHdpdGggaXQsIGNoZWNraW5nOlxuICAgICAgbGV0IHJ1bGUgPSBvd25Db21wb3NpdGlvblJ1bGVzW25hbWVdICAgIC8vIG9iamVjdCBpdHNlbGZcbiAgICAgICAgICB8fCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzW25hbWVdICAvLyBpbmhlcml0ZWQgcnVsZXMgZm9yIG5hbWVcbiAgICAgICAgICB8fCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzW2tleV0gICAvLyBpbmhlcml0ZWQgcnVsZXMgZ2VuZXJhbGx5XG4gICAgICAgICAgfHwgZGVmYXVsdENvbXBvc2l0aW9uUnVsZXNbbmFtZV0gICAgLy8gZGVmYXVsdCBydWxlcyBmb3IgbmFtZVxuICAgICAgICAgIHx8IGRlZmF1bHRDb21wb3NpdGlvblJ1bGVzW2tleV07ICAgIC8vIGRlZmF1bHQgcnVsZXMgZ2VuZXJhbGx5XG5cbiAgICAgIC8vIFwib3ZlcnJpZGVcIiBpcyBhIGtub3duIG5vLW9wLCBzbyB3ZSBkb24ndCBib3RoZXIgdHJ5aW5nIHRvIHJlZGVmaW5lIHRoZVxuICAgICAgLy8gcHJvcGVydHkuXG4gICAgICBpZiAocnVsZSAmJiBydWxlICE9PSBDb21wb3NhYmxlLnJ1bGVzLm92ZXJyaWRlKSB7XG4gICAgICAgIHJ1bGUob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuXG4vKlxuICogQ29weSB0aGUgZ2l2ZW4gcHJvcGVydGllcy9tZXRob2RzIHRvIHRoZSB0YXJnZXQuXG4gKiBSZXR1cm4gdGhlIHVwZGF0ZWQgdGFyZ2V0LlxuICovXG5mdW5jdGlvbiBjb3B5T3duUHJvcGVydGllcyhzb3VyY2UsIHRhcmdldCwgaWdub3JlUHJvcGVydHlOYW1lcyA9IFtdKSB7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICBpZiAoaWdub3JlUHJvcGVydHlOYW1lcy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gYSBuZXcgc3ViY2xhc3Mvb2JqZWN0IHRoYXQgZXh0ZW5kcyB0aGUgZ2l2ZW4gYmFzZSBjbGFzcy9vYmplY3Qgd2l0aFxuICogdGhlIG1lbWJlcnMgb2YgdGhlIGluZGljYXRlZCBtaXhpbi5cbiAqL1xuZnVuY3Rpb24gY29tcG9zZShiYXNlLCBtaXhpbikge1xuXG4gIC8vIFNlZSBpZiB0aGUgKm1peGluKiBoYXMgYSBiYXNlIGNsYXNzL3Byb3RvdHlwZSBvZiBpdHMgb3duLlxuICBsZXQgbWl4aW5Jc0NsYXNzID0gaXNDbGFzcyhtaXhpbik7XG4gIGxldCBtaXhpbkJhc2UgPSBtaXhpbklzQ2xhc3MgP1xuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihtaXhpbi5wcm90b3R5cGUpLmNvbnN0cnVjdG9yIDpcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWl4aW4pO1xuICBpZiAobWl4aW5CYXNlICYmXG4gICAgICBtaXhpbkJhc2UgIT09IEZ1bmN0aW9uICYmXG4gICAgICBtaXhpbkJhc2UgIT09IE9iamVjdCAmJlxuICAgICAgbWl4aW5CYXNlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgLy8gVGhlIG1peGluIGl0c2VsZiBkZXJpdmVzIGZyb20gYW5vdGhlciBjbGFzcy9vYmplY3QuXG4gICAgLy8gUmVjdXJzZSwgYW5kIGV4dGVuZCB3aXRoIHRoZSBtaXhpbidzIGJhc2UgZmlyc3QuXG4gICAgYmFzZSA9IGNvbXBvc2UoYmFzZSwgbWl4aW5CYXNlKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgZXh0ZW5kZWQgb2JqZWN0IHdlJ3JlIGdvaW5nIHRvIHJldHVybiBhcyBhIHJlc3VsdC5cbiAgbGV0IGJhc2VJc0NsYXNzID0gaXNDbGFzcyhiYXNlKTtcbiAgbGV0IHJlc3VsdCA9IGJhc2VJc0NsYXNzID9cbiAgICBjcmVhdGVTdWJjbGFzcyhiYXNlKSA6XG4gICAgT2JqZWN0LmNyZWF0ZShiYXNlKTtcblxuICAvLyBDaGVjayB0byBtYWtlIHN1cmUgd2UncmUgbm90IGV4dGVuZGluZyB0aGUgYmFzZSB3aXRoIGEgcHJvdG90eXBlIHRoYXQgd2FzXG4gIC8vIGFscmVhZHkgY29tcG9zZWQgaW50byB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluLlxuICBsZXQgYmFzZVByb3RvdHlwZSA9IGJhc2VJc0NsYXNzID8gYmFzZS5wcm90b3R5cGUgOiBiYXNlO1xuICBsZXQgbWl4aW5Qcm90b3R5cGUgPSBtaXhpbklzQ2xhc3MgPyBtaXhpbi5wcm90b3R5cGUgOiBtaXhpbjtcbiAgaWYgKG9iamVjdEhhc1Byb3RvdHlwZShiYXNlUHJvdG90eXBlLCBtaXhpblByb3RvdHlwZSlcbiAgICAgIHx8IG9iamVjdEhhc01peGluKGJhc2VQcm90b3R5cGUsIG1peGluKSkge1xuICAgIC8vIFNraXAgdGhpcyBtaXhpbiwgcmV0dXJuIHJlc3VsdCBhcyBpcy5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gVGhlIFwidGFyZ2V0XCIgaGVyZSBpcyB0aGUgdGFyZ2V0IG9mIG91ciBwcm9wZXJ0eS9tZXRob2QgY29tcG9zaXRpb24gcnVsZXMuXG4gIGxldCB0YXJnZXQ7XG4gIGlmIChiYXNlSXNDbGFzcyAmJiBtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgY2xhc3Mgd2l0aCBjbGFzczogY29weSBzdGF0aWMgbWVtYmVycywgdGhlbiBwcm90b3R5cGUgbWVtYmVycy5cbiAgICBjb3B5T3duUHJvcGVydGllcyhtaXhpbiwgcmVzdWx0LCBOT05fTUlYQUJMRV9GVU5DVElPTl9QUk9QRVJUSUVTKTtcbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbi5wcm90b3R5cGUsIHJlc3VsdC5wcm90b3R5cGUsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIGlmICghYmFzZUlzQ2xhc3MgJiYgbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIHBsYWluIG9iamVjdCB3aXRoIGNsYXNzOiBjb3B5IHByb3RvdHlwZSBtZXRob2RzIHRvIHJlc3VsdC5cbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbi5wcm90b3R5cGUsIHJlc3VsdCwgTk9OX01JWEFCTEVfRlVOQ1RJT05fUFJPUEVSVElFUyk7XG4gIH0gZWxzZSBpZiAoYmFzZUlzQ2xhc3MgJiYgIW1peGluSXNDbGFzcykge1xuICAgIC8vIEV4dGVuZGluZyBjbGFzcyB3aXRoIHBsYWluIG9iamVjdDogY29weSBtaXhpbiB0byByZXN1bHQgcHJvdG90eXBlLlxuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCByZXN1bHQucHJvdG90eXBlLCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRXh0ZW5kaW5nIHBsYWluIG9iamVjdCB3aXRoIHBsYWluIG9iamVjdDogY29weSBmb3JtZXIgdG8gbGF0dGVyLlxuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCByZXN1bHQsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgfVxuXG4gIGlmIChtaXhpbi5uYW1lKSB7XG4gICAgLy8gVXNlIHRoZSBtaXhpbidzIG5hbWUgKHVzdWFsbHkgdGhlIG5hbWUgb2YgYSBjbGFzcycgY29uc3RydWN0b3IpIHRvXG4gICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSBiYWNrIHRvIHRoZSB0aXAgb2YgdGhlIG5ld2x5LWV4dGVuZGVkIHByb3RvdHlwZSBjaGFpbi5cbiAgICAvLyBTZWUgbm90ZXMgYXQgQ29tcG9zYWJsZSdzIFwicHJvdG90eXBlc1wiIHByb3BlcnR5LlxuICAgIHRhcmdldC5wcm90b3R5cGVzID0ge307XG4gICAgdGFyZ2V0LnByb3RvdHlwZXNbbWl4aW4ubmFtZV0gPSB0YXJnZXQ7XG5cbiAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBzdXBlcmNsYXNzL3N1cGVyLW9iamVjdC4gU2VlIHRoZSBjb21tZW50cyBvblxuICAgIC8vIENvbXBvc2FibGUncyBcInN1cGVyXCIgcHJvcGVydHkuXG4gICAgdGFyZ2V0LnN1cGVyID0gYmFzZUlzQ2xhc3MgPyBiYXNlLnByb3RvdHlwZSA6IGJhc2U7XG4gIH1cblxuICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBtaXhpbiB0aGF0IHdhcyBjb21wb3NlZCBpbiBhdCB0aGlzIHBvaW50LlxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBPUklHSU5BTF9NSVhJTl9TWU1CT0wsIHtcbiAgICB2YWx1ZTogbWl4aW5cbiAgfSk7XG5cbiAgLy8gQXBwbHkgdGhlIGNvbXBvc2l0aW9uIHJ1bGVzIGluIGVmZmVjdCBhdCB0aGUgdGFyZ2V0LlxuICBhcHBseUNvbXBvc2l0aW9uUnVsZXModGFyZ2V0KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gYSBuZXcgc3ViY2xhc3Mgb2YgdGhlIGdpdmVuIGJhc2UgY2xhc3MuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN1YmNsYXNzKGJhc2UpIHtcbiAgLy8gT25jZSBXZWJLaXQgc3VwcG9ydHMgSFRNTEVsZW1lbnQgYXMgYSByZWFsIGNsYXNzLCB3ZSBjYW4ganVzdCBzYXk6XG4gIC8vXG4gIC8vICAgY2xhc3Mgc3ViY2xhc3MgZXh0ZW5kcyBiYXNlIHt9XG4gIC8vXG4gIC8vIEhvd2V2ZXIsIHVudGlsIHRoYXQncyByZXNvbHZlZCwgd2UganVzdCBjb25zdHJ1Y3QgdGhlIGNsYXNzIG91cnNlbHZlcy5cbiAgZnVuY3Rpb24gc3ViY2xhc3MoKSB7fTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLCBiYXNlKTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLnByb3RvdHlwZSwgYmFzZS5wcm90b3R5cGUpO1xuICByZXR1cm4gc3ViY2xhc3M7XG59XG5cblxuLypcbiAqIEV4YW1pbmUgdGhlIGRlc2NyaXB0b3IgdG8gZGV0ZXJtaW5lIHdoaWNoIHJ1bGUga2V5IGFwcGxpZXMuXG4gKi9cbmZ1bmN0aW9uIGdldEdlbmVyYWxEZXNjcmlwdG9yS2V5KGRlc2NyaXB0b3IpIHtcbiAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gTWV0aG9kXG4gICAgcmV0dXJuICdfX21ldGhvZF9fJztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbidcbiAgICAgIHx8IHR5cGVvZiBkZXNjcmlwdG9yLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFByb3BlcnR5IHdpdGggZ2V0dGVyIGFuZC9vciBzZXR0ZXJcbiAgICByZXR1cm4gJ19fcHJvcGVydHlfXyc7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuLypcbiAqIFJldHVybiB0cnVlIGlmIGMgaXMgYSBKYXZhU2NyaXB0IGNsYXNzLlxuICpcbiAqIFdlIHVzZSB0aGlzIHRlc3QgYmVjYXVzZSwgb24gV2ViS2l0LCBjbGFzc2VzIGxpa2UgSFRNTEVsZW1lbnQgYXJlIHNwZWNpYWwsXG4gKiBhbmQgYXJlIG5vdCBpbnN0YW5jZXMgb2YgRnVuY3Rpb24uIFRvIGhhbmRsZSB0aGF0IGNhc2UsIHdlIHVzZSBhIGxvb3NlclxuICogZGVmaW5pdGlvbjogYW4gb2JqZWN0IGlzIGEgY2xhc3MgaWYgaXQgaGFzIGEgcHJvdG90eXBlLCBhbmQgdGhhdCBwcm90b3R5cGVcbiAqIGhhcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgdGhlIG9yaWdpbmFsIG9iamVjdC4gVGhpcyBjb25kaXRpb24gaG9sZHMgdHJ1ZSBldmVuXG4gKiBmb3IgSFRNTEVsZW1lbnQgb24gV2ViS2l0LlxuICovXG5mdW5jdGlvbiBpc0NsYXNzKGMpIHtcbiAgcmV0dXJuIHR5cGVvZiBjID09PSAnZnVuY3Rpb24nIHx8ICAgICAgICAgICAgICAgICAgIC8vIFN0YW5kYXJkXG4gICAgICAoYy5wcm90b3R5cGUgJiYgYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPT09IGMpOyAvLyBIVE1MRWxlbWVudCBpbiBXZWJLaXRcbn1cblxuXG4vKlxuICogUmV0dXJuIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBlaXRoZXIgaGFzIHRoZSBnaXZlbiBwcm90b3R5cGUgb24gaXRzXG4gKiBjaGFpbi5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0SGFzUHJvdG90eXBlKG9iaiwgcHJvdG90eXBlKSB7XG4gIGlmIChwcm90b3R5cGUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgIC8vIFRoZSBwcm90b3R5cGUgaXMgYSBwbGFpbiBvYmplY3QuXG4gICAgLy8gT25seSBjYXNlIHRvIGRlZmVuZCBhZ2FpbnN0IGlzIHNvbWVvbmUgdHJ5aW5nIHRvIG1peGluIE9iamVjdCBpdHNlbGYuXG4gICAgcmV0dXJuIChwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUpO1xuICB9XG4gIGlmIChvYmogPT09IHByb3RvdHlwZSB8fCBvYmogaW5zdGFuY2VvZiBwcm90b3R5cGUuY29uc3RydWN0b3IpIHtcbiAgICAvLyBUaGUgcHJvdG90eXBlIHdhcyBmb3VuZCBhbG9uZyB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKlxuICogUmV0dXJuIHRydWUgaWYgdGhlIGdpdmVuIG1peGluIHdhcyB1c2VkIHRvIGNyZWF0ZSBhbnkgb2YgdGhlIHByb3RvdHlwZXMgb25cbiAqIG9uIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4uXG4gKi9cbmZ1bmN0aW9uIG9iamVjdEhhc01peGluKG9iaiwgbWl4aW4pIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgT1JJR0lOQUxfTUlYSU5fU1lNQk9MKTtcbiAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZSA9PT0gbWl4aW4pIHtcbiAgICAvLyBUaGUgZ2l2ZW4gbWl4aW4gd2FzLCBpbiBmYWN0LCBjb21wb3NlZCBpbnRvIHRoaXMgcHJvdG90eXBlIGNoYWluLlxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvYmplY3RIYXNNaXhpbihPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSwgbWl4aW4pO1xufVxuIiwiLyoqXG4gKiBTdGFuZGFyZCBjb21wb3NpdGlvbiBydWxlc1xuICovXG5cbi8qXG4gKiBUYWtlIHR3byBmdW5jdGlvbnMgYW5kIHJldHVybiBhIG5ldyBjb21wb3NlZCBmdW5jdGlvbiB0aGF0IGludm9rZXMgYm90aC5cbiAqIFRoZSBjb21wb3NlZCBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBzZWNvbmQgZnVuY3Rpb24uXG4gKiBUaGlzIGlzIG5vdCBhIHJ1bGUsIGJ1dCBhIGhlbHBlciB1c2VkIGJ5IHJ1bGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUZ1bmN0aW9uKGZ1bmN0aW9uMSwgZnVuY3Rpb24yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cblxuLypcbiAqIENvbWJpbmF0b3IgdGhhdCBzZXRzIHRoZSBwcm90b3R5cGUgb2YgYSBtaXhpbiBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgdmFsdWUgb24gdGhlIGJhc2UuIFRoaXMgZWZmZWN0aXZlbHkgZG9lcyBhIHNoYWxsb3cgbWVyZ2Ugb2ZcbiAqIG9mIHRoZSBwcm9wZXJ0aWVzLCB3aXRob3V0IGNvcHlpbmcgYW55IGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hhaW5Qcm90b3R5cGVzKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpblZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIGtleSk7XG4gIGxldCBiYXNlVmFsdWUgPSBiYXNlRGVzY3JpcHRvci52YWx1ZTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG1peGluVmFsdWUsIGJhc2VWYWx1ZSk7XG59XG5cblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjb21wbGV0ZSBhIHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGEgbWl4aW4uXG4gKlxuICogRGVmYXVsdCBKYXZhU2NyaXB0IGJlaGF2aW9yIGlzIHRoYXQgYSBzdWJjbGFzcyB0aGF0IGRlZmluZXMgYSBnZXR0ZXIgYnV0IG5vdFxuICogYSBzZXR0ZXIgd2lsbCBuZXZlciBoYXZlIHRoZSBiYXNlIGNsYXNzJyBzZXR0ZXIgaW52b2tlZC4gU2ltaWxhcmx5LCBhXG4gKiBzdWJjbGFzcyB0aGF0IGRlZmluZXMgYSBzZXR0ZXIgYnV0IG5vdCBhIGdldHRlciB3aWxsIG5ldmVyIGhhdmUgdGhlIGJhc2VcbiAqIGNsYXNzJyBnZXR0ZXIgaW52b2tlZC5cbiAqXG4gKiBGb3IgbWl4aW5zLCB3ZSB3YW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHRvIGJlIHRoYXQsIGlmIGEgbWl4aW4gb25seSBkZWZpbmVzXG4gKiBhIGdldHRlciwgYnV0IHRoZSBiYXNlIGNsYXNzIGRlZmluZXMgYSBzZXR0ZXIsIHdlIHdhbnQgdGhlIG1peGluIHRvIGFjcXVpcmVcbiAqIGEgZGVmYXVsdCBzZXR0ZXIgdGhhbiBpbnZva2VzIHRoZSBiYXNlIHNldHRlci4gTGlrZXdpc2UsIHdlIHdhbnQgdG8gZGVmaW5lXG4gKiBhIGRlZmF1bHQgZ2V0dGVyIGlmIG5vbmUgaXMgc3VwcGxpZWQuXG4gKlxuICogVG8gY2FycnkgdGhhdCBvdXQsIHRoaXMgaGVscGVyIGZ1bmN0aW9uIHJvdW5kcyBvdXQgYSBwcm9wZXJ0eSBkZWZpbml0aW9uIHRvXG4gKiBlbnN1cmUgaXQgaGFzIGEgZGVmYXVsdCBnZXR0ZXIgb3Igc2V0dGVyIGlmIGl0IG5lZWRzIG9uZS5cbiAqL1xuZnVuY3Rpb24gY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpIHtcbiAgaWYgKGRlc2NyaXB0b3IuZ2V0ICYmICFkZXNjcmlwdG9yLnNldCAmJiBiYXNlRGVzY3JpcHRvci5zZXQpIHtcbiAgICAvLyBNaXhpbiBoYXMgZ2V0dGVyIGJ1dCBuZWVkcyBhIGRlZmF1bHQgc2V0dGVyLlxuICAgIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICAgIGRlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGJhc2VTZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgfTtcbiAgfVxuICBpZiAoZGVzY3JpcHRvci5zZXQgJiYgIWRlc2NyaXB0b3IuZ2V0ICYmIGJhc2VEZXNjcmlwdG9yLmdldCkge1xuICAgIC8vIE1peGluIGhhcyBzZXR0ZXIgYnV0IG5lZWRzIGEgZGVmYXVsdCBnZXR0ZXIuXG4gICAgbGV0IGJhc2VHZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5nZXQ7XG4gICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBiYXNlR2V0dGVyLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgfVxufVxuXG5cbi8qXG4gKiBQZXJmb3JtIGEgZGVlcCBtZXJnZSBvZiBhIG1peGluIHByb3BlcnR5IG9uIHRvcCBvZiBhIGJhc2UgcHJvcGVydHkuXG4gKi9cbi8vIGV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2UodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbi8vICAgbGV0IG1peGluVmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuLy8gICBsZXQgYmFzZVZhbHVlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClba2V5XS52YWx1ZTtcbi8vICAgZGVzY3JpcHRvci52YWx1ZSA9ICdtZXJnZWQnOyAvLyBtZXJnZShiYXNlVmFsdWUsIG1peGluVmFsdWUpO1xuLy8gfVxuXG4vKlxuICogSGVscGVyIHRvIHJldHVybiB0aGUgYmFzZSBkZXNjcmlwdG9yIGZvciB0aGUgaW5kaWNhdGVkIGtleS4gVGhpcyBpcyB1c2VkIHRvXG4gKiBmaW5kIHRoZSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiB0aGF0IHdvdWxkIG90aGVyd2lzZSBiZSBvdmVycmlkZGVuIGJ5IHRoZVxuICogbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSkge1xuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICByZXR1cm4gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIGtleSk7XG59XG5cblxuLypcbiAqIExpa2UgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpLCBidXQgd2Fsa3MgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAqIFRoaXMgaXMgbmVlZGVkIGJ5IGNvbXBvc2l0aW9uIHJ1bGVzLCB3aGljaCB1c3VhbGx5IHN0YXJ0IG91dCBieSBnZXR0aW5nXG4gKiB0aGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBhIG1lbWJlciB0aGV5J3JlIGNvbXBvc2luZy5cbiAqIFRoaXMgaXMgbm90IGEgcnVsZSwgYnV0IGEgaGVscGVyIHVzZWQgYnkgcnVsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKSB7XG4gIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xuICBpZiAoZGVzY3JpcHRvcikge1xuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9IGVsc2Uge1xuICAgIGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAvLyBDaGVja2luZyBmb3IgXCJuYW1lIGluIHByb3RvdHlwZVwiIGxldHMgdXMga25vdyB3aGV0aGVyIHdlIHNob3VsZCBib3RoZXJcbiAgICAvLyB3YWxraW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgaWYgKHByb3RvdHlwZSAmJiBuYW1lIGluIHByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuIGdldFByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIG5hbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkOyAvLyBOb3QgZm91bmRcbn1cblxuXG4vKlxuICogQ29tYmluYXRvciB0aGF0IGNhdXNlcyBhIG1peGluIG1ldGhvZCB0byBvdmVycmlkZSBpdHMgYmFzZSBpbXBsZW1lbnRhdGlvbi5cbiAqIFNpbmNlIHRoaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIHByb3RvdHlwZSBjaGFpbiwgdGhpcyBpcyBhIG5vLW9wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb3ZlcnJpZGUodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHt9XG5cblxuLypcbiAqIENvbXBvc2UgbWV0aG9kcywgaW52b2tpbmcgYmFzZSBpbXBsZW1lbnRhdGlvbiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhXG4gKiB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkIGltbWVkaWF0ZWx5LiBPdGhlcndpc2UsIHRoZSBtaXhpblxuICogaW1wbGVtZW50YXRpb24ncyByZXN1bHQgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJCYXNlUmVzdWx0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYmFzZUltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgfHwgbWl4aW5JbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5cbi8qXG4gKiBMaWtlIHByZWZlckJhc2VSZXN1bHQsIGJ1dCBmb3IgZ2V0dGVyL3NldHRlcnMuIFRoZSBiYXNlIGdldHRlciBpcyBpbnZva2VkXG4gKiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhIHRydXRoeSByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgdGhlIG1peGluXG4gKiBnZXR0ZXIncyByZXN1bHQgaXMgcmV0dXJuZWQuIFNldHRlciBpcyBpbnZva2VkIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJCYXNlR2V0dGVyKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkdldHRlciA9IGRlc2NyaXB0b3IuZ2V0O1xuICBsZXQgbWl4aW5TZXR0ZXIgPSBkZXNjcmlwdG9yLnNldDtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUdldHRlciA9IGJhc2VEZXNjcmlwdG9yLmdldDtcbiAgbGV0IGJhc2VTZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5zZXQ7XG4gIGlmIChtaXhpbkdldHRlciAmJiBiYXNlR2V0dGVyKSB7XG4gICAgLy8gQ29tcG9zZSBnZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmFzZUdldHRlci5hcHBseSh0aGlzKSB8fCBtaXhpbkdldHRlci5hcHBseSh0aGlzKTtcbiAgICB9O1xuICB9XG4gIGlmIChtaXhpblNldHRlciAmJiBiYXNlU2V0dGVyKSB7XG4gICAgLy8gQ29tcG9zZSBzZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gY29tcG9zZUZ1bmN0aW9uKGJhc2VTZXR0ZXIsIG1peGluU2V0dGVyKTtcbiAgfVxuICBjb21wbGV0ZVByb3BlcnR5RGVmaW5pdGlvbihkZXNjcmlwdG9yLCBiYXNlRGVzY3JpcHRvcik7XG59XG5cblxuLypcbiAqIExpa2UgcHJlZmVyTWl4aW5SZXN1bHQsIGJ1dCBmb3IgZ2V0dGVyL3NldHRlcnMuIFRoZSBtaXhpbiBnZXR0ZXIgaXMgaW52b2tlZFxuICogZmlyc3QuIElmIGl0IHJldHVybnMgYSB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIHRoZSBiYXNlXG4gKiBnZXR0ZXIncyByZXN1bHQgaXMgcmV0dXJuZWQuIFNldHRlciBpcyBzdGlsbCBpbnZva2VkIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJNaXhpbkdldHRlcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5HZXR0ZXIgPSBkZXNjcmlwdG9yLmdldDtcbiAgbGV0IG1peGluU2V0dGVyID0gZGVzY3JpcHRvci5zZXQ7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VHZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5nZXQ7XG4gIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICBpZiAobWl4aW5HZXR0ZXIgJiYgYmFzZUdldHRlcikge1xuICAgIC8vIENvbXBvc2UgZ2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1peGluR2V0dGVyLmFwcGx5KHRoaXMpIHx8IGJhc2VHZXR0ZXIuYXBwbHkodGhpcyk7XG4gICAgfTtcbiAgfVxuICBpZiAobWl4aW5TZXR0ZXIgJiYgYmFzZVNldHRlcikge1xuICAgIC8vIENvbXBvc2Ugc2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLnNldCA9IGNvbXBvc2VGdW5jdGlvbihiYXNlU2V0dGVyLCBtaXhpblNldHRlcik7XG4gIH1cbiAgY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpO1xufVxuXG5cbi8qXG4gKiBDb21wb3NlIG1ldGhvZHMsIGludm9raW5nIG1peGluIGltcGxlbWVudGF0aW9uIGZpcnN0LiBJZiBpdCByZXR1cm5zIGEgdHJ1dGh5XG4gKiByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQgaW1tZWRpYXRlbHkuIE90aGVyd2lzZSwgdGhlIGJhc2UgaW1wbGVtZW50YXRpb24nc1xuICogcmVzdWx0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyTWl4aW5SZXN1bHQodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlSW1wbGVtZW50YXRpb24gPSBiYXNlRGVzY3JpcHRvci52YWx1ZTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtaXhpbkltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgfHwgYmFzZUltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuXG4vKlxuICogRGVmYXVsdCBydWxlIGZvciBjb21wb3NpbmcgbWV0aG9kczogaW52b2tlIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYXNlTWV0aG9kRmlyc3QodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlSW1wbGVtZW50YXRpb24gPSBiYXNlRGVzY3JpcHRvci52YWx1ZTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGNvbXBvc2VGdW5jdGlvbihiYXNlSW1wbGVtZW50YXRpb24sIG1peGluSW1wbGVtZW50YXRpb24pO1xufVxuXG5cbi8qXG4gKiBEZWZhdWx0IHJ1bGUgZm9yIGNvbXBvc2luZyBwcm9wZXJ0aWVzLlxuICogV2Ugb25seSBjb21wb3NlIHNldHRlcnMsIHdoaWNoIGludm9rZSBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICogQSBkZWZpbmVkIG1peGluIGdldHRlciBvdmVycmlkZXMgYSBiYXNlIGdldHRlci5cbiAqIE5vdGUgdGhhdCwgYmVjYXVzZSBvZiB0aGUgd2F5IHByb3BlcnR5IGRlc2NyaXB0b3JzIHdvcmssIGlmIHRoZSBtaXhpbiBvbmx5XG4gKiBkZWZpbmVzIGEgc2V0dGVyLCBidXQgbm90IGEgZ2V0dGVyLCB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgZ2V0dGVyIHRoYXRcbiAqIGludm9rZXMgdGhlIGJhc2UgZ2V0dGVyLiBTaW1pbGFybHksIGlmIHRoZSBtaXhpbiBqdXN0IGRlZmluZXMgYSBnZXR0ZXIsXG4gKiB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgc2V0dGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZVNldHRlckZpcnN0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpblNldHRlciA9IGRlc2NyaXB0b3Iuc2V0O1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICBpZiAobWl4aW5TZXR0ZXIgJiYgYmFzZVNldHRlcikge1xuICAgIC8vIENvbXBvc2Ugc2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLnNldCA9IGNvbXBvc2VGdW5jdGlvbihiYXNlU2V0dGVyLCBtaXhpblNldHRlcik7XG4gIH1cbiAgY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpO1xufVxuIiwiLypcbiAqIE1hcnNoYWxsIGF0dHJpYnV0ZXMgdG8gcHJvcGVydGllcyAoYW5kIGV2ZW50dWFsbHkgdmljZSB2ZXJzYSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0cmlidXRlTWFyc2hhbGxpbmcge1xuXG4gIC8qXG4gICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgYXR0cmlidXRlIHdpdGggdGhlIGdpdmVuIG5hbWUuXG4gICAqL1xuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgLy8gSWYgdGhlIGF0dHJpYnV0ZSBuYW1lIGNvcnJlc3BvbmRzIHRvIGEgcHJvcGVydHkgbmFtZSwgdGhlbiBzZXQgdGhhdFxuICAgIC8vIHByb3BlcnR5LiBJZ25vcmUgY2hhbmdlcyBpbiBzdGFuZGFyZCBIVE1MRWxlbWVudCBwcm9wZXJ0aWVzLlxuICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVUb1Byb3BlcnR5TmFtZShuYW1lKTtcbiAgICBpZiAocHJvcGVydHlOYW1lIGluIHRoaXMgJiYgIShwcm9wZXJ0eU5hbWUgaW4gSFRNTEVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmF0dHJpYnV0ZXMsIGF0dHJpYnV0ZSA9PiB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGUubmFtZSwgdW5kZWZpbmVkLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuXG4vLyBDb252ZXJ0IGNhbWVsIGNhc2UgZm9vQmFyIG5hbWUgdG8gaHlwaGVuYXRlZCBmb28tYmFyLlxuZnVuY3Rpb24gYXR0cmlidXRlVG9Qcm9wZXJ0eU5hbWUoYXR0cmlidXRlTmFtZSkge1xuICBsZXQgcHJvcGVydHlOYW1lID0gYXR0cmlidXRlTmFtZS5yZXBsYWNlKC8tKFthLXpdKS9nLCBtID0+IG1bMV0udG9VcHBlckNhc2UoKSk7XG4gIHJldHVybiBwcm9wZXJ0eU5hbWU7XG59XG5cbi8vIENvbnZlcnQgaHlwaGVuYXRlZCBmb28tYmFyIG5hbWUgdG8gY2FtZWwgY2FzZSBmb29CYXIuXG5mdW5jdGlvbiBwcm9wZXJ0eVRvQXR0cmlidXRlTmFtZShwcm9wZXJ0eU5hbWUpIHtcbiAgbGV0IGF0dHJpYnV0ZU5hbWUgPSBwcm9wZXJ0eU5hbWUucmVwbGFjZSgvKFthLXpdW0EtWl0pL2csIGcgPT4gZ1swXSArICctJyArIGdbMV0udG9Mb3dlckNhc2UoKSk7XG4gIHJldHVybiBhdHRyaWJ1dGVOYW1lO1xufVxuIiwiLypcbiAqIFBvbHltZXItc3R5bGUgYXV0b21hdGljIG5vZGUgZmluZGluZy5cbiAqIFNlZSBodHRwczovL3d3dy5wb2x5bWVyLXByb2plY3Qub3JnLzEuMC9kb2NzL2Rldmd1aWRlL2xvY2FsLWRvbS5odG1sI25vZGUtZmluZGluZy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvbWF0aWNOb2RlRmluZGluZyB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgIHRoaXMuJCA9IHt9O1xuICAgICAgdmFyIG5vZGVzV2l0aElkcyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRdJyk7XG4gICAgICBbXS5mb3JFYWNoLmNhbGwobm9kZXNXaXRoSWRzLCBub2RlID0+IHtcbiAgICAgICAgdmFyIGlkID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgIHRoaXMuJFtpZF0gPSBub2RlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiIsIi8qXG4gKiBBIGNvbXBvc2FibGUgSFRNTCBlbGVtZW50LlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgcHJvdmlkZWQganVzdCBhcyBhIGNvbnZlbmllbmNlLiBPbmUgY291bGQgYWxzbyBzdGFydCB3aXRoXG4gKiBIVE1MRWxlbWVudCBhdCB0aGUgdG9wIGxldmVsLCBhbmQgYWRkIGV4dGVuc2liaWxpdHkgYnkgbWl4aW5nIGluIENvbXBvc2FibGUuXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbi8vIFdlIHVzZSBFeHRlbnNpYmxlIHRvIGFkZCBpdHMgb3duIG1lbWJlcnMgdG8gYSBIVE1MRWxlbWVudCBzdWJjbGFzcy5cbi8vIFRoZSByZXN1bHQgaXMgYW4gSFRNTEVsZW1lbnQgd2l0aCAuZXh0ZW5kKCkgYW5kIHN1cGVyKCkgc3VwcG9ydC5cbmxldCBDb21wb3NhYmxlRWxlbWVudCA9IENvbXBvc2FibGUuY29tcG9zZS5jYWxsKEhUTUxFbGVtZW50LCBDb21wb3NhYmxlKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zYWJsZUVsZW1lbnQ7XG4iLCIvKlxuICogQSBzYW1wbGUgZ2VuZXJhbC1wdXJwb3NlIGJhc2UgY2xhc3MgZm9yIGRlZmluaW5nIGN1c3RvbSBlbGVtZW50cyB0aGF0IG1peGVzXG4gKiBpbiBzb21lIGNvbW1vbiBmZWF0dXJlczogdGVtcGxhdGUgc3RhbXBpbmcgaW50byBhIHNoYWRvdyByb290LCBhdXRvbWF0aWMgbm9kZVxuICogZmluZGluZywgYW5kIG1hcnNoYWxsaW5nIGJldHdlZW4gYXR0cmlidXRlcyBhbmQgcHJvcGVydGllcy5cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZUVsZW1lbnQgZnJvbSAnLi9Db21wb3NhYmxlRWxlbWVudCc7XG5pbXBvcnQgVGVtcGxhdGVTdGFtcGluZyBmcm9tICcuL1RlbXBsYXRlU3RhbXBpbmcnO1xuaW1wb3J0IEF1dG9tYXRpY05vZGVGaW5kaW5nIGZyb20gJy4vQXV0b21hdGljTm9kZUZpbmRpbmcnO1xuaW1wb3J0IEF0dHJpYnV0ZU1hcnNoYWxsaW5nIGZyb20gJy4vQXR0cmlidXRlTWFyc2hhbGxpbmcnO1xuXG5jbGFzcyBFbGVtZW50QmFzZSBleHRlbmRzIENvbXBvc2FibGVFbGVtZW50IHtcblxuICAvKiBGb3IgZGVidWdnaW5nICovXG4gIGxvZyh0ZXh0KSB7XG4gICAgY29uc29sZS5sb2coYCR7dGhpcy5sb2NhbE5hbWV9OiAke3RleHR9YCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFbGVtZW50QmFzZSA9IEVsZW1lbnRCYXNlLmNvbXBvc2UoXG4gIFRlbXBsYXRlU3RhbXBpbmcsIC8vIGJlZm9yZSBub2RlIGZpbmRpbmcsIHNvIHNoYWRvdyByb290IGlzIHBvcHVsYXRlZFxuICBBdXRvbWF0aWNOb2RlRmluZGluZywgLy8gYmVmb3JlIG1hcnNoYWxsaW5nLCBzbyBtYXJzaGFsbGVkIHByb3BlcnRpZXMgY2FuIHVzZSBpdFxuICBBdHRyaWJ1dGVNYXJzaGFsbGluZ1xuKTtcblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdlbGVtZW50LWJhc2UnLCBFbGVtZW50QmFzZSk7XG4iLCIvKlxuICogRWxlbWVudCBleHRlbnNpb24gZm9yIHRlbXBsYXRlIHN0YW1waW5nLiBJZiBhIGNvbXBvbmVudCBkZWZpbmVzIGEgdGVtcGxhdGVcbiAqIHByb3BlcnR5IChhcyBhIHN0cmluZyBvciByZWZlcmVuY2luZyBhIEhUTUwgdGVtcGxhdGUpLCB3aGVuIHRoZSBjb21wb25lbnRcbiAqIGNsYXNzIGlzIGluc3RhbnRpYXRlZCwgYSBzaGFkb3cgcm9vdCB3aWxsIGJlIGNyZWF0ZWQgb24gdGhlIGluc3RhbmNlLCBhbmRcbiAqIHRoZSBjb250ZW50cyBvZiB0aGUgdGVtcGxhdGUgd2lsbCBiZSBjbG9uZWQgaW50byB0aGUgc2hhZG93IHJvb3QuXG4gKlxuICogRm9yIHRoZSB0aW1lIGJlaW5nLCB0aGlzIGV4dGVuc2lvbiByZXRhaW5zIHN1cHBvcnQgZm9yIFNoYWRvdyBET00gdjAuXG4gKiBUaGF0IHdpbGwgZXZlbnR1YWxseSBiZSBkZXByZWNhdGVkIGFzIGJyb3dzZXJzIGltcGxlbWVudCBTaGFkb3cgRE9NIHYxLlxuICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGVTdGFtcGluZyB7XG5cbiAgLypcbiAgICogSWYgdGhlIGNvbXBvbmVudCBkZWZpbmVzIGEgdGVtcGxhdGUsIGEgc2hhZG93IHJvb3Qgd2lsbCBiZSBjcmVhdGVkIG9uIHRoZVxuICAgKiBjb21wb25lbnQgaW5zdGFuY2UsIGFuZCB0aGUgdGVtcGxhdGUgc3RhbXBlZCBpbnRvIGl0LlxuICAgKi9cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFVwZ3JhZGUgcGxhaW4gc3RyaW5nIHRvIHJlYWwgdGVtcGxhdGUuXG4gICAgICB0ZW1wbGF0ZSA9IGNyZWF0ZVRlbXBsYXRlV2l0aElubmVySFRNTCh0ZW1wbGF0ZSk7XG4gICAgfVxuICAgIGlmICh0ZW1wbGF0ZSAmJiBVU0lOR19TSEFET1dfRE9NX1YwKSB7XG4gICAgICBwb2x5ZmlsbFNsb3RXaXRoQ29udGVudCh0ZW1wbGF0ZSk7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuU2hhZG93RE9NUG9seWZpbGwpIHtcbiAgICAgIHNoaW1UZW1wbGF0ZVN0eWxlcyh0ZW1wbGF0ZSwgdGhpcy5sb2NhbE5hbWUpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBTYXZlIHRoZSBwcm9jZXNzZWQgdGVtcGxhdGUgd2l0aCB0aGUgY29tcG9uZW50J3MgY2xhc3MgcHJvdG90eXBlXG4gICAgLy8gc28gaXQgZG9lc24ndCBuZWVkIHRvIGJlIHByb2Nlc3NlZCB3aXRoIGV2ZXJ5IGluc3RhbnRpYXRpb24uXG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAvLyB0aGlzLmxvZyhcImNsb25pbmcgdGVtcGxhdGUgaW50byBzaGFkb3cgcm9vdFwiKTtcbiAgICAgIGxldCByb290ID0gVVNJTkdfU0hBRE9XX0RPTV9WMCA/XG4gICAgICAgIHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpIDogICAgICAgICAgICAgLy8gU2hhZG93IERPTSB2MFxuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTsgIC8vIFNoYWRvdyBET00gdjFcbiAgICAgIGxldCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XG4gICAgICByb290LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICB9XG4gIH1cblxufVxuXG5cbi8vIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBvbGQgU2hhZG93IERPTSB2MC5cbmNvbnN0IFVTSU5HX1NIQURPV19ET01fVjAgPSAodHlwZW9mIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jcmVhdGVTaGFkb3dSb290ICE9PSAndW5kZWZpbmVkJyk7XG5cblxuLy8gQ29udmVydCBhIHBsYWluIHN0cmluZyBvZiBIVE1MIGludG8gYSByZWFsIHRlbXBsYXRlIGVsZW1lbnQuXG5mdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZVdpdGhJbm5lckhUTUwoaW5uZXJIVE1MKSB7XG4gIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gIC8vIFJFVklFVzogSXMgdGhlcmUgYW4gZWFzaWVyIHdheSB0byBkbyB0aGlzP1xuICAvLyBXZSdkIGxpa2UgdG8ganVzdCBzZXQgaW5uZXJIVE1MIG9uIHRoZSB0ZW1wbGF0ZSBjb250ZW50LCBidXQgc2luY2UgaXQnc1xuICAvLyBhIERvY3VtZW50RnJhZ21lbnQsIHRoYXQgZG9lc24ndCB3b3JrLlxuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gIHdoaWxlIChkaXYuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgdGVtcGxhdGUuY29udGVudC5hcHBlbmRDaGlsZChkaXYuY2hpbGROb2Rlc1swXSk7XG4gIH1cbiAgcmV0dXJuIHRlbXBsYXRlO1xufVxuXG4vLyBSZXBsYWNlIG9jY3VyZW5jZXMgb2YgdjEgc2xvdCBlbGVtZW50cyB3aXRoIHYwIGNvbnRlbnQgZWxlbWVudHMuXG4vLyBUaGlzIGRvZXMgbm90IHlldCBtYXAgbmFtZWQgc2xvdHMgdG8gY29udGVudCBzZWxlY3QgY2xhdXNlcy5cbmZ1bmN0aW9uIHBvbHlmaWxsU2xvdFdpdGhDb250ZW50KHRlbXBsYXRlKSB7XG4gIFtdLmZvckVhY2guY2FsbCh0ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3Nsb3QnKSwgc2xvdEVsZW1lbnQgPT4ge1xuICAgIGxldCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvbnRlbnQnKTtcbiAgICBzbG90RWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjb250ZW50RWxlbWVudCwgc2xvdEVsZW1lbnQpO1xuICB9KTtcbn1cblxuLy8gSW52b2tlIGJhc2ljIHN0eWxlIHNoaW1taW5nIHdpdGggU2hhZG93Q1NTLlxuZnVuY3Rpb24gc2hpbVRlbXBsYXRlU3R5bGVzKHRlbXBsYXRlLCB0YWcpIHtcbiAgV2ViQ29tcG9uZW50cy5TaGFkb3dDU1Muc2hpbVN0eWxpbmcodGVtcGxhdGUuY29udGVudCwgdGFnKTtcbn1cbiJdfQ==
