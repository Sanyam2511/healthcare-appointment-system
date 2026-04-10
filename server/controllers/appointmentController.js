const Appointment = require('../models/Appointment');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reasonForVisit } = req.body;

    // Ensure all fields are provided
    if (!doctorId || !date || !timeSlot || !reasonForVisit) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create the appointment. 
    // Notice how `req.user.id` comes from our security middleware!
    const appointment = await Appointment.create({
      patient: req.user.id, 
      doctor: doctorId,
      date,
      timeSlot,
      reasonForVisit
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};