const express = require('express');
const { bookAppointment, getMyAppointments, cancelAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import our security guard

const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/my-appointments', protect, getMyAppointments);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;