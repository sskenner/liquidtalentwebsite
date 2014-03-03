var rF; // Registration form.
var cF; // Contact form.
var pages; //Reveal pages.

$(window).on('load', function () {

  // Registration form.
  rF = {

    /* Name, email, zip fields and send button. */

    'href': '/presentation/subscribe',

    'n': $('#register-form-name'),
    'e': $('#register-form-email'),
    'z': $('#register-form-zip')

  };

  // Contact form.

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

function SubmitRegisterForm () {

  if (editableDivs.validate(rF.n, 'name') &&
      editableDivs.validate(rF.e, 'email') &&
      editableDivs.validate(rF.z, 'zip')) {

    $.ajax({
      url: rF.href,
      type: 'post',
      data: 'name=' + rF.n.html() + '&email=' + rF.e.html() + '&zip=' + rF.z.html(),
      error: Response
    }).done(Response);

  }

}

function SubmitContactForm () {

  if (editableDivs.validate(cF.n, 'name') &&
      editableDivs.validate(cF.e, 'email') &&
      editableDivs.validate(cF.p, 'phone') &&
      editableDivs.validate(cF.m, 'message') &&
      editableDivs.validate(cF.s, '')) {

    loaders.toggle('contact', 1);

    $.ajax({
      url: cF.href,
      type: 'post',
      data: 'name=' + cF.n.html() + '&email=' + cF.e.html() + '&phone=' + cF.p.html() + '&subject=' + cF.s.html() + '&message=' + cF.m.val(),
      error: Response
    }).done(Response.done(function () { loaders.toggle('contact', 0); }));

  }

}

function RevealPage (page) {

  if (page === 'privacy') {

    pages.about.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.about.css('display', 'none'); });
    pages.press.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.press.css('display', 'none'); });
    pages.contact.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.contact.css('display', 'none'); });

    pages.privacy.css('display', 'block').animate({ 'opacity': 1 }, 100, 'linear', null);

  }
  else {

    pages.about.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);
    pages.press.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);
    pages.contact.css('display', 'block').animate({ 'opacity': 1 }, 300, 'linear', null);

    pages.privacy.animate({ 'opacity': 0 }, 300, 'linear', function () { pages.privacy.css('display', 'none'); });

  }

  $('html, body').delay(300).animate({ scrollTop: $(pages[page]).offset().top }, 1000, 'linear', null);

}