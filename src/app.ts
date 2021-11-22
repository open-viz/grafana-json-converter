#!/usr/bin/env node

import fs from "fs";
import { Dashboard } from "./classes/dashboard";
import semver from "semver";
import path from "path";

async function main() {
  const rootDirectory = __dirname.split("/").slice(0, -2).join("/");
  try {
    let [src, version, dest] = process.argv.slice(2) || [];
    let sourceJson = {};
    let sourceFilename = "converted";
    let targetVersion = semver.valid(semver.coerce(version) || "");
    if (src === undefined)
      throw Error(
        "Please provide a valid source file path as a first argument"
      );
    else {
      const srcFilePath = path.resolve(
        rootDirectory + "/dist",
        src.replace(/\.[a-z]*$/, "")
      );
      sourceFilename = srcFilePath.split("/").pop() || "converted";
      try {
        const sourceJsonModule = await import(srcFilePath);
        sourceJson = sourceJsonModule.default;
      } catch (e) {
        throw e;
      }
    }

    if (!targetVersion)
      throw Error("Please provide a valid version as a second argument");

    if (dest === undefined)
      throw Error(
        "Please provide a valid destination file path as a third argument"
      );
    else {
      const dashboard = new Dashboard(sourceJson);
      try {
        const destPath = path.resolve(rootDirectory, dest);
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        fs.writeFileSync(
          destPath + `/${sourceFilename}_${version}.json`,
          JSON.stringify(dashboard.convert(version), null, 2)
        );
      } catch (e) {
        throw e;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

main();
