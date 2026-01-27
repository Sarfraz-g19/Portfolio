const Certification = require('../models/Certification');
const factory = require('./factoryController');

exports.getAllCertifications = factory.getAll(Certification);
exports.getCertification = factory.getOne(Certification);
exports.createCertification = factory.createOne(Certification);
exports.updateCertification = factory.updateOne(Certification);
exports.deleteCertification = factory.deleteOne(Certification);
