const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');




/*=======вхідні і вихідні каталоги========*/
const PATHS ={
src: path.join(__dirname, './src'),
dist: path.join(__dirname, './dist')
};

/*=====модулі точок(файлів)входа і продакшин====*/
module.exports = {
     mode: 'development',
//  mode:'production',
    devServer: {
        port: 8081,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    externals: {
        paths: PATHS
      },

  entry: `${PATHS.src}/js/index.js`,
  devtool: 'inline-source-map',
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },

   /*====loaders===*/
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [  
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            }, {
              loader: 'postcss-loader',
              options: { sourceMap: true, config: { path: `./postcss.config.js` } }
            }, {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        }
    ],
  },


/*====plugins====*/
plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template:`${PATHS.src}/index.html`
        //   title: 'Output Management'
        }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].[hash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.ProvidePlugin ({
        $:'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),

  ]

}
          