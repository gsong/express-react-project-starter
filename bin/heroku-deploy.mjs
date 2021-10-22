import fs from "fs";
import path from "path";
import { URL } from "url";
import { spawnSync } from "child_process";

import dotenv from "dotenv";

const DOTENV_FILE = path.join(
  new URL(".", import.meta.url).pathname,
  "../app/.env",
);

let args = {};

if (fs.existsSync(DOTENV_FILE)) {
  args = dotenv.parse(fs.readFileSync(DOTENV_FILE));
}

const argString = Object.entries(args)
  .map(([key, value]) => `${key}="${value}"`)
  .join(",");

let containerPush =
  "DOCKER_DEFAULT_PLATFORM=linux/amd64 heroku container:push web";

if (argString !== "") containerPush += `  --arg ${argString}`;

spawn("heroku container:login");
spawn(containerPush);
spawn("heroku container:release web");

function spawn(cmd) {
  console.info(cmd);
  spawnSync(cmd, { shell: true, stdio: "inherit" });
}
