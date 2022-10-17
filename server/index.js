const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Accounts = require("./src/routes/accounts");
const Wishlists = require("./src/routes/wishlists");
require("./config/database");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/accounts", Accounts);
app.use("/wishlists", Wishlists);

app.listen(3001, () => {
  console.log("Server is online.");
});
