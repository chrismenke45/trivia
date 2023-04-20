const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const pages = ["index", "game"]

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.ts`;
    return config;
  }, {}),
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [].concat(
    pages.map(
      (page) => 
      new CopyPlugin({
        patterns: [
          { from: `src/${page}.html`, to: `${page}.html` },
          { from: 'src/assets/favicon.ico' }
        ],
      }),
    )
    
  ),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
