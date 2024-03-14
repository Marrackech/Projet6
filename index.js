
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
            figcaption.innerText = Result[i]["title"];
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
  
  
  