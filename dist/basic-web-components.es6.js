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

},{"../../mixins/ChildrenContent":4,"../../mixins/ClickSelection":5,"../../mixins/ContentItems":6,"../../mixins/DirectionSelection":7,"../../mixins/Generic":8,"../../mixins/ItemSelection":9,"../../mixins/ItemsAccessible":10,"../../mixins/Keyboard":11,"../../mixins/KeyboardDirection":12,"../../mixins/KeyboardPaging":13,"../../mixins/KeyboardPrefixSelection":14,"../../mixins/SelectionHighlight":15,"../../mixins/SelectionScroll":16,"element-base/src/ElementBase":22}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('element-base/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class SlidingViewport {

  createdCallback() {
    this.position = 0;
  }

  get items() {
    return this.children;
  }

  render() {
    requestAnimationFrame(renderSelection.bind(this));
  }

  /**
   * The fractional position of the element's moving surface while it is being
   * moved (dragged/scrolled/etc.).
   *
   * This is expressed as a fraction of the element's width. If the value is
   * positive, the surface is being moved to the left; if negative, the surface is
   * being moved to the right. E.g., a value of 0.5 indicates the surface has
   * moved half the element's width to the left.
   *
   * @property position
   * @type Number
   */
  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;
    this.render();
  }

  set selectedItem(item) {
    this.render();
  }

  showTransition(show) {
    this.classList.toggle('showTransition', show);
  }

  get template() {
    return `
      <style>
      :host {
        display: block;
        overflow: hidden;
        position: relative;
      }

      #slidingContainer {
        height: 100%;
        position: absolute;
        /*
         Set width for IE/Edge. It's not clear why they need this, and the other
         browsers don't.
         */
        width: 100%;
        will-change: transform;
      }

      :host(.showTransition) #slidingContainer {
        -webkit-transition: -webkit-transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
      }
      </style>

      <div id="slidingContainer">
        <content></content>
      </div>
    `;
  }

}

exports.default = SlidingViewport; /**
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

exports.default = SlidingViewport = _ElementBase2.default.compose(SlidingViewport);

document.registerElement('basic-sliding-viewport', SlidingViewport);

},{"element-base/src/ElementBase":22}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('element-base/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class SpreadItems {

  attachedCallback() {
    // HACK
    this.itemsChanged();
  }

  itemsChanged() {
    // var items = this.items;
    let items = this.children;
    let count = items.length;
    this.$.spreadContainer.style.width = count * 100 + '%';
    let itemWidth = 100 / count + "%";
    [].forEach.call(items, item => {
      item.style.width = itemWidth;
    });
  }

  get template() {
    return `
      <style>
      :host {
        display: block;
      }

      #spreadContainer {
        display: -webkit-flex;
        display: flex;
        height: 100%;
        position: relative;
      }

      #spreadContainer ::content > * {
        object-fit: var(--basic-item-object-fit, contain);
        touch-action: none;
        height: 100%;
        -webkit-user-drag: none;
        -moz-user-select: none;
        user-select: none;
      }
      </style>

      <div id="spreadContainer">
        <content></content>
      </div>
    `;
  }

}

exports.default = SpreadItems; /**
                                * Spreads out a set of items horizontally so they take equal space.
                                *
                                * This component currently requires an explicit size by applied to it. For a
                                * variant that automatically sizes to fit the list items, see the related
                                * component basic-spread-fit.
                                *
                                * @element basic-spread-items
                                */

exports.default = SpreadItems = _ElementBase2.default.compose(SpreadItems);

