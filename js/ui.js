

const  pricesContainer = document.getElementById('prices-container');

export function renderPrices(metals){
    pricesContainer.replaceChildren();
    metals.forEach(metal => {
        const card = document.createElement("article");
        card.className = metal.code === "gold" ? "card1": "card2";

        const cardHeader = document.createElement("div");
        cardHeader.className = metal.code === "gold" ? "article-header1" : "article-header2";
        card.append(cardHeader);

       const title = document.createElement("h2");
       title.textContent = metal.name;
       title.className = metal.code === "gold" ? "gold" : "Argent";
       cardHeader.append(title);

       const paragraph = document.createElement("p");
       paragraph.textContent = `Prix actual: ${metal.price.toFixed(2)} ${metal.currency}`;
       paragraph.className = "phrase";
       card.append(paragraph);

       const laDate = document.createElement("p");
       laDate.className = "updated"
       laDate.textContent = `Mis à jour :${new Date(metal.updatedAt).toLocaleString("fr-FR")}`;
       card.append(laDate)
        
       pricesContainer.append(card);
    });
}

