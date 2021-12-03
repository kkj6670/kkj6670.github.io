const { CATEGORY_LEN } = require('./scripts/getCategoryLen.js');
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
});

const { NODE_ENV } = process.env;
const URL_PATH = '/react-blog'; // github pages url
const BOARD_MD_DIR = './public/static/data/board/';

const isProd = NODE_ENV === 'production';

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  env: {
    BOARD_MD_DIR,
    URL_PATH: isProd ? URL_PATH : '',
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
});
