const express = require('express');
const router = express.Router();
const user = require('../app/controllers/user-controller');
const detaill = require('../app/controllers/user-detail');
const {checktocken} = ('../app/controllers/auth')

router.post('/login', user.login);
router.post('/detail', detaill.detail);
router.post('/count', detaill.count);
router.post('/registration', user.registration);

module.exports = router;