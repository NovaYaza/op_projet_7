class Dropdown {
    constructor() {
        // Conteneur où le dropdown sera ajouté
        this.container_dropdown = document.getElementById("dropdown-container");
        
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
            <div class="dropdown">
                <input type="checkbox" id="dropdown-toggle">
                <label for="dropdown-toggle" class="dropdown-btn">
                    Ingrédients
                    <span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>
                </label>
                <div class="dropdown-content">
                    <div class="search-container">
                        <input type="text" class="search-bar">
                        <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                    <ul>
                    <li>Tomates</li>
                    <li>Oignons</li>
                    <li>Laitue</li>
                    <li>Fromage</li>
                    <li>Pain</li>
                    </ul>
                </div>
            </div>
        `;
        this.container_dropdown.appendChild(divDropdown);
    }

}