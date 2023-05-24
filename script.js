// On déclare la fonction "getProducts"
function getProducts(){
// On fait appel à l'API
  return fetch('http://localhost:5678/api/works')
// On transforme la requête en réponse JSON
      .then(function (response){
          return response.json()
      })
// On affiche la réponse JSON dans la console
      .then(function (products){
          console.log(products);
          return products
      })
// On envoie un message d'erreur au cas où une erreur se présente
      .catch(function (error){
          console.log('Erreur :', error.message);
      });
}

// On crée une fonction pour afficher les produits
function afficherProduct(product) {
// On ajoute un lien avec toutes les balises dans la section contenant l'ID "gallery"
  document.getElementById("gallery").innerHTML += `
    <article categoryId="${product.categoryId}" data-id="${product._id}">
      <img class ="productImg" src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.title}</h3> 
    </article>`;
}

// Main attendra que la fonction getProducts soit terminée de s'exécuter avant de continuer
async function main() {
  const products = await getProducts()
// Boucle for of qui parcoure chaque éléments 
  for (product of products) {
      afficherProduct(product);
  }
};

// Les filtres :

// On lie le HTML et le JS
const btnObjet = document.querySelector('.objet');
const btnAppartement = document.querySelector('.appartement');
const btnHotel = document.querySelector('.hotel');
const btnTous = document.querySelector('.tous');

btnObjet.addEventListener('click', filterObjet);
btnAppartement.addEventListener('click', filterAppartement);
btnHotel.addEventListener('click', filterHotel);
btnTous.addEventListener('click', filterTous);

