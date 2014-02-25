require 'mailchimp'

class ApplicationController < ActionController::Base

  before_action :setup_mc

  def setup_mc
    @mc = Mailchimp::API.new('ab88c79f75aed7fbec1a6972e030a15b-us3')
  end

  @extend_presentation = false;

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

end
