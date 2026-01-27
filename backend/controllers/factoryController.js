// Generic controller for CRUD operations
exports.getAll = (Model) => async (req, res) => {
    try {
        const docs = await Model.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: docs
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getOne = (Model) => async (req, res) => {
    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ status: 'fail', message: 'No document found with that ID' });
        }
        res.status(200).json({ status: 'success', data: doc });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.createOne = (Model) => async (req, res) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json({ status: 'success', data: doc });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateOne = (Model) => async (req, res) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return res.status(404).json({ status: 'fail', message: 'No document found with that ID' });
        }
        res.status(200).json({ status: 'success', data: doc });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteOne = (Model) => async (req, res) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return res.status(404).json({ status: 'fail', message: 'No document found with that ID' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
