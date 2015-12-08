/**
 * Mixin which manages the keyboard focus and keydown handling for a component.
 *
 * TODO: Document collective behavior.
 * TODO: Provide baseline behavior outside of a collective.
 *
 * @class Keyboard
 */

export default class Keyboard {

  // Default keydown handler. This will typically be handled by other mixins.
  keydown(event) {}

  /*
   * If we're now the outermost element, of the collective, set up to receive
   * keyboard events. If we're no longer the outermost element, stop listening.
   */
  // TODO: Do we need to start/stop listening when attached/detached, or is
  // that handled automatically?
  collectiveChanged() {
    if (this.collective.outermostElement === this) {
      if (!listeningToKeydown(this)) {
        startListeningToKeydown(this);
      }
    } else {
      if (listeningToKeydown(this)) {
        stopListeningToKeydown(this);
      }
    }
  }

}


function keydown(event) {

  // Give collective elements a shot at the event, working from innermost to
  // outermost (this element).
  let handled;
  let elements = this.collective.elements;
  for (let i = elements.length - 1; i >= 0; i--) {
    let element = elements[i];
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


function listeningToKeydown(element) {
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
  element.log("stopListeningToKeydown");
  element.removeEventListener('keydown', element._keydownListener);
  element._keydownListener = null;
  element.removeAttribute('tabIndex');
}
