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

var _ElementBase = require('core-component-mixins/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _ChildrenContent = require('../../mixins/ChildrenContent');

var _ChildrenContent2 = _interopRequireDefault(_ChildrenContent);

var _ClickSelection = require('../../mixins/ClickSelection');

var _ClickSelection2 = _interopRequireDefault(_ClickSelection);

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
      return '\n      <style>\n      :host {\n        display: -webkit-flex;\n        display: flex;\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n      }\n\n      [target="child"] {\n        display: -webkit-flex;\n        display: flex;\n        -webkit-flex: 1;\n        flex: 1;\n      }\n\n      #itemsContainer {\n        -webkit-flex: 1;\n        flex: 1;\n        -webkit-overflow-scrolling: touch;\n        overflow-y: scroll; /* for momentum scrolling */\n      }\n\n      /* Generic appearance */\n      :host([generic=""]) {\n        border: 1px solid gray;\n        box-sizing: border-box;\n        cursor: default;\n      }\n\n      :host([generic=""]) #itemsContainer ::content > * {\n        cursor: default;\n        padding: 0.25em;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n      </style>\n\n      <div id="itemsContainer" role="none">\n        <slot></slot>\n      </div>\n    ';
    }
  }]);

  return ListBox;
})(_ElementBase2.default.compose(_ChildrenContent2.default, _ClickSelection2.default, _CollectiveElement2.default, _ContentItems2.default, _DirectionSelection2.default, _Generic2.default, _ItemSelection2.default, _ItemsAccessible2.default, _Keyboard2.default, _KeyboardDirection2.default, _KeyboardPaging2.default, _KeyboardPrefixSelection2.default, _SelectionHighlight2.default, _SelectionScroll2.default));

exports.default = ListBox;

document.registerElement('basic-list-box', ListBox);

},{"../../mixins/ChildrenContent":2,"../../mixins/ClickSelection":3,"../../mixins/CollectiveElement":4,"../../mixins/ContentItems":5,"../../mixins/DirectionSelection":6,"../../mixins/Generic":7,"../../mixins/ItemSelection":8,"../../mixins/ItemsAccessible":9,"../../mixins/Keyboard":10,"../../mixins/KeyboardDirection":11,"../../mixins/KeyboardPaging":12,"../../mixins/KeyboardPrefixSelection":13,"../../mixins/SelectionHighlight":14,"../../mixins/SelectionScroll":15,"core-component-mixins/src/ElementBase":21}],2:[function(require,module,exports){
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

var _set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }return value;
};

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

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

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Mixin that defines a component's content as its children.
 *
 * @class ChildrenContent
 *
 */

// TODO: Don't respond to changes in attributes, or at least offer that as an
// option.

exports.default = function (base) {
  return (function (_base) {
    _inherits(ChildrenContent, _base);

    function ChildrenContent() {
      _classCallCheck(this, ChildrenContent);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ChildrenContent).apply(this, arguments));
    }

    _createClass(ChildrenContent, [{
      key: 'createdCallback',
      value: function createdCallback() {
        var _this2 = this;

        if (_get(Object.getPrototypeOf(ChildrenContent.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(ChildrenContent.prototype), 'createdCallback', this).call(this);
        }
        // Until we have content observing again, force a call to contentChanged().
        // HACK: Do this asynchronously, so other mixins have a chance to set up
        // before this call.
        setTimeout(function () {
          return _this2.contentChanged();
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
        if (_get(Object.getPrototypeOf(ChildrenContent.prototype), 'contentChanged', this)) {
          _get(Object.getPrototypeOf(ChildrenContent.prototype), 'contentChanged', this).call(this);
        }
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
      key: 'content',
      get: function get() {
        return expandContentElements(this.children);
      },
      set: function set(value) {
        if ('content' in base.prototype) {
          _set(Object.getPrototypeOf(ChildrenContent.prototype), 'content', value, this);
        }
      }
    }]);

    return ChildrenContent;
  })(base);
};

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

var _set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }return value;
};

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin which maps a click (actually, a mousedown) to item selection.
 *
 * @class ClickSelection
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(ClickSelection, _base);

    function ClickSelection() {
      _classCallCheck(this, ClickSelection);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ClickSelection).apply(this, arguments));
    }

    _createClass(ClickSelection, [{
      key: 'createdCallback',
      value: function createdCallback() {
        var _this2 = this;

        if (_get(Object.getPrototypeOf(ClickSelection.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(ClickSelection.prototype), 'createdCallback', this).call(this);
        }
        /*
         * REVIEW: Which event should we listen to here?
         *
         * The standard use for this mixin is in list boxes. List boxes don't
         * appear to be consistent with regard to whether they select on mousedown
         * or click/mouseup.
         */
        this.addEventListener('mousedown', function (event) {
          selectTarget(_this2, event.target);
          // Note: We don't call preventDefault here. The default behavior for
          // mousedown includes setting keyboard focus if the element doesn't
          // already have the focus, and we want to preserve that behavior.
          event.stopPropagation();
        });
      }

      // Default implementation. This will typically be handled by other mixins.

    }, {
      key: 'selectedIndex',
      get: function get() {
        return _get(Object.getPrototypeOf(ClickSelection.prototype), 'selectedIndex', this);
      },
      set: function set(index) {
        if ('selectedIndex' in base.prototype) {
          _set(Object.getPrototypeOf(ClickSelection.prototype), 'selectedIndex', index, this);
        }
      }
    }]);

    return ClickSelection;
  })(base);
};

// TODO: Handle the case where a list item has subelements. Walk up the DOM
// hierarchy until we find an item in the list, or come back to this element,
// in which case the element that was tapped isn't an item (and should be
// ignored).

function selectTarget(element, target) {
  var index = element.indexOfItem && element.indexOfItem(target);
  if (index >= 0) {
    element.selectedIndex = index;
  }
}

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

var _set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }return value;
};

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin which allows a component to provide aggregate behavior with other
 * elements, e.g., for keyboard handling.
 *
 * @class CollectiveElement
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(CollectiveElement, _base);

    function CollectiveElement() {
      _classCallCheck(this, CollectiveElement);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(CollectiveElement).apply(this, arguments));
    }

    _createClass(CollectiveElement, [{
      key: 'createdCallback',
      value: function createdCallback() {
        if (_get(Object.getPrototypeOf(CollectiveElement.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(CollectiveElement.prototype), 'createdCallback', this).call(this);
        }
        this.collective = new Collective(this);
      }
    }, {
      key: 'target',
      set: function set(element) {
        if ('target' in base.prototype) {
          _set(Object.getPrototypeOf(CollectiveElement.prototype), 'target', element, this);
        }
        this.collective.assimilate(element);
      }
    }]);

    return CollectiveElement;
  })(base);
};

var Collective = (function () {
  function Collective(element) {
    _classCallCheck(this, Collective);

    this._elements = [];
    this.assimilate(element);
  }

  _createClass(Collective, [{
    key: 'assimilate',
    value: function assimilate(target) {
      var _this2 = this;

      var elements = target.collective ? target.collective.elements : [target];
      elements.forEach(function (element) {
        element.collective = _this2;
        _this2._elements.push(element);
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

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin that lets a component treat its content as list items.
 *
 * Auxiliary elements which are not normally visible are filtered out. For now,
 * For now, these are: link, script, style, and template.
 *
 * @class ContentItems
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(ContentItems, _base);

    function ContentItems() {
      _classCallCheck(this, ContentItems);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ContentItems).apply(this, arguments));
    }

    _createClass(ContentItems, [{
      key: 'applySelection',
      value: function applySelection(item, selected) {
        if (_get(Object.getPrototypeOf(ContentItems.prototype), 'applySelection', this)) {
          _get(Object.getPrototypeOf(ContentItems.prototype), 'applySelection', this).call(this, item, selected);
        }
        item.classList.toggle('selected', selected);
      }
    }, {
      key: 'contentChanged',
      value: function contentChanged() {
        if (_get(Object.getPrototypeOf(ContentItems.prototype), 'contentChanged', this)) {
          _get(Object.getPrototypeOf(ContentItems.prototype), 'contentChanged', this).call(this);
        }
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
        if (_get(Object.getPrototypeOf(ContentItems.prototype), 'indexOfItem', this)) {
          _get(Object.getPrototypeOf(ContentItems.prototype), 'indexOfItem', this).call(this, item);
        }
        return this.items.indexOf(item);
      }

      // Default implementation does nothing.

    }, {
      key: 'itemAdded',
      value: function itemAdded(item) {
        if (_get(Object.getPrototypeOf(ContentItems.prototype), 'itemAdded', this)) {
          _get(Object.getPrototypeOf(ContentItems.prototype), 'itemAdded', this).call(this, item);
        }
      }
    }, {
      key: 'itemsChanged',
      value: function itemsChanged() {
        var _this2 = this;

        if (_get(Object.getPrototypeOf(ContentItems.prototype), 'itemsChanged', this)) {
          _get(Object.getPrototypeOf(ContentItems.prototype), 'itemsChanged', this).call(this);
        }

        // Perform per-item initialization.
        this.items.forEach(function (item) {
          if (!item._itemInitialized) {
            _this2.itemAdded(item);
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
  })(base);
};

// Return the given elements, filtering out auxiliary elements that aren't
// typically visible. Items which are not elements are returned as is.

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
})();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

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
   * Mixin which maps direction semantics (goLeft, goRight, etc.) to selection
   * semantics (selectPrevious, selectNext, etc.).
   *
   * @class DirectionSelection
   */

exports.default = function (base) {
  return (function (_base) {
    _inherits(DirectionSelection, _base);

    function DirectionSelection() {
      _classCallCheck(this, DirectionSelection);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionSelection).apply(this, arguments));
    }

    _createClass(DirectionSelection, [{
      key: 'goDown',
      value: function goDown() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'goDown', this)) {
          _get(Object.getPrototypeOf(DirectionSelection.prototype), 'goDown', this).call(this);
        }
        return this.selectNext();
      }
    }, {
      key: 'goEnd',
      value: function goEnd() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'goEnd', this)) {
          _get(Object.getPrototypeOf(DirectionSelection.prototype), 'goEnd', this).call(this);
        }
        return this.selectLast();
      }
    }, {
      key: 'goLeft',
      value: function goLeft() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'goLeft', this)) {
          _get(Object.getPrototypeOf(DirectionSelection.prototype), 'goLeft', this).call(this);
        }
        return this.selectPrevious();
      }
    }, {
      key: 'goRight',
      value: function goRight() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'goRight', this)) {
          _get(Object.getPrototypeOf(DirectionSelection.prototype), 'goRight', this).call(this);
        }
        return this.selectNext();
      }
    }, {
      key: 'goStart',
      value: function goStart() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'goStart', this)) {
          _get(Object.getPrototypeOf(DirectionSelection.prototype), 'goStart', this).call(this);
        }
        return this.selectFirst();
      }
    }, {
      key: 'goUp',
      value: function goUp() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'goUp', this)) {
          _get(Object.getPrototypeOf(DirectionSelection.prototype), 'goUp', this).call(this);
        }
        return this.selectPrevious();
      }

      // Default implementations. These will typically be handled by other mixins.

    }, {
      key: 'selectFirst',
      value: function selectFirst() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectFirst', this)) {
          return _get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectFirst', this).call(this);
        }
      }
    }, {
      key: 'selectLast',
      value: function selectLast() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectLast', this)) {
          return _get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectLast', this).call(this);
        }
      }
    }, {
      key: 'selectNext',
      value: function selectNext() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectNext', this)) {
          return _get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectNext', this).call(this);
        }
      }
    }, {
      key: 'selectPrevious',
      value: function selectPrevious() {
        if (_get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectPrevious', this)) {
          return _get(Object.getPrototypeOf(DirectionSelection.prototype), 'selectPrevious', this).call(this);
        }
      }
    }]);

    return DirectionSelection;
  })(base);
};

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

var _set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }return value;
};

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = function (base) {
  return (function (_base) {
    _inherits(Generic, _base);

    function Generic() {
      _classCallCheck(this, Generic);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Generic).apply(this, arguments));
    }

    _createClass(Generic, [{
      key: 'createdCallback',
      value: function createdCallback() {
        if (_get(Object.getPrototypeOf(Generic.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(Generic.prototype), 'createdCallback', this).call(this);
        }
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
      },
      set: function set(value) {
        if ('generic' in base.prototype) {
          _set(Object.getPrototypeOf(Generic.prototype), 'generic', value, this);
        }
        // We roll our own attribute setting so that an explicitly false value shows
        // up as generic="false".
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
  })(base);
};

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

var _set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }return value;
};

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = function (base) {
  return (function (_base) {
    _inherits(ItemSelection, _base);

    function ItemSelection() {
      _classCallCheck(this, ItemSelection);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ItemSelection).apply(this, arguments));
    }

    _createClass(ItemSelection, [{
      key: 'applySelection',

      // Default implementation. This will typically be handled by other mixins.
      value: function applySelection(item, selected) {
        if (_get(Object.getPrototypeOf(ItemSelection.prototype), 'applySelection', this)) {
          _get(Object.getPrototypeOf(ItemSelection.prototype), 'applySelection', this).call(this, item, selected);
        }
      }
    }, {
      key: 'itemAdded',
      value: function itemAdded(item) {
        if (_get(Object.getPrototypeOf(ItemSelection.prototype), 'itemAdded', this)) {
          _get(Object.getPrototypeOf(ItemSelection.prototype), 'itemAdded', this).call(this, item);
        }
        this.applySelection(item, item === this.selectedItem);
      }
    }, {
      key: 'itemsChanged',
      value: function itemsChanged() {
        if (_get(Object.getPrototypeOf(ItemSelection.prototype), 'itemsChanged', this)) {
          _get(Object.getPrototypeOf(ItemSelection.prototype), 'itemsChanged', this).call(this);
        }
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
        if (_get(Object.getPrototypeOf(ItemSelection.prototype), 'selectFirst', this)) {
          _get(Object.getPrototypeOf(ItemSelection.prototype), 'selectFirst', this).call(this);
        }
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
        if (_get(Object.getPrototypeOf(ItemSelection.prototype), 'selectLast', this)) {
          _get(Object.getPrototypeOf(ItemSelection.prototype), 'selectLast', this).call(this);
        }
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
        if (_get(Object.getPrototypeOf(ItemSelection.prototype), 'selectNext', this)) {
          _get(Object.getPrototypeOf(ItemSelection.prototype), 'selectNext', this).call(this);
        }
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
        if (_get(Object.getPrototypeOf(ItemSelection.prototype), 'selectPrevious', this)) {
          _get(Object.getPrototypeOf(ItemSelection.prototype), 'selectPrevious', this).call(this);
        }
        return selectIndex(this, this.selectedIndex - 1);
      }
    }, {
      key: 'canSelectNext',
      get: function get() {
        return this._canSelectNext;
      },
      set: function set(canSelectNext) {
        if ('canSelectNext' in base.prototype) {
          _set(Object.getPrototypeOf(ItemSelection.prototype), 'canSelectNext', canSelectNext, this);
        }
        this._canSelectNext = canSelectNext;
      }
    }, {
      key: 'canSelectPrevious',
      get: function get() {
        return this._canSelectPrevious;
      },
      set: function set(canSelectPrevious) {
        if ('canSelectPrevious' in base.prototype) {
          _set(Object.getPrototypeOf(ItemSelection.prototype), 'canSelectPrevious', canSelectPrevious, this);
        }
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
        if ('selectedIndex' in base.prototype) {
          _set(Object.getPrototypeOf(ItemSelection.prototype), 'selectedIndex', index, this);
        }
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

      /**
       * The currently selected item, or null if there is no selection.
       *
       * @property selectedItem
       * @type Object
       */
      // TODO: Confirm item is in items before selecting.

    }, {
      key: 'selectedItem',
      get: function get() {
        return this._selectedItem;
      },
      set: function set(item) {
        if ('selectedItem' in base.prototype) {
          _set(Object.getPrototypeOf(ItemSelection.prototype), 'selectedItem', item, this);
        }
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
        if ('selectionRequired' in base.prototype) {
          _set(Object.getPrototypeOf(ItemSelection.prototype), 'selectionRequired', selectionRequired, this);
        }
        this._selectionRequired = selectionRequired;
        ensureSelection(this);
      }
    }]);

    return ItemSelection;
  })(base);
};

// If no item is selected, select a default item.
// TODO: If the previously-selected item has been deleted, try to select an
// item adjacent to the position it held.

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

var _set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }return value;
};

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin which manages ARIA roles for a component that wants to act as a list.
 *
 * @class ItemsAccessible
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(ItemsAccessible, _base);

    function ItemsAccessible() {
      _classCallCheck(this, ItemsAccessible);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ItemsAccessible).apply(this, arguments));
    }

    _createClass(ItemsAccessible, [{
      key: 'applySelection',
      value: function applySelection(item, selected) {
        if (_get(Object.getPrototypeOf(ItemsAccessible.prototype), 'applySelection', this)) {
          _get(Object.getPrototypeOf(ItemsAccessible.prototype), 'applySelection', this).call(this, item, selected);
        }
        item.setAttribute('aria-selected', selected);
        var itemId = item.getAttribute('id');
        if (itemId) {
          this.collective.outermostElement.setAttribute('aria-activedescendant', itemId);
        }
      }
    }, {
      key: 'collectiveChanged',
      value: function collectiveChanged() {
        if (_get(Object.getPrototypeOf(ItemsAccessible.prototype), 'collectiveChanged', this)) {
          _get(Object.getPrototypeOf(ItemsAccessible.prototype), 'collectiveChanged', this).call(this);
        }

        // Ensure the outermost aspect has an ARIA role.
        var outermostElement = this.collective.outermostElement;
        if (!outermostElement.getAttribute('role')) {
          // Try to promote an ARIA role from an inner element. If none is found,
          // use a default role.
          var role = getCollectiveAriaRole(this.collective) || 'listbox';
          outermostElement.setAttribute('role', role);
        }
        if (!outermostElement.getAttribute('aria-activedescendant')) {
          // Try to promote an ARIA activedescendant value from an inner element.
          var descendant = getCollectiveAriaActiveDescendant(this.collective);
          if (descendant) {
            outermostElement.setAttribute('aria-activedescendant', descendant);
          }
        }

        // Remove the ARIA role and activedescendant values from the collective's
        // inner elements.
        this.collective.elements.forEach(function (element) {
          if (element !== outermostElement) {
            element.removeAttribute('aria-activedescendant');
            element.removeAttribute('role');
          }
        });
      }
    }, {
      key: 'createdCallback',
      value: function createdCallback() {
        if (_get(Object.getPrototypeOf(ItemsAccessible.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(ItemsAccessible.prototype), 'createdCallback', this).call(this);
        }

        // Determine a base item ID based on this component's host's own ID. This
        // will be combined with a unique integer to assign IDs to items that don't
        // have an explicit ID. If the basic-list-box has ID "foo", then its items
        // will have IDs that look like "_fooOption1". If the list has no ID itself,
        // its items will get IDs that look like "_option1". Item IDs are prefixed
        // with an underscore to differentiate them from manually-assigned IDs, and
        // to minimize the potential for ID conflicts.
        var elementId = this.getAttribute("id");
        this.itemBaseId = elementId ? "_" + elementId + "Option" : "_option";
      }
    }, {
      key: 'itemAdded',
      value: function itemAdded(item) {
        if (_get(Object.getPrototypeOf(ItemsAccessible.prototype), 'itemAdded', this)) {
          _get(Object.getPrototypeOf(ItemsAccessible.prototype), 'itemAdded', this).call(this, item);
        }

        item.setAttribute('role', 'option');

        // Ensure each item has an ID so we can set aria-activedescendant on the
        // overall list whenever the selection changes.
        if (!item.getAttribute('id')) {
          item.setAttribute('id', this.itemBaseId + idCount++);
        }
      }
    }, {
      key: 'selectedItem',
      get: function get() {
        return _get(Object.getPrototypeOf(ItemsAccessible.prototype), 'selectedItem', this);
      },
      set: function set(item) {
        if ('selectedItem' in base.prototype) {
          _set(Object.getPrototypeOf(ItemsAccessible.prototype), 'selectedItem', item, this);
        }
        // Catch the case where the selection is removed.
        if (item == null) {
          this.collective.outermostElement.removeAttribute('aria-activedescendant');
        }
      }
    }]);

    return ItemsAccessible;
  })(base);
};

// Used to assign unique IDs to item elements without IDs.

var idCount = 0;

// Return the first ARIA activedescendant defined by the collective.
function getCollectiveAriaActiveDescendant(collective) {
  var descendants = collective.elements.map(function (element) {
    return element.getAttribute('aria-activedescendant');
  });
  return descendants.find(function (descendant) {
    return descendant !== null;
  });
}

// Return the first ARIA label defined by the collective.
function getCollectiveAriaRole(collective) {
  var roles = collective.elements.map(function (element) {
    return element.getAttribute('role');
  });
  return roles.find(function (role) {
    return role !== null;
  });
}

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

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin which manages the keyboard focus and keydown handling for a component.
 *
 * TODO: Document collective behavior.
 * TODO: Provide baseline behavior outside of a collective.
 *
 * @class Keyboard
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(Keyboard, _base);

    function Keyboard() {
      _classCallCheck(this, Keyboard);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Keyboard).apply(this, arguments));
    }

    _createClass(Keyboard, [{
      key: 'keydown',

      // Default keydown handler. This will typically be handled by other mixins.
      value: function keydown(event) {
        if (_get(Object.getPrototypeOf(Keyboard.prototype), 'keydown', this)) {
          return _get(Object.getPrototypeOf(Keyboard.prototype), 'keydown', this).call(this, event);
        }
      }

      /*
       * If we're now the outermost element of the collective, set up to receive
       * keyboard events. If we're no longer the outermost element, stop listening.
       */

    }, {
      key: 'collectiveChanged',
      value: function collectiveChanged() {
        if (_get(Object.getPrototypeOf(Keyboard.prototype), 'collectiveChanged', this)) {
          _get(Object.getPrototypeOf(Keyboard.prototype), 'collectiveChanged', this).call(this);
        }

        var outermostElement = this.collective.outermostElement;
        if (outermostElement === this && !this.getAttribute('aria-label')) {
          // Since we're handling the keyboard, see if we can adopt an ARIA label
          // from an inner element of the collective.
          var label = getCollectiveAriaLabel(this.collective);
          if (label) {
            this.setAttribute('aria-label', label);
          }
        }

        // Make sure only the outermost element in the collective is listening to
        // the keyboard.
        this.collective.elements.forEach(function (element) {

          var shouldListen = element === outermostElement;
          var isListening = isListeningToKeydown(element);
          if (isListening !== shouldListen) {
            if (shouldListen) {
              startListeningToKeydown(element);
            } else {
              stopListeningToKeydown(element);
            }
          }
          if (!shouldListen && element.getAttribute('aria-label')) {
            // Remove the ARIA label from inner element's not handling the keyboard.
            element.removeAttribute('aria-label');
          }
        });
      }
    }]);

    return Keyboard;
  })(base);
};

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

// Return the first ARIA label defined by the collective.
function getCollectiveAriaLabel(collective) {
  var labels = collective.elements.map(function (element) {
    return element.getAttribute('aria-label');
  });
  return labels.find(function (label) {
    return label !== null;
  });
}

function isListeningToKeydown(element) {
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
  element.removeEventListener('keydown', element._keydownListener);
  element._keydownListener = null;
  element.removeAttribute('tabIndex');
}

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

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

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
   * Mixin which maps direction keys (Left, Right, etc.) to direction semantics
   * (goLeft, goRight, etc.).
   *
   * @class KeyboardDirection
   */

exports.default = function (base) {
  return (function (_base) {
    _inherits(KeyboardDirection, _base);

    function KeyboardDirection() {
      _classCallCheck(this, KeyboardDirection);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(KeyboardDirection).apply(this, arguments));
    }

    _createClass(KeyboardDirection, [{
      key: 'goDown',

      // Default implementations. These will typically be handled by other mixins.
      value: function goDown() {
        if (_get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goDown', this)) {
          return _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goDown', this).call(this);
        }
      }
    }, {
      key: 'goEnd',
      value: function goEnd() {
        if (_get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goEnd', this)) {
          return _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goEnd', this).call(this);
        }
      }
    }, {
      key: 'goLeft',
      value: function goLeft() {
        if (_get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goLeft', this)) {
          return _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goLeft', this).call(this);
        }
      }
    }, {
      key: 'goRight',
      value: function goRight() {
        if (_get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goRight', this)) {
          return _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goRight', this).call(this);
        }
      }
    }, {
      key: 'goStart',
      value: function goStart() {
        if (_get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goStart', this)) {
          return _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goStart', this).call(this);
        }
      }
    }, {
      key: 'goUp',
      value: function goUp() {
        if (_get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goUp', this)) {
          return _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'goUp', this).call(this);
        }
      }
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
        // Prefer mixin result if it's defined, otherwise use base result.
        return handled || _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'keydown', this) && _get(Object.getPrototypeOf(KeyboardDirection.prototype), 'keydown', this).call(this, event);
      }
    }]);

    return KeyboardDirection;
  })(base);
};

},{"Composable/src/Composable":16}],12:[function(require,module,exports){
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

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
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

exports.default = function (base) {
  return (function (_base) {
    _inherits(KeyboardPaging, _base);

    function KeyboardPaging() {
      _classCallCheck(this, KeyboardPaging);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(KeyboardPaging).apply(this, arguments));
    }

    _createClass(KeyboardPaging, [{
      key: "keydown",
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
        // Prefer mixin result if it's defined, otherwise use base result.
        return handled || _get(Object.getPrototypeOf(KeyboardPaging.prototype), "keydown", this) && _get(Object.getPrototypeOf(KeyboardPaging.prototype), "keydown", this).call(this, event);
      }

      /**
       * Scroll down one page.
       *
       * @method pageDown
       */

    }, {
      key: "pageDown",
      value: function pageDown() {
        if (_get(Object.getPrototypeOf(KeyboardPaging.prototype), "pageDown", this)) {
          _get(Object.getPrototypeOf(KeyboardPaging.prototype), "pageDown", this).call(this);
        }
        return scrollOnePage(this, true);
      }

      /**
       * Scroll up one page.
       *
       * @method pageUp
       */

    }, {
      key: "pageUp",
      value: function pageUp() {
        if (_get(Object.getPrototypeOf(KeyboardPaging.prototype), "pageUp", this)) {
          _get(Object.getPrototypeOf(KeyboardPaging.prototype), "pageUp", this).call(this);
        }
        return scrollOnePage(this, false);
      }
    }]);

    return KeyboardPaging;
  })(base);
};

