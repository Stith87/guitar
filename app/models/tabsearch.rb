class tabsearch < tab
	def listTabs
		@tabs = Tab.all
		respond_to do |format|
      		format.html # index.html.erb
      		format.json { render json: @statuses }
   	 	end
	end
end