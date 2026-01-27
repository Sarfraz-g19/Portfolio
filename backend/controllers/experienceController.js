const Experience = require('../models/Experience');
const factory = require('./factoryController');

exports.getAllExperiences = factory.getAll(Experience);
exports.getExperience = factory.getOne(Experience);
exports.createExperience = factory.createOne(Experience);
exports.updateExperience = factory.updateOne(Experience);
exports.deleteExperience = factory.deleteOne(Experience);
