const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./db/config");

const app = express();
dbConnection();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
