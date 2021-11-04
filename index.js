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
  console.log(readUsers());
  res.send(200);
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
      console.log(err) };
    return results;
});
}

function writeUser(user) {
  db.query('insert into users values (' + user.id + ',"' + user.firstName + '","' + user.lastName + '");');
  return "user successfully created"
}

function editUser(id, user) {
  db.query('UPDATE users SET firstName="' + user.firstName + '", lastName="' + user.lastName + '" where id=' + id)
    return "user successfully edited"
}

function deleteUser(userId) {
  db.query('DELETE FROM users where id=' + userId), function (err) {
  if(err) console.log(err);
  }
    return "user successfully deleted"
}


