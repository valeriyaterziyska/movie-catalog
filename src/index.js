const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const PORT = 5000;

const router = require('./routes');

const app = express();

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}....`));
