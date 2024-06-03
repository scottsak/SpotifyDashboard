const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: './src/index.tsx',
    background: './background.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images',
              publicPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '../manifest.json' },
        { from: 'background.js', to: '../background.js' },
        { from: 'popup.html', to: '../popup.html' },
        { from: 'popup.js', to: '../popup.js' },
        { from: 'spotifySDK.js', to: '../spotifySDK.js' },
        { from: 'images', to: '../images' },
      ],
    }),
    ...getHtmlPlugins(['index']),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: 'React extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
