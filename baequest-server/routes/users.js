const router = require("express").Router();
const auth = require('../middleware/auth')
const {
  createProfile,
  getProfile,
   updateProfile
} = require("../controllers/profile");

router.post('/profile', auth, createProfile);
router.get('/profile', auth,  getProfile)
router.patch('/profile', auth, updateProfile )
module.exports = router;
