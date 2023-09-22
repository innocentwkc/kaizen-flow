const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const uploadMiddleware = require('./middleware/upload');

const app = express();
const PORT = 3020;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

// API endpoint to handle PDF uploads
router.post('/upload', uploadMiddleware, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }

  res.json({ message: 'PDF file uploaded successfully', filename: req.file.filename });
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
