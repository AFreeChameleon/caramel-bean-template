//Requirements
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const indexRoutes = require("./routes/index");
//!Requirements
const userRoutes = require("./auth/routes/auth");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
//!Requirements
// Passport Config
require("./auth/config/passport")(passport);
// DB Config
db = require("./auth/config/keys").MongoURI;
// Connection to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect Flash
app.use(flash());
// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", userRoutes);

app.use(indexRoutes);

app.listen(PORT, console.log(`Server started on: ${PORT}`));
