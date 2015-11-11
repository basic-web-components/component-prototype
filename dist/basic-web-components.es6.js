(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

/*
 * basic-list-box
 */

class ListBox extends _ElementBase2.default.compose(_ChildrenContent2.default, _ClickSelection2.default, _ContentItems2.default, _DirectionSelection2.default, _Generic2.default, _ItemSelection2.default, _ItemsAccessible2.default, _Keyboard2.default, _KeyboardDirection2.default, _KeyboardPaging2.default, _KeyboardPrefixSelection2.default, _SelectionHighlight2.default, _SelectionScroll2.default) {

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

exports.default = ListBox;
document.registerElement('basic-list-box', ListBox);

},{"../../mixins/ChildrenContent":3,"../../mixins/ClickSelection":4,"../../mixins/ContentItems":5,"../../mixins/DirectionSelection":6,"../../mixins/Generic":7,"../../mixins/ItemSelection":8,"../../mixins/ItemsAccessible":9,"../../mixins/Keyboard":10,"../../mixins/KeyboardDirection":11,"../../mixins/KeyboardPaging":12,"../../mixins/KeyboardPrefixSelection":13,"../../mixins/SelectionHighlight":14,"../../mixins/SelectionScroll":15,"element-base/src/ElementBase":21}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function greet() {
  console.log(`Hello, world.`);
}

exports.default = greet;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

  // Default implementation. This will typically be handled by other mixins.
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

},{}],5:[function(require,module,exports){
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
    item.classList.toggle('selected', selected);
  }

  contentChanged() {
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
  itemAdded(item) {}

  itemsChanged() {

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

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class DirectionSelection {

  goDown() {
    return this.selectNext();
  }

  goEnd() {
    return this.selectLast();
  }

  goLeft() {
    return this.selectPrevious();
  }

  goRight() {
    return this.selectNext();
  }

  goStart() {
    return this.selectFirst();
  }

  goUp() {
    return this.selectPrevious();
  }

  // Default implementations. These will typically be handled by other mixins.
  selectFirst() {}
  selectLast() {}
  selectNext() {}
  selectPrevious() {}

}
exports.default = DirectionSelection; /**
                                       * Aspect which maps direction semantics (goLeft, goRight, etc.) to selection
                                       * semantics (selectPrevious, selectNext, etc.).
                                       *
                                       * @element basic-direction-selection
                                       */

_Composable2.default.decorate.call(DirectionSelection.prototype, {
  selectFirst: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  selectLast: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  selectNext: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult),
  selectPrevious: _Composable2.default.rule(_Composable2.default.rules.preferBaseResult)
});

},{"Composable/src/Composable":16}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

  // Default implementation. This will typically be handled by other mixins.
  applySelection(item, selected) {}

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
    this.applySelection(item, item === this.selectedItem);
  }

  itemsChanged() {
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

},{}],9:[function(require,module,exports){
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
    item.setAttribute('role', 'option');

    // Ensure each item has an ID so we can set aria-activedescendant on the
    // overall list whenever the selection changes.
    if (!item.getAttribute('id')) {
      item.setAttribute('id', this.itemBaseId + idCount++);
    }
  }

  set selectedItem(item) {
    // Catch the case where the selection is removed.
    if (item == null) {
      this.outermostAttached.removeAttribute('aria-activedescendant');
    }
  }

}
exports.default = ItemsAccessible;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which manages the keyboard focus and keydown handling for a component.
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
    this.addEventListener('keydown', event => {
      let handled = this.keydown(event);
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
    this.setAttribute('tabIndex', 0);
  }

  // Default keydown handler. This will typically be handled by other mixins.
  keydown(event) {}

}
exports.default = Keyboard;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class KeyboardDirection {

  // Default implementations. These will typically be handled by other mixins.
  goDown() {}
  goEnd() {}
  goLeft() {}
  goRight() {}
  goStart() {}
  goUp() {}

  keydown(event) {
    let handled;
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

}
exports.default = KeyboardDirection; /**
                                      * Aspect which maps direction keys (Left, Right, etc.) to direction semantics
                                      * (goLeft, goRight, etc.).
                                      *
                                      * @element basic-keyboard-direction
                                      */

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class KeyboardPaging {

  keydown(event) {
    let handled;
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
  pageDown() {
    return scrollOnePage(this, true);
  }

  /**
   * Scroll up one page.
   *
   * @method pageUp
   */
  pageUp() {
    return scrollOnePage(this, false);
  }

}

exports.default = KeyboardPaging; // Return the item whose content spans the given y position (relative to the
// top of the list's scrolling client area), or null if not found.
//
// If downward is true, move down the list of items to find the first item
// found at the given y position; if downward is false, move up the list of
// items to find the last item at that position.
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// TODO: If the selection is changed by some other means (e.g., arrow keys) other
// than prefix typing, then that act should reset the prefix.

class KeyboardPrefixSelection {

  // itemsChanged() {
  //   this._itemTextContents = null;
  //   resetTypedPrefix(this);
  // }

  keydown(event) {
    let handled;
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
exports.default = KeyboardPrefixSelection; /**
                                            * Handle list box-style prefix typing, in which the user can type a string to
                                            * select the first item that begins with that string.
                                            *
                                            * @element basic-keyboard-prefix-selection
                                            *
                                            */

_Composable2.default.decorate.call(KeyboardPrefixSelection.prototype, {
  keydown: _Composable2.default.rule(_Composable2.default.rules.preferMixinResult)
});

// Time in milliseconds after which the user is considered to have stopped
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

},{"Composable/src/Composable":16}],14:[function(require,module,exports){
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
    item.style.backgroundColor = selected ? 'highlight' : '';
    item.style.color = selected ? 'highlighttext' : '';
  }

}
exports.default = SelectionHighlight;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which scrolls a container to keep the selected item visible.
 *
 * @element basic-selection-scroll
 */

class SelectionScroll {

  set selectedItem(item) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL0xpc3RCb3gvTGlzdEJveC5qcyIsImNvbXBvbmVudHMvTGlzdEJveC9UZXN0LmpzIiwibWl4aW5zL0NoaWxkcmVuQ29udGVudC5qcyIsIm1peGlucy9DbGlja1NlbGVjdGlvbi5qcyIsIm1peGlucy9Db250ZW50SXRlbXMuanMiLCJtaXhpbnMvRGlyZWN0aW9uU2VsZWN0aW9uLmpzIiwibWl4aW5zL0dlbmVyaWMuanMiLCJtaXhpbnMvSXRlbVNlbGVjdGlvbi5qcyIsIm1peGlucy9JdGVtc0FjY2Vzc2libGUuanMiLCJtaXhpbnMvS2V5Ym9hcmQuanMiLCJtaXhpbnMvS2V5Ym9hcmREaXJlY3Rpb24uanMiLCJtaXhpbnMvS2V5Ym9hcmRQYWdpbmcuanMiLCJtaXhpbnMvS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24uanMiLCJtaXhpbnMvU2VsZWN0aW9uSGlnaGxpZ2h0LmpzIiwibWl4aW5zL1NlbGVjdGlvblNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9Db21wb3NhYmxlL3NyYy9Db21wb3NhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0NvbXBvc2FibGUvc3JjL0NvbXBvc2l0aW9uUnVsZXMuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9BdHRyaWJ1dGVNYXJzaGFsbGluZy5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL0F1dG9tYXRpY05vZGVGaW5kaW5nLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvQ29tcG9zYWJsZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9FbGVtZW50QmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL1RlbXBsYXRlU3RhbXBpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFD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QzVEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBiYXNpYy1saXN0LWJveFxuICovXG5cbmltcG9ydCBFbGVtZW50QmFzZSBmcm9tICdlbGVtZW50LWJhc2Uvc3JjL0VsZW1lbnRCYXNlJztcbmltcG9ydCBDaGlsZHJlbkNvbnRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL0NoaWxkcmVuQ29udGVudCc7XG5pbXBvcnQgQ2xpY2tTZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0NsaWNrU2VsZWN0aW9uJztcbmltcG9ydCBDb250ZW50SXRlbXMgZnJvbSAnLi4vLi4vbWl4aW5zL0NvbnRlbnRJdGVtcyc7XG5pbXBvcnQgRGlyZWN0aW9uU2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9EaXJlY3Rpb25TZWxlY3Rpb24nO1xuaW1wb3J0IEdlbmVyaWMgZnJvbSAnLi4vLi4vbWl4aW5zL0dlbmVyaWMnO1xuaW1wb3J0IEl0ZW1TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0l0ZW1TZWxlY3Rpb24nO1xuaW1wb3J0IEl0ZW1zQWNjZXNzaWJsZSBmcm9tICcuLi8uLi9taXhpbnMvSXRlbXNBY2Nlc3NpYmxlJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmQnO1xuaW1wb3J0IEtleWJvYXJkRGlyZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZERpcmVjdGlvbic7XG5pbXBvcnQgS2V5Ym9hcmRQYWdpbmcgZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkUGFnaW5nJztcbmltcG9ydCBLZXlib2FyZFByZWZpeFNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24nO1xuaW1wb3J0IFNlbGVjdGlvbkhpZ2hsaWdodCBmcm9tICcuLi8uLi9taXhpbnMvU2VsZWN0aW9uSGlnaGxpZ2h0JztcbmltcG9ydCBTZWxlY3Rpb25TY3JvbGwgZnJvbSAnLi4vLi4vbWl4aW5zL1NlbGVjdGlvblNjcm9sbCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEJveCBleHRlbmRzIEVsZW1lbnRCYXNlLmNvbXBvc2UoXG4gICAgQ2hpbGRyZW5Db250ZW50LFxuICAgIENsaWNrU2VsZWN0aW9uLFxuICAgIENvbnRlbnRJdGVtcyxcbiAgICBEaXJlY3Rpb25TZWxlY3Rpb24sXG4gICAgR2VuZXJpYyxcbiAgICBJdGVtU2VsZWN0aW9uLFxuICAgIEl0ZW1zQWNjZXNzaWJsZSxcbiAgICBLZXlib2FyZCxcbiAgICBLZXlib2FyZERpcmVjdGlvbixcbiAgICBLZXlib2FyZFBhZ2luZyxcbiAgICBLZXlib2FyZFByZWZpeFNlbGVjdGlvbixcbiAgICBTZWxlY3Rpb25IaWdobGlnaHQsXG4gICAgU2VsZWN0aW9uU2Nyb2xsXG4gICkge1xuXG4gIC8vIFN0dWIgZm9yIGNvbGxlY3RpdmVzIGZvciBub3dcbiAgZ2V0IGlubmVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzLiQuaXRlbXNDb250YWluZXI7XG4gIH1cbiAgZ2V0IG91dGVybW9zdEF0dGFjaGVkKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICAgICAgfVxuXG4gICAgICBbdGFyZ2V0PVwiY2hpbGRcIl0ge1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC13ZWJraXQtZmxleDogMTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgI2l0ZW1zQ29udGFpbmVyIHtcbiAgICAgICAgLXdlYmtpdC1mbGV4OiAxO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDsgLyogZm9yIG1vbWVudHVtIHNjcm9sbGluZyAqL1xuICAgICAgfVxuXG4gICAgICAvKiBHZW5lcmljIGFwcGVhcmFuY2UgKi9cbiAgICAgIDpob3N0KFtnZW5lcmljPVwiXCJdKSB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pICNpdGVtc0NvbnRhaW5lciA6OmNvbnRlbnQgPiAqIHtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICBwYWRkaW5nOiAwLjI1ZW07XG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBpZD1cIml0ZW1zQ29udGFpbmVyXCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnYmFzaWMtbGlzdC1ib3gnLCBMaXN0Qm94KTtcbiIsImZ1bmN0aW9uIGdyZWV0KCkge1xuICBjb25zb2xlLmxvZyhgSGVsbG8sIHdvcmxkLmApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBncmVldDtcbiIsIi8qKlxuICogTGV0cyBhIGNvbXBvbmVudCBjb2xsZWN0aXZlIHRha2VzIGFzIGl0cyBjb250ZW50IHRoZSBjaGlsZHJlbiBvZiB0aGVcbiAqIGlubmVybW9zdCBhc3BlY3QuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtY2hpbGRyZW4tY29udGVudFxuICpcbiAqL1xuXG4vLyBUT0RPOiBEb24ndCByZXNwb25kIHRvIGNoYW5nZXMgaW4gYXR0cmlidXRlcywgb3IgYXQgbGVhc3Qgb2ZmZXIgdGhhdCBhcyBhblxuLy8gb3B0aW9uLlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGlsZHJlbkNvbnRlbnQge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBVbnRpbCB3ZSBoYXZlIGNvbnRlbnQgb2JzZXJ2aW5nIGFnYWluLCBmb3JjZSBhIGNhbGwgdG8gY29udGVudENoYW5nZWQoKS5cbiAgICAvLyBIQUNLOiBEbyB0aGlzIGFzeW5jaHJvbm91c2x5LCBzbyBvdGhlciBtaXhpbnMgaGF2ZSBhIGNoYW5jZSB0byBzZXQgdXBcbiAgICAvLyBiZWZvcmUgdGhpcyBjYWxsLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb250ZW50Q2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8vIFRPRE86IFdhaXQgdG8gb2JzZXJ2ZSBjaGFuZ2VzIHVudGlsIHdlIGhhdmUgYSBzaGFkb3cgRE9NIGhvc3QuIFJpZ2h0XG4gIC8vIG5vdywgdGhlIGluaXRpYWwgY29sbGVjdGl2ZUNoYW5nZWQgY2FsbCBjYW4gaGFwcGVuIHRvbyBlYXJseS5cbiAgLy8gVE9ETzogSGFuZGxlIGNhc2Ugd2hlcmUgY29tcG9uZW50IGlzIGluc3RhbnRpYXRlZCBvdXQgb2YgRE9NLCB0aGVuXG4gIC8vIGF0dGFjaGVkLlxuICAvLyBjb2xsZWN0aXZlQ2hhbmdlZCgpIHtcbiAgLy8gICAvLyBjb25zb2xlLmxvZyh0aGlzLmxvY2FsTmFtZSArIFwiIGNvbGxlY3RpdmVDaGFuZ2VkOiBcIiArIHRoaXMuY29sbGVjdGl2ZS5hc3BlY3RzLmxlbmd0aCk7XG4gIC8vICAgbGV0IGlubmVybW9zdCA9IHRoaXMuY29sbGVjdGl2ZS5pbm5lcm1vc3RFbGVtZW50O1xuICAvLyAgIGxldCBpbm5lcm1vc3RIb3N0ID0gQmFzaWMuQ29udGVudEhlbHBlcnMuZ2V0SG9zdChpbm5lcm1vc3QpO1xuICAvL1xuICAvLyAgIC8vIE9wdGltaXplIGZvciB0aGUgY2FzZSB3aGVyZSB0aGUgY29sbGVjdGl2ZSdzIGNoYW5nZWQsIGJ1dCBpdHNcbiAgLy8gICAvLyBpbm5lcm1vc3QgYXNwZWN0IGlzIHN0aWxsIHRoZSBzYW1lLiBJbiB0aGF0IGNhc2UsIHdlIGRvbid0IHdhbnQgdG9cbiAgLy8gICAvLyBib3RoZXIgdGVhcmluZyBkb3duIGFuZCB0aGVuIHJlY3JlYXRpbmcgb3VyIGNvbnRlbnRDaGFuZ2VkIGhhbmRsZXIuXG4gIC8vICAgLy8gVE9ETzogVGhpcyBjdXJyZW50bHkgb25seSB0cmFja3Mgb25lIGxldmVsIG9mIGhvc3QuIEZvciByb2J1c3RuZXNzLFxuICAvLyAgIC8vIHRoaXMgc2hvdWxkIHRyYWNrIHRoZSBjaGFpbiBvZiBob3N0cy5cbiAgLy8gICBpZiAoaW5uZXJtb3N0ID09PSB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdFxuICAvLyAgICAgICAmJiBpbm5lcm1vc3RIb3N0ID09PSB0aGlzLl9wcmV2aW91c0lubmVybW9zdEhvc3QpIHtcbiAgLy8gICAgIC8vIFdlIHNob3VsZCBhbHJlYWR5IGJlIG9ic2VydmluZyBjaGFuZ2VzIG9uIHRoZSBpbm5lcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgLy8gRXZlbiB0aG91Z2ggdGhlIGNvbnRlbnQgaGFzbid0IGFjdHVhbGx5IGNoYW5nZWQsIHdlIHdhbnQgdG8gZ2l2ZSB0aGVcbiAgLy8gICAgIC8vIG5ldyBhc3BlY3RzIGEgY2hhbmNlIHRvIHJlc3BvbmQgdG8gY29udGVudENoYW5nZWQuXG4gIC8vICAgICB0aGlzLmNvbGxlY3RpdmUuY29udGVudENoYW5nZWQoKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgLy8gQSBuZXcgYXNwZWN0IGlzIG5vdyBpbm5lcm1vc3QuXG4gIC8vICAgaWYgKHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0ICYmIHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0Ll9jb250ZW50Q2hhbmdlT2JzZXJ2ZXIpIHtcbiAgLy8gICAgIC8vIFN0b3Agb2JzZXJ2aW5nIGNoYW5nZXMgb24gdGhlIG9sZCBpbm5lcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJzdG9wcGluZyBvYnNlcnZhdGlvbiBvZiBjaGFuZ2VzIG9uIG9sZCBpbm5lcm1vc3QgYXNwZWN0XCIpO1xuICAvLyAgICAgQmFzaWMuQ29udGVudEhlbHBlcnMub2JzZXJ2ZUNvbnRlbnRDaGFuZ2VzKHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0LCBudWxsKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgQmFzaWMuQ29udGVudEhlbHBlcnMub2JzZXJ2ZUNvbnRlbnRDaGFuZ2VzKGlubmVybW9zdCwgZnVuY3Rpb24oKSB7XG4gIC8vICAgICAvLyBSZXNldCBtZW1vaXplZCBjb250ZW50LlxuICAvLyAgICAgdGhpcy5fY29udGVudCA9IG51bGw7XG4gIC8vXG4gIC8vICAgICAvLyBMZXQgY29sbGVjdGl2ZSBrbm93IGNvbnRlbnQgaGFzIGNoYW5nZWQuXG4gIC8vICAgICB0aGlzLmNvbGxlY3RpdmUuY29udGVudENoYW5nZWQoKTtcbiAgLy8gICB9LmJpbmQodGhpcykpO1xuICAvL1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0QXNwZWN0ID0gaW5uZXJtb3N0O1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzSW5uZXJtb3N0SG9zdCA9IGlubmVybW9zdEhvc3Q7XG4gIC8vIH1cblxuICBjb250ZW50Q2hhbmdlZCgpIHtcbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAob3V0ZXJtb3N0KSB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2NvbnRlbnQtY2hhbmdlZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBvdXRlcm1vc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmbGF0dGVuZWQgY29udGVudCBvZiB0aGlzIGNvbGxlY3RpdmUuXG4gICAqXG4gICAqIFRoZSBjb250ZW50IGlzIHRoZSBjb2xsZWN0aXZlIG9mIG5vZGVzIHdoaWNoIGFyZSBjaGlsZHJlbiBvZiB0aGVcbiAgICogY29sbGVjdGl2ZSdzIGlubmVybW9zdCBhc3BlY3QuIElmIGFueSBvZiB0aG9zZSBub2RlcyBhcmUgYDxjb250ZW50PmBcbiAgICogZWxlbWVudHMsIHRob3NlIGFyZSByZWN1cnNpdmVseSBleHBhbmRlZC5cbiAgICpcbiAgICogQHByb3BlcnR5IGNvbnRlbnRcbiAgICogQHR5cGUgW09iamVjdF1cbiAgICovXG4gIGdldCBjb250ZW50KCkge1xuICAgIC8vIGlmICghdGhpcy5fY29udGVudCkge1xuICAgIC8vICAgbGV0IGlubmVybW9zdCA9IHRoaXMuY29sbGVjdGl2ZS5pbm5lcm1vc3RFbGVtZW50O1xuICAgIC8vICAgaWYgKGlubmVybW9zdCkge1xuICAgIC8vICAgICB0aGlzLl9jb250ZW50ID0gQmFzaWMuQ29udGVudEhlbHBlcnMuZmxhdHRlbkNoaWxkcmVuKGlubmVybW9zdCk7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8vIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xuICB9XG5cbn07XG5cblxuLy8gcmVhZHkoKSB7XG4vLyAgIC8vIEhBQ0s6IEVuc3VyZSB0YXJnZXRDaGFuZ2VkIChhbHNvKSBoYXBwZW5zIGFmdGVyIHJlYWR5LlxuLy8gICB0aGlzLnRhcmdldENoYW5nZWQodGhpcy50YXJnZXQpO1xuLy8gfVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFwcyBhIGNsaWNrIHRvIGl0ZW0gc2VsZWN0aW9uLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWNsaWNrLXNlbGVjdGlvblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWNrU2VsZWN0aW9uIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgLypcbiAgICAgKiBSRVZJRVc6IFdoaWNoIGV2ZW50IHNob3VsZCB3ZSBsaXN0ZW4gdG8gaGVyZT9cbiAgICAgKlxuICAgICAqIFRoZSBzdGFuZGFyZCB1c2UgZm9yIHRoaXMgYXNwZWN0IGlzIGluIGxpc3QgYm94ZXMuIExpc3QgYm94ZXMgZG9uJ3RcbiAgICAgKiBhcHBlYXIgdG8gYmUgY29uc2lzdGVudCB3aXRoIHJlZ2FyZCB0byB3aGV0aGVyIHRoZXkgc2VsZWN0IG9uIG1vdXNlZG93blxuICAgICAqIG9yIGNsaWNrL21vdXNldXAuXG4gICAgICovXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICBzZWxlY3RUYXJnZXQodGhpcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgIC8vIE5vdGU6IFdlIGRvbid0IGNhbGwgcHJldmVudERlZmF1bHQgaGVyZS4gVGhlIGRlZmF1bHQgYmVoYXZpb3IgZm9yXG4gICAgICAvLyBtb3VzZWRvd24gaW5jbHVkZXMgc2V0dGluZyBrZXlib2FyZCBmb2N1cyBpZiB0aGUgZWxlbWVudCBkb2Vzbid0XG4gICAgICAvLyBhbHJlYWR5IGhhdmUgdGhlIGZvY3VzLCBhbmQgd2Ugd2FudCB0byBwcmVzZXJ2ZSB0aGF0IGJlaGF2aW9yLlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICAvLyBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge31cblxufVxuXG4vLyBUT0RPOiBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSBsaXN0IGl0ZW0gaGFzIHN1YmVsZW1lbnRzLiBXYWxrIHVwIHRoZSBET01cbi8vIGhpZXJhcmNoeSB1bnRpbCB3ZSBmaW5kIGFuIGl0ZW0gaW4gdGhlIGxpc3QsIG9yIGNvbWUgYmFjayB0byB0aGlzIGVsZW1lbnQsXG4vLyBpbiB3aGljaCBjYXNlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHRhcHBlZCBpc24ndCBhbiBpdGVtIChhbmQgc2hvdWxkIGJlXG4vLyBpZ25vcmVkKS5cbmZ1bmN0aW9uIHNlbGVjdFRhcmdldChlbGVtZW50LCB0YXJnZXQpIHtcbiAgbGV0IGluZGV4ID0gZWxlbWVudC5pbmRleE9mSXRlbSAmJiBlbGVtZW50LmluZGV4T2ZJdGVtKHRhcmdldCk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gIH1cbn1cbiIsIi8qKlxuICogQXNwZWN0IHRoYXQgbGV0cyBhIGNvbXBvbmVudCBjb2xsZWN0aXZlIERPTSBjb250ZW50IGFzIGxpc3QgaXRlbXMuXG4gKlxuICogQXV4aWxpYXJ5IGVsZW1lbnRzIHdoaWNoIGFyZSBub3Qgbm9ybWFsbHkgdmlzaWJsZSBhcmUgZmlsdGVyZWQgb3V0LiBGb3Igbm93LFxuICogRm9yIG5vdywgdGhlc2UgYXJlOiBsaW5rLCBzY3JpcHQsIHN0eWxlLCBhbmQgdGVtcGxhdGUuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtY29udGVudC1pdGVtc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRJdGVtcyB7XG5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHtcbiAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJywgc2VsZWN0ZWQpO1xuICB9XG5cbiAgY29udGVudENoYW5nZWQoKSB7XG4gICAgdGhpcy5faXRlbXMgPSBudWxsO1xuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb25hbCBpbmRleCBmb3IgdGhlIGluZGljYXRlZCBpdGVtLlxuICAgKlxuICAgKiBAbWV0aG9kIGluZGV4T2ZJdGVtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIFRoZSBpdGVtIHdob3NlIGluZGV4IGlzIHJlcXVlc3RlZC5cbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBpdGVtLCBvciAtMSBpZiBub3QgZm91bmQuXG4gICAqL1xuICBpbmRleE9mSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3RoaW5nLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnlcbiAgLy8gb3RoZXIgYXNwZWN0cyBpbiB0aGUgY29sbGVjdGl2ZS5cbiAgLy8gaXRlbUFkZGVkOiBCYXNpYy5Db2xsZWN0aXZlLmRlZmF1bHRNZXRob2QsXG4gIGl0ZW1BZGRlZChpdGVtKSB7fVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcblxuICAgIC8vIFBlcmZvcm0gcGVyLWl0ZW0gaW5pdGlhbGl6YXRpb24uXG4gICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKCFpdGVtLl9pdGVtSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgLy8gQlVHOiBJZiBhbiBhc3BlY3QgaXMgYXNzaW1pbGF0ZWQgYWZ0ZXIgQ29udGVudEl0ZW1zLCB0aGVuIGFsbCB0aGVcbiAgICAgICAgLy8gaXRlbXMgYXJlIGFscmVhZHkgaW5pdGlhbGl6ZWQsIGFuZCB0aGUgbmV3IGFzcGVjdCB3b24ndCBoYXZlIGFuXG4gICAgICAgIC8vIG9wcG9ydHVuaXR5IHRvIGRvIGl0cyBvd24gcGVyLWl0ZW0gaW5pdGlhbGl6YXRpb24gaW4gaXRlbUFkZGVkLlxuICAgICAgICB0aGlzLml0ZW1BZGRlZChpdGVtKTtcbiAgICAgICAgaXRlbS5faXRlbUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnaXRlbXMtY2hhbmdlZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBvdXRlcm1vc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNldCBvZiBpdGVtcyBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQHByb3BlcnR5IGl0ZW1zXG4gICAqIEB0eXBlIFtPYmplY3RdXG4gICAqL1xuICAvLyBUT0RPOiBwcm9wZXJ0eSBub3RpZmljYXRpb25zIHNvIGVsZW1lbnRzIGNhbiBiaW5kIHRvIHRoaXMgcHJvcGVydHlcbiAgZ2V0IGl0ZW1zKCkge1xuICAgIGlmICh0aGlzLl9pdGVtcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9pdGVtcyA9IGZpbHRlckF1eGlsaWFyeUVsZW1lbnRzKHRoaXMuY29udGVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgfVxuXG59XG5cblxuLy8gUmV0dXJuIHRoZSBnaXZlbiBlbGVtZW50cywgZmlsdGVyaW5nIG91dCBhdXhpbGlhcnkgZWxlbWVudHMgdGhhdCBhcmVuJ3Rcbi8vIHR5cGljYWxseSB2aXNpYmxlLiBJdGVtcyB3aGljaCBhcmUgbm90IGVsZW1lbnRzIGFyZSByZXR1cm5lZCBhcyBpcy5cbmZ1bmN0aW9uIGZpbHRlckF1eGlsaWFyeUVsZW1lbnRzKGl0ZW1zKSB7XG4gIGxldCBhdXhpbGlhcnlUYWdzID0gW1xuICAgICdsaW5rJyxcbiAgICAnc2NyaXB0JyxcbiAgICAnc3R5bGUnLFxuICAgICd0ZW1wbGF0ZSdcbiAgXTtcbiAgcmV0dXJuIFtdLmZpbHRlci5jYWxsKGl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuICFpdGVtLmxvY2FsTmFtZSB8fCBhdXhpbGlhcnlUYWdzLmluZGV4T2YoaXRlbS5sb2NhbE5hbWUpIDwgMDtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCBjaGFuZ2UuXG4gKlxuICogQGV2ZW50IGl0ZW1zLWNoYW5nZWRcbiAqL1xuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFwcyBkaXJlY3Rpb24gc2VtYW50aWNzIChnb0xlZnQsIGdvUmlnaHQsIGV0Yy4pIHRvIHNlbGVjdGlvblxuICogc2VtYW50aWNzIChzZWxlY3RQcmV2aW91cywgc2VsZWN0TmV4dCwgZXRjLikuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtZGlyZWN0aW9uLXNlbGVjdGlvblxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3Rpb25TZWxlY3Rpb24ge1xuXG4gIGdvRG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3ROZXh0KCk7XG4gIH1cblxuICBnb0VuZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RMYXN0KCk7XG4gIH1cblxuICBnb0xlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0UHJldmlvdXMoKTtcbiAgfVxuXG4gIGdvUmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TmV4dCgpO1xuICB9XG5cbiAgZ29TdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RGaXJzdCgpO1xuICB9XG5cbiAgZ29VcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQcmV2aW91cygpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMuIFRoZXNlIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBzZWxlY3RGaXJzdCgpIHt9XG4gIHNlbGVjdExhc3QoKSB7fVxuICBzZWxlY3ROZXh0KCkge31cbiAgc2VsZWN0UHJldmlvdXMoKSB7fVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoRGlyZWN0aW9uU2VsZWN0aW9uLnByb3RvdHlwZSwge1xuICBzZWxlY3RGaXJzdDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIHNlbGVjdExhc3Q6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBzZWxlY3ROZXh0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgc2VsZWN0UHJldmlvdXM6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpXG59KTtcbiIsIi8qXG4gKiBBIHZlcnkgc2ltcGxlIHNldCBvZiBoZWxwZXJzIHRvIHN1cHBvcnQgdGhlIHVzZSBvZiBnZW5lcmljIHN0eWxpbmcgaW4gYVxuICogY29tcG9uZW50LlxuICpcbiAqIEJ5IGRlZmF1bHQsIGEgY29tcG9uZW50IHNob3VsZCBwcm92aWRlIGEgbWluaW1hbCB2aXN1YWwgcHJlc2VudGF0aW9uIHRoYXRcbiAqIGFsbG93cyB0aGUgY29tcG9uZW50IHRvIGZ1bmN0aW9uLiBIb3dldmVyLCB0aGUgbW9yZSBzdHlsaW5nIHRoZSBjb21wb25lbnRcbiAqIHByb3ZpZGVzIGJ5IGRlZmF1bHQsIHRoZSBoYXJkZXIgaXQgYmVjb21lcyB0byBnZXQgdGhlIGNvbXBvbmVudCB0byBmaXQgaW5cbiAqIGluIG90aGVyIHNldHRpbmdzLiBFYWNoIENTUyBydWxlIGhhcyB0byBiZSBvdmVycmlkZGVuLiBXb3JzZSwgbmV3IENTUyBydWxlc1xuICogYWRkZWQgdG8gdGhlIGRlZmF1bHQgc3R5bGUgd29uJ3QgYmUgb3ZlcnJpZGRlbiBieSBkZWZhdWx0LCBtYWtpbmcgaXQgaGFyZCB0b1xuICoga25vdyB3aGV0aGVyIGEgbmV3IHZlcnNpb24gb2YgYSBjb21wb25lbnQgd2lsbCBzdGlsbCBsb29rIG9rYXkuXG4gKlxuICogQXMgYSBjb21wcm9taXNlLCB0aGUgc2ltcGxlIFBvbHltZXIgYmVoYXZpb3IgaGVyZSBkZWZpbmVzIGEgXCJnZW5lcmljXCJcbiAqIGF0dHJpYnV0ZS4gVGhpcyBhdHRyaWJ1dGUgaXMgbm9ybWFsbHkgc2V0IGJ5IGRlZmF1bHQsIGFuZCBzdHlsZXMgY2FuIGJlXG4gKiB3cml0dGVuIHRoYXQgYXBwbHkgb25seSB3aGVuIHRoZSBnZW5lcmljIGF0dHJpYnV0ZSBpcyBzZXQuIFRoaXMgYWxsb3dzIHRoZVxuICogY29uc3RydWN0aW9uIG9mIENTUyBydWxlcyB0aGF0IHdpbGwgb25seSBhcHBseSB0byBnZW5lcmljIGNvbXBvbmVudHMgbGlrZVxuICpcbiAqICAgICA6aG9zdChbZ2VuZXJpYz1cIlwiXSkge1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIFRoaXMgbWFrZXMgaXQgZWFzeSB0byByZW1vdmUgYWxsIGRlZmF1bHQgc3R5bGluZyAtLSBzZXQgdGhlIGdlbmVyaWMgYXR0cmlidXRlXG4gKiB0byBmYWxzZSwgYW5kIGFsbCBkZWZhdWx0IHN0eWxpbmcgd2lsbCBiZSByZW1vdmVkLlxuICpcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmljIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5nZW5lcmljID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2dlbmVyaWMnKSB8fCB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIGNvbXBvbmVudCB3b3VsZCBsaWtlIHRvIHJlY2VpdmUgZ2VuZXJpYyBzdHlsaW5nLlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIHRydWUgYnkgZGVmYXVsdCDigJTCoHNldCBpdCB0byBmYWxzZSB0byB0dXJuIG9mZiBhbGxcbiAgICogZ2VuZXJpYyBzdHlsZXMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIGFwcGx5IGN1c3RvbSBzdHlsaW5nOyB5b3Ugd29uJ3RcbiAgICogaGF2ZSB0byBleHBsaWNpdGx5IG92ZXJyaWRlIHN0eWxpbmcgeW91IGRvbid0IHdhbnQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBnZW5lcmljXG4gICAqIEB0eXBlIEJvb2xlYW5cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgZ2V0IGdlbmVyaWMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dlbmVyaWM7XG4gIH1cblxuICAvLyBXZSByb2xsIG91ciBvd24gYXR0cmlidXRlIHNldHRpbmcgc28gdGhhdCBhbiBleHBsaWNpdGx5IGZhbHNlIHZhbHVlIHNob3dzXG4gIC8vIHVwIGFzIGdlbmVyaWM9XCJmYWxzZVwiLlxuICBzZXQgZ2VuZXJpYyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSAhPT0gJ2ZhbHNlJyk7XG4gICAgfVxuICAgIHRoaXMuX2dlbmVyaWMgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAvLyBFeHBsaWNpdGx5IHVzZSBmYWxzZSBzdHJpbmcuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZ2VuZXJpYycsICdmYWxzZScpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgLy8gRXhwbGljaXRseSByZW1vdmUgYXR0cmlidXRlLlxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2dlbmVyaWMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbXB0eSBzdHJpbmcgdG8gZ2V0IGF0dHJpYnV0ZSB0byBhcHBlYXIgd2l0aCBubyB2YWx1ZS5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdnZW5lcmljJywgJycpO1xuICAgIH1cbiAgfVxuXG59O1xuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFuYWdlcyBzZWxlY3Rpb24gc2VtYW50aWNzIGZvciBpdGVtcyBpbiBhIGxpc3QuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtaXRlbS1zZWxlY3Rpb25cbiAqL1xuXG5cbi8qKlxuICogRmlyZXMgd2hlbiB0aGUgc2VsZWN0ZWRJdGVtIHByb3BlcnR5IGNoYW5nZXMuXG4gKlxuICogQGV2ZW50IHNlbGVjdGVkLWl0ZW0tY2hhbmdlZFxuICogQHBhcmFtIGRldGFpbC5zZWxlY3RlZEl0ZW0gVGhlIG5ldyBzZWxlY3RlZCBpdGVtLlxuICogQHBhcmFtIGRldGFpbC5wcmV2aW91c0l0ZW0gVGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgaXRlbS5cbiAqL1xuXG4vKipcbiAqIEZpcmVzIHdoZW4gdGhlIHNlbGVjdGVkSW5kZXggcHJvcGVydHkgY2hhbmdlcy5cbiAqXG4gKiBAZXZlbnQgc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkXG4gKiBAcGFyYW0gZGV0YWlsLnNlbGVjdGVkSW5kZXggVGhlIG5ldyBzZWxlY3RlZCBpbmRleC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtU2VsZWN0aW9uIHtcblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLiBUaGlzIHdpbGwgdHlwaWNhbGx5IGJlIGhhbmRsZWQgYnkgb3RoZXIgbWl4aW5zLlxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge31cblxuICBnZXQgY2FuU2VsZWN0TmV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuU2VsZWN0TmV4dDtcbiAgfVxuICBzZXQgY2FuU2VsZWN0TmV4dChjYW5TZWxlY3ROZXh0KSB7XG4gICAgdGhpcy5fY2FuU2VsZWN0TmV4dCA9IGNhblNlbGVjdE5leHQ7XG4gIH1cblxuICBnZXQgY2FuU2VsZWN0UHJldmlvdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhblNlbGVjdFByZXZpb3VzO1xuICB9XG4gIHNldCBjYW5TZWxlY3RQcmV2aW91cyhjYW5TZWxlY3RQcmV2aW91cykge1xuICAgIHRoaXMuX2NhblNlbGVjdFByZXZpb3VzID0gY2FuU2VsZWN0UHJldmlvdXM7XG4gIH1cblxuICBpdGVtQWRkZWQoaXRlbSkge1xuICAgIHRoaXMuYXBwbHlTZWxlY3Rpb24oaXRlbSwgaXRlbSA9PT0gdGhpcy5zZWxlY3RlZEl0ZW0pO1xuICB9XG5cbiAgaXRlbXNDaGFuZ2VkKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkSXRlbSk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgLy8gU2VsZWN0ZWQgaXRlbSBpcyBubyBsb25nZXIgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIGl0ZW1zLlxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBudWxsO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uUmVxdWlyZWQpIHtcbiAgICAgICAgLy8gRW5zdXJlIHNlbGVjdGlvbiwgYnV0IGRvIHRoaXMgaW4gdGhlIG5leHQgdGljayB0byBnaXZlIG90aGVyXG4gICAgICAgIC8vIGFzcGVjdHMgYSBjaGFuY2UgdG8gZG8gdGhlaXIgb3duIGl0ZW1zQ2hhbmdlZCB3b3JrLlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVuc3VyZVNlbGVjdGlvbih0aGlzKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBpdGVtIHdoaWNoIGlzIGN1cnJlbnRseSBzZWxlY3RlZCwgb3IgLTEgaWYgdGhlcmUgaXMgbm9cbiAgICogc2VsZWN0aW9uLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0ZWRJbmRleFxuICAgKiBAdHlwZSBOdW1iZXJcbiAgICovXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbTtcblxuICAgIGlmIChzZWxlY3RlZEl0ZW0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8vIFRPRE86IE1lbW9pemVcbiAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4T2ZJdGVtKHNlbGVjdGVkSXRlbSk7XG5cbiAgICAvLyBJZiBpbmRleCA9IC0xLCBzZWxlY3Rpb24gd2Fzbid0IGZvdW5kLiBNb3N0IGxpa2VseSBjYXVzZSBpcyB0aGF0IHRoZVxuICAgIC8vIERPTSB3YXMgbWFuaXB1bGF0ZWQgZnJvbSB1bmRlcm5lYXRoIHVzLlxuICAgIC8vIFRPRE86IE9uY2Ugd2UgdHJhY2sgY29udGVudCBjaGFuZ2VzLCB0dXJuIHRoaXMgaW50byBhbiBleGNlcHRpb24uXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIGxldCBpdGVtO1xuICAgIGlmIChpbmRleCA8IDAgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpdGVtID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuXG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZC1pbmRleC1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBzZWxlY3RlZEluZGV4OiBpbmRleCxcbiAgICAgICAgICB2YWx1ZTogaW5kZXggLy8gZm9yIFBvbHltZXIgYmluZGluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRJdGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLCBvciBudWxsIGlmIHRoZXJlIGlzIG5vIHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGVkSXRlbVxuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIC8vIFRPRE86IENvbmZpcm0gaXRlbSBpcyBpbiBpdGVtcyBiZWZvcmUgc2VsZWN0aW5nLlxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICBsZXQgcHJldmlvdXNJdGVtID0gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICAgIGlmIChwcmV2aW91c0l0ZW0pIHtcbiAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBzZWxlY3Rpb24uXG4gICAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKHByZXZpb3VzSXRlbSwgZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKGl0ZW0sIHRydWUpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFJhdGlvbmFsaXplIHdpdGggc2VsZWN0ZWRJbmRleCBzbyB3ZSdyZSBub3QgcmVjYWxjdWxhdGluZyBpdGVtXG4gICAgLy8gb3IgaW5kZXggaW4gZWFjaCBzZXR0ZXIuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleE9mSXRlbShpdGVtKTtcbiAgICB1cGRhdGVQb3NzaWJsZU5hdmlnYXRpb25zKHRoaXMsIGluZGV4KTtcblxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBzZWxlY3RlZEl0ZW06IGl0ZW0sXG4gICAgICAgICAgcHJldmlvdXNJdGVtOiBwcmV2aW91c0l0ZW0sXG4gICAgICAgICAgdmFsdWU6IGl0ZW0gLy8gZm9yIFBvbHltZXIgYmluZGluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG91dGVybW9zdC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdEZpcnN0XG4gICAqL1xuICBzZWxlY3RGaXJzdCgpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgMCk7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgbGlzdCBzaG91bGQgYWx3YXlzIGhhdmUgYSBzZWxlY3Rpb24gKGlmIGl0IGhhcyBpdGVtcykuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3Rpb25SZXF1aXJlZFxuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqL1xuICBnZXQgc2VsZWN0aW9uUmVxdWlyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblJlcXVpcmVkO1xuICB9XG4gIHNldCBzZWxlY3Rpb25SZXF1aXJlZChzZWxlY3Rpb25SZXF1aXJlZCkge1xuICAgIHRoaXMuX3NlbGVjdGlvblJlcXVpcmVkID0gc2VsZWN0aW9uUmVxdWlyZWQ7XG4gICAgZW5zdXJlU2VsZWN0aW9uKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgbGFzdCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdExhc3RcbiAgICovXG4gIHNlbGVjdExhc3QoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIHRoaXMuaXRlbXMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBuZXh0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0TmV4dFxuICAgKi9cbiAgc2VsZWN0TmV4dCgpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgdGhpcy5zZWxlY3RlZEluZGV4ICsgMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdFByZXZpb3VzXG4gICAqL1xuICBzZWxlY3RQcmV2aW91cygpIHtcbiAgICByZXR1cm4gc2VsZWN0SW5kZXgodGhpcywgdGhpcy5zZWxlY3RlZEluZGV4IC0gMSk7XG4gIH1cblxufVxuXG5cbi8vIElmIG5vIGl0ZW0gaXMgc2VsZWN0ZWQsIHNlbGVjdCBhIGRlZmF1bHQgaXRlbS5cbi8vIFRPRE86IElmIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIGl0ZW0gaGFzIGJlZW4gZGVsZXRlZCwgdHJ5IHRvIHNlbGVjdCBhblxuLy8gaXRlbSBhZGphY2VudCB0byB0aGUgcG9zaXRpb24gaXQgaGVsZC5cbmZ1bmN0aW9uIGVuc3VyZVNlbGVjdGlvbihlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudC5zZWxlY3RlZEl0ZW0gJiYgZWxlbWVudC5pdGVtcyAmJiBlbGVtZW50Lml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSAwO1xuICB9XG59XG5cbi8vIEVuc3VyZSB0aGUgZ2l2ZW4gaW5kZXggaXMgd2l0aGluIGJvdW5kcywgYW5kIHNlbGVjdCBpdCBpZiBpdCdzIG5vdCBhbHJlYWR5XG4vLyBzZWxlY3RlZC5cbmZ1bmN0aW9uIHNlbGVjdEluZGV4KGVsZW1lbnQsIGluZGV4KSB7XG4gIGxldCBib3VuZGVkSW5kZXggPSBNYXRoLm1heChNYXRoLm1pbihpbmRleCwgZWxlbWVudC5pdGVtcy5sZW5ndGggLSAxKSwgMCk7XG4gIGxldCBwcmV2aW91c0luZGV4ID0gZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICBpZiAocHJldmlvdXNJbmRleCAhPT0gYm91bmRlZEluZGV4KSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gYm91bmRlZEluZGV4O1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBGb2xsb3dpbmcgYSBjaGFuZ2UgaW4gc2VsZWN0aW9uLCByZXBvcnQgd2hldGhlciBpdCdzIG5vdyBwb3NzaWJsZSB0b1xuLy8gZ28gbmV4dC9wcmV2aW91cyBmcm9tIHRoZSBnaXZlbiBpbmRleC5cbmZ1bmN0aW9uIHVwZGF0ZVBvc3NpYmxlTmF2aWdhdGlvbnMoZWxlbWVudCwgaW5kZXgpIHtcbiAgbGV0IGNhblNlbGVjdE5leHQ7XG4gIGxldCBjYW5TZWxlY3RQcmV2aW91cztcbiAgbGV0IGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgaWYgKGl0ZW1zID09IG51bGwgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgY2FuU2VsZWN0TmV4dCA9IGZhbHNlO1xuICAgIGNhblNlbGVjdFByZXZpb3VzID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlLiBJZiB0aGVyZSdzIG5vIHNlbGVjdGlvbiwgd2UgZGVjbGFyZSB0aGF0IGl0J3MgYWx3YXlzXG4gICAgLy8gcG9zc2libGUgdG8gZ28gbmV4dC9wcmV2aW91cyB0byBjcmVhdGUgYSBzZWxlY3Rpb24uXG4gICAgY2FuU2VsZWN0TmV4dCA9IHRydWU7XG4gICAgY2FuU2VsZWN0UHJldmlvdXMgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIC8vIE5vcm1hbCBjYXNlOiB3ZSBoYXZlIGFuIGluZGV4IGluIGEgbGlzdCB0aGF0IGhhcyBpdGVtcy5cbiAgICBjYW5TZWxlY3RQcmV2aW91cyA9IChpbmRleCA+IDApO1xuICAgIGNhblNlbGVjdE5leHQgPSAoaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKTtcbiAgfVxuICBlbGVtZW50LmNhblNlbGVjdE5leHQgPSBjYW5TZWxlY3ROZXh0O1xuICBlbGVtZW50LmNhblNlbGVjdFByZXZpb3VzID0gY2FuU2VsZWN0UHJldmlvdXM7XG59XG5cblxuLy8gcHJvcGVydGllczoge1xuLy9cbi8vICAgc2VsZWN0ZWRJbmRleDoge1xuLy8gICAgIHR5cGU6IE51bWJlclxuLy8gICB9XG4vL1xuLy8gICBzZWxlY3RlZEl0ZW06IHtcbi8vICAgICB0eXBlOiBPYmplY3Rcbi8vICAgfVxuLy9cbi8vICAgc2VsZWN0aW9uUmVxdWlyZWQ6IHtcbi8vICAgICB0eXBlOiBCb29sZWFuLFxuLy8gICAgIG9ic2VydmVyOiAnc2VsZWN0aW9uUmVxdWlyZWRDaGFuZ2VkJyxcbi8vICAgICB2YWx1ZTogZmFsc2Vcbi8vICAgfVxuLy9cbi8vIH1cbi8vXG4vLyBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbi8vICAgLy8gSEFDSzogUHJveGllZCBnZXR0ZXIvc2V0dGVyIHByb3BlcnRpZXMgbGlrZSB0aGlzIG9uZSBjYW4ndCBiZSBzZXQgdmlhXG4vLyAgIC8vIGF0dHJpYnV0ZXMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUG9seW1lci9wb2x5bWVyL2lzc3Vlcy8yNDU0LiBXZVxuLy8gICAvLyBjdXJyZW50bHkgaGFjayBhcm91bmQgdGhpcyBieSBvbmx5IHJldHVybmluZyBhIHZhbHVlIGZvciB0aGlzIHByb3BlcnR5IGlmXG4vLyAgIC8vIHRoZSBlbGVtZW50IGlzIHJlYWR5LiBBIG5lZ2F0aXZlIHNpZGUgZWZmZWN0IGlzIHRoYXQgaW5zcGVjdGluZyB0aGlzXG4vLyAgIC8vIHByb3BlcnR5IGJlZm9yZSB0aGUgZWxlbWVudCBpcyByZWFkeSB3aWxsIGFsd2F5cyByZXR1cm4gdW5kZWZpbmVkLlxuLy8gICBpZiAodGhpcy5fcmVhZGllZCkge1xuLy8gICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXg7XG4vLyAgIH1cbi8vIH1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIGFkZHMgQVJJQSByb2xlcyBmb3IgbGlzdHMgYW5kIGxpc3QgaXRlbXMuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtYWNjZXNzaWJsZS1saXN0XG4gKi9cblxuLy8gVXNlZCB0byBhc3NpZ24gdW5pcXVlIElEcyB0byBpdGVtIGVsZW1lbnRzIHdpdGhvdXQgSURzLlxubGV0IGlkQ291bnQgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtc0FjY2Vzc2libGUge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZCk7XG4gICAgdmFyIGl0ZW1JZCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlmIChpdGVtSWQpIHtcbiAgICAgIHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBpdGVtSWQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC8vIEVuc3VyZSB0aGUgb3V0ZXJtb3N0IGFzcGVjdCBoYXMgcm9sZT1cImxpc3Rib3hcIi5cbiAgLy8gY29sbGVjdGl2ZUNoYW5nZWQoKSB7XG4gIC8vXG4gIC8vICAgdmFyIG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gIC8vICAgaWYgKHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0ID09PSBvdXRlcm1vc3QpIHtcbiAgLy8gICAgIC8vIEFscmVhZHkgY29uZmlndXJlZC5cbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgaWYgKHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0KSB7XG4gIC8vICAgICAvLyBSZW1vdmUgQVJJQSBhdHRyaWJ1dGVzIGZyb20gcHJldmlvdXMgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuICAvLyAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgb3V0ZXJtb3N0LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gIC8vXG4gIC8vICAgLy8gRGV0ZXJtaW5lIGEgYmFzZSBpdGVtIElEIGJhc2VkIG9uIHRoaXMgY29tcG9uZW50J3MgaG9zdCdzIG93biBJRC4gVGhpc1xuICAvLyAgIC8vIHdpbGwgYmUgY29tYmluZWQgd2l0aCBhIHVuaXF1ZSBpbnRlZ2VyIHRvIGFzc2lnbiBJRHMgdG8gaXRlbXMgdGhhdCBkb24ndFxuICAvLyAgIC8vIGhhdmUgYW4gZXhwbGljaXQgSUQuIElmIHRoZSBiYXNpYy1saXN0LWJveCBoYXMgSUQgXCJmb29cIiwgdGhlbiBpdHMgaXRlbXNcbiAgLy8gICAvLyB3aWxsIGhhdmUgSURzIHRoYXQgbG9vayBsaWtlIFwiX2Zvb09wdGlvbjFcIi4gSWYgdGhlIGxpc3QgaGFzIG5vIElEIGl0c2VsZixcbiAgLy8gICAvLyBpdHMgaXRlbXMgd2lsbCBnZXQgSURzIHRoYXQgbG9vayBsaWtlIFwiX29wdGlvbjFcIi4gSXRlbSBJRHMgYXJlIHByZWZpeGVkXG4gIC8vICAgLy8gd2l0aCBhbiB1bmRlcnNjb3JlIHRvIGRpZmZlcmVudGlhdGUgdGhlbSBmcm9tIG1hbnVhbGx5LWFzc2lnbmVkIElEcywgYW5kXG4gIC8vICAgLy8gdG8gbWluaW1pemUgdGhlIHBvdGVudGlhbCBmb3IgSUQgY29uZmxpY3RzLlxuICAvL1xuICAvLyAgIC8vIFRPRE86IFRoaXMgY2hlY2sgbm93IGNvbWVzIHRvbyBsYXRlIGZvciBjb21wb25lbnRzIGxpa2UgYmFzaWMtbGlzdC1ib3guXG4gIC8vICAgLy8gV2UgbWF5IG5lZWQgdG8gZHluYW1pY2FsbHkgdXBkYXRlIHRoZSBpdGVtIElEcyB3aGVuZXZlciB0aGUgY29sbGVjdGlvblxuICAvLyAgIC8vIGNoYW5nZXMsIGFsdGhvdWdoIHRoYXQgcmVxdWlyZXMga2VlcGluZyB0cmFjayBvZiB3aGV0aGVyIHdlJ3ZlIGNoYW5nZWRcbiAgLy8gICAvLyBhbiBpdGVtJ3MgSUQgb3Igd2hldGhlciBpdCdzIGFsd2F5cyBoYWQgdGhhdCBJRC5cbiAgLy8gICB2YXIgZWxlbWVudElkID0gb3V0ZXJtb3N0LmdldEF0dHJpYnV0ZSggXCJpZFwiICk7XG4gIC8vICAgdGhpcy5pdGVtQmFzZUlkID0gZWxlbWVudElkID9cbiAgLy8gICAgICAgXCJfXCIgKyBlbGVtZW50SWQgKyBcIk9wdGlvblwiIDpcbiAgLy8gICAgICAgXCJfb3B0aW9uXCI7XG4gIC8vXG4gIC8vICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QgPSBvdXRlcm1vc3Q7XG4gIC8vIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgb3V0ZXJtb3N0LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG5cbiAgICAvLyBEZXRlcm1pbmUgYSBiYXNlIGl0ZW0gSUQgYmFzZWQgb24gdGhpcyBjb21wb25lbnQncyBob3N0J3Mgb3duIElELiBUaGlzXG4gICAgLy8gd2lsbCBiZSBjb21iaW5lZCB3aXRoIGEgdW5pcXVlIGludGVnZXIgdG8gYXNzaWduIElEcyB0byBpdGVtcyB0aGF0IGRvbid0XG4gICAgLy8gaGF2ZSBhbiBleHBsaWNpdCBJRC4gSWYgdGhlIGJhc2ljLWxpc3QtYm94IGhhcyBJRCBcImZvb1wiLCB0aGVuIGl0cyBpdGVtc1xuICAgIC8vIHdpbGwgaGF2ZSBJRHMgdGhhdCBsb29rIGxpa2UgXCJfZm9vT3B0aW9uMVwiLiBJZiB0aGUgbGlzdCBoYXMgbm8gSUQgaXRzZWxmLFxuICAgIC8vIGl0cyBpdGVtcyB3aWxsIGdldCBJRHMgdGhhdCBsb29rIGxpa2UgXCJfb3B0aW9uMVwiLiBJdGVtIElEcyBhcmUgcHJlZml4ZWRcbiAgICAvLyB3aXRoIGFuIHVuZGVyc2NvcmUgdG8gZGlmZmVyZW50aWF0ZSB0aGVtIGZyb20gbWFudWFsbHktYXNzaWduZWQgSURzLCBhbmRcbiAgICAvLyB0byBtaW5pbWl6ZSB0aGUgcG90ZW50aWFsIGZvciBJRCBjb25mbGljdHMuXG5cbiAgICAvLyBUT0RPOiBUaGlzIGNoZWNrIG5vdyBjb21lcyB0b28gbGF0ZSBmb3IgY29tcG9uZW50cyBsaWtlIGJhc2ljLWxpc3QtYm94LlxuICAgIC8vIFdlIG1heSBuZWVkIHRvIGR5bmFtaWNhbGx5IHVwZGF0ZSB0aGUgaXRlbSBJRHMgd2hlbmV2ZXIgdGhlIGNvbGxlY3Rpb25cbiAgICAvLyBjaGFuZ2VzLCBhbHRob3VnaCB0aGF0IHJlcXVpcmVzIGtlZXBpbmcgdHJhY2sgb2Ygd2hldGhlciB3ZSd2ZSBjaGFuZ2VkXG4gICAgLy8gYW4gaXRlbSdzIElEIG9yIHdoZXRoZXIgaXQncyBhbHdheXMgaGFkIHRoYXQgSUQuXG4gICAgdmFyIGVsZW1lbnRJZCA9IG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApO1xuICAgIHRoaXMuaXRlbUJhc2VJZCA9IGVsZW1lbnRJZCA/XG4gICAgICAgIFwiX1wiICsgZWxlbWVudElkICsgXCJPcHRpb25cIiA6XG4gICAgICAgIFwiX29wdGlvblwiO1xuICB9XG5cbiAgaXRlbUFkZGVkKGl0ZW0pIHtcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgncm9sZScsICdvcHRpb24nKTtcblxuICAgIC8vIEVuc3VyZSBlYWNoIGl0ZW0gaGFzIGFuIElEIHNvIHdlIGNhbiBzZXQgYXJpYS1hY3RpdmVkZXNjZW5kYW50IG9uIHRoZVxuICAgIC8vIG92ZXJhbGwgbGlzdCB3aGVuZXZlciB0aGUgc2VsZWN0aW9uIGNoYW5nZXMuXG4gICAgaWYgKCFpdGVtLmdldEF0dHJpYnV0ZSgnaWQnKSkge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pdGVtQmFzZUlkICsgaWRDb3VudCsrKTtcbiAgICB9XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICAvLyBDYXRjaCB0aGUgY2FzZSB3aGVyZSB0aGUgc2VsZWN0aW9uIGlzIHJlbW92ZWQuXG4gICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5vdXRlcm1vc3RBdHRhY2hlZC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH1cbiAgfVxuXG59XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYW5hZ2VzIHRoZSBrZXlib2FyZCBmb2N1cyBhbmQga2V5ZG93biBoYW5kbGluZyBmb3IgYSBjb21wb25lbnQuXG4gKlxuICogVGhpcyBhc3BlY3QgZW5zdXJlcyB0aGF0IGl0cyBvbmx5IHRoZSBvdXRlcm1vc3QgYXNwZWN0IGluIGEgY29sbGVjdGl2ZSB0aGF0IGlzXG4gKiBsaXN0ZW5pbmcgZm9yIGtleWJvYXJkIGV2ZW50cy5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1rZXlib2FyZFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkIHtcblxuICAvKlxuICAgKiBXaGVuIHRoZSBjb2xsZWN0aXZlIGNoYW5nZXMsIHN0b3AgbGlzdGVuaW5nIGZvciBrZXlib2FyZCBldmVudHMgb25cbiAgICogd2hpY2hldmVyIGFzcGVjdCB3YXMgcHJldmlvdXNseSB0aGUgb3V0ZXJtb3N0IGFzcGVjdCwgYW5kIHN0YXJ0IGxpc3RlbmluZ1xuICAgKiB0byBrZXlib2FyZCBldmVudHMgb24gd2hpY2hldmVyIGFzcGVjdCBpcyBub3cgdGhlIG5ldyBvdXRlcm1vc3QgYXNwZWN0LlxuICAgKi9cbiAgLy8gVE9ETzogRG8gd2UgbmVlZCB0byBzdGFydC9zdG9wIGxpc3RlbmluZyB3aGVuIGF0dGFjaGVkL2RldGFjaGVkLCBvciBpc1xuICAvLyB0aGF0IGhhbmRsZWQgYXV0b21hdGljYWxseT9cbiAgLy8gY29sbGVjdGl2ZUNoYW5nZWQ6IGZ1bmN0aW9uKCkge1xuICAvL1xuICAvLyAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLmNvbGxlY3RpdmUub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gIC8vICAgaWYgKG91dGVybW9zdCA9PT0gdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QpIHtcbiAgLy8gICAgIC8vIFNob3VsZCBhbHJlYWR5IGJlIGxpc3RlbmluZyB0byBldmVudHMgb24gdGhlIG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCkge1xuICAvLyAgICAgLy8gQ2xlYW4gdXAgdGhlIHByZXZpb3VzIGFzcGVjdCB0aGF0IHdhcyBoYW5kbGluZyB0aGUga2V5Ym9hcmQuXG4gIC8vXG4gIC8vICAgICBpZiAodGhpcy5fcHJldmlvdXNUYWJJbmRleCkge1xuICAvLyAgICAgICAvLyBSZXN0b3JlIHByZXZpb3VzIHRhYiBpbmRleC5cbiAgLy8gICAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3Quc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIHRoaXMuX3ByZXZpb3VzVGFiSW5kZXgpO1xuICAvLyAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgLy8gQXNwZWN0IGRpZG4ndCBoYXZlIGEgdGFiIGluZGV4IGJlZm9yZSwgc28gcmVtb3ZlIGl0LlxuICAvLyAgICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG4gIC8vICAgICB9XG4gIC8vXG4gIC8vICAgICAvLyBTdG9wIGxpc3RlbmluZyB0byBldmVudHMgdGhlIHByZXZpb3VzIG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkhhbmRsZXIpO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBpZiAob3V0ZXJtb3N0LmdldEF0dHJpYnV0ZSgndGFiSW5kZXgnKSkge1xuICAvLyAgICAgLy8gTGVhdmUgZXhpc3RpbmcgdGFiIGluZGV4IGluIHBsYWNlLlxuICAvLyAgICAgdGhpcy5fcHJldmlvdXNUYWJJbmRleCA9IG51bGw7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIC8vIE1ha2UgbmV3IG91dGVybW9zdCBhc3BlY3QgZm9jdXNhYmxlLlxuICAvLyAgICAgdGhpcy5fcHJldmlvdXNUYWJJbmRleCA9IG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG4gIC8vICAgICBvdXRlcm1vc3Quc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIDApO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICAvLyBTdGFydCBsaXN0ZW5pbmcgdG8gZXZlbnRzIG9uIHRoZSBuZXcgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgLy8gICBpZiAoIXRoaXMuX2tleWRvd25IYW5kbGVyKSB7XG4gIC8vICAgICB0aGlzLl9rZXlkb3duSGFuZGxlciA9IHRoaXMuX2tleWRvd24uYmluZCh0aGlzKTtcbiAgLy8gICB9XG4gIC8vICAgb3V0ZXJtb3N0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duSGFuZGxlcik7XG4gIC8vXG4gIC8vICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QgPSBvdXRlcm1vc3Q7XG4gIC8vIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgbGV0IGhhbmRsZWQgPSB0aGlzLmtleWRvd24oZXZlbnQpO1xuICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JywgMCk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGtleWRvd24gaGFuZGxlci4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAga2V5ZG93bihldmVudCkge31cblxufSIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgZGlyZWN0aW9uIGtleXMgKExlZnQsIFJpZ2h0LCBldGMuKSB0byBkaXJlY3Rpb24gc2VtYW50aWNzXG4gKiAoZ29MZWZ0LCBnb1JpZ2h0LCBldGMuKS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1rZXlib2FyZC1kaXJlY3Rpb25cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmREaXJlY3Rpb24ge1xuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb25zLiBUaGVzZSB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgZ29Eb3duKCkge31cbiAgZ29FbmQoKSB7fVxuICBnb0xlZnQoKSB7fVxuICBnb1JpZ2h0KCkge31cbiAgZ29TdGFydCgpIHt9XG4gIGdvVXAoKSB7fVxuXG4gIGtleWRvd24oZXZlbnQpIHtcbiAgICBsZXQgaGFuZGxlZDtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzU6IC8vIEVuZFxuICAgICAgICBoYW5kbGVkID0gdGhpcy5nb0VuZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzY6IC8vIEhvbWVcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29TdGFydCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6IC8vIExlZnRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29MZWZ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODogLy8gVXBcbiAgICAgICAgaGFuZGxlZCA9IGV2ZW50LmFsdEtleSA/IHRoaXMuZ29TdGFydCgpIDogdGhpcy5nb1VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTogLy8gUmlnaHRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29SaWdodCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6IC8vIERvd25cbiAgICAgICAgaGFuZGxlZCA9IGV2ZW50LmFsdEtleSA/IHRoaXMuZ29FbmQoKSA6IHRoaXMuZ29Eb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gaGFuZGxlZDtcbiAgfVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoS2V5Ym9hcmREaXJlY3Rpb24ucHJvdG90eXBlLCB7XG4gIGdvRG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvRW5kOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29MZWZ0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29SaWdodDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvU3RhcnQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb1VwOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAga2V5ZG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyTWl4aW5SZXN1bHQpXG59KTtcbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgcGFnZSBrZXlzIChQYWdlIFVwLCBQYWdlIERvd24pIGludG8gb3BlcmF0aW9ucyB0aGF0IHNjcm9sbFxuICogdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBUaGUga2V5Ym9hcmQgaW50ZXJhY3Rpb24gbW9kZWwgZ2VuZXJhbGx5IGZvbGxvd3MgdGhhdCBvZiBNaWNyb3NvZnQgV2luZG93cydcbiAqIGxpc3QgYm94ZXMgaW5zdGVhZCBvZiB0aG9zZSBpbiBPUyBYOlxuICpcbiAqICogVGhlIFBhZ2UgVXAvRG93biBhbmQgSG9tZS9FbmQga2V5cyBhY3R1YWxseSBtb3ZlIHRoZSBzZWxlY3Rpb24sIHJhdGhlciB0aGFuXG4gKiAgIGp1c3Qgc2Nyb2xsaW5nLiBUaGUgZm9ybWVyIGJlaGF2aW9yIHNlZW1zIG1vcmUgZ2VuZXJhbGx5IHVzZWZ1bCBmb3Iga2V5Ym9hcmRcbiAqICAgdXNlcnMuXG4gKlxuICogKiBQcmVzc2luZyBQYWdlIFVwL0Rvd24gd2lsbCBtb3ZlIHRoZSBzZWxlY3Rpb24gdG8gdGhlIHRvcG1vc3QvYm90dG9tbW9zdFxuICogICB2aXNpYmxlIGl0ZW0gaWYgdGhlIHNlbGVjdGlvbiBpcyBub3QgYWxyZWFkeSB0aGVyZS4gVGhlcmVhZnRlciwgdGhlIGtleSB3aWxsXG4gKiAgIG1vdmUgdGhlIHNlbGVjdGlvbiB1cC9kb3duIGJ5IGEgcGFnZSwgYW5kIChwZXIgdGhlIGFib3ZlIHBvaW50KSBtYWtlIHRoZVxuICogICBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmQtcGFnaW5nXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkUGFnaW5nIHtcblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDMzOiAvLyBQYWdlIFVwXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLnBhZ2VVcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzQ6IC8vIFBhZ2UgRG93blxuICAgICAgICBoYW5kbGVkID0gdGhpcy5wYWdlRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIGRvd24gb25lIHBhZ2UuXG4gICAqXG4gICAqIEBtZXRob2QgcGFnZURvd25cbiAgICovXG4gIHBhZ2VEb3duKCkge1xuICAgIHJldHVybiBzY3JvbGxPbmVQYWdlKHRoaXMsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB1cCBvbmUgcGFnZS5cbiAgICpcbiAgICogQG1ldGhvZCBwYWdlVXBcbiAgICovXG4gIHBhZ2VVcCgpIHtcbiAgICByZXR1cm4gc2Nyb2xsT25lUGFnZSh0aGlzLCBmYWxzZSk7XG4gIH1cblxufVxuXG5cbi8vIFJldHVybiB0aGUgaXRlbSB3aG9zZSBjb250ZW50IHNwYW5zIHRoZSBnaXZlbiB5IHBvc2l0aW9uIChyZWxhdGl2ZSB0byB0aGVcbi8vIHRvcCBvZiB0aGUgbGlzdCdzIHNjcm9sbGluZyBjbGllbnQgYXJlYSksIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuLy9cbi8vIElmIGRvd253YXJkIGlzIHRydWUsIG1vdmUgZG93biB0aGUgbGlzdCBvZiBpdGVtcyB0byBmaW5kIHRoZSBmaXJzdCBpdGVtXG4vLyBmb3VuZCBhdCB0aGUgZ2l2ZW4geSBwb3NpdGlvbjsgaWYgZG93bndhcmQgaXMgZmFsc2UsIG1vdmUgdXAgdGhlIGxpc3Qgb2Zcbi8vIGl0ZW1zIHRvIGZpbmQgdGhlIGxhc3QgaXRlbSBhdCB0aGF0IHBvc2l0aW9uLlxuZnVuY3Rpb24gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgeSwgZG93bndhcmQpIHtcbiAgdmFyIGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgdmFyIHN0YXJ0ID0gZG93bndhcmQgPyAwIDogaXRlbXMubGVuZ3RoIC0gMTtcbiAgdmFyIGVuZCA9IGRvd253YXJkID8gaXRlbXMubGVuZ3RoIDogMDtcbiAgdmFyIHN0ZXAgPSBkb3dud2FyZCA/IDEgOiAtMTtcbiAgdmFyIGlubmVybW9zdCA9IGVsZW1lbnQuaW5uZXJtb3N0QXR0YWNoZWQ7XG4gIHZhciB0b3BPZkNsaWVudEFyZWEgPSBpbm5lcm1vc3Qub2Zmc2V0VG9wICsgaW5uZXJtb3N0LmNsaWVudFRvcDtcbiAgdmFyIGkgPSBzdGFydDtcbiAgdmFyIGZvdW5kID0gZmFsc2U7XG4gIHdoaWxlIChpICE9PSBlbmQpIHtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIHZhciBpdGVtVG9wID0gaXRlbS5vZmZzZXRUb3AgLSB0b3BPZkNsaWVudEFyZWE7XG4gICAgdmFyIGl0ZW1Cb3R0b20gPSBpdGVtVG9wICsgaXRlbS5vZmZzZXRIZWlnaHQ7XG4gICAgaWYgKGl0ZW1Ub3AgPD0geSAmJiBpdGVtQm90dG9tID49IHkpIHtcbiAgICAgIC8vIEl0ZW0gc3BhbnMgdGhlIGluZGljYXRlZCB5IGNvb3JkaW5hdGUuXG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaSArPSBzdGVwO1xuICB9XG5cbiAgaWYgKCFmb3VuZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gV2UgbWF5IGhhdmUgZm91bmQgYW4gaXRlbSB3aG9zZSBwYWRkaW5nIHNwYW5zIHRoZSBnaXZlbiB5IGNvb3JkaW5hdGUsXG4gIC8vIGJ1dCB3aG9zZSBjb250ZW50IGlzIGFjdHVhbGx5IGFib3ZlL2JlbG93IHRoYXQgcG9pbnQuXG4gIC8vIFRPRE86IElmIHRoZSBpdGVtIGhhcyBhIGJvcmRlciwgdGhlbiBwYWRkaW5nIHNob3VsZCBiZSBpbmNsdWRlZCBpblxuICAvLyBjb25zaWRlcmluZyBhIGhpdC5cbiAgdmFyIGl0ZW1TdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoaXRlbSk7XG4gIHZhciBpdGVtUGFkZGluZ1RvcCA9IHBhcnNlRmxvYXQoaXRlbVN0eWxlLnBhZGRpbmdUb3ApO1xuICB2YXIgaXRlbVBhZGRpbmdCb3R0b20gPSBwYXJzZUZsb2F0KGl0ZW1TdHlsZS5wYWRkaW5nQm90dG9tKTtcbiAgdmFyIGNvbnRlbnRUb3AgPSBpdGVtVG9wICsgaXRlbS5jbGllbnRUb3AgKyBpdGVtUGFkZGluZ1RvcDtcbiAgdmFyIGNvbnRlbnRCb3R0b20gPSBjb250ZW50VG9wICsgaXRlbS5jbGllbnRIZWlnaHQgLSBpdGVtUGFkZGluZ1RvcCAtIGl0ZW1QYWRkaW5nQm90dG9tO1xuICBpZiAoZG93bndhcmQgJiYgY29udGVudFRvcCA8PSB5XG4gICAgfHwgIWRvd253YXJkICYmIGNvbnRlbnRCb3R0b20gPj0geSkge1xuICAgIC8vIFRoZSBpbmRpY2F0ZWQgY29vcmRpbmF0ZSBoaXRzIHRoZSBhY3R1YWwgaXRlbSBjb250ZW50LlxuICAgIHJldHVybiBpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIFRoZSBpbmRpY2F0ZWQgY29vcmRpbmF0ZSBmYWxscyB3aXRoaW4gdGhlIGl0ZW0ncyBwYWRkaW5nLiBCYWNrIHVwIHRvXG4gICAgLy8gdGhlIGl0ZW0gYmVsb3cvYWJvdmUgdGhlIGl0ZW0gd2UgZm91bmQgYW5kIHJldHVybiB0aGF0LlxuICAgIGkgLT0gc3RlcDtcbiAgICByZXR1cm4gaTtcbiAgfVxufVxuXG4vLyBNb3ZlIGJ5IG9uZSBwYWdlIGRvd253YXJkIChpZiBkb3dud2FyZCBpcyB0cnVlKSwgb3IgdXB3YXJkIChpZiBmYWxzZSkuXG4vLyBSZXR1cm4gdHJ1ZSBpZiB3ZSBlbmRlZCB1cCBjaGFuZ2luZyB0aGUgc2VsZWN0aW9uLCBmYWxzZSBpZiBub3QuXG4vLyBUT0RPOiBCZXR0ZXIgc3VwcG9ydCBmb3IgaG9yaXpvbnRhbCBsaXN0cy5cbmZ1bmN0aW9uIHNjcm9sbE9uZVBhZ2UoZWxlbWVudCwgZG93bndhcmQpIHtcblxuICB2YXIgaW5uZXJtb3N0ID0gZWxlbWVudC5pbm5lcm1vc3RBdHRhY2hlZDtcbiAgaWYgKCFpbm5lcm1vc3QpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZXRlcm1pbmUgdGhlIGl0ZW0gdmlzaWJsZSBqdXN0IGF0IHRoZSBlZGdlIG9mIGRpcmVjdGlvbiB3ZSdyZSBoZWFkaW5nLlxuICAvLyBXZSdsbCBzZWxlY3QgdGhhdCBpdGVtIGlmIGl0J3Mgbm90IGFscmVhZHkgc2VsZWN0ZWQuXG4gIHZhciBlZGdlID0gaW5uZXJtb3N0LnNjcm9sbFRvcCArIChkb3dud2FyZCA/IGlubmVybW9zdC5jbGllbnRIZWlnaHQgOiAwKTtcbiAgdmFyIGluZGV4T2ZJdGVtQXRFZGdlID0gZ2V0SW5kZXhPZkl0ZW1BdFkoZWxlbWVudCwgZWRnZSwgZG93bndhcmQpO1xuXG4gIHZhciBzZWxlY3RlZEluZGV4ID0gZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICB2YXIgbmV3SW5kZXg7XG4gIGlmIChpbmRleE9mSXRlbUF0RWRnZSAmJiBzZWxlY3RlZEluZGV4ID09PSBpbmRleE9mSXRlbUF0RWRnZSkge1xuICAgIC8vIFRoZSBpdGVtIGF0IHRoZSBlZGdlIHdhcyBhbHJlYWR5IHNlbGVjdGVkLCBzbyBzY3JvbGwgaW4gdGhlIGluZGljYXRlZFxuICAgIC8vIGRpcmVjdGlvbiBieSBvbmUgcGFnZS4gTGVhdmUgdGhlIG5ldyBpdGVtIGF0IHRoYXQgZWRnZSBzZWxlY3RlZC5cbiAgICB2YXIgZGVsdGEgPSAoZG93bndhcmQgPyAxIDogLTEpICogaW5uZXJtb3N0LmNsaWVudEhlaWdodDtcbiAgICBuZXdJbmRleCA9IGdldEluZGV4T2ZJdGVtQXRZKGVsZW1lbnQsIGVkZ2UgKyBkZWx0YSwgZG93bndhcmQpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIFRoZSBpdGVtIGF0IHRoZSBlZGdlIHdhc24ndCBzZWxlY3RlZCB5ZXQuIEluc3RlYWQgb2Ygc2Nyb2xsaW5nLCB3ZSdsbFxuICAgIC8vIGp1c3Qgc2VsZWN0IHRoYXQgaXRlbS4gVGhhdCBpcywgdGhlIGZpcnN0IGF0dGVtcHQgdG8gcGFnZSB1cC9kb3duXG4gICAgLy8gdXN1YWxseSBqdXN0IG1vdmVzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGVkZ2UgaW4gdGhhdCBkaXJlY3Rpb24uXG4gICAgbmV3SW5kZXggPSBpbmRleE9mSXRlbUF0RWRnZTtcbiAgfVxuXG4gIGlmICghbmV3SW5kZXgpIHtcbiAgICAvLyBXZSBjYW4ndCBmaW5kIGFuIGl0ZW0gaW4gdGhlIGRpcmVjdGlvbiB3ZSB3YW50IHRvIHRyYXZlbC4gU2VsZWN0IHRoZVxuICAgIC8vIGxhc3QgaXRlbSAoaWYgbW92aW5nIGRvd253YXJkKSBvciBmaXJzdCBpdGVtIChpZiBtb3ZpbmcgdXB3YXJkKS5cbiAgICBuZXdJbmRleCA9IChkb3dud2FyZCA/IGVsZW1lbnQuaXRlbXMubGVuZ3RoIC0gMSA6IDApO1xuICB9XG5cbiAgaWYgKG5ld0luZGV4ICE9PSBzZWxlY3RlZEluZGV4KSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gbmV3SW5kZXg7XG4gICAgcmV0dXJuIHRydWU7IC8vIFdlIGhhbmRsZWQgdGhlIHBhZ2UgdXAvZG93biBvdXJzZWx2ZXMuXG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBXZSBkaWRuJ3QgZG8gYW55dGhpbmcuXG4gIH1cbn1cbkNvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChLZXlib2FyZFBhZ2luZy5wcm90b3R5cGUsIHtcbiAga2V5ZG93bjogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyTWl4aW5SZXN1bHQpXG59KTtcbiIsIi8qKlxuICogSGFuZGxlIGxpc3QgYm94LXN0eWxlIHByZWZpeCB0eXBpbmcsIGluIHdoaWNoIHRoZSB1c2VyIGNhbiB0eXBlIGEgc3RyaW5nIHRvXG4gKiBzZWxlY3QgdGhlIGZpcnN0IGl0ZW0gdGhhdCBiZWdpbnMgd2l0aCB0aGF0IHN0cmluZy5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1rZXlib2FyZC1wcmVmaXgtc2VsZWN0aW9uXG4gKlxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG4vLyBUT0RPOiBJZiB0aGUgc2VsZWN0aW9uIGlzIGNoYW5nZWQgYnkgc29tZSBvdGhlciBtZWFucyAoZS5nLiwgYXJyb3cga2V5cykgb3RoZXJcbi8vIHRoYW4gcHJlZml4IHR5cGluZywgdGhlbiB0aGF0IGFjdCBzaG91bGQgcmVzZXQgdGhlIHByZWZpeC5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24ge1xuXG4gIC8vIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgLy8gICB0aGlzLl9pdGVtVGV4dENvbnRlbnRzID0gbnVsbDtcbiAgLy8gICByZXNldFR5cGVkUHJlZml4KHRoaXMpO1xuICAvLyB9XG5cbiAga2V5ZG93bihldmVudCkge1xuICAgIGxldCBoYW5kbGVkO1xuICAgIGxldCByZXNldFByZWZpeCA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgODogLy8gQmFja3NwYWNlXG4gICAgICAgIGhhbmRsZUJhY2tzcGFjZSh0aGlzKTtcbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIHJlc2V0UHJlZml4ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyNzogLy8gRXNjYXBlXG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICghZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleSAmJiAhZXZlbnQuYWx0S2V5XG4gICAgICAgICAgJiYgZXZlbnQud2hpY2ggIT09IDMyIC8qIFNwYWNlICovKSB7XG4gICAgICAgICAgaGFuZGxlUGxhaW5DaGFyYWN0ZXIodGhpcywgU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC53aGljaCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0UHJlZml4ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHJlc2V0UHJlZml4KSB7XG4gICAgICByZXNldFR5cGVkUHJlZml4KHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBoYW5kbGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgZmlyc3QgaXRlbSB3aG9zZSB0ZXh0IGNvbnRlbnQgYmVnaW5zIHdpdGggdGhlIGdpdmVuIHByZWZpeC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RJdGVtV2l0aFRleHRQcmVmaXhcbiAgICogQHBhcmFtIHByZWZpeCBbU3RyaW5nXSBUaGUgc3RyaW5nIHRvIHNlYXJjaCBmb3JcbiAgICovXG4gIHNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChwcmVmaXgpIHtcbiAgICBpZiAocHJlZml4ID09IG51bGwgfHwgcHJlZml4Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaW5kZXggPSBnZXRJbmRleE9mSXRlbVdpdGhUZXh0UHJlZml4KHRoaXMsIHByZWZpeCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoS2V5Ym9hcmRQcmVmaXhTZWxlY3Rpb24ucHJvdG90eXBlLCB7XG4gIGtleWRvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlck1peGluUmVzdWx0KVxufSk7XG5cblxuLy8gVGltZSBpbiBtaWxsaXNlY29uZHMgYWZ0ZXIgd2hpY2ggdGhlIHVzZXIgaXMgY29uc2lkZXJlZCB0byBoYXZlIHN0b3BwZWRcbi8vIHR5cGluZy5cbmNvbnN0IFBSRUZJWF9USU1FT1VUX0RVUkFUSU9OID0gMTAwMDtcblxuXG4vLyBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIHdpdGggdGhlIGdpdmVuIHByZWZpeCwgZWxzZSAtMS5cbmZ1bmN0aW9uIGdldEluZGV4T2ZJdGVtV2l0aFRleHRQcmVmaXgoZWxlbWVudCwgcHJlZml4KSB7XG4gIGxldCBpdGVtVGV4dENvbnRlbnRzID0gZ2V0SXRlbVRleHRDb250ZW50cyhlbGVtZW50KTtcbiAgbGV0IHByZWZpeExlbmd0aCA9IHByZWZpeC5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbVRleHRDb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBpdGVtVGV4dENvbnRlbnQgPSBpdGVtVGV4dENvbnRlbnRzW2ldO1xuICAgIGlmIChpdGVtVGV4dENvbnRlbnQuc3Vic3RyKDAsIHByZWZpeExlbmd0aCkgPT09IHByZWZpeCkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLy8gUmV0dXJuIGFuIGFycmF5IG9mIHRoZSB0ZXh0IGNvbnRlbnQgKGluIGxvd2VyY2FzZSkgb2YgYWxsIGl0ZW1zLlxuLy8gQ2FjaGUgdGhlc2UgcmVzdWx0cy5cbmZ1bmN0aW9uIGdldEl0ZW1UZXh0Q29udGVudHMoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQuX2l0ZW1UZXh0Q29udGVudHMpIHtcbiAgICBsZXQgaXRlbXMgPSBlbGVtZW50Lml0ZW1zO1xuICAgIGVsZW1lbnQuX2l0ZW1UZXh0Q29udGVudHMgPSBpdGVtcy5tYXAoY2hpbGQgPT4ge1xuICAgICAgbGV0IHRleHQgPSBjaGlsZC50ZXh0Q29udGVudCB8fCBjaGlsZC5hbHQ7XG4gICAgICByZXR1cm4gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCYWNrc3BhY2UoZWxlbWVudCkge1xuICBsZXQgbGVuZ3RoID0gZWxlbWVudC5fdHlwZWRQcmVmaXggPyBlbGVtZW50Ll90eXBlZFByZWZpeC5sZW5ndGggOiAwO1xuICBpZiAobGVuZ3RoID4gMCkge1xuICAgIGVsZW1lbnQuX3R5cGVkUHJlZml4ID0gZWxlbWVudC5fdHlwZWRQcmVmaXguc3Vic3RyKDAsIGxlbmd0aCAtIDEpO1xuICB9XG4gIGVsZW1lbnQuc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KGVsZW1lbnQuX3R5cGVkUHJlZml4KTtcbiAgZWxlbWVudC5fc2V0UHJlZml4VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVQbGFpbkNoYXJhY3RlcihlbGVtZW50LCBjaGFyKSB7XG4gIGxldCBwcmVmaXggPSBlbGVtZW50Ll90eXBlZFByZWZpeCB8fCAnJztcbiAgZWxlbWVudC5fdHlwZWRQcmVmaXggPSBwcmVmaXggKyBjaGFyLnRvTG93ZXJDYXNlKCk7XG4gIGVsZW1lbnQuc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4KGVsZW1lbnQuX3R5cGVkUHJlZml4KTtcbiAgc2V0UHJlZml4VGltZW91dChlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQoZWxlbWVudC5fcHJlZml4VGltZW91dCk7XG4gICAgZWxlbWVudC5fcHJlZml4VGltZW91dCA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0VHlwZWRQcmVmaXgoZWxlbWVudCkge1xuICBlbGVtZW50Ll90eXBlZFByZWZpeCA9ICcnO1xuICByZXNldFByZWZpeFRpbWVvdXQoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHNldFByZWZpeFRpbWVvdXQoZWxlbWVudCkge1xuICByZXNldFByZWZpeFRpbWVvdXQoZWxlbWVudCk7XG4gIGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICByZXNldFR5cGVkUHJlZml4KGVsZW1lbnQpO1xuICB9LCBQUkVGSVhfVElNRU9VVF9EVVJBVElPTik7XG59XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBhcHBsaWVzIHN0YW5kYXJkIGhpZ2hsaWdodCBjb2xvcnMgdG8gYSBzZWxlY3RlZCBpdGVtLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLXNlbGVjdGlvbi1oaWdobGlnaHRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3Rpb25IaWdobGlnaHQge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzZWxlY3RlZCA/ICdoaWdobGlnaHQnIDogJyc7XG4gICAgaXRlbS5zdHlsZS5jb2xvciA9IHNlbGVjdGVkID8gJ2hpZ2hsaWdodHRleHQnIDogJyc7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggc2Nyb2xscyBhIGNvbnRhaW5lciB0byBrZWVwIHRoZSBzZWxlY3RlZCBpdGVtIHZpc2libGUuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtc2VsZWN0aW9uLXNjcm9sbFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGlvblNjcm9sbCB7XG5cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIC8vIEtlZXAgdGhlIHNlbGVjdGVkIGl0ZW0gaW4gdmlldy5cbiAgICAgIHRoaXMuc2Nyb2xsSXRlbUludG9WaWV3KGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdGhlIGdpdmVuIGVsZW1lbnQgY29tcGxldGVseSBpbnRvIHZpZXcsIG1pbmltaXppbmcgdGhlIGRlZ3JlZSBvZlxuICAgKiBzY3JvbGxpbmcgcGVyZm9ybWVkLlxuICAgKlxuICAgKiBCbGluayBoYXMgYSBzY3JvbGxJbnRvVmlld0lmTmVlZGVkKCkgZnVuY3Rpb24gdGhhdCBhbG1vc3QgdGhlIHNhbWUgdGhpbmcsXG4gICAqIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0J3Mgbm9uLXN0YW5kYXJkLCBhbmQgaW4gYW55IGV2ZW50IG9mdGVuIGVuZHMgdXBcbiAgICogc2Nyb2xsaW5nIG1vcmUgdGhhbiBpcyBhYnNvbHV0ZWx5IG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQG1ldGhvZCBzY3JvbGxJdGVtSW50b1ZpZXdcbiAgICovXG4gIHNjcm9sbEl0ZW1JbnRvVmlldyhpdGVtKSB7XG4gICAgLy8gR2V0IHRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvcCBvZiB0aGVcbiAgICAvLyBsaXN0J3Mgc2Nyb2xsYWJsZSBjYW52YXMuIEFuIGl0ZW0gYXQgdGhlIHRvcCBvZiB0aGUgbGlzdCB3aWxsIGhhdmUgYVxuICAgIC8vIGVsZW1lbnRUb3Agb2YgMC5cblxuICAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmlubmVybW9zdEF0dGFjaGVkO1xuICAgIGlmICghaW5uZXJtb3N0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRUb3AgPSBpdGVtLm9mZnNldFRvcCAtIGlubmVybW9zdC5vZmZzZXRUb3AgLSBpbm5lcm1vc3QuY2xpZW50VG9wO1xuICAgIGxldCBlbGVtZW50Qm90dG9tID0gZWxlbWVudFRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgIC8vIERldGVybWluZSB0aGUgYm90dG9tIG9mIHRoZSBzY3JvbGxhYmxlIGNhbnZhcy5cbiAgICBsZXQgc2Nyb2xsQm90dG9tID0gaW5uZXJtb3N0LnNjcm9sbFRvcCArIGlubmVybW9zdC5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGVsZW1lbnRCb3R0b20gPiBzY3JvbGxCb3R0b20pIHtcbiAgICAgIC8vIFNjcm9sbCB1cCB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wICs9IGVsZW1lbnRCb3R0b20gLSBzY3JvbGxCb3R0b207XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnRUb3AgPCBpbm5lcm1vc3Quc2Nyb2xsVG9wKSB7XG4gICAgICAvLyBTY3JvbGwgZG93biB1bnRpbCBpdGVtIGlzIGVudGlyZWx5IHZpc2libGUuXG4gICAgICBpbm5lcm1vc3Quc2Nyb2xsVG9wID0gZWxlbWVudFRvcDtcbiAgICB9XG4gIH1cblxufVxuIiwiLypcbiAqIEV4dGVuZCBjbGFzc2VzL29iamVjdHMgd2l0aCBvdGhlciBjbGFzc2VzL29iamVjdHMuXG4gKi9cblxuaW1wb3J0ICogYXMgQ29tcG9zaXRpb25SdWxlcyBmcm9tICcuL0NvbXBvc2l0aW9uUnVsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb3NhYmxlIHtcblxuICAvKlxuICAgKiBSZXR1cm4gYSBzdWJjbGFzcyBvZiB0aGUgY3VycmVudCBjbGFzcyB0aGF0IGluY2x1ZGVzIHRoZSBtZW1iZXJzIGluZGljYXRlZFxuICAgKiBpbiB0aGUgYXJndW1lbnQuIFRoZSBhcmd1bWVudCBjYW4gYmUgYSBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdCwgb3IgYSBjbGFzc1xuICAgKiB3aG9zZSBwcm90b3R5cGUgY29udGFpbnMgdGhlIG1lbWJlcnMgdGhhdCB3aWxsIGJlIGNvcGllZC5cbiAgICpcbiAgICogVGhpcyBjYW4gYmUgdXNlZCBmb3IgYSBjb3VwbGUgb2YgcHVycG9zZXM6XG4gICAqIDEuIEV4dGVuZCBhIGNsYXNzIHdpdGggbWl4aW5zL2JlaGF2aW9ycy5cbiAgICogMi4gQ3JlYXRlIGEgY29tcG9uZW50IGNsYXNzIGluIEVTNS5cbiAgICpcbiAgICogVGhlIGNhbGxcbiAgICpcbiAgICogICBNeUJhc2VDbGFzcy5jb21wb3NlKE1peGluMSwgTWl4aW4yLCBNaXhpbjMpXG4gICAqXG4gICAqIHdpbGwgcmV0dXJuIGEgbmV3IGNsYXNzIG9mIE15QmFzZUNsYXNzIHRoYXQgaW1wbGVtZW50cyBhbGwgdGhlIG1ldGhvZHMgaW5cbiAgICogdGhlIHRocmVlIG1peGlucyBnaXZlbi4gVGhlIGFib3ZlIGlzIGVxdWl2YWxlbnQgdG9cbiAgICpcbiAgICogICBNeUJhc2VDbGFzcy5jb21wb3NlKE1peGluMSkuY29tcG9zZShNaXhpbjIpLmNvbXBvc2UoTWl4aW4zKVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgc3RhdGljYWxseSBpbnZva2VkIHRvIGV4dGVuZCBwbGFpbiBvYmplY3RzIG9yIGNsYXNzZXNcbiAgICogdGhhdCBkb24ndCBpbmhlcml0IGZyb20gdGhpcyBjbGFzczpcbiAgICpcbiAgICogICBsZXQgZXh0ZW5kZWQgPSBDb21wb3NhYmxlLmV4dGVuZC5jYWxsKG9iajEsIG9iajIpO1xuICAgKlxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2UoLi4ubWl4aW5zKSB7XG4gICAgLy8gV2UgY3JlYXRlIGEgbmV3IHN1YmNsYXNzIGZvciBlYWNoIG1peGluIGluIHR1cm4uIFRoZSByZXN1bHQgYmVjb21lc1xuICAgIC8vIHRoZSBiYXNlIGNsYXNzIGV4dGVuZGVkIGJ5IGFueSBzdWJzZXF1ZW50IG1peGlucy4gSXQgdHVybnMgb3V0IHRoYXRcbiAgICAvLyB3ZSBjYW4gdXNlIEFycmF5LnJlZHVjZSgpIHRvIGNvbmNpc2VseSBleHByZXNzIHRoaXMsIHVzaW5nIHRoZSBjdXJyZW50XG4gICAgLy8gKG9yaWdpbmFsKSBjbGFzcyBhcyB0aGUgc2VlZCBmb3IgcmVkdWNlKCkuXG4gICAgcmV0dXJuIG1peGlucy5yZWR1Y2UoY29tcG9zZSwgdGhpcyk7XG4gIH1cblxuICAvKlxuICAgKiBEZWNvcmF0ZSBcInRoaXNcIiB3aXRoIHRoZSBpbmRpY2F0ZWQgZGVjb3JhdG9ycy4gVGhlIGxhdHRlciBzaG91bGQgYmUgYVxuICAgKiBkaWN0aW9uYXJ5IG1hcHBpbmcgcHJvcGVydHkgbmFtZXMgdG8gKHByb3Bvc2VkKSBFUzctY29tcGxpYW50IGRlY29yYXRvcnMuXG4gICAqIFRoaXMgYWxsb3dzIHRoZSB1c2Ugb2YgZGVjb3JhdG9ycyBpbiBFUzYvNS4gRXhhbXBsZSwgdGhpcyBFUzcgY29kZTpcbiAgICpcbiAgICogICBjbGFzcyBGb28ge1xuICAgKiAgICAgIEBkZWNvcmF0ZShjdXN0b21EZWNvcmF0b3IpXG4gICAqICAgICAgYmFyKCkge31cbiAgICogICB9XG4gICAqXG4gICAqIGNhbiBiZSB3cml0dGVuIHVzaW5nIHRoZSBkZWNvcmF0ZSgpIG1ldGhvZCBhczpcbiAgICpcbiAgICogICBjbGFzcyBGb28ge1xuICAgKiAgICAgIGJhcigpIHt9XG4gICAqICAgfVxuICAgKiAgIENvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChGb28ucHJvdG90eXBlLCB7IGJhcjogY3VzdG9tRGVjb3JhdG9yIH0pO1xuICAgKlxuICAgKiBPciwgaWYgRm9vIGRlcml2ZXMgZnJvbSBDb21wb3NhYmxlIGFscmVhZHksIHRoaXMgY2FuIGJlIHNob3J0ZXI6XG4gICAqXG4gICAqICAgY2xhc3MgRm9vIGV4dGVuZHMgQ29tcG9zYWJsZSB7XG4gICAqICAgICAgYmFyKCkge31cbiAgICogICB9XG4gICAqICAgRm9vLnByb3RvdHlwZS5kZWNvcmF0ZSh7IGJhcjogY3VzdG9tRGVjb3JhdG9yIH0pO1xuICAgKlxuICAgKi9cbiAgc3RhdGljIGRlY29yYXRlKGRlY29yYXRvcnMpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gZGVjb3JhdG9ycykge1xuICAgICAgbGV0IGRlY29yYXRvciA9IGRlY29yYXRvcnNba2V5XTtcbiAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBrZXkpO1xuICAgICAgZGVjb3JhdG9yKHRoaXMsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBEZWNvcmF0ZXMgdGhlIHByb3RvdHlwZSBvZiBhIGNsYXNzIGRlcml2ZWQgZnJvbSBDb21wb3NhYmxlLlxuICAgKiBTZWUgbm90ZXMgZm9yIHRoZSBzdGF0aWMgZGVjb3JhdGUoKSBtZXRob2QuXG4gICAqL1xuICBkZWNvcmF0ZShkZWNvcmF0b3JzKSB7XG4gICAgQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKHRoaXMsIGRlY29yYXRvcnMpO1xuICB9XG5cbiAgLypcbiAgICogRGVjb3JhdG9yIGZvciBhbm5vdGF0aW5nIGhvdyBhIGNsYXNzIG1lbWJlciBzaG91bGQgYmUgY29tcG9zZWQgbGF0ZXIuXG4gICAqIFRoaXMgdGFrZXMgYSBkZWNvcmF0b3IgdGhhdCB3aWxsIGJlIHJ1biBhdCAqY29tcG9zaXRpb24qIHRpbWUuXG4gICAqIEZvciBub3csIHRoaXMgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBtZXRob2RzLlxuICAgKi9cbiAgc3RhdGljIHJ1bGUoZGVjb3JhdG9yKSB7XG4gICAgLy8gUmV0dXJuIGEgZGVjb3JhdG9yIHRoYXQgcmVjb3JkcyB0aGUgZ2l2ZW4gZGVjb3JhdG9yIG9uIHRoZSBtZW1iZXIgaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgLy8gVE9ETzogVXNlIGEgU3ltYm9sIGluc3RlYWQgb2YgYSBzdHJpbmcgcHJvcGVydHkgbmFtZSB0byBzYXZlIHRoaXMuXG4gICAgICAvLyBkZXNjcmlwdG9yLnZhbHVlLl9jb21wb3NpdGlvblJ1bGUgPSBkZWNvcmF0b3I7XG4gICAgICBpZiAoIXRhcmdldC5fY29tcG9zaXRpb25SdWxlcykge1xuICAgICAgICB0YXJnZXQuX2NvbXBvc2l0aW9uUnVsZXMgPSB7fTtcbiAgICAgIH1cbiAgICAgIHRhcmdldC5fY29tcG9zaXRpb25SdWxlc1trZXldID0gZGVjb3JhdG9yO1xuICAgIH1cbiAgfVxuXG59XG5cblxuLypcbiAqIEV4cG9zZSBzdGFuZGFyZCBjb21wb3NpdGlvbiBydWxlcyBhcyBwcm9wZXJ0aWVzIG9mIENvbXBvc2FibGUuXG4gKiBUaGlzIGF2b2lkcyB0aGUgbmVlZCBmb3Igc29tZW9uZSB0byBtYWtlIGEgc2VwYXJhdGUgaW1wb3J0IG9mIHRoZSBydWxlcy5cbiAqL1xuQ29tcG9zYWJsZS5ydWxlcyA9IENvbXBvc2l0aW9uUnVsZXM7XG5cblxuLypcbiAqIEFsbCBDb21wb3NhYmxlIG9iamVjdHMgaGF2ZSBhIFwicHJvdG90eXBlc1wiIGtleSB0aGF0IGtlZXBzIHJlZmVyZW5jZXMgdG8gdGhlXG4gKiBtaXhpbnMgdGhhdCB3ZXJlIGFwcGxpZWQgYWxvbmcgdGhlIHByb3RvdHlwZSBjaGFpbi4gV2hlbiBhICpuYW1lZCogbWl4aW4gaXNcbiAqIGFwcGxpZWQgdG8gdGhlIHByb3RvdHlwZSBjaGFpbiwgdGhlIHJlc3VsdGluZyBvYmplY3QgKG9yLCBmb3IgYSBjbGFzcywgdGhlXG4gKiBjbGFzcycgcHJvdG90eXBlKSB3aWxsIGhhdmUgYSBcInByb3RvdHlwZXNcIiB2YWx1ZSBmb3IgdGhhdCBuYW1lIHRoYXQgcG9pbnRzXG4gKiBiYWNrIHRvIHRoZSBtaXhpbi4gVGhhdCBpcywgYSBtaXhpbiBjYW4gZ2V0IGEgcG9pbnRlciB0byBpdHNlbGYgaW4gdGhlIGNoYWluLlxuICpcbiAqIEEgc2luZ2xlIG1peGluIGNhbiBiZSBhcHBsaWVkIHRvIG11bHRpcGxlIHByb3RvdHlwZSBjaGFpbnMgLS0gdGhlIG5hbWVcbiAqIHJlZmVycyB0byB0aGUgcHJvdG90eXBlIG9uICp0aGlzIHBhcnRpY3VsYXIgcHJvdG90eXBlIGNoYWluKiB0aGF0IHdhcyBhZGRlZFxuICogZm9yIHRoYXQgbWl4aW4uIFRoaXMgbGV0cyBtaXhpbi9taXhpbiBjb2RlIGdldCBiYWNrIHRvIGl0cyBvd25cbiAqIHByb3RvdHlwZSwgbW9zdCBvZnRlbiBpbiBjb21iaW5hdGlvbiB3aXRoIFwic3VwZXJcIiAoc2VlIGJlbG93KSBpbiBvcmRlciB0b1xuICogaW52b2tlIHN1cGVyY2xhc3MgYmVoYXZpb3IuXG4gKi9cbkNvbXBvc2FibGUucHJvdG90eXBlLnByb3RvdHlwZXMgPSB7XG4gIENvbXBvc2FibGU6IENvbXBvc2FibGUucHJvdG90eXBlXG59O1xuXG4vKlxuICogQWxsIENvbXBvc2FibGUtY3JlYXRlZCBvYmplY3RzIGhhdmUgYSBcInN1cGVyXCIgcHJvcGVydHkgdGhhdCByZWZlcmVuY2VzIHRoZVxuICogcHJvdG90eXBlIGFib3ZlIHRoZW0gaW4gdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAqXG4gKiBUaGlzIFwic3VwZXJcIiByZWZlcmVuY2UgaXMgdXNlZCBhcyBhIHJlcGxhY2VtZW50IGZvciBFUzYncyBcInN1cGVyXCIga2V5d29yZCBpblxuICogaW4gRVM1IChvciB0cmFuc3BpbGVkIEVTNikgbWl4aW5zIHRoYXQgd2FudCB0byBpbnZva2Ugc3VwZXJjbGFzcyBiZWhhdmlvcixcbiAqIHdoZXJlIHRoZSBzcGVjaWZpYyBzdXBlcmNsYXNzIHdpbGwgZGVwZW5kIHVwb24gd2hpY2ggbWl4aW5zIGhhdmUgYmVlbiBhcHBsaWVkXG4gKiB0byBhIGdpdmVuIHByb3RvdHlwZSBjaGFpbi5cbiAqXG4gKiBFLmcuOlxuICogICBjbGFzcyBNaXhpbiB7XG4gKiAgICAgZm9vKCkge1xuICogICAgICAgaWYgKHRoaXMucHJvdG95cGVzLk1peGluLnN1cGVyLmZvbykge1xuICogICAgICAgICB0aGlzLnByb3RvdHlwZXMuTWl4aW4uc3VwZXIuZm9vLmNhbGwodGhpcyk7IC8vIEludm9rZSBzdXBlcmNsYXNzJyBmb28oKVxuICogICAgICAgfVxuICogICAgICAgLy8gRG8gTWl4aW4tc3BlY2lmaWMgd29yayBoZXJlLi4uXG4gKiAgICAgfVxuICogICB9XG4gKlxuICogRm9yIGNvbnNpc3RlbmN5LCBDb21wb3NhYmxlIGl0c2VsZiByZWNvcmRzIGl0cyBvd24gc3VwZXJjbGFzcyBhcyBPYmplY3QuXG4gKi9cbkNvbXBvc2FibGUucHJvdG90eXBlLnN1cGVyID0gT2JqZWN0LnByb3RvdHlwZTtcblxuXG4vLyBDb21wb3NpdGlvbiBydWxlcyBmb3Igc3RhbmRhcmQgb2JqZWN0IG1lbWJlcnMuXG5Db21wb3NhYmxlLnByb3RvdHlwZS5jb21wb3NpdGlvblJ1bGVzID0ge1xuICAnX19tZXRob2RfXyc6IENvbXBvc2FibGUucnVsZXMucHJvcGFnYXRlRnVuY3Rpb24sXG4gICdfX3Byb3BlcnR5X18nOiBDb21wb3NhYmxlLnJ1bGVzLnByb3BhZ2F0ZVByb3BlcnR5LFxuICAncHJvdG90eXBlcyc6IENvbXBvc2FibGUucnVsZXMuY2hhaW5Qcm90b3R5cGVzXG59O1xuXG5cbi8vIFByb3BlcnRpZXMgZGVmaW5lZCBieSBGdW5jdGlvbiB0aGF0IHdlIGRvbid0IHdhbnQgdG8gbWl4aW4uXG4vLyBXZSdkIHByZWZlciB0byBnZXQgdGhlc2UgYnkgaW50ZXJyb2dhdGluZyBGdW5jdGlvbiBpdHNlbGYsIGJ1dCBXZWJLaXRcbi8vIGZ1bmN0aW9ucyBoYXZlIHNvbWUgcHJvcGVydGllcyAoYXJndW1lbnRzIGFuZCBjYWxsZXIpIHdoaWNoIGFyZSBub3QgcmV0dXJuZWRcbi8vIGJ5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEZ1bmN0aW9uKS5cbmNvbnN0IE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMgPSBbXG4gICdhcmd1bWVudHMnLFxuICAnY2FsbGVyJyxcbiAgJ2xlbmd0aCcsXG4gICduYW1lJyxcbiAgJ3Byb3RvdHlwZSdcbl07XG5cbi8vIFByb3BlcnRpZXMgZGVmaW5lZCBieSBPYmplY3QgdGhhdCB3ZSBkb24ndCB3YW50IHRvIG1peGluLlxuY29uc3QgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMgPSBbXG4gICdjb25zdHJ1Y3Rvcidcbl07XG5cblxuLypcbiAqIEFwcGx5IHRoZSBjb21wb3NpdGlvbiBydWxlcyBpbiBlZmZlY3QgZm9yIHRoZSBnaXZlbiBvYmplY3QsIHdoaWNoIGxpZXMgYXRcbiAqIHRoZSB0aXAgb2YgYSBwcm90b3R5cGUgY2hhaW4uIFRoaXMgbG9va3MgZm9yIGNvbmZsaWN0cyBiZXR3ZWVuIHRoZSBvYmplY3Qnc1xuICogb3duIHByb3BlcnRpZXMgKGFuZCBtZXRob2RzKSwgYW5kIGlkZW50aWNhbGx5LW5hbWVkIHByb3BlcnRpZXMgKG1ldGhvZHMpXG4gKiBmdXJ0aGVyIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uIENvbmZsaWN0cyBhcmUgcmVzb2x2ZWQgd2l0aCBydWxlcyBkZWZpbmVkIGJ5XG4gKiB0aGUgYWZmZWN0IG1lbWJlcnMuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5Q29tcG9zaXRpb25SdWxlcyhvYmopIHtcbiAgbGV0IG93bkNvbXBvc2l0aW9uUnVsZXMgPSBvYmouaGFzT3duUHJvcGVydHkoJ19jb21wb3NpdGlvblJ1bGVzJykgP1xuICAgIG9iai5fY29tcG9zaXRpb25SdWxlcyA6XG4gICAge307XG4gIGxldCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzID0gb2JqLmNvbXBvc2l0aW9uUnVsZXM7XG4gIGxldCBkZWZhdWx0Q29tcG9zaXRpb25SdWxlcyA9IENvbXBvc2FibGUucHJvdG90eXBlLmNvbXBvc2l0aW9uUnVsZXM7XG5cbiAgLy8gRm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgc2VlIGlmIHRoZSBiYXNlIGhhcyBhIHByb3BlcnR5IHdpdGggdGhlIHNhbWUgbmFtZS5cbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGlmIChuYW1lIGluIGJhc2UgJiYgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA8IDApIHtcbiAgICAgIC8vIEJhc2UgZG9lcyBpbXBsZW1lbnQgYSBtZW1iZXIgd2l0aCB0aGUgc2FtZSBuYW1lOyBuZWVkIHRvIGNvbWJpbmUuXG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgICAgIGxldCBrZXkgPSBnZXRHZW5lcmFsRGVzY3JpcHRvcktleShkZXNjcmlwdG9yKTtcblxuICAgICAgLy8gU2VlIGlmIHRoaXMgcHJvcGVydHkgaGFzIGEgcnVsZSBhc3NvY2lhdGVkIHdpdGggaXQsIGNoZWNraW5nOlxuICAgICAgbGV0IHJ1bGUgPSBvd25Db21wb3NpdGlvblJ1bGVzW25hbWVdICAgIC8vIG9iamVjdCBpdHNlbGZcbiAgICAgICAgICB8fCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzW25hbWVdICAvLyBpbmhlcml0ZWQgcnVsZXMgZm9yIG5hbWVcbiAgICAgICAgICB8fCBpbmhlcml0ZWRDb21wb3NpdGlvblJ1bGVzW2tleV0gICAvLyBpbmhlcml0ZWQgcnVsZXMgZ2VuZXJhbGx5XG4gICAgICAgICAgfHwgZGVmYXVsdENvbXBvc2l0aW9uUnVsZXNbbmFtZV0gICAgLy8gZGVmYXVsdCBydWxlcyBmb3IgbmFtZVxuICAgICAgICAgIHx8IGRlZmF1bHRDb21wb3NpdGlvblJ1bGVzW2tleV07ICAgIC8vIGRlZmF1bHQgcnVsZXMgZ2VuZXJhbGx5XG5cbiAgICAgIC8vIFwib3ZlcnJpZGVcIiBpcyBhIGtub3duIG5vLW9wLCBzbyB3ZSBkb24ndCBib3RoZXIgdHJ5aW5nIHRvIHJlZGVmaW5lIHRoZVxuICAgICAgLy8gcHJvcGVydHkuXG4gICAgICBpZiAocnVsZSAmJiBydWxlICE9PSBDb21wb3NhYmxlLnJ1bGVzLm92ZXJyaWRlKSB7XG4gICAgICAgIHJ1bGUob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuXG4vKlxuICogQ29weSB0aGUgZ2l2ZW4gcHJvcGVydGllcy9tZXRob2RzIHRvIHRoZSB0YXJnZXQuXG4gKiBSZXR1cm4gdGhlIHVwZGF0ZWQgdGFyZ2V0LlxuICovXG5mdW5jdGlvbiBjb3B5T3duUHJvcGVydGllcyhzb3VyY2UsIHRhcmdldCwgaWdub3JlUHJvcGVydHlOYW1lcyA9IFtdKSB7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICBpZiAoaWdub3JlUHJvcGVydHlOYW1lcy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gYSBuZXcgc3ViY2xhc3Mvb2JqZWN0IHRoYXQgZXh0ZW5kcyB0aGUgZ2l2ZW4gYmFzZSBjbGFzcy9vYmplY3Qgd2l0aFxuICogdGhlIG1lbWJlcnMgb2YgdGhlIGluZGljYXRlZCBtaXhpbi5cbiAqL1xuZnVuY3Rpb24gY29tcG9zZShiYXNlLCBtaXhpbikge1xuXG4gIC8vIFNlZSBpZiB0aGUgKm1peGluKiBoYXMgYSBiYXNlIGNsYXNzL3Byb3RvdHlwZSBvZiBpdHMgb3duLlxuICBsZXQgbWl4aW5Jc0NsYXNzID0gaXNDbGFzcyhtaXhpbik7XG4gIGxldCBtaXhpbkJhc2UgPSBtaXhpbklzQ2xhc3MgP1xuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihtaXhpbi5wcm90b3R5cGUpLmNvbnN0cnVjdG9yIDpcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWl4aW4pO1xuICBpZiAobWl4aW5CYXNlICYmXG4gICAgICBtaXhpbkJhc2UgIT09IEZ1bmN0aW9uICYmXG4gICAgICBtaXhpbkJhc2UgIT09IE9iamVjdCAmJlxuICAgICAgbWl4aW5CYXNlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgLy8gVGhlIG1peGluIGl0c2VsZiBkZXJpdmVzIGZyb20gYW5vdGhlciBjbGFzcy9vYmplY3QuXG4gICAgLy8gUmVjdXJzZSwgYW5kIGV4dGVuZCB3aXRoIHRoZSBtaXhpbidzIGJhc2UgZmlyc3QuXG4gICAgYmFzZSA9IGNvbXBvc2UoYmFzZSwgbWl4aW5CYXNlKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgZXh0ZW5kZWQgb2JqZWN0IHdlJ3JlIGdvaW5nIHRvIHJldHVybiBhcyBhIHJlc3VsdC5cbiAgbGV0IGJhc2VJc0NsYXNzID0gaXNDbGFzcyhiYXNlKTtcbiAgbGV0IHJlc3VsdCA9IGJhc2VJc0NsYXNzID9cbiAgICBjcmVhdGVTdWJjbGFzcyhiYXNlKSA6XG4gICAgT2JqZWN0LmNyZWF0ZShiYXNlKTtcblxuICAvLyBUaGUgXCJ0YXJnZXRcIiBoZXJlIGlzIHRoZSB0YXJnZXQgb2Ygb3VyIHByb3BlcnR5L21ldGhvZCBjb21wb3NpdGlvbiBydWxlcy5cbiAgbGV0IHRhcmdldDtcbiAgaWYgKGJhc2VJc0NsYXNzICYmIG1peGluSXNDbGFzcykge1xuICAgIC8vIEV4dGVuZGluZyBjbGFzcyB3aXRoIGNsYXNzOiBjb3B5IHN0YXRpYyBtZW1iZXJzLCB0aGVuIHByb3RvdHlwZSBtZW1iZXJzLlxuICAgIGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCByZXN1bHQsIE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMpO1xuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLnByb3RvdHlwZSwgcmVzdWx0LnByb3RvdHlwZSwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9IGVsc2UgaWYgKCFiYXNlSXNDbGFzcyAmJiBtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgcGxhaW4gb2JqZWN0IHdpdGggY2xhc3M6IGNvcHkgcHJvdG90eXBlIG1ldGhvZHMgdG8gcmVzdWx0LlxuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLnByb3RvdHlwZSwgcmVzdWx0LCBOT05fTUlYQUJMRV9GVU5DVElPTl9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIGlmIChiYXNlSXNDbGFzcyAmJiAhbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIGNsYXNzIHdpdGggcGxhaW4gb2JqZWN0OiBjb3B5IG1peGluIHRvIHJlc3VsdCBwcm90b3R5cGUuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdC5wcm90b3R5cGUsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFeHRlbmRpbmcgcGxhaW4gb2JqZWN0IHdpdGggcGxhaW4gb2JqZWN0OiBjb3B5IGZvcm1lciB0byBsYXR0ZXIuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdCwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9XG5cbiAgaWYgKG1peGluLm5hbWUpIHtcbiAgICAvLyBVc2UgdGhlIG1peGluJ3MgbmFtZSAodXN1YWxseSB0aGUgbmFtZSBvZiBhIGNsYXNzJyBjb25zdHJ1Y3RvcikgdG9cbiAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIGJhY2sgdG8gdGhlIHRpcCBvZiB0aGUgbmV3bHktZXh0ZW5kZWQgcHJvdG90eXBlIGNoYWluLlxuICAgIC8vIFNlZSBub3RlcyBhdCBDb21wb3NhYmxlJ3MgXCJwcm90b3R5cGVzXCIgcHJvcGVydHkuXG4gICAgdGFyZ2V0LnByb3RvdHlwZXMgPSB7fTtcbiAgICB0YXJnZXQucHJvdG90eXBlc1ttaXhpbi5uYW1lXSA9IHRhcmdldDtcblxuICAgIC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyY2xhc3Mvc3VwZXItb2JqZWN0LiBTZWUgdGhlIGNvbW1lbnRzIG9uXG4gICAgLy8gQ29tcG9zYWJsZSdzIFwic3VwZXJcIiBwcm9wZXJ0eS5cbiAgICB0YXJnZXQuc3VwZXIgPSBiYXNlSXNDbGFzcyA/IGJhc2UucHJvdG90eXBlIDogYmFzZTtcbiAgfVxuXG4gIC8vIEFwcGx5IHRoZSBjb21wb3NpdGlvbiBydWxlcyBpbiBlZmZlY3QgYXQgdGhlIHRhcmdldC5cbiAgYXBwbHlDb21wb3NpdGlvblJ1bGVzKHRhcmdldCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG4vKlxuICogUmV0dXJuIGEgbmV3IHN1YmNsYXNzIG9mIHRoZSBnaXZlbiBiYXNlIGNsYXNzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVTdWJjbGFzcyhiYXNlKSB7XG4gIC8vIE9uY2UgV2ViS2l0IHN1cHBvcnRzIEhUTUxFbGVtZW50IGFzIGEgcmVhbCBjbGFzcywgd2UgY2FuIGp1c3Qgc2F5OlxuICAvL1xuICAvLyAgIGNsYXNzIHN1YmNsYXNzIGV4dGVuZHMgYmFzZSB7fVxuICAvL1xuICAvLyBIb3dldmVyLCB1bnRpbCB0aGF0J3MgcmVzb2x2ZWQsIHdlIGp1c3QgY29uc3RydWN0IHRoZSBjbGFzcyBvdXJzZWx2ZXMuXG4gIGZ1bmN0aW9uIHN1YmNsYXNzKCkge307XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJjbGFzcywgYmFzZSk7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJjbGFzcy5wcm90b3R5cGUsIGJhc2UucHJvdG90eXBlKTtcbiAgcmV0dXJuIHN1YmNsYXNzO1xufVxuXG5cbi8qXG4gKiBFeGFtaW5lIHRoZSBkZXNjcmlwdG9yIHRvIGRldGVybWluZSB3aGljaCBydWxlIGtleSBhcHBsaWVzLlxuICovXG5mdW5jdGlvbiBnZXRHZW5lcmFsRGVzY3JpcHRvcktleShkZXNjcmlwdG9yKSB7XG4gIGlmICh0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIE1ldGhvZFxuICAgIHJldHVybiAnX19tZXRob2RfXyc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlc2NyaXB0b3IuZ2V0ID09PSAnZnVuY3Rpb24nXG4gICAgICB8fCB0eXBlb2YgZGVzY3JpcHRvci5zZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBQcm9wZXJ0eSB3aXRoIGdldHRlciBhbmQvb3Igc2V0dGVyXG4gICAgcmV0dXJuICdfX3Byb3BlcnR5X18nO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gdHJ1ZSBpZiBjIGlzIGEgSmF2YVNjcmlwdCBjbGFzcy5cbiAqXG4gKiBXZSB1c2UgdGhpcyB0ZXN0IGJlY2F1c2UsIG9uIFdlYktpdCwgY2xhc3NlcyBsaWtlIEhUTUxFbGVtZW50IGFyZSBzcGVjaWFsLFxuICogYW5kIGFyZSBub3QgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uLiBUbyBoYW5kbGUgdGhhdCBjYXNlLCB3ZSB1c2UgYSBsb29zZXJcbiAqIGRlZmluaXRpb246IGFuIG9iamVjdCBpcyBhIGNsYXNzIGlmIGl0IGhhcyBhIHByb3RvdHlwZSwgYW5kIHRoYXQgcHJvdG90eXBlXG4gKiBoYXMgYSBjb25zdHJ1Y3RvciB0aGF0IGlzIHRoZSBvcmlnaW5hbCBvYmplY3QuIFRoaXMgY29uZGl0aW9uIGhvbGRzIHRydWUgZXZlblxuICogZm9yIEhUTUxFbGVtZW50IG9uIFdlYktpdC5cbiAqL1xuZnVuY3Rpb24gaXNDbGFzcyhjKSB7XG4gIHJldHVybiB0eXBlb2YgYyA9PT0gJ2Z1bmN0aW9uJyB8fCAgICAgICAgICAgICAgICAgICAvLyBTdGFuZGFyZFxuICAgICAgKGMucHJvdG90eXBlICYmIGMucHJvdG90eXBlLmNvbnN0cnVjdG9yID09PSBjKTsgLy8gSFRNTEVsZW1lbnQgaW4gV2ViS2l0XG59XG4iLCIvKipcbiAqIFN0YW5kYXJkIGNvbXBvc2l0aW9uIHJ1bGVzXG4gKi9cblxuLypcbiAqIFRha2UgdHdvIGZ1bmN0aW9ucyBhbmQgcmV0dXJuIGEgbmV3IGNvbXBvc2VkIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBib3RoLlxuICogVGhlIGNvbXBvc2VkIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIHNlY29uZCBmdW5jdGlvbi5cbiAqIFRoaXMgaXMgbm90IGEgcnVsZSwgYnV0IGEgaGVscGVyIHVzZWQgYnkgcnVsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlRnVuY3Rpb24oZnVuY3Rpb24xLCBmdW5jdGlvbjIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBmdW5jdGlvbjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuXG4vKlxuICogQ29tYmluYXRvciB0aGF0IHNldHMgdGhlIHByb3RvdHlwZSBvZiBhIG1peGluIHByb3BlcnR5IHZhbHVlIHRvIGJlIHRoZVxuICogY29ycmVzcG9uZGluZyB2YWx1ZSBvbiB0aGUgYmFzZS4gVGhpcyBlZmZlY3RpdmVseSBkb2VzIGEgc2hhbGxvdyBtZXJnZSBvZlxuICogb2YgdGhlIHByb3BlcnRpZXMsIHdpdGhvdXQgY29weWluZyBhbnkgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGFpblByb3RvdHlwZXModGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluVmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwga2V5KTtcbiAgbGV0IGJhc2VWYWx1ZSA9IGJhc2VEZXNjcmlwdG9yLnZhbHVlO1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobWl4aW5WYWx1ZSwgYmFzZVZhbHVlKTtcbn1cblxuXG4vKlxuICogUGVyZm9ybSBhIGRlZXAgbWVyZ2Ugb2YgYSBtaXhpbiBwcm9wZXJ0eSBvbiB0b3Agb2YgYSBiYXNlIHByb3BlcnR5LlxuICovXG4vLyBleHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4vLyAgIGxldCBtaXhpblZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbi8vICAgbGV0IGJhc2VWYWx1ZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpW2tleV0udmFsdWU7XG4vLyAgIGRlc2NyaXB0b3IudmFsdWUgPSAnbWVyZ2VkJzsgLy8gbWVyZ2UoYmFzZVZhbHVlLCBtaXhpblZhbHVlKTtcbi8vIH1cblxuLypcbiAqIExpa2UgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpLCBidXQgd2Fsa3MgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAqIFRoaXMgaXMgbmVlZGVkIGJ5IGNvbXBvc2l0aW9uIHJ1bGVzLCB3aGljaCB1c3VhbGx5IHN0YXJ0IG91dCBieSBnZXR0aW5nXG4gKiB0aGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBhIG1lbWJlciB0aGV5J3JlIGNvbXBvc2luZy5cbiAqIFRoaXMgaXMgbm90IGEgcnVsZSwgYnV0IGEgaGVscGVyIHVzZWQgYnkgcnVsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKSB7XG4gIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xuICBpZiAoZGVzY3JpcHRvcikge1xuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9IGVsc2Uge1xuICAgIGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAvLyBDaGVja2luZyBmb3IgXCJuYW1lIGluIHByb3RvdHlwZVwiIGxldHMgdXMga25vdyB3aGV0aGVyIHdlIHNob3VsZCBib3RoZXJcbiAgICAvLyB3YWxraW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgaWYgKHByb3RvdHlwZSAmJiBuYW1lIGluIHByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuIGdldFByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIG5hbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkOyAvLyBOb3QgZm91bmRcbn1cblxuXG4vKlxuICogQ29tYmluYXRvciB0aGF0IGNhdXNlcyBhIG1peGluIG1ldGhvZCB0byBvdmVycmlkZSBpdHMgYmFzZSBpbXBsZW1lbnRhdGlvbi5cbiAqIFNpbmNlIHRoaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIHByb3RvdHlwZSBjaGFpbiwgdGhpcyBpcyBhIG5vLW9wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb3ZlcnJpZGUodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHt9XG5cblxuLypcbiAqIENvbXBvc2UgbWV0aG9kcywgaW52b2tpbmcgYmFzZSBpbXBsZW1lbnRhdGlvbiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhXG4gKiB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIHRoZSBtaXhpbiBpbXBsZW1lbnRhdGlvbidzXG4gKiByZXN1bHQgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJCYXNlUmVzdWx0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpW2tleV07XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYmFzZUltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgfHwgbWl4aW5JbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cblxuLypcbiAqIENvbXBvc2UgbWV0aG9kcywgaW52b2tpbmcgbWl4aW4gaW1wbGVtZW50YXRpb24gZmlyc3QuIElmIGl0IHJldHVybnMgYVxuICogdHJ1dGh5IHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlLCB0aGUgYmFzZSBpbXBsZW1lbnRhdGlvbidzXG4gKiByZXN1bHQgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJNaXhpblJlc3VsdCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5JbXBsZW1lbnRhdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlSW1wbGVtZW50YXRpb24gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KVtrZXldO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1peGluSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICB8fCBiYXNlSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5cbi8qXG4gKiBEZWZhdWx0IHJ1bGUgZm9yIGNvbXBvc2luZyBtZXRob2RzOiBpbnZva2UgYmFzZSBmaXJzdCwgdGhlbiBtaXhpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3BhZ2F0ZUZ1bmN0aW9uKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpW2tleV07XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBjb21wb3NlRnVuY3Rpb24oYmFzZUltcGxlbWVudGF0aW9uLCBtaXhpbkltcGxlbWVudGF0aW9uKTtcbn1cblxuXG4vKlxuICogRGVmYXVsdCBydWxlIGZvciBjb21wb3NpbmcgcHJvcGVydGllcy5cbiAqIFdlIG9ubHkgY29tcG9zZSBzZXR0ZXJzLCB3aGljaCBpbnZva2UgYmFzZSBmaXJzdCwgdGhlbiBtaXhpbi5cbiAqIEEgZGVmaW5lZCBtaXhpbiBnZXR0ZXIgb3ZlcnJpZGVzIGEgYmFzZSBnZXR0ZXIuXG4gKiBOb3RlIHRoYXQsIGJlY2F1c2Ugb2YgdGhlIHdheSBwcm9wZXJ0eSBkZXNjcmlwdG9ycyB3b3JrLCBpZiB0aGUgbWl4aW4gb25seVxuICogZGVmaW5lcyBhIHNldHRlciwgYnV0IG5vdCBhIGdldHRlciwgd2UgaGF2ZSB0byBzdXBwbHkgYSBkZWZhdWx0IGdldHRlciB0aGF0XG4gKiBpbnZva2VzIHRoZSBiYXNlIGdldHRlci4gU2ltaWxhcmx5LCBpZiB0aGUgbWl4aW4ganVzdCBkZWZpbmVzIGEgZ2V0dGVyLFxuICogd2UgaGF2ZSB0byBzdXBwbHkgYSBkZWZhdWx0IHNldHRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3BhZ2F0ZVByb3BlcnR5KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvci5nZXQgJiYgIWRlc2NyaXB0b3Iuc2V0ICYmIGJhc2VEZXNjcmlwdG9yLnNldCkge1xuICAgIC8vIE5lZWQgdG8gc3VwcGx5IGRlZmF1bHQgc2V0dGVyLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGJhc2VEZXNjcmlwdG9yLnNldC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgaWYgKCFkZXNjcmlwdG9yLmdldCAmJiBiYXNlRGVzY3JpcHRvci5nZXQpIHtcbiAgICAgIC8vIE5lZWQgdG8gc3VwcGx5IGRlZmF1bHQgZ2V0dGVyLlxuICAgICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VEZXNjcmlwdG9yLmdldC5jYWxsKHRoaXMpO1xuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ29tcG9zZSBzZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gY29tcG9zZUZ1bmN0aW9uKGJhc2VEZXNjcmlwdG9yLnNldCwgZGVzY3JpcHRvci5zZXQpO1xuICB9XG59XG4iLCIvKlxuICogTWFyc2hhbGwgYXR0cmlidXRlcyB0byBwcm9wZXJ0aWVzIChhbmQgZXZlbnR1YWxseSB2aWNlIHZlcnNhKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyaWJ1dGVNYXJzaGFsbGluZyB7XG5cbiAgLypcbiAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAvLyBJZiB0aGUgYXR0cmlidXRlIG5hbWUgY29ycmVzcG9uZHMgdG8gYSBwcm9wZXJ0eSBuYW1lLCB0aGVuIHNldCB0aGF0XG4gICAgLy8gcHJvcGVydHkuIElnbm9yZSBjaGFuZ2VzIGluIHN0YW5kYXJkIEhUTUxFbGVtZW50IHByb3BlcnRpZXMuXG4gICAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZVRvUHJvcGVydHlOYW1lKG5hbWUpO1xuICAgIGlmIChwcm9wZXJ0eU5hbWUgaW4gdGhpcyAmJiAhKHByb3BlcnR5TmFtZSBpbiBIVE1MRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuYXR0cmlidXRlcywgYXR0cmlidXRlID0+IHtcbiAgICAgIHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJpYnV0ZS5uYW1lLCB1bmRlZmluZWQsIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5cbi8vIENvbnZlcnQgY2FtZWwgY2FzZSBmb29CYXIgbmFtZSB0byBoeXBoZW5hdGVkIGZvby1iYXIuXG5mdW5jdGlvbiBhdHRyaWJ1dGVUb1Byb3BlcnR5TmFtZShhdHRyaWJ1dGVOYW1lKSB7XG4gIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVOYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIG0gPT4gbVsxXS50b1VwcGVyQ2FzZSgpKTtcbiAgcmV0dXJuIHByb3BlcnR5TmFtZTtcbn1cblxuLy8gQ29udmVydCBoeXBoZW5hdGVkIGZvby1iYXIgbmFtZSB0byBjYW1lbCBjYXNlIGZvb0Jhci5cbmZ1bmN0aW9uIHByb3BlcnR5VG9BdHRyaWJ1dGVOYW1lKHByb3BlcnR5TmFtZSkge1xuICBsZXQgYXR0cmlidXRlTmFtZSA9IHByb3BlcnR5TmFtZS5yZXBsYWNlKC8oW2Etel1bQS1aXSkvZywgZyA9PiBnWzBdICsgJy0nICsgZ1sxXS50b0xvd2VyQ2FzZSgpKTtcbiAgcmV0dXJuIGF0dHJpYnV0ZU5hbWU7XG59XG4iLCIvKlxuICogUG9seW1lci1zdHlsZSBhdXRvbWF0aWMgbm9kZSBmaW5kaW5nLlxuICogU2VlIGh0dHBzOi8vd3d3LnBvbHltZXItcHJvamVjdC5vcmcvMS4wL2RvY3MvZGV2Z3VpZGUvbG9jYWwtZG9tLmh0bWwjbm9kZS1maW5kaW5nLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9tYXRpY05vZGVGaW5kaW5nIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMuc2hhZG93Um9vdCkge1xuICAgICAgdGhpcy4kID0ge307XG4gICAgICB2YXIgbm9kZXNXaXRoSWRzID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF0nKTtcbiAgICAgIFtdLmZvckVhY2guY2FsbChub2Rlc1dpdGhJZHMsIG5vZGUgPT4ge1xuICAgICAgICB2YXIgaWQgPSBub2RlLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgdGhpcy4kW2lkXSA9IG5vZGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIiwiLypcbiAqIEEgY29tcG9zYWJsZSBIVE1MIGVsZW1lbnQuXG4gKlxuICogVGhpcyBjbGFzcyBpcyBwcm92aWRlZCBqdXN0IGFzIGEgY29udmVuaWVuY2UuIE9uZSBjb3VsZCBhbHNvIHN0YXJ0IHdpdGhcbiAqIEhUTUxFbGVtZW50IGF0IHRoZSB0b3AgbGV2ZWwsIGFuZCBhZGQgZXh0ZW5zaWJpbGl0eSBieSBtaXhpbmcgaW4gQ29tcG9zYWJsZS5cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuLy8gV2UgdXNlIEV4dGVuc2libGUgdG8gYWRkIGl0cyBvd24gbWVtYmVycyB0byBhIEhUTUxFbGVtZW50IHN1YmNsYXNzLlxuLy8gVGhlIHJlc3VsdCBpcyBhbiBIVE1MRWxlbWVudCB3aXRoIC5leHRlbmQoKSBhbmQgc3VwZXIoKSBzdXBwb3J0LlxubGV0IENvbXBvc2FibGVFbGVtZW50ID0gQ29tcG9zYWJsZS5jb21wb3NlLmNhbGwoSFRNTEVsZW1lbnQsIENvbXBvc2FibGUpO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wb3NhYmxlRWxlbWVudDtcbiIsIi8qXG4gKiBBIHNhbXBsZSBnZW5lcmFsLXB1cnBvc2UgYmFzZSBjbGFzcyBmb3IgZGVmaW5pbmcgY3VzdG9tIGVsZW1lbnRzIHRoYXQgbWl4ZXNcbiAqIGluIHNvbWUgY29tbW9uIGZlYXR1cmVzOiB0ZW1wbGF0ZSBzdGFtcGluZyBpbnRvIGEgc2hhZG93IHJvb3QsIGF1dG9tYXRpYyBub2RlXG4gKiBmaW5kaW5nLCBhbmQgbWFyc2hhbGxpbmcgYmV0d2VlbiBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0aWVzLlxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlRWxlbWVudCBmcm9tICcuL0NvbXBvc2FibGVFbGVtZW50JztcbmltcG9ydCBUZW1wbGF0ZVN0YW1waW5nIGZyb20gJy4vVGVtcGxhdGVTdGFtcGluZyc7XG5pbXBvcnQgQXV0b21hdGljTm9kZUZpbmRpbmcgZnJvbSAnLi9BdXRvbWF0aWNOb2RlRmluZGluZyc7XG5pbXBvcnQgQXR0cmlidXRlTWFyc2hhbGxpbmcgZnJvbSAnLi9BdHRyaWJ1dGVNYXJzaGFsbGluZyc7XG5cbmNsYXNzIEVsZW1lbnRCYXNlIGV4dGVuZHMgQ29tcG9zYWJsZUVsZW1lbnQge1xuXG4gIC8qIEZvciBkZWJ1Z2dpbmcgKi9cbiAgbG9nKHRleHQpIHtcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmxvY2FsTmFtZX06ICR7dGV4dH1gKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVsZW1lbnRCYXNlID0gRWxlbWVudEJhc2UuY29tcG9zZShcbiAgVGVtcGxhdGVTdGFtcGluZywgLy8gYmVmb3JlIG5vZGUgZmluZGluZywgc28gc2hhZG93IHJvb3QgaXMgcG9wdWxhdGVkXG4gIEF1dG9tYXRpY05vZGVGaW5kaW5nLCAvLyBiZWZvcmUgbWFyc2hhbGxpbmcsIHNvIG1hcnNoYWxsZWQgcHJvcGVydGllcyBjYW4gdXNlIGl0XG4gIEF0dHJpYnV0ZU1hcnNoYWxsaW5nXG4pO1xuXG5kb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2VsZW1lbnQtYmFzZScsIEVsZW1lbnRCYXNlKTtcbiIsIi8qXG4gKiBFbGVtZW50IGV4dGVuc2lvbiBmb3IgdGVtcGxhdGUgc3RhbXBpbmcuIElmIGEgY29tcG9uZW50IGRlZmluZXMgYSB0ZW1wbGF0ZVxuICogcHJvcGVydHkgKGFzIGEgc3RyaW5nIG9yIHJlZmVyZW5jaW5nIGEgSFRNTCB0ZW1wbGF0ZSksIHdoZW4gdGhlIGNvbXBvbmVudFxuICogY2xhc3MgaXMgaW5zdGFudGlhdGVkLCBhIHNoYWRvdyByb290IHdpbGwgYmUgY3JlYXRlZCBvbiB0aGUgaW5zdGFuY2UsIGFuZFxuICogdGhlIGNvbnRlbnRzIG9mIHRoZSB0ZW1wbGF0ZSB3aWxsIGJlIGNsb25lZCBpbnRvIHRoZSBzaGFkb3cgcm9vdC5cbiAqXG4gKiBGb3IgdGhlIHRpbWUgYmVpbmcsIHRoaXMgZXh0ZW5zaW9uIHJldGFpbnMgc3VwcG9ydCBmb3IgU2hhZG93IERPTSB2MC5cbiAqIFRoYXQgd2lsbCBldmVudHVhbGx5IGJlIGRlcHJlY2F0ZWQgYXMgYnJvd3NlcnMgaW1wbGVtZW50IFNoYWRvdyBET00gdjEuXG4gKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZVN0YW1waW5nIHtcblxuICAvKlxuICAgKiBJZiB0aGUgY29tcG9uZW50IGRlZmluZXMgYSB0ZW1wbGF0ZSwgYSBzaGFkb3cgcm9vdCB3aWxsIGJlIGNyZWF0ZWQgb24gdGhlXG4gICAqIGNvbXBvbmVudCBpbnN0YW5jZSwgYW5kIHRoZSB0ZW1wbGF0ZSBzdGFtcGVkIGludG8gaXQuXG4gICAqL1xuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gVXBncmFkZSBwbGFpbiBzdHJpbmcgdG8gcmVhbCB0ZW1wbGF0ZS5cbiAgICAgIHRlbXBsYXRlID0gY3JlYXRlVGVtcGxhdGVXaXRoSW5uZXJIVE1MKHRlbXBsYXRlKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlICYmIFVTSU5HX1NIQURPV19ET01fVjApIHtcbiAgICAgIHBvbHlmaWxsU2xvdFdpdGhDb250ZW50KHRlbXBsYXRlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TaGFkb3dET01Qb2x5ZmlsbCkge1xuICAgICAgc2hpbVRlbXBsYXRlU3R5bGVzKHRlbXBsYXRlLCB0aGlzLmxvY2FsTmFtZSk7XG4gICAgfVxuICAgIC8vIFRPRE86IFNhdmUgdGhlIHByb2Nlc3NlZCB0ZW1wbGF0ZSB3aXRoIHRoZSBjb21wb25lbnQncyBjbGFzcyBwcm90b3R5cGVcbiAgICAvLyBzbyBpdCBkb2Vzbid0IG5lZWQgdG8gYmUgcHJvY2Vzc2VkIHdpdGggZXZlcnkgaW5zdGFudGlhdGlvbi5cbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIC8vIHRoaXMubG9nKFwiY2xvbmluZyB0ZW1wbGF0ZSBpbnRvIHNoYWRvdyByb290XCIpO1xuICAgICAgbGV0IHJvb3QgPSBVU0lOR19TSEFET1dfRE9NX1YwID9cbiAgICAgICAgdGhpcy5jcmVhdGVTaGFkb3dSb290KCkgOiAgICAgICAgICAgICAvLyBTaGFkb3cgRE9NIHYwXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pOyAgLy8gU2hhZG93IERPTSB2MVxuICAgICAgbGV0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKTtcbiAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgIH1cbiAgfVxuXG59XG5cblxuLy8gRmVhdHVyZSBkZXRlY3Rpb24gZm9yIG9sZCBTaGFkb3cgRE9NIHYwLlxuY29uc3QgVVNJTkdfU0hBRE9XX0RPTV9WMCA9ICh0eXBlb2YgSFRNTEVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZVNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnKTtcblxuXG4vLyBDb252ZXJ0IGEgcGxhaW4gc3RyaW5nIG9mIEhUTUwgaW50byBhIHJlYWwgdGVtcGxhdGUgZWxlbWVudC5cbmZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlV2l0aElubmVySFRNTChpbm5lckhUTUwpIHtcbiAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgLy8gUkVWSUVXOiBJcyB0aGVyZSBhbiBlYXNpZXIgd2F5IHRvIGRvIHRoaXM/XG4gIC8vIFdlJ2QgbGlrZSB0byBqdXN0IHNldCBpbm5lckhUTUwgb24gdGhlIHRlbXBsYXRlIGNvbnRlbnQsIGJ1dCBzaW5jZSBpdCdzXG4gIC8vIGEgRG9jdW1lbnRGcmFnbWVudCwgdGhhdCBkb2Vzbid0IHdvcmsuXG4gIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgd2hpbGUgKGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICB0ZW1wbGF0ZS5jb250ZW50LmFwcGVuZENoaWxkKGRpdi5jaGlsZE5vZGVzWzBdKTtcbiAgfVxuICByZXR1cm4gdGVtcGxhdGU7XG59XG5cbi8vIFJlcGxhY2Ugb2NjdXJlbmNlcyBvZiB2MSBzbG90IGVsZW1lbnRzIHdpdGggdjAgY29udGVudCBlbGVtZW50cy5cbi8vIFRoaXMgZG9lcyBub3QgeWV0IG1hcCBuYW1lZCBzbG90cyB0byBjb250ZW50IHNlbGVjdCBjbGF1c2VzLlxuZnVuY3Rpb24gcG9seWZpbGxTbG90V2l0aENvbnRlbnQodGVtcGxhdGUpIHtcbiAgW10uZm9yRWFjaC5jYWxsKHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc2xvdCcpLCBzbG90RWxlbWVudCA9PiB7XG4gICAgbGV0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpO1xuICAgIHNsb3RFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbnRlbnRFbGVtZW50LCBzbG90RWxlbWVudCk7XG4gIH0pO1xufVxuXG4vLyBJbnZva2UgYmFzaWMgc3R5bGUgc2hpbW1pbmcgd2l0aCBTaGFkb3dDU1MuXG5mdW5jdGlvbiBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRhZykge1xuICBXZWJDb21wb25lbnRzLlNoYWRvd0NTUy5zaGltU3R5bGluZyh0ZW1wbGF0ZS5jb250ZW50LCB0YWcpO1xufVxuIl19
