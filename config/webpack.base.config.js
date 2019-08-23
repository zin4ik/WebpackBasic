const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;


/*=======вхідні і вихідні каталоги========*/
const PATHS ={
src: path.join(__dirname, '../src'),
dist: path.join(__dirname, '../dist')
};

/*=====модулі точок(файлів)входа і продакшин====*/
module.exports = {
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

   
  module: {
    /*====loaders===*/
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
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[ext]'
          }
        }, {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':img:src']
            }
          }
        },{
          test:/\.(jpg|svg|png|gif)$/,
          use:[
              {
                  loader:'file-loader',
                  options:{
                      name:'[name].[ext]',
                      outputPath:`${PATHS.dist}/img/`,
                      useRelativePath:true
                  }
              },{
                  loader:'image-webpack-loader',
                  options:{
                      mozjpeg:{
                          progresive:true,
                          quality:70
                      },
                      optipng: {
                          enabled: false,
                        },
                      pngquant: {
                          quality: '65-90',
                          speed: 4
                        },
                        gifsicle: {
                          interlaced: false
                        },
                        // the webp option will enable WEBP
                        webp: {
                          quality: 75
                        }
                  }
              }
            ]
          }
    ],
  
  },

/*====plugins====*/
plugins: [
  
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
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.dist}/img/[name].[ext]` },
      { from: `${PATHS.src}/fonts`, to: `${PATHS.dist}/fonts/[name].[ext]` },
    ]),
    new ImageminPlugin({ 
      //test: /\.(jpe?g|png|gif|svg)$/i,
      
    }),
    new webpack.ProvidePlugin ({
        $:'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),

  ]

}
          