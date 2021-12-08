const { CATEGORY_LEN, BOARD_DATA } = require('./scripts/getBoardData');

const { NODE_ENV } = process.env;
const URL_PATH = ''; // github pages url
const BOARD_MD_DIR = './public/static/data/board/';

const isProd = NODE_ENV === 'production';

module.exports = {
  productionBrowserSourceMaps: true, // 프로덕션 빌드중 소스맵 생성x, 빌드속도 향상 https://nextjs.org/docs/advanced-features/source-maps
  images: {
    loader: 'imgix',
    path: '',
    domains: ['lh3.googleusercontent.com'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  env: {
    BOARD_MD_DIR,
    URL_PATH: isProd ? URL_PATH : '',
    CATEGORY_LEN: JSON.stringify(CATEGORY_LEN),
    BOARD_DATA: JSON.stringify(BOARD_DATA),
  },
  basePath: isProd ? URL_PATH : '',
  assetPrefix: isProd ? URL_PATH : '',
  compress: true,
  webpack: (config, { dev, isServer }) => {
    const customConfig = { ...config };

    if (dev) {
      // ip 외부접속 허용
      customConfig.devServer = {
        host: '0.0.0.0',
      };
    } else {
      customConfig.devtool = isServer ? false : 'nosources-source-map'; // https://nextjs.org/docs/messages/improper-devtool
    }

    return {
      ...customConfig,
    };
  },
};
