class UserController < ApplicationController

  def login
  end

  def signup
  end
  def signup_service_provider
  end

  def search
  end
  def search_service_provider
  end

  def linkedin
    render 'user/login', layout: 'presentation'
  end

  def map
  end

  def messages
  end

end