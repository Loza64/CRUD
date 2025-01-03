import { createServer } from 'http';
import { port, runing } from './src/config';
import app from './src/app';

const server = createServer(app);

server.listen(port, () => { runing(`on port: ${port}`) });