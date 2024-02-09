const worksRequest = await fetch("http://localhost:5678/api/works");
const works = await worksRequest.json();

//On stock le token et l'id récuperer grâce à l'API
const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

export function modalCreator() {
    const modal = document.getElementById("modal");
    if (token != null && userId != null) {

        modal.innerHTML = `<div class="modal-container">
        <div class="cross">
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
    }
}

export function openModal() {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("modify-button");
    const closeModal = document.getElementById("close-modal");
    const addPicBtn = document.getElementById("modal-pic");

    openModal.addEventListener('click', ()=> {
        modal.showModal();
   
        displayModalGallery(works);
    });



    closeModal.addEventListener('click', ()=> {
        modal.close();
        clearModalGallery()
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.close();
            clearModalGallery()
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
    const modal = document.getElementById("modal");

    const form = document.querySelector(".modal-submit")

    const labels = ['Title', 'Category']; // Ajoutez ici tous les labels nécessaires

    labels.forEach(labelText => {
        const label = document.createElement("label");
        label.textContent = labelText;
        form.appendChild(label);
    });

    const addNewPic = document.createElement("div");
    const i = document.createElement("i");
    
    // Ajout du type, name et id pour le champ d'input pic
    const picInput = document.createElement("input");
    picInput.type = "file";
    picInput.name = "file"; // Modifiez le nom selon vos besoins
    picInput.id = "file"; // Modifiez l'ID selon vos besoins
    addNewPic.appendChild(picInput);
    
    // Ajout du type, name et id pour le champ d'input title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "text"; // Modifiez le nom selon vos besoins
    titleInput.id = "text"; // Modifiez l'ID selon vos besoins
    addNewPic.appendChild(titleInput);
    
    // Ajout du type, name et id pour le champ d'input category
    const categoryInput = document.createElement("select");
    const categoryOption = document.createElement("option");
    categoryInput.name = "category"; // Modifiez le nom selon vos besoins
    categoryInput.id = "category"; // Modifiez l'ID selon vos besoins
    categoryInput.appendChild(categoryOption);
    addNewPic.appendChild(categoryInput);
    
    const picNeed  = document.createElement("p");
    
    // Ajout du formulaire à la div
    addNewPic.appendChild(form);

    // Ajout de la div à la modal
    modal.appendChild(addNewPic);


    for(const img of galleryDiv) {
        img.parentElement.style.display = 'none';
    }

    addPicBtn.value = "Valider";

}