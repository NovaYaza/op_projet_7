class Vue {
  constructor() {
    this.container_recipes = document.getElementById("recettes_container");
    this.containerNombreRecettes = document.getElementById("nombre_recettes");
  }
  // Fonction pour afficher les recettes et mettre à jour le compteur de recettes
  afficherRecettes(recettes) {
    // Vider le conteneur de recettes
    this.container_recipes.innerHTML = "";

    // Mettre à jour le nombre de recettes
    const nombreRecettes = recettes.length;
    this.containerNombreRecettes.textContent = `${nombreRecettes} recette${
      nombreRecettes > 1 ? "s" : ""
    }`;

    // On parcourt toutes les recettes et on les affiche
    recipes.forEach((recipe) => {
      const div = document.createElement("div");
      const image = `assets/images/${recipe.image}`;
      div.classList.add("recettes");
      div.innerHTML = `
            <div class="time_recette">${recipe.time} min</div>
            <img src="${image}" alt="${recipe.name}">
            <div class="recettes_textpart">
                <h2>${recipe.name}</h2>
                <p class="keypoint_recette">RECETTE</p>
                <p>${recipe.description}</p>
                <ul id="ingredients-list"></ul>
                <p class="keypoint_recette">INGRÉDIENTS</p>
                <ul>${this.afficherIngredients(recipe.ingredients)}</ul>
            </div>
        `;
      this.container_recipes.appendChild(div);
    });
  }

  // Fonction qui parcourt les ingrédients
  afficherIngredients(ingredients) {
    // On initialise une chaîne de caractères pour contenir le HTML des ingrédients
    let ingredientsHTML = "";
    ingredients.forEach((ingredient) => {
      if (ingredient.quantity) {
        ingredientsHTML += `<li>${ingredient.ingredient}</li>
                          <li>${ingredient.quantity} ${
          ingredient.unit ? ingredient.unit + " " : ""
        }</li>
            `;
      } else {
        // Si pas de quantité ou d'unité
        ingredientsHTML += `<li>${ingredient.ingredient}</li>
                          <li>-</li>
            `;
      }
    });
    return ingredientsHTML; // On retourne le HTML des ingrédients
  }
}
