let express = require('express')

const app = express()

const path = require('path')

app.use(express.static(__dirname))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.listen(3000, function () {
    console.log('listening on port 3000')
})

var WebSocket = require('ws')
var wss = new WebSocket.Server({port:8080})
wss.on('connection',function connection(ws){
    console.log('server: receive connection.')
    ws.on('message',function incoming(message){
        console.log('server: received: %s',message)
    })
    ws.send('world')
})
app.listen(3000)
