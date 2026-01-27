const express = require('express');
const skillController = require('../controllers/skillController');

const router = express.Router();

router
    .route('/')
    .get(skillController.getAllSkills)
    .post(skillController.createSkill);

router
    .route('/:id')
    .get(skillController.getSkill)
    .patch(skillController.updateSkill)
    .delete(skillController.deleteSkill);

module.exports = router;
