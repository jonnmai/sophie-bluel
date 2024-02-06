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

      button.addEventListener('click', () => {
          const id = button.id;
          console.log(id);

          const imgGallery = document.querySelectorAll(".gallery img");
          for(const img of imgGallery) {
              const imgCategoryId = img.getAttribute("category");
              if (imgCategoryId === id) {
                  img.parentElement.style.display = 'block';
              } else {
                  img.parentElement.style.display = 'none';
              }
              
              
              console.log(category);
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
        iCopy = i.cloneNode(true);
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

