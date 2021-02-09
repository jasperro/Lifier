import * as Linking from "expo-linking";

export default {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    Tasks: {
                        screens: {
                            Tasks: "tasks",
                        },
                    },
                    Dashboard: {
                        screens: {
                            Dashboard: "dashboard",
                        },
                    },
                    Skills: {
                        screens: {
                            SkillCategories: "skills",
                            SkillCategory: "skills/category/:categoryId",
                            Skill: "skills/skill/:categoryId/:skillId",
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
