const express = require("express");
const Router = require('./routes/route')
const cors = require("cors");
const dotenv = require("dotenv");
const { dbConnection } = require("./Db");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin:['http://localhost:5173','https://colleges-notes-websites.vercel.app'],
  methods:["POST","GET","PUT"],
  credentials:true,
  optionsSuccessStatus: 200,
}));
app.use(express.json());

app.use('/',Router)

dbConnection();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
