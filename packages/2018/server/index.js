const chalk = require("chalk");
const express = require("express");
const { resolve } = require("path");
const compression = require("compression");

const app = express();
const isProd = process.env.NODE_ENV === "production";
const outputPath = resolve(process.cwd(), isProd ? "dist" : "build");

console.log(chalk.gray("\nStarting the production server..."));

// Enable gzip compression and serve assets as they build when prod
app.use(compression());

// Respond with static files when they exist
app.use("/", express.static(outputPath));

// Redirect all other routes to index.html to let React handle routing client-side
// The production server expects the static assets to already be built. This eliminates
// the need to have webpack in production.
app.get(
  "/*",
  (req, res) =>
    console.log("Servicing request for", req.url) ||
    res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>CIVIC Platform – Making Public Information Public Knowledge</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta charset="utf-8"/>
    <style>html, body { padding: 0; margin: 0; }</style>
    <!-- FontAwesome -->
    <script src="https://use.fontawesome.com/031ebbe0c7.js"></script>
    <!-- Fathom - beautiful, simple website analytics -->
    <script src="https://pig.civicplatform.org/script.js" data-spa="auto" data-site="XCPMILWK" defer></script>
    <!-- / Fathom -->
  </head>
  <body style="margin:0">
    <div id="content"></div>
    <script type="text/javascript" src="/main.bundle.js"></script>
  </body>
</html>
`)
);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);

console.log(chalk.green(`Server is up at http://localhost:${port}`));
