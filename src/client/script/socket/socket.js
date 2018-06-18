import io from 'socket.io-client';

export const socket = io();

/**
 * @param {import('vue').default} self
 */
export function initialize(self) {
    socket.on('connect', () => {
        // socket.on('update', async _ => {
        //     self.$store.dispatch('read', { return: 'json', _ });
        // });
    });
}
