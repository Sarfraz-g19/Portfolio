const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router
    .route('/')
    .get(profileController.getProfile)
    .patch(profileController.updateProfile);

module.exports = router;
