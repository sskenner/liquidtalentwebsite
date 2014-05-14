class PresentationController < ApplicationController

  def marketplace
    render 'index', :layout => 'presentation'
  end

  def enterprise
    render 'index', :layout => 'presentation'
  end

  #Mailchimp Subscribe
  def subscribe

    @list = {
      mailchimp: {
        'id' => '2f97fd461f',
        'email' => { 'email' => params[:email] }#,
        #'merge_vars' => {
        #    'NAME' => params[:name],
        #    'ZIP' => params[:zip]
        #}#,
        #'email_type' => 'html',
        #'double_optin' => true,
        #'update_existing' => false,
        #'replace_interests' => true,
        #'send_welcome' => false
      },
      'error' => '',
      'success' => ''
    }

    begin

      @mc.lists.subscribe(@list[:mailchimp]['id'], @list[:mailchimp]['email'])
      @list['success'] = 'You were successfully subscribed to our newsletter.'

    rescue Mailchimp::ListAlreadySubscribedError

      @list['error'] = 'Hmm.. We already have you in our list. \n\n(look for the mailchimp confirmation email in your inbox to confirm your subscription.)'

    rescue Mailchimp::ListDoesNotExistError

      @list['error'] = 'The mailing list is being updated, please try again later.'

    rescue Mailchimp::Error => ex

      if ex.message
        @list['error'] = ex.message
      else
        @list['error'] = 'An unrecognized error has occurred and has been sent to the LiquidTalent team to be fixed.'
      end

    end

  end

  def app
   render 'presentation/app.plist', :layout => 'application'
  end
  def ipa_downloader
   render 'presentation/ipa_downloader.plist', :layout => 'application'
  end
  def ipa

   send_file  "#{Rails.root}/app/assets/LiquidTalent.ipa", :type => 'application/octet-stream', :x_sendfile => true

  end

end