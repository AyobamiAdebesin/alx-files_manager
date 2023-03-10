/**
 * The entry point of the web application.
 */
const express = require('express');

const router = require('./routes/index');

const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use('/status', router);
app.use('/stats', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;
