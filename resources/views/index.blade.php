<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Tramatic | A Slightly Useless Tram Disruption Service</title>
		<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0">
		<base href="/">
		<link rel="stylesheet" href="{!! asset('css/vendor.css') !!}">
	    <link rel="stylesheet" href="{!! asset('css/app.css') !!}">
		
	</head>
	<body ng-app="tramatic" ng-controller="Controller as vm">
		<div class="col-xs-12 col-sm-6 col-sm-offset-3 text-center">
			<h1>Tramatic!</h1>
		</div>
		<div class="main" ng-view></div>
		<script src="{!! asset('js/vendor.js') !!}"></script>
		<script src="{!! asset('js/app.js') !!}"></script>
	</body>
</html>