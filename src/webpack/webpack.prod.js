import globalConfig from './webpack.config';

export default {
    ...globalConfig,
    ...{
        mode: 'production',
        entry: ['./src/client/script/script.js'],
    },
};
