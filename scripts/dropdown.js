class Dropdown {
    constructor(title, listItems, callbackFunction) {
        // Conteneur où le dropdown sera ajouté
        this.container_dropdown = document.getElementById("dropdown-container");
        
        this.title = title;
        this.listItems = listItems;
        this.filteredItems = listItems; // Liste des éléments filtrés
        this.callbackFunction = callbackFunction;

        // Création du dropdown dès l'instanciation de la classe
        this.createDropdown();
    }

    createDropdown() {

        // Création du dropdown
        const divDropdown = document.createElement("div");
        divDropdown.classList.add("dropdown");

        divDropdown.innerHTML = `
                <button class="dropdown-btn">
                    ${this.title}
                    <span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>
                </button>
                <div class="dropdown-content">
                    <div class="search-container">
                        <input type="text" class="search-bar">
                        <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                    <ul class="dropdown-list liste-itemDropdown">${this.createListItemsHTML(this.filteredItems)}</ul>
                </div>
        `;
        this.container_dropdown.appendChild(divDropdown);
        this.addListeners(divDropdown);
    }

    createListItemsHTML(items) {
        // Crée une liste d'éléments HTML à partir de la liste fournie
        return items.map(item => `<li class="dropdown-item">${item}</li>`).join("");
    }

    // Ajout d'un écouteur d'évènement pour ouvrir et fermer le dropdown lorsqu'on clique dessus
    addListeners(divDropdown) {
        // On ajoute le listener de clic au bouton du dropdown
        let dropdownBtn = divDropdown.querySelector(".dropdown-btn");
        let searchBar = divDropdown.querySelector(".search-bar");
        let dropdownList = divDropdown.querySelector(".dropdown-list");

        dropdownBtn.addEventListener("click", (event) => {
            event.stopPropagation(); // Empêche la propagation du clic
            
            // On utilise "currentTarget" pour cibler dynamiquement le bouton qui est cliqué
            const currentDropdown = event.currentTarget.closest(".dropdown");
            const dropdownContent = currentDropdown.querySelector(".dropdown-content");
            const arrowRotate = currentDropdown.querySelector(".arrow");

            // Bascule l'affichage du contenu et la rotation de la flèche
            dropdownContent.classList.toggle("show");
            arrowRotate.classList.toggle("rotate");

            // Ajouter ou retirer l'écouteur de clic global
            if (dropdownContent.classList.contains("show")) {
                this.registerOutsideClickListener(divDropdown);
            } else {
                this.unregisterOutsideClickListener();
            }
        });

        // Ajout de la fonctionnalité de recherche avec la croix
        this.makeSearchBarClearable(searchBar, () => {
            this.filterItems(""); // Réinitialiser la liste si la barre est effacée
            dropdownList.innerHTML = this.createListItemsHTML(this.filteredItems); // Mise à jour des items
            this.addItemClickListeners(dropdownList); // Réajouter les listeners
        });

        // Écoute l'entrée de recherche
        searchBar.addEventListener("input", () => {
            this.filterItems(searchBar.value); // Filtrer les éléments selon la recherche
            dropdownList.innerHTML = this.createListItemsHTML(this.filteredItems); // Met à jour la liste affichée
            this.addItemClickListeners(dropdownList); // Ajoute des listeners de clic même après mise à jour (modification) de la liste des items
        });

        // Ajoute les écouteurs de clic sur les items
        this.addItemClickListeners(dropdownList);
    }

    // Fonction pour créer la croix et créer son comportement
    makeSearchBarClearable(searchBar, clearCallback) {
        const clearIcon = document.createElement("button");
        clearIcon.classList.add("clear-icon");
        clearIcon.style.display = "none"; // Masqué par défaut
        clearIcon.innerHTML = "&times;";

        searchBar.parentElement.appendChild(clearIcon);

        searchBar.addEventListener("input", () => {
            if (searchBar.value.trim() !== "") {
                clearIcon.style.display = "inline"; // Afficher la croix
            } else {
                clearIcon.style.display = "none"; // Masquer la croix
                clearCallback(); // Appeler le callback si la recherche est effacée
            }
        });

        clearIcon.addEventListener("click", () => {
            searchBar.value = ""; // Effacer le contenu
            clearIcon.style.display = "none"; // Masquer la croix
            clearCallback(); // Appeler le callback pour réinitialiser la recherche
        });
    }
        
    filterItems(searchTerm) {
        // Filtrer les items en fonction de la recherche
        const lowercaseSearchTerm  = searchTerm.toLowerCase();
        this.filteredItems = this.listItems.filter(item => 
            item.toLowerCase().includes(lowercaseSearchTerm )
        );
    }

    // Ajout d'un écouteur d'évènement pour afficher les items de la liste lors d'un clique
    addItemClickListeners(dropdownList) {
        // Sélectionne tous les éléments de la liste et leur ajoute un écouteur de clic
        const items = dropdownList.querySelectorAll(".dropdown-item");
        items.forEach(item => {
            item.addEventListener("click", () => {
                console.log(item.textContent); // Affiche le texte de l'élément dans la console
                this.callbackFunction(this.title, item.textContent);
            });
        });
    }

    // Gestion des clics en dehors du dropdown
    registerOutsideClickListener(divDropdown) {
        const outsideClickListener = (event) => {
            if (!divDropdown.contains(event.target)) {
                this.closeDropdown(divDropdown);
                this.unregisterOutsideClickListener();
            }
        };
        document.addEventListener("click", outsideClickListener);
        this.outsideClickListener = outsideClickListener; // Sauvegarder pour pouvoir le retirer
    }

    unregisterOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener("click", this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    closeDropdown(divDropdown) {
        const dropdownContent = divDropdown.querySelector(".dropdown-content");
        const arrowRotate = divDropdown.querySelector(".arrow");

        dropdownContent.classList.remove("show");
        arrowRotate.classList.remove("rotate");
    }
}