// Create a server that listens for incoming connections.
// When a client connects, store the connection in a list of connected clients.
// When a client sends a message, broadcast this message to all connected clients.
// Handle client disconnections and remove the client from the list of connected clients.

import WebSocket, { WebSocketServer } from 'ws';

export function createServer() {
    const port = 3001;
    const wss = new WebSocketServer({ port });

    wss.on('listening', () => console.log(`Server is listening on ${port}`));

    wss.on('connection', (ws) => {
        console.log('Client connected');
        // Note: wss.clients automatically tracks connected clients

        ws.on('message', (message) => {
            console.log('Message received:', message.toString());

            // Broadcast to all connected clients using the built-in Set
            wss.clients.forEach((client) => {
                // Ensure the client is open and (optional) don't send back to self if desired
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
            // wss.clients automatically handles removal
        });
    });
}
