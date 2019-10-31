//Requirements
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const indexRoutes = require("./routes/index");
//!Requirements

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);

app.listen(PORT, console.log(`Server started on: ${PORT}`));
