const fs = require("fs");
const path = require("path");
const toml = require("@ltd/j-toml");

function myTomlParser() {
  function tomlParser(filePath) {
    const toml = require("@ltd/j-toml");

    const tomlString = String(fs.readFileSync(filePath, { encoding: "utf-8" }));
    return toml.parse(tomlString, 1.0, "\n", false, null);
  }

  return tomlParser;
}

function organizeSettings() {
  const tomlParser = myTomlParser();

  const configPath = path.resolve(__dirname);
  const mainSettings = tomlParser(path.join(configPath, "settings.toml"));

  mainSettings["sensitive-settings"] ||
    (mainSettings["sensitive-settings"] = {});
  const sensitiveSettings = mainSettings["sensitive-settings"];

  sensitiveSettings["enabled"] || (sensitiveSettings["enabled"] = false);
  if (!sensitiveSettings["enabled"]) return mainSettings;

  sensitiveSettings["includes"] || (sensitiveSettings["includes"] = []);
  for (const patch of sensitiveSettings["includes"]) {
    const patchNamespace = patch["namespace"] || "secrets";
    const patchFilename = patch["filename"] || "settings.private.toml";
    const patchPath = path.join(configPath, patchFilename);
    const patchSettings = fs.existsSync(patchPath) ? tomlParser(patchPath) : {};

    mainSettings[patchNamespace] || (mainSettings[patchNamespace] = {});
    Object.assign(mainSettings[patchNamespace], patchSettings);
  }

  return mainSettings;
}

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

const settings = deepFreeze(organizeSettings());

// ECMAScript Modules
// export { settings as default };

// CommonJS Modules
module.exports = settings;
