const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');


function applyConfigsToDash() {
  return function addDashboard(config) {
    const dashboard = new Dashboard();
    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    return Object.assign({}, config, {
      plugins: [
        new DashboardPlugin(dashboard.setData),
      ].concat(config.plugins),
    });
  };
}

module.exports = applyConfigsToDash;
