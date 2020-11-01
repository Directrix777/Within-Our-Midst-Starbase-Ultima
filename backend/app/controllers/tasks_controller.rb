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

    def destroy
        @@lock.synchronize do
            task = Task.find_by(pubnub_id: params[:id])
            if task
                task.delete
                render json: {message: 'Successfully deleted!'}
            else
                render json: {message: 'Task not found'}
            end
        end
    end
end
