
const body = document.querySelector('.list-items')

export function renderItems(items){
    body.textContent = ""
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = "article"

        const title = document.createElement('p');
        card.appendChild(title);
        title.textContent = item.title;
        title.className = "titre"

        const description = document.createElement('p');
        card.appendChild(description);
        description.textContent = item.description;

        const price = document.createElement('p');
        card.appendChild(price);
        price.textContent = item.price;
        price.className = "price"

        const category = document.createElement('p');
        card.appendChild(category);
        category.textContent = item.category;

        const status = document.createElement('p');
        card.appendChild(status);
        status.textContent = item.status;

        const createdAt = document.createElement('p');
        card.appendChild(createdAt);
        createdAt.textContent = item.createdAt;

        const supprime = document.createElement('button');
        card.appendChild(supprime);
        supprime.textContent = "Supprimer";
        supprime.className = "btn-supprimer";

        const modifier = document.createElement('button');
        card.appendChild(modifier);
        modifier.textContent = "modifier";
        modifier.className = "btn-modifier";
        modifier.dataset.id = item.id;
       

        body.appendChild(card)
    });
}
