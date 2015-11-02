/**
 * Aspect that lets a component collective DOM content as list items.
 *
 * Auxiliary elements which are not normally visible are filtered out. For now,
 * For now, these are: link, script, style, and template.
 *
 * @element basic-content-items
 */

export default class ContentItems {

  applySelection(item, selected) {
    let base = this.ContentItems.super.applySelection;
    if (base) {
      base.call(this, item, selected);
    }
    item.classList.toggle('selected', selected);
  }

  // contentChanged: function() {
  //   this._items = null;
  //   this.collective.itemsChanged();
  // }

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
    let base = this.ContentItems.super.itemAdded;
    if (base) {
      base.call(this, item);
    }
  }

  // itemsChanged() {
  //   // Perform per-item initialization.
  //   this.collective.items.forEach(function(item) {
  //     if (!item._itemInitialized) {
  //       // BUG: If an aspect is assimilated after ContentItems, then all the
  //       // items are already initialized, and the new aspect won't have an
  //       // opportunity to do its own per-item initialization in itemAdded.
  //       this.collective.itemAdded(item);
  //       item._itemInitialized = true;
  //     }
  //   }.bind(this));
  //
  //   let outermost = this.collective.outermostAttached;
  //   if (outermost) {
  //     let event = new CustomEvent('items-changed', {
  //       bubbles: true
  //     });
  //     outermost.dispatchEvent(event);
  //   }
  // }

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


// Return the given elements, filtering out auxiliary elements that aren't
// typically visible. Items which are not elements are returned as is.
function filterAuxiliaryElements(items) {
  let auxiliaryTags = [
    'link',
    'script',
    'style',
    'template'
  ];
  return [].filter.call(items, function(item) {
    return !item.localName || auxiliaryTags.indexOf(item.localName) < 0;
  });
}


/**
 * Fires when the items in the list change.
 *
 * @event items-changed
 */
