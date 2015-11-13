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

},{"../../mixins/ChildrenContent":3,"../../mixins/ClickSelection":4,"../../mixins/ContentItems":5,"../../mixins/DirectionSelection":6,"../../mixins/Generic":7,"../../mixins/ItemSelection":8,"../../mixins/ItemsAccessible":9,"../../mixins/Keyboard":10,"../../mixins/KeyboardDirection":11,"../../mixins/KeyboardPaging":12,"../../mixins/KeyboardPrefixSelection":13,"../../mixins/SelectionHighlight":14,"../../mixins/SelectionScroll":15,"element-base/src/ElementBase":21}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function greet() {
  console.log("Hello, world.");
}

exports.default = greet;

},{}],3:[function(require,module,exports){
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
    key: 'createdCallback',
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
    key: 'contentChanged',
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
    key: 'content',
    get: function get() {
      // if (!this._content) {
      //   let innermost = this.collective.innermostElement;
      //   if (innermost) {
      //     this._content = Basic.ContentHelpers.flattenChildren(innermost);
      //   }
      // }
      // return this._content;
      return this.children;
    }
  }]);

  return ChildrenContent;
})();

exports.default = ChildrenContent;
;

// ready() {
//   // HACK: Ensure targetChanged (also) happens after ready.
//   this.targetChanged(this.target);
// }

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
    // itemAdded: Basic.Collective.defaultMethod,

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

},{}],6:[function(require,module,exports){
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

},{"Composable/src/Composable":16}],7:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"Composable/src/Composable":16}],12:[function(require,module,exports){
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

},{"Composable/src/Composable":16}],13:[function(require,module,exports){
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

},{"Composable/src/Composable":16}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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
  '__method__': Composable.rules.propagateFunction,
  '__property__': Composable.rules.propagateProperty,
  'prototypes': Composable.rules.chainPrototypes
};

// Properties defined by Function that we don't want to mixin.
// We'd prefer to get these by interrogating Function itself, but WebKit
// functions have some properties (arguments and caller) which are not returned
// by Object.getOwnPropertyNames(Function).
var NON_MIXABLE_FUNCTION_PROPERTIES = ['arguments', 'caller', 'length', 'name', 'prototype'];

// Properties defined by Object that we don't want to mixin.
var NON_MIXABLE_OBJECT_PROPERTIES = ['constructor'];

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

},{"./CompositionRules":17}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeFunction = composeFunction;
exports.chainPrototypes = chainPrototypes;
exports.getPropertyDescriptor = getPropertyDescriptor;
exports.override = override;
exports.preferBaseResult = preferBaseResult;
exports.preferMixinResult = preferMixinResult;
exports.propagateFunction = propagateFunction;
exports.propagateProperty = propagateProperty;
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
 * Perform a deep merge of a mixin property on top of a base property.
 */
// export function deepMerge(target, key, descriptor) {
//   let mixinValue = descriptor.value;
//   let baseValue = Object.getPrototypeOf(target)[key].value;
//   descriptor.value = 'merged'; // merge(baseValue, mixinValue);
// }

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
 * truthy result, that is returned. Otherwise, the mixin implementation's
 * result is returned.
 */
function preferBaseResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseImplementation = Object.getPrototypeOf(target)[key];
  descriptor.value = function () {
    return baseImplementation.apply(this, arguments) || mixinImplementation.apply(this, arguments);
  };
}

/*
 * Compose methods, invoking mixin implementation first. If it returns a
 * truthy result, that is returned. Otherwise, the base implementation's
 * result is returned.
 */
function preferMixinResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseImplementation = Object.getPrototypeOf(target)[key];
  descriptor.value = function () {
    return mixinImplementation.apply(this, arguments) || baseImplementation.apply(this, arguments);
  };
}

/*
 * Default rule for composing methods: invoke base first, then mixin.
 */
