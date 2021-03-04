module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "react-native-paper/babel",
            "@babel/plugin-proposal-throw-expressions",
            [
                "module-resolver",
                {
                    alias: {
                        root: "./",
                        styled: "./components/Style",
                        model: "./model",
                    },
                },
            ],
        ],
    };
};
