const { withAndroidManifest } = require("@expo/config-plugins");
const path = require("path");
const fs = require("fs");

function getGoogleMapsApiKey(projectRoot) {
  const apiKeysFile = path.resolve(
    projectRoot,
    "android",
    "app",
    "src",
    "main",
    "res",
    "values",
    "api-keys.xml",
  );

  if (fs.existsSync(apiKeysFile)) {
    const content = fs.readFileSync(apiKeysFile, "utf8");
    const match = content.match(/<string name="GoogleMapsKey">(.*)<\/string>/);
    if (match && match[1]) {
      return match[1];
    }
  }

  console.warn(
    "Google Maps API key not found in api-keys.xml. Please ensure it exists and is not committed to version control.",
  );
  return null;
}

module.exports = function withGoogleMapsApiKey(config) {
  return withAndroidManifest(config, (config) => {
    const projectRoot = config.modRequest.projectRoot;
    const apiKey = getGoogleMapsApiKey(projectRoot);
    if (!apiKey) {
      throw new Error(
        "Google Maps API key is missing. Please add it to android/app/src/main/res/values/api-keys.xml.",
      );
    }

    if (
      config.modResults.manifest &&
      config.modResults.manifest.application &&
      Array.isArray(config.modResults.manifest.application)
    ) {
      const application = config.modResults.manifest.application.find(
        () => true,
      );

      if (!application["meta-data"]) {
        application["meta-data"] = [];
      }

      const existingMetaData = application["meta-data"].find(
        (meta) =>
          meta["$"]["android:name"] === "com.google.android.geo.API_KEY",
      );

      if (existingMetaData) {
        existingMetaData["$"]["android:value"] = apiKey;
      } else {
        application["meta-data"].push({
          $: {
            "android:name": "com.google.android.geo.API_KEY",
            "android:value": "hide-for-now-on-prebuild", //<API_KEY>
          },
        });
      }
    } else {
      throw new Error("Cannot find application tag in AndroidManifest.xml.");
    }

    return config;
  });
};
