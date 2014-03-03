class ContactController < ApplicationController

  def send_message

    @mail = {
        name: params[:name],
        email: params[:email],
        phone: params[:phone],
        subject: params[:subject],
        message: params[:message],
        'error' => '',
        'success' => ''
    }

    if !@mail[:name][/[^a-z ]/ix].nil? === true || @mail[:name] === ' '

      @mail['error'] = 'The name field contains unconventional characters or is empty.'

    elseif !@mail[:email][/^(?:[a-z0-9+.\-]|[_])+@[a-z0-9\-]+\.[a-z]+$/ix].nil? === false

      @mail['error'] = 'The email field contains unconventional characters or is empty.'

    elseif !@mail[:zip][/^(?:\d{5}|(\d{5}\-\d{4}))$/x].nil? === false

      @mail['error'] = 'The zip field is not formatted correctly:\n\nStandard Zip Format: 00000\nDescriptive Zip Format: 00000-0000\n\n* Make sure the zip field is not empty.'

    elseif !@mail[:phone][/^\d{10}$/x].nil? === false && @mail[:phone] != ''

      @mail['error'] = 'Please enter a 10 digit phone number.'

    elseif @mail[:message].length < 10

      @mail['error'] = 'The message field should be at least 10 characters long.'

    else

      @mail['success'] = 'Thank you for contacting LiquidTalent, we will reply shortly.'
      Contact.contact(@mail).deliver

    end

  end

end
