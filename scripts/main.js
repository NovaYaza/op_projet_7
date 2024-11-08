// Appel initial pour afficher toutes les recettes
let vue = new Vue();
vue.afficherRecettes(recipes);

// Appel initial pour afficher les listes ingrédients, ustensils et appliances
let model = new Model();
// Récupération des listes d'éléments
let ingredientsList = model.getIngredientsList(recipes);
let ustensilsList = model.getUstensilsList(recipes);
let appliancesList = model.getAppliancesList(recipes);

// Appel initial pour afficher les dropdowns
let dropdownIngredients = new Dropdown("Ingrédients", ingredientsList);
let dropdownAppliances = new Dropdown("Appareils", appliancesList);
let dropdownUstensils = new Dropdown("Ustensiles", ustensilsList);

/* model.getIngredientsList(recipes);
model.getUstensilsList(recipes);
model.getAppliancesList(recipes);
model.test(); */
