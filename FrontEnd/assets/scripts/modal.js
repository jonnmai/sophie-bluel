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
        
    <form id="modal-pic-form" style="display: block;">
        <div class="form">
            <div class="upload">
                <i class="fa-regular fa-image"></i>
                <button class="button-file"> + Ajouter photo<input type="file" name="file" id="file"></button>
                <img id="selected-image" src="" alt="Selected Image" style="display:none;">
                <p class="ext">jpg, png : 4mo max</p>
            </div>
                <label for="text">Titre</label>
                <input type="text" name="text" id="text">
                <label for="select">Catégorie</label>
                <select name="category" id="category">
                </select>
                <div class="line"></div>
                <button id="modal-pic" type="submit" disabled>Valider</button>
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
        deletePicture();
    });

    openSecondModal.addEventListener('click', (e)=> {
        e.preventDefault()
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

    const trash = document.createElement('span');
    const trashIcon = document.createElement('i');
    

      // Définir les attributs et le contenu des éléments
      img.setAttribute('src', item.imageUrl); 
      img.setAttribute('alt',item.title); 
      img.setAttribute('category', item.categoryId);
      img.id = item.id;
      figure.setAttribute('class', "modal-img");
      figure.id = item.id;

      // Ajouter les éléments à la div avec la classe "gallery"
      figure.appendChild(img);
      galleryDiv.appendChild(figure);

      trash.setAttribute('id', item.id);
      trash.setAttribute('class', "trash");
      trashIcon.setAttribute('class', "fa-solid fa-trash-can");
      
      trash.appendChild(trashIcon);
      figure.appendChild(trash);
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

export function submitNewElement() {
    const uploadBtn = document.querySelector(".button-file");
    const fileInput = document.getElementById("file");
    const selectedImage = document.getElementById('selected-image');
    const textInput = document.getElementById("text");
    const categorySelect = document.getElementById("category");

    const modalPicForm = document.getElementById("modal-pic-form");
    const addPicBtn = document.getElementById("modal-pic");
    const submitForm = document.querySelector(".form");

    uploadBtn.addEventListener('click', ()=> {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
    
            reader.onload = function(e) {
                selectedImage.src = e.target.result;
                selectedImage.style.display = 'block';
            };
    
            reader.readAsDataURL(fileInput.files[0]);
            uploadBtn.style = "display: none";
        }
    });

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

    modalPicForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher la soumission du formulaire par défaut
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
             addPicToModalAndGallery(data);
             deletePicture();

            // window.location.href = "/FrontEnd/index.html";  
            
        })
        .catch(error => {
            console.error("Erreur lors de la requête POST:", error);
            // Gérer les erreurs de la requête
        });
    });
    
}

function addPicToModalAndGallery(data) {
    if (data.imageUrl && data.title) {
        // Créer un élément d'image
        const imgModal = document.createElement('img');
        const imgGallery = document.createElement('img');
        // Définir l'attribut src avec l'URL de l'image renvoyée par l'API
        imgModal.src = data.imageUrl;
        imgModal.id = data.id;
        imgGallery.src = data.imageUrl;
        imgGallery.id = data.id;

        // Ajouter l'élément d'image à l'endroit souhaité dans votre DOM
        const modalGallery = document.querySelector('.modal-gallery');
        const gallery = document.querySelector('.gallery');

        const modalFigure = document.createElement('figure');
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');

        const trash = document.createElement('span');
        const trashIcon = document.createElement('i');

        modalFigure.setAttribute('class', "modal-img");
        modalFigure.id = data.id;
        modalFigure.id = data.id;
        modalFigure.appendChild(imgModal);
        modalGallery.appendChild(modalFigure);
        

        
        imgGallery.setAttribute('alt',data.title); 
        imgGallery.setAttribute('category', data.categoryId);
        figure.id = data.id;
        figcaption.textContent = data.title; 
        figure.appendChild(imgGallery);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);



        trash.setAttribute('id', data.id);
        trash.setAttribute('class', "trash");
        trashIcon.setAttribute('class', "fa-solid fa-trash-can");

        trash.appendChild(trashIcon);
        modalFigure.appendChild(trash);

        

    } else {
        console.error("L'API n'a pas renvoyé l'URL de l'image attendue.");
    }
}

export function deletePicture() {
    // Sélectionnez tous les éléments avec la classe "trash"
const trashIcons = document.querySelectorAll('.trash');
console.log(trashIcons)
// Parcourez la NodeList pour accéder à chaque élément
for (const trashIcon of trashIcons) {
    // Accédez à chaque élément "trash" ici
    console.log(trashIcon);
    
    // Vous pouvez également accéder à l'ID associé à chaque élément
    const imageId = trashIcon.id;
    console.log("ID de l'image associée :", imageId);
    
    // Ajoutez un gestionnaire d'événements à chaque icône trashcan
    trashIcon.addEventListener('click', () => {
        // Récupérez l'ID associé à cette icône
        console.log("Image ID à supprimer :", imageId);

        fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
            
        })
        .then(data => {
            // Traiter la réponse de l'API
            console.log(data);
            const imgModalRemove = document.getElementById(`${imageId}`)
            // const imgGalleryRemove = document.querySelector(`.gallery #${imageId}`);
            const galleryContainer = document.querySelector('.gallery');

            imgModalRemove.remove();
            
            const imgGalleryRemove = document.getElementById(imageId);
            
            if (imgGalleryRemove && imgGalleryRemove.parentNode === galleryContainer) {
                galleryContainer.removeChild(imgGalleryRemove);
                console.log("Élément supprimé de la galerie :", imgGalleryRemove);
            } else {
                console.log("Élément non trouvé dans la galerie avec l'ID :", imageId);
            }
            // window.location.href = "/FrontEnd/index.html";  
            
        })
        .catch(error => {
            console.error("Erreur lors de la requête DELETE:", error);
            // Gérer les erreurs de la requête
        });
    });
        
}

}
