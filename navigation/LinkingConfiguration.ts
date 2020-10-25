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
                    Skills: {
                        screens: {
                            SkillCategories: "skills",
                            SkillCategory: "skills/category",
                            Skill: "skills/skill",
                        },
                    },
                    Data: {
                        screens: {
                            Stats: "data/stats",
                            Points: "data/points",
                        },
                    },
                    Settings: {
                        screens: {
                            Settings: "settings",
                        },
                    },
                },
            },
            NotFound: "*",
        },
    },
};
