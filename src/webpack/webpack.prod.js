import globalConfig from './webpack.config';

export default {
    ...globalConfig,
    ...{
        mode: 'production',
        entry: {
            index: './src/client/script/script.js',
        },
    },
};
