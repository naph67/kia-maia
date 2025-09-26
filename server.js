require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const songRoutes = require('./routes/songs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/add-song', songRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});