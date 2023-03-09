const express = require('express');

const router = require('./routes');

const port = process.env.PORT || 5000;

const app = express();

app.use('/status', router);
app.use('/stats', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
