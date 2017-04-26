const mergeConfig  = require('./reduceConfig').default;
const optimize = require('webpack').optimize;

module.exports = () => config => mergeConfig(config, {
  plugins: [
    new optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
// isProd && (
//       new webpack.optimize.UglifyJsPlugin({
//         compress: {
//           drop_console: true,
//           screw_ie8: true,
//           sequences: true,
//           properties: true,
//           dead_code: true,
//           drop_debugger: true,
//           conditionals: true,
//           comparisons: true,
//           evaluate: true,
//           booleans: true,
//           loops: true,
//           unused: true,
//           if_return: true,
//           join_vars: true,
//           cascade: true,
//           negate_iife: true,
//           hoist_funs: true,
//           warnings: false,
//         },
//         mangle: {
//           screw_ie8: true,
//           except: ['exports', 'require'],
//         },
//         output: {
//           screw_ie8: true,
//         },
//       })
//     ),
  ],
});
