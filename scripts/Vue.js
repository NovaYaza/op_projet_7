class Vue {
  constructor() {
    this.container_recipes = document.getElementById("recettes_container");
    this.containerNombreRecettes = document.getElementById("nombre_recettes");

    // Conteneur pour les tags
    this.containerTags = document.getElementById("tags-container");
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
    recettes.forEach((recipe) => {
      const div = document.createElement("div");
      const image = `assets/images/${recipe.image}`;
      div.classList.add("recettes");
      div.innerHTML = `
            <div class="time_recette">${recipe.time} min</div>
            <img src="${image}" alt="${recipe.name}">
            <div class="recettes_textpart">
                <h2>${recipe.name}</h2>
                <p class="keypoint_recette">RECETTE</p>
                <p class="recipe_description">${recipe.description}</p>
                <ul id="ingredients-list"></ul>
                <p class="keypoint_recette">INGRÉDIENTS</p>
                <ul>${this.afficherIngredients(recipe.ingredients)}</ul>
            </div>
        `;
      this.container_recipes.appendChild(div);
    });

    // Appel de la méthode pour tronquer chaque description de recette
    this.maxTextLengthRecipeDescription()
  }

  // Méthode pour afficher les tags
  afficherTags(ingredients, appliances, ustensils, removeCallback) {
    this.containerTags.innerHTML = "";

    const types = [
      { items: ingredients, className: "tag-style", type: "Ingrédients" },
      { items: appliances, className: "tag-style", type: "Appareils" },
      { items: ustensils, className: "tag-style", type: "Ustensiles" },
    ];

    types.forEach(({ items, className, type }) => {
      items.forEach((item) => {
        const tag = document.createElement("span");
        tag.classList.add("tag", className);
        tag.textContent = item;

        // Bouton de suppression
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "&times;";
        removeButton.classList.add("remove-tag");
        removeButton.onclick = () => {
          removeCallback(type, item); // Appel du callback avec le type et la valeur à supprimer
        };

        tag.appendChild(removeButton);
        this.containerTags.appendChild(tag);
      });
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

  maxTextLengthRecipeDescription() {
    // Nombre maximal de caractères
    const maxChars = 180;

    // Sélectionne le paragraphe contenant la description de la recette
    const descriptions = document.querySelectorAll(".recipe_description");

    // Vérifie et tronque le texte si nécessaire
    descriptions.forEach((paragraphe) => {
      if (paragraphe.textContent.length > maxChars) {
        paragraphe.textContent = paragraphe.textContent.slice(0, maxChars) + "...";
      }
    });
  }
}
