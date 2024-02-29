//variables globales pour le login 

const email = document.querySelector("form #email")
const password = document.querySelector("form #password")
const form = document.querySelector("form")
const error = document.querySelector("#error-message")

//recuperer les users


async function getUsers() {
    
    const response = await fetch("http://localhost:5678/api-docs/post_users_login", {
        method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        utilisateur: 'nom_utilisateur',
        motdepasse: '123456'
    })
    }
    )
    return response;
   
  

} 
getUsers()
//  console.log(getUsers());

//fonction de connexion

async function login() {
const users = await getUsers();
console.log(users)
form.addEventListener("submit", (e) => {
    e.preventDefault(); //blocker le renvoie
    const userEmail = email.value;
    const userPwd = password.value;
    console.log(userEmail,userPwd)

    console.log(users)

})

}
login()

//bon


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
