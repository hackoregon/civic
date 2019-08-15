// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: "input",
    name: "year",
    message: "What is the year? (e.g. 2019): "
  },
  {
    type: "input",
    name: "packageTitle",
    message:
      "What do you want to name the new package, without the year prefix? (e.g. package-name, not YYYY-package-name based): "
  }
];
