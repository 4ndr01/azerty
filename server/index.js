const bcrypt = require('bcrypt');
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
    messages: Array,
    image:{
        type: String

    }





}
);



const User = mongoose.model('User', userSchema);
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
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(req.body);
    const users = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        image: req.body.image




    })
    //save to database
    users.save().then(data => {
        res.json(data);
    });
});

// TODO: verifier si l'utilisateur est dans la base de données
app.get('/signin', (req, res) => {
  
        const { username, password } = req.query;


        User.findOne({ username: username, password: password })
            .then((user) => {
                if (user) {
                    res.json(user);

                } else {
                    res.json(false);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'An error occurred while searching for the user.' });
            });

}
);








//modifier le username
app.put('/users/:username', (req, res) => {

    const username = req.params.username;
    const newUsername = req.body.username;

    User.findOne({ username: username })
        .then((user) => {
            if (user) {
                user.username = newUsername;
                user.save();
                res.json(user);
            } else {
                res.json(false);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while searching for the user.' });
        });

}
);

//modifier l'image

app.put('/users/:image', (req, res) => {
    const image = req.params.image;
    const newImage = req.body.image;

    User.findOne({ image: image })
        .then((user) => {
            if (user) {
                user.image = newImage;
                user.save();
                res.json(user);
            } else {
                res.json(false);
            }
        }
        )
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while searching for the user.' });
        }
        );

});

//recupérer les données de l'utilisateur
app.get('/users/:username', (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.json(false);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while searching for the user.' });
        });

}
);





