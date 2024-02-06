
import { categoryFilter, verifyLogin, modalOpener, logoutFunction } from "./works.js";
//Variable qui nous permettra de filtrer l'affichage des projets//


const worksRequest = await fetch("http://localhost:5678/api/works");
const jsonCategories = await fetch("http://localhost:5678/api/categories");

const works = await worksRequest.json();
const categories = await jsonCategories.json();

categoryFilter(categories);
verifyLogin();
logoutFunction();
modalOpener();

const galleryDiv = document.querySelector('.gallery')
const elementSet = new Set();

for (const item of works) {
    // Créer des éléments HTML
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    if (elementSet.has(item.id)) {
      
    }

      // Définir les attributs et le contenu des éléments
      img.setAttribute('src', item.imageUrl); 
      img.setAttribute('alt',item.title); 
      img.setAttribute('category', item.categoryId);
      figcaption.textContent = item.title; 

      // Ajouter les éléments à la div avec la classe "gallery"
      figure.appendChild(img);
      figure.appendChild(figcaption);
      galleryDiv.appendChild(figure);
    
      elementSet.add(item.id);
      console.log(elementSet.size)
  }


// Pour avoir le button choisi "Checked"
const buttons = document.querySelectorAll(".filter");

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Réinitialiser la classe 'active' sur tous les boutons
        buttons.forEach((btn) => {
            btn.classList.remove('active');
        });

        // Ajouter la classe 'active' au bouton actuel
        button.classList.add('active');

        console.log("test");
    });
});








