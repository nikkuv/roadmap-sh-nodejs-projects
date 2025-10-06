#!/usr/bin/env node


import { Command } from 'commander';
const program = new Command();
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 3600 }); // cache expires after 1 hour
import { createApp } from './src/server.js';

program.name('caching-proxy');

program.option('-p, --port <number>', 'Port on which the caching proxy server will run', '3000');
program.option('-o, --origin <url>', 'URL of the server to which the requests will be forwarded', 'https://dummyjson.com');
program.option('--clear-cache', 'Clear the cache');

program.action((options) => {
    console.log("options", options);
    if (options.clearCache) {
        console.log('🗑️  Clearing the cache...');
        // cache clearing 
        cache.flushAll();
        console.log('✅ Cache cleared successfully');
        process.exit(0);
    } else {
        // Get the values from command line or use defaults
        const PORT = options.port || '3000';
        const ORIGIN = options.origin || 'https://dummyjson.com';
        
        console.log(`Port: http://localhost:${PORT}`);
        console.log(`Origin: ${ORIGIN}`);
        
        // Create the app with the specified target
        const app = createApp(ORIGIN, cache);
        
        app.listen(PORT, () => {
            console.log(`🚀 Caching proxy server is running on port ${PORT} and origin ${ORIGIN}`);
        });
    }
});

program.parse(process.argv);