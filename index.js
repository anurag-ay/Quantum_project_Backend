const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/logging");
require("./startup/db")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listning on port ${port}..`));
