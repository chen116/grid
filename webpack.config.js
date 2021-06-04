const path = require('path');

module.exports = {
    mode:'development',
  entry: { 
      main: './src/index.js',
      grid: './src/grid.js',
      grids: './src/grids.js',
      baby: './src/baby.js',

},
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    historyApiFallback: {
        index: 'baby.html',
      },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};