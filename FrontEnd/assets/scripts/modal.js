

const worksRequest = await fetch("http://localhost:5678/api/works");
const works = await worksRequest.json();

//Toutes les variables que l'on utilises plusieurs fois: 


//On stock le token et l'id récuperer grâce à l'API
const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

export function modalCreator() {
    const modal = document.getElementById("modal");
    if (token != null && userId != null) {

        modal.innerHTML = `<div class="modal-container">
        <div class="cross" id="cross">
            <i class="fa-solid fa-arrow-left" style="display: none;"></i>
            <i id="close-modal" class="fa-solid fa-xmark"></i>
        </div>
        <h3 class="modal-title">Galerie photo</h3>
        <div class="modal-gallery">

        </div>
    </div>
    <div class="line"></div>
    <form class="modal-submit" action="#" method="#">
            
        <input id="modal-pic" type="submit" value="Ajouter une photo">
    </form>`

        
    const modalContainer = document.querySelector(".modal-container")

    const labels = ['Titre', 'Catégorie']; // Ajoutez ici tous les labels nécessaires

    const labelTitle = document.createElement("label");
    labelTitle.textContent = labels[0];
    labelTitle.setAttribute("for", "text")
    const labelCategory = document.createElement("label");
    labelCategory.textContent = labels[1];
    labelCategory.setAttribute("for", "select")

    const elementForm = document.createElement("form");
 
    const addNewPic = document.createElement("div");
    addNewPic.classList.add("form");
    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-arrow-left");
    
    // Ajout du type, name et id pour le champ d'input pic
    const picInput = document.createElement("input");
    picInput.type = "file";
    picInput.name = "file"; 
    picInput.id = "file"; 
    addNewPic.appendChild(picInput);
    
    // Ajout du type, name et id pour le champ d'input title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "text"; 
    titleInput.id = "text"; 
    addNewPic.appendChild(titleInput);
    
    // Ajout du type, name et id pour le champ d'input category
    const categoryInput = document.createElement("select");
    const categoryOption = document.createElement("option");
    categoryInput.name = "category"; 
    categoryInput.id = "category"; 
    categoryInput.appendChild(categoryOption);
    addNewPic.appendChild(categoryInput);
    
    const picNeed  = document.createElement("p");
    
    // Ajout du formulaire à la div
    modalContainer.appendChild(elementForm);
    elementForm.appendChild(addNewPic);
    titleInput.insertAdjacentElement("beforebegin", labelTitle);
    categoryInput.insertAdjacentElement("beforebegin", labelCategory);

    elementForm.id = "modal-pic-form";
    elementForm.style = "display: none";

    }
}

export function openModal() {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("modify-button");
    const closeModal = document.getElementById("close-modal");
    const addPicBtn = document.getElementById("modal-pic");
    
    //toResetAfter
    const arrowReturn = document.querySelector(".fa-arrow-left");

    openModal.addEventListener('click', ()=> {
        modal.showModal();
   
        displayModalGallery(works);
    });

    arrowReturn.addEventListener('click', () => {
        displayModalGallery(works);
        onClose(arrowReturn);
    });

    closeModal.addEventListener('click', ()=> {
        modal.close();
        onClose(arrowReturn);
        clearModalGallery();
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.close();
            onClose(arrowReturn);
            clearModalGallery();
        }
    });

    addPicBtn.addEventListener('click', ()=>{
        modalForm();
    });

}

function displayModalGallery(works) {
    // On récupère toute la div "Gallery"
    const galleryDiv = document.querySelector('.modal-gallery');
for (const item of works) {
    // Créer des éléments HTML pour chaque item
    const figure = document.createElement('figure');
    const img = document.createElement('img');

      // Définir les attributs et le contenu des éléments
      img.setAttribute('src', item.imageUrl); 
      img.setAttribute('alt',item.title); 
      img.setAttribute('category', item.categoryId);
      figure.setAttribute('class', "modal-img");

      // Ajouter les éléments à la div avec la classe "gallery"
      figure.appendChild(img);
      galleryDiv.appendChild(figure);
  }
}

function clearModalGallery() {
    const galleryDiv = document.querySelector('.modal-gallery');
    galleryDiv.innerHTML = ''; // Supprimer le contenu existant
}

function modalForm() {
    const galleryDiv = document.querySelectorAll('.modal-gallery img');
    const addPicBtn = document.getElementById("modal-pic");
    const addPic = document.getElementById("modal-pic-form");
    const crossDiv = document.getElementById("cross");
    const arrow = document.querySelector(".fa-arrow-left");

    addPic.style = "display: block";
    for(const img of galleryDiv) {
        img.parentElement.style.display = 'none';
    }

    addPicBtn.value = "Valider";
    arrow.style = "display: block";
    crossDiv.style = "justify-content: space-between;"
    
}

function onClose(arrowReturn) {
    const crossDiv = document.getElementById("cross");
    const addPicBtn = document.getElementById("modal-pic");
    const addPic = document.getElementById("modal-pic-form");
    
    addPic.style = "display: none";
    arrowReturn.style = "display: none";
    crossDiv.style = "justify-content: flex-end";
    addPicBtn.value = "Ajouter une photo";
}

function submitNewElement() {

}