// create a server that will listen on the port
// and forward the requests to the origin

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export function createApp(target, cache) {
    const app = express();

    // Middleware to check if the request is in the cache
    app.use((req, res, next) => {
        const key = req.method + req.originalUrl;

        const cached = cache.get(key);
        if (cached) {
            res.writeHead(cached.statusCode, {
                ...cached.headers,
                'X-Cache': 'HIT'
            });
            console.log('X-Cache: HIT');
            res.end(cached.body);
            return;
        } 

        next();
    });
    
    app.use('/', createProxyMiddleware({
        target: target,
        changeOrigin: true,
        selfHandleResponse: true,
        on: {
            proxyRes: (proxyRes, req, res) => {
                
                // In Node.js, 
                // HTTP responses are streams 
                // (they come in little pieces called chunks instead of one big string).
               
                // Gather response chunks into body.
                let body = Buffer.from([]);
                proxyRes.on('data', (chunk) => {
                    body = Buffer.concat([body, chunk]);
                });
        
                // Wait until it's finished (end).
                proxyRes.on('end', () => {

                    // Create a key for the cache
                    const key = req.method + req.originalUrl;

                    // Convert body into string.
                    //const bodyString = body.toString();

                    // Grab headers
                    const headers = { ...proxyRes.headers };
                
                    // Save {statusCode, headers, body} into cache.
                    const cacheData = {
                        statusCode: proxyRes.statusCode,
                        headers: headers,
                        body: body
                    };

                    cache.set(key, cacheData);
                    
                    // Return the response to the client.
                    res.writeHead(proxyRes.statusCode, {
                        ...proxyRes.headers,
                        'X-Cache': 'MISS'
                      });
                      console.log('X-Cache: MISS');
                      res.end(body);
                });
            },
        }
    }));
    
    return app;
}
