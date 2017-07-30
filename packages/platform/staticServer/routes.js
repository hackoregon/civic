/* eslint-disable */

const app = require('./index');


function getHousing(req, res, next) {
  console.log(req.params)
  res.redirect('/housing')
  // res.json({ hi: 'there' });
  next();
}

module.exports = {
  getHousing
};
