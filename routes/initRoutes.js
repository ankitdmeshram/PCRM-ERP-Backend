// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { initializeDatabase } = require('../controllers/initController');

router.post('/dbinit', initializeDatabase);

module.exports = router;
