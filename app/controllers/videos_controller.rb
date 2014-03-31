class VideosController < ApplicationController
  def get_ticket
    require "net/http"
    require "net/https"
    require "uri"

    uri = URI.parse("https://api.vimeo.com/me/videos")

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Post.new(uri.request_uri, {'Authorization' => 'Bearer 44323969d5727d97d4642ad678b41be5'})
    request.set_form_data({'redirect_url' => 'http://liquidtalent.com'})

    response = JSON.parse(http.request(request).body)

    render json: {upload_link: response['upload_link']}
  end

  def get_id
    require "net/http"
    require "net/https"
    require "uri"

    uri = URI.parse(params[:url])

    http = Net::HTTP.new(uri.host, uri.port)

    request = Net::HTTP::Get.new(uri.request_uri)

    response = http.request(request)

    render json: {id: response['Location']}
  end
end