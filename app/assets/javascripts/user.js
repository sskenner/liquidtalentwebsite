var avatar = false;

function SubmitSignupForm () {
    // Sign up form.
    var sF = $('#sign-up-form');
    sF = {
        'href': '/user/signup',

        'n': sF.find('.name'),
        'e': sF.find('.email'),
        'p': sF.find('.password'),
        'pc': sF.find('.password_confirmation')

    };

    if (editableDivs.validate(sF.n, 'name') &&
        editableDivs.validate(sF.e, 'email')) {

        $.ajax({
            url: 'http://backend.liquidtalent.com' + sF.href,
            data: 'name=' + sF.n.html() + '&email=' + sF.e.html() + '&password=' + sF.p.html() + '&password_confirmation=' + sF.pc.html(),
            error: function (error) {
                alert("Problem with connecting to the server.");
                console.log(error);
            }
            }).done(function (data) {
                if (data['status'] == 'failed') {
                    alert(data['errors'][0]);
                }
                else {
                    //  Save avatar
                    if(avatar) {
                        var formData = new FormData($('form')[0]);

                        $.ajax({
                            url: 'http://backend.liquidtalent.com/user/set_avatar',
                            type: 'POST',
                            //data: 'user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token'] + '&avatar=' + $('#avatar').get(0).files[0],
                            contentType: false,
                            processData: false,
                            data: function() {
                                var rq_data = new FormData();
                                rq_data.append("user_id", data['response']['user']['id']);
                                rq_data.append("token", data['response']['user']['token']);
                                rq_data.append("avatar", jQuery("#avatar").get(0).files[0]);
                                return rq_data;
                                // Or simply return new FormData(jQuery("form")[0]);
                            }(),
                            error: function (error) {
                                alert("Could not connect to the mail server. Please try again later.");
                                console.log(error);
                            }
                        }).done(function (avatar_data) {
                                if (avatar_data['status'] == 'failed') {
                                    alert(avatar_data['errors'][0]);
                                }
                                else {
                                    if($('#is_provider').is(':checked')) {
                                        window.location = '/signup/service_provider?user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token'];
                                    }
                                    else {
                                        alert('User has been successfully registered.')
                                    }
                                }
                        });
                    }
                    else {
                        if($('#is_provider').is(':checked')) {
                            window.location = '/signup/service_provider?user_id=' + data['response']['user']['id'] + '&token=' + data['response']['user']['token'];
                        }
                        else {
                            alert('User has been successfully registered.')
                        }
                    }
                }

            });

    }

}

function SubmitSignupSPForm () {
    // Sign up SP form.
    var sF = $('#sign-up-sp-form');
    sF = {
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
            url: 'http://backend.liquidtalent.com' + sF.href,
            data:
                'user_id=' + $('#user_id').val() +
                '&token=' + $('#token').val() +
                '&attr[street]=' + sF.street.html() +
                '&attr[city_id]=' + $('#city_id').val() +
                '&attr[state]=' + sF.state.html() +
                '&attr[zip]=' + sF.zip.html() +
                '&attr[description]=' + sF.description.html() +
                '&attr[summary]=' + sF.summary.html() +
                '&attr[hourly_rate]=' + sF.hourly_rate.html() +
                '&attr[experience]=' + sF.experience.html() +
                '&attr[category_id]=' + $('#category_id').val() +
                '&attr[school_id]=' + $('#school_id').val() +
                '&attr[is_provider]=1',
            error: function (error) {
                alert("Problem with connecting to the server.");
                console.log(error);
            }
        }).done(function (data) {
                if (data['status'] == 'failed') {
                    alert(data['errors'][0]);
                }
                else {
                    if($('#is_provider').is(':checked')) {
                        alert('Provider has been successfully registered.')
                    }
                    else {
                        alert('User has been successfully registered.')
                    }
                }

            });

    }

}

function searchSchool(query) {
    if (query == '') {
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
            data['response'].forEach(function(school) {
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

$("#avatar").change(function (){   alert('jo');
    avatar = true;
});