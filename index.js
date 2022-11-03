const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// cors using as a middleware to connect client and server site
app.use(cors());


app.get('/', (req, res) => {
    res.send('Simple node server is running.')
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})