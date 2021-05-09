const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql'); // mysql 모듈

const path = require('path');
const helmet = require('helmet');
const crypto = require('crypto');
const key = JSON.parse(fs.readFileSync('./key.json'));
const jwt = require('jsonwebtoken');
const jwtJSON = JSON.parse(fs.readFileSync("./jwt.json"));

var cookieParser = require('cookie-parser');

// const conf = JSON.parse(fs.readFileSync('./database.json'));

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'nodejs',
  password: '985031',
  port: 3306,
  database: 'test',
});


connection.connect();

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000','http://localhost:8080','http://aaaqwe.herokuapp.com']
const corsOptions = {
  origin: function(origin, callback){
    console:log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) != -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allwed by CORS'))
    }
  }
}
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello world'));

app.get('/home', (req, res) => {
  const sql = 'SELECT * FROM test.product_info';
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DATA GET FAIL');
    } else {
      console.log('DATA GET Home');
      res.send(rows);
    }
  });
});
app.get('/search', (req, res) => {
  const textName = req.query.name;
  const sql = `SELECT * FROM test.product_info WHERE pdt_name LIKE '%${textName}%'`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DB SEARCH FAIL');
    } else {
      console.log('DB SEARCH SUCCESS');
      res.send(rows);
    }
  });
});
app.get('/idcheck', (req, res) => {
  const { id } = req.query;
  const sql = `SELECT 'exits' FROM user WHERE id="${id}"`;
  connection.query(sql, (err, rows, field) => {
    if (err) {
        console.log(err);
    }
    else {
        res.send(rows);
    }
  });
});
app.post('/register', (req, res) => {
  const Id = req.body.id;
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.pw).digest('base64'); //암호화,
  const Email = req.body.email;
  const Name = req.body.name;
  const Hp = req.body.hp;
  console.log(Id, Pw, Email, Name, Hp);
  const sql = `INSERT INTO test.user (id, pw, email, name, hp) VALUES ('${Id}', '${Pw}', '${Email}', '${Name}', '${Hp}')`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DB SAVE FAIL');
    } else {
      console.log('DB SAVE SUCCESS');
      res.send(rows);
    }
  });
});
app.post('/login', (req, res) => {
  const Id = req.body.inputId;
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.inputPs).digest('base64'); //암호화,
  console.log(Id, Pw);
  let customerInfo = [];
  const sql = `SELECT * FROM test.user WHERE id='${Id}' AND pw='${Pw}'`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
  }
  else {
      customerInfo = rows;
      if (customerInfo.length == 1) {
          let token = jwt.sign({
              id: customerInfo[0].id,
              name: customerInfo[0].name   // 토큰의 내용(payload)
          },
              jwtJSON.secret,    // 비밀 키
              {
                  expiresIn: '1m'    // 유효 시간은 5분 /1시간
              })

          res.cookie("user", token);
          res.send({ success: "true" });
          console.log(token);
      }
      else if (customerInfo.length != 1) {
          res.send({ success: "false" })
      }
    }
  })
}); // => 로그인 

app.delete('/logout',(req,res)=>{
  res.clearCookie('user').send(req.cookies.name);
 });
 
 app.get("/authority", (req, res) => {
     let token = req.cookies.user;
     let decoded = jwt.verify(token, jwtJSON.secret);
     if (decoded) {
         res.send(
             {
                status: 'login',
                id: decoded.id,
                name: decoded.name
             }
         )
     }
     else {
         res.send(
             {
                 status:'logout'
             }
         )
     }
 }); // => 권한확인
 
 if (process.env.NODE_ENV === 'production') {
   // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all request to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
 }
 
const port = process.env.port || 8080;
app.listen(port, () => {
  console.log(`The server is running on Port ${port}`);
});

// connection.end();
