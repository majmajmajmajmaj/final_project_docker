const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 5000;

mongoose.connect('mongodb://mongo:27017/pastebin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => console.error('Error connecting to MongoDB:', error));

const PasteSchema = new mongoose.Schema({
  text: String,
  link: String,
  password: String || null,
});

const Paste = mongoose.model('Paste', PasteSchema);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});