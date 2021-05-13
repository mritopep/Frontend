const express = require("express");
const ngrok = require("ngrok");

const port = 4100;
const app_folder = "dist/UI";

const app = express();

// ---- NGROG CONNECT ---- //
(async function () {
  const url = await ngrok.connect(port);
  console.log(
    "Node Express server Ngrok URL: " +
      url
  );
})();

// ---- SERVE STATIC FILES ---- //
app.use(express.static(process.cwd() +"/"+ app_folder));

// ---- SERVE APLICATION PATHS ---- //
app.get("/", (req, res) => {
  res.sendFile(process.cwd() +"/"+ app_folder+"index.html");
});

// ---- START UP THE NODE SERVER  ----
app.listen(port, function () {
  console.log(
    "Node Express server for " +
      app.name +
      " listening on http://localhost:" +
      port
  );
});
