(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ElementBase = require('element-base/src/ElementBase');

var _ElementBase2 = _interopRequireDefault(_ElementBase);

var _SwipeDirection = require('../mixins/SwipeDirection');

var _SwipeDirection2 = _interopRequireDefault(_SwipeDirection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class SwipeDirectionTest extends _ElementBase2.default.compose(_SwipeDirection2.default) {

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

exports.default = SwipeDirectionTest;
document.registerElement('swipe-direction-test', SwipeDirectionTest);

},{"../mixins/SwipeDirection":2,"element-base/src/ElementBase":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Aspect which translates touch gestures (swipe left, swipe right) to direction
 * semantics (goRight, goLeft).
 *
 * @element basic-swipe-direction
 */

class SwipeDirection {}
exports.default = SwipeDirection;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Extend classes/objects with other classes/objects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CompositionRules = require('./CompositionRules');

var CompositionRules = _interopRequireWildcard(_CompositionRules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Composable = (function () {
  function Composable() {
    _classCallCheck(this, Composable);
  }

  _createClass(Composable, [{
    key: 'decorate',

    /*
     * Decorates the prototype of a class derived from Composable.
     * See notes for the static decorate() method.
     */
    value: function decorate(decorators) {
      Composable.decorate.call(this, decorators);
    }

    /*
     * Decorator for annotating how a class member should be composed later.
     * This takes a decorator that will be run at *composition* time.
     * For now, this can only be applied to methods.
     */

  }], [{
    key: 'compose',

    /*
     * Return a subclass of the current class that includes the members indicated
     * in the argument. The argument can be a plain JavaScript object, or a class
     * whose prototype contains the members that will be copied.
     *
     * This can be used for a couple of purposes:
     * 1. Extend a class with mixins/behaviors.
     * 2. Create a component class in ES5.
     *
     * The call
     *
     *   MyBaseClass.compose(Mixin1, Mixin2, Mixin3)
     *
     * will return a new class of MyBaseClass that implements all the methods in
     * the three mixins given. The above is equivalent to
     *
     *   MyBaseClass.compose(Mixin1).compose(Mixin2).compose(Mixin3)
     *
     * This method can be statically invoked to extend plain objects or classes
     * that don't inherit from this class:
     *
     *   let extended = Composable.extend.call(obj1, obj2);
     *
     */
    value: function compose() {
      for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
      }

      // We create a new subclass for each mixin in turn. The result becomes
      // the base class extended by any subsequent mixins. It turns out that
      // we can use Array.reduce() to concisely express this, using the current
      // (original) class as the seed for reduce().
      return mixins.reduce(_compose, this);
    }

    /*
     * Decorate "this" with the indicated decorators. The latter should be a
     * dictionary mapping property names to (proposed) ES7-compliant decorators.
     * This allows the use of decorators in ES6/5. Example, this ES7 code:
     *
     *   class Foo {
     *      @decorate(customDecorator)
     *      bar() {}
     *   }
     *
     * can be written using the decorate() method as:
     *
     *   class Foo {
     *      bar() {}
     *   }
     *   Composable.decorate.call(Foo.prototype, { bar: customDecorator });
     *
     * Or, if Foo derives from Composable already, this can be shorter:
     *
     *   class Foo extends Composable {
     *      bar() {}
     *   }
     *   Foo.prototype.decorate({ bar: customDecorator });
     *
     */

  }, {
    key: 'decorate',
    value: function decorate(decorators) {
      for (var key in decorators) {
        var decorator = decorators[key];
        var descriptor = Object.getOwnPropertyDescriptor(this, key);
        decorator(this, key, descriptor);
        Object.defineProperty(this, key, descriptor);
      }
    }
  }, {
    key: 'rule',
    value: function rule(decorator) {
      // Return a decorator that records the given decorator on the member itself.
      return function (target, key, descriptor) {
        // TODO: Use a Symbol instead of a string property name to save this.
        // descriptor.value._compositionRule = decorator;
        if (!target._compositionRules) {
          target._compositionRules = {};
        }
        target._compositionRules[key] = decorator;
      };
    }
  }]);

  return Composable;
})();

/*
 * Expose standard composition rules as properties of Composable.
 * This avoids the need for someone to make a separate import of the rules.
 */

exports.default = Composable;
Composable.rules = CompositionRules;

/*
 * All Composable objects have a "prototypes" key that keeps references to the
 * mixins that were applied along the prototype chain. When a *named* mixin is
 * applied to the prototype chain, the resulting object (or, for a class, the
 * class' prototype) will have a "prototypes" value for that name that points
 * back to the mixin. That is, a mixin can get a pointer to itself in the chain.
 *
 * A single mixin can be applied to multiple prototype chains -- the name
 * refers to the prototype on *this particular prototype chain* that was added
 * for that mixin. This lets mixin/mixin code get back to its own
 * prototype, most often in combination with "super" (see below) in order to
 * invoke superclass behavior.
 */
Composable.prototype.prototypes = {
  Composable: Composable.prototype
};

/*
 * All Composable-created objects have a "super" property that references the
 * prototype above them in the prototype chain.
 *
 * This "super" reference is used as a replacement for ES6's "super" keyword in
 * in ES5 (or transpiled ES6) mixins that want to invoke superclass behavior,
 * where the specific superclass will depend upon which mixins have been applied
 * to a given prototype chain.
 *
 * E.g.:
 *   class Mixin {
 *     foo() {
 *       if (this.protoypes.Mixin.super.foo) {
 *         this.prototypes.Mixin.super.foo.call(this); // Invoke superclass' foo()
 *       }
 *       // Do Mixin-specific work here...
 *     }
 *   }
 *
 * For consistency, Composable itself records its own superclass as Object.
 */
Composable.prototype.super = Object.prototype;

// Composition rules for standard object members.
Composable.prototype.compositionRules = {
  '__method__': Composable.rules.baseMethodFirst,
  '__property__': Composable.rules.baseSetterFirst,
  'compositionRules': Composable.rules.chainPrototypes,
  'prototypes': Composable.rules.chainPrototypes
};

// Properties defined by Function that we don't want to mixin.
// We'd prefer to get these by interrogating Function itself, but WebKit
// functions have some properties (arguments and caller) which are not returned
// by Object.getOwnPropertyNames(Function).
var NON_MIXABLE_FUNCTION_PROPERTIES = ['arguments', 'caller', 'length', 'name', 'prototype'];

// Properties defined by Object that we don't want to mixin.
var NON_MIXABLE_OBJECT_PROPERTIES = ['constructor'];

var ORIGINAL_MIXIN_SYMBOL = Symbol('Original mixin');

/*
 * Apply the composition rules in effect for the given object, which lies at
 * the tip of a prototype chain. This looks for conflicts between the object's
 * own properties (and methods), and identically-named properties (methods)
 * further up the prototype chain. Conflicts are resolved with rules defined by
 * the affect members.
 */
function applyCompositionRules(obj) {
  var ownCompositionRules = obj.hasOwnProperty('_compositionRules') ? obj._compositionRules : {};
  var inheritedCompositionRules = obj.compositionRules;
  var defaultCompositionRules = Composable.prototype.compositionRules;

  // For each property name, see if the base has a property with the same name.
  var base = Object.getPrototypeOf(obj);
  Object.getOwnPropertyNames(obj).forEach(function (name) {
    if (name in base && NON_MIXABLE_OBJECT_PROPERTIES.indexOf(name) < 0) {
      // Base does implement a member with the same name; need to combine.
      var descriptor = Object.getOwnPropertyDescriptor(obj, name);
      var key = getGeneralDescriptorKey(descriptor);

      // See if this property has a rule associated with it, checking:
      var rule = ownCompositionRules[name] // object itself
       || inheritedCompositionRules[name] // inherited rules for name
       || inheritedCompositionRules[key] // inherited rules generally
       || defaultCompositionRules[name] // default rules for name
       || defaultCompositionRules[key]; // default rules generally

      // "override" is a known no-op, so we don't bother trying to redefine the
      // property.
      if (rule && rule !== Composable.rules.override) {
        rule(obj, name, descriptor);
        Object.defineProperty(obj, name, descriptor);
      }
    }
  });
}

/*
 * Copy the given properties/methods to the target.
 * Return the updated target.
 */
function copyOwnProperties(source, target) {
  var ignorePropertyNames = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  Object.getOwnPropertyNames(source).forEach(function (name) {
    if (ignorePropertyNames.indexOf(name) < 0) {
      var descriptor = Object.getOwnPropertyDescriptor(source, name);
      Object.defineProperty(target, name, descriptor);
    }
  });
  return target;
}

/*
 * Return a new subclass/object that extends the given base class/object with
 * the members of the indicated mixin.
 */
function _compose(base, mixin) {

  // See if the *mixin* has a base class/prototype of its own.
  var mixinIsClass = isClass(mixin);
  var mixinBase = mixinIsClass ? Object.getPrototypeOf(mixin.prototype).constructor : Object.getPrototypeOf(mixin);
  if (mixinBase && mixinBase !== Function && mixinBase !== Object && mixinBase !== Object.prototype) {
    // The mixin itself derives from another class/object.
    // Recurse, and extend with the mixin's base first.
    base = _compose(base, mixinBase);
  }

  // Create the extended object we're going to return as a result.
  var baseIsClass = isClass(base);
  var result = baseIsClass ? createSubclass(base) : Object.create(base);

  // Check to make sure we're not extending the base with a prototype that was
  // already composed into the object's prototype chain.
  var basePrototype = baseIsClass ? base.prototype : base;
  var mixinPrototype = mixinIsClass ? mixin.prototype : mixin;
  if (objectHasPrototype(basePrototype, mixinPrototype) || objectHasMixin(basePrototype, mixin)) {
    // Skip this mixin, return result as is.
    return result;
  }

  // The "target" here is the target of our property/method composition rules.
  var target = undefined;
  if (baseIsClass && mixinIsClass) {
    // Extending class with class: copy static members, then prototype members.
    copyOwnProperties(mixin, result, NON_MIXABLE_FUNCTION_PROPERTIES);
    target = copyOwnProperties(mixin.prototype, result.prototype, NON_MIXABLE_OBJECT_PROPERTIES);
  } else if (!baseIsClass && mixinIsClass) {
    // Extending plain object with class: copy prototype methods to result.
    target = copyOwnProperties(mixin.prototype, result, NON_MIXABLE_FUNCTION_PROPERTIES);
  } else if (baseIsClass && !mixinIsClass) {
    // Extending class with plain object: copy mixin to result prototype.
    target = copyOwnProperties(mixin, result.prototype, NON_MIXABLE_OBJECT_PROPERTIES);
  } else {
    // Extending plain object with plain object: copy former to latter.
    target = copyOwnProperties(mixin, result, NON_MIXABLE_OBJECT_PROPERTIES);
  }

  if (mixin.name) {
    // Use the mixin's name (usually the name of a class' constructor) to
    // save a reference back to the tip of the newly-extended prototype chain.
    // See notes at Composable's "prototypes" property.
    target.prototypes = {};
    target.prototypes[mixin.name] = target;

    // Save a reference to the superclass/super-object. See the comments on
    // Composable's "super" property.
    target.super = baseIsClass ? base.prototype : base;
  }

  // Keep track of the mixin that was composed in at this point.
  Object.defineProperty(target, ORIGINAL_MIXIN_SYMBOL, {
    value: mixin
  });

  // Apply the composition rules in effect at the target.
  applyCompositionRules(target);

  return result;
}

/*
 * Return a new subclass of the given base class.
 */
function createSubclass(base) {
  // Once WebKit supports HTMLElement as a real class, we can just say:
  //
  //   class subclass extends base {}
  //
  // However, until that's resolved, we just construct the class ourselves.
  function subclass() {};
  Object.setPrototypeOf(subclass, base);
  Object.setPrototypeOf(subclass.prototype, base.prototype);
  return subclass;
}

/*
 * Examine the descriptor to determine which rule key applies.
 */
function getGeneralDescriptorKey(descriptor) {
  if (typeof descriptor.value === 'function') {
    // Method
    return '__method__';
  } else if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
    // Property with getter and/or setter
    return '__property__';
  }
  return null;
}

/*
 * Return true if c is a JavaScript class.
 *
 * We use this test because, on WebKit, classes like HTMLElement are special,
 * and are not instances of Function. To handle that case, we use a looser
 * definition: an object is a class if it has a prototype, and that prototype
 * has a constructor that is the original object. This condition holds true even
 * for HTMLElement on WebKit.
 */
function isClass(c) {
  return typeof c === 'function' || // Standard
  c.prototype && c.prototype.constructor === c; // HTMLElement in WebKit
}

/*
 * Return true if the given object either has the given prototype on its
 * chain.
 */
function objectHasPrototype(obj, prototype) {
  if (prototype.constructor === Object) {
    // The prototype is a plain object.
    // Only case to defend against is someone trying to mixin Object itself.
    return prototype === Object.prototype;
  }
  if (obj === prototype || _instanceof(obj, prototype.constructor)) {
    // The prototype was found along the prototype chain.
    return true;
  }
  return false;
}

/*
 * Return true if the given mixin was used to create any of the prototypes on
 * on the object's prototype chain.
 */
function objectHasMixin(obj, mixin) {
  if (!obj) {
    return false;
  }
  var descriptor = Object.getOwnPropertyDescriptor(obj, ORIGINAL_MIXIN_SYMBOL);
  if (descriptor && descriptor.value === mixin) {
    // The given mixin was, in fact, composed into this prototype chain.
    return true;
  }
  return objectHasMixin(Object.getPrototypeOf(obj), mixin);
}

},{"./CompositionRules":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeFunction = composeFunction;
exports.chainPrototypes = chainPrototypes;
exports.getBaseDescriptor = getBaseDescriptor;
exports.getPropertyDescriptor = getPropertyDescriptor;
exports.override = override;
exports.preferBaseResult = preferBaseResult;
exports.preferBaseGetter = preferBaseGetter;
exports.preferMixinGetter = preferMixinGetter;
exports.preferMixinResult = preferMixinResult;
exports.baseMethodFirst = baseMethodFirst;
exports.baseSetterFirst = baseSetterFirst;
/**
 * Standard composition rules
 */

/*
 * Take two functions and return a new composed function that invokes both.
 * The composed function will return the result of the second function.
 * This is not a rule, but a helper used by rules.
 */
function composeFunction(function1, function2) {
  return function () {
    function1.apply(this, arguments);
    return function2.apply(this, arguments);
  };
}

/*
 * Combinator that sets the prototype of a mixin property value to be the
 * corresponding value on the base. This effectively does a shallow merge of
 * of the properties, without copying any information.
 */
function chainPrototypes(target, key, descriptor) {
  var mixinValue = descriptor.value;
  var base = Object.getPrototypeOf(target);
  var baseDescriptor = getPropertyDescriptor(base, key);
  var baseValue = baseDescriptor.value;
  Object.setPrototypeOf(mixinValue, baseValue);
}

/*
 * Helper function to complete a property definition for a mixin.
 *
 * Default JavaScript behavior is that a subclass that defines a getter but not
 * a setter will never have the base class' setter invoked. Similarly, a
 * subclass that defines a setter but not a getter will never have the base
 * class' getter invoked.
 *
 * For mixins, we want the default behavior to be that, if a mixin only defines
 * a getter, but the base class defines a setter, we want the mixin to acquire
 * a default setter than invokes the base setter. Likewise, we want to define
 * a default getter if none is supplied.
 *
 * To carry that out, this helper function rounds out a property definition to
 * ensure it has a default getter or setter if it needs one.
 */
function completePropertyDefinition(descriptor, baseDescriptor) {
  if (descriptor.get && !descriptor.set && baseDescriptor.set) {
    (function () {
      // Mixin has getter but needs a default setter.
      var baseSetter = baseDescriptor.set;
      descriptor.set = function (value) {
        baseSetter.call(this, value);
      };
    })();
  }
  if (descriptor.set && !descriptor.get && baseDescriptor.get) {
    (function () {
      // Mixin has setter but needs a default getter.
      var baseGetter = baseDescriptor.get;
      descriptor.get = function () {
        return baseGetter.call(this);
      };
    })();
  }
}

/*
 * Perform a deep merge of a mixin property on top of a base property.
 */
// export function deepMerge(target, key, descriptor) {
//   let mixinValue = descriptor.value;
//   let baseValue = Object.getPrototypeOf(target)[key].value;
//   descriptor.value = 'merged'; // merge(baseValue, mixinValue);
// }

/*
 * Helper to return the base descriptor for the indicated key. This is used to
 * find the specific implementation that would otherwise be overridden by the
 * mixin.
 */
function getBaseDescriptor(target, key) {
  var base = Object.getPrototypeOf(target);
  return getPropertyDescriptor(base, key);
}

/*
 * Like Object.getOwnPropertyDescriptor(), but walks up the prototype chain.
 * This is needed by composition rules, which usually start out by getting
 * the base implementation of a member they're composing.
 * This is not a rule, but a helper used by rules.
 */
function getPropertyDescriptor(obj, name) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, name);
  if (descriptor) {
    return descriptor;
  } else {
    var prototype = Object.getPrototypeOf(obj);
    // Checking for "name in prototype" lets us know whether we should bother
    // walking up the prototype chain.
    if (prototype && name in prototype) {
      return getPropertyDescriptor(prototype, name);
    }
  }
  return undefined; // Not found
}

