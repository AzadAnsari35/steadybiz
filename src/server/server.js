const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../build')));

// Using Express to get routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(
    `Development Environment: 🌎 Listening on http://localhost:${PORT}`
  );
});
 
