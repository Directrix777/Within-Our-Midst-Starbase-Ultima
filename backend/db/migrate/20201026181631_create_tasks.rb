class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.string :task_name

      t.timestamps
    end
  end
end
