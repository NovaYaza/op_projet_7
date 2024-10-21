class Dropdown {
    constructor(containerId, options) {
        // ID du conteneur où le dropdown sera ajouté
        this.container = document.getElementById(containerId);
        // Options à afficher dans le dropdown (les ingrédients dans ce cas)
        this.options = options;
        
        // Création du dropdown dès l'instanciation de la classe
        this.createDropdown();
    }

    createDropdown() {
        // Vider le contenu existant du conteneur (au cas où)
        this.container.innerHTML = '';

        // Créer un élément div pour le dropdown
        const dropdownDiv = document.createElement('div');
        dropdownDiv.classList.add('dropdown-container');

        // Créer un champ de recherche (input) pour filtrer les options
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.classList.add('dropdown-search');
        searchInput.placeholder = 'Rechercher un ingrédient...'; // Placeholder dans la barre de recherche

        // Créer un élément ul pour la liste des options
        const dropdownList = document.createElement('ul');
        dropdownList.classList.add('dropdown-list');

        // Ajouter chaque option dans la liste
        this.renderOptions(dropdownList, this.options);

        // Ajouter un écouteur d'événement pour filtrer les options quand l'utilisateur tape dans la barre de recherche
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredOptions = this.options.filter(option => 
                option.toLowerCase().includes(searchTerm)
            );
            this.renderOptions(dropdownList, filteredOptions); // Réafficher la liste filtrée
        });

        // Ajouter la barre de recherche et la liste au conteneur
        dropdownDiv.appendChild(searchInput);
        dropdownDiv.appendChild(dropdownList);
        this.container.appendChild(dropdownDiv);
    }

    renderOptions(dropdownList, options) {
        // Vider la liste avant de la remplir à nouveau
        dropdownList.innerHTML = '';

        // Si aucune option ne correspond à la recherche
        if (options.length === 0) {
            const noOption = document.createElement('li');
            noOption.textContent = 'Aucun ingrédient trouvé';
            noOption.classList.add('dropdown-item');
            dropdownList.appendChild(noOption);
            return;
        }

        // Ajouter chaque option dans la liste
        options.forEach(option => {
            const listItem = document.createElement('li');
            listItem.textContent = option;
            listItem.classList.add('dropdown-item');
            
            // Ajouter un écouteur d'événement pour sélectionner une option
            listItem.addEventListener('click', () => {
                alert(`Vous avez sélectionné : ${option}`); // Action après sélection
            });

            dropdownList.appendChild(listItem);
        });
    }
}

export default Dropdown;