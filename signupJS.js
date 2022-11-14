import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMtvwwyNRKoMb7heqeFuHolUnvptyBFmA",
  authDomain: "fb-front-3728b.firebaseapp.com",
  projectId: "fb-front-3728b",
  storageBucket: "fb-front-3728b.appspot.com",
  messagingSenderId: "1048669380239",
  appId: "1:1048669380239:web:36011d99a98b23d3fe1afa"
};

const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js"

const db = getDatabase();

const name = document.getElementById('nameInp');
const email = document.getElementById('emailInp');
const username = document.getElementById('userInp');
const pass = document.getElementById('passInp');
const submit = document.getElementById('sub_btn');

function isEmptyOrSpaces(str){
    return str == null || str.match(/^ *$/) !== null;
}

function Validation() {
    let nameregex = /^[a-zA-Z]+$/;
    let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook|hotmail)\.com$/;
    let userregex = /^[a-zA-Z0-9]{5,}$/;

    if(isEmptyOrSpaces(name.value) || isEmptyOrSpaces(email.value) || isEmptyOrSpaces(username.value) || isEmptyOrSpaces(pass.value)){
        alert("You cannnot leave any fields empty");
        return false;
    }

    if(!nameregex.test(name.value)){
        alert("The name should only contain alphabets!");
        return false;
    }

    if(!emailregex.test(email.value)){
        alert("Enter a valid email");
        return false;
    }

    if(!userregex.test(username.value)){
        alert("- Username can only be alpahumeric\n- Username must be at least 5 characters\n- Username cannot contain spaces");
        return false;
    }

    return true;
}

function RegisterUser() {
    if(!Validation()) {
        return;
    };
    const dbRef = ref(db);

    get(child(dbRef, "UsersList/"+ username.value)).then((snapshot) => {
        if(snapshot.exists()){
            alert("Account already exists!");
        }

        else {
            set(ref(db, "UserList/"+ username.value),
            {
                fullname: name.value,
                email: email.value,
                username: username.value,
                password: encPass()
            })
            .then(() => {
                alert("Sign up successfull!");
                window.location = "login.html"
            })
            .catch((error) => {
                alert("error" + error);
            })
        }
    });
}

function encPass(){
    var pass12 = CryptoJS.AES.encrypt(pass.value, pass.value);
    return pass12.toString();
}

submit.addEventListener('click', RegisterUser);