// API request and callback--------------------------------------------------
// -----------------------------------------------------------------

var url = 'https://randomuser.me/api/?nat=us';

var dataOptions = {
  dataType: 'json',
  results : 12
};

var callBack = function (json, textStatus) {
  window.results = json.results;
  var results = window.results;
  var placeHTML = '<ul class="employeeList">';

  $.each(results, function(index, el) {
    var name = el.name.first + " " + el.name.last;
    var email = el.email;
    var city = el.location.city;
    //---------------------------//
    placeHTML += '<li class="employee">';
    placeHTML += '<img src="' + el.picture.large +'" alt="Pic">';
    placeHTML += '<h3>' + name + '<span>' + email + '</span><span>'+ city +'</span></h3>';

  });
  placeHTML += '</ul>';
  $('.bodyDiv').html(placeHTML);

  //Call Modual() after callback
  modal();
}

$.getJSON(url, dataOptions, callBack);



// Modal Scripting--------------------------------------------------
// -----------------------------------------------------------------
function modal() {
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var pictureSelect = $('.employee');
  $.makeArray(pictureSelect);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  $(pictureSelect).each(function(i, pictureSelect) {
    $(pictureSelect).on( "click", modualBuilder);
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
//-------------------------------------------------------------------------------------
/* Bulds the modal window based on click I tried not to use another API request */
function modualBuilder(e) {
  var users = window.results;
  var target = e;
  var modal = $('.modal')[0];
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === target.currentTarget.childNodes[1].firstElementChild.innerText) {

      var picture = '<img class="modal--pic" src="' + users[i].picture.large +'" alt="Pic">';
      var name = '<h2>' + users[i].name.first + " " + users[i].name.last + '</h2>';
      var email = "<h3>" + users[i].email + '</h3>';

      var city = "<h3>" + users[i].location.city + '</h3>' + "<hr>";
      var phoneNumber = "<h3>" + users[i].phone + '</h3>';
      var address = "<h3>" + users[i].location.street + ', ' + users[i].location.state + ' ' + users[i].location.postcode + '</h3>';
      var birthday = "<h3>Birthday: " + dobArrange(users[i].dob) + '</h3>';

      var placeHTML = picture + name + email + city + phoneNumber + address + birthday;
      $('.modal-content--section').html(placeHTML);
    }
  }
  modal.style.display = 'block';
}
//-------------------------------------------------------------------------------------
/* API .dob value was not formatted the way I needed so this rearranges it with slice()  */

function dobArrange(dob) {
  var year = dob.slice(0, 4);
  var month = dob.slice(5, 7);
  var day = dob.slice(8, 10);
  var date = month + '/' + day + '/' + year;
  return date;
}


//-------------------------------------------------------------------------------------
