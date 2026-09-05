const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

const uri =
  "mongodb+srv://vercel-admin-user:jvnNxymxsJq74CQt@cluster007.rejsrkm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster007";

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}
connectToMongoDB();

// Register a new user
app.post("/api/registerUser", async (req, res) => {
  try {
    const { email, password } = req.body;
    const database = client.db("accounts").collection("credentials");

    const emailExists = await database.findOne({ email });
    if(emailExists) {
      return res.status(401).json({
        status: 401,
        message: "An account with this email already exists"
      });
    }
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);

    const response = await database.insertOne({
      email,
      password: hashedPassword,
    });
    if(response.acknowledged) {
      res.status(201).json({
        data: {
          status: 201,
          message: "Account created"
        },
      });
    }
  } catch (e) {
    res.status(500).json("Error registering new user: ", e);
  }
});

app.post("/api/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const database = client.db("accounts").collection("credentials");

    const response = await database.findOne({ email });
    console.log("response: ", response);
    if (!response) {
      return res.status(401).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, response.password);
    console.log(isMatch);

    if(isMatch) {
      res.status(200).json({
        status: 200,
        message: "Login successful"
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "Either your email or password is incorrect. Please try again."
      });
    }
  } catch(e) {
    res.status(500).json({
      status: 500,
      message: `"Error logging in: ${e}`
    });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
