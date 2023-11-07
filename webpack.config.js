const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/index.js', // Входной файл JavaScript
  output: {
    filename: 'bundle.[contenthash].js', // Имя собранного JavaScript файла
    path: path.resolve(__dirname, 'dist'), // Путь для сохранения собранного файла
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader', // Загрузчик для обработки HTML файлов
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Используем MiniCssExtractPlugin для извлечения стилей
          'css-loader', // Загрузчик для обработки CSS
          'sass-loader', // Загрузчик для обработки SCSS
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader', // Загрузчик для обработки шрифтов
            options: {
              name: 'fonts/[name].[ext]', // Указываем путь и имя для сохранения шрифтов
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader', // Загрузчик для обработки SVG-файлов
            options: {
              name: 'icons/[name].[ext]', // Указываем путь и имя для сохранения иконок
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Файл HTML, который используется как шаблон
    }),
    new MiniCssExtractPlugin({ filename: 'css/stylesheet.css' }), // Плагин для извлечения стилей в отдельный CSS файл
    new CleanWebpackPlugin(), // Плагин для очистки папки 'dist' перед каждой сборкой
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Указываем директорию, которая будет обслуживаться сервером
    },
    compress: true, // Включаем сжатие
    port: 8080, // Указываем порт, на котором будет работать сервер
  },
  optimization: {
    minimize: true, // Включить минимизацию
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false, // Удалить все комментарии
          },
        },
      }),
    ],
  },
};
