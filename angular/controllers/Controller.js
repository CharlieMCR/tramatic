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
})();