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
  res.json({ link: `http://localhost:80/${link}` });
});

app.get('/:link', async (req, res) => {
  const { link } = req.params;
  const paste = await Paste.findOne({ link });
  if (paste) {
    res.json(paste);
  } else {
    res.status(404).json({ error: 'Paste not found' });
  }
});

app.post('/:link', async (req, res) => {
  const { link } = req.params;
  const { password } = req.body;
  const paste = await Paste.findOne({ link });
  if (paste) {
    if (paste.password) {
      const match = await bcrypt.compare(password, paste.password);
      if (!match) return res.status(401).json({ error: 'Invalid password' });
      res.json(paste);
    } else {
      res.json(paste);
    }
  } else {
    res.status(404).json({ error: 'Paste not found' });
  }
});


app.get('/api/pastes', async (req, res) => {
  try {
    const pastes = await Paste.find({}, 'link');
    res.json(pastes);
  } catch (error) {
    res.status(500).json({ error: 'Error au moment de fetch les pastes' });
  }
});

app.delete('/api/pastes/:link', async (req, res) => {
  const { link } = req.params;
  try {
    const result = await Paste.deleteOne({ link });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Paste not found' });
    }
    res.json({ message: 'Paste supprimé avec success!!' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});