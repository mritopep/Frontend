const express = require("express");
const ngrok = require("ngrok");
const cors = require("cors");
const fs = require("fs");
const { Dropbox } = require("dropbox");
var extract = require("extract-zip");
var bodyParser = require("body-parser");
const { response } = require("express");
var rimraf = require("rimraf");

const port = 4100;
const app_folder = "app/dist/UI";

const app_img_folder = "app/src/assets";
const prod_img_folder = "app/dist/UI/assets";
const img_folder = app_img_folder;

const app = express();

const dbx = new Dropbox({
  accessToken:
    "qgBOG8SoX40AAAAAAAAAAS1vYK2gErIvVRe_1oAThUqey142pf2pYzMmPYnRZuFW",
});

// (async function () {
//   const url = await ngrok.connect(port);
//   console.log("Node Express server Ngrok URL: " + url);
// })();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.static(process.cwd() + "/" + app_folder));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/" + app_folder + "index.html");
});

app.post("/mri", (req, res) => {
  const link = req.body.sharedLink;
  console.log(link);
  dbx
    .sharingGetSharedLinkFile({ url: link })
    .then((data) => {
      fs.writeFile(
        data.result.name,
        data.result.fileBinary,
        "binary",
        (err) => {
          if (err) {
            throw err;
          }
          console.log(`File: ${data.result.name} saved.`);
        }
      );
      extract(`${process.cwd()}/${data.result.name}`, {
        dir: `${process.cwd()}/${img_folder}/mri_img/`,
      })
        .then((response) => {
          console.log("Extracted MRI");
          res.json("MRI_RECIVED");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/pet", (req, res) => {
  const link = req.body.sharedLink;
  console.log(link);
  dbx
    .sharingGetSharedLinkFile({ url: link })
    .then((data) => {
      fs.writeFile(
        data.result.name,
        data.result.fileBinary,
        "binary",
        (err) => {
          if (err) {
            throw err;
          }
          console.log(`File: ${data.result.name} saved.`);
        }
      );
      extract(`${process.cwd()}/${data.result.name}`, {
        dir: "/home/antony/Code/Mri2Pet/project/mri2pet/Frontend/app/src/assets/pet_img",
      })
        .then((response) => {
          console.log("Extracted PET");
          res.json("PET_RECIVED");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/delete", (req, res) => {
  rimraf(`${process.cwd()}/mri_img.zip`, function () {
    console.log("MRI zip deleted");
  });
  rimraf(`${process.cwd()}/pet_img.zip`, function () {
    console.log("PET zip deleted");
  });
  rimraf(`${process.cwd()}/${img_folder}/mri_img`, function () {
    console.log("MRI Image folder deleted");
  });
  rimraf(`${process.cwd()}/${img_folder}/pet_img`, function () {
    console.log("PET Image folder deleted");
  });
  res.json("FILES DELETED");
});

app.listen(port, function () {
  console.log(
    "Node Express server for " +
      app.name +
      " listening on http://localhost:" +
      port
  );
});
