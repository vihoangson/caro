const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
    res.write("<h1>The server is working!</h1>");
    res.end();
});

io.on("connection", function(socket) {
    console.log("A user has connected...");
    socket.on("chat message", function(channelName) {
        console.log('chat message: '+channelName);
    });
});

http.listen(3000, function() {
    console.log("listening on *:3000");
});
