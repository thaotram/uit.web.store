import keys from '../keys';

export default keys.reduce((object, key) => {
    object[`load_${key}s`] = (state, data) => {
        state.data[`${key}s`] = data;
    };
    return object;
}, {});
