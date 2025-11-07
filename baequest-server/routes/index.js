const router = require('express').Router();
const userRouter = require('./users');
const {
  createUser,
  login,
  logout,
} = require("../controllers/users");
 const {places} = require('../controllers/places');

router.use('/users', userRouter);
router.post('/signup', createUser);
router.post('/signin', login);
router.post('/logout', logout);
router.get('/places', places)
module.exports = router;