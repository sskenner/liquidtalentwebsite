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

var editableDivs; //Editable Div Tags for user input instead of form input tags.
var loaders;

$(window).on('load', function () {

  loaders = {

    'tags': $('.loader'),

    'toggle': function (loader, opacity) {

      loader = loaders.tags.each(function () {

        if ($(this).prop('alt') === loader) { return $(this); }

      });
      loader.animate({ 'opacity': opacity }, 1000, 'linear');

    }

  };

  editableDivs = {

    'tags': $('div[contenteditable="true"], textarea'),

    'error': '',

    'defaults': [],

    'validate': function (element, type) {

      editableDivs.error = '';
      element.html(element.html().replace(/<[^>]*>/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));

      if (element.html() === element.prop('title') && /\*/.test(element.html()) && type !== '')
        editableDivs.error = 'Please make sure all required fields are filled in.';
      else {

        switch (type) {

          case 'name':
            if (/[^a-z ]/i.test(element.html()) === true || element.html() === ' ')
            editableDivs.error = 'The name field contains unconventional characters or is empty.';
          break;

          case 'email':
            if (/^([a-z0-9+.\-]|[_])+@[a-z0-9\-]+\.[a-z.]+$/i.test(element.html()) === false)
              editableDivs.error = 'The email field contains unconventional characters or is empty.';
            break;

          case 'zip':
            if (/^(\d{5}|(\d{5}\-\d{4}))$/.test(element.html()) === false)
              editableDivs.error = 'The zip field is not formatted correctly:\n\nStandard Zip Format: 00000\nDescriptive Zip Format: 00000-0000\n\nP.S: Make sure the zip field is not empty.';
            break;

          case 'phone':
            element.html(element.html().replace(/[^0-9]]/g, ''));
            if (/^\d{10}$/.test(element.html()) === false && element.html() !== '')
              editableDivs.error = 'Please enter a 10 digit phone number.';
            break;

          case 'message':
            if (element.val().length < 10)
              editableDivs.error = 'The message field should be at least 10 characters long.';
            break;

          case 'password':
            if (element[0].html() !== element[1].html())
              editableDivs.error = 'The password fields do not match, please re-enter your password.';
            break;

        }

      }

      if (editableDivs.error !== '') {

        alert(editableDivs.error);
        return false;

      }
      else { return true; }

    }

  };
  editableDivs.tags.each(function (i, element) {

    element = $(element);
    i = parseInt(editableDivs.defaults.length, 0);
    editableDivs.defaults[i] = $(this).html();

    element.on('mouseleave', function () {

      editableDivs.validate(element, '');

      if (element.html().replace(/\s+/g, '') === '' && !element.is(':focus')) {

        element.html(editableDivs.defaults[i]);
        if (/password/i.test(editableDivs.defaults[i])) { element.removeClass('pass-field'); }

      }

    }.bind(i, element));
    element.on('mouseenter', function () {

      editableDivs.validate(element, '');

      if (element.html() === editableDivs.defaults[i]) {

        editableDivs.tags.each(function () {

          $(this).blur();
          $(this).trigger('mouseleave');

        });
        element.html('');

        if (/password/i.test(editableDivs.defaults[i])) { element.addClass('pass-field'); }

      }

    }.bind(i, element));

  });

});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}