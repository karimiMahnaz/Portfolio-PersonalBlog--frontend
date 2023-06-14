// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
require("dotenv").config({ path: __dirname + "/.env.local" });

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(5619, (err) => {
    if (err) throw err;
    console.log("> Ready on 5619");
  });
});
