var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', require('../controllers/users/signup').signup)
router.post('/login', require('../controllers/users/login').login)

module.exports = router;
