
const posts = [
  {
      title: "Recipe 1",
      image_url: "https://picsum.photos/200/300.jpg",
      brief_description: "Random Recipe",
      video_url: "video_url"
  },
  {
      title: "Recipe 2",
      image_url: "https://picsum.photos/200/300.jpg",
      brief_description: "Random Recipe",
      video_url: "video_url"
  }
]

var generatePosts = (newPosts) => {
  newPosts.forEach(function (post) {
    let recipes = document.getElementById("Recipes");

    let column = document.createElement("div");
    column.className = "col s12 l6";

    let card = document.createElement("div");
    card.className = "card";
    column.appendChild(card);

    let header = document.createElement("h2");
    header.className = "heander center";
    header.innerHTML = post.title;
    card.appendChild(header);
    
    let cardHorizontal = document.createElement("div");
    cardHorizontal.className = "card horizontal";
    card.appendChild(cardHorizontal);

    let cardImage = document.createElement("div");
    cardImage.className = "card-img";
    cardHorizontal.appendChild(cardImage);

    let image = document.createElement("img");
    image.src = post.image_url;
    image.className = "Recipe-img";
    cardImage.appendChild(image);

    let cardStacked = document.createElement("div");
    cardStacked.className = "card-stacked";
    cardHorizontal.appendChild(cardStacked);

    let cardContent = document.createElement("div");
    cardContent.className = "card-content";
    cardStacked.appendChild(cardContent);

    let description = document.createElement("p");
    description.innerHTML = post.brief_description;
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
  });
};


const submitForm = () => {
  let formData = {};
  formData.title = $('#title').val();
  formData.image_url = $('#image_url').val();
  formData.description = $('#description').val();
  formData.brief_description = $('#brief_description').val();
  formData.video_url = $('#video_url').val();

  
  $('#title').val('');
  $('#image_url').val('');
  $('#description').val('');
  $('#brief_description').val('');
  $('#video_url').val('');
  $('.modal').modal('close');

  $.ajax({
      url: "/addRecipe",
      data: formData,
      type: "POST",
    success: (result) => {
        $('.modal').closeModal();
      }
    });
    
  let post = [formData];
  generatePosts(post);
  $('.noposts')[0].className = "noposts center hide";
  console.log("Form Data Submitted: ", formData);
}

$(document).ready(function(){  

  $('#formSubmit').click(()=>{
    submitForm();
  });
  
  $('.modal').modal();

  $.ajax({
    url: "/posts",
    type: "GET",
    success: (result) => {
      generatePosts(result.data);
      // location.reload();
    }
  });

});
