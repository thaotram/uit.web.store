/**
 * @param {Number | undefined} id
 */
export default function(id) {
    return !id || id === -1 ? '#' : `http://graph.facebook.com/${id}/picture`;
}
