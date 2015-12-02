<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Carbon\Carbon as Carbon;

// Route::get('/', 'WelcomeController@index');

// Route::get('/', function() {
// 	$foo = Carbon::now();
// 	dd($foo);
// 	return view('welcome');
// });

Route::get('/', 'AngularController@serveApp');

Route::group(array('prefix' => 'api'), function()
{
	Route::resource('events', 'EventController');
});
