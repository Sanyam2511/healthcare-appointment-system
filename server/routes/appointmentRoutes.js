const express = require('express');
const { bookAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import our security guard

const router = express.Router();

// We put `protect` in the middle to secure the route
router.post('/', protect, bookAppointment);

module.exports = router;