const hbs = require("hbs");
const path = require("path");
const express = require("express");
const expressValidator = require("express-validator");
const fs = require("fs");
const getQuestions = require("./getQuestions");
const trackLogin = require("./trackLogin");
const UserSchema = require("./database/models/user"); //need help
const ScoresSchema = require("./database/models/scores");
const User = require("./lib/dbFunctions");
const cookieParser = require("cookie-parser");
const routes = require("./database/routes/users");
const auth = require("./database/routes");
const Entities = require("html-entities").AllHtmlEntities;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const publicDirectory = path.join(__dirname, "../public"); // where you want the static html files to come from
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const Joi = require("joi");
const app = express();
const entities = new Entities();
const mongoose = require("mongoose");

const ensureAuthenticated = require("./database/routes/index");
hbs.registerPartials(partialPath);
// use routes
app.use(routes);
app.use(auth);

app.use(cookieParser());
// Handle sessions
app.use(
  session({
    secret: "secret",
    saveUninitialised: true,
    resave: true
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());
// //Validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
// flash messages for handlebars
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(publicDirectory)); // how you can access the public directory
app.set("view engine", "hbs"); //allows you to use the handlebars template
app.set("views", viewsPath);

mongoose
  .connect(
    `mongodb+srv://tom:password123abc@triviatribunaldatabase-bdqjy.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connectedto MongoDB"))
  .catch(err => console.error("Something went wrong", err));

app.get("/api", (req, res) => {
  getQuestions(req.query.category, req.query.difficulty, (response) => {
    // console.log(response);
    if (response.error) {
      res.send({
        error: response.error
      });
    }
    //a switch statement to cover all of the response codes that the API provides
    switch (response.response_code) {
      case 0: //results returned successfully
        console.log("get api is running");

        //construct the array of questions

        const questions = [];

        response.results.forEach(result => {
          questions.push({
            question: entities.decode(result.question),
            correctAnswer: entities.decode(result.correct_answer),
            wrongAnswer1: entities.decode(result.incorrect_answers[0]),
            wrongAnswer2: entities.decode(result.incorrect_answers[1]),
            wrongAnswer3: entities.decode(result.incorrect_answers[2])
          });
        });
        res.send({
          questions: questions
        });
        break;
      case 1:
        res.send({
          error:
            "There are not enough questions in this category in order to start the quiz"
        });
        break;
      case 2:
        res.send({
          error: "Invalid parameters have been passed to the trivia API"
        });
        break;
      case 3:
        res.send({
          error: "Session token does not exist"
        });
        break;
      case 4:
        res.send({
          error:
            "There are no unasked questions to give, the session token must be reset"
        });
        break;
    }
  });
});
//this renders the home page
app.get("/", async (req, res) => {
  let userName = trackLogin.findUser(req, res);
  res.render("home", {
    home: true,
    userName: userName
  });
});

// app.post('/',async(req,res) => {
// });

//this renders the play page (where the questions are)
app.get("/gameChoosing", ensureAuthenticated, async (req, res) => {
  let userName = trackLogin.findUser(req, res);
  if (userName) {
    res.render("gameChoosing", {
      play: true,
      userName: userName
    });
  } else {
    res.redirect("registerlogin");
  }
});

//this renders the play page (where the questions are)
app.get("/play", async (req, res) => {
  let userName = trackLogin.findUser(req, res);
  if (userName) {
    res.render("index", {
      play: true,
      userName: userName
    });
  } else {
    res.redirect("registerlogin");
  }
});

//this renders the about page
app.get("/about", async (req, res) => {
  let userName = trackLogin.findUser(req, res);
  res.render("about", {
    about: true,
    userName: userName
  });
});

//this renders the high scores page
app.get("/high-scores", async (req, res) => {
  let userName = trackLogin.findUser(req, res);
  ScoresSchema.find({}, (err, obj) => {
    console.log(obj);
    res.render("highscores", {
      highscores: true,
      scoreList: obj,
      userName: userName
    });
  });
});

app.get("/signup_success", (req, res) => {
  let userName = trackLogin.findUser(req, res);
  res.render("signup_success", {
    userName: userName
  });
});

// register login page
app.get("/registerlogin", (req, res) => {
  let userName = trackLogin.findUser(req, res);
  res.locals.message = req.flash("message"); // trying to pass messages to the page
  res.render("registerlogin", {
    userName: userName
  });
  console.log("registerlogin page is loaded");
});
// creating new users in the database
app.post("/registerlogin", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  const password2 = req.body.password2;

  User.findOne({ username: username }, async (err, obj) => {
    console.log(obj);
    // let user = [ username, email, password ];
    console.log("username is ", username);
    if (err) {
      console.log("error");
    } else if (obj) {
      console.log("this username exists");
    } else if (password != password2) {
      console.log("the passwords did not match");
      res.redirect("/"); // {errors: 'The passwords did not match'}, TRYING TO pass errors to the page
    } else {
      const newUser = new UserSchema({
        username: username,
        email: email,
        password: password
      });
      console.log("saved user to the database");
      User.createUser(newUser, function(err, user) {
        if (err) throw error;
        console.log(user);
      });
      res.redirect("/signup_success");
    }
  });
});

/// log in form posting
app.post(
  "/login",
  passport.authenticate(
    "local" //{
    //   failureRedirect: "/registerlogin",
    //   failureFlash: "Invalid username or password"
    // }
  ),
  function(req, res) {
    trackLogin.setActiveUser(req, res, res.req.body.username);
    console.log("You are now logged in"); //////LOOK HERE TOM
    console.log(res.req.body.username);
    res.redirect("/gameChoosing");
  }
);
///// log in stuff
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid Password" });
        }
      });
    });
  })
);
/// displays if registered successfully
//this is duplicated and therefore likely not needed.
//TODO: Delete
// app.get("/signup_success", (req, res) => {
//   res.render("signup_success");
// });

app.get("/logout", function(req, res) {
  let userName = trackLogin.findUser(req, res);
  trackLogin.clearUser(req, res, userName);
  req.logout();
  req.flash("success", "You are now logged out");
  res.redirect("/registerlogin");
});
// app.get("*", function(req, res, next ){
//   res.locals.user = res.req.body.username || null;
// });
app.get("*", (req, res) => {
  res.send("<h1>404 your page does not exist</h1>");
});

app.listen(3000, () => {
  console.log("server is running ");
});
