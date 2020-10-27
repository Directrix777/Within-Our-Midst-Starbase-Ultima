class AddPubnubIdToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :pubnub_id, :float
  end
end
