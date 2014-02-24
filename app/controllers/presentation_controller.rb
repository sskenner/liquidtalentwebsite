class PresentationController < ApplicationController

  def view
  end

  #Mailchimp Subscribe
  def subscribe

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

      flash[:error] = "Hmm.. We already have you in our list. \n\n(look for the mailchimp confirmation email in your inbox to confirm your subscription.)"

    rescue Mailchimp::ListDoesNotExistError

      flash[:error] = "The mailing list has changed and needs to be updated."

    rescue Mailchimp::Error => ex

      if ex.message flash[:error] = ex.message
      else flash[:error] = "An unrecognized error has occurred and has been sent to the lead developer on LiquidTalent."
      end

    end

  end

end