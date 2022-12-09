const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 8080;
const dataDirPath = path.join(__dirname, 'data');
const defaultMovie = require('./data/default.json');
const app = express();


app.get('/title/:mid', (req, res) => {
  try {
    const filePath = `${dataDirPath}/${req.params.mid}.json`;
    const data = fs.readFileSync(filePath);
    return res.json(JSON.parse(data));
  } catch (err) {
    return res.json(defaultMovie);
  }
});

app.use('*', (req,res) => res.json({ "msg": "API Not Found" }));

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));

