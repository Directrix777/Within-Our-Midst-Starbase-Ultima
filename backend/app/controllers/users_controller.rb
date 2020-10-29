class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(pubnub_id: params[:id])
        render json: user
    end

    def create
        user = User.new
        user.name = params[:name]
        user.pubnub_id = params[:pubnub_id]
        user.color = get_color
        user.save
        render json: user
    end

    def destroy
        user = User.find_by(pubnub_id: params[:id])
        if user
            user.delete
            render json: {message: 'Successfully deleted!'}
        else
            render json: {message: 'User not found'}
        end
    end

    def get_color
        colors = ['red', 'blue', 'green', 'pink', 'orange', 'yellow', 'black', 'white', 'purple', 'brown', 'cyan', 'lime']
        users = User.all
        user_colors = users.collect{|user| user.color}
        colors.each do |color|
            if !(user_colors.include?(color))
                return color
            end
        end
        return 'weird green'
    end
end
