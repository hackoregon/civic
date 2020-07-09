const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const preset = {
  presets: [
    [
      require.resolve("@babel/preset-env"),
      {
        modules: false
      }
    ],
    require.resolve("@babel/preset-react")
  ],
  plugins: [
    require.resolve("@babel/plugin-proposal-class-properties"),
    [
      require.resolve("@babel/plugin-proposal-object-rest-spread"),
      {
        useBuiltIns: true
      }
    ],
    require.resolve("@babel/plugin-syntax-dynamic-import"),
    require.resolve("@babel/plugin-transform-runtime")
  ]
};

if (
  env !== "development" &&
  env !== "test" &&
  env !== "production" &&
  env !== "esm"
) {
  throw new Error(
    `${"Using `civic-@babel/presets` requires that you specify `NODE_ENV` or " +
      '`BABEL_ENV` environment variables. Valid values are "development", ' +
      '"test", and "production". Instead, received: '}${JSON.stringify(env)}.`
  );
}

if (env === "development" || env === "test") {
  preset.plugins.push.apply(preset.plugins, [
    // Adds component stack to warning messages
    require.resolve("@babel/plugin-transform-react-jsx-source")
  ]);
}

if (env === "test") {
  preset.plugins.push.apply(preset.plugins, [
    require.resolve("babel-plugin-dynamic-import-node"),
    [
      require.resolve("babel-plugin-transform-es2015-modules-commonjs"),
      {
        loose: true
      }
    ]
  ]);
}

if (env === "production") {
  preset.plugins.push.apply(preset.plugins, [
    require.resolve("babel-plugin-transform-react-remove-prop-types")
  ]);
}

module.exports = preset;
