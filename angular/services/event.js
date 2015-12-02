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
}());