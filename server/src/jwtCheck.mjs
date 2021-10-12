import jwt from "express-jwt";
import jwks from "jwks-rsa";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});

export default jwtCheck;
