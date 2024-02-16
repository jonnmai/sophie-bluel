
import { categoryFilter,
         verifyLogin, 
         logoutFunction, 
         filterChecked,
          displayGallery } from "./works.js";

import { modalCreator,
         openModal,
         addOption,
         submitNewElement,
         displayModalGallery} from "./modal.js";

//Variables qui nous permettra de filtrer l'affichage des projets//
const worksRequest = await fetch("http://localhost:5678/api/works");
const jsonCategories = await fetch("http://localhost:5678/api/categories");
//Conversion des tableaux en json
const works = await worksRequest.json();
const categories = await jsonCategories.json();

displayGallery(works);
categoryFilter(categories);
filterChecked();

verifyLogin();
logoutFunction();

modalCreator();
displayModalGallery(works)
addOption(categories);
openModal();

submitNewElement();











