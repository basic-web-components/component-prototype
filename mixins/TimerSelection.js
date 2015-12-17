/**
 * Mixin provides for automatic timed changes in selection, as in a
 * automated slideshow.
 */


export default (base) => class TimerSelection extends base {

  contentChanged() {
    if (super.contentChanged) { super.contentChanged(); }
    this.play();
  }

  /**
   * Begin automatic progression of the selection.
   *
   * @method play
   */
  play() {
    if (super.play) { super.play(); }
    this._playing = true;
    setTimeout(this);
  }

  /**
   * Pause automatic progression of the selection.
   *
   * @method pause
   */
  pause() {
    if (super.pause) { super.pause(); }
    clearTimeout(this);
    this._playing = false;
  }

  /**
   * True if the selection is being automatically advanced.
   *
   * @property playing
   * @type Boolean
   */
  get playing() {
    return this._playing;
  }
  set playing(playing) {
    if ('playing' in base.prototype) { super.playing = playing; }
    if (playing && !this._playing) {
      this.play();
    } else if (!playing && this._playing) {
        this.pause();
    }
  }

  // Whether the user has selected an item manually, or we've automatically
  // advanced the selection, we wait for a bit before advancing again.
  set selectedItem(item) {
    clearTimeout(this);
    if (this.playing) {
      setTimeout(this);
    }
  }

};



function clearTimeout(element) {
  if (element._timeout) {
    clearTimeout(element._timeout);
    element._timeout = null;
  }
}

function setTimeout(element) {
  element._timeout = setTimeout(element._selectNextWithWrap.bind(this), 2000);
}

// Select the next item, wrapping to first item if necessary.
function selectNextWithWrap(element) {
  let items = element.items;
  if (items) {
    if (element.selectedIndex == null || element.selectedIndex === items.length - 1) {
      element.selectFirst();
    } else {
      element.selectNext();
    }
  }
}
