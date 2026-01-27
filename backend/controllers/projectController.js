const Project = require('../models/Project');
const factory = require('./factoryController');

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
