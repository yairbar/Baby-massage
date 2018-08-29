var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var dir = path.join(__dirname, 'arbel');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/arbel' , express.static('arbel'));
app.use('/img', express.static('img'));
app.use('/css' , express.static('css'));
app.use('/js' , express.static('js'));
app.use('/doc' , express.static('doc'));
app.use(express.static(dir));



app.get('/', function(req, res) {
    res.sendFile(__dirname +  '/index.html');
});

//app.get("page/:page", function(req, res) {
//    res.sendFile(__dirname + '/' + res.params.page);
//})

app.get("/home.html", function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

app.get('/prvWorkshop.html', function(req, res) {
    res.sendFile(__dirname + '/prvWorkshop.html');
});

app.get('/pubWorkshop.html', function(req, res) {
    res.sendFile(__dirname + '/pubWorkshop.html');
});

app.get('/born.html', function(req, res) {
    res.sendFile(__dirname + '/born.html');
});

app.get('/present.html', function(req, res) {
    res.sendFile(__dirname + '/present.html');
});

app.get('/kesher.html', function(req, res) {
    res.sendFile(__dirname + '/kesher.html');
});

app.get('/me.html', function(req, res) {
    res.sendFile(__dirname + '/me.html');
});

app.get('data.html', function(req, res) {
    res.sendFile('http://localhost:3000/data.html');
});

app.listen(3000,function(){
    console.log("Started on PORT 3000");
})


app.post('/kesher/submit',function(req,res){
    
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    // console.log("User name = "+user_name+", password is "+password);

    var functions = require('firebase-functions');
    var nodemailer = require('nodemailer');

    var gmailEmail = functions.config().gmail.email;
    var gmailPassword = functions.config().gmail.password;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailEmail,
            pass: gmailPassword,
        }
    });

    var mailOptions = {
        from: gmailEmail,
        to: 'yair9088@gmail.com',
        subject: name + " מעוניינת בסדנת עיסוי תינוקות",
        text:"טלפון:" + phone + " \n אימיל:" + email
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/');
        }
    });
});



