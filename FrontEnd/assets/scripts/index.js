console.log("hello world");

import { displayWorks } from "./works.js";

const worksLink = "http://localhost:5678/api/works";
const response = await fetch('http://localhost:5678/api/works/');
const works = await response.json();

const categories = await fetch("http://localhost:5678/api/categories");
const jsonCategories = await categories.json();


const results = fetch(worksLink);
console.log(results);

displayWorks(works)

