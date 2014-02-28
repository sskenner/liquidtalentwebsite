class PresentationController < ApplicationController

  def view
  end

  #Mailchimp Subscribe
  def subscribe

    list = {
      id: 'cbcb329291',
      variables: {
        email: params[:email],
        name: params[:name],
        zip: params[:zip]
      }
    }

    begin

      @mc.lists.subscribe(list[:id], list[:variables])
      flash[:success] = 'You were successfully subscribed to our newsletter.'

    rescue Mailchimp::ListAlreadySubscribedError

      flash[:error] = 'Hmm.. We already have you in our list. \n\n(look for the mailchimp confirmation email in your inbox to confirm your subscription.)'

    rescue Mailchimp::ListDoesNotExistError

      flash[:error] = 'The mailing list is being updated, please try again later.'

    rescue Mailchimp::Error => ex

      if ex.message
        flash[:error] = ex.message
      else
        flash[:error] = 'An unrecognized error has occurred and has been sent to the LiquidTalent team to be fixed.'
      end

    end

  end

end