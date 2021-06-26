(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDOwj9_x1cxJwPkz8BSg8qj_vNCb6ItesU",
        authDomain: "deliverysystem-76971.firebaseapp.com",
        projectId: "deliverysystem-76971",
        storageBucket: "deliverysystem-76971.appspot.com",
        messagingSenderId: "292778080288",
        appId: "1:292778080288:web:50245b4d01d45216b46445"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //get elements
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");

    btnLogin.addEventListener("click", e=>{
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e=> console.log(e))
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
              window.location = 'app.html'; //After successful login, user will be redirected to home.html
            }
          });
    })
}());