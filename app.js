var express = require('express')
var path = require('path')
var app = express()
var users = require('./user')
var bodyParser = require('body-parser')
var fs = require('fs')
/*
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
})
connection.connect(function(err) {
    if(err){
        console.error(err)
        return
    }
    console.log(connection.threadId)
})
*/
app.set('views' , path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/css'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


 
app.get('/user', function (req, res) {
    res.json(users.findAll());
});
 
app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});
var json;
 
app.post('/newuser', function (req, res) {
    json = req.body
    //var json = req.body;
    //res.send('Add new ' + json.name + ' Completed!');
    res.redirect('/')
});

function getUser(req,res){
    return users.findAll();
}


function getHomePage(req,res){
    res.render('index')
    /*
    connection.query('SELECT * from user where username = "admin"', function(err, rows, fields) {
        if (err) throw err
        console.log('The solution is: ', rows[0])
    })
    */
}

function getAboutPage(req,res){
    var ob = getUser();
    res.render('about', { layout : 'layout', json: JSON.stringify(ob)})
}
app.get('/', getHomePage)
app.get('/about' , getAboutPage)
var server = app.listen(8888, function(){
    console.log("Port 8888")
})