const form = document.querySelector(".all-buttons");
const buttonAll = document.createElement("button");

export async function categoryFilter(categories) { 
  buttonAll.className = 'filter';
  buttonAll.textContent = 'Tous';
  buttonAll.type = 'button';

  form.appendChild(buttonAll);

  for(const category of categories) {
      const button = document.createElement('button')
      button.textContent = category.name;
      button.id = category.id;
      button.className = 'filter';
      button.type = 'button';
      form.appendChild(button); 

    //Filtre les images grâce à l'id des catégories récuperer
      button.addEventListener('click', () => {
          const id = button.id;
          const imgGallery = document.querySelectorAll(".gallery img");
          for(const img of imgGallery) {
              const imgCategoryId = img.getAttribute("category");
              if (imgCategoryId === id) {
                  img.parentElement.style.display = 'block';
              } else {
                  img.parentElement.style.display = 'none';
              }
          }
      });

      buttonAll.addEventListener('click', () => {
          const imgGallery = document.querySelectorAll(".gallery img");
          for(const img of imgGallery) {
              img.parentElement.style.display = 'block';
          }
      });
  }



}

//On prend le 3eme element de notre navbar pour le modifier en "logout" par la suite
const login = document.querySelector("nav ul li:nth-child(3) a");
const parentLogin = login.parentElement;
const logout = document.createElement("a");

//On stock le token et l'id récuperer grâce à l'API
const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

//Vérifie que l'on est connecté grâce au token et userId pour afficher les 
//fonctions inaccessiblent déconnecter
export function verifyLogin() {

    if (token != null && userId != null) {
        const header = document.getElementById("headerBis");
        const headerBis = document.createElement("div");
        const project = document.getElementById("title-h2");
        const tempoMargin = document.getElementById("project");
        const modifyBtn = document.createElement("p");
        const i = document.createElement("i");
        let iCopy = '';

        headerBis.classList.add("headerBis");
        headerBis.innerText= "Mode édition";
        header.appendChild(headerBis);



        modifyBtn.innerText = "Modifier";
        modifyBtn.setAttribute('id',"modify-button");
        modifyBtn.classList.add("modify-button");
        i.classList.add("fa-solid", "fa-pen-to-square");
        project.insertAdjacentElement('afterend', modifyBtn);
        modifyBtn.insertAdjacentElement('afterbegin', i);
        iCopy = i.cloneNode(true); //Copie les attributs de la constante 'i' dans "iCopy" car 'i' ne peut être attribuer qu'à un seul élément
        headerBis.insertAdjacentElement('afterbegin', iCopy);

        
        logout.href = "#";
        logout.textContent = "logout";
        logout.setAttribute('id', "logout");
        parentLogin.replaceChild(logout, login);

        form.style = "display: none";
        tempoMargin.style = "margin-bottom: 100px";
        
    }
}

export function logoutFunction() {
    if (token != null && userId != null) {
        const retrieveLogout = document.getElementById("logout");
        // On clear le localStorage ce qui revient à se déconnecter car le token n'est plus stocker
        retrieveLogout.addEventListener('click', () => {
                window.localStorage.clear();
                window.location.reload();
        });
    }
}

export function modalOpener() {
    if (token != null && userId != null) {
        const modifyBtn = document.getElementById("modify-button");

        modifyBtn.addEventListener('click', ()=> {
            console.log(token);
            console.log(userId)
            console.log(modifyBtn);
        });
    }
}

export function filterChecked() {
    // Pour avoir le filtre choisi "Checked"
const buttons = document.querySelectorAll(".filter");

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Réinitialiser la classe 'active' sur tous les boutons
        buttons.forEach((btn) => {
            btn.classList.remove('active');
        });
        // Ajouter la classe 'active' au bouton actuel
        button.classList.add('active');
    });
});

}

export async function displayGallery(works) {
    // On récupère toute la div "Gallery"
    const galleryDiv = document.querySelector('.gallery')
for (const item of works) {
    // Créer des éléments HTML pour chaque item
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

      // Définir les attributs et le contenu des éléments
      img.setAttribute('src', item.imageUrl); 
      img.setAttribute('alt',item.title); 
      img.setAttribute('category', item.categoryId);
      figcaption.textContent = item.title; 

      // Ajouter les éléments à la div avec la classe "gallery"
      figure.appendChild(img);
      figure.appendChild(figcaption);
      galleryDiv.appendChild(figure);
  }
}

