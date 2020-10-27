class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def create
        user = User.new
        user.name = params[:name]
        user.color = params[:color]
        user.save
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
end
