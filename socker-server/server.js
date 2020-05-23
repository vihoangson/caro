const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
    res.write("<h1>The server is working!</h1>");
    res.end();
});

io.on("connection", function (socket) {
    console.log("A user has connected...");
    socket.join('room')

    socket.on("join", function (data) {
        console.log('user join: user:'+data.name);
        socket.join('user:'+data.name);
        io.to('room').emit('join_room', data.name);
    });

    socket.on("push", function (data) {
        console.log('pull ' + data);
        io.to('room').emit('pull', data);

    });
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});
