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
// 在线用户
let onlineUser = {}

// 在线用户人数
let onlineCount = 0

io.on('connection', function (socket) {
    socket.on('login', function (obj) {
        if (!onlineUser.hasOwnProperty(obj.uid)) {
            onlineUser[obj.uid] = obj.username
            onlineCount++;
        }
        io.emit('login', {
            onlineUser: onlineUser,
            onlineCount: onlineCount
        })
    })

    socket.on("sendChatMessage", function (obj) {
        io.emit('sendChatMessage', obj)
        console.log(obj.username + '说：' + obj.sendMessage)
    })

    socket.on('disconnected', function () {
        console.log('user disconnected')
    });
})

let port = 3000
http.listen(port, function () {
    console.log('listening on port ' + port)
})