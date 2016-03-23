<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Tramatic</title>
		<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0">
		<base href="/">
		<link rel="stylesheet" href="{!! asset('css/vendor.css') !!}">
	    <link rel="stylesheet" href="{!! asset('css/app.css') !!}">
		
	</head>
	<body ng-app="tramatic" ng-controller="Controller as vm">
		<div class="main" ng-view></div>
		<script src="{!! asset('js/vendor.js') !!}"></script>
		<script src="{!! asset('js/app.js') !!}"></script>
	</body>
</html>