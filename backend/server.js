require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');

// Route imports
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const skillRoutes = require('./routes/skillRoutes');
const profileRoutes = require('./routes/profileRoutes');
const certificationRoutes = require('./routes/certificationRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(auth); // Protect write operations


// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/certifications', certificationRoutes);



app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running...' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
