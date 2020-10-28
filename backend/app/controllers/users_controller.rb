class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(pubnub_id: params[:pubnub_id])
    end

    def create
        user = User.new
        user.name = params[:name]
        user.color = get_color
        user.save
        redirect_to 'index'
    end

    def destroy
        user = User.find_by(id: params[:id])
        if user
            user.delete
            render json: {message: 'Successfully released!'}
        else
            render json: {message: 'User not found'}
        end
    end

    def get_color
        colors = ['red', 'blue', 'green', 'pink', 'orange', 'yellow', 'black', 'white', 'purple', 'brown', 'cyan', 'lime']
        final_color = 'weird green'
        colors.each do |color|
            users = User.all
            user_colors = users.collect{|user| user.color}
            if (user_colors.include?(color))
                final_color = color
            end
        end
        return final_color
    end
end
