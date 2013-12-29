class TabsController < ApplicationController
	 
	def tab
		
		@query = params[:q] 

		if(params.has_key?(:q))
	 		@tabs = Tab.find_by_sql("Select * from gp where artist like '%#{@query}%' ORDER BY artist, title")
		end

	end

	def show
		@query = params[:q]
		@tabs = Tab.find_by_sql("Select * from gp where artist like = '#{@query}' ORDER BY title")


	end

	
end
