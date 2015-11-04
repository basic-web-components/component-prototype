/*
 * These helpers probably should go in Extensible.
 * Because this prototype is the first set of components that need these
 * helpers, they're here for now.
 */

export default class Super {

  // As of 11/3/2015, Safari 9 doesn't yet support ES6 "..." spread operator.
  // superCall(prototype, method, ...args) {
  superCall(prototype, method) {
    let base = prototype.super[method];
    if (base) {
      let args = [].slice.call(arguments, 2); // For Safari 9
      return base.apply(this, args);
    }
  }

  superGet(prototype, property) {
    // TODO: Standards-compliant way to find getter.
    let base = prototype.super.__lookupGetter__(property);
    if (base) {
      return base.call(this);
    }
  }

  superSet(prototype, property, value) {
    // TODO: Standards-compliant way to find setter.
    let base = prototype.super.__lookupSetter__(property);
    if (base) {
      base.call(this, value);
    }
  }

}
