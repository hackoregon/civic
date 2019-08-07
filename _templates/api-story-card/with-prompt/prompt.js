// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: "input",
    name: "package",
    message: "Which existing package should this card be in?:"
  },
  {
    type: "input",
    name: "card",
    message: "What will be the title of the card? (Capitalized With Spaces):"
  }
];
