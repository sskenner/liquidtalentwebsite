// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

/***********************************************************************************************************************
/   Main
/**********************************************************************************************************************/

var loaders, pages;

var currentUser = null;

$(window).on('load', function () {

  pages = {

    'active': '',

    'home': {

      'href': '',
      'load': function () {

        $('#presentation').css({ opacity: 0, display: 'block' });
        $('#presentation').animate({ opacity: 1 }, 1000, 'linear');

        if ($('#background.disabled')) { $('#background').removeClass('disabled'); }
        if ($('#admin-panel.disabled')) { $('#admin-panel').removeClass('disabled'); }

        rF = {

          /* Name, email, zip fields and send button. */

          'href': '/presentation/subscribe',

          'n': $('#register-form-name'),
          'e': $('#register-form-email'),
          'z': $('#register-form-zip')

        };

        cF = $('#contact-form');
        cF = {

          /* Name, email, phone number, reason for contact, message fields and contact button. */

          'href': '/send_message',

          'n': cF.find('.name'),
          'e': cF.find('.email'),
          'p': cF.find('.phone'),
          's': cF.find('.reason'),
          'm': cF.find('.message')

        };

      }

    },

    'login': {

      'href': '/login',
      'load': function () {
          sF = $('#sign-in');
          sF = {

              'href': '/user/signin',

              'email': sF.find('.email'),
              'password': sF.find('.password')

          };

        $('#presentation').animate({ opacity: 0 }, 1000, 'linear').promise().done(function () { $('#presentation').css({ display: 'none' }); });

        if ($('#background.disabled')) { $('#background').addClass('disabled'); }
        if ($('#admin-panel.disabled')) { $('#admin-panel').addClass('disabled'); }

      }

    },

    'signup': {

      'href': '/signup',
      'load': function () {

        sF = $('#sign-up-form');
        sF = {

          'href': '/user/signup',

          'a': sF.find('.image-upload #avatar'),
          'aus': false, // Avatar Upload State

          'n': sF.find('.name'),
          'e': sF.find('.email'),
          'p': sF.find('.password'),
          'pc': sF.find('.password_confirmation')

        };

        sF.a.on('change', function () {
          sF.as = true;
        });

      }

    },
      'search': {

          'href': '/search',
          'load': function () {
          }

      },

      'map': {

          'href': '/map',
          'load': function () {
              if ($('#background.disabled')) { $('#background').removeClass('disabled'); }
              if ($('#admin-panel.disabled')) { $('#admin-panel').removeClass('disabled'); }

              var map_canvas = document.getElementById('map_canvas');
              var map_options = {
                  center: new google.maps.LatLng(40.5403, -73.5463),
                  zoom: 8,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }
              var map = new google.maps.Map(map_canvas, map_options)

              mapSearch(map);
          }

      }

  };

  loaders = {

    'tags': $('.loader'),

    'toggle': function (loader, opacity) {

      loader = loaders.tags.each(function () {

        if ($(this).prop('alt') === loader) {
          return $(this);
        }

      });
      loader.animate({ 'opacity': opacity }, 1000, 'linear');

    }

  };

  pages.home.load();

});

function Response(response) {

  if (response['error'] && response['error'] != '') {
    alert(response['error']);
  }
  else if (response['success']) {
    alert(response['success']);
  }
  else {

    alert("Could not connect to the server. Please try again later.");
    console.log(response);

  }

}

function loadPage (page) {

  Object.keys(pages).forEach(function (p) { if (pages[p].href === page) { pages.active = pages[p]; } });

  $.ajax({
    url: pages.active.href,
    error: Response
  }).done(function (data) {
      $('#background').html(data);
      pages.active.load();
    });

  return false;

}

function getURLParameter(name) {
  return (decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1]).replace(/\+/g, '%20')) || null;
}

/***********************************************************************************************************************
/   Presentation
/**********************************************************************************************************************/

var rF;
var cF;
var pageSegments;

function SubmitRegisterForm () {

  $.ajax({
    url: rF.href,
    type: 'post',
    data: 'name=' + rF.n.val() + '&email=' + rF.e.val() + '&zip=' + rF.z.val(),
    error: Response(data)
  }).done(Response(data));

}

