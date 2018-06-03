/**
 * Init SocketIO in Server
 * @param {SocketIO.Server} io
 */
export default function(io) {
    io.on('connection', client => {
        const sessionID = client.request.sessionID;
        const socketID = client.id;
        console.log(`${socketID} in`);

        client.on('request to server', (data_from_client, callback) => {
            callback({ socketID, sessionID, data_from_client });
        });

        client.on('disconnect', () => {
            console.log(`${socketID} out`);
        });
    });
}
