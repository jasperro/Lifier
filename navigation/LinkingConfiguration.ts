import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Overview: {
            screens: {
              Overview: "overview",
            },
          },
          Data: {
            screens: {
              Stats: "data/stats",
              Points: "data/points",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
