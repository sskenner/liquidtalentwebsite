LiquidTalent::Application.routes.draw do

  ####### Presentation

    root 'presentation#index'
    get '/home' => 'presentation#index'

    #Mailchimp
    post '/presentation/subscribe' => 'presentation#subscribe'

    #Contact
    post '/send_message' => 'contact#send_message'


  ####### User

    #Sign Up
    get '/login' => 'user#login'
    get '/signup' => 'user#signup'
    get '/signup_service_provider' => 'user#signup_service_provider'
    get '/linkedin' => 'user#linkedin'

    #Search
    get '/search' => 'user#search'
    get '/search/service_provider' => 'user#search_service_provider'

    #Map
    get '/map' => 'user#map'

    get '/favorites' => 'user#favorites'

end
