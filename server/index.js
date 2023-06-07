const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./db/config");

const app = express();
dbConnection();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/event"));

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
