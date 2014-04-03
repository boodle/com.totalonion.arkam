(function($) {

	/**
	 * Data container for a guide answer
	 * @return void
	 */
	window.SettingsModel = Backbone.Model.extend({
	
		defaults: {
			name: 		'',
			email: 		'',
			subject: 	'',
			message: 	''
		},

		save: function() {
			trace('SettingsModel::save()');
			window.localStorage.setItem('messageModel',JSON.stringify(this.attributes));
		},

		load: function() {
			trace('SettingsModel::load()');
			this.set(JSON.parse(window.localStorage.getItem('messageModel')));
		}
	});

})(jQuery);