const nodemon = require("nodemon");

nodemon({
  script: "./rebuild.js",
  ext: "ts",
  ignore: ["dist/*", "node_modules/*"],
});

nodemon
  .on("start", () => {
    console.log("Nodemon has started");
  })
  .on("quit", () => {
    console.log("Quitting");
    process.exit();
  })
  .on("exit", () => {})
  .on("restart", (files) => {
    console.log("Rebuilding due to: ", files);
  });
