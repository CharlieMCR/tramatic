console.log('foo');

(function() {

	'use strict';

	angular
		.module('tramatic', [
			'ngResource',
			'ngRoute'
		])
		.config(function($routeProvider, $locationProvider) {
			// 
			$routeProvider.
			when('/', {
				templateUrl: 'partials/home.html',
				controller: 'Controller'
			})
			// .when('/lines', {
			// 	templateUrl: 'partials/lines-list.html',
			// 	controller: 'Controller'
			// })
			// .when('/line/:lineId', {
			// 	templateUrl: 'partials/line-detail.html',
			// 	controller: 'LineDetailCtrl'
			// })
			// .when('/stops', {
			// 	templateUrl: 'partials/stops-list.html',
			// 	controller: 'Controller'
			// })
			// .when('/stop/:stopId', {
			// 	templateUrl: 'partials/stop-detail.html',
			// 	controller: 'StopDetailCtrl'
			// })
			// .when('/events', {
			// 	templateUrl: 'partials/events-list.html',
			// 	controller: 'Controller'
			// })
			// .when('/event/:eventId', {
			// 	templateUrl: 'partials/event-detail.html',
			// 	controller: 'EventDetailCtrl'
			// });
			// 
			$locationProvider.html5Mode({
			  enabled: true,
			  requireBase: false
			});
		});
	// 	.config(['$routeProvider', '$locationProvider',
	// 	function($routeProvider) {
	// 		$routeProvider.
	// 		when('/', {
	// 			templateUrl: 'partials/home.html',
	// 			controller: 'Controller'
	// 		})
	// 		.when('/lines', {
	// 			templateUrl: 'partials/lines-list.html',
	// 			controller: 'Controller'
	// 		})
	// 		.when('/line/:lineId', {
	// 			templateUrl: 'partials/line-detail.html',
	// 			controller: 'Controller'
	// 		});
	// }
	// $locationProvider.html5Mode(true)]);
}());