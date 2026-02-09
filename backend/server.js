const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/" ,( req,res) => {
    res.send("Welcom to WearX API")
});

app.listen(PORT ,() =>{
    console.log(`server is running on http://localhost:${PORT}`);
})