// On crée 4 fonction qui filtrent nos projets : 
// La fonction qui filtre la section "Objet" 
function filterObjet() {
  const products = document.querySelectorAll("article");
  products.forEach((product) => {
      const categoryId = product.getAttribute("categoryId");
      if (categoryId === "1") {
          product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
  });
}

// La fonction qui filtre la section "Appartement"
function filterAppartement() {
  const products = document.querySelectorAll("article");
  products.forEach((product) => {
    const categoryId = product.getAttribute("categoryId");
    if (categoryId === "2") {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// La fonction qui filtre la section "Hotel" 
  function filterHotel() {
    const products = document.querySelectorAll("article");
    products.forEach((product) => {
        const categoryId = product.getAttribute("categoryId");
        if (categoryId === "3") {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
  }

// La fonction qui affiche tous les projets
function filterTous() {
  const products = document.querySelectorAll("article");
  products.forEach((product) => {
    product.style.display = 'block';
  });
}

// Le login :

// On crée une fonction pour vérifier si l'utilisateur est connecté ou non
function checkUserLoggedIn() {
  // On récupère le jeton d'authentification en appelant la méthode "getItem" sur l'objet "sessionStorage" avec la clé "token"
  const token = sessionStorage.getItem("token");
  // Si la valeur de "token" est différente de "null", cela signifie qu'un utilisateur est connecté, dans ce cas la fonction renvoie "true" sinon "false"
  return token !== null;
}

function LoggedInUserChanges() {
  // On fait en sorte que le "Login" se transforme en "Logout" quand l'utilisateur est connecté
  login.innerHTML = "Logout";
  // On sélectionne tous les éléments ayant la classe "display"
  const displayElements = document.querySelectorAll(".display");

  // On parcoure tous les éléments sélectionnés et modifie leur propriété CSS "visibility" pour les rendre visibles
  displayElements.forEach((element) => {
  element.style.visibility = "visible";

  // On crée un tableau contenant tous les boutons de filtre
  const filterButtons = [btnObjet, btnAppartement, btnHotel, btnTous];

  // On parcoure tous les boutons de filtre et modifie leur propriété CSS "display" pour les rendre invisibles
  filterButtons.forEach((button) => {
  button.style.display = "none";
  });
  });
};


// On crée une fonction "Init" qui, si l'utilisateur est connecté, applique les changements demandés
function init() {
  if (checkUserLoggedIn()) {
    LoggedInUserChanges();
  }
// On ré exécute la fonction main avec les changements
  main();
}

init();

// La modale :

// Au clic du bouton la modale disparait 
document.querySelector("#close-button").addEventListener("click", function() {
  document.querySelector(".modale").style.display = "none";
});

const ouvrirModale = document.getElementById("ouvrirModale");
const maModale = document.getElementById("maModale");
const ajouterPhoto = document.getElementById("ajouterPhoto");
const retour = document.getElementById("retour");
const modale1 = document.getElementById("modale1");
const modale2 = document.getElementById("modale2");

ouvrirModale.onclick = function() {
  maModale.style.display = "block";
  modale1.style.display = "block";
  modale2.style.display = "none";
  afficherTousLesProduitsDansModale();
};

ajouterPhoto.onclick = function() {
  modale1.style.display = "none";
  modale2.style.display = "block";
};

retour.onclick = function() {
  modale2.style.display = "none";
  modale1.style.display = "block";
};

window.onclick = function(event) {
  if (event.target == maModale) {
    maModale.style.display = "none";
  }
};

let token = window.localStorage.getItem("token") ;

async function afficherTousLesProduitsDansModale() {
  const modaleProduct = document.getElementById("modaleProduct");
  if (modaleProduct.getAttribute("data-loaded") === null) {
    const products = await getProducts();
    for (product of products) {
      afficherProductDansModale(product);
    }
    modaleProduct.setAttribute("data-loaded", "true");
  }
}


function afficherProductDansModale(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('modale-product');

  productElement.innerHTML = `
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <i class="fa-regular fa-trash-can icon-trash icon__garbage"></i>
    <i class="fa-solid fa-arrows-up-down-left-right"></i>
    <h3 class="productNameModale">éditer</h3>
  `;
  productElement.setAttribute("data-id", product.id)

  // Assigner la variable trashButton
  const trashButton = productElement.querySelector('.icon-trash');

  // Ajouter l'élément HTML au DOM
  document.getElementById("modaleProduct").appendChild(productElement);

  // Gérer la suppression de l'article
  trashButton.addEventListener("click", function () {
    let id = product.id;
    console.log(id);
    let token = sessionStorage.getItem("token");

    fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log("Article supprimé");
        productElement.remove();
      } else {
        console.error("Il y a une erreur");
      }
    })
    .catch(function (error) {
      console.error("Il y a une erreur:", error);
    });
  });

  document.getElementById("modaleProduct").appendChild(productElement);

}

document.querySelector("#close-button2").addEventListener("click", function() {
  document.querySelector(".modale").style.display = "none";
});

// Ajout des projets 
    
const modalWindow1 = document.querySelector('#modale1');
const modalWindow2 = document.querySelector('#modale2');

// Génère dynamiquement les catégories depuis l'API
async function productCategories() {
  const getCategories = await fetch("http://localhost:5678/api/categories");
  const categories = await getCategories.json();

  categories.forEach(function(product) {
    const parentElement = document.querySelector('#category');
    const categoryOption = document.createElement('option');
    categoryOption.innerHTML = product.name;
    categoryOption.value = `${product.id},${product.name}`;

    parentElement.appendChild(categoryOption)
  });
}

// Appel de la fonction
productCategories();

// Permet à un bouton customisé de prendre la fonction d'un input file
document.querySelector('#ajouterImg').onclick = function() {
    document.getElementById('uploadImg').click();
};

// Affiche l'image choisie par l'utilisateur
document.getElementById('uploadImg').onchange = function(event) {
    let target = event.target;
    let files = target.files;
    
    let fileReader = new FileReader();
    fileReader.onload = function() {
        document.getElementById('apercuImg').src = fileReader.result;
    }
    fileReader.readAsDataURL(files[0]);

    // Change l'entrée actuelle du nom au nom du fichier
    const filename = document.getElementById('uploadImg').files[0].name.split('.')
    document.querySelector("#title").value = filename[0];

    // Affiche la seconde modale
    document.querySelector('#modale2__content__img').style.display = 'none';
    document.querySelector('#apercu__content').style.display = 'flex'
};

// Valide le formulaire d'ajout et crée donc une nouvelle instance dans la database
document.querySelector('#valider').onclick = function() {
    const title = document.querySelector('#title').value;
    const image = document.querySelector('#uploadImg').files[0];
    const categoryElements = document.querySelector('#category').value.split(',');
    const categoryId = parseInt(categoryElements[0]);
    const categoryName = categoryElements[1];

    const formData = new FormData();

    formData.append('title', title);
    formData.append('image', image);
    formData.append('category', categoryId);
    
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${window.sessionStorage.token}`,
        },
        body: formData,
    })
    .then(function(response) {
        if (response.ok) {
            alert("Nouveau projet ajouté avec succès !");
            afficherProduct(works);
            afficherTousLesProduitsDansModale()
        } else {
            alert("Erreur lors de la lecture des informations.")
        }
    })
};

// Changement de couleur du bouton #valider quand tous les champs sont remplis

const submitButton = document.querySelector('#valider');
const title = document.querySelector('#title');
const image = document.querySelector('#uploadImg');
const categoryElements = document.querySelector('#category');

function checkForm() {
  if (title.value && image.files.length > 0 && categoryElements.value !== "") {
    submitButton.style.backgroundColor = '#1D6154';
  };
}


title.addEventListener('input', checkForm);
image.addEventListener('change', checkForm);
categoryElements.addEventListener('change', checkForm);

document.addEventListener('DOMContentLoaded', checkForm);
