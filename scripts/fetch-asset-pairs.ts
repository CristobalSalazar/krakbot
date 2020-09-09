import api from "../src/kraken/api";
import _ from "lodash";
import fs from "fs";
import path from "path";

async function main() {
  const res = await api.public.getTradableAssetPairs({});
  const filtered = _.mapValues(res, (_, k) => {
    return k;
  });
  const assetPairs = _.values(filtered);
  const uri = path.join(__dirname, "../src", "util", "asset-pairs.ts");
  const contents = assetPairs
    .map((p) => `export const ${p.replace(/\./, "_").toUpperCase()} = "${p}";`)
    .join("\n");
  fs.writeFileSync(uri, contents);
}
main();
