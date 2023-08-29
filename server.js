const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('WebSocket Chat Server');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
    console.log('A new client connected.');

    socket.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
