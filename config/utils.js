const path = require("path");
const boxen = require("boxen");
const figlet = require("figlet");
const chalk = require("chalk");
const packageJson = require("../package.json");

/**
 * Paths
 */
const paths = {
  // Source files
  src: path.resolve(__dirname, "../src"),

  // Production build files
  build: path.resolve(__dirname, "../dist"),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, "../public"),

  // node_modules
  node_modules: path.join(__dirname, "../node_modules"),
};

/**
 * Package info
 */
const { name, version, author, license } = packageJson;
const boxInfo = chalk.cyan(`${author} | Version ${version} | License ${license} `);
function packageInfo() {
  console.log(
    chalk.cyan(
      /**
       * Figlet options as defined by https://github.com/patorjk/figlet.js
       * @type {{horizontalLayout: string, font: string}}
       */
      figlet.textSync(name, {
        font: "Small Slant",
        horizontalLayout: "default",
      })
    )
  );
  console.log(
    /**
     * Boxen options as defined by https://www.npmjs.com/package/boxen
     * @type {{padding: {top: number, left: number, bottom: number, right: number}}}
     */
    boxen(boxInfo, {
      padding: {
        left: 13,
        right: 13,
        top: 1,
        bottom: 1,
      },
    }),
    "\n"
  );
}

/**
 * Exports
 */
module.exports = { paths, packageInfo };