/*
 * Combinator that causes a mixin method to override its base implementation.
 * Since this the default behavior of the prototype chain, this is a no-op.
 */
function override(target, key, descriptor) {}

/*
 * Compose methods, invoking base implementation first. If it returns a
 * truthy result, that is returned immediately. Otherwise, the mixin
 * implementation's result is returned.
 */
function preferBaseResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseImplementation = baseDescriptor.value;
  descriptor.value = function () {
    return baseImplementation.apply(this, arguments) || mixinImplementation.apply(this, arguments);
  };
}

/*
 * Like preferBaseResult, but for getter/setters. The base getter is invoked
 * first. If it returns a truthy result, that is returned. Otherwise, the mixin
 * getter's result is returned. Setter is invoked base first, then mixin.
 */
function preferBaseGetter(target, key, descriptor) {
  var mixinGetter = descriptor.get;
  var mixinSetter = descriptor.set;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseGetter = baseDescriptor.get;
  var baseSetter = baseDescriptor.set;
  if (mixinGetter && baseGetter) {
    // Compose getters.
    descriptor.get = function () {
      return baseGetter.apply(this) || mixinGetter.apply(this);
    };
  }
  if (mixinSetter && baseSetter) {
    // Compose setters.
    descriptor.set = composeFunction(baseSetter, mixinSetter);
  }
  completePropertyDefinition(descriptor, baseDescriptor);
}

/*
 * Like preferMixinResult, but for getter/setters. The mixin getter is invoked
 * first. If it returns a truthy result, that is returned. Otherwise, the base
 * getter's result is returned. Setter is still invoked base first, then mixin.
 */
function preferMixinGetter(target, key, descriptor) {
  var mixinGetter = descriptor.get;
  var mixinSetter = descriptor.set;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseGetter = baseDescriptor.get;
  var baseSetter = baseDescriptor.set;
  if (mixinGetter && baseGetter) {
    // Compose getters.
    descriptor.get = function () {
      return mixinGetter.apply(this) || baseGetter.apply(this);
    };
  }
  if (mixinSetter && baseSetter) {
    // Compose setters.
    descriptor.set = composeFunction(baseSetter, mixinSetter);
  }
  completePropertyDefinition(descriptor, baseDescriptor);
}

/*
 * Compose methods, invoking mixin implementation first. If it returns a truthy
 * result, that is returned immediately. Otherwise, the base implementation's
 * result is returned.
 */
function preferMixinResult(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseImplementation = baseDescriptor.value;
  descriptor.value = function () {
    return mixinImplementation.apply(this, arguments) || baseImplementation.apply(this, arguments);
  };
}

/*
 * Default rule for composing methods: invoke base first, then mixin.
 */
function baseMethodFirst(target, key, descriptor) {
  var mixinImplementation = descriptor.value;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseImplementation = baseDescriptor.value;
  descriptor.value = composeFunction(baseImplementation, mixinImplementation);
}

/*
 * Default rule for composing properties.
 * We only compose setters, which invoke base first, then mixin.
 * A defined mixin getter overrides a base getter.
 * Note that, because of the way property descriptors work, if the mixin only
 * defines a setter, but not a getter, we have to supply a default getter that
 * invokes the base getter. Similarly, if the mixin just defines a getter,
 * we have to supply a default setter.
 */
function baseSetterFirst(target, key, descriptor) {
  var mixinSetter = descriptor.set;
  var baseDescriptor = getBaseDescriptor(target, key);
  var baseSetter = baseDescriptor.set;
  if (mixinSetter && baseSetter) {
    // Compose setters.
    descriptor.set = composeFunction(baseSetter, mixinSetter);
  }
  completePropertyDefinition(descriptor, baseDescriptor);
}

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Marshall attributes to properties (and eventually vice versa).
 */

var AttributeMarshalling = (function () {
  function AttributeMarshalling() {
    _classCallCheck(this, AttributeMarshalling);
  }

  _createClass(AttributeMarshalling, [{
    key: 'attributeChangedCallback',

    /*
     * Handle a change to the attribute with the given name.
     */
    value: function attributeChangedCallback(name, oldValue, newValue) {
      // If the attribute name corresponds to a property name, then set that
      // property. Ignore changes in standard HTMLElement properties.
      var propertyName = attributeToPropertyName(name);
      if (propertyName in this && !(propertyName in HTMLElement.prototype)) {
        this[propertyName] = newValue;
      }
    }
  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      [].forEach.call(this.attributes, function (attribute) {
        _this.attributeChangedCallback(attribute.name, undefined, attribute.value);
      });
    }
  }]);

  return AttributeMarshalling;
})();

// Convert camel case fooBar name to hyphenated foo-bar.

exports.default = AttributeMarshalling;
function attributeToPropertyName(attributeName) {
  var propertyName = attributeName.replace(/-([a-z])/g, function (m) {
    return m[1].toUpperCase();
  });
  return propertyName;
}

// Convert hyphenated foo-bar name to camel case fooBar.
function propertyToAttributeName(propertyName) {
  var attributeName = propertyName.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + '-' + g[1].toLowerCase();
  });
  return attributeName;
}

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Polymer-style automatic node finding.
 * See https://www.polymer-project.org/1.0/docs/devguide/local-dom.html#node-finding.
 */

var AutomaticNodeFinding = (function () {
  function AutomaticNodeFinding() {
    _classCallCheck(this, AutomaticNodeFinding);
  }

  _createClass(AutomaticNodeFinding, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      if (this.shadowRoot) {
        this.$ = {};
        var nodesWithIds = this.shadowRoot.querySelectorAll('[id]');
        [].forEach.call(nodesWithIds, function (node) {
          var id = node.getAttribute('id');
          _this.$[id] = node;
        });
      }
    }
  }]);

  return AutomaticNodeFinding;
})();

exports.default = AutomaticNodeFinding;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Composable = require('Composable/src/Composable');

var _Composable2 = _interopRequireDefault(_Composable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We use Extensible to add its own members to a HTMLElement subclass.
// The result is an HTMLElement with .extend() and super() support.
var ComposableElement = _Composable2.default.compose.call(HTMLElement, _Composable2.default); /*
                                                                                               * A composable HTML element.
                                                                                               *
                                                                                               * This class is provided just as a convenience. One could also start with
                                                                                               * HTMLElement at the top level, and add extensibility by mixing in Composable.
                                                                                               */

exports.default = ComposableElement;

},{"Composable/src/Composable":3}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComposableElement2 = require('./ComposableElement');

var _ComposableElement3 = _interopRequireDefault(_ComposableElement2);

var _TemplateStamping = require('./TemplateStamping');

var _TemplateStamping2 = _interopRequireDefault(_TemplateStamping);

var _AutomaticNodeFinding = require('./AutomaticNodeFinding');

var _AutomaticNodeFinding2 = _interopRequireDefault(_AutomaticNodeFinding);

var _AttributeMarshalling = require('./AttributeMarshalling');

var _AttributeMarshalling2 = _interopRequireDefault(_AttributeMarshalling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A sample general-purpose base class for defining custom elements that mixes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in some common features: template stamping into a shadow root, automatic node
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * finding, and marshalling between attributes and properties.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ElementBase = (function (_ComposableElement) {
  _inherits(ElementBase, _ComposableElement);

  function ElementBase() {
    _classCallCheck(this, ElementBase);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ElementBase).apply(this, arguments));
  }

  _createClass(ElementBase, [{
    key: 'log',

    /* For debugging */
    value: function log(text) {
      console.log(this.localName + ': ' + text);
    }
  }]);

  return ElementBase;
})(_ComposableElement3.default);

