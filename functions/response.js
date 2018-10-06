module.exports = {
  // Send a JSON error with a status code and error message
  sendErr: function(errorMessage, res, err) {
    if(err) console.error(err);
    if(res && errorMessage) res.json({err: errorMessage});
  },
  // Send a JSON message with a status code and message
  sendMsg: function(successMessage, res) {
    res.json({msg: successMessage});
  }
}