function SubmitContactForm () {

  loaders.toggle('contact', 1);

  $.ajax({
    url: cF.href,
    type: 'post',
    data: 'name=' + cF.n.val() + '&email=' + cF.e.val() + '&phone=' + cF.p.val() + '&subject=' + cF.s.val() + '&message=' + cF.m.val(),
    error: Response(data)
  }).done(function (data) {
      Response(data);
      loaders.toggle('contact', 0);
    });

}

function RevealPage (pageSegment) {

  pageSegments = {

    about: $('#about-page'),
    press: $('#press-page'),
    contact: $('#contact-page'),
    privacy: $('#privacy-page')

  };

  if (pageSegment === 'privacy') {

    pageSegments.about.animate({ 'opacity': 0 }, 300, 'linear', function () { pageSegments.about.css('display', 'none'); });
    pageSegments.press.animate({ 'opacity': 0 }, 300, 'linear', function () { pageSegments.press.css('display', 'none'); });
    pageSegments.contact.animate({ 'opacity': 0 }, 300, 'linear', function () { pageSegments.contact.css('display', 'none'); });

    pageSegments.privacy.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);

  }
  else {

    pageSegments.privacy.animate({ 'opacity': 0 }, 300, 'linear', function () { pageSegments.privacy.css('display', 'none'); });

    pageSegments.about.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);
    pageSegments.press.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);
    pageSegments.contact.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);

  }

  $('html, body').delay(500).animate({ scrollTop: $(pageSegments[pageSegment]).offset().top }, 300, 'linear', null);

}

var sF;

/***********************************************************************************************************************
/   Login
/**********************************************************************************************************************/
function login() {
    $.ajax({
        url: 'http://backend.liquidtalent.com' + sF.href,
        data: 'email=' + sF.email.val() +
              '&password=' + sF.password.val()
        //error: Response(data)
    }).done(function (data) {
            if (data['status'] === 'failed') {
                alert(data['errors'][0]);
            }
            else {
                alert("You've successfully been signed in to LiquidTalent.");
                currentUser = data['response']['user'];
                $('.header').html('<div style="background: #fff; position: absolute; bottom: 15px; width: 100%;"><div style="padding: 10px 10px 10px 0; line-height: 1.5;"><img src="' + currentUser['avatar_url'] + '" width="45" style="float: left; margin-right: 10px;">Welcome<br>' + currentUser['name'] + '</div></div>');
                checkUnreadMessages();
                loadPage('/map');
            }

    });
}

/***********************************************************************************************************************
/   SignUp
/**********************************************************************************************************************/

function SubmitSignupForm() {

    if (sF.aus === true) {
      $.ajax({
        url: 'http://backend.liquidtalent.com/user/set_avatar',
        type: 'POST',
        data: 'user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token'] + '&avatar=' + sF.a.get(0).files[0],
        contentType: false,
        processData: false,
        error: Response(data)
      }).done(function (avatar_data) {
          if (avatar_data['status'] === 'failed') {
            alert(avatar_data['errors'][0]);
          }
        });
    }

    $.ajax({
      url: 'http://backend.liquidtalent.com' + sF.href,
      data: 'name=' + sF.n.val() + '&email=' + sF.e.val() + '&password=' + sF.p.val() + '&password_confirmation=' + sF.pc.val(),
      error: Response
    }).done(function (data) {
        if (data['status'] === 'failed') {
          alert(data['errors'][0]);
        }
        else {
          if ($('#is_provider').is(':checked')) {
            loadPage('/signup/service_provider?user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token']);
          }
          else {
            alert("You've been successfully registered. Welcome to LT!");
          }
        }

      });

}
function SubmitSignupSPForm() {

  var spF = $('#sign-up-sp-form');
  spF = {

    'href': '/user/set_details',

    'street': sF.find('.street'),
    'state': sF.find('.state'),
    'zip': sF.find('.zip'),
    'description': sF.find('.desc'),
    'summary': sF.find('.summary'),
    'hourly_rate': sF.find('.hourly_rate'),
    'experience': sF.find('.experience')

  };

  $.ajax({
    url: 'http://backend.liquidtalent.com' + spF.href,
    data: 'user_id=' + $('#user_id').val() +
      '&token=' + $('#token').val() +
      '&attr[street]=' + spF.street.val() +
      '&attr[city_id]=' + $('#city_id').val() +
      '&attr[state]=' + spF.state.val() +
      '&attr[zip]=' + spF.zip.val() +
      '&attr[description]=' + spF.description.val() +
      '&attr[summary]=' + spF.summary.val() +
      '&attr[hourly_rate]=' + spF.hourly_rate.val() +
      '&attr[experience]=' + spF.experience.val() +
      '&attr[category_id]=' + $('#category_id').val() +
      '&attr[school_id]=' + $('#school_id').val() +
      '&attr[is_provider]=1',
    error: Response(data)
  }).done(function (data) {
      if (data['status'] === 'failed') {
        alert(data['errors'][0]);
      }
      else {
        alert("You've successfully been registered. Welcome to LT!");
      }

    });

}

