const express = require('express');
const { getDoctors, seedDoctors, createProfile, addReview } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getDoctors);
router.post('/seed', seedDoctors);
router.post('/profile', protect, createProfile);
router.post('/:id/reviews', protect, addReview);

module.exports = router;