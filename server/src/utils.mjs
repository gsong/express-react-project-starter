import fs from "fs";
import path from "path";
import { URL } from "url";

import dotenv from "dotenv";

export const load_dotenv_if_exists = () => {
  if (fs.existsSync(DOTENV_FILE)) {
    dotenv.config({ path: DOTENV_FILE });
  }
};

const DOTENV_FILE = path.join(
  new URL(".", import.meta.url).pathname,
  "../../.env",
);
