const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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


module.exports = (env, argv)=> {
  const isDevelopment = argv.mode === 'development';
  return {
    optimization: {
      nodeEnv: argv.mode
    },
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
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
    port: 3001
},
resolve: {
  modules: ['src/scripts', 'node_modules'],
  extensions: ['.jsx', '.js'],
  unsafeCache: true,
  alias: {
      components: path.resolve(__dirname, 'src', 'scripts', 'client/components')
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
    uglifyJsPlugin,htmlPlugin,miniCssPlugin
    
  ]
};
};