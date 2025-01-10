class VueModel {
    constructor(vue, model) {
        this.vue = vue;
        this.model = model;
        this.recipes = recipes;
        this.vue.afficherRecettes(recipes);

        // Récupération des listes d'éléments
        let ingredientsList = model.getIngredientsList(recipes);
        let ustensilsList = model.getUstensilsList(recipes);
        let appliancesList = model.getAppliancesList(recipes);

        // Appel initial pour afficher les dropdowns
        this.dropdownIngredients = new Dropdown("Ingrédients", ingredientsList, (typeDropdown, value) => {this.addFilterChoice(typeDropdown, value)});
        this.dropdownAppliances = new Dropdown("Appareils", appliancesList, (typeDropdown, value) => {this.addFilterChoice(typeDropdown, value)});
        this.dropdownUstensils = new Dropdown("Ustensiles", ustensilsList, (typeDropdown, value) => {this.addFilterChoice(typeDropdown, value)});
        this.ingredientsFilterList = [];
        this.appliancesFilterList = [];
        this.ustensilsFilterList = [];
        this.currentSearchTerm = ""; // Stocke le terme de recherche de ma searchbar général
        
        // Ajouter l'écouteur pour la barre de recherche
        const searchBar = document.getElementById("search_bar");
        const clearIcon = document.createElement("button"); // Ajouter un bouton pour la croix
        clearIcon.classList.add("clear-icon-mainsearchbar");
        clearIcon.innerHTML = "&times;";
        clearIcon.style.display = "none"; // Masqué par défaut
        searchBar.parentElement.appendChild(clearIcon); // Ajouter la croix dans le DOM

        searchBar.addEventListener("input", () => {
            this.currentSearchTerm = searchBar.value; // Met à jour le terme de recherche
            this.updateTagsAndRecipes(); // Met à jour les recettes en fonction des filtres
            
            // Afficher ou masquer la croix en fonction de la saisie
            if (searchBar.value.trim() !== "") {
                clearIcon.style.display = "inline";
            } else {
                clearIcon.style.display = "none";
            }
        });

        clearIcon.addEventListener("click", () => {
            searchBar.value = ""; // Effacer la barre de recherche
            clearIcon.style.display = "none"; // Masquer la croix
            this.currentSearchTerm = ""; // Réinitialiser le terme de recherche
            this.updateTagsAndRecipes(); // Mettre à jour les recettes
        });
    }

    addFilterChoice(typeDropdown, value) {
        // Si le type de dropdown est "Ingrédients"
        if (typeDropdown === "Ingrédients" && !this.ingredientsFilterList.includes(value)) {
            this.ingredientsFilterList.push(value);
        // Si le type de dropdown est "Appareils"
        } else if (typeDropdown === "Appareils" && !this.appliancesFilterList.includes(value)) {
            this.appliancesFilterList.push(value);
        // Si le type de dropdown est "Ustensiles"
        } else if (typeDropdown === "Ustensiles" && !this.ustensilsFilterList.includes(value)) {
            this.ustensilsFilterList.push(value);
        }
        
        // Appel à la fonction pour afficher les tags
        this.updateTagsAndRecipes();
    }

    // Nouvelle méthode pour supprimer un élément des filtres
    removeFilterChoice(typeDropdown, value) {
        if (typeDropdown === "Ingrédients") {
            this.ingredientsFilterList = this.ingredientsFilterList.filter(item => item !== value);
        } else if (typeDropdown === "Appareils") {
            this.appliancesFilterList = this.appliancesFilterList.filter(item => item !== value);
        } else if (typeDropdown === "Ustensiles") {
            this.ustensilsFilterList = this.ustensilsFilterList.filter(item => item !== value);
        }

        // Appel à la fonction pour afficher les tags
        this.updateTagsAndRecipes();
    }

    // Filtrer et mettre à jour les recettes
    updateTagsAndRecipes() {
        // Met à jour les tags affichés
        this.vue.afficherTags(
            this.ingredientsFilterList,
            this.appliancesFilterList,
            this.ustensilsFilterList,
            (typeDropdown, value) => this.removeFilterChoice(typeDropdown, value) // Mettre à jour l'affichage des tags après suppression
        );

        // Filtrer les recettes en fonction des tags et du terme de recherche
        const filteredRecipes = this.filterRecipes(this.currentSearchTerm);
        this.vue.afficherRecettes(filteredRecipes);
        this.dropdownIngredients.updateItemsList(this.model.getIngredientsList(filteredRecipes));
        this.dropdownAppliances.updateItemsList(this.model.getAppliancesList(filteredRecipes));
        this.dropdownUstensils.updateItemsList(this.model.getUstensilsList(filteredRecipes));
}

// Fonction principale de filtrage
// Fonction principale pour filtrer les recettes en fonction des tags ET du terme de recherche
filterRecipes(searchTerm = "") {
    // On filtre les recettes par le terme de recherche
    const recipesBySearchTerm = this.matchesSearchTerm(searchTerm);

    // On applique les filtres des tags sur les résultats du filtre par terme de recherche
    return recipesBySearchTerm.filter(recipe => {
        // Vérifier les ingrédients
        const hasIngredients = this.ingredientsFilterList.every(tag =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
        );

        // Vérifier l'appareil
        const hasAppliance = this.appliancesFilterList.every(tag =>
            recipe.appliance.toLowerCase() === tag.toLowerCase()
        );

        // Vérifier les ustensiles
        const hasUstensils = this.ustensilsFilterList.every(tag =>
            recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tag.toLowerCase())
        );

        // Retourner true si la recette correspond à tous les filtres
        return hasIngredients && hasAppliance && hasUstensils;
    });
}

// Fonction pour filtrer les recettes en fonction du terme de recherche
matchesSearchTerm(searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();

    // On utilise filter pour effectuer le tri par recherche dans le nom, la description ou les ingrédients
    return this.recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(lowerSearchTerm) ||
            recipe.description.toLowerCase().includes(lowerSearchTerm) ||
            recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(lowerSearchTerm)
            )
        );
    });
}
}

// Avec une boucle for()
/* matchesSearchTerm(searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filteredRecipes = [];

    // On utilise une boucle for pour parcourir les recettes
    for (let i = 0; i < this.recipes.length; i++) {
        const recipe = this.recipes[i];

        // On verifie si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
        if (
            recipe.name.toLowerCase().includes(lowerSearchTerm) ||
            recipe.description.toLowerCase().includes(lowerSearchTerm) ||
            recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(lowerSearchTerm)
            )
        ) {
            // On ajoute la recette filtrée à la liste des résultats
            filteredRecipes.push(recipe);
        }
    }

    return filteredRecipes;
} */