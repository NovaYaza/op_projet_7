class Dropdown {
    constructor(options) {
        // Conteneur où le dropdown sera ajouté
        this.container_dropdown = document.getElementById("dropdown-container");
        // Options à afficher dans le dropdown (ingrédients, appliance ou ustensils)
        this.options = options;
        
        // Création du dropdown dès l'instanciation de la classe
        this.createDropdown();
    }

    createDropdown() {
        // Vider le contenu existant du conteneur
        this.container_dropdown.innerHTML = '';

        // Création du dropdown
        const divDropdown = document.createElement("div");
        divDropdown.classList.add("dropdown");
        divDropdown.innerHTML = `
            <span>Test</span>
            <div class="dropdown-content">
                <p>Liste</p>
            </div>
        `;
        this.container_dropdown.appendChild(divDropdown);
    }

}