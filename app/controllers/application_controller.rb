require 'mailchimp'
require 'uri'

class ApplicationController < ActionController::Base

  before_action do
    @mc = Mailchimp::API.new('3f8c7d7adcaaa6e28c8b542c69cb3ad4-us3')
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

end
