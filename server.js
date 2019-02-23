const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const path = require('path')

app.use(express.static(__dirname))
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// io.on('connection',function(socket){
//     console.log('a user connected')
//     socket.on('disconnected',function(){
//         console.log('user disconnected')
//     });
//     socket.on('chat message',function(msg){
//         io.emit('some event',msg)
//         console.log('message: '+msg )
//     })
// })

let port = 3000
http.listen(port, function () {
    console.log('listening on port '+port)
})

