const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");
const { response } = require("express");
// const { urlencoded } = require("body-parser");

app.use(express.json());


// koneksi kedalam mysql
const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'log-regDB'
});

// inplementasi cors
app.use(
        cors({
            origin: ["http://localhost:3000"],
            methods: ["GET","POST"],
            credentials: true,
        })
    )

// implementasi body-Parser
app.use(bodyParser.urlencoded({extended: true}));


// proses register
app.post("/register",(req,res) => {
    // ini mengambil data yg dikirim dari frontend
    const username = req.body.username;
    const password = req.body.password;
    const nama = req.body.nama;
    console.log(username, password, nama);
    
    bcrypt.hash(password,10,(err,hash) => {
        db.query(
            "INSERT INTO users(username,password,nama) VALUES(?,?,?)",
            [username,hash,nama]
        );
    })
})
        
    // proses login
    app.post("/login",(req, res) => {
        // ini mengambil data yg dikirim dari frontend
        const username = req.body.username;
        const password = req.body.password;
            db.query(
                "SELECT * FROM users WHERE username = ?;",
                username,
                (err,result) => {
                    if (err) {
                    res.send({err: err });
                    }
                    console.log(result.length);
                    if (result.length > 0) {
                        bcrypt.compare(password ,result[0].password, (error,response) => {
                            if (response) {
                                let token = jwt.sign(
                                    {userId: result[0].id, username:result[0].username },
                                    "secrentkeyappearshere",
                                    { expiresIn: "1h"}
                                );
                                res.send(token);
                            }else {
                                res.send({ massage: "Kombinasi username/password salah!"});
                            }
                        });
                    }else{
                        res.send({massage: "user tidak ditemukan!"});                        
                    }
                }
            );
       
    })


app.listen(3001, () => {
    console.log('server runing!')
});