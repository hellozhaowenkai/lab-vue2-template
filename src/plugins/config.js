import Vue from "vue";

function deepFreeze(object) {
  // Retrieve the property names defined on object.
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self.
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") deepFreeze(value);
  }

  // Freeze self.
  return Object.freeze(object);
}

Plugin.install = function (Vue, options) {
  Object.defineProperties(Vue.prototype, {
    $projectConfig: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: deepFreeze(__PROJECT_CONFIG__), // webpack.DefinePlugin
    },
  });
};

Vue.use(Plugin);

export default Plugin;
