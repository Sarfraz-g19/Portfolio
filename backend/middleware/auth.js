const authMiddleware = (req, res, next) => {
    // Only protect write operations (POST, PUT, PATCH, DELETE)
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        const apiKey = req.headers['x-api-key'];
        const validApiKey = process.env.ADMIN_API_KEY;

        if (!apiKey || apiKey !== validApiKey) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized: Invalid or missing API Key'
            });
        }
    }
    next();
};

module.exports = authMiddleware;
