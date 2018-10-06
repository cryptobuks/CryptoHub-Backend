const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verify-token');

const response = require('../functions/response');

const User = require('../models/user');

router.use(verifyToken);

// Toggle coin as favorite
router.post('/', function(req, res){
  User.findById(req.userData.userId)
  .exec((err, user) => {
    // General error
    if(err) return response.sendErr('Could not get user data', res, err);
    // Check if coinId was provided
    if(!req.body.coinId || req.body.coin === '') return response.sendErr('No coin symbol {coinId} provided', res); 
    // Check if coin symbol already exists in user favorites array
    for(let i = 0; i < user.favorites.length; i++){
      if(user.favorites[i] === req.body.coinId){
        user.favorites.splice(i, 1);
        user.save();
        return res.json({msg: 'Coin ' + req.body.coinId + ' unfavorited'});
      }
    }
    // Coin not found, add to favorites
    user.favorites.push(req.body.coinId);
    user.save()
    return res.json({msg: 'Coin ' + req.body.coinId + ' favorited'});
  })
})

module.exports = router;