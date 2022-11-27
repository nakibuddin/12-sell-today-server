const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// middle wire

app.get('/', (req, res) => {
    res.send('welcome from server');
})

app.listen(port, () => console.log(`server is running on port ${port}`));