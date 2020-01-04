var fetch = require("isomorphic-unfetch");
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;
var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyCZi3hYSq6X4oe7iyXUwwQFC-TyPnHptJw",
  authDomain: "project-2-super-awesome.firebaseapp.com",
  databaseURL: "https://project-2-super-awesome.firebaseio.com",
  projectId: "project-2-super-awesome",
  storageBucket: "project-2-super-awesome.appspot.com",
  messagingSenderId: "272659106499",
  appId: "1:272659106499:web:2f1567247609fd67b6f076",
  measurementId: "G-VG9DZM1RZL"
};
firebase.initializeApp(config);
require("firebase/auth");
require("firebase/storage");

var admin = require("firebase-admin");
var serviceAccount = require("./firebaseaccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-2-super-awesome.firebaseio.com"
});

const getIdToken = (req) => {
  const authorizationHeader = req.headers.authorization || "";
  const components = authorizationHeader.split(" ");
  return components.length > 1 ? components[1] : "";
}

const checkIfSignedIn = (url) => {
  return (req, res, next) => {
    if (req.url == url) {
      const idToken = getIdToken(req);
      admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        var currentFbUserId = decodedToken.uid;
        var fetchURL = `${server}/api/users/firebase/${currentFbUserId}`;
        var currentDBUserId;
        var redirectURL;
        fetch(fetchURL).then(res => res.json()).then((data) => {
          currentDBUserId = data.id;
          redirectURL = `${server}/?userId=${currentDBUserId}`;
        });
        res.redirect("/");
      }).catch((err) => {
        next();
      });
    } else {
      next();
    }
  };
}
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(checkIfSignedIn("/"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
