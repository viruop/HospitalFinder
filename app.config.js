import "dotenv/config";

export default {
  expo: {
    name: "HospitalFinder",
    slug: "HospitalFinder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffe6e2",
    },
    androidStatusBar: {
      backgroundColor: "#fd907e",
      translucent: false,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.virajrai.HospitalFinder",
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      config: {
        googleMaps: {
          apiKey: process.env.GMAP_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffe6e2",
      },
      package: "com.virajrai.HospitalFinder",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "fd8a2755-4215-45fb-9517-37908576a732",
      },
    },
  },
};
