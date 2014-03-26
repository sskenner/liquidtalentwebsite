ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :address => 'smtp.gmail.com',
  :port => 587,
  :domain => 'gmail.com',
  :user_name => 'alex@liquidtalent.com',
  :password => 'aba62583',
  :authentication => 'plain',
  :enable_starttls_auto => true
}