/**
 * Aspect which manages the keyboard focus and keydown handling for a component.
 *
 * This aspect ensures that its only the outermost aspect in a collective that is
 * listening for keyboard events.
 *
 * @element basic-keyboard
 */

export default class Keyboard {

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

      if (this.tabIndex < 0) {
        // Someone else is managing the keyboard event for us.
        return;
      }

      // Give target first shot at the event.
      let handled = this.target && this.target.keydown(event);

      // If target doesn't exist, or it didn't handle the event, try ourselves.
      handled = handled || this.keydown(event);

      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }

    });
    this.setAttribute('tabIndex', 0);
  }

  // Default keydown handler. This will typically be handled by other mixins.
  keydown(event) {}

  /*
   * If this component has a target element that is currently handling the
   * keyboard using this same mixin, then take over handling of the keyboard on
   * behalf of that target element.
   */
  set target(element) {

    if (this._keyboardTarget) {
      // TODO: Restore previous state of target.
    }

    if (this.tabIndex < 0) {
      this.tabIndex = element.tabIndex >= 0 ?
        element.tabIndex :
        0;
    }

    // Since we're handling keyboard now, take target out of tab order.
    element.removeAttribute('tabIndex');

    this._keyboardTarget = element;
  }

}
