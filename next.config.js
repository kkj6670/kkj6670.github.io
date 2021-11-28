const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const URL_PATH = '/react-blog'; // github pages url

module.exports = {
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
