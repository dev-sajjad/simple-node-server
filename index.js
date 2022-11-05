const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// cors using as a middleware to connect client and server site
app.use(cors());

app.use(express.json());

const users = [
  { id: 1, name: "sabana", email: "sabana@gamil.com" },
  { id: 2, name: "sabnoor", email: "sabnoor@gamil.com" },
  { id: 3, name: "sabila", email: "sabila@gamil.com" },
];

// username: dbuser1
// password: 3ZEEYkBxssIQhhbp

const uri =
  "mongodb+srv://dbuser1:3ZEEYkBxssIQhhbp@cluster0.ozga6sm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// insert one to database
async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");

    app.post("/users", async(req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
        console.log(result)
        user.id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));



app.get("/", (req, res) => {
  res.send("Simple node server is running");
});

app.get("/users", (req, res) => {
    if (req.query.name || req.query.email) {
        const search = req.query.name || req.query.email;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0 || usr.email.toLowerCase().indexOf(search) >= 0 )
        res.send(filtered);
    } else {
         res.send(users);
  }
 
});

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(user)
//     res.send(user)
// })

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
