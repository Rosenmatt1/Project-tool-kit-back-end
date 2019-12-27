const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    let token = req.headers.authorization.split(' ')[1];
    try {
      var decoded = jwt.verify(token, 'shhhhh');
      res.send({ message: decoded })
    } catch (err) {
      res.send(400)
    }
  }
});

router.get("/hidden", (req, res, next) => {
  //get auth header value
  const bearerHeader = req.headers['authorization']
  //check if bearer is undefined
  if (typeof bearerHeader !== undefined) {
    //split atthe space
    const bearer = bearerHeader.split(' ');
    //Get token from array
    const bearerToken = bearer[1];
    //Set the token 
    req.token = bearerToken;
    //Next middleware
    next()
  } else {
    res.send(403)
  }
});

module.exports = router;