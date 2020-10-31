class TasksController < ApplicationController
    def create
        task = Task.new
        task.user_id = params[:user_id]
        task.task_name = params[:task_name]
        task.save
        render json: params
    end
end
