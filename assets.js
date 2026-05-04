import fs from "fs-extra";
import { resolve } from "path";

const tsConfig = fs.readJSONSync(resolve("./tsconfig.json"));

const rootDir = resolve(tsConfig.compilerOptions.rootDir);
const outDir = resolve(tsConfig.compilerOptions.outDir);

function copyAssets(fromDir, toDir) {
  if (fs.pathExistsSync(toDir)) {
    fs.emptyDirSync(toDir);
  } else {
    fs.ensureDirSync(toDir, { mode: 0o775 });
  }

  fs.copySync(fromDir, toDir);
}

copyAssets(resolve(rootDir, "css"), resolve(outDir, "css"));
