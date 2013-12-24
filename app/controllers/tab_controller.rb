class TabController < ApplicationController
	 
	def list
		@tabs = Tab.find_by_sql("SELECT * FROM gp")

		respond_to do |format|
      		format.html # index.html.erb
      		format.json { render json: @tab }
   	 	end
	end

	def show
	
		respond_to do |format|
      		format.html # index.html.erb
      		format.json { render json: @tab }
   	 	end
	end


end
