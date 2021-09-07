const express = require("express");

const server = express();
const resultOptions = ["DELAY", "ERROR", "DELAY", "SUCCESS", "ERROR"];

server.get("/", (req, res) => {
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
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000);
      fate.message = "Your response has been delayed for 5 seconds.";
      break;
  }

  console.log("It was decided -- ", fate);
  res.contentType("application/json");
  res.status(fate.code);
  res.send(fate);
});

server.listen(40000, () => console.info(`Server listen to port 40000`));
