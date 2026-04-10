const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

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

// @desc    Get logged in user's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
exports.getMyAppointments = async (req, res) => {
  try {
    // Find appointments where the patient ID matches the logged-in user's ID
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name' } // Deep populate to get the doctor's name
      })
      .sort({ date: 1 }); // Sort by closest date first

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel/Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Security Check: Ensure the logged-in user actually owns this appointment
    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }

    await appointment.deleteOne();

    res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get appointments for the logged-in doctor
// @route   GET /api/appointments/doctor-appointments
// @access  Private
exports.getDoctorAppointments = async (req, res) => {
  try {
    // 1. Find the doctor profile linked to the logged-in user
    const doctorProfile = await Doctor.findOne({ user: req.user.id });

    if (!doctorProfile) {
      return res.status(404).json({ message: 'Doctor profile not found. Please complete your profile.' });
    }

    // 2. Find all appointments booked with this doctor
    // We use .populate() to get the patient's name and email from the User model
    const appointments = await Appointment.find({ doctor: doctorProfile._id })
      .populate('patient', 'name email')
      .sort({ date: 1 }); // Sort by closest date first

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};