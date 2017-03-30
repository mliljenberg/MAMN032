import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import socket from 'socket.io';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
server.listen(3000);
console.log('server running...');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

io.sockets.on('connection', function (socket) {

  socket.on('join room', function (data) {
    console.log("Trying to join room: "+data);
    socket.join(data);
  });

  console.log('new connection');
  socket.on('disconnection', function (data) {
    console.log('disconnection');

  });

  socket.on('send message', function (data) {
    console.log("Trying to send data to only room: "+data);
    io.to(data).emit('new message');
  });

});
/**
 app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
 **/

