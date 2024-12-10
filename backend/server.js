const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

let nanoid;
(async () => {
  const { nanoid: importedNanoid } = await import('nanoid');
  nanoid = importedNanoid;
})();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

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

app.post('/api/paste', async (req, res) => {
  const { text, password } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  const link = nanoid(10);
  const newPaste = new Paste({ text, link, password: hashedPassword });
  await newPaste.save();
  res.json({ link: `http://localhost:4000/${link}` });
});

app.get('/:link', async (req, res) => {
  const { link } = req.params;
  const paste = await Paste.findOne({ link });
  if (paste) {
    res.json(paste);
  } else {
    res.status(404).json({ error: 'Paste non trouvé' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});