console.log('foo');

(function() {

	'use strict';

	angular
		.module('tramatic', [
			'ngResource',
			'ngRoute'
		])
		.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
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
		}]);
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
(function() {

	'use strict';

	angular
		.module('tramatic')
		.controller('Controller', Controller);

		function Controller(event, $timeout) {

			var vm = this;

			vm.lines = [];
			vm.stops = [];
			vm.events = [];
			vm.eventsToday = [];

			vm.now = moment().format('MMM Do YYYY, h:mm:ss a');
			// console.log(vm.now);
			vm.counter = new Date();
			vm.onTimeout = function() {
				vm.now = moment().format('MMM Do YYYY, h:mm:ss a');
				mytimeout = $timeout(vm.onTimeout, 1000);
			}
			var mytimeout = $timeout(vm.onTimeout, 1000);
			// setInterval(function(){
			// 	vm.now = new Date();
			// 	// console.log(vm.now);
			// },1000);

			// line.getLine().then(function(results){
			// 	vm.lines = results;
			// 	// console.log(vm.lines);
			// }, function(error) {
			// 	console.log(error);
			// });

			// stop.getStops().then(function(results){
			// 	vm.stops = results;
			// 	// console.log(vm.stops);
			// }, function(error) {
			// 	console.log(error);
			// });

			event.getEvents().then(function(results){
				vm.events = results;
				console.log(vm.events);
			}, function(error) {
				console.log(error);
			});

			// event.getEventsToday().then(function(results){
			// 	vm.eventsToday = results;
			// 	// console.log(vm.eventsToday);
			// }, function(error) {
			// 	console.log(error);
			// });
		}
		Controller.$inject = ["event", "$timeout"];
})();
(function() {

	'use strict';

	angular
		.module('tramatic')
		.factory('event', event);

		function event($resource) {

			var Event = $resource('api/events');
			// var EventsToday = $resource('api/events_today');
			// var EventDetail = $resource('api/events/:eventId', {eventId:'@id'});

			function getEvents() {
				return Event.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			// function getEventsToday() {
			// 	return EventsToday.query().$promise.then(function(results) {
			// 		return results;
			// 	}, function(error) {
			// 		console.log(error);
			// 	});
			// }

			// function getEventDetail(id) {
			// 	return EventDetail.query({eventId:id}).$promise.then(function(results) {
			// 		return results;
			// 	}, function(error) {
			// 		console.log(error);
			// 	});
			// }

			return {
				getEvents: getEvents,
				// getEventsToday: getEventsToday,
				// getEventDetail: getEventDetail,
			}
		}
		event.$inject = ["$resource"];
}());