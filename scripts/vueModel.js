class VueModel {
    constructor(vue, model) {
        this.vue = vue;
        this.model = model;
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
    }

    addFilterChoice(typeDropdown, value) {
        console.log(typeDropdown, value);
        // Si le typeDrodown c'est ingrédient et que l'ingrédient n'est pas dans ingredientsFilterList, on ajoute l'ingrédient dans le tableau
        // Appeler une fonction de la vue, on lui passe les listes de filtre et il affiche les tags
    }

    // Bonus 1 : Ajouter les croix sur les tags pour les enlever en mémoire 
    // Bonus 2 : Filtrer les recettes en fonction des tags d'un dropdown pour l'instant
}