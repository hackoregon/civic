// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: "input",
    name: "year",
    message: "What is the year? (e.g. 1969): "
  },
  {
    type: "input",
    name: "packageTitle",
    message:
      "What do you want to name the new package, sans-year? (e.g. package-name, this will become YYYY-package-name based on your previous response): "
  }
];
