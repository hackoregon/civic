
# protocols

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Travis](https://img.shields.io/travis/IonicaBizau/protocols.svg)](https://travis-ci.org/IonicaBizau/protocols/) [![Version](https://img.shields.io/npm/v/protocols.svg)](https://www.npmjs.com/package/protocols) [![Downloads](https://img.shields.io/npm/dt/protocols.svg)](https://www.npmjs.com/package/protocols) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Get the protocols of an input url.

## :cloud: Installation

```sh
$ npm i --save protocols
```


## :clipboard: Example



```js
// Dependencies
const protocols = require("protocols");

console.log(protocols("git+ssh://git@some-host.com/and-the-path/name"));
// ["git", "ssh"]

console.log(protocols("http://ionicabizau.net", true));
// "http"
```

## :memo: Documentation


### `protocols(input, first)`
Returns the protocols of an input url.

#### Params
- **String** `input`: The input url.
- **Boolean|Number** `first`: If `true`, the first protocol will be returned. If number, it will represent the zero-based index of the protocols array.

#### Return
- **Array|String** The array of protocols or the specified protocol.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`bb-parse-url`](https://github.com/IonicaBizau/parse-url)—An advanced url parser supporting git urls too.
 - [`is-ssh`](https://github.com/IonicaBizau/node-is-ssh)—Check if an input value is a ssh url or not.
 - [`parse-url`](https://github.com/IonicaBizau/parse-url)—An advanced url parser supporting git urls too.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
