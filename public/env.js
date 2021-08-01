var generatePosts = (items) => {
  
  let recipes = document.getElementById("Recipes");

  for(let i=0;i<items;i++) {

      let column = document.createElement("div");
      column.className = "col s12 l6";
    
      let card = document.createElement("div");
      card.className = "card";
      column.appendChild(card);
    
      let header = document.createElement("h2");
      header.className = "heander center";
      header.innerHTML = "Recipe" + (i+1);
      card.appendChild(header);
      
      let cardHorizontal = document.createElement("div");
      cardHorizontal.className = "card horizontal";
      card.appendChild(cardHorizontal);
    
      let cardImage = document.createElement("div");
      cardImage.className = "card-img";
      cardHorizontal.appendChild(cardImage);
    
      let image = document.createElement("img");
      image.src = "https://lorempixel.com/200/200/food";
      image.className = "Recipe-img";
      cardImage.appendChild(image);
    
      let cardStacked = document.createElement("div");
      cardStacked.className = "card-stacked";
      cardHorizontal.appendChild(cardStacked);
    
      let cardContent = document.createElement("div");
      cardContent.className = "card-content";
      cardStacked.appendChild(cardContent);
    
      let description = document.createElement("p");
      description.innerHTML = "Brief Description about the food.";
      cardContent.appendChild(description);
      
      let cardAction = document.createElement("div");
      cardAction.className = "card-action";
      cardStacked.appendChild(cardAction);
      
      let tryButton = document.createElement("a");
      tryButton.className = "waves-effect waves-light btn right";
      tryButton.href = "#";
      tryButton.innerHTML = "Try it!";
      cardAction.appendChild(tryButton);
    
      recipes.appendChild(column);    
  }
};

generatePosts(8);
