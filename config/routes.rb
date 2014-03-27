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
    get '/nda' => 'user#nda'
    get '/settings' => 'user#settings'
    get '/terms' => 'user#terms'

    #Search
    get '/search' => 'user#search'
    get '/search/service_provider' => 'user#search_service_provider'

    #Map
    get '/map' => 'user#map'

    get '/favorites' => 'user#favorites'
    get '/stats' => 'user#stats'
    get '/profile' => 'user#profile'
    get '/video_upload' => 'user#video_upload'
    get '/video' => 'user#video'


  ####### Bookings

    get '/projects' => 'bookings#index'
    get '/hire' => 'bookings#create'
    get '/hire_confirm' => 'bookings#confirm'
    get '/hire_accept' => 'bookings#accept'
    get '/rate' => 'bookings#rate'
end
