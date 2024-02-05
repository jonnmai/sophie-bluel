const form = document.getElementById("login");



form.addEventListener("submit", (e) => {
    e.preventDefault();

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

        window.localStorage.setItem("token",data.token);
        window.localStorage.setItem("userId",data.userId)

        console.log(window.localStorage.getItem("token"));
        // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions en fonction de la réponse
        // window.location.href = "/FrontEnd/index.html";
    })
    .catch(error => {
        console.error("Erreur lors de la requête POST:", error);
        // Gérer les erreurs de la requête
    });

});

