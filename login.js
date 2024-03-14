//variables globales pour le login 

const email = document.querySelector("form #email")
const password = document.querySelector("form #password")
const form = document.querySelector("form")
const error = document.querySelector("#error-message")

//recuperer les users


async function getUsers(userEmail,userPwd) {
    
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'accept' : 'application/json'
    },
    body: JSON.stringify({
        email: userEmail,
        password: userPwd
    })
    }
    )
   
    if (!response.ok) {
        throw new Error ('failed to login');
    }
    const data = await response.json();
    return data;

   
  

} 



//fonction de connexion

form.addEventListener("submit", (e) => {
    e.preventDefault(); //bloquer le renvoie
    const userPwd = password.value;
    const userEmail = email.value;
    console.log(userEmail,userPwd)
    const users = getUsers();
    console.log(users)
    console.log(users)
})
//form


function checkUsers(user){
    if(
        users.email == userEmail &&  users.password == userPwd 
       
        ) {
            //si les conditions sont remplies on fait 
            window.sessionStorage.loged = true;
            window.location.href = "/backend/indexAdmin.html"
    } else {
        //message d'erreur
        document.getElementById("error-message").style.display = "block";
    
    }
}
