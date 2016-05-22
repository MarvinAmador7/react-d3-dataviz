const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry:{
    app: PATHS.app
  },
  resolve: {
    extentions: ['', '.js', '.jsx'],
    modulesDirectories: [
        'node_modules'
      ]
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
   loaders: [
      { test: /\.jsx?$/, loader: "babel?cacheDirectory", include: PATHS.app, exclude: /(node_modules, bower_components)/},
      { test: /\.css$/, loader: "style-loader!css-loader", include: PATHS.app }
    ]
  }
}


if (TARGET === 'start' || !TARGET ) {
  module.exports = merge(common, {
    devTools: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}