export const JS_DATA_TYPES = {
  // Primitive values
  NULL: Symbol("NULL"),
  UNDEFINED: Symbol("UNDEFINED"),
  BOOLEAN: Symbol("BOOLEAN"),
  NUMBER: Symbol("NUMBER"),
  BIGINT: Symbol("BIGINT"),
  STRING: Symbol("STRING"),
  SYMBOL: Symbol("SYMBOL"),
  // Objects
  ARRAY: Symbol("ARRAY"),
  SET: Symbol("SET"),
  MAP: Symbol("MAP"),
  FUNCTION: Symbol("FUNCTION"),
  CLASS: Symbol("CLASS"),
  DATE: Symbol("DATE"),
  ERROR: Symbol("ERROR"),
  ARGUMENTS: Symbol("ARGUMENTS"),
  REGEXP: Symbol("REGEXP"),
  OBJECT: Symbol("OBJECT"),
};

export function getBaseTypeOf(value) {
  // const typeName = getUnreliableTypeOf(value).toUpperCase();
  const typeName = getSpecificTypeOf(value).toUpperCase();

  if (
    [
      "ArrayBuffer",
      "DataView",
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "BigInt64Array",
      "BigUint64Array",
    ]
      .map((name) => name.toUpperCase())
      .includes(typeName)
  )
    return JS_DATA_TYPES.ARRAY;
  if (typeName === "WeakSet".toUpperCase()) return JS_DATA_TYPES.SET;
  if (typeName === "WeakMap".toUpperCase()) return JS_DATA_TYPES.MAP;

  return JS_DATA_TYPES[typeName] || JS_DATA_TYPES.OBJECT;
}

// See https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/tostring/
export function getUnreliableTypeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof/
export function getSpecificTypeOf(value) {
  if (value === null) {
    return "null";
  }

  const baseType = typeof value;

  if (!["object", "function"].includes(baseType)) {
    return baseType;
  }

  // Symbol.toStringTag often specifies the "display name" of the
  // object's class. It's used in Object.prototype.toString().
  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string") {
    return tag;
  }

  // If it's a function whose source code starts with the "class" keyword.
  if (
    baseType === "function" &&
    Function.prototype.toString.call(value).startsWith("class")
  ) {
    return "class";
  }

  // The name of the constructor; for example `Array`, `GeneratorFunction`,
  // `Number`, `String`, `Boolean` or `MyCustomClass`.
  const className = value.constructor.name;
  if (typeof className === "string" && className !== "") {
    return className;
  }

  // At this point there's no robust way to get the type of value,
  // so we use the base implementation.
  return baseType;
}

export function* createIterator(iterable) {
  switch (getBaseTypeOf(iterable)) {
    case JS_DATA_TYPES.NUMBER: {
      for (let i = 0; i < iterable; i++) {
        yield { index: i, key: i, value: i };
      }

      break;
    }

    case JS_DATA_TYPES.STRING: {
      let i = 0;
      for (const value of iterable) {
        yield { index: i, key: i, value };
        i++;
      }

      break;
    }

    case JS_DATA_TYPES.ARRAY: {
      for (const [index, item] of iterable.entries()) {
        yield { index, key: index, value: item };
      }

      break;
    }

    case JS_DATA_TYPES.SET: {
      let i = 0;
      for (const [key, value] of iterable.entries()) {
        yield { index: i, key, value };
        i++;
      }

      break;
    }

    case JS_DATA_TYPES.MAP: {
      let i = 0;
      for (const [key, value] of iterable) {
        yield { index: i, key, value };
        i++;
      }

      break;
    }

    case JS_DATA_TYPES.OBJECT: {
      let i = 0;
      for (const [key, value] of Object.entries(iterable)) {
        yield { index: i, key, value };
        i++;
      }

      break;
    }

    default: {
      break;
    }
  }
}

export function trailingSlash(stringLike) {
  return stringLike.endsWith("/") ? stringLike : stringLike + "/";
}

export function isEmptyString(stringLike) {
  if (getBaseTypeOf(stringLike) !== JS_DATA_TYPES.STRING) return false;

  return stringLike === "";
}

export function isEmptyArray(arrayLike) {
  if (getBaseTypeOf(arrayLike) !== JS_DATA_TYPES.ARRAY) return false;

  return arrayLike.length === 0;
}

export function isEmptyObject(objectLike) {
  if (getBaseTypeOf(objectLike) !== JS_DATA_TYPES.OBJECT) return false;

  return Object.getOwnPropertyNames(objectLike).length === 0;
}

export function isNull(objectLike) {
  return getBaseTypeOf(objectLike) === JS_DATA_TYPES.NULL;
}

export function isUndefined(objectLike) {
  return getBaseTypeOf(objectLike) === JS_DATA_TYPES.UNDEFINED;
}
