/*
 * These helpers probably should go in Extensible.
 * Because this prototype is the first set of components that need these
 * helpers, they're here for now.
 */

export default class Super {

  superCall(prototype, method, ...args) {
    let base = prototype.super[method];
    if (base) {
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
