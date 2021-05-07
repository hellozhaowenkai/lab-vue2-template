function myTOMLParser() {
  function tomlParser(filePath) {
    const fs = require("fs");
    const toml = require("@ltd/j-toml");

    const tomlString = String(fs.readFileSync(filePath));
    return toml.parse(tomlString, 1.0, "\n");
  }

  return tomlParser;
}

function organizeSettings() {
  const fs = require("fs");
  const path = require("path");

  const tomlParser = myTOMLParser();

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

const settings = Object.freeze(organizeSettings());

// ECMAScript Modules
// export { settings as default };

// CommonJS Modules
module.exports = { settings };
