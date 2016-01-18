<?php namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\ApiCalls\ApiCalls;

class Kernel extends ConsoleKernel {

	/**
	 * The Artisan commands provided by your application.
	 *
	 * @var array
	 */
	protected $commands = [
		'App\Console\Commands\Inspire',
	];

	/**
	 * Define the application's command schedule.
	 *
	 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
	 * @return void
	 */
	protected function schedule(Schedule $schedule)
	{
		$schedule->command('inspire')
				 ->hourly();

		// $schedule->call(function(){
		// })->everyMinute();

		// $schedule->call(function(){
  //           // Scrape::foo_event();
  //           // $mufc = Scrape::mufc();
  //           // $mcfc = Scrape::mcfc();
  //           // Scrape::fixtures($mufc);
  //           // Scrape::fixtures($mcfc);
  //       // })->weekly();
  //       })->everyMinute();
		$schedule->call(function()
		{
			ApiCalls::seed(65,'etihad-stadium','Etihad Stadium');
			ApiCalls::seed(66,'old-trafford','Old Trafford');

		})->weekly();
	}

}
