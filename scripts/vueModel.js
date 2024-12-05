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
        searchBar.addEventListener("input", () => {
            this.currentSearchTerm = searchBar.value; // Met à jour le terme de recherche
            this.updateTagsAndRecipes(); // Met à jour les recettes en fonction des filtres
        });
    }

    addFilterChoice(typeDropdown, value) {
        // Si le type de dropdown est "Ingrédients"
        if (typeDropdown === "Ingrédients" && !this.ingredientsFilterList.includes(value)) {
            this.ingredientsFilterList.push(value);
            console.log(this.ingredientsFilterList);
        // Si le type de dropdown est "Appareils"
        } else if (typeDropdown === "Appareils" && !this.appliancesFilterList.includes(value)) {
            this.appliancesFilterList.push(value);
            console.log(this.appliancesFilterList);
        // Si le type de dropdown est "Ustensiles"
        } else if (typeDropdown === "Ustensiles" && !this.ustensilsFilterList.includes(value)) {
            this.ustensilsFilterList.push(value);
            console.log(this.ustensilsFilterList);
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

// Filtrer avec des boucles natives
/* filterRecipes(searchTerm = "") {
    const filteredRecipes = [];

    // Parcourir toutes les recettes
    for (let i = 0; i < this.recipes.length; i++) {
        const recipe = this.recipes[i];

        // Vérifier si la recette correspond à la recherche
        const searchMatch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.ingredients.some(ingredient =>
                                ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase()));

        // Vérification des filtres d'ingrédients
        let hasIngredients = true;
        for (let j = 0; j < this.ingredientsFilterList.length; j++) {
            const tag = this.ingredientsFilterList[j];
            let foundIngredient = false;
            for (let k = 0; k < recipe.ingredients.length; k++) {
                const ingredient = recipe.ingredients[k].ingredient.toLowerCase();
                if (ingredient === tag.toLowerCase()) {
                    foundIngredient = true;
                    break;
                }
            }
            if (!foundIngredient) {
                hasIngredients = false;
                break;
            }
        }

        // Vérification de l'appareil
        let hasAppliance = true;
        for (let j = 0; j < this.appliancesFilterList.length; j++) {
            const tag = this.appliancesFilterList[j];
            if (recipe.appliance.toLowerCase() !== tag.toLowerCase()) {
                hasAppliance = false;
                break;
            }
        }

        // Vérification des ustensiles
        let hasUstensils = true;
        for (let j = 0; j < this.ustensilsFilterList.length; j++) {
            const tag = this.ustensilsFilterList[j];
            let foundUstensil = false;
            for (let k = 0; k < recipe.ustensils.length; k++) {
                const ustensil = recipe.ustensils[k].toLowerCase();
                if (ustensil === tag.toLowerCase()) {
                    foundUstensil = true;
                    break;
                }
            }
            if (!foundUstensil) {
                hasUstensils = false;
                break;
            }
        }

        // Ajouter la recette si elle correspond à tous les critères
        if (searchMatch && hasIngredients && hasAppliance && hasUstensils) {
            filteredRecipes.push(recipe);
        }
    }

    return filteredRecipes;
} */ 


/* // Si le type de dropdown est "Ingrédients"
if (typeDropdown === "Ingrédients") {
    // Vérifie si l'ingrédient n'est pas déjà dans ingredientsFilterList
    if (!this.ingredientsFilterList.includes(value)) {
        // Ajoute l'ingrédient dans le tableau
        this.ingredientsFilterList.push(value);
        console.log(`Ingrédient ajouté : ${value}`);
        console.log("Liste des ingrédients filtrés :", this.ingredientsFilterList);
    } else {
        console.log(`L'ingrédient "${value}" est déjà dans la liste.`);
    }
// Si le type de dropdown est "Appareils"
} else if (typeDropdown === "Appareils") {
    // Vérifie si l'appareil n'est pas déjà dans appliancesFilterList
    if (!this.appliancesFilterList.includes(value)) {
        // Ajoute l'ingrédient dans le tableau
        this.appliancesFilterList.push(value);
        console.log(`Appareil ajouté : ${value}`);
        console.log("Liste des appareils filtrés :", this.appliancesFilterList);
    } else {
        console.log(`L'appareil "${value}" est déjà dans la liste.`);
    }
// Si le type de dropdown est "Ustensiles"
} else if (typeDropdown === "Ustensiles") {
    // Vérifie si l'ustensile n'est pas déjà dans ustensilsFilterList
    if (!this.ustensilsFilterList.includes(value)) {
        // Ajoute l'ingrédient dans le tableau
        this.ustensilsFilterList.push(value);
        console.log(`Ustensile ajouté : ${value}`);
        console.log("Liste des ustensiles filtrés :", this.ustensilsFilterList);
    } else {
        console.log(`L'ustensile "${value}" est déjà dans la liste.`);
    }
} */