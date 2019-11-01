const bcrypt = require("bcryptjs");
const passport = require("passport");
// User model
const User = require("../models/User");

exports.GetRegister = (req, res) => {
  res.render("register");
};

exports.GetLogin = (req, res) => {
  res.render("login");
};

exports.PostRegister = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please fill in all fields"
    });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({
      msg: "Passwords do not match"
    });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({
      msg: "Password should be at least 6 characters"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validation passed
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          // User exists
          errors.push({
            msg: "Email is already in use"
          });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          // Hash Password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;

              // Set pwd to hashed
              newUser.password = hash;

              // Save the user
              newUser
                .save()
                .then(user => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in!"
                  );
                  res.redirect("/auth/login");
                })
                .catch(err => console.log(err));
            })
          );
        }
      })
      .catch(err => console.log(err));
  }
};

exports.PostLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/auth/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true
  })(req, res, next);
};

exports.GetLogout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Successfully logged out!");
  res.redirect("/auth/login");
};

exports.GetDashboard = (req, res) => {
  res.render("dashboard", {
    name: req.user.name
  });
};
