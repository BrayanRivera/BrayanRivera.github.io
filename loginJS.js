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

        import { getDatabase, ref, set, child, get }
            from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js"

        const db = getDatabase();

        const username = document.getElementById('userInp');
        const pass = document.getElementById('passInp');
        const submit = document.getElementById('sub_btn');

        function AuthenticateUser(){
            const dbref = ref(db);

            get(child(dbref, "UserList/"+ username.value)).then((snapshot) => {
                if(snapshot.exists()){
                    let dbpass = decPass(snapshot.val().password);
                    if(dbpass == pass.value){
                        login(snapshot.val());
                    } else {
                        alert("User does no exist");
                    }
                }

                else {
                    alert("Username or password in invalid");
                }
            });
        }

        function decPass(dbpass){
            var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
            return pass12.toString(CryptoJS.enc.Utf8);
        }

        function login(user){
            let keepLoggedIn = document.getElementById('customSwitch1').checked;

            if(!keepLoggedIn){
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location="contact.html";
            }else{
                localStorage.setItem('keepLoggedIn', 'yes');
                localStorage.setItem('user', JSON.stringify(user));
                window.location="contact.html";
            }
        }

        submit.addEventListener('click', AuthenticateUser);