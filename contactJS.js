let userlink = document.getElementById('userlink');
let signoutlink = document.getElementById('signoutlink');
let header = document.getElementById('hh');
var currentUser = null;

function getUsername() {
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");

    if(keepLoggedIn == "yes"){
        currentUser = JSON.parse(localStorage.getItem('user'))
    }else{
        currentUser = JSON.parse(sessionStorage.getItem('user'))
    }
}

function Signout(){
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('keepLoggedIn');
    window.location = "index.html"
}

window.onload = function(){
    getUsername();
    if(currentUser == null){
        alert("Please log in");
        window.location = "index.html";
    } else {
        userlink.innerText = currentUser.username;
        header.innerText = "Welcome: " + currentUser.fullname;
        userlink.classList.replace("btn", "nav-link");
        userlink.classList.remove("btn-primary");
        userlink.href = "#";

        signoutlink.innerText = "Sign Out";
        signoutlink.classList.replace("btn", "nav-link");
        signoutlink.classList.remove("btn-success");
        signoutlink.href = "javascript:Signout()";
    }
}
