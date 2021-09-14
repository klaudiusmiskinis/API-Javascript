const url = 'https://randomuser.me/api/?results=100';
var cont = 0;

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  for (var i = 0; i < authors.length; i++){
      console.log(authors[i])
      document.getElementById('galeria').insertAdjacentHTML('beforeend', generarUser(authors[i]))
      cont++;
  }
})
.catch(function(error) {
  console.log(error);
});

generateUser(30)

function generarUser(user){
    return '<div class="card m-2 text-center shadow-sm" id='+ user.name.last + cont +'>' + 
                '<img src=' + user.picture.large + ' height="100" class="card-img-top imagen">' + 
                '<div class="card-body">' + 
                    '<h5 class="card-title">' + user.name.first +' '+ user.name.last + '</h5>' + 
                    '<h6 class="card-subtitle mb-2 text-muted">' + user.gender.charAt(0).toUpperCase() + user.gender.slice(1) + ', ' +  user.dob.age + '</h6>' +
                    '<h7 class="card-subtitle mb-2 text-muted">' + user.cell +  '</h7>' +
                    '<p class="card-subtitle mb-2 text-muted">' + user.email + '</p>' +
                '</div>' + 
            '</div>'
}
