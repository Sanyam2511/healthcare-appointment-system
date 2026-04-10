const express = require('express');
const { getDoctors, seedDoctors } = require('../controllers/doctorController');

const router = express.Router();

router.get('/', getDoctors);
router.post('/seed', seedDoctors);

module.exports = router;