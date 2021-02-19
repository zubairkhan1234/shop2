var express = require('express')
var cors = require('cors')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require("path")
var bcrypt = require("bcrypt-inzi")
var jwt = require('jsonwebtoken');

var SERVER_SECRET = process.env.SECRET || "3456";

const PORT = process.env.PORT || 5000;


// let dbURI = "mongodb+srv://zubairabc:zubairabc@cluster0.9qvbs.mongodb.net/testdatabase";
// let dbURI = 'mongodb://localhost:27017/abc-database';
let dbURI = "mongodb+srv://zubairabc:zubairabc@cluster0.j83vk.mongodb.net/testdatabase?retryWrites=true&w=majority"


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })





///////////************** Mongodb connected or disconnected Events ***********/////////////


mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected")

})

mongoose.connection.on('disconnectes', function () {
    console.log("mongoose is disconnected")
    process.exit(1)
})


mongoose.connection.on('error', function (err) {
    console.log('mongoose connecion is in error: ', err)
    process.exit(1)

})

mongoose.connection.on('SIGNIT', function () {
    console.log('app is turminating')
    mongoose.connection.close(function () {
        console.log('mongoose default connection is closed')
        process(0)
    })


})


///////////************** Mongodb connected or disconnected Events ***********/////////////


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,

    createdOn: { type: Date, 'default': Date.now }


})

var shopModel = mongoose.model("users", userSchema)

var app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));

app.post('/signup', (req, res, next) => {

    if (!req.body.userName
        || !req.body.userEmail
        || !req.body.userPhone
        || !req.body.userPassword) {
        res.status(403).send(`
        please send complete information
        e.g:
        {
            "name": "xyz",
            "email": "xyz@gmail.com",
            "password": "1234",
            "phone": "01312314",
        }`);
        return
    };



    shopModel.findOne({ email: req.body.userEmail }, function (err, data) {



        if (err) {
            console.log(err)
        } else if (!data) {

            bcrypt.stringToHash(req.body.userPassword).then(function (HashPassword) {
                var newUaser = new shopModel({
                    "name": req.body.userName,
                    "email": req.body.userEmail,
                    "password": HashPassword,
                    "phone": req.body.userPhone,
                });

                newUaser.save((err, data) => {
                    if (!err) {
                        res.status(200).send({
                            message: "User created"
                        })
                    } else {
                        console.log(err)
                        res.status(403).send({
                            message: "SignUP field"
                        })
                    };

                });

            })


        } else {

            res.status(403).send({
                message: "User already exist"
            })
        }
    })


});


app.post("/login", (req, res, next) => {
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    // console.log(userEmail)
    // console.log(userPassword)

    if (!userEmail || !userPassword) {

        res.status(403).send(`
            please send email and passwod in json body.
            e.g:
            {
                "email": "malikasinger@gmail.com",
                "password": "abc",
            }`)
        return;
    }

    shopModel.findOne({ email: userEmail }, function (err, loginRequestUser) {

        if (err) {
            console.log(err)
        } else if (loginRequestUser) {

            bcrypt.varifyHash(userPassword, loginRequestUser.password).then(match => {

                if (match) {

                    var token = jwt.sign({
                        name: loginRequestUser.name,
                        email: loginRequestUser.email,
                        phone: loginRequestUser.phone,
                        id: loginRequestUser.id,
                        ip: req.connection.remoteAddress

                    }, SERVER_SECRET)

                    res.status(200).send({
                        message: "login success",

                        loginRequestUser: {
                            name: loginRequestUser.name,
                            email: loginRequestUser.email,
                            phone: loginRequestUser.phone
                        },
                        token: token
                    })

                } else {
                    res.status(404).send({
                        message: "Incorrect password"
                    })
                }
            }).catch(e =>{
                console.log("errer : ", e)
            })

        } else {
            res.send({
                message: "User not found",
                status: 403
            })
        }

    })

})





app.listen(PORT, () => {
    console.log("surver is running on : ", PORT)
});







