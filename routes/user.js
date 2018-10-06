const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken');

const User = require('../models/user');

const response = require('../functions/response');

router.post('/signup', (req, res, next) => {
  if(!req.body.email || !req.body.password){
    return response.sendErr('Please provide an email or password', res);
  }
  User.find({email: req.body.email}, (err, user) => {
    console.log(user);
    if(user.length) {
      return res.json({err: 'Email not available'});
    } else {
      bcrypt.hash(req.body.password, Number(process.env.HASH_KEY), (err, hash) => {
        if(err) return response.sendErr('Error signing up')
        User.create({
          email: req.body.email, 
          password: hash
        }, (err, user) => {
          // if(err || user === null) return response.sendErr('Could not create user', res, err);
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          }, process.env.HASH_KEY,
          {
            expiresIn: '1h'
          })
          res.status(200).json({msg: 'User created', token});
        })
      })
    }
  })
})

router.post('/login', (req, res, next) => {
  User.find({email: req.body.email})
  .then(user => {
    if(user.length < 1) return response.sendErr('Username or password invalid', res);
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err) return response.sendErr('Username or password invalid', res);
      if(result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, 
        process.env.HASH_KEY, 
        {
          expiresIn: req.body.stayLoggedIn ? '365d' : '1h'
        })
        return res.status(200).json({
          msg: 'Authentication Successful',
          token
        });
      }
      response.sendErr('Username or password invalid', res);
    })
  })
})

router.post('/verify-token', (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.HASH_KEY);
    req.userData = decoded;
    res.json({msg: 'Authentication Successful'});
  } catch(err) {
    res.json({err: 'Authentication Unsuccesful'});
  }
})

module.exports = router;