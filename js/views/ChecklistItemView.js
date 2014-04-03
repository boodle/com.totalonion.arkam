(function($) {
	$(document).ready(function() {																  // inside a document ready so that the template elemenst will be available

		/**
		 * Display the home screen
		 */
		window.ChecklistItemView = Backbone.View.extend({

			template: _.template($('#checklistItemView').html()),
			tagName: 'li',

			initialize: function() {
				_.bindAll(this,	
					'render',
					'on_tick',
					'on_untick'
				);

				this.model.on('change:done',this.render);
			},

			events: {
				'click .btn-tick':		'on_tick',
				'click .btn-untick': 	'on_untick'
			},

			on_tick: function() {
				this.model.set({done:true});
			},

			on_untick: function() {
				this.model.set({done:false});
			},

			/**
			 * Render the screen
			 * @return View
			 */
			render: function() {
				this.$el.html(this.template(this.model.attributes));
				this.$el.addClass('list-group-item');
				return this;
			}
		});
	});
})(jQuery);