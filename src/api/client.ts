import qs from "qs";
import got from "got";
import { createHash, createHmac } from "crypto";
import { request } from "http";

function getSignature(
  path: string,
  request: any,
  secret: string,
  nonce: number
) {
  const msg = qs.stringify(request);
  const buff = Buffer.from(secret, "base64");
  const hash = createHash("sha256");
  const hmac = createHmac("sha512", buff);
  const hashDigest = hash.update(nonce + msg).digest();
  const hmacDigest = hmac.update(path + hashDigest).digest("base64");
  return hmacDigest;
}
