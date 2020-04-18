const path = require('path');
const webpack = require('webpack');

const isDebug = process.env.NODE_ENV !== 'production';
console.log(`debug is ${isDebug}`);

module.exports = {
  entry: './src/index.js',
  mode: isDebug ? 'development' : 'production',
  devtool: isDebug ? 'source-map' : false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react', '@babel/preset-flow'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDebug
                  ? '[path][name]__[local]'
                  : '[hash:base64:8]',
              },
              sourceMap: isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('cssnano')({
                  zindex: false,
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
