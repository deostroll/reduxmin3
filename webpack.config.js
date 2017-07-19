var path = require('path')

var rules = [
  { test: /\.(worker\.js)(\?.*)?$/,
    use: [
      {
        loader: 'worker-loader',
        options: {
          inline: true
        }
      },
      { loader: 'babel-loader' }
    ]
  },
  { test: /\.(jsx)(\?.*)?$/,
    use: [
      { loader: 'react-hot-loader' }, 
      { loader: 'babel-loader' }
    ]
  },
  { test: /\.(css)(\?.*)?$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader'
    ]
  },
  { test: /\.(scss)(\?.*)?$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { sourceMap: true }
      },
      { loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
          sourceMapContents: 'true'
        }
      }
    ]
  },
  { test: /\.(less)(\?.*)?$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
      },
      'less-loader'
    ]
  }
]

module.exports = require("./make-webpack-config")(rules, {
  _special: {
    separateStylesheets: false,
  },
	devtool: "inline",
  entry: {
    'sample-app': [
      './src/polyfills.js',
      './src/index.js'
    ]
  },
  output: {
    pathinfo: true,
    filename: '[name].js',
    library: "[name]",
    libraryTarget: "umd",
    chunkFilename: "[id].js"
  },
  devServer: {
    port: 3200,
    contentBase: path.join(__dirname, 'dev-helpers'),
    publicPath: "/",
    noInfo: true,
    hot: true,
    stats: {
      colors: true
    },
  },
})
