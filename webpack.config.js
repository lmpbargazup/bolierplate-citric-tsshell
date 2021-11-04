/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const dotenv = require('dotenv')
const { DefinePlugin } = require('webpack')

const deps = require('./package.json').dependencies

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx')
  },
  cache: false,

  mode: 'none',
  devtool: 'source-map',

  optimization: {
    minimize: false
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src', 'components'),
      'core': path.resolve(__dirname, 'src', 'core'),
      'containers': path.resolve(__dirname, 'src', 'containers'),
      'pages': path.resolve(__dirname, 'src', 'pages'),
      'routes': path.resolve(__dirname, 'src', 'routes'),
      'hooks': path.resolve(__dirname, 'src', 'hooks'),
      'services': path.resolve(__dirname, 'src', 'services')
    },
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript']
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: '10000',
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'boilerplateshell',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './App': './src/App'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ]
}
