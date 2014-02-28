class ContactController < ApplicationController

  def send_message

    @mail = {
      name: params[:name],
      email: params[:email],
      phone: params[:phone],
      subject: params[:subject],
      message: params[:message]
    }

if (/[^a-z ]/i.test(@mail[:name]) === true || element.html() === ' ')
  flash[:error] = 'The name field contains unconventional characters or is empty.'
end

if (/^([a-z0-9+.\-]|[_])+@[a-z0-9\-]+\.[a-z]+$/i.test(@mail[:email]) === false)
  flash[:error] = 'The email field contains unconventional characters or is empty.'
end

if (/^(\d{5}|(\d{5}\-\d{4}))$/.test(@mail[:zip]) === false)
  flash[:error] = 'The zip field is not formatted correctly:\n\nStandard Zip Format: 00000\nDescriptive Zip Format: 00000-0000\n\n* Make sure the zip field is not empty.'
end

if /^\d{10}$/.test(@mail[:phone].replace(/[^0-9]]/, '')) === false || @mail[:phone] === ''
  flash[:error] = 'Please enter a 10 digit phone number.'
end

if (@mail[:message].length < 10)
  flash[:error] = 'The message field should be at least 10 characters long.'
end

  flash[:success] = 'Thank you for contacting LiquidTalent, we will reply shortly.'

    Contact.send_message(@mail).deliver

  end

end
