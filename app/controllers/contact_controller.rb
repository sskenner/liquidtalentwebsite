class ContactController < ApplicationController

  def send_message

    @mail = {
        name: params[:name],
        email: params[:email],
        message: params[:message],
        'error' => '',
        'success' => ''
    }

    if !@mail[:name][/[^a-z ]/ix].nil? === true || @mail[:name] === ' '

      @mail['error'] = 'The name field contains unconventional characters or is empty.'

    elseif !@mail[:email][/^(?:[a-z0-9+.\-]|[_])+@[a-z0-9\-]+\.[a-z]+$/ix].nil? === false

      @mail['error'] = 'The email field contains unconventional characters or is empty.'

    elseif @mail[:message].length < 10

      @mail['error'] = 'The message field should be at least 10 characters long.'

    else

      @mail['success'] = 'Thank you for contacting LiquidTalent, we will reply shortly.'
      Contact.contact(@mail).deliver

    end

  end

  def send_sms
    require 'nexmo'

    nexmo = Nexmo::Client.new('', '')
    nexmo.http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    type = params[:message].ascii_only? ? 'text' : 'unicode'

    nexmo.send_message({:to => params[:to], :from => 'LiquidTalent', :text => params[:message], :type => type})

    render nothing: true
  end
end
