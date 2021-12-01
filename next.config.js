const fs = require('fs');
const path = require('path');

const { NODE_ENV } = process.env;
const URL_PATH = '/react-blog'; // github pages url
const BOARD_MD_DIR = './public/static/data/board/';
const CATEGORY_LEN = {};

const folders = fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);

folders.forEach((category) => {
  const files = fs.readdirSync(`${BOARD_MD_DIR}${category}`).map((folder) => folder);
  const boardLen = files.length;
  CATEGORY_LEN[category] = boardLen;
});

const isProd = NODE_ENV === 'production';

module.exports = {
  env: {
    BOARD_MD_DIR,
    CATEGORY_LEN: JSON.stringify(CATEGORY_LEN),
  },
  basePath: isProd ? URL_PATH : '',
  assetPrefix: isProd ? URL_PATH : '',
  compress: true,
  webpack: (config, options) => {
    const customConfig = { ...config };
    if (!options.dev) {
      customConfig.devtool = options.isServer ? false : 'cheap-module-source-map';
    }
    return {
      ...customConfig,
    };
  },
};
