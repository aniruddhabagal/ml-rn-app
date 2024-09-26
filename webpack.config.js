const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Correct path to your entry file
  output: {
    path: path.resolve(__dirname, 'public'), // Absolute path where the bundle will be output
    filename: 'bundle.web.js',
    publicPath: '/', // Public path for dev server
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
      },
      {
        directory: path.join(__dirname, 'src/'),
        publicPath: '/src/',
      },
      {
        directory: path.join(__dirname, 'models/'),
        publicPath: '/models/',
      },
    ],
    port: 3000,
    devMiddleware: {
      writeToDisk: true, // This ensures the bundle is written to disk during development
    },
  },
};
