/**
 * @param {Number | undefined} id
 */
export default function(id) {
    return !id || id === -1
        ? 'https://i.imgur.com/hlbvgL1.png'
        : `http://graph.facebook.com/${id}/picture`;
}
