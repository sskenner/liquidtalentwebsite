class UserController < ApplicationController
  def login
  end

  def forgotten_password
    render 'forgotten_password', :layout => 'presentation'
  end

  def reset_password
    render 'reset_password', :layout => 'presentation'
  end

  def signup
  end

  def signup_demander
  end

  def signup_service_provider
  end

  def settings
  end

  def update_provider
  end

  def update_demander
  end

  def search
  end
  def search_service_provider
  end

  def linkedin
    render 'presentation/index', layout: 'presentation'
  end

  def map
  end

  def favorites
  end

  def stats
  end

  def profile
  end

  def video_upload
  end

  def video
  end

  def nda_agreement
  end

  def terms
  end

  def faq
  end
end