const express = require('express');
const resolve = require('path').resolve;

const app = express();
const outputPath = resolve(process.cwd(), 'dist');

app.use('/', express.static(outputPath));
app.get('/*', (req, res) => console.log("Servicing request for", req.url) || res.send(`
<!DOCTYPE html>
<html>
  <head>
    <title>Civic 2017 - A Hack Oregon Project</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8"/>
    <style>html, body { padding: 0; margin: 0; }</style>
  </head>
  <body style="margin:0">
    <div id="content"></div>
    <script type="text/javascript" src="/main.bundle.js"></script>
  </body>
</html>
`));

app.listen(process.env.PORT || 3000);
