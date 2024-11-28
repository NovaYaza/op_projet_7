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
        let dropdownIngredients = new Dropdown("Ingrédients", ingredientsList, (typeDropdown, value) => {this.addFilterChoice(typeDropdown, value)});
        let dropdownAppliances = new Dropdown("Appareils", appliancesList, (typeDropdown, value) => {this.addFilterChoice(typeDropdown, value)});
        let dropdownUstensils = new Dropdown("Ustensiles", ustensilsList, (typeDropdown, value) => {this.addFilterChoice(typeDropdown, value)});
        this.ingredientsFilterList = [];
        this.appliancesFilterList = [];
        this.ustensilsFilterList = [];
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

        // Filtrer les recettes et mettre à jour l'affichage
        const filteredRecipes = this.filterRecipes();
        this.vue.afficherRecettes(filteredRecipes);
}

filterRecipes() {
    return this.recipes.filter(recipe => {
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

        // Retourner true si tous les critères sont remplis
        return hasIngredients && hasAppliance && hasUstensils;
    }); 
    }
}

// Objectifs :
    // 


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