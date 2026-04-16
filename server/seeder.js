const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables (Make sure your .env has MONGO_URI)
dotenv.config();

// Import Models
const User = require('./models/User');
const Doctor = require('./models/Doctor');

// --- THE MOCK DATA ---
// --- THE MOCK DATA (28 Unique Doctors) ---
const doctorsData = [
  // --- Original 8 ---
  {
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@careconnect.com',
    password: 'password123',
    specialty: 'Cardiology',
    experience: 15, 
    consultationFee: 250,
    clinicAddress: 'Heart Health Institute, 400 Medical Way',
    averageRating: 4.9,
    profileImage: '/doctor-1.jpg'
  },
  {
    name: 'Dr. Marcus Chen',
    email: 'marcus.chen@careconnect.com',
    password: 'password123',
    specialty: 'Dermatology',
    experience: 8, 
    consultationFee: 180,
    clinicAddress: 'Clear Skin Clinic, Suite 2B, 800 Wellness Blvd',
    averageRating: 4.8,
    profileImage: '/doctor-2.jpg'
  },
  {
    name: 'Dr. Emily Carter',
    email: 'emily.carter@careconnect.com',
    password: 'password123',
    specialty: 'General Practice',
    experience: 12, 
    consultationFee: 100,
    clinicAddress: 'City Center Family Practice, 100 Main St',
    averageRating: 5.0,
    profileImage: '/doctor-3.jpg'
  },
  {
    name: 'Dr. James Wilson',
    email: 'james.wilson@careconnect.com',
    password: 'password123',
    specialty: 'Neurology',
    experience: 20,
    consultationFee: 300,
    clinicAddress: 'NeuroCare Associates, 55 Brainerd Rd',
    averageRating: 4.7,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Aisha Patel',
    email: 'aisha.patel@careconnect.com',
    password: 'password123',
    specialty: 'Pediatrics',
    experience: 10,
    consultationFee: 150,
    clinicAddress: 'Little Steps Pediatrics, 22 Joy Lane',
    averageRating: 4.9,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Robert Steele',
    email: 'robert.steele@careconnect.com',
    password: 'password123',
    specialty: 'Orthopedics',
    experience: 18,
    consultationFee: 280,
    clinicAddress: 'Joint & Bone Specialists, 99 Athletic Drive',
    averageRating: 4.6,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Elena Rodriguez',
    email: 'elena.rodriguez@careconnect.com',
    password: 'password123',
    specialty: 'General Practice',
    experience: 6,
    consultationFee: 90,
    clinicAddress: 'Telehealth / Virtual Clinic',
    averageRating: 4.5,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. William Chang',
    email: 'william.chang@careconnect.com',
    password: 'password123',
    specialty: 'Cardiology',
    experience: 25,
    consultationFee: 350,
    clinicAddress: 'State General Hospital, East Wing',
    averageRating: 4.9,
    profileImage: '/default-doctor.jpg'
  },

  // --- 20 NEW DOCTORS ---
  {
    name: 'Dr. Olivia Newton',
    email: 'olivia.newton@careconnect.com',
    password: 'password123',
    specialty: 'Psychiatry',
    experience: 14,
    consultationFee: 200,
    clinicAddress: 'Serenity Mental Health, Suite 4, Mindful Way',
    averageRating: 4.9,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Liam Gallagher',
    email: 'liam.gallagher@careconnect.com',
    password: 'password123',
    specialty: 'Orthopedics',
    experience: 22,
    consultationFee: 300,
    clinicAddress: 'Elite Sports Medicine, 100 Arena Blvd',
    averageRating: 4.8,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Sophia Martinez',
    email: 'sophia.martinez@careconnect.com',
    password: 'password123',
    specialty: 'Ophthalmology',
    experience: 9,
    consultationFee: 150,
    clinicAddress: 'ClearView Eye Center, 44 Vision Way',
    averageRating: 4.7,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Jackson Reed',
    email: 'jackson.reed@careconnect.com',
    password: 'password123',
    specialty: 'ENT',
    experience: 11,
    consultationFee: 180,
    clinicAddress: 'Breathe Easy Clinic, 22 Airway Dr',
    averageRating: 4.6,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Isabella Rossi',
    email: 'isabella.rossi@careconnect.com',
    password: 'password123',
    specialty: 'Gastroenterology',
    experience: 16,
    consultationFee: 250,
    clinicAddress: 'Digestive Health Associates, 80 Gut St',
    averageRating: 4.9,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Lucas Kim',
    email: 'lucas.kim@careconnect.com',
    password: 'password123',
    specialty: 'Oncology',
    experience: 28,
    consultationFee: 400,
    clinicAddress: 'Hope Cancer Center, 1 Oncology Park',
    averageRating: 5.0,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Mia Thompson',
    email: 'mia.thompson@careconnect.com',
    password: 'password123',
    specialty: 'Endocrinology',
    experience: 7,
    consultationFee: 160,
    clinicAddress: 'Hormone Balance Clinic, 33 Gland Ave',
    averageRating: 4.5,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Ethan Wright',
    email: 'ethan.wright@careconnect.com',
    password: 'password123',
    specialty: 'Rheumatology',
    experience: 13,
    consultationFee: 220,
    clinicAddress: 'Joint Wellness Institute, 50 Flex Rd',
    averageRating: 4.8,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Harper Lewis',
    email: 'harper.lewis@careconnect.com',
    password: 'password123',
    specialty: 'Urology',
    experience: 19,
    consultationFee: 270,
    clinicAddress: 'Advanced Urology Care, 12 Kidney Ln',
    averageRating: 4.7,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Alexander Scott',
    email: 'alexander.scott@careconnect.com',
    password: 'password123',
    specialty: 'General Practice',
    experience: 5,
    consultationFee: 80,
    clinicAddress: 'Neighborhood Care, 77 Community St',
    averageRating: 4.4,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Avery Nelson',
    email: 'avery.nelson@careconnect.com',
    password: 'password123',
    specialty: 'Pediatrics',
    experience: 14,
    consultationFee: 140,
    clinicAddress: 'Happy Kids Clinic, 5 Playground Pl',
    averageRating: 4.9,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Benjamin Young',
    email: 'benjamin.young@careconnect.com',
    password: 'password123',
    specialty: 'Cardiology',
    experience: 30,
    consultationFee: 450,
    clinicAddress: 'Premier Heart Center, 1000 Lifeline Blvd',
    averageRating: 4.9,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Chloe Adams',
    email: 'chloe.adams@careconnect.com',
    password: 'password123',
    specialty: 'Dermatology',
    experience: 4,
    consultationFee: 120,
    clinicAddress: 'Glow Skin Spa & Clinic, 20 Beauty Way',
    averageRating: 4.3,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Daniel Clark',
    email: 'daniel.clark@careconnect.com',
    password: 'password123',
    specialty: 'Neurology',
    experience: 24,
    consultationFee: 320,
    clinicAddress: 'Brain & Spine Institute, 88 Cortex Dr',
    averageRating: 4.8,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Ella Mitchell',
    email: 'ella.mitchell@careconnect.com',
    password: 'password123',
    specialty: 'Psychiatry',
    experience: 8,
    consultationFee: 190,
    clinicAddress: 'Mindful Therapy Partners, 15 Calm St',
    averageRating: 4.6,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Felix Hernandez',
    email: 'felix.hernandez@careconnect.com',
    password: 'password123',
    specialty: 'Orthopedics',
    experience: 17,
    consultationFee: 260,
    clinicAddress: 'Bone & Joint Health, 44 Skeletal Rd',
    averageRating: 4.7,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Grace Lee',
    email: 'grace.lee@careconnect.com',
    password: 'password123',
    specialty: 'Ophthalmology',
    experience: 21,
    consultationFee: 210,
    clinicAddress: 'Sight Savers Clinic, 99 Iris Ave',
    averageRating: 4.9,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Henry White',
    email: 'henry.white@careconnect.com',
    password: 'password123',
    specialty: 'ENT',
    experience: 6,
    consultationFee: 130,
    clinicAddress: 'Sound & Sinus Center, 30 Echo Ln',
    averageRating: 4.5,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Ivy Green',
    email: 'ivy.green@careconnect.com',
    password: 'password123',
    specialty: 'Gastroenterology',
    experience: 15,
    consultationFee: 230,
    clinicAddress: 'GI Specialists Group, 70 Colon Dr',
    averageRating: 4.8,
    profileImage: '/default-doctor.jpg'
  },
  {
    name: 'Dr. Jack King',
    email: 'jack.king@careconnect.com',
    password: 'password123',
    specialty: 'General Practice',
    experience: 10,
    consultationFee: 110,
    clinicAddress: 'Telehealth / Virtual Clinic',
    averageRating: 4.6,
    profileImage: '/default-doctor.jpg'
  }
];
const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // 2. Clear existing data (WARNING: This wipes your current users/doctors)
    await Doctor.deleteMany();
    await User.deleteMany();
    console.log('Old data cleared.');

    // 3. Loop through our mock data and insert it
    for (const docData of doctorsData) {
      
      // Hash the password manually just in case your User model pre-save hook doesn't fire in script mode
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(docData.password, salt);

      // Create the User document first
      const createdUser = await User.create({
        name: docData.name,
        email: docData.email,
        password: hashedPassword,
        role: 'doctor' // Ensure they have the correct permissions
      });

      // Create the connected Doctor profile document
      await Doctor.create({
        user: createdUser._id,
        specialty: docData.specialty,
        experience: docData.experience,
        consultationFee: docData.consultationFee,
        clinicAddress: docData.clinicAddress,
        averageRating: docData.averageRating,
        profileImage: docData.profileImage
      });
    }

    console.log(`✅ Successfully seeded ${doctorsData.length} doctors!`);
    process.exit();
    
  } catch (error) {
    console.error(`❌ Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();