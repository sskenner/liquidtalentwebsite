ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :domain => 'bloodandtreasure.com',
  :user_name => 'bloodandtreasure',
  :password => 'kvaurebgkudbfg',
  :authentication => 'plain',
  :enable_starttls_auto => true
}