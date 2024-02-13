const worksRequest = await fetch("http://localhost:5678/api/works");
const works = await worksRequest.json();


//Toutes les variables que l'on utilises plusieurs fois: 
const modal = document.getElementById("modal");
const secondModal = document.getElementById("second-modal");

//On stock le token et l'id récuperer grâce à l'API
const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");
export function modalCreator() {
    
    
    if (token != null && userId != null) {

        modal.innerHTML = `<div class="modal-container">
        <div class="cross" id="cross">
            <i id="close-modal" class="fa-solid fa-xmark"></i>
        </div>
        <h3 class="modal-title">Galerie photo</h3>
        <div class="modal-gallery">

        </div>
    </div>
    <div class="line"></div>
    <form class="modal-submit" action="#" method="#">
            
        <input id="open-second-modal" type="submit" value="Ajouter une photo">
    </form>`

    secondModal.innerHTML = `<div class="modal-container">
    <div class="cross" id="cross" style="justify-content: space-between;">
        <i class="fa-solid fa-arrow-left" style="display: block;" aria-hidden="true"></i>
        <i id="close-second-modal" class="fa-solid fa-xmark" aria-hidden="true"></i>
    </div>
        <h3 class="modal-title">Galerie photo</h3>
        
    <form id="modal-pic-form" style="display: block;" method="post">
        <div class="form">
            <input type="file" name="file" id="file">
            <label for="text">Titre</label>
            <input type="text" name="text" id="text">
            <label for="select">Catégorie</label>
            <select name="category" id="category">
            </select>
            <div class="line"></div>
            <input id="modal-pic" type="submit" value="Valider" disabled>
            
        </div>
    </form>
</div>`;
    

    }
}

export function openModal() {

    const openModal = document.getElementById("modify-button");
    const openSecondModal = document.getElementById("open-second-modal");
    const closeFirstModal = document.getElementById("close-modal");
    const closeSecondModal = document.getElementById("close-second-modal");
    
    
    //toResetAfter
    const arrowReturn = document.querySelector(".fa-arrow-left");

    openModal.addEventListener('click', ()=> {
        modal.showModal();
        displayModalGallery(works);
    });

    openSecondModal.addEventListener('click', ()=> {
       secondModal.showModal(); 
       modal.close();
    });

    arrowReturn.addEventListener('click', ()=> {
        console.log("test");
        secondModal.close();
        modal.showModal();
        // addPicBtn.disabled = false;
    });

    closeFirstModal.addEventListener('click', ()=> {
        modal.close();
        clearModalGallery();
    });

    closeSecondModal.addEventListener('click', ()=> {
        secondModal.close();
        clearModalGallery();
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal || e.target === secondModal ) {
            modal.close();
            secondModal.close();
            clearModalGallery();
        }
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

export async function addOption(categories) {
    const selector = document.getElementById("category");
    
        // Ajouter une option vide comme première option
        const defaultOption = document.createElement("option");
        defaultOption.value = ""; // La valeur vide
        defaultOption.innerText = ""; // Texte pour l'option par défaut
        selector.appendChild(defaultOption);

    console.log(categories)
    for(const item of categories) {
        const option = document.createElement("option");
        option.value = item.id;
        option.innerText = item.name;
        selector.appendChild(option);
    }
}

export async function submitNewElement() {
    const fileInput = document.getElementById("file");
    const textInput = document.getElementById("text");
    const categorySelect = document.getElementById("category");

    const modalPicForm = document.getElementById("modal-pic-form");
    const addPicBtn = document.getElementById("modal-pic");
    const submitForm = document.querySelector(".form");

    modalPicForm.addEventListener('change', checkFormFields); 

    function checkFormFields() {
        // Vérifiez si tous les champs sont remplis
        const areFieldsFilled = fileInput.value.trim() !== "" &&
            textInput.value.trim() !== "" &&
            categorySelect.value.trim() !== "";

        console.log(areFieldsFilled);
        // Activez/désactivez le bouton en fonction de l'état des champs
        addPicBtn.disabled = !areFieldsFilled;
    }

    secondModal.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Success");
        const formData = new FormData();

        formData.append("image", fileInput.files[0]);
        formData.append("title", textInput.value);
        formData.append("category", categorySelect.value);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            // Traiter la réponse de l'API
            console.log(data);
            // window.location.href = "/FrontEnd/index.html";  
        })
        .catch(error => {
            console.error("Erreur lors de la requête POST:", error);
            // Gérer les erreurs de la requête
        });

    });
}

