(function($) {

	/**
	 * Data container for a guide answer
	 * @return void
	 */
	window.SettingsModel = Backbone.Model.extend({
		
		url:'#',

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
		},

		send: function() {
			//JSON.stringify(this.attributes)
			$.ajax({
				type: "POST",
				url: config.apiEndpoint,
				data: this.attributes,
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					trace('success');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					trace('error');
				}
			});
		}
	});

})(jQuery);