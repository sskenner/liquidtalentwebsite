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

    'tags': $('div[contenteditable="true"], textarea, input'),

    'error': '',

    'validate': function (element, type) {

      editableDivs.error = '';
      element.html(element.html().replace(/<[^>]*>/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));

      if (element.html() === element.prop('title') && /\*/.test(element.html()))
        editableDivs.error = 'Please make sure all required fields are filled in.';
      else {

        switch (type) {

          case 'name':
            if (/[^a-z ]/i.test(element.html()) === true || element.html() === ' ')
            editableDivs.error = 'The name field contains unconventional characters or is empty.';
          break;

          case 'email':
            if (/^([a-z0-9+.\-]|[_])+@[a-z0-9\-]+\.[a-z]+$/i.test(element.html()) === false)
              editableDivs.error = 'The email field contains unconventional characters or is empty.';
            break;

          case 'zip':
            if (/^(\d{5}|(\d{5}\-\d{4}))$/.test(element.html()) === false)
              editableDivs.error = 'The zip field is not formatted correctly:\n\nStandard Zip Format: 00000\nDescriptive Zip Format: 00000-0000\n\n* Make sure the zip field is not empty.';
            break;

          case 'phone':
            element.html(element.html().replace(/[^0-9]]/g, ''));
            if (/^\d{10}$/.test(element.html()) === false || element.html() === '')
              editableDivs.error = 'Please enter a 10 digit phone number.';
            break;

          case 'message':
            if (element.val().length < 10)
              editableDivs.error = 'The message field should be at least 10 characters long.';
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

  editableDivs.tags.each(function () {

    $(this).attr('onmouseout', "if ($(this).html().replace(/\s+/g, '') === '' && !$(this).is(':focus')) { $(this).html('" + $(this).html() + "'); }");
    $(this).attr('onmouseover', "if ($(this).html() === '" + $(this).html() + "') { BlurEditableFields(); $(this).html(''); }");

    $(this).prop('title', $(this).html());

  });

});

function BlurEditableFields () {

  editableDivs.tags.each(function () {

    $(this).blur();
    $(this).trigger('mouseout');

  });

}