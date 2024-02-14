window.localStorage.clear(); //clear le storage 

const form = document.getElementById("login");
const errorMsg = document.getElementById("error-msg");


form.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche le comportement submit de base de se déclencher (reload)

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const obj = {
        email: username,
        password: password
    }

    console.log(obj);

     fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    
    .then(response => response.json())
    .then(data => {
        // Traiter la réponse de l'API
        console.log(data);

        if(data.token && data.userId) {
            window.localStorage.setItem("token",data.token);
            window.localStorage.setItem("userId",data.userId)

            console.log(window.localStorage.getItem("token"));
            // redirection de l'utilisateur
            window.location.href = "index.html";  
        }else {
            errorMsg.textContent = "Identifiant où mot de passe incorrect";
            console.error("Erreur: Le token n'est pas présent dans la réponse de l'API");
        }
        
    })
    .catch(error => {
        console.error("Erreur lors de la requête POST:", error);
        // Gérer les erreurs de la requête
    });

});

