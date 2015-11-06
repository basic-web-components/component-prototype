(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

// We'd like to just subclass ElementBase, but then we won't have access to
// this.ListBox.super. That only gets created by Extensible.extend(), so we have
// to manually invoke that. We could fix that if we could implement a component
// constructor, but currently document.registerElement() in Blink doesn't invoke
// a component constructor.
//class ListBox extends ElementBase {

class ListBox {

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

exports.default = ListBox; // See notes above for class declaration.
/*
 * basic-list-box
 */

exports.default = ListBox = _ElementBase2.default.extend(_Super2.default, _ChildrenContent2.default, _ClickSelection2.default, _ContentItems2.default, _DirectionSelection2.default, _Generic2.default, _ItemSelection2.default, _ItemsAccessible2.default, _Keyboard2.default, _KeyboardDirection2.default, _KeyboardPaging2.default, _KeyboardPrefixSelection2.default, _SelectionHighlight2.default, _SelectionScroll2.default, ListBox);

document.registerElement('basic-list-box', ListBox);

},{"../../mixins/ChildrenContent":4,"../../mixins/ClickSelection":5,"../../mixins/ContentItems":6,"../../mixins/DirectionSelection":7,"../../mixins/Generic":8,"../../mixins/ItemSelection":9,"../../mixins/ItemsAccessible":10,"../../mixins/Keyboard":11,"../../mixins/KeyboardDirection":12,"../../mixins/KeyboardPaging":13,"../../mixins/KeyboardPrefixSelection":14,"../../mixins/SelectionHighlight":15,"../../mixins/SelectionScroll":16,"./Super":2,"element-base/src/ElementBase":20}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * These helpers probably should go in Extensible.
 * Because this prototype is the first set of components that need these
 * helpers, they're here for now.
 */

class Super {

  // As of 11/3/2015, Safari 9 doesn't yet support ES6 "..." spread operator.
  // superCall(prototype, method, ...args) {
  superCall(prototype, method) {
    let base = prototype.super[method];
    if (base) {
      let args = [].slice.call(arguments, 2); // For Safari 9
      return base.apply(this, args);
    }
  }

  superGet(prototype, property) {
    // TODO: Standards-compliant way to find getter.
    let base = prototype.super.__lookupGetter__(property);
    if (base) {
      return base.call(this);
    }
  }

  superSet(prototype, property, value) {
    // TODO: Standards-compliant way to find setter.
    let base = prototype.super.__lookupSetter__(property);
    if (base) {
      base.call(this, value);
    }
  }

}
exports.default = Super;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function greet() {
  console.log(`Hello, world.`);
}

exports.default = greet;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Lets a component collective takes as its content the children of the
 * innermost aspect.
 *
 * @element basic-children-content
 *
 */

// TODO: Don't respond to changes in attributes, or at least offer that as an
// option.

class ChildrenContent {

  createdCallback() {
    this.superCall(this.ChildrenContent, 'createdCallback');

    // Until we have content observing again, force a call to contentChanged().
    // HACK: Do this asynchronously, so other mixins have a chance to set up
    // before this call.
    setTimeout(() => this.contentChanged());
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

  contentChanged() {
    this.superCall(this.ChildrenContent, 'contentChanged');

    let outermost = this.outermostAttached;
    if (outermost) {
      let event = new CustomEvent('content-changed', {
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
  get content() {
    // if (!this._content) {
    //   let innermost = this.collective.innermostElement;
    //   if (innermost) {
    //     this._content = Basic.ContentHelpers.flattenChildren(innermost);
    //   }
    // }
    // return this._content;
    return this.children;
  }

}exports.default = ChildrenContent;
;

// ready() {
//   // HACK: Ensure targetChanged (also) happens after ready.
//   this.targetChanged(this.target);
// }

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which maps a click to item selection.
 *
 * @element basic-click-selection
 */

class ClickSelection {

  createdCallback() {
    this.superCall(this.ClickSelection, 'createdCallback');

    /*
     * REVIEW: Which event should we listen to here?
     *
     * The standard use for this aspect is in list boxes. List boxes don't
     * appear to be consistent with regard to whether they select on mousedown
     * or click/mouseup.
     */
    this.addEventListener('mousedown', event => {
      selectTarget(this, event.target);
      // Note: We don't call preventDefault here. The default behavior for
      // mousedown includes setting keyboard focus if the element doesn't
      // already have the focus, and we want to preserve that behavior.
      event.stopPropagation();
    });
  }

  // Default implementation. This will typically be handled by other aspects
  // in the collective.
  // set selectedIndex(index) {}

}

exports.default = ClickSelection; // TODO: Handle the case where a list item has subelements. Walk up the DOM
// hierarchy until we find an item in the list, or come back to this element,
// in which case the element that was tapped isn't an item (and should be
// ignored).

function selectTarget(element, target) {
  let index = element.indexOfItem && element.indexOfItem(target);
  if (index >= 0) {
    element.selectedIndex = index;
  }
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect that lets a component collective DOM content as list items.
 *
 * Auxiliary elements which are not normally visible are filtered out. For now,
 * For now, these are: link, script, style, and template.
 *
 * @element basic-content-items
 */

class ContentItems {

  applySelection(item, selected) {
    this.superCall(this.ContentItems, 'applySelection', item, selected);
    item.classList.toggle('selected', selected);
  }

  contentChanged() {
    this.superCall(this.ContentItems, 'contentChanged');
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
  indexOfItem(item) {
    return this.items.indexOf(item);
  }

  // Default implementation does nothing. This will typically be handled by
  // other aspects in the collective.
  // itemAdded: Basic.Collective.defaultMethod,
  itemAdded(item) {
    this.superCall(this.ContentItems, 'itemAdded', item);
  }

  itemsChanged() {
    this.superCall(this.ContentItems, 'itemsChanged');

    // Perform per-item initialization.
    this.items.forEach(item => {
      if (!item._itemInitialized) {
        // BUG: If an aspect is assimilated after ContentItems, then all the
        // items are already initialized, and the new aspect won't have an
        // opportunity to do its own per-item initialization in itemAdded.
        this.itemAdded(item);
        item._itemInitialized = true;
      }
    });

    let outermost = this.outermostAttached;
    if (outermost) {
      let event = new CustomEvent('items-changed', {
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
  get items() {
    if (this._items == null) {
      this._items = filterAuxiliaryElements(this.content);
    }
    return this._items;
  }

}

exports.default = ContentItems; // Return the given elements, filtering out auxiliary elements that aren't
// typically visible. Items which are not elements are returned as is.

function filterAuxiliaryElements(items) {
  let auxiliaryTags = ['link', 'script', 'style', 'template'];
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which maps direction semantics (goLeft, goRight, etc.) to selection
 * semantics (selectPrevious, selectNext, etc.).
 *
 * @element basic-direction-selection
 */

class DirectionSelection {

  goDown() {
    this.superCall(this.DirectionSelection, 'goDown');
    return this.selectNext();
  }

  goEnd() {
    this.superCall(this.DirectionSelection, 'goEnd');
    return this.selectLast();
  }

  goLeft() {
    this.superCall(this.DirectionSelection, 'goLeft');
    return this.selectPrevious();
  }

  goRight() {
    this.superCall(this.DirectionSelection, 'goRight');
    return this.selectNext();
  }

  goStart() {
    this.superCall(this.DirectionSelection, 'goStart');
    return this.selectFirst();
  }

  goUp() {
    this.superCall(this.DirectionSelection, 'goUp');
    return this.selectPrevious();
  }

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  selectFirst() {
    return this.superCall(this.DirectionSelection, 'selectFirst');
  }

  selectLast() {
    return this.superCall(this.DirectionSelection, 'selectLast');
  }

  selectNext() {
    return this.superCall(this.DirectionSelection, 'selectNext');
  }

  selectPrevious() {
    return this.superCall(this.DirectionSelection, 'selectPrevious');
  }

}
exports.default = DirectionSelection;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

class Generic {

  createdCallback() {
    this.superCall(this.Generic, 'createdCallback');
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
  get generic() {
    return this._generic;
  }

  // We roll our own attribute setting so that an explicitly false value shows
  // up as generic="false".
  set generic(value) {
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

}exports.default = Generic;
;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

class ItemSelection {

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  applySelection(item, selected) {
    this.superCall(this.ItemSelection, 'applySelection', item, selected);
  }

  get canSelectNext() {
    return this._canSelectNext;
  }
  set canSelectNext(canSelectNext) {
    this._canSelectNext = canSelectNext;
  }

  get canSelectPrevious() {
    return this._canSelectPrevious;
  }
  set canSelectPrevious(canSelectPrevious) {
    this._canSelectPrevious = canSelectPrevious;
  }

  itemAdded(item) {
    this.superCall(this.ItemSelection, 'itemAdded');
    this.applySelection(item, item === this.selectedItem);
  }

  itemsChanged() {
    this.superCall(this.ItemSelection, 'itemsChanged');
    let index = this.items.indexOf(this.selectedItem);
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
  get selectedIndex() {
    let selectedItem = this.selectedItem;

    if (selectedItem == null) {
      return -1;
    }

    // TODO: Memoize
    let index = this.indexOfItem(selectedItem);

    // If index = -1, selection wasn't found. Most likely cause is that the
    // DOM was manipulated from underneath us.
    // TODO: Once we track content changes, turn this into an exception.
    return index;
  }

  set selectedIndex(index) {
    this.superSet(this.ItemSelection, 'selectedIndex', index);

    let items = this.items;
    let item;
    if (index < 0 || items.length === 0) {
      item = null;
    } else {
      item = items[index];
    }
    this.selectedItem = item;

    let outermost = this.outermostAttached;
    if (outermost) {
      let event = new CustomEvent('selected-index-changed', {
        bubbles: true,
        detail: {
          selectedIndex: index,
          value: index // for Polymer binding
        }
      });
      outermost.dispatchEvent(event);
    }
  }

  get selectedItem() {
    return this._selectedItem;
  }

  /**
   * The currently selected item, or null if there is no selection.
   *
   * @property selectedItem
   * @type Object
   */
  // TODO: Confirm item is in items before selecting.
  set selectedItem(item) {
    this.superSet(this.ItemSelection, 'selectedItem', item);

    let previousItem = this._selectedItem;
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
    let index = this.indexOfItem(item);
    updatePossibleNavigations(this, index);

    let outermost = this.outermostAttached;
    if (outermost) {
      let event = new CustomEvent('selected-item-changed', {
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

  /**
   * Select the first item in the list.
   *
   * @method selectFirst
   */
  selectFirst() {
    return selectIndex(this, 0);
  }

  /**
   * True if the list should always have a selection (if it has items).
   *
   * @property selectionRequired
   * @type Boolean
   */
  get selectionRequired() {
    return this._selectionRequired;
  }
  set selectionRequired(selectionRequired) {
    this._selectionRequired = selectionRequired;
    ensureSelection(this);
  }

  /**
   * Select the last item in the list.
   *
   * @method selectLast
   */
  selectLast() {
    return selectIndex(this, this.items.length - 1);
  }

  /**
   * Select the next item in the list.
   *
   * @method selectNext
   */
  selectNext() {
    return selectIndex(this, this.selectedIndex + 1);
  }

  /**
   * Select the previous item in the list.
   *
   * @method selectPrevious
   */
  selectPrevious() {
    return selectIndex(this, this.selectedIndex - 1);
  }

}

exports.default = ItemSelection; // If no item is selected, select a default item.
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
  let boundedIndex = Math.max(Math.min(index, element.items.length - 1), 0);
  let previousIndex = element.selectedIndex;
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
  let canSelectNext;
  let canSelectPrevious;
  let items = element.items;
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which adds ARIA roles for lists and list items.
 *
 * @element basic-accessible-list
 */

// Used to assign unique IDs to item elements without IDs.
let idCount = 0;

class ItemsAccessible {

  applySelection(item, selected) {
    this.superCall(this.ItemsAccessible, 'applySelection', item, selected);
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

  createdCallback() {
    this.superCall(this.ItemsAccessible, 'createdCallback');

    let outermost = this.outermostAttached;
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

  itemAdded(item) {
    this.superCall(this.ItemsAccessible, 'itemAdded', item);
    item.setAttribute('role', 'option');

    // Ensure each item has an ID so we can set aria-activedescendant on the
    // overall list whenever the selection changes.
    if (!item.getAttribute('id')) {
      item.setAttribute('id', this.itemBaseId + idCount++);
    }
  }

  get selectedItem() {
    return this.superGet(this.ItemsAccessible, 'selectedItem');
  }
  set selectedItem(item) {
    this.superSet(this.ItemsAccessible, 'selectedItem', item);
    // Catch the case where the selection is removed.
    if (item == null) {
      this.outermostAttached.removeAttribute('aria-activedescendant');
    }
  }

}
exports.default = ItemsAccessible;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which manages the keyboard focus and keydown handling for a component
 * collective.
 *
 * This aspect ensures that its only the outermost aspect in a collective that is
 * listening for keyboard events.
 *
 * @element basic-keyboard
 */

class Keyboard {

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

  createdCallback() {
    this.superCall(this.Keyboard, 'createdCallback');
    this.addEventListener('keydown', event => {
      let handled = this.keydown(event);
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
    this.setAttribute('tabIndex', 0);
  }

  // Default keydown handler. This will typically be handled by other aspects
  // in the collective.
  keydown(event) {
    return this.superCall(this.Keyboard, 'keydown', event);
  }

}
exports.default = Keyboard;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which maps direction keys (Left, Right, etc.) to direction semantics
 * (goLeft, goRight, etc.).
 *
 * @element basic-keyboard-direction
 */

class KeyboardDirection {

  // Default implementations. These will typically be handled by other aspects
  // in the collective.
  goDown() {
    return this.superCall(this.KeyboardDirection, 'goDown');
  }

  goEnd() {
    return this.superCall(this.KeyboardDirection, 'goEnd');
  }

  goLeft() {
    return this.superCall(this.KeyboardDirection, 'goLeft');
  }

  goRight() {
    return this.superCall(this.KeyboardDirection, 'goRight');
  }

  goStart() {
    return this.superCall(this.KeyboardDirection, 'goStart');
  }

  goUp() {
    return this.superCall(this.KeyboardDirection, 'goUp');
  }

  keydown(event) {
    let handled = this.superCall(this.KeyboardDirection, 'keydown', event);
    if (!handled) {
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
    }
    return handled;
  }

}
exports.default = KeyboardDirection;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
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

class KeyboardPaging {

  keydown(event) {
    let handled = this.superCall(this.KeyboardPaging, 'keydown', event);
    if (!handled) {
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
    }
    return handled;
  }

  /**
   * Scroll down one page.
   *
   * @method pageDown
   */
  pageDown() {
    this.superCall(this.KeyboardPaging, 'pageDown');
    return scrollOnePage(this, true);
  }

  /**
   * Scroll up one page.
   *
   * @method pageUp
   */
  pageUp() {
    this.superCall(this.KeyboardPaging, 'pageUp');
    return scrollOnePage(this, false);
  }

}

exports.default = KeyboardPaging; // Return the item whose content spans the given y position (relative to the
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

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Handle list box-style prefix typing, in which the user can type a string to
 * select the first item that begins with that string.
 *
 * @element basic-keyboard-prefix-selection
 *
 */

// TODO: If the selection is changed by some other means (e.g., arrow keys) other
// than prefix typing, then that act should reset the prefix.

class KeyboardPrefixSelection {

  // itemsChanged() {
  //   this._itemTextContents = null;
  //   resetTypedPrefix(this);
  // }

  keydown(event) {
    let handled = this.superCall(this.KeyboardPrefixSelection, 'keydown', event);
    if (!handled) {
      let resetPrefix = true;

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
    }
    return handled;
  }

  /**
   * Select the first item whose text content begins with the given prefix.
   *
   * @method selectItemWithTextPrefix
   * @param prefix [String] The string to search for
   */
  selectItemWithTextPrefix(prefix) {
    if (prefix == null || prefix.length === 0) {
      return;
    }
    let index = getIndexOfItemWithTextPrefix(this, prefix);
    if (index >= 0) {
      this.selectedIndex = index;
    }
  }

}

exports.default = KeyboardPrefixSelection; // Time in milliseconds after which the user is considered to have stopped
// typing.

const PREFIX_TIMEOUT_DURATION = 1000;

// Return the index of the first item with the given prefix, else -1.
function getIndexOfItemWithTextPrefix(element, prefix) {
  let itemTextContents = getItemTextContents(element);
  let prefixLength = prefix.length;
  for (let i = 0; i < itemTextContents.length; i++) {
    let itemTextContent = itemTextContents[i];
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
    let items = element.items;
    element._itemTextContents = items.map(child => {
      let text = child.textContent || child.alt;
      return text.toLowerCase();
    });
  }
  return element._itemTextContents;
}

function handleBackspace(element) {
  let length = element._typedPrefix ? element._typedPrefix.length : 0;
  if (length > 0) {
    element._typedPrefix = element._typedPrefix.substr(0, length - 1);
  }
  element.selectItemWithTextPrefix(element._typedPrefix);
  element._setPrefixTimeout();
}

function handlePlainCharacter(element, char) {
  let prefix = element._typedPrefix || '';
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
  element._prefixTimeout = setTimeout(() => {
    resetTypedPrefix(element);
  }, PREFIX_TIMEOUT_DURATION);
}

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which applies standard highlight colors to a selected item.
 *
 * @element basic-selection-highlight
 */

class SelectionHighlight {

  applySelection(item, selected) {
    this.superCall(this.SelectionHighlight, 'applySelection', item, selected);
    item.style.backgroundColor = selected ? 'highlight' : '';
    item.style.color = selected ? 'highlighttext' : '';
  }

}
exports.default = SelectionHighlight;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which scrolls a container to keep the selected item visible.
 *
 * @element basic-selection-scroll
 */

class SelectionScroll {

  get selectedItem() {
    return this.superGet(this.SelectionScroll, 'selectedItem');
  }
  set selectedItem(item) {
    this.superSet(this.SelectionScroll, 'selectedItem', item);
    if (item) {
      // Keep the selected item in view.
      this.scrollItemIntoView(item);
    }
  }

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
  scrollItemIntoView(item) {
    this.superCall(this.SelectionScroll, 'scrollItemIntoView');

    // Get the relative position of the item with respect to the top of the
    // list's scrollable canvas. An item at the top of the list will have a
    // elementTop of 0.

    let innermost = this.innermostAttached;
    if (!innermost) {
      return;
    }

    let elementTop = item.offsetTop - innermost.offsetTop - innermost.clientTop;
    let elementBottom = elementTop + item.offsetHeight;
    // Determine the bottom of the scrollable canvas.
    let scrollBottom = innermost.scrollTop + innermost.clientHeight;
    if (elementBottom > scrollBottom) {
      // Scroll up until item is entirely visible.
      innermost.scrollTop += elementBottom - scrollBottom;
    } else if (elementTop < innermost.scrollTop) {
      // Scroll down until item is entirely visible.
      innermost.scrollTop = elementTop;
    }
  }

}
exports.default = SelectionScroll;

},{}],17:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Extend classes/objects with other classes/objects.
 */

var Extensible = (function () {
  function Extensible() {
    _classCallCheck(this, Extensible);
  }

  _createClass(Extensible, null, [{
    key: 'extend',

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
     *   MyBaseClass.extend(Extension1, Extension2, Extension3)
     *
     * will return a new class of MyBaseClass that implements all the methods in
     * the three extensions given. The above is equivalent to
     *
     *   MyBaseClass.extend(Extension1).extend(Extension2).extend(Extension3)
     *
     * This method can be statically invoked to extend plain objects:
     *
     *   let extended = Extensible.extend.call(obj1, obj2);
     *
     */
    value: function extend() {
      for (var _len = arguments.length, extensions = Array(_len), _key = 0; _key < _len; _key++) {
        extensions[_key] = arguments[_key];
      }

      // We create a new subclass for each extension in turn. The result becomes
      // the base class extended by any subsequent extensions. It turns out that
      // we can use Array.reduce() to concisely express this, using the current
      // (original) class as the seed for reduce().
      return extensions.reduce(_extend, this);
    }
  }]);

  return Extensible;
})();

/*
 * All Extensible-created objects keep references to the extensions that were
 * applied to create them. When a *named* extension is applied to the prototype
 * chain, the resulting object (or, for a class, the class' prototype) will
 * have a new member with that name that points back to the same object.
 * That facility is useful when dealing with chains that have been extended
 * more than once, as an extension's name is sufficient to retrieve a reference
 * to that point in the prototype chain.
 *
 * A single extension can be applied to multiple prototype chains -- the name
 * refers to the prototype on *this particular prototype chain* that was added
 * for that extension. This lets extension/mixin code get back to its own
 * prototype, most often in combination with "super" (see below) in order to
 * invoke superclass behavior.
 */

Extensible.prototype.Extensible = Extensible.prototype;

/*
 * All Extensible-created objects have a "super" property that references the
 * prototype above them in the prototype chain.
 *
 * This "super" reference is used as a replacement for ES6's "super" keyword in
 * in ES5 (or transpiled ES6) extensions/mixins
 * that want to invoke superclass behavior, where the specific superclass will
 * depend upon which extensions have been applied to a given prototype chain.
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
 * For consistency, Extensible itself records its own superclass as Object.
 */
Extensible.prototype.super = Object.prototype;

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
 * the members of the indicated extension.
 */
function _extend(base, extension) {

  // Check whether the base and extension are classes or plain objects.
  var baseIsClass = isClass(base);
  var extensionIsClass = isClass(extension);

  // Check to see if the *extension* has a base class/prototype of its own.
  var extensionBase = extensionIsClass ? Object.getPrototypeOf(extension.prototype).constructor : Object.getPrototypeOf(extension);
  if (extensionBase && extensionBase !== Function && extensionBase !== Object) {
    // The extension itself derives from another class/object.
    // Recurse, and extend with the extension's base first.
    base = _extend(base, extensionBase);
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
  if (baseIsClass && extensionIsClass) {
    // Properties defined by Function.
    // We'd prefer to get by interrogating Function itself, but WebKit functions
    // have some properties (arguments and caller) which are not returned by
    // Object.getOwnPropertyNames(Function).
    var FUNCTION_PROPERTIES = ['arguments', 'caller', 'length', 'name', 'prototype'];
    // Extending a class with a class.
    // We'll copy instance members in a moment, but first copy static members.
    copyOwnProperties(extension, result, FUNCTION_PROPERTIES);
    source = extension.prototype;
    target = result.prototype;
  } else if (!baseIsClass && extensionIsClass) {
    // Extending a plain object with a class.
    // Copy prototype methods directly to result.
    source = extension.prototype;
    target = result;
  } else if (baseIsClass && !extensionIsClass) {
    // Extending class with plain object.
    // Copy extension to result prototype.
    source = extension;
    target = result.prototype;
  } else {
    // Extending a plain object with a plain object.
    source = extension;
    target = result;
  }
  copyOwnProperties(source, target, ['constructor']);

  if (extension.name) {
    // Use the extension's name (usually the name of a class' constructor) to
    // save a reference back to the newly-created object in the prototype chain.
    target[extension.name] = target;

    // Save a reference to the superclass/super-object. See the comments on
    // Extensible's "super" property.
    target.super = baseIsClass ? base.prototype : base;
  }

  return result;
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

exports.default = Extensible;

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
      var base = this.AttributeMarshalling.super.attributeChangedCallback;
      if (base) {
        base.call(this);
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
      var _this = this;

      var base = this.AttributeMarshalling.super.createdCallback;
      if (base) {
        base.call(this);
      }
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

      var base = this.AutomaticNodeFinding.super.createdCallback;
      if (base) {
        base.call(this);
      }
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ExtensibleElement2 = require('./ExtensibleElement');

var _ExtensibleElement3 = _interopRequireDefault(_ExtensibleElement2);

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

var ElementBase = (function (_ExtensibleElement) {
  _inherits(ElementBase, _ExtensibleElement);

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
})(_ExtensibleElement3.default);

ElementBase = ElementBase.extend(_TemplateStamping2.default, // before node finding, so shadow root is populated
_AutomaticNodeFinding2.default, // before marshalling, so marshalled properties can use it
_AttributeMarshalling2.default);

document.registerElement('element-base', ElementBase);

exports.default = ElementBase;

},{"./AttributeMarshalling":18,"./AutomaticNodeFinding":19,"./ExtensibleElement":21,"./TemplateStamping":22}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Extensible = require('../extensible/Extensible');

var _Extensible2 = _interopRequireDefault(_Extensible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We use Extensible to add its own members to a HTMLElement subclass.
// The result is an HTMLElement with .extend() and super() support.
var ExtensibleElement = _Extensible2.default.extend.call(HTMLElement, _Extensible2.default); /*
                                                                                              * An extensible HTML element.
                                                                                              *
                                                                                              * This class is provided just as a convenience. One could also start with
                                                                                              * HTMLElement at the top level, and add extensibility by mixing in Extensible.
                                                                                              */

exports.default = ExtensibleElement;

},{"../extensible/Extensible":17}],22:[function(require,module,exports){
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
      // this.log("created");
      var base = this.TemplateStamping.super.createdCallback;
      if (base) {
        base();
      }
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

},{}]},{},[1,2,3]);
