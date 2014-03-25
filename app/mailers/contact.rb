class Contact < ActionMailer::Base

  default from: 'ahoy@bloodandtreasure.com'

  def contact (mail)

    @mail = mail
    mail(from: @mail[:email], to: 'ahoy@bloodandtreasure.com', subject: 'Message from LiquidTalent.com')

  end

end
