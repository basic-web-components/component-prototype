import ElementBase from 'core-component-mixins/src/ElementBase';
import SwipeDirection from '../mixins/SwipeDirection';

export default class SwipeDirectionTest extends ElementBase.compose(SwipeDirection) {

  set position(value) {
    this.$.text.textContent = value.toFixed(3);
  }

  get template() {
    return `
      <style>
      :host {
        align-items: center;
        display: -webkit-flex;
        display: flex;
        font-size: 20px;
        font-weight: bold;
        justify-content: center;
      }

      </style>
      <div id="text"></div>
    `;
  }

}

document.registerElement('swipe-direction-test', SwipeDirectionTest);
