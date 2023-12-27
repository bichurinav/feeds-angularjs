const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();
const PORT = 420;

const dirname = path.resolve();

app.use(express.static("app"));

app.use("*", async (_, res) => {
  const html = await fs.readFile(path.join(dirname, "app", "index.html"));
  res.send(html);
});

app.listen(PORT, () => {
  console.log("http://localhost:420");
});
