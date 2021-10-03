// Connection to Socket
let socket = io();
var userRecipes;
var selectedRecipe;

socket.on('dateTime', (msg) => {
  let currentdate = new Date(); 
  console.log(msg + currentdate.getDate() + "/"
  + String(currentdate.getMonth()+1).padStart(2, '0')  + "/" 
  + currentdate.getFullYear() + " @ "  
  + String(currentdate.getHours()).padStart(2, '0') + ":"  
  + String(currentdate.getMinutes()).padStart(2, '0') + ":" 
  + String(currentdate.getSeconds()).padStart(2, '0'));
});

socket.on('message', (msg) => {
  console.log("Broadcast Message: "+ msg);
});

var generatePosts = (newPosts) => {
  let noOfRecipes = $('.Recipe').length;
  let RecipeIDs = $('.Recipe').length;
  newPosts.forEach(function (post) {
    let recipes = document.getElementById("Recipes");

    let column = document.createElement("div");
    column.className = "col s12 l6 Recipe";
    column.id = ++RecipeIDs;

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
    tryButton.className = "modal-trigger waves-effect waves-light btn right viewRecipe";
    tryButton.href = "#viewRecipeModal";
    tryButton.innerHTML = "Try it!";

    cardAction.appendChild(tryButton);

    recipes.appendChild(column); 
  });

  if(noOfRecipes == 0) {
    var s = document.createElement( 'script' );
    var inlineCode = document.createTextNode(`$('.viewRecipe').click(function (event) {
      event.preventDefault();
      viewRecipe(event);
    })` );
    s.appendChild(inlineCode);
    $('.Recipe').append(s);
  }

};

const viewRecipe = (event) => {
  let selectedRecipePos = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id - 1;
  selectedRecipe = userRecipes[selectedRecipePos]

  $('#viewRecipeTitle')[0].innerHTML = selectedRecipe.title;
  $('#viewRecipeBriefDescription').val(selectedRecipe.brief_description);
  $('#viewRecipeDescription').val(selectedRecipe.description);
  $('#viewRecipeVideo_url').val(selectedRecipe.video_url);

  let video_url = selectedRecipe.video_url;
  var videoID = video_url.split("=")[1];
  var embeddedUrl = "https://www.youtube.com/embed/"+videoID;
  $('#videoFrame').attr('src', embeddedUrl);
}

const updateRecipe = () => {
  let RecipeID = selectedRecipe._id;
  let recipeDetails = {
    id: RecipeID,      
    brief_description: $('#viewRecipeBriefDescription').val(),
    description: $('#viewRecipeDescription').val(),
    video_url: $('#viewRecipeVideo_url').val( )
  }

  $.ajax({
    url: "/updatePost",
    type: "PUT",
    data: recipeDetails, 
    success: (result) => {
      swal("Recipe Details Updated successfully!", {
        icon: "success",
        buttons: false
      });
      setTimeout(() => location.reload(), 1000);
    }
  });
}
const deleteRecipe = () => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Recipe!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let RecipeID = selectedRecipe._id;
        let recipeDetails = {
          id: RecipeID
        }

        $.ajax({
          url: "/deletePost",
          type: "DELETE",
          data: recipeDetails, 
          success: (result) => {
            swal("Recipe Deleted successfully!", {
              icon: "success",
              buttons: false
            });
            setTimeout(() => location.reload(), 1000);
          }
        });
      }
    })
}
const submitForm = () => {
  let formData = {};
  formData.title = $('#title').val();
  formData.image_url = $('#image_url').val();
  formData.description = $('#description').val();
  formData.brief_description = $('#brief_description').val();
  formData.video_url = $('#video_url').val();

  let { title, image_url, description, brief_description, video_url } = formData;

  if(!title || !image_url|| !description|| !brief_description|| !video_url) {
    if($('#message').hasClass('hide')) {
      $('#message').removeClass('hide');
    }
    $('.message-content')[0].innerHTML = "Fill in all the details!";
  } else {    
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
          let modalInstance = M.Modal.getInstance($(".modal"));
          modalInstance.close();
          
          swal("Recipe Added successfully!", {
            icon: "success",
            buttons: false
          });
          setTimeout(() => location.reload(), 1000);
        }
      });
    
    socket.emit("BroadcastCreatePost", formData.title);
    socket.emit("Broadcast", "A User Added a Post!");
    let post = [formData];
    generatePosts(post);
    $('.noposts')[0].className = "noposts center hide";
    console.log("Form Data Submitted: ", formData);
  }
}

$(document).ready(function(){  
  $('#formSubmit').click(()=>{
    submitForm();
  });
  
  $('.Send-Message').toggle();

  $('.modal').modal();
  $('#viewRecipeModal').modal();
  $('#chatBubble').modal();
  $('.fixed-action-btn').floatingActionButton();

  $('#updateRecipe').click((event) => {
    event.preventDefault();
    updateRecipe();
  })

  $('#deleteRecipe').click((event) => {
    event.preventDefault();
    deleteRecipe();
  });

  $('.card-alert > button').on('click', function(){
    if(!$('#message').hasClass('hide')) {
      $('#message').addClass('hide');
    }
    $(this).closest('div.card-alert').fadeOut('slow');
  });

  $.ajax({
    url: "/posts",
    type: "GET",
    success: (result) => {
      userRecipes = result.data;
      generatePosts(result.data);
      // location.reload();
    }
  });

});


socket.on('user', (user) => {
  console.log(`Broadcast Message: ${user.Message}`);
  $('#messagesContainer').prepend(`<p class='message'>${user.Message}</p>`);
});

$('#sendMessage').click((e) => {
  e.preventDefault();
  let message = $('#chatMessage').val();

  if (message) {
      socket.emit('userMessage', message);
      $('#chatMessage').val('');
      $('#messagesContainer').prepend(`<p class='message'>You : ${message}</p>`);
  }
});

socket.on('CreatePost', (chatMessage) => {
  M.toast({html: 'A User added a Post with title ' + chatMessage});
});

socket.on('message', (chatMessage) => {
  console.log(chatMessage);
  let currentdate = new Date(); 
  let currentDateTime = currentdate.getDate() + "/"
  + String(currentdate.getMonth()+1).padStart(2, '0')  + "/" 
  + currentdate.getFullYear() + " @ "  
  + String(currentdate.getHours()).padStart(2, '0') + ":"  
  + String(currentdate.getMinutes()).padStart(2, '0') + ":" 
  + String(currentdate.getSeconds()).padStart(2, '0');
  $('#messagesContainer').prepend(`<p class='message'>${currentDateTime} From ${chatMessage.Name} : ${chatMessage.Message}</p >`);
});


$('#addName').click((e) => {
  e.preventDefault();
  var userName = $('#name').val();

  if (userName) {
      socket.emit('addUser', userName);
      $('#name').val('');
      $('.Join-Form').toggle();
      $('.Send-Message').toggle();
  }
});