var express = require('express')
var app = express()
app.use(express.static('dist'))
app.get('/esd', function (req, res) {
    res.sendFile(__dirname + "/dist/" + "index.html")
})
var server = app.listen(8079, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为 http://%s:%s", host, port)
})