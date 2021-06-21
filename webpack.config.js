const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode:'development',
  entry: {
      // main: './src/index.js',
      // grid: './src/grid.js',
      // grids: './src/grids.js',
      // baby: './src/baby.js',
      // lb:'./src/learnbaby/lb.js',
      // dr:'./src/dr/dr.js',
      // conv:'./src/conv/conv.js',
      // conv_hscene:'./src/conv/hscene.js',
      // conv_xscene:'./src/conv/xscene.js'
            conv:'./three/src/conv/conv.js',
      // conv_hscene:'./three/src/conv/hscene.js',
      // conv_xscene:'./three/src/conv/xscene.js'

},
  output: {
    filename: '[name].min.js',
    // path: path.resolve(__dirname, 'dist'),
    path: path.resolve(__dirname, 'three/dist'),
  },
  devServer: {
    historyApiFallback: {
        index: '404.html',
      },
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: path.join(__dirname, 'three/dist'),
    compress: true,
    port: 8080,
  },

  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

};