function searchSchool(query) {
  if (query === '') {
    $('#schools').html('');
    return;
  }

  $.ajax({
    url: 'http://backend.liquidtalent.com/schools/search?search=' + query,
    error: function (error) {
      alert("Problem with connecting to the server.");
      console.log(error['']);
    }
  }).done(function (data) {
      $('#schools').html('');
      data['response'].forEach(function (school) {
        $('#schools').append('<div onclick="setSchool(' + school['_source']['id'] + ', \'' + school['_source']['name'] + '\');">' + school['_source']['name'] + '</div>')
      })
    });
}

function setCity(id, name) {
  $('.city').html(name);
  $('#city_id').val(id);

  $('#cities').hide();
}

function setSkills(id, name) {
  $('.skills').html(name);
  $('#category_id').val(id);

  $('#skills').hide();
}

function setSchool(id, name) {
  $('.school').html(name);
  $('#school_id').val(id);

  $('#schools').html('');
}

function show_user(user_id, callback) {
  $.ajax({
    url: 'http://backend.liquidtalent.com/user/show?user_id=' + user_id,
    error: Response
  }).done(function (data) {
      return callback(data);
    });
}

function linkedin_connect(access_token) {
  $.ajax({
    url: 'http://backend.liquidtalent.com/user/linkedin_connect/?access_token=' + access_token,
    error: function (error) {
      alert("Problem with connecting to the server.");
      console.log(error['']);
    }
  }).done(function (data) {
      if(data['response']['new_user']) {
        if (confirm('Do you want to register as a Service Provider?')) {
          window.location = '/signup/service_provider?user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token'];
        } else {
          alert('User is successfully registered, token: ' + data['response']['user']['token']);
        }
      }
      else {
        alert('User is already registered, token: ' + data['response']['user']['token']);
      }
    });
}

function mapSearch(map) {
    $.ajax({
        url: 'http://backend.liquidtalent.com/users/filter',
        error: Response
    }).done(function (data) {
        data['response'].forEach(function(user) {
            var myLatlng = new google.maps.LatLng(user.latitude, user.longitude);

            var pin = new google.maps.MarkerImage('/assets/search/pin.png',
                new google.maps.Size(62, 80),
                new google.maps.Point(0,0),
                new google.maps.Point(18, 42)
            );


            marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: user.name,
                icon: pin
            });

            var contentString =
                '<div id="map-overlay">' +
                '<div class="base">' +

                '<div class="avatar">img src="' + user.avatar_url + '" /></div>' +
                '<div class="favorite-button t"></div>' +
                '<div class="play-button t"></div>' +

                '<p class="title">' +
                '<p class="name">' + user.name + '</p>' +

                '</p>' +

                '<p class="description">' + user.description + '</p>' +

                '<div class="linkedin-icon"></div>' +

                '<div class="distance">' + '4km Away' + '</div>' +

                '<div class="lt-drop"></div>' +
                '<div class="stars">' +
                '<div class="star"></div>' +
                '<div class="star"></div>' +
                '<div class="star"></div>' +
                '<div class="star"></div>' +
                '<div class="star"></div>' +
                '</div>' +
                '</div>' +
            '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
        });
    });
}

function checkUnreadMessages() {
    $.ajax({
        url: 'http://backend.liquidtalent.com/messages/list?limit=9999&receiver_id=' + currentUser['id'],
        error: Response
    }).done(function (data) {
        $('.navigation .messages').html('<div style="position: absolute; right: 10px;">' + data['response'].length + '</div>');
    });

    setTimeout('checkUnreadMessages()', 10000);
}