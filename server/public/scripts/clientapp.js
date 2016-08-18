$(document).ready(function() {
  console.log('works');
  var userAnimal;
  getAnimals();
  $('#animal-form').on('submit', postAnimal);

  function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {
      console.log('GET /animals returns:', animals);
      animals.forEach(function (animal) {
        var $el = $('<li></li>');
        $el.append('<strong>' + animal.animal_type + ' </strong>');
        $el.append('<h5>Population: ' + animal.population + '</h5>');
        $('#animal-list').append($el);
      });
    },

    error: function (response) {
      console.log('GET /animals fail. No Animals could be found');
    }
  });
}
function postAnimal() {
  event.preventDefault();

  var userAnimal = {};

  $.each($('#animal-form').serializeArray(), function (i, field) {
    userAnimal[field.name] = field.value;
  });

  console.log('Animal Type: ', userAnimal);
  $.ajax({
    type: 'POST',
    url: '/animals',
    data: userAnimal,
    success: function () {
      console.log('POST /animals works!');
      $('#animal-list').empty();
      getAnimals();
    },

    error: function (response) {
      console.log('POST /animals not working...');
    },
  });
}

});
