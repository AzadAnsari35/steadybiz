const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const htmlPlugin =  new HtmlWebpackPlugin({
  filename: "index.html",
  template: path.join(__dirname, "src", "index.html")
});

const uglifyJsPlugin = new UglifyJsPlugin({
  sourceMap: true,
  test: /\.min\.js$/i,
});

const dotEnv=new Dotenv();

module.exports = (env, argv)=> {
  const isDevelopment = argv.mode === 'development';
  return {
    optimization: {
      nodeEnv: argv.mode
    },
    entry: path.join(__dirname, "src/client", "client.js"),
    output: {
      path: path.join(__dirname, "build"),
      filename: "bundle.js",
      publicPath: '/'
    },
    mode: argv.mode,
    devtool: isDevelopment
      ? '#eval-source-map'
      : 'source-map',
    devServer: {
      stats: {
        children: false,
        maxModules: 0
      },
      port: 3000,
      historyApiFallback: true
    },
    node: {
      fs: "empty"
    },
    resolve: {
      modules: ['src/scripts', 'node_modules'],
      extensions: ['.jsx', '.js'],
      unsafeCache: true,
      alias: {
        Config: path.resolve(__dirname, 'src/config'),
        Components: path.resolve(__dirname, 'src/client/components'),
        Constants: path.resolve(__dirname, 'src/client/constants'),
        Helpers: path.resolve(__dirname, 'src/client/helpers'),
        Views: path.resolve(__dirname, 'src/client/views'),
        Widgets: path.resolve(__dirname, 'src/client/widgets'),
        App: path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevelopment
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpg|jp(e)g|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|svg|jpg|jp(e)g|png|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name]-[hash:8].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      uglifyJsPlugin,htmlPlugin,miniCssPlugin,dotEnv
    ]
  };
};