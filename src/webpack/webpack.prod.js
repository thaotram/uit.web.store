import globalConfig from './webpack.config';

export default {
    ...globalConfig,
    ...{
        mode: 'production',
        entry: ['@babel/polyfill', './src/client/script/script.js'],
    },
};