// Return the item whose content spans the given y position (relative to the
// top of the list's scrolling client area), or null if not found.
//
// If downward is true, move down the list of items to find the first item
// found at the given y position; if downward is false, move up the list of
// items to find the last item at that position.

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

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin that handles list box-style prefix typing, in which the user can type a
 * string to select the first item that begins with that string.
 *
 * @class KeyboardPrefixSelection
 *
 */

// TODO: If the selection is changed by some other means (e.g., arrow keys) other
// than prefix typing, then that act should reset the prefix.

exports.default = function (base) {
  return (function (_base) {
    _inherits(KeyboardPrefixSelection, _base);

    function KeyboardPrefixSelection() {
      _classCallCheck(this, KeyboardPrefixSelection);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(KeyboardPrefixSelection).apply(this, arguments));
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

        // Prefer mixin result if it's defined, otherwise use base result.
        return handled || _get(Object.getPrototypeOf(KeyboardPrefixSelection.prototype), 'keydown', this) && _get(Object.getPrototypeOf(KeyboardPrefixSelection.prototype), 'keydown', this).call(this, event);
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
        if (_get(Object.getPrototypeOf(KeyboardPrefixSelection.prototype), 'selectItemWithTextPrefix', this)) {
          _get(Object.getPrototypeOf(KeyboardPrefixSelection.prototype), 'selectItemWithTextPrefix', this).call(this, prefix);
        }
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
  })(base);
};

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

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin which applies standard highlight colors to a selected item.
 *
 * @class SelectionHighlight
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(SelectionHighlight, _base);

    function SelectionHighlight() {
      _classCallCheck(this, SelectionHighlight);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectionHighlight).apply(this, arguments));
    }

    _createClass(SelectionHighlight, [{
      key: 'applySelection',
      value: function applySelection(item, selected) {
        if (_get(Object.getPrototypeOf(SelectionHighlight.prototype), 'applySelection', this)) {
          _get(Object.getPrototypeOf(SelectionHighlight.prototype), 'applySelection', this).call(this, item, selected);
        }
        item.style.backgroundColor = selected ? 'highlight' : '';
        item.style.color = selected ? 'highlighttext' : '';
      }
    }]);

    return SelectionHighlight;
  })(base);
};

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

var _set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }return value;
};

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
}

/**
 * Mixin which scrolls a container to keep the selected item visible.
 *
 * @class SelectionScroll
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(SelectionScroll, _base);

    function SelectionScroll() {
      _classCallCheck(this, SelectionScroll);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectionScroll).apply(this, arguments));
    }

    _createClass(SelectionScroll, [{
      key: 'scrollItemIntoView',

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
        if (_get(Object.getPrototypeOf(SelectionScroll.prototype), 'scrollItemIntoView', this)) {
          _get(Object.getPrototypeOf(SelectionScroll.prototype), 'scrollItemIntoView', this).call(this);
        }
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
      key: 'selectedItem',
      get: function get() {
        return _get(Object.getPrototypeOf(SelectionScroll.prototype), 'selectedItem', this);
      },
      set: function set(item) {
        if ('selectedItem' in base.prototype) {
          _set(Object.getPrototypeOf(SelectionScroll.prototype), 'selectedItem', item, this);
        }
        if (item) {
          // Keep the selected item in view.
          this.scrollItemIntoView(item);
        }
      }
    }]);

    return SelectionScroll;
  })(base);
};

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
  var inheritedCompositionRules = obj.compositionRules || {};
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

    if (baseIsClass) {
      // One limitation of defining a class dynamically is that we can't
      // programmatically determine the real name of the constructor. For all
      // classes we create, the constructor will be called "subclass". That's
      // unhelpful when debugging. As a partial fix, we dynamically overwrite
      // the constructor's "name" property. That won't update the name shown
      // in the debugger in all places, but is at least inspectable in the
      // debug console.
      Object.defineProperty(result, 'name', {
        configurable: true,
        value: mixin.name
      });
    }
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
  function subclass() {}
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

},{"./CompositionRules":17}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseMethodFirst = baseMethodFirst;
exports.baseSetterFirst = baseSetterFirst;
exports.composeFunction = composeFunction;
exports.chainPrototypes = chainPrototypes;
exports.completePropertyDefinition = completePropertyDefinition;
exports.getBaseDescriptor = getBaseDescriptor;
exports.getPropertyDescriptor = getPropertyDescriptor;
exports.override = override;
exports.preferBaseResult = preferBaseResult;
exports.preferBaseGetter = preferBaseGetter;
exports.preferMixinGetter = preferMixinGetter;
exports.preferMixinResult = preferMixinResult;
exports.shallowMerge = shallowMerge;
/**
 * Standard composition rules
 */

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
 * Perform a shallow merge of a mixin property on top of a base property.
 */
function shallowMerge(target, key, descriptor) {
  var mixinValue = descriptor.value;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseValue = baseDescriptor.value;
  var result = {};
  copyProperties(baseValue, result);
  copyProperties(mixinValue, result);
  descriptor.value = result;
}

/*
 * Helper function to copy properties from one object to another.
 */
function copyProperties(source, destination) {
  for (var key in source) {
    destination[key] = source[key];
  }
}

},{}],18:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Marshall attributes to properties (and eventually vice versa).
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(AttributeMarshalling, _base);

    function AttributeMarshalling() {
      _classCallCheck(this, AttributeMarshalling);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AttributeMarshalling).apply(this, arguments));
    }

    _createClass(AttributeMarshalling, [{
      key: 'attributeChangedCallback',

      /*
       * Handle a change to the attribute with the given name.
       */
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (_get(Object.getPrototypeOf(AttributeMarshalling.prototype), 'attributeChangedCallback', this)) {
          _get(Object.getPrototypeOf(AttributeMarshalling.prototype), 'attributeChangedCallback', this).call(this);
        }
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
        var _this2 = this;

        if (_get(Object.getPrototypeOf(AttributeMarshalling.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(AttributeMarshalling.prototype), 'createdCallback', this).call(this);
        }
        [].forEach.call(this.attributes, function (attribute) {
          _this2.attributeChangedCallback(attribute.name, undefined, attribute.value);
        });
      }
    }]);

    return AttributeMarshalling;
  })(base);
};

// Convert camel case fooBar name to hyphenated foo-bar.

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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Polymer-style automatic node finding.
 * See https://www.polymer-project.org/1.0/docs/devguide/local-dom.html#node-finding.
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(AutomaticNodeFinding, _base);

    function AutomaticNodeFinding() {
      _classCallCheck(this, AutomaticNodeFinding);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AutomaticNodeFinding).apply(this, arguments));
    }

    _createClass(AutomaticNodeFinding, [{
      key: 'createdCallback',
      value: function createdCallback() {
        var _this2 = this;

        if (_get(Object.getPrototypeOf(AutomaticNodeFinding.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(AutomaticNodeFinding.prototype), 'createdCallback', this).call(this);
        }
        if (this.shadowRoot) {
          this.$ = {};
          var nodesWithIds = this.shadowRoot.querySelectorAll('[id]');
          [].forEach.call(nodesWithIds, function (node) {
            var id = node.getAttribute('id');
            _this2.$[id] = node;
          });
        }
      }
    }]);

    return AutomaticNodeFinding;
  })(base);
};

},{}],20:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (base) {
  return (function (_base) {
    _inherits(Composable, _base);

    function Composable() {
      _classCallCheck(this, Composable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Composable).apply(this, arguments));
    }

    _createClass(Composable, null, [{
      key: 'compose',
      value: function compose() {
        for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
          mixins[_key] = arguments[_key];
        }

        // We create a new subclass for each mixin in turn. The result becomes
        // the base class extended by any subsequent mixins. It turns out that
        // we can use Array.reduce() to concisely express this, using the current
        // object as the seed for reduce().
        return mixins.reduce(composeClass, this);
      }
    }]);

    return Composable;
  })(base);
};

// Properties defined by Object that we don't want to mixin.

var NON_MIXABLE_OBJECT_PROPERTIES = ['constructor'];

/*
 * Apply the mixin to the given base class to return a new class.
 * The mixin can either be a function that returns the modified class, or a
 * plain object whose members will be copied to the new class' prototype.
 */
function composeClass(base, mixin) {
  if (typeof mixin === 'function') {
    // Mixin function
    return mixin(base);
  } else {
    // Mixin object

    var Subclass = (function (_base2) {
      _inherits(Subclass, _base2);

      function Subclass() {
        _classCallCheck(this, Subclass);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Subclass).apply(this, arguments));
      }

      return Subclass;
    })(base);

    copyOwnProperties(mixin, Subclass.prototype, NON_MIXABLE_OBJECT_PROPERTIES);
    return Subclass;
  }
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

},{}],21:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('./Composable');

var _Composable2 = _interopRequireDefault(_Composable);

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

var ElementBase = (function (_Composable$compose) {
  _inherits(ElementBase, _Composable$compose);

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
      if (_get(Object.getPrototypeOf(ElementBase.prototype), 'log', this)) {
        _get(Object.getPrototypeOf(ElementBase.prototype), 'log', this).call(this, text);
      }
      console.log(this.localName + ': ' + text);
    }
  }]);

  return ElementBase;
})((0, _Composable2.default)(HTMLElement).compose(_TemplateStamping2.default, // before node finding, so shadow root is populated
_AutomaticNodeFinding2.default, // before marshalling, so marshalled properties can use it
_AttributeMarshalling2.default));

exports.default = ElementBase;

},{"./AttributeMarshalling":18,"./AutomaticNodeFinding":19,"./Composable":20,"./TemplateStamping":22}],22:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Element extension for template stamping. If a component defines a template
 * property (as a string or referencing a HTML template), when the component
 * class is instantiated, a shadow root will be created on the instance, and
 * the contents of the template will be cloned into the shadow root.
 *
 * For the time being, this extension retains support for Shadow DOM v0.
 * That will eventually be deprecated as browsers implement Shadow DOM v1.
 */

