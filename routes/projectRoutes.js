// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { test } = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.post('/test', auth, test);

module.exports = router;
