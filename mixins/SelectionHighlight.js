/**
 * Aspect which applies standard highlight colors to a selected item.
 *
 * @element basic-selection-highlight
 */

export default class SelectionHighlight {

  applySelection(item, selected) {
    let base = this.SelectionHighlight.applySelection.super;
    if (base) {
      base.call(this, item, selected);
    }
    item.style.backgroundColor = selected ? 'highlight' : '';
    item.style.color = selected ? 'highlighttext' : '';
  }

}
