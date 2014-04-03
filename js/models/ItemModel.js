(function($) {

	/**
	 * Data container for a guide answer
	 * @return void
	 */
	window.ItemModel = Backbone.Model.extend({
	
		defaults: {
			displayOrder: 	0,
			label: 			'',
			type: 			'checkbox',
			done: 			false
		}
	});

})(jQuery);