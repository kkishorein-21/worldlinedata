var pool = require('./connection')
var express = require('express');
const app = express();
app.set('view engine','ejs');
var bodyParser = require('body-parser');
app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
app.post('/',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var gender = req.body.gender;
    var qualification = req.body.qualification;
    var datej = req.body.datej;
    var dater = req.body.dater;
    var country = req.body.country;

    var sql = "INSERT INTO employee(Name,Email,Mobile,Gender,Qualification,Dateofjoining,Dateofleaving,Country) VALUES(?,?,?,?,?,?,?,?);"
    pool.query(sql,[name,email,mobile,gender,qualification,datej,dater,country],function(err,result){
        if(err) throw err;
         res.redirect('/employeedetails');
    });
});

app.get('/employeedetails',function(req,res){
    pool.getConnection(function(err){
        if(err) throw err;

        var sql = "SELECT Name,Email,Mobile,Gender,Qualification,Dateofjoining,Dateofleaving,year(Dateofjoining) as yearj,year(Dateofleaving) as yearr,Country FROM employee";

        pool.query(sql,function(err,result){
            if(err) console.log(err);
            res.render(__dirname+'/employeedetails',{employeedetails:result});
        })
    })
})
app.listen(4000);
