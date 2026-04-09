const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: {
    type: String,
    required: [true, 'Please add a specialty (e.g., General, Dermatologist, Nutritionist)']
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience']
  },
  consultationFee: {
    type: Number,
    required: [true, 'Please add consultation fee']
  },
  availability: [
    {
      day: { 
        type: String, 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
      },
      startTime: String, // e.g., "09:00"
      endTime: String    // e.g., "17:00"
    }
  ],
  isAcceptingNewPatients: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);