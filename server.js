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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})
// 在线用户
let onlineUser = {}

// 在线用户人数
let onlineCount = 0

io.on('connection', function (socket) {
    // obj={uid:xxx.username:xxx}
    socket.on('login', function (obj) {
        if (!onlineUser.hasOwnProperty(obj.uid)) {
            onlineUser[obj.uid] = obj.username
            onlineCount++;
            console.log(obj.username + ' 进入聊天室')
        }
        io.emit('login', {
            onlineUser: onlineUser,
            onlineCount: onlineCount,
            username: obj.username
        })
    })

    socket.on("sendChatMessage", function (obj) {
        io.emit('sendChatMessage', obj)
        console.log(obj.username + '说：' + obj.sendMessage)
    })

    socket.on('logout', function (obj) {
        if (onlineUser.hasOwnProperty(obj.uid)) {
            const user = {
                uid: obj.uid,
                username: onlineUser[obj.uid]
            }
            delete onlineUser[obj.uid]
            onlineCount--
            io.emit('logout', {
                onlineUser: onlineUser,
                onlineCount: onlineCount,
                user: user
            })
            console.log(user.username + ' 退出了群聊', '还剩  ' + Object.values(onlineUser))
        }
    });
})

let port = 3000
http.listen(port, function () {
    console.log('listening on port ' + port)
})