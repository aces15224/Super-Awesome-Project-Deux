import admin from "./views/layouts/main.handlebars";

export const createUser = async (req, res) => {
const {
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
      photoUrl
    } = req.body;

    const user = await admin.auth().createUser({
      email,
      phoneNumber,
      password,
      displayName: `${firstName} ${lastName}`,
      photoURL: photoUrl
    });

    return res.send(user);
}

//listen for auth changes
firebase.auth().onAuthStateChanged(user => {
    if (user) {
      return user;
    }
 });

// Signup 
var signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", function e(){
    e.preventDefault();
// Getting info
    var email = signupForm["signup-email"].value;
    var password = signupForm["signup-password"].value;
//signing the user up
    auth.createUserWithEmailAndPassword(email, password).then(function cred(){
        var modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//Logout
var logout = document.querySelector("#logout")
logout.addEventListener("click", function e(){
    e.preventDefault();
    auth.signOut().then(() =>{
    });
});

//Login
var loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function e(){
    e.preventDefault();

    //user info
    var email = loginForm["login-email"].value;
    var password = loginForm["login-password"].value;

    //actual log in
    auth.signInWithEmailAndPassword(email, password).then(function cred(){
       

        var modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})