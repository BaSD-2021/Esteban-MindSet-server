require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

const app = express();

// app.use(express.static('public'));
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.DATABASE_URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('🔴 Database error: ', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('🟢 Database connected');
    }
  },
);

app.use('/api', router);
app.get('/', (req, res) => res.send('<h1>MindSet Server Running </h1>'));

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server runing on port ${process.env.PORT}`);
});
