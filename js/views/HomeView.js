(function($) {
	$(document).ready(function() {																  // inside a document ready so that the template elemenst will be available

		/**
		 * Display the home screen
		 */
		window.HomeView = Backbone.View.extend({

			template: _.template($('#homeView').html()),

			/**
			 * Set visibility for the View methods
			 * @return void
			 */
			initialize: function() {
				_.bindAll(this,	'render');
			},

			/**
			 * Render the screen
			 * @return View
			 */
			render: function() {
				var view = this;
				this.$el.html(this.template());
				this.collection.each(function(item){
					view.render_item(item);
				});
				return this;
			},

			render_item: function(itemModel) {
				var checklistItemView = new window.ChecklistItemView({
					model: itemModel,
					collection: this.collection
				});

				this.$('#itemList').append(checklistItemView.render().el);
			},
		});
	});
})(jQuery);