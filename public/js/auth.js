$(document).ready(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZi3hYSq6X4oe7iyXUwwQFC-TyPnHptJw",
    authDomain: "project-2-super-awesome.firebaseapp.com",
    databaseURL: "https://project-2-super-awesome.firebaseio.com",
    projectId: "project-2-super-awesome",
    storageBucket: "project-2-super-awesome.appspot.com",
    messagingSenderId: "272659106499",
    appId: "1:272659106499:web:2f1567247609fd67b6f076",
    measurementId: "G-VG9DZM1RZL"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (var registration of registrations) {
        registration.unregister();
        console.log("Unregistered Service Workers");
      }
    }).then(() => {
      navigator.serviceWorker.register("./service-worker.js", { scope: "/" }).then((reg) => {
      }).catch(err => {
        console.error(`Service Worker Error: ${err}`);
      });
    });
  }


  //LISTEN FOR AUTH CHANGES
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const firebaseUserId = firebase.auth().currentUser.uid;
      const firebaseEmail = firebase.auth().currentUser.email;
      //const firebaseDisplayName = firebase.auth().currentUser.displayName;
      //const firebasePhoneNumber = firebase.auth().currentUser.phoneNumber;
      //const firebasePhotoURL = firebase.auth().currentUser.photoURL;

      localStorage.setItem("firebase_userId", firebaseUserId);
      localStorage.setItem("firebase_email", firebaseEmail);
      //localStorage.setItem("firebase_displayName", firebaseDisplayName);
      //localStorage.setItem("firebase_phoneNumber", firebasePhoneNumber);
      //localStorage.setItem("firebase_photoURL", firebasePhotoURL);

      $.ajax({
        type: "GET",
        url: "/api/users/firebase/" + localStorage.getItem("firebase_userId")
      }).then((res) => {
        localStorage.setItem("dbUserId", res.id);
        localStorage.setItem("dbFirstName", res.firstName);
        localStorage.setItem("dbLastName", res.lastName);
      });
    }
  });
  // LOG IN
  $(document).on("click", "#login-button", (event) => {
    event.stopImmediatePropagation();
    event.preventDefault();
    const email = $("#login-email").val().toString().toLowerCase().trim();
    const password = $("#login-password").val().toString().trim();

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      if (document.getElementById("remember-login-check").checked) {
        localStorage.clear();
        localStorage.setItem("remember-signin-email", email);
      }
      window.location.assign("/");
    }).catch(event => {
      console.log(event.message);
    });


  });
  // SIGN UP
  $(document).on("click", "#sign-up-button", (event) => {
    event.stopImmediatePropagation();
    event.preventDefault();
    const email = $("#signup-email").val().toString().toLowerCase().trim();
    const password = $("#signup-password").val().toString().trim();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(event => {
      console.log(event.message);
    }).then(() => {
      $.ajax({
        type: "POST",
        url: "/api/users/add",
        data: {
          provider: firebase.auth().currentUser.providerData[0].providerId,
          email: firebase.auth().currentUser.email,
          firebaseUID: firebase.auth().currentUser.uid
        }
      }).then((res) => {
        window.location.assign("/");
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
      });

    });
  });
  //LOG OUT
  $(document).on("click", "#log-off-button", (event) => {
    event.stopImmediatePropagation();
    event.preventDefault();
    firebase.auth().signOut().then(() => {
      window.location.href = "/";
    }).catch(err => {
      console.error(err)
    });
  });

});
