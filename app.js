const express = require("express");
var cors = require("cors");
require("dotenv").config();

const course = require("./routes/courses");
const sync = require("./routes/sync");
const user = require("./routes/users");
const seeder = require("./routes/seeder");
const student = require("./routes/students");
const sequelize = require("./config/database");
const { association } = require("./controllers/association");
const { errorHandler } = require("./middleware/errorMiddleware");

app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

association();

app.use("/api/sync-database", sync);
app.use("/api/seeder", seeder);
app.use("/api/users", user);
app.use("/api/students", student);
app.use("/api/courses", course);

//connect database connection
sequelize
  .authenticate()
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(`Error: ${err}`));

const port = process.env.PORT || 6062;

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use(errorHandler);
