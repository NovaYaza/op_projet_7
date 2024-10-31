// Appel initial pour afficher toutes les recettes
let vue = new Vue();
vue.afficherRecettes(recipes);

// Appel initial pour afficher les dropdowns
let dropdown = new Dropdown();
dropdown.createDropdown();

// Appel initial pour afficher les listes ingrédients, ustensils et appliances
let model = new Model();
model.getIngredientsList(recipes);
model.getUstensilsList(recipes);
model.getAppliancesList(recipes);
/* model.test(); */
