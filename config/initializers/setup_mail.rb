ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :address => 'barney.machighway.com',
  :port => 587,
  :domain => 'mail.bloodandtreasure.com',
  :user_name => 'ahoy@bloodandtreasure.com',
  :password => 'oinPDIeV@y.}',
  :authentication => :login,
  :enable_starttls_auto => true
}