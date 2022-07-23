const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { paths } = require("./utils");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + "/index.js"],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  // Customize the webpack build process
  plugins: [
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: "Webpack boilerplate",
      favicon: paths.src + "/images/favicon.png",
      template: paths.src + "/template.html", // template file
      filename: "index.html", // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        include: paths.src,
        exclude: paths.node_modules,
      },

      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: paths.src,
        exclude: paths.node_modules,
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: "url-loader?limit=10000&name=[name]-[hash].[ext]",
        include: paths.src,
        exclude: paths.node_modules,
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        use: "file-loader?name=[name].[ext]",
        exclude: paths.node_modules,
      },
      {
        test: /\.json$/,
        use: "json-loader",
        include: paths.src,
        exclude: paths.node_modules,
      },
    ],
  },

  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": paths.src,
      assets: paths.public,
    },
  },
};
