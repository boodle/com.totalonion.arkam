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
				_.bindAll(this,	
					'render',
					'on_collectionChange',
					'on_save'
				);

				this.collection.on('change:done',this.on_collectionChange);
			},

			events: {
				'click .btn-save': 			'on_save'
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

				this.on_collectionChange();

				return this;
			},

			render_item: function(itemModel) {
				var checklistItemView = new window.ChecklistItemView({
					model: itemModel,
					collection: this.collection
				});

				this.$('#itemList').append(checklistItemView.render().el);
			},

			on_collectionChange: function() {
				trace('HomeView::on_collectionChange');
				if(this.collection.where({done:false}).length == 0) {
					this.$('.btn-save').removeAttr('disabled');
				} else {
					this.$('.btn-save').attr('disabled','disabled');
				}
			},

			on_save: function() {
				trace('HomeView::on_save');
				this.model.send();
			}
		});
	});
})(jQuery);