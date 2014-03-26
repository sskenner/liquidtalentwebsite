class Contact < ActionMailer::Base

  default from: 'hello@liquidtalent.com'

  def contact (mail)

    @mail = mail
    mail(from: @mail[:email], to: 'hello@liquidtalent.com', subject: 'Message from LiquidTalent.com')

  end

end
