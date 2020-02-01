const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html文件的插件

module.exports = {
  entry: './src/ts/index.ts',
  output: {
    filename: 'bundle.js',
    // publicPath : 'dist/js/',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images'
        }
      } 
        ]
    },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js", ".json", '.jpg']
  },
  node: {
    fs: "empty"
  }

};