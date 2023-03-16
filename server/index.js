const express = require("express");
const cors = require('cors');
const app = express();
const http = require('http');
app.use(cors());
const { Server } = require('socket.io');
const PORT = 3001;

const server = http.createServer(app);



const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
  console.log("socket=",socket.id);
    socket.on('CLIENT_MSG', msg => {
        console.log("msg=",msg);
        io.emit('TEST_MSG', msg);
    }
    );
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


//database
const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    rooms: Array

}
);

const roomSchema = new Schema({
    roomName: String,
    users: Array,
    messages: Array

}
);

const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);

mongoose.connect('mongodb+srv://marv:root@cluster0.l1ulwbg.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database");
}
);

//requetes post
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//inscription
app.post('/signup', (req, res) => {
    console.log(req.body);
    const users = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        rooms: []

    })
    //save to database
    users.save().then(data => {
        res.json(data);
    });
});

// TODO: verifier si l'utilisateur est dans la base de données
app.get('/signup', (req, res) => {
    User.find().then(data => {
        res.json(data);
    });


}
);






