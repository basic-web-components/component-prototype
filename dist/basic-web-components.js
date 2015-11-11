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

var _Super = require('./Super');

var _Super2 = _interopRequireDefault(_Super);

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
})(_ElementBase2.default.compose(_Super2.default, _ChildrenContent2.default, _ClickSelection2.default, _ContentItems2.default, _DirectionSelection2.default, _Generic2.default, _ItemSelection2.default, _ItemsAccessible2.default, _Keyboard2.default, _KeyboardDirection2.default, _KeyboardPaging2.default, _KeyboardPrefixSelection2.default, _SelectionHighlight2.default, _SelectionScroll2.default));

exports.default = ListBox;

document.registerElement('basic-list-box', ListBox);

},{"../../mixins/ChildrenContent":4,"../../mixins/ClickSelection":5,"../../mixins/ContentItems":6,"../../mixins/DirectionSelection":7,"../../mixins/Generic":8,"../../mixins/ItemSelection":9,"../../mixins/ItemsAccessible":10,"../../mixins/Keyboard":11,"../../mixins/KeyboardDirection":12,"../../mixins/KeyboardPaging":13,"../../mixins/KeyboardPrefixSelection":14,"../../mixins/SelectionHighlight":15,"../../mixins/SelectionScroll":16,"./Super":2,"element-base/src/ElementBase":22}],2:[function(require,module,exports){
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

/*
 * These helpers probably should go in Extensible.
 * Because this prototype is the first set of components that need these
 * helpers, they're here for now.
 */

var Super = (function () {
  function Super() {
    _classCallCheck(this, Super);
  }

  _createClass(Super, [{
    key: "superCall",

    // As of 11/3/2015, Safari 9 doesn't yet support ES6 "..." spread operator.
    // superCall(prototype, method, ...args) {
    value: function superCall(prototype, method) {
      var base = prototype.super[method];
      if (base) {
        var args = [].slice.call(arguments, 2); // For Safari 9
        return base.apply(this, args);
      }
    }
  }, {
    key: "superGet",
    value: function superGet(prototype, property) {
      // TODO: Standards-compliant way to find getter.
      var base = prototype.super.__lookupGetter__(property);
      if (base) {
        return base.call(this);
      }
    }
  }, {
    key: "superSet",
    value: function superSet(prototype, property, value) {
      // TODO: Standards-compliant way to find setter.
      var base = prototype.super.__lookupSetter__(property);
      if (base) {
        base.call(this, value);
      }
    }
  }]);

  return Super;
})();

exports.default = Super;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function greet() {
  console.log("Hello, world.");
}

exports.default = greet;

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

},{"element-base/extensible/Composable":17}],8:[function(require,module,exports){
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

},{"element-base/extensible/Composable":17}],13:[function(require,module,exports){
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

},{"element-base/extensible/Composable":17}],14:[function(require,module,exports){
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

},{"element-base/extensible/Composable":17}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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
    value: function decorate(decorators) {
      Composable.decorate.call(this, decorators);
    }

    // Decorate for annotating how a class member should be composed later.
    // This takes a decorator that will be run at *composition* time.
    // For now, this can only be applied to methods.

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
     * This method can be statically invoked to extend plain objects:
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
      // We return a decorator that just adds the decorator given above to the
      // member.
      return function (target, key, descriptor) {
        // TODO: Use a Symbol instead of a string property name to save this.
        descriptor.value._compositionRule = decorator;
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
 * All Composable-created objects keep references to the mixins that were
 * applied to create them. When a *named* mixin is applied to the prototype
 * chain, the resulting object (or, for a class, the class' prototype) will
 * have a new member with that name that points back to the same object.
 * That facility is useful when dealing with chains that have been extended
 * more than once, as an mixin's name is sufficient to retrieve a reference
 * to that point in the prototype chain.
 *
 * A single mixin can be applied to multiple prototype chains -- the name
 * refers to the prototype on *this particular prototype chain* that was added
 * for that mixin. This lets mixin/mixin code get back to its own
 * prototype, most often in combination with "super" (see below) in order to
 * invoke superclass behavior.
 */
Composable.prototype.Composable = Composable.prototype;

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
 *       if (this.Mixin.super.foo) {
 *         this.Mixin.super.foo.call(this); // Invoke superclass' foo()
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
  constructor: Composable.override,
  toString: Composable.override
};

function applyCompositionRules(obj) {
  var base = Object.getPrototypeOf(obj);
  Object.getOwnPropertyNames(obj).forEach(function (name) {
    if (name in base) {
      // Base also implements a member with the same name; need to combine.
      var descriptor = Object.getOwnPropertyDescriptor(obj, name);
      var rule = descriptor.value && descriptor.value._compositionRule;
      if (!rule) {
        // See if prototype chain has a rule for this member.
        rule = obj.compositionRules[name];
      }
      if (!rule) {
        rule = getDefaultCompositionRule(descriptor);
      }
      // "override" is a known no-op, so we don't bother trying to redefine the
      // property.
      if (rule && rule !== Composable.override) {
        rule(obj, name, descriptor);
        Object.defineProperty(obj, name, descriptor);
      }
    }
  });
}

/*
 * Copy the given properties/methods to the target.
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

  // Check whether the base and mixin are classes or plain objects.
  var baseIsClass = isClass(base);
  var mixinIsClass = isClass(mixin);

  // Check to see if the *mixin* has a base class/prototype of its own.
  var mixinBase = mixinIsClass ? Object.getPrototypeOf(mixin.prototype).constructor : Object.getPrototypeOf(mixin);
  if (mixinBase && mixinBase !== Function && mixinBase !== Object && mixinBase !== Object.prototype) {
    // The mixin itself derives from another class/object.
    // Recurse, and extend with the mixin's base first.
    base = _compose(base, mixinBase);
  }

  // Create the extended object we're going to return as a result.
  var result = undefined;
  if (baseIsClass) {
    // Create a subclass of base. Once WebKit supports HTMLElement as a real
    // class, we can just say:
    //
    //   class subclass extends base {}
    //
    // However, until that's resolved, we have to construct the class ourselves.
    result = function subclass() {};
    Object.setPrototypeOf(result, base);
    Object.setPrototypeOf(result.prototype, base.prototype);
  } else {
    // Create a plain object that simply uses the base as a prototype.
    result = Object.create(base);
  }

  var source = undefined;
  var target = undefined;
  if (baseIsClass && mixinIsClass) {
    // Properties defined by Function.
    // We'd prefer to get by interrogating Function itself, but WebKit functions
    // have some properties (arguments and caller) which are not returned by
    // Object.getOwnPropertyNames(Function).
    var FUNCTION_PROPERTIES = ['arguments', 'caller', 'length', 'name', 'prototype'];
    // Extending a class with a class.
    // We'll copy instance members in a moment, but first copy static members.
    copyOwnProperties(mixin, result, FUNCTION_PROPERTIES);
    source = mixin.prototype;
    target = result.prototype;
  } else if (!baseIsClass && mixinIsClass) {
    // Extending a plain object with a class.
    // Copy prototype methods directly to result.
    source = mixin.prototype;
    target = result;
  } else if (baseIsClass && !mixinIsClass) {
    // Extending class with plain object.
    // Copy mixin to result prototype.
    source = mixin;
    target = result.prototype;
  } else {
    // Extending a plain object with a plain object.
    source = mixin;
    target = result;
  }
  copyOwnProperties(source, target, ['constructor']);

  applyCompositionRules(target);

  if (mixin.name) {
    // Use the mixin's name (usually the name of a class' constructor) to
    // save a reference back to the newly-created object in the prototype chain.
    target[mixin.name] = target;

    // Save a reference to the superclass/super-object. See the comments on
    // Composable's "super" property.
    target.super = baseIsClass ? base.prototype : base;
  }

  return result;
}

function getDefaultCompositionRule(descriptor) {
  if (typeof descriptor.value === 'function') {
    return Composable.rules.propagateFunction;
  } else if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
    // Property with getter and/or setter.
    return Composable.rules.propagateProperty;
  }
  return null;
}

// Return true if c is a JavaScript class.
// We use this test because, on WebKit, classes like HTMLElement are special,
// and are not instances of Function. To handle that case, we use a looser
// definition: an object is a class if it has a prototype, and that prototype
// has a constructor that is the original object. This condition holds true even
// for HTMLElement on WebKit.
function isClass(c) {
  return typeof c === 'function' || // Standard
  c.prototype && c.prototype.constructor === c; // HTMLElement in WebKit
}

},{"./CompositionRules":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeFunction = composeFunction;
exports.getPropertyDescriptor = getPropertyDescriptor;
exports.override = override;
exports.preferBaseResult = preferBaseResult;
exports.preferMixinResult = preferMixinResult;
exports.propagateFunction = propagateFunction;
exports.propagateProperty = propagateProperty;
/**
 * Standard composition rules
 */

// Take two functions and return a new composed function that invokes both.
// The composed function will return the result of the second function.
// This is not a rule, but a helper used by rules.
function composeFunction(function1, function2) {
  return function () {
    function1.apply(this, arguments);
    return function2.apply(this, arguments);
  };
}

// Like Object.getOwnPropertyDescriptor(), but walks up the prototype chain.
// This is needed by composition rules, which usually start out by getting
// the base implementation of a member they're composing.
// This is not a rule, but a helper used by rules.
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

// Combinator that causes a mixin method to override its base implementation.
// Since this the default behavior of the prototype chain, this is a no-op.
function override(target, key, descriptor) {}

// Compose methods, invoking base implementation first. If it returns a
// truthy result, that is returned. Otherwise, the mixin implementation's
// result is returned.
function preferBaseResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseImplementation = Object.getPrototypeOf(target)[key];
  descriptor.value = function () {
    return baseImplementation.apply(this, arguments) || mixinImplementation.apply(this, arguments);
  };
}

// Compose methods, invoking mixin implementation first. If it returns a
// truthy result, that is returned. Otherwise, the base implementation's
// result is returned.
function preferMixinResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseImplementation = Object.getPrototypeOf(target)[key];
  descriptor.value = function () {
    return mixinImplementation.apply(this, arguments) || baseImplementation.apply(this, arguments);
  };
}

// Default rule for composing methods: invoke base first, then mixin.
function propagateFunction(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseImplementation = Object.getPrototypeOf(target)[key];
  descriptor.value = composeFunction(baseImplementation, mixinImplementation);
}

// Default rule for composing properties.
// We only compose setters, which invoke base first, then mixin.
// A defined mixin getter overrides a base getter.
// Note that, because of the way property descriptors work, if the mixin only
// defines a setter, but not a getter, we have to supply a default getter that
// invokes the base getter. Similarly, if the mixin just defines a getter,
// we have to supply a default setter.
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('../extensible/Composable');

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

},{"../extensible/Composable":17}],22:[function(require,module,exports){
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

},{"./AttributeMarshalling":19,"./AutomaticNodeFinding":20,"./ComposableElement":21,"./TemplateStamping":23}],23:[function(require,module,exports){
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

},{}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL0xpc3RCb3gvTGlzdEJveC5qcyIsImNvbXBvbmVudHMvTGlzdEJveC9TdXBlci5qcyIsImNvbXBvbmVudHMvTGlzdEJveC9UZXN0LmpzIiwibWl4aW5zL0NoaWxkcmVuQ29udGVudC5qcyIsIm1peGlucy9DbGlja1NlbGVjdGlvbi5qcyIsIm1peGlucy9Db250ZW50SXRlbXMuanMiLCJtaXhpbnMvRGlyZWN0aW9uU2VsZWN0aW9uLmpzIiwibWl4aW5zL0dlbmVyaWMuanMiLCJtaXhpbnMvSXRlbVNlbGVjdGlvbi5qcyIsIm1peGlucy9JdGVtc0FjY2Vzc2libGUuanMiLCJtaXhpbnMvS2V5Ym9hcmQuanMiLCJtaXhpbnMvS2V5Ym9hcmREaXJlY3Rpb24uanMiLCJtaXhpbnMvS2V5Ym9hcmRQYWdpbmcuanMiLCJtaXhpbnMvS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24uanMiLCJtaXhpbnMvU2VsZWN0aW9uSGlnaGxpZ2h0LmpzIiwibWl4aW5zL1NlbGVjdGlvblNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2UvZXh0ZW5zaWJsZS9Db21wb3NhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9leHRlbnNpYmxlL0NvbXBvc2l0aW9uUnVsZXMuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9BdHRyaWJ1dGVNYXJzaGFsbGluZy5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL0F1dG9tYXRpY05vZGVGaW5kaW5nLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvQ29tcG9zYWJsZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9FbGVtZW50QmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL1RlbXBsYXRlU3RhbXBpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDcUJxQixPQUFPO1lBQVAsT0FBTzs7V0FBUCxPQUFPOzBCQUFQLE9BQU87O2tFQUFQLE9BQU87OztlQUFQLE9BQU87Ozs7d0JBa0JGLEFBQ3RCO2FBQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7S0FDOUI7Ozt3QkFDdUIsQUFDdEI7YUFBTyxJQUFJLENBQUM7S0FDYjs7O3dCQUVjLEFBQ2I7bThCQXlDRTtLQUNIOzs7U0FwRWtCLE9BQU87R0FBUyxzQkFBWSxPQUFPLDBXQWVyRDs7a0JBZmtCLE9BQU87O0FBeUU1QixRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDeEYvQixLQUFLO1dBQUwsS0FBSzswQkFBTCxLQUFLOzs7ZUFBTCxLQUFLOzs7Ozs4QkFJZCxTQUFTLEVBQUUsTUFBTSxFQUFFLEFBQzNCO1VBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQUFDbkM7VUFBSSxJQUFJLEVBQUUsQUFDUjtZQUFJLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQUMsQUFDdkMsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztPQUMvQjtLQUNGOzs7NkJBRVEsU0FBUyxFQUFFLFFBQVEsRUFBRSxBQUU1Qjs7VUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxBQUN0RDtVQUFJLElBQUksRUFBRSxBQUNSO2VBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN4QjtLQUNGOzs7NkJBRVEsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQUFFbkM7O1VBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQUFDdEQ7VUFBSSxJQUFJLEVBQUUsQUFDUjtZQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztPQUN4QjtLQUNGOzs7U0ExQmtCLEtBQUs7OztrQkFBTCxLQUFLOzs7Ozs7OztBQ04xQixTQUFTLEtBQUssR0FBRyxBQUNmO1NBQU8sQ0FBQyxHQUFHLGlCQUFpQixDQUFDO0NBQzlCOztrQkFFYyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNPQyxlQUFlO1dBQWYsZUFBZTswQkFBZixlQUFlOzs7ZUFBZixlQUFlOztzQ0FFaEI7Ozs7OztBQUloQixnQkFBVSxDQUFDO2VBQU0sTUFBSyxjQUFjLEVBQUU7T0FBQSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUN6Qzs7cUNBNENnQixBQUNmO1VBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxBQUN2QztVQUFJLFNBQVMsRUFBRSxBQUNiO1lBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLEFBQzdDO2lCQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxBQUNIO2lCQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2hDOzs7Ozs7Ozs7Ozs7OztBQUNGOzt3QkFZYSxBQVFaOzs7Ozs7OzthQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7OztTQWhGa0IsZUFBZTs7O2tCQUFmLGVBQWU7QUFrRm5DOzs7Ozs7QUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdkZtQixjQUFjO1dBQWQsY0FBYzswQkFBZCxjQUFjOzs7ZUFBZCxjQUFjOztzQ0FFZjs7Ozs7Ozs7OztBQVFoQixVQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUEsS0FBSyxFQUFJLEFBQzFDO29CQUFZLFFBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQzs7OztBQUFDLEFBSWpDLGFBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztPQUN6QixDQUFDLENBQUM7Ozs7OztBQUNKOztTQWpCa0IsY0FBYzs7Ozs7Ozs7a0JBQWQsY0FBYztBQTRCbkMsU0FBUyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxBQUNyQztNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQUFDL0Q7TUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLEFBQ2Q7V0FBTyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7R0FDL0I7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzlCb0IsWUFBWTtXQUFaLFlBQVk7MEJBQVosWUFBWTs7O2VBQVosWUFBWTs7bUNBRWhCLElBQUksRUFBRSxRQUFRLEVBQUUsQUFDN0I7VUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdDOzs7cUNBRWdCLEFBQ2Y7VUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFDbkI7VUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzs7Ozs7Ozs7OztBQUNyQjs7Z0NBU1csSUFBSSxFQUFFLEFBQ2hCO2FBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7QUFDakM7OzhCQUtTLElBQUksRUFBRSxFQUFFOzs7bUNBRUg7Ozs7QUFHYixVQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSSxBQUN6QjtZQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEFBSTFCOzs7O2dCQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxBQUNyQjtjQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO09BQ0YsQ0FBQyxDQUFDLEFBRUg7O1VBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxBQUN2QztVQUFJLFNBQVMsRUFBRSxBQUNiO1lBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLGVBQWUsRUFBRSxBQUMzQztpQkFBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsQUFDSDtpQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNoQzs7Ozs7Ozs7Ozs7QUFDRjs7d0JBU1csQUFDVjtVQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFLEFBQ3ZCO1lBQUksQ0FBQyxNQUFNLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3JELEFBQ0Q7YUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7U0E3RGtCLFlBQVk7Ozs7OztrQkFBWixZQUFZO0FBb0VqQyxTQUFTLHVCQUF1QixDQUFDLEtBQUssRUFBRSxBQUN0QztNQUFJLGFBQWEsR0FBRyxDQUNsQixNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxVQUFVLENBQ1gsQ0FBQyxBQUNGO1NBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVMsSUFBSSxFQUFFLEFBQzFDO1dBQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNyRSxDQUFDLENBQUM7Ozs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM5RW9CLGtCQUFrQjtXQUFsQixrQkFBa0I7MEJBQWxCLGtCQUFrQjs7O2VBQWxCLGtCQUFrQjs7NkJBRTVCLEFBQ1A7YUFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDMUI7Ozs0QkFFTyxBQUNOO2FBQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzFCOzs7NkJBRVEsQUFDUDthQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUM5Qjs7OzhCQUVTLEFBQ1I7YUFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDMUI7Ozs4QkFFUyxBQUNSO2FBQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzNCOzs7MkJBRU0sQUFDTDthQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7QUFDOUI7O2tDQUdhLEVBQUU7OztpQ0FDSCxFQUFFOzs7aUNBQ0YsRUFBRTs7O3FDQUNFLEVBQUU7OztTQTlCQSxrQkFBa0I7OztrQkFBbEIsa0JBQWtCOztBQWlDdkMscUJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsQUFDckQ7YUFBVyxFQUFFLHFCQUFXLElBQUksQ0FBQyxxQkFBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQUFDL0Q7WUFBVSxFQUFFLHFCQUFXLElBQUksQ0FBQyxxQkFBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQUFDOUQ7WUFBVSxFQUFFLHFCQUFXLElBQUksQ0FBQyxxQkFBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQUFDOUQ7Z0JBQWMsRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0NBQ25FLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN0QmtCLE9BQU87V0FBUCxPQUFPOzBCQUFQLE9BQU87OztlQUFQLE9BQU87O3NDQUVSLEFBQ2hCO1VBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQUNyRDs7d0JBYWEsQUFDWjthQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7OztBQUN0Qix3QkFJVyxLQUFLLEVBQUUsQUFDakI7VUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQUFDN0I7YUFBSyxHQUFJLEtBQUssS0FBSyxPQUFPLEFBQUMsQ0FBQztPQUM3QixBQUNEO1VBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEFBQ3RCO1VBQUksS0FBSyxLQUFLLEtBQUssRUFBRSxBQUVuQjs7WUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDdkMsTUFBTSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQUFFeEI7O1lBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7T0FDakMsTUFBTSxBQUVMOztZQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztPQUNsQztLQUNGOzs7U0F0Q2tCLE9BQU87OztrQkFBUCxPQUFPO0FBd0MzQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDM0NtQixhQUFhO1dBQWIsYUFBYTswQkFBYixhQUFhOzs7ZUFBYixhQUFhOzs7O21DQUdqQixJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7Ozs4QkFnQnZCLElBQUksRUFBRSxBQUNkO1VBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdkQ7OzttQ0FFYyxBQUNiO1VBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxBQUNsRDtVQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsQUFFYjs7WUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFDekI7WUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQUFHMUI7OztvQkFBVSxDQUFDLENBQUEsWUFBVyxBQUNwQjsyQkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQ3ZCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDZjtPQUNGOzs7Ozs7Ozs7OztBQUNGOzs7Ozs7OztrQ0E4RmEsQUFDWjthQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7QUFDN0I7Ozs7Ozs7O2lDQXFCWSxBQUNYO2FBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0FBQ2pEOztpQ0FPWSxBQUNYO2FBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7QUFDbEQ7O3FDQU9nQixBQUNmO2FBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2xEOzs7d0JBeEttQixBQUNsQjthQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7S0FDNUI7c0JBQ2lCLGFBQWEsRUFBRSxBQUMvQjtVQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUNyQzs7O3dCQUV1QixBQUN0QjthQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztLQUNoQztzQkFDcUIsaUJBQWlCLEVBQUUsQUFDdkM7VUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO0tBQzdDOzs7d0JBNEJtQixBQUNsQjtVQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEFBRXJDOztVQUFJLFlBQVksSUFBSSxJQUFJLEVBQUUsQUFDeEI7ZUFBTyxDQUFDLENBQUMsQ0FBQzs7OztBQUNYLEFBR0QsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7Ozs7O0FBQUMsQUFLM0MsYUFBTyxLQUFLLENBQUM7S0FDZDtzQkFFaUIsS0FBSyxFQUFFLEFBQ3ZCO1VBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQUFDdkI7VUFBSSxJQUFJLFlBQUEsQ0FBQyxBQUNUO1VBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxBQUNuQztZQUFJLEdBQUcsSUFBSSxDQUFDO09BQ2IsTUFBTSxBQUNMO1lBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDckIsQUFDRDtVQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUV6Qjs7VUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEFBQ3ZDO1VBQUksU0FBUyxFQUFFLEFBQ2I7WUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsd0JBQXdCLEVBQUUsQUFDcEQ7aUJBQU8sRUFBRSxJQUFJLEFBQ2I7Z0JBQU0sRUFBRSxBQUNOO3lCQUFhLEVBQUUsS0FBSyxBQUNwQjtpQkFBSyxFQUFFO0FBQUssV0FDYjtTQUNGLENBQUMsQ0FBQyxBQUNIO2lCQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2hDO0tBQ0Y7Ozt3QkFFa0IsQUFDakI7YUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDOzs7Ozs7Ozs7OztBQUMzQix3QkFTZ0IsSUFBSSxFQUFFLEFBQ3JCO1VBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQUFDdEM7VUFBSSxZQUFZLEVBQUUsQUFFaEI7O1lBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQzFDLEFBQ0Q7VUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsQUFDMUI7VUFBSSxJQUFJLEVBQUUsQUFDUjtZQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7QUFDakMsQUFJRCxVQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEFBQ25DOytCQUF5QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxBQUV2Qzs7VUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEFBQ3ZDO1VBQUksU0FBUyxFQUFFLEFBQ2I7WUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsdUJBQXVCLEVBQUUsQUFDbkQ7aUJBQU8sRUFBRSxJQUFJLEFBQ2I7Z0JBQU0sRUFBRSxBQUNOO3dCQUFZLEVBQUUsSUFBSSxBQUNsQjt3QkFBWSxFQUFFLFlBQVksQUFDMUI7aUJBQUssRUFBRTtBQUFJLFdBQ1o7U0FDRixDQUFDLENBQUMsQUFDSDtpQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNoQztLQUNGOzs7d0JBaUJ1QixBQUN0QjthQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztLQUNoQztzQkFDcUIsaUJBQWlCLEVBQUUsQUFDdkM7VUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLEFBQzVDO3FCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7OztTQWxKa0IsYUFBYTs7Ozs7OztrQkFBYixhQUFhO0FBcUxsQyxTQUFTLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQUFDaEM7TUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQUFDdEU7V0FBTyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7R0FDM0I7Ozs7O0FBQ0YsQUFJRCxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEFBQ25DO01BQUksWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQUFDMUU7TUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxBQUMxQztNQUFJLGFBQWEsS0FBSyxZQUFZLEVBQUUsQUFDbEM7V0FBTyxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsQUFDckM7V0FBTyxJQUFJLENBQUM7R0FDYixNQUFNLEFBQ0w7V0FBTyxLQUFLLENBQUM7R0FDZDs7Ozs7QUFDRixBQUlELFNBQVMseUJBQXlCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxBQUNqRDtNQUFJLGFBQWEsWUFBQSxDQUFDLEFBQ2xCO01BQUksaUJBQWlCLFlBQUEsQ0FBQyxBQUN0QjtNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEFBQzFCO01BQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxBQUN2QztpQkFBYSxHQUFHLEtBQUssQ0FBQyxBQUN0QjtxQkFBaUIsR0FBRyxLQUFLLENBQUM7R0FDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLEFBRzdCOzs7aUJBQWEsR0FBRyxJQUFJLENBQUMsQUFDckI7cUJBQWlCLEdBQUcsSUFBSSxDQUFDO0dBQzFCLE1BQU0sQUFFTDs7cUJBQWlCLEdBQUksS0FBSyxHQUFHLENBQUMsQUFBQyxDQUFDLEFBQ2hDO2lCQUFhLEdBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxBQUFDLENBQUM7R0FDNUMsQUFDRDtTQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxBQUN0QztTQUFPLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1T0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztJQUVLLGVBQWU7V0FBZixlQUFlOzBCQUFmLGVBQWU7OztlQUFmLGVBQWU7O21DQUVuQixJQUFJLEVBQUUsUUFBUSxFQUFFLEFBQzdCO1VBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQzdDO1VBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQUFDckM7VUFBSSxNQUFNLEVBQUUsQUFDVjtZQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQ3RFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Y7O3NDQXVDaUIsQUFDaEI7VUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEFBQ3ZDO2VBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFBQyxBQWMxQyxVQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBRSxDQUFDLEFBQy9DO1VBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxHQUN2QixHQUFHLEdBQUcsU0FBUyxHQUFHLFFBQVEsR0FDMUIsU0FBUyxDQUFDO0tBQ2Y7Ozs4QkFFUyxJQUFJLEVBQUUsQUFDZDtVQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7Ozs7QUFBQyxBQUlwQyxVQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxBQUM1QjtZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7T0FDdEQ7S0FDRjs7O3NCQUVnQixJQUFJLEVBQUUsQUFFckI7O1VBQUksSUFBSSxJQUFJLElBQUksRUFBRSxBQUNoQjtZQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUM7T0FDakU7S0FDRjs7O1NBcEZrQixlQUFlOzs7a0JBQWYsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FmLFFBQVE7V0FBUixRQUFROzBCQUFSLFFBQVE7OztlQUFSLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FrRFQ7dUJBQ2hCOztVQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUEsS0FBSyxFQUFJLEFBQ3hDO1lBQUksT0FBTyxHQUFHLE1BQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEFBQ2xDO1lBQUksT0FBTyxFQUFFLEFBQ1g7ZUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLEFBQ3ZCO2VBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtPQUNGLENBQUMsQ0FBQyxBQUNIO1VBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztBQUNsQzs7NEJBR08sS0FBSyxFQUFFLEVBQUU7OztTQTlERSxRQUFROzs7a0JBQVIsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBUixpQkFBaUI7V0FBakIsaUJBQWlCOzBCQUFqQixpQkFBaUI7OztlQUFqQixpQkFBaUI7Ozs7NkJBRzNCLEVBQUU7Ozs0QkFDSCxFQUFFOzs7NkJBQ0QsRUFBRTs7OzhCQUNELEVBQUU7Ozs4QkFDRixFQUFFOzs7MkJBQ0wsRUFBRTs7OzRCQUVELEtBQUssRUFBRSxBQUNiO1VBQUksT0FBTyxZQUFBLENBQUMsQUFDWjtjQUFRLEtBQUssQ0FBQyxPQUFPLEFBQ25CO2FBQUssRUFBRSxBQUNMOztpQkFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxBQUN2Qjs7QUFBTSxBQUNSLGFBQUssRUFBRSxBQUNMOztpQkFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxBQUN6Qjs7QUFBTSxBQUNSLGFBQUssRUFBRSxBQUNMOztpQkFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxBQUN4Qjs7QUFBTSxBQUNSLGFBQUssRUFBRSxBQUNMOztpQkFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxBQUN0RDs7QUFBTSxBQUNSLGFBQUssRUFBRSxBQUNMOztpQkFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxBQUN6Qjs7QUFBTSxBQUNSLGFBQUssRUFBRSxBQUNMOztpQkFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxBQUN0RDs7QUFBTSxPQUNULEFBQ0Q7YUFBTyxPQUFPLENBQUM7S0FDaEI7OztTQWpDa0IsaUJBQWlCOzs7a0JBQWpCLGlCQUFpQjs7QUFvQ3RDLHFCQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEFBQ3BEO1FBQU0sRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEFBQzFEO09BQUssRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEFBQ3pEO1FBQU0sRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEFBQzFEO1NBQU8sRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEFBQzNEO1NBQU8sRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEFBQzNEO01BQUksRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEFBQ3hEO1NBQU8sRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0NBQzdELENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNoQ2tCLGNBQWM7V0FBZCxjQUFjOzBCQUFkLGNBQWM7OztlQUFkLGNBQWM7OzRCQUV6QixLQUFLLEVBQUUsQUFDYjtVQUFJLE9BQU8sWUFBQSxDQUFDLEFBQ1o7Y0FBUSxLQUFLLENBQUMsT0FBTyxBQUNuQjthQUFLLEVBQUUsQUFDTDs7aUJBQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQUFDeEI7O0FBQU0sQUFDUixhQUFLLEVBQUUsQUFDTDs7aUJBQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQUFDMUI7O0FBQU0sT0FDVCxBQUNEO2FBQU8sT0FBTyxDQUFDOzs7Ozs7Ozs7QUFDaEI7OytCQU9VLEFBQ1Q7YUFBTyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7QUFDbEM7OzZCQU9RLEFBQ1A7YUFBTyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25DOzs7U0EvQmtCLGNBQWM7Ozs7Ozs7Ozs7a0JBQWQsY0FBYztBQTBDbkMsU0FBUyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxBQUMvQztNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEFBQzFCO01BQUksS0FBSyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQUFDNUM7TUFBSSxHQUFHLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEFBQ3RDO01BQUksSUFBSSxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQUFDN0I7TUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEFBQzFDO01BQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxBQUNoRTtNQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQUFDZDtNQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsQUFDbEI7U0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLEFBQ2hCO1FBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUNwQjtRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxBQUMvQztRQUFJLFVBQVUsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxBQUM3QztRQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRSxBQUVuQzs7V0FBSyxHQUFHLElBQUksQ0FBQyxBQUNiO1lBQU07S0FDUCxBQUNEO0tBQUMsSUFBSSxJQUFJLENBQUM7R0FDWCxBQUVEOztNQUFJLENBQUMsS0FBSyxFQUFFLEFBQ1Y7V0FBTyxJQUFJLENBQUM7Ozs7Ozs7QUFDYixBQU1ELE1BQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEFBQ3ZDO01BQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQUFDdEQ7TUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEFBQzVEO01BQUksVUFBVSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxBQUMzRDtNQUFJLGFBQWEsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLEdBQUcsaUJBQWlCLENBQUMsQUFDeEY7TUFBSSxRQUFRLElBQUksVUFBVSxJQUFJLENBQUMsSUFDMUIsQ0FBQyxRQUFRLElBQUksYUFBYSxJQUFJLENBQUMsRUFBRSxBQUVwQzs7V0FBTyxDQUFDLENBQUM7R0FDVixNQUNJLEFBR0g7OztLQUFDLElBQUksSUFBSSxDQUFDLEFBQ1Y7V0FBTyxDQUFDLENBQUM7R0FDVjs7Ozs7O0FBQ0YsQUFLRCxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEFBRXhDOztNQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQUFDMUM7TUFBSSxDQUFDLFNBQVMsRUFBRSxBQUNkO1dBQU87Ozs7O0FBQ1IsQUFJRCxNQUFJLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUMsQUFDekU7TUFBSSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBRW5FOztNQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLEFBQzFDO01BQUksUUFBUSxDQUFDLEFBQ2I7TUFBSSxpQkFBaUIsSUFBSSxhQUFhLEtBQUssaUJBQWlCLEVBQUUsQUFHNUQ7OztRQUFJLEtBQUssR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxBQUN6RDtZQUFRLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDL0QsTUFDSSxBQUlIOzs7O1lBQVEsR0FBRyxpQkFBaUIsQ0FBQztHQUM5QixBQUVEOztNQUFJLENBQUMsUUFBUSxFQUFFLEFBR2I7OztZQUFRLEdBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEFBQUMsQ0FBQztHQUN0RCxBQUVEOztNQUFJLFFBQVEsS0FBSyxhQUFhLEVBQUUsQUFDOUI7V0FBTyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsQUFDakM7V0FBTyxJQUFJO0FBQUMsR0FDYixNQUNJLEFBQ0g7YUFBTyxLQUFLO0FBQUMsS0FDZDtDQUNGO0FBQ0QscUJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEFBQ2pEO1NBQU8sRUFBRSxxQkFBVyxJQUFJLENBQUMscUJBQVcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0NBQzdELENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDL0lrQix1QkFBdUI7V0FBdkIsdUJBQXVCOzBCQUF2Qix1QkFBdUI7OztlQUF2Qix1QkFBdUI7Ozs7Ozs7OzRCQU9sQyxLQUFLLEVBQUUsQUFDYjtVQUFJLE9BQU8sWUFBQSxDQUFDLEFBQ1o7VUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEFBRXZCOztjQUFRLEtBQUssQ0FBQyxPQUFPLEFBQ25CO2FBQUssQ0FBQyxBQUNKOzt5QkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEFBQ3RCO2lCQUFPLEdBQUcsSUFBSSxDQUFDLEFBQ2Y7cUJBQVcsR0FBRyxLQUFLLENBQUMsQUFDcEI7O0FBQU0sQUFDUixhQUFLLEVBQUUsQUFDTDs7aUJBQU8sR0FBRyxJQUFJLENBQUMsQUFDZjs7QUFBTSxBQUNSLEFBQ0U7Y0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFDaEQsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLGNBQWMsQUFDbkM7a0NBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDOUQsQUFDRDtxQkFBVyxHQUFHLEtBQUs7QUFBQyxPQUN2QixBQUVEOztVQUFJLFdBQVcsRUFBRSxBQUNmO3dCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO09BQ3hCLEFBRUQ7O2FBQU8sT0FBTyxDQUFDOzs7Ozs7Ozs7O0FBQ2hCOzs2Q0FRd0IsTUFBTSxFQUFFLEFBQy9CO1VBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxBQUN6QztlQUFPO09BQ1IsQUFDRDtVQUFJLEtBQUssR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQUFDdkQ7VUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLEFBQ2Q7WUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7T0FDNUI7S0FDRjs7O1NBakRrQix1QkFBdUI7OztrQkFBdkIsdUJBQXVCOztBQW9ENUMscUJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsQUFDMUQ7U0FBTyxFQUFFLHFCQUFXLElBQUksQ0FBQyxxQkFBVyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Q0FDN0QsQ0FBQzs7OztBQUFDLEFBS0gsSUFBTSx1QkFBdUIsR0FBRyxJQUFJOzs7QUFBQyxBQUlyQyxTQUFTLDRCQUE0QixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQUFDckQ7TUFBSSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxBQUNwRDtNQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEFBQ2pDO09BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQUFDaEQ7UUFBSSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFDMUM7UUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsS0FBSyxNQUFNLEVBQUUsQUFDdEQ7YUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGLEFBQ0Q7U0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7QUFDWCxBQUlELFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEFBQ3BDO01BQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQUFDOUI7UUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxBQUMxQjtXQUFPLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSSxBQUM3QztVQUFJLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQUFDMUM7YUFBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDM0IsQ0FBQyxDQUFDO0dBQ0osQUFDRDtTQUFPLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztDQUNsQzs7QUFFRCxTQUFTLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQUFDaEM7TUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQUFDcEU7TUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEFBQ2Q7V0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQ25FLEFBQ0Q7U0FBTyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxBQUN2RDtTQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztDQUM3Qjs7QUFFRCxTQUFTLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQUFDM0M7TUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQUFDeEM7U0FBTyxDQUFDLFlBQVksR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEFBQ25EO1NBQU8sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQUFDdkQ7a0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDM0I7O0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQUFDbkM7TUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFLEFBQzFCO2dCQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEFBQ3JDO1dBQU8sQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0dBQ2hDO0NBQ0Y7O0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQUFDakM7U0FBTyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQUFDMUI7b0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDN0I7O0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQUFDakM7b0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQUFDNUI7U0FBTyxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsWUFBTSxBQUN4QztvQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUMzQixFQUFFLHVCQUF1QixDQUFDLENBQUM7Q0FDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNoSW9CLGtCQUFrQjtXQUFsQixrQkFBa0I7MEJBQWxCLGtCQUFrQjs7O2VBQWxCLGtCQUFrQjs7bUNBRXRCLElBQUksRUFBRSxRQUFRLEVBQUUsQUFDN0I7VUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUMsQUFDekQ7VUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUM7S0FDcEQ7OztTQUxrQixrQkFBa0I7OztrQkFBbEIsa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQWxCLGVBQWU7V0FBZixlQUFlOzBCQUFmLGVBQWU7OztlQUFmLGVBQWU7Ozs7Ozs7Ozs7Ozs7dUNBbUJmLElBQUksRUFBRSxBQUt2Qjs7Ozs7VUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEFBQ3ZDO1VBQUksQ0FBQyxTQUFTLEVBQUUsQUFDZDtlQUFPO09BQ1IsQUFFRDs7VUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQUFDNUU7VUFBSSxhQUFhLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZOztBQUFDLEFBRW5ELFVBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxBQUNoRTtVQUFJLGFBQWEsR0FBRyxZQUFZLEVBQUUsQUFFaEM7O2lCQUFTLENBQUMsU0FBUyxJQUFJLGFBQWEsR0FBRyxZQUFZLENBQUM7T0FDckQsTUFDSSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLEFBRXpDOztpQkFBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7T0FDbEM7S0FDRjs7O3NCQXZDZ0IsSUFBSSxFQUFFLEFBQ3JCO1VBQUksSUFBSSxFQUFFLEFBRVI7O1lBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUMvQjtLQUNGOzs7U0FQa0IsZUFBZTs7O2tCQUFmLGVBQWU7Ozs7Ozs7Ozs7Ozs7OztJQ0Z4QixnQkFBZ0I7Ozs7OztJQUVQLFVBQVU7V0FBVixVQUFVOzBCQUFWLFVBQVU7OztlQUFWLFVBQVU7OzZCQTBDcEIsVUFBVSxFQUFFO0FBQ25CLGdCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQW5CeUI7d0NBQVIsTUFBTTtBQUFOLGNBQU07Ozs7Ozs7QUFLdEIsYUFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNyQzs7OzZCQUVlLFVBQVUsRUFBRTtBQUMxQixXQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtBQUMxQixZQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsWUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM1RCxpQkFBUyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakMsY0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO09BQzlDO0tBQ0Y7Ozt5QkFTVyxTQUFTLEVBQUU7OztBQUdyQixhQUFPLFVBQVMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7O0FBRXZDLGtCQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztPQUMvQyxDQUFBO0tBQ0Y7OztTQXhEa0IsVUFBVTs7Ozs7Ozs7a0JBQVYsVUFBVTtBQWlFL0IsVUFBVSxDQUFDLEtBQUssR0FBRyxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsQUFrQnBDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLEFBdUJ2RCxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUzs7O0FBQUMsQUFJOUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRztBQUN0QyxhQUFXLEVBQUUsVUFBVSxDQUFDLFFBQVE7QUFDaEMsVUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO0NBQzlCLENBQUM7O0FBR0YsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7QUFDbEMsTUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QyxRQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQzlDLFFBQUksSUFBSSxJQUFJLElBQUksRUFBRTs7QUFFaEIsVUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxVQUFJLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7QUFDakUsVUFBSSxDQUFDLElBQUksRUFBRTs7QUFFVCxZQUFJLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO09BQ25DO0FBQ0QsVUFBSSxDQUFDLElBQUksRUFBRTtBQUNULFlBQUksR0FBRyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztPQUM5Qzs7O0FBQUEsQUFHRCxVQUFJLElBQUksSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLFFBQVEsRUFBRTtBQUN4QyxZQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM1QixjQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7T0FDOUM7S0FDRjtHQUNGLENBQUMsQ0FBQztDQUNKOzs7OztBQUFBLEFBTUQsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUE0QjtNQUExQixtQkFBbUIseURBQUcsRUFBRTs7QUFDakUsUUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNqRCxRQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDekMsVUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRCxZQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakQ7R0FDRixDQUFDLENBQUM7QUFDSCxTQUFPLE1BQU0sQ0FBQztDQUNmOzs7Ozs7QUFBQSxBQU9ELFNBQVMsUUFBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7OztBQUc1QixNQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsTUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQzs7O0FBQUMsQUFHbEMsTUFBSSxTQUFTLEdBQUcsWUFBWSxHQUMxQixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEdBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsTUFBSSxTQUFTLElBQ1QsU0FBUyxLQUFLLFFBQVEsSUFDdEIsU0FBUyxLQUFLLE1BQU0sSUFDcEIsU0FBUyxLQUFLLE1BQU0sQ0FBQyxTQUFTLEVBQUU7OztBQUdsQyxRQUFJLEdBQUcsUUFBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUNqQzs7O0FBQUEsQUFHRCxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsTUFBSSxXQUFXLEVBQUU7Ozs7Ozs7QUFPZixVQUFNLEdBQUcsU0FBUyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLFVBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFVBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7R0FDekQsTUFBTTs7QUFFTCxVQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM5Qjs7QUFFRCxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLE1BQUksV0FBVyxJQUFJLFlBQVksRUFBRTs7Ozs7QUFLL0IsUUFBTSxtQkFBbUIsR0FBRyxDQUMxQixXQUFXLEVBQ1gsUUFBUSxFQUNSLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxDQUNaOzs7QUFBQyxBQUdGLHFCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN0RCxVQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUN6QixVQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztHQUMzQixNQUFNLElBQUksQ0FBQyxXQUFXLElBQUksWUFBWSxFQUFFOzs7QUFHdkMsVUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDekIsVUFBTSxHQUFHLE1BQU0sQ0FBQztHQUNqQixNQUFNLElBQUksV0FBVyxJQUFJLENBQUMsWUFBWSxFQUFFOzs7QUFHdkMsVUFBTSxHQUFHLEtBQUssQ0FBQztBQUNmLFVBQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0dBQzNCLE1BQU07O0FBRUwsVUFBTSxHQUFHLEtBQUssQ0FBQztBQUNmLFVBQU0sR0FBRyxNQUFNLENBQUM7R0FDakI7QUFDRCxtQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7QUFFbkQsdUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTlCLE1BQUksS0FBSyxDQUFDLElBQUksRUFBRTs7O0FBR2QsVUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNOzs7O0FBQUMsQUFJNUIsVUFBTSxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7R0FDcEQ7O0FBRUQsU0FBTyxNQUFNLENBQUM7Q0FDZjs7QUFFRCxTQUFTLHlCQUF5QixDQUFDLFVBQVUsRUFBRTtBQUM3QyxNQUFJLE9BQU8sVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7QUFDMUMsV0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0dBQzNDLE1BQU0sSUFBSSxPQUFPLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUU7O0FBRXZGLFdBQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztHQUMzQztBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2I7Ozs7Ozs7O0FBQUEsQUFRRCxTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFDbEIsU0FBTyxPQUFPLENBQUMsS0FBSyxVQUFVO0FBQ3pCLEdBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEtBQUssQ0FBQyxBQUFDO0FBQUMsQ0FDcEQ7Ozs7Ozs7O1FDeFFlLGVBQWUsR0FBZixlQUFlO1FBV2YscUJBQXFCLEdBQXJCLHFCQUFxQjtRQWlCckIsUUFBUSxHQUFSLFFBQVE7UUFLUixnQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBWWhCLGlCQUFpQixHQUFqQixpQkFBaUI7UUFVakIsaUJBQWlCLEdBQWpCLGlCQUFpQjtRQWFqQixpQkFBaUIsR0FBakIsaUJBQWlCOzs7Ozs7OztBQXBFMUIsU0FBUyxlQUFlLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUNwRCxTQUFPLFlBQVc7QUFDaEIsYUFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDakMsV0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUN6QyxDQUFDO0NBQ0g7Ozs7OztBQUFBLEFBTU0sU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQy9DLE1BQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUQsTUFBSSxVQUFVLEVBQUU7QUFDZCxXQUFPLFVBQVUsQ0FBQztHQUNuQixNQUFNO0FBQ0wsUUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7OztBQUFDLEFBRzNDLFFBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7QUFDbEMsYUFBTyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDL0M7R0FDRjtBQUNELFNBQU8sU0FBUztBQUFDLENBQ2xCOzs7O0FBQUEsQUFJTSxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFOzs7OztBQUFBLEFBSzdDLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDeEQsTUFBSSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0FBQzNDLE1BQUksa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1RCxZQUFVLENBQUMsS0FBSyxHQUFHLFlBQVc7QUFDNUIsV0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUN6QyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ25ELENBQUE7Q0FDRjs7Ozs7QUFBQSxBQUtNLFNBQVMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7QUFDekQsTUFBSSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0FBQzNDLE1BQUksa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1RCxZQUFVLENBQUMsS0FBSyxHQUFHLFlBQVc7QUFDNUIsV0FBTyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUMxQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ2xELENBQUE7Q0FDRjs7O0FBQUEsQUFHTSxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0FBQ3pELE1BQUksbUJBQW1CLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUMzQyxNQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUQsWUFBVSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztDQUM3RTs7Ozs7Ozs7O0FBQUEsQUFTTSxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0FBQ3pELE1BQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsTUFBSSxjQUFjLEdBQUcscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RELE1BQUksVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRTs7QUFFM0QsY0FBVSxDQUFDLEdBQUcsR0FBRyxVQUFTLEtBQUssRUFBRTtBQUMvQixvQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3RDLENBQUM7R0FDSCxNQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN6QixRQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFOztBQUV6QyxnQkFBVSxDQUFDLEdBQUcsR0FBRyxZQUFXO0FBQzFCLGVBQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDdEMsQ0FBQztLQUNIOztBQUFBLEFBRUQsY0FBVSxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDdEU7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN6Rm9CLG9CQUFvQjtXQUFwQixvQkFBb0I7MEJBQXBCLG9CQUFvQjs7O2VBQXBCLG9CQUFvQjs7Ozs7OzZDQUtkLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOzs7QUFHakQsVUFBSSxZQUFZLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakQsVUFBSSxZQUFZLElBQUksSUFBSSxJQUFJLEVBQUUsWUFBWSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUEsQUFBQyxFQUFFO0FBQ3BFLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUM7T0FDL0I7S0FDRjs7O3NDQUVpQjs7O0FBQ2hCLFFBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQSxTQUFTLEVBQUk7QUFDNUMsY0FBSyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDM0UsQ0FBQyxDQUFDO0tBQ0o7OztTQWxCa0Isb0JBQW9COzs7OztrQkFBcEIsb0JBQW9CO0FBd0J6QyxTQUFTLHVCQUF1QixDQUFDLGFBQWEsRUFBRTtBQUM5QyxNQUFJLFlBQVksR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxVQUFBLENBQUM7V0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO0dBQUEsQ0FBQyxDQUFDO0FBQy9FLFNBQU8sWUFBWSxDQUFDO0NBQ3JCOzs7QUFBQSxBQUdELFNBQVMsdUJBQXVCLENBQUMsWUFBWSxFQUFFO0FBQzdDLE1BQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFVBQUEsQ0FBQztXQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtHQUFBLENBQUMsQ0FBQztBQUNoRyxTQUFPLGFBQWEsQ0FBQztDQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDaENvQixvQkFBb0I7V0FBcEIsb0JBQW9COzBCQUFwQixvQkFBb0I7OztlQUFwQixvQkFBb0I7O3NDQUVyQjs7O0FBQ2hCLFVBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixZQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNaLFlBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUQsVUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQUEsSUFBSSxFQUFJO0FBQ3BDLGNBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsZ0JBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNuQixDQUFDLENBQUM7T0FDSjtLQUNGOzs7U0FYa0Isb0JBQW9COzs7a0JBQXBCLG9CQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNNekMsSUFBSSxpQkFBaUIsR0FBRyxxQkFBVyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsdUJBQWE7Ozs7Ozs7QUFBQyxrQkFFMUQsaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNGMUIsV0FBVztZQUFYLFdBQVc7O1dBQVgsV0FBVzswQkFBWCxXQUFXOztrRUFBWCxXQUFXOzs7ZUFBWCxXQUFXOzs7O3dCQUdYLElBQUksRUFBRTtBQUNSLGFBQU8sQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLFNBQVMsVUFBSyxJQUFJLENBQUcsQ0FBQztLQUMzQzs7O1NBTEcsV0FBVzs7O2tCQVNGLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTzs7K0JBSS9DOztBQUVELFFBQVEsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2ZqQyxnQkFBZ0I7V0FBaEIsZ0JBQWdCOzBCQUFoQixnQkFBZ0I7OztlQUFoQixnQkFBZ0I7Ozs7Ozs7c0NBTWpCO0FBQ2hCLFVBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDN0IsVUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7O0FBRWhDLGdCQUFRLEdBQUcsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDbEQ7QUFDRCxVQUFJLFFBQVEsSUFBSSxtQkFBbUIsRUFBRTtBQUNuQywrQkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUNuQztBQUNELFVBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFO0FBQzVCLDBCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7T0FDOUM7OztBQUFBLEFBR0QsVUFBSSxRQUFRLEVBQUU7O0FBRVosWUFBSSxJQUFJLEdBQUcsbUJBQW1CLEdBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUN2QixZQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQUMsQUFDdEMsWUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hELFlBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDekI7S0FDRjs7O1NBNUJrQixnQkFBZ0I7Ozs7O2tCQUFoQixnQkFBZ0I7QUFrQ3JDLElBQU0sbUJBQW1CLEdBQUksT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLGdCQUFnQixLQUFLLFdBQVcsQUFBQzs7O0FBQUMsQUFJNUYsU0FBUywyQkFBMkIsQ0FBQyxTQUFTLEVBQUU7QUFDOUMsTUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7Ozs7QUFBQyxBQUlsRCxNQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLEtBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLFNBQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2hDLFlBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNqRDtBQUNELFNBQU8sUUFBUSxDQUFDO0NBQ2pCOzs7O0FBQUEsQUFJRCxTQUFTLHVCQUF1QixDQUFDLFFBQVEsRUFBRTtBQUN6QyxJQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQUEsV0FBVyxFQUFJO0FBQ3hFLFFBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkQsZUFBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0dBQ2xFLENBQUMsQ0FBQztDQUNKOzs7QUFBQSxBQUdELFNBQVMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUN6QyxlQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzVEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBiYXNpYy1saXN0LWJveFxuICovXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdlbGVtZW50LWJhc2Uvc3JjL0VsZW1lbnRCYXNlJztcbmltcG9ydCBTdXBlciBmcm9tICcuL1N1cGVyJztcbmltcG9ydCBDaGlsZHJlbkNvbnRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL0NoaWxkcmVuQ29udGVudCc7XG5pbXBvcnQgQ2xpY2tTZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0NsaWNrU2VsZWN0aW9uJztcbmltcG9ydCBDb250ZW50SXRlbXMgZnJvbSAnLi4vLi4vbWl4aW5zL0NvbnRlbnRJdGVtcyc7XG5pbXBvcnQgRGlyZWN0aW9uU2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9EaXJlY3Rpb25TZWxlY3Rpb24nO1xuaW1wb3J0IEdlbmVyaWMgZnJvbSAnLi4vLi4vbWl4aW5zL0dlbmVyaWMnO1xuaW1wb3J0IEl0ZW1TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0l0ZW1TZWxlY3Rpb24nO1xuaW1wb3J0IEl0ZW1zQWNjZXNzaWJsZSBmcm9tICcuLi8uLi9taXhpbnMvSXRlbXNBY2Nlc3NpYmxlJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmQnO1xuaW1wb3J0IEtleWJvYXJkRGlyZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZERpcmVjdGlvbic7XG5pbXBvcnQgS2V5Ym9hcmRQYWdpbmcgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkUGFnaW5nJztcbmltcG9ydCBLZXlib2FyZFByZWZpeFNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24nO1xuaW1wb3J0IFNlbGVjdGlvbkhpZ2hsaWdodCBmcm9tICcuLi8uLi9taXhpbnMvU2VsZWN0aW9uSGlnaGxpZ2h0JztcbmltcG9ydCBTZWxlY3Rpb25TY3JvbGwgZnJvbSAnLi4vLi4vbWl4aW5zL1NlbGVjdGlvblNjcm9sbCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEJveCBleHRlbmRzIEVsZW1lbnRCYXNlLmNvbXBvc2UoXG4gICAgU3VwZXIsXG4gICAgQ2hpbGRyZW5Db250ZW50LFxuICAgIENsaWNrU2VsZWN0aW9uLFxuICAgIENvbnRlbnRJdGVtcyxcbiAgICBEaXJlY3Rpb25TZWxlY3Rpb24sXG4gICAgR2VuZXJpYyxcbiAgICBJdGVtU2VsZWN0aW9uLFxuICAgIEl0ZW1zQWNjZXNzaWJsZSxcbiAgICBLZXlib2FyZCxcbiAgICBLZXlib2FyZERpcmVjdGlvbixcbiAgICBLZXlib2FyZFBhZ2luZyxcbiAgICBLZXlib2FyZFByZWZpeFNlbGVjdGlvbixcbiAgICBTZWxlY3Rpb25IaWdobGlnaHQsXG4gICAgU2VsZWN0aW9uU2Nyb2xsXG4gICkge1xuXG4gIC8vIFN0dWIgZm9yIGNvbGxlY3RpdmVzIGZvciBub3dcbiAgZ2V0IGlubmVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzLiQuaXRlbXNDb250YWluZXI7XG4gIH1cbiAgZ2V0IG91dGVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICAgICAgfVxuXG4gICAgICBbdGFyZ2V0PVwiY2hpbGRcIl0ge1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC13ZWJraXQtZmxleDogMTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgI2l0ZW1zQ29udGFpbmVyIHtcbiAgICAgICAgLXdlYmtpdC1mbGV4OiAxO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDsgLyogZm9yIG1vbWVudHVtIHNjcm9sbGluZyAqL1xuICAgICAgfVxuXG4gICAgICAvKiBHZW5lcmljIGFwcGVhcmFuY2UgKi9cbiAgICAgIDpob3N0KFtnZW5lcmljPVwiXCJdKSB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pICNpdGVtc0NvbnRhaW5lciA6OmNvbnRlbnQgPiAqIHtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICBwYWRkaW5nOiAwLjI1ZW07XG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBpZD1cIml0ZW1zQ29udGFpbmVyXCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtbGlzdC1ib3gnLCBMaXN0Qm94KTtcbiIsIi8qXG4gKiBUaGVzZSBoZWxwZXJzIHByb2JhYmx5IHNob3VsZCBnbyBpbiBFeHRlbnNpYmxlLlxuICogQmVjYXVzZSB0aGlzIHByb3RvdHlwZSBpcyB0aGUgZmlyc3Qgc2V0IG9mIGNvbXBvbmVudHMgdGhhdCBuZWVkIHRoZXNlXG4gKiBoZWxwZXJzLCB0aGV5J3JlIGhlcmUgZm9yIG5vdy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBlciB7XG5cbiAgLy8gQXMgb2YgMTEvMy8yMDE1LCBTYWZhcmkgOSBkb2Vzbid0IHlldCBzdXBwb3J0IEVTNiBcIi4uLlwiIHNwcmVhZCBvcGVyYXRvci5cbiAgLy8gc3VwZXJDYWxsKHByb3RvdHlwZSwgbWV0aG9kLCAuLi5hcmdzKSB7XG4gIHN1cGVyQ2FsbChwcm90b3R5cGUsIG1ldGhvZCkge1xuICAgIGxldCBiYXNlID0gcHJvdG90eXBlLnN1cGVyW21ldGhvZF07XG4gICAgaWYgKGJhc2UpIHtcbiAgICAgIGxldCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpOyAvLyBGb3IgU2FmYXJpIDlcbiAgICAgIHJldHVybiBiYXNlLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHN1cGVyR2V0KHByb3RvdHlwZSwgcHJvcGVydHkpIHtcbiAgICAvLyBUT0RPOiBTdGFuZGFyZHMtY29tcGxpYW50IHdheSB0byBmaW5kIGdldHRlci5cbiAgICBsZXQgYmFzZSA9IHByb3RvdHlwZS5zdXBlci5fX2xvb2t1cEdldHRlcl9fKHByb3BlcnR5KTtcbiAgICBpZiAoYmFzZSkge1xuICAgICAgcmV0dXJuIGJhc2UuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzdXBlclNldChwcm90b3R5cGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIC8vIFRPRE86IFN0YW5kYXJkcy1jb21wbGlhbnQgd2F5IHRvIGZpbmQgc2V0dGVyLlxuICAgIGxldCBiYXNlID0gcHJvdG90eXBlLnN1cGVyLl9fbG9va3VwU2V0dGVyX18ocHJvcGVydHkpO1xuICAgIGlmIChiYXNlKSB7XG4gICAgICBiYXNlLmNhbGwodGhpcywgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJmdW5jdGlvbiBncmVldCgpIHtcbiAgY29uc29sZS5sb2coYEhlbGxvLCB3b3JsZC5gKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ3JlZXQ7XG4iLCIvKipcbiAqIExldHMgYSBjb21wb25lbnQgY29sbGVjdGl2ZSB0YWtlcyBhcyBpdHMgY29udGVudCB0aGUgY2hpbGRyZW4gb2YgdGhlXG4gKiBpbm5lcm1vc3QgYXNwZWN0LlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWNoaWxkcmVuLWNvbnRlbnRcbiAqXG4gKi9cblxuLy8gVE9ETzogRG9uJ3QgcmVzcG9uZCB0byBjaGFuZ2VzIGluIGF0dHJpYnV0ZXMsIG9yIGF0IGxlYXN0IG9mZmVyIHRoYXQgYXMgYW5cbi8vIG9wdGlvbi5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hpbGRyZW5Db250ZW50IHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gVW50aWwgd2UgaGF2ZSBjb250ZW50IG9ic2VydmluZyBhZ2FpbiwgZm9yY2UgYSBjYWxsIHRvIGNvbnRlbnRDaGFuZ2VkKCkuXG4gICAgLy8gSEFDSzogRG8gdGhpcyBhc3luY2hyb25vdXNseSwgc28gb3RoZXIgbWl4aW5zIGhhdmUgYSBjaGFuY2UgdG8gc2V0IHVwXG4gICAgLy8gYmVmb3JlIHRoaXMgY2FsbC5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY29udGVudENoYW5nZWQoKSk7XG4gIH1cblxuICAvLyBUT0RPOiBXYWl0IHRvIG9ic2VydmUgY2hhbmdlcyB1bnRpbCB3ZSBoYXZlIGEgc2hhZG93IERPTSBob3N0LiBSaWdodFxuICAvLyBub3csIHRoZSBpbml0aWFsIGNvbGxlY3RpdmVDaGFuZ2VkIGNhbGwgY2FuIGhhcHBlbiB0b28gZWFybHkuXG4gIC8vIFRPRE86IEhhbmRsZSBjYXNlIHdoZXJlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgb3V0IG9mIERPTSwgdGhlblxuICAvLyBhdHRhY2hlZC5cbiAgLy8gY29sbGVjdGl2ZUNoYW5nZWQoKSB7XG4gIC8vICAgLy8gY29uc29sZS5sb2codGhpcy5sb2NhbE5hbWUgKyBcIiBjb2xsZWN0aXZlQ2hhbmdlZDogXCIgKyB0aGlzLmNvbGxlY3RpdmUuYXNwZWN0cy5sZW5ndGgpO1xuICAvLyAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmNvbGxlY3RpdmUuaW5uZXJtb3N0RWxlbWVudDtcbiAgLy8gICBsZXQgaW5uZXJtb3N0SG9zdCA9IEJhc2ljLkNvbnRlbnRIZWxwZXJzLmdldEhvc3QoaW5uZXJtb3N0KTtcbiAgLy9cbiAgLy8gICAvLyBPcHRpbWl6ZSBmb3IgdGhlIGNhc2Ugd2hlcmUgdGhlIGNvbGxlY3RpdmUncyBjaGFuZ2VkLCBidXQgaXRzXG4gIC8vICAgLy8gaW5uZXJtb3N0IGFzcGVjdCBpcyBzdGlsbCB0aGUgc2FtZS4gSW4gdGhhdCBjYXNlLCB3ZSBkb24ndCB3YW50IHRvXG4gIC8vICAgLy8gYm90aGVyIHRlYXJpbmcgZG93biBhbmQgdGhlbiByZWNyZWF0aW5nIG91ciBjb250ZW50Q2hhbmdlZCBoYW5kbGVyLlxuICAvLyAgIC8vIFRPRE86IFRoaXMgY3VycmVudGx5IG9ubHkgdHJhY2tzIG9uZSBsZXZlbCBvZiBob3N0LiBGb3Igcm9idXN0bmVzcyxcbiAgLy8gICAvLyB0aGlzIHNob3VsZCB0cmFjayB0aGUgY2hhaW4gb2YgaG9zdHMuXG4gIC8vICAgaWYgKGlubmVybW9zdCA9PT0gdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3RcbiAgLy8gICAgICAgJiYgaW5uZXJtb3N0SG9zdCA9PT0gdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RIb3N0KSB7XG4gIC8vICAgICAvLyBXZSBzaG91bGQgYWxyZWFkeSBiZSBvYnNlcnZpbmcgY2hhbmdlcyBvbiB0aGUgaW5uZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSBjb250ZW50IGhhc24ndCBhY3R1YWxseSBjaGFuZ2VkLCB3ZSB3YW50IHRvIGdpdmUgdGhlXG4gIC8vICAgICAvLyBuZXcgYXNwZWN0cyBhIGNoYW5jZSB0byByZXNwb25kIHRvIGNvbnRlbnRDaGFuZ2VkLlxuICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLmNvbnRlbnRDaGFuZ2VkKCk7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIC8vIEEgbmV3IGFzcGVjdCBpcyBub3cgaW5uZXJtb3N0LlxuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCAmJiB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdC5fY29udGVudENoYW5nZU9ic2VydmVyKSB7XG4gIC8vICAgICAvLyBTdG9wIG9ic2VydmluZyBjaGFuZ2VzIG9uIHRoZSBvbGQgaW5uZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwic3RvcHBpbmcgb2JzZXJ2YXRpb24gb2YgY2hhbmdlcyBvbiBvbGQgaW5uZXJtb3N0IGFzcGVjdFwiKTtcbiAgLy8gICAgIEJhc2ljLkNvbnRlbnRIZWxwZXJzLm9ic2VydmVDb250ZW50Q2hhbmdlcyh0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCwgbnVsbCk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIEJhc2ljLkNvbnRlbnRIZWxwZXJzLm9ic2VydmVDb250ZW50Q2hhbmdlcyhpbm5lcm1vc3QsIGZ1bmN0aW9uKCkge1xuICAvLyAgICAgLy8gUmVzZXQgbWVtb2l6ZWQgY29udGVudC5cbiAgLy8gICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICAvL1xuICAvLyAgICAgLy8gTGV0IGNvbGxlY3RpdmUga25vdyBjb250ZW50IGhhcyBjaGFuZ2VkLlxuICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLmNvbnRlbnRDaGFuZ2VkKCk7XG4gIC8vICAgfS5iaW5kKHRoaXMpKTtcbiAgLy9cbiAgLy8gICB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCA9IGlubmVybW9zdDtcbiAgLy8gICB0aGlzLl9wcmV2aW91c0lubmVybW9zdEhvc3QgPSBpbm5lcm1vc3RIb3N0O1xuICAvLyB9XG5cbiAgY29udGVudENoYW5nZWQoKSB7XG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdjb250ZW50LWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmxhdHRlbmVkIGNvbnRlbnQgb2YgdGhpcyBjb2xsZWN0aXZlLlxuICAgKlxuICAgKiBUaGUgY29udGVudCBpcyB0aGUgY29sbGVjdGl2ZSBvZiBub2RlcyB3aGljaCBhcmUgY2hpbGRyZW4gb2YgdGhlXG4gICAqIGNvbGxlY3RpdmUncyBpbm5lcm1vc3QgYXNwZWN0LiBJZiBhbnkgb2YgdGhvc2Ugbm9kZXMgYXJlIGA8Y29udGVudD5gXG4gICAqIGVsZW1lbnRzLCB0aG9zZSBhcmUgcmVjdXJzaXZlbHkgZXhwYW5kZWQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBjb250ZW50XG4gICAqIEB0eXBlIFtPYmplY3RdXG4gICAqL1xuICBnZXQgY29udGVudCgpIHtcbiAgICAvLyBpZiAoIXRoaXMuX2NvbnRlbnQpIHtcbiAgICAvLyAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmNvbGxlY3RpdmUuaW5uZXJtb3N0RWxlbWVudDtcbiAgICAvLyAgIGlmIChpbm5lcm1vc3QpIHtcbiAgICAvLyAgICAgdGhpcy5fY29udGVudCA9IEJhc2ljLkNvbnRlbnRIZWxwZXJzLmZsYXR0ZW5DaGlsZHJlbihpbm5lcm1vc3QpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgfVxuXG59O1xuXG5cbi8vIHJlYWR5KCkge1xuLy8gICAvLyBIQUNLOiBFbnN1cmUgdGFyZ2V0Q2hhbmdlZCAoYWxzbykgaGFwcGVucyBhZnRlciByZWFkeS5cbi8vICAgdGhpcy50YXJnZXRDaGFuZ2VkKHRoaXMudGFyZ2V0KTtcbi8vIH1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgYSBjbGljayB0byBpdGVtIHNlbGVjdGlvbi5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1jbGljay1zZWxlY3Rpb25cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlja1NlbGVjdGlvbiB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIC8qXG4gICAgICogUkVWSUVXOiBXaGljaCBldmVudCBzaG91bGQgd2UgbGlzdGVuIHRvIGhlcmU/XG4gICAgICpcbiAgICAgKiBUaGUgc3RhbmRhcmQgdXNlIGZvciB0aGlzIGFzcGVjdCBpcyBpbiBsaXN0IGJveGVzLiBMaXN0IGJveGVzIGRvbid0XG4gICAgICogYXBwZWFyIHRvIGJlIGNvbnNpc3RlbnQgd2l0aCByZWdhcmQgdG8gd2hldGhlciB0aGV5IHNlbGVjdCBvbiBtb3VzZWRvd25cbiAgICAgKiBvciBjbGljay9tb3VzZXVwLlxuICAgICAqL1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnQgPT4ge1xuICAgICAgc2VsZWN0VGFyZ2V0KHRoaXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAvLyBOb3RlOiBXZSBkb24ndCBjYWxsIHByZXZlbnREZWZhdWx0IGhlcmUuIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGZvclxuICAgICAgLy8gbW91c2Vkb3duIGluY2x1ZGVzIHNldHRpbmcga2V5Ym9hcmQgZm9jdXMgaWYgdGhlIGVsZW1lbnQgZG9lc24ndFxuICAgICAgLy8gYWxyZWFkeSBoYXZlIHRoZSBmb2N1cywgYW5kIHdlIHdhbnQgdG8gcHJlc2VydmUgdGhhdCBiZWhhdmlvci5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgLy8gc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHt9XG5cbn1cblxuLy8gVE9ETzogSGFuZGxlIHRoZSBjYXNlIHdoZXJlIGEgbGlzdCBpdGVtIGhhcyBzdWJlbGVtZW50cy4gV2FsayB1cCB0aGUgRE9NXG4vLyBoaWVyYXJjaHkgdW50aWwgd2UgZmluZCBhbiBpdGVtIGluIHRoZSBsaXN0LCBvciBjb21lIGJhY2sgdG8gdGhpcyBlbGVtZW50LFxuLy8gaW4gd2hpY2ggY2FzZSB0aGUgZWxlbWVudCB0aGF0IHdhcyB0YXBwZWQgaXNuJ3QgYW4gaXRlbSAoYW5kIHNob3VsZCBiZVxuLy8gaWdub3JlZCkuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gIGxldCBpbmRleCA9IGVsZW1lbnQuaW5kZXhPZkl0ZW0gJiYgZWxlbWVudC5pbmRleE9mSXRlbSh0YXJnZXQpO1xuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICB9XG59XG4iLCIvKipcbiAqIEFzcGVjdCB0aGF0IGxldHMgYSBjb21wb25lbnQgY29sbGVjdGl2ZSBET00gY29udGVudCBhcyBsaXN0IGl0ZW1zLlxuICpcbiAqIEF1eGlsaWFyeSBlbGVtZW50cyB3aGljaCBhcmUgbm90IG5vcm1hbGx5IHZpc2libGUgYXJlIGZpbHRlcmVkIG91dC4gRm9yIG5vdyxcbiAqIEZvciBub3csIHRoZXNlIGFyZTogbGluaywgc2NyaXB0LCBzdHlsZSwgYW5kIHRlbXBsYXRlLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWNvbnRlbnQtaXRlbXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50SXRlbXMge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcsIHNlbGVjdGVkKTtcbiAgfVxuXG4gIGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgIHRoaXMuX2l0ZW1zID0gbnVsbDtcbiAgICB0aGlzLml0ZW1zQ2hhbmdlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBvc2l0aW9uYWwgaW5kZXggZm9yIHRoZSBpbmRpY2F0ZWQgaXRlbS5cbiAgICpcbiAgICogQG1ldGhvZCBpbmRleE9mSXRlbVxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBUaGUgaXRlbSB3aG9zZSBpbmRleCBpcyByZXF1ZXN0ZWQuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgaXRlbSwgb3IgLTEgaWYgbm90IGZvdW5kLlxuICAgKi9cbiAgaW5kZXhPZkl0ZW0oaXRlbSkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90aGluZy4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5XG4gIC8vIG90aGVyIGFzcGVjdHMgaW4gdGhlIGNvbGxlY3RpdmUuXG4gIC8vIGl0ZW1BZGRlZDogQmFzaWMuQ29sbGVjdGl2ZS5kZWZhdWx0TWV0aG9kLFxuICBpdGVtQWRkZWQoaXRlbSkge31cblxuICBpdGVtc0NoYW5nZWQoKSB7XG5cbiAgICAvLyBQZXJmb3JtIHBlci1pdGVtIGluaXRpYWxpemF0aW9uLlxuICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmICghaXRlbS5faXRlbUluaXRpYWxpemVkKSB7XG4gICAgICAgIC8vIEJVRzogSWYgYW4gYXNwZWN0IGlzIGFzc2ltaWxhdGVkIGFmdGVyIENvbnRlbnRJdGVtcywgdGhlbiBhbGwgdGhlXG4gICAgICAgIC8vIGl0ZW1zIGFyZSBhbHJlYWR5IGluaXRpYWxpemVkLCBhbmQgdGhlIG5ldyBhc3BlY3Qgd29uJ3QgaGF2ZSBhblxuICAgICAgICAvLyBvcHBvcnR1bml0eSB0byBkbyBpdHMgb3duIHBlci1pdGVtIGluaXRpYWxpemF0aW9uIGluIGl0ZW1BZGRlZC5cbiAgICAgICAgdGhpcy5pdGVtQWRkZWQoaXRlbSk7XG4gICAgICAgIGl0ZW0uX2l0ZW1Jbml0aWFsaXplZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAob3V0ZXJtb3N0KSB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2l0ZW1zLWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZXQgb2YgaXRlbXMgaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBpdGVtc1xuICAgKiBAdHlwZSBbT2JqZWN0XVxuICAgKi9cbiAgLy8gVE9ETzogcHJvcGVydHkgbm90aWZpY2F0aW9ucyBzbyBlbGVtZW50cyBjYW4gYmluZCB0byB0aGlzIHByb3BlcnR5XG4gIGdldCBpdGVtcygpIHtcbiAgICBpZiAodGhpcy5faXRlbXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5faXRlbXMgPSBmaWx0ZXJBdXhpbGlhcnlFbGVtZW50cyh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cblxufVxuXG5cbi8vIFJldHVybiB0aGUgZ2l2ZW4gZWxlbWVudHMsIGZpbHRlcmluZyBvdXQgYXV4aWxpYXJ5IGVsZW1lbnRzIHRoYXQgYXJlbid0XG4vLyB0eXBpY2FsbHkgdmlzaWJsZS4gSXRlbXMgd2hpY2ggYXJlIG5vdCBlbGVtZW50cyBhcmUgcmV0dXJuZWQgYXMgaXMuXG5mdW5jdGlvbiBmaWx0ZXJBdXhpbGlhcnlFbGVtZW50cyhpdGVtcykge1xuICBsZXQgYXV4aWxpYXJ5VGFncyA9IFtcbiAgICAnbGluaycsXG4gICAgJ3NjcmlwdCcsXG4gICAgJ3N0eWxlJyxcbiAgICAndGVtcGxhdGUnXG4gIF07XG4gIHJldHVybiBbXS5maWx0ZXIuY2FsbChpdGVtcywgZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhaXRlbS5sb2NhbE5hbWUgfHwgYXV4aWxpYXJ5VGFncy5pbmRleE9mKGl0ZW0ubG9jYWxOYW1lKSA8IDA7XG4gIH0pO1xufVxuXG5cbi8qKlxuICogRmlyZXMgd2hlbiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgY2hhbmdlLlxuICpcbiAqIEBldmVudCBpdGVtcy1jaGFuZ2VkXG4gKi9cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgZGlyZWN0aW9uIHNlbWFudGljcyAoZ29MZWZ0LCBnb1JpZ2h0LCBldGMuKSB0byBzZWxlY3Rpb25cbiAqIHNlbWFudGljcyAoc2VsZWN0UHJldmlvdXMsIHNlbGVjdE5leHQsIGV0Yy4pLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWRpcmVjdGlvbi1zZWxlY3Rpb25cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdlbGVtZW50LWJhc2UvZXh0ZW5zaWJsZS9Db21wb3NhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0aW9uU2VsZWN0aW9uIHtcblxuICBnb0Rvd24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TmV4dCgpO1xuICB9XG5cbiAgZ29FbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TGFzdCgpO1xuICB9XG5cbiAgZ29MZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdFByZXZpb3VzKCk7XG4gIH1cblxuICBnb1JpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdE5leHQoKTtcbiAgfVxuXG4gIGdvU3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0Rmlyc3QoKTtcbiAgfVxuXG4gIGdvVXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0UHJldmlvdXMoKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb25zLiBUaGVzZSB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgc2VsZWN0Rmlyc3QoKSB7fVxuICBzZWxlY3RMYXN0KCkge31cbiAgc2VsZWN0TmV4dCgpIHt9XG4gIHNlbGVjdFByZXZpb3VzKCkge31cblxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKERpcmVjdGlvblNlbGVjdGlvbi5wcm90b3R5cGUsIHtcbiAgc2VsZWN0Rmlyc3Q6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBzZWxlY3RMYXN0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgc2VsZWN0TmV4dDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIHNlbGVjdFByZXZpb3VzOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KVxufSk7XG4iLCIvKlxuICogQSB2ZXJ5IHNpbXBsZSBzZXQgb2YgaGVscGVycyB0byBzdXBwb3J0IHRoZSB1c2Ugb2YgZ2VuZXJpYyBzdHlsaW5nIGluIGFcbiAqIGNvbXBvbmVudC5cbiAqXG4gKiBCeSBkZWZhdWx0LCBhIGNvbXBvbmVudCBzaG91bGQgcHJvdmlkZSBhIG1pbmltYWwgdmlzdWFsIHByZXNlbnRhdGlvbiB0aGF0XG4gKiBhbGxvd3MgdGhlIGNvbXBvbmVudCB0byBmdW5jdGlvbi4gSG93ZXZlciwgdGhlIG1vcmUgc3R5bGluZyB0aGUgY29tcG9uZW50XG4gKiBwcm92aWRlcyBieSBkZWZhdWx0LCB0aGUgaGFyZGVyIGl0IGJlY29tZXMgdG8gZ2V0IHRoZSBjb21wb25lbnQgdG8gZml0IGluXG4gKiBpbiBvdGhlciBzZXR0aW5ncy4gRWFjaCBDU1MgcnVsZSBoYXMgdG8gYmUgb3ZlcnJpZGRlbi4gV29yc2UsIG5ldyBDU1MgcnVsZXNcbiAqIGFkZGVkIHRvIHRoZSBkZWZhdWx0IHN0eWxlIHdvbid0IGJlIG92ZXJyaWRkZW4gYnkgZGVmYXVsdCwgbWFraW5nIGl0IGhhcmQgdG9cbiAqIGtub3cgd2hldGhlciBhIG5ldyB2ZXJzaW9uIG9mIGEgY29tcG9uZW50IHdpbGwgc3RpbGwgbG9vayBva2F5LlxuICpcbiAqIEFzIGEgY29tcHJvbWlzZSwgdGhlIHNpbXBsZSBQb2x5bWVyIGJlaGF2aW9yIGhlcmUgZGVmaW5lcyBhIFwiZ2VuZXJpY1wiXG4gKiBhdHRyaWJ1dGUuIFRoaXMgYXR0cmlidXRlIGlzIG5vcm1hbGx5IHNldCBieSBkZWZhdWx0LCBhbmQgc3R5bGVzIGNhbiBiZVxuICogd3JpdHRlbiB0aGF0IGFwcGx5IG9ubHkgd2hlbiB0aGUgZ2VuZXJpYyBhdHRyaWJ1dGUgaXMgc2V0LiBUaGlzIGFsbG93cyB0aGVcbiAqIGNvbnN0cnVjdGlvbiBvZiBDU1MgcnVsZXMgdGhhdCB3aWxsIG9ubHkgYXBwbHkgdG8gZ2VuZXJpYyBjb21wb25lbnRzIGxpa2VcbiAqXG4gKiAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pIHtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBUaGlzIG1ha2VzIGl0IGVhc3kgdG8gcmVtb3ZlIGFsbCBkZWZhdWx0IHN0eWxpbmcgLS0gc2V0IHRoZSBnZW5lcmljIGF0dHJpYnV0ZVxuICogdG8gZmFsc2UsIGFuZCBhbGwgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZC5cbiAqXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJpYyB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuZ2VuZXJpYyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdnZW5lcmljJykgfHwgdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBjb21wb25lbnQgd291bGQgbGlrZSB0byByZWNlaXZlIGdlbmVyaWMgc3R5bGluZy5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSBpcyB0cnVlIGJ5IGRlZmF1bHQg4oCUwqBzZXQgaXQgdG8gZmFsc2UgdG8gdHVybiBvZmYgYWxsXG4gICAqIGdlbmVyaWMgc3R5bGVzLiBUaGlzIG1ha2VzIGl0IGVhc2llciB0byBhcHBseSBjdXN0b20gc3R5bGluZzsgeW91IHdvbid0XG4gICAqIGhhdmUgdG8gZXhwbGljaXRseSBvdmVycmlkZSBzdHlsaW5nIHlvdSBkb24ndCB3YW50LlxuICAgKlxuICAgKiBAcHJvcGVydHkgZ2VuZXJpY1xuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGdldCBnZW5lcmljKCkge1xuICAgIHJldHVybiB0aGlzLl9nZW5lcmljO1xuICB9XG5cbiAgLy8gV2Ugcm9sbCBvdXIgb3duIGF0dHJpYnV0ZSBzZXR0aW5nIHNvIHRoYXQgYW4gZXhwbGljaXRseSBmYWxzZSB2YWx1ZSBzaG93c1xuICAvLyB1cCBhcyBnZW5lcmljPVwiZmFsc2VcIi5cbiAgc2V0IGdlbmVyaWModmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSAodmFsdWUgIT09ICdmYWxzZScpO1xuICAgIH1cbiAgICB0aGlzLl9nZW5lcmljID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgLy8gRXhwbGljaXRseSB1c2UgZmFsc2Ugc3RyaW5nLlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2dlbmVyaWMnLCAnZmFsc2UnKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIC8vIEV4cGxpY2l0bHkgcmVtb3ZlIGF0dHJpYnV0ZS5cbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdnZW5lcmljJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1wdHkgc3RyaW5nIHRvIGdldCBhdHRyaWJ1dGUgdG8gYXBwZWFyIHdpdGggbm8gdmFsdWUuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZ2VuZXJpYycsICcnKTtcbiAgICB9XG4gIH1cblxufTtcbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hbmFnZXMgc2VsZWN0aW9uIHNlbWFudGljcyBmb3IgaXRlbXMgaW4gYSBsaXN0LlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWl0ZW0tc2VsZWN0aW9uXG4gKi9cblxuXG4vKipcbiAqIEZpcmVzIHdoZW4gdGhlIHNlbGVjdGVkSXRlbSBwcm9wZXJ0eSBjaGFuZ2VzLlxuICpcbiAqIEBldmVudCBzZWxlY3RlZC1pdGVtLWNoYW5nZWRcbiAqIEBwYXJhbSBkZXRhaWwuc2VsZWN0ZWRJdGVtIFRoZSBuZXcgc2VsZWN0ZWQgaXRlbS5cbiAqIEBwYXJhbSBkZXRhaWwucHJldmlvdXNJdGVtIFRoZSBwcmV2aW91c2x5IHNlbGVjdGVkIGl0ZW0uXG4gKi9cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBzZWxlY3RlZEluZGV4IHByb3BlcnR5IGNoYW5nZXMuXG4gKlxuICogQGV2ZW50IHNlbGVjdGVkLWl0ZW0tY2hhbmdlZFxuICogQHBhcmFtIGRldGFpbC5zZWxlY3RlZEluZGV4IFRoZSBuZXcgc2VsZWN0ZWQgaW5kZXguXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVNlbGVjdGlvbiB7XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHt9XG5cbiAgZ2V0IGNhblNlbGVjdE5leHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhblNlbGVjdE5leHQ7XG4gIH1cbiAgc2V0IGNhblNlbGVjdE5leHQoY2FuU2VsZWN0TmV4dCkge1xuICAgIHRoaXMuX2NhblNlbGVjdE5leHQgPSBjYW5TZWxlY3ROZXh0O1xuICB9XG5cbiAgZ2V0IGNhblNlbGVjdFByZXZpb3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jYW5TZWxlY3RQcmV2aW91cztcbiAgfVxuICBzZXQgY2FuU2VsZWN0UHJldmlvdXMoY2FuU2VsZWN0UHJldmlvdXMpIHtcbiAgICB0aGlzLl9jYW5TZWxlY3RQcmV2aW91cyA9IGNhblNlbGVjdFByZXZpb3VzO1xuICB9XG5cbiAgaXRlbUFkZGVkKGl0ZW0pIHtcbiAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKGl0ZW0sIGl0ZW0gPT09IHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgfVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZEl0ZW0pO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIC8vIFNlbGVjdGVkIGl0ZW0gaXMgbm8gbG9uZ2VyIGluIHRoZSBjdXJyZW50IHNldCBvZiBpdGVtcy5cbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGlvblJlcXVpcmVkKSB7XG4gICAgICAgIC8vIEVuc3VyZSBzZWxlY3Rpb24sIGJ1dCBkbyB0aGlzIGluIHRoZSBuZXh0IHRpY2sgdG8gZ2l2ZSBvdGhlclxuICAgICAgICAvLyBhc3BlY3RzIGEgY2hhbmNlIHRvIGRvIHRoZWlyIG93biBpdGVtc0NoYW5nZWQgd29yay5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbnN1cmVTZWxlY3Rpb24odGhpcyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgaXRlbSB3aGljaCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQsIG9yIC0xIGlmIHRoZXJlIGlzIG5vXG4gICAqIHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGVkSW5kZXhcbiAgICogQHR5cGUgTnVtYmVyXG4gICAqL1xuICBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbiAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW07XG5cbiAgICBpZiAoc2VsZWN0ZWRJdGVtID09IG51bGwpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBNZW1vaXplXG4gICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleE9mSXRlbShzZWxlY3RlZEl0ZW0pO1xuXG4gICAgLy8gSWYgaW5kZXggPSAtMSwgc2VsZWN0aW9uIHdhc24ndCBmb3VuZC4gTW9zdCBsaWtlbHkgY2F1c2UgaXMgdGhhdCB0aGVcbiAgICAvLyBET00gd2FzIG1hbmlwdWxhdGVkIGZyb20gdW5kZXJuZWF0aCB1cy5cbiAgICAvLyBUT0RPOiBPbmNlIHdlIHRyYWNrIGNvbnRlbnQgY2hhbmdlcywgdHVybiB0aGlzIGludG8gYW4gZXhjZXB0aW9uLlxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICBsZXQgaXRlbTtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaXRlbSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaXRlbTtcblxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnc2VsZWN0ZWQtaW5kZXgtY2hhbmdlZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgc2VsZWN0ZWRJbmRleDogaW5kZXgsXG4gICAgICAgICAgdmFsdWU6IGluZGV4IC8vIGZvciBQb2x5bWVyIGJpbmRpbmdcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvdXRlcm1vc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSwgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3RlZEl0ZW1cbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICAvLyBUT0RPOiBDb25maXJtIGl0ZW0gaXMgaW4gaXRlbXMgYmVmb3JlIHNlbGVjdGluZy5cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgbGV0IHByZXZpb3VzSXRlbSA9IHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgICBpZiAocHJldmlvdXNJdGVtKSB7XG4gICAgICAvLyBSZW1vdmUgcHJldmlvdXMgc2VsZWN0aW9uLlxuICAgICAgdGhpcy5hcHBseVNlbGVjdGlvbihwcmV2aW91c0l0ZW0sIGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy5hcHBseVNlbGVjdGlvbihpdGVtLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBSYXRpb25hbGl6ZSB3aXRoIHNlbGVjdGVkSW5kZXggc28gd2UncmUgbm90IHJlY2FsY3VsYXRpbmcgaXRlbVxuICAgIC8vIG9yIGluZGV4IGluIGVhY2ggc2V0dGVyLlxuICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXhPZkl0ZW0oaXRlbSk7XG4gICAgdXBkYXRlUG9zc2libGVOYXZpZ2F0aW9ucyh0aGlzLCBpbmRleCk7XG5cbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAob3V0ZXJtb3N0KSB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3NlbGVjdGVkLWl0ZW0tY2hhbmdlZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgc2VsZWN0ZWRJdGVtOiBpdGVtLFxuICAgICAgICAgIHByZXZpb3VzSXRlbTogcHJldmlvdXNJdGVtLFxuICAgICAgICAgIHZhbHVlOiBpdGVtIC8vIGZvciBQb2x5bWVyIGJpbmRpbmdcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvdXRlcm1vc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RGaXJzdFxuICAgKi9cbiAgc2VsZWN0Rmlyc3QoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIGxpc3Qgc2hvdWxkIGFsd2F5cyBoYXZlIGEgc2VsZWN0aW9uIChpZiBpdCBoYXMgaXRlbXMpLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0aW9uUmVxdWlyZWRcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKi9cbiAgZ2V0IHNlbGVjdGlvblJlcXVpcmVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25SZXF1aXJlZDtcbiAgfVxuICBzZXQgc2VsZWN0aW9uUmVxdWlyZWQoc2VsZWN0aW9uUmVxdWlyZWQpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25SZXF1aXJlZCA9IHNlbGVjdGlvblJlcXVpcmVkO1xuICAgIGVuc3VyZVNlbGVjdGlvbih0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIGxhc3QgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RMYXN0XG4gICAqL1xuICBzZWxlY3RMYXN0KCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCB0aGlzLml0ZW1zLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgbmV4dCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdE5leHRcbiAgICovXG4gIHNlbGVjdE5leHQoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIHRoaXMuc2VsZWN0ZWRJbmRleCArIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgcHJldmlvdXMgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RQcmV2aW91c1xuICAgKi9cbiAgc2VsZWN0UHJldmlvdXMoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIHRoaXMuc2VsZWN0ZWRJbmRleCAtIDEpO1xuICB9XG5cbn1cblxuXG4vLyBJZiBubyBpdGVtIGlzIHNlbGVjdGVkLCBzZWxlY3QgYSBkZWZhdWx0IGl0ZW0uXG4vLyBUT0RPOiBJZiB0aGUgcHJldmlvdXNseS1zZWxlY3RlZCBpdGVtIGhhcyBiZWVuIGRlbGV0ZWQsIHRyeSB0byBzZWxlY3QgYW5cbi8vIGl0ZW0gYWRqYWNlbnQgdG8gdGhlIHBvc2l0aW9uIGl0IGhlbGQuXG5mdW5jdGlvbiBlbnN1cmVTZWxlY3Rpb24oZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQuc2VsZWN0ZWRJdGVtICYmIGVsZW1lbnQuaXRlbXMgJiYgZWxlbWVudC5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gMDtcbiAgfVxufVxuXG4vLyBFbnN1cmUgdGhlIGdpdmVuIGluZGV4IGlzIHdpdGhpbiBib3VuZHMsIGFuZCBzZWxlY3QgaXQgaWYgaXQncyBub3QgYWxyZWFkeVxuLy8gc2VsZWN0ZWQuXG5mdW5jdGlvbiBzZWxlY3RJbmRleChlbGVtZW50LCBpbmRleCkge1xuICBsZXQgYm91bmRlZEluZGV4ID0gTWF0aC5tYXgoTWF0aC5taW4oaW5kZXgsIGVsZW1lbnQuaXRlbXMubGVuZ3RoIC0gMSksIDApO1xuICBsZXQgcHJldmlvdXNJbmRleCA9IGVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcbiAgaWYgKHByZXZpb3VzSW5kZXggIT09IGJvdW5kZWRJbmRleCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IGJvdW5kZWRJbmRleDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRm9sbG93aW5nIGEgY2hhbmdlIGluIHNlbGVjdGlvbiwgcmVwb3J0IHdoZXRoZXIgaXQncyBub3cgcG9zc2libGUgdG9cbi8vIGdvIG5leHQvcHJldmlvdXMgZnJvbSB0aGUgZ2l2ZW4gaW5kZXguXG5mdW5jdGlvbiB1cGRhdGVQb3NzaWJsZU5hdmlnYXRpb25zKGVsZW1lbnQsIGluZGV4KSB7XG4gIGxldCBjYW5TZWxlY3ROZXh0O1xuICBsZXQgY2FuU2VsZWN0UHJldmlvdXM7XG4gIGxldCBpdGVtcyA9IGVsZW1lbnQuaXRlbXM7XG4gIGlmIChpdGVtcyA9PSBudWxsIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIGNhblNlbGVjdE5leHQgPSBmYWxzZTtcbiAgICBjYW5TZWxlY3RQcmV2aW91cyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZS4gSWYgdGhlcmUncyBubyBzZWxlY3Rpb24sIHdlIGRlY2xhcmUgdGhhdCBpdCdzIGFsd2F5c1xuICAgIC8vIHBvc3NpYmxlIHRvIGdvIG5leHQvcHJldmlvdXMgdG8gY3JlYXRlIGEgc2VsZWN0aW9uLlxuICAgIGNhblNlbGVjdE5leHQgPSB0cnVlO1xuICAgIGNhblNlbGVjdFByZXZpb3VzID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBOb3JtYWwgY2FzZTogd2UgaGF2ZSBhbiBpbmRleCBpbiBhIGxpc3QgdGhhdCBoYXMgaXRlbXMuXG4gICAgY2FuU2VsZWN0UHJldmlvdXMgPSAoaW5kZXggPiAwKTtcbiAgICBjYW5TZWxlY3ROZXh0ID0gKGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSk7XG4gIH1cbiAgZWxlbWVudC5jYW5TZWxlY3ROZXh0ID0gY2FuU2VsZWN0TmV4dDtcbiAgZWxlbWVudC5jYW5TZWxlY3RQcmV2aW91cyA9IGNhblNlbGVjdFByZXZpb3VzO1xufVxuXG5cbi8vIHByb3BlcnRpZXM6IHtcbi8vXG4vLyAgIHNlbGVjdGVkSW5kZXg6IHtcbi8vICAgICB0eXBlOiBOdW1iZXJcbi8vICAgfVxuLy9cbi8vICAgc2VsZWN0ZWRJdGVtOiB7XG4vLyAgICAgdHlwZTogT2JqZWN0XG4vLyAgIH1cbi8vXG4vLyAgIHNlbGVjdGlvblJlcXVpcmVkOiB7XG4vLyAgICAgdHlwZTogQm9vbGVhbixcbi8vICAgICBvYnNlcnZlcjogJ3NlbGVjdGlvblJlcXVpcmVkQ2hhbmdlZCcsXG4vLyAgICAgdmFsdWU6IGZhbHNlXG4vLyAgIH1cbi8vXG4vLyB9XG4vL1xuLy8gZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4vLyAgIC8vIEhBQ0s6IFByb3hpZWQgZ2V0dGVyL3NldHRlciBwcm9wZXJ0aWVzIGxpa2UgdGhpcyBvbmUgY2FuJ3QgYmUgc2V0IHZpYVxuLy8gICAvLyBhdHRyaWJ1dGVzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1BvbHltZXIvcG9seW1lci9pc3N1ZXMvMjQ1NC4gV2Vcbi8vICAgLy8gY3VycmVudGx5IGhhY2sgYXJvdW5kIHRoaXMgYnkgb25seSByZXR1cm5pbmcgYSB2YWx1ZSBmb3IgdGhpcyBwcm9wZXJ0eSBpZlxuLy8gICAvLyB0aGUgZWxlbWVudCBpcyByZWFkeS4gQSBuZWdhdGl2ZSBzaWRlIGVmZmVjdCBpcyB0aGF0IGluc3BlY3RpbmcgdGhpc1xuLy8gICAvLyBwcm9wZXJ0eSBiZWZvcmUgdGhlIGVsZW1lbnQgaXMgcmVhZHkgd2lsbCBhbHdheXMgcmV0dXJuIHVuZGVmaW5lZC5cbi8vICAgaWYgKHRoaXMuX3JlYWRpZWQpIHtcbi8vICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xuLy8gICB9XG4vLyB9XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBhZGRzIEFSSUEgcm9sZXMgZm9yIGxpc3RzIGFuZCBsaXN0IGl0ZW1zLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWFjY2Vzc2libGUtbGlzdFxuICovXG5cbi8vIFVzZWQgdG8gYXNzaWduIHVuaXF1ZSBJRHMgdG8gaXRlbSBlbGVtZW50cyB3aXRob3V0IElEcy5cbmxldCBpZENvdW50ID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbXNBY2Nlc3NpYmxlIHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQpO1xuICAgIHZhciBpdGVtSWQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpZiAoaXRlbUlkKSB7XG4gICAgICB0aGlzLm91dGVybW9zdEF0dGFjaGVkLnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgaXRlbUlkKTtcbiAgICB9XG4gIH1cblxuICAvLyAvLyBFbnN1cmUgdGhlIG91dGVybW9zdCBhc3BlY3QgaGFzIHJvbGU9XCJsaXN0Ym94XCIuXG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkKCkge1xuICAvL1xuICAvLyAgIHZhciBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCA9PT0gb3V0ZXJtb3N0KSB7XG4gIC8vICAgICAvLyBBbHJlYWR5IGNvbmZpZ3VyZWQuXG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCkge1xuICAvLyAgICAgLy8gUmVtb3ZlIEFSSUEgYXR0cmlidXRlcyBmcm9tIHByZXZpb3VzIG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIG91dGVybW9zdC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICAvL1xuICAvLyAgIC8vIERldGVybWluZSBhIGJhc2UgaXRlbSBJRCBiYXNlZCBvbiB0aGlzIGNvbXBvbmVudCdzIGhvc3QncyBvd24gSUQuIFRoaXNcbiAgLy8gICAvLyB3aWxsIGJlIGNvbWJpbmVkIHdpdGggYSB1bmlxdWUgaW50ZWdlciB0byBhc3NpZ24gSURzIHRvIGl0ZW1zIHRoYXQgZG9uJ3RcbiAgLy8gICAvLyBoYXZlIGFuIGV4cGxpY2l0IElELiBJZiB0aGUgYmFzaWMtbGlzdC1ib3ggaGFzIElEIFwiZm9vXCIsIHRoZW4gaXRzIGl0ZW1zXG4gIC8vICAgLy8gd2lsbCBoYXZlIElEcyB0aGF0IGxvb2sgbGlrZSBcIl9mb29PcHRpb24xXCIuIElmIHRoZSBsaXN0IGhhcyBubyBJRCBpdHNlbGYsXG4gIC8vICAgLy8gaXRzIGl0ZW1zIHdpbGwgZ2V0IElEcyB0aGF0IGxvb2sgbGlrZSBcIl9vcHRpb24xXCIuIEl0ZW0gSURzIGFyZSBwcmVmaXhlZFxuICAvLyAgIC8vIHdpdGggYW4gdW5kZXJzY29yZSB0byBkaWZmZXJlbnRpYXRlIHRoZW0gZnJvbSBtYW51YWxseS1hc3NpZ25lZCBJRHMsIGFuZFxuICAvLyAgIC8vIHRvIG1pbmltaXplIHRoZSBwb3RlbnRpYWwgZm9yIElEIGNvbmZsaWN0cy5cbiAgLy9cbiAgLy8gICAvLyBUT0RPOiBUaGlzIGNoZWNrIG5vdyBjb21lcyB0b28gbGF0ZSBmb3IgY29tcG9uZW50cyBsaWtlIGJhc2ljLWxpc3QtYm94LlxuICAvLyAgIC8vIFdlIG1heSBuZWVkIHRvIGR5bmFtaWNhbGx5IHVwZGF0ZSB0aGUgaXRlbSBJRHMgd2hlbmV2ZXIgdGhlIGNvbGxlY3Rpb25cbiAgLy8gICAvLyBjaGFuZ2VzLCBhbHRob3VnaCB0aGF0IHJlcXVpcmVzIGtlZXBpbmcgdHJhY2sgb2Ygd2hldGhlciB3ZSd2ZSBjaGFuZ2VkXG4gIC8vICAgLy8gYW4gaXRlbSdzIElEIG9yIHdoZXRoZXIgaXQncyBhbHdheXMgaGFkIHRoYXQgSUQuXG4gIC8vICAgdmFyIGVsZW1lbnRJZCA9IG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApO1xuICAvLyAgIHRoaXMuaXRlbUJhc2VJZCA9IGVsZW1lbnRJZCA/XG4gIC8vICAgICAgIFwiX1wiICsgZWxlbWVudElkICsgXCJPcHRpb25cIiA6XG4gIC8vICAgICAgIFwiX29wdGlvblwiO1xuICAvL1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0ID0gb3V0ZXJtb3N0O1xuICAvLyB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIG91dGVybW9zdC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGEgYmFzZSBpdGVtIElEIGJhc2VkIG9uIHRoaXMgY29tcG9uZW50J3MgaG9zdCdzIG93biBJRC4gVGhpc1xuICAgIC8vIHdpbGwgYmUgY29tYmluZWQgd2l0aCBhIHVuaXF1ZSBpbnRlZ2VyIHRvIGFzc2lnbiBJRHMgdG8gaXRlbXMgdGhhdCBkb24ndFxuICAgIC8vIGhhdmUgYW4gZXhwbGljaXQgSUQuIElmIHRoZSBiYXNpYy1saXN0LWJveCBoYXMgSUQgXCJmb29cIiwgdGhlbiBpdHMgaXRlbXNcbiAgICAvLyB3aWxsIGhhdmUgSURzIHRoYXQgbG9vayBsaWtlIFwiX2Zvb09wdGlvbjFcIi4gSWYgdGhlIGxpc3QgaGFzIG5vIElEIGl0c2VsZixcbiAgICAvLyBpdHMgaXRlbXMgd2lsbCBnZXQgSURzIHRoYXQgbG9vayBsaWtlIFwiX29wdGlvbjFcIi4gSXRlbSBJRHMgYXJlIHByZWZpeGVkXG4gICAgLy8gd2l0aCBhbiB1bmRlcnNjb3JlIHRvIGRpZmZlcmVudGlhdGUgdGhlbSBmcm9tIG1hbnVhbGx5LWFzc2lnbmVkIElEcywgYW5kXG4gICAgLy8gdG8gbWluaW1pemUgdGhlIHBvdGVudGlhbCBmb3IgSUQgY29uZmxpY3RzLlxuXG4gICAgLy8gVE9ETzogVGhpcyBjaGVjayBub3cgY29tZXMgdG9vIGxhdGUgZm9yIGNvbXBvbmVudHMgbGlrZSBiYXNpYy1saXN0LWJveC5cbiAgICAvLyBXZSBtYXkgbmVlZCB0byBkeW5hbWljYWxseSB1cGRhdGUgdGhlIGl0ZW0gSURzIHdoZW5ldmVyIHRoZSBjb2xsZWN0aW9uXG4gICAgLy8gY2hhbmdlcywgYWx0aG91Z2ggdGhhdCByZXF1aXJlcyBrZWVwaW5nIHRyYWNrIG9mIHdoZXRoZXIgd2UndmUgY2hhbmdlZFxuICAgIC8vIGFuIGl0ZW0ncyBJRCBvciB3aGV0aGVyIGl0J3MgYWx3YXlzIGhhZCB0aGF0IElELlxuICAgIHZhciBlbGVtZW50SWQgPSBvdXRlcm1vc3QuZ2V0QXR0cmlidXRlKCBcImlkXCIgKTtcbiAgICB0aGlzLml0ZW1CYXNlSWQgPSBlbGVtZW50SWQgP1xuICAgICAgICBcIl9cIiArIGVsZW1lbnRJZCArIFwiT3B0aW9uXCIgOlxuICAgICAgICBcIl9vcHRpb25cIjtcbiAgfVxuXG4gIGl0ZW1BZGRlZChpdGVtKSB7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnb3B0aW9uJyk7XG5cbiAgICAvLyBFbnN1cmUgZWFjaCBpdGVtIGhhcyBhbiBJRCBzbyB3ZSBjYW4gc2V0IGFyaWEtYWN0aXZlZGVzY2VuZGFudCBvbiB0aGVcbiAgICAvLyBvdmVyYWxsIGxpc3Qgd2hlbmV2ZXIgdGhlIHNlbGVjdGlvbiBjaGFuZ2VzLlxuICAgIGlmICghaXRlbS5nZXRBdHRyaWJ1dGUoJ2lkJykpIHtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuaXRlbUJhc2VJZCArIGlkQ291bnQrKyk7XG4gICAgfVxuICB9XG5cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgLy8gQ2F0Y2ggdGhlIGNhc2Ugd2hlcmUgdGhlIHNlbGVjdGlvbiBpcyByZW1vdmVkLlxuICAgIGlmIChpdGVtID09IG51bGwpIHtcbiAgICAgIHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICB9XG4gIH1cblxufVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFuYWdlcyB0aGUga2V5Ym9hcmQgZm9jdXMgYW5kIGtleWRvd24gaGFuZGxpbmcgZm9yIGEgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgYXNwZWN0IGVuc3VyZXMgdGhhdCBpdHMgb25seSB0aGUgb3V0ZXJtb3N0IGFzcGVjdCBpbiBhIGNvbGxlY3RpdmUgdGhhdCBpc1xuICogbGlzdGVuaW5nIGZvciBrZXlib2FyZCBldmVudHMuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG5cbiAgLypcbiAgICogV2hlbiB0aGUgY29sbGVjdGl2ZSBjaGFuZ2VzLCBzdG9wIGxpc3RlbmluZyBmb3Iga2V5Ym9hcmQgZXZlbnRzIG9uXG4gICAqIHdoaWNoZXZlciBhc3BlY3Qgd2FzIHByZXZpb3VzbHkgdGhlIG91dGVybW9zdCBhc3BlY3QsIGFuZCBzdGFydCBsaXN0ZW5pbmdcbiAgICogdG8ga2V5Ym9hcmQgZXZlbnRzIG9uIHdoaWNoZXZlciBhc3BlY3QgaXMgbm93IHRoZSBuZXcgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgICovXG4gIC8vIFRPRE86IERvIHdlIG5lZWQgdG8gc3RhcnQvc3RvcCBsaXN0ZW5pbmcgd2hlbiBhdHRhY2hlZC9kZXRhY2hlZCwgb3IgaXNcbiAgLy8gdGhhdCBoYW5kbGVkIGF1dG9tYXRpY2FsbHk/XG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkOiBmdW5jdGlvbigpIHtcbiAgLy9cbiAgLy8gICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5jb2xsZWN0aXZlLm91dGVybW9zdEF0dGFjaGVkO1xuICAvLyAgIGlmIChvdXRlcm1vc3QgPT09IHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0KSB7XG4gIC8vICAgICAvLyBTaG91bGQgYWxyZWFkeSBiZSBsaXN0ZW5pbmcgdG8gZXZlbnRzIG9uIHRoZSBvdXRlcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBpZiAodGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QpIHtcbiAgLy8gICAgIC8vIENsZWFuIHVwIHRoZSBwcmV2aW91cyBhc3BlY3QgdGhhdCB3YXMgaGFuZGxpbmcgdGhlIGtleWJvYXJkLlxuICAvL1xuICAvLyAgICAgaWYgKHRoaXMuX3ByZXZpb3VzVGFiSW5kZXgpIHtcbiAgLy8gICAgICAgLy8gUmVzdG9yZSBwcmV2aW91cyB0YWIgaW5kZXguXG4gIC8vICAgICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0aGlzLl9wcmV2aW91c1RhYkluZGV4KTtcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIC8vIEFzcGVjdCBkaWRuJ3QgaGF2ZSBhIHRhYiBpbmRleCBiZWZvcmUsIHNvIHJlbW92ZSBpdC5cbiAgLy8gICAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QucmVtb3ZlQXR0cmlidXRlKCd0YWJJbmRleCcpO1xuICAvLyAgICAgfVxuICAvL1xuICAvLyAgICAgLy8gU3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnRzIHRoZSBwcmV2aW91cyBvdXRlcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25IYW5kbGVyKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgaWYgKG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JykpIHtcbiAgLy8gICAgIC8vIExlYXZlIGV4aXN0aW5nIHRhYiBpbmRleCBpbiBwbGFjZS5cbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzVGFiSW5kZXggPSBudWxsO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICAvLyBNYWtlIG5ldyBvdXRlcm1vc3QgYXNwZWN0IGZvY3VzYWJsZS5cbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzVGFiSW5kZXggPSBvdXRlcm1vc3QuZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpO1xuICAvLyAgICAgb3V0ZXJtb3N0LnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCAwKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgLy8gU3RhcnQgbGlzdGVuaW5nIHRvIGV2ZW50cyBvbiB0aGUgbmV3IG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgaWYgKCF0aGlzLl9rZXlkb3duSGFuZGxlcikge1xuICAvLyAgICAgdGhpcy5fa2V5ZG93bkhhbmRsZXIgPSB0aGlzLl9rZXlkb3duLmJpbmQodGhpcyk7XG4gIC8vICAgfVxuICAvLyAgIG91dGVybW9zdC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkhhbmRsZXIpO1xuICAvL1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0ID0gb3V0ZXJtb3N0O1xuICAvLyB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICAgIGxldCBoYW5kbGVkID0gdGhpcy5rZXlkb3duKGV2ZW50KTtcbiAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIDApO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBrZXlkb3duIGhhbmRsZXIuIFRoaXMgd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIGtleWRvd24oZXZlbnQpIHt9XG5cbn0iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYXBzIGRpcmVjdGlvbiBrZXlzIChMZWZ0LCBSaWdodCwgZXRjLikgdG8gZGlyZWN0aW9uIHNlbWFudGljc1xuICogKGdvTGVmdCwgZ29SaWdodCwgZXRjLikuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmQtZGlyZWN0aW9uXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnZWxlbWVudC1iYXNlL2V4dGVuc2libGUvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkRGlyZWN0aW9uIHtcblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9ucy4gVGhlc2Ugd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIGdvRG93bigpIHt9XG4gIGdvRW5kKCkge31cbiAgZ29MZWZ0KCkge31cbiAgZ29SaWdodCgpIHt9XG4gIGdvU3RhcnQoKSB7fVxuICBnb1VwKCkge31cblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM1OiAvLyBFbmRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29FbmQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM2OiAvLyBIb21lXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvU3RhcnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM3OiAvLyBMZWZ0XG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvTGVmdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6IC8vIFVwXG4gICAgICAgIGhhbmRsZWQgPSBldmVudC5hbHRLZXkgPyB0aGlzLmdvU3RhcnQoKSA6IHRoaXMuZ29VcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0XG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvUmlnaHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOiAvLyBEb3duXG4gICAgICAgIGhhbmRsZWQgPSBldmVudC5hbHRLZXkgPyB0aGlzLmdvRW5kKCkgOiB0aGlzLmdvRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEtleWJvYXJkRGlyZWN0aW9uLnByb3RvdHlwZSwge1xuICBnb0Rvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb0VuZDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvTGVmdDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvUmlnaHQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb1N0YXJ0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29VcDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGtleWRvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlck1peGluUmVzdWx0KVxufSk7XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYXBzIHBhZ2Uga2V5cyAoUGFnZSBVcCwgUGFnZSBEb3duKSBpbnRvIG9wZXJhdGlvbnMgdGhhdCBzY3JvbGxcbiAqIHRoZSBjb21wb25lbnQuXG4gKlxuICogVGhlIGtleWJvYXJkIGludGVyYWN0aW9uIG1vZGVsIGdlbmVyYWxseSBmb2xsb3dzIHRoYXQgb2YgTWljcm9zb2Z0IFdpbmRvd3MnXG4gKiBsaXN0IGJveGVzIGluc3RlYWQgb2YgdGhvc2UgaW4gT1MgWDpcbiAqXG4gKiAqIFRoZSBQYWdlIFVwL0Rvd24gYW5kIEhvbWUvRW5kIGtleXMgYWN0dWFsbHkgbW92ZSB0aGUgc2VsZWN0aW9uLCByYXRoZXIgdGhhblxuICogICBqdXN0IHNjcm9sbGluZy4gVGhlIGZvcm1lciBiZWhhdmlvciBzZWVtcyBtb3JlIGdlbmVyYWxseSB1c2VmdWwgZm9yIGtleWJvYXJkXG4gKiAgIHVzZXJzLlxuICpcbiAqICogUHJlc3NpbmcgUGFnZSBVcC9Eb3duIHdpbGwgbW92ZSB0aGUgc2VsZWN0aW9uIHRvIHRoZSB0b3Btb3N0L2JvdHRvbW1vc3RcbiAqICAgdmlzaWJsZSBpdGVtIGlmIHRoZSBzZWxlY3Rpb24gaXMgbm90IGFscmVhZHkgdGhlcmUuIFRoZXJlYWZ0ZXIsIHRoZSBrZXkgd2lsbFxuICogICBtb3ZlIHRoZSBzZWxlY3Rpb24gdXAvZG93biBieSBhIHBhZ2UsIGFuZCAocGVyIHRoZSBhYm92ZSBwb2ludCkgbWFrZSB0aGVcbiAqICAgc2VsZWN0ZWQgaXRlbSB2aXNpYmxlLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWtleWJvYXJkLXBhZ2luZ1xuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ2VsZW1lbnQtYmFzZS9leHRlbnNpYmxlL0NvbXBvc2FibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZFBhZ2luZyB7XG5cbiAga2V5ZG93bihldmVudCkge1xuICAgIGxldCBoYW5kbGVkO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSAzMzogLy8gUGFnZSBVcFxuICAgICAgICBoYW5kbGVkID0gdGhpcy5wYWdlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM0OiAvLyBQYWdlIERvd25cbiAgICAgICAgaGFuZGxlZCA9IHRoaXMucGFnZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBkb3duIG9uZSBwYWdlLlxuICAgKlxuICAgKiBAbWV0aG9kIHBhZ2VEb3duXG4gICAqL1xuICBwYWdlRG93bigpIHtcbiAgICByZXR1cm4gc2Nyb2xsT25lUGFnZSh0aGlzLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdXAgb25lIHBhZ2UuXG4gICAqXG4gICAqIEBtZXRob2QgcGFnZVVwXG4gICAqL1xuICBwYWdlVXAoKSB7XG4gICAgcmV0dXJuIHNjcm9sbE9uZVBhZ2UodGhpcywgZmFsc2UpO1xuICB9XG5cbn1cblxuXG4vLyBSZXR1cm4gdGhlIGl0ZW0gd2hvc2UgY29udGVudCBzcGFucyB0aGUgZ2l2ZW4geSBwb3NpdGlvbiAocmVsYXRpdmUgdG8gdGhlXG4vLyB0b3Agb2YgdGhlIGxpc3QncyBzY3JvbGxpbmcgY2xpZW50IGFyZWEpLCBvciBudWxsIGlmIG5vdCBmb3VuZC5cbi8vXG4vLyBJZiBkb3dud2FyZCBpcyB0cnVlLCBtb3ZlIGRvd24gdGhlIGxpc3Qgb2YgaXRlbXMgdG8gZmluZCB0aGUgZmlyc3QgaXRlbVxuLy8gZm91bmQgYXQgdGhlIGdpdmVuIHkgcG9zaXRpb247IGlmIGRvd253YXJkIGlzIGZhbHNlLCBtb3ZlIHVwIHRoZSBsaXN0IG9mXG4vLyBpdGVtcyB0byBmaW5kIHRoZSBsYXN0IGl0ZW0gYXQgdGhhdCBwb3NpdGlvbi5cbmZ1bmN0aW9uIGdldEluZGV4T2ZJdGVtQXRZKGVsZW1lbnQsIHksIGRvd253YXJkKSB7XG4gIHZhciBpdGVtcyA9IGVsZW1lbnQuaXRlbXM7XG4gIHZhciBzdGFydCA9IGRvd253YXJkID8gMCA6IGl0ZW1zLmxlbmd0aCAtIDE7XG4gIHZhciBlbmQgPSBkb3dud2FyZCA/IGl0ZW1zLmxlbmd0aCA6IDA7XG4gIHZhciBzdGVwID0gZG93bndhcmQgPyAxIDogLTE7XG4gIHZhciBpbm5lcm1vc3QgPSBlbGVtZW50LmlubmVybW9zdEF0dGFjaGVkO1xuICB2YXIgdG9wT2ZDbGllbnRBcmVhID0gaW5uZXJtb3N0Lm9mZnNldFRvcCArIGlubmVybW9zdC5jbGllbnRUb3A7XG4gIHZhciBpID0gc3RhcnQ7XG4gIHZhciBmb3VuZCA9IGZhbHNlO1xuICB3aGlsZSAoaSAhPT0gZW5kKSB7XG4gICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICB2YXIgaXRlbVRvcCA9IGl0ZW0ub2Zmc2V0VG9wIC0gdG9wT2ZDbGllbnRBcmVhO1xuICAgIHZhciBpdGVtQm90dG9tID0gaXRlbVRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGlmIChpdGVtVG9wIDw9IHkgJiYgaXRlbUJvdHRvbSA+PSB5KSB7XG4gICAgICAvLyBJdGVtIHNwYW5zIHRoZSBpbmRpY2F0ZWQgeSBjb29yZGluYXRlLlxuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGkgKz0gc3RlcDtcbiAgfVxuXG4gIGlmICghZm91bmQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFdlIG1heSBoYXZlIGZvdW5kIGFuIGl0ZW0gd2hvc2UgcGFkZGluZyBzcGFucyB0aGUgZ2l2ZW4geSBjb29yZGluYXRlLFxuICAvLyBidXQgd2hvc2UgY29udGVudCBpcyBhY3R1YWxseSBhYm92ZS9iZWxvdyB0aGF0IHBvaW50LlxuICAvLyBUT0RPOiBJZiB0aGUgaXRlbSBoYXMgYSBib3JkZXIsIHRoZW4gcGFkZGluZyBzaG91bGQgYmUgaW5jbHVkZWQgaW5cbiAgLy8gY29uc2lkZXJpbmcgYSBoaXQuXG4gIHZhciBpdGVtU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGl0ZW0pO1xuICB2YXIgaXRlbVBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KGl0ZW1TdHlsZS5wYWRkaW5nVG9wKTtcbiAgdmFyIGl0ZW1QYWRkaW5nQm90dG9tID0gcGFyc2VGbG9hdChpdGVtU3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gIHZhciBjb250ZW50VG9wID0gaXRlbVRvcCArIGl0ZW0uY2xpZW50VG9wICsgaXRlbVBhZGRpbmdUb3A7XG4gIHZhciBjb250ZW50Qm90dG9tID0gY29udGVudFRvcCArIGl0ZW0uY2xpZW50SGVpZ2h0IC0gaXRlbVBhZGRpbmdUb3AgLSBpdGVtUGFkZGluZ0JvdHRvbTtcbiAgaWYgKGRvd253YXJkICYmIGNvbnRlbnRUb3AgPD0geVxuICAgIHx8ICFkb3dud2FyZCAmJiBjb250ZW50Qm90dG9tID49IHkpIHtcbiAgICAvLyBUaGUgaW5kaWNhdGVkIGNvb3JkaW5hdGUgaGl0cyB0aGUgYWN0dWFsIGl0ZW0gY29udGVudC5cbiAgICByZXR1cm4gaTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBUaGUgaW5kaWNhdGVkIGNvb3JkaW5hdGUgZmFsbHMgd2l0aGluIHRoZSBpdGVtJ3MgcGFkZGluZy4gQmFjayB1cCB0b1xuICAgIC8vIHRoZSBpdGVtIGJlbG93L2Fib3ZlIHRoZSBpdGVtIHdlIGZvdW5kIGFuZCByZXR1cm4gdGhhdC5cbiAgICBpIC09IHN0ZXA7XG4gICAgcmV0dXJuIGk7XG4gIH1cbn1cblxuLy8gTW92ZSBieSBvbmUgcGFnZSBkb3dud2FyZCAoaWYgZG93bndhcmQgaXMgdHJ1ZSksIG9yIHVwd2FyZCAoaWYgZmFsc2UpLlxuLy8gUmV0dXJuIHRydWUgaWYgd2UgZW5kZWQgdXAgY2hhbmdpbmcgdGhlIHNlbGVjdGlvbiwgZmFsc2UgaWYgbm90LlxuLy8gVE9ETzogQmV0dGVyIHN1cHBvcnQgZm9yIGhvcml6b250YWwgbGlzdHMuXG5mdW5jdGlvbiBzY3JvbGxPbmVQYWdlKGVsZW1lbnQsIGRvd253YXJkKSB7XG5cbiAgdmFyIGlubmVybW9zdCA9IGVsZW1lbnQuaW5uZXJtb3N0QXR0YWNoZWQ7XG4gIGlmICghaW5uZXJtb3N0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBpdGVtIHZpc2libGUganVzdCBhdCB0aGUgZWRnZSBvZiBkaXJlY3Rpb24gd2UncmUgaGVhZGluZy5cbiAgLy8gV2UnbGwgc2VsZWN0IHRoYXQgaXRlbSBpZiBpdCdzIG5vdCBhbHJlYWR5IHNlbGVjdGVkLlxuICB2YXIgZWRnZSA9IGlubmVybW9zdC5zY3JvbGxUb3AgKyAoZG93bndhcmQgPyBpbm5lcm1vc3QuY2xpZW50SGVpZ2h0IDogMCk7XG4gIHZhciBpbmRleE9mSXRlbUF0RWRnZSA9IGdldEluZGV4T2ZJdGVtQXRZKGVsZW1lbnQsIGVkZ2UsIGRvd253YXJkKTtcblxuICB2YXIgc2VsZWN0ZWRJbmRleCA9IGVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcbiAgdmFyIG5ld0luZGV4O1xuICBpZiAoaW5kZXhPZkl0ZW1BdEVkZ2UgJiYgc2VsZWN0ZWRJbmRleCA9PT0gaW5kZXhPZkl0ZW1BdEVkZ2UpIHtcbiAgICAvLyBUaGUgaXRlbSBhdCB0aGUgZWRnZSB3YXMgYWxyZWFkeSBzZWxlY3RlZCwgc28gc2Nyb2xsIGluIHRoZSBpbmRpY2F0ZWRcbiAgICAvLyBkaXJlY3Rpb24gYnkgb25lIHBhZ2UuIExlYXZlIHRoZSBuZXcgaXRlbSBhdCB0aGF0IGVkZ2Ugc2VsZWN0ZWQuXG4gICAgdmFyIGRlbHRhID0gKGRvd253YXJkID8gMSA6IC0xKSAqIGlubmVybW9zdC5jbGllbnRIZWlnaHQ7XG4gICAgbmV3SW5kZXggPSBnZXRJbmRleE9mSXRlbUF0WShlbGVtZW50LCBlZGdlICsgZGVsdGEsIGRvd253YXJkKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBUaGUgaXRlbSBhdCB0aGUgZWRnZSB3YXNuJ3Qgc2VsZWN0ZWQgeWV0LiBJbnN0ZWFkIG9mIHNjcm9sbGluZywgd2UnbGxcbiAgICAvLyBqdXN0IHNlbGVjdCB0aGF0IGl0ZW0uIFRoYXQgaXMsIHRoZSBmaXJzdCBhdHRlbXB0IHRvIHBhZ2UgdXAvZG93blxuICAgIC8vIHVzdWFsbHkganVzdCBtb3ZlcyB0aGUgc2VsZWN0aW9uIHRvIHRoZSBlZGdlIGluIHRoYXQgZGlyZWN0aW9uLlxuICAgIG5ld0luZGV4ID0gaW5kZXhPZkl0ZW1BdEVkZ2U7XG4gIH1cblxuICBpZiAoIW5ld0luZGV4KSB7XG4gICAgLy8gV2UgY2FuJ3QgZmluZCBhbiBpdGVtIGluIHRoZSBkaXJlY3Rpb24gd2Ugd2FudCB0byB0cmF2ZWwuIFNlbGVjdCB0aGVcbiAgICAvLyBsYXN0IGl0ZW0gKGlmIG1vdmluZyBkb3dud2FyZCkgb3IgZmlyc3QgaXRlbSAoaWYgbW92aW5nIHVwd2FyZCkuXG4gICAgbmV3SW5kZXggPSAoZG93bndhcmQgPyBlbGVtZW50Lml0ZW1zLmxlbmd0aCAtIDEgOiAwKTtcbiAgfVxuXG4gIGlmIChuZXdJbmRleCAhPT0gc2VsZWN0ZWRJbmRleCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IG5ld0luZGV4O1xuICAgIHJldHVybiB0cnVlOyAvLyBXZSBoYW5kbGVkIHRoZSBwYWdlIHVwL2Rvd24gb3Vyc2VsdmVzLlxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTsgLy8gV2UgZGlkbid0IGRvIGFueXRoaW5nLlxuICB9XG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoS2V5Ym9hcmRQYWdpbmcucHJvdG90eXBlLCB7XG4gIGtleWRvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlck1peGluUmVzdWx0KVxufSk7XG4iLCIvKipcbiAqIEhhbmRsZSBsaXN0IGJveC1zdHlsZSBwcmVmaXggdHlwaW5nLCBpbiB3aGljaCB0aGUgdXNlciBjYW4gdHlwZSBhIHN0cmluZyB0b1xuICogc2VsZWN0IHRoZSBmaXJzdCBpdGVtIHRoYXQgYmVnaW5zIHdpdGggdGhhdCBzdHJpbmcuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmQtcHJlZml4LXNlbGVjdGlvblxuICpcbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdlbGVtZW50LWJhc2UvZXh0ZW5zaWJsZS9Db21wb3NhYmxlJztcblxuLy8gVE9ETzogSWYgdGhlIHNlbGVjdGlvbiBpcyBjaGFuZ2VkIGJ5IHNvbWUgb3RoZXIgbWVhbnMgKGUuZy4sIGFycm93IGtleXMpIG90aGVyXG4vLyB0aGFuIHByZWZpeCB0eXBpbmcsIHRoZW4gdGhhdCBhY3Qgc2hvdWxkIHJlc2V0IHRoZSBwcmVmaXguXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkUHJlZml4U2VsZWN0aW9uIHtcblxuICAvLyBpdGVtc0NoYW5nZWQoKSB7XG4gIC8vICAgdGhpcy5faXRlbVRleHRDb250ZW50cyA9IG51bGw7XG4gIC8vICAgcmVzZXRUeXBlZFByZWZpeCh0aGlzKTtcbiAgLy8gfVxuXG4gIGtleWRvd24oZXZlbnQpIHtcbiAgICBsZXQgaGFuZGxlZDtcbiAgICBsZXQgcmVzZXRQcmVmaXggPSB0cnVlO1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDg6IC8vIEJhY2tzcGFjZVxuICAgICAgICBoYW5kbGVCYWNrc3BhY2UodGhpcyk7XG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICByZXNldFByZWZpeCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjc6IC8vIEVzY2FwZVxuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXkgJiYgIWV2ZW50LmFsdEtleVxuICAgICAgICAgICYmIGV2ZW50LndoaWNoICE9PSAzMiAvKiBTcGFjZSAqLykge1xuICAgICAgICAgIGhhbmRsZVBsYWluQ2hhcmFjdGVyKHRoaXMsIFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpKTtcbiAgICAgICAgfVxuICAgICAgICByZXNldFByZWZpeCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChyZXNldFByZWZpeCkge1xuICAgICAgcmVzZXRUeXBlZFByZWZpeCh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFuZGxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIGZpcnN0IGl0ZW0gd2hvc2UgdGV4dCBjb250ZW50IGJlZ2lucyB3aXRoIHRoZSBnaXZlbiBwcmVmaXguXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4XG4gICAqIEBwYXJhbSBwcmVmaXggW1N0cmluZ10gVGhlIHN0cmluZyB0byBzZWFyY2ggZm9yXG4gICAqL1xuICBzZWxlY3RJdGVtV2l0aFRleHRQcmVmaXgocHJlZml4KSB7XG4gICAgaWYgKHByZWZpeCA9PSBudWxsIHx8IHByZWZpeC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGluZGV4ID0gZ2V0SW5kZXhPZkl0ZW1XaXRoVGV4dFByZWZpeCh0aGlzLCBwcmVmaXgpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH1cblxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEtleWJvYXJkUHJlZml4U2VsZWN0aW9uLnByb3RvdHlwZSwge1xuICBrZXlkb3duOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJNaXhpblJlc3VsdClcbn0pO1xuXG5cbi8vIFRpbWUgaW4gbWlsbGlzZWNvbmRzIGFmdGVyIHdoaWNoIHRoZSB1c2VyIGlzIGNvbnNpZGVyZWQgdG8gaGF2ZSBzdG9wcGVkXG4vLyB0eXBpbmcuXG5jb25zdCBQUkVGSVhfVElNRU9VVF9EVVJBVElPTiA9IDEwMDA7XG5cblxuLy8gUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbSB3aXRoIHRoZSBnaXZlbiBwcmVmaXgsIGVsc2UgLTEuXG5mdW5jdGlvbiBnZXRJbmRleE9mSXRlbVdpdGhUZXh0UHJlZml4KGVsZW1lbnQsIHByZWZpeCkge1xuICBsZXQgaXRlbVRleHRDb250ZW50cyA9IGdldEl0ZW1UZXh0Q29udGVudHMoZWxlbWVudCk7XG4gIGxldCBwcmVmaXhMZW5ndGggPSBwcmVmaXgubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1UZXh0Q29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaXRlbVRleHRDb250ZW50ID0gaXRlbVRleHRDb250ZW50c1tpXTtcbiAgICBpZiAoaXRlbVRleHRDb250ZW50LnN1YnN0cigwLCBwcmVmaXhMZW5ndGgpID09PSBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8vIFJldHVybiBhbiBhcnJheSBvZiB0aGUgdGV4dCBjb250ZW50IChpbiBsb3dlcmNhc2UpIG9mIGFsbCBpdGVtcy5cbi8vIENhY2hlIHRoZXNlIHJlc3VsdHMuXG5mdW5jdGlvbiBnZXRJdGVtVGV4dENvbnRlbnRzKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzKSB7XG4gICAgbGV0IGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgICBlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzID0gaXRlbXMubWFwKGNoaWxkID0+IHtcbiAgICAgIGxldCB0ZXh0ID0gY2hpbGQudGV4dENvbnRlbnQgfHwgY2hpbGQuYWx0O1xuICAgICAgcmV0dXJuIHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5faXRlbVRleHRDb250ZW50cztcbn1cblxuZnVuY3Rpb24gaGFuZGxlQmFja3NwYWNlKGVsZW1lbnQpIHtcbiAgbGV0IGxlbmd0aCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4ID8gZWxlbWVudC5fdHlwZWRQcmVmaXgubGVuZ3RoIDogMDtcbiAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50Ll90eXBlZFByZWZpeCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4LnN1YnN0cigwLCBsZW5ndGggLSAxKTtcbiAgfVxuICBlbGVtZW50LnNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50Ll90eXBlZFByZWZpeCk7XG4gIGVsZW1lbnQuX3NldFByZWZpeFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUGxhaW5DaGFyYWN0ZXIoZWxlbWVudCwgY2hhcikge1xuICBsZXQgcHJlZml4ID0gZWxlbWVudC5fdHlwZWRQcmVmaXggfHwgJyc7XG4gIGVsZW1lbnQuX3R5cGVkUHJlZml4ID0gcHJlZml4ICsgY2hhci50b0xvd2VyQ2FzZSgpO1xuICBlbGVtZW50LnNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50Ll90eXBlZFByZWZpeCk7XG4gIHNldFByZWZpeFRpbWVvdXQoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0UHJlZml4VGltZW91dChlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Ll9wcmVmaXhUaW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQpO1xuICAgIGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldFR5cGVkUHJlZml4KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5fdHlwZWRQcmVmaXggPSAnJztcbiAgcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpIHtcbiAgcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xuICBlbGVtZW50Ll9wcmVmaXhUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVzZXRUeXBlZFByZWZpeChlbGVtZW50KTtcbiAgfSwgUFJFRklYX1RJTUVPVVRfRFVSQVRJT04pO1xufVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggYXBwbGllcyBzdGFuZGFyZCBoaWdobGlnaHQgY29sb3JzIHRvIGEgc2VsZWN0ZWQgaXRlbS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1zZWxlY3Rpb24taGlnaGxpZ2h0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0aW9uSGlnaGxpZ2h0IHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc2VsZWN0ZWQgPyAnaGlnaGxpZ2h0JyA6ICcnO1xuICAgIGl0ZW0uc3R5bGUuY29sb3IgPSBzZWxlY3RlZCA/ICdoaWdobGlnaHR0ZXh0JyA6ICcnO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIHNjcm9sbHMgYSBjb250YWluZXIgdG8ga2VlcCB0aGUgc2VsZWN0ZWQgaXRlbSB2aXNpYmxlLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLXNlbGVjdGlvbi1zY3JvbGxcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3Rpb25TY3JvbGwge1xuXG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAvLyBLZWVwIHRoZSBzZWxlY3RlZCBpdGVtIGluIHZpZXcuXG4gICAgICB0aGlzLnNjcm9sbEl0ZW1JbnRvVmlldyhpdGVtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRoZSBnaXZlbiBlbGVtZW50IGNvbXBsZXRlbHkgaW50byB2aWV3LCBtaW5pbWl6aW5nIHRoZSBkZWdyZWUgb2ZcbiAgICogc2Nyb2xsaW5nIHBlcmZvcm1lZC5cbiAgICpcbiAgICogQmxpbmsgaGFzIGEgc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCgpIGZ1bmN0aW9uIHRoYXQgYWxtb3N0IHRoZSBzYW1lIHRoaW5nLFxuICAgKiBidXQgdW5mb3J0dW5hdGVseSBpdCdzIG5vbi1zdGFuZGFyZCwgYW5kIGluIGFueSBldmVudCBvZnRlbiBlbmRzIHVwXG4gICAqIHNjcm9sbGluZyBtb3JlIHRoYW4gaXMgYWJzb2x1dGVseSBuZWNlc3NhcnkuXG4gICAqXG4gICAqIEBtZXRob2Qgc2Nyb2xsSXRlbUludG9WaWV3XG4gICAqL1xuICBzY3JvbGxJdGVtSW50b1ZpZXcoaXRlbSkge1xuICAgIC8vIEdldCB0aGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gd2l0aCByZXNwZWN0IHRvIHRoZSB0b3Agb2YgdGhlXG4gICAgLy8gbGlzdCdzIHNjcm9sbGFibGUgY2FudmFzLiBBbiBpdGVtIGF0IHRoZSB0b3Agb2YgdGhlIGxpc3Qgd2lsbCBoYXZlIGFcbiAgICAvLyBlbGVtZW50VG9wIG9mIDAuXG5cbiAgICBsZXQgaW5uZXJtb3N0ID0gdGhpcy5pbm5lcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAoIWlubmVybW9zdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbGVtZW50VG9wID0gaXRlbS5vZmZzZXRUb3AgLSBpbm5lcm1vc3Qub2Zmc2V0VG9wIC0gaW5uZXJtb3N0LmNsaWVudFRvcDtcbiAgICBsZXQgZWxlbWVudEJvdHRvbSA9IGVsZW1lbnRUb3AgKyBpdGVtLm9mZnNldEhlaWdodDtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIGJvdHRvbSBvZiB0aGUgc2Nyb2xsYWJsZSBjYW52YXMuXG4gICAgbGV0IHNjcm9sbEJvdHRvbSA9IGlubmVybW9zdC5zY3JvbGxUb3AgKyBpbm5lcm1vc3QuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChlbGVtZW50Qm90dG9tID4gc2Nyb2xsQm90dG9tKSB7XG4gICAgICAvLyBTY3JvbGwgdXAgdW50aWwgaXRlbSBpcyBlbnRpcmVseSB2aXNpYmxlLlxuICAgICAgaW5uZXJtb3N0LnNjcm9sbFRvcCArPSBlbGVtZW50Qm90dG9tIC0gc2Nyb2xsQm90dG9tO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50VG9wIDwgaW5uZXJtb3N0LnNjcm9sbFRvcCkge1xuICAgICAgLy8gU2Nyb2xsIGRvd24gdW50aWwgaXRlbSBpcyBlbnRpcmVseSB2aXNpYmxlLlxuICAgICAgaW5uZXJtb3N0LnNjcm9sbFRvcCA9IGVsZW1lbnRUb3A7XG4gICAgfVxuICB9XG5cbn1cbiIsIi8qXG4gKiBFeHRlbmQgY2xhc3Nlcy9vYmplY3RzIHdpdGggb3RoZXIgY2xhc3Nlcy9vYmplY3RzLlxuICovXG5cbmltcG9ydCAqIGFzIENvbXBvc2l0aW9uUnVsZXMgZnJvbSAnLi9Db21wb3NpdGlvblJ1bGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9zYWJsZSB7XG5cbiAgLypcbiAgICogUmV0dXJuIGEgc3ViY2xhc3Mgb2YgdGhlIGN1cnJlbnQgY2xhc3MgdGhhdCBpbmNsdWRlcyB0aGUgbWVtYmVycyBpbmRpY2F0ZWRcbiAgICogaW4gdGhlIGFyZ3VtZW50LiBUaGUgYXJndW1lbnQgY2FuIGJlIGEgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3QsIG9yIGEgY2xhc3NcbiAgICogd2hvc2UgcHJvdG90eXBlIGNvbnRhaW5zIHRoZSBtZW1iZXJzIHRoYXQgd2lsbCBiZSBjb3BpZWQuXG4gICAqXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIGEgY291cGxlIG9mIHB1cnBvc2VzOlxuICAgKiAxLiBFeHRlbmQgYSBjbGFzcyB3aXRoIG1peGlucy9iZWhhdmlvcnMuXG4gICAqIDIuIENyZWF0ZSBhIGNvbXBvbmVudCBjbGFzcyBpbiBFUzUuXG4gICAqXG4gICAqIFRoZSBjYWxsXG4gICAqXG4gICAqICAgTXlCYXNlQ2xhc3MuY29tcG9zZShNaXhpbjEsIE1peGluMiwgTWl4aW4zKVxuICAgKlxuICAgKiB3aWxsIHJldHVybiBhIG5ldyBjbGFzcyBvZiBNeUJhc2VDbGFzcyB0aGF0IGltcGxlbWVudHMgYWxsIHRoZSBtZXRob2RzIGluXG4gICAqIHRoZSB0aHJlZSBtaXhpbnMgZ2l2ZW4uIFRoZSBhYm92ZSBpcyBlcXVpdmFsZW50IHRvXG4gICAqXG4gICAqICAgTXlCYXNlQ2xhc3MuY29tcG9zZShNaXhpbjEpLmNvbXBvc2UoTWl4aW4yKS5jb21wb3NlKE1peGluMylcbiAgICpcbiAgICogVGhpcyBtZXRob2QgY2FuIGJlIHN0YXRpY2FsbHkgaW52b2tlZCB0byBleHRlbmQgcGxhaW4gb2JqZWN0czpcbiAgICpcbiAgICogICBsZXQgZXh0ZW5kZWQgPSBDb21wb3NhYmxlLmV4dGVuZC5jYWxsKG9iajEsIG9iajIpO1xuICAgKlxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2UoLi4ubWl4aW5zKSB7XG4gICAgLy8gV2UgY3JlYXRlIGEgbmV3IHN1YmNsYXNzIGZvciBlYWNoIG1peGluIGluIHR1cm4uIFRoZSByZXN1bHQgYmVjb21lc1xuICAgIC8vIHRoZSBiYXNlIGNsYXNzIGV4dGVuZGVkIGJ5IGFueSBzdWJzZXF1ZW50IG1peGlucy4gSXQgdHVybnMgb3V0IHRoYXRcbiAgICAvLyB3ZSBjYW4gdXNlIEFycmF5LnJlZHVjZSgpIHRvIGNvbmNpc2VseSBleHByZXNzIHRoaXMsIHVzaW5nIHRoZSBjdXJyZW50XG4gICAgLy8gKG9yaWdpbmFsKSBjbGFzcyBhcyB0aGUgc2VlZCBmb3IgcmVkdWNlKCkuXG4gICAgcmV0dXJuIG1peGlucy5yZWR1Y2UoY29tcG9zZSwgdGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZGVjb3JhdGUoZGVjb3JhdG9ycykge1xuICAgIGZvciAobGV0IGtleSBpbiBkZWNvcmF0b3JzKSB7XG4gICAgICBsZXQgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1trZXldO1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIGtleSk7XG4gICAgICBkZWNvcmF0b3IodGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIGRlY29yYXRlKGRlY29yYXRvcnMpIHtcbiAgICBDb21wb3NhYmxlLmRlY29yYXRlLmNhbGwodGhpcywgZGVjb3JhdG9ycyk7XG4gIH1cblxuICAvLyBEZWNvcmF0ZSBmb3IgYW5ub3RhdGluZyBob3cgYSBjbGFzcyBtZW1iZXIgc2hvdWxkIGJlIGNvbXBvc2VkIGxhdGVyLlxuICAvLyBUaGlzIHRha2VzIGEgZGVjb3JhdG9yIHRoYXQgd2lsbCBiZSBydW4gYXQgKmNvbXBvc2l0aW9uKiB0aW1lLlxuICAvLyBGb3Igbm93LCB0aGlzIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gbWV0aG9kcy5cbiAgc3RhdGljIHJ1bGUoZGVjb3JhdG9yKSB7XG4gICAgLy8gV2UgcmV0dXJuIGEgZGVjb3JhdG9yIHRoYXQganVzdCBhZGRzIHRoZSBkZWNvcmF0b3IgZ2l2ZW4gYWJvdmUgdG8gdGhlXG4gICAgLy8gbWVtYmVyLlxuICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgLy8gVE9ETzogVXNlIGEgU3ltYm9sIGluc3RlYWQgb2YgYSBzdHJpbmcgcHJvcGVydHkgbmFtZSB0byBzYXZlIHRoaXMuXG4gICAgICBkZXNjcmlwdG9yLnZhbHVlLl9jb21wb3NpdGlvblJ1bGUgPSBkZWNvcmF0b3I7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vKlxuICogRXhwb3NlIHN0YW5kYXJkIGNvbXBvc2l0aW9uIHJ1bGVzIGFzIHByb3BlcnRpZXMgb2YgQ29tcG9zYWJsZS5cbiAqIFRoaXMgYXZvaWRzIHRoZSBuZWVkIGZvciBzb21lb25lIHRvIG1ha2UgYSBzZXBhcmF0ZSBpbXBvcnQgb2YgdGhlIHJ1bGVzLlxuICovXG5Db21wb3NhYmxlLnJ1bGVzID0gQ29tcG9zaXRpb25SdWxlcztcblxuXG4vKlxuICogQWxsIENvbXBvc2FibGUtY3JlYXRlZCBvYmplY3RzIGtlZXAgcmVmZXJlbmNlcyB0byB0aGUgbWl4aW5zIHRoYXQgd2VyZVxuICogYXBwbGllZCB0byBjcmVhdGUgdGhlbS4gV2hlbiBhICpuYW1lZCogbWl4aW4gaXMgYXBwbGllZCB0byB0aGUgcHJvdG90eXBlXG4gKiBjaGFpbiwgdGhlIHJlc3VsdGluZyBvYmplY3QgKG9yLCBmb3IgYSBjbGFzcywgdGhlIGNsYXNzJyBwcm90b3R5cGUpIHdpbGxcbiAqIGhhdmUgYSBuZXcgbWVtYmVyIHdpdGggdGhhdCBuYW1lIHRoYXQgcG9pbnRzIGJhY2sgdG8gdGhlIHNhbWUgb2JqZWN0LlxuICogVGhhdCBmYWNpbGl0eSBpcyB1c2VmdWwgd2hlbiBkZWFsaW5nIHdpdGggY2hhaW5zIHRoYXQgaGF2ZSBiZWVuIGV4dGVuZGVkXG4gKiBtb3JlIHRoYW4gb25jZSwgYXMgYW4gbWl4aW4ncyBuYW1lIGlzIHN1ZmZpY2llbnQgdG8gcmV0cmlldmUgYSByZWZlcmVuY2VcbiAqIHRvIHRoYXQgcG9pbnQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAqXG4gKiBBIHNpbmdsZSBtaXhpbiBjYW4gYmUgYXBwbGllZCB0byBtdWx0aXBsZSBwcm90b3R5cGUgY2hhaW5zIC0tIHRoZSBuYW1lXG4gKiByZWZlcnMgdG8gdGhlIHByb3RvdHlwZSBvbiAqdGhpcyBwYXJ0aWN1bGFyIHByb3RvdHlwZSBjaGFpbiogdGhhdCB3YXMgYWRkZWRcbiAqIGZvciB0aGF0IG1peGluLiBUaGlzIGxldHMgbWl4aW4vbWl4aW4gY29kZSBnZXQgYmFjayB0byBpdHMgb3duXG4gKiBwcm90b3R5cGUsIG1vc3Qgb2Z0ZW4gaW4gY29tYmluYXRpb24gd2l0aCBcInN1cGVyXCIgKHNlZSBiZWxvdykgaW4gb3JkZXIgdG9cbiAqIGludm9rZSBzdXBlcmNsYXNzIGJlaGF2aW9yLlxuICovXG5Db21wb3NhYmxlLnByb3RvdHlwZS5Db21wb3NhYmxlID0gQ29tcG9zYWJsZS5wcm90b3R5cGU7XG5cbi8qXG4gKiBBbGwgQ29tcG9zYWJsZS1jcmVhdGVkIG9iamVjdHMgaGF2ZSBhIFwic3VwZXJcIiBwcm9wZXJ0eSB0aGF0IHJlZmVyZW5jZXMgdGhlXG4gKiBwcm90b3R5cGUgYWJvdmUgdGhlbSBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIFRoaXMgXCJzdXBlclwiIHJlZmVyZW5jZSBpcyB1c2VkIGFzIGEgcmVwbGFjZW1lbnQgZm9yIEVTNidzIFwic3VwZXJcIiBrZXl3b3JkIGluXG4gKiBpbiBFUzUgKG9yIHRyYW5zcGlsZWQgRVM2KSBtaXhpbnMgdGhhdCB3YW50IHRvIGludm9rZSBzdXBlcmNsYXNzIGJlaGF2aW9yLFxuICogd2hlcmUgdGhlIHNwZWNpZmljIHN1cGVyY2xhc3Mgd2lsbCBkZXBlbmQgdXBvbiB3aGljaCBtaXhpbnMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAqIHRvIGEgZ2l2ZW4gcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIEUuZy46XG4gKiAgIGNsYXNzIE1peGluIHtcbiAqICAgICBmb28oKSB7XG4gKiAgICAgICBpZiAodGhpcy5NaXhpbi5zdXBlci5mb28pIHtcbiAqICAgICAgICAgdGhpcy5NaXhpbi5zdXBlci5mb28uY2FsbCh0aGlzKTsgLy8gSW52b2tlIHN1cGVyY2xhc3MnIGZvbygpXG4gKiAgICAgICB9XG4gKiAgICAgICAvLyBEbyBNaXhpbi1zcGVjaWZpYyB3b3JrIGhlcmUuLi5cbiAqICAgICB9XG4gKiAgIH1cbiAqXG4gKiBGb3IgY29uc2lzdGVuY3ksIENvbXBvc2FibGUgaXRzZWxmIHJlY29yZHMgaXRzIG93biBzdXBlcmNsYXNzIGFzIE9iamVjdC5cbiAqL1xuQ29tcG9zYWJsZS5wcm90b3R5cGUuc3VwZXIgPSBPYmplY3QucHJvdG90eXBlO1xuXG5cbi8vIENvbXBvc2l0aW9uIHJ1bGVzIGZvciBzdGFuZGFyZCBvYmplY3QgbWVtYmVycy5cbkNvbXBvc2FibGUucHJvdG90eXBlLmNvbXBvc2l0aW9uUnVsZXMgPSB7XG4gIGNvbnN0cnVjdG9yOiBDb21wb3NhYmxlLm92ZXJyaWRlLFxuICB0b1N0cmluZzogQ29tcG9zYWJsZS5vdmVycmlkZSxcbn07XG5cblxuZnVuY3Rpb24gYXBwbHlDb21wb3NpdGlvblJ1bGVzKG9iaikge1xuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKG5hbWUgaW4gYmFzZSkge1xuICAgICAgLy8gQmFzZSBhbHNvIGltcGxlbWVudHMgYSBtZW1iZXIgd2l0aCB0aGUgc2FtZSBuYW1lOyBuZWVkIHRvIGNvbWJpbmUuXG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgICAgIGxldCBydWxlID0gZGVzY3JpcHRvci52YWx1ZSAmJiBkZXNjcmlwdG9yLnZhbHVlLl9jb21wb3NpdGlvblJ1bGU7XG4gICAgICBpZiAoIXJ1bGUpIHtcbiAgICAgICAgLy8gU2VlIGlmIHByb3RvdHlwZSBjaGFpbiBoYXMgYSBydWxlIGZvciB0aGlzIG1lbWJlci5cbiAgICAgICAgcnVsZSA9IG9iai5jb21wb3NpdGlvblJ1bGVzW25hbWVdO1xuICAgICAgfVxuICAgICAgaWYgKCFydWxlKSB7XG4gICAgICAgIHJ1bGUgPSBnZXREZWZhdWx0Q29tcG9zaXRpb25SdWxlKGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgICAgLy8gXCJvdmVycmlkZVwiIGlzIGEga25vd24gbm8tb3AsIHNvIHdlIGRvbid0IGJvdGhlciB0cnlpbmcgdG8gcmVkZWZpbmUgdGhlXG4gICAgICAvLyBwcm9wZXJ0eS5cbiAgICAgIGlmIChydWxlICYmIHJ1bGUgIT09IENvbXBvc2FibGUub3ZlcnJpZGUpIHtcbiAgICAgICAgcnVsZShvYmosIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5cbi8qXG4gKiBDb3B5IHRoZSBnaXZlbiBwcm9wZXJ0aWVzL21ldGhvZHMgdG8gdGhlIHRhcmdldC5cbiAqL1xuZnVuY3Rpb24gY29weU93blByb3BlcnRpZXMoc291cmNlLCB0YXJnZXQsIGlnbm9yZVByb3BlcnR5TmFtZXMgPSBbXSkge1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKGlnbm9yZVByb3BlcnR5TmFtZXMuaW5kZXhPZihuYW1lKSA8IDApIHtcbiAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIG5hbWUpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG4vKlxuICogUmV0dXJuIGEgbmV3IHN1YmNsYXNzL29iamVjdCB0aGF0IGV4dGVuZHMgdGhlIGdpdmVuIGJhc2UgY2xhc3Mvb2JqZWN0IHdpdGhcbiAqIHRoZSBtZW1iZXJzIG9mIHRoZSBpbmRpY2F0ZWQgbWl4aW4uXG4gKi9cbmZ1bmN0aW9uIGNvbXBvc2UoYmFzZSwgbWl4aW4pIHtcblxuICAvLyBDaGVjayB3aGV0aGVyIHRoZSBiYXNlIGFuZCBtaXhpbiBhcmUgY2xhc3NlcyBvciBwbGFpbiBvYmplY3RzLlxuICBsZXQgYmFzZUlzQ2xhc3MgPSBpc0NsYXNzKGJhc2UpO1xuICBsZXQgbWl4aW5Jc0NsYXNzID0gaXNDbGFzcyhtaXhpbik7XG5cbiAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSAqbWl4aW4qIGhhcyBhIGJhc2UgY2xhc3MvcHJvdG90eXBlIG9mIGl0cyBvd24uXG4gIGxldCBtaXhpbkJhc2UgPSBtaXhpbklzQ2xhc3MgP1xuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihtaXhpbi5wcm90b3R5cGUpLmNvbnN0cnVjdG9yIDpcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWl4aW4pO1xuICBpZiAobWl4aW5CYXNlICYmXG4gICAgICBtaXhpbkJhc2UgIT09IEZ1bmN0aW9uICYmXG4gICAgICBtaXhpbkJhc2UgIT09IE9iamVjdCAmJlxuICAgICAgbWl4aW5CYXNlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgLy8gVGhlIG1peGluIGl0c2VsZiBkZXJpdmVzIGZyb20gYW5vdGhlciBjbGFzcy9vYmplY3QuXG4gICAgLy8gUmVjdXJzZSwgYW5kIGV4dGVuZCB3aXRoIHRoZSBtaXhpbidzIGJhc2UgZmlyc3QuXG4gICAgYmFzZSA9IGNvbXBvc2UoYmFzZSwgbWl4aW5CYXNlKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgZXh0ZW5kZWQgb2JqZWN0IHdlJ3JlIGdvaW5nIHRvIHJldHVybiBhcyBhIHJlc3VsdC5cbiAgbGV0IHJlc3VsdDtcbiAgaWYgKGJhc2VJc0NsYXNzKSB7XG4gICAgLy8gQ3JlYXRlIGEgc3ViY2xhc3Mgb2YgYmFzZS4gT25jZSBXZWJLaXQgc3VwcG9ydHMgSFRNTEVsZW1lbnQgYXMgYSByZWFsXG4gICAgLy8gY2xhc3MsIHdlIGNhbiBqdXN0IHNheTpcbiAgICAvL1xuICAgIC8vICAgY2xhc3Mgc3ViY2xhc3MgZXh0ZW5kcyBiYXNlIHt9XG4gICAgLy9cbiAgICAvLyBIb3dldmVyLCB1bnRpbCB0aGF0J3MgcmVzb2x2ZWQsIHdlIGhhdmUgdG8gY29uc3RydWN0IHRoZSBjbGFzcyBvdXJzZWx2ZXMuXG4gICAgcmVzdWx0ID0gZnVuY3Rpb24gc3ViY2xhc3MoKSB7fTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocmVzdWx0LCBiYXNlKTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocmVzdWx0LnByb3RvdHlwZSwgYmFzZS5wcm90b3R5cGUpO1xuICB9IGVsc2Uge1xuICAgIC8vIENyZWF0ZSBhIHBsYWluIG9iamVjdCB0aGF0IHNpbXBseSB1c2VzIHRoZSBiYXNlIGFzIGEgcHJvdG90eXBlLlxuICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoYmFzZSk7XG4gIH1cblxuICBsZXQgc291cmNlO1xuICBsZXQgdGFyZ2V0O1xuICBpZiAoYmFzZUlzQ2xhc3MgJiYgbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gUHJvcGVydGllcyBkZWZpbmVkIGJ5IEZ1bmN0aW9uLlxuICAgIC8vIFdlJ2QgcHJlZmVyIHRvIGdldCBieSBpbnRlcnJvZ2F0aW5nIEZ1bmN0aW9uIGl0c2VsZiwgYnV0IFdlYktpdCBmdW5jdGlvbnNcbiAgICAvLyBoYXZlIHNvbWUgcHJvcGVydGllcyAoYXJndW1lbnRzIGFuZCBjYWxsZXIpIHdoaWNoIGFyZSBub3QgcmV0dXJuZWQgYnlcbiAgICAvLyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhGdW5jdGlvbikuXG4gICAgY29uc3QgRlVOQ1RJT05fUFJPUEVSVElFUyA9IFtcbiAgICAgICdhcmd1bWVudHMnLFxuICAgICAgJ2NhbGxlcicsXG4gICAgICAnbGVuZ3RoJyxcbiAgICAgICduYW1lJyxcbiAgICAgICdwcm90b3R5cGUnXG4gICAgXTtcbiAgICAvLyBFeHRlbmRpbmcgYSBjbGFzcyB3aXRoIGEgY2xhc3MuXG4gICAgLy8gV2UnbGwgY29weSBpbnN0YW5jZSBtZW1iZXJzIGluIGEgbW9tZW50LCBidXQgZmlyc3QgY29weSBzdGF0aWMgbWVtYmVycy5cbiAgICBjb3B5T3duUHJvcGVydGllcyhtaXhpbiwgcmVzdWx0LCBGVU5DVElPTl9QUk9QRVJUSUVTKTtcbiAgICBzb3VyY2UgPSBtaXhpbi5wcm90b3R5cGU7XG4gICAgdGFyZ2V0ID0gcmVzdWx0LnByb3RvdHlwZTtcbiAgfSBlbHNlIGlmICghYmFzZUlzQ2xhc3MgJiYgbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIGEgcGxhaW4gb2JqZWN0IHdpdGggYSBjbGFzcy5cbiAgICAvLyBDb3B5IHByb3RvdHlwZSBtZXRob2RzIGRpcmVjdGx5IHRvIHJlc3VsdC5cbiAgICBzb3VyY2UgPSBtaXhpbi5wcm90b3R5cGU7XG4gICAgdGFyZ2V0ID0gcmVzdWx0O1xuICB9IGVsc2UgaWYgKGJhc2VJc0NsYXNzICYmICFtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgY2xhc3Mgd2l0aCBwbGFpbiBvYmplY3QuXG4gICAgLy8gQ29weSBtaXhpbiB0byByZXN1bHQgcHJvdG90eXBlLlxuICAgIHNvdXJjZSA9IG1peGluO1xuICAgIHRhcmdldCA9IHJlc3VsdC5wcm90b3R5cGU7XG4gIH0gZWxzZSB7XG4gICAgLy8gRXh0ZW5kaW5nIGEgcGxhaW4gb2JqZWN0IHdpdGggYSBwbGFpbiBvYmplY3QuXG4gICAgc291cmNlID0gbWl4aW47XG4gICAgdGFyZ2V0ID0gcmVzdWx0O1xuICB9XG4gIGNvcHlPd25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0LCBbJ2NvbnN0cnVjdG9yJ10pO1xuXG4gIGFwcGx5Q29tcG9zaXRpb25SdWxlcyh0YXJnZXQpO1xuXG4gIGlmIChtaXhpbi5uYW1lKSB7XG4gICAgLy8gVXNlIHRoZSBtaXhpbidzIG5hbWUgKHVzdWFsbHkgdGhlIG5hbWUgb2YgYSBjbGFzcycgY29uc3RydWN0b3IpIHRvXG4gICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSBiYWNrIHRvIHRoZSBuZXdseS1jcmVhdGVkIG9iamVjdCBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIHRhcmdldFttaXhpbi5uYW1lXSA9IHRhcmdldDtcblxuICAgIC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyY2xhc3Mvc3VwZXItb2JqZWN0LiBTZWUgdGhlIGNvbW1lbnRzIG9uXG4gICAgLy8gQ29tcG9zYWJsZSdzIFwic3VwZXJcIiBwcm9wZXJ0eS5cbiAgICB0YXJnZXQuc3VwZXIgPSBiYXNlSXNDbGFzcyA/IGJhc2UucHJvdG90eXBlIDogYmFzZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRDb21wb3NpdGlvblJ1bGUoZGVzY3JpcHRvcikge1xuICBpZiAodHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gQ29tcG9zYWJsZS5ydWxlcy5wcm9wYWdhdGVGdW5jdGlvbjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGRlc2NyaXB0b3Iuc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gUHJvcGVydHkgd2l0aCBnZXR0ZXIgYW5kL29yIHNldHRlci5cbiAgICByZXR1cm4gQ29tcG9zYWJsZS5ydWxlcy5wcm9wYWdhdGVQcm9wZXJ0eTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gUmV0dXJuIHRydWUgaWYgYyBpcyBhIEphdmFTY3JpcHQgY2xhc3MuXG4vLyBXZSB1c2UgdGhpcyB0ZXN0IGJlY2F1c2UsIG9uIFdlYktpdCwgY2xhc3NlcyBsaWtlIEhUTUxFbGVtZW50IGFyZSBzcGVjaWFsLFxuLy8gYW5kIGFyZSBub3QgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uLiBUbyBoYW5kbGUgdGhhdCBjYXNlLCB3ZSB1c2UgYSBsb29zZXJcbi8vIGRlZmluaXRpb246IGFuIG9iamVjdCBpcyBhIGNsYXNzIGlmIGl0IGhhcyBhIHByb3RvdHlwZSwgYW5kIHRoYXQgcHJvdG90eXBlXG4vLyBoYXMgYSBjb25zdHJ1Y3RvciB0aGF0IGlzIHRoZSBvcmlnaW5hbCBvYmplY3QuIFRoaXMgY29uZGl0aW9uIGhvbGRzIHRydWUgZXZlblxuLy8gZm9yIEhUTUxFbGVtZW50IG9uIFdlYktpdC5cbmZ1bmN0aW9uIGlzQ2xhc3MoYykge1xuICByZXR1cm4gdHlwZW9mIGMgPT09ICdmdW5jdGlvbicgfHwgICAgICAgICAgICAgICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIChjLnByb3RvdHlwZSAmJiBjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PT0gYyk7IC8vIEhUTUxFbGVtZW50IGluIFdlYktpdFxufVxuIiwiLyoqXG4gKiBTdGFuZGFyZCBjb21wb3NpdGlvbiBydWxlc1xuICovXG5cbi8vIFRha2UgdHdvIGZ1bmN0aW9ucyBhbmQgcmV0dXJuIGEgbmV3IGNvbXBvc2VkIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBib3RoLlxuLy8gVGhlIGNvbXBvc2VkIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIHNlY29uZCBmdW5jdGlvbi5cbi8vIFRoaXMgaXMgbm90IGEgcnVsZSwgYnV0IGEgaGVscGVyIHVzZWQgYnkgcnVsZXMuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUZ1bmN0aW9uKGZ1bmN0aW9uMSwgZnVuY3Rpb24yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIExpa2UgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpLCBidXQgd2Fsa3MgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbi8vIFRoaXMgaXMgbmVlZGVkIGJ5IGNvbXBvc2l0aW9uIHJ1bGVzLCB3aGljaCB1c3VhbGx5IHN0YXJ0IG91dCBieSBnZXR0aW5nXG4vLyB0aGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBhIG1lbWJlciB0aGV5J3JlIGNvbXBvc2luZy5cbi8vIFRoaXMgaXMgbm90IGEgcnVsZSwgYnV0IGEgaGVscGVyIHVzZWQgYnkgcnVsZXMuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSkge1xuICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfSBlbHNlIHtcbiAgICBsZXQgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgLy8gQ2hlY2tpbmcgZm9yIFwibmFtZSBpbiBwcm90b3R5cGVcIiBsZXRzIHVzIGtub3cgd2hldGhlciB3ZSBzaG91bGQgYm90aGVyXG4gICAgLy8gd2Fsa2luZyB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIGlmIChwcm90b3R5cGUgJiYgbmFtZSBpbiBwcm90b3R5cGUpIHtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBuYW1lKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gTm90IGZvdW5kXG59XG5cbi8vIENvbWJpbmF0b3IgdGhhdCBjYXVzZXMgYSBtaXhpbiBtZXRob2QgdG8gb3ZlcnJpZGUgaXRzIGJhc2UgaW1wbGVtZW50YXRpb24uXG4vLyBTaW5jZSB0aGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBwcm90b3R5cGUgY2hhaW4sIHRoaXMgaXMgYSBuby1vcC5cbmV4cG9ydCBmdW5jdGlvbiBvdmVycmlkZSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge31cblxuLy8gQ29tcG9zZSBtZXRob2RzLCBpbnZva2luZyBiYXNlIGltcGxlbWVudGF0aW9uIGZpcnN0LiBJZiBpdCByZXR1cm5zIGFcbi8vIHRydXRoeSByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgdGhlIG1peGluIGltcGxlbWVudGF0aW9uJ3Ncbi8vIHJlc3VsdCBpcyByZXR1cm5lZC5cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJCYXNlUmVzdWx0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpW2tleV07XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYmFzZUltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgfHwgbWl4aW5JbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbi8vIENvbXBvc2UgbWV0aG9kcywgaW52b2tpbmcgbWl4aW4gaW1wbGVtZW50YXRpb24gZmlyc3QuIElmIGl0IHJldHVybnMgYVxuLy8gdHJ1dGh5IHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlLCB0aGUgYmFzZSBpbXBsZW1lbnRhdGlvbidzXG4vLyByZXN1bHQgaXMgcmV0dXJuZWQuXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyTWl4aW5SZXN1bHQodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClba2V5XTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtaXhpbkltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgfHwgYmFzZUltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuLy8gRGVmYXVsdCBydWxlIGZvciBjb21wb3NpbmcgbWV0aG9kczogaW52b2tlIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG5leHBvcnQgZnVuY3Rpb24gcHJvcGFnYXRlRnVuY3Rpb24odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClba2V5XTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGNvbXBvc2VGdW5jdGlvbihiYXNlSW1wbGVtZW50YXRpb24sIG1peGluSW1wbGVtZW50YXRpb24pO1xufVxuXG4vLyBEZWZhdWx0IHJ1bGUgZm9yIGNvbXBvc2luZyBwcm9wZXJ0aWVzLlxuLy8gV2Ugb25seSBjb21wb3NlIHNldHRlcnMsIHdoaWNoIGludm9rZSBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuLy8gQSBkZWZpbmVkIG1peGluIGdldHRlciBvdmVycmlkZXMgYSBiYXNlIGdldHRlci5cbi8vIE5vdGUgdGhhdCwgYmVjYXVzZSBvZiB0aGUgd2F5IHByb3BlcnR5IGRlc2NyaXB0b3JzIHdvcmssIGlmIHRoZSBtaXhpbiBvbmx5XG4vLyBkZWZpbmVzIGEgc2V0dGVyLCBidXQgbm90IGEgZ2V0dGVyLCB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgZ2V0dGVyIHRoYXRcbi8vIGludm9rZXMgdGhlIGJhc2UgZ2V0dGVyLiBTaW1pbGFybHksIGlmIHRoZSBtaXhpbiBqdXN0IGRlZmluZXMgYSBnZXR0ZXIsXG4vLyB3ZSBoYXZlIHRvIHN1cHBseSBhIGRlZmF1bHQgc2V0dGVyLlxuZXhwb3J0IGZ1bmN0aW9uIHByb3BhZ2F0ZVByb3BlcnR5KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvci5nZXQgJiYgIWRlc2NyaXB0b3Iuc2V0ICYmIGJhc2VEZXNjcmlwdG9yLnNldCkge1xuICAgIC8vIE5lZWQgdG8gc3VwcGx5IGRlZmF1bHQgc2V0dGVyLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGJhc2VEZXNjcmlwdG9yLnNldC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgaWYgKCFkZXNjcmlwdG9yLmdldCAmJiBiYXNlRGVzY3JpcHRvci5nZXQpIHtcbiAgICAgIC8vIE5lZWQgdG8gc3VwcGx5IGRlZmF1bHQgZ2V0dGVyLlxuICAgICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VEZXNjcmlwdG9yLmdldC5jYWxsKHRoaXMpO1xuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ29tcG9zZSBzZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gY29tcG9zZUZ1bmN0aW9uKGJhc2VEZXNjcmlwdG9yLnNldCwgZGVzY3JpcHRvci5zZXQpO1xuICB9XG59XG4iLCIvKlxuICogTWFyc2hhbGwgYXR0cmlidXRlcyB0byBwcm9wZXJ0aWVzIChhbmQgZXZlbnR1YWxseSB2aWNlIHZlcnNhKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyaWJ1dGVNYXJzaGFsbGluZyB7XG5cbiAgLypcbiAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAvLyBJZiB0aGUgYXR0cmlidXRlIG5hbWUgY29ycmVzcG9uZHMgdG8gYSBwcm9wZXJ0eSBuYW1lLCB0aGVuIHNldCB0aGF0XG4gICAgLy8gcHJvcGVydHkuIElnbm9yZSBjaGFuZ2VzIGluIHN0YW5kYXJkIEhUTUxFbGVtZW50IHByb3BlcnRpZXMuXG4gICAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZVRvUHJvcGVydHlOYW1lKG5hbWUpO1xuICAgIGlmIChwcm9wZXJ0eU5hbWUgaW4gdGhpcyAmJiAhKHByb3BlcnR5TmFtZSBpbiBIVE1MRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuYXR0cmlidXRlcywgYXR0cmlidXRlID0+IHtcbiAgICAgIHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJpYnV0ZS5uYW1lLCB1bmRlZmluZWQsIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5cbi8vIENvbnZlcnQgY2FtZWwgY2FzZSBmb29CYXIgbmFtZSB0byBoeXBoZW5hdGVkIGZvby1iYXIuXG5mdW5jdGlvbiBhdHRyaWJ1dGVUb1Byb3BlcnR5TmFtZShhdHRyaWJ1dGVOYW1lKSB7XG4gIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVOYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIG0gPT4gbVsxXS50b1VwcGVyQ2FzZSgpKTtcbiAgcmV0dXJuIHByb3BlcnR5TmFtZTtcbn1cblxuLy8gQ29udmVydCBoeXBoZW5hdGVkIGZvby1iYXIgbmFtZSB0byBjYW1lbCBjYXNlIGZvb0Jhci5cbmZ1bmN0aW9uIHByb3BlcnR5VG9BdHRyaWJ1dGVOYW1lKHByb3BlcnR5TmFtZSkge1xuICBsZXQgYXR0cmlidXRlTmFtZSA9IHByb3BlcnR5TmFtZS5yZXBsYWNlKC8oW2Etel1bQS1aXSkvZywgZyA9PiBnWzBdICsgJy0nICsgZ1sxXS50b0xvd2VyQ2FzZSgpKTtcbiAgcmV0dXJuIGF0dHJpYnV0ZU5hbWU7XG59XG4iLCIvKlxuICogUG9seW1lci1zdHlsZSBhdXRvbWF0aWMgbm9kZSBmaW5kaW5nLlxuICogU2VlIGh0dHBzOi8vd3d3LnBvbHltZXItcHJvamVjdC5vcmcvMS4wL2RvY3MvZGV2Z3VpZGUvbG9jYWwtZG9tLmh0bWwjbm9kZS1maW5kaW5nLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9tYXRpY05vZGVGaW5kaW5nIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMuc2hhZG93Um9vdCkge1xuICAgICAgdGhpcy4kID0ge307XG4gICAgICB2YXIgbm9kZXNXaXRoSWRzID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF0nKTtcbiAgICAgIFtdLmZvckVhY2guY2FsbChub2Rlc1dpdGhJZHMsIG5vZGUgPT4ge1xuICAgICAgICB2YXIgaWQgPSBub2RlLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgdGhpcy4kW2lkXSA9IG5vZGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIiwiLypcbiAqIEEgY29tcG9zYWJsZSBIVE1MIGVsZW1lbnQuXG4gKlxuICogVGhpcyBjbGFzcyBpcyBwcm92aWRlZCBqdXN0IGFzIGEgY29udmVuaWVuY2UuIE9uZSBjb3VsZCBhbHNvIHN0YXJ0IHdpdGhcbiAqIEhUTUxFbGVtZW50IGF0IHRoZSB0b3AgbGV2ZWwsIGFuZCBhZGQgZXh0ZW5zaWJpbGl0eSBieSBtaXhpbmcgaW4gQ29tcG9zYWJsZS5cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICcuLi9leHRlbnNpYmxlL0NvbXBvc2FibGUnO1xuXG4vLyBXZSB1c2UgRXh0ZW5zaWJsZSB0byBhZGQgaXRzIG93biBtZW1iZXJzIHRvIGEgSFRNTEVsZW1lbnQgc3ViY2xhc3MuXG4vLyBUaGUgcmVzdWx0IGlzIGFuIEhUTUxFbGVtZW50IHdpdGggLmV4dGVuZCgpIGFuZCBzdXBlcigpIHN1cHBvcnQuXG5sZXQgQ29tcG9zYWJsZUVsZW1lbnQgPSBDb21wb3NhYmxlLmNvbXBvc2UuY2FsbChIVE1MRWxlbWVudCwgQ29tcG9zYWJsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvc2FibGVFbGVtZW50O1xuIiwiLypcbiAqIEEgc2FtcGxlIGdlbmVyYWwtcHVycG9zZSBiYXNlIGNsYXNzIGZvciBkZWZpbmluZyBjdXN0b20gZWxlbWVudHMgdGhhdCBtaXhlc1xuICogaW4gc29tZSBjb21tb24gZmVhdHVyZXM6IHRlbXBsYXRlIHN0YW1waW5nIGludG8gYSBzaGFkb3cgcm9vdCwgYXV0b21hdGljIG5vZGVcbiAqIGZpbmRpbmcsIGFuZCBtYXJzaGFsbGluZyBiZXR3ZWVuIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnRpZXMuXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGVFbGVtZW50IGZyb20gJy4vQ29tcG9zYWJsZUVsZW1lbnQnO1xuaW1wb3J0IFRlbXBsYXRlU3RhbXBpbmcgZnJvbSAnLi9UZW1wbGF0ZVN0YW1waW5nJztcbmltcG9ydCBBdXRvbWF0aWNOb2RlRmluZGluZyBmcm9tICcuL0F1dG9tYXRpY05vZGVGaW5kaW5nJztcbmltcG9ydCBBdHRyaWJ1dGVNYXJzaGFsbGluZyBmcm9tICcuL0F0dHJpYnV0ZU1hcnNoYWxsaW5nJztcblxuY2xhc3MgRWxlbWVudEJhc2UgZXh0ZW5kcyBDb21wb3NhYmxlRWxlbWVudCB7XG5cbiAgLyogRm9yIGRlYnVnZ2luZyAqL1xuICBsb2codGV4dCkge1xuICAgIGNvbnNvbGUubG9nKGAke3RoaXMubG9jYWxOYW1lfTogJHt0ZXh0fWApO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWxlbWVudEJhc2UgPSBFbGVtZW50QmFzZS5jb21wb3NlKFxuICBUZW1wbGF0ZVN0YW1waW5nLCAvLyBiZWZvcmUgbm9kZSBmaW5kaW5nLCBzbyBzaGFkb3cgcm9vdCBpcyBwb3B1bGF0ZWRcbiAgQXV0b21hdGljTm9kZUZpbmRpbmcsIC8vIGJlZm9yZSBtYXJzaGFsbGluZywgc28gbWFyc2hhbGxlZCBwcm9wZXJ0aWVzIGNhbiB1c2UgaXRcbiAgQXR0cmlidXRlTWFyc2hhbGxpbmdcbik7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnZWxlbWVudC1iYXNlJywgRWxlbWVudEJhc2UpO1xuIiwiLypcbiAqIEVsZW1lbnQgZXh0ZW5zaW9uIGZvciB0ZW1wbGF0ZSBzdGFtcGluZy4gSWYgYSBjb21wb25lbnQgZGVmaW5lcyBhIHRlbXBsYXRlXG4gKiBwcm9wZXJ0eSAoYXMgYSBzdHJpbmcgb3IgcmVmZXJlbmNpbmcgYSBIVE1MIHRlbXBsYXRlKSwgd2hlbiB0aGUgY29tcG9uZW50XG4gKiBjbGFzcyBpcyBpbnN0YW50aWF0ZWQsIGEgc2hhZG93IHJvb3Qgd2lsbCBiZSBjcmVhdGVkIG9uIHRoZSBpbnN0YW5jZSwgYW5kXG4gKiB0aGUgY29udGVudHMgb2YgdGhlIHRlbXBsYXRlIHdpbGwgYmUgY2xvbmVkIGludG8gdGhlIHNoYWRvdyByb290LlxuICpcbiAqIEZvciB0aGUgdGltZSBiZWluZywgdGhpcyBleHRlbnNpb24gcmV0YWlucyBzdXBwb3J0IGZvciBTaGFkb3cgRE9NIHYwLlxuICogVGhhdCB3aWxsIGV2ZW50dWFsbHkgYmUgZGVwcmVjYXRlZCBhcyBicm93c2VycyBpbXBsZW1lbnQgU2hhZG93IERPTSB2MS5cbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBsYXRlU3RhbXBpbmcge1xuXG4gIC8qXG4gICAqIElmIHRoZSBjb21wb25lbnQgZGVmaW5lcyBhIHRlbXBsYXRlLCBhIHNoYWRvdyByb290IHdpbGwgYmUgY3JlYXRlZCBvbiB0aGVcbiAgICogY29tcG9uZW50IGluc3RhbmNlLCBhbmQgdGhlIHRlbXBsYXRlIHN0YW1wZWQgaW50byBpdC5cbiAgICovXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBVcGdyYWRlIHBsYWluIHN0cmluZyB0byByZWFsIHRlbXBsYXRlLlxuICAgICAgdGVtcGxhdGUgPSBjcmVhdGVUZW1wbGF0ZVdpdGhJbm5lckhUTUwodGVtcGxhdGUpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGUgJiYgVVNJTkdfU0hBRE9XX0RPTV9WMCkge1xuICAgICAgcG9seWZpbGxTbG90V2l0aENvbnRlbnQodGVtcGxhdGUpO1xuICAgIH1cbiAgICBpZiAod2luZG93LlNoYWRvd0RPTVBvbHlmaWxsKSB7XG4gICAgICBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRoaXMubG9jYWxOYW1lKTtcbiAgICB9XG4gICAgLy8gVE9ETzogU2F2ZSB0aGUgcHJvY2Vzc2VkIHRlbXBsYXRlIHdpdGggdGhlIGNvbXBvbmVudCdzIGNsYXNzIHByb3RvdHlwZVxuICAgIC8vIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBwcm9jZXNzZWQgd2l0aCBldmVyeSBpbnN0YW50aWF0aW9uLlxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgLy8gdGhpcy5sb2coXCJjbG9uaW5nIHRlbXBsYXRlIGludG8gc2hhZG93IHJvb3RcIik7XG4gICAgICBsZXQgcm9vdCA9IFVTSU5HX1NIQURPV19ET01fVjAgP1xuICAgICAgICB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKSA6ICAgICAgICAgICAgIC8vIFNoYWRvdyBET00gdjBcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7ICAvLyBTaGFkb3cgRE9NIHYxXG4gICAgICBsZXQgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgcm9vdC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vLyBGZWF0dXJlIGRldGVjdGlvbiBmb3Igb2xkIFNoYWRvdyBET00gdjAuXG5jb25zdCBVU0lOR19TSEFET1dfRE9NX1YwID0gKHR5cGVvZiBIVE1MRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5cbi8vIENvbnZlcnQgYSBwbGFpbiBzdHJpbmcgb2YgSFRNTCBpbnRvIGEgcmVhbCB0ZW1wbGF0ZSBlbGVtZW50LlxuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVXaXRoSW5uZXJIVE1MKGlubmVySFRNTCkge1xuICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAvLyBSRVZJRVc6IElzIHRoZXJlIGFuIGVhc2llciB3YXkgdG8gZG8gdGhpcz9cbiAgLy8gV2UnZCBsaWtlIHRvIGp1c3Qgc2V0IGlubmVySFRNTCBvbiB0aGUgdGVtcGxhdGUgY29udGVudCwgYnV0IHNpbmNlIGl0J3NcbiAgLy8gYSBEb2N1bWVudEZyYWdtZW50LCB0aGF0IGRvZXNuJ3Qgd29yay5cbiAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICB3aGlsZSAoZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgIHRlbXBsYXRlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMF0pO1xuICB9XG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuLy8gUmVwbGFjZSBvY2N1cmVuY2VzIG9mIHYxIHNsb3QgZWxlbWVudHMgd2l0aCB2MCBjb250ZW50IGVsZW1lbnRzLlxuLy8gVGhpcyBkb2VzIG5vdCB5ZXQgbWFwIG5hbWVkIHNsb3RzIHRvIGNvbnRlbnQgc2VsZWN0IGNsYXVzZXMuXG5mdW5jdGlvbiBwb2x5ZmlsbFNsb3RXaXRoQ29udGVudCh0ZW1wbGF0ZSkge1xuICBbXS5mb3JFYWNoLmNhbGwodGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzbG90JyksIHNsb3RFbGVtZW50ID0+IHtcbiAgICBsZXQgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50Jyk7XG4gICAgc2xvdEVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29udGVudEVsZW1lbnQsIHNsb3RFbGVtZW50KTtcbiAgfSk7XG59XG5cbi8vIEludm9rZSBiYXNpYyBzdHlsZSBzaGltbWluZyB3aXRoIFNoYWRvd0NTUy5cbmZ1bmN0aW9uIHNoaW1UZW1wbGF0ZVN0eWxlcyh0ZW1wbGF0ZSwgdGFnKSB7XG4gIFdlYkNvbXBvbmVudHMuU2hhZG93Q1NTLnNoaW1TdHlsaW5nKHRlbXBsYXRlLmNvbnRlbnQsIHRhZyk7XG59XG4iXX0=
