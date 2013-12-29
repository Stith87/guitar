class TabsController < ApplicationController
	 
	def tab
		
		@query = params[:q] 

	 	@tabs = Tab.find_by_sql("Select * from gp where artist like '%#{@query}%' ORDER BY artist, title")
	

	end

	def show
		@query = params[:q]
		@tabs = Tab.find_by_sql("Select * from gp where artist like = '#{@query}' ORDER BY title")


	end

	
end
