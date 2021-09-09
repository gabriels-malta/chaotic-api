const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 40000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "/public/")));

const resultOptions = ["DELAY", "ERROR", "DELAY", "SUCCESS", "ERROR"];

server.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

server.get("/tryme", (req, res) => {
  const index = Math.floor(Math.random() * resultOptions.length);
  const rs = resultOptions[index];
  const fate = {
    option: rs,
    code: 200,
    message: "All good.",
  };
  switch (rs) {
    case "ERROR":
      fate.code = 500;
      fate.message = "Something went wrong.";
      break;
    case "DELAY":
      const delayTime = Math.floor(Math.random() * 10) * 1000 || 10000;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delayTime);
      fate.message = `Your response has been delayed for ${
        delayTime / 1000
      } seconds.`;
      break;
  }

  console.log("It was decided -- ", fate);

  res.status(fate.code);
  res.send(fate);
});

server.listen(PORT, () => console.info(`Server listen to port ${PORT}`));
