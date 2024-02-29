

//si l utilisateur est connecte



// const { response } = require("express");



const loged = window.sessionStorage.loged;
const admin = document.querySelector(".flexjs .admin")
const logout = document.querySelector("header nav .logout")
const containerModals = document.querySelector(".containerModals");



if (loged == "true") {
    admin.textContent="admin";
    logout.textContent="logout";
}






//recuperer les elements






async function  getWorks(){
  try {
     
 const response = await fetch("http://localhost:5678/api/works");
      const Result = await response.json();
      // console.log(Result);
     

      let gallerie = document.querySelector(".gallery");
      gallerie.innerHTML = ""
      for (let i = 0; i < Result.length; i++) {
          let figure = document.createElement("FIGURE");

          // Image affichage
          let image = document.createElement("IMG");
          image.src = Result[i]["imageUrl"];          //images probl source
          image.alt = Result[i]["title"];

          figure.appendChild(image);
          
          // Text affichage
          let figcaption = document.createElement("FIGCAPTION");
          
          let catid = Result[i]["categoryId"];
          figcaption.innerText = Result[i]["title"] + "id = " + catid;
          figure.appendChild(figcaption);
          gallerie.appendChild(figure);
      }
     
      
  } catch (error) {
      // console.error("Une erreur s'est produite lors de la récupération des œuvres:", error);
  }
}


async function  getWorksByCategoryId(categoryId){
  try {
     
 const response = await fetch("http://localhost:5678/api/works");
      const Result = await response.json();
    

      let gallerie = document.querySelector(".gallery");
      gallerie.innerHTML = ""
      for (let i = 0; i < Result.length; i++) {
        let catid = Result[i]["categoryId"];
        if(catid == categoryId){
          let figure = document.createElement("FIGURE");

          // Image affichage
          let image = document.createElement("IMG");
          image.src = Result[i]["imageUrl"];          //images probl source
          image.alt = Result[i]["title"];

          figure.appendChild(image);
          
          // Text affichage
          let figcaption = document.createElement("FIGCAPTION");
          
         
          figcaption.innerText = Result[i]["title"];
          figure.appendChild(figcaption);
          gallerie.appendChild(figure);

        }
          
      }
     
      
  } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des œuvres:", error);
  }
}

getWorks()

// afficher buttons par categories

//recuperer le tableau de categories

async function getCategory(){
  const response = await fetch("http://localhost:5678/api/categories");
   return await response.json();
}



async function DisplayCategorysButton(){
  const categorys = await getCategory();
  // console.log(categorys);
  categorys.forEach(category => {
    const btn = document.createElement("button")
    btn.textContent = category.name;
    //create id for btn 
    btn.id = category.id;
    const filters = document.querySelector(".filters");

 filters.appendChild(btn);
 filterCategory()

  });
}
DisplayCategorysButton();


//filtrer au click sur le boutton par categorie

const gallery = document.querySelector(".gallery")




function filterCategory(){
  const works = getWorks();
  
  // console.log(works)     
  const buttons = document.querySelectorAll(".filters button");
  // console.log(buttons)
  buttons.forEach((button)=> {
    button.addEventListener("click", (e)=> {
      if(e.target.id == "0"){
        getWorks()

      }
      if(e.target.id == "1") {
          getWorksByCategoryId(1)
      }
      if(e.target.id == "2"){
        getWorksByCategoryId(2)
      }
      if(e.target.id == "3"){
        getWorksByCategoryId(3)
      }
    // btnId = e.target.id;
     
    
    //  console.log(btnId)
    })
  })
}



//admin Part ||
  


//affichage de la modale au click sur admin  


admin.addEventListener("click", () => {
  // console.log("admin")
  containerModals.style.display = 'flex';


})
// hidde la modale apres click sur croix

const xmark = document.querySelector(".containerModals .fa-xmark")
xmark.addEventListener("click", () => {
  // console.log(xmark)
  containerModals.style.display = "none" ;

});
//hide quand c est au click au tour
containerModals.addEventListener("click", (e) => {
  // console.log(e.target.className);
  if (e.target.className == "containerModals") {
    containerModals.style.display = "none"
  }
 
})

//affichage des works 

const Workmodal = document.querySelector(".Workmodal");

async function displayWorkModal() {
  Workmodal.innerHTML = "";
       
 const response = await fetch("http://localhost:5678/api/works");
 const Result = await response.json();
  const librairie =  Result
  librairie.forEach(work => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const span  = document.createElement("span")
    const trash= document.createElement("i")
    trash.classList.add("fa-solid",  "fa-trash-can")
   trash.id = work.id
   img.src = work.imageUrl
   span.appendChild(trash)
 figure.appendChild(span)
   figure.appendChild(img)
  Workmodal.appendChild(figure)
    
    deleteWork()
  });
}
displayWorkModal()
//a voir 
//delete work from modal

 function deleteWork() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
 trashAll.forEach(trash => {
  trash.addEventListener("click", (e) => {
    const id = trash.id
    
    const response =  fetch("http://localhost:5678/api-docs/delete_works__id_");
    const Result =  response.json();
    delete Result[id];
    const init = {
      method: "DELETE",
      headers:{"content-Type" : "application/json"},
    }
    fetch("http://localhost:5678/api-docs/delete_works__id_" +id,init)
  .then((response)=> {
    if(!response.ok){
       console.log("delete is not working")

    } return  response.json() 
  })
  .then((data)=>{
    // console.log("delete is work here is data :" ,data)
    displayWorkModal()
    getWorks()
  })
  })
 })
 

}


//show the second modal once html is done 


const btnAddModal = document.querySelector(".modalWork button")
const modalAddWork = document.querySelector(".modalAddWork")
const modalWork = document.querySelector(".modalWork")
const arrowLeft = document.querySelector(".fa-arrow-left")
const markAdd = document.querySelector(".modalAddWork .fa-xmark")

function displayAddModal(){
  btnAddModal.addEventListener("click",() =>{
    modalAddWork.style.display = "flex"
    modalWork.style.display = "none"

  })
  arrowLeft.addEventListener("click", ()=>{
    modalAddWork.style.display ="none"
    modalWork.style.display = "flex"
  })
  markAdd.addEventListener("click", ()=> {
    containerModals.style.display ="none";
  })
}
displayAddModal()

//image 

const previewImg = document.querySelector(".containerFile img")
const inputFile = document.querySelector(".containerFile input")
const labelFile = document.querySelector(".containerFile label")
const inconFile = document.querySelector(".containerFile .fa-image")
const pFile = document.querySelector(".containerFile p")
const form = document.querySelector(".modalAddWork form")

//change on input file (img)

inputFile.addEventListener("change",()=>{
  const file = inputFile.files[0];
  console.log(file)
  if(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result
      previewImg.style.display ="flex"
      labelFile.style.display = "none"
      inconFile.style.display = "none"
      pFile.style.display = "none"
    }
    reader.readAsDataURL(file)
  }
});

//create list oof category in select input


async function displayCategoryModal() {
  const select = document.querySelector(".modalAddWork select")
  const categorys = await getCategory()
  categorys.forEach(category => {
    const option = document.createElement("option")
    option.value = category.id
    option.textContent = category.name
select.appendChild(option) 
 })
}
displayCategoryModal()

//verify input if the're empty 

function verifformFull(){
const buttonValidForm = document.querySelector(".modalAddWork button")
form.addEventListener("input",()=> {
  
  if(title.value !=="" && inputFile.value !==""){
    buttonValidForm.classList.add("full")
   } else {
    buttonValidForm.classList.remove("full")
    buttonValidForm.disabled = true;
   }
   })
  }
  verifformFull()