exports.default = function (base) {
  return (function (_base) {
    _inherits(TemplateStamping, _base);

    function TemplateStamping() {
      _classCallCheck(this, TemplateStamping);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TemplateStamping).apply(this, arguments));
    }

    _createClass(TemplateStamping, [{
      key: 'createdCallback',

      /*
       * If the component defines a template, a shadow root will be created on the
       * component instance, and the template stamped into it.
       */
      value: function createdCallback() {
        if (_get(Object.getPrototypeOf(TemplateStamping.prototype), 'createdCallback', this)) {
          _get(Object.getPrototypeOf(TemplateStamping.prototype), 'createdCallback', this).call(this);
        }
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
  })(base);
};

// Feature detection for old Shadow DOM v0.

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL0xpc3RCb3gvTGlzdEJveC5qcyIsIm1peGlucy9DaGlsZHJlbkNvbnRlbnQuanMiLCJtaXhpbnMvQ2xpY2tTZWxlY3Rpb24uanMiLCJtaXhpbnMvQ29sbGVjdGl2ZUVsZW1lbnQuanMiLCJtaXhpbnMvQ29udGVudEl0ZW1zLmpzIiwibWl4aW5zL0RpcmVjdGlvblNlbGVjdGlvbi5qcyIsIm1peGlucy9HZW5lcmljLmpzIiwibWl4aW5zL0l0ZW1TZWxlY3Rpb24uanMiLCJtaXhpbnMvSXRlbXNBY2Nlc3NpYmxlLmpzIiwibWl4aW5zL0tleWJvYXJkLmpzIiwibWl4aW5zL0tleWJvYXJkRGlyZWN0aW9uLmpzIiwibWl4aW5zL0tleWJvYXJkUGFnaW5nLmpzIiwibWl4aW5zL0tleWJvYXJkUHJlZml4U2VsZWN0aW9uLmpzIiwibWl4aW5zL1NlbGVjdGlvbkhpZ2hsaWdodC5qcyIsIm1peGlucy9TZWxlY3Rpb25TY3JvbGwuanMiLCJub2RlX21vZHVsZXMvQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9Db21wb3NhYmxlL3NyYy9Db21wb3NpdGlvblJ1bGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtY29tcG9uZW50LW1peGlucy9zcmMvQXR0cmlidXRlTWFyc2hhbGxpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1jb21wb25lbnQtbWl4aW5zL3NyYy9BdXRvbWF0aWNOb2RlRmluZGluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWNvbXBvbmVudC1taXhpbnMvc3JjL0NvbXBvc2FibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1jb21wb25lbnQtbWl4aW5zL3NyYy9FbGVtZW50QmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWNvbXBvbmVudC1taXhpbnMvc3JjL1RlbXBsYXRlU3RhbXBpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5n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TSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFBRSxNQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUFFLFNBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUFFO0dBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUFF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QUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQUUsTUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxBQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUFFLFFBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSxTQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FBRTtHQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFBRSxRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztHQUFFLE1BQU07QUFBRSxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQUUsWUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxLQUFLLENBQUM7Q0FBRSxDQUFDOztBQUVuYixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtBQUFFLE1BQUksTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxBQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQUFBQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFBRSxRQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsYUFBTyxTQUFTLENBQUM7S0FBRSxNQUFNO0FBQUUsYUFBTyxHQUFHLENBQUMs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QUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQUU7R0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQUUsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7R0FBRSxNQUFNO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUFFLFlBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sS0FBSyxDQUFDO0NBQUUsQ0FBQzs7QUFFbmIsSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFBRSxNQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUFFLGFBQU8sU0FBUyxDQUFDO0tBQUUsTUFBTTtBQUFFLGFBQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FBRTtHQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQUUsV0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUUsTUFBTTtBQUFFLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSxhQUFPLFNBQVMsQ0FBQztLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFB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S0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQUU7R0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQUUsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7R0FBRSxNQUFNO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUFFLFlBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQUU7R0FBRSxBQUFDLE9BQU8sS0FBSyxDQUFDO0NBQUUsQ0FBQzs7QUFFbmIsSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFBRSxNQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUFFLGFBQU8sU0FBUyxDQUFDO0tBQUUsTUFBTTtBQUFFLGFBQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FBRTtHQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQUUsV0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUUsTUFBTTtBQUFFLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSxhQUFPLFNBQVMsQ0FBQztLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxD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TSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSxTQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FBRTtHQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFBRSxRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztHQUFFLE1BQU07QUFBRSxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQUUsWUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FBRTtHQUFFLEFBQUMsT0FBTyxLQUFLLENBQUM7Q0FBRSxDQUFDOztBQUVuYixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtBQUFFLE1BQUksTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxBQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQUFBQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFBRSxRQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsYUFBTyxTQUFTLENBQUM7S0FBRSxNQUFNO0FBQUUsYUFBTyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUFFO0dBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFBRSxXQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7R0FBRSxNQUFNO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFD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LENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNqRDtBQUNELFNBQU8sUUFBUSxDQUFDO0NBQ2pCOzs7O0FBQUEsQUFJRCxTQUFTLHVCQUF1QixDQUFDLFFBQVEsRUFBRTtBQUN6QyxJQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQUEsV0FBVyxFQUFJO0FBQ3hFLFFBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkQsZUFBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0dBQ2xFLENBQUMsQ0FBQztDQUNKOzs7QUFBQSxBQUdELFNBQVMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUN6QyxlQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzVEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQSBzaW5nbGUtc2VsZWN0aW9uIGxpc3QgYm94IHRoYXQgc3VwcG9ydHMgc2VsZWN0aW9uIGhpZ2hsaWdodGluZyAodXNpbmcgdGhlXG4gKiBzeXN0ZW0gaGlnaGxpZ2h0IGNvbG9yKSBhbmQga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAqXG4gKiBUaGUgdXNlciBjYW4gc2VsZWN0IGFuIGl0ZW0gd2l0aCB0aGUgbW91c2UvdG91Y2ggb3Iga2V5Ym9hcmQ6IFVwL0Rvd24sIFBhZ2VcbiAqIFVwL0Rvd24sIEhvbWUvRW5kLlxuICpcbiAqIExpa2Ugb3RoZXIgQmFzaWMgV2ViIENvbXBvbmVudHMsIHRoaXMgY2FuIGhhbmRsZSBkaXN0cmlidXRlZCBjb250ZW50OiB5b3UgY2FuXG4gKiBpbmNsdWRlIGEgY29udGVudCBlbGVtZW50IGluc2lkZSBhIGJhc2ljLWxpc3QtYm94LCBhbmQgdGhlIGxpc3Qgd2lsbCBuYXZpZ2F0ZVxuICogdGhyb3VnaCB0aGUgZGlzdHJpYnV0ZWQgY29udGVudC4gTm90ZTogZm9yIHRoZSB0aW1lIGJlaW5nLCBpZiB5b3UgZG8gdXNlIGJhc2ljLVxuICogbGlzdC1ib3ggaW5zaWRlIHlvdXIgb3duIGNvbXBvbmVudCwgaXQgYXBwZWFycyB0aGF0IHlvdSdsbCBuZWVkIHRvIHdpcmUgdXAgeW91clxuICogb3duIGtleWJvYXJkIG5hdmlnYXRpb24sIGFuZCBmb3J3YXJkIHRoZSBsaXN0IG5hdmlnYXRpb24ga2V5cyB0byB0aGUgYmFzaWMtbGlzdC1cbiAqIGJveC5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBpbmNsdWRlcyBiYXNpYyBBUklBIHN1cHBvcnQgdG8gcHJvdmlkZSBhIHJlYXNvbmFibGUgZGVmYXVsdFxuICogZXhwZXJpZW5jZSwgZS5nLiwgZm9yIHNjcmVlbiByZWFkZXJzLiBUaGUgbGlzdCBjb21wb25lbnQgaXRzZWxmIHdpbGwgYmUgYXNzaWduZWRcbiAqIGFuIGFwcHJvcHJpYXRlIEFSSUEgcm9sZSAoZGVmYXVsdCBpcyBcImxpc3Rib3hcIikuIFRoZSBJRCBvZiB0aGUgc2VsZWN0ZWQgaXRlbVxuICogd2lsbCBiZSByZWZsZWN0ZWQgaW4gYW4gXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiBhdHRyaWJ1dGUgYXBwbGllZCB0byB0aGUgbGlzdC5cbiAqIFRvIHN1cHBvcnQgdGhpcyBmZWF0dXJlLCBhbGwgaXRlbXMgaW4gdGhlIGxpc3QgbmVlZCB1bmlxdWUgSURzLiBJZiBhbiBpdGVtIGRvZXNcbiAqIG5vdCBoYXZlIGFuIElELCBiYXNpYy1saXN0LWJveCB3aWxsIGF1dG9tYXRpY2FsbHkgYXNzaWduIGEgZGVmYXVsdCBJRC5cbiAqXG4gKiBUaGUga2V5Ym9hcmQgaW50ZXJhY3Rpb24gbW9kZWwgZ2VuZXJhbGx5IGZvbGxvd3MgdGhhdCBvZiBNaWNyb3NvZnQgV2luZG93cydcbiAqIGxpc3QgYm94ZXMgaW5zdGVhZCBvZiB0aG9zZSBpbiBPUyBYOlxuICpcbiAqICogVGhlIFBhZ2UgVXAvRG93biBhbmQgSG9tZS9FbmQga2V5cyBhY3R1YWxseSBtb3ZlIHRoZSBzZWxlY3Rpb24sIHJhdGhlciB0aGFuXG4gKiAgIGp1c3Qgc2Nyb2xsaW5nIHRoZSBsaXN0LiBUaGUgZm9ybWVyIGJlaGF2aW9yIHNlZW1zIG1vcmUgZ2VuZXJhbGx5IHVzZWZ1bCBmb3JcbiAqICAga2V5Ym9hcmQgdXNlcnMuXG4gKlxuICogKiBQcmVzc2luZyBQYWdlIFVwL0Rvd24gd2lsbCBtb3ZlIHRoZSBzZWxlY3Rpb24gdG8gdGhlIHRvcG1vc3QvYm90dG9tbW9zdFxuICogICB2aXNpYmxlIGl0ZW0gaWYgdGhlIHNlbGVjdGlvbiBpcyBub3QgYWxyZWFkeSB0aGVyZS4gVGhlcmVhZnRlciwgdGhlIGtleSB3aWxsXG4gKiAgIG1vdmUgdGhlIHNlbGVjdGlvbiB1cC9kb3duIGJ5IGEgcGFnZSwgYW5kIChwZXIgdGhlIGFib3ZlIHBvaW50KSBtYWtlIHRoZVxuICogICBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogUHJvZ3JhbW1hdGljYWxseSBzZWxlY3RpbmcgYW4gaXRlbSAoYnkgc2V0dGluZyB0aGUgc2VsZWN0ZWQgcHJvcGVydHkpIHNjcm9sbHNcbiAqIHRoZSBpdGVtIGludG8gdmlldy5cbiAqXG4gKiBUaGUgdXNlciBjYW4gYWxzbyBzZWxlY3QgYW4gaXRlbSBieSB0eXBpbmcgdGhlIGJlZ2lubmluZyBvZiBhbiBpdGVtJ3MgdGV4dC5cbiAqXG4gKiBAY2xhc3MgTGlzdEJveFxuICovXG5cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2NvcmUtY29tcG9uZW50LW1peGlucy9zcmMvRWxlbWVudEJhc2UnO1xuaW1wb3J0IENoaWxkcmVuQ29udGVudCBmcm9tICcuLi8uLi9taXhpbnMvQ2hpbGRyZW5Db250ZW50JztcbmltcG9ydCBDbGlja1NlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvQ2xpY2tTZWxlY3Rpb24nO1xuaW1wb3J0IENvbGxlY3RpdmVFbGVtZW50IGZyb20gJy4uLy4uL21peGlucy9Db2xsZWN0aXZlRWxlbWVudCc7XG5pbXBvcnQgQ29udGVudEl0ZW1zIGZyb20gJy4uLy4uL21peGlucy9Db250ZW50SXRlbXMnO1xuaW1wb3J0IERpcmVjdGlvblNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvRGlyZWN0aW9uU2VsZWN0aW9uJztcbmltcG9ydCBHZW5lcmljIGZyb20gJy4uLy4uL21peGlucy9HZW5lcmljJztcbmltcG9ydCBJdGVtU2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9JdGVtU2VsZWN0aW9uJztcbmltcG9ydCBJdGVtc0FjY2Vzc2libGUgZnJvbSAnLi4vLi4vbWl4aW5zL0l0ZW1zQWNjZXNzaWJsZSc7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkJztcbmltcG9ydCBLZXlib2FyZERpcmVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmREaXJlY3Rpb24nO1xuaW1wb3J0IEtleWJvYXJkUGFnaW5nIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZFBhZ2luZyc7XG5pbXBvcnQgS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkUHJlZml4U2VsZWN0aW9uJztcbmltcG9ydCBTZWxlY3Rpb25IaWdobGlnaHQgZnJvbSAnLi4vLi4vbWl4aW5zL1NlbGVjdGlvbkhpZ2hsaWdodCc7XG5pbXBvcnQgU2VsZWN0aW9uU2Nyb2xsIGZyb20gJy4uLy4uL21peGlucy9TZWxlY3Rpb25TY3JvbGwnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RCb3ggZXh0ZW5kcyBFbGVtZW50QmFzZS5jb21wb3NlKFxuICAgIENoaWxkcmVuQ29udGVudCxcbiAgICBDbGlja1NlbGVjdGlvbixcbiAgICBDb2xsZWN0aXZlRWxlbWVudCxcbiAgICBDb250ZW50SXRlbXMsXG4gICAgRGlyZWN0aW9uU2VsZWN0aW9uLFxuICAgIEdlbmVyaWMsXG4gICAgSXRlbVNlbGVjdGlvbixcbiAgICBJdGVtc0FjY2Vzc2libGUsXG4gICAgS2V5Ym9hcmQsXG4gICAgS2V5Ym9hcmREaXJlY3Rpb24sXG4gICAgS2V5Ym9hcmRQYWdpbmcsXG4gICAgS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24sXG4gICAgU2VsZWN0aW9uSGlnaGxpZ2h0LFxuICAgIFNlbGVjdGlvblNjcm9sbFxuICApIHtcblxuICAvLyBTdHViIGZvciBjb2xsZWN0aXZlcyBmb3Igbm93XG4gIGdldCBpbm5lcm1vc3RBdHRhY2hlZCgpIHtcbiAgICByZXR1cm4gdGhpcy4kLml0ZW1zQ29udGFpbmVyO1xuICB9XG4gIGdldCBvdXRlcm1vc3RBdHRhY2hlZCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgICAgIH1cblxuICAgICAgW3RhcmdldD1cImNoaWxkXCJdIHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAtd2Via2l0LWZsZXg6IDE7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICB9XG5cbiAgICAgICNpdGVtc0NvbnRhaW5lciB7XG4gICAgICAgIC13ZWJraXQtZmxleDogMTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuICAgICAgICBvdmVyZmxvdy15OiBzY3JvbGw7IC8qIGZvciBtb21lbnR1bSBzY3JvbGxpbmcgKi9cbiAgICAgIH1cblxuICAgICAgLyogR2VuZXJpYyBhcHBlYXJhbmNlICovXG4gICAgICA6aG9zdChbZ2VuZXJpYz1cIlwiXSkge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFtnZW5lcmljPVwiXCJdKSAjaXRlbXNDb250YWluZXIgOjpjb250ZW50ID4gKiB7XG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgICAgcGFkZGluZzogMC4yNWVtO1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgaWQ9XCJpdGVtc0NvbnRhaW5lclwiIHJvbGU9XCJub25lXCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtbGlzdC1ib3gnLCBMaXN0Qm94KTtcbiIsIi8qKlxuICogTWl4aW4gdGhhdCBkZWZpbmVzIGEgY29tcG9uZW50J3MgY29udGVudCBhcyBpdHMgY2hpbGRyZW4uXG4gKlxuICogQGNsYXNzIENoaWxkcmVuQ29udGVudFxuICpcbiAqL1xuXG4vLyBUT0RPOiBEb24ndCByZXNwb25kIHRvIGNoYW5nZXMgaW4gYXR0cmlidXRlcywgb3IgYXQgbGVhc3Qgb2ZmZXIgdGhhdCBhcyBhblxuLy8gb3B0aW9uLlxuXG5leHBvcnQgZGVmYXVsdCAoYmFzZSkgPT4gY2xhc3MgQ2hpbGRyZW5Db250ZW50IGV4dGVuZHMgYmFzZSB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGlmIChzdXBlci5jcmVhdGVkQ2FsbGJhY2spIHsgc3VwZXIuY3JlYXRlZENhbGxiYWNrKCk7IH1cbiAgICAvLyBVbnRpbCB3ZSBoYXZlIGNvbnRlbnQgb2JzZXJ2aW5nIGFnYWluLCBmb3JjZSBhIGNhbGwgdG8gY29udGVudENoYW5nZWQoKS5cbiAgICAvLyBIQUNLOiBEbyB0aGlzIGFzeW5jaHJvbm91c2x5LCBzbyBvdGhlciBtaXhpbnMgaGF2ZSBhIGNoYW5jZSB0byBzZXQgdXBcbiAgICAvLyBiZWZvcmUgdGhpcyBjYWxsLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb250ZW50Q2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8vIFRPRE86IFdhaXQgdG8gb2JzZXJ2ZSBjaGFuZ2VzIHVudGlsIHdlIGhhdmUgYSBzaGFkb3cgRE9NIGhvc3QuIFJpZ2h0XG4gIC8vIG5vdywgdGhlIGluaXRpYWwgY29sbGVjdGl2ZUNoYW5nZWQgY2FsbCBjYW4gaGFwcGVuIHRvbyBlYXJseS5cbiAgLy8gVE9ETzogSGFuZGxlIGNhc2Ugd2hlcmUgY29tcG9uZW50IGlzIGluc3RhbnRpYXRlZCBvdXQgb2YgRE9NLCB0aGVuXG4gIC8vIGF0dGFjaGVkLlxuICAvLyBjb2xsZWN0aXZlQ2hhbmdlZCgpIHtcbiAgLy8gICAvLyBjb25zb2xlLmxvZyh0aGlzLmxvY2FsTmFtZSArIFwiIGNvbGxlY3RpdmVDaGFuZ2VkOiBcIiArIHRoaXMuY29sbGVjdGl2ZS5hc3BlY3RzLmxlbmd0aCk7XG4gIC8vICAgbGV0IGlubmVybW9zdCA9IHRoaXMuY29sbGVjdGl2ZS5pbm5lcm1vc3RFbGVtZW50O1xuICAvLyAgIGxldCBpbm5lcm1vc3RIb3N0ID0gQmFzaWMuQ29udGVudEhlbHBlcnMuZ2V0SG9zdChpbm5lcm1vc3QpO1xuICAvL1xuICAvLyAgIC8vIE9wdGltaXplIGZvciB0aGUgY2FzZSB3aGVyZSB0aGUgY29sbGVjdGl2ZSdzIGNoYW5nZWQsIGJ1dCBpdHNcbiAgLy8gICAvLyBpbm5lcm1vc3QgYXNwZWN0IGlzIHN0aWxsIHRoZSBzYW1lLiBJbiB0aGF0IGNhc2UsIHdlIGRvbid0IHdhbnQgdG9cbiAgLy8gICAvLyBib3RoZXIgdGVhcmluZyBkb3duIGFuZCB0aGVuIHJlY3JlYXRpbmcgb3VyIGNvbnRlbnRDaGFuZ2VkIGhhbmRsZXIuXG4gIC8vICAgLy8gVE9ETzogVGhpcyBjdXJyZW50bHkgb25seSB0cmFja3Mgb25lIGxldmVsIG9mIGhvc3QuIEZvciByb2J1c3RuZXNzLFxuICAvLyAgIC8vIHRoaXMgc2hvdWxkIHRyYWNrIHRoZSBjaGFpbiBvZiBob3N0cy5cbiAgLy8gICBpZiAoaW5uZXJtb3N0ID09PSB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdFxuICAvLyAgICAgICAmJiBpbm5lcm1vc3RIb3N0ID09PSB0aGlzLl9wcmV2aW91c0lubmVybW9zdEhvc3QpIHtcbiAgLy8gICAgIC8vIFdlIHNob3VsZCBhbHJlYWR5IGJlIG9ic2VydmluZyBjaGFuZ2VzIG9uIHRoZSBpbm5lcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgLy8gRXZlbiB0aG91Z2ggdGhlIGNvbnRlbnQgaGFzbid0IGFjdHVhbGx5IGNoYW5nZWQsIHdlIHdhbnQgdG8gZ2l2ZSB0aGVcbiAgLy8gICAgIC8vIG5ldyBhc3BlY3RzIGEgY2hhbmNlIHRvIHJlc3BvbmQgdG8gY29udGVudENoYW5nZWQuXG4gIC8vICAgICB0aGlzLmNvbGxlY3RpdmUuY29udGVudENoYW5nZWQoKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgLy8gQSBuZXcgYXNwZWN0IGlzIG5vdyBpbm5lcm1vc3QuXG4gIC8vICAgaWYgKHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0ICYmIHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0Ll9jb250ZW50Q2hhbmdlT2JzZXJ2ZXIpIHtcbiAgLy8gICAgIC8vIFN0b3Agb2JzZXJ2aW5nIGNoYW5nZXMgb24gdGhlIG9sZCBpbm5lcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJzdG9wcGluZyBvYnNlcnZhdGlvbiBvZiBjaGFuZ2VzIG9uIG9sZCBpbm5lcm1vc3QgYXNwZWN0XCIpO1xuICAvLyAgICAgQmFzaWMuQ29udGVudEhlbHBlcnMub2JzZXJ2ZUNvbnRlbnRDaGFuZ2VzKHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0LCBudWxsKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgQmFzaWMuQ29udGVudEhlbHBlcnMub2JzZXJ2ZUNvbnRlbnRDaGFuZ2VzKGlubmVybW9zdCwgZnVuY3Rpb24oKSB7XG4gIC8vICAgICAvLyBSZXNldCBtZW1vaXplZCBjb250ZW50LlxuICAvLyAgICAgdGhpcy5fY29udGVudCA9IG51bGw7XG4gIC8vXG4gIC8vICAgICAvLyBMZXQgY29sbGVjdGl2ZSBrbm93IGNvbnRlbnQgaGFzIGNoYW5nZWQuXG4gIC8vICAgICB0aGlzLmNvbGxlY3RpdmUuY29udGVudENoYW5nZWQoKTtcbiAgLy8gICB9LmJpbmQodGhpcykpO1xuICAvL1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0ID0gaW5uZXJtb3N0O1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0SG9zdCA9IGlubmVybW9zdEhvc3Q7XG4gIC8vIH1cblxuICBjb250ZW50Q2hhbmdlZCgpIHtcbiAgICBpZiAoc3VwZXIuY29udGVudENoYW5nZWQpIHsgc3VwZXIuY29udGVudENoYW5nZWQoKTsgfVxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnY29udGVudC1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsYXR0ZW5lZCBjb250ZW50IG9mIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcHJvcGVydHkgY29udGVudFxuICAgKiBAdHlwZSBbT2JqZWN0XVxuICAgKi9cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIGV4cGFuZENvbnRlbnRFbGVtZW50cyh0aGlzLmNoaWxkcmVuKTtcbiAgfVxuICBzZXQgY29udGVudCh2YWx1ZSkge1xuICAgIGlmICgnY29udGVudCcgaW4gYmFzZS5wcm90b3R5cGUpIHsgc3VwZXIuY29udGVudCA9IHZhbHVlOyB9XG4gIH1cblxufTtcblxuXG4vKlxuICogR2l2ZW4gYSBhcnJheSBvZiBub2RlcywgcmV0dXJuIGEgbmV3IGFycmF5IHdpdGggYW55IGNvbnRlbnQgZWxlbWVudHMgZXhwYW5kZWRcbiAqIHRvIHRoZSBub2RlcyBkaXN0cmlidXRlZCB0byB0aGF0IGNvbnRlbnQgZWxlbWVudC4gVGhpcyBydWxlIGlzIGFwcGxpZWRcbiAqIHJlY3Vyc2l2ZWx5LlxuICpcbiAqIElmIGluY2x1ZGVUZXh0Tm9kZXMgaXMgdHJ1ZSwgdGV4dCBub2RlcyB3aWxsIGJlIGluY2x1ZGVkLCBhcyBpbiB0aGVcbiAqIHN0YW5kYXJkIGNoaWxkTm9kZXMgcHJvcGVydHk7IGJ5IGRlZmF1bHQsIHRoaXMgc2tpcHMgdGV4dCBub2RlcywgbGlrZSB0aGVcbiAqIHN0YW5kYXJkIGNoaWxkcmVuIHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBleHBhbmRDb250ZW50RWxlbWVudHMobm9kZXMsIGluY2x1ZGVUZXh0Tm9kZXMpIHtcbiAgbGV0IGV4cGFuZGVkID0gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKG5vZGVzLCBub2RlID0+IHtcbiAgICAvLyBXZSB3YW50IHRvIHNlZSBpZiB0aGUgbm9kZSBpcyBhbiBpbnN0YW5jZW9mIEhUTUxDb250ZW50RWxlbWVudCwgYnV0XG4gICAgLy8gdGhhdCBjbGFzcyB3b24ndCBleGlzdCBpZiB0aGUgYnJvd3NlciB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCBuYXRpdmVcbiAgICAvLyBTaGFkb3cgRE9NIGFuZCBpZiB0aGUgU2hhZG93IERPTSBwb2x5ZmlsbCBoYXNuJ3QgYmVlbiBsb2FkZWQuIEluc3RlYWQsXG4gICAgLy8gd2UgZG8gYSBzaW1wbGlzdGljIGNoZWNrIHRvIHNlZSBpZiB0aGUgdGFnIG5hbWUgaXMgXCJjb250ZW50XCIuXG4gICAgaWYgKG5vZGUubG9jYWxOYW1lICYmIG5vZGUubG9jYWxOYW1lID09PSBcImNvbnRlbnRcIikge1xuICAgICAgLy8gY29udGVudCBlbGVtZW50OyB1c2UgaXRzIGRpc3RyaWJ1dGVkIG5vZGVzIGluc3RlYWQuXG4gICAgICBsZXQgZGlzdHJpYnV0ZWROb2RlcyA9IG5vZGUuZ2V0RGlzdHJpYnV0ZWROb2RlcygpO1xuICAgICAgcmV0dXJuIGRpc3RyaWJ1dGVkTm9kZXMgP1xuICAgICAgICBleHBhbmRDb250ZW50RWxlbWVudHMoZGlzdHJpYnV0ZWROb2RlcywgaW5jbHVkZVRleHROb2RlcykgOlxuICAgICAgICBbXTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgLy8gUGxhaW4gZWxlbWVudDsgdXNlIGFzIGlzLlxuICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBUZXh0ICYmIGluY2x1ZGVUZXh0Tm9kZXMpIHtcbiAgICAgIC8vIFRleHQgbm9kZS5cbiAgICAgIHJldHVybiBbbm9kZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENvbW1lbnQsIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIGV0Yy47IHNraXAuXG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9KTtcbiAgbGV0IGZsYXR0ZW5lZCA9IFtdLmNvbmNhdCguLi5leHBhbmRlZCk7XG4gIHJldHVybiBmbGF0dGVuZWQ7XG59XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIG1hcHMgYSBjbGljayAoYWN0dWFsbHksIGEgbW91c2Vkb3duKSB0byBpdGVtIHNlbGVjdGlvbi5cbiAqXG4gKiBAY2xhc3MgQ2xpY2tTZWxlY3Rpb25cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoYmFzZSkgPT4gY2xhc3MgQ2xpY2tTZWxlY3Rpb24gZXh0ZW5kcyBiYXNlIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHN1cGVyLmNyZWF0ZWRDYWxsYmFjaykgeyBzdXBlci5jcmVhdGVkQ2FsbGJhY2soKTsgfVxuICAgIC8qXG4gICAgICogUkVWSUVXOiBXaGljaCBldmVudCBzaG91bGQgd2UgbGlzdGVuIHRvIGhlcmU/XG4gICAgICpcbiAgICAgKiBUaGUgc3RhbmRhcmQgdXNlIGZvciB0aGlzIG1peGluIGlzIGluIGxpc3QgYm94ZXMuIExpc3QgYm94ZXMgZG9uJ3RcbiAgICAgKiBhcHBlYXIgdG8gYmUgY29uc2lzdGVudCB3aXRoIHJlZ2FyZCB0byB3aGV0aGVyIHRoZXkgc2VsZWN0IG9uIG1vdXNlZG93blxuICAgICAqIG9yIGNsaWNrL21vdXNldXAuXG4gICAgICovXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICBzZWxlY3RUYXJnZXQodGhpcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgIC8vIE5vdGU6IFdlIGRvbid0IGNhbGwgcHJldmVudERlZmF1bHQgaGVyZS4gVGhlIGRlZmF1bHQgYmVoYXZpb3IgZm9yXG4gICAgICAvLyBtb3VzZWRvd24gaW5jbHVkZXMgc2V0dGluZyBrZXlib2FyZCBmb2N1cyBpZiB0aGUgZWxlbWVudCBkb2Vzbid0XG4gICAgICAvLyBhbHJlYWR5IGhhdmUgdGhlIGZvY3VzLCBhbmQgd2Ugd2FudCB0byBwcmVzZXJ2ZSB0aGF0IGJlaGF2aW9yLlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0ZWRJbmRleDtcbiAgfVxuICBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGlmICgnc2VsZWN0ZWRJbmRleCcgaW4gYmFzZS5wcm90b3R5cGUpIHsgc3VwZXIuc2VsZWN0ZWRJbmRleCA9IGluZGV4OyB9XG4gIH1cblxufTtcblxuLy8gVE9ETzogSGFuZGxlIHRoZSBjYXNlIHdoZXJlIGEgbGlzdCBpdGVtIGhhcyBzdWJlbGVtZW50cy4gV2FsayB1cCB0aGUgRE9NXG4vLyBoaWVyYXJjaHkgdW50aWwgd2UgZmluZCBhbiBpdGVtIGluIHRoZSBsaXN0LCBvciBjb21lIGJhY2sgdG8gdGhpcyBlbGVtZW50LFxuLy8gaW4gd2hpY2ggY2FzZSB0aGUgZWxlbWVudCB0aGF0IHdhcyB0YXBwZWQgaXNuJ3QgYW4gaXRlbSAoYW5kIHNob3VsZCBiZVxuLy8gaWdub3JlZCkuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gIGxldCBpbmRleCA9IGVsZW1lbnQuaW5kZXhPZkl0ZW0gJiYgZWxlbWVudC5pbmRleE9mSXRlbSh0YXJnZXQpO1xuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICB9XG59XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIGFsbG93cyBhIGNvbXBvbmVudCB0byBwcm92aWRlIGFnZ3JlZ2F0ZSBiZWhhdmlvciB3aXRoIG90aGVyXG4gKiBlbGVtZW50cywgZS5nLiwgZm9yIGtleWJvYXJkIGhhbmRsaW5nLlxuICpcbiAqIEBjbGFzcyBDb2xsZWN0aXZlRWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCAoYmFzZSkgPT4gY2xhc3MgQ29sbGVjdGl2ZUVsZW1lbnQgZXh0ZW5kcyBiYXNlIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHN1cGVyLmNyZWF0ZWRDYWxsYmFjaykgeyBzdXBlci5jcmVhdGVkQ2FsbGJhY2soKTsgfVxuICAgIHRoaXMuY29sbGVjdGl2ZSA9IG5ldyBDb2xsZWN0aXZlKHRoaXMpO1xuICB9XG5cbiAgc2V0IHRhcmdldChlbGVtZW50KSB7XG4gICAgaWYgKCd0YXJnZXQnIGluIGJhc2UucHJvdG90eXBlKSB7IHN1cGVyLnRhcmdldCA9IGVsZW1lbnQ7IH1cbiAgICB0aGlzLmNvbGxlY3RpdmUuYXNzaW1pbGF0ZShlbGVtZW50KTtcbiAgfVxuXG59O1xuXG5cbmNsYXNzIENvbGxlY3RpdmUge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9lbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuYXNzaW1pbGF0ZShlbGVtZW50KTtcbiAgfVxuXG4gIGFzc2ltaWxhdGUodGFyZ2V0KSB7XG4gICAgbGV0IGVsZW1lbnRzID0gdGFyZ2V0LmNvbGxlY3RpdmUgP1xuICAgICAgdGFyZ2V0LmNvbGxlY3RpdmUuZWxlbWVudHMgOlxuICAgICAgW3RhcmdldF07XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGVsZW1lbnQuY29sbGVjdGl2ZSA9IHRoaXM7XG4gICAgICB0aGlzLl9lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuaW52b2tlQ29sbGVjdGl2ZU1ldGhvZCgnY29sbGVjdGl2ZUNoYW5nZWQnKTtcbiAgfVxuXG4gIGdldCBlbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHM7XG4gIH1cblxuICBpbnZva2VDb2xsZWN0aXZlTWV0aG9kKG1ldGhvZCwgLi4uYXJncykge1xuICAgIC8vIEludm9rZSBmcm9tIGlubmVybW9zdCB0byBvdXRlcm1vc3QuXG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbGVtZW50cztcbiAgICBmb3IgKGxldCBpID0gZWxlbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICBpZiAoZWxlbWVudFttZXRob2RdKSB7XG4gICAgICAgIGVsZW1lbnRbbWV0aG9kXS5hcHBseShlbGVtZW50LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgb3V0ZXJtb3N0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1swXTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIE1peGluIHRoYXQgbGV0cyBhIGNvbXBvbmVudCB0cmVhdCBpdHMgY29udGVudCBhcyBsaXN0IGl0ZW1zLlxuICpcbiAqIEF1eGlsaWFyeSBlbGVtZW50cyB3aGljaCBhcmUgbm90IG5vcm1hbGx5IHZpc2libGUgYXJlIGZpbHRlcmVkIG91dC4gRm9yIG5vdyxcbiAqIEZvciBub3csIHRoZXNlIGFyZTogbGluaywgc2NyaXB0LCBzdHlsZSwgYW5kIHRlbXBsYXRlLlxuICpcbiAqIEBjbGFzcyBDb250ZW50SXRlbXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoYmFzZSkgPT4gY2xhc3MgQ29udGVudEl0ZW1zIGV4dGVuZHMgYmFzZSB7XG5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHtcbiAgICBpZiAoc3VwZXIuYXBwbHlTZWxlY3Rpb24pIHsgc3VwZXIuYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpOyB9XG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcsIHNlbGVjdGVkKTtcbiAgfVxuXG4gIGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgIGlmIChzdXBlci5jb250ZW50Q2hhbmdlZCkgeyBzdXBlci5jb250ZW50Q2hhbmdlZCgpOyB9XG4gICAgdGhpcy5faXRlbXMgPSBudWxsO1xuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb25hbCBpbmRleCBmb3IgdGhlIGluZGljYXRlZCBpdGVtLlxuICAgKlxuICAgKiBAbWV0aG9kIGluZGV4T2ZJdGVtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIFRoZSBpdGVtIHdob3NlIGluZGV4IGlzIHJlcXVlc3RlZC5cbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBpdGVtLCBvciAtMSBpZiBub3QgZm91bmQuXG4gICAqL1xuICBpbmRleE9mSXRlbShpdGVtKSB7XG4gICAgaWYgKHN1cGVyLmluZGV4T2ZJdGVtKSB7IHN1cGVyLmluZGV4T2ZJdGVtKGl0ZW0pOyB9XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3RoaW5nLlxuICBpdGVtQWRkZWQoaXRlbSkge1xuICAgIGlmIChzdXBlci5pdGVtQWRkZWQpIHsgc3VwZXIuaXRlbUFkZGVkKGl0ZW0pOyB9XG4gIH1cblxuICBpdGVtc0NoYW5nZWQoKSB7XG4gICAgaWYgKHN1cGVyLml0ZW1zQ2hhbmdlZCkgeyBzdXBlci5pdGVtc0NoYW5nZWQoKTsgfVxuXG4gICAgLy8gUGVyZm9ybSBwZXItaXRlbSBpbml0aWFsaXphdGlvbi5cbiAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoIWl0ZW0uX2l0ZW1Jbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLml0ZW1BZGRlZChpdGVtKTtcbiAgICAgICAgaXRlbS5faXRlbUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2l0ZW1zLWNoYW5nZWQnKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2V0IG9mIGl0ZW1zIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAcHJvcGVydHkgaXRlbXNcbiAgICogQHR5cGUgW09iamVjdF1cbiAgICovXG4gIC8vIFRPRE86IHByb3BlcnR5IG5vdGlmaWNhdGlvbnMgc28gZWxlbWVudHMgY2FuIGJpbmQgdG8gdGhpcyBwcm9wZXJ0eVxuICBnZXQgaXRlbXMoKSB7XG4gICAgaWYgKHRoaXMuX2l0ZW1zID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2l0ZW1zID0gZmlsdGVyQXV4aWxpYXJ5RWxlbWVudHModGhpcy5jb250ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG5cbn07XG5cblxuLy8gUmV0dXJuIHRoZSBnaXZlbiBlbGVtZW50cywgZmlsdGVyaW5nIG91dCBhdXhpbGlhcnkgZWxlbWVudHMgdGhhdCBhcmVuJ3Rcbi8vIHR5cGljYWxseSB2aXNpYmxlLiBJdGVtcyB3aGljaCBhcmUgbm90IGVsZW1lbnRzIGFyZSByZXR1cm5lZCBhcyBpcy5cbmZ1bmN0aW9uIGZpbHRlckF1eGlsaWFyeUVsZW1lbnRzKGl0ZW1zKSB7XG4gIGxldCBhdXhpbGlhcnlUYWdzID0gW1xuICAgICdsaW5rJyxcbiAgICAnc2NyaXB0JyxcbiAgICAnc3R5bGUnLFxuICAgICd0ZW1wbGF0ZSdcbiAgXTtcbiAgcmV0dXJuIFtdLmZpbHRlci5jYWxsKGl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuICFpdGVtLmxvY2FsTmFtZSB8fCBhdXhpbGlhcnlUYWdzLmluZGV4T2YoaXRlbS5sb2NhbE5hbWUpIDwgMDtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCBjaGFuZ2UuXG4gKlxuICogQGV2ZW50IGl0ZW1zLWNoYW5nZWRcbiAqL1xuIiwiLyoqXG4gKiBNaXhpbiB3aGljaCBtYXBzIGRpcmVjdGlvbiBzZW1hbnRpY3MgKGdvTGVmdCwgZ29SaWdodCwgZXRjLikgdG8gc2VsZWN0aW9uXG4gKiBzZW1hbnRpY3MgKHNlbGVjdFByZXZpb3VzLCBzZWxlY3ROZXh0LCBldGMuKS5cbiAqXG4gKiBAY2xhc3MgRGlyZWN0aW9uU2VsZWN0aW9uXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IChiYXNlKSA9PiBjbGFzcyBEaXJlY3Rpb25TZWxlY3Rpb24gZXh0ZW5kcyBiYXNlIHtcblxuICBnb0Rvd24oKSB7XG4gICAgaWYgKHN1cGVyLmdvRG93bikgeyBzdXBlci5nb0Rvd24oKTsgfVxuICAgIHJldHVybiB0aGlzLnNlbGVjdE5leHQoKTtcbiAgfVxuXG4gIGdvRW5kKCkge1xuICAgIGlmIChzdXBlci5nb0VuZCkgeyBzdXBlci5nb0VuZCgpOyB9XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TGFzdCgpO1xuICB9XG5cbiAgZ29MZWZ0KCkge1xuICAgIGlmIChzdXBlci5nb0xlZnQpIHsgc3VwZXIuZ29MZWZ0KCk7IH1cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQcmV2aW91cygpO1xuICB9XG5cbiAgZ29SaWdodCgpIHtcbiAgICBpZiAoc3VwZXIuZ29SaWdodCkgeyBzdXBlci5nb1JpZ2h0KCk7IH1cbiAgICByZXR1cm4gdGhpcy5zZWxlY3ROZXh0KCk7XG4gIH1cblxuICBnb1N0YXJ0KCkge1xuICAgIGlmIChzdXBlci5nb1N0YXJ0KSB7IHN1cGVyLmdvU3RhcnQoKTsgfVxuICAgIHJldHVybiB0aGlzLnNlbGVjdEZpcnN0KCk7XG4gIH1cblxuICBnb1VwKCkge1xuICAgIGlmIChzdXBlci5nb1VwKSB7IHN1cGVyLmdvVXAoKTsgfVxuICAgIHJldHVybiB0aGlzLnNlbGVjdFByZXZpb3VzKCk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9ucy4gVGhlc2Ugd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIHNlbGVjdEZpcnN0KCkge1xuICAgIGlmIChzdXBlci5zZWxlY3RGaXJzdCkgeyByZXR1cm4gc3VwZXIuc2VsZWN0Rmlyc3QoKTsgfVxuICB9XG4gIHNlbGVjdExhc3QoKSB7XG4gICAgaWYgKHN1cGVyLnNlbGVjdExhc3QpIHsgcmV0dXJuIHN1cGVyLnNlbGVjdExhc3QoKTsgfVxuICB9XG4gIHNlbGVjdE5leHQoKSB7XG4gICAgaWYgKHN1cGVyLnNlbGVjdE5leHQpIHsgcmV0dXJuIHN1cGVyLnNlbGVjdE5leHQoKTsgfVxuICB9XG4gIHNlbGVjdFByZXZpb3VzKCkge1xuICAgIGlmIChzdXBlci5zZWxlY3RQcmV2aW91cykgeyByZXR1cm4gc3VwZXIuc2VsZWN0UHJldmlvdXMoKTsgfVxuICB9XG5cblxufTtcbiIsIi8qKlxuICogTWl4aW4gdGhhdCBhbGxvd3MgYSBjb21wb25lbnQgdG8gc3VwcG9ydCBhIFwiZ2VuZXJpY1wiIHN0eWxlOiBhIG1pbmltYWxpc3RcbiAqIHN0eWxlIHRoYXQgY2FuIGVhc2lseSBiZSByZW1vdmVkIHRvIHJlc2V0IGl0cyB2aXN1YWwgYXBwZWFyYW5jZSB0byBhIGJhc2VsaW5lXG4gKiBzdGF0ZS5cbiAqXG4gKiBCeSBkZWZhdWx0LCBhIGNvbXBvbmVudCBzaG91bGQgcHJvdmlkZSBhIG1pbmltYWwgdmlzdWFsIHByZXNlbnRhdGlvbiB0aGF0XG4gKiBhbGxvd3MgdGhlIGNvbXBvbmVudCB0byBmdW5jdGlvbi4gSG93ZXZlciwgdGhlIG1vcmUgc3R5bGluZyB0aGUgY29tcG9uZW50XG4gKiBwcm92aWRlcyBieSBkZWZhdWx0LCB0aGUgaGFyZGVyIGl0IGJlY29tZXMgdG8gZ2V0IHRoZSBjb21wb25lbnQgdG8gZml0IGluXG4gKiBpbiBvdGhlciBzZXR0aW5ncy4gRWFjaCBDU1MgcnVsZSBoYXMgdG8gYmUgb3ZlcnJpZGRlbi4gV29yc2UsIG5ldyBDU1MgcnVsZXNcbiAqIGFkZGVkIHRvIHRoZSBkZWZhdWx0IHN0eWxlIHdvbid0IGJlIG92ZXJyaWRkZW4gYnkgZGVmYXVsdCwgbWFraW5nIGl0IGhhcmQgdG9cbiAqIGtub3cgd2hldGhlciBhIG5ldyB2ZXJzaW9uIG9mIGEgY29tcG9uZW50IHdpbGwgc3RpbGwgbG9vayBva2F5LlxuICpcbiAqIEFzIGEgY29tcHJvbWlzZSwgdGhlIHNpbXBsZSBQb2x5bWVyIGJlaGF2aW9yIGhlcmUgZGVmaW5lcyBhIFwiZ2VuZXJpY1wiXG4gKiBhdHRyaWJ1dGUuIFRoaXMgYXR0cmlidXRlIGlzIG5vcm1hbGx5IHNldCBieSBkZWZhdWx0LCBhbmQgc3R5bGVzIGNhbiBiZVxuICogd3JpdHRlbiB0aGF0IGFwcGx5IG9ubHkgd2hlbiB0aGUgZ2VuZXJpYyBhdHRyaWJ1dGUgaXMgc2V0LiBUaGlzIGFsbG93cyB0aGVcbiAqIGNvbnN0cnVjdGlvbiBvZiBDU1MgcnVsZXMgdGhhdCB3aWxsIG9ubHkgYXBwbHkgdG8gZ2VuZXJpYyBjb21wb25lbnRzIGxpa2VcbiAqXG4gKiAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pIHtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBUaGlzIG1ha2VzIGl0IGVhc3kgdG8gcmVtb3ZlIGFsbCBkZWZhdWx0IHN0eWxpbmcgLS0gc2V0IHRoZSBnZW5lcmljIGF0dHJpYnV0ZVxuICogdG8gZmFsc2UsIGFuZCBhbGwgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZC5cbiAqXG4gKiBAY2xhc3MgR2VuZXJpY1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IChiYXNlKSA9PiBjbGFzcyBHZW5lcmljIGV4dGVuZHMgYmFzZSB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGlmIChzdXBlci5jcmVhdGVkQ2FsbGJhY2spIHsgc3VwZXIuY3JlYXRlZENhbGxiYWNrKCk7IH1cbiAgICB0aGlzLmdlbmVyaWMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZ2VuZXJpYycpIHx8IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgY29tcG9uZW50IHdvdWxkIGxpa2UgdG8gcmVjZWl2ZSBnZW5lcmljIHN0eWxpbmcuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgdHJ1ZSBieSBkZWZhdWx0IOKAlMKgc2V0IGl0IHRvIGZhbHNlIHRvIHR1cm4gb2ZmIGFsbFxuICAgKiBnZW5lcmljIHN0eWxlcy4gVGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gYXBwbHkgY3VzdG9tIHN0eWxpbmc7IHlvdSB3b24ndFxuICAgKiBoYXZlIHRvIGV4cGxpY2l0bHkgb3ZlcnJpZGUgc3R5bGluZyB5b3UgZG9uJ3Qgd2FudC5cbiAgICpcbiAgICogQHByb3BlcnR5IGdlbmVyaWNcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBnZXQgZ2VuZXJpYygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2VuZXJpYztcbiAgfVxuICBzZXQgZ2VuZXJpYyh2YWx1ZSkge1xuICAgIGlmICgnZ2VuZXJpYycgaW4gYmFzZS5wcm90b3R5cGUpIHsgc3VwZXIuZ2VuZXJpYyA9IHZhbHVlOyB9XG4gICAgLy8gV2Ugcm9sbCBvdXIgb3duIGF0dHJpYnV0ZSBzZXR0aW5nIHNvIHRoYXQgYW4gZXhwbGljaXRseSBmYWxzZSB2YWx1ZSBzaG93c1xuICAgIC8vIHVwIGFzIGdlbmVyaWM9XCJmYWxzZVwiLlxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSAhPT0gJ2ZhbHNlJyk7XG4gICAgfVxuICAgIHRoaXMuX2dlbmVyaWMgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAvLyBFeHBsaWNpdGx5IHVzZSBmYWxzZSBzdHJpbmcuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZ2VuZXJpYycsICdmYWxzZScpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgLy8gRXhwbGljaXRseSByZW1vdmUgYXR0cmlidXRlLlxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2dlbmVyaWMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbXB0eSBzdHJpbmcgdG8gZ2V0IGF0dHJpYnV0ZSB0byBhcHBlYXIgd2l0aCBubyB2YWx1ZS5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdnZW5lcmljJywgJycpO1xuICAgIH1cbiAgfVxuXG59O1xuIiwiLyoqXG4gKiBNaXhpbiB3aGljaCBtYW5hZ2VzIHNlbGVjdGlvbiBzZW1hbnRpY3MgZm9yIGl0ZW1zIGluIGEgbGlzdC5cbiAqXG4gKiBAY2xhc3MgSXRlbVNlbGVjdGlvblxuICovXG5cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBzZWxlY3RlZEl0ZW0gcHJvcGVydHkgY2hhbmdlcy5cbiAqXG4gKiBAZXZlbnQgc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkXG4gKiBAcGFyYW0gZGV0YWlsLnNlbGVjdGVkSXRlbSBUaGUgbmV3IHNlbGVjdGVkIGl0ZW0uXG4gKiBAcGFyYW0gZGV0YWlsLnByZXZpb3VzSXRlbSBUaGUgcHJldmlvdXNseSBzZWxlY3RlZCBpdGVtLlxuICovXG5cbi8qKlxuICogRmlyZXMgd2hlbiB0aGUgc2VsZWN0ZWRJbmRleCBwcm9wZXJ0eSBjaGFuZ2VzLlxuICpcbiAqIEBldmVudCBzZWxlY3RlZC1pdGVtLWNoYW5nZWRcbiAqIEBwYXJhbSBkZXRhaWwuc2VsZWN0ZWRJbmRleCBUaGUgbmV3IHNlbGVjdGVkIGluZGV4LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChiYXNlKSA9PiBjbGFzcyBJdGVtU2VsZWN0aW9uIGV4dGVuZHMgYmFzZSB7XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHtcbiAgICBpZiAoc3VwZXIuYXBwbHlTZWxlY3Rpb24pIHsgc3VwZXIuYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpOyB9XG4gIH1cblxuICBnZXQgY2FuU2VsZWN0TmV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuU2VsZWN0TmV4dDtcbiAgfVxuICBzZXQgY2FuU2VsZWN0TmV4dChjYW5TZWxlY3ROZXh0KSB7XG4gICAgaWYgKCdjYW5TZWxlY3ROZXh0JyBpbiBiYXNlLnByb3RvdHlwZSkgeyBzdXBlci5jYW5TZWxlY3ROZXh0ID0gY2FuU2VsZWN0TmV4dDsgfVxuICAgIHRoaXMuX2NhblNlbGVjdE5leHQgPSBjYW5TZWxlY3ROZXh0O1xuICB9XG5cbiAgZ2V0IGNhblNlbGVjdFByZXZpb3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jYW5TZWxlY3RQcmV2aW91cztcbiAgfVxuICBzZXQgY2FuU2VsZWN0UHJldmlvdXMoY2FuU2VsZWN0UHJldmlvdXMpIHtcbiAgICBpZiAoJ2NhblNlbGVjdFByZXZpb3VzJyBpbiBiYXNlLnByb3RvdHlwZSkgeyBzdXBlci5jYW5TZWxlY3RQcmV2aW91cyA9IGNhblNlbGVjdFByZXZpb3VzOyB9XG4gICAgdGhpcy5fY2FuU2VsZWN0UHJldmlvdXMgPSBjYW5TZWxlY3RQcmV2aW91cztcbiAgfVxuXG4gIGl0ZW1BZGRlZChpdGVtKSB7XG4gICAgaWYgKHN1cGVyLml0ZW1BZGRlZCkgeyBzdXBlci5pdGVtQWRkZWQoaXRlbSk7IH1cbiAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKGl0ZW0sIGl0ZW0gPT09IHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgfVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgICBpZiAoc3VwZXIuaXRlbXNDaGFuZ2VkKSB7IHN1cGVyLml0ZW1zQ2hhbmdlZCgpOyB9XG4gICAgbGV0IGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAvLyBTZWxlY3RlZCBpdGVtIGlzIG5vIGxvbmdlciBpbiB0aGUgY3VycmVudCBzZXQgb2YgaXRlbXMuXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG51bGw7XG4gICAgICBpZiAodGhpcy5zZWxlY3Rpb25SZXF1aXJlZCkge1xuICAgICAgICAvLyBFbnN1cmUgc2VsZWN0aW9uLCBidXQgZG8gdGhpcyBpbiB0aGUgbmV4dCB0aWNrIHRvIGdpdmUgb3RoZXJcbiAgICAgICAgLy8gbWl4aW5zIGEgY2hhbmNlIHRvIGRvIHRoZWlyIG93biBpdGVtc0NoYW5nZWQgd29yay5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbnN1cmVTZWxlY3Rpb24odGhpcyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlIGNoYW5nZSBpbiBpdGVtcyBtYXkgaGF2ZSBhZmZlY3RlZCB3aGljaCBuYXZpZ2F0aW9ucyBhcmUgcG9zc2libGUuXG4gICAgdXBkYXRlUG9zc2libGVOYXZpZ2F0aW9ucyh0aGlzLCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBpdGVtIHdoaWNoIGlzIGN1cnJlbnRseSBzZWxlY3RlZCwgb3IgLTEgaWYgdGhlcmUgaXMgbm9cbiAgICogc2VsZWN0aW9uLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0ZWRJbmRleFxuICAgKiBAdHlwZSBOdW1iZXJcbiAgICovXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbTtcblxuICAgIGlmIChzZWxlY3RlZEl0ZW0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8vIFRPRE86IE1lbW9pemVcbiAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4T2ZJdGVtKHNlbGVjdGVkSXRlbSk7XG5cbiAgICAvLyBJZiBpbmRleCA9IC0xLCBzZWxlY3Rpb24gd2Fzbid0IGZvdW5kLiBNb3N0IGxpa2VseSBjYXVzZSBpcyB0aGF0IHRoZVxuICAgIC8vIERPTSB3YXMgbWFuaXB1bGF0ZWQgZnJvbSB1bmRlcm5lYXRoIHVzLlxuICAgIC8vIFRPRE86IE9uY2Ugd2UgdHJhY2sgY29udGVudCBjaGFuZ2VzLCB0dXJuIHRoaXMgaW50byBhbiBleGNlcHRpb24uXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG4gIHNldCBzZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gICAgaWYgKCdzZWxlY3RlZEluZGV4JyBpbiBiYXNlLnByb3RvdHlwZSkgeyBzdXBlci5zZWxlY3RlZEluZGV4ID0gaW5kZXg7IH1cbiAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIGxldCBpdGVtO1xuICAgIGlmIChpbmRleCA8IDAgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpdGVtID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuXG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZC1pbmRleC1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBzZWxlY3RlZEluZGV4OiBpbmRleCxcbiAgICAgICAgICB2YWx1ZTogaW5kZXggLy8gZm9yIFBvbHltZXIgYmluZGluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLCBvciBudWxsIGlmIHRoZXJlIGlzIG5vIHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGVkSXRlbVxuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIC8vIFRPRE86IENvbmZpcm0gaXRlbSBpcyBpbiBpdGVtcyBiZWZvcmUgc2VsZWN0aW5nLlxuICBnZXQgc2VsZWN0ZWRJdGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEl0ZW07XG4gIH1cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgaWYgKCdzZWxlY3RlZEl0ZW0nIGluIGJhc2UucHJvdG90eXBlKSB7IHN1cGVyLnNlbGVjdGVkSXRlbSA9IGl0ZW07IH1cbiAgICBsZXQgcHJldmlvdXNJdGVtID0gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICAgIGlmIChwcmV2aW91c0l0ZW0pIHtcbiAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBzZWxlY3Rpb24uXG4gICAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKHByZXZpb3VzSXRlbSwgZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKGl0ZW0sIHRydWUpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFJhdGlvbmFsaXplIHdpdGggc2VsZWN0ZWRJbmRleCBzbyB3ZSdyZSBub3QgcmVjYWxjdWxhdGluZyBpdGVtXG4gICAgLy8gb3IgaW5kZXggaW4gZWFjaCBzZXR0ZXIuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleE9mSXRlbShpdGVtKTtcbiAgICB1cGRhdGVQb3NzaWJsZU5hdmlnYXRpb25zKHRoaXMsIGluZGV4KTtcblxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBzZWxlY3RlZEl0ZW06IGl0ZW0sXG4gICAgICAgICAgcHJldmlvdXNJdGVtOiBwcmV2aW91c0l0ZW0sXG4gICAgICAgICAgdmFsdWU6IGl0ZW0gLy8gZm9yIFBvbHltZXIgYmluZGluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdEZpcnN0XG4gICAqL1xuICBzZWxlY3RGaXJzdCgpIHtcbiAgICBpZiAoc3VwZXIuc2VsZWN0Rmlyc3QpIHsgc3VwZXIuc2VsZWN0Rmlyc3QoKTsgfVxuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBsaXN0IHNob3VsZCBhbHdheXMgaGF2ZSBhIHNlbGVjdGlvbiAoaWYgaXQgaGFzIGl0ZW1zKS5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGlvblJlcXVpcmVkXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICovXG4gIGdldCBzZWxlY3Rpb25SZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uUmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGlvblJlcXVpcmVkKHNlbGVjdGlvblJlcXVpcmVkKSB7XG4gICAgaWYgKCdzZWxlY3Rpb25SZXF1aXJlZCcgaW4gYmFzZS5wcm90b3R5cGUpIHsgc3VwZXIuc2VsZWN0aW9uUmVxdWlyZWQgPSBzZWxlY3Rpb25SZXF1aXJlZDsgfVxuICAgIHRoaXMuX3NlbGVjdGlvblJlcXVpcmVkID0gc2VsZWN0aW9uUmVxdWlyZWQ7XG4gICAgZW5zdXJlU2VsZWN0aW9uKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgbGFzdCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdExhc3RcbiAgICovXG4gIHNlbGVjdExhc3QoKSB7XG4gICAgaWYgKHN1cGVyLnNlbGVjdExhc3QpIHsgc3VwZXIuc2VsZWN0TGFzdCgpOyB9XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIHRoaXMuaXRlbXMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBuZXh0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0TmV4dFxuICAgKi9cbiAgc2VsZWN0TmV4dCgpIHtcbiAgICBpZiAoc3VwZXIuc2VsZWN0TmV4dCkgeyBzdXBlci5zZWxlY3ROZXh0KCk7IH1cbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgdGhpcy5zZWxlY3RlZEluZGV4ICsgMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdFByZXZpb3VzXG4gICAqL1xuICBzZWxlY3RQcmV2aW91cygpIHtcbiAgICBpZiAoc3VwZXIuc2VsZWN0UHJldmlvdXMpIHsgc3VwZXIuc2VsZWN0UHJldmlvdXMoKTsgfVxuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCB0aGlzLnNlbGVjdGVkSW5kZXggLSAxKTtcbiAgfVxuXG59O1xuXG5cbi8vIElmIG5vIGl0ZW0gaXMgc2VsZWN0ZWQsIHNlbGVjdCBhIGRlZmF1bHQgaXRlbS5cbi8vIFRPRE86IElmIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIGl0ZW0gaGFzIGJlZW4gZGVsZXRlZCwgdHJ5IHRvIHNlbGVjdCBhblxuLy8gaXRlbSBhZGphY2VudCB0byB0aGUgcG9zaXRpb24gaXQgaGVsZC5cbmZ1bmN0aW9uIGVuc3VyZVNlbGVjdGlvbihlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudC5zZWxlY3RlZEl0ZW0gJiYgZWxlbWVudC5pdGVtcyAmJiBlbGVtZW50Lml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSAwO1xuICB9XG59XG5cbi8vIEVuc3VyZSB0aGUgZ2l2ZW4gaW5kZXggaXMgd2l0aGluIGJvdW5kcywgYW5kIHNlbGVjdCBpdCBpZiBpdCdzIG5vdCBhbHJlYWR5XG4vLyBzZWxlY3RlZC5cbmZ1bmN0aW9uIHNlbGVjdEluZGV4KGVsZW1lbnQsIGluZGV4KSB7XG4gIGxldCBib3VuZGVkSW5kZXggPSBNYXRoLm1heChNYXRoLm1pbihpbmRleCwgZWxlbWVudC5pdGVtcy5sZW5ndGggLSAxKSwgMCk7XG4gIGxldCBwcmV2aW91c0luZGV4ID0gZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICBpZiAocHJldmlvdXNJbmRleCAhPT0gYm91bmRlZEluZGV4KSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gYm91bmRlZEluZGV4O1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBGb2xsb3dpbmcgYSBjaGFuZ2UgaW4gc2VsZWN0aW9uLCByZXBvcnQgd2hldGhlciBpdCdzIG5vdyBwb3NzaWJsZSB0b1xuLy8gZ28gbmV4dC9wcmV2aW91cyBmcm9tIHRoZSBnaXZlbiBpbmRleC5cbmZ1bmN0aW9uIHVwZGF0ZVBvc3NpYmxlTmF2aWdhdGlvbnMoZWxlbWVudCwgaW5kZXgpIHtcbiAgbGV0IGNhblNlbGVjdE5leHQ7XG4gIGxldCBjYW5TZWxlY3RQcmV2aW91cztcbiAgbGV0IGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgaWYgKGl0ZW1zID09IG51bGwgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgY2FuU2VsZWN0TmV4dCA9IGZhbHNlO1xuICAgIGNhblNlbGVjdFByZXZpb3VzID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlLiBJZiB0aGVyZSdzIG5vIHNlbGVjdGlvbiwgd2UgZGVjbGFyZSB0aGF0IGl0J3MgYWx3YXlzXG4gICAgLy8gcG9zc2libGUgdG8gZ28gbmV4dC9wcmV2aW91cyB0byBjcmVhdGUgYSBzZWxlY3Rpb24uXG4gICAgY2FuU2VsZWN0TmV4dCA9IHRydWU7XG4gICAgY2FuU2VsZWN0UHJldmlvdXMgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIC8vIE5vcm1hbCBjYXNlOiB3ZSBoYXZlIGFuIGluZGV4IGluIGEgbGlzdCB0aGF0IGhhcyBpdGVtcy5cbiAgICBjYW5TZWxlY3RQcmV2aW91cyA9IChpbmRleCA+IDApO1xuICAgIGNhblNlbGVjdE5leHQgPSAoaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKTtcbiAgfVxuICBlbGVtZW50LmNhblNlbGVjdE5leHQgPSBjYW5TZWxlY3ROZXh0O1xuICBlbGVtZW50LmNhblNlbGVjdFByZXZpb3VzID0gY2FuU2VsZWN0UHJldmlvdXM7XG59XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIG1hbmFnZXMgQVJJQSByb2xlcyBmb3IgYSBjb21wb25lbnQgdGhhdCB3YW50cyB0byBhY3QgYXMgYSBsaXN0LlxuICpcbiAqIEBjbGFzcyBJdGVtc0FjY2Vzc2libGVcbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IChiYXNlKSA9PiBjbGFzcyBJdGVtc0FjY2Vzc2libGUgZXh0ZW5kcyBiYXNlIHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGlmIChzdXBlci5hcHBseVNlbGVjdGlvbikgeyBzdXBlci5hcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCk7IH1cbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkKTtcbiAgICB2YXIgaXRlbUlkID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaWYgKGl0ZW1JZCkge1xuICAgICAgdGhpcy5jb2xsZWN0aXZlLm91dGVybW9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBpdGVtSWQpO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxlY3RpdmVDaGFuZ2VkKCkge1xuICAgIGlmIChzdXBlci5jb2xsZWN0aXZlQ2hhbmdlZCkgeyBzdXBlci5jb2xsZWN0aXZlQ2hhbmdlZCgpOyB9XG5cbiAgICAvLyBFbnN1cmUgdGhlIG91dGVybW9zdCBhc3BlY3QgaGFzIGFuIEFSSUEgcm9sZS5cbiAgICBsZXQgb3V0ZXJtb3N0RWxlbWVudCA9IHRoaXMuY29sbGVjdGl2ZS5vdXRlcm1vc3RFbGVtZW50O1xuICAgIGlmICghb3V0ZXJtb3N0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSkge1xuICAgICAgLy8gVHJ5IHRvIHByb21vdGUgYW4gQVJJQSByb2xlIGZyb20gYW4gaW5uZXIgZWxlbWVudC4gSWYgbm9uZSBpcyBmb3VuZCxcbiAgICAgIC8vIHVzZSBhIGRlZmF1bHQgcm9sZS5cbiAgICAgIGxldCByb2xlID0gZ2V0Q29sbGVjdGl2ZUFyaWFSb2xlKHRoaXMuY29sbGVjdGl2ZSkgfHwgJ2xpc3Rib3gnO1xuICAgICAgb3V0ZXJtb3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCByb2xlKTtcbiAgICB9XG4gICAgaWYgKCFvdXRlcm1vc3RFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JykpIHtcbiAgICAgIC8vIFRyeSB0byBwcm9tb3RlIGFuIEFSSUEgYWN0aXZlZGVzY2VuZGFudCB2YWx1ZSBmcm9tIGFuIGlubmVyIGVsZW1lbnQuXG4gICAgICBsZXQgZGVzY2VuZGFudCA9IGdldENvbGxlY3RpdmVBcmlhQWN0aXZlRGVzY2VuZGFudCh0aGlzLmNvbGxlY3RpdmUpO1xuICAgICAgaWYgKGRlc2NlbmRhbnQpIHtcbiAgICAgICAgb3V0ZXJtb3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGRlc2NlbmRhbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgQVJJQSByb2xlIGFuZCBhY3RpdmVkZXNjZW5kYW50IHZhbHVlcyBmcm9tIHRoZSBjb2xsZWN0aXZlJ3NcbiAgICAvLyBpbm5lciBlbGVtZW50cy5cbiAgICB0aGlzLmNvbGxlY3RpdmUuZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50ICE9PSBvdXRlcm1vc3RFbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAoc3VwZXIuY3JlYXRlZENhbGxiYWNrKSB7IHN1cGVyLmNyZWF0ZWRDYWxsYmFjaygpOyB9XG5cbiAgICAvLyBEZXRlcm1pbmUgYSBiYXNlIGl0ZW0gSUQgYmFzZWQgb24gdGhpcyBjb21wb25lbnQncyBob3N0J3Mgb3duIElELiBUaGlzXG4gICAgLy8gd2lsbCBiZSBjb21iaW5lZCB3aXRoIGEgdW5pcXVlIGludGVnZXIgdG8gYXNzaWduIElEcyB0byBpdGVtcyB0aGF0IGRvbid0XG4gICAgLy8gaGF2ZSBhbiBleHBsaWNpdCBJRC4gSWYgdGhlIGJhc2ljLWxpc3QtYm94IGhhcyBJRCBcImZvb1wiLCB0aGVuIGl0cyBpdGVtc1xuICAgIC8vIHdpbGwgaGF2ZSBJRHMgdGhhdCBsb29rIGxpa2UgXCJfZm9vT3B0aW9uMVwiLiBJZiB0aGUgbGlzdCBoYXMgbm8gSUQgaXRzZWxmLFxuICAgIC8vIGl0cyBpdGVtcyB3aWxsIGdldCBJRHMgdGhhdCBsb29rIGxpa2UgXCJfb3B0aW9uMVwiLiBJdGVtIElEcyBhcmUgcHJlZml4ZWRcbiAgICAvLyB3aXRoIGFuIHVuZGVyc2NvcmUgdG8gZGlmZmVyZW50aWF0ZSB0aGVtIGZyb20gbWFudWFsbHktYXNzaWduZWQgSURzLCBhbmRcbiAgICAvLyB0byBtaW5pbWl6ZSB0aGUgcG90ZW50aWFsIGZvciBJRCBjb25mbGljdHMuXG4gICAgdmFyIGVsZW1lbnRJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCBcImlkXCIgKTtcbiAgICB0aGlzLml0ZW1CYXNlSWQgPSBlbGVtZW50SWQgP1xuICAgICAgICBcIl9cIiArIGVsZW1lbnRJZCArIFwiT3B0aW9uXCIgOlxuICAgICAgICBcIl9vcHRpb25cIjtcbiAgfVxuXG4gIGl0ZW1BZGRlZChpdGVtKSB7XG4gICAgaWYgKHN1cGVyLml0ZW1BZGRlZCkgeyBzdXBlci5pdGVtQWRkZWQoaXRlbSk7IH1cblxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdyb2xlJywgJ29wdGlvbicpO1xuXG4gICAgLy8gRW5zdXJlIGVhY2ggaXRlbSBoYXMgYW4gSUQgc28gd2UgY2FuIHNldCBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQgb24gdGhlXG4gICAgLy8gb3ZlcmFsbCBsaXN0IHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcy5cbiAgICBpZiAoIWl0ZW0uZ2V0QXR0cmlidXRlKCdpZCcpKSB7XG4gICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLml0ZW1CYXNlSWQgKyBpZENvdW50KyspO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZWxlY3RlZEl0ZW0oKSB7XG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdGVkSXRlbTtcbiAgfVxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICBpZiAoJ3NlbGVjdGVkSXRlbScgaW4gYmFzZS5wcm90b3R5cGUpIHsgc3VwZXIuc2VsZWN0ZWRJdGVtID0gaXRlbTsgfVxuICAgIC8vIENhdGNoIHRoZSBjYXNlIHdoZXJlIHRoZSBzZWxlY3Rpb24gaXMgcmVtb3ZlZC5cbiAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICB0aGlzLmNvbGxlY3RpdmUub3V0ZXJtb3N0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH1cbiAgfVxuXG59O1xuXG5cbi8vIFVzZWQgdG8gYXNzaWduIHVuaXF1ZSBJRHMgdG8gaXRlbSBlbGVtZW50cyB3aXRob3V0IElEcy5cbmxldCBpZENvdW50ID0gMDtcblxuXG4vLyBSZXR1cm4gdGhlIGZpcnN0IEFSSUEgYWN0aXZlZGVzY2VuZGFudCBkZWZpbmVkIGJ5IHRoZSBjb2xsZWN0aXZlLlxuZnVuY3Rpb24gZ2V0Q29sbGVjdGl2ZUFyaWFBY3RpdmVEZXNjZW5kYW50KGNvbGxlY3RpdmUpIHtcbiAgbGV0IGRlc2NlbmRhbnRzID0gY29sbGVjdGl2ZS5lbGVtZW50cy5tYXAoZWxlbWVudCA9PiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JykpO1xuICByZXR1cm4gZGVzY2VuZGFudHMuZmluZChkZXNjZW5kYW50ID0+IGRlc2NlbmRhbnQgIT09IG51bGwpO1xufVxuXG5cbi8vIFJldHVybiB0aGUgZmlyc3QgQVJJQSBsYWJlbCBkZWZpbmVkIGJ5IHRoZSBjb2xsZWN0aXZlLlxuZnVuY3Rpb24gZ2V0Q29sbGVjdGl2ZUFyaWFSb2xlKGNvbGxlY3RpdmUpIHtcbiAgbGV0IHJvbGVzID0gY29sbGVjdGl2ZS5lbGVtZW50cy5tYXAoZWxlbWVudCA9PiBlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpKTtcbiAgcmV0dXJuIHJvbGVzLmZpbmQocm9sZSA9PiByb2xlICE9PSBudWxsKTtcbn1cbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggbWFuYWdlcyB0aGUga2V5Ym9hcmQgZm9jdXMgYW5kIGtleWRvd24gaGFuZGxpbmcgZm9yIGEgY29tcG9uZW50LlxuICpcbiAqIFRPRE86IERvY3VtZW50IGNvbGxlY3RpdmUgYmVoYXZpb3IuXG4gKiBUT0RPOiBQcm92aWRlIGJhc2VsaW5lIGJlaGF2aW9yIG91dHNpZGUgb2YgYSBjb2xsZWN0aXZlLlxuICpcbiAqIEBjbGFzcyBLZXlib2FyZFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChiYXNlKSA9PiBjbGFzcyBLZXlib2FyZCBleHRlbmRzIGJhc2Uge1xuXG4gIC8vIERlZmF1bHQga2V5ZG93biBoYW5kbGVyLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgaWYgKHN1cGVyLmtleWRvd24pIHsgcmV0dXJuIHN1cGVyLmtleWRvd24oZXZlbnQpOyB9XG4gIH1cblxuICAvKlxuICAgKiBJZiB3ZSdyZSBub3cgdGhlIG91dGVybW9zdCBlbGVtZW50IG9mIHRoZSBjb2xsZWN0aXZlLCBzZXQgdXAgdG8gcmVjZWl2ZVxuICAgKiBrZXlib2FyZCBldmVudHMuIElmIHdlJ3JlIG5vIGxvbmdlciB0aGUgb3V0ZXJtb3N0IGVsZW1lbnQsIHN0b3AgbGlzdGVuaW5nLlxuICAgKi9cbiAgY29sbGVjdGl2ZUNoYW5nZWQoKSB7XG4gICAgaWYgKHN1cGVyLmNvbGxlY3RpdmVDaGFuZ2VkKSB7IHN1cGVyLmNvbGxlY3RpdmVDaGFuZ2VkKCk7IH1cblxuICAgIGxldCBvdXRlcm1vc3RFbGVtZW50ID0gdGhpcy5jb2xsZWN0aXZlLm91dGVybW9zdEVsZW1lbnQ7XG4gICAgaWYgKG91dGVybW9zdEVsZW1lbnQgPT09IHRoaXMgJiYgIXRoaXMuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykpIHtcbiAgICAgIC8vIFNpbmNlIHdlJ3JlIGhhbmRsaW5nIHRoZSBrZXlib2FyZCwgc2VlIGlmIHdlIGNhbiBhZG9wdCBhbiBBUklBIGxhYmVsXG4gICAgICAvLyBmcm9tIGFuIGlubmVyIGVsZW1lbnQgb2YgdGhlIGNvbGxlY3RpdmUuXG4gICAgICBsZXQgbGFiZWwgPSBnZXRDb2xsZWN0aXZlQXJpYUxhYmVsKHRoaXMuY29sbGVjdGl2ZSk7XG4gICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIG9ubHkgdGhlIG91dGVybW9zdCBlbGVtZW50IGluIHRoZSBjb2xsZWN0aXZlIGlzIGxpc3RlbmluZyB0b1xuICAgIC8vIHRoZSBrZXlib2FyZC5cbiAgICB0aGlzLmNvbGxlY3RpdmUuZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgbGV0IHNob3VsZExpc3RlbiA9IChlbGVtZW50ID09PSBvdXRlcm1vc3RFbGVtZW50KTtcbiAgICAgIGxldCBpc0xpc3RlbmluZyA9IGlzTGlzdGVuaW5nVG9LZXlkb3duKGVsZW1lbnQpO1xuICAgICAgaWYgKGlzTGlzdGVuaW5nICE9PSBzaG91bGRMaXN0ZW4pIHtcbiAgICAgICAgaWYgKHNob3VsZExpc3Rlbikge1xuICAgICAgICAgIHN0YXJ0TGlzdGVuaW5nVG9LZXlkb3duKGVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0b3BMaXN0ZW5pbmdUb0tleWRvd24oZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghc2hvdWxkTGlzdGVuICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBBUklBIGxhYmVsIGZyb20gaW5uZXIgZWxlbWVudCdzIG5vdCBoYW5kbGluZyB0aGUga2V5Ym9hcmQuXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG59O1xuXG5cbmZ1bmN0aW9uIGtleWRvd24oZXZlbnQpIHtcblxuICAvLyBHaXZlIGNvbGxlY3RpdmUgZWxlbWVudHMgYSBzaG90IGF0IHRoZSBldmVudCwgd29ya2luZyBmcm9tIGlubmVybW9zdCB0b1xuICAvLyBvdXRlcm1vc3QgKHRoaXMgZWxlbWVudCkuXG4gIGxldCBoYW5kbGVkO1xuICBsZXQgZWxlbWVudHMgPSB0aGlzLmNvbGxlY3RpdmUuZWxlbWVudHM7XG4gIGZvciAobGV0IGkgPSBlbGVtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgaGFuZGxlZCA9IGVsZW1lbnQua2V5ZG93biAmJiBlbGVtZW50LmtleWRvd24oZXZlbnQpO1xuICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaGFuZGxlZCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cblxuXG4vLyBSZXR1cm4gdGhlIGZpcnN0IEFSSUEgbGFiZWwgZGVmaW5lZCBieSB0aGUgY29sbGVjdGl2ZS5cbmZ1bmN0aW9uIGdldENvbGxlY3RpdmVBcmlhTGFiZWwoY29sbGVjdGl2ZSkge1xuICBsZXQgbGFiZWxzID0gY29sbGVjdGl2ZS5lbGVtZW50cy5tYXAoZWxlbWVudCA9PiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKTtcbiAgcmV0dXJuIGxhYmVscy5maW5kKGxhYmVsID0+IGxhYmVsICE9PSBudWxsKTtcbn1cblxuXG5mdW5jdGlvbiBpc0xpc3RlbmluZ1RvS2V5ZG93bihlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50Ll9rZXlkb3duTGlzdGVuZXIgIT0gbnVsbDtcbn1cblxuXG5mdW5jdGlvbiBzdGFydExpc3RlbmluZ1RvS2V5ZG93bihlbGVtZW50KSB7XG4gIGVsZW1lbnQuX2tleWRvd25MaXN0ZW5lciA9IGtleWRvd24uYmluZChlbGVtZW50KTtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZWxlbWVudC5fa2V5ZG93bkxpc3RlbmVyKTtcbiAgaWYgKGVsZW1lbnQudGFiSW5kZXggPCAwKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JywgMCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdG9wTGlzdGVuaW5nVG9LZXlkb3duKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZWxlbWVudC5fa2V5ZG93bkxpc3RlbmVyKTtcbiAgZWxlbWVudC5fa2V5ZG93bkxpc3RlbmVyID0gbnVsbDtcbiAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG59XG4iLCIvKipcbiAqIE1peGluIHdoaWNoIG1hcHMgZGlyZWN0aW9uIGtleXMgKExlZnQsIFJpZ2h0LCBldGMuKSB0byBkaXJlY3Rpb24gc2VtYW50aWNzXG4gKiAoZ29MZWZ0LCBnb1JpZ2h0LCBldGMuKS5cbiAqXG4gKiBAY2xhc3MgS2V5Ym9hcmREaXJlY3Rpb25cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgKGJhc2UpID0+IGNsYXNzIEtleWJvYXJkRGlyZWN0aW9uIGV4dGVuZHMgYmFzZSB7XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMuIFRoZXNlIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBnb0Rvd24oKSB7XG4gICAgaWYgKHN1cGVyLmdvRG93bikgeyByZXR1cm4gc3VwZXIuZ29Eb3duKCk7IH1cbiAgfVxuICBnb0VuZCgpIHtcbiAgICBpZiAoc3VwZXIuZ29FbmQpIHsgcmV0dXJuIHN1cGVyLmdvRW5kKCk7IH1cbiAgfVxuICBnb0xlZnQoKSB7XG4gICAgaWYgKHN1cGVyLmdvTGVmdCkgeyByZXR1cm4gc3VwZXIuZ29MZWZ0KCk7IH1cbiAgfVxuICBnb1JpZ2h0KCkge1xuICAgIGlmIChzdXBlci5nb1JpZ2h0KSB7IHJldHVybiBzdXBlci5nb1JpZ2h0KCk7IH1cbiAgfVxuICBnb1N0YXJ0KCkge1xuICAgIGlmIChzdXBlci5nb1N0YXJ0KSB7IHJldHVybiBzdXBlci5nb1N0YXJ0KCk7IH1cbiAgfVxuICBnb1VwKCkge1xuICAgIGlmIChzdXBlci5nb1VwKSB7IHJldHVybiBzdXBlci5nb1VwKCk7IH1cbiAgfVxuXG4gIGtleWRvd24oZXZlbnQpIHtcbiAgICBsZXQgaGFuZGxlZDtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzU6IC8vIEVuZFxuICAgICAgICBoYW5kbGVkID0gdGhpcy5nb0VuZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzY6IC8vIEhvbWVcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29TdGFydCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6IC8vIExlZnRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29MZWZ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODogLy8gVXBcbiAgICAgICAgaGFuZGxlZCA9IGV2ZW50LmFsdEtleSA/IHRoaXMuZ29TdGFydCgpIDogdGhpcy5nb1VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTogLy8gUmlnaHRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29SaWdodCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6IC8vIERvd25cbiAgICAgICAgaGFuZGxlZCA9IGV2ZW50LmFsdEtleSA/IHRoaXMuZ29FbmQoKSA6IHRoaXMuZ29Eb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBQcmVmZXIgbWl4aW4gcmVzdWx0IGlmIGl0J3MgZGVmaW5lZCwgb3RoZXJ3aXNlIHVzZSBiYXNlIHJlc3VsdC5cbiAgICByZXR1cm4gaGFuZGxlZCB8fCAoc3VwZXIua2V5ZG93biAmJiBzdXBlci5rZXlkb3duKGV2ZW50KSk7XG4gIH1cblxufTtcbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggbWFwcyBwYWdlIGtleXMgKFBhZ2UgVXAsIFBhZ2UgRG93bikgaW50byBvcGVyYXRpb25zIHRoYXQgc2Nyb2xsXG4gKiB0aGUgY29tcG9uZW50LlxuICpcbiAqIFRoZSBrZXlib2FyZCBpbnRlcmFjdGlvbiBtb2RlbCBnZW5lcmFsbHkgZm9sbG93cyB0aGF0IG9mIE1pY3Jvc29mdCBXaW5kb3dzJ1xuICogbGlzdCBib3hlcyBpbnN0ZWFkIG9mIHRob3NlIGluIE9TIFg6XG4gKlxuICogKiBUaGUgUGFnZSBVcC9Eb3duIGFuZCBIb21lL0VuZCBrZXlzIGFjdHVhbGx5IG1vdmUgdGhlIHNlbGVjdGlvbiwgcmF0aGVyIHRoYW5cbiAqICAganVzdCBzY3JvbGxpbmcuIFRoZSBmb3JtZXIgYmVoYXZpb3Igc2VlbXMgbW9yZSBnZW5lcmFsbHkgdXNlZnVsIGZvciBrZXlib2FyZFxuICogICB1c2Vycy5cbiAqXG4gKiAqIFByZXNzaW5nIFBhZ2UgVXAvRG93biB3aWxsIG1vdmUgdGhlIHNlbGVjdGlvbiB0byB0aGUgdG9wbW9zdC9ib3R0b21tb3N0XG4gKiAgIHZpc2libGUgaXRlbSBpZiB0aGUgc2VsZWN0aW9uIGlzIG5vdCBhbHJlYWR5IHRoZXJlLiBUaGVyZWFmdGVyLCB0aGUga2V5IHdpbGxcbiAqICAgbW92ZSB0aGUgc2VsZWN0aW9uIHVwL2Rvd24gYnkgYSBwYWdlLCBhbmQgKHBlciB0aGUgYWJvdmUgcG9pbnQpIG1ha2UgdGhlXG4gKiAgIHNlbGVjdGVkIGl0ZW0gdmlzaWJsZS5cbiAqXG4gKiBAY2xhc3MgS2V5Ym9hcmRQYWdpbmdcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoYmFzZSkgPT4gY2xhc3MgS2V5Ym9hcmRQYWdpbmcgZXh0ZW5kcyBiYXNlIHtcblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDMzOiAvLyBQYWdlIFVwXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLnBhZ2VVcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzQ6IC8vIFBhZ2UgRG93blxuICAgICAgICBoYW5kbGVkID0gdGhpcy5wYWdlRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUHJlZmVyIG1peGluIHJlc3VsdCBpZiBpdCdzIGRlZmluZWQsIG90aGVyd2lzZSB1c2UgYmFzZSByZXN1bHQuXG4gICAgcmV0dXJuIGhhbmRsZWQgfHwgKHN1cGVyLmtleWRvd24gJiYgc3VwZXIua2V5ZG93bihldmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBkb3duIG9uZSBwYWdlLlxuICAgKlxuICAgKiBAbWV0aG9kIHBhZ2VEb3duXG4gICAqL1xuICBwYWdlRG93bigpIHtcbiAgICBpZiAoc3VwZXIucGFnZURvd24pIHsgc3VwZXIucGFnZURvd24oKTsgfVxuICAgIHJldHVybiBzY3JvbGxPbmVQYWdlKHRoaXMsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB1cCBvbmUgcGFnZS5cbiAgICpcbiAgICogQG1ldGhvZCBwYWdlVXBcbiAgICovXG4gIHBhZ2VVcCgpIHtcbiAgICBpZiAoc3VwZXIucGFnZVVwKSB7IHN1cGVyLnBhZ2VVcCgpOyB9XG4gICAgcmV0dXJuIHNjcm9sbE9uZVBhZ2UodGhpcywgZmFsc2UpO1xuICB9XG5cbn07XG5cblxuLy8gUmV0dXJuIHRoZSBpdGVtIHdob3NlIGNvbnRlbnQgc3BhbnMgdGhlIGdpdmVuIHkgcG9zaXRpb24gKHJlbGF0aXZlIHRvIHRoZVxuLy8gdG9wIG9mIHRoZSBsaXN0J3Mgc2Nyb2xsaW5nIGNsaWVudCBhcmVhKSwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4vL1xuLy8gSWYgZG93bndhcmQgaXMgdHJ1ZSwgbW92ZSBkb3duIHRoZSBsaXN0IG9mIGl0ZW1zIHRvIGZpbmQgdGhlIGZpcnN0IGl0ZW1cbi8vIGZvdW5kIGF0IHRoZSBnaXZlbiB5IHBvc2l0aW9uOyBpZiBkb3dud2FyZCBpcyBmYWxzZSwgbW92ZSB1cCB0aGUgbGlzdCBvZlxuLy8gaXRlbXMgdG8gZmluZCB0aGUgbGFzdCBpdGVtIGF0IHRoYXQgcG9zaXRpb24uXG5mdW5jdGlvbiBnZXRJbmRleE9mSXRlbUF0WShlbGVtZW50LCB5LCBkb3dud2FyZCkge1xuICB2YXIgaXRlbXMgPSBlbGVtZW50Lml0ZW1zO1xuICB2YXIgc3RhcnQgPSBkb3dud2FyZCA/IDAgOiBpdGVtcy5sZW5ndGggLSAxO1xuICB2YXIgZW5kID0gZG93bndhcmQgPyBpdGVtcy5sZW5ndGggOiAwO1xuICB2YXIgc3RlcCA9IGRvd253YXJkID8gMSA6IC0xO1xuICB2YXIgaW5uZXJtb3N0ID0gZWxlbWVudC5pbm5lcm1vc3RBdHRhY2hlZDtcbiAgdmFyIHRvcE9mQ2xpZW50QXJlYSA9IGlubmVybW9zdC5vZmZzZXRUb3AgKyBpbm5lcm1vc3QuY2xpZW50VG9wO1xuICB2YXIgaSA9IHN0YXJ0O1xuICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgd2hpbGUgKGkgIT09IGVuZCkge1xuICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgdmFyIGl0ZW1Ub3AgPSBpdGVtLm9mZnNldFRvcCAtIHRvcE9mQ2xpZW50QXJlYTtcbiAgICB2YXIgaXRlbUJvdHRvbSA9IGl0ZW1Ub3AgKyBpdGVtLm9mZnNldEhlaWdodDtcbiAgICBpZiAoaXRlbVRvcCA8PSB5ICYmIGl0ZW1Cb3R0b20gPj0geSkge1xuICAgICAgLy8gSXRlbSBzcGFucyB0aGUgaW5kaWNhdGVkIHkgY29vcmRpbmF0ZS5cbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpICs9IHN0ZXA7XG4gIH1cblxuICBpZiAoIWZvdW5kKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBtYXkgaGF2ZSBmb3VuZCBhbiBpdGVtIHdob3NlIHBhZGRpbmcgc3BhbnMgdGhlIGdpdmVuIHkgY29vcmRpbmF0ZSxcbiAgLy8gYnV0IHdob3NlIGNvbnRlbnQgaXMgYWN0dWFsbHkgYWJvdmUvYmVsb3cgdGhhdCBwb2ludC5cbiAgLy8gVE9ETzogSWYgdGhlIGl0ZW0gaGFzIGEgYm9yZGVyLCB0aGVuIHBhZGRpbmcgc2hvdWxkIGJlIGluY2x1ZGVkIGluXG4gIC8vIGNvbnNpZGVyaW5nIGEgaGl0LlxuICB2YXIgaXRlbVN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShpdGVtKTtcbiAgdmFyIGl0ZW1QYWRkaW5nVG9wID0gcGFyc2VGbG9hdChpdGVtU3R5bGUucGFkZGluZ1RvcCk7XG4gIHZhciBpdGVtUGFkZGluZ0JvdHRvbSA9IHBhcnNlRmxvYXQoaXRlbVN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICB2YXIgY29udGVudFRvcCA9IGl0ZW1Ub3AgKyBpdGVtLmNsaWVudFRvcCArIGl0ZW1QYWRkaW5nVG9wO1xuICB2YXIgY29udGVudEJvdHRvbSA9IGNvbnRlbnRUb3AgKyBpdGVtLmNsaWVudEhlaWdodCAtIGl0ZW1QYWRkaW5nVG9wIC0gaXRlbVBhZGRpbmdCb3R0b207XG4gIGlmIChkb3dud2FyZCAmJiBjb250ZW50VG9wIDw9IHlcbiAgICB8fCAhZG93bndhcmQgJiYgY29udGVudEJvdHRvbSA+PSB5KSB7XG4gICAgLy8gVGhlIGluZGljYXRlZCBjb29yZGluYXRlIGhpdHMgdGhlIGFjdHVhbCBpdGVtIGNvbnRlbnQuXG4gICAgcmV0dXJuIGk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gVGhlIGluZGljYXRlZCBjb29yZGluYXRlIGZhbGxzIHdpdGhpbiB0aGUgaXRlbSdzIHBhZGRpbmcuIEJhY2sgdXAgdG9cbiAgICAvLyB0aGUgaXRlbSBiZWxvdy9hYm92ZSB0aGUgaXRlbSB3ZSBmb3VuZCBhbmQgcmV0dXJuIHRoYXQuXG4gICAgaSAtPSBzdGVwO1xuICAgIHJldHVybiBpO1xuICB9XG59XG5cbi8vIE1vdmUgYnkgb25lIHBhZ2UgZG93bndhcmQgKGlmIGRvd253YXJkIGlzIHRydWUpLCBvciB1cHdhcmQgKGlmIGZhbHNlKS5cbi8vIFJldHVybiB0cnVlIGlmIHdlIGVuZGVkIHVwIGNoYW5naW5nIHRoZSBzZWxlY3Rpb24sIGZhbHNlIGlmIG5vdC5cbi8vIFRPRE86IEJldHRlciBzdXBwb3J0IGZvciBob3Jpem9udGFsIGxpc3RzLlxuZnVuY3Rpb24gc2Nyb2xsT25lUGFnZShlbGVtZW50LCBkb3dud2FyZCkge1xuXG4gIHZhciBpbm5lcm1vc3QgPSBlbGVtZW50LmlubmVybW9zdEF0dGFjaGVkO1xuICBpZiAoIWlubmVybW9zdCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERldGVybWluZSB0aGUgaXRlbSB2aXNpYmxlIGp1c3QgYXQgdGhlIGVkZ2Ugb2YgZGlyZWN0aW9uIHdlJ3JlIGhlYWRpbmcuXG4gIC8vIFdlJ2xsIHNlbGVjdCB0aGF0IGl0ZW0gaWYgaXQncyBub3QgYWxyZWFkeSBzZWxlY3RlZC5cbiAgdmFyIGVkZ2UgPSBpbm5lcm1vc3Quc2Nyb2xsVG9wICsgKGRvd253YXJkID8gaW5uZXJtb3N0LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgaW5kZXhPZkl0ZW1BdEVkZ2UgPSBnZXRJbmRleE9mSXRlbUF0WShlbGVtZW50LCBlZGdlLCBkb3dud2FyZCk7XG5cbiAgdmFyIHNlbGVjdGVkSW5kZXggPSBlbGVtZW50LnNlbGVjdGVkSW5kZXg7XG4gIHZhciBuZXdJbmRleDtcbiAgaWYgKGluZGV4T2ZJdGVtQXRFZGdlICYmIHNlbGVjdGVkSW5kZXggPT09IGluZGV4T2ZJdGVtQXRFZGdlKSB7XG4gICAgLy8gVGhlIGl0ZW0gYXQgdGhlIGVkZ2Ugd2FzIGFscmVhZHkgc2VsZWN0ZWQsIHNvIHNjcm9sbCBpbiB0aGUgaW5kaWNhdGVkXG4gICAgLy8gZGlyZWN0aW9uIGJ5IG9uZSBwYWdlLiBMZWF2ZSB0aGUgbmV3IGl0ZW0gYXQgdGhhdCBlZGdlIHNlbGVjdGVkLlxuICAgIHZhciBkZWx0YSA9IChkb3dud2FyZCA/IDEgOiAtMSkgKiBpbm5lcm1vc3QuY2xpZW50SGVpZ2h0O1xuICAgIG5ld0luZGV4ID0gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgZWRnZSArIGRlbHRhLCBkb3dud2FyZCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gVGhlIGl0ZW0gYXQgdGhlIGVkZ2Ugd2Fzbid0IHNlbGVjdGVkIHlldC4gSW5zdGVhZCBvZiBzY3JvbGxpbmcsIHdlJ2xsXG4gICAgLy8ganVzdCBzZWxlY3QgdGhhdCBpdGVtLiBUaGF0IGlzLCB0aGUgZmlyc3QgYXR0ZW1wdCB0byBwYWdlIHVwL2Rvd25cbiAgICAvLyB1c3VhbGx5IGp1c3QgbW92ZXMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZWRnZSBpbiB0aGF0IGRpcmVjdGlvbi5cbiAgICBuZXdJbmRleCA9IGluZGV4T2ZJdGVtQXRFZGdlO1xuICB9XG5cbiAgaWYgKCFuZXdJbmRleCkge1xuICAgIC8vIFdlIGNhbid0IGZpbmQgYW4gaXRlbSBpbiB0aGUgZGlyZWN0aW9uIHdlIHdhbnQgdG8gdHJhdmVsLiBTZWxlY3QgdGhlXG4gICAgLy8gbGFzdCBpdGVtIChpZiBtb3ZpbmcgZG93bndhcmQpIG9yIGZpcnN0IGl0ZW0gKGlmIG1vdmluZyB1cHdhcmQpLlxuICAgIG5ld0luZGV4ID0gKGRvd253YXJkID8gZWxlbWVudC5pdGVtcy5sZW5ndGggLSAxIDogMCk7XG4gIH1cblxuICBpZiAobmV3SW5kZXggIT09IHNlbGVjdGVkSW5kZXgpIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBuZXdJbmRleDtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gV2UgaGFuZGxlZCB0aGUgcGFnZSB1cC9kb3duIG91cnNlbHZlcy5cbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7IC8vIFdlIGRpZG4ndCBkbyBhbnl0aGluZy5cbiAgfVxufVxuIiwiLyoqXG4gKiBNaXhpbiB0aGF0IGhhbmRsZXMgbGlzdCBib3gtc3R5bGUgcHJlZml4IHR5cGluZywgaW4gd2hpY2ggdGhlIHVzZXIgY2FuIHR5cGUgYVxuICogc3RyaW5nIHRvIHNlbGVjdCB0aGUgZmlyc3QgaXRlbSB0aGF0IGJlZ2lucyB3aXRoIHRoYXQgc3RyaW5nLlxuICpcbiAqIEBjbGFzcyBLZXlib2FyZFByZWZpeFNlbGVjdGlvblxuICpcbiAqL1xuXG4vLyBUT0RPOiBJZiB0aGUgc2VsZWN0aW9uIGlzIGNoYW5nZWQgYnkgc29tZSBvdGhlciBtZWFucyAoZS5nLiwgYXJyb3cga2V5cykgb3RoZXJcbi8vIHRoYW4gcHJlZml4IHR5cGluZywgdGhlbiB0aGF0IGFjdCBzaG91bGQgcmVzZXQgdGhlIHByZWZpeC5cblxuZXhwb3J0IGRlZmF1bHQgKGJhc2UpID0+IGNsYXNzIEtleWJvYXJkUHJlZml4U2VsZWN0aW9uIGV4dGVuZHMgYmFzZSB7XG5cbiAgLy8gaXRlbXNDaGFuZ2VkKCkge1xuICAvLyAgIHRoaXMuX2l0ZW1UZXh0Q29udGVudHMgPSBudWxsO1xuICAvLyAgIHJlc2V0VHlwZWRQcmVmaXgodGhpcyk7XG4gIC8vIH1cblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgbGV0IHJlc2V0UHJlZml4ID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSA4OiAvLyBCYWNrc3BhY2VcbiAgICAgICAgaGFuZGxlQmFja3NwYWNlKHRoaXMpO1xuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzZXRQcmVmaXggPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI3OiAvLyBFc2NhcGVcbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKCFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5ICYmICFldmVudC5hbHRLZXkgJiZcbiAgICAgICAgICAgIGV2ZW50LndoaWNoICE9PSAzMiAvKiBTcGFjZSAqLykge1xuICAgICAgICAgIGhhbmRsZVBsYWluQ2hhcmFjdGVyKHRoaXMsIFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpKTtcbiAgICAgICAgfVxuICAgICAgICByZXNldFByZWZpeCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChyZXNldFByZWZpeCkge1xuICAgICAgcmVzZXRUeXBlZFByZWZpeCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBQcmVmZXIgbWl4aW4gcmVzdWx0IGlmIGl0J3MgZGVmaW5lZCwgb3RoZXJ3aXNlIHVzZSBiYXNlIHJlc3VsdC5cbiAgICByZXR1cm4gaGFuZGxlZCB8fCAoc3VwZXIua2V5ZG93biAmJiBzdXBlci5rZXlkb3duKGV2ZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBmaXJzdCBpdGVtIHdob3NlIHRleHQgY29udGVudCBiZWdpbnMgd2l0aCB0aGUgZ2l2ZW4gcHJlZml4LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeFxuICAgKiBAcGFyYW0gcHJlZml4IFtTdHJpbmddIFRoZSBzdHJpbmcgdG8gc2VhcmNoIGZvclxuICAgKi9cbiAgc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KHByZWZpeCkge1xuICAgIGlmIChzdXBlci5zZWxlY3RJdGVtV2l0aFRleHRQcmVmaXgpIHsgc3VwZXIuc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KHByZWZpeCk7IH1cbiAgICBpZiAocHJlZml4ID09IG51bGwgfHwgcHJlZml4Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaW5kZXggPSBnZXRJbmRleE9mSXRlbVdpdGhUZXh0UHJlZml4KHRoaXMsIHByZWZpeCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG59O1xuXG5cbi8vIFRpbWUgaW4gbWlsbGlzZWNvbmRzIGFmdGVyIHdoaWNoIHRoZSB1c2VyIGlzIGNvbnNpZGVyZWQgdG8gaGF2ZSBzdG9wcGVkXG4vLyB0eXBpbmcuXG5jb25zdCBQUkVGSVhfVElNRU9VVF9EVVJBVElPTiA9IDEwMDA7XG5cblxuLy8gUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbSB3aXRoIHRoZSBnaXZlbiBwcmVmaXgsIGVsc2UgLTEuXG5mdW5jdGlvbiBnZXRJbmRleE9mSXRlbVdpdGhUZXh0UHJlZml4KGVsZW1lbnQsIHByZWZpeCkge1xuICBsZXQgaXRlbVRleHRDb250ZW50cyA9IGdldEl0ZW1UZXh0Q29udGVudHMoZWxlbWVudCk7XG4gIGxldCBwcmVmaXhMZW5ndGggPSBwcmVmaXgubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1UZXh0Q29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaXRlbVRleHRDb250ZW50ID0gaXRlbVRleHRDb250ZW50c1tpXTtcbiAgICBpZiAoaXRlbVRleHRDb250ZW50LnN1YnN0cigwLCBwcmVmaXhMZW5ndGgpID09PSBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8vIFJldHVybiBhbiBhcnJheSBvZiB0aGUgdGV4dCBjb250ZW50IChpbiBsb3dlcmNhc2UpIG9mIGFsbCBpdGVtcy5cbi8vIENhY2hlIHRoZXNlIHJlc3VsdHMuXG5mdW5jdGlvbiBnZXRJdGVtVGV4dENvbnRlbnRzKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzKSB7XG4gICAgbGV0IGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgICBlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzID0gaXRlbXMubWFwKGNoaWxkID0+IHtcbiAgICAgIGxldCB0ZXh0ID0gY2hpbGQudGV4dENvbnRlbnQgfHwgY2hpbGQuYWx0O1xuICAgICAgcmV0dXJuIHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5faXRlbVRleHRDb250ZW50cztcbn1cblxuZnVuY3Rpb24gaGFuZGxlQmFja3NwYWNlKGVsZW1lbnQpIHtcbiAgbGV0IGxlbmd0aCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4ID8gZWxlbWVudC5fdHlwZWRQcmVmaXgubGVuZ3RoIDogMDtcbiAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50Ll90eXBlZFByZWZpeCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4LnN1YnN0cigwLCBsZW5ndGggLSAxKTtcbiAgfVxuICBlbGVtZW50LnNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50Ll90eXBlZFByZWZpeCk7XG4gIGVsZW1lbnQuX3NldFByZWZpeFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUGxhaW5DaGFyYWN0ZXIoZWxlbWVudCwgY2hhcikge1xuICBsZXQgcHJlZml4ID0gZWxlbWVudC5fdHlwZWRQcmVmaXggfHwgJyc7XG4gIGVsZW1lbnQuX3R5cGVkUHJlZml4ID0gcHJlZml4ICsgY2hhci50b0xvd2VyQ2FzZSgpO1xuICBlbGVtZW50LnNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50Ll90eXBlZFByZWZpeCk7XG4gIHNldFByZWZpeFRpbWVvdXQoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0UHJlZml4VGltZW91dChlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Ll9wcmVmaXhUaW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQpO1xuICAgIGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldFR5cGVkUHJlZml4KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5fdHlwZWRQcmVmaXggPSAnJztcbiAgcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpIHtcbiAgcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xuICBlbGVtZW50Ll9wcmVmaXhUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVzZXRUeXBlZFByZWZpeChlbGVtZW50KTtcbiAgfSwgUFJFRklYX1RJTUVPVVRfRFVSQVRJT04pO1xufVxuIiwiLyoqXG4gKiBNaXhpbiB3aGljaCBhcHBsaWVzIHN0YW5kYXJkIGhpZ2hsaWdodCBjb2xvcnMgdG8gYSBzZWxlY3RlZCBpdGVtLlxuICpcbiAqIEBjbGFzcyBTZWxlY3Rpb25IaWdobGlnaHRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoYmFzZSkgPT4gY2xhc3MgU2VsZWN0aW9uSGlnaGxpZ2h0IGV4dGVuZHMgYmFzZSB7XG5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHtcbiAgICBpZiAoc3VwZXIuYXBwbHlTZWxlY3Rpb24pIHsgc3VwZXIuYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpOyB9XG4gICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzZWxlY3RlZCA/ICdoaWdobGlnaHQnIDogJyc7XG4gICAgaXRlbS5zdHlsZS5jb2xvciA9IHNlbGVjdGVkID8gJ2hpZ2hsaWdodHRleHQnIDogJyc7XG4gIH1cblxufTtcbiIsIi8qKlxuICogTWl4aW4gd2hpY2ggc2Nyb2xscyBhIGNvbnRhaW5lciB0byBrZWVwIHRoZSBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogQGNsYXNzIFNlbGVjdGlvblNjcm9sbFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChiYXNlKSA9PiBjbGFzcyBTZWxlY3Rpb25TY3JvbGwgZXh0ZW5kcyBiYXNlIHtcblxuICBnZXQgc2VsZWN0ZWRJdGVtKCkge1xuICAgIHJldHVybiBzdXBlci5zZWxlY3RlZEl0ZW07XG4gIH1cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgaWYgKCdzZWxlY3RlZEl0ZW0nIGluIGJhc2UucHJvdG90eXBlKSB7IHN1cGVyLnNlbGVjdGVkSXRlbSA9IGl0ZW07IH1cbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gS2VlcCB0aGUgc2VsZWN0ZWQgaXRlbSBpbiB2aWV3LlxuICAgICAgdGhpcy5zY3JvbGxJdGVtSW50b1ZpZXcoaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB0aGUgZ2l2ZW4gZWxlbWVudCBjb21wbGV0ZWx5IGludG8gdmlldywgbWluaW1pemluZyB0aGUgZGVncmVlIG9mXG4gICAqIHNjcm9sbGluZyBwZXJmb3JtZWQuXG4gICAqXG4gICAqIEJsaW5rIGhhcyBhIHNjcm9sbEludG9WaWV3SWZOZWVkZWQoKSBmdW5jdGlvbiB0aGF0IGFsbW9zdCB0aGUgc2FtZSB0aGluZyxcbiAgICogYnV0IHVuZm9ydHVuYXRlbHkgaXQncyBub24tc3RhbmRhcmQsIGFuZCBpbiBhbnkgZXZlbnQgb2Z0ZW4gZW5kcyB1cFxuICAgKiBzY3JvbGxpbmcgbW9yZSB0aGFuIGlzIGFic29sdXRlbHkgbmVjZXNzYXJ5LlxuICAgKlxuICAgKiBAbWV0aG9kIHNjcm9sbEl0ZW1JbnRvVmlld1xuICAgKi9cbiAgc2Nyb2xsSXRlbUludG9WaWV3KGl0ZW0pIHtcbiAgICBpZiAoc3VwZXIuc2Nyb2xsSXRlbUludG9WaWV3KSB7IHN1cGVyLnNjcm9sbEl0ZW1JbnRvVmlldygpOyB9XG4gICAgLy8gR2V0IHRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvcCBvZiB0aGVcbiAgICAvLyBsaXN0J3Mgc2Nyb2xsYWJsZSBjYW52YXMuIEFuIGl0ZW0gYXQgdGhlIHRvcCBvZiB0aGUgbGlzdCB3aWxsIGhhdmUgYVxuICAgIC8vIGVsZW1lbnRUb3Agb2YgMC5cblxuICAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmlubmVybW9zdEF0dGFjaGVkO1xuICAgIGlmICghaW5uZXJtb3N0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRUb3AgPSBpdGVtLm9mZnNldFRvcCAtIGlubmVybW9zdC5vZmZzZXRUb3AgLSBpbm5lcm1vc3QuY2xpZW50VG9wO1xuICAgIGxldCBlbGVtZW50Qm90dG9tID0gZWxlbWVudFRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgIC8vIERldGVybWluZSB0aGUgYm90dG9tIG9mIHRoZSBzY3JvbGxhYmxlIGNhbnZhcy5cbiAgICBsZXQgc2Nyb2xsQm90dG9tID0gaW5uZXJtb3N0LnNjcm9sbFRvcCArIGlubmVybW9zdC5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGVsZW1lbnRCb3R0b20gPiBzY3JvbGxCb3R0b20pIHtcbiAgICAgIC8vIFNjcm9sbCB1cCB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wICs9IGVsZW1lbnRCb3R0b20gLSBzY3JvbGxCb3R0b207XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnRUb3AgPCBpbm5lcm1vc3Quc2Nyb2xsVG9wKSB7XG4gICAgICAvLyBTY3JvbGwgZG93biB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wID0gZWxlbWVudFRvcDtcbiAgICB9XG4gIH1cblxufTtcbiIsIi8qXG4gKiBFeHRlbmQgY2xhc3Nlcy9vYmplY3RzIHdpdGggb3RoZXIgY2xhc3Nlcy9vYmplY3RzLlxuICovXG5cbmltcG9ydCAqIGFzIENvbXBvc2l0aW9uUnVsZXMgZnJvbSAnLi9Db21wb3NpdGlvblJ1bGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9zYWJsZSB7XG5cbiAgLypcbiAgICogUmV0dXJuIGEgc3ViY2xhc3Mgb2YgdGhlIGN1cnJlbnQgY2xhc3MgdGhhdCBpbmNsdWRlcyB0aGUgbWVtYmVycyBpbmRpY2F0ZWRcbiAgICogaW4gdGhlIGFyZ3VtZW50LiBUaGUgYXJndW1lbnQgY2FuIGJlIGEgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3QsIG9yIGEgY2xhc3NcbiAgICogd2hvc2UgcHJvdG90eXBlIGNvbnRhaW5zIHRoZSBtZW1iZXJzIHRoYXQgd2lsbCBiZSBjb3BpZWQuXG4gICAqXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIGEgY291cGxlIG9mIHB1cnBvc2VzOlxuICAgKiAxLiBFeHRlbmQgYSBjbGFzcyB3aXRoIG1peGlucy9iZWhhdmlvcnMuXG4gICAqIDIuIENyZWF0ZSBhIGNvbXBvbmVudCBjbGFzcyBpbiBFUzUuXG4gICAqXG4gICAqIFRoZSBjYWxsXG4gICAqXG4gICAqICAgTXlCYXNlQ2xhc3MuY29tcG9zZShNaXhpbjEsIE1peGluMiwgTWl4aW4zKVxuICAgKlxuICAgKiB3aWxsIHJldHVybiBhIG5ldyBjbGFzcyBvZiBNeUJhc2VDbGFzcyB0aGF0IGltcGxlbWVudHMgYWxsIHRoZSBtZXRob2RzIGluXG4gICAqIHRoZSB0aHJlZSBtaXhpbnMgZ2l2ZW4uIFRoZSBhYm92ZSBpcyBlcXVpdmFsZW50IHRvXG4gICAqXG4gICAqICAgTXlCYXNlQ2xhc3MuY29tcG9zZShNaXhpbjEpLmNvbXBvc2UoTWl4aW4yKS5jb21wb3NlKE1peGluMylcbiAgICpcbiAgICogVGhpcyBtZXRob2QgY2FuIGJlIHN0YXRpY2FsbHkgaW52b2tlZCB0byBleHRlbmQgcGxhaW4gb2JqZWN0cyBvciBjbGFzc2VzXG4gICAqIHRoYXQgZG9uJ3QgaW5oZXJpdCBmcm9tIHRoaXMgY2xhc3M6XG4gICAqXG4gICAqICAgbGV0IGV4dGVuZGVkID0gQ29tcG9zYWJsZS5leHRlbmQuY2FsbChvYmoxLCBvYmoyKTtcbiAgICpcbiAgICovXG4gIHN0YXRpYyBjb21wb3NlKC4uLm1peGlucykge1xuICAgIC8vIFdlIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcyBmb3IgZWFjaCBtaXhpbiBpbiB0dXJuLiBUaGUgcmVzdWx0IGJlY29tZXNcbiAgICAvLyB0aGUgYmFzZSBjbGFzcyBleHRlbmRlZCBieSBhbnkgc3Vic2VxdWVudCBtaXhpbnMuIEl0IHR1cm5zIG91dCB0aGF0XG4gICAgLy8gd2UgY2FuIHVzZSBBcnJheS5yZWR1Y2UoKSB0byBjb25jaXNlbHkgZXhwcmVzcyB0aGlzLCB1c2luZyB0aGUgY3VycmVudFxuICAgIC8vIChvcmlnaW5hbCkgY2xhc3MgYXMgdGhlIHNlZWQgZm9yIHJlZHVjZSgpLlxuICAgIHJldHVybiBtaXhpbnMucmVkdWNlKGNvbXBvc2UsIHRoaXMpO1xuICB9XG5cbiAgLypcbiAgICogRGVjb3JhdGUgXCJ0aGlzXCIgd2l0aCB0aGUgaW5kaWNhdGVkIGRlY29yYXRvcnMuIFRoZSBsYXR0ZXIgc2hvdWxkIGJlIGFcbiAgICogZGljdGlvbmFyeSBtYXBwaW5nIHByb3BlcnR5IG5hbWVzIHRvIChwcm9wb3NlZCkgRVM3LWNvbXBsaWFudCBkZWNvcmF0b3JzLlxuICAgKiBUaGlzIGFsbG93cyB0aGUgdXNlIG9mIGRlY29yYXRvcnMgaW4gRVM2LzUuIEV4YW1wbGUsIHRoaXMgRVM3IGNvZGU6XG4gICAqXG4gICAqICAgY2xhc3MgRm9vIHtcbiAgICogICAgICBAZGVjb3JhdGUoY3VzdG9tRGVjb3JhdG9yKVxuICAgKiAgICAgIGJhcigpIHt9XG4gICAqICAgfVxuICAgKlxuICAgKiBjYW4gYmUgd3JpdHRlbiB1c2luZyB0aGUgZGVjb3JhdGUoKSBtZXRob2QgYXM6XG4gICAqXG4gICAqICAgY2xhc3MgRm9vIHtcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICogICBDb21wb3NhYmxlLmRlY29yYXRlLmNhbGwoRm9vLnByb3RvdHlwZSwgeyBiYXI6IGN1c3RvbURlY29yYXRvciB9KTtcbiAgICpcbiAgICogT3IsIGlmIEZvbyBkZXJpdmVzIGZyb20gQ29tcG9zYWJsZSBhbHJlYWR5LCB0aGlzIGNhbiBiZSBzaG9ydGVyOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyBleHRlbmRzIENvbXBvc2FibGUge1xuICAgKiAgICAgIGJhcigpIHt9XG4gICAqICAgfVxuICAgKiAgIEZvby5wcm90b3R5cGUuZGVjb3JhdGUoeyBiYXI6IGN1c3RvbURlY29yYXRvciB9KTtcbiAgICpcbiAgICovXG4gIHN0YXRpYyBkZWNvcmF0ZShkZWNvcmF0b3JzKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGRlY29yYXRvcnMpIHtcbiAgICAgIGxldCBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW2tleV07XG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywga2V5KTtcbiAgICAgIGRlY29yYXRvcih0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogRGVjb3JhdGVzIHRoZSBwcm90b3R5cGUgb2YgYSBjbGFzcyBkZXJpdmVkIGZyb20gQ29tcG9zYWJsZS5cbiAgICogU2VlIG5vdGVzIGZvciB0aGUgc3RhdGljIGRlY29yYXRlKCkgbWV0aG9kLlxuICAgKi9cbiAgZGVjb3JhdGUoZGVjb3JhdG9ycykge1xuICAgIENvbXBvc2FibGUuZGVjb3JhdGUuY2FsbCh0aGlzLCBkZWNvcmF0b3JzKTtcbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRvciBmb3IgYW5ub3RhdGluZyBob3cgYSBjbGFzcyBtZW1iZXIgc2hvdWxkIGJlIGNvbXBvc2VkIGxhdGVyLlxuICAgKiBUaGlzIHRha2VzIGEgZGVjb3JhdG9yIHRoYXQgd2lsbCBiZSBydW4gYXQgKmNvbXBvc2l0aW9uKiB0aW1lLlxuICAgKiBGb3Igbm93LCB0aGlzIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gbWV0aG9kcy5cbiAgICovXG4gIHN0YXRpYyBydWxlKGRlY29yYXRvcikge1xuICAgIC8vIFJldHVybiBhIGRlY29yYXRvciB0aGF0IHJlY29yZHMgdGhlIGdpdmVuIGRlY29yYXRvciBvbiB0aGUgbWVtYmVyIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgICAgIC8vIFRPRE86IFVzZSBhIFN5bWJvbCBpbnN0ZWFkIG9mIGEgc3RyaW5nIHByb3BlcnR5IG5hbWUgdG8gc2F2ZSB0aGlzLlxuICAgICAgLy8gZGVzY3JpcHRvci52YWx1ZS5fY29tcG9zaXRpb25SdWxlID0gZGVjb3JhdG9yO1xuICAgICAgaWYgKCF0YXJnZXQuX2NvbXBvc2l0aW9uUnVsZXMpIHtcbiAgICAgICAgdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzID0ge307XG4gICAgICB9XG4gICAgICB0YXJnZXQuX2NvbXBvc2l0aW9uUnVsZXNba2V5XSA9IGRlY29yYXRvcjtcbiAgICB9XG4gIH1cblxufVxuXG5cbi8qXG4gKiBFeHBvc2Ugc3RhbmRhcmQgY29tcG9zaXRpb24gcnVsZXMgYXMgcHJvcGVydGllcyBvZiBDb21wb3NhYmxlLlxuICogVGhpcyBhdm9pZHMgdGhlIG5lZWQgZm9yIHNvbWVvbmUgdG8gbWFrZSBhIHNlcGFyYXRlIGltcG9ydCBvZiB0aGUgcnVsZXMuXG4gKi9cbkNvbXBvc2FibGUucnVsZXMgPSBDb21wb3NpdGlvblJ1bGVzO1xuXG5cbi8qXG4gKiBBbGwgQ29tcG9zYWJsZSBvYmplY3RzIGhhdmUgYSBcInByb3RvdHlwZXNcIiBrZXkgdGhhdCBrZWVwcyByZWZlcmVuY2VzIHRvIHRoZVxuICogbWl4aW5zIHRoYXQgd2VyZSBhcHBsaWVkIGFsb25nIHRoZSBwcm90b3R5cGUgY2hhaW4uIFdoZW4gYSAqbmFtZWQqIG1peGluIGlzXG4gKiBhcHBsaWVkIHRvIHRoZSBwcm90b3R5cGUgY2hhaW4sIHRoZSByZXN1bHRpbmcgb2JqZWN0IChvciwgZm9yIGEgY2xhc3MsIHRoZVxuICogY2xhc3MnIHByb3RvdHlwZSkgd2lsbCBoYXZlIGEgXCJwcm90b3R5cGVzXCIgdmFsdWUgZm9yIHRoYXQgbmFtZSB0aGF0IHBvaW50c1xuICogYmFjayB0byB0aGUgbWl4aW4uIFRoYXQgaXMsIGEgbWl4aW4gY2FuIGdldCBhIHBvaW50ZXIgdG8gaXRzZWxmIGluIHRoZSBjaGFpbi5cbiAqXG4gKiBBIHNpbmdsZSBtaXhpbiBjYW4gYmUgYXBwbGllZCB0byBtdWx0aXBsZSBwcm90b3R5cGUgY2hhaW5zIC0tIHRoZSBuYW1lXG4gKiByZWZlcnMgdG8gdGhlIHByb3RvdHlwZSBvbiAqdGhpcyBwYXJ0aWN1bGFyIHByb3RvdHlwZSBjaGFpbiogdGhhdCB3YXMgYWRkZWRcbiAqIGZvciB0aGF0IG1peGluLiBUaGlzIGxldHMgbWl4aW4vbWl4aW4gY29kZSBnZXQgYmFjayB0byBpdHMgb3duXG4gKiBwcm90b3R5cGUsIG1vc3Qgb2Z0ZW4gaW4gY29tYmluYXRpb24gd2l0aCBcInN1cGVyXCIgKHNlZSBiZWxvdykgaW4gb3JkZXIgdG9cbiAqIGludm9rZSBzdXBlcmNsYXNzIGJlaGF2aW9yLlxuICovXG5Db21wb3NhYmxlLnByb3RvdHlwZS5wcm90b3R5cGVzID0ge1xuICBDb21wb3NhYmxlOiBDb21wb3NhYmxlLnByb3RvdHlwZVxufTtcblxuLypcbiAqIEFsbCBDb21wb3NhYmxlLWNyZWF0ZWQgb2JqZWN0cyBoYXZlIGEgXCJzdXBlclwiIHByb3BlcnR5IHRoYXQgcmVmZXJlbmNlcyB0aGVcbiAqIHByb3RvdHlwZSBhYm92ZSB0aGVtIGluIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gKlxuICogVGhpcyBcInN1cGVyXCIgcmVmZXJlbmNlIGlzIHVzZWQgYXMgYSByZXBsYWNlbWVudCBmb3IgRVM2J3MgXCJzdXBlclwiIGtleXdvcmQgaW5cbiAqIGluIEVTNSAob3IgdHJhbnNwaWxlZCBFUzYpIG1peGlucyB0aGF0IHdhbnQgdG8gaW52b2tlIHN1cGVyY2xhc3MgYmVoYXZpb3IsXG4gKiB3aGVyZSB0aGUgc3BlY2lmaWMgc3VwZXJjbGFzcyB3aWxsIGRlcGVuZCB1cG9uIHdoaWNoIG1peGlucyBoYXZlIGJlZW4gYXBwbGllZFxuICogdG8gYSBnaXZlbiBwcm90b3R5cGUgY2hhaW4uXG4gKlxuICogRS5nLjpcbiAqICAgY2xhc3MgTWl4aW4ge1xuICogICAgIGZvbygpIHtcbiAqICAgICAgIGlmICh0aGlzLnByb3RveXBlcy5NaXhpbi5zdXBlci5mb28pIHtcbiAqICAgICAgICAgdGhpcy5wcm90b3R5cGVzLk1peGluLnN1cGVyLmZvby5jYWxsKHRoaXMpOyAvLyBJbnZva2Ugc3VwZXJjbGFzcycgZm9vKClcbiAqICAgICAgIH1cbiAqICAgICAgIC8vIERvIE1peGluLXNwZWNpZmljIHdvcmsgaGVyZS4uLlxuICogICAgIH1cbiAqICAgfVxuICpcbiAqIEZvciBjb25zaXN0ZW5jeSwgQ29tcG9zYWJsZSBpdHNlbGYgcmVjb3JkcyBpdHMgb3duIHN1cGVyY2xhc3MgYXMgT2JqZWN0LlxuICovXG5Db21wb3NhYmxlLnByb3RvdHlwZS5zdXBlciA9IE9iamVjdC5wcm90b3R5cGU7XG5cblxuLy8gQ29tcG9zaXRpb24gcnVsZXMgZm9yIHN0YW5kYXJkIG9iamVjdCBtZW1iZXJzLlxuQ29tcG9zYWJsZS5wcm90b3R5cGUuY29tcG9zaXRpb25SdWxlcyA9IHtcbiAgJ19fbWV0aG9kX18nOiBDb21wb3NhYmxlLnJ1bGVzLmJhc2VNZXRob2RGaXJzdCxcbiAgJ19fcHJvcGVydHlfXyc6IENvbXBvc2FibGUucnVsZXMuYmFzZVNldHRlckZpcnN0LFxuICAnY29tcG9zaXRpb25SdWxlcyc6IENvbXBvc2FibGUucnVsZXMuY2hhaW5Qcm90b3R5cGVzLFxuICAncHJvdG90eXBlcyc6IENvbXBvc2FibGUucnVsZXMuY2hhaW5Qcm90b3R5cGVzXG59O1xuXG5cbi8vIFByb3BlcnRpZXMgZGVmaW5lZCBieSBGdW5jdGlvbiB0aGF0IHdlIGRvbid0IHdhbnQgdG8gbWl4aW4uXG4vLyBXZSdkIHByZWZlciB0byBnZXQgdGhlc2UgYnkgaW50ZXJyb2dhdGluZyBGdW5jdGlvbiBpdHNlbGYsIGJ1dCBXZWJLaXRcbi8vIGZ1bmN0aW9ucyBoYXZlIHNvbWUgcHJvcGVydGllcyAoYXJndW1lbnRzIGFuZCBjYWxsZXIpIHdoaWNoIGFyZSBub3QgcmV0dXJuZWRcbi8vIGJ5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEZ1bmN0aW9uKS5cbmNvbnN0IE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMgPSBbXG4gICdhcmd1bWVudHMnLFxuICAnY2FsbGVyJyxcbiAgJ2xlbmd0aCcsXG4gICduYW1lJyxcbiAgJ3Byb3RvdHlwZSdcbl07XG5cbi8vIFByb3BlcnRpZXMgZGVmaW5lZCBieSBPYmplY3QgdGhhdCB3ZSBkb24ndCB3YW50IHRvIG1peGluLlxuY29uc3QgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMgPSBbXG4gICdjb25zdHJ1Y3Rvcidcbl07XG5cbmNvbnN0IE9SSUdJTkFMX01JWElOX1NZTUJPTCA9IFN5bWJvbCgnT3JpZ2luYWwgbWl4aW4nKTtcblxuXG4vKlxuICogQXBwbHkgdGhlIGNvbXBvc2l0aW9uIHJ1bGVzIGluIGVmZmVjdCBmb3IgdGhlIGdpdmVuIG9iamVjdCwgd2hpY2ggbGllcyBhdFxuICogdGhlIHRpcCBvZiBhIHByb3RvdHlwZSBjaGFpbi4gVGhpcyBsb29rcyBmb3IgY29uZmxpY3RzIGJldHdlZW4gdGhlIG9iamVjdCdzXG4gKiBvd24gcHJvcGVydGllcyAoYW5kIG1ldGhvZHMpLCBhbmQgaWRlbnRpY2FsbHktbmFtZWQgcHJvcGVydGllcyAobWV0aG9kcylcbiAqIGZ1cnRoZXIgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi4gQ29uZmxpY3RzIGFyZSByZXNvbHZlZCB3aXRoIHJ1bGVzIGRlZmluZWQgYnlcbiAqIHRoZSBhZmZlY3QgbWVtYmVycy5cbiAqL1xuZnVuY3Rpb24gYXBwbHlDb21wb3NpdGlvblJ1bGVzKG9iaikge1xuICBsZXQgb3duQ29tcG9zaXRpb25SdWxlcyA9IG9iai5oYXNPd25Qcm9wZXJ0eSgnX2NvbXBvc2l0aW9uUnVsZXMnKSA/XG4gICAgb2JqLl9jb21wb3NpdGlvblJ1bGVzIDpcbiAgICB7fTtcbiAgbGV0IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXMgPSBvYmouY29tcG9zaXRpb25SdWxlcyB8fCB7fTtcbiAgbGV0IGRlZmF1bHRDb21wb3NpdGlvblJ1bGVzID0gQ29tcG9zYWJsZS5wcm90b3R5cGUuY29tcG9zaXRpb25SdWxlcztcblxuICAvLyBGb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBzZWUgaWYgdGhlIGJhc2UgaGFzIGEgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lLlxuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKG5hbWUgaW4gYmFzZSAmJiBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgLy8gQmFzZSBkb2VzIGltcGxlbWVudCBhIG1lbWJlciB3aXRoIHRoZSBzYW1lIG5hbWU7IG5lZWQgdG8gY29tYmluZS5cbiAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xuICAgICAgbGV0IGtleSA9IGdldEdlbmVyYWxEZXNjcmlwdG9yS2V5KGRlc2NyaXB0b3IpO1xuXG4gICAgICAvLyBTZWUgaWYgdGhpcyBwcm9wZXJ0eSBoYXMgYSBydWxlIGFzc29jaWF0ZWQgd2l0aCBpdCwgY2hlY2tpbmc6XG4gICAgICBsZXQgcnVsZSA9IG93bkNvbXBvc2l0aW9uUnVsZXNbbmFtZV0gICAgLy8gb2JqZWN0IGl0c2VsZlxuICAgICAgICAgIHx8IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXNbbmFtZV0gIC8vIGluaGVyaXRlZCBydWxlcyBmb3IgbmFtZVxuICAgICAgICAgIHx8IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXNba2V5XSAgIC8vIGluaGVyaXRlZCBydWxlcyBnZW5lcmFsbHlcbiAgICAgICAgICB8fCBkZWZhdWx0Q29tcG9zaXRpb25SdWxlc1tuYW1lXSAgICAvLyBkZWZhdWx0IHJ1bGVzIGZvciBuYW1lXG4gICAgICAgICAgfHwgZGVmYXVsdENvbXBvc2l0aW9uUnVsZXNba2V5XTsgICAgLy8gZGVmYXVsdCBydWxlcyBnZW5lcmFsbHlcblxuICAgICAgLy8gXCJvdmVycmlkZVwiIGlzIGEga25vd24gbm8tb3AsIHNvIHdlIGRvbid0IGJvdGhlciB0cnlpbmcgdG8gcmVkZWZpbmUgdGhlXG4gICAgICAvLyBwcm9wZXJ0eS5cbiAgICAgIGlmIChydWxlICYmIHJ1bGUgIT09IENvbXBvc2FibGUucnVsZXMub3ZlcnJpZGUpIHtcbiAgICAgICAgcnVsZShvYmosIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5cbi8qXG4gKiBDb3B5IHRoZSBnaXZlbiBwcm9wZXJ0aWVzL21ldGhvZHMgdG8gdGhlIHRhcmdldC5cbiAqIFJldHVybiB0aGUgdXBkYXRlZCB0YXJnZXQuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPd25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0LCBpZ25vcmVQcm9wZXJ0eU5hbWVzID0gW10pIHtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGlmIChpZ25vcmVQcm9wZXJ0eU5hbWVzLmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBuYW1lKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuLypcbiAqIFJldHVybiBhIG5ldyBzdWJjbGFzcy9vYmplY3QgdGhhdCBleHRlbmRzIHRoZSBnaXZlbiBiYXNlIGNsYXNzL29iamVjdCB3aXRoXG4gKiB0aGUgbWVtYmVycyBvZiB0aGUgaW5kaWNhdGVkIG1peGluLlxuICovXG5mdW5jdGlvbiBjb21wb3NlKGJhc2UsIG1peGluKSB7XG5cbiAgLy8gU2VlIGlmIHRoZSAqbWl4aW4qIGhhcyBhIGJhc2UgY2xhc3MvcHJvdG90eXBlIG9mIGl0cyBvd24uXG4gIGxldCBtaXhpbklzQ2xhc3MgPSBpc0NsYXNzKG1peGluKTtcbiAgbGV0IG1peGluQmFzZSA9IG1peGluSXNDbGFzcyA/XG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKG1peGluLnByb3RvdHlwZSkuY29uc3RydWN0b3IgOlxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihtaXhpbik7XG4gIGlmIChtaXhpbkJhc2UgJiZcbiAgICAgIG1peGluQmFzZSAhPT0gRnVuY3Rpb24gJiZcbiAgICAgIG1peGluQmFzZSAhPT0gT2JqZWN0ICYmXG4gICAgICBtaXhpbkJhc2UgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAvLyBUaGUgbWl4aW4gaXRzZWxmIGRlcml2ZXMgZnJvbSBhbm90aGVyIGNsYXNzL29iamVjdC5cbiAgICAvLyBSZWN1cnNlLCBhbmQgZXh0ZW5kIHdpdGggdGhlIG1peGluJ3MgYmFzZSBmaXJzdC5cbiAgICBiYXNlID0gY29tcG9zZShiYXNlLCBtaXhpbkJhc2UpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIHRoZSBleHRlbmRlZCBvYmplY3Qgd2UncmUgZ29pbmcgdG8gcmV0dXJuIGFzIGEgcmVzdWx0LlxuICBsZXQgYmFzZUlzQ2xhc3MgPSBpc0NsYXNzKGJhc2UpO1xuICBsZXQgcmVzdWx0ID0gYmFzZUlzQ2xhc3MgP1xuICAgIGNyZWF0ZVN1YmNsYXNzKGJhc2UpIDpcbiAgICBPYmplY3QuY3JlYXRlKGJhc2UpO1xuXG4gIC8vIENoZWNrIHRvIG1ha2Ugc3VyZSB3ZSdyZSBub3QgZXh0ZW5kaW5nIHRoZSBiYXNlIHdpdGggYSBwcm90b3R5cGUgdGhhdCB3YXNcbiAgLy8gYWxyZWFkeSBjb21wb3NlZCBpbnRvIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4uXG4gIGxldCBiYXNlUHJvdG90eXBlID0gYmFzZUlzQ2xhc3MgPyBiYXNlLnByb3RvdHlwZSA6IGJhc2U7XG4gIGxldCBtaXhpblByb3RvdHlwZSA9IG1peGluSXNDbGFzcyA/IG1peGluLnByb3RvdHlwZSA6IG1peGluO1xuICBpZiAob2JqZWN0SGFzUHJvdG90eXBlKGJhc2VQcm90b3R5cGUsIG1peGluUHJvdG90eXBlKVxuICAgICAgfHwgb2JqZWN0SGFzTWl4aW4oYmFzZVByb3RvdHlwZSwgbWl4aW4pKSB7XG4gICAgLy8gU2tpcCB0aGlzIG1peGluLCByZXR1cm4gcmVzdWx0IGFzIGlzLlxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBUaGUgXCJ0YXJnZXRcIiBoZXJlIGlzIHRoZSB0YXJnZXQgb2Ygb3VyIHByb3BlcnR5L21ldGhvZCBjb21wb3NpdGlvbiBydWxlcy5cbiAgbGV0IHRhcmdldDtcbiAgaWYgKGJhc2VJc0NsYXNzICYmIG1peGluSXNDbGFzcykge1xuICAgIC8vIEV4dGVuZGluZyBjbGFzcyB3aXRoIGNsYXNzOiBjb3B5IHN0YXRpYyBtZW1iZXJzLCB0aGVuIHByb3RvdHlwZSBtZW1iZXJzLlxuICAgIGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCByZXN1bHQsIE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMpO1xuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLnByb3RvdHlwZSwgcmVzdWx0LnByb3RvdHlwZSwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9IGVsc2UgaWYgKCFiYXNlSXNDbGFzcyAmJiBtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgcGxhaW4gb2JqZWN0IHdpdGggY2xhc3M6IGNvcHkgcHJvdG90eXBlIG1ldGhvZHMgdG8gcmVzdWx0LlxuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLnByb3RvdHlwZSwgcmVzdWx0LCBOT05fTUlYQUJMRV9GVU5DVElPTl9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIGlmIChiYXNlSXNDbGFzcyAmJiAhbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIGNsYXNzIHdpdGggcGxhaW4gb2JqZWN0OiBjb3B5IG1peGluIHRvIHJlc3VsdCBwcm90b3R5cGUuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdC5wcm90b3R5cGUsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFeHRlbmRpbmcgcGxhaW4gb2JqZWN0IHdpdGggcGxhaW4gb2JqZWN0OiBjb3B5IGZvcm1lciB0byBsYXR0ZXIuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdCwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9XG5cbiAgaWYgKG1peGluLm5hbWUpIHtcbiAgICAvLyBVc2UgdGhlIG1peGluJ3MgbmFtZSAodXN1YWxseSB0aGUgbmFtZSBvZiBhIGNsYXNzJyBjb25zdHJ1Y3RvcikgdG9cbiAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIGJhY2sgdG8gdGhlIHRpcCBvZiB0aGUgbmV3bHktZXh0ZW5kZWQgcHJvdG90eXBlIGNoYWluLlxuICAgIC8vIFNlZSBub3RlcyBhdCBDb21wb3NhYmxlJ3MgXCJwcm90b3R5cGVzXCIgcHJvcGVydHkuXG4gICAgdGFyZ2V0LnByb3RvdHlwZXMgPSB7fTtcbiAgICB0YXJnZXQucHJvdG90eXBlc1ttaXhpbi5uYW1lXSA9IHRhcmdldDtcblxuICAgIC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyY2xhc3Mvc3VwZXItb2JqZWN0LiBTZWUgdGhlIGNvbW1lbnRzIG9uXG4gICAgLy8gQ29tcG9zYWJsZSdzIFwic3VwZXJcIiBwcm9wZXJ0eS5cbiAgICB0YXJnZXQuc3VwZXIgPSBiYXNlSXNDbGFzcyA/IGJhc2UucHJvdG90eXBlIDogYmFzZTtcblxuICAgIGlmIChiYXNlSXNDbGFzcykge1xuICAgICAgLy8gT25lIGxpbWl0YXRpb24gb2YgZGVmaW5pbmcgYSBjbGFzcyBkeW5hbWljYWxseSBpcyB0aGF0IHdlIGNhbid0XG4gICAgICAvLyBwcm9ncmFtbWF0aWNhbGx5IGRldGVybWluZSB0aGUgcmVhbCBuYW1lIG9mIHRoZSBjb25zdHJ1Y3Rvci4gRm9yIGFsbFxuICAgICAgLy8gY2xhc3NlcyB3ZSBjcmVhdGUsIHRoZSBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBcInN1YmNsYXNzXCIuIFRoYXQnc1xuICAgICAgLy8gdW5oZWxwZnVsIHdoZW4gZGVidWdnaW5nLiBBcyBhIHBhcnRpYWwgZml4LCB3ZSBkeW5hbWljYWxseSBvdmVyd3JpdGVcbiAgICAgIC8vIHRoZSBjb25zdHJ1Y3RvcidzIFwibmFtZVwiIHByb3BlcnR5LiBUaGF0IHdvbid0IHVwZGF0ZSB0aGUgbmFtZSBzaG93blxuICAgICAgLy8gaW4gdGhlIGRlYnVnZ2VyIGluIGFsbCBwbGFjZXMsIGJ1dCBpcyBhdCBsZWFzdCBpbnNwZWN0YWJsZSBpbiB0aGVcbiAgICAgIC8vIGRlYnVnIGNvbnNvbGUuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCAnbmFtZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbWl4aW4ubmFtZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gS2VlcCB0cmFjayBvZiB0aGUgbWl4aW4gdGhhdCB3YXMgY29tcG9zZWQgaW4gYXQgdGhpcyBwb2ludC5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgT1JJR0lOQUxfTUlYSU5fU1lNQk9MLCB7XG4gICAgdmFsdWU6IG1peGluXG4gIH0pO1xuXG4gIC8vIEFwcGx5IHRoZSBjb21wb3NpdGlvbiBydWxlcyBpbiBlZmZlY3QgYXQgdGhlIHRhcmdldC5cbiAgYXBwbHlDb21wb3NpdGlvblJ1bGVzKHRhcmdldCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG4vKlxuICogUmV0dXJuIGEgbmV3IHN1YmNsYXNzIG9mIHRoZSBnaXZlbiBiYXNlIGNsYXNzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVTdWJjbGFzcyhiYXNlKSB7XG4gIC8vIE9uY2UgV2ViS2l0IHN1cHBvcnRzIEhUTUxFbGVtZW50IGFzIGEgcmVhbCBjbGFzcywgd2UgY2FuIGp1c3Qgc2F5OlxuICAvL1xuICAvLyAgIGNsYXNzIHN1YmNsYXNzIGV4dGVuZHMgYmFzZSB7fVxuICAvL1xuICAvLyBIb3dldmVyLCB1bnRpbCB0aGF0J3MgcmVzb2x2ZWQsIHdlIGp1c3QgY29uc3RydWN0IHRoZSBjbGFzcyBvdXJzZWx2ZXMuXG4gIGZ1bmN0aW9uIHN1YmNsYXNzKCkge31cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLCBiYXNlKTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YmNsYXNzLnByb3RvdHlwZSwgYmFzZS5wcm90b3R5cGUpO1xuICByZXR1cm4gc3ViY2xhc3M7XG59XG5cblxuLypcbiAqIEV4YW1pbmUgdGhlIGRlc2NyaXB0b3IgdG8gZGV0ZXJtaW5lIHdoaWNoIHJ1bGUga2V5IGFwcGxpZXMuXG4gKi9cbmZ1bmN0aW9uIGdldEdlbmVyYWxEZXNjcmlwdG9yS2V5KGRlc2NyaXB0b3IpIHtcbiAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gTWV0aG9kXG4gICAgcmV0dXJuICdfX21ldGhvZF9fJztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbidcbiAgICAgIHx8IHR5cGVvZiBkZXNjcmlwdG9yLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFByb3BlcnR5IHdpdGggZ2V0dGVyIGFuZC9vciBzZXR0ZXJcbiAgICByZXR1cm4gJ19fcHJvcGVydHlfXyc7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuLypcbiAqIFJldHVybiB0cnVlIGlmIGMgaXMgYSBKYXZhU2NyaXB0IGNsYXNzLlxuICpcbiAqIFdlIHVzZSB0aGlzIHRlc3QgYmVjYXVzZSwgb24gV2ViS2l0LCBjbGFzc2VzIGxpa2UgSFRNTEVsZW1lbnQgYXJlIHNwZWNpYWwsXG4gKiBhbmQgYXJlIG5vdCBpbnN0YW5jZXMgb2YgRnVuY3Rpb24uIFRvIGhhbmRsZSB0aGF0IGNhc2UsIHdlIHVzZSBhIGxvb3NlclxuICogZGVmaW5pdGlvbjogYW4gb2JqZWN0IGlzIGEgY2xhc3MgaWYgaXQgaGFzIGEgcHJvdG90eXBlLCBhbmQgdGhhdCBwcm90b3R5cGVcbiAqIGhhcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgdGhlIG9yaWdpbmFsIG9iamVjdC4gVGhpcyBjb25kaXRpb24gaG9sZHMgdHJ1ZSBldmVuXG4gKiBmb3IgSFRNTEVsZW1lbnQgb24gV2ViS2l0LlxuICovXG5mdW5jdGlvbiBpc0NsYXNzKGMpIHtcbiAgcmV0dXJuIHR5cGVvZiBjID09PSAnZnVuY3Rpb24nIHx8ICAgICAgICAgICAgICAgICAgIC8vIFN0YW5kYXJkXG4gICAgICAoYy5wcm90b3R5cGUgJiYgYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPT09IGMpOyAvLyBIVE1MRWxlbWVudCBpbiBXZWJLaXRcbn1cblxuXG4vKlxuICogUmV0dXJuIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBlaXRoZXIgaGFzIHRoZSBnaXZlbiBwcm90b3R5cGUgb24gaXRzXG4gKiBjaGFpbi5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0SGFzUHJvdG90eXBlKG9iaiwgcHJvdG90eXBlKSB7XG4gIGlmIChwcm90b3R5cGUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgIC8vIFRoZSBwcm90b3R5cGUgaXMgYSBwbGFpbiBvYmplY3QuXG4gICAgLy8gT25seSBjYXNlIHRvIGRlZmVuZCBhZ2FpbnN0IGlzIHNvbWVvbmUgdHJ5aW5nIHRvIG1peGluIE9iamVjdCBpdHNlbGYuXG4gICAgcmV0dXJuIChwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUpO1xuICB9XG4gIGlmIChvYmogPT09IHByb3RvdHlwZSB8fCBvYmogaW5zdGFuY2VvZiBwcm90b3R5cGUuY29uc3RydWN0b3IpIHtcbiAgICAvLyBUaGUgcHJvdG90eXBlIHdhcyBmb3VuZCBhbG9uZyB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKlxuICogUmV0dXJuIHRydWUgaWYgdGhlIGdpdmVuIG1peGluIHdhcyB1c2VkIHRvIGNyZWF0ZSBhbnkgb2YgdGhlIHByb3RvdHlwZXMgb25cbiAqIG9uIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4uXG4gKi9cbmZ1bmN0aW9uIG9iamVjdEhhc01peGluKG9iaiwgbWl4aW4pIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgT1JJR0lOQUxfTUlYSU5fU1lNQk9MKTtcbiAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZSA9PT0gbWl4aW4pIHtcbiAgICAvLyBUaGUgZ2l2ZW4gbWl4aW4gd2FzLCBpbiBmYWN0LCBjb21wb3NlZCBpbnRvIHRoaXMgcHJvdG90eXBlIGNoYWluLlxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvYmplY3RIYXNNaXhpbihPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSwgbWl4aW4pO1xufVxuIiwiLyoqXG4gKiBTdGFuZGFyZCBjb21wb3NpdGlvbiBydWxlc1xuICovXG5cblxuLypcbiAqIERlZmF1bHQgcnVsZSBmb3IgY29tcG9zaW5nIG1ldGhvZHM6IGludm9rZSBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZU1ldGhvZEZpcnN0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBjb21wb3NlRnVuY3Rpb24oYmFzZUltcGxlbWVudGF0aW9uLCBtaXhpbkltcGxlbWVudGF0aW9uKTtcbn1cblxuXG4vKlxuICogRGVmYXVsdCBydWxlIGZvciBjb21wb3NpbmcgcHJvcGVydGllcy5cbiAqIFdlIG9ubHkgY29tcG9zZSBzZXR0ZXJzLCB3aGljaCBpbnZva2UgYmFzZSBmaXJzdCwgdGhlbiBtaXhpbi5cbiAqIEEgZGVmaW5lZCBtaXhpbiBnZXR0ZXIgb3ZlcnJpZGVzIGEgYmFzZSBnZXR0ZXIuXG4gKiBOb3RlIHRoYXQsIGJlY2F1c2Ugb2YgdGhlIHdheSBwcm9wZXJ0eSBkZXNjcmlwdG9ycyB3b3JrLCBpZiB0aGUgbWl4aW4gb25seVxuICogZGVmaW5lcyBhIHNldHRlciwgYnV0IG5vdCBhIGdldHRlciwgd2UgaGF2ZSB0byBzdXBwbHkgYSBkZWZhdWx0IGdldHRlciB0aGF0XG4gKiBpbnZva2VzIHRoZSBiYXNlIGdldHRlci4gU2ltaWxhcmx5LCBpZiB0aGUgbWl4aW4ganVzdCBkZWZpbmVzIGEgZ2V0dGVyLFxuICogd2UgaGF2ZSB0byBzdXBwbHkgYSBkZWZhdWx0IHNldHRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJhc2VTZXR0ZXJGaXJzdCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5TZXR0ZXIgPSBkZXNjcmlwdG9yLnNldDtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZVNldHRlciA9IGJhc2VEZXNjcmlwdG9yLnNldDtcbiAgaWYgKG1peGluU2V0dGVyICYmIGJhc2VTZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIHNldHRlcnMuXG4gICAgZGVzY3JpcHRvci5zZXQgPSBjb21wb3NlRnVuY3Rpb24oYmFzZVNldHRlciwgbWl4aW5TZXR0ZXIpO1xuICB9XG4gIGNvbXBsZXRlUHJvcGVydHlEZWZpbml0aW9uKGRlc2NyaXB0b3IsIGJhc2VEZXNjcmlwdG9yKTtcbn1cblxuXG4vKlxuICogVGFrZSB0d28gZnVuY3Rpb25zIGFuZCByZXR1cm4gYSBuZXcgY29tcG9zZWQgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGJvdGguXG4gKiBUaGUgY29tcG9zZWQgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgc2Vjb25kIGZ1bmN0aW9uLlxuICogVGhpcyBpcyBub3QgYSBydWxlLCBidXQgYSBoZWxwZXIgdXNlZCBieSBydWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VGdW5jdGlvbihmdW5jdGlvbjEsIGZ1bmN0aW9uMikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24xLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5cbi8qXG4gKiBDb21iaW5hdG9yIHRoYXQgc2V0cyB0aGUgcHJvdG90eXBlIG9mIGEgbWl4aW4gcHJvcGVydHkgdmFsdWUgdG8gYmUgdGhlXG4gKiBjb3JyZXNwb25kaW5nIHZhbHVlIG9uIHRoZSBiYXNlLiBUaGlzIGVmZmVjdGl2ZWx5IGRvZXMgYSBzaGFsbG93IG1lcmdlIG9mXG4gKiBvZiB0aGUgcHJvcGVydGllcywgd2l0aG91dCBjb3B5aW5nIGFueSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluUHJvdG90eXBlcyh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5WYWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpO1xuICBsZXQgYmFzZVZhbHVlID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihtaXhpblZhbHVlLCBiYXNlVmFsdWUpO1xufVxuXG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY29tcGxldGUgYSBwcm9wZXJ0eSBkZWZpbml0aW9uIGZvciBhIG1peGluLlxuICpcbiAqIERlZmF1bHQgSmF2YVNjcmlwdCBiZWhhdmlvciBpcyB0aGF0IGEgc3ViY2xhc3MgdGhhdCBkZWZpbmVzIGEgZ2V0dGVyIGJ1dCBub3RcbiAqIGEgc2V0dGVyIHdpbGwgbmV2ZXIgaGF2ZSB0aGUgYmFzZSBjbGFzcycgc2V0dGVyIGludm9rZWQuIFNpbWlsYXJseSwgYVxuICogc3ViY2xhc3MgdGhhdCBkZWZpbmVzIGEgc2V0dGVyIGJ1dCBub3QgYSBnZXR0ZXIgd2lsbCBuZXZlciBoYXZlIHRoZSBiYXNlXG4gKiBjbGFzcycgZ2V0dGVyIGludm9rZWQuXG4gKlxuICogRm9yIG1peGlucywgd2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBiZSB0aGF0LCBpZiBhIG1peGluIG9ubHkgZGVmaW5lc1xuICogYSBnZXR0ZXIsIGJ1dCB0aGUgYmFzZSBjbGFzcyBkZWZpbmVzIGEgc2V0dGVyLCB3ZSB3YW50IHRoZSBtaXhpbiB0byBhY3F1aXJlXG4gKiBhIGRlZmF1bHQgc2V0dGVyIHRoYW4gaW52b2tlcyB0aGUgYmFzZSBzZXR0ZXIuIExpa2V3aXNlLCB3ZSB3YW50IHRvIGRlZmluZVxuICogYSBkZWZhdWx0IGdldHRlciBpZiBub25lIGlzIHN1cHBsaWVkLlxuICpcbiAqIFRvIGNhcnJ5IHRoYXQgb3V0LCB0aGlzIGhlbHBlciBmdW5jdGlvbiByb3VuZHMgb3V0IGEgcHJvcGVydHkgZGVmaW5pdGlvbiB0b1xuICogZW5zdXJlIGl0IGhhcyBhIGRlZmF1bHQgZ2V0dGVyIG9yIHNldHRlciBpZiBpdCBuZWVkcyBvbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0ZVByb3BlcnR5RGVmaW5pdGlvbihkZXNjcmlwdG9yLCBiYXNlRGVzY3JpcHRvcikge1xuICBpZiAoZGVzY3JpcHRvci5nZXQgJiYgIWRlc2NyaXB0b3Iuc2V0ICYmIGJhc2VEZXNjcmlwdG9yLnNldCkge1xuICAgIC8vIE1peGluIGhhcyBnZXR0ZXIgYnV0IG5lZWRzIGEgZGVmYXVsdCBzZXR0ZXIuXG4gICAgbGV0IGJhc2VTZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5zZXQ7XG4gICAgZGVzY3JpcHRvci5zZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYmFzZVNldHRlci5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB9O1xuICB9XG4gIGlmIChkZXNjcmlwdG9yLnNldCAmJiAhZGVzY3JpcHRvci5nZXQgJiYgYmFzZURlc2NyaXB0b3IuZ2V0KSB7XG4gICAgLy8gTWl4aW4gaGFzIHNldHRlciBidXQgbmVlZHMgYSBkZWZhdWx0IGdldHRlci5cbiAgICBsZXQgYmFzZUdldHRlciA9IGJhc2VEZXNjcmlwdG9yLmdldDtcbiAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJhc2VHZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuICB9XG59XG5cblxuLypcbiAqIEhlbHBlciB0byByZXR1cm4gdGhlIGJhc2UgZGVzY3JpcHRvciBmb3IgdGhlIGluZGljYXRlZCBrZXkuIFRoaXMgaXMgdXNlZCB0b1xuICogZmluZCB0aGUgc3BlY2lmaWMgaW1wbGVtZW50YXRpb24gdGhhdCB3b3VsZCBvdGhlcndpc2UgYmUgb3ZlcnJpZGRlbiBieSB0aGVcbiAqIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgcmV0dXJuIGdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpO1xufVxuXG5cbi8qXG4gKiBMaWtlIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoKSwgYnV0IHdhbGtzIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gKiBUaGlzIGlzIG5lZWRlZCBieSBjb21wb3NpdGlvbiBydWxlcywgd2hpY2ggdXN1YWxseSBzdGFydCBvdXQgYnkgZ2V0dGluZ1xuICogdGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYSBtZW1iZXIgdGhleSdyZSBjb21wb3NpbmcuXG4gKiBUaGlzIGlzIG5vdCBhIHJ1bGUsIGJ1dCBhIGhlbHBlciB1c2VkIGJ5IHJ1bGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSkge1xuICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfSBlbHNlIHtcbiAgICBsZXQgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgLy8gQ2hlY2tpbmcgZm9yIFwibmFtZSBpbiBwcm90b3R5cGVcIiBsZXRzIHVzIGtub3cgd2hldGhlciB3ZSBzaG91bGQgYm90aGVyXG4gICAgLy8gd2Fsa2luZyB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIGlmIChwcm90b3R5cGUgJiYgbmFtZSBpbiBwcm90b3R5cGUpIHtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBuYW1lKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gTm90IGZvdW5kXG59XG5cblxuLypcbiAqIENvbWJpbmF0b3IgdGhhdCBjYXVzZXMgYSBtaXhpbiBtZXRob2QgdG8gb3ZlcnJpZGUgaXRzIGJhc2UgaW1wbGVtZW50YXRpb24uXG4gKiBTaW5jZSB0aGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBwcm90b3R5cGUgY2hhaW4sIHRoaXMgaXMgYSBuby1vcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG92ZXJyaWRlKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7fVxuXG5cbi8qXG4gKiBDb21wb3NlIG1ldGhvZHMsIGludm9raW5nIGJhc2UgaW1wbGVtZW50YXRpb24gZmlyc3QuIElmIGl0IHJldHVybnMgYVxuICogdHJ1dGh5IHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZCBpbW1lZGlhdGVseS4gT3RoZXJ3aXNlLCB0aGUgbWl4aW5cbiAqIGltcGxlbWVudGF0aW9uJ3MgcmVzdWx0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyQmFzZVJlc3VsdCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5JbXBsZW1lbnRhdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IGJhc2VEZXNjcmlwdG9yLnZhbHVlO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGJhc2VJbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHx8IG1peGluSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuXG4vKlxuICogTGlrZSBwcmVmZXJCYXNlUmVzdWx0LCBidXQgZm9yIGdldHRlci9zZXR0ZXJzLiBUaGUgYmFzZSBnZXR0ZXIgaXMgaW52b2tlZFxuICogZmlyc3QuIElmIGl0IHJldHVybnMgYSB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIHRoZSBtaXhpblxuICogZ2V0dGVyJ3MgcmVzdWx0IGlzIHJldHVybmVkLiBTZXR0ZXIgaXMgaW52b2tlZCBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyQmFzZUdldHRlcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5HZXR0ZXIgPSBkZXNjcmlwdG9yLmdldDtcbiAgbGV0IG1peGluU2V0dGVyID0gZGVzY3JpcHRvci5zZXQ7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VHZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5nZXQ7XG4gIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICBpZiAobWl4aW5HZXR0ZXIgJiYgYmFzZUdldHRlcikge1xuICAgIC8vIENvbXBvc2UgZ2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJhc2VHZXR0ZXIuYXBwbHkodGhpcykgfHwgbWl4aW5HZXR0ZXIuYXBwbHkodGhpcyk7XG4gICAgfTtcbiAgfVxuICBpZiAobWl4aW5TZXR0ZXIgJiYgYmFzZVNldHRlcikge1xuICAgIC8vIENvbXBvc2Ugc2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLnNldCA9IGNvbXBvc2VGdW5jdGlvbihiYXNlU2V0dGVyLCBtaXhpblNldHRlcik7XG4gIH1cbiAgY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpO1xufVxuXG5cbi8qXG4gKiBMaWtlIHByZWZlck1peGluUmVzdWx0LCBidXQgZm9yIGdldHRlci9zZXR0ZXJzLiBUaGUgbWl4aW4gZ2V0dGVyIGlzIGludm9rZWRcbiAqIGZpcnN0LiBJZiBpdCByZXR1cm5zIGEgdHJ1dGh5IHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlLCB0aGUgYmFzZVxuICogZ2V0dGVyJ3MgcmVzdWx0IGlzIHJldHVybmVkLiBTZXR0ZXIgaXMgc3RpbGwgaW52b2tlZCBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyTWl4aW5HZXR0ZXIodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluR2V0dGVyID0gZGVzY3JpcHRvci5nZXQ7XG4gIGxldCBtaXhpblNldHRlciA9IGRlc2NyaXB0b3Iuc2V0O1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlR2V0dGVyID0gYmFzZURlc2NyaXB0b3IuZ2V0O1xuICBsZXQgYmFzZVNldHRlciA9IGJhc2VEZXNjcmlwdG9yLnNldDtcbiAgaWYgKG1peGluR2V0dGVyICYmIGJhc2VHZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIGdldHRlcnMuXG4gICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtaXhpbkdldHRlci5hcHBseSh0aGlzKSB8fCBiYXNlR2V0dGVyLmFwcGx5KHRoaXMpO1xuICAgIH07XG4gIH1cbiAgaWYgKG1peGluU2V0dGVyICYmIGJhc2VTZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIHNldHRlcnMuXG4gICAgZGVzY3JpcHRvci5zZXQgPSBjb21wb3NlRnVuY3Rpb24oYmFzZVNldHRlciwgbWl4aW5TZXR0ZXIpO1xuICB9XG4gIGNvbXBsZXRlUHJvcGVydHlEZWZpbml0aW9uKGRlc2NyaXB0b3IsIGJhc2VEZXNjcmlwdG9yKTtcbn1cblxuXG4vKlxuICogQ29tcG9zZSBtZXRob2RzLCBpbnZva2luZyBtaXhpbiBpbXBsZW1lbnRhdGlvbiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhIHRydXRoeVxuICogcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkIGltbWVkaWF0ZWx5LiBPdGhlcndpc2UsIHRoZSBiYXNlIGltcGxlbWVudGF0aW9uJ3NcbiAqIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZlck1peGluUmVzdWx0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbWl4aW5JbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHx8IGJhc2VJbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cblxuLypcbiAqIFBlcmZvcm0gYSBzaGFsbG93IG1lcmdlIG9mIGEgbWl4aW4gcHJvcGVydHkgb24gdG9wIG9mIGEgYmFzZSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dNZXJnZSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5WYWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VWYWx1ZSA9IGJhc2VEZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgcmVzdWx0ID0ge307XG4gIGNvcHlQcm9wZXJ0aWVzKGJhc2VWYWx1ZSwgcmVzdWx0KTtcbiAgY29weVByb3BlcnRpZXMobWl4aW5WYWx1ZSwgcmVzdWx0KTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IHJlc3VsdDtcbn1cblxuXG4vKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNvcHkgcHJvcGVydGllcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlci5cbiAqL1xuZnVuY3Rpb24gY29weVByb3BlcnRpZXMoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgZGVzdGluYXRpb25ba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG59XG4iLCIvKlxuICogTWFyc2hhbGwgYXR0cmlidXRlcyB0byBwcm9wZXJ0aWVzIChhbmQgZXZlbnR1YWxseSB2aWNlIHZlcnNhKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoYmFzZSkgPT4gY2xhc3MgQXR0cmlidXRlTWFyc2hhbGxpbmcgZXh0ZW5kcyBiYXNlIHtcblxuICAvKlxuICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChzdXBlci5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2spIHsgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCk7IH1cbiAgICAvLyBJZiB0aGUgYXR0cmlidXRlIG5hbWUgY29ycmVzcG9uZHMgdG8gYSBwcm9wZXJ0eSBuYW1lLCB0aGVuIHNldCB0aGF0XG4gICAgLy8gcHJvcGVydHkuIElnbm9yZSBjaGFuZ2VzIGluIHN0YW5kYXJkIEhUTUxFbGVtZW50IHByb3BlcnRpZXMuXG4gICAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZVRvUHJvcGVydHlOYW1lKG5hbWUpO1xuICAgIGlmIChwcm9wZXJ0eU5hbWUgaW4gdGhpcyAmJiAhKHByb3BlcnR5TmFtZSBpbiBIVE1MRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHN1cGVyLmNyZWF0ZWRDYWxsYmFjaykgeyBzdXBlci5jcmVhdGVkQ2FsbGJhY2soKTsgfVxuICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmF0dHJpYnV0ZXMsIGF0dHJpYnV0ZSA9PiB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGUubmFtZSwgdW5kZWZpbmVkLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbn07XG5cblxuLy8gQ29udmVydCBjYW1lbCBjYXNlIGZvb0JhciBuYW1lIHRvIGh5cGhlbmF0ZWQgZm9vLWJhci5cbmZ1bmN0aW9uIGF0dHJpYnV0ZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZU5hbWUpIHtcbiAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZU5hbWUucmVwbGFjZSgvLShbYS16XSkvZywgbSA9PiBtWzFdLnRvVXBwZXJDYXNlKCkpO1xuICByZXR1cm4gcHJvcGVydHlOYW1lO1xufVxuXG4vLyBDb252ZXJ0IGh5cGhlbmF0ZWQgZm9vLWJhciBuYW1lIHRvIGNhbWVsIGNhc2UgZm9vQmFyLlxuZnVuY3Rpb24gcHJvcGVydHlUb0F0dHJpYnV0ZU5hbWUocHJvcGVydHlOYW1lKSB7XG4gIGxldCBhdHRyaWJ1dGVOYW1lID0gcHJvcGVydHlOYW1lLnJlcGxhY2UoLyhbYS16XVtBLVpdKS9nLCBnID0+IGdbMF0gKyAnLScgKyBnWzFdLnRvTG93ZXJDYXNlKCkpO1xuICByZXR1cm4gYXR0cmlidXRlTmFtZTtcbn1cbiIsIi8qXG4gKiBQb2x5bWVyLXN0eWxlIGF1dG9tYXRpYyBub2RlIGZpbmRpbmcuXG4gKiBTZWUgaHR0cHM6Ly93d3cucG9seW1lci1wcm9qZWN0Lm9yZy8xLjAvZG9jcy9kZXZndWlkZS9sb2NhbC1kb20uaHRtbCNub2RlLWZpbmRpbmcuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGJhc2UpID0+IGNsYXNzIEF1dG9tYXRpY05vZGVGaW5kaW5nIGV4dGVuZHMgYmFzZSB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGlmIChzdXBlci5jcmVhdGVkQ2FsbGJhY2spIHsgc3VwZXIuY3JlYXRlZENhbGxiYWNrKCk7IH1cbiAgICBpZiAodGhpcy5zaGFkb3dSb290KSB7XG4gICAgICB0aGlzLiQgPSB7fTtcbiAgICAgIHZhciBub2Rlc1dpdGhJZHMgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKG5vZGVzV2l0aElkcywgbm9kZSA9PiB7XG4gICAgICAgIHZhciBpZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICB0aGlzLiRbaWRdID0gbm9kZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKGJhc2UpID0+IGNsYXNzIENvbXBvc2FibGUgZXh0ZW5kcyBiYXNlIHtcblxuICBzdGF0aWMgY29tcG9zZSguLi5taXhpbnMpIHtcbiAgICAvLyBXZSBjcmVhdGUgYSBuZXcgc3ViY2xhc3MgZm9yIGVhY2ggbWl4aW4gaW4gdHVybi4gVGhlIHJlc3VsdCBiZWNvbWVzXG4gICAgLy8gdGhlIGJhc2UgY2xhc3MgZXh0ZW5kZWQgYnkgYW55IHN1YnNlcXVlbnQgbWl4aW5zLiBJdCB0dXJucyBvdXQgdGhhdFxuICAgIC8vIHdlIGNhbiB1c2UgQXJyYXkucmVkdWNlKCkgdG8gY29uY2lzZWx5IGV4cHJlc3MgdGhpcywgdXNpbmcgdGhlIGN1cnJlbnRcbiAgICAvLyBvYmplY3QgYXMgdGhlIHNlZWQgZm9yIHJlZHVjZSgpLlxuICAgIHJldHVybiBtaXhpbnMucmVkdWNlKGNvbXBvc2VDbGFzcywgdGhpcyk7XG4gIH1cblxufTtcblxuXG4vLyBQcm9wZXJ0aWVzIGRlZmluZWQgYnkgT2JqZWN0IHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBtaXhpbi5cbmNvbnN0IE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTID0gW1xuICAnY29uc3RydWN0b3InXG5dO1xuXG4vKlxuICogQXBwbHkgdGhlIG1peGluIHRvIHRoZSBnaXZlbiBiYXNlIGNsYXNzIHRvIHJldHVybiBhIG5ldyBjbGFzcy5cbiAqIFRoZSBtaXhpbiBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtb2RpZmllZCBjbGFzcywgb3IgYVxuICogcGxhaW4gb2JqZWN0IHdob3NlIG1lbWJlcnMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIG5ldyBjbGFzcycgcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBjb21wb3NlQ2xhc3MoYmFzZSwgbWl4aW4pIHtcbiAgaWYgKHR5cGVvZiBtaXhpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIE1peGluIGZ1bmN0aW9uXG4gICAgcmV0dXJuIG1peGluKGJhc2UpO1xuICB9IGVsc2Uge1xuICAgIC8vIE1peGluIG9iamVjdFxuICAgIGNsYXNzIFN1YmNsYXNzIGV4dGVuZHMgYmFzZSB7fVxuICAgIGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCBTdWJjbGFzcy5wcm90b3R5cGUsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgICByZXR1cm4gU3ViY2xhc3M7XG4gIH1cbn1cblxuXG4vKlxuICogQ29weSB0aGUgZ2l2ZW4gcHJvcGVydGllcy9tZXRob2RzIHRvIHRoZSB0YXJnZXQuXG4gKiBSZXR1cm4gdGhlIHVwZGF0ZWQgdGFyZ2V0LlxuICovXG5mdW5jdGlvbiBjb3B5T3duUHJvcGVydGllcyhzb3VyY2UsIHRhcmdldCwgaWdub3JlUHJvcGVydHlOYW1lcyA9IFtdKSB7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICBpZiAoaWdub3JlUHJvcGVydHlOYW1lcy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiLypcbiAqIEEgc2FtcGxlIGdlbmVyYWwtcHVycG9zZSBiYXNlIGNsYXNzIGZvciBkZWZpbmluZyBjdXN0b20gZWxlbWVudHMgdGhhdCBtaXhlc1xuICogaW4gc29tZSBjb21tb24gZmVhdHVyZXM6IHRlbXBsYXRlIHN0YW1waW5nIGludG8gYSBzaGFkb3cgcm9vdCwgYXV0b21hdGljIG5vZGVcbiAqIGZpbmRpbmcsIGFuZCBtYXJzaGFsbGluZyBiZXR3ZWVuIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnRpZXMuXG4gKi9cblxuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICcuL0NvbXBvc2FibGUnO1xuaW1wb3J0IFRlbXBsYXRlU3RhbXBpbmcgZnJvbSAnLi9UZW1wbGF0ZVN0YW1waW5nJztcbmltcG9ydCBBdXRvbWF0aWNOb2RlRmluZGluZyBmcm9tICcuL0F1dG9tYXRpY05vZGVGaW5kaW5nJztcbmltcG9ydCBBdHRyaWJ1dGVNYXJzaGFsbGluZyBmcm9tICcuL0F0dHJpYnV0ZU1hcnNoYWxsaW5nJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50QmFzZSBleHRlbmRzIENvbXBvc2FibGUoSFRNTEVsZW1lbnQpLmNvbXBvc2UoXG4gIFRlbXBsYXRlU3RhbXBpbmcsICAgICAvLyBiZWZvcmUgbm9kZSBmaW5kaW5nLCBzbyBzaGFkb3cgcm9vdCBpcyBwb3B1bGF0ZWRcbiAgQXV0b21hdGljTm9kZUZpbmRpbmcsIC8vIGJlZm9yZSBtYXJzaGFsbGluZywgc28gbWFyc2hhbGxlZCBwcm9wZXJ0aWVzIGNhbiB1c2UgaXRcbiAgQXR0cmlidXRlTWFyc2hhbGxpbmdcbikge1xuXG4gIC8qXG4gICAqIERlYnVnZ2luZyB1dGlsaXR5OiBsb2dzIGEgbWVzc2FnZSwgcHJlZml4ZWQgYnkgdGhlIGNvbXBvbmVudCdzIHRhZy5cbiAgICovXG4gIGxvZyh0ZXh0KSB7XG4gICAgaWYgKHN1cGVyLmxvZykgeyBzdXBlci5sb2codGV4dCk7IH1cbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmxvY2FsTmFtZX06ICR7dGV4dH1gKTtcbiAgfVxuXG59XG4iLCIvKlxuICogRWxlbWVudCBleHRlbnNpb24gZm9yIHRlbXBsYXRlIHN0YW1waW5nLiBJZiBhIGNvbXBvbmVudCBkZWZpbmVzIGEgdGVtcGxhdGVcbiAqIHByb3BlcnR5IChhcyBhIHN0cmluZyBvciByZWZlcmVuY2luZyBhIEhUTUwgdGVtcGxhdGUpLCB3aGVuIHRoZSBjb21wb25lbnRcbiAqIGNsYXNzIGlzIGluc3RhbnRpYXRlZCwgYSBzaGFkb3cgcm9vdCB3aWxsIGJlIGNyZWF0ZWQgb24gdGhlIGluc3RhbmNlLCBhbmRcbiAqIHRoZSBjb250ZW50cyBvZiB0aGUgdGVtcGxhdGUgd2lsbCBiZSBjbG9uZWQgaW50byB0aGUgc2hhZG93IHJvb3QuXG4gKlxuICogRm9yIHRoZSB0aW1lIGJlaW5nLCB0aGlzIGV4dGVuc2lvbiByZXRhaW5zIHN1cHBvcnQgZm9yIFNoYWRvdyBET00gdjAuXG4gKiBUaGF0IHdpbGwgZXZlbnR1YWxseSBiZSBkZXByZWNhdGVkIGFzIGJyb3dzZXJzIGltcGxlbWVudCBTaGFkb3cgRE9NIHYxLlxuICovXG5cblxuZXhwb3J0IGRlZmF1bHQgKGJhc2UpID0+IGNsYXNzIFRlbXBsYXRlU3RhbXBpbmcgZXh0ZW5kcyBiYXNlIHtcblxuICAvKlxuICAgKiBJZiB0aGUgY29tcG9uZW50IGRlZmluZXMgYSB0ZW1wbGF0ZSwgYSBzaGFkb3cgcm9vdCB3aWxsIGJlIGNyZWF0ZWQgb24gdGhlXG4gICAqIGNvbXBvbmVudCBpbnN0YW5jZSwgYW5kIHRoZSB0ZW1wbGF0ZSBzdGFtcGVkIGludG8gaXQuXG4gICAqL1xuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHN1cGVyLmNyZWF0ZWRDYWxsYmFjaykgeyBzdXBlci5jcmVhdGVkQ2FsbGJhY2soKTsgfVxuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gICAgLy8gVE9ETzogU2F2ZSB0aGUgcHJvY2Vzc2VkIHRlbXBsYXRlIHdpdGggdGhlIGNvbXBvbmVudCdzIGNsYXNzIHByb3RvdHlwZVxuICAgIC8vIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBwcm9jZXNzZWQgd2l0aCBldmVyeSBpbnN0YW50aWF0aW9uLlxuICAgIGlmICh0ZW1wbGF0ZSkge1xuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBVcGdyYWRlIHBsYWluIHN0cmluZyB0byByZWFsIHRlbXBsYXRlLlxuICAgICAgICB0ZW1wbGF0ZSA9IGNyZWF0ZVRlbXBsYXRlV2l0aElubmVySFRNTCh0ZW1wbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChVU0lOR19TSEFET1dfRE9NX1YwKSB7XG4gICAgICAgIHBvbHlmaWxsU2xvdFdpdGhDb250ZW50KHRlbXBsYXRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5TaGFkb3dET01Qb2x5ZmlsbCkge1xuICAgICAgICBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRoaXMubG9jYWxOYW1lKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcy5sb2coXCJjbG9uaW5nIHRlbXBsYXRlIGludG8gc2hhZG93IHJvb3RcIik7XG4gICAgICBsZXQgcm9vdCA9IFVTSU5HX1NIQURPV19ET01fVjAgP1xuICAgICAgICB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKSA6ICAgICAgICAgICAgIC8vIFNoYWRvdyBET00gdjBcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7ICAvLyBTaGFkb3cgRE9NIHYxXG4gICAgICBsZXQgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgcm9vdC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgfVxuICB9XG5cbn07XG5cblxuLy8gRmVhdHVyZSBkZXRlY3Rpb24gZm9yIG9sZCBTaGFkb3cgRE9NIHYwLlxuY29uc3QgVVNJTkdfU0hBRE9XX0RPTV9WMCA9ICh0eXBlb2YgSFRNTEVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZVNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnKTtcblxuXG4vLyBDb252ZXJ0IGEgcGxhaW4gc3RyaW5nIG9mIEhUTUwgaW50byBhIHJlYWwgdGVtcGxhdGUgZWxlbWVudC5cbmZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlV2l0aElubmVySFRNTChpbm5lckhUTUwpIHtcbiAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgLy8gUkVWSUVXOiBJcyB0aGVyZSBhbiBlYXNpZXIgd2F5IHRvIGRvIHRoaXM/XG4gIC8vIFdlJ2QgbGlrZSB0byBqdXN0IHNldCBpbm5lckhUTUwgb24gdGhlIHRlbXBsYXRlIGNvbnRlbnQsIGJ1dCBzaW5jZSBpdCdzXG4gIC8vIGEgRG9jdW1lbnRGcmFnbWVudCwgdGhhdCBkb2Vzbid0IHdvcmsuXG4gIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgd2hpbGUgKGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICB0ZW1wbGF0ZS5jb250ZW50LmFwcGVuZENoaWxkKGRpdi5jaGlsZE5vZGVzWzBdKTtcbiAgfVxuICByZXR1cm4gdGVtcGxhdGU7XG59XG5cbi8vIFJlcGxhY2Ugb2NjdXJlbmNlcyBvZiB2MSBzbG90IGVsZW1lbnRzIHdpdGggdjAgY29udGVudCBlbGVtZW50cy5cbi8vIFRoaXMgZG9lcyBub3QgeWV0IG1hcCBuYW1lZCBzbG90cyB0byBjb250ZW50IHNlbGVjdCBjbGF1c2VzLlxuZnVuY3Rpb24gcG9seWZpbGxTbG90V2l0aENvbnRlbnQodGVtcGxhdGUpIHtcbiAgW10uZm9yRWFjaC5jYWxsKHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc2xvdCcpLCBzbG90RWxlbWVudCA9PiB7XG4gICAgbGV0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpO1xuICAgIHNsb3RFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbnRlbnRFbGVtZW50LCBzbG90RWxlbWVudCk7XG4gIH0pO1xufVxuXG4vLyBJbnZva2UgYmFzaWMgc3R5bGUgc2hpbW1pbmcgd2l0aCBTaGFkb3dDU1MuXG5mdW5jdGlvbiBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRhZykge1xuICBXZWJDb21wb25lbnRzLlNoYWRvd0NTUy5zaGltU3R5bGluZyh0ZW1wbGF0ZS5jb250ZW50LCB0YWcpO1xufVxuIl19
