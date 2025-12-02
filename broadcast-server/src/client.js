import WebSocket from 'ws';
import readline from 'readline';

export function connectToServer() {
    const client = new WebSocket('ws://localhost:3001');

    client.on('open', () => {
        console.log('Connected to server');
        console.log('Type a message and press Enter to send:');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('line', (input) => {
            client.send(input);
            // Move cursor up one line and clear it to prevent duplicate logs if desired, 
            // but for simplicity we'll just let it be.
        });
    });

    client.on('message', (data) => {
        console.log(`Received: ${data}`);
    });

    client.on('close', () => {
        console.log('Disconnected from server');
        process.exit(0);
    });

    client.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
}
