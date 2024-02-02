export async function categoryFilter(categories) { 
  const form = document.querySelector(".all-buttons");
  const buttonAll = document.createElement("button");
  
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