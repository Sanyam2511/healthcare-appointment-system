const express = require('express');
const { bookAppointment, getMyAppointments, cancelAppointment, getDoctorAppointments, completeAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import our security guard

const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/my-appointments', protect, getMyAppointments);
router.get('/doctor-appointments', protect, getDoctorAppointments);
router.put('/:id/complete', protect, completeAppointment);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;