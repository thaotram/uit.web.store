import toEnglish from './toEnglish';
/**
 * @param {String} data
 * @param {String} search
 * @return {Boolean}
 */
export default function(data, search) {
    return (
        toEnglish(data)
            .toLowerCase()
            .indexOf(toEnglish(search).toLowerCase()) != -1
    );
}
