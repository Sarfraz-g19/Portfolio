const Profile = require('../models/Profile');
const factory = require('./factoryController');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne(); // We only ever have one
        res.status(200).json({ status: 'success', data: profile });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.status(200).json({ status: 'success', data: profile });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
