import api from "api";
import _ from "lodash";
import fs from "fs";
import path from "path";

async function main() {
  const res = await api.getTradableAssetPairs({});
  const filtered = _.mapValues(res, (_, k) => {
    return k;
  });
  const assetPairs = _.values(filtered);
  const uri = path.join(__dirname, "../src", "util", "asset-pairs.ts");
  const contents = assetPairs
    .map(
      (pair) =>
        `export const ${pair.replace(/\./, "_").toUpperCase()} = "${pair}";`
    )
    .join("\n");
  fs.writeFileSync(uri, contents);
}
main();
