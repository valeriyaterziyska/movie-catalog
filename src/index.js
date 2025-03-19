const express = require("express");

const configHandlebars = require("./config/configHandlebars");
const configExpress = require("./config/configExpress");
const routes = require("./routes");

const app = express();
const PORT = 5000;

configHandlebars(app);
configExpress(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}....`));
