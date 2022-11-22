const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");
const { urlencoded } = require("body-parser");

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
            credentials: true
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
            "INSERT INTO users(username ,password,nama) VALUES(?,?,?)",
            [username,hash,nama]
        );
    })
})


app.listen('3001', () => {
    console.log('server runing!')
})