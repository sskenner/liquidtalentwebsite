require 'mailchimp'

class ApplicationController < ActionController::Base

  before_action :setup_mcapi

  def setup_mcapi
    @mc = Mailchimp::API.new('ab88c79f75aed7fbec1a6972e030a15b-us3')
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

end
