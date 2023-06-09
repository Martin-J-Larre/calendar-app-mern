const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./db/config");

const app = express();
dbConnection();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/event"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
