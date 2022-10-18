require("child_process").spawn("yarn", ["start"], {
  stdio: ["ignore", "inherit", "inherit"],
  shell: true,
});
