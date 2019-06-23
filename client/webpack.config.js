const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isNotProduction = process.env.NODE_ENV !== "production";

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "linaria/loader",
            options: {
              sourceMap: isNotProduction
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isNotProduction
            }
          },          
          {
            loader: "css-loader",
            options: {
              sourceMap: isNotProduction,
            },
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./styles.css"
    })
  ],
  watchOptions: {
    poll: true
  }
};