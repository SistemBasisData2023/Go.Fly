const express = require('express');
const bodyParser = require('body-parser');
const { testDatabaseConnection } = require('./src/config/config');
const accountRoutes = require('./src/routes/accountRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const flightsRoutes = require('./src/routes/flightsRoutes');
// const queueRoutes = require('./src/routes/queueRoutes');
// const transactionRoutes = require('./src/routes/transactionRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/account', accountRoutes);
app.use('/admin', adminRoutes);
app.use('/flights', flightsRoutes);
// app.use('/queue', queueRoutes);
// app.use('/transaction', transactionRoutes);

testDatabaseConnection();
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
