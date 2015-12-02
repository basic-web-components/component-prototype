export default class TargetSelection {

  attachedCallback() {
    // // Apply any selection made before assimilation.
    // if (this._prematureSelectedIndex
    //     && 'selectedIndex' in this && this.selectedIndex === -1) {
    //   this.selectedIndex = this._prematureSelectedIndex;
    //   this._prematureSelectedIndex = null;
    // }
  }

  indexOfItem(item) {
    let target = this.target;
    let index = target && target.indexOfItem(item);
    return index || -1;
  }

  get items() {
    let target = this.target;
    return target && target.items;
  }

  /**
   * The index of the item which is currently selected, or -1 if there is no
   * selection.
   *
   * @property selectedIndex
   * @type Number
   */
  get selectedIndex() {
    let target = this.target;
    return target && target.selectedIndex;
  }
  set selectedIndex(index) {
    // if ('selectedIndex' in this {
    //   this.selectedIndex = index;
    // } else {
    //   // Selection is being made before the collective supports it.
    //   this._prematureSelectedIndex = index;
    // }
    let target = this.target;
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
  get selectedItem() {
    let target = this.target;
    return target && target.selectedItem;
  }
  set selectedItem(item) {
    let target = this.target;
    if (target) {
      target.selectedItem = item;
    }
  }

  set target(element) {
    if (this._itemsChangedListener) {
      this.removeEventListener('items-changed', this._itemsChangedListener);
    }
    if (this._selectedItemChangedListener) {
      this.removeEventListener('selected-item-changed', this._selectedItemChangedListener);
    }
    this._itemsChangedListener = element.addEventListener('items-changed', event => {
      this.itemsChanged();
    });
    this._selectedItemChangedListener = element.addEventListener('selected-item-changed', event => {
      // Let the component know the target's selection changed, but without
      // re-invoking the selectIndex/selectedItem setter.
      this.selectedItemChanged();
    });
    // Force initial refresh.
    this.itemsChanged();
  }

}
