const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const ContactMessage = require('../models/ContactMessage');

// Helper to create CRUD routes for a model
const createCrudRoutes = (model, routeName) => {
    // GET all
    router.get(`/${routeName}`, async (req, res) => {
        try {
            const items = await model.find().sort({ createdAt: -1 });
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // POST create
    router.post(`/${routeName}`, async (req, res) => {
        try {
            const newItem = new model(req.body);
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // GET by ID
    router.get(`/${routeName}/:id`, async (req, res) => {
        try {
            const item = await model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Not found' });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // PUT update
    router.put(`/${routeName}/:id`, async (req, res) => {
        try {
            const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) return res.status(404).json({ message: 'Not found' });
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // DELETE
    router.delete(`/${routeName}/:id`, async (req, res) => {
        try {
            const deletedItem = await model.findByIdAndDelete(req.params.id);
            if (!deletedItem) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

createCrudRoutes(Profile, 'profile');
createCrudRoutes(Project, 'projects');
createCrudRoutes(Skill, 'skills');
createCrudRoutes(Experience, 'experience');
createCrudRoutes(Education, 'education');
createCrudRoutes(ContactMessage, 'contact_messages');

module.exports = router;
