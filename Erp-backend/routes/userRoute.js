const express = require('express');
const upload = require('../middlewares/multer')

const { register, login, getUserData, logout, updateUserSalary, updateProfile } = require('../controllers/userController');
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const router = express.Router();

// router.route('/register').post(register);
router.route('/register').post( upload.single('image'),  register);
router.route('/login').post(login);
router.route('/logout').post(isVerifiedUser, logout);
router.route('/').get(isVerifiedUser , getUserData);

router.route('/:empNo').put(isVerifiedUser, updateUserSalary)
router.put('/update/:id', upload.single('image'), isVerifiedUser, updateProfile);


module.exports = router;