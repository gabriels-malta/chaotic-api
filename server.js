const express = require("express"),
  os = require("os");

const server = express();
const resultOptions = ["DELAY", "ERROR", "DELAY", "SUCCESS", "ERROR"];

server.get("/", (req, res) => {
  res.status(200);
  res.write(`Welcome to the Chaotic-API!${os.EOL}Check this out on /tryme`);
  res.end();
});

server.get("/tryme", (req, res) => {
  const index = Math.floor(Math.random() * 3);
  const rs = resultOptions[index];
  const fate = {
    option: rs,
    code: 200,
    message: "All good",
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
  res.contentType("application/json");
  res.status(fate.code);
  res.send(fate);
});

server.listen(40000, () => console.info(`Server listen to port 40000`));
