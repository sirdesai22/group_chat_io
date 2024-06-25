import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'; // Import cors directly, not { cors }

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.ORIGINF,
        methods: ['GET', 'POST']
    }
});

// Apply CORS middleware to Express app
app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
