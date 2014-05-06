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
			trace('SettingsModel::send()');

			var dataTempObject = this.attributes;
			dataTempObject.collection = window.itemCollection.models;
			
			$.ajax({
				type: "POST",
				url: config.apiEndpoint,
				data: JSON.stringify(dataTempObject),
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					alert('Sent successfully.');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Sending failed: '+errorThrown);
				}
			});
		}
	});

})(jQuery);