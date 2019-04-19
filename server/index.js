import http from 'http';
import dotenv from 'dotenv';
import app from './app';
import './models/index';

dotenv.config();

const port = parseInt(process.env.PORT || 3000, 10);
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    return console.log('Server failed to start!');
  }
  console.log(`Server started on http://localhost:${port}`);
});
