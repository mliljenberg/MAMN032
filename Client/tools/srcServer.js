import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

let users = [];
let connections = [];

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);


const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);
console.log('Server running...');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

/*
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
*/



io.sockets.on('connection', function(socket) {

  connections.push(socket);
  console.log("New socket connected");
  console.log(connections.length + " connections established");


  socket.on('disconnect', function (data) {

    connections.splice(connections.indexOf(socket), 1);
    console.log(connections.length + " connections established");
    connections.slice(connections.indexOf(socket), 1);


  });

//Hantera messages
  socket.on('send message', function(data) {
    io.sockets.emit('new message', {
      name: data.name,
      room: data.room
      //user: socket.username
    });
  });




});
