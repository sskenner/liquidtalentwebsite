var rF; // Registration form.
var cF; // Contact form.
var pages; //Reveal pages.

$(window).on('load', function () {

  // Registration form.
  rF = {

    /* Name, email, zip fields and send button. */

    'href': '/mailchimp_subscribe/cbcb329291',

    'n': $('#register-form-name'),
    'e': $('#register-form-email'),
    'z': $('#register-form-zip')

  };

  // Contact form.

  cF = $('#contact-form');
  cF = {

    /* Name, email, phone number, reason for contact, message fields and contact button. */

    'href': 'http://www.bloodandtreasure.com/LiquidTalent/index.php',

    'n': cF.find('.name'),
    'e': cF.find('.email'),
    'p': cF.find('.phone'),
    'r': cF.find('.reason'),
    'm': cF.find('.message')

  };

  //Reveal pages.
  pages = {

    about: $('#about-page'),
    press: $('#press-page'),
    contact: $('#contact-page'),
    privacy: $('#privacy-page'),

    //links to reveal individual pages.

    links: $('.navigation-link')

  };

  pages.links.each(function () { $(this).prop('href', "Javascript:RevealPage('" + $(this).prop('href').replace(/http[:]\/\/.*\//, '') + "');"); });

});

function submitRegisterForm () {

  if (editableDivs.validate(rF.n, 'name') !== true) { alert(editableDivs.validate(rF.n, 'name')); }
  else if (editableDivs.validate(rF.e, 'email') !== true) { alert(editableDivs.validate(rF.e, 'email')); }
  else if (editableDivs.validate(rF.z, 'zip') !== true) { alert(editableDivs.validate(rF.z, 'zip')); }
  else {

    $.ajax({
      url: rF.href,
      datatype: 'json',
      cache: false,
      type: 'post',
      data: 'name=' + rF.n.html() + '&email=' + rF.e.html() + '&zip=' + rF.z.html(),
      contentType: "application/json; charset=utf-8",
      error : function (err) {
        alert("Could not connect to the mail server. Please try again later.");
        console.log(err);
      }
    }).done(function (data) { alert(data); });

  }

}

function submitContactForm () {

  editableDivs.validate(cF.r, '');

  if (editableDivs.validate(cF.n, 'name') !== true) { alert(editableDivs.validate(cF.n, 'name')); }
  else if (editableDivs.validate(cF.e, 'email') !== true) { alert(editableDivs.validate(cF.e, 'email')); }
  else if (editableDivs.validate(cF.p, 'phone') !== true) { alert(editableDivs.validate(cF.p, 'phone')); }
  else if (editableDivs.validate(cF.m, 'message') !== true) { alert(editableDivs.validate(cF.m, 'message')); }
  else {

    $.ajax({
      url: cF.href,
      datatype: 'json',
      cache: false,
      type: 'get',
      data: 'name=' + cF.n.html() + '&email=' + cF.e.html() + '&phone=' + cF.p.html() + '&reason=' + cF.r.html() + '&message=' + cF.m.val(),
      contentType: "application/json; charset=utf-8",
      error : function (err) {
        alert("Could not connect to the mail server. Please try again later.");
        console.log(err);
      }
    }).done(function (data) { alert(data); });

  }

}

function RevealPage (page) {

  if (page === 'privacy') {

    pages.about.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.about.css('display', 'none'); });
    pages.press.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.press.css('display', 'none'); });
    pages.contact.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.contact.css('display', 'none'); });

    pages.privacy.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);

  }
  else {

    pages.about.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);
    pages.press.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);
    pages.contact.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);

    pages.privacy.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.privacy.css('display', 'none'); });

  }

  $('html, body').delay(300).animate({ scrollTop: $(pages[page]).offset().top }, 1000, 'linear', null);

}