document.registerElement('basic-spread-items', SpreadItems);

},{"element-base/src/ElementBase":22}],4:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"Composable/src/Composable":17}],8:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"Composable/src/Composable":17}],13:[function(require,module,exports){
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

},{"Composable/src/Composable":17}],14:[function(require,module,exports){
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

},{"Composable/src/Composable":17}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./CompositionRules":18}],18:[function(require,module,exports){
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

},{"Composable/src/Composable":17}],22:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL0xpc3RCb3gvTGlzdEJveC5qcyIsImNvbXBvbmVudHMvU2xpZGluZ1ZpZXdwb3J0L1NsaWRpbmdWaWV3cG9ydC5qcyIsImNvbXBvbmVudHMvU3ByZWFkSXRlbXMvU3ByZWFkSXRlbXMuanMiLCJtaXhpbnMvQ2hpbGRyZW5Db250ZW50LmpzIiwibWl4aW5zL0NsaWNrU2VsZWN0aW9uLmpzIiwibWl4aW5zL0NvbnRlbnRJdGVtcy5qcyIsIm1peGlucy9EaXJlY3Rpb25TZWxlY3Rpb24uanMiLCJtaXhpbnMvR2VuZXJpYy5qcyIsIm1peGlucy9JdGVtU2VsZWN0aW9uLmpzIiwibWl4aW5zL0l0ZW1zQWNjZXNzaWJsZS5qcyIsIm1peGlucy9LZXlib2FyZC5qcyIsIm1peGlucy9LZXlib2FyZERpcmVjdGlvbi5qcyIsIm1peGlucy9LZXlib2FyZFBhZ2luZy5qcyIsIm1peGlucy9LZXlib2FyZFByZWZpeFNlbGVjdGlvbi5qcyIsIm1peGlucy9TZWxlY3Rpb25IaWdobGlnaHQuanMiLCJtaXhpbnMvU2VsZWN0aW9uU2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUuanMiLCJub2RlX21vZHVsZXMvQ29tcG9zYWJsZS9zcmMvQ29tcG9zaXRpb25SdWxlcy5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL0F0dHJpYnV0ZU1hcnNoYWxsaW5nLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvQXV0b21hdGljTm9kZUZpbmRpbmcuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9Db21wb3NhYmxlRWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL0VsZW1lbnRCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvVGVtcGxhdGVTdGFtcGluZy5qcyJd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QyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBQSxXQUFXLEVBQUk7QUFDeEUsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2RCxlQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7R0FDbEUsQ0FBQyxDQUFDO0NBQ0o7OztBQUFBLEFBR0QsU0FBUyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQ3pDLGVBQWEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDNUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqIGJhc2ljLWxpc3QtYm94XG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2VsZW1lbnQtYmFzZS9zcmMvRWxlbWVudEJhc2UnO1xuaW1wb3J0IENoaWxkcmVuQ29udGVudCBmcm9tICcuLi8uLi9taXhpbnMvQ2hpbGRyZW5Db250ZW50JztcbmltcG9ydCBDbGlja1NlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvQ2xpY2tTZWxlY3Rpb24nO1xuaW1wb3J0IENvbnRlbnRJdGVtcyBmcm9tICcuLi8uLi9taXhpbnMvQ29udGVudEl0ZW1zJztcbmltcG9ydCBEaXJlY3Rpb25TZWxlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0RpcmVjdGlvblNlbGVjdGlvbic7XG5pbXBvcnQgR2VuZXJpYyBmcm9tICcuLi8uLi9taXhpbnMvR2VuZXJpYyc7XG5pbXBvcnQgSXRlbVNlbGVjdGlvbiBmcm9tICcuLi8uLi9taXhpbnMvSXRlbVNlbGVjdGlvbic7XG5pbXBvcnQgSXRlbXNBY2Nlc3NpYmxlIGZyb20gJy4uLy4uL21peGlucy9JdGVtc0FjY2Vzc2libGUnO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZCc7XG5pbXBvcnQgS2V5Ym9hcmREaXJlY3Rpb24gZnJvbSAnLi4vLi4vbWl4aW5zL0tleWJvYXJkRGlyZWN0aW9uJztcbmltcG9ydCBLZXlib2FyZFBhZ2luZyBmcm9tICcuLi8uLi9taXhpbnMvS2V5Ym9hcmRQYWdpbmcnO1xuaW1wb3J0IEtleWJvYXJkUHJlZml4U2VsZWN0aW9uIGZyb20gJy4uLy4uL21peGlucy9LZXlib2FyZFByZWZpeFNlbGVjdGlvbic7XG5pbXBvcnQgU2VsZWN0aW9uSGlnaGxpZ2h0IGZyb20gJy4uLy4uL21peGlucy9TZWxlY3Rpb25IaWdobGlnaHQnO1xuaW1wb3J0IFNlbGVjdGlvblNjcm9sbCBmcm9tICcuLi8uLi9taXhpbnMvU2VsZWN0aW9uU2Nyb2xsJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Qm94IGV4dGVuZHMgRWxlbWVudEJhc2UuY29tcG9zZShcbiAgICBDaGlsZHJlbkNvbnRlbnQsXG4gICAgQ2xpY2tTZWxlY3Rpb24sXG4gICAgQ29udGVudEl0ZW1zLFxuICAgIERpcmVjdGlvblNlbGVjdGlvbixcbiAgICBHZW5lcmljLFxuICAgIEl0ZW1TZWxlY3Rpb24sXG4gICAgSXRlbXNBY2Nlc3NpYmxlLFxuICAgIEtleWJvYXJkLFxuICAgIEtleWJvYXJkRGlyZWN0aW9uLFxuICAgIEtleWJvYXJkUGFnaW5nLFxuICAgIEtleWJvYXJkUHJlZml4U2VsZWN0aW9uLFxuICAgIFNlbGVjdGlvbkhpZ2hsaWdodCxcbiAgICBTZWxlY3Rpb25TY3JvbGxcbiAgKSB7XG5cbiAgLy8gU3R1YiBmb3IgY29sbGVjdGl2ZXMgZm9yIG5vd1xuICBnZXQgaW5uZXJtb3N0QXR0YWNoZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuJC5pdGVtc0NvbnRhaW5lcjtcbiAgfVxuICBnZXQgb3V0ZXJtb3N0QXR0YWNoZWQoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgICB9XG5cbiAgICAgIFt0YXJnZXQ9XCJjaGlsZFwiXSB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgLXdlYmtpdC1mbGV4OiAxO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgfVxuXG4gICAgICAjaXRlbXNDb250YWluZXIge1xuICAgICAgICAtd2Via2l0LWZsZXg6IDE7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsOyAvKiBmb3IgbW9tZW50dW0gc2Nyb2xsaW5nICovXG4gICAgICB9XG5cbiAgICAgIC8qIEdlbmVyaWMgYXBwZWFyYW5jZSAqL1xuICAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgfVxuXG4gICAgICA6aG9zdChbZ2VuZXJpYz1cIlwiXSkgI2l0ZW1zQ29udGFpbmVyIDo6Y29udGVudCA+ICoge1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIHBhZGRpbmc6IDAuMjVlbTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8ZGl2IGlkPVwiaXRlbXNDb250YWluZXJcIj5cbiAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG59XG5cblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdiYXNpYy1saXN0LWJveCcsIExpc3RCb3gpO1xuIiwiLyoqXG4gKiBQcmVzZW50cyBsaXN0IGl0ZW1zIGluIGEgdmlld3BvcnQgc3VjaCB0aGF0IG9ubHkgYSBzaW5nbGUgaXRlbSBpcyB2aXNpYmxlIGF0IGFcbiAqIHRpbWUuIE5hdmlnYXRpbmcgYmV0d2VlbiBpdGVtcyB3aWxsIGJlIHJlcHJlc2VudGVkIHdpdGggYSBob3Jpem9udGFsIHZpc3VhbFxuICogc2xpZGluZyBlZmZlY3QuXG4gKlxuICogVGhpcyBjb21wb25lbnQgY3VycmVudGx5IHJlcXVpcmVzIHRoYXQgeW91IGV4cGxpY2l0bHkgYXBwbHkgYSBzaXplIHRvIGl0LiBGb3IgYVxuICogdmFyaWFudCB3aGljaCBhdXRvbWF0aWNhbGx5IHNpemVzIHRvIGl0cyBjb250ZW50LCBzZWUgdGhlIHJlbGF0ZWQgY29tcG9uZW50XG4gKiBiYXNpYy1zbGlkaW5nLXZpZXdwb3J0LWZpdC5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1zbGlkaW5nLXZpZXdwb3J0XG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2VsZW1lbnQtYmFzZS9zcmMvRWxlbWVudEJhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkaW5nVmlld3BvcnQge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gMDtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyU2VsZWN0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmcmFjdGlvbmFsIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50J3MgbW92aW5nIHN1cmZhY2Ugd2hpbGUgaXQgaXMgYmVpbmdcbiAgICogbW92ZWQgKGRyYWdnZWQvc2Nyb2xsZWQvZXRjLikuXG4gICAqXG4gICAqIFRoaXMgaXMgZXhwcmVzc2VkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGVsZW1lbnQncyB3aWR0aC4gSWYgdGhlIHZhbHVlIGlzXG4gICAqIHBvc2l0aXZlLCB0aGUgc3VyZmFjZSBpcyBiZWluZyBtb3ZlZCB0byB0aGUgbGVmdDsgaWYgbmVnYXRpdmUsIHRoZSBzdXJmYWNlIGlzXG4gICAqIGJlaW5nIG1vdmVkIHRvIHRoZSByaWdodC4gRS5nLiwgYSB2YWx1ZSBvZiAwLjUgaW5kaWNhdGVzIHRoZSBzdXJmYWNlIGhhc1xuICAgKiBtb3ZlZCBoYWxmIHRoZSBlbGVtZW50J3Mgd2lkdGggdG8gdGhlIGxlZnQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBwb3NpdGlvblxuICAgKiBAdHlwZSBOdW1iZXJcbiAgICovXG4gIGdldCBwb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXQgcG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRJdGVtKGl0ZW0pIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgc2hvd1RyYW5zaXRpb24oc2hvdykge1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvd1RyYW5zaXRpb24nLCBzaG93KTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAjc2xpZGluZ0NvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAvKlxuICAgICAgICAgU2V0IHdpZHRoIGZvciBJRS9FZGdlLiBJdCdzIG5vdCBjbGVhciB3aHkgdGhleSBuZWVkIHRoaXMsIGFuZCB0aGUgb3RoZXJcbiAgICAgICAgIGJyb3dzZXJzIGRvbid0LlxuICAgICAgICAgKi9cbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5zaG93VHJhbnNpdGlvbikgI3NsaWRpbmdDb250YWluZXIge1xuICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQ7XG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2Utb3V0O1xuICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBpZD1cInNsaWRpbmdDb250YWluZXJcIj5cbiAgICAgICAgPGNvbnRlbnQ+PC9jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG59XG5cblxuZnVuY3Rpb24gcmVuZGVyU2VsZWN0aW9uKCkge1xuXG4gIHZhciBjb3VudCA9IHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGg7XG4gIGlmICghY291bnQpIHtcbiAgICAvLyBOdWxsIG9yIHplcm8gbWVhbnMgd2UgZG9uJ3QgaGF2ZSBpdGVtcyB0byByZW5kZXIgeWV0LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBpbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIC8vIE5vIHNlbGVjdGlvblxuICAgIC8vIHJldHVybjtcbiAgICBpbmRleCA9IDA7XG4gIH1cblxuICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uIHx8IDA7XG4gIHZhciBkYW1wZW5lZFBvc2l0aW9uO1xuICBpZiAoaW5kZXggPT09IDAgJiYgcG9zaXRpb24gPCAwKSB7XG4gICAgLy8gQXBwbHkgdGVuc2lvbiBmcm9tIHRoZSBsZWZ0IGVkZ2UuXG4gICAgZGFtcGVuZWRQb3NpdGlvbiA9IC1kYW1waW5nKC1wb3NpdGlvbik7XG4gIH0gZWxzZSBpZiAoaW5kZXggPT09IGNvdW50IC0gMSAmJiBwb3NpdGlvbiA+IDApIHtcbiAgICAvLyBBcHBseSB0ZW5zaW9uIGZyb20gdGhlIHJpZ2h0IGVkZ2UuXG4gICAgZGFtcGVuZWRQb3NpdGlvbiA9IGRhbXBpbmcocG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIC8vIE5vIGRhbXBpbmcgcmVxdWlyZWQuXG4gICAgZGFtcGVuZWRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG4gIHZhciBmcmFjdGlvbmFsSW5kZXggPSBpbmRleCArIGRhbXBlbmVkUG9zaXRpb247XG4gIC8vIFVzZSBhIHBlcmNlbnRhZ2Ugc28gdGhlIHRyYW5zZm9ybSB3aWxsIHN0aWxsIHdvcmsgaWYgc2NyZWVuIHNpemUgY2hhbmdlc1xuICAvLyAoZS5nLiwgaWYgZGV2aWNlIG9yaWVudGF0aW9uIGNoYW5nZXMpLlxuICB2YXIgbGVmdCA9IC1mcmFjdGlvbmFsSW5kZXggKiAxMDA7XG4gIC8vIHZhciBsZWZ0ID0gLShmcmFjdGlvbmFsSW5kZXggLyBjb3VudCkgKiAxMDA7XG4gIHZhciB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgbGVmdCArICclKSc7XG4gIHRoaXMuJC5zbGlkaW5nQ29udGFpbmVyLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgdGhpcy4kLnNsaWRpbmdDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xufVxuXG5cbi8qXG4gKiBDYWxjdWxhdGUgZGFtcGluZyBhcyBhIGZ1bmN0aW9uIG9mIHRoZSBkaXN0YW5jZSBwYXN0IHRoZSBtaW5pbXVtL21heGltdW1cbiAqIHZhbHVlcy5cbiAqXG4gKiBXZSB3YW50IHRvIGFzeW1wdG90aWNhbGx5IGFwcHJvYWNoIGFuIGFic29sdXRlIG1pbmltdW0gb2YgMSB1bml0XG4gKiBiZWxvdy9hYm92ZSB0aGUgYWN0dWFsIG1pbmltdW0vbWF4aW11bS4gVGhpcyByZXF1aXJlcyBjYWxjdWxhdGluZyBhXG4gKiBoeXBlcmJvbGljIGZ1bmN0aW9uLlxuICpcbiAqIFNlZSBodHRwOi8vd3d3LndvbGZyYW1hbHBoYS5jb20vaW5wdXQvP2k9eSslM0QrLTElMkYlMjh4JTJCMSUyOSslMkIrMVxuICogZm9yIHRoZSBvbmUgd2UgdXNlLiBUaGUgb25seSBwb3J0aW9uIG9mIHRoYXQgZnVuY3Rpb24gd2UgY2FyZSBhYm91dCBpcyB3aGVuXG4gKiB4IGlzIHplcm8gb3IgZ3JlYXRlci4gQW4gaW1wb3J0YW50IGNvbnNpZGVyYXRpb24gaXMgdGhhdCB0aGUgY3VydmUgYmVcbiAqIHRhbmdlbnQgdG8gdGhlIGRpYWdvbmFsIGxpbmUgeD15IGF0ICgwLCAwKS4gVGhpcyBlbnN1cmVzIHNtb290aCBjb250aW51aXR5XG4gKiB3aXRoIHRoZSBub3JtYWwgZHJhZyBiZWhhdmlvciwgaW4gd2hpY2ggdGhlIHZpc2libGUgc2xpZGluZyBpcyBsaW5lYXIgd2l0aFxuICogdGhlIGRpc3RhbmNlIHRoZSB0b3VjaHBvaW50IGhhcyBiZWVuIGRyYWdnZWQuXG4gKi9cbmZ1bmN0aW9uIGRhbXBpbmcoeCkge1xuICB2YXIgeSA9ICgtMSAvICh4ICsgMSkpICsgMTtcbiAgcmV0dXJuIHk7XG59XG5cblxuU2xpZGluZ1ZpZXdwb3J0ID0gRWxlbWVudEJhc2UuY29tcG9zZShTbGlkaW5nVmlld3BvcnQpO1xuXG5kb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2Jhc2ljLXNsaWRpbmctdmlld3BvcnQnLCBTbGlkaW5nVmlld3BvcnQpO1xuIiwiLyoqXG4gKiBTcHJlYWRzIG91dCBhIHNldCBvZiBpdGVtcyBob3Jpem9udGFsbHkgc28gdGhleSB0YWtlIGVxdWFsIHNwYWNlLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGN1cnJlbnRseSByZXF1aXJlcyBhbiBleHBsaWNpdCBzaXplIGJ5IGFwcGxpZWQgdG8gaXQuIEZvciBhXG4gKiB2YXJpYW50IHRoYXQgYXV0b21hdGljYWxseSBzaXplcyB0byBmaXQgdGhlIGxpc3QgaXRlbXMsIHNlZSB0aGUgcmVsYXRlZFxuICogY29tcG9uZW50IGJhc2ljLXNwcmVhZC1maXQuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtc3ByZWFkLWl0ZW1zXG4gKi9cblxuaW1wb3J0IEVsZW1lbnRCYXNlIGZyb20gJ2VsZW1lbnQtYmFzZS9zcmMvRWxlbWVudEJhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJlYWRJdGVtcyB7XG5cbiAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICAvLyBIQUNLXG4gICAgdGhpcy5pdGVtc0NoYW5nZWQoKTtcbiAgfVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgICAvLyB2YXIgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIGxldCBpdGVtcyA9IHRoaXMuY2hpbGRyZW47XG4gICAgbGV0IGNvdW50ID0gaXRlbXMubGVuZ3RoO1xuICAgIHRoaXMuJC5zcHJlYWRDb250YWluZXIuc3R5bGUud2lkdGggPSAoY291bnQgKiAxMDApICsgJyUnO1xuICAgIGxldCBpdGVtV2lkdGggPSAoMTAwIC8gY291bnQpICsgXCIlXCI7XG4gICAgW10uZm9yRWFjaC5jYWxsKGl0ZW1zLCBpdGVtID0+IHtcbiAgICAgIGl0ZW0uc3R5bGUud2lkdGggPSBpdGVtV2lkdGg7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgICNzcHJlYWRDb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAjc3ByZWFkQ29udGFpbmVyIDo6Y29udGVudCA+ICoge1xuICAgICAgICBvYmplY3QtZml0OiB2YXIoLS1iYXNpYy1pdGVtLW9iamVjdC1maXQsIGNvbnRhaW4pO1xuICAgICAgICB0b3VjaC1hY3Rpb246IG5vbmU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgLXdlYmtpdC11c2VyLWRyYWc6IG5vbmU7XG4gICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBpZD1cInNwcmVhZENvbnRhaW5lclwiPlxuICAgICAgICA8Y29udGVudD48L2NvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbn1cblxuU3ByZWFkSXRlbXMgPSBFbGVtZW50QmFzZS5jb21wb3NlKFNwcmVhZEl0ZW1zKTtcblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdiYXNpYy1zcHJlYWQtaXRlbXMnLCBTcHJlYWRJdGVtcyk7XG4iLCIvKipcbiAqIExldHMgYSBjb21wb25lbnQgY29sbGVjdGl2ZSB0YWtlcyBhcyBpdHMgY29udGVudCB0aGUgY2hpbGRyZW4gb2YgdGhlXG4gKiBpbm5lcm1vc3QgYXNwZWN0LlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWNoaWxkcmVuLWNvbnRlbnRcbiAqXG4gKi9cblxuLy8gVE9ETzogRG9uJ3QgcmVzcG9uZCB0byBjaGFuZ2VzIGluIGF0dHJpYnV0ZXMsIG9yIGF0IGxlYXN0IG9mZmVyIHRoYXQgYXMgYW5cbi8vIG9wdGlvbi5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hpbGRyZW5Db250ZW50IHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gVW50aWwgd2UgaGF2ZSBjb250ZW50IG9ic2VydmluZyBhZ2FpbiwgZm9yY2UgYSBjYWxsIHRvIGNvbnRlbnRDaGFuZ2VkKCkuXG4gICAgLy8gSEFDSzogRG8gdGhpcyBhc3luY2hyb25vdXNseSwgc28gb3RoZXIgbWl4aW5zIGhhdmUgYSBjaGFuY2UgdG8gc2V0IHVwXG4gICAgLy8gYmVmb3JlIHRoaXMgY2FsbC5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY29udGVudENoYW5nZWQoKSk7XG4gIH1cblxuICAvLyBUT0RPOiBXYWl0IHRvIG9ic2VydmUgY2hhbmdlcyB1bnRpbCB3ZSBoYXZlIGEgc2hhZG93IERPTSBob3N0LiBSaWdodFxuICAvLyBub3csIHRoZSBpbml0aWFsIGNvbGxlY3RpdmVDaGFuZ2VkIGNhbGwgY2FuIGhhcHBlbiB0b28gZWFybHkuXG4gIC8vIFRPRE86IEhhbmRsZSBjYXNlIHdoZXJlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgb3V0IG9mIERPTSwgdGhlblxuICAvLyBhdHRhY2hlZC5cbiAgLy8gY29sbGVjdGl2ZUNoYW5nZWQoKSB7XG4gIC8vICAgLy8gY29uc29sZS5sb2codGhpcy5sb2NhbE5hbWUgKyBcIiBjb2xsZWN0aXZlQ2hhbmdlZDogXCIgKyB0aGlzLmNvbGxlY3RpdmUuYXNwZWN0cy5sZW5ndGgpO1xuICAvLyAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmNvbGxlY3RpdmUuaW5uZXJtb3N0RWxlbWVudDtcbiAgLy8gICBsZXQgaW5uZXJtb3N0SG9zdCA9IEJhc2ljLkNvbnRlbnRIZWxwZXJzLmdldEhvc3QoaW5uZXJtb3N0KTtcbiAgLy9cbiAgLy8gICAvLyBPcHRpbWl6ZSBmb3IgdGhlIGNhc2Ugd2hlcmUgdGhlIGNvbGxlY3RpdmUncyBjaGFuZ2VkLCBidXQgaXRzXG4gIC8vICAgLy8gaW5uZXJtb3N0IGFzcGVjdCBpcyBzdGlsbCB0aGUgc2FtZS4gSW4gdGhhdCBjYXNlLCB3ZSBkb24ndCB3YW50IHRvXG4gIC8vICAgLy8gYm90aGVyIHRlYXJpbmcgZG93biBhbmQgdGhlbiByZWNyZWF0aW5nIG91ciBjb250ZW50Q2hhbmdlZCBoYW5kbGVyLlxuICAvLyAgIC8vIFRPRE86IFRoaXMgY3VycmVudGx5IG9ubHkgdHJhY2tzIG9uZSBsZXZlbCBvZiBob3N0LiBGb3Igcm9idXN0bmVzcyxcbiAgLy8gICAvLyB0aGlzIHNob3VsZCB0cmFjayB0aGUgY2hhaW4gb2YgaG9zdHMuXG4gIC8vICAgaWYgKGlubmVybW9zdCA9PT0gdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RBc3BlY3RcbiAgLy8gICAgICAgJiYgaW5uZXJtb3N0SG9zdCA9PT0gdGhpcy5fcHJldmlvdXNJbm5lcm1vc3RIb3N0KSB7XG4gIC8vICAgICAvLyBXZSBzaG91bGQgYWxyZWFkeSBiZSBvYnNlcnZpbmcgY2hhbmdlcyBvbiB0aGUgaW5uZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSBjb250ZW50IGhhc24ndCBhY3R1YWxseSBjaGFuZ2VkLCB3ZSB3YW50IHRvIGdpdmUgdGhlXG4gIC8vICAgICAvLyBuZXcgYXNwZWN0cyBhIGNoYW5jZSB0byByZXNwb25kIHRvIGNvbnRlbnRDaGFuZ2VkLlxuICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLmNvbnRlbnRDaGFuZ2VkKCk7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIC8vIEEgbmV3IGFzcGVjdCBpcyBub3cgaW5uZXJtb3N0LlxuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCAmJiB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdC5fY29udGVudENoYW5nZU9ic2VydmVyKSB7XG4gIC8vICAgICAvLyBTdG9wIG9ic2VydmluZyBjaGFuZ2VzIG9uIHRoZSBvbGQgaW5uZXJtb3N0IGFzcGVjdC5cbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwic3RvcHBpbmcgb2JzZXJ2YXRpb24gb2YgY2hhbmdlcyBvbiBvbGQgaW5uZXJtb3N0IGFzcGVjdFwiKTtcbiAgLy8gICAgIEJhc2ljLkNvbnRlbnRIZWxwZXJzLm9ic2VydmVDb250ZW50Q2hhbmdlcyh0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCwgbnVsbCk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIEJhc2ljLkNvbnRlbnRIZWxwZXJzLm9ic2VydmVDb250ZW50Q2hhbmdlcyhpbm5lcm1vc3QsIGZ1bmN0aW9uKCkge1xuICAvLyAgICAgLy8gUmVzZXQgbWVtb2l6ZWQgY29udGVudC5cbiAgLy8gICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICAvL1xuICAvLyAgICAgLy8gTGV0IGNvbGxlY3RpdmUga25vdyBjb250ZW50IGhhcyBjaGFuZ2VkLlxuICAvLyAgICAgdGhpcy5jb2xsZWN0aXZlLmNvbnRlbnRDaGFuZ2VkKCk7XG4gIC8vICAgfS5iaW5kKHRoaXMpKTtcbiAgLy9cbiAgLy8gICB0aGlzLl9wcmV2aW91c0lubmVybW9zdEFzcGVjdCA9IGlubmVybW9zdDtcbiAgLy8gICB0aGlzLl9wcmV2aW91c0lubmVybW9zdEhvc3QgPSBpbm5lcm1vc3RIb3N0O1xuICAvLyB9XG5cbiAgY29udGVudENoYW5nZWQoKSB7XG4gICAgbGV0IG91dGVybW9zdCA9IHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQ7XG4gICAgaWYgKG91dGVybW9zdCkge1xuICAgICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdjb250ZW50LWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmxhdHRlbmVkIGNvbnRlbnQgb2YgdGhpcyBjb2xsZWN0aXZlLlxuICAgKlxuICAgKiBUaGUgY29udGVudCBpcyB0aGUgY29sbGVjdGl2ZSBvZiBub2RlcyB3aGljaCBhcmUgY2hpbGRyZW4gb2YgdGhlXG4gICAqIGNvbGxlY3RpdmUncyBpbm5lcm1vc3QgYXNwZWN0LiBJZiBhbnkgb2YgdGhvc2Ugbm9kZXMgYXJlIGA8Y29udGVudD5gXG4gICAqIGVsZW1lbnRzLCB0aG9zZSBhcmUgcmVjdXJzaXZlbHkgZXhwYW5kZWQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBjb250ZW50XG4gICAqIEB0eXBlIFtPYmplY3RdXG4gICAqL1xuICBnZXQgY29udGVudCgpIHtcbiAgICAvLyBpZiAoIXRoaXMuX2NvbnRlbnQpIHtcbiAgICAvLyAgIGxldCBpbm5lcm1vc3QgPSB0aGlzLmNvbGxlY3RpdmUuaW5uZXJtb3N0RWxlbWVudDtcbiAgICAvLyAgIGlmIChpbm5lcm1vc3QpIHtcbiAgICAvLyAgICAgdGhpcy5fY29udGVudCA9IEJhc2ljLkNvbnRlbnRIZWxwZXJzLmZsYXR0ZW5DaGlsZHJlbihpbm5lcm1vc3QpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgfVxuXG59O1xuXG5cbi8vIHJlYWR5KCkge1xuLy8gICAvLyBIQUNLOiBFbnN1cmUgdGFyZ2V0Q2hhbmdlZCAoYWxzbykgaGFwcGVucyBhZnRlciByZWFkeS5cbi8vICAgdGhpcy50YXJnZXRDaGFuZ2VkKHRoaXMudGFyZ2V0KTtcbi8vIH1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgYSBjbGljayB0byBpdGVtIHNlbGVjdGlvbi5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1jbGljay1zZWxlY3Rpb25cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlja1NlbGVjdGlvbiB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIC8qXG4gICAgICogUkVWSUVXOiBXaGljaCBldmVudCBzaG91bGQgd2UgbGlzdGVuIHRvIGhlcmU/XG4gICAgICpcbiAgICAgKiBUaGUgc3RhbmRhcmQgdXNlIGZvciB0aGlzIGFzcGVjdCBpcyBpbiBsaXN0IGJveGVzLiBMaXN0IGJveGVzIGRvbid0XG4gICAgICogYXBwZWFyIHRvIGJlIGNvbnNpc3RlbnQgd2l0aCByZWdhcmQgdG8gd2hldGhlciB0aGV5IHNlbGVjdCBvbiBtb3VzZWRvd25cbiAgICAgKiBvciBjbGljay9tb3VzZXVwLlxuICAgICAqL1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnQgPT4ge1xuICAgICAgc2VsZWN0VGFyZ2V0KHRoaXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAvLyBOb3RlOiBXZSBkb24ndCBjYWxsIHByZXZlbnREZWZhdWx0IGhlcmUuIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGZvclxuICAgICAgLy8gbW91c2Vkb3duIGluY2x1ZGVzIHNldHRpbmcga2V5Ym9hcmQgZm9jdXMgaWYgdGhlIGVsZW1lbnQgZG9lc24ndFxuICAgICAgLy8gYWxyZWFkeSBoYXZlIHRoZSBmb2N1cywgYW5kIHdlIHdhbnQgdG8gcHJlc2VydmUgdGhhdCBiZWhhdmlvci5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgLy8gc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHt9XG5cbn1cblxuLy8gVE9ETzogSGFuZGxlIHRoZSBjYXNlIHdoZXJlIGEgbGlzdCBpdGVtIGhhcyBzdWJlbGVtZW50cy4gV2FsayB1cCB0aGUgRE9NXG4vLyBoaWVyYXJjaHkgdW50aWwgd2UgZmluZCBhbiBpdGVtIGluIHRoZSBsaXN0LCBvciBjb21lIGJhY2sgdG8gdGhpcyBlbGVtZW50LFxuLy8gaW4gd2hpY2ggY2FzZSB0aGUgZWxlbWVudCB0aGF0IHdhcyB0YXBwZWQgaXNuJ3QgYW4gaXRlbSAoYW5kIHNob3VsZCBiZVxuLy8gaWdub3JlZCkuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gIGxldCBpbmRleCA9IGVsZW1lbnQuaW5kZXhPZkl0ZW0gJiYgZWxlbWVudC5pbmRleE9mSXRlbSh0YXJnZXQpO1xuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICB9XG59XG4iLCIvKipcbiAqIEFzcGVjdCB0aGF0IGxldHMgYSBjb21wb25lbnQgY29sbGVjdGl2ZSBET00gY29udGVudCBhcyBsaXN0IGl0ZW1zLlxuICpcbiAqIEF1eGlsaWFyeSBlbGVtZW50cyB3aGljaCBhcmUgbm90IG5vcm1hbGx5IHZpc2libGUgYXJlIGZpbHRlcmVkIG91dC4gRm9yIG5vdyxcbiAqIEZvciBub3csIHRoZXNlIGFyZTogbGluaywgc2NyaXB0LCBzdHlsZSwgYW5kIHRlbXBsYXRlLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWNvbnRlbnQtaXRlbXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50SXRlbXMge1xuXG4gIGFwcGx5U2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkKSB7XG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcsIHNlbGVjdGVkKTtcbiAgfVxuXG4gIGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgIHRoaXMuX2l0ZW1zID0gbnVsbDtcbiAgICB0aGlzLml0ZW1zQ2hhbmdlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBvc2l0aW9uYWwgaW5kZXggZm9yIHRoZSBpbmRpY2F0ZWQgaXRlbS5cbiAgICpcbiAgICogQG1ldGhvZCBpbmRleE9mSXRlbVxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBUaGUgaXRlbSB3aG9zZSBpbmRleCBpcyByZXF1ZXN0ZWQuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgaXRlbSwgb3IgLTEgaWYgbm90IGZvdW5kLlxuICAgKi9cbiAgaW5kZXhPZkl0ZW0oaXRlbSkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90aGluZy4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5XG4gIC8vIG90aGVyIGFzcGVjdHMgaW4gdGhlIGNvbGxlY3RpdmUuXG4gIC8vIGl0ZW1BZGRlZDogQmFzaWMuQ29sbGVjdGl2ZS5kZWZhdWx0TWV0aG9kLFxuICBpdGVtQWRkZWQoaXRlbSkge31cblxuICBpdGVtc0NoYW5nZWQoKSB7XG5cbiAgICAvLyBQZXJmb3JtIHBlci1pdGVtIGluaXRpYWxpemF0aW9uLlxuICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmICghaXRlbS5faXRlbUluaXRpYWxpemVkKSB7XG4gICAgICAgIC8vIEJVRzogSWYgYW4gYXNwZWN0IGlzIGFzc2ltaWxhdGVkIGFmdGVyIENvbnRlbnRJdGVtcywgdGhlbiBhbGwgdGhlXG4gICAgICAgIC8vIGl0ZW1zIGFyZSBhbHJlYWR5IGluaXRpYWxpemVkLCBhbmQgdGhlIG5ldyBhc3BlY3Qgd29uJ3QgaGF2ZSBhblxuICAgICAgICAvLyBvcHBvcnR1bml0eSB0byBkbyBpdHMgb3duIHBlci1pdGVtIGluaXRpYWxpemF0aW9uIGluIGl0ZW1BZGRlZC5cbiAgICAgICAgdGhpcy5pdGVtQWRkZWQoaXRlbSk7XG4gICAgICAgIGl0ZW0uX2l0ZW1Jbml0aWFsaXplZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAob3V0ZXJtb3N0KSB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2l0ZW1zLWNoYW5nZWQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgIH0pO1xuICAgICAgb3V0ZXJtb3N0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZXQgb2YgaXRlbXMgaW4gdGhlIGxpc3QuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBpdGVtc1xuICAgKiBAdHlwZSBbT2JqZWN0XVxuICAgKi9cbiAgLy8gVE9ETzogcHJvcGVydHkgbm90aWZpY2F0aW9ucyBzbyBlbGVtZW50cyBjYW4gYmluZCB0byB0aGlzIHByb3BlcnR5XG4gIGdldCBpdGVtcygpIHtcbiAgICBpZiAodGhpcy5faXRlbXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5faXRlbXMgPSBmaWx0ZXJBdXhpbGlhcnlFbGVtZW50cyh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cblxufVxuXG5cbi8vIFJldHVybiB0aGUgZ2l2ZW4gZWxlbWVudHMsIGZpbHRlcmluZyBvdXQgYXV4aWxpYXJ5IGVsZW1lbnRzIHRoYXQgYXJlbid0XG4vLyB0eXBpY2FsbHkgdmlzaWJsZS4gSXRlbXMgd2hpY2ggYXJlIG5vdCBlbGVtZW50cyBhcmUgcmV0dXJuZWQgYXMgaXMuXG5mdW5jdGlvbiBmaWx0ZXJBdXhpbGlhcnlFbGVtZW50cyhpdGVtcykge1xuICBsZXQgYXV4aWxpYXJ5VGFncyA9IFtcbiAgICAnbGluaycsXG4gICAgJ3NjcmlwdCcsXG4gICAgJ3N0eWxlJyxcbiAgICAndGVtcGxhdGUnXG4gIF07XG4gIHJldHVybiBbXS5maWx0ZXIuY2FsbChpdGVtcywgZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhaXRlbS5sb2NhbE5hbWUgfHwgYXV4aWxpYXJ5VGFncy5pbmRleE9mKGl0ZW0ubG9jYWxOYW1lKSA8IDA7XG4gIH0pO1xufVxuXG5cbi8qKlxuICogRmlyZXMgd2hlbiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgY2hhbmdlLlxuICpcbiAqIEBldmVudCBpdGVtcy1jaGFuZ2VkXG4gKi9cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hcHMgZGlyZWN0aW9uIHNlbWFudGljcyAoZ29MZWZ0LCBnb1JpZ2h0LCBldGMuKSB0byBzZWxlY3Rpb25cbiAqIHNlbWFudGljcyAoc2VsZWN0UHJldmlvdXMsIHNlbGVjdE5leHQsIGV0Yy4pLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWRpcmVjdGlvbi1zZWxlY3Rpb25cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0aW9uU2VsZWN0aW9uIHtcblxuICBnb0Rvd24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TmV4dCgpO1xuICB9XG5cbiAgZ29FbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TGFzdCgpO1xuICB9XG5cbiAgZ29MZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdFByZXZpb3VzKCk7XG4gIH1cblxuICBnb1JpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdE5leHQoKTtcbiAgfVxuXG4gIGdvU3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0Rmlyc3QoKTtcbiAgfVxuXG4gIGdvVXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0UHJldmlvdXMoKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb25zLiBUaGVzZSB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgc2VsZWN0Rmlyc3QoKSB7fVxuICBzZWxlY3RMYXN0KCkge31cbiAgc2VsZWN0TmV4dCgpIHt9XG4gIHNlbGVjdFByZXZpb3VzKCkge31cblxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKERpcmVjdGlvblNlbGVjdGlvbi5wcm90b3R5cGUsIHtcbiAgc2VsZWN0Rmlyc3Q6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBzZWxlY3RMYXN0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgc2VsZWN0TmV4dDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIHNlbGVjdFByZXZpb3VzOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KVxufSk7XG4iLCIvKlxuICogQSB2ZXJ5IHNpbXBsZSBzZXQgb2YgaGVscGVycyB0byBzdXBwb3J0IHRoZSB1c2Ugb2YgZ2VuZXJpYyBzdHlsaW5nIGluIGFcbiAqIGNvbXBvbmVudC5cbiAqXG4gKiBCeSBkZWZhdWx0LCBhIGNvbXBvbmVudCBzaG91bGQgcHJvdmlkZSBhIG1pbmltYWwgdmlzdWFsIHByZXNlbnRhdGlvbiB0aGF0XG4gKiBhbGxvd3MgdGhlIGNvbXBvbmVudCB0byBmdW5jdGlvbi4gSG93ZXZlciwgdGhlIG1vcmUgc3R5bGluZyB0aGUgY29tcG9uZW50XG4gKiBwcm92aWRlcyBieSBkZWZhdWx0LCB0aGUgaGFyZGVyIGl0IGJlY29tZXMgdG8gZ2V0IHRoZSBjb21wb25lbnQgdG8gZml0IGluXG4gKiBpbiBvdGhlciBzZXR0aW5ncy4gRWFjaCBDU1MgcnVsZSBoYXMgdG8gYmUgb3ZlcnJpZGRlbi4gV29yc2UsIG5ldyBDU1MgcnVsZXNcbiAqIGFkZGVkIHRvIHRoZSBkZWZhdWx0IHN0eWxlIHdvbid0IGJlIG92ZXJyaWRkZW4gYnkgZGVmYXVsdCwgbWFraW5nIGl0IGhhcmQgdG9cbiAqIGtub3cgd2hldGhlciBhIG5ldyB2ZXJzaW9uIG9mIGEgY29tcG9uZW50IHdpbGwgc3RpbGwgbG9vayBva2F5LlxuICpcbiAqIEFzIGEgY29tcHJvbWlzZSwgdGhlIHNpbXBsZSBQb2x5bWVyIGJlaGF2aW9yIGhlcmUgZGVmaW5lcyBhIFwiZ2VuZXJpY1wiXG4gKiBhdHRyaWJ1dGUuIFRoaXMgYXR0cmlidXRlIGlzIG5vcm1hbGx5IHNldCBieSBkZWZhdWx0LCBhbmQgc3R5bGVzIGNhbiBiZVxuICogd3JpdHRlbiB0aGF0IGFwcGx5IG9ubHkgd2hlbiB0aGUgZ2VuZXJpYyBhdHRyaWJ1dGUgaXMgc2V0LiBUaGlzIGFsbG93cyB0aGVcbiAqIGNvbnN0cnVjdGlvbiBvZiBDU1MgcnVsZXMgdGhhdCB3aWxsIG9ubHkgYXBwbHkgdG8gZ2VuZXJpYyBjb21wb25lbnRzIGxpa2VcbiAqXG4gKiAgICAgOmhvc3QoW2dlbmVyaWM9XCJcIl0pIHtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBUaGlzIG1ha2VzIGl0IGVhc3kgdG8gcmVtb3ZlIGFsbCBkZWZhdWx0IHN0eWxpbmcgLS0gc2V0IHRoZSBnZW5lcmljIGF0dHJpYnV0ZVxuICogdG8gZmFsc2UsIGFuZCBhbGwgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZC5cbiAqXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJpYyB7XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuZ2VuZXJpYyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdnZW5lcmljJykgfHwgdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBjb21wb25lbnQgd291bGQgbGlrZSB0byByZWNlaXZlIGdlbmVyaWMgc3R5bGluZy5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSBpcyB0cnVlIGJ5IGRlZmF1bHQg4oCUwqBzZXQgaXQgdG8gZmFsc2UgdG8gdHVybiBvZmYgYWxsXG4gICAqIGdlbmVyaWMgc3R5bGVzLiBUaGlzIG1ha2VzIGl0IGVhc2llciB0byBhcHBseSBjdXN0b20gc3R5bGluZzsgeW91IHdvbid0XG4gICAqIGhhdmUgdG8gZXhwbGljaXRseSBvdmVycmlkZSBzdHlsaW5nIHlvdSBkb24ndCB3YW50LlxuICAgKlxuICAgKiBAcHJvcGVydHkgZ2VuZXJpY1xuICAgKiBAdHlwZSBCb29sZWFuXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGdldCBnZW5lcmljKCkge1xuICAgIHJldHVybiB0aGlzLl9nZW5lcmljO1xuICB9XG5cbiAgLy8gV2Ugcm9sbCBvdXIgb3duIGF0dHJpYnV0ZSBzZXR0aW5nIHNvIHRoYXQgYW4gZXhwbGljaXRseSBmYWxzZSB2YWx1ZSBzaG93c1xuICAvLyB1cCBhcyBnZW5lcmljPVwiZmFsc2VcIi5cbiAgc2V0IGdlbmVyaWModmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSAodmFsdWUgIT09ICdmYWxzZScpO1xuICAgIH1cbiAgICB0aGlzLl9nZW5lcmljID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgLy8gRXhwbGljaXRseSB1c2UgZmFsc2Ugc3RyaW5nLlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2dlbmVyaWMnLCAnZmFsc2UnKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIC8vIEV4cGxpY2l0bHkgcmVtb3ZlIGF0dHJpYnV0ZS5cbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdnZW5lcmljJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1wdHkgc3RyaW5nIHRvIGdldCBhdHRyaWJ1dGUgdG8gYXBwZWFyIHdpdGggbm8gdmFsdWUuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZ2VuZXJpYycsICcnKTtcbiAgICB9XG4gIH1cblxufTtcbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIG1hbmFnZXMgc2VsZWN0aW9uIHNlbWFudGljcyBmb3IgaXRlbXMgaW4gYSBsaXN0LlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWl0ZW0tc2VsZWN0aW9uXG4gKi9cblxuXG4vKipcbiAqIEZpcmVzIHdoZW4gdGhlIHNlbGVjdGVkSXRlbSBwcm9wZXJ0eSBjaGFuZ2VzLlxuICpcbiAqIEBldmVudCBzZWxlY3RlZC1pdGVtLWNoYW5nZWRcbiAqIEBwYXJhbSBkZXRhaWwuc2VsZWN0ZWRJdGVtIFRoZSBuZXcgc2VsZWN0ZWQgaXRlbS5cbiAqIEBwYXJhbSBkZXRhaWwucHJldmlvdXNJdGVtIFRoZSBwcmV2aW91c2x5IHNlbGVjdGVkIGl0ZW0uXG4gKi9cblxuLyoqXG4gKiBGaXJlcyB3aGVuIHRoZSBzZWxlY3RlZEluZGV4IHByb3BlcnR5IGNoYW5nZXMuXG4gKlxuICogQGV2ZW50IHNlbGVjdGVkLWl0ZW0tY2hhbmdlZFxuICogQHBhcmFtIGRldGFpbC5zZWxlY3RlZEluZGV4IFRoZSBuZXcgc2VsZWN0ZWQgaW5kZXguXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVNlbGVjdGlvbiB7XG5cbiAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi4gVGhpcyB3aWxsIHR5cGljYWxseSBiZSBoYW5kbGVkIGJ5IG90aGVyIG1peGlucy5cbiAgYXBwbHlTZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWQpIHt9XG5cbiAgZ2V0IGNhblNlbGVjdE5leHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhblNlbGVjdE5leHQ7XG4gIH1cbiAgc2V0IGNhblNlbGVjdE5leHQoY2FuU2VsZWN0TmV4dCkge1xuICAgIHRoaXMuX2NhblNlbGVjdE5leHQgPSBjYW5TZWxlY3ROZXh0O1xuICB9XG5cbiAgZ2V0IGNhblNlbGVjdFByZXZpb3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jYW5TZWxlY3RQcmV2aW91cztcbiAgfVxuICBzZXQgY2FuU2VsZWN0UHJldmlvdXMoY2FuU2VsZWN0UHJldmlvdXMpIHtcbiAgICB0aGlzLl9jYW5TZWxlY3RQcmV2aW91cyA9IGNhblNlbGVjdFByZXZpb3VzO1xuICB9XG5cbiAgaXRlbUFkZGVkKGl0ZW0pIHtcbiAgICB0aGlzLmFwcGx5U2VsZWN0aW9uKGl0ZW0sIGl0ZW0gPT09IHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgfVxuXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZEl0ZW0pO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIC8vIFNlbGVjdGVkIGl0ZW0gaXMgbm8gbG9uZ2VyIGluIHRoZSBjdXJyZW50IHNldCBvZiBpdGVtcy5cbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGlvblJlcXVpcmVkKSB7XG4gICAgICAgIC8vIEVuc3VyZSBzZWxlY3Rpb24sIGJ1dCBkbyB0aGlzIGluIHRoZSBuZXh0IHRpY2sgdG8gZ2l2ZSBvdGhlclxuICAgICAgICAvLyBhc3BlY3RzIGEgY2hhbmNlIHRvIGRvIHRoZWlyIG93biBpdGVtc0NoYW5nZWQgd29yay5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbnN1cmVTZWxlY3Rpb24odGhpcyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgaXRlbSB3aGljaCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQsIG9yIC0xIGlmIHRoZXJlIGlzIG5vXG4gICAqIHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHByb3BlcnR5IHNlbGVjdGVkSW5kZXhcbiAgICogQHR5cGUgTnVtYmVyXG4gICAqL1xuICBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbiAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW07XG5cbiAgICBpZiAoc2VsZWN0ZWRJdGVtID09IG51bGwpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBNZW1vaXplXG4gICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleE9mSXRlbShzZWxlY3RlZEl0ZW0pO1xuXG4gICAgLy8gSWYgaW5kZXggPSAtMSwgc2VsZWN0aW9uIHdhc24ndCBmb3VuZC4gTW9zdCBsaWtlbHkgY2F1c2UgaXMgdGhhdCB0aGVcbiAgICAvLyBET00gd2FzIG1hbmlwdWxhdGVkIGZyb20gdW5kZXJuZWF0aCB1cy5cbiAgICAvLyBUT0RPOiBPbmNlIHdlIHRyYWNrIGNvbnRlbnQgY2hhbmdlcywgdHVybiB0aGlzIGludG8gYW4gZXhjZXB0aW9uLlxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICBsZXQgaXRlbTtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaXRlbSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaXRlbTtcblxuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIGlmIChvdXRlcm1vc3QpIHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnc2VsZWN0ZWQtaW5kZXgtY2hhbmdlZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgc2VsZWN0ZWRJbmRleDogaW5kZXgsXG4gICAgICAgICAgdmFsdWU6IGluZGV4IC8vIGZvciBQb2x5bWVyIGJpbmRpbmdcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvdXRlcm1vc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSwgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzZWxlY3RlZEl0ZW1cbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICAvLyBUT0RPOiBDb25maXJtIGl0ZW0gaXMgaW4gaXRlbXMgYmVmb3JlIHNlbGVjdGluZy5cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgbGV0IHByZXZpb3VzSXRlbSA9IHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgICBpZiAocHJldmlvdXNJdGVtKSB7XG4gICAgICAvLyBSZW1vdmUgcHJldmlvdXMgc2VsZWN0aW9uLlxuICAgICAgdGhpcy5hcHBseVNlbGVjdGlvbihwcmV2aW91c0l0ZW0sIGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy5hcHBseVNlbGVjdGlvbihpdGVtLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBSYXRpb25hbGl6ZSB3aXRoIHNlbGVjdGVkSW5kZXggc28gd2UncmUgbm90IHJlY2FsY3VsYXRpbmcgaXRlbVxuICAgIC8vIG9yIGluZGV4IGluIGVhY2ggc2V0dGVyLlxuICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXhPZkl0ZW0oaXRlbSk7XG4gICAgdXBkYXRlUG9zc2libGVOYXZpZ2F0aW9ucyh0aGlzLCBpbmRleCk7XG5cbiAgICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5vdXRlcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAob3V0ZXJtb3N0KSB7XG4gICAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3NlbGVjdGVkLWl0ZW0tY2hhbmdlZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgc2VsZWN0ZWRJdGVtOiBpdGVtLFxuICAgICAgICAgIHByZXZpb3VzSXRlbTogcHJldmlvdXNJdGVtLFxuICAgICAgICAgIHZhbHVlOiBpdGVtIC8vIGZvciBQb2x5bWVyIGJpbmRpbmdcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvdXRlcm1vc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RGaXJzdFxuICAgKi9cbiAgc2VsZWN0Rmlyc3QoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIGxpc3Qgc2hvdWxkIGFsd2F5cyBoYXZlIGEgc2VsZWN0aW9uIChpZiBpdCBoYXMgaXRlbXMpLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc2VsZWN0aW9uUmVxdWlyZWRcbiAgICogQHR5cGUgQm9vbGVhblxuICAgKi9cbiAgZ2V0IHNlbGVjdGlvblJlcXVpcmVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25SZXF1aXJlZDtcbiAgfVxuICBzZXQgc2VsZWN0aW9uUmVxdWlyZWQoc2VsZWN0aW9uUmVxdWlyZWQpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25SZXF1aXJlZCA9IHNlbGVjdGlvblJlcXVpcmVkO1xuICAgIGVuc3VyZVNlbGVjdGlvbih0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIGxhc3QgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RMYXN0XG4gICAqL1xuICBzZWxlY3RMYXN0KCkge1xuICAgIHJldHVybiBzZWxlY3RJbmRleCh0aGlzLCB0aGlzLml0ZW1zLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgbmV4dCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAbWV0aG9kIHNlbGVjdE5leHRcbiAgICovXG4gIHNlbGVjdE5leHQoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIHRoaXMuc2VsZWN0ZWRJbmRleCArIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgcHJldmlvdXMgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQG1ldGhvZCBzZWxlY3RQcmV2aW91c1xuICAgKi9cbiAgc2VsZWN0UHJldmlvdXMoKSB7XG4gICAgcmV0dXJuIHNlbGVjdEluZGV4KHRoaXMsIHRoaXMuc2VsZWN0ZWRJbmRleCAtIDEpO1xuICB9XG5cbn1cblxuXG4vLyBJZiBubyBpdGVtIGlzIHNlbGVjdGVkLCBzZWxlY3QgYSBkZWZhdWx0IGl0ZW0uXG4vLyBUT0RPOiBJZiB0aGUgcHJldmlvdXNseS1zZWxlY3RlZCBpdGVtIGhhcyBiZWVuIGRlbGV0ZWQsIHRyeSB0byBzZWxlY3QgYW5cbi8vIGl0ZW0gYWRqYWNlbnQgdG8gdGhlIHBvc2l0aW9uIGl0IGhlbGQuXG5mdW5jdGlvbiBlbnN1cmVTZWxlY3Rpb24oZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQuc2VsZWN0ZWRJdGVtICYmIGVsZW1lbnQuaXRlbXMgJiYgZWxlbWVudC5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gMDtcbiAgfVxufVxuXG4vLyBFbnN1cmUgdGhlIGdpdmVuIGluZGV4IGlzIHdpdGhpbiBib3VuZHMsIGFuZCBzZWxlY3QgaXQgaWYgaXQncyBub3QgYWxyZWFkeVxuLy8gc2VsZWN0ZWQuXG5mdW5jdGlvbiBzZWxlY3RJbmRleChlbGVtZW50LCBpbmRleCkge1xuICBsZXQgYm91bmRlZEluZGV4ID0gTWF0aC5tYXgoTWF0aC5taW4oaW5kZXgsIGVsZW1lbnQuaXRlbXMubGVuZ3RoIC0gMSksIDApO1xuICBsZXQgcHJldmlvdXNJbmRleCA9IGVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcbiAgaWYgKHByZXZpb3VzSW5kZXggIT09IGJvdW5kZWRJbmRleCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IGJvdW5kZWRJbmRleDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRm9sbG93aW5nIGEgY2hhbmdlIGluIHNlbGVjdGlvbiwgcmVwb3J0IHdoZXRoZXIgaXQncyBub3cgcG9zc2libGUgdG9cbi8vIGdvIG5leHQvcHJldmlvdXMgZnJvbSB0aGUgZ2l2ZW4gaW5kZXguXG5mdW5jdGlvbiB1cGRhdGVQb3NzaWJsZU5hdmlnYXRpb25zKGVsZW1lbnQsIGluZGV4KSB7XG4gIGxldCBjYW5TZWxlY3ROZXh0O1xuICBsZXQgY2FuU2VsZWN0UHJldmlvdXM7XG4gIGxldCBpdGVtcyA9IGVsZW1lbnQuaXRlbXM7XG4gIGlmIChpdGVtcyA9PSBudWxsIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIGNhblNlbGVjdE5leHQgPSBmYWxzZTtcbiAgICBjYW5TZWxlY3RQcmV2aW91cyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZS4gSWYgdGhlcmUncyBubyBzZWxlY3Rpb24sIHdlIGRlY2xhcmUgdGhhdCBpdCdzIGFsd2F5c1xuICAgIC8vIHBvc3NpYmxlIHRvIGdvIG5leHQvcHJldmlvdXMgdG8gY3JlYXRlIGEgc2VsZWN0aW9uLlxuICAgIGNhblNlbGVjdE5leHQgPSB0cnVlO1xuICAgIGNhblNlbGVjdFByZXZpb3VzID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBOb3JtYWwgY2FzZTogd2UgaGF2ZSBhbiBpbmRleCBpbiBhIGxpc3QgdGhhdCBoYXMgaXRlbXMuXG4gICAgY2FuU2VsZWN0UHJldmlvdXMgPSAoaW5kZXggPiAwKTtcbiAgICBjYW5TZWxlY3ROZXh0ID0gKGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSk7XG4gIH1cbiAgZWxlbWVudC5jYW5TZWxlY3ROZXh0ID0gY2FuU2VsZWN0TmV4dDtcbiAgZWxlbWVudC5jYW5TZWxlY3RQcmV2aW91cyA9IGNhblNlbGVjdFByZXZpb3VzO1xufVxuXG5cbi8vIHByb3BlcnRpZXM6IHtcbi8vXG4vLyAgIHNlbGVjdGVkSW5kZXg6IHtcbi8vICAgICB0eXBlOiBOdW1iZXJcbi8vICAgfVxuLy9cbi8vICAgc2VsZWN0ZWRJdGVtOiB7XG4vLyAgICAgdHlwZTogT2JqZWN0XG4vLyAgIH1cbi8vXG4vLyAgIHNlbGVjdGlvblJlcXVpcmVkOiB7XG4vLyAgICAgdHlwZTogQm9vbGVhbixcbi8vICAgICBvYnNlcnZlcjogJ3NlbGVjdGlvblJlcXVpcmVkQ2hhbmdlZCcsXG4vLyAgICAgdmFsdWU6IGZhbHNlXG4vLyAgIH1cbi8vXG4vLyB9XG4vL1xuLy8gZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4vLyAgIC8vIEhBQ0s6IFByb3hpZWQgZ2V0dGVyL3NldHRlciBwcm9wZXJ0aWVzIGxpa2UgdGhpcyBvbmUgY2FuJ3QgYmUgc2V0IHZpYVxuLy8gICAvLyBhdHRyaWJ1dGVzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1BvbHltZXIvcG9seW1lci9pc3N1ZXMvMjQ1NC4gV2Vcbi8vICAgLy8gY3VycmVudGx5IGhhY2sgYXJvdW5kIHRoaXMgYnkgb25seSByZXR1cm5pbmcgYSB2YWx1ZSBmb3IgdGhpcyBwcm9wZXJ0eSBpZlxuLy8gICAvLyB0aGUgZWxlbWVudCBpcyByZWFkeS4gQSBuZWdhdGl2ZSBzaWRlIGVmZmVjdCBpcyB0aGF0IGluc3BlY3RpbmcgdGhpc1xuLy8gICAvLyBwcm9wZXJ0eSBiZWZvcmUgdGhlIGVsZW1lbnQgaXMgcmVhZHkgd2lsbCBhbHdheXMgcmV0dXJuIHVuZGVmaW5lZC5cbi8vICAgaWYgKHRoaXMuX3JlYWRpZWQpIHtcbi8vICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xuLy8gICB9XG4vLyB9XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBhZGRzIEFSSUEgcm9sZXMgZm9yIGxpc3RzIGFuZCBsaXN0IGl0ZW1zLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWFjY2Vzc2libGUtbGlzdFxuICovXG5cbi8vIFVzZWQgdG8gYXNzaWduIHVuaXF1ZSBJRHMgdG8gaXRlbSBlbGVtZW50cyB3aXRob3V0IElEcy5cbmxldCBpZENvdW50ID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbXNBY2Nlc3NpYmxlIHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQpO1xuICAgIHZhciBpdGVtSWQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpZiAoaXRlbUlkKSB7XG4gICAgICB0aGlzLm91dGVybW9zdEF0dGFjaGVkLnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgaXRlbUlkKTtcbiAgICB9XG4gIH1cblxuICAvLyAvLyBFbnN1cmUgdGhlIG91dGVybW9zdCBhc3BlY3QgaGFzIHJvbGU9XCJsaXN0Ym94XCIuXG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkKCkge1xuICAvL1xuICAvLyAgIHZhciBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCA9PT0gb3V0ZXJtb3N0KSB7XG4gIC8vICAgICAvLyBBbHJlYWR5IGNvbmZpZ3VyZWQuXG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGlmICh0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdCkge1xuICAvLyAgICAgLy8gUmVtb3ZlIEFSSUEgYXR0cmlidXRlcyBmcm9tIHByZXZpb3VzIG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgICB0aGlzLl9wcmV2aW91c091dGVybW9zdEFzcGVjdC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIG91dGVybW9zdC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICAvL1xuICAvLyAgIC8vIERldGVybWluZSBhIGJhc2UgaXRlbSBJRCBiYXNlZCBvbiB0aGlzIGNvbXBvbmVudCdzIGhvc3QncyBvd24gSUQuIFRoaXNcbiAgLy8gICAvLyB3aWxsIGJlIGNvbWJpbmVkIHdpdGggYSB1bmlxdWUgaW50ZWdlciB0byBhc3NpZ24gSURzIHRvIGl0ZW1zIHRoYXQgZG9uJ3RcbiAgLy8gICAvLyBoYXZlIGFuIGV4cGxpY2l0IElELiBJZiB0aGUgYmFzaWMtbGlzdC1ib3ggaGFzIElEIFwiZm9vXCIsIHRoZW4gaXRzIGl0ZW1zXG4gIC8vICAgLy8gd2lsbCBoYXZlIElEcyB0aGF0IGxvb2sgbGlrZSBcIl9mb29PcHRpb24xXCIuIElmIHRoZSBsaXN0IGhhcyBubyBJRCBpdHNlbGYsXG4gIC8vICAgLy8gaXRzIGl0ZW1zIHdpbGwgZ2V0IElEcyB0aGF0IGxvb2sgbGlrZSBcIl9vcHRpb24xXCIuIEl0ZW0gSURzIGFyZSBwcmVmaXhlZFxuICAvLyAgIC8vIHdpdGggYW4gdW5kZXJzY29yZSB0byBkaWZmZXJlbnRpYXRlIHRoZW0gZnJvbSBtYW51YWxseS1hc3NpZ25lZCBJRHMsIGFuZFxuICAvLyAgIC8vIHRvIG1pbmltaXplIHRoZSBwb3RlbnRpYWwgZm9yIElEIGNvbmZsaWN0cy5cbiAgLy9cbiAgLy8gICAvLyBUT0RPOiBUaGlzIGNoZWNrIG5vdyBjb21lcyB0b28gbGF0ZSBmb3IgY29tcG9uZW50cyBsaWtlIGJhc2ljLWxpc3QtYm94LlxuICAvLyAgIC8vIFdlIG1heSBuZWVkIHRvIGR5bmFtaWNhbGx5IHVwZGF0ZSB0aGUgaXRlbSBJRHMgd2hlbmV2ZXIgdGhlIGNvbGxlY3Rpb25cbiAgLy8gICAvLyBjaGFuZ2VzLCBhbHRob3VnaCB0aGF0IHJlcXVpcmVzIGtlZXBpbmcgdHJhY2sgb2Ygd2hldGhlciB3ZSd2ZSBjaGFuZ2VkXG4gIC8vICAgLy8gYW4gaXRlbSdzIElEIG9yIHdoZXRoZXIgaXQncyBhbHdheXMgaGFkIHRoYXQgSUQuXG4gIC8vICAgdmFyIGVsZW1lbnRJZCA9IG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApO1xuICAvLyAgIHRoaXMuaXRlbUJhc2VJZCA9IGVsZW1lbnRJZCA/XG4gIC8vICAgICAgIFwiX1wiICsgZWxlbWVudElkICsgXCJPcHRpb25cIiA6XG4gIC8vICAgICAgIFwiX29wdGlvblwiO1xuICAvL1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0ID0gb3V0ZXJtb3N0O1xuICAvLyB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIGxldCBvdXRlcm1vc3QgPSB0aGlzLm91dGVybW9zdEF0dGFjaGVkO1xuICAgIG91dGVybW9zdC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGEgYmFzZSBpdGVtIElEIGJhc2VkIG9uIHRoaXMgY29tcG9uZW50J3MgaG9zdCdzIG93biBJRC4gVGhpc1xuICAgIC8vIHdpbGwgYmUgY29tYmluZWQgd2l0aCBhIHVuaXF1ZSBpbnRlZ2VyIHRvIGFzc2lnbiBJRHMgdG8gaXRlbXMgdGhhdCBkb24ndFxuICAgIC8vIGhhdmUgYW4gZXhwbGljaXQgSUQuIElmIHRoZSBiYXNpYy1saXN0LWJveCBoYXMgSUQgXCJmb29cIiwgdGhlbiBpdHMgaXRlbXNcbiAgICAvLyB3aWxsIGhhdmUgSURzIHRoYXQgbG9vayBsaWtlIFwiX2Zvb09wdGlvbjFcIi4gSWYgdGhlIGxpc3QgaGFzIG5vIElEIGl0c2VsZixcbiAgICAvLyBpdHMgaXRlbXMgd2lsbCBnZXQgSURzIHRoYXQgbG9vayBsaWtlIFwiX29wdGlvbjFcIi4gSXRlbSBJRHMgYXJlIHByZWZpeGVkXG4gICAgLy8gd2l0aCBhbiB1bmRlcnNjb3JlIHRvIGRpZmZlcmVudGlhdGUgdGhlbSBmcm9tIG1hbnVhbGx5LWFzc2lnbmVkIElEcywgYW5kXG4gICAgLy8gdG8gbWluaW1pemUgdGhlIHBvdGVudGlhbCBmb3IgSUQgY29uZmxpY3RzLlxuXG4gICAgLy8gVE9ETzogVGhpcyBjaGVjayBub3cgY29tZXMgdG9vIGxhdGUgZm9yIGNvbXBvbmVudHMgbGlrZSBiYXNpYy1saXN0LWJveC5cbiAgICAvLyBXZSBtYXkgbmVlZCB0byBkeW5hbWljYWxseSB1cGRhdGUgdGhlIGl0ZW0gSURzIHdoZW5ldmVyIHRoZSBjb2xsZWN0aW9uXG4gICAgLy8gY2hhbmdlcywgYWx0aG91Z2ggdGhhdCByZXF1aXJlcyBrZWVwaW5nIHRyYWNrIG9mIHdoZXRoZXIgd2UndmUgY2hhbmdlZFxuICAgIC8vIGFuIGl0ZW0ncyBJRCBvciB3aGV0aGVyIGl0J3MgYWx3YXlzIGhhZCB0aGF0IElELlxuICAgIHZhciBlbGVtZW50SWQgPSBvdXRlcm1vc3QuZ2V0QXR0cmlidXRlKCBcImlkXCIgKTtcbiAgICB0aGlzLml0ZW1CYXNlSWQgPSBlbGVtZW50SWQgP1xuICAgICAgICBcIl9cIiArIGVsZW1lbnRJZCArIFwiT3B0aW9uXCIgOlxuICAgICAgICBcIl9vcHRpb25cIjtcbiAgfVxuXG4gIGl0ZW1BZGRlZChpdGVtKSB7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnb3B0aW9uJyk7XG5cbiAgICAvLyBFbnN1cmUgZWFjaCBpdGVtIGhhcyBhbiBJRCBzbyB3ZSBjYW4gc2V0IGFyaWEtYWN0aXZlZGVzY2VuZGFudCBvbiB0aGVcbiAgICAvLyBvdmVyYWxsIGxpc3Qgd2hlbmV2ZXIgdGhlIHNlbGVjdGlvbiBjaGFuZ2VzLlxuICAgIGlmICghaXRlbS5nZXRBdHRyaWJ1dGUoJ2lkJykpIHtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuaXRlbUJhc2VJZCArIGlkQ291bnQrKyk7XG4gICAgfVxuICB9XG5cbiAgc2V0IHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgLy8gQ2F0Y2ggdGhlIGNhc2Ugd2hlcmUgdGhlIHNlbGVjdGlvbiBpcyByZW1vdmVkLlxuICAgIGlmIChpdGVtID09IG51bGwpIHtcbiAgICAgIHRoaXMub3V0ZXJtb3N0QXR0YWNoZWQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICB9XG4gIH1cblxufVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggbWFuYWdlcyB0aGUga2V5Ym9hcmQgZm9jdXMgYW5kIGtleWRvd24gaGFuZGxpbmcgZm9yIGEgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgYXNwZWN0IGVuc3VyZXMgdGhhdCBpdHMgb25seSB0aGUgb3V0ZXJtb3N0IGFzcGVjdCBpbiBhIGNvbGxlY3RpdmUgdGhhdCBpc1xuICogbGlzdGVuaW5nIGZvciBrZXlib2FyZCBldmVudHMuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG5cbiAgLypcbiAgICogV2hlbiB0aGUgY29sbGVjdGl2ZSBjaGFuZ2VzLCBzdG9wIGxpc3RlbmluZyBmb3Iga2V5Ym9hcmQgZXZlbnRzIG9uXG4gICAqIHdoaWNoZXZlciBhc3BlY3Qgd2FzIHByZXZpb3VzbHkgdGhlIG91dGVybW9zdCBhc3BlY3QsIGFuZCBzdGFydCBsaXN0ZW5pbmdcbiAgICogdG8ga2V5Ym9hcmQgZXZlbnRzIG9uIHdoaWNoZXZlciBhc3BlY3QgaXMgbm93IHRoZSBuZXcgb3V0ZXJtb3N0IGFzcGVjdC5cbiAgICovXG4gIC8vIFRPRE86IERvIHdlIG5lZWQgdG8gc3RhcnQvc3RvcCBsaXN0ZW5pbmcgd2hlbiBhdHRhY2hlZC9kZXRhY2hlZCwgb3IgaXNcbiAgLy8gdGhhdCBoYW5kbGVkIGF1dG9tYXRpY2FsbHk/XG4gIC8vIGNvbGxlY3RpdmVDaGFuZ2VkOiBmdW5jdGlvbigpIHtcbiAgLy9cbiAgLy8gICBsZXQgb3V0ZXJtb3N0ID0gdGhpcy5jb2xsZWN0aXZlLm91dGVybW9zdEF0dGFjaGVkO1xuICAvLyAgIGlmIChvdXRlcm1vc3QgPT09IHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0KSB7XG4gIC8vICAgICAvLyBTaG91bGQgYWxyZWFkeSBiZSBsaXN0ZW5pbmcgdG8gZXZlbnRzIG9uIHRoZSBvdXRlcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBpZiAodGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QpIHtcbiAgLy8gICAgIC8vIENsZWFuIHVwIHRoZSBwcmV2aW91cyBhc3BlY3QgdGhhdCB3YXMgaGFuZGxpbmcgdGhlIGtleWJvYXJkLlxuICAvL1xuICAvLyAgICAgaWYgKHRoaXMuX3ByZXZpb3VzVGFiSW5kZXgpIHtcbiAgLy8gICAgICAgLy8gUmVzdG9yZSBwcmV2aW91cyB0YWIgaW5kZXguXG4gIC8vICAgICAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0LnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0aGlzLl9wcmV2aW91c1RhYkluZGV4KTtcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIC8vIEFzcGVjdCBkaWRuJ3QgaGF2ZSBhIHRhYiBpbmRleCBiZWZvcmUsIHNvIHJlbW92ZSBpdC5cbiAgLy8gICAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QucmVtb3ZlQXR0cmlidXRlKCd0YWJJbmRleCcpO1xuICAvLyAgICAgfVxuICAvL1xuICAvLyAgICAgLy8gU3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnRzIHRoZSBwcmV2aW91cyBvdXRlcm1vc3QgYXNwZWN0LlxuICAvLyAgICAgdGhpcy5fcHJldmlvdXNPdXRlcm1vc3RBc3BlY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25IYW5kbGVyKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgaWYgKG91dGVybW9zdC5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JykpIHtcbiAgLy8gICAgIC8vIExlYXZlIGV4aXN0aW5nIHRhYiBpbmRleCBpbiBwbGFjZS5cbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzVGFiSW5kZXggPSBudWxsO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICAvLyBNYWtlIG5ldyBvdXRlcm1vc3QgYXNwZWN0IGZvY3VzYWJsZS5cbiAgLy8gICAgIHRoaXMuX3ByZXZpb3VzVGFiSW5kZXggPSBvdXRlcm1vc3QuZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpO1xuICAvLyAgICAgb3V0ZXJtb3N0LnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCAwKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgLy8gU3RhcnQgbGlzdGVuaW5nIHRvIGV2ZW50cyBvbiB0aGUgbmV3IG91dGVybW9zdCBhc3BlY3QuXG4gIC8vICAgaWYgKCF0aGlzLl9rZXlkb3duSGFuZGxlcikge1xuICAvLyAgICAgdGhpcy5fa2V5ZG93bkhhbmRsZXIgPSB0aGlzLl9rZXlkb3duLmJpbmQodGhpcyk7XG4gIC8vICAgfVxuICAvLyAgIG91dGVybW9zdC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkhhbmRsZXIpO1xuICAvL1xuICAvLyAgIHRoaXMuX3ByZXZpb3VzT3V0ZXJtb3N0QXNwZWN0ID0gb3V0ZXJtb3N0O1xuICAvLyB9XG5cbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICAgIGxldCBoYW5kbGVkID0gdGhpcy5rZXlkb3duKGV2ZW50KTtcbiAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIDApO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBrZXlkb3duIGhhbmRsZXIuIFRoaXMgd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIGtleWRvd24oZXZlbnQpIHt9XG5cbn0iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYXBzIGRpcmVjdGlvbiBrZXlzIChMZWZ0LCBSaWdodCwgZXRjLikgdG8gZGlyZWN0aW9uIHNlbWFudGljc1xuICogKGdvTGVmdCwgZ29SaWdodCwgZXRjLikuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmQtZGlyZWN0aW9uXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGUgZnJvbSAnQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkRGlyZWN0aW9uIHtcblxuICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9ucy4gVGhlc2Ugd2lsbCB0eXBpY2FsbHkgYmUgaGFuZGxlZCBieSBvdGhlciBtaXhpbnMuXG4gIGdvRG93bigpIHt9XG4gIGdvRW5kKCkge31cbiAgZ29MZWZ0KCkge31cbiAgZ29SaWdodCgpIHt9XG4gIGdvU3RhcnQoKSB7fVxuICBnb1VwKCkge31cblxuICBrZXlkb3duKGV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM1OiAvLyBFbmRcbiAgICAgICAgaGFuZGxlZCA9IHRoaXMuZ29FbmQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM2OiAvLyBIb21lXG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvU3RhcnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM3OiAvLyBMZWZ0XG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvTGVmdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6IC8vIFVwXG4gICAgICAgIGhhbmRsZWQgPSBldmVudC5hbHRLZXkgPyB0aGlzLmdvU3RhcnQoKSA6IHRoaXMuZ29VcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0XG4gICAgICAgIGhhbmRsZWQgPSB0aGlzLmdvUmlnaHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOiAvLyBEb3duXG4gICAgICAgIGhhbmRsZWQgPSBldmVudC5hbHRLZXkgPyB0aGlzLmdvRW5kKCkgOiB0aGlzLmdvRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG4gIH1cblxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEtleWJvYXJkRGlyZWN0aW9uLnByb3RvdHlwZSwge1xuICBnb0Rvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb0VuZDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvTGVmdDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGdvUmlnaHQ6IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlckJhc2VSZXN1bHQpLFxuICBnb1N0YXJ0OiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJCYXNlUmVzdWx0KSxcbiAgZ29VcDogQ29tcG9zYWJsZS5ydWxlKENvbXBvc2FibGUucnVsZXMucHJlZmVyQmFzZVJlc3VsdCksXG4gIGtleWRvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlck1peGluUmVzdWx0KVxufSk7XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCBtYXBzIHBhZ2Uga2V5cyAoUGFnZSBVcCwgUGFnZSBEb3duKSBpbnRvIG9wZXJhdGlvbnMgdGhhdCBzY3JvbGxcbiAqIHRoZSBjb21wb25lbnQuXG4gKlxuICogVGhlIGtleWJvYXJkIGludGVyYWN0aW9uIG1vZGVsIGdlbmVyYWxseSBmb2xsb3dzIHRoYXQgb2YgTWljcm9zb2Z0IFdpbmRvd3MnXG4gKiBsaXN0IGJveGVzIGluc3RlYWQgb2YgdGhvc2UgaW4gT1MgWDpcbiAqXG4gKiAqIFRoZSBQYWdlIFVwL0Rvd24gYW5kIEhvbWUvRW5kIGtleXMgYWN0dWFsbHkgbW92ZSB0aGUgc2VsZWN0aW9uLCByYXRoZXIgdGhhblxuICogICBqdXN0IHNjcm9sbGluZy4gVGhlIGZvcm1lciBiZWhhdmlvciBzZWVtcyBtb3JlIGdlbmVyYWxseSB1c2VmdWwgZm9yIGtleWJvYXJkXG4gKiAgIHVzZXJzLlxuICpcbiAqICogUHJlc3NpbmcgUGFnZSBVcC9Eb3duIHdpbGwgbW92ZSB0aGUgc2VsZWN0aW9uIHRvIHRoZSB0b3Btb3N0L2JvdHRvbW1vc3RcbiAqICAgdmlzaWJsZSBpdGVtIGlmIHRoZSBzZWxlY3Rpb24gaXMgbm90IGFscmVhZHkgdGhlcmUuIFRoZXJlYWZ0ZXIsIHRoZSBrZXkgd2lsbFxuICogICBtb3ZlIHRoZSBzZWxlY3Rpb24gdXAvZG93biBieSBhIHBhZ2UsIGFuZCAocGVyIHRoZSBhYm92ZSBwb2ludCkgbWFrZSB0aGVcbiAqICAgc2VsZWN0ZWQgaXRlbSB2aXNpYmxlLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLWtleWJvYXJkLXBhZ2luZ1xuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZFBhZ2luZyB7XG5cbiAga2V5ZG93bihldmVudCkge1xuICAgIGxldCBoYW5kbGVkO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSAzMzogLy8gUGFnZSBVcFxuICAgICAgICBoYW5kbGVkID0gdGhpcy5wYWdlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM0OiAvLyBQYWdlIERvd25cbiAgICAgICAgaGFuZGxlZCA9IHRoaXMucGFnZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBkb3duIG9uZSBwYWdlLlxuICAgKlxuICAgKiBAbWV0aG9kIHBhZ2VEb3duXG4gICAqL1xuICBwYWdlRG93bigpIHtcbiAgICByZXR1cm4gc2Nyb2xsT25lUGFnZSh0aGlzLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdXAgb25lIHBhZ2UuXG4gICAqXG4gICAqIEBtZXRob2QgcGFnZVVwXG4gICAqL1xuICBwYWdlVXAoKSB7XG4gICAgcmV0dXJuIHNjcm9sbE9uZVBhZ2UodGhpcywgZmFsc2UpO1xuICB9XG5cbn1cblxuXG4vLyBSZXR1cm4gdGhlIGl0ZW0gd2hvc2UgY29udGVudCBzcGFucyB0aGUgZ2l2ZW4geSBwb3NpdGlvbiAocmVsYXRpdmUgdG8gdGhlXG4vLyB0b3Agb2YgdGhlIGxpc3QncyBzY3JvbGxpbmcgY2xpZW50IGFyZWEpLCBvciBudWxsIGlmIG5vdCBmb3VuZC5cbi8vXG4vLyBJZiBkb3dud2FyZCBpcyB0cnVlLCBtb3ZlIGRvd24gdGhlIGxpc3Qgb2YgaXRlbXMgdG8gZmluZCB0aGUgZmlyc3QgaXRlbVxuLy8gZm91bmQgYXQgdGhlIGdpdmVuIHkgcG9zaXRpb247IGlmIGRvd253YXJkIGlzIGZhbHNlLCBtb3ZlIHVwIHRoZSBsaXN0IG9mXG4vLyBpdGVtcyB0byBmaW5kIHRoZSBsYXN0IGl0ZW0gYXQgdGhhdCBwb3NpdGlvbi5cbmZ1bmN0aW9uIGdldEluZGV4T2ZJdGVtQXRZKGVsZW1lbnQsIHksIGRvd253YXJkKSB7XG4gIHZhciBpdGVtcyA9IGVsZW1lbnQuaXRlbXM7XG4gIHZhciBzdGFydCA9IGRvd253YXJkID8gMCA6IGl0ZW1zLmxlbmd0aCAtIDE7XG4gIHZhciBlbmQgPSBkb3dud2FyZCA/IGl0ZW1zLmxlbmd0aCA6IDA7XG4gIHZhciBzdGVwID0gZG93bndhcmQgPyAxIDogLTE7XG4gIHZhciBpbm5lcm1vc3QgPSBlbGVtZW50LmlubmVybW9zdEF0dGFjaGVkO1xuICB2YXIgdG9wT2ZDbGllbnRBcmVhID0gaW5uZXJtb3N0Lm9mZnNldFRvcCArIGlubmVybW9zdC5jbGllbnRUb3A7XG4gIHZhciBpID0gc3RhcnQ7XG4gIHZhciBmb3VuZCA9IGZhbHNlO1xuICB3aGlsZSAoaSAhPT0gZW5kKSB7XG4gICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICB2YXIgaXRlbVRvcCA9IGl0ZW0ub2Zmc2V0VG9wIC0gdG9wT2ZDbGllbnRBcmVhO1xuICAgIHZhciBpdGVtQm90dG9tID0gaXRlbVRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGlmIChpdGVtVG9wIDw9IHkgJiYgaXRlbUJvdHRvbSA+PSB5KSB7XG4gICAgICAvLyBJdGVtIHNwYW5zIHRoZSBpbmRpY2F0ZWQgeSBjb29yZGluYXRlLlxuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGkgKz0gc3RlcDtcbiAgfVxuXG4gIGlmICghZm91bmQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFdlIG1heSBoYXZlIGZvdW5kIGFuIGl0ZW0gd2hvc2UgcGFkZGluZyBzcGFucyB0aGUgZ2l2ZW4geSBjb29yZGluYXRlLFxuICAvLyBidXQgd2hvc2UgY29udGVudCBpcyBhY3R1YWxseSBhYm92ZS9iZWxvdyB0aGF0IHBvaW50LlxuICAvLyBUT0RPOiBJZiB0aGUgaXRlbSBoYXMgYSBib3JkZXIsIHRoZW4gcGFkZGluZyBzaG91bGQgYmUgaW5jbHVkZWQgaW5cbiAgLy8gY29uc2lkZXJpbmcgYSBoaXQuXG4gIHZhciBpdGVtU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGl0ZW0pO1xuICB2YXIgaXRlbVBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KGl0ZW1TdHlsZS5wYWRkaW5nVG9wKTtcbiAgdmFyIGl0ZW1QYWRkaW5nQm90dG9tID0gcGFyc2VGbG9hdChpdGVtU3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gIHZhciBjb250ZW50VG9wID0gaXRlbVRvcCArIGl0ZW0uY2xpZW50VG9wICsgaXRlbVBhZGRpbmdUb3A7XG4gIHZhciBjb250ZW50Qm90dG9tID0gY29udGVudFRvcCArIGl0ZW0uY2xpZW50SGVpZ2h0IC0gaXRlbVBhZGRpbmdUb3AgLSBpdGVtUGFkZGluZ0JvdHRvbTtcbiAgaWYgKGRvd253YXJkICYmIGNvbnRlbnRUb3AgPD0geVxuICAgIHx8ICFkb3dud2FyZCAmJiBjb250ZW50Qm90dG9tID49IHkpIHtcbiAgICAvLyBUaGUgaW5kaWNhdGVkIGNvb3JkaW5hdGUgaGl0cyB0aGUgYWN0dWFsIGl0ZW0gY29udGVudC5cbiAgICByZXR1cm4gaTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBUaGUgaW5kaWNhdGVkIGNvb3JkaW5hdGUgZmFsbHMgd2l0aGluIHRoZSBpdGVtJ3MgcGFkZGluZy4gQmFjayB1cCB0b1xuICAgIC8vIHRoZSBpdGVtIGJlbG93L2Fib3ZlIHRoZSBpdGVtIHdlIGZvdW5kIGFuZCByZXR1cm4gdGhhdC5cbiAgICBpIC09IHN0ZXA7XG4gICAgcmV0dXJuIGk7XG4gIH1cbn1cblxuLy8gTW92ZSBieSBvbmUgcGFnZSBkb3dud2FyZCAoaWYgZG93bndhcmQgaXMgdHJ1ZSksIG9yIHVwd2FyZCAoaWYgZmFsc2UpLlxuLy8gUmV0dXJuIHRydWUgaWYgd2UgZW5kZWQgdXAgY2hhbmdpbmcgdGhlIHNlbGVjdGlvbiwgZmFsc2UgaWYgbm90LlxuLy8gVE9ETzogQmV0dGVyIHN1cHBvcnQgZm9yIGhvcml6b250YWwgbGlzdHMuXG5mdW5jdGlvbiBzY3JvbGxPbmVQYWdlKGVsZW1lbnQsIGRvd253YXJkKSB7XG5cbiAgdmFyIGlubmVybW9zdCA9IGVsZW1lbnQuaW5uZXJtb3N0QXR0YWNoZWQ7XG4gIGlmICghaW5uZXJtb3N0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBpdGVtIHZpc2libGUganVzdCBhdCB0aGUgZWRnZSBvZiBkaXJlY3Rpb24gd2UncmUgaGVhZGluZy5cbiAgLy8gV2UnbGwgc2VsZWN0IHRoYXQgaXRlbSBpZiBpdCdzIG5vdCBhbHJlYWR5IHNlbGVjdGVkLlxuICB2YXIgZWRnZSA9IGlubmVybW9zdC5zY3JvbGxUb3AgKyAoZG93bndhcmQgPyBpbm5lcm1vc3QuY2xpZW50SGVpZ2h0IDogMCk7XG4gIHZhciBpbmRleE9mSXRlbUF0RWRnZSA9IGdldEluZGV4T2ZJdGVtQXRZKGVsZW1lbnQsIGVkZ2UsIGRvd253YXJkKTtcblxuICB2YXIgc2VsZWN0ZWRJbmRleCA9IGVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcbiAgdmFyIG5ld0luZGV4O1xuICBpZiAoaW5kZXhPZkl0ZW1BdEVkZ2UgJiYgc2VsZWN0ZWRJbmRleCA9PT0gaW5kZXhPZkl0ZW1BdEVkZ2UpIHtcbiAgICAvLyBUaGUgaXRlbSBhdCB0aGUgZWRnZSB3YXMgYWxyZWFkeSBzZWxlY3RlZCwgc28gc2Nyb2xsIGluIHRoZSBpbmRpY2F0ZWRcbiAgICAvLyBkaXJlY3Rpb24gYnkgb25lIHBhZ2UuIExlYXZlIHRoZSBuZXcgaXRlbSBhdCB0aGF0IGVkZ2Ugc2VsZWN0ZWQuXG4gICAgdmFyIGRlbHRhID0gKGRvd253YXJkID8gMSA6IC0xKSAqIGlubmVybW9zdC5jbGllbnRIZWlnaHQ7XG4gICAgbmV3SW5kZXggPSBnZXRJbmRleE9mSXRlbUF0WShlbGVtZW50LCBlZGdlICsgZGVsdGEsIGRvd253YXJkKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBUaGUgaXRlbSBhdCB0aGUgZWRnZSB3YXNuJ3Qgc2VsZWN0ZWQgeWV0LiBJbnN0ZWFkIG9mIHNjcm9sbGluZywgd2UnbGxcbiAgICAvLyBqdXN0IHNlbGVjdCB0aGF0IGl0ZW0uIFRoYXQgaXMsIHRoZSBmaXJzdCBhdHRlbXB0IHRvIHBhZ2UgdXAvZG93blxuICAgIC8vIHVzdWFsbHkganVzdCBtb3ZlcyB0aGUgc2VsZWN0aW9uIHRvIHRoZSBlZGdlIGluIHRoYXQgZGlyZWN0aW9uLlxuICAgIG5ld0luZGV4ID0gaW5kZXhPZkl0ZW1BdEVkZ2U7XG4gIH1cblxuICBpZiAoIW5ld0luZGV4KSB7XG4gICAgLy8gV2UgY2FuJ3QgZmluZCBhbiBpdGVtIGluIHRoZSBkaXJlY3Rpb24gd2Ugd2FudCB0byB0cmF2ZWwuIFNlbGVjdCB0aGVcbiAgICAvLyBsYXN0IGl0ZW0gKGlmIG1vdmluZyBkb3dud2FyZCkgb3IgZmlyc3QgaXRlbSAoaWYgbW92aW5nIHVwd2FyZCkuXG4gICAgbmV3SW5kZXggPSAoZG93bndhcmQgPyBlbGVtZW50Lml0ZW1zLmxlbmd0aCAtIDEgOiAwKTtcbiAgfVxuXG4gIGlmIChuZXdJbmRleCAhPT0gc2VsZWN0ZWRJbmRleCkge1xuICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IG5ld0luZGV4O1xuICAgIHJldHVybiB0cnVlOyAvLyBXZSBoYW5kbGVkIHRoZSBwYWdlIHVwL2Rvd24gb3Vyc2VsdmVzLlxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTsgLy8gV2UgZGlkbid0IGRvIGFueXRoaW5nLlxuICB9XG59XG5Db21wb3NhYmxlLmRlY29yYXRlLmNhbGwoS2V5Ym9hcmRQYWdpbmcucHJvdG90eXBlLCB7XG4gIGtleWRvd246IENvbXBvc2FibGUucnVsZShDb21wb3NhYmxlLnJ1bGVzLnByZWZlck1peGluUmVzdWx0KVxufSk7XG4iLCIvKipcbiAqIEhhbmRsZSBsaXN0IGJveC1zdHlsZSBwcmVmaXggdHlwaW5nLCBpbiB3aGljaCB0aGUgdXNlciBjYW4gdHlwZSBhIHN0cmluZyB0b1xuICogc2VsZWN0IHRoZSBmaXJzdCBpdGVtIHRoYXQgYmVnaW5zIHdpdGggdGhhdCBzdHJpbmcuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMta2V5Ym9hcmQtcHJlZml4LXNlbGVjdGlvblxuICpcbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuLy8gVE9ETzogSWYgdGhlIHNlbGVjdGlvbiBpcyBjaGFuZ2VkIGJ5IHNvbWUgb3RoZXIgbWVhbnMgKGUuZy4sIGFycm93IGtleXMpIG90aGVyXG4vLyB0aGFuIHByZWZpeCB0eXBpbmcsIHRoZW4gdGhhdCBhY3Qgc2hvdWxkIHJlc2V0IHRoZSBwcmVmaXguXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkUHJlZml4U2VsZWN0aW9uIHtcblxuICAvLyBpdGVtc0NoYW5nZWQoKSB7XG4gIC8vICAgdGhpcy5faXRlbVRleHRDb250ZW50cyA9IG51bGw7XG4gIC8vICAgcmVzZXRUeXBlZFByZWZpeCh0aGlzKTtcbiAgLy8gfVxuXG4gIGtleWRvd24oZXZlbnQpIHtcbiAgICBsZXQgaGFuZGxlZDtcbiAgICBsZXQgcmVzZXRQcmVmaXggPSB0cnVlO1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDg6IC8vIEJhY2tzcGFjZVxuICAgICAgICBoYW5kbGVCYWNrc3BhY2UodGhpcyk7XG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICByZXNldFByZWZpeCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjc6IC8vIEVzY2FwZVxuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXkgJiYgIWV2ZW50LmFsdEtleVxuICAgICAgICAgICYmIGV2ZW50LndoaWNoICE9PSAzMiAvKiBTcGFjZSAqLykge1xuICAgICAgICAgIGhhbmRsZVBsYWluQ2hhcmFjdGVyKHRoaXMsIFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpKTtcbiAgICAgICAgfVxuICAgICAgICByZXNldFByZWZpeCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChyZXNldFByZWZpeCkge1xuICAgICAgcmVzZXRUeXBlZFByZWZpeCh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFuZGxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIGZpcnN0IGl0ZW0gd2hvc2UgdGV4dCBjb250ZW50IGJlZ2lucyB3aXRoIHRoZSBnaXZlbiBwcmVmaXguXG4gICAqXG4gICAqIEBtZXRob2Qgc2VsZWN0SXRlbVdpdGhUZXh0UHJlZml4XG4gICAqIEBwYXJhbSBwcmVmaXggW1N0cmluZ10gVGhlIHN0cmluZyB0byBzZWFyY2ggZm9yXG4gICAqL1xuICBzZWxlY3RJdGVtV2l0aFRleHRQcmVmaXgocHJlZml4KSB7XG4gICAgaWYgKHByZWZpeCA9PSBudWxsIHx8IHByZWZpeC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGluZGV4ID0gZ2V0SW5kZXhPZkl0ZW1XaXRoVGV4dFByZWZpeCh0aGlzLCBwcmVmaXgpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH1cblxufVxuQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKEtleWJvYXJkUHJlZml4U2VsZWN0aW9uLnByb3RvdHlwZSwge1xuICBrZXlkb3duOiBDb21wb3NhYmxlLnJ1bGUoQ29tcG9zYWJsZS5ydWxlcy5wcmVmZXJNaXhpblJlc3VsdClcbn0pO1xuXG5cbi8vIFRpbWUgaW4gbWlsbGlzZWNvbmRzIGFmdGVyIHdoaWNoIHRoZSB1c2VyIGlzIGNvbnNpZGVyZWQgdG8gaGF2ZSBzdG9wcGVkXG4vLyB0eXBpbmcuXG5jb25zdCBQUkVGSVhfVElNRU9VVF9EVVJBVElPTiA9IDEwMDA7XG5cblxuLy8gUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbSB3aXRoIHRoZSBnaXZlbiBwcmVmaXgsIGVsc2UgLTEuXG5mdW5jdGlvbiBnZXRJbmRleE9mSXRlbVdpdGhUZXh0UHJlZml4KGVsZW1lbnQsIHByZWZpeCkge1xuICBsZXQgaXRlbVRleHRDb250ZW50cyA9IGdldEl0ZW1UZXh0Q29udGVudHMoZWxlbWVudCk7XG4gIGxldCBwcmVmaXhMZW5ndGggPSBwcmVmaXgubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1UZXh0Q29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaXRlbVRleHRDb250ZW50ID0gaXRlbVRleHRDb250ZW50c1tpXTtcbiAgICBpZiAoaXRlbVRleHRDb250ZW50LnN1YnN0cigwLCBwcmVmaXhMZW5ndGgpID09PSBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8vIFJldHVybiBhbiBhcnJheSBvZiB0aGUgdGV4dCBjb250ZW50IChpbiBsb3dlcmNhc2UpIG9mIGFsbCBpdGVtcy5cbi8vIENhY2hlIHRoZXNlIHJlc3VsdHMuXG5mdW5jdGlvbiBnZXRJdGVtVGV4dENvbnRlbnRzKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzKSB7XG4gICAgbGV0IGl0ZW1zID0gZWxlbWVudC5pdGVtcztcbiAgICBlbGVtZW50Ll9pdGVtVGV4dENvbnRlbnRzID0gaXRlbXMubWFwKGNoaWxkID0+IHtcbiAgICAgIGxldCB0ZXh0ID0gY2hpbGQudGV4dENvbnRlbnQgfHwgY2hpbGQuYWx0O1xuICAgICAgcmV0dXJuIHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5faXRlbVRleHRDb250ZW50cztcbn1cblxuZnVuY3Rpb24gaGFuZGxlQmFja3NwYWNlKGVsZW1lbnQpIHtcbiAgbGV0IGxlbmd0aCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4ID8gZWxlbWVudC5fdHlwZWRQcmVmaXgubGVuZ3RoIDogMDtcbiAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50Ll90eXBlZFByZWZpeCA9IGVsZW1lbnQuX3R5cGVkUHJlZml4LnN1YnN0cigwLCBsZW5ndGggLSAxKTtcbiAgfVxuICBlbGVtZW50LnNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50Ll90eXBlZFByZWZpeCk7XG4gIGVsZW1lbnQuX3NldFByZWZpeFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUGxhaW5DaGFyYWN0ZXIoZWxlbWVudCwgY2hhcikge1xuICBsZXQgcHJlZml4ID0gZWxlbWVudC5fdHlwZWRQcmVmaXggfHwgJyc7XG4gIGVsZW1lbnQuX3R5cGVkUHJlZml4ID0gcHJlZml4ICsgY2hhci50b0xvd2VyQ2FzZSgpO1xuICBlbGVtZW50LnNlbGVjdEl0ZW1XaXRoVGV4dFByZWZpeChlbGVtZW50Ll90eXBlZFByZWZpeCk7XG4gIHNldFByZWZpeFRpbWVvdXQoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0UHJlZml4VGltZW91dChlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Ll9wcmVmaXhUaW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQpO1xuICAgIGVsZW1lbnQuX3ByZWZpeFRpbWVvdXQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldFR5cGVkUHJlZml4KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5fdHlwZWRQcmVmaXggPSAnJztcbiAgcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpIHtcbiAgcmVzZXRQcmVmaXhUaW1lb3V0KGVsZW1lbnQpO1xuICBlbGVtZW50Ll9wcmVmaXhUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVzZXRUeXBlZFByZWZpeChlbGVtZW50KTtcbiAgfSwgUFJFRklYX1RJTUVPVVRfRFVSQVRJT04pO1xufVxuIiwiLyoqXG4gKiBBc3BlY3Qgd2hpY2ggYXBwbGllcyBzdGFuZGFyZCBoaWdobGlnaHQgY29sb3JzIHRvIGEgc2VsZWN0ZWQgaXRlbS5cbiAqXG4gKiBAZWxlbWVudCBiYXNpYy1zZWxlY3Rpb24taGlnaGxpZ2h0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0aW9uSGlnaGxpZ2h0IHtcblxuICBhcHBseVNlbGVjdGlvbihpdGVtLCBzZWxlY3RlZCkge1xuICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc2VsZWN0ZWQgPyAnaGlnaGxpZ2h0JyA6ICcnO1xuICAgIGl0ZW0uc3R5bGUuY29sb3IgPSBzZWxlY3RlZCA/ICdoaWdobGlnaHR0ZXh0JyA6ICcnO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQXNwZWN0IHdoaWNoIHNjcm9sbHMgYSBjb250YWluZXIgdG8ga2VlcCB0aGUgc2VsZWN0ZWQgaXRlbSB2aXNpYmxlLlxuICpcbiAqIEBlbGVtZW50IGJhc2ljLXNlbGVjdGlvbi1zY3JvbGxcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3Rpb25TY3JvbGwge1xuXG4gIHNldCBzZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAvLyBLZWVwIHRoZSBzZWxlY3RlZCBpdGVtIGluIHZpZXcuXG4gICAgICB0aGlzLnNjcm9sbEl0ZW1JbnRvVmlldyhpdGVtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRoZSBnaXZlbiBlbGVtZW50IGNvbXBsZXRlbHkgaW50byB2aWV3LCBtaW5pbWl6aW5nIHRoZSBkZWdyZWUgb2ZcbiAgICogc2Nyb2xsaW5nIHBlcmZvcm1lZC5cbiAgICpcbiAgICogQmxpbmsgaGFzIGEgc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCgpIGZ1bmN0aW9uIHRoYXQgYWxtb3N0IHRoZSBzYW1lIHRoaW5nLFxuICAgKiBidXQgdW5mb3J0dW5hdGVseSBpdCdzIG5vbi1zdGFuZGFyZCwgYW5kIGluIGFueSBldmVudCBvZnRlbiBlbmRzIHVwXG4gICAqIHNjcm9sbGluZyBtb3JlIHRoYW4gaXMgYWJzb2x1dGVseSBuZWNlc3NhcnkuXG4gICAqXG4gICAqIEBtZXRob2Qgc2Nyb2xsSXRlbUludG9WaWV3XG4gICAqL1xuICBzY3JvbGxJdGVtSW50b1ZpZXcoaXRlbSkge1xuICAgIC8vIEdldCB0aGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gd2l0aCByZXNwZWN0IHRvIHRoZSB0b3Agb2YgdGhlXG4gICAgLy8gbGlzdCdzIHNjcm9sbGFibGUgY2FudmFzLiBBbiBpdGVtIGF0IHRoZSB0b3Agb2YgdGhlIGxpc3Qgd2lsbCBoYXZlIGFcbiAgICAvLyBlbGVtZW50VG9wIG9mIDAuXG5cbiAgICBsZXQgaW5uZXJtb3N0ID0gdGhpcy5pbm5lcm1vc3RBdHRhY2hlZDtcbiAgICBpZiAoIWlubmVybW9zdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbGVtZW50VG9wID0gaXRlbS5vZmZzZXRUb3AgLSBpbm5lcm1vc3Qub2Zmc2V0VG9wIC0gaW5uZXJtb3N0LmNsaWVudFRvcDtcbiAgICBsZXQgZWxlbWVudEJvdHRvbSA9IGVsZW1lbnRUb3AgKyBpdGVtLm9mZnNldEhlaWdodDtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIGJvdHRvbSBvZiB0aGUgc2Nyb2xsYWJsZSBjYW52YXMuXG4gICAgbGV0IHNjcm9sbEJvdHRvbSA9IGlubmVybW9zdC5zY3JvbGxUb3AgKyBpbm5lcm1vc3QuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChlbGVtZW50Qm90dG9tID4gc2Nyb2xsQm90dG9tKSB7XG4gICAgICAvLyBTY3JvbGwgdXAgdW50aWwgaXRlbSBpcyBlbnRpcmVseSB2aXNpYmxlLlxuICAgICAgaW5uZXJtb3N0LnNjcm9sbFRvcCArPSBlbGVtZW50Qm90dG9tIC0gc2Nyb2xsQm90dG9tO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50VG9wIDwgaW5uZXJtb3N0LnNjcm9sbFRvcCkge1xuICAgICAgLy8gU2Nyb2xsIGRvd24gdW50aWwgaXRlbSBpcyBlbnRpcmVseSB2aXNpYmxlLlxuICAgICAgaW5uZXJtb3N0LnNjcm9sbFRvcCA9IGVsZW1lbnRUb3A7XG4gICAgfVxuICB9XG5cbn1cbiIsIi8qXG4gKiBFeHRlbmQgY2xhc3Nlcy9vYmplY3RzIHdpdGggb3RoZXIgY2xhc3Nlcy9vYmplY3RzLlxuICovXG5cbmltcG9ydCAqIGFzIENvbXBvc2l0aW9uUnVsZXMgZnJvbSAnLi9Db21wb3NpdGlvblJ1bGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9zYWJsZSB7XG5cbiAgLypcbiAgICogUmV0dXJuIGEgc3ViY2xhc3Mgb2YgdGhlIGN1cnJlbnQgY2xhc3MgdGhhdCBpbmNsdWRlcyB0aGUgbWVtYmVycyBpbmRpY2F0ZWRcbiAgICogaW4gdGhlIGFyZ3VtZW50LiBUaGUgYXJndW1lbnQgY2FuIGJlIGEgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3QsIG9yIGEgY2xhc3NcbiAgICogd2hvc2UgcHJvdG90eXBlIGNvbnRhaW5zIHRoZSBtZW1iZXJzIHRoYXQgd2lsbCBiZSBjb3BpZWQuXG4gICAqXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIGEgY291cGxlIG9mIHB1cnBvc2VzOlxuICAgKiAxLiBFeHRlbmQgYSBjbGFzcyB3aXRoIG1peGlucy9iZWhhdmlvcnMuXG4gICAqIDIuIENyZWF0ZSBhIGNvbXBvbmVudCBjbGFzcyBpbiBFUzUuXG4gICAqXG4gICAqIFRoZSBjYWxsXG4gICAqXG4gICAqICAgTXlCYXNlQ2xhc3MuY29tcG9zZShNaXhpbjEsIE1peGluMiwgTWl4aW4zKVxuICAgKlxuICAgKiB3aWxsIHJldHVybiBhIG5ldyBjbGFzcyBvZiBNeUJhc2VDbGFzcyB0aGF0IGltcGxlbWVudHMgYWxsIHRoZSBtZXRob2RzIGluXG4gICAqIHRoZSB0aHJlZSBtaXhpbnMgZ2l2ZW4uIFRoZSBhYm92ZSBpcyBlcXVpdmFsZW50IHRvXG4gICAqXG4gICAqICAgTXlCYXNlQ2xhc3MuY29tcG9zZShNaXhpbjEpLmNvbXBvc2UoTWl4aW4yKS5jb21wb3NlKE1peGluMylcbiAgICpcbiAgICogVGhpcyBtZXRob2QgY2FuIGJlIHN0YXRpY2FsbHkgaW52b2tlZCB0byBleHRlbmQgcGxhaW4gb2JqZWN0cyBvciBjbGFzc2VzXG4gICAqIHRoYXQgZG9uJ3QgaW5oZXJpdCBmcm9tIHRoaXMgY2xhc3M6XG4gICAqXG4gICAqICAgbGV0IGV4dGVuZGVkID0gQ29tcG9zYWJsZS5leHRlbmQuY2FsbChvYmoxLCBvYmoyKTtcbiAgICpcbiAgICovXG4gIHN0YXRpYyBjb21wb3NlKC4uLm1peGlucykge1xuICAgIC8vIFdlIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcyBmb3IgZWFjaCBtaXhpbiBpbiB0dXJuLiBUaGUgcmVzdWx0IGJlY29tZXNcbiAgICAvLyB0aGUgYmFzZSBjbGFzcyBleHRlbmRlZCBieSBhbnkgc3Vic2VxdWVudCBtaXhpbnMuIEl0IHR1cm5zIG91dCB0aGF0XG4gICAgLy8gd2UgY2FuIHVzZSBBcnJheS5yZWR1Y2UoKSB0byBjb25jaXNlbHkgZXhwcmVzcyB0aGlzLCB1c2luZyB0aGUgY3VycmVudFxuICAgIC8vIChvcmlnaW5hbCkgY2xhc3MgYXMgdGhlIHNlZWQgZm9yIHJlZHVjZSgpLlxuICAgIHJldHVybiBtaXhpbnMucmVkdWNlKGNvbXBvc2UsIHRoaXMpO1xuICB9XG5cbiAgLypcbiAgICogRGVjb3JhdGUgXCJ0aGlzXCIgd2l0aCB0aGUgaW5kaWNhdGVkIGRlY29yYXRvcnMuIFRoZSBsYXR0ZXIgc2hvdWxkIGJlIGFcbiAgICogZGljdGlvbmFyeSBtYXBwaW5nIHByb3BlcnR5IG5hbWVzIHRvIChwcm9wb3NlZCkgRVM3LWNvbXBsaWFudCBkZWNvcmF0b3JzLlxuICAgKiBUaGlzIGFsbG93cyB0aGUgdXNlIG9mIGRlY29yYXRvcnMgaW4gRVM2LzUuIEV4YW1wbGUsIHRoaXMgRVM3IGNvZGU6XG4gICAqXG4gICAqICAgY2xhc3MgRm9vIHtcbiAgICogICAgICBAZGVjb3JhdGUoY3VzdG9tRGVjb3JhdG9yKVxuICAgKiAgICAgIGJhcigpIHt9XG4gICAqICAgfVxuICAgKlxuICAgKiBjYW4gYmUgd3JpdHRlbiB1c2luZyB0aGUgZGVjb3JhdGUoKSBtZXRob2QgYXM6XG4gICAqXG4gICAqICAgY2xhc3MgRm9vIHtcbiAgICogICAgICBiYXIoKSB7fVxuICAgKiAgIH1cbiAgICogICBDb21wb3NhYmxlLmRlY29yYXRlLmNhbGwoRm9vLnByb3RvdHlwZSwgeyBiYXI6IGN1c3RvbURlY29yYXRvciB9KTtcbiAgICpcbiAgICogT3IsIGlmIEZvbyBkZXJpdmVzIGZyb20gQ29tcG9zYWJsZSBhbHJlYWR5LCB0aGlzIGNhbiBiZSBzaG9ydGVyOlxuICAgKlxuICAgKiAgIGNsYXNzIEZvbyBleHRlbmRzIENvbXBvc2FibGUge1xuICAgKiAgICAgIGJhcigpIHt9XG4gICAqICAgfVxuICAgKiAgIEZvby5wcm90b3R5cGUuZGVjb3JhdGUoeyBiYXI6IGN1c3RvbURlY29yYXRvciB9KTtcbiAgICpcbiAgICovXG4gIHN0YXRpYyBkZWNvcmF0ZShkZWNvcmF0b3JzKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGRlY29yYXRvcnMpIHtcbiAgICAgIGxldCBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW2tleV07XG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywga2V5KTtcbiAgICAgIGRlY29yYXRvcih0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogRGVjb3JhdGVzIHRoZSBwcm90b3R5cGUgb2YgYSBjbGFzcyBkZXJpdmVkIGZyb20gQ29tcG9zYWJsZS5cbiAgICogU2VlIG5vdGVzIGZvciB0aGUgc3RhdGljIGRlY29yYXRlKCkgbWV0aG9kLlxuICAgKi9cbiAgZGVjb3JhdGUoZGVjb3JhdG9ycykge1xuICAgIENvbXBvc2FibGUuZGVjb3JhdGUuY2FsbCh0aGlzLCBkZWNvcmF0b3JzKTtcbiAgfVxuXG4gIC8qXG4gICAqIERlY29yYXRvciBmb3IgYW5ub3RhdGluZyBob3cgYSBjbGFzcyBtZW1iZXIgc2hvdWxkIGJlIGNvbXBvc2VkIGxhdGVyLlxuICAgKiBUaGlzIHRha2VzIGEgZGVjb3JhdG9yIHRoYXQgd2lsbCBiZSBydW4gYXQgKmNvbXBvc2l0aW9uKiB0aW1lLlxuICAgKiBGb3Igbm93LCB0aGlzIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gbWV0aG9kcy5cbiAgICovXG4gIHN0YXRpYyBydWxlKGRlY29yYXRvcikge1xuICAgIC8vIFJldHVybiBhIGRlY29yYXRvciB0aGF0IHJlY29yZHMgdGhlIGdpdmVuIGRlY29yYXRvciBvbiB0aGUgbWVtYmVyIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgICAgIC8vIFRPRE86IFVzZSBhIFN5bWJvbCBpbnN0ZWFkIG9mIGEgc3RyaW5nIHByb3BlcnR5IG5hbWUgdG8gc2F2ZSB0aGlzLlxuICAgICAgLy8gZGVzY3JpcHRvci52YWx1ZS5fY29tcG9zaXRpb25SdWxlID0gZGVjb3JhdG9yO1xuICAgICAgaWYgKCF0YXJnZXQuX2NvbXBvc2l0aW9uUnVsZXMpIHtcbiAgICAgICAgdGFyZ2V0Ll9jb21wb3NpdGlvblJ1bGVzID0ge307XG4gICAgICB9XG4gICAgICB0YXJnZXQuX2NvbXBvc2l0aW9uUnVsZXNba2V5XSA9IGRlY29yYXRvcjtcbiAgICB9XG4gIH1cblxufVxuXG5cbi8qXG4gKiBFeHBvc2Ugc3RhbmRhcmQgY29tcG9zaXRpb24gcnVsZXMgYXMgcHJvcGVydGllcyBvZiBDb21wb3NhYmxlLlxuICogVGhpcyBhdm9pZHMgdGhlIG5lZWQgZm9yIHNvbWVvbmUgdG8gbWFrZSBhIHNlcGFyYXRlIGltcG9ydCBvZiB0aGUgcnVsZXMuXG4gKi9cbkNvbXBvc2FibGUucnVsZXMgPSBDb21wb3NpdGlvblJ1bGVzO1xuXG5cbi8qXG4gKiBBbGwgQ29tcG9zYWJsZSBvYmplY3RzIGhhdmUgYSBcInByb3RvdHlwZXNcIiBrZXkgdGhhdCBrZWVwcyByZWZlcmVuY2VzIHRvIHRoZVxuICogbWl4aW5zIHRoYXQgd2VyZSBhcHBsaWVkIGFsb25nIHRoZSBwcm90b3R5cGUgY2hhaW4uIFdoZW4gYSAqbmFtZWQqIG1peGluIGlzXG4gKiBhcHBsaWVkIHRvIHRoZSBwcm90b3R5cGUgY2hhaW4sIHRoZSByZXN1bHRpbmcgb2JqZWN0IChvciwgZm9yIGEgY2xhc3MsIHRoZVxuICogY2xhc3MnIHByb3RvdHlwZSkgd2lsbCBoYXZlIGEgXCJwcm90b3R5cGVzXCIgdmFsdWUgZm9yIHRoYXQgbmFtZSB0aGF0IHBvaW50c1xuICogYmFjayB0byB0aGUgbWl4aW4uIFRoYXQgaXMsIGEgbWl4aW4gY2FuIGdldCBhIHBvaW50ZXIgdG8gaXRzZWxmIGluIHRoZSBjaGFpbi5cbiAqXG4gKiBBIHNpbmdsZSBtaXhpbiBjYW4gYmUgYXBwbGllZCB0byBtdWx0aXBsZSBwcm90b3R5cGUgY2hhaW5zIC0tIHRoZSBuYW1lXG4gKiByZWZlcnMgdG8gdGhlIHByb3RvdHlwZSBvbiAqdGhpcyBwYXJ0aWN1bGFyIHByb3RvdHlwZSBjaGFpbiogdGhhdCB3YXMgYWRkZWRcbiAqIGZvciB0aGF0IG1peGluLiBUaGlzIGxldHMgbWl4aW4vbWl4aW4gY29kZSBnZXQgYmFjayB0byBpdHMgb3duXG4gKiBwcm90b3R5cGUsIG1vc3Qgb2Z0ZW4gaW4gY29tYmluYXRpb24gd2l0aCBcInN1cGVyXCIgKHNlZSBiZWxvdykgaW4gb3JkZXIgdG9cbiAqIGludm9rZSBzdXBlcmNsYXNzIGJlaGF2aW9yLlxuICovXG5Db21wb3NhYmxlLnByb3RvdHlwZS5wcm90b3R5cGVzID0ge1xuICBDb21wb3NhYmxlOiBDb21wb3NhYmxlLnByb3RvdHlwZVxufTtcblxuLypcbiAqIEFsbCBDb21wb3NhYmxlLWNyZWF0ZWQgb2JqZWN0cyBoYXZlIGEgXCJzdXBlclwiIHByb3BlcnR5IHRoYXQgcmVmZXJlbmNlcyB0aGVcbiAqIHByb3RvdHlwZSBhYm92ZSB0aGVtIGluIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gKlxuICogVGhpcyBcInN1cGVyXCIgcmVmZXJlbmNlIGlzIHVzZWQgYXMgYSByZXBsYWNlbWVudCBmb3IgRVM2J3MgXCJzdXBlclwiIGtleXdvcmQgaW5cbiAqIGluIEVTNSAob3IgdHJhbnNwaWxlZCBFUzYpIG1peGlucyB0aGF0IHdhbnQgdG8gaW52b2tlIHN1cGVyY2xhc3MgYmVoYXZpb3IsXG4gKiB3aGVyZSB0aGUgc3BlY2lmaWMgc3VwZXJjbGFzcyB3aWxsIGRlcGVuZCB1cG9uIHdoaWNoIG1peGlucyBoYXZlIGJlZW4gYXBwbGllZFxuICogdG8gYSBnaXZlbiBwcm90b3R5cGUgY2hhaW4uXG4gKlxuICogRS5nLjpcbiAqICAgY2xhc3MgTWl4aW4ge1xuICogICAgIGZvbygpIHtcbiAqICAgICAgIGlmICh0aGlzLnByb3RveXBlcy5NaXhpbi5zdXBlci5mb28pIHtcbiAqICAgICAgICAgdGhpcy5wcm90b3R5cGVzLk1peGluLnN1cGVyLmZvby5jYWxsKHRoaXMpOyAvLyBJbnZva2Ugc3VwZXJjbGFzcycgZm9vKClcbiAqICAgICAgIH1cbiAqICAgICAgIC8vIERvIE1peGluLXNwZWNpZmljIHdvcmsgaGVyZS4uLlxuICogICAgIH1cbiAqICAgfVxuICpcbiAqIEZvciBjb25zaXN0ZW5jeSwgQ29tcG9zYWJsZSBpdHNlbGYgcmVjb3JkcyBpdHMgb3duIHN1cGVyY2xhc3MgYXMgT2JqZWN0LlxuICovXG5Db21wb3NhYmxlLnByb3RvdHlwZS5zdXBlciA9IE9iamVjdC5wcm90b3R5cGU7XG5cblxuLy8gQ29tcG9zaXRpb24gcnVsZXMgZm9yIHN0YW5kYXJkIG9iamVjdCBtZW1iZXJzLlxuQ29tcG9zYWJsZS5wcm90b3R5cGUuY29tcG9zaXRpb25SdWxlcyA9IHtcbiAgJ19fbWV0aG9kX18nOiBDb21wb3NhYmxlLnJ1bGVzLmJhc2VNZXRob2RGaXJzdCxcbiAgJ19fcHJvcGVydHlfXyc6IENvbXBvc2FibGUucnVsZXMuYmFzZVNldHRlckZpcnN0LFxuICAnY29tcG9zaXRpb25SdWxlcyc6IENvbXBvc2FibGUucnVsZXMuY2hhaW5Qcm90b3R5cGVzLFxuICAncHJvdG90eXBlcyc6IENvbXBvc2FibGUucnVsZXMuY2hhaW5Qcm90b3R5cGVzXG59O1xuXG5cbi8vIFByb3BlcnRpZXMgZGVmaW5lZCBieSBGdW5jdGlvbiB0aGF0IHdlIGRvbid0IHdhbnQgdG8gbWl4aW4uXG4vLyBXZSdkIHByZWZlciB0byBnZXQgdGhlc2UgYnkgaW50ZXJyb2dhdGluZyBGdW5jdGlvbiBpdHNlbGYsIGJ1dCBXZWJLaXRcbi8vIGZ1bmN0aW9ucyBoYXZlIHNvbWUgcHJvcGVydGllcyAoYXJndW1lbnRzIGFuZCBjYWxsZXIpIHdoaWNoIGFyZSBub3QgcmV0dXJuZWRcbi8vIGJ5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEZ1bmN0aW9uKS5cbmNvbnN0IE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMgPSBbXG4gICdhcmd1bWVudHMnLFxuICAnY2FsbGVyJyxcbiAgJ2xlbmd0aCcsXG4gICduYW1lJyxcbiAgJ3Byb3RvdHlwZSdcbl07XG5cbi8vIFByb3BlcnRpZXMgZGVmaW5lZCBieSBPYmplY3QgdGhhdCB3ZSBkb24ndCB3YW50IHRvIG1peGluLlxuY29uc3QgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMgPSBbXG4gICdjb25zdHJ1Y3Rvcidcbl07XG5cbmNvbnN0IE9SSUdJTkFMX01JWElOX1NZTUJPTCA9IFN5bWJvbCgnT3JpZ2luYWwgbWl4aW4nKTtcblxuXG4vKlxuICogQXBwbHkgdGhlIGNvbXBvc2l0aW9uIHJ1bGVzIGluIGVmZmVjdCBmb3IgdGhlIGdpdmVuIG9iamVjdCwgd2hpY2ggbGllcyBhdFxuICogdGhlIHRpcCBvZiBhIHByb3RvdHlwZSBjaGFpbi4gVGhpcyBsb29rcyBmb3IgY29uZmxpY3RzIGJldHdlZW4gdGhlIG9iamVjdCdzXG4gKiBvd24gcHJvcGVydGllcyAoYW5kIG1ldGhvZHMpLCBhbmQgaWRlbnRpY2FsbHktbmFtZWQgcHJvcGVydGllcyAobWV0aG9kcylcbiAqIGZ1cnRoZXIgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi4gQ29uZmxpY3RzIGFyZSByZXNvbHZlZCB3aXRoIHJ1bGVzIGRlZmluZWQgYnlcbiAqIHRoZSBhZmZlY3QgbWVtYmVycy5cbiAqL1xuZnVuY3Rpb24gYXBwbHlDb21wb3NpdGlvblJ1bGVzKG9iaikge1xuICBsZXQgb3duQ29tcG9zaXRpb25SdWxlcyA9IG9iai5oYXNPd25Qcm9wZXJ0eSgnX2NvbXBvc2l0aW9uUnVsZXMnKSA/XG4gICAgb2JqLl9jb21wb3NpdGlvblJ1bGVzIDpcbiAgICB7fTtcbiAgbGV0IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXMgPSBvYmouY29tcG9zaXRpb25SdWxlcztcbiAgbGV0IGRlZmF1bHRDb21wb3NpdGlvblJ1bGVzID0gQ29tcG9zYWJsZS5wcm90b3R5cGUuY29tcG9zaXRpb25SdWxlcztcblxuICAvLyBGb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBzZWUgaWYgdGhlIGJhc2UgaGFzIGEgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lLlxuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKG5hbWUgaW4gYmFzZSAmJiBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgLy8gQmFzZSBkb2VzIGltcGxlbWVudCBhIG1lbWJlciB3aXRoIHRoZSBzYW1lIG5hbWU7IG5lZWQgdG8gY29tYmluZS5cbiAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xuICAgICAgbGV0IGtleSA9IGdldEdlbmVyYWxEZXNjcmlwdG9yS2V5KGRlc2NyaXB0b3IpO1xuXG4gICAgICAvLyBTZWUgaWYgdGhpcyBwcm9wZXJ0eSBoYXMgYSBydWxlIGFzc29jaWF0ZWQgd2l0aCBpdCwgY2hlY2tpbmc6XG4gICAgICBsZXQgcnVsZSA9IG93bkNvbXBvc2l0aW9uUnVsZXNbbmFtZV0gICAgLy8gb2JqZWN0IGl0c2VsZlxuICAgICAgICAgIHx8IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXNbbmFtZV0gIC8vIGluaGVyaXRlZCBydWxlcyBmb3IgbmFtZVxuICAgICAgICAgIHx8IGluaGVyaXRlZENvbXBvc2l0aW9uUnVsZXNba2V5XSAgIC8vIGluaGVyaXRlZCBydWxlcyBnZW5lcmFsbHlcbiAgICAgICAgICB8fCBkZWZhdWx0Q29tcG9zaXRpb25SdWxlc1tuYW1lXSAgICAvLyBkZWZhdWx0IHJ1bGVzIGZvciBuYW1lXG4gICAgICAgICAgfHwgZGVmYXVsdENvbXBvc2l0aW9uUnVsZXNba2V5XTsgICAgLy8gZGVmYXVsdCBydWxlcyBnZW5lcmFsbHlcblxuICAgICAgLy8gXCJvdmVycmlkZVwiIGlzIGEga25vd24gbm8tb3AsIHNvIHdlIGRvbid0IGJvdGhlciB0cnlpbmcgdG8gcmVkZWZpbmUgdGhlXG4gICAgICAvLyBwcm9wZXJ0eS5cbiAgICAgIGlmIChydWxlICYmIHJ1bGUgIT09IENvbXBvc2FibGUucnVsZXMub3ZlcnJpZGUpIHtcbiAgICAgICAgcnVsZShvYmosIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5cbi8qXG4gKiBDb3B5IHRoZSBnaXZlbiBwcm9wZXJ0aWVzL21ldGhvZHMgdG8gdGhlIHRhcmdldC5cbiAqIFJldHVybiB0aGUgdXBkYXRlZCB0YXJnZXQuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPd25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0LCBpZ25vcmVQcm9wZXJ0eU5hbWVzID0gW10pIHtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGlmIChpZ25vcmVQcm9wZXJ0eU5hbWVzLmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBuYW1lKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuLypcbiAqIFJldHVybiBhIG5ldyBzdWJjbGFzcy9vYmplY3QgdGhhdCBleHRlbmRzIHRoZSBnaXZlbiBiYXNlIGNsYXNzL29iamVjdCB3aXRoXG4gKiB0aGUgbWVtYmVycyBvZiB0aGUgaW5kaWNhdGVkIG1peGluLlxuICovXG5mdW5jdGlvbiBjb21wb3NlKGJhc2UsIG1peGluKSB7XG5cbiAgLy8gU2VlIGlmIHRoZSAqbWl4aW4qIGhhcyBhIGJhc2UgY2xhc3MvcHJvdG90eXBlIG9mIGl0cyBvd24uXG4gIGxldCBtaXhpbklzQ2xhc3MgPSBpc0NsYXNzKG1peGluKTtcbiAgbGV0IG1peGluQmFzZSA9IG1peGluSXNDbGFzcyA/XG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKG1peGluLnByb3RvdHlwZSkuY29uc3RydWN0b3IgOlxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihtaXhpbik7XG4gIGlmIChtaXhpbkJhc2UgJiZcbiAgICAgIG1peGluQmFzZSAhPT0gRnVuY3Rpb24gJiZcbiAgICAgIG1peGluQmFzZSAhPT0gT2JqZWN0ICYmXG4gICAgICBtaXhpbkJhc2UgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAvLyBUaGUgbWl4aW4gaXRzZWxmIGRlcml2ZXMgZnJvbSBhbm90aGVyIGNsYXNzL29iamVjdC5cbiAgICAvLyBSZWN1cnNlLCBhbmQgZXh0ZW5kIHdpdGggdGhlIG1peGluJ3MgYmFzZSBmaXJzdC5cbiAgICBiYXNlID0gY29tcG9zZShiYXNlLCBtaXhpbkJhc2UpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIHRoZSBleHRlbmRlZCBvYmplY3Qgd2UncmUgZ29pbmcgdG8gcmV0dXJuIGFzIGEgcmVzdWx0LlxuICBsZXQgYmFzZUlzQ2xhc3MgPSBpc0NsYXNzKGJhc2UpO1xuICBsZXQgcmVzdWx0ID0gYmFzZUlzQ2xhc3MgP1xuICAgIGNyZWF0ZVN1YmNsYXNzKGJhc2UpIDpcbiAgICBPYmplY3QuY3JlYXRlKGJhc2UpO1xuXG4gIC8vIENoZWNrIHRvIG1ha2Ugc3VyZSB3ZSdyZSBub3QgZXh0ZW5kaW5nIHRoZSBiYXNlIHdpdGggYSBwcm90b3R5cGUgdGhhdCB3YXNcbiAgLy8gYWxyZWFkeSBjb21wb3NlZCBpbnRvIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4uXG4gIGxldCBiYXNlUHJvdG90eXBlID0gYmFzZUlzQ2xhc3MgPyBiYXNlLnByb3RvdHlwZSA6IGJhc2U7XG4gIGxldCBtaXhpblByb3RvdHlwZSA9IG1peGluSXNDbGFzcyA/IG1peGluLnByb3RvdHlwZSA6IG1peGluO1xuICBpZiAob2JqZWN0SGFzUHJvdG90eXBlKGJhc2VQcm90b3R5cGUsIG1peGluUHJvdG90eXBlKVxuICAgICAgfHwgb2JqZWN0SGFzTWl4aW4oYmFzZVByb3RvdHlwZSwgbWl4aW4pKSB7XG4gICAgLy8gU2tpcCB0aGlzIG1peGluLCByZXR1cm4gcmVzdWx0IGFzIGlzLlxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBUaGUgXCJ0YXJnZXRcIiBoZXJlIGlzIHRoZSB0YXJnZXQgb2Ygb3VyIHByb3BlcnR5L21ldGhvZCBjb21wb3NpdGlvbiBydWxlcy5cbiAgbGV0IHRhcmdldDtcbiAgaWYgKGJhc2VJc0NsYXNzICYmIG1peGluSXNDbGFzcykge1xuICAgIC8vIEV4dGVuZGluZyBjbGFzcyB3aXRoIGNsYXNzOiBjb3B5IHN0YXRpYyBtZW1iZXJzLCB0aGVuIHByb3RvdHlwZSBtZW1iZXJzLlxuICAgIGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLCByZXN1bHQsIE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMpO1xuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLnByb3RvdHlwZSwgcmVzdWx0LnByb3RvdHlwZSwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9IGVsc2UgaWYgKCFiYXNlSXNDbGFzcyAmJiBtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgcGxhaW4gb2JqZWN0IHdpdGggY2xhc3M6IGNvcHkgcHJvdG90eXBlIG1ldGhvZHMgdG8gcmVzdWx0LlxuICAgIHRhcmdldCA9IGNvcHlPd25Qcm9wZXJ0aWVzKG1peGluLnByb3RvdHlwZSwgcmVzdWx0LCBOT05fTUlYQUJMRV9GVU5DVElPTl9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIGlmIChiYXNlSXNDbGFzcyAmJiAhbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIGNsYXNzIHdpdGggcGxhaW4gb2JqZWN0OiBjb3B5IG1peGluIHRvIHJlc3VsdCBwcm90b3R5cGUuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdC5wcm90b3R5cGUsIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFeHRlbmRpbmcgcGxhaW4gb2JqZWN0IHdpdGggcGxhaW4gb2JqZWN0OiBjb3B5IGZvcm1lciB0byBsYXR0ZXIuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdCwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9XG5cbiAgaWYgKG1peGluLm5hbWUpIHtcbiAgICAvLyBVc2UgdGhlIG1peGluJ3MgbmFtZSAodXN1YWxseSB0aGUgbmFtZSBvZiBhIGNsYXNzJyBjb25zdHJ1Y3RvcikgdG9cbiAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIGJhY2sgdG8gdGhlIHRpcCBvZiB0aGUgbmV3bHktZXh0ZW5kZWQgcHJvdG90eXBlIGNoYWluLlxuICAgIC8vIFNlZSBub3RlcyBhdCBDb21wb3NhYmxlJ3MgXCJwcm90b3R5cGVzXCIgcHJvcGVydHkuXG4gICAgdGFyZ2V0LnByb3RvdHlwZXMgPSB7fTtcbiAgICB0YXJnZXQucHJvdG90eXBlc1ttaXhpbi5uYW1lXSA9IHRhcmdldDtcblxuICAgIC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyY2xhc3Mvc3VwZXItb2JqZWN0LiBTZWUgdGhlIGNvbW1lbnRzIG9uXG4gICAgLy8gQ29tcG9zYWJsZSdzIFwic3VwZXJcIiBwcm9wZXJ0eS5cbiAgICB0YXJnZXQuc3VwZXIgPSBiYXNlSXNDbGFzcyA/IGJhc2UucHJvdG90eXBlIDogYmFzZTtcbiAgfVxuXG4gIC8vIEtlZXAgdHJhY2sgb2YgdGhlIG1peGluIHRoYXQgd2FzIGNvbXBvc2VkIGluIGF0IHRoaXMgcG9pbnQuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIE9SSUdJTkFMX01JWElOX1NZTUJPTCwge1xuICAgIHZhbHVlOiBtaXhpblxuICB9KTtcblxuICAvLyBBcHBseSB0aGUgY29tcG9zaXRpb24gcnVsZXMgaW4gZWZmZWN0IGF0IHRoZSB0YXJnZXQuXG4gIGFwcGx5Q29tcG9zaXRpb25SdWxlcyh0YXJnZXQpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuLypcbiAqIFJldHVybiBhIG5ldyBzdWJjbGFzcyBvZiB0aGUgZ2l2ZW4gYmFzZSBjbGFzcy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3ViY2xhc3MoYmFzZSkge1xuICAvLyBPbmNlIFdlYktpdCBzdXBwb3J0cyBIVE1MRWxlbWVudCBhcyBhIHJlYWwgY2xhc3MsIHdlIGNhbiBqdXN0IHNheTpcbiAgLy9cbiAgLy8gICBjbGFzcyBzdWJjbGFzcyBleHRlbmRzIGJhc2Uge31cbiAgLy9cbiAgLy8gSG93ZXZlciwgdW50aWwgdGhhdCdzIHJlc29sdmVkLCB3ZSBqdXN0IGNvbnN0cnVjdCB0aGUgY2xhc3Mgb3Vyc2VsdmVzLlxuICBmdW5jdGlvbiBzdWJjbGFzcygpIHt9O1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViY2xhc3MsIGJhc2UpO1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViY2xhc3MucHJvdG90eXBlLCBiYXNlLnByb3RvdHlwZSk7XG4gIHJldHVybiBzdWJjbGFzcztcbn1cblxuXG4vKlxuICogRXhhbWluZSB0aGUgZGVzY3JpcHRvciB0byBkZXRlcm1pbmUgd2hpY2ggcnVsZSBrZXkgYXBwbGllcy5cbiAqL1xuZnVuY3Rpb24gZ2V0R2VuZXJhbERlc2NyaXB0b3JLZXkoZGVzY3JpcHRvcikge1xuICBpZiAodHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBNZXRob2RcbiAgICByZXR1cm4gJ19fbWV0aG9kX18nO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgfHwgdHlwZW9mIGRlc2NyaXB0b3Iuc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gUHJvcGVydHkgd2l0aCBnZXR0ZXIgYW5kL29yIHNldHRlclxuICAgIHJldHVybiAnX19wcm9wZXJ0eV9fJztcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuXG4vKlxuICogUmV0dXJuIHRydWUgaWYgYyBpcyBhIEphdmFTY3JpcHQgY2xhc3MuXG4gKlxuICogV2UgdXNlIHRoaXMgdGVzdCBiZWNhdXNlLCBvbiBXZWJLaXQsIGNsYXNzZXMgbGlrZSBIVE1MRWxlbWVudCBhcmUgc3BlY2lhbCxcbiAqIGFuZCBhcmUgbm90IGluc3RhbmNlcyBvZiBGdW5jdGlvbi4gVG8gaGFuZGxlIHRoYXQgY2FzZSwgd2UgdXNlIGEgbG9vc2VyXG4gKiBkZWZpbml0aW9uOiBhbiBvYmplY3QgaXMgYSBjbGFzcyBpZiBpdCBoYXMgYSBwcm90b3R5cGUsIGFuZCB0aGF0IHByb3RvdHlwZVxuICogaGFzIGEgY29uc3RydWN0b3IgdGhhdCBpcyB0aGUgb3JpZ2luYWwgb2JqZWN0LiBUaGlzIGNvbmRpdGlvbiBob2xkcyB0cnVlIGV2ZW5cbiAqIGZvciBIVE1MRWxlbWVudCBvbiBXZWJLaXQuXG4gKi9cbmZ1bmN0aW9uIGlzQ2xhc3MoYykge1xuICByZXR1cm4gdHlwZW9mIGMgPT09ICdmdW5jdGlvbicgfHwgICAgICAgICAgICAgICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIChjLnByb3RvdHlwZSAmJiBjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PT0gYyk7IC8vIEhUTUxFbGVtZW50IGluIFdlYktpdFxufVxuXG5cbi8qXG4gKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGVpdGhlciBoYXMgdGhlIGdpdmVuIHByb3RvdHlwZSBvbiBpdHNcbiAqIGNoYWluLlxuICovXG5mdW5jdGlvbiBvYmplY3RIYXNQcm90b3R5cGUob2JqLCBwcm90b3R5cGUpIHtcbiAgaWYgKHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgLy8gVGhlIHByb3RvdHlwZSBpcyBhIHBsYWluIG9iamVjdC5cbiAgICAvLyBPbmx5IGNhc2UgdG8gZGVmZW5kIGFnYWluc3QgaXMgc29tZW9uZSB0cnlpbmcgdG8gbWl4aW4gT2JqZWN0IGl0c2VsZi5cbiAgICByZXR1cm4gKHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSk7XG4gIH1cbiAgaWYgKG9iaiA9PT0gcHJvdG90eXBlIHx8IG9iaiBpbnN0YW5jZW9mIHByb3RvdHlwZS5jb25zdHJ1Y3Rvcikge1xuICAgIC8vIFRoZSBwcm90b3R5cGUgd2FzIGZvdW5kIGFsb25nIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ2l2ZW4gbWl4aW4gd2FzIHVzZWQgdG8gY3JlYXRlIGFueSBvZiB0aGUgcHJvdG90eXBlcyBvblxuICogb24gdGhlIG9iamVjdCdzIHByb3RvdHlwZSBjaGFpbi5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0SGFzTWl4aW4ob2JqLCBtaXhpbikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBPUklHSU5BTF9NSVhJTl9TWU1CT0wpO1xuICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlID09PSBtaXhpbikge1xuICAgIC8vIFRoZSBnaXZlbiBtaXhpbiB3YXMsIGluIGZhY3QsIGNvbXBvc2VkIGludG8gdGhpcyBwcm90b3R5cGUgY2hhaW4uXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG9iamVjdEhhc01peGluKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopLCBtaXhpbik7XG59XG4iLCIvKipcbiAqIFN0YW5kYXJkIGNvbXBvc2l0aW9uIHJ1bGVzXG4gKi9cblxuLypcbiAqIFRha2UgdHdvIGZ1bmN0aW9ucyBhbmQgcmV0dXJuIGEgbmV3IGNvbXBvc2VkIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBib3RoLlxuICogVGhlIGNvbXBvc2VkIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIHNlY29uZCBmdW5jdGlvbi5cbiAqIFRoaXMgaXMgbm90IGEgcnVsZSwgYnV0IGEgaGVscGVyIHVzZWQgYnkgcnVsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlRnVuY3Rpb24oZnVuY3Rpb24xLCBmdW5jdGlvbjIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBmdW5jdGlvbjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuXG4vKlxuICogQ29tYmluYXRvciB0aGF0IHNldHMgdGhlIHByb3RvdHlwZSBvZiBhIG1peGluIHByb3BlcnR5IHZhbHVlIHRvIGJlIHRoZVxuICogY29ycmVzcG9uZGluZyB2YWx1ZSBvbiB0aGUgYmFzZS4gVGhpcyBlZmZlY3RpdmVseSBkb2VzIGEgc2hhbGxvdyBtZXJnZSBvZlxuICogb2YgdGhlIHByb3BlcnRpZXMsIHdpdGhvdXQgY29weWluZyBhbnkgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGFpblByb3RvdHlwZXModGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluVmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwga2V5KTtcbiAgbGV0IGJhc2VWYWx1ZSA9IGJhc2VEZXNjcmlwdG9yLnZhbHVlO1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobWl4aW5WYWx1ZSwgYmFzZVZhbHVlKTtcbn1cblxuXG4vKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNvbXBsZXRlIGEgcHJvcGVydHkgZGVmaW5pdGlvbiBmb3IgYSBtaXhpbi5cbiAqXG4gKiBEZWZhdWx0IEphdmFTY3JpcHQgYmVoYXZpb3IgaXMgdGhhdCBhIHN1YmNsYXNzIHRoYXQgZGVmaW5lcyBhIGdldHRlciBidXQgbm90XG4gKiBhIHNldHRlciB3aWxsIG5ldmVyIGhhdmUgdGhlIGJhc2UgY2xhc3MnIHNldHRlciBpbnZva2VkLiBTaW1pbGFybHksIGFcbiAqIHN1YmNsYXNzIHRoYXQgZGVmaW5lcyBhIHNldHRlciBidXQgbm90IGEgZ2V0dGVyIHdpbGwgbmV2ZXIgaGF2ZSB0aGUgYmFzZVxuICogY2xhc3MnIGdldHRlciBpbnZva2VkLlxuICpcbiAqIEZvciBtaXhpbnMsIHdlIHdhbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IgdG8gYmUgdGhhdCwgaWYgYSBtaXhpbiBvbmx5IGRlZmluZXNcbiAqIGEgZ2V0dGVyLCBidXQgdGhlIGJhc2UgY2xhc3MgZGVmaW5lcyBhIHNldHRlciwgd2Ugd2FudCB0aGUgbWl4aW4gdG8gYWNxdWlyZVxuICogYSBkZWZhdWx0IHNldHRlciB0aGFuIGludm9rZXMgdGhlIGJhc2Ugc2V0dGVyLiBMaWtld2lzZSwgd2Ugd2FudCB0byBkZWZpbmVcbiAqIGEgZGVmYXVsdCBnZXR0ZXIgaWYgbm9uZSBpcyBzdXBwbGllZC5cbiAqXG4gKiBUbyBjYXJyeSB0aGF0IG91dCwgdGhpcyBoZWxwZXIgZnVuY3Rpb24gcm91bmRzIG91dCBhIHByb3BlcnR5IGRlZmluaXRpb24gdG9cbiAqIGVuc3VyZSBpdCBoYXMgYSBkZWZhdWx0IGdldHRlciBvciBzZXR0ZXIgaWYgaXQgbmVlZHMgb25lLlxuICovXG5mdW5jdGlvbiBjb21wbGV0ZVByb3BlcnR5RGVmaW5pdGlvbihkZXNjcmlwdG9yLCBiYXNlRGVzY3JpcHRvcikge1xuICBpZiAoZGVzY3JpcHRvci5nZXQgJiYgIWRlc2NyaXB0b3Iuc2V0ICYmIGJhc2VEZXNjcmlwdG9yLnNldCkge1xuICAgIC8vIE1peGluIGhhcyBnZXR0ZXIgYnV0IG5lZWRzIGEgZGVmYXVsdCBzZXR0ZXIuXG4gICAgbGV0IGJhc2VTZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5zZXQ7XG4gICAgZGVzY3JpcHRvci5zZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYmFzZVNldHRlci5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB9O1xuICB9XG4gIGlmIChkZXNjcmlwdG9yLnNldCAmJiAhZGVzY3JpcHRvci5nZXQgJiYgYmFzZURlc2NyaXB0b3IuZ2V0KSB7XG4gICAgLy8gTWl4aW4gaGFzIHNldHRlciBidXQgbmVlZHMgYSBkZWZhdWx0IGdldHRlci5cbiAgICBsZXQgYmFzZUdldHRlciA9IGJhc2VEZXNjcmlwdG9yLmdldDtcbiAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJhc2VHZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuICB9XG59XG5cblxuLypcbiAqIFBlcmZvcm0gYSBkZWVwIG1lcmdlIG9mIGEgbWl4aW4gcHJvcGVydHkgb24gdG9wIG9mIGEgYmFzZSBwcm9wZXJ0eS5cbiAqL1xuLy8gZXhwb3J0IGZ1bmN0aW9uIGRlZXBNZXJnZSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuLy8gICBsZXQgbWl4aW5WYWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4vLyAgIGxldCBiYXNlVmFsdWUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KVtrZXldLnZhbHVlO1xuLy8gICBkZXNjcmlwdG9yLnZhbHVlID0gJ21lcmdlZCc7IC8vIG1lcmdlKGJhc2VWYWx1ZSwgbWl4aW5WYWx1ZSk7XG4vLyB9XG5cbi8qXG4gKiBIZWxwZXIgdG8gcmV0dXJuIHRoZSBiYXNlIGRlc2NyaXB0b3IgZm9yIHRoZSBpbmRpY2F0ZWQga2V5LiBUaGlzIGlzIHVzZWQgdG9cbiAqIGZpbmQgdGhlIHNwZWNpZmljIGltcGxlbWVudGF0aW9uIHRoYXQgd291bGQgb3RoZXJ3aXNlIGJlIG92ZXJyaWRkZW4gYnkgdGhlXG4gKiBtaXhpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KSB7XG4gIGxldCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gIHJldHVybiBnZXRQcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwga2V5KTtcbn1cblxuXG4vKlxuICogTGlrZSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKCksIGJ1dCB3YWxrcyB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICogVGhpcyBpcyBuZWVkZWQgYnkgY29tcG9zaXRpb24gcnVsZXMsIHdoaWNoIHVzdWFsbHkgc3RhcnQgb3V0IGJ5IGdldHRpbmdcbiAqIHRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGEgbWVtYmVyIHRoZXkncmUgY29tcG9zaW5nLlxuICogVGhpcyBpcyBub3QgYSBydWxlLCBidXQgYSBoZWxwZXIgdXNlZCBieSBydWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpIHtcbiAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSk7XG4gIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIC8vIENoZWNraW5nIGZvciBcIm5hbWUgaW4gcHJvdG90eXBlXCIgbGV0cyB1cyBrbm93IHdoZXRoZXIgd2Ugc2hvdWxkIGJvdGhlclxuICAgIC8vIHdhbGtpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICBpZiAocHJvdG90eXBlICYmIG5hbWUgaW4gcHJvdG90eXBlKSB7XG4gICAgICByZXR1cm4gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgbmFtZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7IC8vIE5vdCBmb3VuZFxufVxuXG5cbi8qXG4gKiBDb21iaW5hdG9yIHRoYXQgY2F1c2VzIGEgbWl4aW4gbWV0aG9kIHRvIG92ZXJyaWRlIGl0cyBiYXNlIGltcGxlbWVudGF0aW9uLlxuICogU2luY2UgdGhpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgcHJvdG90eXBlIGNoYWluLCB0aGlzIGlzIGEgbm8tb3AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvdmVycmlkZSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge31cblxuXG4vKlxuICogQ29tcG9zZSBtZXRob2RzLCBpbnZva2luZyBiYXNlIGltcGxlbWVudGF0aW9uIGZpcnN0LiBJZiBpdCByZXR1cm5zIGFcbiAqIHRydXRoeSByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQgaW1tZWRpYXRlbHkuIE90aGVyd2lzZSwgdGhlIG1peGluXG4gKiBpbXBsZW1lbnRhdGlvbidzIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZlckJhc2VSZXN1bHQodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluSW1wbGVtZW50YXRpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlSW1wbGVtZW50YXRpb24gPSBiYXNlRGVzY3JpcHRvci52YWx1ZTtcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBiYXNlSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICB8fCBtaXhpbkltcGxlbWVudGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cblxuLypcbiAqIExpa2UgcHJlZmVyQmFzZVJlc3VsdCwgYnV0IGZvciBnZXR0ZXIvc2V0dGVycy4gVGhlIGJhc2UgZ2V0dGVyIGlzIGludm9rZWRcbiAqIGZpcnN0LiBJZiBpdCByZXR1cm5zIGEgdHJ1dGh5IHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlLCB0aGUgbWl4aW5cbiAqIGdldHRlcidzIHJlc3VsdCBpcyByZXR1cm5lZC4gU2V0dGVyIGlzIGludm9rZWQgYmFzZSBmaXJzdCwgdGhlbiBtaXhpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZlckJhc2VHZXR0ZXIodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluR2V0dGVyID0gZGVzY3JpcHRvci5nZXQ7XG4gIGxldCBtaXhpblNldHRlciA9IGRlc2NyaXB0b3Iuc2V0O1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlR2V0dGVyID0gYmFzZURlc2NyaXB0b3IuZ2V0O1xuICBsZXQgYmFzZVNldHRlciA9IGJhc2VEZXNjcmlwdG9yLnNldDtcbiAgaWYgKG1peGluR2V0dGVyICYmIGJhc2VHZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIGdldHRlcnMuXG4gICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBiYXNlR2V0dGVyLmFwcGx5KHRoaXMpIHx8IG1peGluR2V0dGVyLmFwcGx5KHRoaXMpO1xuICAgIH07XG4gIH1cbiAgaWYgKG1peGluU2V0dGVyICYmIGJhc2VTZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIHNldHRlcnMuXG4gICAgZGVzY3JpcHRvci5zZXQgPSBjb21wb3NlRnVuY3Rpb24oYmFzZVNldHRlciwgbWl4aW5TZXR0ZXIpO1xuICB9XG4gIGNvbXBsZXRlUHJvcGVydHlEZWZpbml0aW9uKGRlc2NyaXB0b3IsIGJhc2VEZXNjcmlwdG9yKTtcbn1cblxuXG4vKlxuICogTGlrZSBwcmVmZXJNaXhpblJlc3VsdCwgYnV0IGZvciBnZXR0ZXIvc2V0dGVycy4gVGhlIG1peGluIGdldHRlciBpcyBpbnZva2VkXG4gKiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhIHRydXRoeSByZXN1bHQsIHRoYXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgdGhlIGJhc2VcbiAqIGdldHRlcidzIHJlc3VsdCBpcyByZXR1cm5lZC4gU2V0dGVyIGlzIHN0aWxsIGludm9rZWQgYmFzZSBmaXJzdCwgdGhlbiBtaXhpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZlck1peGluR2V0dGVyKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkdldHRlciA9IGRlc2NyaXB0b3IuZ2V0O1xuICBsZXQgbWl4aW5TZXR0ZXIgPSBkZXNjcmlwdG9yLnNldDtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUdldHRlciA9IGJhc2VEZXNjcmlwdG9yLmdldDtcbiAgbGV0IGJhc2VTZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5zZXQ7XG4gIGlmIChtaXhpbkdldHRlciAmJiBiYXNlR2V0dGVyKSB7XG4gICAgLy8gQ29tcG9zZSBnZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbWl4aW5HZXR0ZXIuYXBwbHkodGhpcykgfHwgYmFzZUdldHRlci5hcHBseSh0aGlzKTtcbiAgICB9O1xuICB9XG4gIGlmIChtaXhpblNldHRlciAmJiBiYXNlU2V0dGVyKSB7XG4gICAgLy8gQ29tcG9zZSBzZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gY29tcG9zZUZ1bmN0aW9uKGJhc2VTZXR0ZXIsIG1peGluU2V0dGVyKTtcbiAgfVxuICBjb21wbGV0ZVByb3BlcnR5RGVmaW5pdGlvbihkZXNjcmlwdG9yLCBiYXNlRGVzY3JpcHRvcik7XG59XG5cblxuLypcbiAqIENvbXBvc2UgbWV0aG9kcywgaW52b2tpbmcgbWl4aW4gaW1wbGVtZW50YXRpb24gZmlyc3QuIElmIGl0IHJldHVybnMgYSB0cnV0aHlcbiAqIHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZCBpbW1lZGlhdGVseS4gT3RoZXJ3aXNlLCB0aGUgYmFzZSBpbXBsZW1lbnRhdGlvbidzXG4gKiByZXN1bHQgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmZXJNaXhpblJlc3VsdCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5JbXBsZW1lbnRhdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IGJhc2VEZXNjcmlwdG9yLnZhbHVlO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1peGluSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICB8fCBiYXNlSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5cbi8qXG4gKiBEZWZhdWx0IHJ1bGUgZm9yIGNvbXBvc2luZyBtZXRob2RzOiBpbnZva2UgYmFzZSBmaXJzdCwgdGhlbiBtaXhpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJhc2VNZXRob2RGaXJzdCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5JbXBsZW1lbnRhdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IGJhc2VEZXNjcmlwdG9yLnZhbHVlO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gY29tcG9zZUZ1bmN0aW9uKGJhc2VJbXBsZW1lbnRhdGlvbiwgbWl4aW5JbXBsZW1lbnRhdGlvbik7XG59XG5cblxuLypcbiAqIERlZmF1bHQgcnVsZSBmb3IgY29tcG9zaW5nIHByb3BlcnRpZXMuXG4gKiBXZSBvbmx5IGNvbXBvc2Ugc2V0dGVycywgd2hpY2ggaW52b2tlIGJhc2UgZmlyc3QsIHRoZW4gbWl4aW4uXG4gKiBBIGRlZmluZWQgbWl4aW4gZ2V0dGVyIG92ZXJyaWRlcyBhIGJhc2UgZ2V0dGVyLlxuICogTm90ZSB0aGF0LCBiZWNhdXNlIG9mIHRoZSB3YXkgcHJvcGVydHkgZGVzY3JpcHRvcnMgd29yaywgaWYgdGhlIG1peGluIG9ubHlcbiAqIGRlZmluZXMgYSBzZXR0ZXIsIGJ1dCBub3QgYSBnZXR0ZXIsIHdlIGhhdmUgdG8gc3VwcGx5IGEgZGVmYXVsdCBnZXR0ZXIgdGhhdFxuICogaW52b2tlcyB0aGUgYmFzZSBnZXR0ZXIuIFNpbWlsYXJseSwgaWYgdGhlIG1peGluIGp1c3QgZGVmaW5lcyBhIGdldHRlcixcbiAqIHdlIGhhdmUgdG8gc3VwcGx5IGEgZGVmYXVsdCBzZXR0ZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYXNlU2V0dGVyRmlyc3QodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluU2V0dGVyID0gZGVzY3JpcHRvci5zZXQ7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VTZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5zZXQ7XG4gIGlmIChtaXhpblNldHRlciAmJiBiYXNlU2V0dGVyKSB7XG4gICAgLy8gQ29tcG9zZSBzZXR0ZXJzLlxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gY29tcG9zZUZ1bmN0aW9uKGJhc2VTZXR0ZXIsIG1peGluU2V0dGVyKTtcbiAgfVxuICBjb21wbGV0ZVByb3BlcnR5RGVmaW5pdGlvbihkZXNjcmlwdG9yLCBiYXNlRGVzY3JpcHRvcik7XG59XG4iLCIvKlxuICogTWFyc2hhbGwgYXR0cmlidXRlcyB0byBwcm9wZXJ0aWVzIChhbmQgZXZlbnR1YWxseSB2aWNlIHZlcnNhKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyaWJ1dGVNYXJzaGFsbGluZyB7XG5cbiAgLypcbiAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAvLyBJZiB0aGUgYXR0cmlidXRlIG5hbWUgY29ycmVzcG9uZHMgdG8gYSBwcm9wZXJ0eSBuYW1lLCB0aGVuIHNldCB0aGF0XG4gICAgLy8gcHJvcGVydHkuIElnbm9yZSBjaGFuZ2VzIGluIHN0YW5kYXJkIEhUTUxFbGVtZW50IHByb3BlcnRpZXMuXG4gICAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZVRvUHJvcGVydHlOYW1lKG5hbWUpO1xuICAgIGlmIChwcm9wZXJ0eU5hbWUgaW4gdGhpcyAmJiAhKHByb3BlcnR5TmFtZSBpbiBIVE1MRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuYXR0cmlidXRlcywgYXR0cmlidXRlID0+IHtcbiAgICAgIHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJpYnV0ZS5uYW1lLCB1bmRlZmluZWQsIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5cbi8vIENvbnZlcnQgY2FtZWwgY2FzZSBmb29CYXIgbmFtZSB0byBoeXBoZW5hdGVkIGZvby1iYXIuXG5mdW5jdGlvbiBhdHRyaWJ1dGVUb1Byb3BlcnR5TmFtZShhdHRyaWJ1dGVOYW1lKSB7XG4gIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVOYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIG0gPT4gbVsxXS50b1VwcGVyQ2FzZSgpKTtcbiAgcmV0dXJuIHByb3BlcnR5TmFtZTtcbn1cblxuLy8gQ29udmVydCBoeXBoZW5hdGVkIGZvby1iYXIgbmFtZSB0byBjYW1lbCBjYXNlIGZvb0Jhci5cbmZ1bmN0aW9uIHByb3BlcnR5VG9BdHRyaWJ1dGVOYW1lKHByb3BlcnR5TmFtZSkge1xuICBsZXQgYXR0cmlidXRlTmFtZSA9IHByb3BlcnR5TmFtZS5yZXBsYWNlKC8oW2Etel1bQS1aXSkvZywgZyA9PiBnWzBdICsgJy0nICsgZ1sxXS50b0xvd2VyQ2FzZSgpKTtcbiAgcmV0dXJuIGF0dHJpYnV0ZU5hbWU7XG59XG4iLCIvKlxuICogUG9seW1lci1zdHlsZSBhdXRvbWF0aWMgbm9kZSBmaW5kaW5nLlxuICogU2VlIGh0dHBzOi8vd3d3LnBvbHltZXItcHJvamVjdC5vcmcvMS4wL2RvY3MvZGV2Z3VpZGUvbG9jYWwtZG9tLmh0bWwjbm9kZS1maW5kaW5nLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9tYXRpY05vZGVGaW5kaW5nIHtcblxuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMuc2hhZG93Um9vdCkge1xuICAgICAgdGhpcy4kID0ge307XG4gICAgICB2YXIgbm9kZXNXaXRoSWRzID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF0nKTtcbiAgICAgIFtdLmZvckVhY2guY2FsbChub2Rlc1dpdGhJZHMsIG5vZGUgPT4ge1xuICAgICAgICB2YXIgaWQgPSBub2RlLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgdGhpcy4kW2lkXSA9IG5vZGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIiwiLypcbiAqIEEgY29tcG9zYWJsZSBIVE1MIGVsZW1lbnQuXG4gKlxuICogVGhpcyBjbGFzcyBpcyBwcm92aWRlZCBqdXN0IGFzIGEgY29udmVuaWVuY2UuIE9uZSBjb3VsZCBhbHNvIHN0YXJ0IHdpdGhcbiAqIEhUTUxFbGVtZW50IGF0IHRoZSB0b3AgbGV2ZWwsIGFuZCBhZGQgZXh0ZW5zaWJpbGl0eSBieSBtaXhpbmcgaW4gQ29tcG9zYWJsZS5cbiAqL1xuXG5pbXBvcnQgQ29tcG9zYWJsZSBmcm9tICdDb21wb3NhYmxlL3NyYy9Db21wb3NhYmxlJztcblxuLy8gV2UgdXNlIEV4dGVuc2libGUgdG8gYWRkIGl0cyBvd24gbWVtYmVycyB0byBhIEhUTUxFbGVtZW50IHN1YmNsYXNzLlxuLy8gVGhlIHJlc3VsdCBpcyBhbiBIVE1MRWxlbWVudCB3aXRoIC5leHRlbmQoKSBhbmQgc3VwZXIoKSBzdXBwb3J0LlxubGV0IENvbXBvc2FibGVFbGVtZW50ID0gQ29tcG9zYWJsZS5jb21wb3NlLmNhbGwoSFRNTEVsZW1lbnQsIENvbXBvc2FibGUpO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wb3NhYmxlRWxlbWVudDtcbiIsIi8qXG4gKiBBIHNhbXBsZSBnZW5lcmFsLXB1cnBvc2UgYmFzZSBjbGFzcyBmb3IgZGVmaW5pbmcgY3VzdG9tIGVsZW1lbnRzIHRoYXQgbWl4ZXNcbiAqIGluIHNvbWUgY29tbW9uIGZlYXR1cmVzOiB0ZW1wbGF0ZSBzdGFtcGluZyBpbnRvIGEgc2hhZG93IHJvb3QsIGF1dG9tYXRpYyBub2RlXG4gKiBmaW5kaW5nLCBhbmQgbWFyc2hhbGxpbmcgYmV0d2VlbiBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0aWVzLlxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlRWxlbWVudCBmcm9tICcuL0NvbXBvc2FibGVFbGVtZW50JztcbmltcG9ydCBUZW1wbGF0ZVN0YW1waW5nIGZyb20gJy4vVGVtcGxhdGVTdGFtcGluZyc7XG5pbXBvcnQgQXV0b21hdGljTm9kZUZpbmRpbmcgZnJvbSAnLi9BdXRvbWF0aWNOb2RlRmluZGluZyc7XG5pbXBvcnQgQXR0cmlidXRlTWFyc2hhbGxpbmcgZnJvbSAnLi9BdHRyaWJ1dGVNYXJzaGFsbGluZyc7XG5cbmNsYXNzIEVsZW1lbnRCYXNlIGV4dGVuZHMgQ29tcG9zYWJsZUVsZW1lbnQge1xuXG4gIC8qIEZvciBkZWJ1Z2dpbmcgKi9cbiAgbG9nKHRleHQpIHtcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmxvY2FsTmFtZX06ICR7dGV4dH1gKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVsZW1lbnRCYXNlID0gRWxlbWVudEJhc2UuY29tcG9zZShcbiAgVGVtcGxhdGVTdGFtcGluZywgLy8gYmVmb3JlIG5vZGUgZmluZGluZywgc28gc2hhZG93IHJvb3QgaXMgcG9wdWxhdGVkXG4gIEF1dG9tYXRpY05vZGVGaW5kaW5nLCAvLyBiZWZvcmUgbWFyc2hhbGxpbmcsIHNvIG1hcnNoYWxsZWQgcHJvcGVydGllcyBjYW4gdXNlIGl0XG4gIEF0dHJpYnV0ZU1hcnNoYWxsaW5nXG4pO1xuXG5kb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2VsZW1lbnQtYmFzZScsIEVsZW1lbnRCYXNlKTtcbiIsIi8qXG4gKiBFbGVtZW50IGV4dGVuc2lvbiBmb3IgdGVtcGxhdGUgc3RhbXBpbmcuIElmIGEgY29tcG9uZW50IGRlZmluZXMgYSB0ZW1wbGF0ZVxuICogcHJvcGVydHkgKGFzIGEgc3RyaW5nIG9yIHJlZmVyZW5jaW5nIGEgSFRNTCB0ZW1wbGF0ZSksIHdoZW4gdGhlIGNvbXBvbmVudFxuICogY2xhc3MgaXMgaW5zdGFudGlhdGVkLCBhIHNoYWRvdyByb290IHdpbGwgYmUgY3JlYXRlZCBvbiB0aGUgaW5zdGFuY2UsIGFuZFxuICogdGhlIGNvbnRlbnRzIG9mIHRoZSB0ZW1wbGF0ZSB3aWxsIGJlIGNsb25lZCBpbnRvIHRoZSBzaGFkb3cgcm9vdC5cbiAqXG4gKiBGb3IgdGhlIHRpbWUgYmVpbmcsIHRoaXMgZXh0ZW5zaW9uIHJldGFpbnMgc3VwcG9ydCBmb3IgU2hhZG93IERPTSB2MC5cbiAqIFRoYXQgd2lsbCBldmVudHVhbGx5IGJlIGRlcHJlY2F0ZWQgYXMgYnJvd3NlcnMgaW1wbGVtZW50IFNoYWRvdyBET00gdjEuXG4gKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZVN0YW1waW5nIHtcblxuICAvKlxuICAgKiBJZiB0aGUgY29tcG9uZW50IGRlZmluZXMgYSB0ZW1wbGF0ZSwgYSBzaGFkb3cgcm9vdCB3aWxsIGJlIGNyZWF0ZWQgb24gdGhlXG4gICAqIGNvbXBvbmVudCBpbnN0YW5jZSwgYW5kIHRoZSB0ZW1wbGF0ZSBzdGFtcGVkIGludG8gaXQuXG4gICAqL1xuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gVXBncmFkZSBwbGFpbiBzdHJpbmcgdG8gcmVhbCB0ZW1wbGF0ZS5cbiAgICAgIHRlbXBsYXRlID0gY3JlYXRlVGVtcGxhdGVXaXRoSW5uZXJIVE1MKHRlbXBsYXRlKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlICYmIFVTSU5HX1NIQURPV19ET01fVjApIHtcbiAgICAgIHBvbHlmaWxsU2xvdFdpdGhDb250ZW50KHRlbXBsYXRlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TaGFkb3dET01Qb2x5ZmlsbCkge1xuICAgICAgc2hpbVRlbXBsYXRlU3R5bGVzKHRlbXBsYXRlLCB0aGlzLmxvY2FsTmFtZSk7XG4gICAgfVxuICAgIC8vIFRPRE86IFNhdmUgdGhlIHByb2Nlc3NlZCB0ZW1wbGF0ZSB3aXRoIHRoZSBjb21wb25lbnQncyBjbGFzcyBwcm90b3R5cGVcbiAgICAvLyBzbyBpdCBkb2Vzbid0IG5lZWQgdG8gYmUgcHJvY2Vzc2VkIHdpdGggZXZlcnkgaW5zdGFudGlhdGlvbi5cbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIC8vIHRoaXMubG9nKFwiY2xvbmluZyB0ZW1wbGF0ZSBpbnRvIHNoYWRvdyByb290XCIpO1xuICAgICAgbGV0IHJvb3QgPSBVU0lOR19TSEFET1dfRE9NX1YwID9cbiAgICAgICAgdGhpcy5jcmVhdGVTaGFkb3dSb290KCkgOiAgICAgICAgICAgICAvLyBTaGFkb3cgRE9NIHYwXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pOyAgLy8gU2hhZG93IERPTSB2MVxuICAgICAgbGV0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKTtcbiAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgIH1cbiAgfVxuXG59XG5cblxuLy8gRmVhdHVyZSBkZXRlY3Rpb24gZm9yIG9sZCBTaGFkb3cgRE9NIHYwLlxuY29uc3QgVVNJTkdfU0hBRE9XX0RPTV9WMCA9ICh0eXBlb2YgSFRNTEVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZVNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnKTtcblxuXG4vLyBDb252ZXJ0IGEgcGxhaW4gc3RyaW5nIG9mIEhUTUwgaW50byBhIHJlYWwgdGVtcGxhdGUgZWxlbWVudC5cbmZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlV2l0aElubmVySFRNTChpbm5lckhUTUwpIHtcbiAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgLy8gUkVWSUVXOiBJcyB0aGVyZSBhbiBlYXNpZXIgd2F5IHRvIGRvIHRoaXM/XG4gIC8vIFdlJ2QgbGlrZSB0byBqdXN0IHNldCBpbm5lckhUTUwgb24gdGhlIHRlbXBsYXRlIGNvbnRlbnQsIGJ1dCBzaW5jZSBpdCdzXG4gIC8vIGEgRG9jdW1lbnRGcmFnbWVudCwgdGhhdCBkb2Vzbid0IHdvcmsuXG4gIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgd2hpbGUgKGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICB0ZW1wbGF0ZS5jb250ZW50LmFwcGVuZENoaWxkKGRpdi5jaGlsZE5vZGVzWzBdKTtcbiAgfVxuICByZXR1cm4gdGVtcGxhdGU7XG59XG5cbi8vIFJlcGxhY2Ugb2NjdXJlbmNlcyBvZiB2MSBzbG90IGVsZW1lbnRzIHdpdGggdjAgY29udGVudCBlbGVtZW50cy5cbi8vIFRoaXMgZG9lcyBub3QgeWV0IG1hcCBuYW1lZCBzbG90cyB0byBjb250ZW50IHNlbGVjdCBjbGF1c2VzLlxuZnVuY3Rpb24gcG9seWZpbGxTbG90V2l0aENvbnRlbnQodGVtcGxhdGUpIHtcbiAgW10uZm9yRWFjaC5jYWxsKHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc2xvdCcpLCBzbG90RWxlbWVudCA9PiB7XG4gICAgbGV0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpO1xuICAgIHNsb3RFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbnRlbnRFbGVtZW50LCBzbG90RWxlbWVudCk7XG4gIH0pO1xufVxuXG4vLyBJbnZva2UgYmFzaWMgc3R5bGUgc2hpbW1pbmcgd2l0aCBTaGFkb3dDU1MuXG5mdW5jdGlvbiBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRhZykge1xuICBXZWJDb21wb25lbnRzLlNoYWRvd0NTUy5zaGltU3R5bGluZyh0ZW1wbGF0ZS5jb250ZW50LCB0YWcpO1xufVxuIl19