exports.default = ElementBase = ElementBase.compose(_TemplateStamping2.default, // before node finding, so shadow root is populated
_AutomaticNodeFinding2.default, // before marshalling, so marshalled properties can use it
_AttributeMarshalling2.default);

document.registerElement('element-base', ElementBase);

},{"./AttributeMarshalling":5,"./AutomaticNodeFinding":6,"./ComposableElement":7,"./TemplateStamping":9}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Element extension for template stamping. If a component defines a template
 * property (as a string or referencing a HTML template), when the component
 * class is instantiated, a shadow root will be created on the instance, and
 * the contents of the template will be cloned into the shadow root.
 *
 * For the time being, this extension retains support for Shadow DOM v0.
 * That will eventually be deprecated as browsers implement Shadow DOM v1.
 */

var TemplateStamping = (function () {
  function TemplateStamping() {
    _classCallCheck(this, TemplateStamping);
  }

  _createClass(TemplateStamping, [{
    key: 'createdCallback',

    /*
     * If the component defines a template, a shadow root will be created on the
     * component instance, and the template stamped into it.
     */
    value: function createdCallback() {
      var template = this.template;
      if (typeof template === 'string') {
        // Upgrade plain string to real template.
        template = createTemplateWithInnerHTML(template);
      }
      if (template && USING_SHADOW_DOM_V0) {
        polyfillSlotWithContent(template);
      }
      if (window.ShadowDOMPolyfill) {
        shimTemplateStyles(template, this.localName);
      }
      // TODO: Save the processed template with the component's class prototype
      // so it doesn't need to be processed with every instantiation.
      if (template) {
        // this.log("cloning template into shadow root");
        var root = USING_SHADOW_DOM_V0 ? this.createShadowRoot() : // Shadow DOM v0
        this.attachShadow({ mode: 'open' }); // Shadow DOM v1
        var clone = document.importNode(template.content, true);
        root.appendChild(clone);
      }
    }
  }]);

  return TemplateStamping;
})();

// Feature detection for old Shadow DOM v0.

exports.default = TemplateStamping;
var USING_SHADOW_DOM_V0 = typeof HTMLElement.prototype.createShadowRoot !== 'undefined';

// Convert a plain string of HTML into a real template element.
function createTemplateWithInnerHTML(innerHTML) {
  var template = document.createElement('template');
  // REVIEW: Is there an easier way to do this?
  // We'd like to just set innerHTML on the template content, but since it's
  // a DocumentFragment, that doesn't work.
  var div = document.createElement('div');
  div.innerHTML = innerHTML;
  while (div.childNodes.length > 0) {
    template.content.appendChild(div.childNodes[0]);
  }
  return template;
}

// Replace occurences of v1 slot elements with v0 content elements.
// This does not yet map named slots to content select clauses.
function polyfillSlotWithContent(template) {
  [].forEach.call(template.content.querySelectorAll('slot'), function (slotElement) {
    var contentElement = document.createElement('content');
    slotElement.parentNode.replaceChild(contentElement, slotElement);
  });
}

