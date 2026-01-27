const express = require('express');
const certificationController = require('../controllers/certificationController');

const router = express.Router();

router
    .route('/')
    .get(certificationController.getAllCertifications)
    .post(certificationController.createCertification);

router
    .route('/:id')
    .get(certificationController.getCertification)
    .patch(certificationController.updateCertification)
    .delete(certificationController.deleteCertification);

module.exports = router;
