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
    'z': $('#register-form-zip'),
    's': $('#register-form-send'),

    /* Name, email and zip validation. */

    'nV': false,
    'eV': false,
    'zV': false

  };

  rF.n.on('mousedown', function () {
    if (rF.n.html() === 'Name') {
      rF.n.html('');
      rF.n.focus();
    }
  });
  rF.e.on('mousedown', function () {
    if (rF.e.html() === 'Email') {
      rF.e.html('');
      rF.e.focus();
    }
  });
  rF.z.on('mousedown', function () {
    if (rF.z.html() === 'Zip') {
      rF.z.html('');
      rF.z.focus();
    }
  });

  rF.s.prop('href', 'javascript:submitRegisterForm()');

  // Contact form.

  cF = $('#contact-form');
  cF = {

    /* Name, email, phone number, reason for contact, message fields and contact button. */

    'href': 'http://www.bloodandtreasure.com/LiquidTalent/index.php',
    'n': cF.find('.name'),
    'e': cF.find('.email'),
    'p': cF.find('.phone'),
    'r': cF.find('.reason'),
    'm': cF.find('.message'),
    'c': cF.find('.contact'),

    /* Name, email and message validation. */

    'nV': false,
    'eV': false,
    'mV': false

  };

  cF.n.on('mousedown', function () {
    if (cF.n.html() === 'Name *') {
      cF.n.html('');
      cF.n.focus();
    }
  });
  cF.e.on('mousedown', function () {
    if (cF.e.html() === 'Email *') {
      cF.e.html('');
      cF.e.focus();
    }
  });
  cF.p.on('mousedown', function () {
    if (cF.p.html() === 'Phone Number') {
      cF.p.html('');
      cF.p.focus();
    }
  });
  cF.r.on('mousedown', function () {
    if (cF.r.html() === 'Reason For Contact') {
      cF.r.html('');
      cF.r.focus();
    }
  });
  cF.m.on('mousedown', function () {
    if (cF.m.val() === 'Message *') {
      cF.m.val('');
      cF.m.focus();
    }
  });

  cF.c.prop('href', 'javascript:submitContactForm()');

  //Reveal pages.
  pages = {

    about: $('#about'),
    press: $('#press'),
    contact: $('#contact'),
    privacy: $('#privacy'),

    //links to reveal individual pages.

    links: $('.navigation-link')

  };

  pages.links.each(function () { $(this).prop('href', "Javascript:RevealPage('" + $(this).prop('href').replace(/http[:]\/\/.*\//, '') + "');"); });

});

function submitRegisterForm () {

  rF.n.html(rF.n.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  rF.nV = (!/[^a-zA-Z ]/.test(rF.n.html()) && rF.n.html() !== '');

  rF.e.html(rF.e.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  rF.eV = (/^([a-zA-Z0-9+.\-]|[_])+@[a-zA-Z0-9\-]+\.[a-zA-Z]+$/.test(rF.e.html()) && rF.e.html() !== '');

  rF.z.html(rF.z.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  rF.zV = (/^(\d{5}|(\d{5}\-\d{4}))$/.test(rF.z.html()) && rF.z.html() !== '');

  if (rF.nV === false) { alert('The name field contains unconventional characters or is empty.'); }
  else if (rF.eV === false) { alert('The email field contains unconventional characters or is empty.'); }
  else if (rF.zV === false) { alert('The zip field is not formatted correctly:\n\nStandard: 00000\nDescriptive: 00000-0000\n\nOr is empty.'); }
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

  cF.n.html(cF.n.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  cF.e.html(cF.e.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  cF.p.html(cF.p.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  cF.r.html(cF.r.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  cF.m.val(cF.m.val().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));

  cF.nV = (!/[^a-zA-Z ]/.test(cF.n.html()) && cF.n.html() !== '');
  cF.eV = (/^([a-zA-Z0-9+.\-\]|[_])+@[a-zA-Z0-9\-]+\.[a-zA-Z]+$/.test(cF.e.html()) && cF.e.html() !== '');
  cF.mV = (cF.m.val().length > 10);

  if (cF.nV === false) { alert('The name field contains unconventional characters or is empty.'); }
  else if (cF.eV === false) { alert('The email field contains unconventional characters or is empty.'); }
  else if (cF.mV === false) { alert('The message field should be at least 10 characters long.'); }
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