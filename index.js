const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Server is okay!'));

app.listen(3000, () => console.log('Now listening on port 3000'));