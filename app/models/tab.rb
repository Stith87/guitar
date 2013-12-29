class Tab < ActiveRecord::Base
  

  self.abstract_class = true
  establish_connection ('tab')
  self.table_name = 'gp'

  has_many :queries
end
