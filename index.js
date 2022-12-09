const express = require('express');
const app = express();
const port = 8888;

app.get('/hello', (req, res) => {
    res.json({message: 'Hello express here!'})
});

app.listen(port, () => {
    console.log(`App is running on ${port}`)
});