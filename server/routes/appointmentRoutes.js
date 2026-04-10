const express = require('express');
const { bookAppointment, getMyAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import our security guard

const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/my-appointments', protect, getMyAppointments);

module.exports = router;