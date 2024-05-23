const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connection successfull.');
  })
  .catch((err) => {
    console.log('Error connectig DB:', err);
  });

readdirSync('./routes').map((route) => {
  app.use('/user', require('./routes/' + route));
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
