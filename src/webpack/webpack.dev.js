import globalConfig from './webpack.config';
import openInEditor from 'launch-editor-middleware';
import webpack from 'webpack';

const development = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server',
        './src/client/script/script.js',
    ],
    devServer: {
        hot: true,
        contentBase: './dist/client',
        before(app) {
            app.use('/__open-in-editor', openInEditor('code'));
        },
    },
};
const config = { ...globalConfig, ...development };
config.plugins.push(new webpack.HotModuleReplacementPlugin());

export default config;
