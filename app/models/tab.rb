class Tab < ActiveRecord::Base
 
  self.abstract_class = true
  establish_connection ('tab')
 
 set_table_name 'gp'


end
