/**
 * Mixin that maps content semantics (children) to list item semantics.
 *
 * Items different from children in several ways:
 *
 * * They can be referenced via index.
 * * Auxiliary invisible child elements are filtered out and not counted as
 *   items. Auxiliary elements include link, script, style, and template
 *   elements.
 *
 * @class ContentItems
 */

export default (base) => class ContentItems extends base {

  applySelection(item, selected) {
    if (super.applySelection) { super.applySelection(item, selected); }
    item.classList.toggle('selected', selected);
  }

  contentChanged() {
    if (super.contentChanged) { super.contentChanged(); }
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
    if (super.indexOfItem) { super.indexOfItem(item); }
    return this.items.indexOf(item);
  }

  // Default implementation does nothing.
  itemAdded(item) {
    if (super.itemAdded) { super.itemAdded(item); }
  }

  itemsChanged() {
    if (super.itemsChanged) { super.itemsChanged(); }

    // Perform per-item initialization.
    this.items.forEach(item => {
      if (!item._itemInitialized) {
        this.itemAdded(item);
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
  get items() {
    if (this._items == null) {
      this._items = filterAuxiliaryElements(this.content);
    }
    return this._items;
  }

};


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
