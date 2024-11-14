class Model {
    
    getIngredientsList(recipes) {
        let newIngredientsList = [];
        for (const recipe of recipes) {
            let ingredients = recipe.ingredients;
            for (const ingredient of ingredients) {
                const ingredientName = ingredient.ingredient.toLowerCase();
                /* console.log(ingredient.ingredient); */
                if (newIngredientsList.indexOf(ingredientName) == -1) {
                    newIngredientsList.push(ingredientName);
                }
            }
        }
        /* console.log(newIngredientsList); */
        return newIngredientsList;
    }

    getUstensilsList(recipes) {
        let newUstensilsList = [];
        for (const recipe of recipes) {
            let ustensil = recipe.ustensils;
            ustensil.forEach(ustensil => {
                const ingredientName = ustensil.toLowerCase();
                if (newUstensilsList.indexOf(ingredientName) == -1) {
                    newUstensilsList.push(ingredientName);
                }
            });
        }
        /* console.log(newUstensilsList); */
        return newUstensilsList;
    }

    getAppliancesList(recipes) {
        let newAppliancesList = [];
        for (const recipe of recipes) {
            let appliance = recipe.appliance;
                const applianceName = appliance.toLowerCase();
                if (newAppliancesList.indexOf(applianceName) == -1) {
                    newAppliancesList.push(applianceName);
                }
        }
        /* console.log(newAppliancesList); */
        return newAppliancesList;
    }
    
}

