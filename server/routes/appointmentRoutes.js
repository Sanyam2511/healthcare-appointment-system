const express = require('express');
const { bookAppointment, getMyAppointments, cancelAppointment, getDoctorAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import our security guard

const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/my-appointments', protect, getMyAppointments);
router.get('/doctor-appointments', protect, getDoctorAppointments);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;