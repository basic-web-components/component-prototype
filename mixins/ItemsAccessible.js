/**
 * Aspect which adds ARIA roles for lists and list items.
 *
 * @class ItemsAccessible
 */

// Used to assign unique IDs to item elements without IDs.
let idCount = 0;

export default class ItemsAccessible {

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
    this.setAttribute('role', 'listbox');

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
    var elementId = this.getAttribute( "id" );
    this.itemBaseId = elementId ?
        "_" + elementId + "Option" :
        "_option";
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
      this.removeAttribute('aria-activedescendant');
    }
  }

}