function propagateFunction(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseImplementation = Object.getPrototypeOf(target)[key];
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
function propagateProperty(target, key, descriptor) {
  var base = Object.getPrototypeOf(target);
  var baseDescriptor = getPropertyDescriptor(base, key);
  if (descriptor.get && !descriptor.set && baseDescriptor.set) {
    // Need to supply default setter.
    descriptor.set = function (value) {
      baseDescriptor.set.call(this, value);
    };
  } else if (descriptor.set) {
    if (!descriptor.get && baseDescriptor.get) {
      // Need to supply default getter.
      descriptor.get = function () {
        return baseDescriptor.get.call(this);
      };
    }
    // Compose setters.
    descriptor.set = composeFunction(baseDescriptor.set, descriptor.set);
  }
}

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"Composable/src/Composable":16}],21:[function(require,module,exports){
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

},{"./AttributeMarshalling":18,"./AutomaticNodeFinding":19,"./ComposableElement":20,"./TemplateStamping":22}],22:[function(require,module,exports){
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

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL0xpc3RCb3gvTGlzdEJveC5qcyIsImNvbXBvbmVudHMvTGlzdEJveC9UZXN0LmpzIiwibWl4aW5zL0NoaWxkcmVuQ29udGVudC5qcyIsIm1peGlucy9DbGlja1NlbGVjdGlvbi5qcyIsIm1peGlucy9Db250ZW50SXRlbXMuanMiLCJtaXhpbnMvRGlyZWN0aW9uU2VsZWN0aW9uLmpzIiwibWl4aW5zL0dlbmVyaWMuanMiLCJtaXhpbnMvSXRlbVNlbGVjdGlvbi5qcyIsIm1peGlucy9JdGVtc0FjY2Vzc2libGUuanMiLCJtaXhpbnMvS2V5Ym9hcmQuanMiLCJtaXhpbnMvS2V5Ym9hcmREaXJlY3Rpb24uanMiLCJtaXhpbnMvS2V5Ym9hcmRQYWdpbmcuanMiLCJtaXhpbnMvS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24uanMiLCJtaXhpbnMvU2VsZWN0aW9uSGlnaGxpZ2h0LmpzIiwibWl4aW5zL1NlbGVjdGlvblNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9Db21wb3NhYmxlL3NyYy9Db21wb3NhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0NvbXBvc2FibGUvc3JjL0NvbXBvc2l0aW9uUnVsZXMuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9BdHRyaWJ1dGVNYXJzaGFsbGluZy5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL0F1dG9tYXRpY05vZGVGaW5kaW5nLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvQ29tcG9zYWJsZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9FbGVtZW50QmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL1RlbXBsYXRlU3RhbXBpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7QUFFM0QsSUFBSSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXpELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7O0FBRS9ELElBQUksaUJBQWlCLEdBQUcsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFakUsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRTdELElBQUksZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRS9ELElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztBQUV6RCxJQUFJLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFM0QsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFckUsSUFBSSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUV2RSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs7QUFFL0MsSUFBSSxTQUFTLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWpELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztBQUUzRCxJQUFJLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFN0QsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7QUFFL0QsSUFBSSxpQkFBaUIsR0FBRyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVqRSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFakQsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRW5ELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7O0FBRW5FLElBQUksbUJBQW1CLEdBQUcsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFckUsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRTdELElBQUksZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRS9ELElBQUksd0JBQXdCLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7O0FBRS9FLElBQUkseUJBQXlCLEdBQUcsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsQ0FBQzs7QUFFakYsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFckUsSUFBSSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUV2RSxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOztBQUUvRCxJQUFJLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRWpFLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsU0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFL0YsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7O0FBRXpKLFNBQVMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUFFLE1BQUksQ0FBQyxJQUFJLEVBQUU7QUFBRSxVQUFNLElBQUksY0FBYyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7R0FBRSxBQUFDLE9BQU8sSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLENBQUEsQUFBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7Q0FBRTs7QUFFaFAsU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUFFLE1BQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxHQUFHLE9BQU8sVUFBVSxDQUFDLENBQUM7R0FBRSxBQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxJQUFJLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQUU7Ozs7QUFBQSxBQUk5ZSxJQXREcUIsT0FBTyxHQUFBLENBQUEsVUFBQSxvQkFBQSxFQUFBO0FBdUQxQixXQUFTLENBdkRVLE9BQU8sRUFBQSxvQkFBQSxDQUFBLENBQUE7O0FBeUQxQixXQXpEbUIsT0FBTyxHQUFBO0FBMER4QixtQkFBZSxDQUFDLElBQUksRUExREgsT0FBTyxDQUFBLENBQUE7O0FBNER4QixXQUFPLDBCQUEwQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYyxDQTVENUMsT0FBTyxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBO0dBNkR6Qjs7QUFFRCxjQUFZLENBL0RPLE9BQU8sRUFBQSxDQUFBO0FBZ0V4QixPQUFHLEVBQUUsbUJBQW1COzs7QUFHeEIsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQWxESztBQUN0QixhQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO0tBQzlCO0dBbURBLEVBQUU7QUFDRCxPQUFHLEVBQUUsbUJBQW1CO0FBQ3hCLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0FwREs7QUFDdEIsYUFBTyxJQUFJLENBQUM7S0FDYjtHQXFEQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFVBQVU7QUFDZixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBckRKO0FBQ2IsYUFBQSxxN0JBQUEsQ0F5Q0U7S0FDSDtHQWFBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFNBbEZtQixPQUFPLENBQUE7Q0FtRjNCLENBQUEsQ0FuRm9DLGFBQUEsQ0FBQSxPQUFBLENBQVksT0FBTyxDQUFBLGlCQUFBLENBQUEsT0FBQSxFQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUEsQ0FBQSxPQUFBLEVBQUEsU0FBQSxDQUFBLE9BQUEsRUFBQSxlQUFBLENBQUEsT0FBQSxFQUFBLGlCQUFBLENBQUEsT0FBQSxFQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsbUJBQUEsQ0FBQSxPQUFBLEVBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEseUJBQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUEsQ0FBQSxPQUFBLEVBQUEsaUJBQUEsQ0FBQSxPQUFBLENBY3JELENBQUEsQ0FBQTs7QUF1RUgsT0FBTyxDQUFDLE9BQU8sR0FyRk0sT0FBTyxDQUFBOztBQXdFNUIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FDNUZwRCxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDO0FBSkgsU0FBUyxLQUFLLEdBQUc7QUFDZixTQUFPLENBQUMsR0FBRyxDQUFBLGVBQUEsQ0FBaUIsQ0FBQztDQUM5Qjs7QUFPRCxPQUFPLENBQUMsT0FBTyxHQUxBLEtBQUssQ0FBQTs7O0FDSnBCLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7Ozs7O0FBQUEsQUFhekosSUFWcUIsZUFBZSxHQUFBLENBQUEsWUFBQTtBQVdsQyxXQVhtQixlQUFlLEdBQUE7QUFZaEMsbUJBQWUsQ0FBQyxJQUFJLEVBWkgsZUFBZSxDQUFBLENBQUE7R0FhakM7O0FBRUQsY0FBWSxDQWZPLGVBQWUsRUFBQSxDQUFBO0FBZ0JoQyxPQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLFNBQUssRUFBRSxTQUFTLGVBQWUsR0FmZjtBQWdCZCxVQUFJLEtBQUssR0FBRyxJQUFJOzs7OztBQVpsQixBQVltQixnQkFaVCxDQUFDLFlBQUE7QUFrQlAsZUFsQmEsS0FBQSxDQUFLLGNBQWMsRUFBRSxDQUFBO09BQUEsQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEdBK0RBLEVBQUU7QUFDRCxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsR0FyQmY7QUFDZixVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDdkMsVUFBSSxTQUFTLEVBQUU7QUFDYixZQUFJLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRTtBQUM3QyxpQkFBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7QUFDSCxpQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNoQztLQUNGOzs7Ozs7Ozs7Ozs7O0FBQUEsR0FrQ0EsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQXhCTDs7Ozs7Ozs7QUFRWixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7R0F5QkEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0EzR21CLGVBQWUsQ0FBQTtDQTRHbkMsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLE9BQU8sR0E5R00sZUFBZSxDQUFBO0FBa0ZuQzs7Ozs7O0FBQUE7O0FDN0ZELFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7OztBQUFBLEFBUXpKLElBVnFCLGNBQWMsR0FBQSxDQUFBLFlBQUE7QUFXakMsV0FYbUIsY0FBYyxHQUFBO0FBWS9CLG1CQUFlLENBQUMsSUFBSSxFQVpILGNBQWMsQ0FBQSxDQUFBO0dBYWhDOztBQUVELGNBQVksQ0FmTyxjQUFjLEVBQUEsQ0FBQTtBQWdCL0IsT0FBRyxFQUFFLGlCQUFpQjtBQUN0QixTQUFLLEVBQUUsU0FBUyxlQUFlLEdBZmY7QUFnQmQsVUFBSSxLQUFLLEdBQUcsSUFBSTs7Ozs7Ozs7O0FBUmxCLEFBUW1CLFVBUmYsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQSxLQUFLLEVBQUk7QUFDMUMsb0JBQVksQ0FBQSxLQUFBLEVBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQzs7OztBQUFBLEFBQUMsYUFJNUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztPQUN6QixDQUFDLENBQUM7S0FDSjs7Ozs7QUFBQSxHQXNCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXpDbUIsY0FBYyxDQUFBO0NBMENsQyxDQUFBLEVBQUc7Ozs7Ozs7QUFBQyxBQU9MLE9BQU8sQ0FBQyxPQUFPLEdBakRNLGNBQWMsQ0FBQTtBQTRCbkMsU0FBUyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUNyQyxNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0QsTUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO0FBQ2QsV0FBTyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7R0FDL0I7Q0FDRjs7O0FDdkNELFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7OztBQUFBLEFBV3pKLElBVnFCLFlBQVksR0FBQSxDQUFBLFlBQUE7QUFXL0IsV0FYbUIsWUFBWSxHQUFBO0FBWTdCLG1CQUFlLENBQUMsSUFBSSxFQVpILFlBQVksQ0FBQSxDQUFBO0dBYTlCOztBQUVELGNBQVksQ0FmTyxZQUFZLEVBQUEsQ0FBQTtBQWdCN0IsT0FBRyxFQUFFLGdCQUFnQjtBQUNyQixTQUFLLEVBQUUsU0FBUyxjQUFjLENBZmpCLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDN0IsVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO0dBZ0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsR0FoQmY7QUFDZixVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixVQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7Ozs7Ozs7QUFBQSxHQTBCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGFBQWE7QUFDbEIsU0FBSyxFQUFFLFNBQVMsV0FBVyxDQW5CakIsSUFBSSxFQUFFO0FBQ2hCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakM7Ozs7OztBQUFBLEdBeUJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsV0FBVztBQUNoQixTQUFLLEVBQUUsU0FBUyxTQUFTLENBdEJqQixJQUFJLEVBQUUsRUFBRTtHQXVCakIsRUFBRTtBQUNELE9BQUcsRUFBRSxjQUFjO0FBQ25CLFNBQUssRUFBRSxTQUFTLFlBQVksR0F2QmY7QUF3QlgsVUFBSSxLQUFLLEdBQUcsSUFBSTs7O0FBckJsQixBQXFCbUIsVUFyQmYsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ3pCLFlBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Ozs7QUFJMUIsZUFBQSxDQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixjQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO09BQ0YsQ0FBQyxDQUFDOztBQUVILFVBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztBQUN2QyxVQUFJLFNBQVMsRUFBRTtBQUNiLFlBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLGVBQWUsRUFBRTtBQUMzQyxpQkFBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7QUFDSCxpQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNoQztLQUNGOzs7Ozs7Ozs7O0FBQUEsR0FrQ0EsRUFBRTtBQUNELE9BQUcsRUFBRSxPQUFPO0FBQ1osT0FBRyxFQUFFLFNBQVMsR0FBRyxHQTNCUDtBQUNWLFVBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7QUFDdkIsWUFBSSxDQUFDLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDckQ7QUFDRCxhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7R0E0QkEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0EzRm1CLFlBQVksQ0FBQTtDQTRGaEMsQ0FBQSxFQUFHOzs7OztBQUFDLEFBS0wsT0FBTyxDQUFDLE9BQU8sR0FqR00sWUFBWSxDQUFBO0FBb0VqQyxTQUFTLHVCQUF1QixDQUFDLEtBQUssRUFBRTtBQUN0QyxNQUFJLGFBQWEsR0FBRyxDQUNsQixNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxVQUFVLENBQ1gsQ0FBQztBQUNGLFNBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVMsSUFBSSxFQUFFO0FBQzFDLFdBQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNyRSxDQUFDLENBQUM7Q0FDSjs7Ozs7OztBQUFBOztBQ3ZGRCxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUc7Ozs7Ozs7QUFBQyxBQU90akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztBQUV2RCxJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxTQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUUvRixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7QUFFekosSUFacUIsa0JBQWtCLEdBQUEsQ0FBQSxZQUFBO0FBYXJDLFdBYm1CLGtCQUFrQixHQUFBO0FBY25DLG1CQUFlLENBQUMsSUFBSSxFQWRILGtCQUFrQixDQUFBLENBQUE7R0FlcEM7O0FBRUQsY0FBWSxDQWpCTyxrQkFBa0IsRUFBQSxDQUFBO0FBa0JuQyxPQUFHLEVBQUUsUUFBUTtBQUNiLFNBQUssRUFBRSxTQUFTLE1BQU0sR0FqQmY7QUFDUCxhQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMxQjtHQWtCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLE9BQU87QUFDWixTQUFLLEVBQUUsU0FBUyxLQUFLLEdBbEJmO0FBQ04sYUFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDMUI7R0FtQkEsRUFBRTtBQUNELE9BQUcsRUFBRSxRQUFRO0FBQ2IsU0FBSyxFQUFFLFNBQVMsTUFBTSxHQW5CZjtBQUNQLGFBQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzlCO0dBb0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsU0FBUztBQUNkLFNBQUssRUFBRSxTQUFTLE9BQU8sR0FwQmY7QUFDUixhQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMxQjtHQXFCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFNBQVM7QUFDZCxTQUFLLEVBQUUsU0FBUyxPQUFPLEdBckJmO0FBQ1IsYUFBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDM0I7R0FzQkEsRUFBRTtBQUNELE9BQUcsRUFBRSxNQUFNO0FBQ1gsU0FBSyxFQUFFLFNBQVMsSUFBSSxHQXRCZjtBQUNMLGFBQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzlCOzs7O0FBQUEsR0EwQkEsRUFBRTtBQUNELE9BQUcsRUFBRSxhQUFhO0FBQ2xCLFNBQUssRUFBRSxTQUFTLFdBQVcsR0F6QmYsRUFBRTtHQTBCZixFQUFFO0FBQ0QsT0FBRyxFQUFFLFlBQVk7QUFDakIsU0FBSyxFQUFFLFNBQVMsVUFBVSxHQTNCZixFQUFFO0dBNEJkLEVBQUU7QUFDRCxPQUFHLEVBQUUsWUFBWTtBQUNqQixTQUFLLEVBQUUsU0FBUyxVQUFVLEdBN0JmLEVBQUU7R0E4QmQsRUFBRTtBQUNELE9BQUcsRUFBRSxnQkFBZ0I7QUFDckIsU0FBSyxFQUFFLFNBQVMsY0FBYyxHQS9CZixFQUFFO0dBZ0NsQixDQUFDLENBQUMsQ0FBQzs7QUFFSixTQWhFbUIsa0JBQWtCLENBQUE7Q0FpRXRDLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBbkVNLGtCQUFrQixDQUFBOztBQWlDdkMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRTtBQUNyRCxhQUFXLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7QUFDL0QsWUFBVSxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQzlELFlBQVUsRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUM5RCxnQkFBYyxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0NBQ25FLENBQUMsQ0FBQzs7O0FDL0NILFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQTJCekosSUFWcUIsT0FBTyxHQUFBLENBQUEsWUFBQTtBQVcxQixXQVhtQixPQUFPLEdBQUE7QUFZeEIsbUJBQWUsQ0FBQyxJQUFJLEVBWkgsT0FBTyxDQUFBLENBQUE7R0FhekI7O0FBRUQsY0FBWSxDQWZPLE9BQU8sRUFBQSxDQUFBO0FBZ0J4QixPQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLFNBQUssRUFBRSxTQUFTLGVBQWUsR0FmZjtBQUNoQixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDO0tBQ3JEOzs7Ozs7Ozs7Ozs7OztBQUFBLEdBNkJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsU0FBUztBQUNkLE9BQUcsRUFBRSxTQUFTLEdBQUcsR0FsQkw7QUFDWixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7O0FBQUEsTUF1QkMsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQW5CUCxLQUFLLEVBQUU7QUFDakIsVUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDN0IsYUFBSyxHQUFJLEtBQUssS0FBSyxPQUFPLENBQUU7T0FDN0I7QUFDRCxVQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN0QixVQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7O0FBRW5CLFlBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ3ZDLE1BQU0sSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFOztBQUV4QixZQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQ2pDLE1BQU07O0FBRUwsWUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDbEM7S0FDRjtHQW9CQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQTVEbUIsT0FBTyxDQUFBO0NBNkQzQixDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQS9ETSxPQUFPLENBQUE7QUF3QzNCLENBQUM7OztBQ2pFRixZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQXVCekosSUFUcUIsYUFBYSxHQUFBLENBQUEsWUFBQTtBQVVoQyxXQVZtQixhQUFhLEdBQUE7QUFXOUIsbUJBQWUsQ0FBQyxJQUFJLEVBWEgsYUFBYSxDQUFBLENBQUE7R0FZL0I7O0FBRUQsY0FBWSxDQWRPLGFBQWEsRUFBQSxDQUFBO0FBZTlCLE9BQUcsRUFBRSxnQkFBZ0I7OztBQUdyQixTQUFLLEVBQUUsU0FBUyxjQUFjLENBZmpCLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTtHQWdCaEMsRUFBRTtBQUNELE9BQUcsRUFBRSxXQUFXO0FBQ2hCLFNBQUssRUFBRSxTQUFTLFNBQVMsQ0FGakIsSUFBSSxFQUFFO0FBQ2QsVUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN2RDtHQUdBLEVBQUU7QUFDRCxPQUFHLEVBQUUsY0FBYztBQUNuQixTQUFLLEVBQUUsU0FBUyxZQUFZLEdBSGY7QUFDYixVQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEQsVUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFOztBQUViLFlBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFlBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFOzs7QUFHMUIsb0JBQVUsQ0FBQyxDQUFBLFlBQVc7QUFDcEIsMkJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUN2QixDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDZjtPQUNGO0tBQ0Y7Ozs7Ozs7Ozs7QUFBQSxHQWFBLEVBQUU7QUFDRCxPQUFHLEVBQUUsYUFBYTs7Ozs7OztBQU9sQixTQUFLLEVBQUUsU0FBUyxXQUFXLEdBeUVmO0FBQ1osYUFBTyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCOzs7Ozs7Ozs7QUFBQSxHQWhFQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFlBQVk7Ozs7Ozs7QUFPakIsU0FBSyxFQUFFLFNBQVMsVUFBVSxHQTZFZjtBQUNYLGFBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqRDs7Ozs7Ozs7QUFBQSxHQXJFQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFlBQVk7QUFDakIsU0FBSyxFQUFFLFNBQVMsVUFBVSxHQTBFZjtBQUNYLGFBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2xEOzs7Ozs7OztBQUFBLEdBbEVBLEVBQUU7QUFDRCxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsR0F1RWY7QUFDZixhQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNsRDtHQXRFQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGVBQWU7QUFDcEIsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQXBHQztBQUNsQixhQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7S0FDNUI7QUFxR0MsT0FBRyxFQUFFLFNBQVMsR0FBRyxDQXBHRCxhQUFhLEVBQUU7QUFDL0IsVUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDckM7R0FxR0EsRUFBRTtBQUNELE9BQUcsRUFBRSxtQkFBbUI7QUFDeEIsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQXJHSztBQUN0QixhQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztLQUNoQztBQXNHQyxPQUFHLEVBQUUsU0FBUyxHQUFHLENBckdHLGlCQUFpQixFQUFFO0FBQ3ZDLFVBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztLQUM3QztHQXNHQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGVBQWU7QUFDcEIsT0FBRyxFQUFFLFNBQVMsR0FBRyxHQTVFQztBQUNsQixVQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUVyQyxVQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7QUFDeEIsZUFBTyxDQUFDLENBQUMsQ0FBQztPQUNYOzs7QUFBQSxVQUdHLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQzs7Ozs7QUFBQSxBQUFDLGFBS3BDLEtBQUssQ0FBQztLQUNkO0FBNkVDLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0EzRUQsS0FBSyxFQUFFO0FBQ3ZCLFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkIsVUFBSSxJQUFJLEdBQUEsU0FBQSxDQUFDO0FBQ1QsVUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ25DLFlBQUksR0FBRyxJQUFJLENBQUM7T0FDYixNQUFNO0FBQ0wsWUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNyQjtBQUNELFVBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOztBQUV6QixVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDdkMsVUFBSSxTQUFTLEVBQUU7QUFDYixZQUFJLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRTtBQUNwRCxpQkFBTyxFQUFFLElBQUk7QUFDYixnQkFBTSxFQUFFO0FBQ04seUJBQWEsRUFBRSxLQUFLO0FBQ3BCLGlCQUFLLEVBQUUsS0FBSztBQUFBLFdBQ2I7U0FDRixDQUFDLENBQUM7QUFDSCxpQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNoQztLQUNGO0dBNEVBLEVBQUU7QUFDRCxPQUFHLEVBQUUsY0FBYztBQUNuQixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBNUVBO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjs7Ozs7Ozs7OztBQUFBLE1Bc0ZDLEdBQUcsRUFBRSxTQUFTLEdBQUcsQ0E3RUYsSUFBSSxFQUFFO0FBQ3JCLFVBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDdEMsVUFBSSxZQUFZLEVBQUU7O0FBRWhCLFlBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQzFDO0FBQ0QsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsVUFBSSxJQUFJLEVBQUU7QUFDUixZQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztPQUNqQzs7OztBQUFBLFVBSUcsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsK0JBQXlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV2QyxVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDdkMsVUFBSSxTQUFTLEVBQUU7QUFDYixZQUFJLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRTtBQUNuRCxpQkFBTyxFQUFFLElBQUk7QUFDYixnQkFBTSxFQUFFO0FBQ04sd0JBQVksRUFBRSxJQUFJO0FBQ2xCLHdCQUFZLEVBQUUsWUFBWTtBQUMxQixpQkFBSyxFQUFFLElBQUk7QUFBQSxXQUNaO1NBQ0YsQ0FBQyxDQUFDO0FBQ0gsaUJBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDaEM7S0FDRjtHQThFQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLG1CQUFtQjtBQUN4QixPQUFHLEVBQUUsU0FBUyxHQUFHLEdBL0RLO0FBQ3RCLGFBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0tBQ2hDO0FBZ0VDLE9BQUcsRUFBRSxTQUFTLEdBQUcsQ0EvREcsaUJBQWlCLEVBQUU7QUFDdkMsVUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO0FBQzVDLHFCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7R0FnRUEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0FwTm1CLGFBQWEsQ0FBQTtDQXFOakMsQ0FBQSxFQUFHOzs7Ozs7QUFBQyxBQU1MLE9BQU8sQ0FBQyxPQUFPLEdBM05NLGFBQWEsQ0FBQTtBQXFMbEMsU0FBUyxlQUFlLENBQUMsT0FBTyxFQUFFO0FBQ2hDLE1BQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RFLFdBQU8sQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0dBQzNCO0NBQ0Y7Ozs7QUFBQSxTQUlRLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ25DLE1BQUksWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUUsTUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUMxQyxNQUFJLGFBQWEsS0FBSyxZQUFZLEVBQUU7QUFDbEMsV0FBTyxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7QUFDckMsV0FBTyxJQUFJLENBQUM7R0FDYixNQUFNO0FBQ0wsV0FBTyxLQUFLLENBQUM7R0FDZDtDQUNGOzs7O0FBQUEsU0FJUSx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ2pELE1BQUksYUFBYSxHQUFBLFNBQUEsQ0FBQztBQUNsQixNQUFJLGlCQUFpQixHQUFBLFNBQUEsQ0FBQztBQUN0QixNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzFCLE1BQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN2QyxpQkFBYSxHQUFHLEtBQUssQ0FBQztBQUN0QixxQkFBaUIsR0FBRyxLQUFLLENBQUM7R0FDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzs7QUFHN0IsaUJBQWEsR0FBRyxJQUFJLENBQUM7QUFDckIscUJBQWlCLEdBQUcsSUFBSSxDQUFDO0dBQzFCLE1BQU07O0FBRUwscUJBQWlCLEdBQUksS0FBSyxHQUFHLENBQUMsQ0FBRTtBQUNoQyxpQkFBYSxHQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBRTtHQUM1QztBQUNELFNBQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLFNBQU8sQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztDQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FDblBELFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7Ozs7QUFEekosQUFDeUosSUFEckosT0FBTyxHQUFHLENBQUMsQ0FBQzs7QUFZaEIsSUFWcUIsZUFBZSxHQUFBLENBQUEsWUFBQTtBQVdsQyxXQVhtQixlQUFlLEdBQUE7QUFZaEMsbUJBQWUsQ0FBQyxJQUFJLEVBWkgsZUFBZSxDQUFBLENBQUE7R0FhakM7O0FBRUQsY0FBWSxDQWZPLGVBQWUsRUFBQSxDQUFBO0FBZ0JoQyxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsQ0FmakIsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUM3QixVQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM3QyxVQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLFVBQUksTUFBTSxFQUFFO0FBQ1YsWUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQztPQUN0RTtLQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxHQXNEQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGlCQUFpQjtBQUN0QixTQUFLLEVBQUUsU0FBUyxlQUFlLEdBakJmO0FBQ2hCLFVBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztBQUN2QyxlQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBQyxVQWN0QyxTQUFTLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBRSxJQUFJLENBQUUsQ0FBQztBQUMvQyxVQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsR0FDdkIsR0FBRyxHQUFHLFNBQVMsR0FBRyxRQUFRLEdBQzFCLFNBQVMsQ0FBQztLQUNmO0dBZ0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsV0FBVztBQUNoQixTQUFLLEVBQUUsU0FBUyxTQUFTLENBaEJqQixJQUFJLEVBQUU7QUFDZCxVQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7Ozs7QUFBQSxBQUFDLFVBSWhDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM1QixZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7T0FDdEQ7S0FDRjtHQWlCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLGNBQWM7QUFDbkIsT0FBRyxFQUFFLFNBQVMsR0FBRyxDQWpCRixJQUFJLEVBQUU7O0FBRXJCLFVBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUNoQixZQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUM7T0FDakU7S0FDRjtHQWtCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXhHbUIsZUFBZSxDQUFBO0NBeUduQyxDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQTNHTSxlQUFlLENBQUE7OztBQ1RwQyxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7Ozs7Ozs7Ozs7QUFBQSxBQVd6SixJQVZxQixRQUFRLEdBQUEsQ0FBQSxZQUFBO0FBVzNCLFdBWG1CLFFBQVEsR0FBQTtBQVl6QixtQkFBZSxDQUFDLElBQUksRUFaSCxRQUFRLENBQUEsQ0FBQTtHQWExQjs7QUFFRCxjQUFZLENBZk8sUUFBUSxFQUFBLENBQUE7QUFnQnpCLE9BQUcsRUFBRSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0R0QixTQUFLLEVBQUUsU0FBUyxlQUFlLEdBaEJmO0FBaUJkLFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFoQm5CLFVBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQSxLQUFLLEVBQUk7QUFDeEMsWUFBSSxPQUFPLEdBQUcsS0FBQSxDQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxZQUFJLE9BQU8sRUFBRTtBQUNYLGVBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixlQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDekI7T0FDRixDQUFDLENBQUM7QUFDSCxVQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNsQzs7OztBQUFBLEdBc0JBLEVBQUU7QUFDRCxPQUFHLEVBQUUsU0FBUztBQUNkLFNBQUssRUFBRSxTQUFTLE9BQU8sQ0FyQmpCLEtBQUssRUFBRSxFQUFFO0dBc0JoQixDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXRGbUIsUUFBUSxDQUFBO0NBdUY1QixDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQXpGTSxRQUFRLENBQUE7OztBQ1Q3QixZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUc7Ozs7Ozs7QUFBQyxBQU90akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztBQUV2RCxJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxTQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUUvRixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7QUFFekosSUFacUIsaUJBQWlCLEdBQUEsQ0FBQSxZQUFBO0FBYXBDLFdBYm1CLGlCQUFpQixHQUFBO0FBY2xDLG1CQUFlLENBQUMsSUFBSSxFQWRILGlCQUFpQixDQUFBLENBQUE7R0FlbkM7O0FBRUQsY0FBWSxDQWpCTyxpQkFBaUIsRUFBQSxDQUFBO0FBa0JsQyxPQUFHLEVBQUUsUUFBUTs7O0FBR2IsU0FBSyxFQUFFLFNBQVMsTUFBTSxHQWxCZixFQUFFO0dBbUJWLEVBQUU7QUFDRCxPQUFHLEVBQUUsT0FBTztBQUNaLFNBQUssRUFBRSxTQUFTLEtBQUssR0FwQmYsRUFBRTtHQXFCVCxFQUFFO0FBQ0QsT0FBRyxFQUFFLFFBQVE7QUFDYixTQUFLLEVBQUUsU0FBUyxNQUFNLEdBdEJmLEVBQUU7R0F1QlYsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsU0FBSyxFQUFFLFNBQVMsT0FBTyxHQXhCZixFQUFFO0dBeUJYLEVBQUU7QUFDRCxPQUFHLEVBQUUsU0FBUztBQUNkLFNBQUssRUFBRSxTQUFTLE9BQU8sR0ExQmYsRUFBRTtHQTJCWCxFQUFFO0FBQ0QsT0FBRyxFQUFFLE1BQU07QUFDWCxTQUFLLEVBQUUsU0FBUyxJQUFJLEdBNUJmLEVBQUU7R0E2QlIsRUFBRTtBQUNELE9BQUcsRUFBRSxTQUFTO0FBQ2QsU0FBSyxFQUFFLFNBQVMsT0FBTyxDQTdCakIsS0FBSyxFQUFFO0FBQ2IsVUFBSSxPQUFPLEdBQUEsU0FBQSxDQUFDO0FBQ1osY0FBUSxLQUFLLENBQUMsT0FBTztBQUNuQixhQUFLLEVBQUU7O0FBQ0wsaUJBQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDdkIsZ0JBQU07QUFBQSxhQUNILEVBQUU7O0FBQ0wsaUJBQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekIsZ0JBQU07QUFBQSxhQUNILEVBQUU7O0FBQ0wsaUJBQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEIsZ0JBQU07QUFBQSxhQUNILEVBQUU7O0FBQ0wsaUJBQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEQsZ0JBQU07QUFBQSxhQUNILEVBQUU7O0FBQ0wsaUJBQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekIsZ0JBQU07QUFBQSxhQUNILEVBQUU7O0FBQ0wsaUJBQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdEQsZ0JBQU07QUFBQSxPQUNUO0FBQ0QsYUFBTyxPQUFPLENBQUM7S0FDaEI7R0FvQ0EsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0F2RW1CLGlCQUFpQixDQUFBO0NBd0VyQyxDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQTFFTSxpQkFBaUIsQ0FBQTs7QUFvQ3RDLFlBQUEsQ0FBQSxPQUFBLENBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUU7QUFDcEQsUUFBTSxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQzFELE9BQUssRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUN6RCxRQUFNLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7QUFDMUQsU0FBTyxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQzNELFNBQU8sRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUMzRCxNQUFJLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7QUFDeEQsU0FBTyxFQUFFLFlBQUEsQ0FBQSxPQUFBLENBQVcsSUFBSSxDQUFDLFlBQUEsQ0FBQSxPQUFBLENBQVcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0NBQzdELENBQUMsQ0FBQzs7O0FDckRILFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLEFBbUJ0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztBQUV2RCxJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxTQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUUvRixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsTUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRTs7QUFFekosSUFacUIsY0FBYyxHQUFBLENBQUEsWUFBQTtBQWFqQyxXQWJtQixjQUFjLEdBQUE7QUFjL0IsbUJBQWUsQ0FBQyxJQUFJLEVBZEgsY0FBYyxDQUFBLENBQUE7R0FlaEM7O0FBRUQsY0FBWSxDQWpCTyxjQUFjLEVBQUEsQ0FBQTtBQWtCL0IsT0FBRyxFQUFFLFNBQVM7QUFDZCxTQUFLLEVBQUUsU0FBUyxPQUFPLENBakJqQixLQUFLLEVBQUU7QUFDYixVQUFJLE9BQU8sR0FBQSxTQUFBLENBQUM7QUFDWixjQUFRLEtBQUssQ0FBQyxPQUFPO0FBQ25CLGFBQUssRUFBRTs7QUFDTCxpQkFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN4QixnQkFBTTtBQUFBLGFBQ0gsRUFBRTs7QUFDTCxpQkFBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUMxQixnQkFBTTtBQUFBLE9BQ1Q7QUFDRCxhQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7Ozs7QUFBQSxHQTJCQSxFQUFFO0FBQ0QsT0FBRyxFQUFFLFVBQVU7QUFDZixTQUFLLEVBQUUsU0FBUyxRQUFRLEdBdEJmO0FBQ1QsYUFBTyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7OztBQUFBLEdBOEJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsUUFBUTtBQUNiLFNBQUssRUFBRSxTQUFTLE1BQU0sR0F6QmY7QUFDUCxhQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkM7R0EwQkEsQ0FBQyxDQUFDLENBQUM7O0FBRUosU0EzRG1CLGNBQWMsQ0FBQTtDQTREbEMsQ0FBQSxFQUFHOzs7Ozs7Ozs7QUFBQyxBQVNMLE9BQU8sQ0FBQyxPQUFPLEdBckVNLGNBQWMsQ0FBQTtBQTBDbkMsU0FBUyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRTtBQUMvQyxNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzFCLE1BQUksS0FBSyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDNUMsTUFBSSxHQUFHLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLE1BQUksSUFBSSxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0IsTUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzFDLE1BQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUNoRSxNQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDZCxNQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbEIsU0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFO0FBQ2hCLFFBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztBQUMvQyxRQUFJLFVBQVUsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUM3QyxRQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTs7QUFFbkMsV0FBSyxHQUFHLElBQUksQ0FBQztBQUNiLFlBQU07S0FDUDtBQUNELEtBQUMsSUFBSSxJQUFJLENBQUM7R0FDWDs7QUFFRCxNQUFJLENBQUMsS0FBSyxFQUFFO0FBQ1YsV0FBTyxJQUFJLENBQUM7R0FDYjs7Ozs7O0FBQUEsTUFNRyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsTUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RCxNQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUQsTUFBSSxVQUFVLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0FBQzNELE1BQUksYUFBYSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztBQUN4RixNQUFJLFFBQVEsSUFBSSxVQUFVLElBQUksQ0FBQyxJQUMxQixDQUFDLFFBQVEsSUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFOztBQUVwQyxXQUFPLENBQUMsQ0FBQztHQUNWLE1BQ0k7OztBQUdILEtBQUMsSUFBSSxJQUFJLENBQUM7QUFDVixXQUFPLENBQUMsQ0FBQztHQUNWO0NBQ0Y7Ozs7O0FBQUEsU0FLUSxhQUFhLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTs7QUFFeEMsTUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzFDLE1BQUksQ0FBQyxTQUFTLEVBQUU7QUFDZCxXQUFPO0dBQ1I7Ozs7QUFBQSxNQUlHLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQSxDQUFFO0FBQ3pFLE1BQUksaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzs7QUFFbkUsTUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUMxQyxNQUFJLFFBQVEsQ0FBQztBQUNiLE1BQUksaUJBQWlCLElBQUksYUFBYSxLQUFLLGlCQUFpQixFQUFFOzs7QUFHNUQsUUFBSSxLQUFLLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLEdBQUksU0FBUyxDQUFDLFlBQVksQ0FBQztBQUN6RCxZQUFRLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDL0QsTUFDSTs7OztBQUlILFlBQVEsR0FBRyxpQkFBaUIsQ0FBQztHQUM5Qjs7QUFFRCxNQUFJLENBQUMsUUFBUSxFQUFFOzs7QUFHYixZQUFRLEdBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUU7R0FDdEQ7O0FBRUQsTUFBSSxRQUFRLEtBQUssYUFBYSxFQUFFO0FBQzlCLFdBQU8sQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0FBQ2pDLFdBQU8sSUFBSTtBQUFBLEdBQ1osTUFDSTtBQUNILGFBQU8sS0FBSztBQUFBLEtBQ2I7Q0FDRjtBQUNELFlBQUEsQ0FBQSxPQUFBLENBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFO0FBQ2pELFNBQU8sRUFBRSxZQUFBLENBQUEsT0FBQSxDQUFXLElBQUksQ0FBQyxZQUFBLENBQUEsT0FBQSxDQUFXLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztDQUM3RCxDQUFDLENBQUM7OztBQzVKSCxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUc7Ozs7Ozs7O0FBQUMsQUFRdGpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7QUFFdkQsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXZELFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsU0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFL0YsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7O0FBQUEsQUFLekosSUFacUIsdUJBQXVCLEdBQUEsQ0FBQSxZQUFBO0FBYTFDLFdBYm1CLHVCQUF1QixHQUFBO0FBY3hDLG1CQUFlLENBQUMsSUFBSSxFQWRILHVCQUF1QixDQUFBLENBQUE7R0FlekM7O0FBRUQsY0FBWSxDQWpCTyx1QkFBdUIsRUFBQSxDQUFBO0FBa0J4QyxPQUFHLEVBQUUsU0FBUzs7Ozs7OztBQU9kLFNBQUssRUFBRSxTQUFTLE9BQU8sQ0FsQmpCLEtBQUssRUFBRTtBQUNiLFVBQUksT0FBTyxHQUFBLFNBQUEsQ0FBQztBQUNaLFVBQUksV0FBVyxHQUFHLElBQUksQ0FBQzs7QUFFdkIsY0FBUSxLQUFLLENBQUMsT0FBTztBQUNuQixhQUFLLENBQUM7O0FBQ0oseUJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixpQkFBTyxHQUFHLElBQUksQ0FBQztBQUNmLHFCQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLGdCQUFNO0FBQUEsYUFDSCxFQUFFOztBQUNMLGlCQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2YsZ0JBQU07QUFBQTtBQUVOLGNBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQ2hELEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxZQUFBLEVBQWM7QUFDbkMsa0NBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDOUQ7QUFDRCxxQkFBVyxHQUFHLEtBQUssQ0FBQztBQUFBLE9BQ3ZCOztBQUVELFVBQUksV0FBVyxFQUFFO0FBQ2Ysd0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDeEI7O0FBRUQsYUFBTyxPQUFPLENBQUM7S0FDaEI7Ozs7Ozs7OztBQUFBLEdBNEJBLEVBQUU7QUFDRCxPQUFHLEVBQUUsMEJBQTBCO0FBQy9CLFNBQUssRUFBRSxTQUFTLHdCQUF3QixDQXRCakIsTUFBTSxFQUFFO0FBQy9CLFVBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN6QyxlQUFPO09BQ1I7QUFDRCxVQUFJLEtBQUssR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkQsVUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO0FBQ2QsWUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7T0FDNUI7S0FDRjtHQXVCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQTFFbUIsdUJBQXVCLENBQUE7Q0EyRTNDLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBN0VNLHVCQUF1QixDQUFBOztBQW9ENUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRTtBQUMxRCxTQUFPLEVBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBVyxJQUFJLENBQUMsWUFBQSxDQUFBLE9BQUEsQ0FBVyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Q0FDN0QsQ0FBQzs7OztBQUFBLEFBQUMsSUFLRyx1QkFBdUIsR0FBRyxJQUFJOzs7QUFBQSxBQUFDLFNBSTVCLDRCQUE0QixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDckQsTUFBSSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwRCxNQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2pDLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEQsUUFBSSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsUUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsS0FBSyxNQUFNLEVBQUU7QUFDdEQsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGO0FBQ0QsU0FBTyxDQUFDLENBQUMsQ0FBQztDQUNYOzs7O0FBQUEsU0FJUSxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7QUFDcEMsTUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtBQUM5QixRQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzFCLFdBQU8sQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQzdDLFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUMxQyxhQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMzQixDQUFDLENBQUM7R0FDSjtBQUNELFNBQU8sT0FBTyxDQUFDLGlCQUFpQixDQUFDO0NBQ2xDOztBQUVELFNBQVMsZUFBZSxDQUFDLE9BQU8sRUFBRTtBQUNoQyxNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNwRSxNQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDZCxXQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDbkU7QUFDRCxTQUFPLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZELFNBQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0NBQzdCOztBQUVELFNBQVMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztBQUN4QyxTQUFPLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkQsU0FBTyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2RCxrQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMzQjs7QUFFRCxTQUFTLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtBQUNuQyxNQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUU7QUFDMUIsZ0JBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckMsV0FBTyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7R0FDaEM7Q0FDRjs7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtBQUNqQyxTQUFPLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUMxQixvQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUM3Qjs7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtBQUNqQyxvQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixTQUFPLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxZQUFNO0FBQ3hDLG9CQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQzNCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztDQUM3Qjs7O0FDdElELFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0dBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOzs7Ozs7OztBQUFBLEFBUXpKLElBVnFCLGtCQUFrQixHQUFBLENBQUEsWUFBQTtBQVdyQyxXQVhtQixrQkFBa0IsR0FBQTtBQVluQyxtQkFBZSxDQUFDLElBQUksRUFaSCxrQkFBa0IsQ0FBQSxDQUFBO0dBYXBDOztBQUVELGNBQVksQ0FmTyxrQkFBa0IsRUFBQSxDQUFBO0FBZ0JuQyxPQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLFNBQUssRUFBRSxTQUFTLGNBQWMsQ0FmakIsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUM3QixVQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN6RCxVQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsZUFBZSxHQUFHLEVBQUUsQ0FBQztLQUNwRDtHQWdCQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXZCbUIsa0JBQWtCLENBQUE7Q0F3QnRDLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBMUJNLGtCQUFrQixDQUFBOzs7QUNOdkMsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0MsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLE1BQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUFFO0NBQUU7Ozs7Ozs7O0FBQUEsQUFRekosSUFWcUIsZUFBZSxHQUFBLENBQUEsWUFBQTtBQVdsQyxXQVhtQixlQUFlLEdBQUE7QUFZaEMsbUJBQWUsQ0FBQyxJQUFJLEVBWkgsZUFBZSxDQUFBLENBQUE7R0FhakM7O0FBRUQsY0FBWSxDQWZPLGVBQWUsRUFBQSxDQUFBO0FBZ0JoQyxPQUFHLEVBQUUsb0JBQW9COzs7Ozs7Ozs7Ozs7QUFZekIsU0FBSyxFQUFFLFNBQVMsa0JBQWtCLENBVGpCLElBQUksRUFBRTs7Ozs7QUFLdkIsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ3ZDLFVBQUksQ0FBQyxTQUFTLEVBQUU7QUFDZCxlQUFPO09BQ1I7O0FBRUQsVUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFDNUUsVUFBSSxhQUFhLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZOztBQUFBLEFBQUMsVUFFL0MsWUFBWSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztBQUNoRSxVQUFJLGFBQWEsR0FBRyxZQUFZLEVBQUU7O0FBRWhDLGlCQUFTLENBQUMsU0FBUyxJQUFJLGFBQWEsR0FBRyxZQUFZLENBQUM7T0FDckQsTUFDSSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFOztBQUV6QyxpQkFBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7T0FDbEM7S0FDRjtHQVNBLEVBQUU7QUFDRCxPQUFHLEVBQUUsY0FBYztBQUNuQixPQUFHLEVBQUUsU0FBUyxHQUFHLENBbERGLElBQUksRUFBRTtBQUNyQixVQUFJLElBQUksRUFBRTs7QUFFUixZQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDL0I7S0FDRjtHQW1EQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQTVEbUIsZUFBZSxDQUFBO0NBNkRuQyxDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQS9ETSxlQUFlLENBQUE7Ozs7Ozs7Ozs7Ozs7OztJQ0Z4QixnQkFBZ0I7Ozs7OztJQUVQLFVBQVU7V0FBVixVQUFVOzBCQUFWLFVBQVU7OztlQUFWLFVBQVU7Ozs7Ozs7NkJBd0VwQixVQUFVLEVBQUU7QUFDbkIsZ0JBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBaER5Qjt3Q0FBUixNQUFNO0FBQU4sY0FBTTs7Ozs7OztBQUt0QixhQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBMkJlLFVBQVUsRUFBRTtBQUMxQixXQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtBQUMxQixZQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsWUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM1RCxpQkFBUyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakMsY0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO09BQzlDO0tBQ0Y7Ozt5QkFlVyxTQUFTLEVBQUU7O0FBRXJCLGFBQU8sVUFBUyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTs7O0FBR3ZDLFlBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7QUFDN0IsZ0JBQU0sQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7U0FDL0I7QUFDRCxjQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO09BQzNDLENBQUE7S0FDRjs7O1NBM0ZrQixVQUFVOzs7Ozs7OztrQkFBVixVQUFVO0FBb0cvQixVQUFVLENBQUMsS0FBSyxHQUFHLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsQUFnQnBDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHO0FBQ2hDLFlBQVUsRUFBRSxVQUFVLENBQUMsU0FBUztDQUNqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxBQXVCRixVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUzs7O0FBQUMsQUFJOUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRztBQUN0QyxjQUFZLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7QUFDaEQsZ0JBQWMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtBQUNsRCxjQUFZLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlO0NBQy9DOzs7Ozs7QUFBQyxBQU9GLElBQU0sK0JBQStCLEdBQUcsQ0FDdEMsV0FBVyxFQUNYLFFBQVEsRUFDUixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsQ0FDWjs7O0FBQUMsQUFHRixJQUFNLDZCQUE2QixHQUFHLENBQ3BDLGFBQWEsQ0FDZDs7Ozs7Ozs7O0FBQUMsQUFVRixTQUFTLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtBQUNsQyxNQUFJLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsR0FDL0QsR0FBRyxDQUFDLGlCQUFpQixHQUNyQixFQUFFLENBQUM7QUFDTCxNQUFJLHlCQUF5QixHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNyRCxNQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCOzs7QUFBQyxBQUdwRSxNQUFJLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLFFBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDOUMsUUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7O0FBRW5FLFVBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUQsVUFBSSxHQUFHLEdBQUcsdUJBQXVCLENBQUMsVUFBVSxDQUFDOzs7QUFBQyxBQUc5QyxVQUFJLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxJQUFJO0FBQUMsVUFDN0IseUJBQXlCLENBQUMsSUFBSSxDQUFDO0FBQUEsVUFDL0IseUJBQXlCLENBQUMsR0FBRyxDQUFDO0FBQUEsVUFDOUIsdUJBQXVCLENBQUMsSUFBSSxDQUFDO0FBQUEsVUFDN0IsdUJBQXVCLENBQUMsR0FBRyxDQUFDOzs7O0FBQUMsQUFJcEMsVUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQzlDLFlBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVCLGNBQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztPQUM5QztLQUNGO0dBQ0YsQ0FBQyxDQUFDO0NBQ0o7Ozs7OztBQUFBLEFBT0QsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUE0QjtNQUExQixtQkFBbUIseURBQUcsRUFBRTs7QUFDakUsUUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNqRCxRQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDekMsVUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRCxZQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakQ7R0FDRixDQUFDLENBQUM7QUFDSCxTQUFPLE1BQU0sQ0FBQztDQUNmOzs7Ozs7QUFBQSxBQU9ELFNBQVMsUUFBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7OztBQUc1QixNQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsTUFBSSxTQUFTLEdBQUcsWUFBWSxHQUMxQixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEdBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsTUFBSSxTQUFTLElBQ1QsU0FBUyxLQUFLLFFBQVEsSUFDdEIsU0FBUyxLQUFLLE1BQU0sSUFDcEIsU0FBUyxLQUFLLE1BQU0sQ0FBQyxTQUFTLEVBQUU7OztBQUdsQyxRQUFJLEdBQUcsUUFBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUNqQzs7O0FBQUEsQUFHRCxNQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsTUFBSSxNQUFNLEdBQUcsV0FBVyxHQUN0QixjQUFjLENBQUMsSUFBSSxDQUFDLEdBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDOzs7QUFBQyxBQUd0QixNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsTUFBSSxXQUFXLElBQUksWUFBWSxFQUFFOztBQUUvQixxQkFBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLCtCQUErQixDQUFDLENBQUM7QUFDbEUsVUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0dBQzlGLE1BQU0sSUFBSSxDQUFDLFdBQVcsSUFBSSxZQUFZLEVBQUU7O0FBRXZDLFVBQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO0dBQ3RGLE1BQU0sSUFBSSxXQUFXLElBQUksQ0FBQyxZQUFZLEVBQUU7O0FBRXZDLFVBQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0dBQ3BGLE1BQU07O0FBRUwsVUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztHQUMxRTs7QUFFRCxNQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7Ozs7QUFJZCxVQUFNLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN2QixVQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNOzs7O0FBQUMsQUFJdkMsVUFBTSxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7R0FDcEQ7OztBQUFBLEFBR0QsdUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTlCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7Ozs7O0FBQUEsQUFNRCxTQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUU7Ozs7OztBQU01QixXQUFTLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDdkIsUUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEMsUUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRCxTQUFPLFFBQVEsQ0FBQztDQUNqQjs7Ozs7QUFBQSxBQU1ELFNBQVMsdUJBQXVCLENBQUMsVUFBVSxFQUFFO0FBQzNDLE1BQUksT0FBTyxVQUFVLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTs7QUFFMUMsV0FBTyxZQUFZLENBQUM7R0FDckIsTUFBTSxJQUFJLE9BQU8sVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVLElBQ3hDLE9BQU8sVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUU7O0FBRTNDLFdBQU8sY0FBYyxDQUFDO0dBQ3ZCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYjs7Ozs7Ozs7Ozs7QUFBQSxBQVlELFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUNsQixTQUFPLE9BQU8sQ0FBQyxLQUFLLFVBQVU7QUFDekIsR0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsS0FBSyxDQUFDLEFBQUM7QUFBQyxDQUNwRDs7Ozs7Ozs7UUN4VWUsZUFBZSxHQUFmLGVBQWU7UUFhZixlQUFlLEdBQWYsZUFBZTtRQXdCZixxQkFBcUIsR0FBckIscUJBQXFCO1FBb0JyQixRQUFRLEdBQVIsUUFBUTtRQVFSLGdCQUFnQixHQUFoQixnQkFBZ0I7UUFlaEIsaUJBQWlCLEdBQWpCLGlCQUFpQjtRQWFqQixpQkFBaUIsR0FBakIsaUJBQWlCO1FBZ0JqQixpQkFBaUIsR0FBakIsaUJBQWlCOzs7Ozs7Ozs7O0FBN0cxQixTQUFTLGVBQWUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3BELFNBQU8sWUFBVztBQUNoQixhQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNqQyxXQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ3pDLENBQUM7Q0FDSDs7Ozs7OztBQUFBLEFBUU0sU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDdkQsTUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUNsQyxNQUFJLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLE1BQUksY0FBYyxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN0RCxNQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0FBQ3JDLFFBQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQzlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBa0JNLFNBQVMscUJBQXFCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMvQyxNQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVELE1BQUksVUFBVSxFQUFFO0FBQ2QsV0FBTyxVQUFVLENBQUM7R0FDbkIsTUFBTTtBQUNMLFFBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDOzs7QUFBQyxBQUczQyxRQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO0FBQ2xDLGFBQU8scUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9DO0dBQ0Y7QUFDRCxTQUFPLFNBQVM7QUFBQyxDQUNsQjs7Ozs7O0FBQUEsQUFPTSxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFOzs7Ozs7O0FBQUEsQUFRN0MsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtBQUN4RCxNQUFJLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7QUFDM0MsTUFBSSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVELFlBQVUsQ0FBQyxLQUFLLEdBQUcsWUFBVztBQUM1QixXQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQ3pDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDbkQsQ0FBQTtDQUNGOzs7Ozs7O0FBQUEsQUFRTSxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0FBQ3pELE1BQUksbUJBQW1CLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUMzQyxNQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUQsWUFBVSxDQUFDLEtBQUssR0FBRyxZQUFXO0FBQzVCLFdBQU8sbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFDMUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUNsRCxDQUFBO0NBQ0Y7Ozs7O0FBQUEsQUFNTSxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0FBQ3pELE1BQUksbUJBQW1CLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUMzQyxNQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUQsWUFBVSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztDQUM3RTs7Ozs7Ozs7Ozs7QUFBQSxBQVlNLFNBQVMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDekQsTUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxNQUFJLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdEQsTUFBSSxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFOztBQUUzRCxjQUFVLENBQUMsR0FBRyxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQy9CLG9CQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdEMsQ0FBQztHQUNILE1BQU0sSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3pCLFFBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUU7O0FBRXpDLGdCQUFVLENBQUMsR0FBRyxHQUFHLFlBQVc7QUFDMUIsZUFBTyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QyxDQUFDO0tBQ0g7O0FBQUEsQUFFRCxjQUFVLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUN0RTtDQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3BJb0Isb0JBQW9CO1dBQXBCLG9CQUFvQjswQkFBcEIsb0JBQW9COzs7ZUFBcEIsb0JBQW9COzs7Ozs7NkNBS2QsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7OztBQUdqRCxVQUFJLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxVQUFJLFlBQVksSUFBSSxJQUFJLElBQUksRUFBRSxZQUFZLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQSxBQUFDLEVBQUU7QUFDcEUsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQztPQUMvQjtLQUNGOzs7c0NBRWlCOzs7QUFDaEIsUUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLFNBQVMsRUFBSTtBQUM1QyxjQUFLLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUMzRSxDQUFDLENBQUM7S0FDSjs7O1NBbEJrQixvQkFBb0I7Ozs7O2tCQUFwQixvQkFBb0I7QUF3QnpDLFNBQVMsdUJBQXVCLENBQUMsYUFBYSxFQUFFO0FBQzlDLE1BQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQUEsQ0FBQztXQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7R0FBQSxDQUFDLENBQUM7QUFDL0UsU0FBTyxZQUFZLENBQUM7Q0FDckI7OztBQUFBLEFBR0QsU0FBUyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUU7QUFDN0MsTUFBSSxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsVUFBQSxDQUFDO1dBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO0dBQUEsQ0FBQyxDQUFDO0FBQ2hHLFNBQU8sYUFBYSxDQUFDO0NBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNoQ29CLG9CQUFvQjtXQUFwQixvQkFBb0I7MEJBQXBCLG9CQUFvQjs7O2VBQXBCLG9CQUFvQjs7c0NBRXJCOzs7QUFDaEIsVUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ25CLFlBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osWUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1RCxVQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDcEMsY0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxnQkFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25CLENBQUMsQ0FBQztPQUNKO0tBQ0Y7OztTQVhrQixvQkFBb0I7OztrQkFBcEIsb0JBQW9COzs7Ozs7Ozs7Ozs7Ozs7OztBQ016QyxJQUFJLGlCQUFpQixHQUFHLHFCQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyx1QkFBYTs7Ozs7OztBQUFDLGtCQUUxRCxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0YxQixXQUFXO1lBQVgsV0FBVzs7V0FBWCxXQUFXOzBCQUFYLFdBQVc7O2tFQUFYLFdBQVc7OztlQUFYLFdBQVc7Ozs7d0JBR1gsSUFBSSxFQUFFO0FBQ1IsYUFBTyxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsU0FBUyxVQUFLLElBQUksQ0FBRyxDQUFDO0tBQzNDOzs7U0FMRyxXQUFXOzs7a0JBU0YsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPOzsrQkFJL0M7O0FBRUQsUUFBUSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDZmpDLGdCQUFnQjtXQUFoQixnQkFBZ0I7MEJBQWhCLGdCQUFnQjs7O2VBQWhCLGdCQUFnQjs7Ozs7OztzQ0FNakI7QUFDaEIsVUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM3QixVQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTs7QUFFaEMsZ0JBQVEsR0FBRywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUNsRDtBQUNELFVBQUksUUFBUSxJQUFJLG1CQUFtQixFQUFFO0FBQ25DLCtCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ25DO0FBQ0QsVUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7QUFDNUIsMEJBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUM5Qzs7O0FBQUEsQUFHRCxVQUFJLFFBQVEsRUFBRTs7QUFFWixZQUFJLElBQUksR0FBRyxtQkFBbUIsR0FDNUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3ZCLFlBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFBQyxBQUN0QyxZQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEQsWUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUN6QjtLQUNGOzs7U0E1QmtCLGdCQUFnQjs7Ozs7a0JBQWhCLGdCQUFnQjtBQWtDckMsSUFBTSxtQkFBbUIsR0FBSSxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEtBQUssV0FBVyxBQUFDOzs7QUFBQyxBQUk1RixTQUFTLDJCQUEyQixDQUFDLFNBQVMsRUFBRTtBQUM5QyxNQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQzs7OztBQUFDLEFBSWxELE1BQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsS0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsU0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDaEMsWUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ2pEO0FBQ0QsU0FBTyxRQUFRLENBQUM7Q0FDakI7Ozs7QUFBQSxBQUlELFNBQVMsdUJBQXVCLENBQUMsUUFBUSxFQUFFO0FBQ3pDLElBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBQSxXQUFXLEVBQUk7QUFDeEUsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2RCxlQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7R0FDbEUsQ0FBQyxDQUFDO0NBQ0o7OztBQUFBLEFBR0QsU0FBUyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQ3pDLGVBQWEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDNUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqIGJhc2ljLWxpc3QtYm94XG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2VsZW1lbnQtYmFzZS9zcmMvRWxlbWVudEJhc2UnO1xuaW1wb3J0IENoaWxkcmVuQ29udGVudCBmcm9tICcuLi8uLi9taXhpbnMvQ2hpbGRyZW5Db250ZW50JztcbmltcG9ydCBDbGlja1NlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvQ2xpY2tTZWxlY3Rpb24nO1xuaW1wb3J0IENvbnRlbnRJdGVtcyBmcm9tICcuLi8uLi9taXhpbnMvQ29udGVudEl0ZW1zJztcbmltcG9ydCBEaXJlY3Rpb25TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0RpcmVjdGlvblNlbGVjdGlvbic7XG5pbXBvcnQgR2VuZXJpYyBmcm9tICcuLi8uLi9taXhpbnMvR2VuZXJpYyc7XG5pbXBvcnQgSXRlbVNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvSXRlbVNlbGVjdGlvbic7XG5pbXBvcnQgSXRlbXNBY2Nlc3NpYmxlIGZyb20gJy4uLy4uL21peGlucy9JdGVtc0FjY2Vzc2libGUnO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZCc7XG5pbXBvcnQgS2V5Ym9hcmREaXJlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkRGlyZWN0aW9uJztcbmltcG9ydCBLZXlib2FyZFBhZ2luZyBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmRQYWdpbmcnO1xuaW1wb3J0IEtleWJvYXJkUHJlZml4U2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZFByZWZpeFNlbGVjdGlvbic7XG5pbXBvcnQgU2VsZWN0aW9uSGlnaGxpZ2h0IGZyb20gJy4uLy4uL21peGlucy9TZWxlY3Rpb25IaWdobGlnaHQnO1xuaW1wb3J0IFNlbGVjdGlvblNjcm9sbCBmcm9tICcuLi8uLi9taXhpbnMvU2VsZWN0aW9uU2Nyb2xsJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Qm94IGV4dGVuZHMgRWxlbWVudEJhc2UuY29tcG9zZShcbiAgICBDaGlsZHJlbkNvbnRlbnQsXG4gICAgQ2xpY2tTZWxlY3Rpb24sXG4gICAgQ29udGVudEl0ZW1zLFxuICAgIERpcmVjdGlvblNlbGVjdGlvbixcbiAgICBHZW5lcmljLFxuICAgIEl0ZW1TZWxlY3Rpb24sXG4gICAgSXRlbXNBY2Nlc3NpYmxlLFxuICAgIEtleWJvYXJkLFxuICAgIEtleWJvYXJkRGlyZWN0aW9uLFxuICAgIEtleWJvYXJkUGFnaW5nLFxuICAgIEtleWJvYXJkUHJlZml4U2VsZWN0aW9uLFxuICAgIFNlbGVjdGlvbkhpZ2hsaWdodCxcbiAgICBTZWxlY3Rpb25TY3JvbGxcbiAgKSB7XG5cbiAgLy8gU3R1YiBmb3IgY29sbGVjdGl2ZXMgZm9yIG5vd1xuICBnZXQgaW5uZXJtb3N0QXR0YWNoZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuJC5pdGVtc0NvbnRhaW5lcjtcbiAgfVxuICBnZXQgb3V0ZXJtb3N0QXR0YWNoZWQoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgICB9XG5cbiAgICAgIFt0YXJnZXQ9XCJjaGlsZFwiXSB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgLXdlYmtpdC1mbGV4OiAxO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgfVxuXG4gICAgICAjaXRlbXNDb250YWluZXIge1xuICAgICAgICAtd2Via2l0LWZsZXg6IDE7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsOyAvKiBmb3IgbW9tZW50dW0gc2Nyb2xsaW5nICovXG4gICAgICB9XG5cbiAgICAgIC8qIEdlbmVyaWMgYXBwZWFyYW5jZSAqL1xuICAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgfVxuXG4gICAgICA6aG9zdChbZ2VuZXJpYz1cIlwiXSkgI2l0ZW1zQ29udGFpbmVyIDo6Y29udGVudCA+ICoge1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIHBhZGRpbmc6IDAuMjVlbTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8ZGl2IGlkPVwiaXRlbXNDb250YWluZXJcIj5cbiAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG59XG5cblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdiYXNpYy1saXN0LWJveCcsIExpc3RCb3gpO1xuIiwiZnVuY3Rpb24gZ3JlZXQoKSB7XG4gIGNvbnNvbGUubG9nKGBIZWxsbywgd29ybGQuYCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdyZWV0O1xuIiwiLyoqXG4gKiBMZXRzIGEgY29tcG9uZW50IGNvbGxlY3RpdmUgdGFrZXMgYXMgaXRzIGNvbnRlbnQgdGhlIGNoaWxkcmVuIG9mIHRoZVxuICogaW5uZXJtb3N0IGFzcGVjdC5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1jaGlsZHJlbi1jb250ZW50XG4gKlxuICovXG5cbi8vIFRPRE86IERvbid0IHJlc3BvbmQgdG8gY2hhbmdlcyBpbiBhdHRyaWJ1dGVzLCBvciBhdCBsZWFzdCBvZmZlciB0aGF0IGFzIGFuXG4vLyBvcHRpb24uXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoaWxkcmVuQ29udGVudCB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIC8vIFVudGlsIHdlIGhhdmUgY29udGVudCBvYnNlcnZpbmcgYWdhaW4sIGZvcmNlIGEgY2FsbCB0byBjb250ZW50Q2hhbmdlZCgpLlxuICAgIC8vIEhBQ0s6IERvIHRoaXMgYXN5bmNocm9ub3VzbHksIHNvIG90aGVyIG1peGlucyBoYXZlIGEgY2hhbmNlIHRvIHNldCB1cFxuICAgIC8vIGJlZm9yZSB0aGlzIGNhbGwuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbnRlbnRDaGFuZ2VkKCkpO1xuICB9XG5cbiAgLy8gVE9ETzogV2FpdCB0byBvYnNlcnZlIGNoYW5nZXMgdW50aWwgd2UgaGF2ZSBhIHNoYWRvdyBET00gaG9zdC4gUmlnaHRcbiAgLy8gbm93LCB0aGUgaW5pdGlhbCBjb2xsZWN0aXZlQ2hhbmdlZCBjYWxsIGNhbiBoYXBwZW4gdG9vIGVhcmx5LlxuICAvLyBUT0RPOiBIYW5kbGUgY2FzZSB3aGVyZSBjb21wb25lbnQgaXMgaW5zdGFudGlhdGVkIG91dCBvZiBET00sIHRoZW5cbiAgLy8gYXR0YWNoZWQuXG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkKCkge1xuICAvLyAgIC8vIGNvbnNvbGUubG9nKHRoaXMubG9jYWxOYW1lICsgXCIgY29sbGVjdGl2ZUNoYW5nZWQ6IFwiICsgdGhpcy5jb2xsZWN0aXZlLmFzcGVjdHMubGVuZ3RoKTtcbiAgLy8gICBsZXQgaW5uZXJtb3N0ID0gdGhpcy5jb2xsZWN0aXZlLmlubmVybW9zdEVsZW1lbnQ7XG4gIC8vICAgbGV0IGlubmVybW9zdEhvc3QgPSBCYXNpYy5Db250ZW50SGVscGVycy5nZXRIb3N0KGlubmVybW9zdCk7XG4gIC8vXG4gIC8vICAgLy8gT3B0aW1pemUgZm9yIHRoZSBjYXNlIHdoZXJlIHRoZSBjb2xsZWN0aXZlJ3MgY2hhbmdlZCwgYnV0IGl0c1xuICAvLyAgIC8vIGlubmVybW9zdCBhc3BlY3QgaXMgc3RpbGwgdGhlIHNhbWUuIEluIHRoYXQgY2FzZSwgd2UgZG9uJ3Qgd2FudCB0b1xuICAvLyAgIC8vIGJvdGhlciB0ZWFyaW5nIGRvd24gYW5kIHRoZW4gcmVjcmVhdGluZyBvdXIgY29udGVudENoYW5nZWQgaGFuZGxlci5cbiAgLy8gICAvLyBUT0RPOiBUaGlzIGN1cnJlbnRseSBvbmx5IHRyYWNrcyBvbmUgbGV2ZWwgb2YgaG9zdC4gRm9yIHJvYnVzdG5lc3MsXG4gIC8vICAgLy8gdGhpcyBzaG91bGQgdHJhY2sgdGhlIGNoYWluIG9mIGhvc3RzLlxuICAvLyAgIGlmIChpbm5lcm1vc3QgPT09IHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0XG4gIC8vICAgICAgICYmIGlubmVybW9zdEhvc3QgPT09IHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0SG9zdCkge1xuICAvLyAgICAgLy8gV2Ugc2hvdWxkIGFscmVhZHkgYmUgb2JzZXJ2aW5nIGNoYW5nZXMgb24gdGhlIGlubmVybW9zdCBhc3BlY3QuXG4gIC8vICAgICAvLyBFdmVuIHRob3VnaCB0aGUgY29udGVudCBoYXNuJ3QgYWN0dWFsbHkgY2hhbmdlZCwgd2Ugd2FudCB0byBnaXZlIHRoZVxuICAvLyAgICAgLy8gbmV3IGFzcGVjdHMgYSBjaGFuY2UgdG8gcmVzcG9uZCB0byBjb250ZW50Q2hhbmdlZC5cbiAgLy8gICAgIHRoaXMuY29sbGVjdGl2ZS5jb250ZW50Q2hhbmdlZCgpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICAvLyBBIG5ldyBhc3BlY3QgaXMgbm93IGlubmVybW9zdC5cbiAgLy8gICBpZiAodGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QgJiYgdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QuX2NvbnRlbnRDaGFuZ2VPYnNlcnZlcikge1xuICAvLyAgICAgLy8gU3RvcCBvYnNlcnZpbmcgY2hhbmdlcyBvbiB0aGUgb2xkIGlubmVybW9zdCBhc3BlY3QuXG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhcInN0b3BwaW5nIG9ic2VydmF0aW9uIG9mIGNoYW5nZXMgb24gb2xkIGlubmVybW9zdCBhc3BlY3RcIik7XG4gIC8vICAgICBCYXNpYy5Db250ZW50SGVscGVycy5vYnNlcnZlQ29udGVudENoYW5nZXModGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QsIG51bGwpO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBCYXNpYy5Db250ZW50SGVscGVycy5vYnNlcnZlQ29udGVudENoYW5nZXMoaW5uZXJtb3N0LCBmdW5jdGlvbigpIHtcbiAgLy8gICAgIC8vIFJlc2V0IG1lbW9pemVkIGNvbnRlbnQuXG4gIC8vICAgICB0aGlzLl9jb250ZW50ID0gbnVsbDtcbiAgLy9cbiAgLy8gICAgIC8vIExldCBjb2xsZWN0aXZlIGtub3cgY29udGVudCBoYXMgY2hhbmdlZC5cbiAgLy8gICAgIHRoaXMuY29sbGVjdGl2ZS5jb250ZW50Q2hhbmdlZCgpO1xuICAvLyAgIH0uYmluZCh0aGlzKSk7XG4gIC8vXG4gIC8vICAgdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3QgPSBpbm5lcm1vc3Q7XG4gIC8vICAgdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RIb3N0ID0gaW5uZXJtb3N0SG9zdDtcbiAgLy8gfVxuXG4gIGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnY29udGVudC1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsYXR0ZW5lZCBjb250ZW50IG9mIHRoaXMgY29sbGVjdGl2ZS5cbiAgICpcbiAgICogVGhlIGNvbnRlbnQgaXMgdGhlIGNvbGxlY3RpdmUgb2Ygbm9kZXMgd2hpY2ggYXJlIGNoaWxkcmVuIG9mIHRoZVxuICAgKiBjb2xsZWN0aXZlJ3MgaW5uZXJtb3N0IGFzcGVjdC4gSWYgYW55IG9mIHRob3NlIG5vZGVzIGFyZSBgPGNvbnRlbnQ+YFxuICAgKiBlbGVtZW50cywgdGhvc2UgYXJlIHJlY3Vyc2l2ZWx5IGV4cGFuZGVkLlxuICAgKlxuICAgKiBAcHJvcGVydHkgY29udGVudFxuICAgKiBAdHlwZSBbT2JqZWN0XVxuICAgKi9cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgLy8gaWYgKCF0aGlzLl9jb250ZW50KSB7XG4gICAgLy8gICBsZXQgaW5uZXJtb3N0ID0gdGhpcy5jb2xsZWN0aXZlLmlubmVybW9zdEVsZW1lbnQ7XG4gICAgLy8gICBpZiAoaW5uZXJtb3N0KSB7XG4gICAgLy8gICAgIHRoaXMuX2NvbnRlbnQgPSBCYXNpYy5Db250ZW50SGVscGVycy5mbGF0dGVuQ2hpbGRyZW4oaW5uZXJtb3N0KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy8gcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gIH1cblxufTtcblxuXG4vLyByZWFkeSgpIHtcbi8vICAgLy8gSEFDSzogRW5zdXJlIHRhcmdldENoYW5nZWQgKGFsc28pIGhhcHBlbnMgYWZ0ZXIgcmVhZHkuXG4vLyAgIHRoaXMudGFyZ2V0Q2hhbmdlZCh0aGlzLnRhcmdldCk7XG4vLyB9XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYXBzIGEgY2xpY2sgdG8gaXRlbSBzZWxlY3Rpb24uXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtY2xpY2stc2VsZWN0aW9uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpY2tTZWxlY3Rpb24ge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAvKlxuICAgICAqIFJFVklFVzogV2hpY2ggZXZlbnQgc2hvdWxkIHdlIGxpc3RlbiB0byBoZXJlP1xuICAgICAqXG4gICAgICogVGhlIHN0YW5kYXJkIHVzZSBmb3IgdGhpcyBhc3BlY3QgaXMgaW4gbGlzdCBib3hlcy4gTGlzdCBib3hlcyBkb24ndFxuICAgICAqIGFwcGVhciB0byBiZSBjb25zaXN0ZW50IHdpdGggcmVnYXJkIHRvIHdoZXRoZXIgdGhleSBzZWxlY3Qgb24gbW91c2Vkb3duXG4gICAgICogb3IgY2xpY2svbW91c2V1cC5cbiAgICAgKi9cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcbiAgICAgIHNlbGVjdFRhcmdldCh0aGlzLCBldmVudC50YXJnZXQpO1xuICAgICAgLy8gTm90ZTogV2UgZG9uJ3QgY2FsbCBwcmV2ZW50RGVmYXVsdCBoZXJlLiBUaGUgZGVmYXVsdCBiZWhhdmlvciBmb3JcbiAgICAgIC8vIG1vdXNlZG93biBpbmNsdWRlcyBzZXR0aW5nIGtleWJvYXJkIGZvY3VzIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3RcbiAgICAgIC8vIGFscmVhZHkgaGF2ZSB0aGUgZm9jdXMsIGFuZCB3ZSB3YW50IHRvIHByZXNlcnZlIHRoYXQgYmVoYXZpb3IuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24uIFRoaXMgd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIC8vIHNldCBzZWxlY3RlZEluZGV4KGluZGV4KSB7fVxuXG59XG5cbi8vIFRPRE86IEhhbmRsZSB0aGUgY2FzZSB3aGVyZSBhIGxpc3QgaXRlbSBoYXMgc3ViZWxlbWVudHMuIFdhbGsgdXAgdGhlIERPTVxuLy8gaGllcmFyY2h5IHVudGlsIHdlIGZpbmQgYW4gaXRlbSBpbiB0aGUgbGlzdCwgb3IgY29tZSBiYWNrIHRvIHRoaXMgZWxlbWVudCxcbi8vIGluIHdoaWNoIGNhc2UgdGhlIGVsZW1lbnQgdGhhdCB3YXMgdGFwcGVkIGlzbid0IGFuIGl0ZW0gKGFuZCBzaG91bGQgYmVcbi8vIGlnbm9yZWQpLlxuZnVuY3Rpb24gc2VsZWN0VGFyZ2V0KGVsZW1lbnQsIHRhcmdldCkge1xuICBsZXQgaW5kZXggPSBlbGVtZW50LmluZGV4T2ZJdGVtICYmIGVsZW1lbnQuaW5kZXhPZkl0ZW0odGFyZ2V0KTtcbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgfVxufVxuIiwiLyoqXG4gKiBBc3BlY3QgdGhhdCBsZXRzIGEgY29tcG9uZW50IGNvbGxlY3RpdmUgRE9NIGNvbnRlbnQgYXMgbGlzdCBpdGVtcy5cbiAqXG4gKiBBdXhpbGlhcnkgZWxlbWVudHMgd2hpY2ggYXJlIG5vdCBub3JtYWxseSB2aXNpYmxlIGFyZSBmaWx0ZXJlZCBvdXQuIEZvciBub3csXG4gKiBGb3Igbm93LCB0aGVzZSBhcmU6IGxpbmssIHNjcmlwdCwgc3R5bGUsIGFuZCB0ZW1wbGF0ZS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1jb250ZW50LWl0ZW1zXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEl0ZW1zIHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnLCBzZWxlY3RlZCk7XG4gIH1cblxuICBjb250ZW50Q2hhbmdlZCgpIHtcbiAgICB0aGlzLl9pdGVtcyA9IG51bGw7XG4gICAgdGhpcy5pdGVtc0NoYW5nZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwb3NpdGlvbmFsIGluZGV4IGZvciB0aGUgaW5kaWNhdGVkIGl0ZW0uXG4gICAqXG4gICAqIEBtZXRob2QgaW5kZXhPZkl0ZW1cbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gVGhlIGl0ZW0gd2hvc2UgaW5kZXggaXMgcmVxdWVzdGVkLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGl0ZW0sIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGluZGV4T2ZJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdGhpbmcuIFRoaXMgd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieVxuICAvLyBvdGhlciBhc3BlY3RzIGluIHRoZSBjb2xsZWN0aXZlLlxuICAvLyBpdGVtQWRkZWQ6IEJhc2ljLkNvbGxlY3RpdmUuZGVmYXVsdE1ldGhvZCxcbiAgaXRlbUFkZGVkKGl0ZW0pIHt9XG5cbiAgaXRlbXNDaGFuZ2VkKCkge1xuXG4gICAgLy8gUGVyZm9ybSBwZXItaXRlbSBpbml0aWFsaXphdGlvbi5cbiAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoIWl0ZW0uX2l0ZW1Jbml0aWFsaXplZCkge1xuICAgICAgICAvLyBCVUc6IElmIGFuIGFzcGVjdCBpcyBhc3NpbWlsYXRlZCBhZnRlciBDb250ZW50SXRlbXMsIHRoZW4gYWxsIHRoZVxuICAgICAgICAvLyBpdGVtcyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZCwgYW5kIHRoZSBuZXcgYXNwZWN0IHdvbid0IGhhdmUgYW5cbiAgICAgICAgLy8gb3Bwb3J0dW5pdHkgdG8gZG8gaXRzIG93biBwZXItaXRlbSBpbml0aWFsaXphdGlvbiBpbiBpdGVtQWRkZWQuXG4gICAgICAgIHRoaXMuaXRlbUFkZGVkKGl0ZW0pO1xuICAgICAgICBpdGVtLl9pdGVtSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdpdGVtcy1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2V0IG9mIGl0ZW1zIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAcHJvcGVydHkgaXRlbXNcbiAgICogQHR5cGUgW09iamVjdF1cbiAgICovXG4gIC8vIFRPRE86IHByb3BlcnR5IG5vdGlmaWNhdGlvbnMgc28gZWxlbWVudHMgY2FuIGJpbmQgdG8gdGhpcyBwcm9wZXJ0eVxuICBnZXQgaXRlbXMoKSB7XG4gICAgaWYgKHRoaXMuX2l0ZW1zID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2l0ZW1zID0gZmlsdGVyQXV4aWxpYXJ5RWxlbWVudHModGhpcy5jb250ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG5cbn1cblxuXG4vLyBSZXR1cm4gdGhlIGdpdmVuIGVsZW1lbnRzLCBmaWx0ZXJpbmcgb3V0IGF1eGlsaWFyeSBlbGVtZW50cyB0aGF0IGFyZW4ndFxuLy8gdHlwaWNhbGx5IHZpc2libGUuIEl0ZW1zIHdoaWNoIGFyZSBub3QgZWxlbWVudHMgYXJlIHJldHVybmVkIGFzIGlzLlxuZnVuY3Rpb24gZmlsdGVyQXV4aWxpYXJ5RWxlbWVudHMoaXRlbXMpIHtcbiAgbGV0IGF1eGlsaWFyeVRhZ3MgPSBbXG4gICAgJ2xpbmsnLFxuICAgICdzY3JpcHQnLFxuICAgICdzdHlsZScsXG4gICAgJ3RlbXBsYXRlJ1xuICBdO1xuICByZXR1cm4gW10uZmlsdGVyLmNhbGwoaXRlbXMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICByZXR1cm4gIWl0ZW0ubG9jYWxOYW1lIHx8IGF1eGlsaWFyeVRhZ3MuaW5kZXhPZihpdGVtLmxvY2FsTmFtZSkgPCAwO1xuICB9KTtcbn1cblxuXG4vKipcbiAqIEZpcmVzIHdoZW4gdGhlIGl0ZW1zIGluIHRoZSBsaXN0IGNoYW5nZS5cbiAqXG4gKiBAZXZlbnQgaXRlbXMtY2hhbmdlZFxuICovXG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYXBzIGRpcmVjdGlvbiBzZW1hbnRpY3MgKGdvTGVmdCwgZ29SaWdodCwgZXRjLikgdG8gc2VsZWN0aW9uXG4gKiBzZW1hbnRpY3MgKHNlbGVjdFByZXZpb3VzLCBzZWxlY3ROZXh0LCBldGMuKS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1kaXJlY3Rpb24tc2VsZWN0aW9uXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdGlvblNlbGVjdGlvbiB7XG5cbiAgZ29Eb3duKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdE5leHQoKTtcbiAgfVxuXG4gIGdvRW5kKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdExhc3QoKTtcbiAgfVxuXG4gIGdvTGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQcmV2aW91cygpO1xuICB9XG5cbiAgZ29SaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3ROZXh0KCk7XG4gIH1cblxuICBnb1N0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdEZpcnN0KCk7XG4gIH1cblxuICBnb1VwKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdFByZXZpb3VzKCk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9ucy4gVGhlc2Ugd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIHNlbGVjdEZpcnN0KCkge31cbiAgc2VsZWN0TGFzdCgpIHt9XG4gIHNlbGVjdE5leHQoKSB7fVxuICBzZWxlY3RQcmV2aW91cygpIHt9XG5cbn1cbkNvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChEaXJlY3Rpb25TZWxlY3Rpb24ucHJvdG90eXBlLCB7XG4gIHNlbGVjdEZpcnN0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgc2VsZWN0TGFzdDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIHNlbGVjdE5leHQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBzZWxlY3RQcmV2aW91czogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdClcbn0pO1xuIiwiLypcbiAqIEEgdmVyeSBzaW1wbGUgc2V0IG9mIGhlbHBlcnMgdG8gc3VwcG9ydCB0aGUgdXNlIG9mIGdlbmVyaWMgc3R5bGluZyBpbiBhXG4gKiBjb21wb25lbnQuXG4gKlxuICogQnkgZGVmYXVsdCwgYSBjb21wb25lbnQgc2hvdWxkIHByb3ZpZGUgYSBtaW5pbWFsIHZpc3VhbCBwcmVzZW50YXRpb24gdGhhdFxuICogYWxsb3dzIHRoZSBjb21wb25lbnQgdG8gZnVuY3Rpb24uIEhvd2V2ZXIsIHRoZSBtb3JlIHN0eWxpbmcgdGhlIGNvbXBvbmVudFxuICogcHJvdmlkZXMgYnkgZGVmYXVsdCwgdGhlIGhhcmRlciBpdCBiZWNvbWVzIHRvIGdldCB0aGUgY29tcG9uZW50IHRvIGZpdCBpblxuICogaW4gb3RoZXIgc2V0dGluZ3MuIEVhY2ggQ1NTIHJ1bGUgaGFzIHRvIGJlIG92ZXJyaWRkZW4uIFdvcnNlLCBuZXcgQ1NTIHJ1bGVzXG4gKiBhZGRlZCB0byB0aGUgZGVmYXVsdCBzdHlsZSB3b24ndCBiZSBvdmVycmlkZGVuIGJ5IGRlZmF1bHQsIG1ha2luZyBpdCBoYXJkIHRvXG4gKiBrbm93IHdoZXRoZXIgYSBuZXcgdmVyc2lvbiBvZiBhIGNvbXBvbmVudCB3aWxsIHN0aWxsIGxvb2sgb2theS5cbiAqXG4gKiBBcyBhIGNvbXByb21pc2UsIHRoZSBzaW1wbGUgUG9seW1lciBiZWhhdmlvciBoZXJlIGRlZmluZXMgYSBcImdlbmVyaWNcIlxuICogYXR0cmlidXRlLiBUaGlzIGF0dHJpYnV0ZSBpcyBub3JtYWxseSBzZXQgYnkgZGVmYXVsdCwgYW5kIHN0eWxlcyBjYW4gYmVcbiAqIHdyaXR0ZW4gdGhhdCBhcHBseSBvbmx5IHdoZW4gdGhlIGdlbmVyaWMgYXR0cmlidXRlIGlzIHNldC4gVGhpcyBhbGxvd3MgdGhlXG4gKiBjb25zdHJ1Y3Rpb24gb2YgQ1NTIHJ1bGVzIHRoYXQgd2lsbCBvbmx5IGFwcGx5IHRvIGdlbmVyaWMgY29tcG9uZW50cyBsaWtlXG4gKlxuICogICAgIDpob3N0KFtnZW5lcmljPVwiXCJdKSB7XG4gKiAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogVGhpcyBtYWtlcyBpdCBlYXN5IHRvIHJlbW92ZSBhbGwgZGVmYXVsdCBzdHlsaW5nIC0tIHNldCB0aGUgZ2VuZXJpYyBhdHRyaWJ1dGVcbiAqIHRvIGZhbHNlLCBhbmQgYWxsIGRlZmF1bHQgc3R5bGluZyB3aWxsIGJlIHJlbW92ZWQuXG4gKlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyaWMge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmdlbmVyaWMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZ2VuZXJpYycpIHx8IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgY29tcG9uZW50IHdvdWxkIGxpa2UgdG8gcmVjZWl2ZSBnZW5lcmljIHN0eWxpbmcuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgdHJ1ZSBieSBkZWZhdWx0IOKAlMKgc2V0IGl0IHRvIGZhbHNlIHRvIHR1cm4gb2ZmIGFsbFxuICAgKiBnZW5lcmljIHN0eWxlcy4gVGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gYXBwbHkgY3VzdG9tIHN0eWxpbmc7IHlvdSB3b24ndFxuICAgKiBoYXZlIHRvIGV4cGxpY2l0bHkgb3ZlcnJpZGUgc3R5bGluZyB5b3UgZG9uJ3Qgd2FudC5cbiAgICpcbiAgICogQHByb3BlcnR5IGdlbmVyaWNcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBnZXQgZ2VuZXJpYygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2VuZXJpYztcbiAgfVxuXG4gIC8vIFdlIHJvbGwgb3VyIG93biBhdHRyaWJ1dGUgc2V0dGluZyBzbyB0aGF0IGFuIGV4cGxpY2l0bHkgZmFsc2UgdmFsdWUgc2hvd3NcbiAgLy8gdXAgYXMgZ2VuZXJpYz1cImZhbHNlXCIuXG4gIHNldCBnZW5lcmljKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlICE9PSAnZmFsc2UnKTtcbiAgICB9XG4gICAgdGhpcy5fZ2VuZXJpYyA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIEV4cGxpY2l0bHkgdXNlIGZhbHNlIHN0cmluZy5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdnZW5lcmljJywgJ2ZhbHNlJyk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAvLyBFeHBsaWNpdGx5IHJlbW92ZSBhdHRyaWJ1dGUuXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZ2VuZXJpYycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtcHR5IHN0cmluZyB0byBnZXQgYXR0cmlidXRlIHRvIGFwcGVhciB3aXRoIG5vIHZhbHVlLlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2dlbmVyaWMnLCAnJyk7XG4gICAgfVxuICB9XG5cbn07XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYW5hZ2VzIHNlbGVjdGlvbiBzZW1hbnRpY3MgZm9yIGl0ZW1zIGluIGEgbGlzdC5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1pdGVtLXNlbGVjdGlvblxuICovXG5cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBzZWxlY3RlZEl0ZW0gcHJvcGVydHkgY2hhbmdlcy5cbiAqXG4gKiBAZXZlbnQgc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkXG4gKiBAcGFyYW0gZGV0YWlsLnNlbGVjdGVkSXRlbSBUaGUgbmV3IHNlbGVjdGVkIGl0ZW0uXG4gKiBAcGFyYW0gZGV0YWlsLnByZXZpb3VzSXRlbSBUaGUgcHJldmlvdXNseSBzZWxlY3RlZCBpdGVtLlxuICovXG5cbi8qKlxuICogRmlyZXMgd2hlbiB0aGUgc2VsZWN0ZWRJbmRleCBwcm9wZXJ0eSBjaGFuZ2VzLlxuICpcbiAqIEBldmVudCBzZWxlY3RlZC1pdGVtLWNoYW5nZWRcbiAqIEBwYXJhbSBkZXRhaWwuc2VsZWN0ZWRJbmRleCBUaGUgbmV3IHNlbGVjdGVkIGluZGV4LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1TZWxlY3Rpb24ge1xuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24uIFRoaXMgd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7fVxuXG4gIGdldCBjYW5TZWxlY3ROZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl9jYW5TZWxlY3ROZXh0O1xuICB9XG4gIHNldCBjYW5TZWxlY3ROZXh0KGNhblNlbGVjdE5leHQpIHtcbiAgICB0aGlzLl9jYW5TZWxlY3ROZXh0ID0gY2FuU2VsZWN0TmV4dDtcbiAgfVxuXG4gIGdldCBjYW5TZWxlY3RQcmV2aW91cygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuU2VsZWN0UHJldmlvdXM7XG4gIH1cbiAgc2V0IGNhblNlbGVjdFByZXZpb3VzKGNhblNlbGVjdFByZXZpb3VzKSB7XG4gICAgdGhpcy5fY2FuU2VsZWN0UHJldmlvdXMgPSBjYW5TZWxlY3RQcmV2aW91cztcbiAgfVxuXG4gIGl0ZW1BZGRlZChpdGVtKSB7XG4gICAgdGhpcy5hcHBseVNlbGVjdGlvbihpdGVtLCBpdGVtID09PSB0aGlzLnNlbGVjdGVkSXRlbSk7XG4gIH1cblxuICBpdGVtc0NoYW5nZWQoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAvLyBTZWxlY3RlZCBpdGVtIGlzIG5vIGxvbmdlciBpbiB0aGUgY3VycmVudCBzZXQgb2YgaXRlbXMuXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG51bGw7XG4gICAgICBpZiAodGhpcy5zZWxlY3Rpb25SZXF1aXJlZCkge1xuICAgICAgICAvLyBFbnN1cmUgc2VsZWN0aW9uLCBidXQgZG8gdGhpcyBpbiB0aGUgbmV4dCB0aWNrIHRvIGdpdmUgb3RoZXJcbiAgICAgICAgLy8gYXNwZWN0cyBhIGNoYW5jZSB0byBkbyB0aGVpciBvd24gaXRlbXNDaGFuZ2VkIHdvcmsuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZW5zdXJlU2VsZWN0aW9uKHRoaXMpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIGl0ZW0gd2hpY2ggaXMgY3VycmVudGx5IHNlbGVjdGVkLCBvciAtMSBpZiB0aGVyZSBpcyBub1xuICAgKiBzZWxlY3Rpb24uXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3RlZEluZGV4XG4gICAqIEB0eXBlIE51bWJlclxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2VsZWN0ZWRJdGVtO1xuXG4gICAgaWYgKHNlbGVjdGVkSXRlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTWVtb2l6ZVxuICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXhPZkl0ZW0oc2VsZWN0ZWRJdGVtKTtcblxuICAgIC8vIElmIGluZGV4ID0gLTEsIHNlbGVjdGlvbiB3YXNuJ3QgZm91bmQuIE1vc3QgbGlrZWx5IGNhdXNlIGlzIHRoYXQgdGhlXG4gICAgLy8gRE9NIHdhcyBtYW5pcHVsYXRlZCBmcm9tIHVuZGVybmVhdGggdXMuXG4gICAgLy8gVE9ETzogT25jZSB3ZSB0cmFjayBjb250ZW50IGNoYW5nZXMsIHR1cm4gdGhpcyBpbnRvIGFuIGV4Y2VwdGlvbi5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgbGV0IGl0ZW07XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGl0ZW0gPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG5cbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAob3V0ZXJtb3N0KSB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3NlbGVjdGVkLWluZGV4LWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IGluZGV4LFxuICAgICAgICAgIHZhbHVlOiBpbmRleCAvLyBmb3IgUG9seW1lciBiaW5kaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZWxlY3RlZEl0ZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0sIG9yIG51bGwgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0ZWRJdGVtXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgLy8gVE9ETzogQ29uZmlybSBpdGVtIGlzIGluIGl0ZW1zIGJlZm9yZSBzZWxlY3RpbmcuXG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIGxldCBwcmV2aW91c0l0ZW0gPSB0aGlzLl9zZWxlY3RlZEl0ZW07XG4gICAgaWYgKHByZXZpb3VzSXRlbSkge1xuICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIHNlbGVjdGlvbi5cbiAgICAgIHRoaXMuYXBwbHlTZWxlY3Rpb24ocHJldmlvdXNJdGVtLCBmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHRoaXMuYXBwbHlTZWxlY3Rpb24oaXRlbSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmF0aW9uYWxpemUgd2l0aCBzZWxlY3RlZEluZGV4IHNvIHdlJ3JlIG5vdCByZWNhbGN1bGF0aW5nIGl0ZW1cbiAgICAvLyBvciBpbmRleCBpbiBlYWNoIHNldHRlci5cbiAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4T2ZJdGVtKGl0ZW0pO1xuICAgIHVwZGF0ZVBvc3NpYmxlTmF2aWdhdGlvbnModGhpcywgaW5kZXgpO1xuXG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZC1pdGVtLWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdGVkSXRlbTogaXRlbSxcbiAgICAgICAgICBwcmV2aW91c0l0ZW06IHByZXZpb3VzSXRlbSxcbiAgICAgICAgICB2YWx1ZTogaXRlbSAvLyBmb3IgUG9seW1lciBiaW5kaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0Rmlyc3RcbiAgICovXG4gIHNlbGVjdEZpcnN0KCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBsaXN0IHNob3VsZCBhbHdheXMgaGF2ZSBhIHNlbGVjdGlvbiAoaWYgaXQgaGFzIGl0ZW1zKS5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGlvblJlcXVpcmVkXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICovXG4gIGdldCBzZWxlY3Rpb25SZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uUmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGlvblJlcXVpcmVkKHNlbGVjdGlvblJlcXVpcmVkKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uUmVxdWlyZWQgPSBzZWxlY3Rpb25SZXF1aXJlZDtcbiAgICBlbnN1cmVTZWxlY3Rpb24odGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0TGFzdFxuICAgKi9cbiAgc2VsZWN0TGFzdCgpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgdGhpcy5pdGVtcy5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIG5leHQgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3ROZXh0XG4gICAqL1xuICBzZWxlY3ROZXh0KCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCB0aGlzLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIHByZXZpb3VzIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0UHJldmlvdXNcbiAgICovXG4gIHNlbGVjdFByZXZpb3VzKCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCB0aGlzLnNlbGVjdGVkSW5kZXggLSAxKTtcbiAgfVxuXG59XG5cblxuLy8gSWYgbm8gaXRlbSBpcyBzZWxlY3RlZCwgc2VsZWN0IGEgZGVmYXVsdCBpdGVtLlxuLy8gVE9ETzogSWYgdGhlIHByZXZpb3VzbHktc2VsZWN0ZWQgaXRlbSBoYXMgYmVlbiBkZWxldGVkLCB0cnkgdG8gc2VsZWN0IGFuXG4vLyBpdGVtIGFkamFjZW50IHRvIHRoZSBwb3NpdGlvbiBpdCBoZWxkLlxuZnVuY3Rpb24gZW5zdXJlU2VsZWN0aW9uKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50LnNlbGVjdGVkSXRlbSAmJiBlbGVtZW50Lml0ZW1zICYmIGVsZW1lbnQuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IDA7XG4gIH1cbn1cblxuLy8gRW5zdXJlIHRoZSBnaXZlbiBpbmRleCBpcyB3aXRoaW4gYm91bmRzLCBhbmQgc2VsZWN0IGl0IGlmIGl0J3Mgbm90IGFscmVhZHlcbi8vIHNlbGVjdGVkLlxuZnVuY3Rpb24gc2VsZWN0SW5kZXgoZWxlbWVudCwgaW5kZXgpIHtcbiAgbGV0IGJvdW5kZWRJbmRleCA9IE1hdGgubWF4KE1hdGgubWluKGluZGV4LCBlbGVtZW50Lml0ZW1zLmxlbmd0aCAtIDEpLCAwKTtcbiAgbGV0IHByZXZpb3VzSW5kZXggPSBlbGVtZW50LnNlbGVjdGVkSW5kZXg7XG4gIGlmIChwcmV2aW91c0luZGV4ICE9PSBib3VuZGVkSW5kZXgpIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBib3VuZGVkSW5kZXg7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEZvbGxvd2luZyBhIGNoYW5nZSBpbiBzZWxlY3Rpb24sIHJlcG9ydCB3aGV0aGVyIGl0J3Mgbm93IHBvc3NpYmxlIHRvXG4vLyBnbyBuZXh0L3ByZXZpb3VzIGZyb20gdGhlIGdpdmVuIGluZGV4LlxuZnVuY3Rpb24gdXBkYXRlUG9zc2libGVOYXZpZ2F0aW9ucyhlbGVtZW50LCBpbmRleCkge1xuICBsZXQgY2FuU2VsZWN0TmV4dDtcbiAgbGV0IGNhblNlbGVjdFByZXZpb3VzO1xuICBsZXQgaXRlbXMgPSBlbGVtZW50Lml0ZW1zO1xuICBpZiAoaXRlbXMgPT0gbnVsbCB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICBjYW5TZWxlY3ROZXh0ID0gZmFsc2U7XG4gICAgY2FuU2VsZWN0UHJldmlvdXMgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2UuIElmIHRoZXJlJ3Mgbm8gc2VsZWN0aW9uLCB3ZSBkZWNsYXJlIHRoYXQgaXQncyBhbHdheXNcbiAgICAvLyBwb3NzaWJsZSB0byBnbyBuZXh0L3ByZXZpb3VzIHRvIGNyZWF0ZSBhIHNlbGVjdGlvbi5cbiAgICBjYW5TZWxlY3ROZXh0ID0gdHJ1ZTtcbiAgICBjYW5TZWxlY3RQcmV2aW91cyA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgLy8gTm9ybWFsIGNhc2U6IHdlIGhhdmUgYW4gaW5kZXggaW4gYSBsaXN0IHRoYXQgaGFzIGl0ZW1zLlxuICAgIGNhblNlbGVjdFByZXZpb3VzID0gKGluZGV4ID4gMCk7XG4gICAgY2FuU2VsZWN0TmV4dCA9IChpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEpO1xuICB9XG4gIGVsZW1lbnQuY2FuU2VsZWN0TmV4dCA9IGNhblNlbGVjdE5leHQ7XG4gIGVsZW1lbnQuY2FuU2VsZWN0UHJldmlvdXMgPSBjYW5TZWxlY3RQcmV2aW91cztcbn1cblxuXG4vLyBwcm9wZXJ0aWVzOiB7XG4vL1xuLy8gICBzZWxlY3RlZEluZGV4OiB7XG4vLyAgICAgdHlwZTogTnVtYmVyXG4vLyAgIH1cbi8vXG4vLyAgIHNlbGVjdGVkSXRlbToge1xuLy8gICAgIHR5cGU6IE9iamVjdFxuLy8gICB9XG4vL1xuLy8gICBzZWxlY3Rpb25SZXF1aXJlZDoge1xuLy8gICAgIHR5cGU6IEJvb2xlYW4sXG4vLyAgICAgb2JzZXJ2ZXI6ICdzZWxlY3Rpb25SZXF1aXJlZENoYW5nZWQnLFxuLy8gICAgIHZhbHVlOiBmYWxzZVxuLy8gICB9XG4vL1xuLy8gfVxuLy9cbi8vIGdldCBzZWxlY3RlZEluZGV4KCkge1xuLy8gICAvLyBIQUNLOiBQcm94aWVkIGdldHRlci9zZXR0ZXIgcHJvcGVydGllcyBsaWtlIHRoaXMgb25lIGNhbid0IGJlIHNldCB2aWFcbi8vICAgLy8gYXR0cmlidXRlcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Qb2x5bWVyL3BvbHltZXIvaXNzdWVzLzI0NTQuIFdlXG4vLyAgIC8vIGN1cnJlbnRseSBoYWNrIGFyb3VuZCB0aGlzIGJ5IG9ubHkgcmV0dXJuaW5nIGEgdmFsdWUgZm9yIHRoaXMgcHJvcGVydHkgaWZcbi8vICAgLy8gdGhlIGVsZW1lbnQgaXMgcmVhZHkuIEEgbmVnYXRpdmUgc2lkZSBlZmZlY3QgaXMgdGhhdCBpbnNwZWN0aW5nIHRoaXNcbi8vICAgLy8gcHJvcGVydHkgYmVmb3JlIHRoZSBlbGVtZW50IGlzIHJlYWR5IHdpbGwgYWx3YXlzIHJldHVybiB1bmRlZmluZWQuXG4vLyAgIGlmICh0aGlzLl9yZWFkaWVkKSB7XG4vLyAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleDtcbi8vICAgfVxuLy8gfVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggYWRkcyBBUklBIHJvbGVzIGZvciBsaXN0cyBhbmQgbGlzdCBpdGVtcy5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1hY2Nlc3NpYmxlLWxpc3RcbiAqL1xuXG4vLyBVc2VkIHRvIGFzc2lnbiB1bmlxdWUgSURzIHRvIGl0ZW0gZWxlbWVudHMgd2l0aG91dCBJRHMuXG5sZXQgaWRDb3VudCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1zQWNjZXNzaWJsZSB7XG5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHtcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkKTtcbiAgICB2YXIgaXRlbUlkID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaWYgKGl0ZW1JZCkge1xuICAgICAgdGhpcy5vdXRlcm1vc3RBdHRhY2hlZC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGl0ZW1JZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gLy8gRW5zdXJlIHRoZSBvdXRlcm1vc3QgYXNwZWN0IGhhcyByb2xlPVwibGlzdGJveFwiLlxuICAvLyBjb2xsZWN0aXZlQ2hhbmdlZCgpIHtcbiAgLy9cbiAgLy8gICB2YXIgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgLy8gICBpZiAodGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QgPT09IG91dGVybW9zdCkge1xuICAvLyAgICAgLy8gQWxyZWFkeSBjb25maWd1cmVkLlxuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBpZiAodGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QpIHtcbiAgLy8gICAgIC8vIFJlbW92ZSBBUklBIGF0dHJpYnV0ZXMgZnJvbSBwcmV2aW91cyBvdXRlcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QucmVtb3ZlQXR0cmlidXRlKCdyb2xlJyk7XG4gIC8vICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBvdXRlcm1vc3Quc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcbiAgLy9cbiAgLy8gICAvLyBEZXRlcm1pbmUgYSBiYXNlIGl0ZW0gSUQgYmFzZWQgb24gdGhpcyBjb21wb25lbnQncyBob3N0J3Mgb3duIElELiBUaGlzXG4gIC8vICAgLy8gd2lsbCBiZSBjb21iaW5lZCB3aXRoIGEgdW5pcXVlIGludGVnZXIgdG8gYXNzaWduIElEcyB0byBpdGVtcyB0aGF0IGRvbid0XG4gIC8vICAgLy8gaGF2ZSBhbiBleHBsaWNpdCBJRC4gSWYgdGhlIGJhc2ljLWxpc3QtYm94IGhhcyBJRCBcImZvb1wiLCB0aGVuIGl0cyBpdGVtc1xuICAvLyAgIC8vIHdpbGwgaGF2ZSBJRHMgdGhhdCBsb29rIGxpa2UgXCJfZm9vT3B0aW9uMVwiLiBJZiB0aGUgbGlzdCBoYXMgbm8gSUQgaXRzZWxmLFxuICAvLyAgIC8vIGl0cyBpdGVtcyB3aWxsIGdldCBJRHMgdGhhdCBsb29rIGxpa2UgXCJfb3B0aW9uMVwiLiBJdGVtIElEcyBhcmUgcHJlZml4ZWRcbiAgLy8gICAvLyB3aXRoIGFuIHVuZGVyc2NvcmUgdG8gZGlmZmVyZW50aWF0ZSB0aGVtIGZyb20gbWFudWFsbHktYXNzaWduZWQgSURzLCBhbmRcbiAgLy8gICAvLyB0byBtaW5pbWl6ZSB0aGUgcG90ZW50aWFsIGZvciBJRCBjb25mbGljdHMuXG4gIC8vXG4gIC8vICAgLy8gVE9ETzogVGhpcyBjaGVjayBub3cgY29tZXMgdG9vIGxhdGUgZm9yIGNvbXBvbmVudHMgbGlrZSBiYXNpYy1saXN0LWJveC5cbiAgLy8gICAvLyBXZSBtYXkgbmVlZCB0byBkeW5hbWljYWxseSB1cGRhdGUgdGhlIGl0ZW0gSURzIHdoZW5ldmVyIHRoZSBjb2xsZWN0aW9uXG4gIC8vICAgLy8gY2hhbmdlcywgYWx0aG91Z2ggdGhhdCByZXF1aXJlcyBrZWVwaW5nIHRyYWNrIG9mIHdoZXRoZXIgd2UndmUgY2hhbmdlZFxuICAvLyAgIC8vIGFuIGl0ZW0ncyBJRCBvciB3aGV0aGVyIGl0J3MgYWx3YXlzIGhhZCB0aGF0IElELlxuICAvLyAgIHZhciBlbGVtZW50SWQgPSBvdXRlcm1vc3QuZ2V0QXR0cmlidXRlKCBcImlkXCIgKTtcbiAgLy8gICB0aGlzLml0ZW1CYXNlSWQgPSBlbGVtZW50SWQgP1xuICAvLyAgICAgICBcIl9cIiArIGVsZW1lbnRJZCArIFwiT3B0aW9uXCIgOlxuICAvLyAgICAgICBcIl9vcHRpb25cIjtcbiAgLy9cbiAgLy8gICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCA9IG91dGVybW9zdDtcbiAgLy8gfVxuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBvdXRlcm1vc3Quc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcblxuICAgIC8vIERldGVybWluZSBhIGJhc2UgaXRlbSBJRCBiYXNlZCBvbiB0aGlzIGNvbXBvbmVudCdzIGhvc3QncyBvd24gSUQuIFRoaXNcbiAgICAvLyB3aWxsIGJlIGNvbWJpbmVkIHdpdGggYSB1bmlxdWUgaW50ZWdlciB0byBhc3NpZ24gSURzIHRvIGl0ZW1zIHRoYXQgZG9uJ3RcbiAgICAvLyBoYXZlIGFuIGV4cGxpY2l0IElELiBJZiB0aGUgYmFzaWMtbGlzdC1ib3ggaGFzIElEIFwiZm9vXCIsIHRoZW4gaXRzIGl0ZW1zXG4gICAgLy8gd2lsbCBoYXZlIElEcyB0aGF0IGxvb2sgbGlrZSBcIl9mb29PcHRpb24xXCIuIElmIHRoZSBsaXN0IGhhcyBubyBJRCBpdHNlbGYsXG4gICAgLy8gaXRzIGl0ZW1zIHdpbGwgZ2V0IElEcyB0aGF0IGxvb2sgbGlrZSBcIl9vcHRpb24xXCIuIEl0ZW0gSURzIGFyZSBwcmVmaXhlZFxuICAgIC8vIHdpdGggYW4gdW5kZXJzY29yZSB0byBkaWZmZXJlbnRpYXRlIHRoZW0gZnJvbSBtYW51YWxseS1hc3NpZ25lZCBJRHMsIGFuZFxuICAgIC8vIHRvIG1pbmltaXplIHRoZSBwb3RlbnRpYWwgZm9yIElEIGNvbmZsaWN0cy5cblxuICAgIC8vIFRPRE86IFRoaXMgY2hlY2sgbm93IGNvbWVzIHRvbyBsYXRlIGZvciBjb21wb25lbnRzIGxpa2UgYmFzaWMtbGlzdC1ib3guXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gZHluYW1pY2FsbHkgdXBkYXRlIHRoZSBpdGVtIElEcyB3aGVuZXZlciB0aGUgY29sbGVjdGlvblxuICAgIC8vIGNoYW5nZXMsIGFsdGhvdWdoIHRoYXQgcmVxdWlyZXMga2VlcGluZyB0cmFjayBvZiB3aGV0aGVyIHdlJ3ZlIGNoYW5nZWRcbiAgICAvLyBhbiBpdGVtJ3MgSUQgb3Igd2hldGhlciBpdCdzIGFsd2F5cyBoYWQgdGhhdCBJRC5cbiAgICB2YXIgZWxlbWVudElkID0gb3V0ZXJtb3N0LmdldEF0dHJpYnV0ZSggXCJpZFwiICk7XG4gICAgdGhpcy5pdGVtQmFzZUlkID0gZWxlbWVudElkID9cbiAgICAgICAgXCJfXCIgKyBlbGVtZW50SWQgKyBcIk9wdGlvblwiIDpcbiAgICAgICAgXCJfb3B0aW9uXCI7XG4gIH1cblxuICBpdGVtQWRkZWQoaXRlbSkge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdyb2xlJywgJ29wdGlvbicpO1xuXG4gICAgLy8gRW5zdXJlIGVhY2ggaXRlbSBoYXMgYW4gSUQgc28gd2UgY2FuIHNldCBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQgb24gdGhlXG4gICAgLy8gb3ZlcmFsbCBsaXN0IHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcy5cbiAgICBpZiAoIWl0ZW0uZ2V0QXR0cmlidXRlKCdpZCcpKSB7XG4gICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLml0ZW1CYXNlSWQgKyBpZENvdW50KyspO1xuICAgIH1cbiAgfVxuXG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIC8vIENhdGNoIHRoZSBjYXNlIHdoZXJlIHRoZSBzZWxlY3Rpb24gaXMgcmVtb3ZlZC5cbiAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm91dGVybW9zdEF0dGFjaGVkLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgfVxuICB9XG5cbn1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hbmFnZXMgdGhlIGtleWJvYXJkIGZvY3VzIGFuZCBrZXlkb3duIGhhbmRsaW5nIGZvciBhIGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIGFzcGVjdCBlbnN1cmVzIHRoYXQgaXRzIG9ubHkgdGhlIG91dGVybW9zdCBhc3BlY3QgaW4gYSBjb2xsZWN0aXZlIHRoYXQgaXNcbiAqIGxpc3RlbmluZyBmb3Iga2V5Ym9hcmQgZXZlbnRzLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWtleWJvYXJkXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmQge1xuXG4gIC8qXG4gICAqIFdoZW4gdGhlIGNvbGxlY3RpdmUgY2hhbmdlcywgc3RvcCBsaXN0ZW5pbmcgZm9yIGtleWJvYXJkIGV2ZW50cyBvblxuICAgKiB3aGljaGV2ZXIgYXNwZWN0IHdhcyBwcmV2aW91c2x5IHRoZSBvdXRlcm1vc3QgYXNwZWN0LCBhbmQgc3RhcnQgbGlzdGVuaW5nXG4gICAqIHRvIGtleWJvYXJkIGV2ZW50cyBvbiB3aGljaGV2ZXIgYXNwZWN0IGlzIG5vdyB0aGUgbmV3IG91dGVybW9zdCBhc3BlY3QuXG4gICAqL1xuICAvLyBUT0RPOiBEbyB3ZSBuZWVkIHRvIHN0YXJ0L3N0b3AgbGlzdGVuaW5nIHdoZW4gYXR0YWNoZWQvZGV0YWNoZWQsIG9yIGlzXG4gIC8vIHRoYXQgaGFuZGxlZCBhdXRvbWF0aWNhbGx5P1xuICAvLyBjb2xsZWN0aXZlQ2hhbmdlZDogZnVuY3Rpb24oKSB7XG4gIC8vXG4gIC8vICAgbGV0IG91dGVybW9zdCA9IHRoaXMuY29sbGVjdGl2ZS5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgLy8gICBpZiAob3V0ZXJtb3N0ID09PSB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCkge1xuICAvLyAgICAgLy8gU2hvdWxkIGFscmVhZHkgYmUgbGlzdGVuaW5nIHRvIGV2ZW50cyBvbiB0aGUgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgaWYgKHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0KSB7XG4gIC8vICAgICAvLyBDbGVhbiB1cCB0aGUgcHJldmlvdXMgYXNwZWN0IHRoYXQgd2FzIGhhbmRsaW5nIHRoZSBrZXlib2FyZC5cbiAgLy9cbiAgLy8gICAgIGlmICh0aGlzLl9wcmV2aW91c1RhYkluZGV4KSB7XG4gIC8vICAgICAgIC8vIFJlc3RvcmUgcHJldmlvdXMgdGFiIGluZGV4LlxuICAvLyAgICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5zZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JywgdGhpcy5fcHJldmlvdXNUYWJJbmRleCk7XG4gIC8vICAgICB9IGVsc2Uge1xuICAvLyAgICAgICAvLyBBc3BlY3QgZGlkbid0IGhhdmUgYSB0YWIgaW5kZXggYmVmb3JlLCBzbyByZW1vdmUgaXQuXG4gIC8vICAgICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnJlbW92ZUF0dHJpYnV0ZSgndGFiSW5kZXgnKTtcbiAgLy8gICAgIH1cbiAgLy9cbiAgLy8gICAgIC8vIFN0b3AgbGlzdGVuaW5nIHRvIGV2ZW50cyB0aGUgcHJldmlvdXMgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duSGFuZGxlcik7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGlmIChvdXRlcm1vc3QuZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpKSB7XG4gIC8vICAgICAvLyBMZWF2ZSBleGlzdGluZyB0YWIgaW5kZXggaW4gcGxhY2UuXG4gIC8vICAgICB0aGlzLl9wcmV2aW91c1RhYkluZGV4ID0gbnVsbDtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgLy8gTWFrZSBuZXcgb3V0ZXJtb3N0IGFzcGVjdCBmb2N1c2FibGUuXG4gIC8vICAgICB0aGlzLl9wcmV2aW91c1RhYkluZGV4ID0gb3V0ZXJtb3N0LmdldEF0dHJpYnV0ZSgndGFiSW5kZXgnKTtcbiAgLy8gICAgIG91dGVybW9zdC5zZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JywgMCk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIC8vIFN0YXJ0IGxpc3RlbmluZyB0byBldmVudHMgb24gdGhlIG5ldyBvdXRlcm1vc3QgYXNwZWN0LlxuICAvLyAgIGlmICghdGhpcy5fa2V5ZG93bkhhbmRsZXIpIHtcbiAgLy8gICAgIHRoaXMuX2tleWRvd25IYW5kbGVyID0gdGhpcy5fa2V5ZG93bi5iaW5kKHRoaXMpO1xuICAvLyAgIH1cbiAgLy8gICBvdXRlcm1vc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25IYW5kbGVyKTtcbiAgLy9cbiAgLy8gICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCA9IG91dGVybW9zdDtcbiAgLy8gfVxuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICBsZXQgaGFuZGxlZCA9IHRoaXMua2V5ZG93bihldmVudCk7XG4gICAgICBpZiAoaGFuZGxlZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCAwKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQga2V5ZG93biBoYW5kbGVyLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBrZXlkb3duKGV2ZW50KSB7fVxuXG59IiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFwcyBkaXJlY3Rpb24ga2V5cyAoTGVmdCwgUmlnaHQsIGV0Yy4pIHRvIGRpcmVjdGlvbiBzZW1hbnRpY3NcbiAqIChnb0xlZnQsIGdvUmlnaHQsIGV0Yy4pLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWtleWJvYXJkLWRpcmVjdGlvblxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZERpcmVjdGlvbiB7XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMuIFRoZXNlIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBnb0Rvd24oKSB7fVxuICBnb0VuZCgpIHt9XG4gIGdvTGVmdCgpIHt9XG4gIGdvUmlnaHQoKSB7fVxuICBnb1N0YXJ0KCkge31cbiAgZ29VcCgpIHt9XG5cbiAga2V5ZG93bihldmVudCkge1xuICAgIGxldCBoYW5kbGVkO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSAzNTogLy8gRW5kXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNjogLy8gSG9tZVxuICAgICAgICBoYW5kbGVkID0gdGhpcy5nb1N0YXJ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNzogLy8gTGVmdFxuICAgICAgICBoYW5kbGVkID0gdGhpcy5nb0xlZnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OiAvLyBVcFxuICAgICAgICBoYW5kbGVkID0gZXZlbnQuYWx0S2V5ID8gdGhpcy5nb1N0YXJ0KCkgOiB0aGlzLmdvVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OiAvLyBSaWdodFxuICAgICAgICBoYW5kbGVkID0gdGhpcy5nb1JpZ2h0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDogLy8gRG93blxuICAgICAgICBoYW5kbGVkID0gZXZlbnQuYWx0S2V5ID8gdGhpcy5nb0VuZCgpIDogdGhpcy5nb0Rvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVkO1xuICB9XG5cbn1cbkNvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChLZXlib2FyZERpcmVjdGlvbi5wcm90b3R5cGUsIHtcbiAgZ29Eb3duOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29FbmQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb0xlZnQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb1JpZ2h0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29TdGFydDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvVXA6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBrZXlkb3duOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJNaXhpblJlc3VsdClcbn0pO1xuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFwcyBwYWdlIGtleXMgKFBhZ2UgVXAsIFBhZ2UgRG93bikgaW50byBvcGVyYXRpb25zIHRoYXQgc2Nyb2xsXG4gKiB0aGUgY29tcG9uZW50LlxuICpcbiAqIFRoZSBrZXlib2FyZCBpbnRlcmFjdGlvbiBtb2RlbCBnZW5lcmFsbHkgZm9sbG93cyB0aGF0IG9mIE1pY3Jvc29mdCBXaW5kb3dzJ1xuICogbGlzdCBib3hlcyBpbnN0ZWFkIG9mIHRob3NlIGluIE9TIFg6XG4gKlxuICogKiBUaGUgUGFnZSBVcC9Eb3duIGFuZCBIb21lL0VuZCBrZXlzIGFjdHVhbGx5IG1vdmUgdGhlIHNlbGVjdGlvbiwgcmF0aGVyIHRoYW5cbiAqICAganVzdCBzY3JvbGxpbmcuIFRoZSBmb3JtZXIgYmVoYXZpb3Igc2VlbXMgbW9yZSBnZW5lcmFsbHkgdXNlZnVsIGZvciBrZXlib2FyZFxuICogICB1c2Vycy5cbiAqXG4gKiAqIFByZXNzaW5nIFBhZ2UgVXAvRG93biB3aWxsIG1vdmUgdGhlIHNlbGVjdGlvbiB0byB0aGUgdG9wbW9zdC9ib3R0b21tb3N0XG4gKiAgIHZpc2libGUgaXRlbSBpZiB0aGUgc2VsZWN0aW9uIGlzIG5vdCBhbHJlYWR5IHRoZXJlLiBUaGVyZWFmdGVyLCB0aGUga2V5IHdpbGxcbiAqICAgbW92ZSB0aGUgc2VsZWN0aW9uIHVwL2Rvd24gYnkgYSBwYWdlLCBhbmQgKHBlciB0aGUgYWJvdmUgcG9pbnQpIG1ha2UgdGhlXG4gKiAgIHNlbGVjdGVkIGl0ZW0gdmlzaWJsZS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1rZXlib2FyZC1wYWdpbmdcbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmRQYWdpbmcge1xuXG4gIGtleWRvd24oZXZlbnQpIHtcbiAgICBsZXQgaGFuZGxlZDtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzM6IC8vIFBhZ2UgVXBcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMucGFnZVVwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNDogLy8gUGFnZSBEb3duXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLnBhZ2VEb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gaGFuZGxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgZG93biBvbmUgcGFnZS5cbiAgICpcbiAgICogQG1ldGhvZCBwYWdlRG93blxuICAgKi9cbiAgcGFnZURvd24oKSB7XG4gICAgcmV0dXJuIHNjcm9sbE9uZVBhZ2UodGhpcywgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHVwIG9uZSBwYWdlLlxuICAgKlxuICAgKiBAbWV0aG9kIHBhZ2VVcFxuICAgKi9cbiAgcGFnZVVwKCkge1xuICAgIHJldHVybiBzY3JvbGxPbmVQYWdlKHRoaXMsIGZhbHNlKTtcbiAgfVxuXG59XG5cblxuLy8gUmV0dXJuIHRoZSBpdGVtIHdob3NlIGNvbnRlbnQgc3BhbnMgdGhlIGdpdmVuIHkgcG9zaXRpb24gKHJlbGF0aXZlIHRvIHRoZVxuLy8gdG9wIG9mIHRoZSBsaXN0J3Mgc2Nyb2xsaW5nIGNsaWVudCBhcmVhKSwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4vL1xuLy8gSWYgZG93bndhcmQgaXMgdHJ1ZSwgbW92ZSBkb3duIHRoZSBsaXN0IG9mIGl0ZW1zIHRvIGZpbmQgdGhlIGZpcnN0IGl0ZW1cbi8vIGZvdW5kIGF0IHRoZSBnaXZlbiB5IHBvc2l0aW9uOyBpZiBkb3dud2FyZCBpcyBmYWxzZSwgbW92ZSB1cCB0aGUgbGlzdCBvZlxuLy8gaXRlbXMgdG8gZmluZCB0aGUgbGFzdCBpdGVtIGF0IHRoYXQgcG9zaXRpb24uXG5mdW5jdGlvbiBnZXRJbmRleE9mSXRlbUF0WShlbGVtZW50LCB5LCBkb3dud2FyZCkge1xuICB2YXIgaXRlbXMgPSBlbGVtZW50Lml0ZW1zO1xuICB2YXIgc3RhcnQgPSBkb3dud2FyZCA/IDAgOiBpdGVtcy5sZW5ndGggLSAxO1xuICB2YXIgZW5kID0gZG93bndhcmQgPyBpdGVtcy5sZW5ndGggOiAwO1xuICB2YXIgc3RlcCA9IGRvd253YXJkID8gMSA6IC0xO1xuICB2YXIgaW5uZXJtb3N0ID0gZWxlbWVudC5pbm5lcm1vc3RBdHRhY2hlZDtcbiAgdmFyIHRvcE9mQ2xpZW50QXJlYSA9IGlubmVybW9zdC5vZmZzZXRUb3AgKyBpbm5lcm1vc3QuY2xpZW50VG9wO1xuICB2YXIgaSA9IHN0YXJ0O1xuICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgd2hpbGUgKGkgIT09IGVuZCkge1xuICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgdmFyIGl0ZW1Ub3AgPSBpdGVtLm9mZnNldFRvcCAtIHRvcE9mQ2xpZW50QXJlYTtcbiAgICB2YXIgaXRlbUJvdHRvbSA9IGl0ZW1Ub3AgKyBpdGVtLm9mZnNldEhlaWdodDtcbiAgICBpZiAoaXRlbVRvcCA8PSB5ICYmIGl0ZW1Cb3R0b20gPj0geSkge1xuICAgICAgLy8gSXRlbSBzcGFucyB0aGUgaW5kaWNhdGVkIHkgY29vcmRpbmF0ZS5cbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpICs9IHN0ZXA7XG4gIH1cblxuICBpZiAoIWZvdW5kKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBtYXkgaGF2ZSBmb3VuZCBhbiBpdGVtIHdob3NlIHBhZGRpbmcgc3BhbnMgdGhlIGdpdmVuIHkgY29vcmRpbmF0ZSxcbiAgLy8gYnV0IHdob3NlIGNvbnRlbnQgaXMgYWN0dWFsbHkgYWJvdmUvYmVsb3cgdGhhdCBwb2ludC5cbiAgLy8gVE9ETzogSWYgdGhlIGl0ZW0gaGFzIGEgYm9yZGVyLCB0aGVuIHBhZGRpbmcgc2hvdWxkIGJlIGluY2x1ZGVkIGluXG4gIC8vIGNvbnNpZGVyaW5nIGEgaGl0LlxuICB2YXIgaXRlbVN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShpdGVtKTtcbiAgdmFyIGl0ZW1QYWRkaW5nVG9wID0gcGFyc2VGbG9hdChpdGVtU3R5bGUucGFkZGluZ1RvcCk7XG4gIHZhciBpdGVtUGFkZGluZ0JvdHRvbSA9IHBhcnNlRmxvYXQoaXRlbVN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICB2YXIgY29udGVudFRvcCA9IGl0ZW1Ub3AgKyBpdGVtLmNsaWVudFRvcCArIGl0ZW1QYWRkaW5nVG9wO1xuICB2YXIgY29udGVudEJvdHRvbSA9IGNvbnRlbnRUb3AgKyBpdGVtLmNsaWVudEhlaWdodCAtIGl0ZW1QYWRkaW5nVG9wIC0gaXRlbVBhZGRpbmdCb3R0b207XG4gIGlmIChkb3dud2FyZCAmJiBjb250ZW50VG9wIDw9IHlcbiAgICB8fCAhZG93bndhcmQgJiYgY29udGVudEJvdHRvbSA+PSB5KSB7XG4gICAgLy8gVGhlIGluZGljYXRlZCBjb29yZGluYXRlIGhpdHMgdGhlIGFjdHVhbCBpdGVtIGNvbnRlbnQuXG4gICAgcmV0dXJuIGk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gVGhlIGluZGljYXRlZCBjb29yZGluYXRlIGZhbGxzIHdpdGhpbiB0aGUgaXRlbSdzIHBhZGRpbmcuIEJhY2sgdXAgdG9cbiAgICAvLyB0aGUgaXRlbSBiZWxvdy9hYm92ZSB0aGUgaXRlbSB3ZSBmb3VuZCBhbmQgcmV0dXJuIHRoYXQuXG4gICAgaSAtPSBzdGVwO1xuICAgIHJldHVybiBpO1xuICB9XG59XG5cbi8vIE1vdmUgYnkgb25lIHBhZ2UgZG93bndhcmQgKGlmIGRvd253YXJkIGlzIHRydWUpLCBvciB1cHdhcmQgKGlmIGZhbHNlKS5cbi8vIFJldHVybiB0cnVlIGlmIHdlIGVuZGVkIHVwIGNoYW5naW5nIHRoZSBzZWxlY3Rpb24sIGZhbHNlIGlmIG5vdC5cbi8vIFRPRE86IEJldHRlciBzdXBwb3J0IGZvciBob3Jpem9udGFsIGxpc3RzLlxuZnVuY3Rpb24gc2Nyb2xsT25lUGFnZShlbGVtZW50LCBkb3dud2FyZCkge1xuXG4gIHZhciBpbm5lcm1vc3QgPSBlbGVtZW50LmlubmVybW9zdEF0dGFjaGVkO1xuICBpZiAoIWlubmVybW9zdCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERldGVybWluZSB0aGUgaXRlbSB2aXNpYmxlIGp1c3QgYXQgdGhlIGVkZ2Ugb2YgZGlyZWN0aW9uIHdlJ3JlIGhlYWRpbmcuXG4gIC8vIFdlJ2xsIHNlbGVjdCB0aGF0IGl0ZW0gaWYgaXQncyBub3QgYWxyZWFkeSBzZWxlY3RlZC5cbiAgdmFyIGVkZ2UgPSBpbm5lcm1vc3Quc2Nyb2xsVG9wICsgKGRvd253YXJkID8gaW5uZXJtb3N0LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgaW5kZXhPZkl0ZW1BdEVkZ2UgPSBnZXRJbmRleE9mSXRlbUF0WShlbGVtZW50LCBlZGdlLCBkb3dud2FyZCk7XG5cbiAgdmFyIHNlbGVjdGVkSW5kZXggPSBlbGVtZW50LnNlbGVjdGVkSW5kZXg7XG4gIHZhciBuZXdJbmRleDtcbiAgaWYgKGluZGV4T2ZJdGVtQXRFZGdlICYmIHNlbGVjdGVkSW5kZXggPT09IGluZGV4T2ZJdGVtQXRFZGdlKSB7XG4gICAgLy8gVGhlIGl0ZW0gYXQgdGhlIGVkZ2Ugd2FzIGFscmVhZHkgc2VsZWN0ZWQsIHNvIHNjcm9sbCBpbiB0aGUgaW5kaWNhdGVkXG4gICAgLy8gZGlyZWN0aW9uIGJ5IG9uZSBwYWdlLiBMZWF2ZSB0aGUgbmV3IGl0ZW0gYXQgdGhhdCBlZGdlIHNlbGVjdGVkLlxuICAgIHZhciBkZWx0YSA9IChkb3dud2FyZCA/IDEgOiAtMSkgKiBpbm5lcm1vc3QuY2xpZW50SGVpZ2h0O1xuICAgIG5ld0luZGV4ID0gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgZWRnZSArIGRlbHRhLCBkb3dud2FyZCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gVGhlIGl0ZW0gYXQgdGhlIGVkZ2Ugd2Fzbid0IHNlbGVjdGVkIHlldC4gSW5zdGVhZCBvZiBzY3JvbGxpbmcsIHdlJ2xsXG4gICAgLy8ganVzdCBzZWxlY3QgdGhhdCBpdGVtLiBUaGF0IGlzLCB0aGUgZmlyc3QgYXR0ZW1wdCB0byBwYWdlIHVwL2Rvd25cbiAgICAvLyB1c3VhbGx5IGp1c3QgbW92ZXMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZWRnZSBpbiB0aGF0IGRpcmVjdGlvbi5cbiAgICBuZXdJbmRleCA9IGluZGV4T2ZJdGVtQXRFZGdlO1xuICB9XG5cbiAgaWYgKCFuZXdJbmRleCkge1xuICAgIC8vIFdlIGNhbid0IGZpbmQgYW4gaXRlbSBpbiB0aGUgZGlyZWN0aW9uIHdlIHdhbnQgdG8gdHJhdmVsLiBTZWxlY3QgdGhlXG4gICAgLy8gbGFzdCBpdGVtIChpZiBtb3ZpbmcgZG93bndhcmQpIG9yIGZpcnN0IGl0ZW0gKGlmIG1vdmluZyB1cHdhcmQpLlxuICAgIG5ld0luZGV4ID0gKGRvd253YXJkID8gZWxlbWVudC5pdGVtcy5sZW5ndGggLSAxIDogMCk7XG4gIH1cblxuICBpZiAobmV3SW5kZXggIT09IHNlbGVjdGVkSW5kZXgpIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBuZXdJbmRleDtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gV2UgaGFuZGxlZCB0aGUgcGFnZSB1cC9kb3duIG91cnNlbHZlcy5cbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7IC8vIFdlIGRpZG4ndCBkbyBhbnl0aGluZy5cbiAgfVxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEtleWJvYXJkUGFnaW5nLnByb3RvdHlwZSwge1xuICBrZXlkb3duOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJNaXhpblJlc3VsdClcbn0pO1xuIiwiLyoqXG4gKiBIYW5kbGUgbGlzdCBib3gtc3R5bGUgcHJlZml4IHR5cGluZywgaW4gd2hpY2ggdGhlIHVzZXIgY2FuIHR5cGUgYSBzdHJpbmcgdG9cbiAqIHNlbGVjdCB0aGUgZmlyc3QgaXRlbSB0aGF0IGJlZ2lucyB3aXRoIHRoYXQgc3RyaW5nLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWtleWJvYXJkLXByZWZpeC1zZWxlY3Rpb25cbiAqXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbi8vIFRPRE86IElmIHRoZSBzZWxlY3Rpb24gaXMgY2hhbmdlZCBieSBzb21lIG90aGVyIG1lYW5zIChlLmcuLCBhcnJvdyBrZXlzKSBvdGhlclxuLy8gdGhhbiBwcmVmaXggdHlwaW5nLCB0aGVuIHRoYXQgYWN0IHNob3VsZCByZXNldCB0aGUgcHJlZml4LlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZFByZWZpeFNlbGVjdGlvbiB7XG5cbiAgLy8gaXRlbXNDaGFuZ2VkKCkge1xuICAvLyAgIHRoaXMuX2l0ZW1UZXh0Q29udGVudHMgPSBudWxsO1xuICAvLyAgIHJlc2V0VHlwZWRQcmVmaXgodGhpcyk7XG4gIC8vIH1cblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgbGV0IHJlc2V0UHJlZml4ID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSA4OiAvLyBCYWNrc3BhY2VcbiAgICAgICAgaGFuZGxlQmFja3NwYWNlKHRoaXMpO1xuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzZXRQcmVmaXggPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI3OiAvLyBFc2NhcGVcbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKCFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5ICYmICFldmVudC5hbHRLZXlcbiAgICAgICAgICAmJiBldmVudC53aGljaCAhPT0gMzIgLyogU3BhY2UgKi8pIHtcbiAgICAgICAgICBoYW5kbGVQbGFpbkNoYXJhY3Rlcih0aGlzLCBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LndoaWNoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzZXRQcmVmaXggPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAocmVzZXRQcmVmaXgpIHtcbiAgICAgIHJlc2V0VHlwZWRQcmVmaXgodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBmaXJzdCBpdGVtIHdob3NlIHRleHQgY29udGVudCBiZWdpbnMgd2l0aCB0aGUgZ2l2ZW4gcHJlZml4LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeFxuICAgKiBAcGFyYW0gcHJlZml4IFtTdHJpbmddIFRoZSBzdHJpbmcgdG8gc2VhcmNoIGZvclxuICAgKi9cbiAgc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KHByZWZpeCkge1xuICAgIGlmIChwcmVmaXggPT0gbnVsbCB8fCBwcmVmaXgubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBpbmRleCA9IGdldEluZGV4T2ZJdGVtV2l0aFRleHRQcmVmaXgodGhpcywgcHJlZml4KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbn1cbkNvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChLZXlib2FyZFByZWZpeFNlbGVjdGlvbi5wcm90b3R5cGUsIHtcbiAga2V5ZG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyTWl4aW5SZXN1bHQpXG59KTtcblxuXG4vLyBUaW1lIGluIG1pbGxpc2Vjb25kcyBhZnRlciB3aGljaCB0aGUgdXNlciBpcyBjb25zaWRlcmVkIHRvIGhhdmUgc3RvcHBlZFxuLy8gdHlwaW5nLlxuY29uc3QgUFJFRklYX1RJTUVPVVRfRFVSQVRJT04gPSAxMDAwO1xuXG5cbi8vIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gcHJlZml4LCBlbHNlIC0xLlxuZnVuY3Rpb24gZ2V0SW5kZXhPZkl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50LCBwcmVmaXgpIHtcbiAgbGV0IGl0ZW1UZXh0Q29udGVudHMgPSBnZXRJdGVtVGV4dENvbnRlbnRzKGVsZW1lbnQpO1xuICBsZXQgcHJlZml4TGVuZ3RoID0gcHJlZml4Lmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtVGV4dENvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGl0ZW1UZXh0Q29udGVudCA9IGl0ZW1UZXh0Q29udGVudHNbaV07XG4gICAgaWYgKGl0ZW1UZXh0Q29udGVudC5zdWJzdHIoMCwgcHJlZml4TGVuZ3RoKSA9PT0gcHJlZml4KSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vLyBSZXR1cm4gYW4gYXJyYXkgb2YgdGhlIHRleHQgY29udGVudCAoaW4gbG93ZXJjYXNlKSBvZiBhbGwgaXRlbXMuXG4vLyBDYWNoZSB0aGVzZSByZXN1bHRzLlxuZnVuY3Rpb24gZ2V0SXRlbVRleHRDb250ZW50cyhlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudC5faXRlbVRleHRDb250ZW50cykge1xuICAgIGxldCBpdGVtcyA9IGVsZW1lbnQuaXRlbXM7XG4gICAgZWxlbWVudC5faXRlbVRleHRDb250ZW50cyA9IGl0ZW1zLm1hcChjaGlsZCA9PiB7XG4gICAgICBsZXQgdGV4dCA9IGNoaWxkLnRleHRDb250ZW50IHx8IGNoaWxkLmFsdDtcbiAgICAgIHJldHVybiB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQuX2l0ZW1UZXh0Q29udGVudHM7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJhY2tzcGFjZShlbGVtZW50KSB7XG4gIGxldCBsZW5ndGggPSBlbGVtZW50Ll90eXBlZFByZWZpeCA/IGVsZW1lbnQuX3R5cGVkUHJlZml4Lmxlbmd0aCA6IDA7XG4gIGlmIChsZW5ndGggPiAwKSB7XG4gICAgZWxlbWVudC5fdHlwZWRQcmVmaXggPSBlbGVtZW50Ll90eXBlZFByZWZpeC5zdWJzdHIoMCwgbGVuZ3RoIC0gMSk7XG4gIH1cbiAgZWxlbWVudC5zZWxlY3RJdGVtV2l0aFRleHRQcmVmaXgoZWxlbWVudC5fdHlwZWRQcmVmaXgpO1xuICBlbGVtZW50Ll9zZXRQcmVmaXhUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBsYWluQ2hhcmFjdGVyKGVsZW1lbnQsIGNoYXIpIHtcbiAgbGV0IHByZWZpeCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4IHx8ICcnO1xuICBlbGVtZW50Ll90eXBlZFByZWZpeCA9IHByZWZpeCArIGNoYXIudG9Mb3dlckNhc2UoKTtcbiAgZWxlbWVudC5zZWxlY3RJdGVtV2l0aFRleHRQcmVmaXgoZWxlbWVudC5fdHlwZWRQcmVmaXgpO1xuICBzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiByZXNldFByZWZpeFRpbWVvdXQoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC5fcHJlZml4VGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dChlbGVtZW50Ll9wcmVmaXhUaW1lb3V0KTtcbiAgICBlbGVtZW50Ll9wcmVmaXhUaW1lb3V0ID0gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRUeXBlZFByZWZpeChlbGVtZW50KSB7XG4gIGVsZW1lbnQuX3R5cGVkUHJlZml4ID0gJyc7XG4gIHJlc2V0UHJlZml4VGltZW91dChlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gc2V0UHJlZml4VGltZW91dChlbGVtZW50KSB7XG4gIHJlc2V0UHJlZml4VGltZW91dChlbGVtZW50KTtcbiAgZWxlbWVudC5fcHJlZml4VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHJlc2V0VHlwZWRQcmVmaXgoZWxlbWVudCk7XG4gIH0sIFBSRUZJWF9USU1FT1VUX0RVUkFUSU9OKTtcbn1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIGFwcGxpZXMgc3RhbmRhcmQgaGlnaGxpZ2h0IGNvbG9ycyB0byBhIHNlbGVjdGVkIGl0ZW0uXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtc2VsZWN0aW9uLWhpZ2hsaWdodFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGlvbkhpZ2hsaWdodCB7XG5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHtcbiAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNlbGVjdGVkID8gJ2hpZ2hsaWdodCcgOiAnJztcbiAgICBpdGVtLnN0eWxlLmNvbG9yID0gc2VsZWN0ZWQgPyAnaGlnaGxpZ2h0dGV4dCcgOiAnJztcbiAgfVxuXG59XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBzY3JvbGxzIGEgY29udGFpbmVyIHRvIGtlZXAgdGhlIHNlbGVjdGVkIGl0ZW0gdmlzaWJsZS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1zZWxlY3Rpb24tc2Nyb2xsXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0aW9uU2Nyb2xsIHtcblxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gS2VlcCB0aGUgc2VsZWN0ZWQgaXRlbSBpbiB2aWV3LlxuICAgICAgdGhpcy5zY3JvbGxJdGVtSW50b1ZpZXcoaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB0aGUgZ2l2ZW4gZWxlbWVudCBjb21wbGV0ZWx5IGludG8gdmlldywgbWluaW1pemluZyB0aGUgZGVncmVlIG9mXG4gICAqIHNjcm9sbGluZyBwZXJmb3JtZWQuXG4gICAqXG4gICAqIEJsaW5rIGhhcyBhIHNjcm9sbEludG9WaWV3SWZOZWVkZWQoKSBmdW5jdGlvbiB0aGF0IGFsbW9zdCB0aGUgc2FtZSB0aGluZyxcbiAgICogYnV0IHVuZm9ydHVuYXRlbHkgaXQncyBub24tc3RhbmRhcmQsIGFuZCBpbiBhbnkgZXZlbnQgb2Z0ZW4gZW5kcyB1cFxuICAgKiBzY3JvbGxpbmcgbW9yZSB0aGFuIGlzIGFic29sdXRlbHkgbmVjZXNzYXJ5LlxuICAgKlxuICAgKiBAbWV0aG9kIHNjcm9sbEl0ZW1JbnRvVmlld1xuICAgKi9cbiAgc2Nyb2xsSXRlbUludG9WaWV3KGl0ZW0pIHtcbiAgICAvLyBHZXQgdGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIHdpdGggcmVzcGVjdCB0byB0aGUgdG9wIG9mIHRoZVxuICAgIC8vIGxpc3QncyBzY3JvbGxhYmxlIGNhbnZhcy4gQW4gaXRlbSBhdCB0aGUgdG9wIG9mIHRoZSBsaXN0IHdpbGwgaGF2ZSBhXG4gICAgLy8gZWxlbWVudFRvcCBvZiAwLlxuXG4gICAgbGV0IGlubmVybW9zdCA9IHRoaXMuaW5uZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKCFpbm5lcm1vc3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZWxlbWVudFRvcCA9IGl0ZW0ub2Zmc2V0VG9wIC0gaW5uZXJtb3N0Lm9mZnNldFRvcCAtIGlubmVybW9zdC5jbGllbnRUb3A7XG4gICAgbGV0IGVsZW1lbnRCb3R0b20gPSBlbGVtZW50VG9wICsgaXRlbS5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSBib3R0b20gb2YgdGhlIHNjcm9sbGFibGUgY2FudmFzLlxuICAgIGxldCBzY3JvbGxCb3R0b20gPSBpbm5lcm1vc3Quc2Nyb2xsVG9wICsgaW5uZXJtb3N0LmNsaWVudEhlaWdodDtcbiAgICBpZiAoZWxlbWVudEJvdHRvbSA+IHNjcm9sbEJvdHRvbSkge1xuICAgICAgLy8gU2Nyb2xsIHVwIHVudGlsIGl0ZW0gaXMgZW50aXJlbHkgdmlzaWJsZS5cbiAgICAgIGlubmVybW9zdC5zY3JvbGxUb3AgKz0gZWxlbWVudEJvdHRvbSAtIHNjcm9sbEJvdHRvbTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudFRvcCA8IGlubmVybW9zdC5zY3JvbGxUb3ApIHtcbiAgICAgIC8vIFNjcm9sbCBkb3duIHVudGlsIGl0ZW0gaXMgZW50aXJlbHkgdmlzaWJsZS5cbiAgICAgIGlubmVybW9zdC5zY3JvbGxUb3AgPSBlbGVtZW50VG9wO1xuICAgIH1cbiAgfVxuXG59XG4iLCIvKlxuICogRXh0ZW5kIGNsYXNzZXMvb2JqZWN0cyB3aXRoIG90aGVyIGNsYXNzZXMvb2JqZWN0cy5cbiAqL1xuXG5pbXBvcnQgKiBhcyBDb21wb3NpdGlvblJ1bGVzIGZyb20gJy4vQ29tcG9zaXRpb25SdWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2FibGUge1xuXG4gIC8qXG4gICAqIFJldHVybiBhIHN1YmNsYXNzIG9mIHRoZSBjdXJyZW50IGNsYXNzIHRoYXQgaW5jbHVkZXMgdGhlIG1lbWJlcnMgaW5kaWNhdGVkXG4gICAqIGluIHRoZSBhcmd1bWVudC4gVGhlIGFyZ3VtZW50IGNhbiBiZSBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0LCBvciBhIGNsYXNzXG4gICAqIHdob3NlIHByb3RvdHlwZSBjb250YWlucyB0aGUgbWVtYmVycyB0aGF0IHdpbGwgYmUgY29waWVkLlxuICAgKlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIGZvciBhIGNvdXBsZSBvZiBwdXJwb3NlczpcbiAgICogMS4gRXh0ZW5kIGEgY2xhc3Mgd2l0aCBtaXhpbnMvYmVoYXZpb3JzLlxuICAgKiAyLiBDcmVhdGUgYSBjb21wb25lbnQgY2xhc3MgaW4gRVM1LlxuICAgKlxuICAgKiBUaGUgY2FsbFxuICAgKlxuICAgKiAgIE15QmFzZUNsYXNzLmNvbXBvc2UoTWl4aW4xLCBNaXhpbjIsIE1peGluMylcbiAgICpcbiAgICogd2lsbCByZXR1cm4gYSBuZXcgY2xhc3Mgb2YgTXlCYXNlQ2xhc3MgdGhhdCBpbXBsZW1lbnRzIGFsbCB0aGUgbWV0aG9kcyBpblxuICAgKiB0aGUgdGhyZWUgbWl4aW5zIGdpdmVuLiBUaGUgYWJvdmUgaXMgZXF1aXZhbGVudCB0b1xuICAgKlxuICAgKiAgIE15QmFzZUNsYXNzLmNvbXBvc2UoTWl4aW4xKS5jb21wb3NlKE1peGluMikuY29tcG9zZShNaXhpbjMpXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGNhbiBiZSBzdGF0aWNhbGx5IGludm9rZWQgdG8gZXh0ZW5kIHBsYWluIG9iamVjdHMgb3IgY2xhc3Nlc1xuICAgKiB0aGF0IGRvbid0IGluaGVyaXQgZnJvbSB0aGlzIGNsYXNzOlxuICAgKlxuICAgKiAgIGxldCBleHRlbmRlZCA9IENvbXBvc2FibGUuZXh0ZW5kLmNhbGwob2JqMSwgb2JqMik7XG4gICAqXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZSguLi5taXhpbnMpIHtcbiAgICAvLyBXZSBjcmVhdGUgYSBuZXcgc3ViY2xhc3MgZm9yIGVhY2ggbWl4aW4gaW4gdHVybi4gVGhlIHJlc3VsdCBiZWNvbWVzXG4gICAgLy8gdGhlIGJhc2UgY2xhc3MgZXh0ZW5kZWQgYnkgYW55IHN1YnNlcXVlbnQgbWl4aW5zLiBJdCB0dXJucyBvdXQgdGhhdFxuICAgIC8vIHdlIGNhbiB1c2UgQXJyYXkucmVkdWNlKCkgdG8gY29uY2lzZWx5IGV4cHJlc3MgdGhpcywgdXNpbmcgdGhlIGN1cnJlbnRcbiAgICAvLyAob3JpZ2luYWwpIGNsYXNzIGFzIHRoZSBzZWVkIGZvciByZWR1Y2UoKS5cbiAgICByZXR1cm4gbWl4aW5zLnJlZHVjZShjb21wb3NlLCB0aGlzKTtcbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRlIFwidGhpc1wiIHdpdGggdGhlIGluZGljYXRlZCBkZWNvcmF0b3JzLiBUaGUgbGF0dGVyIHNob3VsZCBiZSBhXG4gICAqIGRpY3Rpb25hcnkgbWFwcGluZyBwcm9wZXJ0eSBuYW1lcyB0byAocHJvcG9zZWQpIEVTNy1jb21wbGlhbnQgZGVjb3JhdG9ycy5cbiAgICogVGhpcyBhbGxvd3MgdGhlIHVzZSBvZiBkZWNvcmF0b3JzIGluIEVTNi81LiBFeGFtcGxlLCB0aGlzIEVTNyBjb2RlOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyB7XG4gICAqICAgICAgQGRlY29yYXRlKGN1c3RvbURlY29yYXRvcilcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICpcbiAgICogY2FuIGJlIHdyaXR0ZW4gdXNpbmcgdGhlIGRlY29yYXRlKCkgbWV0aG9kIGFzOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyB7XG4gICAqICAgICAgYmFyKCkge31cbiAgICogICB9XG4gICAqICAgQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEZvby5wcm90b3R5cGUsIHsgYmFyOiBjdXN0b21EZWNvcmF0b3IgfSk7XG4gICAqXG4gICAqIE9yLCBpZiBGb28gZGVyaXZlcyBmcm9tIENvbXBvc2FibGUgYWxyZWFkeSwgdGhpcyBjYW4gYmUgc2hvcnRlcjpcbiAgICpcbiAgICogICBjbGFzcyBGb28gZXh0ZW5kcyBDb21wb3NhYmxlIHtcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICogICBGb28ucHJvdG90eXBlLmRlY29yYXRlKHsgYmFyOiBjdXN0b21EZWNvcmF0b3IgfSk7XG4gICAqXG4gICAqL1xuICBzdGF0aWMgZGVjb3JhdGUoZGVjb3JhdG9ycykge1xuICAgIGZvciAobGV0IGtleSBpbiBkZWNvcmF0b3JzKSB7XG4gICAgICBsZXQgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1trZXldO1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIGtleSk7XG4gICAgICBkZWNvcmF0b3IodGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRlcyB0aGUgcHJvdG90eXBlIG9mIGEgY2xhc3MgZGVyaXZlZCBmcm9tIENvbXBvc2FibGUuXG4gICAqIFNlZSBub3RlcyBmb3IgdGhlIHN0YXRpYyBkZWNvcmF0ZSgpIG1ldGhvZC5cbiAgICovXG4gIGRlY29yYXRlKGRlY29yYXRvcnMpIHtcbiAgICBDb21wb3NhYmxlLmRlY29yYXRlLmNhbGwodGhpcywgZGVjb3JhdG9ycyk7XG4gIH1cblxuICAvKlxuICAgKiBEZWNvcmF0b3IgZm9yIGFubm90YXRpbmcgaG93IGEgY2xhc3MgbWVtYmVyIHNob3VsZCBiZSBjb21wb3NlZCBsYXRlci5cbiAgICogVGhpcyB0YWtlcyBhIGRlY29yYXRvciB0aGF0IHdpbGwgYmUgcnVuIGF0ICpjb21wb3NpdGlvbiogdGltZS5cbiAgICogRm9yIG5vdywgdGhpcyBjYW4gb25seSBiZSBhcHBsaWVkIHRvIG1ldGhvZHMuXG4gICAqL1xuICBzdGF0aWMgcnVsZShkZWNvcmF0b3IpIHtcbiAgICAvLyBSZXR1cm4gYSBkZWNvcmF0b3IgdGhhdCByZWNvcmRzIHRoZSBnaXZlbiBkZWNvcmF0b3Igb24gdGhlIG1lbWJlciBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAvLyBUT0RPOiBVc2UgYSBTeW1ib2wgaW5zdGVhZCBvZiBhIHN0cmluZyBwcm9wZXJ0eSBuYW1lIHRvIHNhdmUgdGhpcy5cbiAgICAgIC8vIGRlc2NyaXB0b3IudmFsdWUuX2NvbXBvc2l0aW9uUnVsZSA9IGRlY29yYXRvcjtcbiAgICAgIGlmICghdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzKSB7XG4gICAgICAgIHRhcmdldC5fY29tcG9zaXRpb25SdWxlcyA9IHt9O1xuICAgICAgfVxuICAgICAgdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzW2tleV0gPSBkZWNvcmF0b3I7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vKlxuICogRXhwb3NlIHN0YW5kYXJkIGNvbXBvc2l0aW9uIHJ1bGVzIGFzIHByb3BlcnRpZXMgb2YgQ29tcG9zYWJsZS5cbiAqIFRoaXMgYXZvaWRzIHRoZSBuZWVkIGZvciBzb21lb25lIHRvIG1ha2UgYSBzZXBhcmF0ZSBpbXBvcnQgb2YgdGhlIHJ1bGVzLlxuICovXG5Db21wb3NhYmxlLnJ1bGVzID0gQ29tcG9zaXRpb25SdWxlcztcblxuXG4vKlxuICogQWxsIENvbXBvc2FibGUgb2JqZWN0cyBoYXZlIGEgXCJwcm90b3R5cGVzXCIga2V5IHRoYXQga2VlcHMgcmVmZXJlbmNlcyB0byB0aGVcbiAqIG1peGlucyB0aGF0IHdlcmUgYXBwbGllZCBhbG9uZyB0aGUgcHJvdG90eXBlIGNoYWluLiBXaGVuIGEgKm5hbWVkKiBtaXhpbiBpc1xuICogYXBwbGllZCB0byB0aGUgcHJvdG90eXBlIGNoYWluLCB0aGUgcmVzdWx0aW5nIG9iamVjdCAob3IsIGZvciBhIGNsYXNzLCB0aGVcbiAqIGNsYXNzJyBwcm90b3R5cGUpIHdpbGwgaGF2ZSBhIFwicHJvdG90eXBlc1wiIHZhbHVlIGZvciB0aGF0IG5hbWUgdGhhdCBwb2ludHNcbiAqIGJhY2sgdG8gdGhlIG1peGluLiBUaGF0IGlzLCBhIG1peGluIGNhbiBnZXQgYSBwb2ludGVyIHRvIGl0c2VsZiBpbiB0aGUgY2hhaW4uXG4gKlxuICogQSBzaW5nbGUgbWl4aW4gY2FuIGJlIGFwcGxpZWQgdG8gbXVsdGlwbGUgcHJvdG90eXBlIGNoYWlucyAtLSB0aGUgbmFtZVxuICogcmVmZXJzIHRvIHRoZSBwcm90b3R5cGUgb24gKnRoaXMgcGFydGljdWxhciBwcm90b3R5cGUgY2hhaW4qIHRoYXQgd2FzIGFkZGVkXG4gKiBmb3IgdGhhdCBtaXhpbi4gVGhpcyBsZXRzIG1peGluL21peGluIGNvZGUgZ2V0IGJhY2sgdG8gaXRzIG93blxuICogcHJvdG90eXBlLCBtb3N0IG9mdGVuIGluIGNvbWJpbmF0aW9uIHdpdGggXCJzdXBlclwiIChzZWUgYmVsb3cpIGluIG9yZGVyIHRvXG4gKiBpbnZva2Ugc3VwZXJjbGFzcyBiZWhhdmlvci5cbiAqL1xuQ29tcG9zYWJsZS5wcm90b3R5cGUucHJvdG90eXBlcyA9IHtcbiAgQ29tcG9zYWJsZTogQ29tcG9zYWJsZS5wcm90b3R5cGVcbn07XG5cbi8qXG4gKiBBbGwgQ29tcG9zYWJsZS1jcmVhdGVkIG9iamVjdHMgaGF2ZSBhIFwic3VwZXJcIiBwcm9wZXJ0eSB0aGF0IHJlZmVyZW5jZXMgdGhlXG4gKiBwcm90b3R5cGUgYWJvdmUgdGhlbSBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIFRoaXMgXCJzdXBlclwiIHJlZmVyZW5jZSBpcyB1c2VkIGFzIGEgcmVwbGFjZW1lbnQgZm9yIEVTNidzIFwic3VwZXJcIiBrZXl3b3JkIGluXG4gKiBpbiBFUzUgKG9yIHRyYW5zcGlsZWQgRVM2KSBtaXhpbnMgdGhhdCB3YW50IHRvIGludm9rZSBzdXBlcmNsYXNzIGJlaGF2aW9yLFxuICogd2hlcmUgdGhlIHNwZWNpZmljIHN1cGVyY2xhc3Mgd2lsbCBkZXBlbmQgdXBvbiB3aGljaCBtaXhpbnMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAqIHRvIGEgZ2l2ZW4gcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIEUuZy46XG4gKiAgIGNsYXNzIE1peGluIHtcbiAqICAgICBmb28oKSB7XG4gKiAgICAgICBpZiAodGhpcy5wcm90b3lwZXMuTWl4aW4uc3VwZXIuZm9vKSB7XG4gKiAgICAgICAgIHRoaXMucHJvdG90eXBlcy5NaXhpbi5zdXBlci5mb28uY2FsbCh0aGlzKTsgLy8gSW52b2tlIHN1cGVyY2xhc3MnIGZvbygpXG4gKiAgICAgICB9XG4gKiAgICAgICAvLyBEbyBNaXhpbi1zcGVjaWZpYyB3b3JrIGhlcmUuLi5cbiAqICAgICB9XG4gKiAgIH1cbiAqXG4gKiBGb3IgY29uc2lzdGVuY3ksIENvbXBvc2FibGUgaXRzZWxmIHJlY29yZHMgaXRzIG93biBzdXBlcmNsYXNzIGFzIE9iamVjdC5cbiAqL1xuQ29tcG9zYWJsZS5wcm90b3R5cGUuc3VwZXIgPSBPYmplY3QucHJvdG90eXBlO1xuXG5cbi8vIENvbXBvc2l0aW9uIHJ1bGVzIGZvciBzdGFuZGFyZCBvYmplY3QgbWVtYmVycy5cbkNvbXBvc2FibGUucHJvdG90eXBlLmNvbXBvc2l0aW9uUnVsZXMgPSB7XG4gICdfX21ldGhvZF9fJzogQ29tcG9zYWJsZS5ydWxlcy5wcm9wYWdhdGVGdW5jdGlvbixcbiAgJ19fcHJvcGVydHlfXyc6IENvbXBvc2FibGUucnVsZXMucHJvcGFnYXRlUHJvcGVydHksXG4gICdwcm90b3R5cGVzJzogQ29tcG9zYWJsZS5ydWxlcy5jaGFpblByb3RvdHlwZXNcbn07XG5cblxuLy8gUHJvcGVydGllcyBkZWZpbmVkIGJ5IEZ1bmN0aW9uIHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBtaXhpbi5cbi8vIFdlJ2QgcHJlZmVyIHRvIGdldCB0aGVzZSBieSBpbnRlcnJvZ2F0aW5nIEZ1bmN0aW9uIGl0c2VsZiwgYnV0IFdlYktpdFxuLy8gZnVuY3Rpb25zIGhhdmUgc29tZSBwcm9wZXJ0aWVzIChhcmd1bWVudHMgYW5kIGNhbGxlcikgd2hpY2ggYXJlIG5vdCByZXR1cm5lZFxuLy8gYnkgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoRnVuY3Rpb24pLlxuY29uc3QgTk9OX01JWEFCTEVfRlVOQ1RJT05fUFJPUEVSVElFUyA9IFtcbiAgJ2FyZ3VtZW50cycsXG4gICdjYWxsZXInLFxuICAnbGVuZ3RoJyxcbiAgJ25hbWUnLFxuICAncHJvdG90eXBlJ1xuXTtcblxuLy8gUHJvcGVydGllcyBkZWZpbmVkIGJ5IE9iamVjdCB0aGF0IHdlIGRvbid0IHdhbnQgdG8gbWl4aW4uXG5jb25zdCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyA9IFtcbiAgJ2NvbnN0cnVjdG9yJ1xuXTtcblxuXG4vKlxuICogQXBwbHkgdGhlIGNvbXBvc2l0aW9uIHJ1bGVzIGluIGVmZmVjdCBmb3IgdGhlIGdpdmVuIG9iamVjdCwgd2hpY2ggbGllcyBhdFxuICogdGhlIHRpcCBvZiBhIHByb3RvdHlwZSBjaGFpbi4gVGhpcyBsb29rcyBmb3IgY29uZmxpY3RzIGJldHdlZW4gdGhlIG9iamVjdCdzXG4gKiBvd24gcHJvcGVydGllcyAoYW5kIG1ldGhvZHMpLCBhbmQgaWRlbnRpY2FsbHktbmFtZWQgcHJvcGVydGllcyAobWV0aG9kcylcbiAqIGZ1cnRoZXIgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi4gQ29uZmxpY3RzIGFyZSByZXNvbHZlZCB3aXRoIHJ1bGVzIGRlZmluZWQgYnlcbiAqIHRoZSBhZmZlY3QgbWVtYmVycy5cbiAqL1xuZnVuY3Rpb24gYXBwbHlDb21wb3NpdGlvblJ1bGVzKG9iaikge1xuICBsZXQgb3duQ29tcG9zaXRpb25SdWxlcyA9IG9iai5oYXNPd25Qcm9wZXJ0eSgnX2NvbXBvc2l0aW9uUnVsZXMnKSA/XG4gICAgb2JqLl9jb21wb3NpdGlvblJ1bGVzIDpcbiAgICB7fTtcbiAgbGV0IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXMgPSBvYmouY29tcG9zaXRpb25SdWxlcztcbiAgbGV0IGRlZmF1bHRDb21wb3NpdGlvblJ1bGVzID0gQ29tcG9zYWJsZS5wcm90b3R5cGUuY29tcG9zaXRpb25SdWxlcztcblxuICAvLyBGb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBzZWUgaWYgdGhlIGJhc2UgaGFzIGEgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lLlxuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKG5hbWUgaW4gYmFzZSAmJiBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgLy8gQmFzZSBkb2VzIGltcGxlbWVudCBhIG1lbWJlciB3aXRoIHRoZSBzYW1lIG5hbWU7IG5lZWQgdG8gY29tYmluZS5cbiAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xuICAgICAgbGV0IGtleSA9IGdldEdlbmVyYWxEZXNjcmlwdG9yS2V5KGRlc2NyaXB0b3IpO1xuXG4gICAgICAvLyBTZWUgaWYgdGhpcyBwcm9wZXJ0eSBoYXMgYSBydWxlIGFzc29jaWF0ZWQgd2l0aCBpdCwgY2hlY2tpbmc6XG4gICAgICBsZXQgcnVsZSA9IG93bkNvbXBvc2l0aW9uUnVsZXNbbmFtZV0gICAgLy8gb2JqZWN0IGl0c2VsZlxuICAgICAgICAgIHx8IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXNbbmFtZV0gIC8vIGluaGVyaXRlZCBydWxlcyBmb3IgbmFtZVxuICAgICAgICAgIHx8IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXNba2V5XSAgIC8vIGluaGVyaXRlZCBydWxlcyBnZW5lcmFsbHlcbiAgICAgICAgICB8fCBkZWZhdWx0Q29tcG9zaXRpb25SdWxlc1tuYW1lXSAgICAvLyBkZWZhdWx0IHJ1bGVzIGZvciBuYW1lXG4gICAgICAgICAgfHwgZGVmYXVsdENvbXBvc2l0aW9uUnVsZXNba2V5XTsgICAgLy8gZGVmYXVsdCBydWxlcyBnZW5lcmFsbHlcblxuICAgICAgLy8gXCJvdmVycmlkZVwiIGlzIGEga25vd24gbm8tb3AsIHNvIHdlIGRvbid0IGJvdGhlciB0cnlpbmcgdG8gcmVkZWZpbmUgdGhlXG4gICAgICAvLyBwcm9wZXJ0eS5cbiAgICAgIGlmIChydWxlICYmIHJ1bGUgIT09IENvbXBvc2FibGUucnVsZXMub3ZlcnJpZGUpIHtcbiAgICAgICAgcnVsZShvYmosIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5cbi8qXG4gKiBDb3B5IHRoZSBnaXZlbiBwcm9wZXJ0aWVzL21ldGhvZHMgdG8gdGhlIHRhcmdldC5cbiAqIFJldHVybiB0aGUgdXBkYXRlZCB0YXJnZXQuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPd25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0LCBpZ25vcmVQcm9wZXJ0eU5hbWVzID0gW10pIHtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGlmIChpZ25vcmVQcm9wZXJ0eU5hbWVzLmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBuYW1lKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuLypcbiAqIFJldHVybiBhIG5ldyBzdWJjbGFzcy9vYmplY3QgdGhhdCBleHRlbmRzIHRoZSBnaXZlbiBiYXNlIGNsYXNzL29iamVjdCB3aXRoXG4gKiB0aGUgbWVtYmVycyBvZiB0aGUgaW5kaWNhdGVkIG1peGluLlxuICovXG5mdW5jdGlvbiBjb21wb3NlKGJhc2UsIG1peGluKSB7XG5cbiAgLy8gU2VlIGlmIHRoZSAqbWl4aW4qIGhhcyBhIGJhc2UgY2xhc3MvcHJvdG90eXBlIG9mIGl0cyBvd24uXG4gIGxldCBtaXhpbklzQ2xhc3MgPSBpc0NsYXNzKG1peGluKTtcbiAgbGV0IG1peGluQmFzZSA9IG1peGluSXNDbGFzcyA/XG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKG1peGluLnByb3RvdHlwZSkuY29uc3RydWN0b3IgOlxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihtaXhpbik7XG4gIGlmIChtaXhpbkJhc2UgJiZcbiAgICAgIG1peGluQmFzZSAhPT0gRnVuY3Rpb24gJiZcbiAgICAgIG1peGluQmFzZSAhPT0gT2JqZWN0ICYmXG4gICAgICBtaXhpbkJhc2UgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAvLyBUaGUgbWl4aW4gaXRzZWxmIGRlcml2ZXMgZnJvbSBhbm90aGVyIGNsYXNzL29iamVjdC5cbiAgICAvLyBSZWN1cnNlLCBhbmQgZXh0ZW5kIHdpdGggdGhlIG1peGluJ3MgYmFzZSBmaXJzdC5cbiAgICBiYXNlID0gY29tcG9zZShiYXNlLCBtaXhpbkJhc2UpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIHRoZSBleHRlbmRlZCBvYmplY3Qgd2UncmUgZ29pbmcgdG8gcmV0dXJuIGFzIGEgcmVzdWx0LlxuICBsZXQgYmFzZUlzQ2xhc3MgPSBpc0NsYXNzKGJhc2UpO1xuICBsZXQgcmVzdWx0ID0gYmFzZUlzQ2xhc3MgP1xuICAgIGNyZWF0ZVN1YmNsYXNzKGJhc2UpIDpcbiAgICBPYmplY3QuY3JlYXRlKGJhc2UpO1xuXG4gIC8vIFRoZSBcInRhcmdldFwiIGhlcmUgaXMgdGhlIHRhcmdldCBvZiBvdXIgcHJvcGVydHkvbWV0aG9kIGNvbXBvc2l0aW9uIHJ1bGVzLlxuICBsZXQgdGFyZ2V0O1xuICBpZiAoYmFzZUlzQ2xhc3MgJiYgbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIGNsYXNzIHdpdGggY2xhc3M6IGNvcHkgc3RhdGljIG1lbWJlcnMsIHRoZW4gcHJvdG90eXBlIG1lbWJlcnMuXG4gICAgY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdCwgTk9OX01JWEFCTEVfRlVOQ1RJT05fUFJPUEVSVElFUyk7XG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4ucHJvdG90eXBlLCByZXN1bHQucHJvdG90eXBlLCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyk7XG4gIH0gZWxzZSBpZiAoIWJhc2VJc0NsYXNzICYmIG1peGluSXNDbGFzcykge1xuICAgIC8vIEV4dGVuZGluZyBwbGFpbiBvYmplY3Qgd2l0aCBjbGFzczogY29weSBwcm90b3R5cGUgbWV0aG9kcyB0byByZXN1bHQuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4ucHJvdG90eXBlLCByZXN1bHQsIE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMpO1xuICB9IGVsc2UgaWYgKGJhc2VJc0NsYXNzICYmICFtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgY2xhc3Mgd2l0aCBwbGFpbiBvYmplY3Q6IGNvcHkgbWl4aW4gdG8gcmVzdWx0IHByb3RvdHlwZS5cbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbiwgcmVzdWx0LnByb3RvdHlwZSwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9IGVsc2Uge1xuICAgIC8vIEV4dGVuZGluZyBwbGFpbiBvYmplY3Qgd2l0aCBwbGFpbiBvYmplY3Q6IGNvcHkgZm9ybWVyIHRvIGxhdHRlci5cbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbiwgcmVzdWx0LCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyk7XG4gIH1cblxuICBpZiAobWl4aW4ubmFtZSkge1xuICAgIC8vIFVzZSB0aGUgbWl4aW4ncyBuYW1lICh1c3VhbGx5IHRoZSBuYW1lIG9mIGEgY2xhc3MnIGNvbnN0cnVjdG9yKSB0b1xuICAgIC8vIHNhdmUgYSByZWZlcmVuY2UgYmFjayB0byB0aGUgdGlwIG9mIHRoZSBuZXdseS1leHRlbmRlZCBwcm90b3R5cGUgY2hhaW4uXG4gICAgLy8gU2VlIG5vdGVzIGF0IENvbXBvc2FibGUncyBcInByb3RvdHlwZXNcIiBwcm9wZXJ0eS5cbiAgICB0YXJnZXQucHJvdG90eXBlcyA9IHt9O1xuICAgIHRhcmdldC5wcm90b3R5cGVzW21peGluLm5hbWVdID0gdGFyZ2V0O1xuXG4gICAgLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgc3VwZXJjbGFzcy9zdXBlci1vYmplY3QuIFNlZSB0aGUgY29tbWVudHMgb25cbiAgICAvLyBDb21wb3NhYmxlJ3MgXCJzdXBlclwiIHByb3BlcnR5LlxuICAgIHRhcmdldC5zdXBlciA9IGJhc2VJc0NsYXNzID8gYmFzZS5wcm90b3R5cGUgOiBiYXNlO1xuICB9XG5cbiAgLy8gQXBwbHkgdGhlIGNvbXBvc2l0aW9uIHJ1bGVzIGluIGVmZmVjdCBhdCB0aGUgdGFyZ2V0LlxuICBhcHBseUNvbXBvc2l0aW9uUnVsZXModGFyZ2V0KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gYSBuZXcgc3ViY2xhc3Mgb2YgdGhlIGdpdmVuIGJhc2UgY2xhc3MuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN1YmNsYXNzKGJhc2UpIHtcbiAgLy8gT25jZSBXZWJLaXQgc3VwcG9ydHMgSFRNTEVsZW1lbnQgYXMgYSByZWFsIGNsYXNzLCB3ZSBjYW4ganVzdCBzYXk6XG4gIC8vXG4gIC8vICAgY2xhc3Mgc3ViY2xhc3MgZXh0ZW5kcyBiYXNlIHt9XG4gIC8vXG4gIC8vIEhvd2V2ZXIsIHVudGlsIHRoYXQncyByZXNvbHZlZCwgd2UganVzdCBjb25zdHJ1Y3QgdGhlIGNsYXNzIG91cnNlbHZlcy5cbiAgZnVuY3Rpb24gc3ViY2xhc3MoKSB7fTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLCBiYXNlKTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLnByb3RvdHlwZSwgYmFzZS5wcm90b3R5cGUpO1xuICByZXR1cm4gc3ViY2xhc3M7XG59XG5cblxuLypcbiAqIEV4YW1pbmUgdGhlIGRlc2NyaXB0b3IgdG8gZGV0ZXJtaW5lIHdoaWNoIHJ1bGUga2V5IGFwcGxpZXMuXG4gKi9cbmZ1bmN0aW9uIGdldEdlbmVyYWxEZXNjcmlwdG9yS2V5KGRlc2NyaXB0b3IpIHtcbiAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gTWV0aG9kXG4gICAgcmV0dXJuICdfX21ldGhvZF9fJztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbidcbiAgICAgIHx8IHR5cGVvZiBkZXNjcmlwdG9yLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFByb3BlcnR5IHdpdGggZ2V0dGVyIGFuZC9vciBzZXR0ZXJcbiAgICByZXR1cm4gJ19fcHJvcGVydHlfXyc7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuLypcbiAqIFJldHVybiB0cnVlIGlmIGMgaXMgYSBKYXZhU2NyaXB0IGNsYXNzLlxuICpcbiAqIFdlIHVzZSB0aGlzIHRlc3QgYmVjYXVzZSwgb24gV2ViS2l0LCBjbGFzc2VzIGxpa2UgSFRNTEVsZW1lbnQgYXJlIHNwZWNpYWwsXG4gKiBhbmQgYXJlIG5vdCBpbnN0YW5jZXMgb2YgRnVuY3Rpb24uIFRvIGhhbmRsZSB0aGF0IGNhc2UsIHdlIHVzZSBhIGxvb3NlclxuICogZGVmaW5pdGlvbjogYW4gb2JqZWN0IGlzIGEgY2xhc3MgaWYgaXQgaGFzIGEgcHJvdG90eXBlLCBhbmQgdGhhdCBwcm90b3R5cGVcbiAqIGhhcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgdGhlIG9yaWdpbmFsIG9iamVjdC4gVGhpcyBjb25kaXRpb24gaG9sZHMgdHJ1ZSBldmVuXG4gKiBmb3IgSFRNTEVsZW1lbnQgb24gV2ViS2l0LlxuICovXG5mdW5jdGlvbiBpc0NsYXNzKGMpIHtcbiAgcmV0dXJuIHR5cGVvZiBjID09PSAnZnVuY3Rpb24nIHx8ICAgICAgICAgICAgICAgICAgIC8vIFN0YW5kYXJkXG4gICAgICAoYy5wcm90b3R5cGUgJiYgYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPT09IGMpOyAvLyBIVE1MRWxlbWVudCBpbiBXZWJLaXRcbn1cbiIsIi8qKlxuICogU3RhbmRhcmQgY29tcG9zaXRpb24gcnVsZXNcbiAqL1xuXG4vKlxuICogVGFrZSB0d28gZnVuY3Rpb25zIGFuZCByZXR1cm4gYSBuZXcgY29tcG9zZWQgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGJvdGguXG4gKiBUaGUgY29tcG9zZWQgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgc2Vjb25kIGZ1bmN0aW9uLlxuICogVGhpcyBpcyBub3QgYSBydWxlLCBidXQgYSBoZWxwZXIgdXNlZCBieSBydWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VGdW5jdGlvbihmdW5jdGlvbjEsIGZ1bmN0aW9uMikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24xLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5cbi8qXG4gKiBDb21iaW5hdG9yIHRoYXQgc2V0cyB0aGUgcHJvdG90eXBlIG9mIGEgbWl4aW4gcHJvcGVydHkgdmFsdWUgdG8gYmUgdGhlXG4gKiBjb3JyZXNwb25kaW5nIHZhbHVlIG9uIHRoZSBiYXNlLiBUaGlzIGVmZmVjdGl2ZWx5IGRvZXMgYSBzaGFsbG93IG1lcmdlIG9mXG4gKiBvZiB0aGUgcHJvcGVydGllcywgd2l0aG91dCBjb3B5aW5nIGFueSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluUHJvdG90eXBlcyh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5WYWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpO1xuICBsZXQgYmFzZVZhbHVlID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihtaXhpblZhbHVlLCBiYXNlVmFsdWUpO1xufVxuXG5cbi8qXG4gKiBQZXJmb3JtIGEgZGVlcCBtZXJnZSBvZiBhIG1peGluIHByb3BlcnR5IG9uIHRvcCBvZiBhIGJhc2UgcHJvcGVydHkuXG4gKi9cbi8vIGV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2UodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbi8vICAgbGV0IG1peGluVmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuLy8gICBsZXQgYmFzZVZhbHVlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClba2V5XS52YWx1ZTtcbi8vICAgZGVzY3JpcHRvci52YWx1ZSA9ICdtZXJnZWQnOyAvLyBtZXJnZShiYXNlVmFsdWUsIG1peGluVmFsdWUpO1xuLy8gfVxuXG4vKlxuICogTGlrZSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKCksIGJ1dCB3YWxrcyB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICogVGhpcyBpcyBuZWVkZWQgYnkgY29tcG9zaXRpb24gcnVsZXMsIHdoaWNoIHVzdWFsbHkgc3RhcnQgb3V0IGJ5IGdldHRpbmdcbiAqIHRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGEgbWVtYmVyIHRoZXkncmUgY29tcG9zaW5nLlxuICogVGhpcyBpcyBub3QgYSBydWxlLCBidXQgYSBoZWxwZXIgdXNlZCBieSBydWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpIHtcbiAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSk7XG4gIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIC8vIENoZWNraW5nIGZvciBcIm5hbWUgaW4gcHJvdG90eXBlXCIgbGV0cyB1cyBrbm93IHdoZXRoZXIgd2Ugc2hvdWxkIGJvdGhlclxuICAgIC8vIHdhbGtpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICBpZiAocHJvdG90eXBlICYmIG5hbWUgaW4gcHJvdG90eXBlKSB7XG4gICAgICByZXR1cm4gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgbmFtZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7IC8vIE5vdCBmb3VuZFxufVxuXG5cbi8qXG4gKiBDb21iaW5hdG9yIHRoYXQgY2F1c2VzIGEgbWl4aW4gbWV0aG9kIHRvIG92ZXJyaWRlIGl0cyBiYXNlIGltcGxlbWVudGF0aW9uLlxuICogU2luY2UgdGhpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgcHJvdG90eXBlIGNoYWluLCB0aGlzIGlzIGEgbm8tb3AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvdmVycmlkZSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge31cblxuXG4vKlxuICogQ29tcG9zZSBtZXRob2RzLCBpbnZva2luZyBiYXNlIGltcGxlbWVudGF0aW9uIGZpcnN0LiBJZiBpdCByZXR1cm5zIGFcbiAqIHRydXRoeSByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgdGhlIG1peGluIGltcGxlbWVudGF0aW9uJ3NcbiAqIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZlckJhc2VSZXN1bHQodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClba2V5XTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBiYXNlSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICB8fCBtaXhpbkltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuXG4vKlxuICogQ29tcG9zZSBtZXRob2RzLCBpbnZva2luZyBtaXhpbiBpbXBsZW1lbnRhdGlvbiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhXG4gKiB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIHRoZSBiYXNlIGltcGxlbWVudGF0aW9uJ3NcbiAqIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZlck1peGluUmVzdWx0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpW2tleV07XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbWl4aW5JbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHx8IGJhc2VJbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cblxuLypcbiAqIERlZmF1bHQgcnVsZSBmb3IgY29tcG9zaW5nIG1ldGhvZHM6IGludm9rZSBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvcGFnYXRlRnVuY3Rpb24odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClba2V5XTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGNvbXBvc2VGdW5jdGlvbihiYXNlSW1wbGVtZW50YXRpb24sIG1peGluSW1wbGVtZW50YXRpb24pO1xufVxuXG5cbi8qXG4gKiBEZWZhdWx0IHJ1bGUgZm9yIGNvbXBvc2luZyBwcm9wZXJ0aWVzLlxuICogV2Ugb25seSBjb21wb3NlIHNldHRlcnMsIHdoaWNoIGludm9rZSBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICogQSBkZWZpbmVkIG1peGluIGdldHRlciBvdmVycmlkZXMgYSBiYXNlIGdldHRlci5cbiAqIE5vdGUgdGhhdCwgYmVjYXVzZSBvZiB0aGUgd2F5IHByb3BlcnR5IGRlc2NyaXB0b3JzIHdvcmssIGlmIHRoZSBtaXhpbiBvbmx5XG4gKiBkZWZpbmVzIGEgc2V0dGVyLCBidXQgbm90IGEgZ2V0dGVyLCB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgZ2V0dGVyIHRoYXRcbiAqIGludm9rZXMgdGhlIGJhc2UgZ2V0dGVyLiBTaW1pbGFybHksIGlmIHRoZSBtaXhpbiBqdXN0IGRlZmluZXMgYSBnZXR0ZXIsXG4gKiB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgc2V0dGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvcGFnYXRlUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIGtleSk7XG4gIGlmIChkZXNjcmlwdG9yLmdldCAmJiAhZGVzY3JpcHRvci5zZXQgJiYgYmFzZURlc2NyaXB0b3Iuc2V0KSB7XG4gICAgLy8gTmVlZCB0byBzdXBwbHkgZGVmYXVsdCBzZXR0ZXIuXG4gICAgZGVzY3JpcHRvci5zZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYmFzZURlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgdmFsdWUpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoZGVzY3JpcHRvci5zZXQpIHtcbiAgICBpZiAoIWRlc2NyaXB0b3IuZ2V0ICYmIGJhc2VEZXNjcmlwdG9yLmdldCkge1xuICAgICAgLy8gTmVlZCB0byBzdXBwbHkgZGVmYXVsdCBnZXR0ZXIuXG4gICAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmFzZURlc2NyaXB0b3IuZ2V0LmNhbGwodGhpcyk7XG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDb21wb3NlIHNldHRlcnMuXG4gICAgZGVzY3JpcHRvci5zZXQgPSBjb21wb3NlRnVuY3Rpb24oYmFzZURlc2NyaXB0b3Iuc2V0LCBkZXNjcmlwdG9yLnNldCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNYXJzaGFsbCBhdHRyaWJ1dGVzIHRvIHByb3BlcnRpZXMgKGFuZCBldmVudHVhbGx5IHZpY2UgdmVyc2EpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJpYnV0ZU1hcnNoYWxsaW5nIHtcblxuICAvKlxuICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIC8vIElmIHRoZSBhdHRyaWJ1dGUgbmFtZSBjb3JyZXNwb25kcyB0byBhIHByb3BlcnR5IG5hbWUsIHRoZW4gc2V0IHRoYXRcbiAgICAvLyBwcm9wZXJ0eS4gSWdub3JlIGNoYW5nZXMgaW4gc3RhbmRhcmQgSFRNTEVsZW1lbnQgcHJvcGVydGllcy5cbiAgICBsZXQgcHJvcGVydHlOYW1lID0gYXR0cmlidXRlVG9Qcm9wZXJ0eU5hbWUobmFtZSk7XG4gICAgaWYgKHByb3BlcnR5TmFtZSBpbiB0aGlzICYmICEocHJvcGVydHlOYW1lIGluIEhUTUxFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5hdHRyaWJ1dGVzLCBhdHRyaWJ1dGUgPT4ge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlLm5hbWUsIHVuZGVmaW5lZCwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cblxuLy8gQ29udmVydCBjYW1lbCBjYXNlIGZvb0JhciBuYW1lIHRvIGh5cGhlbmF0ZWQgZm9vLWJhci5cbmZ1bmN0aW9uIGF0dHJpYnV0ZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZU5hbWUpIHtcbiAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZU5hbWUucmVwbGFjZSgvLShbYS16XSkvZywgbSA9PiBtWzFdLnRvVXBwZXJDYXNlKCkpO1xuICByZXR1cm4gcHJvcGVydHlOYW1lO1xufVxuXG4vLyBDb252ZXJ0IGh5cGhlbmF0ZWQgZm9vLWJhciBuYW1lIHRvIGNhbWVsIGNhc2UgZm9vQmFyLlxuZnVuY3Rpb24gcHJvcGVydHlUb0F0dHJpYnV0ZU5hbWUocHJvcGVydHlOYW1lKSB7XG4gIGxldCBhdHRyaWJ1dGVOYW1lID0gcHJvcGVydHlOYW1lLnJlcGxhY2UoLyhbYS16XVtBLVpdKS9nLCBnID0+IGdbMF0gKyAnLScgKyBnWzFdLnRvTG93ZXJDYXNlKCkpO1xuICByZXR1cm4gYXR0cmlidXRlTmFtZTtcbn1cbiIsIi8qXG4gKiBQb2x5bWVyLXN0eWxlIGF1dG9tYXRpYyBub2RlIGZpbmRpbmcuXG4gKiBTZWUgaHR0cHM6Ly93d3cucG9seW1lci1wcm9qZWN0Lm9yZy8xLjAvZG9jcy9kZXZndWlkZS9sb2NhbC1kb20uaHRtbCNub2RlLWZpbmRpbmcuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b21hdGljTm9kZUZpbmRpbmcge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5zaGFkb3dSb290KSB7XG4gICAgICB0aGlzLiQgPSB7fTtcbiAgICAgIHZhciBub2Rlc1dpdGhJZHMgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKG5vZGVzV2l0aElkcywgbm9kZSA9PiB7XG4gICAgICAgIHZhciBpZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICB0aGlzLiRbaWRdID0gbm9kZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCIvKlxuICogQSBjb21wb3NhYmxlIEhUTUwgZWxlbWVudC5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIHByb3ZpZGVkIGp1c3QgYXMgYSBjb252ZW5pZW5jZS4gT25lIGNvdWxkIGFsc28gc3RhcnQgd2l0aFxuICogSFRNTEVsZW1lbnQgYXQgdGhlIHRvcCBsZXZlbCwgYW5kIGFkZCBleHRlbnNpYmlsaXR5IGJ5IG1peGluZyBpbiBDb21wb3NhYmxlLlxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG4vLyBXZSB1c2UgRXh0ZW5zaWJsZSB0byBhZGQgaXRzIG93biBtZW1iZXJzIHRvIGEgSFRNTEVsZW1lbnQgc3ViY2xhc3MuXG4vLyBUaGUgcmVzdWx0IGlzIGFuIEhUTUxFbGVtZW50IHdpdGggLmV4dGVuZCgpIGFuZCBzdXBlcigpIHN1cHBvcnQuXG5sZXQgQ29tcG9zYWJsZUVsZW1lbnQgPSBDb21wb3NhYmxlLmNvbXBvc2UuY2FsbChIVE1MRWxlbWVudCwgQ29tcG9zYWJsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvc2FibGVFbGVtZW50O1xuIiwiLypcbiAqIEEgc2FtcGxlIGdlbmVyYWwtcHVycG9zZSBiYXNlIGNsYXNzIGZvciBkZWZpbmluZyBjdXN0b20gZWxlbWVudHMgdGhhdCBtaXhlc1xuICogaW4gc29tZSBjb21tb24gZmVhdHVyZXM6IHRlbXBsYXRlIHN0YW1waW5nIGludG8gYSBzaGFkb3cgcm9vdCwgYXV0b21hdGljIG5vZGVcbiAqIGZpbmRpbmcsIGFuZCBtYXJzaGFsbGluZyBiZXR3ZWVuIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnRpZXMuXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGVFbGVtZW50IGZyb20gJy4vQ29tcG9zYWJsZUVsZW1lbnQnO1xuaW1wb3J0IFRlbXBsYXRlU3RhbXBpbmcgZnJvbSAnLi9UZW1wbGF0ZVN0YW1waW5nJztcbmltcG9ydCBBdXRvbWF0aWNOb2RlRmluZGluZyBmcm9tICcuL0F1dG9tYXRpY05vZGVGaW5kaW5nJztcbmltcG9ydCBBdHRyaWJ1dGVNYXJzaGFsbGluZyBmcm9tICcuL0F0dHJpYnV0ZU1hcnNoYWxsaW5nJztcblxuY2xhc3MgRWxlbWVudEJhc2UgZXh0ZW5kcyBDb21wb3NhYmxlRWxlbWVudCB7XG5cbiAgLyogRm9yIGRlYnVnZ2luZyAqL1xuICBsb2codGV4dCkge1xuICAgIGNvbnNvbGUubG9nKGAke3RoaXMubG9jYWxOYW1lfTogJHt0ZXh0fWApO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWxlbWVudEJhc2UgPSBFbGVtZW50QmFzZS5jb21wb3NlKFxuICBUZW1wbGF0ZVN0YW1waW5nLCAvLyBiZWZvcmUgbm9kZSBmaW5kaW5nLCBzbyBzaGFkb3cgcm9vdCBpcyBwb3B1bGF0ZWRcbiAgQXV0b21hdGljTm9kZUZpbmRpbmcsIC8vIGJlZm9yZSBtYXJzaGFsbGluZywgc28gbWFyc2hhbGxlZCBwcm9wZXJ0aWVzIGNhbiB1c2UgaXRcbiAgQXR0cmlidXRlTWFyc2hhbGxpbmdcbik7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnZWxlbWVudC1iYXNlJywgRWxlbWVudEJhc2UpO1xuIiwiLypcbiAqIEVsZW1lbnQgZXh0ZW5zaW9uIGZvciB0ZW1wbGF0ZSBzdGFtcGluZy4gSWYgYSBjb21wb25lbnQgZGVmaW5lcyBhIHRlbXBsYXRlXG4gKiBwcm9wZXJ0eSAoYXMgYSBzdHJpbmcgb3IgcmVmZXJlbmNpbmcgYSBIVE1MIHRlbXBsYXRlKSwgd2hlbiB0aGUgY29tcG9uZW50XG4gKiBjbGFzcyBpcyBpbnN0YW50aWF0ZWQsIGEgc2hhZG93IHJvb3Qgd2lsbCBiZSBjcmVhdGVkIG9uIHRoZSBpbnN0YW5jZSwgYW5kXG4gKiB0aGUgY29udGVudHMgb2YgdGhlIHRlbXBsYXRlIHdpbGwgYmUgY2xvbmVkIGludG8gdGhlIHNoYWRvdyByb290LlxuICpcbiAqIEZvciB0aGUgdGltZSBiZWluZywgdGhpcyBleHRlbnNpb24gcmV0YWlucyBzdXBwb3J0IGZvciBTaGFkb3cgRE9NIHYwLlxuICogVGhhdCB3aWxsIGV2ZW50dWFsbHkgYmUgZGVwcmVjYXRlZCBhcyBicm93c2VycyBpbXBsZW1lbnQgU2hhZG93IERPTSB2MS5cbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBsYXRlU3RhbXBpbmcge1xuXG4gIC8qXG4gICAqIElmIHRoZSBjb21wb25lbnQgZGVmaW5lcyBhIHRlbXBsYXRlLCBhIHNoYWRvdyByb290IHdpbGwgYmUgY3JlYXRlZCBvbiB0aGVcbiAgICogY29tcG9uZW50IGluc3RhbmNlLCBhbmQgdGhlIHRlbXBsYXRlIHN0YW1wZWQgaW50byBpdC5cbiAgICovXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBVcGdyYWRlIHBsYWluIHN0cmluZyB0byByZWFsIHRlbXBsYXRlLlxuICAgICAgdGVtcGxhdGUgPSBjcmVhdGVUZW1wbGF0ZVdpdGhJbm5lckhUTUwodGVtcGxhdGUpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGUgJiYgVVNJTkdfU0hBRE9XX0RPTV9WMCkge1xuICAgICAgcG9seWZpbGxTbG90V2l0aENvbnRlbnQodGVtcGxhdGUpO1xuICAgIH1cbiAgICBpZiAod2luZG93LlNoYWRvd0RPTVBvbHlmaWxsKSB7XG4gICAgICBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRoaXMubG9jYWxOYW1lKTtcbiAgICB9XG4gICAgLy8gVE9ETzogU2F2ZSB0aGUgcHJvY2Vzc2VkIHRlbXBsYXRlIHdpdGggdGhlIGNvbXBvbmVudCdzIGNsYXNzIHByb3RvdHlwZVxuICAgIC8vIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBwcm9jZXNzZWQgd2l0aCBldmVyeSBpbnN0YW50aWF0aW9uLlxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgLy8gdGhpcy5sb2coXCJjbG9uaW5nIHRlbXBsYXRlIGludG8gc2hhZG93IHJvb3RcIik7XG4gICAgICBsZXQgcm9vdCA9IFVTSU5HX1NIQURPV19ET01fVjAgP1xuICAgICAgICB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKSA6ICAgICAgICAgICAgIC8vIFNoYWRvdyBET00gdjBcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7ICAvLyBTaGFkb3cgRE9NIHYxXG4gICAgICBsZXQgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgcm9vdC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vLyBGZWF0dXJlIGRldGVjdGlvbiBmb3Igb2xkIFNoYWRvdyBET00gdjAuXG5jb25zdCBVU0lOR19TSEFET1dfRE9NX1YwID0gKHR5cGVvZiBIVE1MRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5cbi8vIENvbnZlcnQgYSBwbGFpbiBzdHJpbmcgb2YgSFRNTCBpbnRvIGEgcmVhbCB0ZW1wbGF0ZSBlbGVtZW50LlxuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVXaXRoSW5uZXJIVE1MKGlubmVySFRNTCkge1xuICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAvLyBSRVZJRVc6IElzIHRoZXJlIGFuIGVhc2llciB3YXkgdG8gZG8gdGhpcz9cbiAgLy8gV2UnZCBsaWtlIHRvIGp1c3Qgc2V0IGlubmVySFRNTCBvbiB0aGUgdGVtcGxhdGUgY29udGVudCwgYnV0IHNpbmNlIGl0J3NcbiAgLy8gYSBEb2N1bWVudEZyYWdtZW50LCB0aGF0IGRvZXNuJ3Qgd29yay5cbiAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICB3aGlsZSAoZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgIHRlbXBsYXRlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMF0pO1xuICB9XG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuLy8gUmVwbGFjZSBvY2N1cmVuY2VzIG9mIHYxIHNsb3QgZWxlbWVudHMgd2l0aCB2MCBjb250ZW50IGVsZW1lbnRzLlxuLy8gVGhpcyBkb2VzIG5vdCB5ZXQgbWFwIG5hbWVkIHNsb3RzIHRvIGNvbnRlbnQgc2VsZWN0IGNsYXVzZXMuXG5mdW5jdGlvbiBwb2x5ZmlsbFNsb3RXaXRoQ29udGVudCh0ZW1wbGF0ZSkge1xuICBbXS5mb3JFYWNoLmNhbGwodGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzbG90JyksIHNsb3RFbGVtZW50ID0+IHtcbiAgICBsZXQgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50Jyk7XG4gICAgc2xvdEVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29udGVudEVsZW1lbnQsIHNsb3RFbGVtZW50KTtcbiAgfSk7XG59XG5cbi8vIEludm9rZSBiYXNpYyBzdHlsZSBzaGltbWluZyB3aXRoIFNoYWRvd0NTUy5cbmZ1bmN0aW9uIHNoaW1UZW1wbGF0ZVN0eWxlcyh0ZW1wbGF0ZSwgdGFnKSB7XG4gIFdlYkNvbXBvbmVudHMuU2hhZG93Q1NTLnNoaW1TdHlsaW5nKHRlbXBsYXRlLmNvbnRlbnQsIHRhZyk7XG59XG4iXX0=
