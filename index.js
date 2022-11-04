const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// cors using as a middleware to connect client and server site
app.use(cors());

app.use(express.json());

const users = [
    {"id": 1, "name": "sabana", "email": "sabana@gamil.com"},
    {"id": 2, "name": "sabnoor", "email": "sabnoor@gamil.com"},
    {"id": 3, "name": "sabila", "email": "sabila@gamil.com"}
]




app.get('/', (req, res) => {
    res.send('Simple node server is running')
})

app.get('/users', (req, res) => {
    console.log(res.query)
    res.send(users)
})

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    console.log(user)
    res.send(user)
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})