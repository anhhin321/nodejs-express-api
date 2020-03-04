let express = require('express');
let app = express();
let mysql = require('mysql');
var cors = require('cors');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors());
app.use(bodyParser.json());

let con  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"demoso1"
});
con.connect((err)=>{
    if(err) throw err;
    console.log('connect mysql succsess');
    
})
app.get('/users', function (req, res, next) {
    con.query('SELECT * FROM example', function (error, results, fields) {
 

        if (error) throw error;
        // console.log(results);
        
        return res.send({ data: results});
    });
});

app.post('/add', urlencodedParser,(req,res, next)=>{
     var name = req.body.name,  
     age = req.body.age,
     email = req.body.email;
     var data = {
         name: name,
         age: age,
         email: email
     }
    con.query('INSERT INTO example SET ?',data, (err)=>{
        if(err) throw err;
        else{
            console.log('thanh cong');
            // con.end();
            
        }
    })
// console.log('ten la '+name);


})

// tìm kiếm
app.get('/find/:id',(req, res)=>{

    return res.redirect('/gettest/'+req.params.id);
    // console.log(req.params.id);
    
})
// test()
app.get('/gettest/:id',(req, res)=>{

    // return res.redirect('/getuser/'+req.body.id);
     con.query('SELECT * FROM example WHERE id='+req.params.id, function (error, results, fields) {
 

        if (error) throw error;
        // console.log(results);
        
        return res.send({ data: results});
        l
        
        
    });
    console.log(req.params.id);
    
})
app.get('/delete/:id',(req,res)=>{
    let id = req.params.id;
    con.query('DELETE FROM example WHERE id='+id, (err)=>{
        if (err) throw err;
        return  res.send({message: 'xóa thành công'})
    })
})
//update
app.post('/update/',(req,res)=>{
    let id = req.body.id;
    data = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }
    con.query('UPDATE example SET ? WHERE id='+id,data, (err)=>{
        if(err) throw err;
        console.log('thanh cong');
        
    })
})
app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
