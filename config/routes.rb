Website::Application.routes.draw do

  root 'website#presentation'

  # Users
  get '/user/signup/' => 'website#users_signup'
  get '/user/signin/' => 'website#users_signin'
  get '/user/show/' => 'website#users_show'
  get '/users/search_by_name' => 'website#users_search_by_name'
  get '/users/search_by_fields' => 'website#users_search_by_fields'
  get '/users/search_by_geo' => 'website#users_search_by_geo'
  get '/users/filter' => 'website#users_filter'
  get '/user/set_details/' => 'website#users_set_details'
  get '/user/logout' => 'website#users_logout'
  get '/user/set_credit_card' => 'website#users_set_credit_card'
  get '/user/set_bank_account' => 'website#users_set_bank_account'
  get '/user/pay' => 'website#users_pay'
  get '/user/unpaid_balance' => 'website#users_unpaid_balance'
  get '/user/get_reviews' => 'website#users_get_reviews'
  get '/user/destroy' => 'website#users_destroy'
  get '/user/increment_video_views' => 'website#users_increment_video_views'
  get '/user/increment_profile_views' => 'website#users_increment_profile_views'
  get '/user/report' => 'website#users_report'
  get '/user/test' => 'website#users_test'
  get '/user/linkedin_auth' => 'website#users_linkedin_auth'
  get '/user/linkedin_token' => 'website#users_linkedin_token'
  get '/user/linkedin_connect' => 'website#users_linkedin_connect'
  get '/user/linkedin_synchro' => 'website#users_linkedin_synchro'
  get '/user/check_linkedin_user' => 'website#users_check_linkedin_user'
  get '/user/linkedin_signin' => 'website#users_linkedin_signin'
  get '/user/linkedin_signup' => 'website#users_linkedin_signup'
  post '/user/set_avatar' => 'website#users_set_avatar'
  post '/user/set_video' => 'website#users_set_video'

  # Messages
  get '/message/create' => 'website#messages_create'
  get '/message/show' => 'website#messages_show'
  get '/message/destroy' => 'website#messages_destroy'
  get '/messages/list_received_messages' => 'website#messages_list_received_messages'
  get '/messages/list_sent_messages' => 'website#messages_list_sent_messages'
  get '/messages/list' => 'website#messages_list'
  get '/messages/viewed' => 'website#messages_viewed'
  get '/messages/conversation' => 'website#messages_conversation'

  # Favourites
  get '/favourite/create' => 'website#favourites_create'
  get '/favourites/list' => 'website#favourites_list'
  get '/favourite/destroy' => 'website#favourites_destroy'

  # Bookings
  get '/booking/create' => 'website#bookings_create'
  get '/booking/show' => 'website#bookings_show'
  get '/bookings/list_all_bookings' => 'website#bookings_list_all_bookings'
  get '/bookings/list_demanded_bookings' => 'website#bookings_list_demanded_bookings'
  get '/bookings/list_provided_bookings' => 'website#bookings_list_provided_bookings'
  get '/booking/confirm' => 'website#bookings_confirm'
  get '/booking/accept' => 'website#bookings_accept'
  get '/booking/reject' => 'website#bookings_reject'
  get '/booking/complete' => 'website#bookings_complete'
  get '/booking/set_card_and_pay' => 'website#bookings_set_card_and_pay'
  get '/booking/pay' => 'website#bookings_pay'
  get '/booking/rate' => 'website#bookings_rate'

  # Payments
  get '/payments/list' => 'website#payments_list'
  get '/payment/refund/:stripe_charge_id' => 'website#payments_refund'
  post '/payments/received' => 'website#payments_received'

  # Payouts
  get '/payouts/list' => 'website#payouts_list'

  # Categories
  get '/categories/list' => 'website#categories_list'

  # Attributes
  get '/attributes/list' => 'website#attributes_list'

  # Settings
  get '/settings/list' => 'website#settings_list'
  get '/get_info' => 'website#settings_get_info'

  # Stats (Analytics)
  get '/stats/show' => 'website#stats_show'

  # Schools
  get '/schools/index' => 'website#schools_index'
  get '/schools/search' => 'website#schools_search'

  # NDA
  get '/nda/create' => 'website#nda_create'
  get '/nda/show' => 'website#nda_show'
  get '/nda/accept' => 'website#nda_accept'

  # Documents
  get '/documents/get' => 'website#documents_get'

  #mailchimp
  post '/mailchimp_subscribe/:id' => 'website#mailchimp_subscribe'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'website#catalog_view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'website#catalog_purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

end
