class ApplicationController < ActionController::API
    @@lock = Mutex.new
end
