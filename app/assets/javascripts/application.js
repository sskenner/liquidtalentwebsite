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

$(window).on('load', function () {

  editableDivs = {

    'tags': $('*[contenteditable="true"]'),

    'validate': function (element, type) {

      element.html(element.html().replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));

      switch (type) {

        case 'name':
          return (!/[^a-z ]/i.test(element.html())===true || element.html() === ' ')?
            true :
            'The name field contains unconventional characters or is empty.';
        break;
        case 'email':
          return (/^([a-z0-9+.\-]|[_])+@[a-z0-9\-]+\.[a-z]+$/i.test(element.html())===true)?
            true :
            'The email field contains unconventional characters or is empty.';
          break;
        case 'zip':
          return (/^(\d{5}|(\d{5}\-\d{4}))$/.test(element.html())===true)?
            true :
            'The zip field is not formatted correctly:\n\nStandard Zip Format: 00000\nDescriptive Zip Format: 00000-0000\n\n* Make sure the zip field is not empty.';
          break;
        case 'phone':
          return (/^\d{10}$/.test(element.html().replace(/[^0-9]]/g, ''))===true || ( element.html()!==' '&&element.html()!==''&&/Phone/.test(element.html()) )===true)?
            true :
            'Please enter a 10 digit phone number.';
          break;
        case 'message':
          return (element.html().length > 10)?
            true :
            'The message field should be at least 10 characters long.';
          break;

      }

    }

  };

  editableDivs.tags.each(function () {

    $(this).attr('onmouseout', "if ($(this).html().replace(/\s+/g, '') === '' && !$(this).is(':focus')) { $(this).html('" + $(this).html() + "'); }");
    $(this).attr('onmouseover', "if ($(this).html() === '" + $(this).html() + "') { BlurEditableFields(); $(this).html(''); }");

  });

});

function BlurEditableFields () {

  editableDivs.tags.each(function () {

    $(this).blur();
    $(this).trigger('mouseout');

  });

}