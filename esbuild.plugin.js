const { esbuildDecorators } = require('@anatine/esbuild-decorators');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

module.exports = () => {
  return [esbuildDecorators(), nodeExternalsPlugin()];
};
