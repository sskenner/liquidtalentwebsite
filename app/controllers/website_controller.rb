class WebsiteController < ApplicationController

  def presentation
  end

  # Users
  def users_signup
  end
  def users_signin
  end
  def users_show
  end
  def users_search_by_name
  end
  def users_search_by_fields
  end
  def users_search_by_geo
  end
  def users_filter
  end
  def users_set_details
  end
  def users_logout
  end
  def users_set_credit_card
  end
  def users_set_bank_account
  end
  def users_pay
  end
  def users_unpaid_balance
  end
  def users_get_reviews
  end
  def users_destroy
  end
  def users_increment_video_views
  end
  def users_increment_profile_views
  end
  def users_report
  end
  def users_test
  end
  def users_linkedin_auth
  end
  def users_linkedin_token
  end
  def users_linkedin_connect
  end
  def users_linkedin_synchro
  end
  def users_check_linkedin_user
  end
  def users_linkedin_signin
  end
  def users_linkedin_signup
  end
  def users_set_avatar
  end
  def users_set_video
  end

  # Messages
  def messages_create
  end
  def messages_show
  end
  def messages_destroy
  end
  def messages_list_received_messages
  end
  def messages_list_sent_messages
  end
  def messages_list
  end
  def messages_viewed
  end
  def messages_conversation
  end

  # Favourites
  def favourites_create
  end
  def favourites_list
  end
  def favourites_destroy
  end

  # Bookings
  def bookings_create
  end
  def bookings_show
  end
  def bookings_list_all_bookings
  end
  def bookings_list_demanded_bookings
  end
  def bookings_list_provided_bookings
  end
  def bookings_confirm
  end
  def bookings_accept
  end
  def bookings_reject
  end
  def bookings_complete
  end
  def bookings_set_card_and_pay
  end
  def bookings_pay
  end
  def bookings_rate
  end

  # Payments
  def payments_list
  end
  def payments_refund
  end
  def payments_received
  end

  # Payouts
  def payouts_list
  end

  # Categories
  def categories_list
  end

  # Attributes
  def attributes_list
  end

  # Settings
  def settings_list
  end
  def settings_get_info
  end

  # Stats (Analytics)
  def stats_show
  end

  # Schools
  def schools_index
  end
  def schools_search
  end

  # NDA
  def nda_create
  end
  def nda_show
  end
  def nda_accept
  end

  # Documents
  def documents_get
  end

  #Mailchimp Subscribe
  def mailchimp_subscribe

    list_id = params[:id]

    merge_variables = {
        email: params['email'],
        name: params['name'],
        zip: params['zip']
    }

    begin

      @mc.lists.subscribe(list_id, merge_variables)
      flash[:success] = "You were successfully subscribed to our newsletter. Expect great posts soon."

    rescue Mailchimp::ListAlreadySubscribedError

      flash[:error] = "Hmm.. We already have you in our list. \n\n(look for the mailchimp confirmation email in your inbox to confirm you subscription.)"

    rescue Mailchimp::ListDoesNotExistError

      flash[:error] = "The mailing list has changed and needs to be updated."

    rescue Mailchimp::Error => ex

      if ex.message flash[:error] = ex.message
      else flash[:error] = "An unrecognized error has occurred and has been sent to the lead developer on LiquidTalent."
      end

    end

  end

end