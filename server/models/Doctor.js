const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: {
    type: String,
    required: [true, 'Please add a specialty']
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience']
  },
  consultationFee: {
    type: Number,
    required: [true, 'Please add consultation fee']
  },
  clinicAddress: {
    type: String,
    required: [true, 'Please add a clinic address or write Telehealth']
  },
  availability: [
    {
      day: { 
        type: String, 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
      },
      startTime: String, 
      endTime: String    
    }
  ],
  isAcceptingNewPatients: {
    type: Boolean,
    default: true
  },
  // --- NEW FIELDS FOR REVIEWS ---
  averageRating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);