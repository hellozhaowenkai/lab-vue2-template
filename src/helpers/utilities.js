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

export function getValueByKeyPath(
  objectLike,
  keyPath,
  defaultValue = undefined
) {
  const travel = (pattern) =>
    String.prototype.split
      .call(keyPath, pattern)
      .filter(Boolean)
      .reduce(
        (result, key) =>
          result !== null && result !== undefined ? result[key] : result,
        objectLike
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === objectLike ? defaultValue : result;
}

export function deepCopy(serializableObject, transferableKeys = []) {
  // return JSON.parse(JSON.stringify(serializableObject));

  return structuredClone(serializableObject, {
    transfer: transferableKeys.map((key) =>
      getValueByKeyPath(serializableObject, key)
    ),
  });
}

export function shallowCopy(objectLike) {
  // return { ...objectLike };

  return Object.create(objectLike);
}

export function getRandomUuid() {
  if (typeof crypto === "object") {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

    if (
      typeof crypto.getRandomValues === "function" &&
      typeof Uint8Array === "function"
    ) {
      const replacer = (c) => {
        const n = Number(c);
        return (
          n ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (n / 4)))
        ).toString(16);
      };

      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, replacer);
    }
  }

  let timestamp = new Date().getTime();
  let performanceNow =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  const replacer = (c) => {
    let random = Math.random() * 16;

    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performanceNow + random) % 16 | 0;
      performanceNow = Math.floor(performanceNow / 16);
    }

    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
  };

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, replacer);
}

export function getRandomFloat(a = 1, b = 0) {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
}

export function getRandomInt(a = 1, b = 0) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}
