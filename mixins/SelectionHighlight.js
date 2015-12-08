/**
 * Aspect which applies standard highlight colors to a selected item.
 *
 * @class SelectionHighlight
 */

export default class SelectionHighlight {

  applySelection(item, selected) {
    item.style.backgroundColor = selected ? 'highlight' : '';
    item.style.color = selected ? 'highlighttext' : '';
  }

}
