module.exports = function override(config) {
    config.module.rules.push({
        test: /\.mjs$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: /node_modules/,
    });

    config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        { module: /@mediapipe\/tasks-vision/ },
    ];

    return config;
};  