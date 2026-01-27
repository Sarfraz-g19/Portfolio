const Skill = require('../models/Skill');
const factory = require('./factoryController');

exports.getAllSkills = factory.getAll(Skill);
exports.getSkill = factory.getOne(Skill);
exports.createSkill = factory.createOne(Skill);
exports.updateSkill = factory.updateOne(Skill);
exports.deleteSkill = factory.deleteOne(Skill);
