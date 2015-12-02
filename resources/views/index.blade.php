<!DOCTYPE html>
<html>
	<head>
		<base href="/">
		<link rel="stylesheet" href="{!! asset('css/vendor.css') !!}">
	    <link rel="stylesheet" href="{!! asset('css/app.css') !!}">
		
	</head>
	<body ng-app="tramatic" ng-controller="Controller as vm">
		foo
		<div class="main" ng-view></div>
		<script src="{!! asset('js/vendor.js') !!}"></script>
		<script src="{!! asset('js/app.js') !!}"></script>
	</body>
</html>