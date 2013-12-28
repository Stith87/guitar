class TabsController < ApplicationController
	 

	def show
		@tabs = Tab.find_by_sql("Select * from gp where artist='led zeppelin'")


		
	end

end
