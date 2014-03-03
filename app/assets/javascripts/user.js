var sF;

$(window).on('load', function () {

  // Sign up form.
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

    /*
  var user = show_user(getURLParameter('user_id'), function (data) {
    if (data['response']['user']['summary']) $('.summary').html(data['response']['user']['summary']);
    if (data['response']['user']['experience']) $('.experience').html(data['response']['user']['experience']);
    if (data['response']['user']['description']) $('.desc').html(data['response']['user']['description']);
  });
  */

});

function SubmitSignupForm() {

  if (editableDivs.validate(sF.n, 'name') &&
    editableDivs.validate([sF.p, sF.pc], 'password') &&
    editableDivs.validate(sF.e, 'email')) {

    if (sF.aus === true) {
      $.ajax({
        url: 'http://backend.liquidtalent.com/user/set_avatar',
        type: 'POST',
        data: 'user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token'] + '&avatar=' + sF.a.get(0).files[0],
        contentType: false,
        processData: false,
        error: Response
      }).done(function (avatar_data) {
          if (avatar_data['status'] === 'failed') {
            alert(avatar_data['errors'][0]);
          }
        });
    }

    $.ajax({
      url: 'http://backend.liquidtalent.com' + sF.href,
      data: 'name=' + sF.n.html() + '&email=' + sF.e.html() + '&password=' + sF.p.html() + '&password_confirmation=' + sF.pc.html(),
      error: Response
    }).done(function (data) {
        if (data['status'] === 'failed') {
          alert(data['errors'][0]);
        }
        else {
          if ($('#is_provider').is(':checked')) {
            //window.location = '/signup/service_provider?user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token'];
            javascript: loadPage('/signup/service_provider?user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token']);
          }
          else {
            alert("You've been successfully registered. Welcome to LT!")
          }
        }

      });

  }

}

function SubmitSignupSPForm() {
  // Sign up SP form.
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

  if (true) {

    $.ajax({
      url: 'http://backend.liquidtalent.com' + spF.href,
      data: 'user_id=' + $('#user_id').val() +
        '&token=' + $('#token').val() +
        '&attr[street]=' + spF.street.html() +
        '&attr[city_id]=' + $('#city_id').val() +
        '&attr[state]=' + spF.state.html() +
        '&attr[zip]=' + spF.zip.html() +
        '&attr[description]=' + spF.description.html() +
        '&attr[summary]=' + spF.summary.html() +
        '&attr[hourly_rate]=' + spF.hourly_rate.html() +
        '&attr[experience]=' + spF.experience.html() +
        '&attr[category_id]=' + $('#category_id').val() +
        '&attr[school_id]=' + $('#school_id').val() +
        '&attr[is_provider]=1',
      error: Response
    }).done(function (data) {
        if (data['status'] === 'failed') {
          alert(data['errors'][0]);
        }
        else {
          alert("You've successfully been registered. Welcome to LT!");
        }

      });

  }

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