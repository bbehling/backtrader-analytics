// https://blog.angulartraining.com/tutorial-how-to-create-custom-angular-elements-55aea29d80c5
// https://www.techiediaries.com/angular-elements-web-components/

const fs = require("fs-extra");
const concat = require("concat");
(async function build() {
  await fs.removeSync("elements/query-input.js");
  await fs.removeSync("elements/styles.css");
  await fs.removeSync("elements/runner.html");
  const files = [
    "dist/backtrader-analytics/runtime.js",
    "dist/backtrader-analytics/polyfills.js",
    "dist/backtrader-analytics/scripts.js",
    "dist/backtrader-analytics/main.js"
  ];
  await fs.ensureDir("elements");
  await concat(files, "elements/query-input.js");
  await fs.copyFile(
    "dist/backtrader-analytics/styles.css",
    "elements/styles.css"
  );
  await fs.copyFile("src/runner.html", "elements/runner.html");
  await fs.mkdir("dist/backtrader-analytics/assets/");
  await fs.copy("dist/backtrader-analytics/assets/", "elements/");
})();
