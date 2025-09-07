const express = require('express');
const { postData, getUserData, getAllData } = require('../controllers/dataController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/data', auth, postData);
router.get('/user/:id/data', auth, getUserData);
router.get('/admin/data', auth, adminAuth, getAllData);

module.exports = router;
