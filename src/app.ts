#!/usr/bin/env node

import fs from "fs";
import { Dashboard } from "./classes/dashboard";
import inquirer from "inquirer";
import path from "path";
// @ts-ignore
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";

async function main() {
  const rootPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  try {
    console.log({ rootPath });
    if (!fs.existsSync(rootPath))
      throw Error(`path ${rootPath} does not exist`);
  } catch (e) {
    console.log(e);
  }

  console.log("Welcome to Grafana JSON converter wizard");

  inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

  const questions = [
    {
      type: "file-tree-selection",
      name: "inputFileSrc",
      message:
        "Select your source JS file. (This JS file must export grafana dashboard type json)",
      validate: (input: string) => {
        const extention = input.split(".").pop();
        if (extention === "js") return true;
        else return false;
      },
      root: rootPath,
    },
    {
      type: "list",
      name: "version",
      message: "Output version of yor grafana json?",
      choices: ["7.5.3", "8.1.5"],
    },
    {
      type: "file-tree-selection",
      name: "outputDir",
      message: "Output directory",
      onlyShowDir: true,
    },
  ];

  try {
    const { inputFileSrc, version, outputDir } = await inquirer.prompt(
      questions
    );
    const sourceFilename = inputFileSrc.split("/").pop() || "converted";
    const sourceJsonModule = await require(inputFileSrc);
    const sourceJson = sourceJsonModule.default;

    const dashboard = new Dashboard(sourceJson);

    fs.writeFileSync(
      outputDir + `/${sourceFilename.split(".")[0]}_v${version}.json`,
      JSON.stringify(dashboard.convert(version), null, 2)
    );
  } catch (e) {
    console.log(e);
  }
}

main();
