function SubmitSignupForm () {

    if (editableDivs.validate(cF.n, 'name') &&
        editableDivs.validate(cF.e, 'email') &&
        editableDivs.validate(cF.p, 'phone') &&
        editableDivs.validate(cF.m, 'message') &&
        editableDivs.validate(cF.s, '')) {

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