// Invoke basic style shimming with ShadowCSS.
function shimTemplateStyles(template, tag) {
  WebComponents.ShadowCSS.shimStyling(template.content, tag);
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vcy9Td2lwZURpcmVjdGlvbkRlbW8uanMiLCJtaXhpbnMvU3dpcGVEaXJlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvQ29tcG9zYWJsZS9zcmMvQ29tcG9zYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9Db21wb3NhYmxlL3NyYy9Db21wb3NpdGlvblJ1bGVzLmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvQXR0cmlidXRlTWFyc2hhbGxpbmcuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9BdXRvbWF0aWNOb2RlRmluZGluZy5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWJhc2Uvc3JjL0NvbXBvc2FibGVFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtYmFzZS9zcmMvRWxlbWVudEJhc2UuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1iYXNlL3NyYy9UZW1wbGF0ZVN0YW1waW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7QUFFM0QsSUFBSSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXpELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztBQUUxRCxJQUFJLGdCQUFnQixHQUFHLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUUvRCxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFF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QUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFBLFdBQVcsRUFBSTtBQUN4RSxRQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZELGVBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztHQUNsRSxDQUFDLENBQUM7Q0FDSjs7O0FBQUEsQUFHRCxTQUFTLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7QUFDekMsZUFBYSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztDQUM1RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRWxlbWVudEJhc2UgZnJvbSAnZWxlbWVudC1iYXNlL3NyYy9FbGVtZW50QmFzZSc7XG5pbXBvcnQgU3dpcGVEaXJlY3Rpb24gZnJvbSAnLi4vbWl4aW5zL1N3aXBlRGlyZWN0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dpcGVEaXJlY3Rpb25UZXN0IGV4dGVuZHMgRWxlbWVudEJhc2UuY29tcG9zZShTd2lwZURpcmVjdGlvbikge1xuXG4gIHNldCBwb3NpdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuJC50ZXh0LnRleHRDb250ZW50ID0gdmFsdWUudG9GaXhlZCgzKTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgOmhvc3Qge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICA8L3N0eWxlPlxuICAgICAgPGRpdiBpZD1cInRleHRcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbn1cblxuZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdzd2lwZS1kaXJlY3Rpb24tdGVzdCcsIFN3aXBlRGlyZWN0aW9uVGVzdCk7XG4iLCIvKipcbiAqIEFzcGVjdCB3aGljaCB0cmFuc2xhdGVzIHRvdWNoIGdlc3R1cmVzIChzd2lwZSBsZWZ0LCBzd2lwZSByaWdodCkgdG8gZGlyZWN0aW9uXG4gKiBzZW1hbnRpY3MgKGdvUmlnaHQsIGdvTGVmdCkuXG4gKlxuICogQGVsZW1lbnQgYmFzaWMtc3dpcGUtZGlyZWN0aW9uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dpcGVEaXJlY3Rpb24ge1xuXG4gIFxufVxuIiwiLypcbiAqIEV4dGVuZCBjbGFzc2VzL29iamVjdHMgd2l0aCBvdGhlciBjbGFzc2VzL29iamVjdHMuXG4gKi9cblxuaW1wb3J0ICogYXMgQ29tcG9zaXRpb25SdWxlcyBmcm9tICcuL0NvbXBvc2l0aW9uUnVsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb3NhYmxlIHtcblxuICAvKlxuICAgKiBSZXR1cm4gYSBzdWJjbGFzcyBvZiB0aGUgY3VycmVudCBjbGFzcyB0aGF0IGluY2x1ZGVzIHRoZSBtZW1iZXJzIGluZGljYXRlZFxuICAgKiBpbiB0aGUgYXJndW1lbnQuIFRoZSBhcmd1bWVudCBjYW4gYmUgYSBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdCwgb3IgYSBjbGFzc1xuICAgKiB3aG9zZSBwcm90b3R5cGUgY29udGFpbnMgdGhlIG1lbWJlcnMgdGhhdCB3aWxsIGJlIGNvcGllZC5cbiAgICpcbiAgICogVGhpcyBjYW4gYmUgdXNlZCBmb3IgYSBjb3VwbGUgb2YgcHVycG9zZXM6XG4gICAqIDEuIEV4dGVuZCBhIGNsYXNzIHdpdGggbWl4aW5zL2JlaGF2aW9ycy5cbiAgICogMi4gQ3JlYXRlIGEgY29tcG9uZW50IGNsYXNzIGluIEVTNS5cbiAgICpcbiAgICogVGhlIGNhbGxcbiAgICpcbiAgICogICBNeUJhc2VDbGFzcy5jb21wb3NlKE1peGluMSwgTWl4aW4yLCBNaXhpbjMpXG4gICAqXG4gICAqIHdpbGwgcmV0dXJuIGEgbmV3IGNsYXNzIG9mIE15QmFzZUNsYXNzIHRoYXQgaW1wbGVtZW50cyBhbGwgdGhlIG1ldGhvZHMgaW5cbiAgICogdGhlIHRocmVlIG1peGlucyBnaXZlbi4gVGhlIGFib3ZlIGlzIGVxdWl2YWxlbnQgdG9cbiAgICpcbiAgICogICBNeUJhc2VDbGFzcy5jb21wb3NlKE1peGluMSkuY29tcG9zZShNaXhpbjIpLmNvbXBvc2UoTWl4aW4zKVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgc3RhdGljYWxseSBpbnZva2VkIHRvIGV4dGVuZCBwbGFpbiBvYmplY3RzIG9yIGNsYXNzZXNcbiAgICogdGhhdCBkb24ndCBpbmhlcml0IGZyb20gdGhpcyBjbGFzczpcbiAgICpcbiAgICogICBsZXQgZXh0ZW5kZWQgPSBDb21wb3NhYmxlLmV4dGVuZC5jYWxsKG9iajEsIG9iajIpO1xuICAgKlxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2UoLi4ubWl4aW5zKSB7XG4gICAgLy8gV2UgY3JlYXRlIGEgbmV3IHN1YmNsYXNzIGZvciBlYWNoIG1peGluIGluIHR1cm4uIFRoZSByZXN1bHQgYmVjb21lc1xuICAgIC8vIHRoZSBiYXNlIGNsYXNzIGV4dGVuZGVkIGJ5IGFueSBzdWJzZXF1ZW50IG1peGlucy4gSXQgdHVybnMgb3V0IHRoYXRcbiAgICAvLyB3ZSBjYW4gdXNlIEFycmF5LnJlZHVjZSgpIHRvIGNvbmNpc2VseSBleHByZXNzIHRoaXMsIHVzaW5nIHRoZSBjdXJyZW50XG4gICAgLy8gKG9yaWdpbmFsKSBjbGFzcyBhcyB0aGUgc2VlZCBmb3IgcmVkdWNlKCkuXG4gICAgcmV0dXJuIG1peGlucy5yZWR1Y2UoY29tcG9zZSwgdGhpcyk7XG4gIH1cblxuICAvKlxuICAgKiBEZWNvcmF0ZSBcInRoaXNcIiB3aXRoIHRoZSBpbmRpY2F0ZWQgZGVjb3JhdG9ycy4gVGhlIGxhdHRlciBzaG91bGQgYmUgYVxuICAgKiBkaWN0aW9uYXJ5IG1hcHBpbmcgcHJvcGVydHkgbmFtZXMgdG8gKHByb3Bvc2VkKSBFUzctY29tcGxpYW50IGRlY29yYXRvcnMuXG4gICAqIFRoaXMgYWxsb3dzIHRoZSB1c2Ugb2YgZGVjb3JhdG9ycyBpbiBFUzYvNS4gRXhhbXBsZSwgdGhpcyBFUzcgY29kZTpcbiAgICpcbiAgICogICBjbGFzcyBGb28ge1xuICAgKiAgICAgIEBkZWNvcmF0ZShjdXN0b21EZWNvcmF0b3IpXG4gICAqICAgICAgYmFyKCkge31cbiAgICogICB9XG4gICAqXG4gICAqIGNhbiBiZSB3cml0dGVuIHVzaW5nIHRoZSBkZWNvcmF0ZSgpIG1ldGhvZCBhczpcbiAgICpcbiAgICogICBjbGFzcyBGb28ge1xuICAgKiAgICAgIGJhcigpIHt9XG4gICAqICAgfVxuICAgKiAgIENvbXBvc2FibGUuZGVjb3JhdGUuY2FsbChGb28ucHJvdG90eXBlLCB7IGJhcjogY3VzdG9tRGVjb3JhdG9yIH0pO1xuICAgKlxuICAgKiBPciwgaWYgRm9vIGRlcml2ZXMgZnJvbSBDb21wb3NhYmxlIGFscmVhZHksIHRoaXMgY2FuIGJlIHNob3J0ZXI6XG4gICAqXG4gICAqICAgY2xhc3MgRm9vIGV4dGVuZHMgQ29tcG9zYWJsZSB7XG4gICAqICAgICAgYmFyKCkge31cbiAgICogICB9XG4gICAqICAgRm9vLnByb3RvdHlwZS5kZWNvcmF0ZSh7IGJhcjogY3VzdG9tRGVjb3JhdG9yIH0pO1xuICAgKlxuICAgKi9cbiAgc3RhdGljIGRlY29yYXRlKGRlY29yYXRvcnMpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gZGVjb3JhdG9ycykge1xuICAgICAgbGV0IGRlY29yYXRvciA9IGRlY29yYXRvcnNba2V5XTtcbiAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBrZXkpO1xuICAgICAgZGVjb3JhdG9yKHRoaXMsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBEZWNvcmF0ZXMgdGhlIHByb3RvdHlwZSBvZiBhIGNsYXNzIGRlcml2ZWQgZnJvbSBDb21wb3NhYmxlLlxuICAgKiBTZWUgbm90ZXMgZm9yIHRoZSBzdGF0aWMgZGVjb3JhdGUoKSBtZXRob2QuXG4gICAqL1xuICBkZWNvcmF0ZShkZWNvcmF0b3JzKSB7XG4gICAgQ29tcG9zYWJsZS5kZWNvcmF0ZS5jYWxsKHRoaXMsIGRlY29yYXRvcnMpO1xuICB9XG5cbiAgLypcbiAgICogRGVjb3JhdG9yIGZvciBhbm5vdGF0aW5nIGhvdyBhIGNsYXNzIG1lbWJlciBzaG91bGQgYmUgY29tcG9zZWQgbGF0ZXIuXG4gICAqIFRoaXMgdGFrZXMgYSBkZWNvcmF0b3IgdGhhdCB3aWxsIGJlIHJ1biBhdCAqY29tcG9zaXRpb24qIHRpbWUuXG4gICAqIEZvciBub3csIHRoaXMgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBtZXRob2RzLlxuICAgKi9cbiAgc3RhdGljIHJ1bGUoZGVjb3JhdG9yKSB7XG4gICAgLy8gUmV0dXJuIGEgZGVjb3JhdG9yIHRoYXQgcmVjb3JkcyB0aGUgZ2l2ZW4gZGVjb3JhdG9yIG9uIHRoZSBtZW1iZXIgaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgLy8gVE9ETzogVXNlIGEgU3ltYm9sIGluc3RlYWQgb2YgYSBzdHJpbmcgcHJvcGVydHkgbmFtZSB0byBzYXZlIHRoaXMuXG4gICAgICAvLyBkZXNjcmlwdG9yLnZhbHVlLl9jb21wb3NpdGlvblJ1bGUgPSBkZWNvcmF0b3I7XG4gICAgICBpZiAoIXRhcmdldC5fY29tcG9zaXRpb25SdWxlcykge1xuICAgICAgICB0YXJnZXQuX2NvbXBvc2l0aW9uUnVsZXMgPSB7fTtcbiAgICAgIH1cbiAgICAgIHRhcmdldC5fY29tcG9zaXRpb25SdWxlc1trZXldID0gZGVjb3JhdG9yO1xuICAgIH1cbiAgfVxuXG59XG5cblxuLypcbiAqIEV4cG9zZSBzdGFuZGFyZCBjb21wb3NpdGlvbiBydWxlcyBhcyBwcm9wZXJ0aWVzIG9mIENvbXBvc2FibGUuXG4gKiBUaGlzIGF2b2lkcyB0aGUgbmVlZCBmb3Igc29tZW9uZSB0byBtYWtlIGEgc2VwYXJhdGUgaW1wb3J0IG9mIHRoZSBydWxlcy5cbiAqL1xuQ29tcG9zYWJsZS5ydWxlcyA9IENvbXBvc2l0aW9uUnVsZXM7XG5cblxuLypcbiAqIEFsbCBDb21wb3NhYmxlIG9iamVjdHMgaGF2ZSBhIFwicHJvdG90eXBlc1wiIGtleSB0aGF0IGtlZXBzIHJlZmVyZW5jZXMgdG8gdGhlXG4gKiBtaXhpbnMgdGhhdCB3ZXJlIGFwcGxpZWQgYWxvbmcgdGhlIHByb3RvdHlwZSBjaGFpbi4gV2hlbiBhICpuYW1lZCogbWl4aW4gaXNcbiAqIGFwcGxpZWQgdG8gdGhlIHByb3RvdHlwZSBjaGFpbiwgdGhlIHJlc3VsdGluZyBvYmplY3QgKG9yLCBmb3IgYSBjbGFzcywgdGhlXG4gKiBjbGFzcycgcHJvdG90eXBlKSB3aWxsIGhhdmUgYSBcInByb3RvdHlwZXNcIiB2YWx1ZSBmb3IgdGhhdCBuYW1lIHRoYXQgcG9pbnRzXG4gKiBiYWNrIHRvIHRoZSBtaXhpbi4gVGhhdCBpcywgYSBtaXhpbiBjYW4gZ2V0IGEgcG9pbnRlciB0byBpdHNlbGYgaW4gdGhlIGNoYWluLlxuICpcbiAqIEEgc2luZ2xlIG1peGluIGNhbiBiZSBhcHBsaWVkIHRvIG11bHRpcGxlIHByb3RvdHlwZSBjaGFpbnMgLS0gdGhlIG5hbWVcbiAqIHJlZmVycyB0byB0aGUgcHJvdG90eXBlIG9uICp0aGlzIHBhcnRpY3VsYXIgcHJvdG90eXBlIGNoYWluKiB0aGF0IHdhcyBhZGRlZFxuICogZm9yIHRoYXQgbWl4aW4uIFRoaXMgbGV0cyBtaXhpbi9taXhpbiBjb2RlIGdldCBiYWNrIHRvIGl0cyBvd25cbiAqIHByb3RvdHlwZSwgbW9zdCBvZnRlbiBpbiBjb21iaW5hdGlvbiB3aXRoIFwic3VwZXJcIiAoc2VlIGJlbG93KSBpbiBvcmRlciB0b1xuICogaW52b2tlIHN1cGVyY2xhc3MgYmVoYXZpb3IuXG4gKi9cbkNvbXBvc2FibGUucHJvdG90eXBlLnByb3RvdHlwZXMgPSB7XG4gIENvbXBvc2FibGU6IENvbXBvc2FibGUucHJvdG90eXBlXG59O1xuXG4vKlxuICogQWxsIENvbXBvc2FibGUtY3JlYXRlZCBvYmplY3RzIGhhdmUgYSBcInN1cGVyXCIgcHJvcGVydHkgdGhhdCByZWZlcmVuY2VzIHRoZVxuICogcHJvdG90eXBlIGFib3ZlIHRoZW0gaW4gdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAqXG4gKiBUaGlzIFwic3VwZXJcIiByZWZlcmVuY2UgaXMgdXNlZCBhcyBhIHJlcGxhY2VtZW50IGZvciBFUzYncyBcInN1cGVyXCIga2V5d29yZCBpblxuICogaW4gRVM1IChvciB0cmFuc3BpbGVkIEVTNikgbWl4aW5zIHRoYXQgd2FudCB0byBpbnZva2Ugc3VwZXJjbGFzcyBiZWhhdmlvcixcbiAqIHdoZXJlIHRoZSBzcGVjaWZpYyBzdXBlcmNsYXNzIHdpbGwgZGVwZW5kIHVwb24gd2hpY2ggbWl4aW5zIGhhdmUgYmVlbiBhcHBsaWVkXG4gKiB0byBhIGdpdmVuIHByb3RvdHlwZSBjaGFpbi5cbiAqXG4gKiBFLmcuOlxuICogICBjbGFzcyBNaXhpbiB7XG4gKiAgICAgZm9vKCkge1xuICogICAgICAgaWYgKHRoaXMucHJvdG95cGVzLk1peGluLnN1cGVyLmZvbykge1xuICogICAgICAgICB0aGlzLnByb3RvdHlwZXMuTWl4aW4uc3VwZXIuZm9vLmNhbGwodGhpcyk7IC8vIEludm9rZSBzdXBlcmNsYXNzJyBmb28oKVxuICogICAgICAgfVxuICogICAgICAgLy8gRG8gTWl4aW4tc3BlY2lmaWMgd29yayBoZXJlLi4uXG4gKiAgICAgfVxuICogICB9XG4gKlxuICogRm9yIGNvbnNpc3RlbmN5LCBDb21wb3NhYmxlIGl0c2VsZiByZWNvcmRzIGl0cyBvd24gc3VwZXJjbGFzcyBhcyBPYmplY3QuXG4gKi9cbkNvbXBvc2FibGUucHJvdG90eXBlLnN1cGVyID0gT2JqZWN0LnByb3RvdHlwZTtcblxuXG4vLyBDb21wb3NpdGlvbiBydWxlcyBmb3Igc3RhbmRhcmQgb2JqZWN0IG1lbWJlcnMuXG5Db21wb3NhYmxlLnByb3RvdHlwZS5jb21wb3NpdGlvblJ1bGVzID0ge1xuICAnX19tZXRob2RfXyc6IENvbXBvc2FibGUucnVsZXMuYmFzZU1ldGhvZEZpcnN0LFxuICAnX19wcm9wZXJ0eV9fJzogQ29tcG9zYWJsZS5ydWxlcy5iYXNlU2V0dGVyRmlyc3QsXG4gICdjb21wb3NpdGlvblJ1bGVzJzogQ29tcG9zYWJsZS5ydWxlcy5jaGFpblByb3RvdHlwZXMsXG4gICdwcm90b3R5cGVzJzogQ29tcG9zYWJsZS5ydWxlcy5jaGFpblByb3RvdHlwZXNcbn07XG5cblxuLy8gUHJvcGVydGllcyBkZWZpbmVkIGJ5IEZ1bmN0aW9uIHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBtaXhpbi5cbi8vIFdlJ2QgcHJlZmVyIHRvIGdldCB0aGVzZSBieSBpbnRlcnJvZ2F0aW5nIEZ1bmN0aW9uIGl0c2VsZiwgYnV0IFdlYktpdFxuLy8gZnVuY3Rpb25zIGhhdmUgc29tZSBwcm9wZXJ0aWVzIChhcmd1bWVudHMgYW5kIGNhbGxlcikgd2hpY2ggYXJlIG5vdCByZXR1cm5lZFxuLy8gYnkgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoRnVuY3Rpb24pLlxuY29uc3QgTk9OX01JWEFCTEVfRlVOQ1RJT05fUFJPUEVSVElFUyA9IFtcbiAgJ2FyZ3VtZW50cycsXG4gICdjYWxsZXInLFxuICAnbGVuZ3RoJyxcbiAgJ25hbWUnLFxuICAncHJvdG90eXBlJ1xuXTtcblxuLy8gUHJvcGVydGllcyBkZWZpbmVkIGJ5IE9iamVjdCB0aGF0IHdlIGRvbid0IHdhbnQgdG8gbWl4aW4uXG5jb25zdCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyA9IFtcbiAgJ2NvbnN0cnVjdG9yJ1xuXTtcblxuY29uc3QgT1JJR0lOQUxfTUlYSU5fU1lNQk9MID0gU3ltYm9sKCdPcmlnaW5hbCBtaXhpbicpO1xuXG5cbi8qXG4gKiBBcHBseSB0aGUgY29tcG9zaXRpb24gcnVsZXMgaW4gZWZmZWN0IGZvciB0aGUgZ2l2ZW4gb2JqZWN0LCB3aGljaCBsaWVzIGF0XG4gKiB0aGUgdGlwIG9mIGEgcHJvdG90eXBlIGNoYWluLiBUaGlzIGxvb2tzIGZvciBjb25mbGljdHMgYmV0d2VlbiB0aGUgb2JqZWN0J3NcbiAqIG93biBwcm9wZXJ0aWVzIChhbmQgbWV0aG9kcyksIGFuZCBpZGVudGljYWxseS1uYW1lZCBwcm9wZXJ0aWVzIChtZXRob2RzKVxuICogZnVydGhlciB1cCB0aGUgcHJvdG90eXBlIGNoYWluLiBDb25mbGljdHMgYXJlIHJlc29sdmVkIHdpdGggcnVsZXMgZGVmaW5lZCBieVxuICogdGhlIGFmZmVjdCBtZW1iZXJzLlxuICovXG5mdW5jdGlvbiBhcHBseUNvbXBvc2l0aW9uUnVsZXMob2JqKSB7XG4gIGxldCBvd25Db21wb3NpdGlvblJ1bGVzID0gb2JqLmhhc093blByb3BlcnR5KCdfY29tcG9zaXRpb25SdWxlcycpID9cbiAgICBvYmouX2NvbXBvc2l0aW9uUnVsZXMgOlxuICAgIHt9O1xuICBsZXQgaW5oZXJpdGVkQ29tcG9zaXRpb25SdWxlcyA9IG9iai5jb21wb3NpdGlvblJ1bGVzO1xuICBsZXQgZGVmYXVsdENvbXBvc2l0aW9uUnVsZXMgPSBDb21wb3NhYmxlLnByb3RvdHlwZS5jb21wb3NpdGlvblJ1bGVzO1xuXG4gIC8vIEZvciBlYWNoIHByb3BlcnR5IG5hbWUsIHNlZSBpZiB0aGUgYmFzZSBoYXMgYSBwcm9wZXJ0eSB3aXRoIHRoZSBzYW1lIG5hbWUuXG4gIGxldCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZm9yRWFjaChuYW1lID0+IHtcbiAgICBpZiAobmFtZSBpbiBiYXNlICYmIE5PTl9NSVhBQkxFX09CSkVDVF9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICAvLyBCYXNlIGRvZXMgaW1wbGVtZW50IGEgbWVtYmVyIHdpdGggdGhlIHNhbWUgbmFtZTsgbmVlZCB0byBjb21iaW5lLlxuICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSk7XG4gICAgICBsZXQga2V5ID0gZ2V0R2VuZXJhbERlc2NyaXB0b3JLZXkoZGVzY3JpcHRvcik7XG5cbiAgICAgIC8vIFNlZSBpZiB0aGlzIHByb3BlcnR5IGhhcyBhIHJ1bGUgYXNzb2NpYXRlZCB3aXRoIGl0LCBjaGVja2luZzpcbiAgICAgIGxldCBydWxlID0gb3duQ29tcG9zaXRpb25SdWxlc1tuYW1lXSAgICAvLyBvYmplY3QgaXRzZWxmXG4gICAgICAgICAgfHwgaW5oZXJpdGVkQ29tcG9zaXRpb25SdWxlc1tuYW1lXSAgLy8gaW5oZXJpdGVkIHJ1bGVzIGZvciBuYW1lXG4gICAgICAgICAgfHwgaW5oZXJpdGVkQ29tcG9zaXRpb25SdWxlc1trZXldICAgLy8gaW5oZXJpdGVkIHJ1bGVzIGdlbmVyYWxseVxuICAgICAgICAgIHx8IGRlZmF1bHRDb21wb3NpdGlvblJ1bGVzW25hbWVdICAgIC8vIGRlZmF1bHQgcnVsZXMgZm9yIG5hbWVcbiAgICAgICAgICB8fCBkZWZhdWx0Q29tcG9zaXRpb25SdWxlc1trZXldOyAgICAvLyBkZWZhdWx0IHJ1bGVzIGdlbmVyYWxseVxuXG4gICAgICAvLyBcIm92ZXJyaWRlXCIgaXMgYSBrbm93biBuby1vcCwgc28gd2UgZG9uJ3QgYm90aGVyIHRyeWluZyB0byByZWRlZmluZSB0aGVcbiAgICAgIC8vIHByb3BlcnR5LlxuICAgICAgaWYgKHJ1bGUgJiYgcnVsZSAhPT0gQ29tcG9zYWJsZS5ydWxlcy5vdmVycmlkZSkge1xuICAgICAgICBydWxlKG9iaiwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cblxuLypcbiAqIENvcHkgdGhlIGdpdmVuIHByb3BlcnRpZXMvbWV0aG9kcyB0byB0aGUgdGFyZ2V0LlxuICogUmV0dXJuIHRoZSB1cGRhdGVkIHRhcmdldC5cbiAqL1xuZnVuY3Rpb24gY29weU93blByb3BlcnRpZXMoc291cmNlLCB0YXJnZXQsIGlnbm9yZVByb3BlcnR5TmFtZXMgPSBbXSkge1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKGlnbm9yZVByb3BlcnR5TmFtZXMuaW5kZXhPZihuYW1lKSA8IDApIHtcbiAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIG5hbWUpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG4vKlxuICogUmV0dXJuIGEgbmV3IHN1YmNsYXNzL29iamVjdCB0aGF0IGV4dGVuZHMgdGhlIGdpdmVuIGJhc2UgY2xhc3Mvb2JqZWN0IHdpdGhcbiAqIHRoZSBtZW1iZXJzIG9mIHRoZSBpbmRpY2F0ZWQgbWl4aW4uXG4gKi9cbmZ1bmN0aW9uIGNvbXBvc2UoYmFzZSwgbWl4aW4pIHtcblxuICAvLyBTZWUgaWYgdGhlICptaXhpbiogaGFzIGEgYmFzZSBjbGFzcy9wcm90b3R5cGUgb2YgaXRzIG93bi5cbiAgbGV0IG1peGluSXNDbGFzcyA9IGlzQ2xhc3MobWl4aW4pO1xuICBsZXQgbWl4aW5CYXNlID0gbWl4aW5Jc0NsYXNzID9cbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWl4aW4ucHJvdG90eXBlKS5jb25zdHJ1Y3RvciA6XG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKG1peGluKTtcbiAgaWYgKG1peGluQmFzZSAmJlxuICAgICAgbWl4aW5CYXNlICE9PSBGdW5jdGlvbiAmJlxuICAgICAgbWl4aW5CYXNlICE9PSBPYmplY3QgJiZcbiAgICAgIG1peGluQmFzZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIC8vIFRoZSBtaXhpbiBpdHNlbGYgZGVyaXZlcyBmcm9tIGFub3RoZXIgY2xhc3Mvb2JqZWN0LlxuICAgIC8vIFJlY3Vyc2UsIGFuZCBleHRlbmQgd2l0aCB0aGUgbWl4aW4ncyBiYXNlIGZpcnN0LlxuICAgIGJhc2UgPSBjb21wb3NlKGJhc2UsIG1peGluQmFzZSk7XG4gIH1cblxuICAvLyBDcmVhdGUgdGhlIGV4dGVuZGVkIG9iamVjdCB3ZSdyZSBnb2luZyB0byByZXR1cm4gYXMgYSByZXN1bHQuXG4gIGxldCBiYXNlSXNDbGFzcyA9IGlzQ2xhc3MoYmFzZSk7XG4gIGxldCByZXN1bHQgPSBiYXNlSXNDbGFzcyA/XG4gICAgY3JlYXRlU3ViY2xhc3MoYmFzZSkgOlxuICAgIE9iamVjdC5jcmVhdGUoYmFzZSk7XG5cbiAgLy8gQ2hlY2sgdG8gbWFrZSBzdXJlIHdlJ3JlIG5vdCBleHRlbmRpbmcgdGhlIGJhc2Ugd2l0aCBhIHByb3RvdHlwZSB0aGF0IHdhc1xuICAvLyBhbHJlYWR5IGNvbXBvc2VkIGludG8gdGhlIG9iamVjdCdzIHByb3RvdHlwZSBjaGFpbi5cbiAgbGV0IGJhc2VQcm90b3R5cGUgPSBiYXNlSXNDbGFzcyA/IGJhc2UucHJvdG90eXBlIDogYmFzZTtcbiAgbGV0IG1peGluUHJvdG90eXBlID0gbWl4aW5Jc0NsYXNzID8gbWl4aW4ucHJvdG90eXBlIDogbWl4aW47XG4gIGlmIChvYmplY3RIYXNQcm90b3R5cGUoYmFzZVByb3RvdHlwZSwgbWl4aW5Qcm90b3R5cGUpXG4gICAgICB8fCBvYmplY3RIYXNNaXhpbihiYXNlUHJvdG90eXBlLCBtaXhpbikpIHtcbiAgICAvLyBTa2lwIHRoaXMgbWl4aW4sIHJldHVybiByZXN1bHQgYXMgaXMuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIFRoZSBcInRhcmdldFwiIGhlcmUgaXMgdGhlIHRhcmdldCBvZiBvdXIgcHJvcGVydHkvbWV0aG9kIGNvbXBvc2l0aW9uIHJ1bGVzLlxuICBsZXQgdGFyZ2V0O1xuICBpZiAoYmFzZUlzQ2xhc3MgJiYgbWl4aW5Jc0NsYXNzKSB7XG4gICAgLy8gRXh0ZW5kaW5nIGNsYXNzIHdpdGggY2xhc3M6IGNvcHkgc3RhdGljIG1lbWJlcnMsIHRoZW4gcHJvdG90eXBlIG1lbWJlcnMuXG4gICAgY29weU93blByb3BlcnRpZXMobWl4aW4sIHJlc3VsdCwgTk9OX01JWEFCTEVfRlVOQ1RJT05fUFJPUEVSVElFUyk7XG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4ucHJvdG90eXBlLCByZXN1bHQucHJvdG90eXBlLCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyk7XG4gIH0gZWxzZSBpZiAoIWJhc2VJc0NsYXNzICYmIG1peGluSXNDbGFzcykge1xuICAgIC8vIEV4dGVuZGluZyBwbGFpbiBvYmplY3Qgd2l0aCBjbGFzczogY29weSBwcm90b3R5cGUgbWV0aG9kcyB0byByZXN1bHQuXG4gICAgdGFyZ2V0ID0gY29weU93blByb3BlcnRpZXMobWl4aW4ucHJvdG90eXBlLCByZXN1bHQsIE5PTl9NSVhBQkxFX0ZVTkNUSU9OX1BST1BFUlRJRVMpO1xuICB9IGVsc2UgaWYgKGJhc2VJc0NsYXNzICYmICFtaXhpbklzQ2xhc3MpIHtcbiAgICAvLyBFeHRlbmRpbmcgY2xhc3Mgd2l0aCBwbGFpbiBvYmplY3Q6IGNvcHkgbWl4aW4gdG8gcmVzdWx0IHByb3RvdHlwZS5cbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbiwgcmVzdWx0LnByb3RvdHlwZSwgTk9OX01JWEFCTEVfT0JKRUNUX1BST1BFUlRJRVMpO1xuICB9IGVsc2Uge1xuICAgIC8vIEV4dGVuZGluZyBwbGFpbiBvYmplY3Qgd2l0aCBwbGFpbiBvYmplY3Q6IGNvcHkgZm9ybWVyIHRvIGxhdHRlci5cbiAgICB0YXJnZXQgPSBjb3B5T3duUHJvcGVydGllcyhtaXhpbiwgcmVzdWx0LCBOT05fTUlYQUJMRV9PQkpFQ1RfUFJPUEVSVElFUyk7XG4gIH1cblxuICBpZiAobWl4aW4ubmFtZSkge1xuICAgIC8vIFVzZSB0aGUgbWl4aW4ncyBuYW1lICh1c3VhbGx5IHRoZSBuYW1lIG9mIGEgY2xhc3MnIGNvbnN0cnVjdG9yKSB0b1xuICAgIC8vIHNhdmUgYSByZWZlcmVuY2UgYmFjayB0byB0aGUgdGlwIG9mIHRoZSBuZXdseS1leHRlbmRlZCBwcm90b3R5cGUgY2hhaW4uXG4gICAgLy8gU2VlIG5vdGVzIGF0IENvbXBvc2FibGUncyBcInByb3RvdHlwZXNcIiBwcm9wZXJ0eS5cbiAgICB0YXJnZXQucHJvdG90eXBlcyA9IHt9O1xuICAgIHRhcmdldC5wcm90b3R5cGVzW21peGluLm5hbWVdID0gdGFyZ2V0O1xuXG4gICAgLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgc3VwZXJjbGFzcy9zdXBlci1vYmplY3QuIFNlZSB0aGUgY29tbWVudHMgb25cbiAgICAvLyBDb21wb3NhYmxlJ3MgXCJzdXBlclwiIHByb3BlcnR5LlxuICAgIHRhcmdldC5zdXBlciA9IGJhc2VJc0NsYXNzID8gYmFzZS5wcm90b3R5cGUgOiBiYXNlO1xuICB9XG5cbiAgLy8gS2VlcCB0cmFjayBvZiB0aGUgbWl4aW4gdGhhdCB3YXMgY29tcG9zZWQgaW4gYXQgdGhpcyBwb2ludC5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgT1JJR0lOQUxfTUlYSU5fU1lNQk9MLCB7XG4gICAgdmFsdWU6IG1peGluXG4gIH0pO1xuXG4gIC8vIEFwcGx5IHRoZSBjb21wb3NpdGlvbiBydWxlcyBpbiBlZmZlY3QgYXQgdGhlIHRhcmdldC5cbiAgYXBwbHlDb21wb3NpdGlvblJ1bGVzKHRhcmdldCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG4vKlxuICogUmV0dXJuIGEgbmV3IHN1YmNsYXNzIG9mIHRoZSBnaXZlbiBiYXNlIGNsYXNzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVTdWJjbGFzcyhiYXNlKSB7XG4gIC8vIE9uY2UgV2ViS2l0IHN1cHBvcnRzIEhUTUxFbGVtZW50IGFzIGEgcmVhbCBjbGFzcywgd2UgY2FuIGp1c3Qgc2F5OlxuICAvL1xuICAvLyAgIGNsYXNzIHN1YmNsYXNzIGV4dGVuZHMgYmFzZSB7fVxuICAvL1xuICAvLyBIb3dldmVyLCB1bnRpbCB0aGF0J3MgcmVzb2x2ZWQsIHdlIGp1c3QgY29uc3RydWN0IHRoZSBjbGFzcyBvdXJzZWx2ZXMuXG4gIGZ1bmN0aW9uIHN1YmNsYXNzKCkge307XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJjbGFzcywgYmFzZSk7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJjbGFzcy5wcm90b3R5cGUsIGJhc2UucHJvdG90eXBlKTtcbiAgcmV0dXJuIHN1YmNsYXNzO1xufVxuXG5cbi8qXG4gKiBFeGFtaW5lIHRoZSBkZXNjcmlwdG9yIHRvIGRldGVybWluZSB3aGljaCBydWxlIGtleSBhcHBsaWVzLlxuICovXG5mdW5jdGlvbiBnZXRHZW5lcmFsRGVzY3JpcHRvcktleShkZXNjcmlwdG9yKSB7XG4gIGlmICh0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIE1ldGhvZFxuICAgIHJldHVybiAnX19tZXRob2RfXyc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlc2NyaXB0b3IuZ2V0ID09PSAnZnVuY3Rpb24nXG4gICAgICB8fCB0eXBlb2YgZGVzY3JpcHRvci5zZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBQcm9wZXJ0eSB3aXRoIGdldHRlciBhbmQvb3Igc2V0dGVyXG4gICAgcmV0dXJuICdfX3Byb3BlcnR5X18nO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5cbi8qXG4gKiBSZXR1cm4gdHJ1ZSBpZiBjIGlzIGEgSmF2YVNjcmlwdCBjbGFzcy5cbiAqXG4gKiBXZSB1c2UgdGhpcyB0ZXN0IGJlY2F1c2UsIG9uIFdlYktpdCwgY2xhc3NlcyBsaWtlIEhUTUxFbGVtZW50IGFyZSBzcGVjaWFsLFxuICogYW5kIGFyZSBub3QgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uLiBUbyBoYW5kbGUgdGhhdCBjYXNlLCB3ZSB1c2UgYSBsb29zZXJcbiAqIGRlZmluaXRpb246IGFuIG9iamVjdCBpcyBhIGNsYXNzIGlmIGl0IGhhcyBhIHByb3RvdHlwZSwgYW5kIHRoYXQgcHJvdG90eXBlXG4gKiBoYXMgYSBjb25zdHJ1Y3RvciB0aGF0IGlzIHRoZSBvcmlnaW5hbCBvYmplY3QuIFRoaXMgY29uZGl0aW9uIGhvbGRzIHRydWUgZXZlblxuICogZm9yIEhUTUxFbGVtZW50IG9uIFdlYktpdC5cbiAqL1xuZnVuY3Rpb24gaXNDbGFzcyhjKSB7XG4gIHJldHVybiB0eXBlb2YgYyA9PT0gJ2Z1bmN0aW9uJyB8fCAgICAgICAgICAgICAgICAgICAvLyBTdGFuZGFyZFxuICAgICAgKGMucHJvdG90eXBlICYmIGMucHJvdG90eXBlLmNvbnN0cnVjdG9yID09PSBjKTsgLy8gSFRNTEVsZW1lbnQgaW4gV2ViS2l0XG59XG5cblxuLypcbiAqIFJldHVybiB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgZWl0aGVyIGhhcyB0aGUgZ2l2ZW4gcHJvdG90eXBlIG9uIGl0c1xuICogY2hhaW4uXG4gKi9cbmZ1bmN0aW9uIG9iamVjdEhhc1Byb3RvdHlwZShvYmosIHByb3RvdHlwZSkge1xuICBpZiAocHJvdG90eXBlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAvLyBUaGUgcHJvdG90eXBlIGlzIGEgcGxhaW4gb2JqZWN0LlxuICAgIC8vIE9ubHkgY2FzZSB0byBkZWZlbmQgYWdhaW5zdCBpcyBzb21lb25lIHRyeWluZyB0byBtaXhpbiBPYmplY3QgaXRzZWxmLlxuICAgIHJldHVybiAocHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlKTtcbiAgfVxuICBpZiAob2JqID09PSBwcm90b3R5cGUgfHwgb2JqIGluc3RhbmNlb2YgcHJvdG90eXBlLmNvbnN0cnVjdG9yKSB7XG4gICAgLy8gVGhlIHByb3RvdHlwZSB3YXMgZm91bmQgYWxvbmcgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cblxuLypcbiAqIFJldHVybiB0cnVlIGlmIHRoZSBnaXZlbiBtaXhpbiB3YXMgdXNlZCB0byBjcmVhdGUgYW55IG9mIHRoZSBwcm90b3R5cGVzIG9uXG4gKiBvbiB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluLlxuICovXG5mdW5jdGlvbiBvYmplY3RIYXNNaXhpbihvYmosIG1peGluKSB7XG4gIGlmICghb2JqKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIE9SSUdJTkFMX01JWElOX1NZTUJPTCk7XG4gIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWUgPT09IG1peGluKSB7XG4gICAgLy8gVGhlIGdpdmVuIG1peGluIHdhcywgaW4gZmFjdCwgY29tcG9zZWQgaW50byB0aGlzIHByb3RvdHlwZSBjaGFpbi5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gb2JqZWN0SGFzTWl4aW4oT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaiksIG1peGluKTtcbn1cbiIsIi8qKlxuICogU3RhbmRhcmQgY29tcG9zaXRpb24gcnVsZXNcbiAqL1xuXG4vKlxuICogVGFrZSB0d28gZnVuY3Rpb25zIGFuZCByZXR1cm4gYSBuZXcgY29tcG9zZWQgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGJvdGguXG4gKiBUaGUgY29tcG9zZWQgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgc2Vjb25kIGZ1bmN0aW9uLlxuICogVGhpcyBpcyBub3QgYSBydWxlLCBidXQgYSBoZWxwZXIgdXNlZCBieSBydWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VGdW5jdGlvbihmdW5jdGlvbjEsIGZ1bmN0aW9uMikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24xLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5cbi8qXG4gKiBDb21iaW5hdG9yIHRoYXQgc2V0cyB0aGUgcHJvdG90eXBlIG9mIGEgbWl4aW4gcHJvcGVydHkgdmFsdWUgdG8gYmUgdGhlXG4gKiBjb3JyZXNwb25kaW5nIHZhbHVlIG9uIHRoZSBiYXNlLiBUaGlzIGVmZmVjdGl2ZWx5IGRvZXMgYSBzaGFsbG93IG1lcmdlIG9mXG4gKiBvZiB0aGUgcHJvcGVydGllcywgd2l0aG91dCBjb3B5aW5nIGFueSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluUHJvdG90eXBlcyh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5WYWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpO1xuICBsZXQgYmFzZVZhbHVlID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihtaXhpblZhbHVlLCBiYXNlVmFsdWUpO1xufVxuXG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY29tcGxldGUgYSBwcm9wZXJ0eSBkZWZpbml0aW9uIGZvciBhIG1peGluLlxuICpcbiAqIERlZmF1bHQgSmF2YVNjcmlwdCBiZWhhdmlvciBpcyB0aGF0IGEgc3ViY2xhc3MgdGhhdCBkZWZpbmVzIGEgZ2V0dGVyIGJ1dCBub3RcbiAqIGEgc2V0dGVyIHdpbGwgbmV2ZXIgaGF2ZSB0aGUgYmFzZSBjbGFzcycgc2V0dGVyIGludm9rZWQuIFNpbWlsYXJseSwgYVxuICogc3ViY2xhc3MgdGhhdCBkZWZpbmVzIGEgc2V0dGVyIGJ1dCBub3QgYSBnZXR0ZXIgd2lsbCBuZXZlciBoYXZlIHRoZSBiYXNlXG4gKiBjbGFzcycgZ2V0dGVyIGludm9rZWQuXG4gKlxuICogRm9yIG1peGlucywgd2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBiZSB0aGF0LCBpZiBhIG1peGluIG9ubHkgZGVmaW5lc1xuICogYSBnZXR0ZXIsIGJ1dCB0aGUgYmFzZSBjbGFzcyBkZWZpbmVzIGEgc2V0dGVyLCB3ZSB3YW50IHRoZSBtaXhpbiB0byBhY3F1aXJlXG4gKiBhIGRlZmF1bHQgc2V0dGVyIHRoYW4gaW52b2tlcyB0aGUgYmFzZSBzZXR0ZXIuIExpa2V3aXNlLCB3ZSB3YW50IHRvIGRlZmluZVxuICogYSBkZWZhdWx0IGdldHRlciBpZiBub25lIGlzIHN1cHBsaWVkLlxuICpcbiAqIFRvIGNhcnJ5IHRoYXQgb3V0LCB0aGlzIGhlbHBlciBmdW5jdGlvbiByb3VuZHMgb3V0IGEgcHJvcGVydHkgZGVmaW5pdGlvbiB0b1xuICogZW5zdXJlIGl0IGhhcyBhIGRlZmF1bHQgZ2V0dGVyIG9yIHNldHRlciBpZiBpdCBuZWVkcyBvbmUuXG4gKi9cbmZ1bmN0aW9uIGNvbXBsZXRlUHJvcGVydHlEZWZpbml0aW9uKGRlc2NyaXB0b3IsIGJhc2VEZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjcmlwdG9yLmdldCAmJiAhZGVzY3JpcHRvci5zZXQgJiYgYmFzZURlc2NyaXB0b3Iuc2V0KSB7XG4gICAgLy8gTWl4aW4gaGFzIGdldHRlciBidXQgbmVlZHMgYSBkZWZhdWx0IHNldHRlci5cbiAgICBsZXQgYmFzZVNldHRlciA9IGJhc2VEZXNjcmlwdG9yLnNldDtcbiAgICBkZXNjcmlwdG9yLnNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBiYXNlU2V0dGVyLmNhbGwodGhpcywgdmFsdWUpO1xuICAgIH07XG4gIH1cbiAgaWYgKGRlc2NyaXB0b3Iuc2V0ICYmICFkZXNjcmlwdG9yLmdldCAmJiBiYXNlRGVzY3JpcHRvci5nZXQpIHtcbiAgICAvLyBNaXhpbiBoYXMgc2V0dGVyIGJ1dCBuZWVkcyBhIGRlZmF1bHQgZ2V0dGVyLlxuICAgIGxldCBiYXNlR2V0dGVyID0gYmFzZURlc2NyaXB0b3IuZ2V0O1xuICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmFzZUdldHRlci5jYWxsKHRoaXMpO1xuICAgIH07XG4gIH1cbn1cblxuXG4vKlxuICogUGVyZm9ybSBhIGRlZXAgbWVyZ2Ugb2YgYSBtaXhpbiBwcm9wZXJ0eSBvbiB0b3Agb2YgYSBiYXNlIHByb3BlcnR5LlxuICovXG4vLyBleHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4vLyAgIGxldCBtaXhpblZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbi8vICAgbGV0IGJhc2VWYWx1ZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpW2tleV0udmFsdWU7XG4vLyAgIGRlc2NyaXB0b3IudmFsdWUgPSAnbWVyZ2VkJzsgLy8gbWVyZ2UoYmFzZVZhbHVlLCBtaXhpblZhbHVlKTtcbi8vIH1cblxuLypcbiAqIEhlbHBlciB0byByZXR1cm4gdGhlIGJhc2UgZGVzY3JpcHRvciBmb3IgdGhlIGluZGljYXRlZCBrZXkuIFRoaXMgaXMgdXNlZCB0b1xuICogZmluZCB0aGUgc3BlY2lmaWMgaW1wbGVtZW50YXRpb24gdGhhdCB3b3VsZCBvdGhlcndpc2UgYmUgb3ZlcnJpZGRlbiBieSB0aGVcbiAqIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcbiAgbGV0IGJhc2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgcmV0dXJuIGdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpO1xufVxuXG5cbi8qXG4gKiBMaWtlIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoKSwgYnV0IHdhbGtzIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gKiBUaGlzIGlzIG5lZWRlZCBieSBjb21wb3NpdGlvbiBydWxlcywgd2hpY2ggdXN1YWxseSBzdGFydCBvdXQgYnkgZ2V0dGluZ1xuICogdGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYSBtZW1iZXIgdGhleSdyZSBjb21wb3NpbmcuXG4gKiBUaGlzIGlzIG5vdCBhIHJ1bGUsIGJ1dCBhIGhlbHBlciB1c2VkIGJ5IHJ1bGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSkge1xuICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfSBlbHNlIHtcbiAgICBsZXQgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgLy8gQ2hlY2tpbmcgZm9yIFwibmFtZSBpbiBwcm90b3R5cGVcIiBsZXRzIHVzIGtub3cgd2hldGhlciB3ZSBzaG91bGQgYm90aGVyXG4gICAgLy8gd2Fsa2luZyB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIGlmIChwcm90b3R5cGUgJiYgbmFtZSBpbiBwcm90b3R5cGUpIHtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBuYW1lKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gTm90IGZvdW5kXG59XG5cblxuLypcbiAqIENvbWJpbmF0b3IgdGhhdCBjYXVzZXMgYSBtaXhpbiBtZXRob2QgdG8gb3ZlcnJpZGUgaXRzIGJhc2UgaW1wbGVtZW50YXRpb24uXG4gKiBTaW5jZSB0aGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBwcm90b3R5cGUgY2hhaW4sIHRoaXMgaXMgYSBuby1vcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG92ZXJyaWRlKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7fVxuXG5cbi8qXG4gKiBDb21wb3NlIG1ldGhvZHMsIGludm9raW5nIGJhc2UgaW1wbGVtZW50YXRpb24gZmlyc3QuIElmIGl0IHJldHVybnMgYVxuICogdHJ1dGh5IHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZCBpbW1lZGlhdGVseS4gT3RoZXJ3aXNlLCB0aGUgbWl4aW5cbiAqIGltcGxlbWVudGF0aW9uJ3MgcmVzdWx0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyQmFzZVJlc3VsdCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5JbXBsZW1lbnRhdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VJbXBsZW1lbnRhdGlvbiA9IGJhc2VEZXNjcmlwdG9yLnZhbHVlO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGJhc2VJbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHx8IG1peGluSW1wbGVtZW50YXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuXG4vKlxuICogTGlrZSBwcmVmZXJCYXNlUmVzdWx0LCBidXQgZm9yIGdldHRlci9zZXR0ZXJzLiBUaGUgYmFzZSBnZXR0ZXIgaXMgaW52b2tlZFxuICogZmlyc3QuIElmIGl0IHJldHVybnMgYSB0cnV0aHkgcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIHRoZSBtaXhpblxuICogZ2V0dGVyJ3MgcmVzdWx0IGlzIHJldHVybmVkLiBTZXR0ZXIgaXMgaW52b2tlZCBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyQmFzZUdldHRlcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5HZXR0ZXIgPSBkZXNjcmlwdG9yLmdldDtcbiAgbGV0IG1peGluU2V0dGVyID0gZGVzY3JpcHRvci5zZXQ7XG4gIGxldCBiYXNlRGVzY3JpcHRvciA9IGdldEJhc2VEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgbGV0IGJhc2VHZXR0ZXIgPSBiYXNlRGVzY3JpcHRvci5nZXQ7XG4gIGxldCBiYXNlU2V0dGVyID0gYmFzZURlc2NyaXB0b3Iuc2V0O1xuICBpZiAobWl4aW5HZXR0ZXIgJiYgYmFzZUdldHRlcikge1xuICAgIC8vIENvbXBvc2UgZ2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJhc2VHZXR0ZXIuYXBwbHkodGhpcykgfHwgbWl4aW5HZXR0ZXIuYXBwbHkodGhpcyk7XG4gICAgfTtcbiAgfVxuICBpZiAobWl4aW5TZXR0ZXIgJiYgYmFzZVNldHRlcikge1xuICAgIC8vIENvbXBvc2Ugc2V0dGVycy5cbiAgICBkZXNjcmlwdG9yLnNldCA9IGNvbXBvc2VGdW5jdGlvbihiYXNlU2V0dGVyLCBtaXhpblNldHRlcik7XG4gIH1cbiAgY29tcGxldGVQcm9wZXJ0eURlZmluaXRpb24oZGVzY3JpcHRvciwgYmFzZURlc2NyaXB0b3IpO1xufVxuXG5cbi8qXG4gKiBMaWtlIHByZWZlck1peGluUmVzdWx0LCBidXQgZm9yIGdldHRlci9zZXR0ZXJzLiBUaGUgbWl4aW4gZ2V0dGVyIGlzIGludm9rZWRcbiAqIGZpcnN0LiBJZiBpdCByZXR1cm5zIGEgdHJ1dGh5IHJlc3VsdCwgdGhhdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlLCB0aGUgYmFzZVxuICogZ2V0dGVyJ3MgcmVzdWx0IGlzIHJldHVybmVkLiBTZXR0ZXIgaXMgc3RpbGwgaW52b2tlZCBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZmVyTWl4aW5HZXR0ZXIodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgbGV0IG1peGluR2V0dGVyID0gZGVzY3JpcHRvci5nZXQ7XG4gIGxldCBtaXhpblNldHRlciA9IGRlc2NyaXB0b3Iuc2V0O1xuICBsZXQgYmFzZURlc2NyaXB0b3IgPSBnZXRCYXNlRGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIGxldCBiYXNlR2V0dGVyID0gYmFzZURlc2NyaXB0b3IuZ2V0O1xuICBsZXQgYmFzZVNldHRlciA9IGJhc2VEZXNjcmlwdG9yLnNldDtcbiAgaWYgKG1peGluR2V0dGVyICYmIGJhc2VHZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIGdldHRlcnMuXG4gICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtaXhpbkdldHRlci5hcHBseSh0aGlzKSB8fCBiYXNlR2V0dGVyLmFwcGx5KHRoaXMpO1xuICAgIH07XG4gIH1cbiAgaWYgKG1peGluU2V0dGVyICYmIGJhc2VTZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIHNldHRlcnMuXG4gICAgZGVzY3JpcHRvci5zZXQgPSBjb21wb3NlRnVuY3Rpb24oYmFzZVNldHRlciwgbWl4aW5TZXR0ZXIpO1xuICB9XG4gIGNvbXBsZXRlUHJvcGVydHlEZWZpbml0aW9uKGRlc2NyaXB0b3IsIGJhc2VEZXNjcmlwdG9yKTtcbn1cblxuXG4vKlxuICogQ29tcG9zZSBtZXRob2RzLCBpbnZva2luZyBtaXhpbiBpbXBsZW1lbnRhdGlvbiBmaXJzdC4gSWYgaXQgcmV0dXJucyBhIHRydXRoeVxuICogcmVzdWx0LCB0aGF0IGlzIHJldHVybmVkIGltbWVkaWF0ZWx5LiBPdGhlcndpc2UsIHRoZSBiYXNlIGltcGxlbWVudGF0aW9uJ3NcbiAqIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZlck1peGluUmVzdWx0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbWl4aW5JbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHx8IGJhc2VJbXBsZW1lbnRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cblxuLypcbiAqIERlZmF1bHQgcnVsZSBmb3IgY29tcG9zaW5nIG1ldGhvZHM6IGludm9rZSBiYXNlIGZpcnN0LCB0aGVuIG1peGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZU1ldGhvZEZpcnN0KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGxldCBtaXhpbkltcGxlbWVudGF0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZUltcGxlbWVudGF0aW9uID0gYmFzZURlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBjb21wb3NlRnVuY3Rpb24oYmFzZUltcGxlbWVudGF0aW9uLCBtaXhpbkltcGxlbWVudGF0aW9uKTtcbn1cblxuXG4vKlxuICogRGVmYXVsdCBydWxlIGZvciBjb21wb3NpbmcgcHJvcGVydGllcy5cbiAqIFdlIG9ubHkgY29tcG9zZSBzZXR0ZXJzLCB3aGljaCBpbnZva2UgYmFzZSBmaXJzdCwgdGhlbiBtaXhpbi5cbiAqIEEgZGVmaW5lZCBtaXhpbiBnZXR0ZXIgb3ZlcnJpZGVzIGEgYmFzZSBnZXR0ZXIuXG4gKiBOb3RlIHRoYXQsIGJlY2F1c2Ugb2YgdGhlIHdheSBwcm9wZXJ0eSBkZXNjcmlwdG9ycyB3b3JrLCBpZiB0aGUgbWl4aW4gb25seVxuICogZGVmaW5lcyBhIHNldHRlciwgYnV0IG5vdCBhIGdldHRlciwgd2UgaGF2ZSB0byBzdXBwbHkgYSBkZWZhdWx0IGdldHRlciB0aGF0XG4gKiBpbnZva2VzIHRoZSBiYXNlIGdldHRlci4gU2ltaWxhcmx5LCBpZiB0aGUgbWl4aW4ganVzdCBkZWZpbmVzIGEgZ2V0dGVyLFxuICogd2UgaGF2ZSB0byBzdXBwbHkgYSBkZWZhdWx0IHNldHRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJhc2VTZXR0ZXJGaXJzdCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICBsZXQgbWl4aW5TZXR0ZXIgPSBkZXNjcmlwdG9yLnNldDtcbiAgbGV0IGJhc2VEZXNjcmlwdG9yID0gZ2V0QmFzZURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICBsZXQgYmFzZVNldHRlciA9IGJhc2VEZXNjcmlwdG9yLnNldDtcbiAgaWYgKG1peGluU2V0dGVyICYmIGJhc2VTZXR0ZXIpIHtcbiAgICAvLyBDb21wb3NlIHNldHRlcnMuXG4gICAgZGVzY3JpcHRvci5zZXQgPSBjb21wb3NlRnVuY3Rpb24oYmFzZVNldHRlciwgbWl4aW5TZXR0ZXIpO1xuICB9XG4gIGNvbXBsZXRlUHJvcGVydHlEZWZpbml0aW9uKGRlc2NyaXB0b3IsIGJhc2VEZXNjcmlwdG9yKTtcbn1cbiIsIi8qXG4gKiBNYXJzaGFsbCBhdHRyaWJ1dGVzIHRvIHByb3BlcnRpZXMgKGFuZCBldmVudHVhbGx5IHZpY2UgdmVyc2EpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJpYnV0ZU1hcnNoYWxsaW5nIHtcblxuICAvKlxuICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIC8vIElmIHRoZSBhdHRyaWJ1dGUgbmFtZSBjb3JyZXNwb25kcyB0byBhIHByb3BlcnR5IG5hbWUsIHRoZW4gc2V0IHRoYXRcbiAgICAvLyBwcm9wZXJ0eS4gSWdub3JlIGNoYW5nZXMgaW4gc3RhbmRhcmQgSFRNTEVsZW1lbnQgcHJvcGVydGllcy5cbiAgICBsZXQgcHJvcGVydHlOYW1lID0gYXR0cmlidXRlVG9Qcm9wZXJ0eU5hbWUobmFtZSk7XG4gICAgaWYgKHByb3BlcnR5TmFtZSBpbiB0aGlzICYmICEocHJvcGVydHlOYW1lIGluIEhUTUxFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5hdHRyaWJ1dGVzLCBhdHRyaWJ1dGUgPT4ge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlLm5hbWUsIHVuZGVmaW5lZCwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cblxuLy8gQ29udmVydCBjYW1lbCBjYXNlIGZvb0JhciBuYW1lIHRvIGh5cGhlbmF0ZWQgZm9vLWJhci5cbmZ1bmN0aW9uIGF0dHJpYnV0ZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZU5hbWUpIHtcbiAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZU5hbWUucmVwbGFjZSgvLShbYS16XSkvZywgbSA9PiBtWzFdLnRvVXBwZXJDYXNlKCkpO1xuICByZXR1cm4gcHJvcGVydHlOYW1lO1xufVxuXG4vLyBDb252ZXJ0IGh5cGhlbmF0ZWQgZm9vLWJhciBuYW1lIHRvIGNhbWVsIGNhc2UgZm9vQmFyLlxuZnVuY3Rpb24gcHJvcGVydHlUb0F0dHJpYnV0ZU5hbWUocHJvcGVydHlOYW1lKSB7XG4gIGxldCBhdHRyaWJ1dGVOYW1lID0gcHJvcGVydHlOYW1lLnJlcGxhY2UoLyhbYS16XVtBLVpdKS9nLCBnID0+IGdbMF0gKyAnLScgKyBnWzFdLnRvTG93ZXJDYXNlKCkpO1xuICByZXR1cm4gYXR0cmlidXRlTmFtZTtcbn1cbiIsIi8qXG4gKiBQb2x5bWVyLXN0eWxlIGF1dG9tYXRpYyBub2RlIGZpbmRpbmcuXG4gKiBTZWUgaHR0cHM6Ly93d3cucG9seW1lci1wcm9qZWN0Lm9yZy8xLjAvZG9jcy9kZXZndWlkZS9sb2NhbC1kb20uaHRtbCNub2RlLWZpbmRpbmcuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b21hdGljTm9kZUZpbmRpbmcge1xuXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5zaGFkb3dSb290KSB7XG4gICAgICB0aGlzLiQgPSB7fTtcbiAgICAgIHZhciBub2Rlc1dpdGhJZHMgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKG5vZGVzV2l0aElkcywgbm9kZSA9PiB7XG4gICAgICAgIHZhciBpZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICB0aGlzLiRbaWRdID0gbm9kZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCIvKlxuICogQSBjb21wb3NhYmxlIEhUTUwgZWxlbWVudC5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIHByb3ZpZGVkIGp1c3QgYXMgYSBjb252ZW5pZW5jZS4gT25lIGNvdWxkIGFsc28gc3RhcnQgd2l0aFxuICogSFRNTEVsZW1lbnQgYXQgdGhlIHRvcCBsZXZlbCwgYW5kIGFkZCBleHRlbnNpYmlsaXR5IGJ5IG1peGluZyBpbiBDb21wb3NhYmxlLlxuICovXG5cbmltcG9ydCBDb21wb3NhYmxlIGZyb20gJ0NvbXBvc2FibGUvc3JjL0NvbXBvc2FibGUnO1xuXG4vLyBXZSB1c2UgRXh0ZW5zaWJsZSB0byBhZGQgaXRzIG93biBtZW1iZXJzIHRvIGEgSFRNTEVsZW1lbnQgc3ViY2xhc3MuXG4vLyBUaGUgcmVzdWx0IGlzIGFuIEhUTUxFbGVtZW50IHdpdGggLmV4dGVuZCgpIGFuZCBzdXBlcigpIHN1cHBvcnQuXG5sZXQgQ29tcG9zYWJsZUVsZW1lbnQgPSBDb21wb3NhYmxlLmNvbXBvc2UuY2FsbChIVE1MRWxlbWVudCwgQ29tcG9zYWJsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvc2FibGVFbGVtZW50O1xuIiwiLypcbiAqIEEgc2FtcGxlIGdlbmVyYWwtcHVycG9zZSBiYXNlIGNsYXNzIGZvciBkZWZpbmluZyBjdXN0b20gZWxlbWVudHMgdGhhdCBtaXhlc1xuICogaW4gc29tZSBjb21tb24gZmVhdHVyZXM6IHRlbXBsYXRlIHN0YW1waW5nIGludG8gYSBzaGFkb3cgcm9vdCwgYXV0b21hdGljIG5vZGVcbiAqIGZpbmRpbmcsIGFuZCBtYXJzaGFsbGluZyBiZXR3ZWVuIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnRpZXMuXG4gKi9cblxuaW1wb3J0IENvbXBvc2FibGVFbGVtZW50IGZyb20gJy4vQ29tcG9zYWJsZUVsZW1lbnQnO1xuaW1wb3J0IFRlbXBsYXRlU3RhbXBpbmcgZnJvbSAnLi9UZW1wbGF0ZVN0YW1waW5nJztcbmltcG9ydCBBdXRvbWF0aWNOb2RlRmluZGluZyBmcm9tICcuL0F1dG9tYXRpY05vZGVGaW5kaW5nJztcbmltcG9ydCBBdHRyaWJ1dGVNYXJzaGFsbGluZyBmcm9tICcuL0F0dHJpYnV0ZU1hcnNoYWxsaW5nJztcblxuY2xhc3MgRWxlbWVudEJhc2UgZXh0ZW5kcyBDb21wb3NhYmxlRWxlbWVudCB7XG5cbiAgLyogRm9yIGRlYnVnZ2luZyAqL1xuICBsb2codGV4dCkge1xuICAgIGNvbnNvbGUubG9nKGAke3RoaXMubG9jYWxOYW1lfTogJHt0ZXh0fWApO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWxlbWVudEJhc2UgPSBFbGVtZW50QmFzZS5jb21wb3NlKFxuICBUZW1wbGF0ZVN0YW1waW5nLCAvLyBiZWZvcmUgbm9kZSBmaW5kaW5nLCBzbyBzaGFkb3cgcm9vdCBpcyBwb3B1bGF0ZWRcbiAgQXV0b21hdGljTm9kZUZpbmRpbmcsIC8vIGJlZm9yZSBtYXJzaGFsbGluZywgc28gbWFyc2hhbGxlZCBwcm9wZXJ0aWVzIGNhbiB1c2UgaXRcbiAgQXR0cmlidXRlTWFyc2hhbGxpbmdcbik7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnZWxlbWVudC1iYXNlJywgRWxlbWVudEJhc2UpO1xuIiwiLypcbiAqIEVsZW1lbnQgZXh0ZW5zaW9uIGZvciB0ZW1wbGF0ZSBzdGFtcGluZy4gSWYgYSBjb21wb25lbnQgZGVmaW5lcyBhIHRlbXBsYXRlXG4gKiBwcm9wZXJ0eSAoYXMgYSBzdHJpbmcgb3IgcmVmZXJlbmNpbmcgYSBIVE1MIHRlbXBsYXRlKSwgd2hlbiB0aGUgY29tcG9uZW50XG4gKiBjbGFzcyBpcyBpbnN0YW50aWF0ZWQsIGEgc2hhZG93IHJvb3Qgd2lsbCBiZSBjcmVhdGVkIG9uIHRoZSBpbnN0YW5jZSwgYW5kXG4gKiB0aGUgY29udGVudHMgb2YgdGhlIHRlbXBsYXRlIHdpbGwgYmUgY2xvbmVkIGludG8gdGhlIHNoYWRvdyByb290LlxuICpcbiAqIEZvciB0aGUgdGltZSBiZWluZywgdGhpcyBleHRlbnNpb24gcmV0YWlucyBzdXBwb3J0IGZvciBTaGFkb3cgRE9NIHYwLlxuICogVGhhdCB3aWxsIGV2ZW50dWFsbHkgYmUgZGVwcmVjYXRlZCBhcyBicm93c2VycyBpbXBsZW1lbnQgU2hhZG93IERPTSB2MS5cbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBsYXRlU3RhbXBpbmcge1xuXG4gIC8qXG4gICAqIElmIHRoZSBjb21wb25lbnQgZGVmaW5lcyBhIHRlbXBsYXRlLCBhIHNoYWRvdyByb290IHdpbGwgYmUgY3JlYXRlZCBvbiB0aGVcbiAgICogY29tcG9uZW50IGluc3RhbmNlLCBhbmQgdGhlIHRlbXBsYXRlIHN0YW1wZWQgaW50byBpdC5cbiAgICovXG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBVcGdyYWRlIHBsYWluIHN0cmluZyB0byByZWFsIHRlbXBsYXRlLlxuICAgICAgdGVtcGxhdGUgPSBjcmVhdGVUZW1wbGF0ZVdpdGhJbm5lckhUTUwodGVtcGxhdGUpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGUgJiYgVVNJTkdfU0hBRE9XX0RPTV9WMCkge1xuICAgICAgcG9seWZpbGxTbG90V2l0aENvbnRlbnQodGVtcGxhdGUpO1xuICAgIH1cbiAgICBpZiAod2luZG93LlNoYWRvd0RPTVBvbHlmaWxsKSB7XG4gICAgICBzaGltVGVtcGxhdGVTdHlsZXModGVtcGxhdGUsIHRoaXMubG9jYWxOYW1lKTtcbiAgICB9XG4gICAgLy8gVE9ETzogU2F2ZSB0aGUgcHJvY2Vzc2VkIHRlbXBsYXRlIHdpdGggdGhlIGNvbXBvbmVudCdzIGNsYXNzIHByb3RvdHlwZVxuICAgIC8vIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBwcm9jZXNzZWQgd2l0aCBldmVyeSBpbnN0YW50aWF0aW9uLlxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgLy8gdGhpcy5sb2coXCJjbG9uaW5nIHRlbXBsYXRlIGludG8gc2hhZG93IHJvb3RcIik7XG4gICAgICBsZXQgcm9vdCA9IFVTSU5HX1NIQURPV19ET01fVjAgP1xuICAgICAgICB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKSA6ICAgICAgICAgICAgIC8vIFNoYWRvdyBET00gdjBcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7ICAvLyBTaGFkb3cgRE9NIHYxXG4gICAgICBsZXQgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgcm9vdC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgfVxuICB9XG5cbn1cblxuXG4vLyBGZWF0dXJlIGRldGVjdGlvbiBmb3Igb2xkIFNoYWRvdyBET00gdjAuXG5jb25zdCBVU0lOR19TSEFET1dfRE9NX1YwID0gKHR5cGVvZiBIVE1MRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5cbi8vIENvbnZlcnQgYSBwbGFpbiBzdHJpbmcgb2YgSFRNTCBpbnRvIGEgcmVhbCB0ZW1wbGF0ZSBlbGVtZW50LlxuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVXaXRoSW5uZXJIVE1MKGlubmVySFRNTCkge1xuICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAvLyBSRVZJRVc6IElzIHRoZXJlIGFuIGVhc2llciB3YXkgdG8gZG8gdGhpcz9cbiAgLy8gV2UnZCBsaWtlIHRvIGp1c3Qgc2V0IGlubmVySFRNTCBvbiB0aGUgdGVtcGxhdGUgY29udGVudCwgYnV0IHNpbmNlIGl0J3NcbiAgLy8gYSBEb2N1bWVudEZyYWdtZW50LCB0aGF0IGRvZXNuJ3Qgd29yay5cbiAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICB3aGlsZSAoZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgIHRlbXBsYXRlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMF0pO1xuICB9XG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuLy8gUmVwbGFjZSBvY2N1cmVuY2VzIG9mIHYxIHNsb3QgZWxlbWVudHMgd2l0aCB2MCBjb250ZW50IGVsZW1lbnRzLlxuLy8gVGhpcyBkb2VzIG5vdCB5ZXQgbWFwIG5hbWVkIHNsb3RzIHRvIGNvbnRlbnQgc2VsZWN0IGNsYXVzZXMuXG5mdW5jdGlvbiBwb2x5ZmlsbFNsb3RXaXRoQ29udGVudCh0ZW1wbGF0ZSkge1xuICBbXS5mb3JFYWNoLmNhbGwodGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzbG90JyksIHNsb3RFbGVtZW50ID0+IHtcbiAgICBsZXQgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50Jyk7XG4gICAgc2xvdEVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29udGVudEVsZW1lbnQsIHNsb3RFbGVtZW50KTtcbiAgfSk7XG59XG5cbi8vIEludm9rZSBiYXNpYyBzdHlsZSBzaGltbWluZyB3aXRoIFNoYWRvd0NTUy5cbmZ1bmN0aW9uIHNoaW1UZW1wbGF0ZVN0eWxlcyh0ZW1wbGF0ZSwgdGFnKSB7XG4gIFdlYkNvbXBvbmVudHMuU2hhZG93Q1NTLnNoaW1TdHlsaW5nKHRlbXBsYXRlLmNvbnRlbnQsIHRhZyk7XG59XG4iXX0=
