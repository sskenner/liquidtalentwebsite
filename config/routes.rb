LiquidTalent::Application.routes.draw do

  ####### Presentation

    root 'presentation#marketplace'
    get '/home' => 'presentation#marketplace'
    get '/marketplace' => 'presentation#marketplace'
    get '/enterprise' => 'presentation#enterprise'

    #Mailchimp
    post '/presentation/subscribe' => 'presentation#subscribe'

    #Contact
    post '/send_message' => 'contact#send_message'
    get '/send_sms' => 'contact#send_sms'

  ####### User

    #Sign Up
    get '/login' => 'user#login'
    get '/signup' => 'user#signup'
    get '/signup_demander' => 'user#signup_demander'
    get '/signup_service_provider' => 'user#signup_service_provider'
    get '/linkedin' => 'user#linkedin'
    get '/nda' => 'user#nda'
    get '/settings' => 'user#settings'
    get '/update_demander' => 'user#update_demander'
    get '/update_provider' => 'user#update_provider'
    get '/terms' => 'user#terms'
    get '/faq' => 'user#faq'

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

    get '/statuses' => 'bookings#statuses'
    get '/projects' => 'bookings#index'
    get '/hire' => 'bookings#hire'
    get '/create_project' => 'bookings#create'
    get '/hire_confirm' => 'bookings#confirm'
    get '/hire_accept' => 'bookings#accept'
    get '/rate' => 'bookings#rate'
    get '/applicants' => 'bookings#applicants'


  ####### Bookings

    get '/video/get_ticket' => 'videos#get_ticket'
    get '/video/get_id' => 'videos#get_id'

  ####### Download App

    get '/ipa' => 'presentation#ipa'
    get '/app' => 'presentation#app'

end
