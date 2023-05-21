/* Le Log In */  
// _____________________________________________
// On crée une constante "submit" qui récupère le bouton "Se connecter", l'élément avec la classe "submit"
const submit = document.getElementById("submit");
// On crée une constante "errorInformation" qui récupère l'élément avec la classe "errorInformation"
const errorInformation = document.getElementById("errorInformation");

// On ajoute un événement "click" sur le bouton "submit" qui execute la fonction suivante ->
submit.addEventListener("click", (event) => {
    // On empêche le formulaire de se soumettre automatiquement
   event.preventDefault();
    // On crée une constante "email" qui récupère la valeur de l'id "emailUser"   
   const email = document.getElementById("emailUser").value;
    // On crée une constante "password" qui récupère la valeur de l'id "password"   
   const password = document.getElementById("password").value;
   
    // On vérifie la validité des champs en utilisant "!" pour voir si ils sont faux, 
    // si l'un d'eux est vide un message d'erreur est affiché et la fonction s'arrête avec l'instruction "return;"   
   if (!email || !password) {
        //  Si la condition n'est pas valide, on affiche un message d'erreur dans l'élément HTML
       document.getElementById("errorInformation").innerHTML = "Entrer un identifiant ou un mot de passe valide";
    // On utilise "return" pour arrêter l'exécution de la fonction si l'un des champs d'entrée est vide
       return;
   }
    // On envoie une requête HTTP à l'URL en utilisant la méthode "POST"
    // C'est une "method" spécifique à la méthode HTTP utilisée pour la requête
    // On indique que le serveur doit renvoyer des données au format JSON
    // On envoie ensuite les données de l'utilisateur au serveur sous forme de chaîne JSON. 
    // Les données incluent l'e-mail et le mot de passe saisis par l'utilisateur.
   fetch("http://localhost:5678/api/users/login", {
           method: "POST",
           headers: {
               accept: "application/json",
               "Content-type": "application/json",
           },
           body: JSON.stringify({email: email, password: password}),
       })
        // Seulement si la requête à réussi, on éxecute la fonction flechée qui suit avec la réponse HTTP en guise de paramètre     
       .then(function (authResponse) {
            // Si le code de statut de la réponse HTTP est 200, on renvoie la réponse HTTP sous forme de données JSON    
           if (authResponse.status === 200) {
                // On télécharge les données de l'utilisateur sous forme de promesse 
               return authResponse.json();
                // Si le code de statut de la réponse n'est pas 200, on affiche un message d'erreur et la promesse est rejettée    
           } else {
               errorInformation.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
               return Promise.reject();
           }
           })
            // Si les données de l'utilisateur ont été renvoyés avec succès, on exécute la fonction flechée qui transmet les données de l'utilisateur en tant que paramètres   
           .then(function (userInformation) {
                // On vérifie si les données de l'utilisateur sont existantes et pas null, alors les instructions s'effectueront    
               if (userInformation) {
                // On stocke les données de l'utilisateur dans le stockage de session du navigateur sous forme de chaîne JSON
               window.sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
                // On stocke le jeton d'authentification de l'utilisateur dans le stockage de session du navigateur   
               window.sessionStorage.setItem("token", userInformation.token);
                // On renvoie l'utilisateur vers la page "index.html" quand la connexion est réussie     
               window.location.replace("index.html");
           }
           })
            // On gère les erreurs qui se produisent pendant l'execution du code et on les affichent dans la console du navigateur    
           .catch(error => console.error(error));
});






































// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('.form');
//     const emailInput = document.getElementById('emailUser');
//     const passwordInput = document.getElementById('password');
//     const errorInformation = document.getElementById('errorInformation');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const email = emailInput.value;
//         const password = passwordInput.value;

//         try {
//             const response = await fetch("http://localhost:5678/api/users/login", {
//                 method: "POST",
//                 headers: {
//                     accept: "application/json",
//                     "Content-type": "application/json",
//                 },
//                 body: JSON.stringify({ email: email, password: password }),
//             });

//             if (response.status === 200) {
//                 // Connecté avec succès
//                 const data = await response.json();
//                 console.log(data);
//             } else {
//                 // Erreur lors de la connexion
//                 errorInformation.textContent = 'Erreur : adresse e-mail ou mot de passe incorrect.';
//             }
//         } catch (error) {
//             // Erreur réseau ou autre
//             console.error(error);
//             errorInformation.textContent = "Erreur lors de la connexion. Veuillez réessayer plus tard.";
//         }
//     });
// });
