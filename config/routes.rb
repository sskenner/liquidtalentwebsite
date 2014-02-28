LiquidTalent::Application.routes.draw do

  ####### Presentation

    root 'presentation#view'

    #Mailchimp
    post '/presentation/subscribe' => 'presentation#subscribe'

    #Contact
    post '/send_message' => 'contact#send_message'


  ####### User

    #Sign Up
    get '/login' => 'user#login'
    get '/signup' => 'user#signup'
    get '/signup/service_provider' => 'user#signup_service_provider'

end
