export async function displayWorks(works) {

    console.log(works);

    const galleryDiv = document.querySelector('.gallery')

    for (const item of works) {
        // Créer des éléments HTML
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        
        if (item.categoryId === 1) {
          // Définir les attributs et le contenu des éléments
          img.src = item.imageUrl; 
          img.alt = item.title; 
          figcaption.textContent = item.title; 

          // Ajouter les éléments à la div avec la classe "gallery"
          figure.appendChild(img);
          figure.appendChild(figcaption);
          galleryDiv.appendChild(figure);
        }  
        
  
        
 
      } 
    }
