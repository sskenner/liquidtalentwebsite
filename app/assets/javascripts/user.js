function SubmitSignupForm () {

    if (editableDivs.validate(cF.n, 'name') &&
        editableDivs.validate(cF.e, 'email')) {

        $.ajax({
            url: cF.href,
            datatype: 'json',
            cache: false,
            type: 'post',
            data: '{"name":"' + cF.n.html() + '", "email":"' + cF.e.html() + '", "phone":"' + cF.p.html() + '", "subject":"' + cF.s.html() + '", "message":"' + cF.m.val() + '"}',
            contentType: "application/json; charset=utf-8",
            error: function (error) {
                alert("Could not connect to the mail server. Please try again later.");
                console.log(error);
            }
        }).done(function (data) {

                if (data['error'] != '') { alert(data['error']); }
                else { alert(data['success']); }

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
            alert("Could not connect to the mail server. Please try again later.");
            console.log(error);
        }
    }).done(function (data) {
        $('#schools').html('');
            data['response'].forEach(function(school) {
            $('#schools').append('<div onclick="setSchool(' + school['_source']['id'] + ', \'' + school['_source']['name'] + '\');">' + school['_source']['name'] + '</div>')
        })
    });
}

function setSchool(id, name) {
    $('.school').html(name);
    $('#school_id').val(id);

    $('#schools').html('');
}