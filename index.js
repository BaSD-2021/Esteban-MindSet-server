const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router')

const app = express();
const PORT = 4000;

mongoose.connect(
  'mongodb+srv://BaSD:BaSD2021@cluster0.5vk6q.mongodb.net/mindSet?retryWrites=true&w=majority',
  (error) => {
    if (error) {
      console.log('Error: ', error)
    } else {
      console.log('Database connected')
    }
  },
);

app.use(cors());

app.use('/api', router)

router.use(express.json())

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server runing on port ${PORT}`);
});
