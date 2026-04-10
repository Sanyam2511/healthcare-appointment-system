const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email');
    
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Seed test doctors (TEMPORARY FOR DEVELOPMENT)
// @route   POST /api/doctors/seed
// @access  Public
exports.seedDoctors = async (req, res) => {
  try {
    // 1. Create a User for the doctor
    const testUser = await User.create({
      name: 'Dr. Sarah Jenkins',
      email: `dr.jenkins${Date.now()}@example.com`,
      password: 'password123',
      role: 'doctor'
    });

    // 2. Create the linked Doctor profile
    const testDoctor = await Doctor.create({
      user: testUser._id,
      specialty: 'Cardiology',
      experience: 12,
      consultationFee: 80,
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' }
      ]
    });

    res.status(201).json({ success: true, message: 'Test doctor seeded!', data: testDoctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create or update doctor profile
// @route   POST /api/doctors/profile
// @access  Private
exports.createProfile = async (req, res) => {
  try {
    const { specialty, experience, consultationFee } = req.body;

    // 1. Check if they already have a profile
    let doctor = await Doctor.findOne({ user: req.user.id });

    if (doctor) {
      return res.status(400).json({ message: 'Profile already exists.' });
    }

    // 2. Create the new linked profile
    doctor = await Doctor.create({
      user: req.user.id, // Linking it to the logged-in user!
      specialty,
      experience,
      consultationFee
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};