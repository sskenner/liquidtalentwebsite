class Contact < ActionMailer::Base

  default from: 'info@bloodandtreasure.com'

  def send_message (mail)
    @mail = mail
    mail(from: @mail[:email], to: 'info@bloodandtreasure.com', subject: 'Message from LiquidTalent.com: ' + @mail[:subject])
  end

end
