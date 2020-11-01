class TasksController < ApplicationController
    def create
        @@lock.synchronize do
            task = Task.new
            task.user_id = params[:user_id]
            task.task_name = params[:task_name]
            task.save
            render json: task
        end
    end
end
