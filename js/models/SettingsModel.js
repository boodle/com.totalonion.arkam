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
			window.itemCollection.each(function(e){
				alert(e.get('data').length);
			});

			var data = this.attributes;
			data.collection = window.itemCollection.models;

			trace('###');
			trace(JSON.stringify(data));
			trace('###');
			
			$.ajax({
				type: "POST",
				url: config.apiEndpoint,
				data: data,
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					trace('success');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					trace('error');
					trace(jqXHR);
					trace(textStatus);
					trace(errorThrown);
				}
			});
		}
	});

})(jQuery);