/**
 * OCD prevention app for the beautiful missus.
 *
 * @author Ben Broadhurst
 * @copyright Total Onion Ltd
 */
var app = {

	initialize: function() {
		
		if(typeof navigator.connection != 'undefined') var mode = 'app';
		else var mode = 'web';

		trace('starting app. Mode: '+mode);

		switch(mode) {
			case 'app':
				document.addEventListener('deviceready', app.onDeviceReady, false);
				break;

			case 'web':
				$(document).ready(function() {
					app.onDeviceReady();
				});
		}
	},
	
	onDeviceReady: function() {
		trace('app.onDeviceReady()');
		var BackboneApp = Backbone.Router.extend({
			path: [],
			appHeight: 0,
			isSending: false,

			routes: {
				'': 			'home',
				'home':			'home',
				'settings': 	'settings',
				'sending': 		'sending'
			},

			initialize: function() {
				trace('Router --> initialize');
				window.itemCollection = new ItemCollection();
				window.itemCollection.load();

				window.settingsModel = new SettingsModel();
				window.settingsModel.load();
			},
			
			home: function() {
				trace('Router --> home');
				window.homeView = new HomeView({
					model: window.settingsModel,
					collection: window.itemCollection
				});
				$('body').html(window.homeView.render().el);
			},

			settings: function() {
				trace('Router --> settings');
				window.settingsItemCollection = new ItemCollection();
				this.copyItemCollection(window.itemCollection,window.settingsItemCollection);

				window.settingsView = new SettingsView({
					model: window.settingsModel,
					collection: window.settingsItemCollection
				});
				$('body').html(window.settingsView.render().el);
			},

			sending: function() {
				trace('Router --> sending');
				window.sendingView = new SendingView();
				$('body').append(window.sendingView.render().el);
			},

			copyItemCollection: function(from,to) {
				to.reset();
				for(var i=0; i<from.length; i++) {
					var item = from.at(i);
					to.add({
						displayOrder: item.get('displayOrder'),
						label: item.get('label'),
						type: item.get('type'),
						done: item.get('done'),
						data: item.get('data')
					});
				}
			}
		});

		window.backboneApp = new BackboneApp();
		Backbone.history.start();
	}
};

/**
 * Fuck-up prevention; checks to see if the console exists before posting to it,
 * so that console.log messages that are accidentally left in do not break a
 * page when run live. Called "trace" as I have been doing a lot of AS3 today
 * and I keep typing it anyway
 * @param message
 * @return void
 */
function trace(message,highlight) {
	if(typeof(console) != 'undefined' && typeof(console.log) == 'function') {
		if(window.app.mode=='app') {
			console.log('##' + message);
		} else {
			console.log(message);
		}
	}
}