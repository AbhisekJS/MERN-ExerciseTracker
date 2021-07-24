// Import Router
const router = require('express').Router();
// Import User Model
let User = require('../models/users.model')

// configure Router

//Get All users
router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//Add user to Route
router.route('/add').post((req, res) => {
    const username = req.body.username;
  
    const newUser = new User({username});
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;