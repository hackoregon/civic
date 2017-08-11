const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const existing = { // eslint-disable-line
  presets: [
    'es2015',
    'react',
    'stage-1',
  ],
  env: {
    development: {
      plugins: ['react-hot-loader/babel', 'transform-class-properties'],
    },
    production: {
      plugins: [
        'transform-class-properties',
        'transform-react-constant-elements',
        'transform-react-remove-prop-types',
      ],
    },
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
      ],
    },
  },
};


const preset = {
  presets: [
    [
      require.resolve('babel-preset-env'), {
        modules: false,
      },
    ],
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    // class { handleThing = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),

    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [
      require.resolve('babel-plugin-transform-object-rest-spread'), {
        useBuiltIns: true,
      },
    ],
    // Adds syntax support for import()
    require.resolve('babel-plugin-syntax-dynamic-import'),
    // Add support for async/await
    require.resolve('babel-plugin-transform-runtime'),
  ],
};


if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(`${'Using `civic-babel-presets` requires that you specify `NODE_ENV` or ' +
    '`BABEL_ENV` environment variables. Valid values are "development", ' +
    '"test", and "production". Instead, received: '}${JSON.stringify(env)}.`);
}

if (env === 'development' || env === 'test') {
  preset.plugins.push.apply(preset.plugins, [// Adds component stack to warning messages
    require.resolve('babel-plugin-transform-react-jsx-source')]);
}

if (env === 'test') {
  preset.plugins.push.apply(preset.plugins, [
    // Compiles import() to a deferred require()
    require.resolve('babel-plugin-dynamic-import-node'),
    // Transform ES modules to commonjs for Jest support
    [
      require.resolve('babel-plugin-transform-es2015-modules-commonjs'), {
        loose: true,
      },
    ],
  ]);
}

if (env === 'production') {
  preset.plugins.push.apply(preset.plugins, [require.resolve('babel-plugin-transform-react-remove-prop-types')]);
}

module.exports = preset;
