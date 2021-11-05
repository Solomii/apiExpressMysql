require("dotenv").config();
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const db = require("./models/db");
const express = require('express');
const jsonOffset = 4;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/users', (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(readUsers());
});

app.post('/user/new', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(writeUser(req.body));
  res.send(201)
});
 
app.patch('/user/:userId', (req, res) => {
  let userId = parseInt(req.params.userId);
  if (!userId) return res.sendStatus(404);
  console.log(editUser(userId, req.body));
  res.send(201);
});
 
app.delete('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log(deleteUser(userId));
   res.send(204);
});
 

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});

function readUsers() {
  db.query("SELECT * FROM users", function(err, results) {
    if (err) { 
      console.log(err)
    };
    let usersArray = [];
    results.forEach(element => {
      usersArray.push({ firstName: element.firstName, lastName: element.lastName, id:element.id});
    });
    console.log(JSON.stringify(usersArray))
    return JSON.stringify(usersArray);
});
}

function writeUser(user) {
  db.query('insert into users values (' + db.escape(user.id) + ',' + db.escape(user.firstName) + ',' + db.escape(user.lastName) + ');');
  return "user successfully created"
}

function editUser(id, user) {
  db.query('UPDATE users SET firstName=' + db.escape(user.firstName) + ', lastName=' + db.escape(user.lastName) + ' where id=' + db.escape(id))
    return "user successfully edited"
}

function deleteUser(userId) {
  db.query('DELETE FROM users where id=' + db.escape(userId)), function (err) {
  if(err) console.log(err);
  }
    return "user successfully deleted"
}


