const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Review = require('../models/Review');
const mongoose = require('mongoose');

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
    // 1. Add clinicAddress to the destructured body
    const { specialty, experience, consultationFee, clinicAddress } = req.body;

    let doctor = await Doctor.findOne({ user: req.user.id });

    if (doctor) {
      return res.status(400).json({ message: 'Profile already exists.' });
    }

    // 2. Add it to the creation payload
    doctor = await Doctor.create({
      user: req.user.id,
      specialty,
      experience,
      consultationFee,
      clinicAddress 
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a review for a doctor
// @route   POST /api/doctors/:id/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const doctorId = req.params.id;

    // 1. Create the review
    const review = await Review.create({
      doctor: doctorId,
      patient: req.user.id,
      rating,
      comment
    });

    // 2. Calculate new average rating for the doctor
    const stats = await Review.aggregate([
      { $match: { doctor: new mongoose.Types.ObjectId(doctorId) } },
      {
        $group: {
          _id: '$doctor',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    // 3. Update the Doctor document
    await Doctor.findByIdAndUpdate(doctorId, {
      averageRating: stats[0].avgRating.toFixed(1),
      reviewCount: stats[0].nRating
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this doctor.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};