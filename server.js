let express = require('express')

const app = express()

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

app.get('/about',function(req,res){
    res.send('birds ')
})
let port = 3000
app.listen(port, function () {
    console.log('listening on port '+port)
})

