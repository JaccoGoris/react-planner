const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const PAGE_TITLE = 'React Planner'
const VENDORS_LIBRARIES = [
  'immutable',
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'three',
]

module.exports = (env, self) => {
  let isProduction = self?.mode === 'production'
  let port = self?.port || 9000

  if (isProduction) {
    console.info('Webpack: Production mode')
  } else {
    console.info('Webpack: Development mode')
  }

  let config = {
    context: path.resolve(__dirname),
    entry: {
      app: './src/index.js',
      // vendor: VENDORS_LIBRARIES,
    },
    output: {
      path: path.join(__dirname, 'dist/lib'),
      filename: 'react-planner-library.js',
      library: { name: 'reactPlannerLibrary', type: 'umd' },
      clean: true,
    },
    performance: {
      hints: isProduction ? 'warning' : false,
    },
    // devtool: isProduction ? 'source-map' : 'eval',
    // devServer: {
    //   port: port,
    //   contentBase: path.join(__dirname, './dist'),
    // },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'react-planner': path.join(__dirname, './src/index'),
      },
      fallback: { path: require.resolve('path-browserify') },
    },
    externals: ['three', 'react', 'react-dom'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                compact: false,
                plugins: ['transform-object-rest-spread'],
                presets: ['env', 'react'],
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|mtl|obj)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name: '[path][name].[ext]',
                context: './src',
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader', options: { injectType: 'styleTag' } },
            { loader: 'css-loader' },
          ],
        },
      ],
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   title: PAGE_TITLE,
      //   template: './src/index.html.ejs',
      //   filename: 'index.html',
      //   inject: 'body',
      //   production: isProduction,
      // }),
      new NodePolyfillPlugin(),
    ],
    optimization: {
      minimize: isProduction,
      // splitChunks: { chunks: 'all' },
    },
  }

  if (isProduction) {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      })
    )
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      isProduction: JSON.stringify(isProduction),
    })
  )

  return config
}
