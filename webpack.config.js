/* eslint-disable no-undef */
const isWsl = require('is-wsl');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const caseSensitivePathsPlugin = new CaseSensitivePathsPlugin();

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, 'src', 'index.html'),
});

const uglifyJsPlugin = new UglifyJsPlugin({
  sourceMap: true,
  test: /\.min\.js$/i,
});
//const terserPlugin =

const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    parser: safePostCssParser,
    map: true //shouldUseSourceMap
      ? {
          // `inline: false` forces the sourcemap to be output into a
          // separate file
          inline: false,
          // `annotation: true` appends the sourceMappingURL to the end of
          // the css file, helping the browser find the sourcemap
          annotation: true,
        }
      : false,
  },
});
const dotEnv = new Dotenv({
  path: './.env',
});

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    optimization: {
      nodeEnv: argv.mode,
      minimize: !isDevelopment,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
          // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
          parallel: !isWsl,
          // Enable file caching
          cache: true,
          sourceMap: isDevelopment,
        }),
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',

        minSize: 20000,
        // minRemainingSize: 0,
        // maxSize: 0,
        // minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,

        //enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      // // Keep the runtime chunk separated to enable long term caching
      // // https://twitter.com/wSokra/status/969679223278505985
      //  runtimeChunk: true,
    },
    entry: path.join(__dirname, 'src/client', 'client.js'),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    mode: argv.mode,
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    devServer: {
      stats: {
        children: false,
        maxModules: 0,
      },
      port: env.PORT,
      historyApiFallback: true,
    },
    node: {
      fs: 'empty',
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
        Reducers: path.resolve(__dirname, 'src/client/reducers'),
        Actions: path.resolve(__dirname, 'src/client/actions'),
        Hooks: path.resolve(__dirname, 'src/client/hooks'),
        Client: path.resolve(__dirname, 'src/client'),
        App: path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                url: false,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|jp(e)g|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|svg|jpg|jp(e)g|png|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name]-[hash:8].[ext]',
                emitFile: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      htmlPlugin,
      miniCssPlugin,
      dotEnv,
      caseSensitivePathsPlugin,
      //uglifyJsPlugin,

      optimizeCSSAssetsPlugin,
    ],
  };
};
