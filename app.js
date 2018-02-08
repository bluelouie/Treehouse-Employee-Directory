//------------------------------------------------------------------
// API request and callback-----------------------------------------
// -----------------------------------------------------------------

var url = 'https://randomuser.me/api/?nat=us';

var dataOptions = {
  dataType: 'json',
  results : 36
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

ti
//-------------------------------------------------------------------
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
/* Bulds the modal window based on click. I tried not to use another API request */
//-------------------------------------------------------------------------------------

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
      var address = "<h3>" + users[i].location.street + ', ' +  abbrRegion(users[i].location.state, 'abbr') + ' ' + users[i].location.postcode + '</h3>';
      var birthday = "<h3>Birthday: " + dobArrange(users[i].dob) + '</h3>';

      var placeHTML = picture + name + email + city + phoneNumber + address + birthday;
      $('.modal-content--section').html(placeHTML);
    }
  }
  modal.style.display = 'block';
}
//-------------------------------------------------------------------------------------
/* API .dob value was not formatted the way I needed, so this rearranges it with slice() Ex: 1992-11-24 => 11/24/1992  */
//-------------------------------------------------------------------------------------

function dobArrange(dob) {
  var year = dob.slice(0, 4);
  var month = dob.slice(5, 7);
  var day = dob.slice(8, 10);
  var date = month + '/' + day + '/' + year;
  return date;
}


//-------------------------------------------------------------------------------------
//Convert State name to Shorter name(Thanks! https://gist.github.com/calebgrove/c285a9510948b633aa47)--------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

function abbrRegion(input, to) {
    var states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['American Samoa', 'AS'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['Armed Forces Americas', 'AA'],
        ['Armed Forces Europe', 'AE'],
        ['Armed Forces Pacific', 'AP'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Marshall Islands', 'MH'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Northern Mariana Islands', 'NP'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['US Virgin Islands', 'VI'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    // So happy that Canada and the US have distinct abbreviations
    var provinces = [
        ['Alberta', 'AB'],
        ['British Columbia', 'BC'],
        ['Manitoba', 'MB'],
        ['New Brunswick', 'NB'],
        ['Newfoundland', 'NF'],
        ['Northwest Territory', 'NT'],
        ['Nova Scotia', 'NS'],
        ['Nunavut', 'NU'],
        ['Ontario', 'ON'],
        ['Prince Edward Island', 'PE'],
        ['Quebec', 'QC'],
        ['Saskatchewan', 'SK'],
        ['Yukon', 'YT'],
    ];

    var regions = states.concat(provinces);

    var i; // Reusable loop variable
    if (to == 'abbr') {
        input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        for (i = 0; i < regions.length; i++) {
            if (regions[i][0] == input) {
                return (regions[i][1]);
            }
        }
    } else if (to == 'name') {
        input = input.toUpperCase();
        for (i = 0; i < regions.length; i++) {
            if (regions[i][1] == input) {
                return (regions[i][0]);
            }
        }
    }
}




const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");

function spinElement(event) {
  //Applies spinning animation to button element
  event.target.className = "spin";
}

btn1.addEventListener('click', spinElement);
btn2.addEventListener('click', spinElement);
btn3.addEventListener('click', spinElement);
