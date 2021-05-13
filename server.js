const express = require("express");
const ngrok = require("ngrok");
const cors = require('cors');

const port = 4100;
const app_folder = "app/dist/UI";

const app = express();

(async function () {
  const url = await ngrok.connect(port);
  console.log("Node Express server Ngrok URL: " + url);
})();

app.use(cors({origin: '*'}));
app.use(express.static(process.cwd() + "/" + app_folder));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/" + app_folder + "index.html");
});

app.get('/mri', (req, res) => {
  res.json("MRI_RECIVED");
});

app.get('/pet', (req, res) => {
  res.json("PET_RECIVED");
});


app.listen(port, function () {
  console.log(
    "Node Express server for " +
      app.name +
      " listening on http://localhost:" +
      port
  );
});
