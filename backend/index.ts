import http from 'http';
import { port } from './confg';

const app = http.createServer();

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});